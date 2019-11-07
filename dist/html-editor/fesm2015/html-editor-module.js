import { __decorate, __awaiter, __param } from 'tslib';
import { CommonModule } from '@angular/common';
import { Input, Component, EventEmitter, ElementRef, Optional, HostBinding, Output, ViewChild, NgModule } from '@angular/core';
import { NgControl, Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntlModule } from '@co.mmons/angular-intl';
import { FormHelper, FormHelperModule } from '@co.mmons/ionic-extensions/form-helper';
import { SelectModule } from '@co.mmons/ionic-extensions/select';
import { PopoverController, IonItem, ModalController, Platform, IonicModule } from '@ionic/angular';
import { ButtonsModule } from '@co.mmons/ionic-extensions/buttons';
import { MessageRef } from '@co.mmons/js-intl';
import { Schema, DOMSerializer, DOMParser, Slice, Fragment, NodeRange } from 'prosemirror-model';
import { nodes as nodes$1, marks as marks$1 } from 'prosemirror-schema-basic';
import { bulletList, orderedList, listItem, splitListItem as splitListItem$1, liftListItem as liftListItem$1, sinkListItem, wrapInList as wrapInList$1 } from 'prosemirror-schema-list';
import { EventManager } from '@angular/platform-browser';
import { waitTill, sleep } from '@co.mmons/js-utils/core';
import { joinUp, joinDown, lift, selectParentNode, toggleMark, baseKeymap, setBlockType, chainCommands, autoJoin } from 'prosemirror-commands';
import { gapCursor, GapCursor } from 'prosemirror-gapcursor';
import { undo, redo, history, undoDepth, redoDepth } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { EditorState, TextSelection, NodeSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { undoInputRule } from 'prosemirror-inputrules';
import { removeSelectedNode, findParentNodeOfType, hasParentNodeOfType, findPositionOfNodeBefore, findParentNode } from 'prosemirror-utils';
import { unsubscribe } from '@co.mmons/rxjs-utils';
import { deepEqual, shallowEqual } from 'fast-equals';
import { ReplaceAroundStep, liftTarget, findWrapping } from 'prosemirror-transform';

class Alignment {
    constructor(alignment) {
        this.alignment = alignment;
        Alignment._alignments.push(this);
        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "alignmentMenu/" + alignment);
    }
    static alignments() {
        return Alignment._alignments.slice();
    }
}
Alignment._alignments = [];
Alignment.left = new Alignment("left");
Alignment.right = new Alignment("right");
Alignment.center = new Alignment("center");
Alignment.justify = new Alignment("justify");

/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror"s `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
const toggleBlockMark = (markType, getAttrs, allowedBlocks) => (state, dispatch) => {
    let markApplied = false;
    const tr = state.tr;
    const toggleBlockMarkOnRange = (from, to, tr) => {
        state.doc.nodesBetween(from, to, (node, pos, parent) => {
            if (!node.type.isBlock) {
                return false;
            }
            if ((!allowedBlocks || (Array.isArray(allowedBlocks) ? allowedBlocks.indexOf(node.type) > -1 : allowedBlocks(state.schema, node, parent))) &&
                parent.type.allowsMarkType(markType)) {
                const oldMarks = node.marks.filter(mark => mark.type === markType);
                const prevAttrs = oldMarks.length ? oldMarks[0].attrs : undefined;
                const newAttrs = getAttrs(prevAttrs, node);
                if (newAttrs !== undefined) {
                    tr.setNodeMarkup(pos, node.type, node.attrs, node.marks
                        .filter(mark => !markType.excludes(mark.type))
                        .concat(newAttrs === false ? [] : markType.create(newAttrs)));
                    markApplied = true;
                }
            }
            return;
        });
    };
    const { from, to } = state.selection;
    toggleBlockMarkOnRange(from, to, tr);
    if (markApplied && tr.docChanged) {
        if (dispatch) {
            dispatch(tr.scrollIntoView());
        }
        return true;
    }
    return false;
};

/**
 * Iterates over the commands one after the other,
 * passes the tr through and dispatches the cumulated transaction
 */
const cascadeCommands = (cmds) => (state, dispatch) => {
    const { tr: baseTr } = state;
    let shouldDispatch = false;
    const onDispatchAction = (tr) => {
        tr.steps.forEach(st => {
            baseTr.step(st);
        });
        shouldDispatch = true;
    };
    cmds.forEach(cmd => {
        cmd(state, onDispatchAction);
    });
    if (dispatch && shouldDispatch) {
        dispatch(baseTr);
        return true;
    }
    return false;
};
const isAlignable = (align) => (state, dispatch) => {
    const { nodes: { paragraph, heading }, marks: { alignment }, } = state.schema;
    return toggleBlockMark(alignment, () => (!align ? undefined : align === "left" ? false : { align }), [paragraph, heading])(state, dispatch);
};
const changeAlignment = (align) => (state, dispatch) => {
    const { nodes: { paragraph, heading }, marks: { alignment } } = state.schema;
    return toggleBlockMark(alignment, () => (!align ? undefined : align === "left" ? false : { align }), [paragraph, heading])(state, dispatch);
};

const ɵ0 = dom => {
    const size = dom.getAttribute("data-font-size");
    return size ? { fontSize: size } : false;
};
const fontSize = {
    excludes: "fontSize",
    group: "fontSize",
    attrs: {
        fontSize: {},
    },
    parseDOM: [
        {
            tag: "span[data-font-size]",
            getAttrs: ɵ0,
        },
    ],
    toDOM(mark) {
        return [
            "span",
            { style: `font-size: ${mark.attrs.fontSize}`, "data-font-size": mark.attrs.fontSize },
            0
        ];
    },
};

const ɵ0$1 = dom => {
    const align = dom.getAttribute("data-align");
    return align ? { align } : false;
};
const alignment = {
    excludes: "alignment",
    group: "alignment",
    attrs: {
        align: {},
    },
    parseDOM: [
        {
            tag: "div[data-align]",
            getAttrs: ɵ0$1,
        },
    ],
    toDOM(mark) {
        return [
            "div",
            {
                style: `text-align: ${mark.attrs.align}`,
                "data-align": mark.attrs.align,
            },
            0
        ];
    },
};

const ɵ0$2 = { default: "" }, ɵ1 = (node) => {
    return [
        "div",
        { "data-youtube": node.attrs.id + (node.attrs.start ? "," + node.attrs.start : "") },
        "youtube"
    ];
}, ɵ2 = (dom) => {
    // @ts-ignore
    const info = dom.getAttribute("data-youtube").split(",");
    return {
        id: info[0],
        start: info.length > 1 ? info[1] : 0
    };
};
const youtube = {
    attrs: { id: ɵ0$2, start: { default: 0 } },
    inline: false,
    group: "block",
    draggable: false,
    toDOM: ɵ1,
    parseDOM: [
        {
            tag: "div[data-youtube]",
            getAttrs: ɵ2,
        }
    ]
};

const nodes = {
    doc: {
        content: "block+",
        marks: "alignment",
    },
    paragraph: {
        content: "inline*",
        marks: "alignment strong underline em fontSize link",
        group: "block",
        parseDOM: [{ tag: "p" }],
        toDOM() { return ["p", 0]; }
    },
    blockquote: nodes$1.blockquote,
    horizontalRule: nodes$1.horizontal_rule,
    heading: nodes$1.heading,
    text: nodes$1.text,
    hardBreak: nodes$1.hard_break,
    bulletList: Object.assign({}, bulletList, {
        content: "listItem+",
        group: "block"
    }),
    orderedList: Object.assign({}, orderedList, {
        content: "listItem+",
        group: "block"
    }),
    listItem: Object.assign({}, listItem, {
        content: "paragraph block*",
        marks: "alignment"
    }),
    youtube
};
const marks = {
    link: marks$1.link,
    em: marks$1.em,
    strong: marks$1.strong,
    alignment,
    fontSize: fontSize,
    underline: {
        parseDOM: [{ tag: "u" }, { style: "text-decoration=underline" }],
        toDOM() {
            return ["u", 0];
        }
    }
};
const schema = new Schema({ nodes: nodes, marks: marks });

function findBlockMarks(state, markType) {
    const marks = [];
    const { from, to } = state.selection;
    state.doc.nodesBetween(from, to, (node, pos, parent) => {
        if (!node.type.isBlock) {
            return false;
        }
        for (const mark of node.marks) {
            if (mark.type === markType) {
                marks.push(mark);
            }
        }
    });
    return marks;
}

