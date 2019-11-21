import { __values, __decorate, __awaiter, __generator, __param, __extends, __spread, __assign } from 'tslib';
import { CommonModule } from '@angular/common';
import { Input, Component, EventEmitter, ElementRef, Optional, HostBinding, Output, ViewChild, NgModule } from '@angular/core';
import { NgControl, Validators, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchMediaModule } from '@co.mmons/angular-extensions/browser/match-media';
import { IntlModule } from '@co.mmons/angular-intl';
import { FormHelper, FormHelperModule } from '@co.mmons/ionic-extensions/form-helper';
import { SelectModule } from '@co.mmons/ionic-extensions/select';
import { SpinnerModule } from '@co.mmons/ionic-extensions/spinner';
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

var Alignment = /** @class */ (function () {
    function Alignment(alignment) {
        this.alignment = alignment;
        Alignment._alignments.push(this);
        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "alignmentMenu/" + alignment);
    }
    Alignment.alignments = function () {
        return Alignment._alignments.slice();
    };
    Alignment._alignments = [];
    Alignment.left = new Alignment("left");
    Alignment.right = new Alignment("right");
    Alignment.center = new Alignment("center");
    Alignment.justify = new Alignment("justify");
    return Alignment;
}());

/**
 * Toggles block mark based on the return type of `getAttrs`.
 * This is similar to ProseMirror"s `getAttrs` from `AttributeSpec`
 * return `false` to remove the mark.
 * return `undefined for no-op.
 * return an `object` to update the mark.
 */
var toggleBlockMark = function (markType, getAttrs, allowedBlocks) { return function (state, dispatch) {
    var markApplied = false;
    var tr = state.tr;
    var toggleBlockMarkOnRange = function (from, to, tr) {
        state.doc.nodesBetween(from, to, function (node, pos, parent) {
            if (!node.type.isBlock) {
                return false;
            }
            if ((!allowedBlocks || (Array.isArray(allowedBlocks) ? allowedBlocks.indexOf(node.type) > -1 : allowedBlocks(state.schema, node, parent))) &&
                parent.type.allowsMarkType(markType)) {
                var oldMarks = node.marks.filter(function (mark) { return mark.type === markType; });
                var prevAttrs = oldMarks.length ? oldMarks[0].attrs : undefined;
                var newAttrs = getAttrs(prevAttrs, node);
                if (newAttrs !== undefined) {
                    tr.setNodeMarkup(pos, node.type, node.attrs, node.marks
                        .filter(function (mark) { return !markType.excludes(mark.type); })
                        .concat(newAttrs === false ? [] : markType.create(newAttrs)));
                    markApplied = true;
                }
            }
            return;
        });
    };
    var _a = state.selection, from = _a.from, to = _a.to;
    toggleBlockMarkOnRange(from, to, tr);
    if (markApplied && tr.docChanged) {
        if (dispatch) {
            dispatch(tr.scrollIntoView());
        }
        return true;
    }
    return false;
}; };

/**
 * Iterates over the commands one after the other,
 * passes the tr through and dispatches the cumulated transaction
 */
var cascadeCommands = function (cmds) { return function (state, dispatch) {
    var baseTr = state.tr;
    var shouldDispatch = false;
    var onDispatchAction = function (tr) {
        tr.steps.forEach(function (st) {
            baseTr.step(st);
        });
        shouldDispatch = true;
    };
    cmds.forEach(function (cmd) {
        cmd(state, onDispatchAction);
    });
    if (dispatch && shouldDispatch) {
        dispatch(baseTr);
        return true;
    }
    return false;
}; };
var isAlignable = function (align) { return function (state, dispatch) {
    var _a = state.schema, _b = _a.nodes, paragraph = _b.paragraph, heading = _b.heading, alignment = _a.marks.alignment;
    return toggleBlockMark(alignment, function () { return (!align ? undefined : align === "left" ? false : { align: align }); }, [paragraph, heading])(state, dispatch);
}; };
var changeAlignment = function (align) { return function (state, dispatch) {
    var _a = state.schema, _b = _a.nodes, paragraph = _b.paragraph, heading = _b.heading, alignment = _a.marks.alignment;
    return toggleBlockMark(alignment, function () { return (!align ? undefined : align === "left" ? false : { align: align }); }, [paragraph, heading])(state, dispatch);
}; };

var ɵ0 = function (dom) {
    var size = dom.getAttribute("data-font-size");
    return size ? { fontSize: size } : false;
};
var fontSize = {
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
    toDOM: function (mark) {
        return [
            "span",
            { style: "font-size: " + mark.attrs.fontSize, "data-font-size": mark.attrs.fontSize },
            0
        ];
    },
};

var ɵ0$1 = function (dom) {
    var align = dom.getAttribute("data-align");
    return align ? { align: align } : false;
};
var alignment = {
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
    toDOM: function (mark) {
        return [
            "div",
            {
                style: "text-align: " + mark.attrs.align,
                "data-align": mark.attrs.align,
            },
            0
        ];
    },
};

var ɵ0$2 = { default: "" }, ɵ1 = function (node) {
    return [
        "div",
        { "data-youtube": node.attrs.id + (node.attrs.start ? "," + node.attrs.start : "") },
        "youtube"
    ];
}, ɵ2 = function (dom) {
    // @ts-ignore
    var info = dom.getAttribute("data-youtube").split(",");
    return {
        id: info[0],
        start: info.length > 1 ? info[1] : 0
    };
};
var youtube = {
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

var nodes = {
    doc: {
        content: "block+",
        marks: "alignment",
    },
    paragraph: {
        content: "inline*",
        marks: "alignment strong underline em fontSize link",
        group: "block",
        parseDOM: [{ tag: "p" }],
        toDOM: function () { return ["p", 0]; }
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
    youtube: youtube
};
var marks = {
    link: marks$1.link,
    em: marks$1.em,
    strong: marks$1.strong,
    alignment: alignment,
    fontSize: fontSize,
    underline: {
        parseDOM: [{ tag: "u" }, { style: "text-decoration=underline" }],
        toDOM: function () {
            return ["u", 0];
        }
    }
};
var schema = new Schema({ nodes: nodes, marks: marks });

function findBlockMarks(state, markType) {
    var marks = [];
    var _a = state.selection, from = _a.from, to = _a.to;
    state.doc.nodesBetween(from, to, function (node, pos, parent) {
        var e_1, _a;
        if (!node.type.isBlock) {
            return false;
        }
        try {
            for (var _b = __values(node.marks), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mark = _c.value;
                if (mark.type === markType) {
                    marks.push(mark);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    return marks;
}

var AlignmentMenu = /** @class */ (function () {
    function AlignmentMenu(popoverController) {
        this.popoverController = popoverController;
        this.Alignment = Alignment;
    }
    AlignmentMenu.prototype.toggleAligment = function (alignment) {
        var _this = this;
        var command = changeAlignment(alignment.alignment);
        if (command(this.editor.state)) {
            command(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        }
        this.popoverController.dismiss();
    };
    AlignmentMenu.prototype.ngOnInit = function () {
        var e_1, _a;
        this.active = undefined;
        try {
            for (var _b = __values(findBlockMarks(this.editor.state, schema.marks.alignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mark = _c.value;
                // zaznaczonych wiele blocków z różnym wyrównaniem
                if (this.active && this.active !== mark.attrs.align) {
                    this.active = undefined;
                    break;
                }
                this.active = mark.attrs.align;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    AlignmentMenu.prototype.ionViewWillLeave = function () {
        this.editor.focus();
    };
    AlignmentMenu.ctorParameters = function () { return [
        { type: PopoverController }
    ]; };
    __decorate([
        Input()
    ], AlignmentMenu.prototype, "editor", void 0);
    AlignmentMenu = __decorate([
        Component({
            template: "\n        <ion-list lines=\"full\">\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleAligment(alignment)\" *ngFor=\"let alignment of Alignment.alignments()\">\n                <ion-label>{{alignment.label | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"active === alignment.alignment\"></ion-icon>\n                <ion-icon src=\"assets/html-editor/align-{{alignment.alignment}}.svg\" slot=\"start\"></ion-icon>\n            </ion-item>\n\n        </ion-list>\n    ",
            styles: ["\n        :host ion-list { margin: 0px; padding: 0px; }\n        :host ion-item:last-child { --border-width: 0px; }\n    "]
        })
    ], AlignmentMenu);
    return AlignmentMenu;
}());

var mac = typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
function buildKeymap(schema, mapKeys) {
    var keys = {};
    var type;
    function bind(key, cmd) {
        if (mapKeys) {
            var mapped = mapKeys[key];
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
        var br_1 = type;
        var cmd = function (state, dispatch) {
            dispatch(state.tr.replaceSelectionWith(br_1.create()).scrollIntoView());
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
    var iframe = document.createElement("iframe");
    iframe.height = "200px";
    iframe.width = "100%";
    iframe.src = "https://www.youtube.com/embed/" + id + (start ? "?start=" + start : "");
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    return iframe;
}
// https://www.youtube.com/watch?v=m3V7_Ov52sY
var YoutubeNodeView = /** @class */ (function () {
    function YoutubeNodeView(node, view, eventManager) {
        var _this = this;
        this.view = view;
        this.dom = document.createElement("div");
        this.dom.style.position = "relative";
        this.dom.style.overflow = "hidden";
        this.dom.style.height = "200px";
        this.dom.style.marginTop = "16px";
        this.dom.appendChild(createYoutubeIframe(node.attrs.id, node.attrs.start));
        var overlay = this.dom.appendChild(document.createElement("div"));
        overlay.style.position = "absolute";
        overlay.style.left = "0px";
        overlay.style.top = "0px";
        overlay.style.width = "100%";
        overlay.style.height = "200px";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        var button = overlay.appendChild(document.createElement("ion-button"));
        button.classList.add("ionx--interactive");
        button.setAttribute("color", "primary");
        this.deleteUnlisten = eventManager.addEventListener(button, "click", function () { return _this.deleteNode(); });
        var icon = document.createElement("ion-icon");
        icon.setAttribute("name", "trash");
        icon.slot = "icon-only";
        button.appendChild(icon);
    }
    YoutubeNodeView.prototype.deleteNode = function () {
        this.view.dispatch(removeSelectedNode(this.view.state.tr));
    };
    YoutubeNodeView.prototype.selectNode = function () {
        this.dom.classList.add("ionx--selected");
    };
    YoutubeNodeView.prototype.deselectNode = function () {
        this.dom.classList.remove("ionx--selected");
    };
    YoutubeNodeView.prototype.update = function (node) {
        return false;
    };
    YoutubeNodeView.prototype.destroy = function () {
        if (this.deleteUnlisten) {
            this.deleteUnlisten();
        }
    };
    YoutubeNodeView.prototype.stopEvent = function (event) {
        return false;
    };
    YoutubeNodeView.prototype.ignoreMutation = function () {
        return true;
    };
    return YoutubeNodeView;
}());

function findScrollParent(element) {
    if (!element) {
        return;
    }
    if (element.scrollHeight >= element.clientHeight) {
        var overflowY = window.getComputedStyle(element).overflowY;
        if (overflowY !== "visible" && overflowY !== "hidden") {
            return element;
        }
    }
    if (element.assignedSlot) {
        var p = findScrollParent(element.assignedSlot.parentElement);
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
        var parentRect = parent.getBoundingClientRect();
        var rect = element.getBoundingClientRect();
        if (!(rect.top > parentRect.top && rect.top <= parentRect.bottom && rect.bottom < parentRect.height)) {
            var top_1 = element.offsetTop;
            if (element.offsetParent) {
                var offsetParent = element.offsetParent;
                while (offsetParent !== parent && !!offsetParent) {
                    top_1 += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent;
                }
            }
            parent.scrollTo({ top: top_1, behavior: scrollBehavior });
        }
        return;
    }
    element.scrollIntoView();
}

var HtmlEditor = /** @class */ (function () {
    function HtmlEditor(element, eventManager, formControl, item) {
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
    HtmlEditor_1 = HtmlEditor;
    Object.defineProperty(HtmlEditor.prototype, "state", {
        get: function () {
            return this.view.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlEditor.prototype, "value", {
        get: function () {
            if (this.view) {
                var value = DOMSerializer.fromSchema(this.schema).serializeFragment(this.state.doc.content);
                var tmp = document.createElement("div");
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
        },
        set: function (html) {
            if (this.view) {
                var state = EditorState.create({
                    schema: this.view.state.schema,
                    plugins: this.view.state.plugins,
                    doc: this.editorDoc(html || "<div></div>")
                });
                this.view.updateState(state);
            }
            else {
                this.uninitializedValue = html;
            }
            this.silentChanges = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HtmlEditor.prototype, "nativeElement", {
        get: function () {
            return this.element.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    HtmlEditor.prototype.prepareOutputValue = function (value) {
        value.querySelectorAll("div[data-youtube]").forEach(function (node) {
            var params = node.getAttribute("data-youtube").split(",");
            node.appendChild(createYoutubeIframe(params[0], params.length > 1 ? params[1] : undefined));
        });
        return value.innerHTML;
    };
    HtmlEditor.prototype.prepareInputValue = function (value) {
    };
    HtmlEditor.prototype.setDisabledState = function (isDisabled) {
        this.disabled = !!isDisabled;
    };
    HtmlEditor.prototype.writeValue = function (value) {
        this.silentChanges = true;
        this.value = value;
    };
    HtmlEditor.prototype.registerOnChange = function (fn) {
        this.controlOnChange = fn;
    };
    HtmlEditor.prototype.registerOnTouched = function (fn) {
        this.controlOnTouched = fn;
    };
    HtmlEditor.prototype.focus = function () {
        this.view.dom.focus();
        // this.content.focus();
    };
    // @ts-ignore
    HtmlEditor.prototype.editorInitialized = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.uninitializedValue) {
                    // this.trixEditor.loadHTML(this.uninitializedValue);
                }
                return [2 /*return*/];
            });
        });
    };
    // @ts-ignore
    HtmlEditor.prototype.editorFocused = function (event) {
        if (this.controlOnTouched) {
            this.controlOnTouched(true);
        }
        this.focused = true;
        this.updateItemClasses();
    };
    // @ts-ignore
    HtmlEditor.prototype.editorBlured = function (event) {
        this.focused = false;
        this.updateItemClasses();
    };
    HtmlEditor.prototype.handleScroll = function (view) {
        if (!this.scrollParent) {
            this.scrollParent = findScrollParent(this.element.nativeElement);
        }
        var pos = view.domAtPos(view.state.selection.to);
        if (pos.node instanceof HTMLElement) {
            scrollIntoView(pos.node, undefined, this.scrollParent);
        }
        return false;
    };
    HtmlEditor.prototype.editorDoc = function (html) {
        var node = document.createElement("div");
        node.innerHTML = html;
        this.prepareInputValue(node);
        return DOMParser.fromSchema(this.schema).parse(node);
    };
    HtmlEditor.prototype.resetControlCss = function () {
        var e_1, _a;
        var classes = {
            "ion-untouched": this.formControl.untouched,
            "ion-touched": this.formControl.touched,
            "ion-pristine": this.formControl.pristine,
            "ion-dirty": this.formControl.dirty,
            "ion-valid": this.formControl.valid,
            "ion-invalid": !this.formControl.valid
        };
        var elements = [];
        elements.push(this.element.nativeElement);
        if (this.item) {
            elements.push(this.item["el"]);
        }
        try {
            for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                var e = elements_1_1.value;
                for (var c in classes) {
                    if (classes[c]) {
                        e.classList.add(c);
                    }
                    else {
                        e.classList.remove(c);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    HtmlEditor.prototype.updateItemClasses = function () {
        if (!this.item) {
            return;
        }
        var item = this.item["el"];
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
    };
    HtmlEditor.prototype.fixItemOverflow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var item_1, style;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.item) return [3 /*break*/, 2];
                        item_1 = this.item["el"];
                        return [4 /*yield*/, waitTill(function () { return !!item_1.shadowRoot; })];
                    case 1:
                        _a.sent();
                        item_1.style.overflow = "initial";
                        style = document.createElement("style");
                        style.innerHTML = ".item-native, .item-inner, .input-wrapper { overflow: initial !important; }";
                        item_1.shadowRoot.appendChild(style);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    HtmlEditor.prototype.editorTransaction = function (transaction) {
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
    };
    HtmlEditor.prototype.readonlyChanged = function () {
        if (this.view) {
            this.view.dom["contentEditable"] = !this.readonly && !this.disabled ? "true" : "false";
        }
    };
    HtmlEditor.prototype.ngAfterViewInit = function () {
        this.fixItemOverflow();
        this.updateItemClasses();
    };
    HtmlEditor.prototype.ngAfterContentChecked = function () {
        this.resetControlCss();
    };
    HtmlEditor.prototype.ngOnDestroy = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.eventUnlisteners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var unlisten = _c.value;
                unlisten();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.view.destroy();
        this.view = undefined;
    };
    HtmlEditor.prototype.ngOnInit = function () {
        var _this = this;
        this.schema = schema;
        this.plugins = [
            keymap(buildKeymap(schema)),
            keymap(baseKeymap),
            gapCursor(),
            history()
        ];
        var state = EditorState.create({
            schema: this.schema,
            plugins: this.plugins,
            doc: this.editorDoc(this.uninitializedValue ? this.uninitializedValue : "<div></div>")
        });
        this.view = new EditorView(this.element.nativeElement, {
            state: state,
            dispatchTransaction: function (transaction) { return _this.editorTransaction(transaction); },
            handleScrollToSelection: function (view) { return _this.handleScroll(view); },
            nodeViews: {
                youtube: function (node, view) { return new YoutubeNodeView(node, view, _this.eventManager); }
            }
        });
        this.silentChanges = false;
        if (this.readonly || this.disabled) {
            this.readonlyChanged();
        }
    };
    HtmlEditor.prototype.ngOnChanges = function (changes) {
        if (changes["readonly"] || changes["disabled"]) {
            this.readonlyChanged();
        }
    };
    var HtmlEditor_1;
    HtmlEditor.idGenerator = 0;
    HtmlEditor.ctorParameters = function () { return [
        { type: ElementRef },
        { type: EventManager },
        { type: NgControl, decorators: [{ type: Optional }] },
        { type: IonItem, decorators: [{ type: Optional }] }
    ]; };
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
            template: "\n        <ionx-html-editor-toolbar [style.display]=\"readonly ? 'none' : ''\"></ionx-html-editor-toolbar>\n    ",
            styles: [":host ::ng-deep .ProseMirror{outline:0;-moz-user-select:text;-ms-user-select:text;user-select:text;-webkit-user-select:text}:host ::ng-deep .ProseMirror[contenteditable=true]{min-height:60px;white-space:pre-wrap;word-wrap:break-word}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--selected{border:4px solid var(--ion-color-primary)}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--interactive{display:none}:host ::ng-deep .ProseMirror p{margin:16px 0 0}:host ::ng-deep .ProseMirror p:first-child{margin-top:0}:host ::ng-deep .ProseMirror h1{font-size:130%}:host ::ng-deep .ProseMirror h2{font-size:125%}:host ::ng-deep .ProseMirror h3{font-size:120%}:host ::ng-deep .ProseMirror h4{font-size:115%}:host ::ng-deep .ProseMirror h5{font-size:110%}:host ::ng-deep .ProseMirror h6{font-size:105%}:host ::ng-deep .ProseMirror h1,:host ::ng-deep .ProseMirror h2,:host ::ng-deep .ProseMirror h3,:host ::ng-deep .ProseMirror h4,:host ::ng-deep .ProseMirror h5,:host ::ng-deep .ProseMirror h6{margin-top:16px;margin-bottom:8px}:host ::ng-deep .ProseMirror h1:first-child,:host ::ng-deep .ProseMirror h2:first-child,:host ::ng-deep .ProseMirror h3:first-child,:host ::ng-deep .ProseMirror h4:first-child,:host ::ng-deep .ProseMirror h5:first-child,:host ::ng-deep .ProseMirror h6:first-child{margin-top:0}:host ::ng-deep .ProseMirror ul:first-child{margin-top:0}"]
        }),
        __param(2, Optional()),
        __param(3, Optional())
    ], HtmlEditor);
    return HtmlEditor;
}());

var HeadingMenu = /** @class */ (function () {
    function HeadingMenu(popoverController) {
        this.popoverController = popoverController;
    }
    HeadingMenu.prototype.toggleHeading = function (heading) {
        var _this = this;
        if (heading > 0 && this.activeHeading !== heading) {
            var command = setBlockType(schema.nodes.heading, { level: heading });
            if (command(this.editor.state)) {
                command(this.editor.state, function (tr) {
                    _this.editor.view.dispatch(tr);
                });
            }
        }
        else {
            setBlockType(schema.nodes.paragraph)(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        }
        this.popoverController.dismiss();
    };
    HeadingMenu.prototype.ngOnInit = function () {
        var active = findParentNodeOfType(schema.nodes.heading)(this.editor.state.selection);
        if (active) {
            this.activeHeading = active.node.attrs.level;
        }
    };
    HeadingMenu.prototype.ionViewWillLeave = function () {
        this.editor.focus();
    };
    HeadingMenu.ctorParameters = function () { return [
        { type: PopoverController }
    ]; };
    __decorate([
        Input()
    ], HeadingMenu.prototype, "editor", void 0);
    HeadingMenu = __decorate([
        Component({
            template: "\n        <ion-list lines=\"full\">\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleHeading(0)\" *ngIf=\"activeHeading > 0\">\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#Plain text\" | intlMessage}}</ion-label>\n            </ion-item>\n            \n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleHeading(1)\">\n                <ion-label style=\"font-size: 130%; font-weight: 500\">{{\"@co.mmons/ionic-extensions/html-editor#Heading\" | intlMessage}} 1</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeHeading == 1\"></ion-icon>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleHeading(2)\">\n                <ion-label style=\"font-size: 125%; font-weight: 500\">{{\"@co.mmons/ionic-extensions/html-editor#Heading\" | intlMessage}} 2</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeHeading == 2\"></ion-icon>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleHeading(3)\">\n                <ion-label style=\"font-size: 120%; font-weight: 500\">{{\"@co.mmons/ionic-extensions/html-editor#Heading\" | intlMessage}} 3</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeHeading == 3\"></ion-icon>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleHeading(4)\">\n                <ion-label style=\"font-size: 115%; font-weight: 500\">{{\"@co.mmons/ionic-extensions/html-editor#Heading\" | intlMessage}} 4</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeHeading == 4\"></ion-icon>\n            </ion-item>\n            \n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleHeading(5)\">\n                <ion-label style=\"font-size: 110%; font-weight: 500\">{{\"@co.mmons/ionic-extensions/html-editor#Heading\" | intlMessage}} 5</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeHeading == 5\"></ion-icon>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleHeading(6)\">\n                <ion-label style=\"font-size: 105%; font-weight: 500\">{{\"@co.mmons/ionic-extensions/html-editor#Heading\" | intlMessage}} 6</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeHeading == 6\"></ion-icon>\n            </ion-item>\n            \n        </ion-list>\n    ",
            styles: [":host ion-list { margin: 0px; padding: 0px }",
                ":host ion-item:last-child { --border-width: 0px; }"]
        })
    ], HeadingMenu);
    return HeadingMenu;
}());

var LinkType = /** @class */ (function () {
    function LinkType(type) {
        this.type = type;
    }
    LinkType.prototype.toString = function () {
        return this.type;
    };
    return LinkType;
}());
var DefaultLinkType = /** @class */ (function (_super) {
    __extends(DefaultLinkType, _super);
    function DefaultLinkType(type) {
        var _this = _super.call(this, type) || this;
        _this.inputComponent = undefined;
        _this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/type/" + type);
        if (type === "www") {
            _this.inputType = "url";
        }
        else if (type === "other") {
            _this.inputType = "text";
        }
        else if (type === "sms") {
            _this.inputType = "sms";
        }
        else {
            _this.inputType = type;
        }
        if (type === "www") {
            _this.inputValidators = [urlValidator];
            _this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/Web page url");
        }
        if (type === "email") {
            _this.inputValidators = [Validators.email];
            _this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/E-mail address");
        }
        if (type === "tel" || type === "sms") {
            _this.inputLabel = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/Phone number");
            _this.inputHint = new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/phoneNumberHint");
        }
        return _this;
    }
    DefaultLinkType.prototype.uri = function (fromLink) {
        if (this.type === "www" || this.type === "other") {
            return fromLink;
        }
        else if (this.type === "tel") {
            return "tel:" + fromLink;
        }
        else if (this.type === "sms") {
            return "sms:" + fromLink;
        }
        else if (this.type === "email") {
            return "mailto:" + fromLink;
        }
        return fromLink;
    };
    DefaultLinkType.www = new DefaultLinkType("www");
    DefaultLinkType.email = new DefaultLinkType("email");
    DefaultLinkType.tel = new DefaultLinkType("tel");
    DefaultLinkType.sms = new DefaultLinkType("sms");
    DefaultLinkType.other = new DefaultLinkType("other");
    return DefaultLinkType;
}(LinkType));
var urlValidatorRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
function urlValidator(control) {
    var value = control.value;
    if (urlValidatorRegex.test(value)) {
        return undefined;
    }
    return {
        invalidUrl: new MessageRef("@co.mmons/ionic-extensions/html-editor", "link/invalidUrlError")
    };
}

function findMarks(doc, from, to, markType, attrs) {
    var marks = [];
    doc.nodesBetween(from, to, function (node) {
        for (var i = 0; i < node.marks.length; i++) {
            if (node.marks[i].type === markType && (!attrs || deepEqual(node.marks[i].attrs, attrs))) {
                marks.push(node.marks[i]);
            }
        }
    });
    return marks;
}

function findMarksInSelection(state, markType, attrs) {
    var doc = state.doc;
    var _a = state.selection, from = _a.from, to = _a.to;
    return findMarks(doc, from, to, markType, attrs);
}

function findNodeStartEnd(doc, pos) {
    var $pos = doc.resolve(pos);
    var start = pos - $pos.textOffset;
    var end = start + $pos.parent.child($pos.index()).nodeSize;
    return { start: start, end: end };
}

var LinkModal = /** @class */ (function () {
    function LinkModal(modalController) {
        this.modalController = modalController;
    }
    LinkModal_1 = LinkModal;
    LinkModal.present = function (modalController, editor) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modalController.create({ component: LinkModal_1, componentProps: { editor: editor } })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        this.editor.focus();
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.unlink = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selection, tr_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        selection = this.editor.state.selection;
                        if (selection.empty) {
                            tr_1 = this.editor.state.tr;
                            tr_1.doc.nodesBetween(selection.from, selection.to, function (node, pos) {
                                if (node.isText) {
                                    var $pos = tr_1.doc.resolve(pos);
                                    var start = pos - $pos.textOffset;
                                    var end = start + $pos.parent.child($pos.index()).nodeSize;
                                    tr_1.removeMark(start, end, schema.marks.link);
                                }
                            });
                            this.editor.view.dispatch(tr_1);
                        }
                        else {
                            toggleMark(schema.marks.link)(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.ok = function () {
        return __awaiter(this, void 0, void 0, function () {
            var linkType_1, selection, tr_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.formHelper.validateAll("dirty");
                        if (!this.form.valid) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.modalController.dismiss()];
                    case 1:
                        _a.sent();
                        linkType_1 = this.form.controls.type.value;
                        selection = this.editor.state.selection;
                        tr_2 = this.editor.state.tr;
                        if (selection.empty) {
                            tr_2.doc.nodesBetween(selection.from, selection.to, function (node, pos) {
                                if (node.isText) {
                                    var _a = findNodeStartEnd(tr_2.doc, pos), start = _a.start, end = _a.end;
                                    tr_2.addMark(start, end, schema.mark(schema.marks.link, { href: linkType_1.uri(_this.form.controls.link.value) }));
                                }
                            });
                        }
                        else {
                            // usuwamy poprzedni link
                            tr_2.doc.nodesBetween(selection.from, selection.to, function (node, pos) {
                                if (node.isText) {
                                    var _a = findNodeStartEnd(tr_2.doc, pos), start = _a.start, end = _a.end;
                                    tr_2.removeMark(start, end, schema.marks.link);
                                }
                            });
                            tr_2.addMark(selection.from, selection.to, schema.mark(schema.marks.link, { href: linkType_1.uri(this.form.controls.link.value) }));
                        }
                        this.editor.view.dispatch(tr_2);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.typeChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.form.controls.link.value) {
                            this.form.controls.link.markAsDirty();
                            this.form.controls.link.updateValueAndValidity();
                        }
                        return [4 /*yield*/, sleep(50)];
                    case 1:
                        _a.sent(); // we must wait for closing type selector
                        if (this.formHelper) {
                            this.formHelper.focus("link", false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.parseLink = function (uri) {
        var e_1, _a;
        var prefixes = {
            "http:": DefaultLinkType.www,
            "https:": DefaultLinkType.www,
            "tel:": DefaultLinkType.tel,
            "sms:": DefaultLinkType.sms,
            "mailto:": DefaultLinkType.email
        };
        var lowerCasedUri = uri.trim().toLowerCase();
        try {
            for (var _b = __values(Object.keys(prefixes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prefix = _c.value;
                if (lowerCasedUri.startsWith(prefix)) {
                    var link = { type: prefixes[prefix], link: uri.trim() };
                    if (prefixes[prefix] !== DefaultLinkType.www) {
                        link.link = uri.substring(prefix.length).trim();
                    }
                    return link;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { type: DefaultLinkType.other, link: uri };
    };
    LinkModal.prototype.linkValidator = function (control) {
        var e_2, _a;
        var required = Validators.required(control);
        if (required) {
            return required;
        }
        var type = this.form.controls.type.value;
        var validators = type.inputValidators;
        if (validators) {
            try {
                for (var validators_1 = __values(validators), validators_1_1 = validators_1.next(); !validators_1_1.done; validators_1_1 = validators_1.next()) {
                    var validator = validators_1_1.value;
                    var r = validator(control);
                    if (r) {
                        return r;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (validators_1_1 && !validators_1_1.done && (_a = validators_1.return)) _a.call(validators_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    LinkModal.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.types = [DefaultLinkType.www, DefaultLinkType.email, DefaultLinkType.tel, DefaultLinkType.sms, DefaultLinkType.other];
                        this.form = new FormGroup({
                            type: new FormControl(this.existingType || DefaultLinkType.www),
                            link: new FormControl(this.existingLink)
                        });
                        this.form.controls.link.setValidators(function (control) { return _this.linkValidator(control); });
                        this.typeChangesSubscription = this.form.controls["type"].valueChanges.subscribe(function () { return _this.typeChanged(); });
                        this.typeChanged();
                        return [4 /*yield*/, waitTill(function () { return !!_this.formHelper; })];
                    case 1:
                        _a.sent();
                        this.formHelper.focus("link", false);
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkModal.prototype.ionViewWillLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.editor.focus();
                return [2 /*return*/];
            });
        });
    };
    LinkModal.prototype.ngOnInit = function () {
        var e_3, _a;
        try {
            MARKS: for (var _b = __values(findMarksInSelection(this.editor.state, schema.marks.link)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mark = _c.value;
                var parsed = this.parseLink(mark.attrs.href);
                if (parsed) {
                    this.existingType = parsed.type;
                    this.existingLink = parsed.link;
                    this.existing = true;
                    break MARKS;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    LinkModal.prototype.ngOnDestroy = function () {
        unsubscribe(this.typeChangesSubscription);
    };
    var LinkModal_1;
    LinkModal.ctorParameters = function () { return [
        { type: ModalController }
    ]; };
    __decorate([
        Input()
    ], LinkModal.prototype, "editor", void 0);
    __decorate([
        ViewChild(FormHelper, { static: false })
    ], LinkModal.prototype, "formHelper", void 0);
    LinkModal = LinkModal_1 = __decorate([
        Component({
            template: "<ion-header>\n\n    <ion-toolbar>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); close()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"margin: 0; padding: 0;\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n\n            <ion-button fill=\"clear\" color=\"dark\" (click)=\"unlink()\" *ngIf=\"existing\">\n                <ion-icon name=\"trash\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Unlink\" | intlMessage}}</ion-label>\n            </ion-button>\n\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"ok()\">\n                <ion-icon name=\"checkmark\" slot=\"start\"></ion-icon>\n                <ion-label>{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-label>\n            </ion-button>\n\n        </ionx-buttons>\n\n    </ion-toolbar>\n\n</ion-header>\n\n<ion-content [forceOverscroll]=\"false\">\n\n    <ionx-spinner slot=\"fixed\" fill *ngIf=\"!form\"></ionx-spinner>\n\n    <form ionx-form-helper [formGroup]=\"form\" *ngIf=\"form\">\n\n        <ion-grid>\n\n            <ion-row>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{\"@co.mmons/ionic-extensions/html-editor#link/Link type\" | intlMessage}}</ion-label>\n                            <ionx-select required [compareAsString]=\"true\" formControlName=\"type\">\n                                <ionx-select-option *ngFor=\"let type of types\" [value]=\"type\">{{type.label | intlMessage}}</ionx-select-option>\n                            </ionx-select>\n                        </ion-item>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n                <ion-col [sizeXs]=\"12\">\n\n                    <ionx-form-item>\n\n                        <ion-item>\n                            <ion-label position=\"stacked\">{{(form.controls['type'].value.inputLabel || \"@co.mmons/ionic-extensions/html-editor#link/Link\") | intlMessage}}</ion-label>\n                            <ion-input formControlName=\"link\" type=\"form.controls['type'].value.inputType\"></ion-input>\n                        </ion-item>\n\n                        <ionx-form-item-error control=\"link\" markedAs=\"dirty\"></ionx-form-item-error>\n\n                        <ionx-form-item-hint *ngIf=\"form.controls['type'].value.inputHint\">\n                            <span [innerHTML]=\"form.controls['type'].value.inputHint | intlMessage\"></span>\n                        </ionx-form-item-hint>\n\n                    </ionx-form-item>\n\n                </ion-col>\n\n            </ion-row>\n\n\n        </ion-grid>\n\n    </form>\n\n</ion-content>\n",
            styles: [":host ion-item:not(.ion-dirty) { --highlight-height: 0px; }"]
        })
    ], LinkModal);
    return LinkModal;
}());

var InsertMenu = /** @class */ (function () {
    // @ts-ignore
    function InsertMenu(popoverController, modalController) {
        this.popoverController = popoverController;
        this.modalController = modalController;
    }
    InsertMenu.prototype.insertLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.popoverController.dismiss(undefined, "link");
                LinkModal.present(this.modalController, this.editor);
                return [2 /*return*/];
            });
        });
    };
    InsertMenu.prototype.insertYoutube = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inputView = "youtube";
                        return [4 /*yield*/, waitTill(function () { return !!_this.youtubeInput; }, undefined, 2000)];
                    case 1:
                        _a.sent();
                        this.youtubeInput.setFocus();
                        return [2 /*return*/];
                }
            });
        });
    };
    // @ts-ignore
    InsertMenu.prototype.parseYoutube = function (value) {
        // https://www.youtube.com/watch?v=NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc
        // https://www.youtube.com/embed/NqMgaHUNSQc
        // https://www.youtube-nocookie.com/embed/NqMgaHUNSQc
        // https://youtu.be/NqMgaHUNSQc?t=17
        var e_1, _a;
        value = value.replace("-nocookie.com/", ".com/");
        value = value.replace("/embed/", "/");
        value = value.replace("youtu.be/", "youtube.com/");
        value = value.replace("watch?v=", "");
        value = value.replace("?", "&");
        var info = { id: undefined, start: undefined };
        if (value.indexOf("youtube.com/") > -1) {
            value = value.split("youtube.com/").splice(1, 1)[0];
            try {
                for (var _b = __values(value.split("&")), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var param = _c.value;
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
        }
        if (info.id) {
            return info;
        }
    };
    InsertMenu.prototype.applyYoutube = function () {
        var info = this.parseYoutube(this.youtubeInput.value);
        if (info) {
            var tr = this.editor.state.tr.replaceSelectionWith(this.editor.state.schema.nodes.youtube.create({ id: info.id, start: info.start || 0 }));
            this.editor.view.dispatch(tr);
        }
        this.popoverController.dismiss(undefined, "youtube");
    };
    InsertMenu.prototype.cancel = function () {
        this.popoverController.dismiss();
    };
    InsertMenu.prototype.ngOnInit = function () {
    };
    InsertMenu.prototype.ionViewWillLeave = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.inputView && !event.role) {
                    this.editor.focus();
                }
                return [2 /*return*/];
            });
        });
    };
    InsertMenu.prototype.ionViewDidLeave = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.inputView) return [3 /*break*/, 2];
                        return [4 /*yield*/, sleep(50)];
                    case 1:
                        _a.sent();
                        this.editor.focus();
                        return [3 /*break*/, 3];
                    case 2:
                        if (!event.role) {
                            this.editor.focus();
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InsertMenu.ctorParameters = function () { return [
        { type: PopoverController },
        { type: ModalController }
    ]; };
    __decorate([
        Input()
    ], InsertMenu.prototype, "editor", void 0);
    __decorate([
        ViewChild("youtubeInput", { static: false })
    ], InsertMenu.prototype, "youtubeInput", void 0);
    InsertMenu = __decorate([
        Component({
            template: "\n        <ion-list lines=\"full\">\n            \n            <ng-template [ngIf]=\"!inputView\">\n                \n                <ion-item button=\"true\" detail=\"false\" (click)=\"insertLink()\">\n                    <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</ion-label>\n                    <ion-icon name=\"link\" slot=\"start\"></ion-icon>\n                </ion-item>\n    \n                <ion-item button=\"true\" detail=\"false\" (click)=\"insertYoutube()\">\n                    <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#youtube/YouTube video\" | intlMessage}}</ion-label>\n                    <ion-icon name=\"logo-youtube\" slot=\"start\"></ion-icon>\n                </ion-item>\n                \n            </ng-template>\n            \n            <ng-template [ngIf]=\"inputView == 'youtube'\">\n\n                <ion-item>\n                    <ion-icon name=\"logo-youtube\" slot=\"start\"></ion-icon>\n                    <ion-input #youtubeInput [placeholder]=\"'@co.mmons/ionic-extensions/html-editor#youtube/Paste YouTube video url' | intlMessage\" (keydown.enter)=\"applyYoutube()\"></ion-input>\n                </ion-item>\n                \n                <ion-item>\n                    <ionx-buttons slot=\"end\">\n                        <ion-button fill=\"clear\" color=\"dark\" (click)=\"cancel()\">\n                            <ion-label>{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-label>\n                        </ion-button>\n                        \n                        <ion-button fill=\"clear\" color=\"primary\" (click)=\"applyYoutube()\">\n                            <ion-label>{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-label>\n                        </ion-button>\n                    </ionx-buttons>\n                </ion-item>\n    \n            </ng-template>\n            \n        </ion-list>\n    ",
            styles: [":host ion-list { margin: 0px; padding: 0px }",
                ":host ion-item:last-child { --border-width: 0px; }",
                ":host ion-item { --highlight-height: 0px; }"]
        })
    ], InsertMenu);
    return InsertMenu;
}());

var filter = function (predicates, cmd) {
    return function (state, dispatch, view) {
        if (!Array.isArray(predicates)) {
            predicates = [predicates];
        }
        if (predicates.some(function (pred) { return !pred(state, view); })) {
            return false;
        }
        return cmd(state, dispatch, view) || false;
    };
};

var isEmptySelectionAtStart = function (state) {
    var _a = state.selection, empty = _a.empty, $from = _a.$from;
    return (empty &&
        ($from.parentOffset === 0 || state.selection instanceof GapCursor));
};

var isFirstChildOfParent = function (state) {
    var $from = state.selection.$from;
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
    var isInlineNodeHasVisibleContent = function (inlineNode) {
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
    for (var index = 0; index < node.childCount; index++) {
        var child = node.child(index);
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
    var block = [];
    var nonBlock = [];
    node.forEach(function (child) {
        child.isInline ? nonBlock.push(child) : block.push(child);
    });
    return (!nonBlock.length &&
        !block.filter(function (childNode) {
            return (!!childNode.childCount &&
                !(childNode.childCount === 1 && isEmptyParagraph(childNode.firstChild))) ||
                childNode.isAtom;
        }).length);
}
/**
 * Checks if a node looks like an empty document
 */
function isEmptyDocument(node) {
    var nodeChild = node.content.firstChild;
    if (node.childCount !== 1 || !nodeChild) {
        return false;
    }
    return (nodeChild.type.name === "paragraph" &&
        !nodeChild.childCount &&
        nodeChild.nodeSize === 2 &&
        (!nodeChild.marks || nodeChild.marks.length === 0));
}
var getStepRange = function (transaction) {
    var from = -1;
    var to = -1;
    transaction.steps.forEach(function (step) {
        step.getMap().forEach(function (_oldStart, _oldEnd, newStart, newEnd) {
            from = newStart < from || from === -1 ? newStart : from;
            to = newEnd < to || to === -1 ? newEnd : to;
        });
    });
    if (from !== -1) {
        return { from: from, to: to };
    }
    return null;
};
/**
 * Find the farthest node given a condition
 * @param predicate Function to check the node
 */
var findFarthestParentNode = function (predicate) { return function (selection) {
    var $from = selection.$from;
    var candidate = null;
    for (var i = $from.depth; i > 0; i--) {
        var node = $from.node(i);
        if (predicate(node)) {
            candidate = {
                pos: i > 0 ? $from.before(i) : 0,
                start: $from.start(i),
                depth: i,
                node: node,
            };
        }
    }
    return candidate;
}; };
var isSelectionEndOfParagraph = function (state) {
    return state.selection.$to.parent.type === state.schema.nodes.paragraph &&
        state.selection.$to.pos === state.doc.resolve(state.selection.$to.pos).end();
};
function nodesBetweenChanged(tr, f, startPos) {
    var stepRange = getStepRange(tr);
    if (!stepRange) {
        return;
    }
    tr.doc.nodesBetween(stepRange.from, stepRange.to, f, startPos);
}
function getNodesCount(node) {
    var count = {};
    node.nodesBetween(0, node.nodeSize - 2, function (node) {
        count[node.type.name] = (count[node.type.name] || 0) + 1;
    });
    return count;
}

function liftListItem(state, selection, tr) {
    var $from = selection.$from, $to = selection.$to;
    var nodeType = state.schema.nodes.listItem;
    var range = $from.blockRange($to, function (node) {
        return !!node.childCount &&
            !!node.firstChild &&
            node.firstChild.type === nodeType;
    });
    if (!range ||
        range.depth < 2 ||
        $from.node(range.depth - 1).type !== nodeType) {
        return tr;
    }
    var end = range.end;
    var endOfList = $to.end(range.depth);
    if (end < endOfList) {
        tr.step(new ReplaceAroundStep(end - 1, endOfList, end, endOfList, new Slice(Fragment.from(nodeType.create(undefined, range.parent.copy())), 1, 0), 1, true));
        range = new NodeRange(tr.doc.resolve($from.pos), tr.doc.resolve(endOfList), range.depth);
    }
    return tr.lift(range, liftTarget(range)).scrollIntoView();
}
function liftFollowingList(state, from, to, rootListDepth, tr) {
    var listItem = state.schema.nodes.listItem;
    var lifted = false;
    tr.doc.nodesBetween(from, to, function (node, pos) {
        if (!lifted && node.type === listItem && pos > from) {
            lifted = true;
            var listDepth = rootListDepth + 3;
            while (listDepth > rootListDepth + 2) {
                var start = tr.doc.resolve(tr.mapping.map(pos));
                listDepth = start.depth;
                var end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
                var sel = new TextSelection(start, end);
                tr = liftListItem(state, sel, tr);
            }
        }
    });
    return tr;
}

// This will return (depth - 1) for root list parent of a list.
var getListLiftTarget = function (schema, resPos) {
    var target = resPos.depth;
    var _a = schema.nodes, bulletList = _a.bulletList, orderedList = _a.orderedList, listItem = _a.listItem;
    for (var i = resPos.depth; i > 0; i--) {
        var node = resPos.node(i);
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
    var _a = state.selection, from = _a.from, to = _a.to;
    var paragraph = state.schema.nodes.paragraph;
    var listCol = [];
    tr.doc.nodesBetween(from, to, function (node, pos) {
        if (node.type === paragraph) {
            listCol.push({ node: node, pos: pos });
        }
    });
    for (var i = listCol.length - 1; i >= 0; i--) {
        var paragraph_1 = listCol[i];
        var start = tr.doc.resolve(tr.mapping.map(paragraph_1.pos));
        if (start.depth > 0) {
            var end = void 0;
            if (paragraph_1.node.textContent && paragraph_1.node.textContent.length > 0) {
                end = tr.doc.resolve(tr.mapping.map(paragraph_1.pos + paragraph_1.node.textContent.length));
            }
            else {
                end = tr.doc.resolve(tr.mapping.map(paragraph_1.pos + 1));
            }
            var range = start.blockRange(end);
            if (range) {
                tr.lift(range, getListLiftTarget(state.schema, start));
            }
        }
    }
    return tr;
}

var isMarkAllowedInRange = function (doc, ranges, type) {
    var _loop_1 = function (i) {
        var _a = ranges[i], $from = _a.$from, $to = _a.$to;
        var can = $from.depth === 0 ? doc.type.allowsMarkType(type) : false;
        doc.nodesBetween($from.pos, $to.pos, function (node) {
            if (can) {
                return false;
            }
            can = node.inlineContent && node.type.allowsMarkType(type);
            return;
        });
        if (can) {
            return { value: can };
        }
    };
    for (var i = 0; i < ranges.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return false;
};
var isMarkExcluded = function (type, marks) {
    if (marks) {
        return marks.some(function (mark) { return mark.type !== type && mark.type.excludes(type); });
    }
    return false;
};
var not = function (fn) { return function (arg) { return !fn(arg); }; };
var ɵ0$3 = not;
var removeBlockMarks = function (state, marks) {
    var selection = state.selection, schema = state.schema;
    var tr = state.tr;
    // Marks might not exist in Schema
    var marksToRemove = marks.filter(Boolean);
    if (marksToRemove.length === 0) {
        return undefined;
    }
    /** Saves an extra dispatch */
    var blockMarksExists = false;
    var hasMark = function (mark) { return marksToRemove.indexOf(mark.type) > -1; };
    /**
     * When you need to toggle the selection
     * when another type which does not allow alignment is applied
     */
    state.doc.nodesBetween(selection.from, selection.to, function (node, pos) {
        if (node.type === schema.nodes.paragraph && node.marks.some(hasMark)) {
            blockMarksExists = true;
            var resolvedPos = state.doc.resolve(pos);
            var withoutBlockMarks = node.marks.filter(not(hasMark));
            tr = tr.setNodeMarkup(resolvedPos.pos, undefined, node.attrs, withoutBlockMarks);
        }
    });
    return blockMarksExists ? tr : undefined;
};
/**
 * Removes marks from nodes in the current selection that are not supported
 */
var sanitizeSelectionMarks = function (state) {
    var tr;
    var _a = state.tr.selection, $from = _a.$from, $to = _a.$to;
    state.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
        node.marks.forEach(function (mark) {
            if (!node.type.allowsMarkType(mark.type)) {
                var filteredMarks = node.marks.filter(function (m) { return m.type !== mark.type; });
                var position = pos > 0 ? pos - 1 : 0;
                tr = (tr || state.tr).setNodeMarkup(position, undefined, node.attrs, filteredMarks);
            }
        });
    });
    return tr;
};

var ZeroWidthSpace = "\u200b";
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
    var el = node;
    if (!el) {
        return null;
    }
    if (!document.documentElement || !document.documentElement.contains(el)) {
        return null;
    }
    var matches = el.matches ? "matches" : "msMatchesSelector";
    do {
        // @ts-ignore
        if (el[matches] && el[matches](s)) {
            return el;
        }
        el = (el.parentElement || el.parentNode);
    } while (el !== null && el.nodeType === 1);
    return null;
}
var isImage = function (fileType) {
    return (!!fileType &&
        (fileType.indexOf("image/") > -1 || fileType.indexOf("video/") > -1));
};
function canMoveUp(state) {
    var selection = state.selection, doc = state.doc;
    /**
     * If there"s a media element on the selection,
     * add text blocks with arrow navigation.
     * Also, the selection could be media | mediaGroup.
     */
    if (selection instanceof NodeSelection) {
        if (selection.node.type.name === "media") {
            /** Weird way of checking if the previous element is a paragraph */
            var mediaAncestorNode = doc.nodeAt(selection.anchor - 3);
            return !!(mediaAncestorNode && mediaAncestorNode.type.name === "paragraph");
        }
        else if (selection.node.type.name === "mediaGroup") {
            var mediaGroupAncestorNode = selection.$anchor.nodeBefore;
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
    var selection = state.selection, doc = state.doc;
    /**
     * If there"s a media element on the selection,
     * add text blocks with arrow navigation.
     * Also, the selection could be media | mediaGroup.
     */
    if (selection instanceof NodeSelection) {
        if (selection.node.type.name === "media") {
            var nodeAfter = doc.nodeAt(selection.$head.after());
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
    var docNode = selection.$anchor.node(0);
    var rootNode = selection.$anchor.node(1);
    return docNode.lastChild === rootNode;
}
function atTheEndOfDoc(state) {
    var selection = state.selection, doc = state.doc;
    return doc.nodeSize - selection.$to.pos - 2 === selection.$to.depth;
}
function atTheBeginningOfDoc(state) {
    var selection = state.selection;
    return selection.$from.pos === selection.$from.depth;
}
function atTheEndOfBlock(state) {
    var selection = state.selection;
    var $to = selection.$to;
    if (selection instanceof GapCursor) {
        return false;
    }
    if (selection instanceof NodeSelection && selection.node.isBlock) {
        return true;
    }
    return endPositionOfParent($to) === $to.pos + 1;
}
function atTheBeginningOfBlock(state) {
    var selection = state.selection;
    var $from = selection.$from;
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
    var _a = state.selection, empty = _a.empty, $cursor = _a.$cursor, ranges = _a.ranges;
    if (empty && !$cursor) {
        return false;
    }
    var isCompatibleMarkType = function (mark) {
        return isMarkTypeCompatibleWithMark(markType, mark);
    };
    // Handle any new marks in the current transaction
    if (state.tr.storedMarks &&
        !state.tr.storedMarks.every(isCompatibleMarkType)) {
        return false;
    }
    if ($cursor) {
        return $cursor.marks().every(isCompatibleMarkType);
    }
    // Check every node in a selection - ensuring that it is compatible with the current mark type
    return ranges.every(function (_a) {
        var $from = _a.$from, $to = _a.$to;
        var allowedInActiveMarks = $from.depth === 0 ? state.doc.marks.every(isCompatibleMarkType) : true;
        state.doc.nodesBetween($from.pos, $to.pos, function (node) {
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
    return (getAncestorNodesBetween(doc, $from, $to).filter(function (node) { return node.type !== nodeType; }).length === 0);
}
function createSliceWithContent(content, state) {
    return new Slice(Fragment.from(state.schema.text(content)), 0, 0);
}
/**
 * Determines if content inside a selection can be joined with the next block.
 * We need this check since the built-in method for "joinDown" will join a orderedList with bulletList.
 */
function canJoinDown(selection, doc, nodeType) {
    return checkNodeDown(selection, doc, function (node) { return node.type === nodeType; });
}
function checkNodeDown(selection, doc, filter) {
    var res = doc.resolve(selection.$to.after(findAncestorPosition(doc, selection.$to).depth));
    return res.nodeAfter ? filter(res.nodeAfter) : false;
}
var setNodeSelection = function (view, pos) {
    var state = view.state, dispatch = view.dispatch;
    if (!isFinite(pos)) {
        return;
    }
    var tr = state.tr.setSelection(NodeSelection.create(state.doc, pos));
    dispatch(tr);
};
function setTextSelection(view, anchor, head) {
    var state = view.state;
    var tr = state.tr.setSelection(TextSelection.create(state.doc, anchor, head));
    view.dispatch(tr);
}
/**
 * Determines if content inside a selection can be joined with the previous block.
 * We need this check since the built-in method for "joinUp" will join a orderedList with bulletList.
 */
function canJoinUp(selection, doc, nodeType) {
    var res = doc.resolve(selection.$from.before(findAncestorPosition(doc, selection.$from).depth));
    return res.nodeBefore && res.nodeBefore.type === nodeType;
}
/**
 * Returns all top-level ancestor-nodes between $from and $to
 */
function getAncestorNodesBetween(doc, $from, $to) {
    var nodes = Array();
    var maxDepth = findAncestorPosition(doc, $from).depth;
    var current = doc.resolve($from.start(maxDepth));
    while (current.pos <= $to.start($to.depth)) {
        var depth = Math.min(current.depth, maxDepth);
        var node = current.node(depth);
        if (node) {
            nodes.push(node);
        }
        if (depth === 0) {
            break;
        }
        var next = doc.resolve(current.after(depth));
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
function getGroupsInRange(doc, $from, $to, isNodeValid) {
    if (isNodeValid === void 0) { isNodeValid = validateNode; }
    var groups = Array();
    var commonAncestor = hasCommonAncestor(doc, $from, $to);
    var fromAncestor = findAncestorPosition(doc, $from);
    if (commonAncestor ||
        (fromAncestor.depth === 1 && isNodeValid($from.node(1)))) {
        groups.push({ $from: $from, $to: $to });
    }
    else {
        var current = $from;
        while (current.pos < $to.pos) {
            var ancestorPos = findAncestorPosition(doc, current);
            while (ancestorPos.depth > 1) {
                ancestorPos = findAncestorPosition(doc, ancestorPos);
            }
            var endPos = doc.resolve(Math.min(
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
    var nestableBlocks = ["blockquote", "bulletList", "orderedList"];
    if (pos.depth === 1) {
        return pos;
    }
    var node = pos.node(pos.depth);
    var newPos = pos;
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
    var current;
    var target;
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
    var startPos = $from.start($from.depth);
    var endPos = $to.end($to.depth);
    var target = Math.max(0, findAncestorPosition(doc, $from).depth - 1);
    tr.doc.nodesBetween(startPos, endPos, function (node, pos) {
        if (node.isText || // Text node
            (node.isTextblock && !node.textContent) // Empty paragraph
        ) {
            var res = tr.doc.resolve(tr.mapping.map(pos));
            var sel = new NodeSelection(res);
            var range = sel.$from.blockRange(sel.$to);
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
    var tr = view.state.tr;
    var _a = view.state.selection, $from = _a.$from, $to = _a.$to;
    var blockStart = tr.doc.resolve($from.start($from.depth - 1));
    var blockEnd = tr.doc.resolve($to.end($to.depth - 1));
    var range = blockStart.blockRange(blockEnd);
    view.dispatch(tr.lift(range, blockStart.depth - 1));
}
/**
 * Lift sibling nodes to document-level and select them.
 */
function liftAndSelectSiblingNodes(view) {
    var tr = view.state.tr;
    var _a = view.state.selection, $from = _a.$from, $to = _a.$to;
    var blockStart = tr.doc.resolve($from.start($from.depth - 1));
    var blockEnd = tr.doc.resolve($to.end($to.depth - 1));
    // TODO: [ts30] handle void and null properly
    var range = blockStart.blockRange(blockEnd);
    tr.setSelection(new TextSelection(blockStart, blockEnd));
    tr.lift(range, blockStart.depth - 1);
    return tr;
}
function wrapIn(nodeType, tr, $from, $to) {
    var range = $from.blockRange($to);
    var wrapping = range && findWrapping(range, nodeType);
    if (wrapping) {
        tr = tr.wrap(range, wrapping).scrollIntoView();
    }
    return tr;
}
/**
 * Repeating string for multiple times
 */
function stringRepeat(text, length) {
    var result = "";
    for (var x = 0; x < length; x++) {
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
    var el = document.createElement("fakeelement");
    var transitions = {
        transition: "transitionend",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
    };
    for (var t in transitions) {
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
    var nodes = [];
    if (state.selection) {
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var _b = state.schema.nodes, blockquote_1 = _b.blockquote, panel_1 = _b.panel, orderedList_1 = _b.orderedList, bulletList_1 = _b.bulletList, listItem_1 = _b.listItem, codeBlock_1 = _b.codeBlock;
        state.doc.nodesBetween($from.pos, $to.pos, function (node) {
            if ((node.isBlock &&
                [blockquote_1, panel_1, orderedList_1, bulletList_1, listItem_1].indexOf(node.type) >= 0) ||
                node.type === codeBlock_1) {
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
    var nodesTypes = getSelectedWrapperNodes(state);
    var panel = state.schema.nodes.panel;
    return nodesTypes.filter(function (type) { return type !== panel; }).length > 0;
}
var isTemporary = function (id) {
    return id.indexOf("temporary:") === 0;
};
var isEmptyNode = function (schema) {
    var _a = schema.nodes, doc = _a.doc, paragraph = _a.paragraph, codeBlock = _a.codeBlock, blockquote = _a.blockquote, panel = _a.panel, heading = _a.heading, listItem = _a.listItem, bulletList = _a.bulletList, orderedList = _a.orderedList, taskList = _a.taskList, taskItem = _a.taskItem, decisionList = _a.decisionList, decisionItem = _a.decisionItem, media = _a.media, mediaGroup = _a.mediaGroup, mediaSingle = _a.mediaSingle;
    var innerIsEmptyNode = function (node) {
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
                var isEmpty_1 = true;
                node.content.forEach(function (child) {
                    isEmpty_1 = isEmpty_1 && innerIsEmptyNode(child);
                });
                return isEmpty_1;
            default:
                return isNodeEmpty(node);
        }
    };
    return innerIsEmptyNode;
};
var insideTable = function (state) {
    var _a = state.schema.nodes, table = _a.table, tableCell = _a.tableCell;
    return hasParentNodeOfType([table, tableCell])(state.selection);
};
var insideTableCell = function (state) {
    var _a = state.schema.nodes, tableCell = _a.tableCell, tableHeader = _a.tableHeader;
    return hasParentNodeOfType([tableCell, tableHeader])(state.selection);
};
var isElementInTableCell = function (element) {
    return closest(element, "td") || closest(element, "th");
};
var isLastItemMediaGroup = function (node) {
    var content = node.content;
    return !!content.lastChild && content.lastChild.type.name === "mediaGroup";
};
var isInListItem = function (state) {
    return hasParentNodeOfType(state.schema.nodes.listItem)(state.selection);
};
var hasOpenEnd = function (slice) {
    return slice.openStart > 0 || slice.openEnd > 0;
};
function filterChildrenBetween(doc, from, to, predicate) {
    var results = [];
    doc.nodesBetween(from, to, function (node, pos, parent) {
        if (predicate(node, pos, parent)) {
            results.push({ node: node, pos: pos });
        }
    });
    return results;
}
function dedupe(list, iteratee) {
    if (list === void 0) { list = []; }
    var transformed = iteratee ? list.map(iteratee) : list;
    return transformed
        .map(function (item, index, list) { return (list.indexOf(item) === index ? item : null); })
        .reduce(function (acc, item, index) { return (!!item ? acc.concat(list[index]) : acc); }, []);
}
var isTextSelection = function (selection) { return selection instanceof TextSelection; };
/**
 * Compose 1 to n functions.
 * @param func first function
 * @param funcs additional functions
 */
function compose(func) {
    var funcs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        funcs[_i - 1] = arguments[_i];
    }
    var allFuncs = __spread([func], funcs);
    return function composed(raw) {
        return allFuncs.reduceRight(function (memo, func) { return func(memo); }, raw);
    };
}
// rest
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    if (fns.length === 0) {
        return function (a) { return a; };
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return fns.reduce(function (prevFn, nextFn) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return nextFn(prevFn.apply(void 0, __spread(args)));
    }; });
}
var normaliseNestedLayout = function (state, node) {
    if (state.selection.$from.depth > 1) {
        if (node.attrs.layout && node.attrs.layout !== "default") {
            return node.type.createChecked(__assign({}, node.attrs, { layout: "default" }), node.content, node.marks);
        }
        // If its a breakout layout, we can remove the mark
        // Since default isn"t a valid breakout mode.
        var breakoutMark = state.schema.marks.breakout;
        if (breakoutMark && breakoutMark.isInSet(node.marks)) {
            var newMarks = breakoutMark.removeFromSet(node.marks);
            return node.type.createChecked(node.attrs, node.content, newMarks);
        }
    }
    return node;
};

function findCutBefore($pos) {
    // parent is non-isolating, so we can look across this boundary
    if (!$pos.parent.type.spec.isolating) {
        // search up the tree from the pos"s *parent*
        for (var i = $pos.depth - 1; i >= 0; i--) {
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

var maxIndentation = 5;
var deletePreviousEmptyListItem = function (state, dispatch) {
    var $from = state.selection.$from;
    var listItem = state.schema.nodes.listItem;
    var $cut = findCutBefore($from);
    if (!$cut || !$cut.nodeBefore || !($cut.nodeBefore.type === listItem)) {
        return false;
    }
    var previousListItemEmpty = $cut.nodeBefore.childCount === 1 && $cut.nodeBefore.firstChild && $cut.nodeBefore.firstChild.nodeSize <= 2;
    if (previousListItemEmpty) {
        var tr = state.tr;
        if (dispatch) {
            dispatch(tr
                .delete($cut.pos - $cut.nodeBefore.nodeSize, $from.pos)
                .scrollIntoView());
        }
        return true;
    }
    return false;
};
var ɵ0$4 = deletePreviousEmptyListItem;
var joinToPreviousListItem = function (state, dispatch) {
    var $from = state.selection.$from;
    var _a = state.schema.nodes, paragraph = _a.paragraph, listItem = _a.listItem, codeBlock = _a.codeBlock, bulletList = _a.bulletList, orderedList = _a.orderedList;
    var isGapCursorShown = state.selection instanceof GapCursor;
    var $cutPos = isGapCursorShown ? state.doc.resolve($from.pos + 1) : $from;
    var $cut = findCutBefore($cutPos);
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
            var $lastNode = $cut.doc.resolve($cut.pos - 1);
            while ($lastNode.parent.type !== paragraph) {
                $lastNode = state.doc.resolve($lastNode.pos - 1);
            }
            var tr = state.tr;
            if (isGapCursorShown) {
                var nodeBeforePos = findPositionOfNodeBefore(tr.selection);
                if (typeof nodeBeforePos !== "number") {
                    return false;
                }
                // append the codeblock to the list node
                var list = $cut.nodeBefore.copy($cut.nodeBefore.content.append(Fragment.from(listItem.createChecked({}, $cut.nodeAfter))));
                tr.replaceWith(nodeBeforePos, $from.pos + $cut.nodeAfter.nodeSize, list);
            }
            else {
                // take the text content of the paragraph and insert after the paragraph up until before the the cut
                tr = state.tr.step(new ReplaceAroundStep($lastNode.pos, $cut.pos + $cut.nodeAfter.nodeSize, $cut.pos + 1, $cut.pos + $cut.nodeAfter.nodeSize - 1, state.tr.doc.slice($lastNode.pos, $cut.pos), 0, true));
            }
            // find out if there"s now another list following and join them
            // as in, [list, p, list] => [list with p, list], and we want [joined list]
            var $postCut = tr.doc.resolve(tr.mapping.map($cut.pos + $cut.nodeAfter.nodeSize));
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
var ɵ1$1 = joinToPreviousListItem;
var isInsideListItem = function (state) {
    var $from = state.selection.$from;
    var _a = state.schema.nodes, listItem = _a.listItem, paragraph = _a.paragraph;
    if (state.selection instanceof GapCursor) {
        return $from.parent.type === listItem;
    }
    return (hasParentNodeOfType(listItem)(state.selection) &&
        $from.parent.type === paragraph);
};
var ɵ2$1 = isInsideListItem;
var canToJoinToPreviousListItem = function (state) {
    var $from = state.selection.$from;
    var _a = state.schema.nodes, bulletList = _a.bulletList, orderedList = _a.orderedList;
    var $before = state.doc.resolve($from.pos - 1);
    var nodeBefore = $before ? $before.nodeBefore : null;
    if (state.selection instanceof GapCursor) {
        nodeBefore = $from.nodeBefore;
    }
    return (!!nodeBefore && [bulletList, orderedList].indexOf(nodeBefore.type) > -1);
};
var ɵ3 = canToJoinToPreviousListItem;
var canOutdent = function (state) {
    var parent = state.selection.$from.parent;
    var _a = state.schema.nodes, listItem = _a.listItem, paragraph = _a.paragraph;
    if (state.selection instanceof GapCursor) {
        return parent.type === listItem;
    }
    return (parent.type === paragraph && hasParentNodeOfType(listItem)(state.selection));
};
var ɵ4 = canOutdent;
var enterKeyCommand = function (state, dispatch) {
    var selection = state.selection;
    if (selection.empty) {
        var $from = selection.$from;
        var _a = state.schema.nodes, listItem = _a.listItem, codeBlock = _a.codeBlock;
        var node = $from.node($from.depth);
        var wrapper = $from.node($from.depth - 1);
        if (wrapper && wrapper.type === listItem) {
            /** Check if the wrapper has any visible content */
            var wrapperHasContent = hasVisibleContent(wrapper);
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
var backspaceKeyCommand = chainCommands(
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
        var ref = state.selection;
        var $from = ref.$from;
        var $to = ref.$to;
        var node = ref.node;
        if ((node && node.isBlock) || $from.depth < 2 || !$from.sameParent($to)) {
            return false;
        }
        var grandParent = $from.node(-1);
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
                var wrap = Fragment.empty;
                var keepItem = $from.index(-1) > 0;
                // Build a fragment containing empty versions of the structure
                // from the outer list item to the parent node of the cursor
                for (var d = $from.depth - (keepItem ? 1 : 2); d >= $from.depth - 3; d--) {
                    wrap = Fragment.from($from.node(d).copy(wrap));
                }
                // Add a second list item with an empty default start node
                wrap = wrap.append(Fragment.from(itemType.createAndFill()));
                var tr$1 = state.tr.replace($from.before(keepItem ? undefined : -1), $from.after(-3), new Slice(wrap, keepItem ? 3 : 2, 2));
                tr$1.setSelection(state.selection.constructor.near(tr$1.doc.resolve($from.pos + (keepItem ? 3 : 2))));
                dispatch(tr$1.scrollIntoView());
            }
            return true;
        }
        var nextType = $to.pos === $from.end()
            ? grandParent.contentMatchAt(0).defaultType
            : undefined;
        var tr = state.tr.delete($from.pos, $to.pos);
        var types = nextType && [undefined, { type: nextType }];
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
    return function (command) {
        return function (state, dispatch) {
            return command(state, function (tr) {
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
                var $start = state.doc.resolve(range.start);
                var $end = state.doc.resolve(range.end);
                var $join = tr.doc.resolve(tr.mapping.map(range.end - 1));
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
    };
}
function outdentList() {
    return function (state, dispatch) {
        var listItem = state.schema.nodes.listItem;
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        if (isInsideListItem(state)) {
            // if we"re backspacing at the start of a list item, unindent it
            // take the the range of nodes we might be lifting
            // the predicate is for when you"re backspacing a top level list item:
            // we don"t want to go up past the doc node, otherwise the range
            // to clear will include everything
            var range = $from.blockRange($to, function (node) { return node.childCount > 0 && node.firstChild && node.firstChild.type === listItem; });
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
    var currentIndentationLevel;
    var currentPos = state.tr.selection.$to.pos;
    do {
        var resolvedPos = state.doc.resolve(currentPos);
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
        var listItem = state.schema.nodes.listItem;
        if (isInsideListItem(state)) {
            // Record initial list indentation
            var initialIndentationLevel = numberNestedLists(state.selection.$from, state.schema.nodes);
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
        var tr = state.tr;
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        tr.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
            // Following condition will ensure that block types paragraph, heading, codeBlock, blockquote, panel are lifted.
            // isTextblock is true for paragraph, heading, codeBlock.
            if (node.isTextblock ||
                node.type.name === "blockquote" ||
                node.type.name === "panel") {
                var sel = new NodeSelection(tr.doc.resolve(tr.mapping.map(pos)));
                var range = sel.$from.blockRange(sel.$to);
                if (!range || sel.$from.parent.type !== state.schema.nodes.listItem) {
                    return false;
                }
                var target = range && liftTarget(range);
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
    var $from = selection.$from, $to = selection.$to;
    var isSameLine = $from.pos === $to.pos;
    var startPos = $from.pos;
    var endPos = $to.pos;
    if (isSameLine && startPos === doc.nodeSize - 3) {
        // Line is empty, don"t do anything
        return selection;
    }
    // Selection started at the very beginning of a line and therefor points to the previous line.
    if ($from.nodeBefore && !isSameLine) {
        startPos++;
        var node = doc.nodeAt(startPos);
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
var rootListDepth = function (pos, nodes) {
    var bulletList = nodes.bulletList, orderedList = nodes.orderedList, listItem = nodes.listItem;
    var depth;
    for (var i = pos.depth - 1; i > 0; i--) {
        var node = pos.node(i);
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
var numberNestedLists = function (resolvedPos, nodes) {
    var bulletList = nodes.bulletList, orderedList = nodes.orderedList;
    var count = 0;
    for (var i = resolvedPos.depth - 1; i > 0; i--) {
        var node = resolvedPos.node(i);
        if (node.type === bulletList || node.type === orderedList) {
            count += 1;
        }
    }
    return count;
};
var toggleList = function (state, dispatch, view, listType) {
    var selection = state.selection;
    var fromNode = selection.$from.node(selection.$from.depth - 2);
    var endNode = selection.$to.node(selection.$to.depth - 2);
    if (!fromNode ||
        fromNode.type.name !== listType ||
        (!endNode || endNode.type.name !== listType)) {
        return toggleListCommand(listType)(state, dispatch, view);
    }
    else {
        var depth = rootListDepth(selection.$to, state.schema.nodes);
        var tr = liftFollowingList(state, selection.$to.pos, selection.$to.end(depth), depth || 0, state.tr);
        tr = liftSelectionList(state, tr);
        dispatch(tr);
        return true;
    }
};
/**
 * Check of is selection is inside a list of the specified type
 */
function isInsideList(state, listType) {
    var $from = state.selection.$from;
    var parent = $from.node(-2);
    var grandgrandParent = $from.node(-3);
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
        var _a = state.selection, $from = _a.$from, $to = _a.$to;
        var isRangeOfSingleType = isRangeOfType(state.doc, $from, $to, state.schema.nodes[listType]);
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
            var tr = sanitizeSelectionMarks(state);
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
    return autoJoin(wrapInList$1(nodeType), function (before, after) { return before.type === after.type && before.type === nodeType; });
}

var ListMenu = /** @class */ (function () {
    function ListMenu(popoverController) {
        this.popoverController = popoverController;
    }
    ListMenu.prototype.level = function (level) {
        var _this = this;
        var command = level < 0 ? outdentList() : indentList();
        if (command(this.editor.state)) {
            command(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        }
        this.popoverController.dismiss();
    };
    ListMenu.prototype.toggleList = function (type) {
        var _this = this;
        toggleList(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); }, this.editor.view, type);
        this.popoverController.dismiss();
    };
    ListMenu.prototype.ngOnInit = function () {
        this.activeUnnumberedList = !!findParentNode(function (predicate) { return predicate.hasMarkup(schema.nodes.bulletList); })(this.editor.state.selection);
        this.activeNumberedList = !!findParentNode(function (predicate) { return predicate.hasMarkup(schema.nodes.orderedList); })(this.editor.state.selection);
    };
    ListMenu.prototype.ionViewWillLeave = function () {
        this.editor.focus();
    };
    ListMenu.ctorParameters = function () { return [
        { type: PopoverController }
    ]; };
    __decorate([
        Input()
    ], ListMenu.prototype, "editor", void 0);
    ListMenu = __decorate([
        Component({
            template: "\n        <ion-list lines=\"full\">\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleList('bulletList')\">\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#listMenu/Bulleted list\" | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeUnnumberedList\"></ion-icon>\n                <ion-icon src=\"assets/html-editor/list-bulleted.svg\" slot=\"start\"></ion-icon>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleList('orderedList')\">\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#listMenu/Numbered list\" | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeNumberedList\"></ion-icon>\n                <ion-icon src=\"assets/html-editor/list-numbered.svg\" slot=\"start\"></ion-icon>\n            </ion-item>\n\n            <ng-template [ngIf]=\"activeUnnumberedList || activeNumberedList\">\n\n                <ion-item-divider>\n                    <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#listMenu/Indent\" | intlMessage}}</ion-label>\n                </ion-item-divider>\n\n                <ion-item button=\"true\" detail=\"false\" (click)=\"level(-1)\">\n                    <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#listMenu/Decrease indent\" | intlMessage}}</ion-label>\n                    <ion-icon src=\"assets/html-editor/indent-decrease.svg\" slot=\"start\"></ion-icon>\n                </ion-item>\n\n                <ion-item button=\"true\" detail=\"false\" (click)=\"level(1)\">\n                    <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#listMenu/Increase indent\" | intlMessage}}</ion-label>\n                    <ion-icon src=\"assets/html-editor/indent-increase.svg\" slot=\"start\"></ion-icon>\n                </ion-item>\n\n            </ng-template>\n\n        </ion-list>\n    ",
            styles: ["\n        :host { user-select: none; }\n        :host ion-list { margin: 0px; padding: 0px; }\n        :host ion-item:last-child { --border-width: 0px; }\n        :host ion-item-divider { --background: transparent; font-size: small }\n        :host ion-item-divider ion-label { margin-top: 20px; opacity: 0.8; }\n    "]
        })
    ], ListMenu);
    return ListMenu;
}());

var FontSize = /** @class */ (function () {
    function FontSize(size) {
        this.size = size;
        FontSize._sizes.push(this);
        this.label = new MessageRef("@co.mmons/ionic-extensions/html-editor", "textMenu/fontSize/" + size.toUpperCase()[0] + size.substring(1));
    }
    FontSize.sizes = function () {
        return FontSize._sizes.slice();
    };
    FontSize._sizes = [];
    FontSize.small = new FontSize("small");
    FontSize.large = new FontSize("large");
    return FontSize;
}());

function markApplies(doc, from, to, type) {
    var applies = false;
    doc.nodesBetween(from, to, function (node, pos, parent) {
        if (applies) {
            return false;
        }
        applies = node.isInline && parent.type.allowsMarkType(type);
    });
    return applies;
}
// return true iff all nodes in range have the mark with the same attrs
function rangeHasMark(doc, from, to, type, attrs) {
    var hasMark = null;
    doc.nodesBetween(from, to, function (node) {
        for (var i = 0; i < node.marks.length; i++) {
            var markMatch = node.marks[i].type === type && (!attrs || shallowEqual(node.marks[i].attrs, attrs));
            hasMark = (markMatch && (hasMark === null || hasMark === true));
        }
        return hasMark;
    });
    return !!hasMark;
}
function toggleInlineMark(markType, attrs) {
    return function (state, dispatch) {
        var _a = state.selection, empty = _a.empty, from = _a.from, to = _a.to, $from = _a.$from;
        if (!markApplies(state.doc, from, to, markType)) {
            console.log("not applies");
            return false;
        }
        if (dispatch) {
            if (empty) {
                var markInSet = markType.isInSet(state.storedMarks || $from.marks());
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
    var selection = state.selection;
    if (selection instanceof NodeSelection && selection.node) {
        return selection.node.hasMarkup(nodeType, attrs, marks);
    }
    return selection.to <= selection.$from.end() && selection.$from.parent.hasMarkup(nodeType, attrs, marks);
}
function isMarkActive(state, type) {
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    if (empty) {
        return !!(type.isInSet(state.storedMarks || $from.marks()));
    }
    else {
        return state.doc.rangeHasMark(from, to, type);
    }
}
function anyMarkActive(state, types) {
    var e_1, _a, e_2, _b;
    var _c = state.selection, from = _c.from, $from = _c.$from, to = _c.to, empty = _c.empty;
    if (empty) {
        try {
            for (var types_1 = __values(types), types_1_1 = types_1.next(); !types_1_1.done; types_1_1 = types_1.next()) {
                var type = types_1_1.value;
                if (type.isInSet(state.storedMarks || $from.marks())) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (types_1_1 && !types_1_1.done && (_a = types_1.return)) _a.call(types_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else {
        try {
            for (var types_2 = __values(types), types_2_1 = types_2.next(); !types_2_1.done; types_2_1 = types_2.next()) {
                var type = types_2_1.value;
                if (state.doc.rangeHasMark(from, to, type)) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (types_2_1 && !types_2_1.done && (_b = types_2.return)) _b.call(types_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return false;
}

var TextFormatMenu = /** @class */ (function () {
    function TextFormatMenu(popoverController) {
        this.popoverController = popoverController;
        this.FontSize = FontSize;
    }
    TextFormatMenu.prototype.toggle = function (name) {
        var _this = this;
        var command;
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
            command(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        }
        this.popoverController.dismiss();
    };
    TextFormatMenu.prototype.resetFontSize = function () {
        var _this = this;
        toggleMark(schema.marks.fontSize)(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        this.popoverController.dismiss();
    };
    TextFormatMenu.prototype.toggleFontSize = function (size) {
        var _this = this;
        var command = toggleInlineMark(schema.marks.fontSize, { fontSize: size.size });
        if (command(this.editor.state)) {
            command(this.editor.state, function (tr) { return _this.editor.view.dispatch(tr); });
        }
        this.popoverController.dismiss();
    };
    TextFormatMenu.prototype.ngOnInit = function () {
        var e_1, _a, e_2, _b;
        this.boldActivated = isMarkActive(this.editor.state, schema.marks.strong);
        this.italicActivated = isMarkActive(this.editor.state, schema.marks.em);
        this.underlineActivated = isMarkActive(this.editor.state, schema.marks.underline);
        this.activeFontSize = undefined;
        try {
            MARKS: for (var _c = __values(findMarksInSelection(this.editor.state, schema.marks.fontSize)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var mark = _d.value;
                try {
                    for (var _e = __values(FontSize.sizes()), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var size = _f.value;
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
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    TextFormatMenu.prototype.ionViewWillLeave = function () {
        this.editor.focus();
    };
    TextFormatMenu.ctorParameters = function () { return [
        { type: PopoverController }
    ]; };
    __decorate([
        Input()
    ], TextFormatMenu.prototype, "editor", void 0);
    TextFormatMenu = __decorate([
        Component({
            template: "\n        <ion-list lines=\"full\">\n            \n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggle('bold')\">\n                <ion-label style=\"font-weight: bold\">{{\"@co.mmons/ionic-extensions/html-editor#textMenu/Bold\" | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"boldActivated\"></ion-icon>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggle('italic')\">\n                <ion-label style=\"font-style: italic\">{{\"@co.mmons/ionic-extensions/html-editor#textMenu/Italic\" | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"italicActivated\"></ion-icon>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggle('underline')\">\n                <ion-label style=\"text-decoration: underline\">{{\"@co.mmons/ionic-extensions/html-editor#textMenu/Underline\" | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"underlineActivated\"></ion-icon>\n            </ion-item>\n            \n            <ion-item-divider>\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#textMenu/fontSize/Text size\" | intlMessage}}</ion-label>\n            </ion-item-divider>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"resetFontSize()\" *ngIf=\"activeFontSize\">\n                <ion-label>{{\"@co.mmons/ionic-extensions/html-editor#textMenu/fontSize/Default\" | intlMessage}}</ion-label>\n            </ion-item>\n\n            <ion-item button=\"true\" detail=\"false\" (click)=\"toggleFontSize(fontSize)\" *ngFor=\"let fontSize of FontSize.sizes()\">\n                <ion-label [style.fontSize]=\"fontSize.size\">{{fontSize.label | intlMessage}}</ion-label>\n                <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"activeFontSize === fontSize\"></ion-icon>\n            </ion-item>\n\n        </ion-list>\n    ",
            styles: ["\n        :host { user-select: none; }\n        :host ion-list { margin: 0px; padding: 0px; }\n        :host ion-item:last-child { --border-width: 0px; }\n        :host ion-item-divider { --background: transparent; font-size: small }\n        :host ion-item-divider ion-label { margin-top: 20px; opacity: 0.8; }\n    "]
        })
    ], TextFormatMenu);
    return TextFormatMenu;
}());

function isBlockMarkActive(state, type) {
    var e_1, _a;
    var _b = state.selection, from = _b.from, $from = _b.$from, to = _b.to, empty = _b.empty;
    if (empty) {
        try {
            for (var _c = __values($from.parent.marks), _d = _c.next(); !_d.done; _d = _c.next()) {
                var mark = _d.value;
                if (mark.type === type) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    else {
        return state.doc.rangeHasMark(from, to, type);
    }
}

var Toolbar = /** @class */ (function () {
    function Toolbar(popoverController, platform, editor, eventManager, modalController) {
        this.popoverController = popoverController;
        this.platform = platform;
        this.editor = editor;
        this.eventManager = eventManager;
        this.modalController = modalController;
        this.activeFeatures = {};
    }
    Toolbar.prototype.showMenu = function (event, menu) {
        return __awaiter(this, void 0, void 0, function () {
            var components, popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        components = {
                            text: TextFormatMenu,
                            list: ListMenu,
                            alignment: AlignmentMenu,
                            insert: InsertMenu,
                            heading: HeadingMenu
                        };
                        return [4 /*yield*/, this.popoverController.create({
                                component: components[menu],
                                componentProps: {
                                    editor: this.editor
                                },
                                event: event,
                                showBackdrop: this.platform.is("ios")
                            })];
                    case 1:
                        popover = _a.sent();
                        popover.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbar.prototype.editLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                LinkModal.present(this.modalController, this.editor);
                return [2 /*return*/];
            });
        });
    };
    Toolbar.prototype.undo = function () {
        var _this = this;
        undo(this.editor.view.state, function (transaction) { return _this.editor.view.updateState(_this.editor.view.state.apply(transaction)); });
        this.editor.focus();
    };
    Toolbar.prototype.redo = function () {
        var _this = this;
        redo(this.editor.view.state, function (transaction) { return _this.editor.view.updateState(_this.editor.view.state.apply(transaction)); });
        this.editor.focus();
    };
    Toolbar.prototype.editorSelectionChanged = function () {
        this.canUndo = undoDepth(this.editor.view.state) > 0;
        this.canRedo = redoDepth(this.editor.view.state) > 0;
        this.activeFeatures = {};
        this.activeFeatures.text = anyMarkActive(this.editor.view.state, [schema.marks.strong, schema.marks.em, schema.marks.underline, schema.marks.fontSize]);
        this.activeFeatures.list = !!findParentNode(function (predicate) { return predicate.hasMarkup(schema.nodes.orderedList) || predicate.hasMarkup(schema.nodes.bulletList); })(this.editor.state.selection);
        this.activeFeatures.alignment = isBlockMarkActive(this.editor.view.state, schema.marks.alignment);
        this.activeFeatures.heading = !!findParentNodeOfType(schema.nodes.heading)(this.editor.state.selection);
        this.activeFeatures.link = isMarkActive(this.editor.view.state, schema.marks.link);
    };
    Toolbar.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.selectionSubscription = this.editor.selectionChange.subscribe(function () { return _this.editorSelectionChanged(); });
                this.editorSelectionChanged();
                return [2 /*return*/];
            });
        });
    };
    Toolbar.prototype.ngOnDestroy = function () {
        unsubscribe(this.selectionSubscription);
    };
    Toolbar.ctorParameters = function () { return [
        { type: PopoverController },
        { type: Platform },
        { type: HtmlEditor },
        { type: EventManager },
        { type: ModalController }
    ]; };
    Toolbar = __decorate([
        Component({
            selector: "ionx-html-editor-toolbar",
            template: "\n        <ion-button size=\"small\" fill=\"clear\" [class.active-feature]=\"activeFeatures.text\" (click)=\"showMenu($event, 'text')\">\n            <ion-icon name=\"md-arrow-dropdown\" slot=\"end\"></ion-icon>\n            <span>{{\"@co.mmons/ionic-extensions/html-editor#Text\" | intlMessage}}</span>\n        </ion-button>\n\n        <ion-button size=\"small\" fill=\"clear\" [class.active-feature]=\"activeFeatures.alignment\" (click)=\"showMenu($event, 'alignment')\" *ngIf=\"!editor.features || editor.features.alignment\">\n            <ion-icon name=\"md-arrow-dropdown\" slot=\"end\"></ion-icon>\n            <span>{{\"@co.mmons/ionic-extensions/html-editor#Alignment\" | intlMessage}}</span>\n        </ion-button>\n\n        <ion-button size=\"small\" fill=\"clear\" [class.active-feature]=\"activeFeatures.heading\" (click)=\"showMenu($event, 'heading')\" *ngIf=\"!editor.features || editor.features.heading\">\n            <ion-icon name=\"md-arrow-dropdown\" slot=\"end\"></ion-icon>\n            <span>{{\"@co.mmons/ionic-extensions/html-editor#Heading\" | intlMessage}}</span>\n        </ion-button>\n        \n        <ion-button size=\"small\" fill=\"clear\" [class.active-feature]=\"activeFeatures.list\" (click)=\"showMenu($event, 'list')\" *ngIf=\"!editor.features || editor.features.list\">\n            <ion-icon name=\"md-arrow-dropdown\" slot=\"end\"></ion-icon>\n            <span>{{\"@co.mmons/ionic-extensions/html-editor#listMenu/List\" | intlMessage}}</span>\n        </ion-button>\n\n        <ion-button size=\"small\" fill=\"clear\" (click)=\"showMenu($event, 'insert')\" *ngIf=\"!editor.features || editor.features.link || editor.features.multimedia\">\n            <ion-icon name=\"md-arrow-dropdown\" slot=\"end\"></ion-icon>\n            <span>{{\"@co.mmons/ionic-extensions/html-editor#Insert\" | intlMessage}}</span>\n        </ion-button>\n        \n        <ion-button size=\"small\" fill=\"clear\" class=\"active-feature\" (click)=\"editLink()\" *ngIf=\"activeFeatures.link\">\n            <span>{{\"@co.mmons/ionic-extensions/html-editor#link/Link\" | intlMessage}}</span>\n        </ion-button>\n        \n        <div ionx--buttons-group>\n            <ion-button size=\"small\" fill=\"clear\" tabindex=\"-1\" title=\"{{'@co.mmons/ionic-extensions/html-editor#Undo' | intlMessage}}\" [disabled]=\"!canUndo\" (click)=\"undo()\">\n                <ion-icon name=\"undo\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n    \n            <ion-button size=\"small\" fill=\"clear\" title=\"{{'@co.mmons/ionic-extensions/html-editor#Redo' | intlMessage}}\" [disabled]=\"!canRedo\" (click)=\"redo()\">\n                <ion-icon name=\"redo\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </div>\n    ",
            styles: ["\n        :host { outline: none; display: flex; justify-content: center; flex-wrap: wrap; position: sticky; position: -webkit-sticky; top: 0px; background-color: var(--background); }\n        :host-context(.ion-focused) { background-color: var(--background-focused); }\n        :host ion-button { margin: 0px 4px; --padding-end: 2px; --padding-start: 4px; }\n        :host ion-button.active-feature span { font-weight: 800; }\n        :host ion-icon[slot=\"end\"] { margin: 0px; }\n        :host ion-button[disabled] { opacity: 0.5; }\n        :host [ionx--buttons-group] { display: flex; }\n        :host [ionx--buttons-group] ion-button:not(:last-child) { margin-right: 0px; }\n    "]
        })
    ], Toolbar);
    return Toolbar;
}());

var HtmlEditorModule = /** @class */ (function () {
    function HtmlEditorModule() {
    }
    HtmlEditorModule = __decorate([
        NgModule({
            imports: [CommonModule, IonicModule, IntlModule, SelectModule, FormsModule, ReactiveFormsModule, FormHelperModule, ButtonsModule, MatchMediaModule, SpinnerModule],
            declarations: [HtmlEditor, AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu, Toolbar],
            exports: [HtmlEditor, IntlModule],
            entryComponents: [AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu]
        })
    ], HtmlEditorModule);
    return HtmlEditorModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { HtmlEditor, HtmlEditorModule, AlignmentMenu as ɵa, HeadingMenu as ɵb, InsertMenu as ɵc, LinkModal as ɵd, ListMenu as ɵe, TextFormatMenu as ɵf, Toolbar as ɵg };
//# sourceMappingURL=html-editor-module.js.map
