import { __awaiter } from "tslib";
import { Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output } from "@angular/core";
import { NgControl } from "@angular/forms";
import { EventManager } from "@angular/platform-browser";
import { waitTill } from "@co.mmons/js-utils/core";
import { IonItem } from "@ionic/angular";
import { baseKeymap } from "prosemirror-commands";
import { gapCursor } from "prosemirror-gapcursor";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { DOMParser, DOMSerializer } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { buildKeymap } from "./prosemirror/keymap";
import { schema } from "./prosemirror/schema";
import { createYoutubeIframe, YoutubeNodeView } from "./prosemirror/views/youtube";
import { findScrollParent, scrollIntoView, scrollToCaret } from "./scroll";
export class HtmlEditor {
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
        this.id = "ionx-trix-editor" + (HtmlEditor.idGenerator++);
        this.itemInputWrapper = !!this.item;
        this.element.nativeElement.setAttribute("no-blur", "");
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
        this.silentChanges = false;
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
        if (!this.scrollParent) {
            this.scrollParent = findScrollParent(this.element.nativeElement);
        }
        this.view.dom.focus({ preventScroll: true });
        const pos = this.view.domAtPos(this.view.state.selection.to);
        if (pos.node) {
            if (pos.node.nodeType === Node.TEXT_NODE) {
                scrollToCaret(this.scrollParent);
            }
            else {
                scrollIntoView(this.view.dom.querySelector(".ionx--selected") || pos.node, this.scrollParent);
            }
        }
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
        if (pos.node) {
            if (pos.node.nodeType === Node.TEXT_NODE) {
                scrollToCaret(this.scrollParent);
            }
            else {
                scrollIntoView(view.dom.querySelector(".ionx--selected") || pos.node, this.scrollParent);
            }
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
                yield waitTill(() => !!item.shadowRoot && !!item.shadowRoot.querySelector(".item-inner"));
                item.style.overflow = "initial";
                const style = document.createElement("style");
                style.innerHTML = `.item-native, .item-inner, .input-wrapper { overflow: initial !important; }`;
                item.shadowRoot.appendChild(style);
            }
        });
    }
    editorTransaction(transaction) {
        this.view.dom.focus({ preventScroll: true });
        this.view.updateState(this.view.state.apply(transaction));
        this.focus();
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
}
HtmlEditor.idGenerator = 0;
HtmlEditor.decorators = [
    { type: Component, args: [{
                selector: "ionx-html-editor",
                template: `
        <ionx-html-editor-toolbar [style.display]="readonly ? 'none' : ''"></ionx-html-editor-toolbar>
    `,
                styles: [":host ::ng-deep .ProseMirror{outline:none;user-select:text;-webkit-user-select:text}:host ::ng-deep .ProseMirror[contenteditable=true]{min-height:60px;white-space:pre-wrap;word-wrap:break-word}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--selected{border:4px solid var(--ion-color-primary)}:host ::ng-deep .ProseMirror:not([contenteditable=true]) .ionx--interactive{display:none}:host ::ng-deep .ProseMirror p{margin:16px 0 0}:host ::ng-deep .ProseMirror p:first-child{margin-top:0}:host ::ng-deep .ProseMirror h1{font-size:130%}:host ::ng-deep .ProseMirror h2{font-size:125%}:host ::ng-deep .ProseMirror h3{font-size:120%}:host ::ng-deep .ProseMirror h4{font-size:115%}:host ::ng-deep .ProseMirror h5{font-size:110%}:host ::ng-deep .ProseMirror h6{font-size:105%}:host ::ng-deep .ProseMirror h1,:host ::ng-deep .ProseMirror h2,:host ::ng-deep .ProseMirror h3,:host ::ng-deep .ProseMirror h4,:host ::ng-deep .ProseMirror h5,:host ::ng-deep .ProseMirror h6{margin-top:16px;margin-bottom:8px}:host ::ng-deep .ProseMirror h1:first-child,:host ::ng-deep .ProseMirror h2:first-child,:host ::ng-deep .ProseMirror h3:first-child,:host ::ng-deep .ProseMirror h4:first-child,:host ::ng-deep .ProseMirror h5:first-child,:host ::ng-deep .ProseMirror h6:first-child{margin-top:0}:host ::ng-deep .ProseMirror ul:first-child{margin-top:0}\n"]
            },] }
];
HtmlEditor.ctorParameters = () => [
    { type: ElementRef },
    { type: EventManager },
    { type: NgControl, decorators: [{ type: Optional }] },
    { type: IonItem, decorators: [{ type: Optional }] }
];
HtmlEditor.propDecorators = {
    itemInputWrapper: [{ type: HostBinding, args: ["class.ionx-item-input-wrapper",] }],
    features: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    change: [{ type: Output }],
    selectionChange: [{ type: Output }],
    value: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2h0bWwtZWRpdG9yL2VkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFxQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFnQyxRQUFRLEVBQUUsTUFBTSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUN6TCxPQUFPLEVBQXVCLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsU0FBUyxFQUFFLGFBQWEsRUFBUyxNQUFNLG1CQUFtQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxXQUFXLEVBQXNCLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFFLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFDLE1B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ZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7RXZlbnRNYW5hZ2VyfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHt3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge0lvbkl0ZW19IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtiYXNlS2V5bWFwfSBmcm9tIFwicHJvc2VtaXJyb3ItY29tbWFuZHNcIjtcbmltcG9ydCB7Z2FwQ3Vyc29yfSBmcm9tIFwicHJvc2VtaXJyb3ItZ2FwY3Vyc29yXCI7XG5pbXBvcnQge2hpc3Rvcnl9IGZyb20gXCJwcm9zZW1pcnJvci1oaXN0b3J5XCI7XG5pbXBvcnQge2tleW1hcH0gZnJvbSBcInByb3NlbWlycm9yLWtleW1hcFwiO1xuaW1wb3J0IHtET01QYXJzZXIsIERPTVNlcmlhbGl6ZXIsIFNjaGVtYX0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5pbXBvcnQge0VkaXRvclN0YXRlLCBQbHVnaW4sIFRyYW5zYWN0aW9ufSBmcm9tIFwicHJvc2VtaXJyb3Itc3RhdGVcIjtcbmltcG9ydCB7RWRpdG9yVmlld30gZnJvbSBcInByb3NlbWlycm9yLXZpZXdcIjtcbmltcG9ydCB7SHRtbEVkaXRvckZlYXR1cmVzfSBmcm9tIFwiLi9lZGl0b3ItZmVhdHVyZXNcIjtcbmltcG9ydCB7YnVpbGRLZXltYXB9IGZyb20gXCIuL3Byb3NlbWlycm9yL2tleW1hcFwiO1xuaW1wb3J0IHtzY2hlbWF9IGZyb20gXCIuL3Byb3NlbWlycm9yL3NjaGVtYVwiO1xuaW1wb3J0IHtjcmVhdGVZb3V0dWJlSWZyYW1lLCBZb3V0dWJlTm9kZVZpZXd9IGZyb20gXCIuL3Byb3NlbWlycm9yL3ZpZXdzL3lvdXR1YmVcIjtcbmltcG9ydCB7ZmluZFNjcm9sbFBhcmVudCwgc2Nyb2xsSW50b1ZpZXcsIHNjcm9sbFRvQ2FyZXR9IGZyb20gXCIuL3Njcm9sbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWh0bWwtZWRpdG9yXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbngtaHRtbC1lZGl0b3ItdG9vbGJhciBbc3R5bGUuZGlzcGxheV09XCJyZWFkb25seSA/ICdub25lJyA6ICcnXCI+PC9pb254LWh0bWwtZWRpdG9yLXRvb2xiYXI+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFtcImVkaXRvci5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEh0bWxFZGl0b3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpZEdlbmVyYXRvcjogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwdWJsaWMgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZm9ybUNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBpdGVtOiBJb25JdGVtXG4gICAgKSB7XG5cbiAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pZCA9IFwiaW9ueC10cml4LWVkaXRvclwiICsgKEh0bWxFZGl0b3IuaWRHZW5lcmF0b3IrKyk7XG4gICAgICAgIHRoaXMuaXRlbUlucHV0V3JhcHBlciA9ICEhdGhpcy5pdGVtO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vLWJsdXJcIiwgXCJcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBldmVudFVubGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG5cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW9ueC1pdGVtLWlucHV0LXdyYXBwZXJcIilcbiAgICAvKnByaXZhdGUqLyBpdGVtSW5wdXRXcmFwcGVyOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBmZWF0dXJlczogSHRtbEVkaXRvckZlYXR1cmVzO1xuXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSwgdGhhdCBzaG91bGQgYmUgc2V0IHdoZW4gZWRpdG9yIGlzIGZ1bGx5IGluaXRpYWxpemVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgdW5pbml0aWFsaXplZFZhbHVlOiBhbnk7XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPblRvdWNoZWQ6IEZ1bmN0aW9uO1xuXG4gICAgcHJpdmF0ZSBmb2N1c2VkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBzaWxlbnRDaGFuZ2VzOiBib29sZWFuO1xuXG4gICAgdmlldzogRWRpdG9yVmlldztcblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5zdGF0ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNjaGVtYTogU2NoZW1hO1xuXG4gICAgcHJpdmF0ZSBwbHVnaW5zOiBQbHVnaW5bXTtcblxuICAgIHByaXZhdGUgc2Nyb2xsUGFyZW50OiBIVE1MRWxlbWVudDtcblxuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgdmFsdWUoaHRtbDogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudmlldykge1xuXG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IEVkaXRvclN0YXRlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnZpZXcuc3RhdGUuc2NoZW1hLFxuICAgICAgICAgICAgICAgIHBsdWdpbnM6IHRoaXMudmlldy5zdGF0ZS5wbHVnaW5zLFxuICAgICAgICAgICAgICAgIGRvYzogdGhpcy5lZGl0b3JEb2MoaHRtbCB8fCBcIjxkaXY+PC9kaXY+XCIpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy52aWV3LnVwZGF0ZVN0YXRlKHN0YXRlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51bmluaXRpYWxpemVkVmFsdWUgPSBodG1sO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IERPTVNlcmlhbGl6ZXIuZnJvbVNjaGVtYSh0aGlzLnNjaGVtYSkuc2VyaWFsaXplRnJhZ21lbnQodGhpcy5zdGF0ZS5kb2MuY29udGVudCk7XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdG1wLmFwcGVuZENoaWxkKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKCF0bXAuaW5uZXJUZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXBhcmVPdXRwdXRWYWx1ZSh0bXApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51bmluaXRpYWxpemVkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbmF0aXZlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVPdXRwdXRWYWx1ZSh2YWx1ZTogSFRNTEVsZW1lbnQpIHtcblxuICAgICAgICB2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2W2RhdGEteW91dHViZV1cIikuZm9yRWFjaCgobm9kZTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS15b3V0dWJlXCIpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY3JlYXRlWW91dHViZUlmcmFtZShwYXJhbXNbMF0sIHBhcmFtcy5sZW5ndGggPiAxID8gcGFyYW1zWzFdIDogdW5kZWZpbmVkKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZS5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlSW5wdXRWYWx1ZSh2YWx1ZTogSFRNTEVsZW1lbnQpIHtcblxuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gISFpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnNpbGVudENoYW5nZXMgPSB0cnVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnQgPSBmaW5kU2Nyb2xsUGFyZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgICh0aGlzLnZpZXcuZG9tIGFzIEhUTUxFbGVtZW50KS5mb2N1cyh7cHJldmVudFNjcm9sbDogdHJ1ZX0pO1xuXG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMudmlldy5kb21BdFBvcyh0aGlzLnZpZXcuc3RhdGUuc2VsZWN0aW9uLnRvKTtcbiAgICAgICAgaWYgKHBvcy5ub2RlKSB7XG4gICAgICAgICAgICBpZiAocG9zLm5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9DYXJldCh0aGlzLnNjcm9sbFBhcmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjcm9sbEludG9WaWV3KHRoaXMudmlldy5kb20ucXVlcnlTZWxlY3RvcihcIi5pb254LS1zZWxlY3RlZFwiKSB8fCBwb3Mubm9kZSBhcyBIVE1MRWxlbWVudCwgdGhpcy5zY3JvbGxQYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgYXN5bmMgZWRpdG9ySW5pdGlhbGl6ZWQoZXZlbnQ6IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMudW5pbml0aWFsaXplZFZhbHVlKSB7XG4gICAgICAgICAgICAvLyB0aGlzLnRyaXhFZGl0b3IubG9hZEhUTUwodGhpcy51bmluaXRpYWxpemVkVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcy50cml4RWRpdG9yQ29udHJvbGxlci50b29sYmFyQ29udHJvbGxlci5hcHBseUtleWJvYXJkQ29tbWFuZCA9IHRoaXMuYXBwbHlLZXlib2FyZENvbW1hbmQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBlZGl0b3JGb2N1c2VkKGV2ZW50OiBFdmVudCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xPblRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbUNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBlZGl0b3JCbHVyZWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVTY3JvbGwodmlldzogRWRpdG9yVmlldykge1xuXG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsUGFyZW50ID0gZmluZFNjcm9sbFBhcmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3MgPSB2aWV3LmRvbUF0UG9zKHZpZXcuc3RhdGUuc2VsZWN0aW9uLnRvKTtcbiAgICAgICAgaWYgKHBvcy5ub2RlKSB7XG4gICAgICAgICAgICBpZiAocG9zLm5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9DYXJldCh0aGlzLnNjcm9sbFBhcmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjcm9sbEludG9WaWV3KHZpZXcuZG9tLnF1ZXJ5U2VsZWN0b3IoXCIuaW9ueC0tc2VsZWN0ZWRcIikgfHwgcG9zLm5vZGUgYXMgSFRNTEVsZW1lbnQsIHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVkaXRvckRvYyhodG1sOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB0aGlzLnByZXBhcmVJbnB1dFZhbHVlKG5vZGUpO1xuXG4gICAgICAgIHJldHVybiBET01QYXJzZXIuZnJvbVNjaGVtYSh0aGlzLnNjaGVtYSkucGFyc2Uobm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldENvbnRyb2xDc3MoKSB7XG5cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IHtcbiAgICAgICAgICAgIFwiaW9uLXVudG91Y2hlZFwiOiB0aGlzLmZvcm1Db250cm9sLnVudG91Y2hlZCxcbiAgICAgICAgICAgIFwiaW9uLXRvdWNoZWRcIjogdGhpcy5mb3JtQ29udHJvbC50b3VjaGVkLFxuICAgICAgICAgICAgXCJpb24tcHJpc3RpbmVcIjogdGhpcy5mb3JtQ29udHJvbC5wcmlzdGluZSxcbiAgICAgICAgICAgIFwiaW9uLWRpcnR5XCI6IHRoaXMuZm9ybUNvbnRyb2wuZGlydHksXG4gICAgICAgICAgICBcImlvbi12YWxpZFwiOiB0aGlzLmZvcm1Db250cm9sLnZhbGlkLFxuICAgICAgICAgICAgXCJpb24taW52YWxpZFwiOiAhdGhpcy5mb3JtQ29udHJvbC52YWxpZFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5pdGVtW1wiZWxcIl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBlIG9mIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGMgaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzW2NdKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVJdGVtQ2xhc3NlcygpIHtcblxuICAgICAgICBpZiAoIXRoaXMuaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXRlbTogSFRNTEVsZW1lbnQgPSB0aGlzLml0ZW1bXCJlbFwiXTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1pbnRlcmFjdGl2ZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWhhcy1mb2N1c1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taGFzLWZvY3VzXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBmaXhJdGVtT3ZlcmZsb3coKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgICAgICAgY29uc3QgaXRlbTogSFRNTEVsZW1lbnQgPSB0aGlzLml0ZW1bXCJlbFwiXTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhaXRlbS5zaGFkb3dSb290ICYmICEhaXRlbS5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbS1pbm5lclwiKSk7XG5cbiAgICAgICAgICAgIGl0ZW0uc3R5bGUub3ZlcmZsb3cgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBgLml0ZW0tbmF0aXZlLCAuaXRlbS1pbm5lciwgLmlucHV0LXdyYXBwZXIgeyBvdmVyZmxvdzogaW5pdGlhbCAhaW1wb3J0YW50OyB9YDtcbiAgICAgICAgICAgIGl0ZW0uc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgZWRpdG9yVHJhbnNhY3Rpb24odHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uKSB7XG5cbiAgICAgICAgKHRoaXMudmlldy5kb20gYXMgSFRNTEVsZW1lbnQpLmZvY3VzKHtwcmV2ZW50U2Nyb2xsOiB0cnVlfSk7XG5cbiAgICAgICAgdGhpcy52aWV3LnVwZGF0ZVN0YXRlKHRoaXMudmlldy5zdGF0ZS5hcHBseSh0cmFuc2FjdGlvbikpO1xuXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5uZXh0KCk7XG5cbiAgICAgICAgaWYgKHRyYW5zYWN0aW9uLmRvY0NoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlLm5leHQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uQ2hhbmdlICYmICF0aGlzLnNpbGVudENoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2lsZW50Q2hhbmdlcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHlDaGFuZ2VkKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMudmlldy5kb21bXCJjb250ZW50RWRpdGFibGVcIl0gPSAhdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZml4SXRlbU92ZXJmbG93KCk7XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbUNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRDb250cm9sQ3NzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICAgICAgZm9yIChjb25zdCB1bmxpc3RlbiBvZiB0aGlzLmV2ZW50VW5saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXcuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnZpZXcgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XG5cbiAgICAgICAgdGhpcy5wbHVnaW5zID0gW1xuICAgICAgICAgICAga2V5bWFwKGJ1aWxkS2V5bWFwKHNjaGVtYSkpLFxuICAgICAgICAgICAga2V5bWFwKGJhc2VLZXltYXApLFxuICAgICAgICAgICAgZ2FwQ3Vyc29yKCksXG4gICAgICAgICAgICBoaXN0b3J5KClcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBzdGF0ZSA9IEVkaXRvclN0YXRlLmNyZWF0ZSh7XG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgcGx1Z2luczogdGhpcy5wbHVnaW5zLFxuICAgICAgICAgICAgZG9jOiB0aGlzLmVkaXRvckRvYyh0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSA/IHRoaXMudW5pbml0aWFsaXplZFZhbHVlIDogXCI8ZGl2PjwvZGl2PlwiKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgRWRpdG9yVmlldyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwge1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgZGlzcGF0Y2hUcmFuc2FjdGlvbjogKHRyYW5zYWN0aW9uKSA9PiB0aGlzLmVkaXRvclRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKSxcbiAgICAgICAgICAgIGhhbmRsZVNjcm9sbFRvU2VsZWN0aW9uOiAodmlldykgPT4gdGhpcy5oYW5kbGVTY3JvbGwodmlldyksXG5cbiAgICAgICAgICAgIG5vZGVWaWV3czoge1xuICAgICAgICAgICAgICAgIHlvdXR1YmU6IChub2RlLCB2aWV3KSA9PiBuZXcgWW91dHViZU5vZGVWaWV3KG5vZGUsIHZpZXcsIHRoaXMuZXZlbnRNYW5hZ2VyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNpbGVudENoYW5nZXMgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRvbmx5Q2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuXG4gICAgICAgIGlmIChjaGFuZ2VzW1wicmVhZG9ubHlcIl0gfHwgY2hhbmdlc1tcImRpc2FibGVkXCJdKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRvbmx5Q2hhbmdlZCgpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=