let AlignmentMenu = class AlignmentMenu {
    constructor(popoverController) {
        this.popoverController = popoverController;
        this.Alignment = Alignment;
    }
    toggleAligment(alignment) {
        const command = changeAlignment(alignment.alignment);
        if (command(this.editor.state)) {
            command(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    ngOnInit() {
        this.active = undefined;
        for (const mark of findBlockMarks(this.editor.state, schema.marks.alignment)) {
            // zaznaczonych wiele blocków z różnym wyrównaniem
            if (this.active && this.active !== mark.attrs.align) {
                this.active = undefined;
                break;
            }
            this.active = mark.attrs.align;
        }
    }
    ionViewWillLeave() {
        this.editor.focus();
    }
};
AlignmentMenu.ctorParameters = () => [
    { type: PopoverController }
];
__decorate([
    Input()
], AlignmentMenu.prototype, "editor", void 0);
AlignmentMenu = __decorate([
    Component({
        template: `
        <ion-list lines="full">

            <ion-item button="true" detail="false" (click)="toggleAligment(alignment)" *ngFor="let alignment of Alignment.alignments()">
                <ion-label>{{alignment.label | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="active === alignment.alignment"></ion-icon>
                <ion-icon src="assets/html-editor/align-{{alignment.alignment}}.svg" slot="start"></ion-icon>
            </ion-item>

        </ion-list>
    `,
        styles: [`
        :host ion-list { margin: 0px; padding: 0px; }
        :host ion-item:last-child { --border-width: 0px; }
    `]
    })
], AlignmentMenu);

const mac = typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
function buildKeymap(schema, mapKeys) {
    const keys = {};
    let type;
    function bind(key, cmd) {
        if (mapKeys) {
            const mapped = mapKeys[key];
            if (mapped === false) {
                return;
            }
            if (mapped) {
                key = mapped;
            }
        }
        keys[key] = cmd;
    }
    bind("Mod-z", undo);
    bind("Shift-Mod-z", redo);
    bind("Backspace", undoInputRule);
    if (!mac) {
        bind("Mod-y", redo);
    }
    bind("Alt-ArrowUp", joinUp);
    bind("Alt-ArrowDown", joinDown);
    bind("Mod-BracketLeft", lift);
    bind("Escape", selectParentNode);
    if (type = schema.marks.strong) {
        bind("Mod-b", toggleMark(type));
        bind("Mod-B", toggleMark(type));
    }
    if (type = schema.marks.em) {
        bind("Mod-i", toggleMark(type));
        bind("Mod-I", toggleMark(type));
    }
    if (type = schema.marks.underline) {
        bind("Mod-u", toggleMark(type));
        bind("Mod-U", toggleMark(type));
    }
    if (type = schema.nodes.listItem) {
        bind("Enter", splitListItem$1(type));
    }
    if (type = schema.nodes.hardBreak) {
        const br = type;
        const cmd = (state, dispatch) => {
            dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
            return true;
        };
        bind("Mod-Enter", cmd);
        bind("Shift-Enter", cmd);
        if (mac) {
            bind("Ctrl-Enter", cmd);
        }
    }
    return keys;
}

function createYoutubeIframe(id, start) {
    const iframe = document.createElement("iframe");
    iframe.height = "200px";
    iframe.width = "100%";
    iframe.src = `https://www.youtube.com/embed/${id}${start ? "?start=" + start : ""}`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    return iframe;
}
// https://www.youtube.com/watch?v=m3V7_Ov52sY
class YoutubeNodeView {
    constructor(node, view, eventManager) {
        this.view = view;
        this.dom = document.createElement("div");
        this.dom.style.position = "relative";
        this.dom.style.overflow = "hidden";
        this.dom.style.height = "200px";
        this.dom.style.marginTop = "16px";
        this.dom.appendChild(createYoutubeIframe(node.attrs.id, node.attrs.start));
        const overlay = this.dom.appendChild(document.createElement("div"));
        overlay.style.position = "absolute";
        overlay.style.left = "0px";
        overlay.style.top = "0px";
        overlay.style.width = "100%";
        overlay.style.height = "200px";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        const button = overlay.appendChild(document.createElement("ion-button"));
        button.classList.add("ionx--interactive");
        button.setAttribute("color", "primary");
        this.deleteUnlisten = eventManager.addEventListener(button, "click", () => this.deleteNode());
        const icon = document.createElement("ion-icon");
        icon.setAttribute("name", "trash");
        icon.slot = "icon-only";
        button.appendChild(icon);
    }
    deleteNode() {
        this.view.dispatch(removeSelectedNode(this.view.state.tr));
    }
    selectNode() {
        this.dom.classList.add("ionx--selected");
    }
    deselectNode() {
        this.dom.classList.remove("ionx--selected");
    }
    update(node) {
        return false;
    }
    destroy() {
        if (this.deleteUnlisten) {
            this.deleteUnlisten();
        }
    }
    stopEvent(event) {
        return false;
    }
    ignoreMutation() {
        return true;
    }
}

function findScrollParent(element) {
    if (!element) {
        return;
    }
    if (element.scrollHeight >= element.clientHeight) {
        const overflowY = window.getComputedStyle(element).overflowY;
        if (overflowY !== "visible" && overflowY !== "hidden") {
            return element;
        }
    }
    if (element.assignedSlot) {
        const p = findScrollParent(element.assignedSlot.parentElement);
        if (p) {
            return p;
        }
    }
    return findScrollParent(element.parentElement);
}
function scrollIntoView(element, scrollBehavior, parent) {
    if (!parent) {
        parent = findScrollParent(element);
    }
    if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        if (!(rect.top > parentRect.top && rect.top <= parentRect.bottom && rect.bottom < parentRect.height)) {
            let top = element.offsetTop;
            if (element.offsetParent) {
                let offsetParent = element.offsetParent;
                while (offsetParent !== parent && !!offsetParent) {
                    top += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent;
                }
            }
            parent.scrollTo({ top: top, behavior: scrollBehavior });
        }
        return;
    }
    element.scrollIntoView();
}

var HtmlEditor_1;
let HtmlEditor = HtmlEditor_1 = class HtmlEditor {
    constructor(element, eventManager, formControl, item) {
        this.element = element;
        this.eventManager = eventManager;
        this.formControl = formControl;
        this.item = item;
        this.eventUnlisteners = [];
        this.change = new EventEmitter();
        this.selectionChange = new EventEmitter();
        if (formControl) {
            this.formControl.valueAccessor = this;
        }
        this.id = "ionx-trix-editor" + (HtmlEditor_1.idGenerator++);
        this.itemInputWrapper = !!this.item;
    }
    get state() {
        return this.view.state;
    }
    set value(html) {
        if (this.view) {
            const state = EditorState.create({
                schema: this.view.state.schema,
                plugins: this.view.state.plugins,
                doc: this.editorDoc(html || "<div></div>")
            });
            this.view.updateState(state);
        }
        else {
            this.uninitializedValue = html;
        }
    }
    get value() {
        if (this.view) {
            const value = DOMSerializer.fromSchema(this.schema).serializeFragment(this.state.doc.content);
            const tmp = document.createElement("div");
            tmp.appendChild(value);
            if (!tmp.innerText) {
                return null;
            }
            else {
                return this.prepareOutputValue(tmp);
            }
        }
        else {
            return this.uninitializedValue;
        }
    }
    get nativeElement() {
        return this.element.nativeElement;
    }
    prepareOutputValue(value) {
        value.querySelectorAll("div[data-youtube]").forEach((node) => {
            const params = node.getAttribute("data-youtube").split(",");
            node.appendChild(createYoutubeIframe(params[0], params.length > 1 ? params[1] : undefined));
        });
        return value.innerHTML;
    }
    prepareInputValue(value) {
    }
    setDisabledState(isDisabled) {
        this.disabled = !!isDisabled;
    }
    writeValue(value) {
        this.silentChanges = true;
        this.value = value;
    }
    registerOnChange(fn) {
        this.controlOnChange = fn;
    }
    registerOnTouched(fn) {
        this.controlOnTouched = fn;
    }
    focus() {
        this.view.dom.focus();
        // this.content.focus();
    }
    // @ts-ignore
    editorInitialized(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.uninitializedValue) {
                // this.trixEditor.loadHTML(this.uninitializedValue);
            }
            // this.trixEditorController.toolbarController.applyKeyboardCommand = this.applyKeyboardCommand.bind(this);
        });
    }
    // @ts-ignore
    editorFocused(event) {
        if (this.controlOnTouched) {
            this.controlOnTouched(true);
        }
        this.focused = true;
        this.updateItemClasses();
    }
    // @ts-ignore
    editorBlured(event) {
        this.focused = false;
        this.updateItemClasses();
    }
    handleScroll(view) {
        if (!this.scrollParent) {
            this.scrollParent = findScrollParent(this.element.nativeElement);
        }
        const pos = view.domAtPos(view.state.selection.to);
        if (pos.node instanceof HTMLElement) {
            scrollIntoView(pos.node, undefined, this.scrollParent);
        }
        return false;
    }
    editorDoc(html) {
        const node = document.createElement("div");
        node.innerHTML = html;
        this.prepareInputValue(node);
        return DOMParser.fromSchema(this.schema).parse(node);
    }
    resetControlCss() {
        const classes = {
            "ion-untouched": this.formControl.untouched,
            "ion-touched": this.formControl.touched,
            "ion-pristine": this.formControl.pristine,
            "ion-dirty": this.formControl.dirty,
            "ion-valid": this.formControl.valid,
            "ion-invalid": !this.formControl.valid
        };
        const elements = [];
        elements.push(this.element.nativeElement);
        if (this.item) {
            elements.push(this.item["el"]);
        }
        for (const e of elements) {
            for (const c in classes) {
                if (classes[c]) {
                    e.classList.add(c);
                }
                else {
                    e.classList.remove(c);
                }
            }
        }
    }
    updateItemClasses() {
        if (!this.item) {
            return;
        }
        const item = this.item["el"];
        if (this.disabled) {
            item.classList.remove("item-interactive");
        }
        else {
            item.classList.add("item-interactive");
        }
        if (this.focused) {
            item.classList.add("item-has-focus");
        }
        else {
            item.classList.remove("item-has-focus");
        }
    }
    fixItemOverflow() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.item) {
                const item = this.item["el"];
                yield waitTill(() => !!item.shadowRoot);
                item.style.overflow = "initial";
                const style = document.createElement("style");
                style.innerHTML = `.item-native, .item-inner, .input-wrapper { overflow: initial !important; }`;
                item.shadowRoot.appendChild(style);
            }
        });
    }
    editorTransaction(transaction) {
        this.focus();
        this.view.updateState(this.view.state.apply(transaction));
        this.selectionChange.next();
        if (transaction.docChanged) {
            this.change.next();
            if (this.controlOnChange && !this.silentChanges) {
                this.controlOnChange(this.value);
            }
        }
        this.silentChanges = false;
    }
    readonlyChanged() {
        if (this.view) {
            this.view.dom["contentEditable"] = !this.readonly && !this.disabled ? "true" : "false";
        }
    }
    ngAfterViewInit() {
        this.fixItemOverflow();
        this.updateItemClasses();
    }
    ngAfterContentChecked() {
        this.resetControlCss();
    }
    ngOnDestroy() {
        for (const unlisten of this.eventUnlisteners) {
            unlisten();
        }
        this.view.destroy();
        this.view = undefined;
    }
    ngOnInit() {
        this.schema = schema;
        this.plugins = [
            keymap(buildKeymap(schema)),
            keymap(baseKeymap),
            gapCursor(),
            history()
        ];
        const state = EditorState.create({
            schema: this.schema,
            plugins: this.plugins,
            doc: this.editorDoc(this.uninitializedValue ? this.uninitializedValue : "<div></div>")
        });
        this.view = new EditorView(this.element.nativeElement, {
            state: state,
            dispatchTransaction: (transaction) => this.editorTransaction(transaction),
            handleScrollToSelection: (view) => this.handleScroll(view),
            nodeViews: {
                youtube: (node, view) => new YoutubeNodeView(node, view, this.eventManager)
            }
        });
        this.silentChanges = false;
        if (this.readonly || this.disabled) {
            this.readonlyChanged();
        }
    }
    ngOnChanges(changes) {
        if (changes["readonly"] || changes["disabled"]) {
            this.readonlyChanged();
        }
    }
};
HtmlEditor.idGenerator = 0;
HtmlEditor.ctorParameters = () => [
    { type: ElementRef },
    { type: EventManager },
    { type: NgControl, decorators: [{ type: Optional }] },
    { type: IonItem, decorators: [{ type: Optional }] }
];
__decorate([
    HostBinding("class.ionx-item-input-wrapper")
], HtmlEditor.prototype, "itemInputWrapper", void 0);
__decorate([
    Input()
], HtmlEditor.prototype, "features", void 0);
__decorate([
    Input()
], HtmlEditor.prototype, "disabled", void 0);
__decorate([
    Input()
], HtmlEditor.prototype, "readonly", void 0);
__decorate([
    Output()
], HtmlEditor.prototype, "change", void 0);
__decorate([
    Output()
], HtmlEditor.prototype, "selectionChange", void 0);
__decorate([
    Input()
], HtmlEditor.prototype, "value", null);
HtmlEditor = HtmlEditor_1 = __decorate([
    Component({
        selector: "ionx-html-editor",
        template: `
        <ionx-html-editor-toolbar [style.display]="readonly ? 'none' : ''"></ionx-html-editor-toolbar>
    `,
        styles: [`
        :host ::ng-deep .ProseMirror {
            outline: none; 
        }

        :host ::ng-deep .ProseMirror[contenteditable=true] {
            min-height: 60px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        :host ::ng-deep .ProseMirror p {
            margin: 16px 0px 0px 0px;
        }
        
        :host ::ng-deep .ProseMirror p:first-child {
            margin-top: 0px;
        }

        :host ::ng-deep .ProseMirror h1 {
            font-size: 130%;
        }

        :host ::ng-deep .ProseMirror h2 {
            font-size: 125%;
        }

        :host ::ng-deep .ProseMirror h3 {
            font-size: 120%;
        }

        :host ::ng-deep .ProseMirror h4 {
            font-size: 115%;
        }

        :host ::ng-deep .ProseMirror h5 {
            font-size: 110%;
        }

        :host ::ng-deep .ProseMirror h6 {
            font-size: 105%;
        }

        :host ::ng-deep .ProseMirror h1, :host ::ng-deep .ProseMirror h2, :host ::ng-deep .ProseMirror h3, :host ::ng-deep .ProseMirror h4, :host ::ng-deep .ProseMirror h5, :host ::ng-deep .ProseMirror h6 {
            margin-top: 16px;
            margin-bottom: 8px;
        }
        
        :host ::ng-deep .ProseMirror h1:first-child, :host ::ng-deep .ProseMirror h2:first-child, :host ::ng-deep .ProseMirror h3:first-child, :host ::ng-deep .ProseMirror h4:first-child, :host ::ng-deep .ProseMirror h5:first-child, :host ::ng-deep .ProseMirror h6:first-child {
            margin-top: 0px;
        }

        :host ::ng-deep .ProseMirror ul:first-child {
            margin-top: 0px;
        }
        
        :host ::ng-deep .ProseMirror[contenteditable=true] .ionx--selected {
            border: 4px solid var(--ion-color-primary);
        }
        
        :host ::ng-deep .ProseMirror[contenteditable=false] .ionx--interactive {
            display: none;
        }
    `]
    }),
    __param(2, Optional()),
    __param(3, Optional())
], HtmlEditor);

