var HtmlEditor_1;
import { __awaiter, __decorate, __param } from "tslib";
import { AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
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
        styles: [":host ::ng-deep .ProseMirror{outline:0;-moz-user-select:text;-ms-user-select:text;user-select:text;-webkit-user-select:text}:host ::ng-deep .ProseMirror[contenteditable=true]{min-height:60px;white-space:pre-wrap;word-wrap:break-word}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--selected{border:4px solid var(--ion-color-primary)}:host ::ng-deep .ProseMirror:not([contenteditable=true]) .ionx--interactive{display:none}:host ::ng-deep .ProseMirror p{margin:16px 0 0}:host ::ng-deep .ProseMirror p:first-child{margin-top:0}:host ::ng-deep .ProseMirror h1{font-size:130%}:host ::ng-deep .ProseMirror h2{font-size:125%}:host ::ng-deep .ProseMirror h3{font-size:120%}:host ::ng-deep .ProseMirror h4{font-size:115%}:host ::ng-deep .ProseMirror h5{font-size:110%}:host ::ng-deep .ProseMirror h6{font-size:105%}:host ::ng-deep .ProseMirror h1,:host ::ng-deep .ProseMirror h2,:host ::ng-deep .ProseMirror h3,:host ::ng-deep .ProseMirror h4,:host ::ng-deep .ProseMirror h5,:host ::ng-deep .ProseMirror h6{margin-top:16px;margin-bottom:8px}:host ::ng-deep .ProseMirror h1:first-child,:host ::ng-deep .ProseMirror h2:first-child,:host ::ng-deep .ProseMirror h3:first-child,:host ::ng-deep .ProseMirror h4:first-child,:host ::ng-deep .ProseMirror h5:first-child,:host ::ng-deep .ProseMirror h6:first-child{margin-top:0}:host ::ng-deep .ProseMirror ul:first-child{margin-top:0}"]
    }),
    __param(2, Optional()),
    __param(3, Optional())
], HtmlEditor);
export { HtmlEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJlZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekwsT0FBTyxFQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsU0FBUyxFQUFFLGFBQWEsRUFBUyxNQUFNLG1CQUFtQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxXQUFXLEVBQXNCLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFD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LEtBQUssRUFBRTs0Q0FDVTtBQTRCbEI7SUFEQyxNQUFNLEVBQUU7MENBQytDO0FBR3hEO0lBREMsTUFBTSxFQUFFO21EQUN3RDtBQUdqRTtJQURDLEtBQUssRUFBRTt1Q0FrQlA7QUF0RlEsVUFBVTtJQVB0QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRTs7S0FFVDs7S0FFSixDQUFDO0lBUU8sV0FBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLFdBQUEsUUFBUSxFQUFFLENBQUE7R0FSTixVQUFVLENBOFd0QjtTQTlXWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7RXZlbnRNYW5hZ2VyfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHt3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge0lvbkl0ZW19IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtiYXNlS2V5bWFwfSBmcm9tIFwicHJvc2VtaXJyb3ItY29tbWFuZHNcIjtcbmltcG9ydCB7Z2FwQ3Vyc29yfSBmcm9tIFwicHJvc2VtaXJyb3ItZ2FwY3Vyc29yXCI7XG5pbXBvcnQge2hpc3Rvcnl9IGZyb20gXCJwcm9zZW1pcnJvci1oaXN0b3J5XCI7XG5pbXBvcnQge2tleW1hcH0gZnJvbSBcInByb3NlbWlycm9yLWtleW1hcFwiO1xuaW1wb3J0IHtET01QYXJzZXIsIERPTVNlcmlhbGl6ZXIsIFNjaGVtYX0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5pbXBvcnQge0VkaXRvclN0YXRlLCBQbHVnaW4sIFRyYW5zYWN0aW9ufSBmcm9tIFwicHJvc2VtaXJyb3Itc3RhdGVcIjtcbmltcG9ydCB7RWRpdG9yVmlld30gZnJvbSBcInByb3NlbWlycm9yLXZpZXdcIjtcbmltcG9ydCB7SHRtbEVkaXRvckZlYXR1cmVzfSBmcm9tIFwiLi9lZGl0b3ItZmVhdHVyZXNcIjtcbmltcG9ydCB7YnVpbGRLZXltYXB9IGZyb20gXCIuL3Byb3NlbWlycm9yL2tleW1hcFwiO1xuaW1wb3J0IHtzY2hlbWF9IGZyb20gXCIuL3Byb3NlbWlycm9yL3NjaGVtYVwiO1xuaW1wb3J0IHtjcmVhdGVZb3V0dWJlSWZyYW1lLCBZb3V0dWJlTm9kZVZpZXd9IGZyb20gXCIuL3Byb3NlbWlycm9yL3ZpZXdzL3lvdXR1YmVcIjtcbmltcG9ydCB7ZmluZFNjcm9sbFBhcmVudCwgc2Nyb2xsSW50b1ZpZXcsIHNjcm9sbFRvQ2FyZXR9IGZyb20gXCIuL3Njcm9sbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWh0bWwtZWRpdG9yXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbngtaHRtbC1lZGl0b3ItdG9vbGJhciBbc3R5bGUuZGlzcGxheV09XCJyZWFkb25seSA/ICdub25lJyA6ICcnXCI+PC9pb254LWh0bWwtZWRpdG9yLXRvb2xiYXI+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFtcImVkaXRvci5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEh0bWxFZGl0b3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpZEdlbmVyYXRvcjogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwdWJsaWMgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZm9ybUNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBpdGVtOiBJb25JdGVtXG4gICAgKSB7XG5cbiAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pZCA9IFwiaW9ueC10cml4LWVkaXRvclwiICsgKEh0bWxFZGl0b3IuaWRHZW5lcmF0b3IrKyk7XG4gICAgICAgIHRoaXMuaXRlbUlucHV0V3JhcHBlciA9ICEhdGhpcy5pdGVtO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vLWJsdXJcIiwgXCJcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBldmVudFVubGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG5cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW9ueC1pdGVtLWlucHV0LXdyYXBwZXJcIilcbiAgICAvKnByaXZhdGUqLyBpdGVtSW5wdXRXcmFwcGVyOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBmZWF0dXJlczogSHRtbEVkaXRvckZlYXR1cmVzO1xuXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSwgdGhhdCBzaG91bGQgYmUgc2V0IHdoZW4gZWRpdG9yIGlzIGZ1bGx5IGluaXRpYWxpemVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgdW5pbml0aWFsaXplZFZhbHVlOiBhbnk7XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPblRvdWNoZWQ6IEZ1bmN0aW9uO1xuXG4gICAgcHJpdmF0ZSBmb2N1c2VkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBzaWxlbnRDaGFuZ2VzOiBib29sZWFuO1xuXG4gICAgdmlldzogRWRpdG9yVmlldztcblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5zdGF0ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNjaGVtYTogU2NoZW1hO1xuXG4gICAgcHJpdmF0ZSBwbHVnaW5zOiBQbHVnaW5bXTtcblxuICAgIHByaXZhdGUgc2Nyb2xsUGFyZW50OiBIVE1MRWxlbWVudDtcblxuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHZhbHVlKGh0bWw6IHN0cmluZykge1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHtcblxuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBFZGl0b3JTdGF0ZS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHNjaGVtYTogdGhpcy52aWV3LnN0YXRlLnNjaGVtYSxcbiAgICAgICAgICAgICAgICBwbHVnaW5zOiB0aGlzLnZpZXcuc3RhdGUucGx1Z2lucyxcbiAgICAgICAgICAgICAgICBkb2M6IHRoaXMuZWRpdG9yRG9jKGh0bWwgfHwgXCI8ZGl2PjwvZGl2PlwiKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudmlldy51cGRhdGVTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5pbml0aWFsaXplZFZhbHVlID0gaHRtbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2lsZW50Q2hhbmdlcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMudmlldykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBET01TZXJpYWxpemVyLmZyb21TY2hlbWEodGhpcy5zY2hlbWEpLnNlcmlhbGl6ZUZyYWdtZW50KHRoaXMuc3RhdGUuZG9jLmNvbnRlbnQpO1xuICAgICAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRtcC5hcHBlbmRDaGlsZCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICghdG1wLmlubmVyVGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlT3V0cHV0VmFsdWUodG1wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudW5pbml0aWFsaXplZFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlT3V0cHV0VmFsdWUodmFsdWU6IEhUTUxFbGVtZW50KSB7XG5cbiAgICAgICAgdmFsdWUucXVlcnlTZWxlY3RvckFsbChcImRpdltkYXRhLXlvdXR1YmVdXCIpLmZvckVhY2goKG5vZGU6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBub2RlLmdldEF0dHJpYnV0ZShcImRhdGEteW91dHViZVwiKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNyZWF0ZVlvdXR1YmVJZnJhbWUocGFyYW1zWzBdLCBwYXJhbXMubGVuZ3RoID4gMSA/IHBhcmFtc1sxXSA6IHVuZGVmaW5lZCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWUuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUlucHV0VmFsdWUodmFsdWU6IEhUTUxFbGVtZW50KSB7XG5cbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9ICEhaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsUGFyZW50ID0gZmluZFNjcm9sbFBhcmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAodGhpcy52aWV3LmRvbSBhcyBIVE1MRWxlbWVudCkuZm9jdXMoe3ByZXZlbnRTY3JvbGw6IHRydWV9KTtcblxuICAgICAgICBjb25zdCBwb3MgPSB0aGlzLnZpZXcuZG9tQXRQb3ModGhpcy52aWV3LnN0YXRlLnNlbGVjdGlvbi50byk7XG4gICAgICAgIGlmIChwb3Mubm9kZSkge1xuICAgICAgICAgICAgaWYgKHBvcy5ub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvQ2FyZXQodGhpcy5zY3JvbGxQYXJlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxJbnRvVmlldyh0aGlzLnZpZXcuZG9tLnF1ZXJ5U2VsZWN0b3IoXCIuaW9ueC0tc2VsZWN0ZWRcIikgfHwgcG9zLm5vZGUgYXMgSFRNTEVsZW1lbnQsIHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGFzeW5jIGVkaXRvckluaXRpYWxpemVkKGV2ZW50OiBFdmVudCkge1xuXG4gICAgICAgIGlmICh0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSkge1xuICAgICAgICAgICAgLy8gdGhpcy50cml4RWRpdG9yLmxvYWRIVE1MKHRoaXMudW5pbml0aWFsaXplZFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMudHJpeEVkaXRvckNvbnRyb2xsZXIudG9vbGJhckNvbnRyb2xsZXIuYXBwbHlLZXlib2FyZENvbW1hbmQgPSB0aGlzLmFwcGx5S2V5Ym9hcmRDb21tYW5kLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgZWRpdG9yRm9jdXNlZChldmVudDogRXZlbnQpIHtcblxuICAgICAgICBpZiAodGhpcy5jb250cm9sT25Ub3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgZWRpdG9yQmx1cmVkKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlU2Nyb2xsKHZpZXc6IEVkaXRvclZpZXcpIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsUGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFBhcmVudCA9IGZpbmRTY3JvbGxQYXJlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zID0gdmlldy5kb21BdFBvcyh2aWV3LnN0YXRlLnNlbGVjdGlvbi50byk7XG4gICAgICAgIGlmIChwb3Mubm9kZSkge1xuICAgICAgICAgICAgaWYgKHBvcy5ub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvQ2FyZXQodGhpcy5zY3JvbGxQYXJlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxJbnRvVmlldyh2aWV3LmRvbS5xdWVyeVNlbGVjdG9yKFwiLmlvbngtLXNlbGVjdGVkXCIpIHx8IHBvcy5ub2RlIGFzIEhUTUxFbGVtZW50LCB0aGlzLnNjcm9sbFBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlZGl0b3JEb2MoaHRtbDogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGhpcy5wcmVwYXJlSW5wdXRWYWx1ZShub2RlKTtcblxuICAgICAgICByZXR1cm4gRE9NUGFyc2VyLmZyb21TY2hlbWEodGhpcy5zY2hlbWEpLnBhcnNlKG5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXRDb250cm9sQ3NzKCkge1xuXG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSB7XG4gICAgICAgICAgICBcImlvbi11bnRvdWNoZWRcIjogdGhpcy5mb3JtQ29udHJvbC51bnRvdWNoZWQsXG4gICAgICAgICAgICBcImlvbi10b3VjaGVkXCI6IHRoaXMuZm9ybUNvbnRyb2wudG91Y2hlZCxcbiAgICAgICAgICAgIFwiaW9uLXByaXN0aW5lXCI6IHRoaXMuZm9ybUNvbnRyb2wucHJpc3RpbmUsXG4gICAgICAgICAgICBcImlvbi1kaXJ0eVwiOiB0aGlzLmZvcm1Db250cm9sLmRpcnR5LFxuICAgICAgICAgICAgXCJpb24tdmFsaWRcIjogdGhpcy5mb3JtQ29udHJvbC52YWxpZCxcbiAgICAgICAgICAgIFwiaW9uLWludmFsaWRcIjogIXRoaXMuZm9ybUNvbnRyb2wudmFsaWRcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBlbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgICAgICBlbGVtZW50cy5wdXNoKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAodGhpcy5pdGVtKSB7XG4gICAgICAgICAgICBlbGVtZW50cy5wdXNoKHRoaXMuaXRlbVtcImVsXCJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgZSBvZiBlbGVtZW50cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjIGluIGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3Nlc1tjXSkge1xuICAgICAgICAgICAgICAgICAgICBlLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZS5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlSXRlbUNsYXNzZXMoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLml0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW06IEhUTUxFbGVtZW50ID0gdGhpcy5pdGVtW1wiZWxcIl07XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1oYXMtZm9jdXNcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtLWhhcy1mb2N1c1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZml4SXRlbU92ZXJmbG93KCkge1xuXG4gICAgICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW06IEhUTUxFbGVtZW50ID0gdGhpcy5pdGVtW1wiZWxcIl07XG4gICAgICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiAhIWl0ZW0uc2hhZG93Um9vdCAmJiAhIWl0ZW0uc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLml0ZW0taW5uZXJcIikpO1xuXG4gICAgICAgICAgICBpdGVtLnN0eWxlLm92ZXJmbG93ID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gYC5pdGVtLW5hdGl2ZSwgLml0ZW0taW5uZXIsIC5pbnB1dC13cmFwcGVyIHsgb3ZlcmZsb3c6IGluaXRpYWwgIWltcG9ydGFudDsgfWA7XG4gICAgICAgICAgICBpdGVtLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGVkaXRvclRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbikge1xuXG4gICAgICAgICh0aGlzLnZpZXcuZG9tIGFzIEhUTUxFbGVtZW50KS5mb2N1cyh7cHJldmVudFNjcm9sbDogdHJ1ZX0pO1xuXG4gICAgICAgIHRoaXMudmlldy51cGRhdGVTdGF0ZSh0aGlzLnZpZXcuc3RhdGUuYXBwbHkodHJhbnNhY3Rpb24pKTtcblxuICAgICAgICB0aGlzLmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UubmV4dCgpO1xuXG4gICAgICAgIGlmICh0cmFuc2FjdGlvbi5kb2NDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5uZXh0KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPbkNoYW5nZSAmJiAhdGhpcy5zaWxlbnRDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNpbGVudENoYW5nZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5Q2hhbmdlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcuZG9tW1wiY29udGVudEVkaXRhYmxlXCJdID0gIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpeEl0ZW1PdmVyZmxvdygpO1xuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICB0aGlzLnJlc2V0Q29udHJvbENzcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIGZvciAoY29uc3QgdW5saXN0ZW4gb2YgdGhpcy5ldmVudFVubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy52aWV3ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xuXG4gICAgICAgIHRoaXMucGx1Z2lucyA9IFtcbiAgICAgICAgICAgIGtleW1hcChidWlsZEtleW1hcChzY2hlbWEpKSxcbiAgICAgICAgICAgIGtleW1hcChiYXNlS2V5bWFwKSxcbiAgICAgICAgICAgIGdhcEN1cnNvcigpLFxuICAgICAgICAgICAgaGlzdG9yeSgpXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBFZGl0b3JTdGF0ZS5jcmVhdGUoe1xuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIHBsdWdpbnM6IHRoaXMucGx1Z2lucyxcbiAgICAgICAgICAgIGRvYzogdGhpcy5lZGl0b3JEb2ModGhpcy51bmluaXRpYWxpemVkVmFsdWUgPyB0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSA6IFwiPGRpdj48L2Rpdj5cIilcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IEVkaXRvclZpZXcodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgIGRpc3BhdGNoVHJhbnNhY3Rpb246ICh0cmFuc2FjdGlvbikgPT4gdGhpcy5lZGl0b3JUcmFuc2FjdGlvbih0cmFuc2FjdGlvbiksXG4gICAgICAgICAgICBoYW5kbGVTY3JvbGxUb1NlbGVjdGlvbjogKHZpZXcpID0+IHRoaXMuaGFuZGxlU2Nyb2xsKHZpZXcpLFxuXG4gICAgICAgICAgICBub2RlVmlld3M6IHtcbiAgICAgICAgICAgICAgICB5b3V0dWJlOiAobm9kZSwgdmlldykgPT4gbmV3IFlvdXR1YmVOb2RlVmlldyhub2RlLCB2aWV3LCB0aGlzLmV2ZW50TWFuYWdlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5yZWFkb25seUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcblxuICAgICAgICBpZiAoY2hhbmdlc1tcInJlYWRvbmx5XCJdIHx8IGNoYW5nZXNbXCJkaXNhYmxlZFwiXSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkb25seUNoYW5nZWQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIl19