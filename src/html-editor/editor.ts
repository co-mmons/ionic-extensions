import {AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {EventManager} from "@angular/platform-browser";
import {waitTill} from "@co.mmons/js-utils/core";
import {IonItem} from "@ionic/angular";
import {baseKeymap} from "prosemirror-commands";
import {gapCursor} from "prosemirror-gapcursor";
import {history} from "prosemirror-history";
import {keymap} from "prosemirror-keymap";
import {DOMParser, DOMSerializer, Schema} from "prosemirror-model";
import {EditorState, Plugin, Transaction} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {HtmlEditorFeatures} from "./editor-features";
import {buildKeymap} from "./prosemirror/keymap";
import {schema} from "./prosemirror/schema";
import {createYoutubeIframe, YoutubeNodeView} from "./prosemirror/views/youtube";
import {findScrollParent, scrollIntoView} from "./scroll";

@Component({
    selector: "ionx-html-editor",
    template: `
        <ionx-html-editor-toolbar [style.display]="readonly ? 'none' : ''"></ionx-html-editor-toolbar>
    `,
    styleUrls: ["editor.scss"]
})
export class HtmlEditor implements OnInit, AfterViewInit, ControlValueAccessor, AfterContentChecked, OnDestroy, OnChanges {

    private static idGenerator: number = 0;

    constructor(
        private element: ElementRef<HTMLElement>,
        public eventManager: EventManager,
        @Optional() private formControl: NgControl,
        @Optional() private item: IonItem
    ) {

        if (formControl) {
            this.formControl.valueAccessor = this;
        }

        this.id = "ionx-trix-editor" + (HtmlEditor.idGenerator++);
        this.itemInputWrapper = !!this.item;

        this.element.nativeElement.setAttribute("no-blur", "");
    }

    private eventUnlisteners: Function[] = [];

    readonly id: string;

    @HostBinding("class.ionx-item-input-wrapper")
    /*private*/ itemInputWrapper: boolean;

    @Input()
    features: HtmlEditorFeatures;

    @Input()
    disabled: boolean;

    @Input()
    readonly: boolean;

    /**
     * Value, that should be set when editor is fully initialized.
     */
    private uninitializedValue: any;

    private controlOnChange: Function;

    private controlOnTouched: Function;

    private focused: boolean;

    private silentChanges: boolean;

    view: EditorView;

    get state() {
        return this.view.state;
    }

    private schema: Schema;

    private plugins: Plugin[];

    private scrollParent: HTMLElement;

    @Output()
    readonly change: EventEmitter<any> = new EventEmitter();

    @Output()
    readonly selectionChange: EventEmitter<any> = new EventEmitter();

    @Input()
    public set value(html: string) {

        if (this.view) {

            const state = EditorState.create({
                schema: this.view.state.schema,
                plugins: this.view.state.plugins,
                doc: this.editorDoc(html || "<div></div>")
            });

            this.view.updateState(state);

        } else {
            this.uninitializedValue = html;
        }

        this.silentChanges = false;
    }

    public get value(): string {
        if (this.view) {
            const value = DOMSerializer.fromSchema(this.schema).serializeFragment(this.state.doc.content);
            const tmp = document.createElement("div");
            tmp.appendChild(value);

            if (!tmp.innerText) {
                return null;
            } else {
                return this.prepareOutputValue(tmp);
            }

        } else {
            return this.uninitializedValue;
        }
    }

    get nativeElement(): HTMLElement {
        return this.element.nativeElement;
    }

    private prepareOutputValue(value: HTMLElement) {

        value.querySelectorAll("div[data-youtube]").forEach((node: HTMLElement) => {
            const params = node.getAttribute("data-youtube").split(",");
            node.appendChild(createYoutubeIframe(params[0], params.length > 1 ? params[1] : undefined));
        });

        return value.innerHTML;
    }

    private prepareInputValue(value: HTMLElement) {

    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = !!isDisabled;
    }

    writeValue(value: any) {
        this.silentChanges = true;
        this.value = value;
    }

    registerOnChange(fn: Function): void {
        this.controlOnChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.controlOnTouched = fn;
    }

    focus() {

        if (!this.scrollParent) {
            this.scrollParent = findScrollParent(this.element.nativeElement);
        }

        (this.view.dom as HTMLElement).focus({preventScroll: true});

        const pos = this.view.domAtPos(this.view.state.selection.to);
        if (pos.node) {
            scrollIntoView(pos.node.nodeType === Node.TEXT_NODE ? pos.node.parentElement : pos.node as HTMLElement, "auto", this.scrollParent);
        }
    }

    // @ts-ignore
    private async editorInitialized(event: Event) {

        if (this.uninitializedValue) {
            // this.trixEditor.loadHTML(this.uninitializedValue);
        }

        // this.trixEditorController.toolbarController.applyKeyboardCommand = this.applyKeyboardCommand.bind(this);
    }

    // @ts-ignore
    private editorFocused(event: Event) {

        if (this.controlOnTouched) {
            this.controlOnTouched(true);
        }

        this.focused = true;
        this.updateItemClasses();
    }

    // @ts-ignore
    private editorBlured(event: Event) {
        this.focused = false;
        this.updateItemClasses();
    }

    private handleScroll(view: EditorView) {

        if (!this.scrollParent) {
            this.scrollParent = findScrollParent(this.element.nativeElement);
        }

        const pos = view.domAtPos(view.state.selection.to);
        if (pos.node) {
            scrollIntoView(pos.node.nodeType === Node.TEXT_NODE ? pos.node.parentElement : pos.node as HTMLElement, "auto", this.scrollParent);
        }

        return false;
    }

    private editorDoc(html: string) {

        const node = document.createElement("div");
        node.innerHTML = html;
        this.prepareInputValue(node);

        return DOMParser.fromSchema(this.schema).parse(node);
    }

    private resetControlCss() {

        const classes = {
            "ion-untouched": this.formControl.untouched,
            "ion-touched": this.formControl.touched,
            "ion-pristine": this.formControl.pristine,
            "ion-dirty": this.formControl.dirty,
            "ion-valid": this.formControl.valid,
            "ion-invalid": !this.formControl.valid
        };

        const elements: HTMLElement[] = [];
        elements.push(this.element.nativeElement);

        if (this.item) {
            elements.push(this.item["el"]);
        }

        for (const e of elements) {
            for (const c in classes) {
                if (classes[c]) {
                    e.classList.add(c);
                } else {
                    e.classList.remove(c);
                }
            }
        }
    }

    private updateItemClasses() {

        if (!this.item) {
            return;
        }

        const item: HTMLElement = this.item["el"];

        if (this.disabled) {
            item.classList.remove("item-interactive");
        } else {
            item.classList.add("item-interactive");
        }

        if (this.focused) {
            item.classList.add("item-has-focus");
        } else {
            item.classList.remove("item-has-focus");
        }
    }

    private async fixItemOverflow() {

        if (this.item) {
            const item: HTMLElement = this.item["el"];
            await waitTill(() => !!item.shadowRoot && !!item.shadowRoot.querySelector(".item-inner"));

            item.style.overflow = "initial";

            const style = document.createElement("style");
            style.innerHTML = `.item-native, .item-inner, .input-wrapper { overflow: initial !important; }`;
            item.shadowRoot.appendChild(style);
        }

    }

    private editorTransaction(transaction: Transaction) {

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

    private readonlyChanged() {

        if (this.view) {
            this.view.dom["contentEditable"] = !this.readonly && !this.disabled ? "true" : "false";
        }

    }

    ngAfterViewInit(): void {
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

    ngOnChanges(changes: SimpleChanges): void {

        if (changes["readonly"] || changes["disabled"]) {
            this.readonlyChanged();
        }

    }
}