let HeadingMenu = class HeadingMenu {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    toggleHeading(heading) {
        if (heading > 0 && this.activeHeading !== heading) {
            const command = setBlockType(schema.nodes.heading, { level: heading });
            if (command(this.editor.state)) {
                command(this.editor.state, (tr) => {
                    this.editor.view.dispatch(tr);
                });
            }
        }
        else {
            setBlockType(schema.nodes.paragraph)(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    ngOnInit() {
        const active = findParentNodeOfType(schema.nodes.heading)(this.editor.state.selection);
        if (active) {
            this.activeHeading = active.node.attrs.level;
        }
    }
    ionViewWillLeave() {
        this.editor.focus();
    }
};
HeadingMenu.ctorParameters = () => [
    { type: PopoverController }
];
__decorate([
    Input()
], HeadingMenu.prototype, "editor", void 0);
HeadingMenu = __decorate([
    Component({
        template: `
        <ion-list lines="full">

            <ion-item button="true" detail="false" (click)="toggleHeading(0)" *ngIf="activeHeading > 0">
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#Plain text" | intlMessage}}</ion-label>
            </ion-item>
            
            <ion-item button="true" detail="false" (click)="toggleHeading(1)">
                <ion-label style="font-size: 130%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 1</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 1"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleHeading(2)">
                <ion-label style="font-size: 125%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 2</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 2"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleHeading(3)">
                <ion-label style="font-size: 120%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 3</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 3"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleHeading(4)">
                <ion-label style="font-size: 115%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 4</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 4"></ion-icon>
            </ion-item>
            
            <ion-item button="true" detail="false" (click)="toggleHeading(5)">
                <ion-label style="font-size: 110%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 5</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 5"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleHeading(6)">
                <ion-label style="font-size: 105%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 6</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 6"></ion-icon>
            </ion-item>
            
        </ion-list>
    `,
        styles: [`:host ion-list { margin: 0px; padding: 0px }`,
            `:host ion-item:last-child { --border-width: 0px; }`]
    })
], HeadingMenu);

class LinkType {
    constructor(type) {
        this.type = type;
    }
    toString() {
        return this.type;
    }
}
class DefaultLinkType extends LinkType {
    constructor(type) {
        super(type);
        this.inputComponent = undefined;
        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/type/" + type);
        if (type === "www") {
            this.inputType = "url";
        }
        else if (type === "other") {
            this.inputType = "text";
        }
        else if (type === "sms") {
            this.inputType = "sms";
        }
        else {
            this.inputType = type;
        }
        if (type === "www") {
            this.inputValidators = [urlValidator];
            this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/Web page url");
        }
        if (type === "email") {
            this.inputValidators = [Validators.email];
            this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/E-mail address");
        }
        if (type === "tel" || type === "sms") {
            this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/Phone number");
            this.inputHint = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/phoneNumberHint");
        }
    }
    uri(fromLink) {
        if (this.type === "www" || this.type === "other") {
            return fromLink;
        }
        else if (this.type === "tel") {
            return `tel:${fromLink}`;
        }
        else if (this.type === "sms") {
            return `sms:${fromLink}`;
        }
        else if (this.type === "email") {
            return `mailto:${fromLink}`;
        }
        return fromLink;
    }
}
DefaultLinkType.www = new DefaultLinkType("www");
DefaultLinkType.email = new DefaultLinkType("email");
DefaultLinkType.tel = new DefaultLinkType("tel");
DefaultLinkType.sms = new DefaultLinkType("sms");
DefaultLinkType.other = new DefaultLinkType("other");
const urlValidatorRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
function urlValidator(control) {
    const value = control.value;
    if (urlValidatorRegex.test(value)) {
        return undefined;
    }
    return {
        invalidUrl: new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/invalidUrlError")
    };
}

function findMarks(doc, from, to, markType, attrs) {
    const marks = [];
    doc.nodesBetween(from, to, node => {
        for (let i = 0; i < node.marks.length; i++) {
            if (node.marks[i].type === markType && (!attrs || deepEqual(node.marks[i].attrs, attrs))) {
                marks.push(node.marks[i]);
            }
        }
    });
    return marks;
}

function findMarksInSelection(state, markType, attrs) {
    const doc = state.doc;
    const { from, to } = state.selection;
    return findMarks(doc, from, to, markType, attrs);
}

function findNodeStartEnd(doc, pos) {
    const $pos = doc.resolve(pos);
    const start = pos - $pos.textOffset;
    const end = start + $pos.parent.child($pos.index()).nodeSize;
    return { start, end };
}

var LinkModal_1;
let LinkModal = LinkModal_1 = class LinkModal {
    constructor(modalController) {
        this.modalController = modalController;
    }
    static present(modalController, editor) {
        return __awaiter(this, void 0, void 0, function* () {
            const modal = yield modalController.create({ component: LinkModal_1, componentProps: { editor: editor } });
            modal.present();
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.modalController.dismiss();
            this.editor.focus();
        });
    }
    unlink() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.modalController.dismiss();
            const selection = this.editor.state.selection;
            if (selection.empty) {
                const tr = this.editor.state.tr;
                tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                    if (node.isText) {
                        const $pos = tr.doc.resolve(pos);
                        const start = pos - $pos.textOffset;
                        const end = start + $pos.parent.child($pos.index()).nodeSize;
                        tr.removeMark(start, end, schema.marks.link);
                    }
                });
                this.editor.view.dispatch(tr);
            }
            else {
                toggleMark(schema.marks.link)(this.editor.state, tr => this.editor.view.dispatch(tr));
            }
        });
    }
    ok() {
        return __awaiter(this, void 0, void 0, function* () {
            this.formHelper.validateAll("dirty");
            if (this.form.valid) {
                yield this.modalController.dismiss();
                const linkType = this.form.controls.type.value;
                const selection = this.editor.state.selection;
                const tr = this.editor.state.tr;
                if (selection.empty) {
                    tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                        if (node.isText) {
                            const { start, end } = findNodeStartEnd(tr.doc, pos);
                            tr.addMark(start, end, schema.mark(schema.marks.link, { href: linkType.uri(this.form.controls.link.value) }));
                        }
                    });
                }
                else {
                    // usuwamy poprzedni link
                    tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                        if (node.isText) {
                            const { start, end } = findNodeStartEnd(tr.doc, pos);
                            tr.removeMark(start, end, schema.marks.link);
                        }
                    });
                    tr.addMark(selection.from, selection.to, schema.mark(schema.marks.link, { href: linkType.uri(this.form.controls.link.value) }));
                }
                this.editor.view.dispatch(tr);
            }
        });
    }
    typeChanged() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.form.controls.link.value) {
                this.form.controls.link.markAsDirty();
                this.form.controls.link.updateValueAndValidity();
            }
            yield sleep(50); // we must wait for closing type selector
            this.formHelper.focus("link", false);
        });
    }
    parseLink(uri) {
        const prefixes = {
            "http:": DefaultLinkType.www,
            "https:": DefaultLinkType.www,
            "tel:": DefaultLinkType.tel,
            "sms:": DefaultLinkType.sms,
            "mailto:": DefaultLinkType.email
        };
        const lowerCasedUri = uri.trim().toLowerCase();
        for (const prefix of Object.keys(prefixes)) {
            if (lowerCasedUri.startsWith(prefix)) {
                const link = { type: prefixes[prefix], link: uri.trim() };
                if (prefixes[prefix] !== DefaultLinkType.www) {
                    link.link = uri.substring(prefix.length).trim();
                }
                return link;
            }
        }
        return { type: DefaultLinkType.other, link: uri };
    }
    linkValidator(control) {
        const required = Validators.required(control);
        if (required) {
            return required;
        }
        const type = this.form.controls.type.value;
        const validators = type.inputValidators;
        if (validators) {
            for (const validator of validators) {
                const r = validator(control);
                if (r) {
                    return r;
                }
            }
        }
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.formHelper.focus("link", false);
        });
    }
    ionViewWillLeave() {
        return __awaiter(this, void 0, void 0, function* () {
            this.editor.focus();
        });
    }
    ngOnInit() {
        this.types = [DefaultLinkType.www, DefaultLinkType.email, DefaultLinkType.tel, DefaultLinkType.sms, DefaultLinkType.other];
        this.form = new FormGroup({
            type: new FormControl(DefaultLinkType.www),
            link: new FormControl()
        });
        this.form.controls.link.setValidators(control => this.linkValidator(control));
        this.typeChangesSubscription = this.form.controls["type"].valueChanges.subscribe(() => this.typeChanged());
        this.typeChanged();
        this.existing = undefined;
         for (const mark of findMarksInSelection(this.editor.state, schema.marks.link)) {
            const parsed = this.parseLink(mark.attrs.href);
            if (parsed) {
                this.form.controls["type"].setValue(parsed.type);
                this.form.controls["link"].setValue(parsed.link);
                this.existing = true;
            }
        }
    }
    ngOnDestroy() {
        unsubscribe(this.typeChangesSubscription);
    }
};
LinkModal.ctorParameters = () => [
    { type: ModalController }
];
__decorate([
    Input()
], LinkModal.prototype, "editor", void 0);
__decorate([
    ViewChild(FormHelper, { static: false })
], LinkModal.prototype, "formHelper", void 0);
LinkModal = LinkModal_1 = __decorate([
    Component({
        template: `
        <ion-header>
            
            <ion-toolbar>

                <ionx-buttons slot="start">

                    <ion-button fill="clear" color="primary" (click)="close()">
                        <ion-icon name="close" slot="icon-only"></ion-icon>
                    </ion-button>

                </ionx-buttons>
                
                <ion-title style="margin: 0; padding: 0;">{{"@co.mmons/ionic-extensions/html-editor#link/Link" | intlMessage}}</ion-title>

                <ionx-buttons slot="end">

                    <ion-button fill="clear" color="dark" (click)="unlink()" *ngIf="existing">
                        <ion-icon name="trash" slot="start"></ion-icon>
                        <ion-label>{{"@co.mmons/ionic-extensions/html-editor#link/Unlink" | intlMessage}}</ion-label>
                    </ion-button>

                    <ion-button fill="clear" color="primary" (click)="ok()">
                        <ion-icon name="checkmark" slot="start"></ion-icon>
                        <ion-label>{{"@co.mmons/js-intl#Done" | intlMessage}}</ion-label>
                    </ion-button>
                    
                </ionx-buttons>
                
            </ion-toolbar>
            
        </ion-header>
        <ion-content>
            
            <form ionx-form-helper [formGroup]="form">
                
                <ion-grid>
                    
                    <ion-row>
                        
                        <ion-col [sizeXs]="12">
                            
                            <ionx-form-item>

                                <ion-item>
                                    <ion-label position="stacked">{{"@co.mmons/ionic-extensions/html-editor#link/Link type" | intlMessage}}</ion-label>
                                    <ionx-select required [compareAsString]="true" formControlName="type">
                                        <ionx-select-option *ngFor="let type of types" [value]="type">{{type.label | intlMessage}}</ionx-select-option>
                                    </ionx-select>
                                </ion-item>
    
                            </ionx-form-item>
                            
                        </ion-col>

                        <ion-col [sizeXs]="12">
                            
                            <ionx-form-item>
    
                                <ion-item>
                                    <ion-label position="stacked">{{(form.controls['type'].value.inputLabel || "@co.mmons/ionic-extensions/html-editor#link/Link") | intlMessage}}</ion-label>
                                    <ion-input formControlName="link" type="form.controls['type'].value.inputType"></ion-input>
                                </ion-item>
                                
                                <ionx-form-item-error control="link" markedAs="dirty"></ionx-form-item-error>
                                
                                <ionx-form-item-hint *ngIf="form.controls['type'].value.inputHint">
                                    <span [innerHTML]="form.controls['type'].value.inputHint | intlMessage"></span>
                                </ionx-form-item-hint>

                            </ionx-form-item>

                        </ion-col>
                        
                    </ion-row>
                    
                    
                </ion-grid>
                
            </form>
            
        </ion-content>
    `,
        styles: [`:host ion-item:not(.ion-dirty) { --highlight-height: 0px; }`]
    })
], LinkModal);

let InsertMenu = class InsertMenu {
    // @ts-ignore
    constructor(popoverController, modalController) {
        this.popoverController = popoverController;
        this.modalController = modalController;
    }
    insertLink() {
        return __awaiter(this, void 0, void 0, function* () {
            this.popoverController.dismiss(undefined, "link");
            LinkModal.present(this.modalController, this.editor);
        });
    }
    insertYoutube() {
        return __awaiter(this, void 0, void 0, function* () {
            this.inputView = "youtube";
            yield waitTill(() => !!this.youtubeInput, undefined, 2000);
            this.youtubeInput.setFocus();
        });
    }
    // @ts-ignore
    parseYoutube(value) {
        // https://www.youtube.com/watch?v=NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc
        // https://www.youtube.com/embed/NqMgaHUNSQc
        // https://www.youtube-nocookie.com/embed/NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc?t=17
        value = value.replace("-nocookie.com/", ".com/");
        value = value.replace("/embed/", "/");
        value = value.replace("youtu.be/", "youtube.com/");
        value = value.replace("watch?v=", "");
        value = value.replace("?", "&");
        const info = { id: undefined, start: undefined };
        if (value.indexOf("youtube.com/") > -1) {
            value = value.split("youtube.com/").splice(1, 1)[0];
            for (const param of value.split("&")) {
                if (param.indexOf("=") < 0) {
                    info.id = param;
                }
                else if (param.startsWith("t=")) {
                    info.start = param.substring(2);
                }
                else if (param.startsWith("start=")) {
                    info.start = param.substring(6);
                }
            }
        }
        else {
        }
        if (info.id) {
            return info;
        }
    }
    applyYoutube() {
        const info = this.parseYoutube(this.youtubeInput.value);
        if (info) {
            const tr = this.editor.state.tr.replaceSelectionWith(this.editor.state.schema.nodes.youtube.create({ id: info.id, start: info.start || 0 }));
            this.editor.view.dispatch(tr);
        }
        this.popoverController.dismiss(undefined, "youtube");
    }
    cancel() {
        this.popoverController.dismiss();
    }
    ngOnInit() {
    }
    ionViewWillLeave(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.inputView && !event.role) {
                this.editor.focus();
            }
        });
    }
    ionViewDidLeave(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.inputView) {
                yield sleep(50);
                this.editor.focus();
            }
            else if (!event.role) {
                this.editor.focus();
            }
        });
    }
};
InsertMenu.ctorParameters = () => [
    { type: PopoverController },
    { type: ModalController }
];
__decorate([
    Input()
], InsertMenu.prototype, "editor", void 0);
__decorate([
    ViewChild("youtubeInput", { static: false })
], InsertMenu.prototype, "youtubeInput", void 0);
InsertMenu = __decorate([
    Component({
        template: `
        <ion-list lines="full">
            
            <ng-template [ngIf]="!inputView">
                
                <ion-item button="true" detail="false" (click)="insertLink()">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#link/Link" | intlMessage}}</ion-label>
                    <ion-icon name="link" slot="start"></ion-icon>
                </ion-item>
    
                <ion-item button="true" detail="false" (click)="insertYoutube()">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#youtube/YouTube video" | intlMessage}}</ion-label>
                    <ion-icon name="logo-youtube" slot="start"></ion-icon>
                </ion-item>
                
            </ng-template>
            
            <ng-template [ngIf]="inputView == 'youtube'">

                <ion-item>
                    <ion-icon name="logo-youtube" slot="start"></ion-icon>
                    <ion-input #youtubeInput [placeholder]="'@co.mmons/ionic-extensions/html-editor#youtube/Paste YouTube video url' | intlMessage" (keydown.enter)="applyYoutube()"></ion-input>
                </ion-item>
                
                <ion-item>
                    <ionx-buttons slot="end">
                        <ion-button fill="clear" color="dark" (click)="cancel()">
                            <ion-label>{{"@co.mmons/js-intl#Cancel" | intlMessage}}</ion-label>
                        </ion-button>
                        
                        <ion-button fill="clear" color="primary" (click)="applyYoutube()">
                            <ion-label>{{"@co.mmons/js-intl#Ok" | intlMessage}}</ion-label>
                        </ion-button>
                    </ionx-buttons>
                </ion-item>
    
            </ng-template>
            
        </ion-list>
    `,
        styles: [`:host ion-list { margin: 0px; padding: 0px }`,
            `:host ion-item:last-child { --border-width: 0px; }`,
            `:host ion-item { --highlight-height: 0px; }`]
    })
], InsertMenu);

const filter = (predicates, cmd) => {
    return function (state, dispatch, view) {
        if (!Array.isArray(predicates)) {
            predicates = [predicates];
        }
        if (predicates.some(pred => !pred(state, view))) {
            return false;
        }
        return cmd(state, dispatch, view) || false;
    };
};

const isEmptySelectionAtStart = (state) => {
    const { empty, $from } = state.selection;
    return (empty &&
        ($from.parentOffset === 0 || state.selection instanceof GapCursor));
};

const isFirstChildOfParent = (state) => {
    const { $from } = state.selection;
    return $from.depth > 1
        ? (state.selection instanceof GapCursor &&
            $from.parentOffset === 0) ||
            $from.index($from.depth - 1) === 0
        : true;
};

/**
 * Checks if node is an empty paragraph.
 */
function isEmptyParagraph(node) {
    return (!node ||
        (node.type.name === "paragraph" && !node.textContent && !node.childCount));
}
/**
 * Returns false if node contains only empty inline nodes and hardBreaks.
 */
function hasVisibleContent(node) {
    const isInlineNodeHasVisibleContent = (inlineNode) => {
        return inlineNode.isText
            ? !!inlineNode.textContent.trim()
            : inlineNode.type.name !== "hardBreak";
    };
    if (node.isInline) {
        return isInlineNodeHasVisibleContent(node);
    }
    else if (node.isBlock && (node.isLeaf || node.isAtom)) {
        return true;
    }
    else if (!node.childCount) {
        return false;
    }
    for (let index = 0; index < node.childCount; index++) {
        const child = node.child(index);
        if (hasVisibleContent(child)) {
            return true;
        }
    }
    return false;
}
/**
 * Checks if a node has any content. Ignores node that only contain empty block nodes.
 */
function isNodeEmpty(node) {
    if (node && node.textContent) {
        return false;
    }
    if (!node ||
        !node.childCount ||
        (node.childCount === 1 && isEmptyParagraph(node.firstChild))) {
        return true;
    }
    const block = [];
    const nonBlock = [];
    node.forEach(child => {
        child.isInline ? nonBlock.push(child) : block.push(child);
    });
    return (!nonBlock.length &&
        !block.filter(childNode => (!!childNode.childCount &&
            !(childNode.childCount === 1 && isEmptyParagraph(childNode.firstChild))) ||
            childNode.isAtom).length);
}
/**
 * Checks if a node looks like an empty document
 */
function isEmptyDocument(node) {
    const nodeChild = node.content.firstChild;
    if (node.childCount !== 1 || !nodeChild) {
        return false;
    }
    return (nodeChild.type.name === "paragraph" &&
        !nodeChild.childCount &&
        nodeChild.nodeSize === 2 &&
        (!nodeChild.marks || nodeChild.marks.length === 0));
}
const getStepRange = (transaction) => {
    let from = -1;
    let to = -1;
    transaction.steps.forEach(step => {
        step.getMap().forEach((_oldStart, _oldEnd, newStart, newEnd) => {
            from = newStart < from || from === -1 ? newStart : from;
            to = newEnd < to || to === -1 ? newEnd : to;
        });
    });
    if (from !== -1) {
        return { from, to };
    }
    return null;
};
/**
 * Find the farthest node given a condition
 * @param predicate Function to check the node
 */
const findFarthestParentNode = (predicate) => (selection) => {
    const { $from } = selection;
    let candidate = null;
    for (let i = $from.depth; i > 0; i--) {
        const node = $from.node(i);
        if (predicate(node)) {
            candidate = {
                pos: i > 0 ? $from.before(i) : 0,
                start: $from.start(i),
                depth: i,
                node,
            };
        }
    }
    return candidate;
};
const isSelectionEndOfParagraph = (state) => state.selection.$to.parent.type === state.schema.nodes.paragraph &&
    state.selection.$to.pos === state.doc.resolve(state.selection.$to.pos).end();
function nodesBetweenChanged(tr, f, startPos) {
    const stepRange = getStepRange(tr);
    if (!stepRange) {
        return;
    }
    tr.doc.nodesBetween(stepRange.from, stepRange.to, f, startPos);
}
function getNodesCount(node) {
    const count = {};
    node.nodesBetween(0, node.nodeSize - 2, node => {
        count[node.type.name] = (count[node.type.name] || 0) + 1;
    });
    return count;
}

function liftListItem(state, selection, tr) {
    const { $from, $to } = selection;
    const nodeType = state.schema.nodes.listItem;
    let range = $from.blockRange($to, node => !!node.childCount &&
        !!node.firstChild &&
        node.firstChild.type === nodeType);
    if (!range ||
        range.depth < 2 ||
        $from.node(range.depth - 1).type !== nodeType) {
        return tr;
    }
    const end = range.end;
    const endOfList = $to.end(range.depth);
    if (end < endOfList) {
        tr.step(new ReplaceAroundStep(end - 1, endOfList, end, endOfList, new Slice(Fragment.from(nodeType.create(undefined, range.parent.copy())), 1, 0), 1, true));
        range = new NodeRange(tr.doc.resolve($from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    return tr.lift(range, liftTarget(range)).scrollIntoView();
}
function liftFollowingList(state, from, to, rootListDepth, tr) {
    const { listItem } = state.schema.nodes;
    let lifted = false;
    tr.doc.nodesBetween(from, to, (node, pos) => {
        if (!lifted && node.type === listItem && pos > from) {
            lifted = true;
            let listDepth = rootListDepth + 3;
            while (listDepth > rootListDepth + 2) {
                const start = tr.doc.resolve(tr.mapping.map(pos));
                listDepth = start.depth;
                const end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
                const sel = new TextSelection(start, end);
                tr = liftListItem(state, sel, tr);
            }
        }
    });
    return tr;
}

// This will return (depth - 1) for root list parent of a list.
const getListLiftTarget = (schema, resPos) => {
    let target = resPos.depth;
    const { bulletList, orderedList, listItem } = schema.nodes;
    for (let i = resPos.depth; i > 0; i--) {
        const node = resPos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            target = i;
        }
        if (node.type !== bulletList &&
            node.type !== orderedList &&
            node.type !== listItem) {
            break;
        }
    }
    return target - 1;
};

// The function will list paragraphs in selection out to level 1 below root list.
function liftSelectionList(state, tr) {
    const { from, to } = state.selection;
    const { paragraph } = state.schema.nodes;
    const listCol = [];
    tr.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type === paragraph) {
            listCol.push({ node, pos });
        }
    });
    for (let i = listCol.length - 1; i >= 0; i--) {
        const paragraph = listCol[i];
        const start = tr.doc.resolve(tr.mapping.map(paragraph.pos));
        if (start.depth > 0) {
            let end;
            if (paragraph.node.textContent && paragraph.node.textContent.length > 0) {
                end = tr.doc.resolve(tr.mapping.map(paragraph.pos + paragraph.node.textContent.length));
            }
            else {
                end = tr.doc.resolve(tr.mapping.map(paragraph.pos + 1));
            }
            const range = start.blockRange(end);
            if (range) {
                tr.lift(range, getListLiftTarget(state.schema, start));
            }
        }
    }
    return tr;
}

const isMarkAllowedInRange = (doc, ranges, type) => {
    for (let i = 0; i < ranges.length; i++) {
        const { $from, $to } = ranges[i];
        let can = $from.depth === 0 ? doc.type.allowsMarkType(type) : false;
        doc.nodesBetween($from.pos, $to.pos, node => {
            if (can) {
                return false;
            }
            can = node.inlineContent && node.type.allowsMarkType(type);
            return;
        });
        if (can) {
            return can;
        }
    }
    return false;
};
const isMarkExcluded = (type, marks) => {
    if (marks) {
        return marks.some(mark => mark.type !== type && mark.type.excludes(type));
    }
    return false;
};
const not = (fn) => (arg) => !fn(arg);
const ɵ0$3 = not;
const removeBlockMarks = (state, marks) => {
    const { selection, schema } = state;
    let { tr } = state;
    // Marks might not exist in Schema
    const marksToRemove = marks.filter(Boolean);
    if (marksToRemove.length === 0) {
        return undefined;
    }
    /** Saves an extra dispatch */
    let blockMarksExists = false;
    const hasMark = (mark) => marksToRemove.indexOf(mark.type) > -1;
    /**
     * When you need to toggle the selection
     * when another type which does not allow alignment is applied
     */
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
        if (node.type === schema.nodes.paragraph && node.marks.some(hasMark)) {
            blockMarksExists = true;
            const resolvedPos = state.doc.resolve(pos);
            const withoutBlockMarks = node.marks.filter(not(hasMark));
            tr = tr.setNodeMarkup(resolvedPos.pos, undefined, node.attrs, withoutBlockMarks);
        }
    });
    return blockMarksExists ? tr : undefined;
};
/**
 * Removes marks from nodes in the current selection that are not supported
 */
const sanitizeSelectionMarks = (state) => {
    let tr;
    const { $from, $to } = state.tr.selection;
    state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
        node.marks.forEach(mark => {
            if (!node.type.allowsMarkType(mark.type)) {
                const filteredMarks = node.marks.filter(m => m.type !== mark.type);
                const position = pos > 0 ? pos - 1 : 0;
                tr = (tr || state.tr).setNodeMarkup(position, undefined, node.attrs, filteredMarks);
            }
        });
    });
    return tr;
};

const ZeroWidthSpace = "\u200b";
function validateNode(_node) {
    return false;
}
function isMarkTypeCompatibleWithMark(markType, mark) {
    return !mark.type.excludes(markType) && !markType.excludes(mark.type);
}
function isMarkTypeAllowedInNode(markType, state) {
    return toggleMark(markType)(state);
}
function closest(node, s) {
    let el = node;
    if (!el) {
        return null;
    }
    if (!document.documentElement || !document.documentElement.contains(el)) {
        return null;
    }
    const matches = el.matches ? "matches" : "msMatchesSelector";
    do {
        // @ts-ignore
        if (el[matches] && el[matches](s)) {
            return el;
        }
        el = (el.parentElement || el.parentNode);
    } while (el !== null && el.nodeType === 1);
    return null;
}
const isImage = (fileType) => {
    return (!!fileType &&
        (fileType.indexOf("image/") > -1 || fileType.indexOf("video/") > -1));
};
function canMoveUp(state) {
    const { selection, doc } = state;
    /**
     * If there"s a media element on the selection,
     * add text blocks with arrow navigation.
     * Also, the selection could be media | mediaGroup.
     */
    if (selection instanceof NodeSelection) {
        if (selection.node.type.name === "media") {
            /** Weird way of checking if the previous element is a paragraph */
            const mediaAncestorNode = doc.nodeAt(selection.anchor - 3);
            return !!(mediaAncestorNode && mediaAncestorNode.type.name === "paragraph");
        }
        else if (selection.node.type.name === "mediaGroup") {
            const mediaGroupAncestorNode = selection.$anchor.nodeBefore;
            return !!(mediaGroupAncestorNode &&
                mediaGroupAncestorNode.type.name === "paragraph");
        }
    }
    if (selection instanceof TextSelection) {
        if (!selection.empty) {
            return true;
        }
    }
    return !atTheBeginningOfDoc(state);
}
function canMoveDown(state) {
    const { selection, doc } = state;
    /**
     * If there"s a media element on the selection,
     * add text blocks with arrow navigation.
     * Also, the selection could be media | mediaGroup.
     */
    if (selection instanceof NodeSelection) {
        if (selection.node.type.name === "media") {
            const nodeAfter = doc.nodeAt(selection.$head.after());
            return !!(nodeAfter && nodeAfter.type.name === "paragraph");
        }
        else if (selection.node.type.name === "mediaGroup") {
            return !(selection.$head.parentOffset === selection.$anchor.parent.content.size);
        }
    }
    if (selection instanceof TextSelection) {
        if (!selection.empty) {
            return true;
        }
    }
    return !atTheEndOfDoc(state);
}
function isSelectionInsideLastNodeInDocument(selection) {
    const docNode = selection.$anchor.node(0);
    const rootNode = selection.$anchor.node(1);
    return docNode.lastChild === rootNode;
}
function atTheEndOfDoc(state) {
    const { selection, doc } = state;
    return doc.nodeSize - selection.$to.pos - 2 === selection.$to.depth;
}
function atTheBeginningOfDoc(state) {
    const { selection } = state;
    return selection.$from.pos === selection.$from.depth;
}
function atTheEndOfBlock(state) {
    const { selection } = state;
    const { $to } = selection;
    if (selection instanceof GapCursor) {
        return false;
    }
    if (selection instanceof NodeSelection && selection.node.isBlock) {
        return true;
    }
    return endPositionOfParent($to) === $to.pos + 1;
}
function atTheBeginningOfBlock(state) {
    const { selection } = state;
    const { $from } = selection;
    if (selection instanceof GapCursor) {
        return false;
    }
    if (selection instanceof NodeSelection && selection.node.isBlock) {
        return true;
    }
    return startPositionOfParent($from) === $from.pos;
}
function startPositionOfParent(resolvedPos) {
    return resolvedPos.start(resolvedPos.depth);
}
function endPositionOfParent(resolvedPos) {
    return resolvedPos.end(resolvedPos.depth) + 1;
}
function getCursor(selection) {
    return selection.$cursor || undefined;
}
/**
 * Check if a mark is allowed at the current selection / cursor based on a given state.
 * This method looks at both the currently active marks on the transaction, as well as
 * the node and marks at the current selection to determine if the given mark type is
 * allowed.
 */
function isMarkTypeAllowedInCurrentSelection(markType, state) {
    if (!isMarkTypeAllowedInNode(markType, state)) {
        return false;
    }
    const { empty, $cursor, ranges } = state.selection;
    if (empty && !$cursor) {
        return false;
    }
    const isCompatibleMarkType = (mark) => isMarkTypeCompatibleWithMark(markType, mark);
    // Handle any new marks in the current transaction
    if (state.tr.storedMarks &&
        !state.tr.storedMarks.every(isCompatibleMarkType)) {
        return false;
    }
    if ($cursor) {
        return $cursor.marks().every(isCompatibleMarkType);
    }
    // Check every node in a selection - ensuring that it is compatible with the current mark type
    return ranges.every(({ $from, $to }) => {
        let allowedInActiveMarks = $from.depth === 0 ? state.doc.marks.every(isCompatibleMarkType) : true;
        state.doc.nodesBetween($from.pos, $to.pos, node => {
            allowedInActiveMarks =
                allowedInActiveMarks && node.marks.every(isCompatibleMarkType);
        });
        return allowedInActiveMarks;
    });
}
/**
 * Step through block-nodes between $from and $to and returns false if a node is
 * found that isn"t of the specified type
 */
function isRangeOfType(doc, $from, $to, nodeType) {
    return (getAncestorNodesBetween(doc, $from, $to).filter(node => node.type !== nodeType).length === 0);
}
function createSliceWithContent(content, state) {
    return new Slice(Fragment.from(state.schema.text(content)), 0, 0);
}
/**
 * Determines if content inside a selection can be joined with the next block.
 * We need this check since the built-in method for "joinDown" will join a orderedList with bulletList.
 */
function canJoinDown(selection, doc, nodeType) {
    return checkNodeDown(selection, doc, node => node.type === nodeType);
}
function checkNodeDown(selection, doc, filter) {
    const res = doc.resolve(selection.$to.after(findAncestorPosition(doc, selection.$to).depth));
    return res.nodeAfter ? filter(res.nodeAfter) : false;
}
const setNodeSelection = (view, pos) => {
    const { state, dispatch } = view;
    if (!isFinite(pos)) {
        return;
    }
    const tr = state.tr.setSelection(NodeSelection.create(state.doc, pos));
    dispatch(tr);
};
function setTextSelection(view, anchor, head) {
    const { state } = view;
    const tr = state.tr.setSelection(TextSelection.create(state.doc, anchor, head));
    view.dispatch(tr);
}
/**
 * Determines if content inside a selection can be joined with the previous block.
 * We need this check since the built-in method for "joinUp" will join a orderedList with bulletList.
 */
function canJoinUp(selection, doc, nodeType) {
    const res = doc.resolve(selection.$from.before(findAncestorPosition(doc, selection.$from).depth));
    return res.nodeBefore && res.nodeBefore.type === nodeType;
}
/**
 * Returns all top-level ancestor-nodes between $from and $to
 */
function getAncestorNodesBetween(doc, $from, $to) {
    const nodes = Array();
    const maxDepth = findAncestorPosition(doc, $from).depth;
    let current = doc.resolve($from.start(maxDepth));
    while (current.pos <= $to.start($to.depth)) {
        const depth = Math.min(current.depth, maxDepth);
        const node = current.node(depth);
        if (node) {
            nodes.push(node);
        }
        if (depth === 0) {
            break;
        }
        let next = doc.resolve(current.after(depth));
        if (next.start(depth) >= doc.nodeSize - 2) {
            break;
        }
        if (next.depth !== current.depth) {
            next = doc.resolve(next.pos + 2);
        }
        if (next.depth) {
            current = doc.resolve(next.start(next.depth));
        }
        else {
            current = doc.resolve(next.end(next.depth));
        }
    }
    return nodes;
}
/**
 * Finds all "selection-groups" within a range. A selection group is based on ancestors.
 *
 * Example:
 * Given the following document and selection ({<} = start of selection and {>} = end)
 *  doc
 *    blockquote
 *      ul
 *        li
 *        li{<}
 *        li
 *     p
 *     p{>}
 *
 * The output will be two selection-groups. One within the ul and one with the two paragraphs.
 */
function getGroupsInRange(doc, $from, $to, isNodeValid = validateNode) {
    const groups = Array();
    const commonAncestor = hasCommonAncestor(doc, $from, $to);
    const fromAncestor = findAncestorPosition(doc, $from);
    if (commonAncestor ||
        (fromAncestor.depth === 1 && isNodeValid($from.node(1)))) {
        groups.push({ $from, $to });
    }
    else {
        let current = $from;
        while (current.pos < $to.pos) {
            let ancestorPos = findAncestorPosition(doc, current);
            while (ancestorPos.depth > 1) {
                ancestorPos = findAncestorPosition(doc, ancestorPos);
            }
            const endPos = doc.resolve(Math.min(
            // should not be smaller then start position in case of an empty paragraph for example.
            Math.max(ancestorPos.start(ancestorPos.depth), ancestorPos.end(ancestorPos.depth) - 3), $to.pos));
            groups.push({
                $from: current,
                $to: endPos,
            });
            current = doc.resolve(Math.min(endPos.after(1) + 1, doc.nodeSize - 2));
        }
    }
    return groups;
}
/**
 * Traverse the document until an "ancestor" is found. Any nestable block can be an ancestor.
 */
function findAncestorPosition(doc, pos) {
    const nestableBlocks = ["blockquote", "bulletList", "orderedList"];
    if (pos.depth === 1) {
        return pos;
    }
    let node = pos.node(pos.depth);
    let newPos = pos;
    while (pos.depth >= 1) {
        pos = doc.resolve(pos.before(pos.depth));
        node = pos.node(pos.depth);
        if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
            newPos = pos;
        }
    }
    return newPos;
}
/**
 * Determine if two positions have a common ancestor.
 */
function hasCommonAncestor(doc, $from, $to) {
    let current;
    let target;
    if ($from.depth > $to.depth) {
        current = findAncestorPosition(doc, $from);
        target = findAncestorPosition(doc, $to);
    }
    else {
        current = findAncestorPosition(doc, $to);
        target = findAncestorPosition(doc, $from);
    }
    while (current.depth > target.depth && current.depth > 1) {
        current = findAncestorPosition(doc, current);
    }
    return current.node(current.depth) === target.node(target.depth);
}
/**
 * Takes a selection $from and $to and lift all text nodes from their parents to document-level
 */
function liftSelection(tr, doc, $from, $to) {
    let startPos = $from.start($from.depth);
    let endPos = $to.end($to.depth);
    const target = Math.max(0, findAncestorPosition(doc, $from).depth - 1);
    tr.doc.nodesBetween(startPos, endPos, (node, pos) => {
        if (node.isText || // Text node
            (node.isTextblock && !node.textContent) // Empty paragraph
        ) {
            const res = tr.doc.resolve(tr.mapping.map(pos));
            const sel = new NodeSelection(res);
            const range = sel.$from.blockRange(sel.$to);
            if (liftTarget(range) !== undefined) {
                tr.lift(range, target);
            }
        }
    });
    startPos = tr.mapping.map(startPos);
    endPos = tr.mapping.map(endPos);
    endPos = tr.doc.resolve(endPos).end(tr.doc.resolve(endPos).depth); // We want to select the entire node
    tr.setSelection(new TextSelection(tr.doc.resolve(startPos), tr.doc.resolve(endPos)));
    return {
        tr: tr,
        $from: tr.doc.resolve(startPos),
        $to: tr.doc.resolve(endPos),
    };
}
/**
 * Lift nodes in block to one level above.
 */
function liftSiblingNodes(view) {
    const { tr } = view.state;
    const { $from, $to } = view.state.selection;
    const blockStart = tr.doc.resolve($from.start($from.depth - 1));
    const blockEnd = tr.doc.resolve($to.end($to.depth - 1));
    const range = blockStart.blockRange(blockEnd);
    view.dispatch(tr.lift(range, blockStart.depth - 1));
}
/**
 * Lift sibling nodes to document-level and select them.
 */
function liftAndSelectSiblingNodes(view) {
    const { tr } = view.state;
    const { $from, $to } = view.state.selection;
    const blockStart = tr.doc.resolve($from.start($from.depth - 1));
    const blockEnd = tr.doc.resolve($to.end($to.depth - 1));
    // TODO: [ts30] handle void and null properly
    const range = blockStart.blockRange(blockEnd);
    tr.setSelection(new TextSelection(blockStart, blockEnd));
    tr.lift(range, blockStart.depth - 1);
    return tr;
}
function wrapIn(nodeType, tr, $from, $to) {
    const range = $from.blockRange($to);
    const wrapping = range && findWrapping(range, nodeType);
    if (wrapping) {
        tr = tr.wrap(range, wrapping).scrollIntoView();
    }
    return tr;
}
/**
 * Repeating string for multiple times
 */
function stringRepeat(text, length) {
    let result = "";
    for (let x = 0; x < length; x++) {
        result += text;
    }
    return result;
}
/**
 * A replacement for `Array.from` until it becomes widely implemented.
 */
function arrayFrom(obj) {
    return Array.prototype.slice.call(obj);
}
/**
 * Replacement for Element.closest, until it becomes widely implemented
 * Returns the ancestor element of a particular type if exists or null
 */
function closestElement(node, s) {
    return closest(node, s);
}
/*
 * From Modernizr
 * Returns the kind of transitionevent available for the element
 */
function whichTransitionEvent() {
    const el = document.createElement("fakeelement");
    const transitions = {
        transition: "transitionend",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
    };
    for (const t in transitions) {
        if (el.style[t] !== undefined) {
            // Use a generic as the return type because TypeScript doesnt know
            // about cross browser features, so we cast here to align to the
            // standard Event spec and propagate the type properly to the callbacks
            // of `addEventListener` and `removeEventListener`.
            return transitions[t];
        }
    }
    return;
}
/**
 * Function will create a list of wrapper blocks present in a selection.
 */
function getSelectedWrapperNodes(state) {
    const nodes = [];
    if (state.selection) {
        const { $from, $to } = state.selection;
        const { blockquote, panel, orderedList, bulletList, listItem, codeBlock, } = state.schema.nodes;
        state.doc.nodesBetween($from.pos, $to.pos, node => {
            if ((node.isBlock &&
                [blockquote, panel, orderedList, bulletList, listItem].indexOf(node.type) >= 0) ||
                node.type === codeBlock) {
                nodes.push(node.type);
            }
        });
    }
    return nodes;
}
/**
 * Function will check if changing block types: Paragraph, Heading is enabled.
 */
function areBlockTypesDisabled(state) {
    const nodesTypes = getSelectedWrapperNodes(state);
    const { panel } = state.schema.nodes;
    return nodesTypes.filter(type => type !== panel).length > 0;
}
const isTemporary = (id) => {
    return id.indexOf("temporary:") === 0;
};
const isEmptyNode = (schema) => {
    const { doc, paragraph, codeBlock, blockquote, panel, heading, listItem, bulletList, orderedList, taskList, taskItem, decisionList, decisionItem, media, mediaGroup, mediaSingle, } = schema.nodes;
    const innerIsEmptyNode = (node) => {
        switch (node.type) {
            case media:
            case mediaGroup:
            case mediaSingle:
                return false;
            case paragraph:
            case codeBlock:
            case heading:
            case taskItem:
            case decisionItem:
                return node.content.size === 0;
            case blockquote:
            case panel:
            case listItem:
                return (node.content.size === 2 && innerIsEmptyNode(node.content.firstChild));
            case bulletList:
            case orderedList:
                return (node.content.size === 4 && innerIsEmptyNode(node.content.firstChild));
            case taskList:
            case decisionList:
                return (node.content.size === 2 && innerIsEmptyNode(node.content.firstChild));
            case doc:
                let isEmpty = true;
                node.content.forEach(child => {
                    isEmpty = isEmpty && innerIsEmptyNode(child);
                });
                return isEmpty;
            default:
                return isNodeEmpty(node);
        }
    };
    return innerIsEmptyNode;
};
const insideTable = (state) => {
    const { table, tableCell } = state.schema.nodes;
    return hasParentNodeOfType([table, tableCell])(state.selection);
};
const insideTableCell = (state) => {
    const { tableCell, tableHeader } = state.schema.nodes;
    return hasParentNodeOfType([tableCell, tableHeader])(state.selection);
};
const isElementInTableCell = (element) => {
    return closest(element, "td") || closest(element, "th");
};
const isLastItemMediaGroup = (node) => {
    const { content } = node;
    return !!content.lastChild && content.lastChild.type.name === "mediaGroup";
};
const isInListItem = (state) => {
    return hasParentNodeOfType(state.schema.nodes.listItem)(state.selection);
};
const hasOpenEnd = (slice) => {
    return slice.openStart > 0 || slice.openEnd > 0;
};
function filterChildrenBetween(doc, from, to, predicate) {
    const results = [];
    doc.nodesBetween(from, to, (node, pos, parent) => {
        if (predicate(node, pos, parent)) {
            results.push({ node, pos });
        }
    });
    return results;
}
function dedupe(list = [], iteratee) {
    const transformed = iteratee ? list.map(iteratee) : list;
    return transformed
        .map((item, index, list) => (list.indexOf(item) === index ? item : null))
        .reduce((acc, item, index) => (!!item ? acc.concat(list[index]) : acc), []);
}
const isTextSelection = (selection) => selection instanceof TextSelection;
/**
 * Compose 1 to n functions.
 * @param func first function
 * @param funcs additional functions
 */
function compose(func, ...funcs) {
    const allFuncs = [func, ...funcs];
    return function composed(raw) {
        return allFuncs.reduceRight((memo, func) => func(memo), raw);
    };
}
// rest
function pipe(...fns) {
    if (fns.length === 0) {
        return (a) => a;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return fns.reduce((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)));
}
const normaliseNestedLayout = (state, node) => {
    if (state.selection.$from.depth > 1) {
        if (node.attrs.layout && node.attrs.layout !== "default") {
            return node.type.createChecked(Object.assign({}, node.attrs, { layout: "default" }), node.content, node.marks);
        }
        // If its a breakout layout, we can remove the mark
        // Since default isn"t a valid breakout mode.
        const breakoutMark = state.schema.marks.breakout;
        if (breakoutMark && breakoutMark.isInSet(node.marks)) {
            const newMarks = breakoutMark.removeFromSet(node.marks);
            return node.type.createChecked(node.attrs, node.content, newMarks);
        }
    }
    return node;
};

function findCutBefore($pos) {
    // parent is non-isolating, so we can look across this boundary
    if (!$pos.parent.type.spec.isolating) {
        // search up the tree from the pos"s *parent*
        for (let i = $pos.depth - 1; i >= 0; i--) {
            // starting from the inner most node"s parent, find out
            // if we"re not its first child
            if ($pos.index(i) > 0) {
                return $pos.doc.resolve($pos.before(i + 1));
            }
            if ($pos.node(i).type.spec.isolating) {
                break;
            }
        }
    }
    return null;
}

const maxIndentation = 5;
const deletePreviousEmptyListItem = (state, dispatch) => {
    const { $from } = state.selection;
    const { listItem } = state.schema.nodes;
    const $cut = findCutBefore($from);
    if (!$cut || !$cut.nodeBefore || !($cut.nodeBefore.type === listItem)) {
        return false;
    }
    const previousListItemEmpty = $cut.nodeBefore.childCount === 1 && $cut.nodeBefore.firstChild && $cut.nodeBefore.firstChild.nodeSize <= 2;
    if (previousListItemEmpty) {
        const { tr } = state;
        if (dispatch) {
            dispatch(tr
                .delete($cut.pos - $cut.nodeBefore.nodeSize, $from.pos)
                .scrollIntoView());
        }
        return true;
    }
    return false;
};
const ɵ0$4 = deletePreviousEmptyListItem;
const joinToPreviousListItem = (state, dispatch) => {
    const { $from } = state.selection;
    const { paragraph, listItem, codeBlock, bulletList, orderedList, } = state.schema.nodes;
    const isGapCursorShown = state.selection instanceof GapCursor;
    const $cutPos = isGapCursorShown ? state.doc.resolve($from.pos + 1) : $from;
    const $cut = findCutBefore($cutPos);
    if (!$cut) {
        return false;
    }
    // see if the containing node is a list
    if ($cut.nodeBefore &&
        [bulletList, orderedList].indexOf($cut.nodeBefore.type) > -1) {
        // and the node after this is a paragraph or a codeBlock
        if ($cut.nodeAfter &&
            ($cut.nodeAfter.type === paragraph || $cut.nodeAfter.type === codeBlock)) {
            // find the nearest paragraph that precedes this node
            let $lastNode = $cut.doc.resolve($cut.pos - 1);
            while ($lastNode.parent.type !== paragraph) {
                $lastNode = state.doc.resolve($lastNode.pos - 1);
            }
            let { tr } = state;
            if (isGapCursorShown) {
                const nodeBeforePos = findPositionOfNodeBefore(tr.selection);
                if (typeof nodeBeforePos !== "number") {
                    return false;
                }
                // append the codeblock to the list node
                const list = $cut.nodeBefore.copy($cut.nodeBefore.content.append(Fragment.from(listItem.createChecked({}, $cut.nodeAfter))));
                tr.replaceWith(nodeBeforePos, $from.pos + $cut.nodeAfter.nodeSize, list);
            }
            else {
                // take the text content of the paragraph and insert after the paragraph up until before the the cut
                tr = state.tr.step(new ReplaceAroundStep($lastNode.pos, $cut.pos + $cut.nodeAfter.nodeSize, $cut.pos + 1, $cut.pos + $cut.nodeAfter.nodeSize - 1, state.tr.doc.slice($lastNode.pos, $cut.pos), 0, true));
            }
            // find out if there"s now another list following and join them
            // as in, [list, p, list] => [list with p, list], and we want [joined list]
            const $postCut = tr.doc.resolve(tr.mapping.map($cut.pos + $cut.nodeAfter.nodeSize));
            if ($postCut.nodeBefore &&
                $postCut.nodeAfter &&
                $postCut.nodeBefore.type === $postCut.nodeAfter.type &&
                [bulletList, orderedList].indexOf($postCut.nodeBefore.type) > -1) {
                tr = tr.join($postCut.pos);
            }
            if (dispatch) {
                dispatch(tr.scrollIntoView());
            }
            return true;
        }
    }
    return false;
};
const ɵ1$1 = joinToPreviousListItem;
const isInsideListItem = (state) => {
    const { $from } = state.selection;
    const { listItem, paragraph } = state.schema.nodes;
    if (state.selection instanceof GapCursor) {
        return $from.parent.type === listItem;
    }
    return (hasParentNodeOfType(listItem)(state.selection) &&
        $from.parent.type === paragraph);
};
const ɵ2$1 = isInsideListItem;
const canToJoinToPreviousListItem = (state) => {
    const { $from } = state.selection;
    const { bulletList, orderedList } = state.schema.nodes;
    const $before = state.doc.resolve($from.pos - 1);
    let nodeBefore = $before ? $before.nodeBefore : null;
    if (state.selection instanceof GapCursor) {
        nodeBefore = $from.nodeBefore;
    }
    return (!!nodeBefore && [bulletList, orderedList].indexOf(nodeBefore.type) > -1);
};
const ɵ3 = canToJoinToPreviousListItem;
const canOutdent = (state) => {
    const { parent } = state.selection.$from;
    const { listItem, paragraph } = state.schema.nodes;
    if (state.selection instanceof GapCursor) {
        return parent.type === listItem;
    }
    return (parent.type === paragraph && hasParentNodeOfType(listItem)(state.selection));
};
const ɵ4 = canOutdent;
const enterKeyCommand = (state, dispatch) => {
    const { selection } = state;
    if (selection.empty) {
        const { $from } = selection;
        const { listItem, codeBlock } = state.schema.nodes;
        const node = $from.node($from.depth);
        const wrapper = $from.node($from.depth - 1);
        if (wrapper && wrapper.type === listItem) {
            /** Check if the wrapper has any visible content */
            const wrapperHasContent = hasVisibleContent(wrapper);
            if (isNodeEmpty(node) && !wrapperHasContent) {
                return outdentList()(state, dispatch);
            }
            else if (!hasParentNodeOfType(codeBlock)(selection)) {
                return splitListItem(listItem)(state, dispatch);
            }
        }
    }
    return false;
};
const backspaceKeyCommand = chainCommands(
// if we"re at the start of a list item, we need to either backspace
// directly to an empty list item above, or outdent this node
filter([
    isEmptySelectionAtStart,
    // list items might have multiple paragraphs; only do this at the first one
    isFirstChildOfParent,
    canOutdent,
], chainCommands(deletePreviousEmptyListItem, outdentList())), 
// if we"re just inside a paragraph node (or gapcursor is shown) and backspace, then try to join
// the text to the previous list item, if one exists
filter([isEmptySelectionAtStart, canToJoinToPreviousListItem], joinToPreviousListItem));
/**
 * Implemetation taken and modified for our needs from PM
 * @param itemType Node
 * Splits the list items, specific implementation take from PM
 */
function splitListItem(itemType) {
    return function (state, dispatch) {
        const ref = state.selection;
        const $from = ref.$from;
        const $to = ref.$to;
        const node = ref.node;
        if ((node && node.isBlock) || $from.depth < 2 || !$from.sameParent($to)) {
            return false;
        }
        const grandParent = $from.node(-1);
        if (grandParent.type !== itemType) {
            return false;
        }
        /** --> The following line changed from the original PM implementation to allow list additions with multiple paragraphs */
        if (grandParent.content.content.length <= 1 &&
            $from.parent.content.size === 0 &&
            !(grandParent.content.size === 0)) {
            // In an empty block. If this is a nested list, the wrapping
            // list item should be split. Otherwise, bail out and let next
            // command handle lifting.
            if ($from.depth === 2 ||
                $from.node(-3).type !== itemType ||
                $from.index(-2) !== $from.node(-2).childCount - 1) {
                return false;
            }
            if (dispatch) {
                let wrap = Fragment.empty;
                const keepItem = $from.index(-1) > 0;
                // Build a fragment containing empty versions of the structure
                // from the outer list item to the parent node of the cursor
                for (let d = $from.depth - (keepItem ? 1 : 2); d >= $from.depth - 3; d--) {
                    wrap = Fragment.from($from.node(d).copy(wrap));
                }
                // Add a second list item with an empty default start node
                wrap = wrap.append(Fragment.from(itemType.createAndFill()));
                const tr$1 = state.tr.replace($from.before(keepItem ? undefined : -1), $from.after(-3), new Slice(wrap, keepItem ? 3 : 2, 2));
                tr$1.setSelection(state.selection.constructor.near(tr$1.doc.resolve($from.pos + (keepItem ? 3 : 2))));
                dispatch(tr$1.scrollIntoView());
            }
            return true;
        }
        const nextType = $to.pos === $from.end()
            ? grandParent.contentMatchAt(0).defaultType
            : undefined;
        const tr = state.tr.delete($from.pos, $to.pos);
        const types = nextType && [undefined, { type: nextType }];
        if (dispatch) {
            dispatch(tr.split($from.pos, 2, types).scrollIntoView());
        }
        return true;
    };
}
/**
 * Merge closest bullet list blocks into one
 */
function mergeLists(listItem, range) {
    return (command) => {
        return (state, dispatch) => command(state, tr => {
            /* we now need to handle the case that we lifted a sublist out,
             * and any listItems at the current level get shifted out to
             * their own new list; e.g.:
             *
             * unorderedList
             *  listItem(A)
             *  listItem
             *    unorderedList
             *      listItem(B)
             *  listItem(C)
             *
             * becomes, after unindenting the first, top level listItem, A:
             *
             * content of A
             * unorderedList
             *  listItem(B)
             * unorderedList
             *  listItem(C)
             *
             * so, we try to merge these two lists if they"re of the same type, to give:
             *
             * content of A
             * unorderedList
             *  listItem(B)
             *  listItem(C)
             */
            const $start = state.doc.resolve(range.start);
            const $end = state.doc.resolve(range.end);
            const $join = tr.doc.resolve(tr.mapping.map(range.end - 1));
            if ($join.nodeBefore &&
                $join.nodeAfter &&
                $join.nodeBefore.type === $join.nodeAfter.type) {
                if ($end.nodeAfter &&
                    $end.nodeAfter.type === listItem &&
                    $end.parent.type === $start.parent.type) {
                    tr.join($join.pos);
                }
            }
            if (dispatch) {
                dispatch(tr.scrollIntoView());
            }
        });
    };
}
function outdentList() {
    return function (state, dispatch) {
        const { listItem } = state.schema.nodes;
        const { $from, $to } = state.selection;
        if (isInsideListItem(state)) {
            // if we"re backspacing at the start of a list item, unindent it
            // take the the range of nodes we might be lifting
            // the predicate is for when you"re backspacing a top level list item:
            // we don"t want to go up past the doc node, otherwise the range
            // to clear will include everything
            const range = $from.blockRange($to, node => node.childCount > 0 && node.firstChild && node.firstChild.type === listItem);
            if (!range) {
                return false;
            }
            return compose(mergeLists(listItem, range), // 2. Check if I need to merge nearest list
            liftListItem$1)(listItem)(state, dispatch);
        }
        return false;
    };
}
/**
 * Check if we can sink the list.
 *
 * @returns true if we can sink the list, false if we reach the max indentation level
 */
function canSink(initialIndentationLevel, state) {
    /*
        - Keep going forward in document until indentation of the node is < than the initial
        - If indentation is EVER > max indentation, return true and don"t sink the list
        */
    let currentIndentationLevel;
    let currentPos = state.tr.selection.$to.pos;
    do {
        const resolvedPos = state.doc.resolve(currentPos);
        currentIndentationLevel = numberNestedLists(resolvedPos, state.schema.nodes);
        if (currentIndentationLevel > maxIndentation) {
            // Cancel sink list.
            // If current indentation less than the initial, it won"t be
            // larger than the max, and the loop will terminate at end of this iteration
            return false;
        }
        currentPos++;
    } while (currentIndentationLevel >= initialIndentationLevel);
    return true;
}
function indentList() {
    return function (state, dispatch) {
        const { listItem } = state.schema.nodes;
        if (isInsideListItem(state)) {
            // Record initial list indentation
            const initialIndentationLevel = numberNestedLists(state.selection.$from, state.schema.nodes);
            if (canSink(initialIndentationLevel, state)) {
                compose(sinkListItem)(listItem)(state, dispatch);
            }
            return true;
        }
        return false;
    };
}
function liftListItems() {
    return function (state, dispatch) {
        const { tr } = state;
        const { $from, $to } = state.selection;
        tr.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            // Following condition will ensure that block types paragraph, heading, codeBlock, blockquote, panel are lifted.
            // isTextblock is true for paragraph, heading, codeBlock.
            if (node.isTextblock ||
                node.type.name === "blockquote" ||
                node.type.name === "panel") {
                const sel = new NodeSelection(tr.doc.resolve(tr.mapping.map(pos)));
                const range = sel.$from.blockRange(sel.$to);
                if (!range || sel.$from.parent.type !== state.schema.nodes.listItem) {
                    return false;
                }
                const target = range && liftTarget(range);
                if (target === undefined || target === null) {
                    return false;
                }
                tr.lift(range, target);
            }
            return;
        });
        if (dispatch) {
            dispatch(tr);
        }
        return true;
    };
}
/**
 * Sometimes a selection in the editor can be slightly offset, for example:
 * it"s possible for a selection to start or end at an empty node at the very end of
 * a line. This isn"t obvious by looking at the editor and it"s likely not what the
 * user intended - so we need to adjust the selection a bit in scenarios like that.
 */
function adjustSelectionInList(doc, selection) {
    const { $from, $to } = selection;
    const isSameLine = $from.pos === $to.pos;
    let startPos = $from.pos;
    const endPos = $to.pos;
    if (isSameLine && startPos === doc.nodeSize - 3) {
        // Line is empty, don"t do anything
        return selection;
    }
    // Selection started at the very beginning of a line and therefor points to the previous line.
    if ($from.nodeBefore && !isSameLine) {
        startPos++;
        let node = doc.nodeAt(startPos);
        while (!node || (node && !node.isText)) {
            startPos++;
            node = doc.nodeAt(startPos);
        }
    }
    if (endPos === startPos) {
        return new TextSelection(doc.resolve(startPos));
    }
    return new TextSelection(doc.resolve(startPos), doc.resolve(endPos));
}
// Get the depth of the nearest ancestor list
const rootListDepth = (pos, nodes) => {
    const { bulletList, orderedList, listItem } = nodes;
    let depth;
    for (let i = pos.depth - 1; i > 0; i--) {
        const node = pos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            depth = i;
        }
        if (node.type !== bulletList &&
            node.type !== orderedList &&
            node.type !== listItem) {
            break;
        }
    }
    return depth;
};
// Returns the number of nested lists that are ancestors of the given selection
const numberNestedLists = (resolvedPos, nodes) => {
    const { bulletList, orderedList } = nodes;
    let count = 0;
    for (let i = resolvedPos.depth - 1; i > 0; i--) {
        const node = resolvedPos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            count += 1;
        }
    }
    return count;
};
const toggleList = (state, dispatch, view, listType) => {
    const { selection } = state;
    const fromNode = selection.$from.node(selection.$from.depth - 2);
    const endNode = selection.$to.node(selection.$to.depth - 2);
    if (!fromNode ||
        fromNode.type.name !== listType ||
        (!endNode || endNode.type.name !== listType)) {
        return toggleListCommand(listType)(state, dispatch, view);
    }
    else {
        const depth = rootListDepth(selection.$to, state.schema.nodes);
        let tr = liftFollowingList(state, selection.$to.pos, selection.$to.end(depth), depth || 0, state.tr);
        tr = liftSelectionList(state, tr);
        dispatch(tr);
        return true;
    }
};
/**
 * Check of is selection is inside a list of the specified type
 */
function isInsideList(state, listType) {
    const { $from } = state.selection;
    const parent = $from.node(-2);
    const grandgrandParent = $from.node(-3);
    return ((parent && parent.type === state.schema.nodes[listType]) ||
        (grandgrandParent && grandgrandParent.type === state.schema.nodes[listType]));
}
function toggleListCommand(listType) {
    return function (state, dispatch, view) {
        if (dispatch) {
            dispatch(state.tr.setSelection(adjustSelectionInList(state.doc, state.selection)));
        }
        if (!view) {
            return false;
        }
        state = view.state;
        const { $from, $to } = state.selection;
        const isRangeOfSingleType = isRangeOfType(state.doc, $from, $to, state.schema.nodes[listType]);
        if (isInsideList(state, listType) && isRangeOfSingleType) {
            // Untoggles list
            return liftListItems()(state, dispatch);
        }
        else {
            // Converts list type e.g. bullet_list -> ordered_list if needed
            if (!isRangeOfSingleType) {
                liftListItems()(state, dispatch);
                state = view.state;
            }
            // Remove any invalid marks that are not supported
            const tr = sanitizeSelectionMarks(state);
            if (tr) {
                if (dispatch) {
                    dispatch(tr);
                }
                state = view.state;
            }
            // Wraps selection in list
            return wrapInList(state.schema.nodes[listType])(state, dispatch);
        }
    };
}
function toggleBulletList(view) {
    return toggleList(view.state, view.dispatch, view, "bulletList");
}
function toggleOrderedList(view) {
    return toggleList(view.state, view.dispatch, view, "orderedList");
}
function wrapInList(nodeType) {
    return autoJoin(wrapInList$1(nodeType), (before, after) => before.type === after.type && before.type === nodeType);
}

let ListMenu = class ListMenu {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    level(level) {
        const command = level < 0 ? outdentList() : indentList();
        if (command(this.editor.state)) {
            command(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    toggleList(type) {
        toggleList(this.editor.state, (tr) => this.editor.view.dispatch(tr), this.editor.view, type);
        this.popoverController.dismiss();
    }
    ngOnInit() {
        this.activeUnnumberedList = !!findParentNode(predicate => predicate.hasMarkup(schema.nodes.bulletList))(this.editor.state.selection);
        this.activeNumberedList = !!findParentNode(predicate => predicate.hasMarkup(schema.nodes.orderedList))(this.editor.state.selection);
    }
    ionViewWillLeave() {
        this.editor.focus();
    }
};
ListMenu.ctorParameters = () => [
    { type: PopoverController }
];
__decorate([
    Input()
], ListMenu.prototype, "editor", void 0);
ListMenu = __decorate([
    Component({
        template: `
        <ion-list lines="full">

            <ion-item button="true" detail="false" (click)="toggleList('bulletList')">
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Bulleted list" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeUnnumberedList"></ion-icon>
                <ion-icon src="assets/html-editor/list-bulleted.svg" slot="start"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleList('orderedList')">
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Numbered list" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeNumberedList"></ion-icon>
                <ion-icon src="assets/html-editor/list-numbered.svg" slot="start"></ion-icon>
            </ion-item>

            <ng-template [ngIf]="activeUnnumberedList || activeNumberedList">

                <ion-item-divider>
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Indent" | intlMessage}}</ion-label>
                </ion-item-divider>

                <ion-item button="true" detail="false" (click)="level(-1)">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Decrease indent" | intlMessage}}</ion-label>
                    <ion-icon src="assets/html-editor/indent-decrease.svg" slot="start"></ion-icon>
                </ion-item>

                <ion-item button="true" detail="false" (click)="level(1)">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Increase indent" | intlMessage}}</ion-label>
                    <ion-icon src="assets/html-editor/indent-increase.svg" slot="start"></ion-icon>
                </ion-item>

            </ng-template>

        </ion-list>
    `,
        styles: [`
        :host { user-select: none; }
        :host ion-list { margin: 0px; padding: 0px; }
        :host ion-item:last-child { --border-width: 0px; }
        :host ion-item-divider { --background: transparent; font-size: small }
        :host ion-item-divider ion-label { margin-top: 20px; opacity: 0.8; }
    `]
    })
], ListMenu);

class FontSize {
    constructor(size) {
        this.size = size;
        FontSize._sizes.push(this);
        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "textMenu/fontSize/" + size.toUpperCase()[0] + size.substring(1));
    }
    static sizes() {
        return FontSize._sizes.slice();
    }
}
FontSize._sizes = [];
FontSize.small = new FontSize("small");
FontSize.large = new FontSize("large");

function markApplies(doc, from, to, type) {
    let applies = false;
    doc.nodesBetween(from, to, (node, pos, parent) => {
        if (applies) {
            return false;
        }
        applies = node.isInline && parent.type.allowsMarkType(type);
    });
    return applies;
}
// return true iff all nodes in range have the mark with the same attrs
function rangeHasMark(doc, from, to, type, attrs) {
    let hasMark = null;
    doc.nodesBetween(from, to, node => {
        for (let i = 0; i < node.marks.length; i++) {
            const markMatch = node.marks[i].type === type && (!attrs || shallowEqual(node.marks[i].attrs, attrs));
            hasMark = (markMatch && (hasMark === null || hasMark === true));
        }
        return hasMark;
    });
    return !!hasMark;
}
function toggleInlineMark(markType, attrs) {
    return function (state, dispatch) {
        const { empty, from, to, $from } = state.selection;
        if (!markApplies(state.doc, from, to, markType)) {
            console.log("not applies");
            return false;
        }
        if (dispatch) {
            if (empty) {
                const markInSet = markType.isInSet(state.storedMarks || $from.marks());
                if (markInSet && (!attrs || shallowEqual(markInSet.attrs, attrs))) {
                    dispatch(state.tr.removeStoredMark(markType));
                }
                else {
                    dispatch(state.tr.addStoredMark(markType.create(attrs)));
                }
            }
            else {
                if (rangeHasMark(state.doc, from, to, markType, attrs)) {
                    dispatch(state.tr.removeMark(from, to, markType).scrollIntoView());
                }
                else {
                    dispatch(state.tr.addMark(from, to, markType.create(attrs)).scrollIntoView());
                }
            }
        }
        return true;
    };
}

function isActive(state, nodeType, attrs, marks) {
    const selection = state.selection;
    if (selection instanceof NodeSelection && selection.node) {
        return selection.node.hasMarkup(nodeType, attrs, marks);
    }
    return selection.to <= selection.$from.end() && selection.$from.parent.hasMarkup(nodeType, attrs, marks);
}
function isMarkActive(state, type) {
    const { from, $from, to, empty } = state.selection;
    if (empty) {
        return !!(type.isInSet(state.storedMarks || $from.marks()));
    }
    else {
        return state.doc.rangeHasMark(from, to, type);
    }
}
function anyMarkActive(state, types) {
    const { from, $from, to, empty } = state.selection;
    if (empty) {
        for (const type of types) {
            if (type.isInSet(state.storedMarks || $from.marks())) {
                return true;
            }
        }
    }
    else {
        for (const type of types) {
            if (state.doc.rangeHasMark(from, to, type)) {
                return true;
            }
        }
    }
    return false;
}

let TextFormatMenu = class TextFormatMenu {
    constructor(popoverController) {
        this.popoverController = popoverController;
        this.FontSize = FontSize;
    }
    toggle(name) {
        let command;
        if (name === "bold") {
            command = toggleMark(schema.marks.strong);
        }
        else if (name === "italic") {
            command = toggleMark(schema.marks.em);
        }
        else if (name === "underline") {
            command = toggleMark(schema.marks.underline);
        }
        if (command(this.editor.state)) {
            command(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    resetFontSize() {
        toggleMark(schema.marks.fontSize)(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        this.popoverController.dismiss();
    }
    toggleFontSize(size) {
        const command = toggleInlineMark(schema.marks.fontSize, { fontSize: size.size });
        if (command(this.editor.state)) {
            command(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    ngOnInit() {
        this.boldActivated = isMarkActive(this.editor.state, schema.marks.strong);
        this.italicActivated = isMarkActive(this.editor.state, schema.marks.em);
        this.underlineActivated = isMarkActive(this.editor.state, schema.marks.underline);
        this.activeFontSize = undefined;
        MARKS: for (const mark of findMarksInSelection(this.editor.state, schema.marks.fontSize)) {
            for (const size of FontSize.sizes()) {
                if (size.size === mark.attrs.fontSize) {
                    // ups, mamy różne rozmiary w zaznaczeniu
                    if (this.activeFontSize && size !== this.activeFontSize) {
                        this.activeFontSize = undefined;
                        break MARKS;
                    }
                    this.activeFontSize = size;
                }
            }
        }
    }
    ionViewWillLeave() {
        this.editor.focus();
    }
};
TextFormatMenu.ctorParameters = () => [
    { type: PopoverController }
];
__decorate([
    Input()
], TextFormatMenu.prototype, "editor", void 0);
TextFormatMenu = __decorate([
    Component({
        template: `
        <ion-list lines="full">
            
            <ion-item button="true" detail="false" (click)="toggle('bold')">
                <ion-label style="font-weight: bold">{{"@co.mmons/ionic-extensions/html-editor#textMenu/Bold" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="boldActivated"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggle('italic')">
                <ion-label style="font-style: italic">{{"@co.mmons/ionic-extensions/html-editor#textMenu/Italic" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="italicActivated"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggle('underline')">
                <ion-label style="text-decoration: underline">{{"@co.mmons/ionic-extensions/html-editor#textMenu/Underline" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="underlineActivated"></ion-icon>
            </ion-item>
            
            <ion-item-divider>
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#textMenu/fontSize/Text size" | intlMessage}}</ion-label>
            </ion-item-divider>

            <ion-item button="true" detail="false" (click)="resetFontSize()" *ngIf="activeFontSize">
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#textMenu/fontSize/Default" | intlMessage}}</ion-label>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleFontSize(fontSize)" *ngFor="let fontSize of FontSize.sizes()">
                <ion-label [style.fontSize]="fontSize.size">{{fontSize.label | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeFontSize === fontSize"></ion-icon>
            </ion-item>

        </ion-list>
    `,
        styles: [`
        :host { user-select: none; }
        :host ion-list { margin: 0px; padding: 0px; }
        :host ion-item:last-child { --border-width: 0px; }
        :host ion-item-divider { --background: transparent; font-size: small }
        :host ion-item-divider ion-label { margin-top: 20px; opacity: 0.8; }
    `]
    })
], TextFormatMenu);

function isBlockMarkActive(state, type) {
    const { from, $from, to, empty } = state.selection;
    if (empty) {
        for (const mark of $from.parent.marks) {
            if (mark.type === type) {
                return true;
            }
        }
    }
    else {
        return state.doc.rangeHasMark(from, to, type);
    }
}

let Toolbar = class Toolbar {
    constructor(popoverController, platform, editor, eventManager, modalController) {
        this.popoverController = popoverController;
        this.platform = platform;
        this.editor = editor;
        this.eventManager = eventManager;
        this.modalController = modalController;
        this.activeFeatures = {};
    }
    showMenu(event, menu) {
        return __awaiter(this, void 0, void 0, function* () {
            const components = {
                text: TextFormatMenu,
                list: ListMenu,
                alignment: AlignmentMenu,
                insert: InsertMenu,
                heading: HeadingMenu
            };
            const popover = yield this.popoverController.create({
                component: components[menu],
                componentProps: {
                    editor: this.editor
                },
                event: event,
                showBackdrop: this.platform.is("ios")
            });
            popover.present();
        });
    }
    editLink() {
        return __awaiter(this, void 0, void 0, function* () {
            LinkModal.present(this.modalController, this.editor);
        });
    }
    undo() {
        undo(this.editor.view.state, (transaction) => this.editor.view.updateState(this.editor.view.state.apply(transaction)));
        this.editor.focus();
    }
    redo() {
        redo(this.editor.view.state, (transaction) => this.editor.view.updateState(this.editor.view.state.apply(transaction)));
        this.editor.focus();
    }
    editorSelectionChanged() {
        this.canUndo = undoDepth(this.editor.view.state) > 0;
        this.canRedo = redoDepth(this.editor.view.state) > 0;
        this.activeFeatures = {};
        this.activeFeatures.text = anyMarkActive(this.editor.view.state, [schema.marks.strong, schema.marks.em, schema.marks.underline, schema.marks.fontSize]);
        this.activeFeatures.list = !!findParentNode(predicate => predicate.hasMarkup(schema.nodes.orderedList) || predicate.hasMarkup(schema.nodes.bulletList))(this.editor.state.selection);
        this.activeFeatures.alignment = isBlockMarkActive(this.editor.view.state, schema.marks.alignment);
        this.activeFeatures.heading = !!findParentNodeOfType(schema.nodes.heading)(this.editor.state.selection);
        this.activeFeatures.link = isMarkActive(this.editor.view.state, schema.marks.link);
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectionSubscription = this.editor.selectionChange.subscribe(() => this.editorSelectionChanged());
            this.editorSelectionChanged();
        });
    }
    ngOnDestroy() {
        unsubscribe(this.selectionSubscription);
    }
};
Toolbar.ctorParameters = () => [
    { type: PopoverController },
    { type: Platform },
    { type: HtmlEditor },
    { type: EventManager },
    { type: ModalController }
];
Toolbar = __decorate([
    Component({
        selector: "ionx-html-editor-toolbar",
        template: `
        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.text" (click)="showMenu($event, 'text')">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Text" | intlMessage}}</span>
        </ion-button>

        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.alignment" (click)="showMenu($event, 'alignment')" *ngIf="!editor.features || editor.features.alignment">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Alignment" | intlMessage}}</span>
        </ion-button>

        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.heading" (click)="showMenu($event, 'heading')" *ngIf="!editor.features || editor.features.heading">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}}</span>
        </ion-button>
        
        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.list" (click)="showMenu($event, 'list')" *ngIf="!editor.features || editor.features.list">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#listMenu/List" | intlMessage}}</span>
        </ion-button>

        <ion-button size="small" fill="clear" (click)="showMenu($event, 'insert')" *ngIf="!editor.features || editor.features.link || editor.features.multimedia">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Insert" | intlMessage}}</span>
        </ion-button>
        
        <ion-button size="small" fill="clear" class="active-feature" (click)="editLink()" *ngIf="activeFeatures.link">
            <span>{{"@co.mmons/ionic-extensions/html-editor#link/Link" | intlMessage}}</span>
        </ion-button>
        
        <div ionx--buttons-group>
            <ion-button size="small" fill="clear" tabindex="-1" title="{{'@co.mmons/ionic-extensions/html-editor#Undo' | intlMessage}}" [disabled]="!canUndo" (click)="undo()">
                <ion-icon name="undo" slot="icon-only"></ion-icon>
            </ion-button>
    
            <ion-button size="small" fill="clear" title="{{'@co.mmons/ionic-extensions/html-editor#Redo' | intlMessage}}" [disabled]="!canRedo" (click)="redo()">
                <ion-icon name="redo" slot="icon-only"></ion-icon>
            </ion-button>
        </div>
    `,
        styles: [`
        :host { outline: none; display: flex; justify-content: center; flex-wrap: wrap; position: sticky; position: -webkit-sticky; top: 0px; background-color: var(--background); }
        :host-context(.ion-focused) { background-color: var(--background-focused); }
        :host ion-button { margin: 0px 4px; --padding-end: 2px; --padding-start: 4px; }
        :host ion-button.active-feature span { font-weight: 800; }
        :host ion-icon[slot="end"] { margin: 0px; }
        :host ion-button[disabled] { opacity: 0.5; }
        :host [ionx--buttons-group] { display: flex; }
        :host [ionx--buttons-group] ion-button:not(:last-child) { margin-right: 0px; }
    `]
    })
], Toolbar);

let HtmlEditorModule = class HtmlEditorModule {
};
HtmlEditorModule = __decorate([
    NgModule({
        imports: [CommonModule, IonicModule, IntlModule, SelectModule, FormsModule, ReactiveFormsModule, FormHelperModule, ButtonsModule],
        declarations: [HtmlEditor, AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu, Toolbar],
        exports: [HtmlEditor, IntlModule],
        entryComponents: [AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu]
    })
], HtmlEditorModule);

/**
 * Generated bundle index. Do not edit.
 */

export { HtmlEditor, HtmlEditorModule, AlignmentMenu as ɵa, HeadingMenu as ɵb, InsertMenu as ɵc, LinkModal as ɵd, ListMenu as ɵe, TextFormatMenu as ɵf, Toolbar as ɵg };
//# sourceMappingURL=html-editor-module.js.map
