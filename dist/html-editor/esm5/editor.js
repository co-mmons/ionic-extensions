import * as tslib_1 from "tslib";
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
        this.element.nativeElement.setAttribute("no-blur", "");
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
        if (!this.scrollParent) {
            this.scrollParent = findScrollParent(this.element.nativeElement);
        }
        this.view.dom.focus({ preventScroll: true });
        var pos = this.view.domAtPos(this.view.state.selection.to);
        if (pos.node) {
            if (pos.node.nodeType === Node.TEXT_NODE) {
                scrollToCaret(this.scrollParent);
            }
            else {
                scrollIntoView(pos.node, this.scrollParent);
            }
        }
    };
    // @ts-ignore
    HtmlEditor.prototype.editorInitialized = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
        if (pos.node) {
            if (pos.node.nodeType === Node.TEXT_NODE) {
                scrollToCaret(this.scrollParent);
            }
            else {
                scrollIntoView(pos.node, this.scrollParent);
            }
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
            for (var elements_1 = tslib_1.__values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var item_1, style;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.item) return [3 /*break*/, 2];
                        item_1 = this.item["el"];
                        return [4 /*yield*/, waitTill(function () { return !!item_1.shadowRoot && !!item_1.shadowRoot.querySelector(".item-inner"); })];
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
            for (var _b = tslib_1.__values(this.eventUnlisteners), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    tslib_1.__decorate([
        HostBinding("class.ionx-item-input-wrapper")
    ], HtmlEditor.prototype, "itemInputWrapper", void 0);
    tslib_1.__decorate([
        Input()
    ], HtmlEditor.prototype, "features", void 0);
    tslib_1.__decorate([
        Input()
    ], HtmlEditor.prototype, "disabled", void 0);
    tslib_1.__decorate([
        Input()
    ], HtmlEditor.prototype, "readonly", void 0);
    tslib_1.__decorate([
        Output()
    ], HtmlEditor.prototype, "change", void 0);
    tslib_1.__decorate([
        Output()
    ], HtmlEditor.prototype, "selectionChange", void 0);
    tslib_1.__decorate([
        Input()
    ], HtmlEditor.prototype, "value", null);
    HtmlEditor = HtmlEditor_1 = tslib_1.__decorate([
        Component({
            selector: "ionx-html-editor",
            template: "\n        <ionx-html-editor-toolbar [style.display]=\"readonly ? 'none' : ''\"></ionx-html-editor-toolbar>\n    ",
            styles: [":host ::ng-deep .ProseMirror{outline:0;-moz-user-select:text;-ms-user-select:text;user-select:text;-webkit-user-select:text}:host ::ng-deep .ProseMirror[contenteditable=true]{min-height:60px;white-space:pre-wrap;word-wrap:break-word}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--selected{border:4px solid var(--ion-color-primary)}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--interactive{display:none}:host ::ng-deep .ProseMirror p{margin:16px 0 0}:host ::ng-deep .ProseMirror p:first-child{margin-top:0}:host ::ng-deep .ProseMirror h1{font-size:130%}:host ::ng-deep .ProseMirror h2{font-size:125%}:host ::ng-deep .ProseMirror h3{font-size:120%}:host ::ng-deep .ProseMirror h4{font-size:115%}:host ::ng-deep .ProseMirror h5{font-size:110%}:host ::ng-deep .ProseMirror h6{font-size:105%}:host ::ng-deep .ProseMirror h1,:host ::ng-deep .ProseMirror h2,:host ::ng-deep .ProseMirror h3,:host ::ng-deep .ProseMirror h4,:host ::ng-deep .ProseMirror h5,:host ::ng-deep .ProseMirror h6{margin-top:16px;margin-bottom:8px}:host ::ng-deep .ProseMirror h1:first-child,:host ::ng-deep .ProseMirror h2:first-child,:host ::ng-deep .ProseMirror h3:first-child,:host ::ng-deep .ProseMirror h4:first-child,:host ::ng-deep .ProseMirror h5:first-child,:host ::ng-deep .ProseMirror h6:first-child{margin-top:0}:host ::ng-deep .ProseMirror ul:first-child{margin-top:0}"]
        }),
        tslib_1.__param(2, Optional()),
        tslib_1.__param(3, Optional())
    ], HtmlEditor);
    return HtmlEditor;
}());
export { HtmlEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJlZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6TCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDNUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFDLFdBQVcsRUFBc0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMs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UUFEWCxXQUFXLENBQUMsK0JBQStCLENBQUM7d0RBQ1A7SUFHdEM7UUFEQyxLQUFLLEVBQUU7Z0RBQ3FCO0lBRzdCO1FBREMsS0FBSyxFQUFFO2dEQUNVO0lBR2xCO1FBREMsS0FBSyxFQUFFO2dEQUNVO0lBNEJsQjtRQURDLE1BQU0sRUFBRTs4Q0FDK0M7SUFHeEQ7UUFEQyxNQUFNLEVBQUU7dURBQ3dEO0lBR2pFO1FBREMsS0FBSyxFQUFFOzJDQWtCUDtJQXRGUSxVQUFVO1FBUHRCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLGtIQUVUOztTQUVKLENBQUM7UUFRTyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO09BUk4sVUFBVSxDQTJXdEI7SUFBRCxpQkFBQztDQUFBLEFBM1dELElBMldDO1NBM1dZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE9wdGlvbmFsLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXN9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0NvbnRyb2x9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7SW9uSXRlbX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge2Jhc2VLZXltYXB9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtnYXBDdXJzb3J9IGZyb20gXCJwcm9zZW1pcnJvci1nYXBjdXJzb3JcIjtcbmltcG9ydCB7aGlzdG9yeX0gZnJvbSBcInByb3NlbWlycm9yLWhpc3RvcnlcIjtcbmltcG9ydCB7a2V5bWFwfSBmcm9tIFwicHJvc2VtaXJyb3Ita2V5bWFwXCI7XG5pbXBvcnQge0RPTVBhcnNlciwgRE9NU2VyaWFsaXplciwgU2NoZW1hfSBmcm9tIFwicHJvc2VtaXJyb3ItbW9kZWxcIjtcbmltcG9ydCB7RWRpdG9yU3RhdGUsIFBsdWdpbiwgVHJhbnNhY3Rpb259IGZyb20gXCJwcm9zZW1pcnJvci1zdGF0ZVwiO1xuaW1wb3J0IHtFZGl0b3JWaWV3fSBmcm9tIFwicHJvc2VtaXJyb3Itdmlld1wiO1xuaW1wb3J0IHtIdG1sRWRpdG9yRmVhdHVyZXN9IGZyb20gXCIuL2VkaXRvci1mZWF0dXJlc1wiO1xuaW1wb3J0IHtidWlsZEtleW1hcH0gZnJvbSBcIi4vcHJvc2VtaXJyb3Iva2V5bWFwXCI7XG5pbXBvcnQge3NjaGVtYX0gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivc2NoZW1hXCI7XG5pbXBvcnQge2NyZWF0ZVlvdXR1YmVJZnJhbWUsIFlvdXR1YmVOb2RlVmlld30gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivdmlld3MveW91dHViZVwiO1xuaW1wb3J0IHtmaW5kU2Nyb2xsUGFyZW50LCBzY3JvbGxJbnRvVmlldywgc2Nyb2xsVG9DYXJldH0gZnJvbSBcIi4vc2Nyb2xsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtaHRtbC1lZGl0b3JcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9ueC1odG1sLWVkaXRvci10b29sYmFyIFtzdHlsZS5kaXNwbGF5XT1cInJlYWRvbmx5ID8gJ25vbmUnIDogJydcIj48L2lvbngtaHRtbC1lZGl0b3ItdG9vbGJhcj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogW1wiZWRpdG9yLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgSHRtbEVkaXRvciBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblxuICAgIHByaXZhdGUgc3RhdGljIGlkR2VuZXJhdG9yOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHB1YmxpYyBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb3JtQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGl0ZW06IElvbkl0ZW1cbiAgICApIHtcblxuICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlkID0gXCJpb254LXRyaXgtZWRpdG9yXCIgKyAoSHRtbEVkaXRvci5pZEdlbmVyYXRvcisrKTtcbiAgICAgICAgdGhpcy5pdGVtSW5wdXRXcmFwcGVyID0gISF0aGlzLml0ZW07XG5cbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm8tYmx1clwiLCBcIlwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV2ZW50VW5saXN0ZW5lcnM6IEZ1bmN0aW9uW10gPSBbXTtcblxuICAgIHJlYWRvbmx5IGlkOiBzdHJpbmc7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pb254LWl0ZW0taW5wdXQtd3JhcHBlclwiKVxuICAgIC8qcHJpdmF0ZSovIGl0ZW1JbnB1dFdyYXBwZXI6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGZlYXR1cmVzOiBIdG1sRWRpdG9yRmVhdHVyZXM7XG5cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICByZWFkb25seTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlLCB0aGF0IHNob3VsZCBiZSBzZXQgd2hlbiBlZGl0b3IgaXMgZnVsbHkgaW5pdGlhbGl6ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSB1bmluaXRpYWxpemVkVmFsdWU6IGFueTtcblxuICAgIHByaXZhdGUgY29udHJvbE9uQ2hhbmdlOiBGdW5jdGlvbjtcblxuICAgIHByaXZhdGUgY29udHJvbE9uVG91Y2hlZDogRnVuY3Rpb247XG5cbiAgICBwcml2YXRlIGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIHNpbGVudENoYW5nZXM6IGJvb2xlYW47XG5cbiAgICB2aWV3OiBFZGl0b3JWaWV3O1xuXG4gICAgZ2V0IHN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnN0YXRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2NoZW1hOiBTY2hlbWE7XG5cbiAgICBwcml2YXRlIHBsdWdpbnM6IFBsdWdpbltdO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxQYXJlbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgdmFsdWUoaHRtbDogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudmlldykge1xuXG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IEVkaXRvclN0YXRlLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnZpZXcuc3RhdGUuc2NoZW1hLFxuICAgICAgICAgICAgICAgIHBsdWdpbnM6IHRoaXMudmlldy5zdGF0ZS5wbHVnaW5zLFxuICAgICAgICAgICAgICAgIGRvYzogdGhpcy5lZGl0b3JEb2MoaHRtbCB8fCBcIjxkaXY+PC9kaXY+XCIpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy52aWV3LnVwZGF0ZVN0YXRlKHN0YXRlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51bmluaXRpYWxpemVkVmFsdWUgPSBodG1sO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IERPTVNlcmlhbGl6ZXIuZnJvbVNjaGVtYSh0aGlzLnNjaGVtYSkuc2VyaWFsaXplRnJhZ21lbnQodGhpcy5zdGF0ZS5kb2MuY29udGVudCk7XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdG1wLmFwcGVuZENoaWxkKHZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKCF0bXAuaW5uZXJUZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXBhcmVPdXRwdXRWYWx1ZSh0bXApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51bmluaXRpYWxpemVkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbmF0aXZlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVPdXRwdXRWYWx1ZSh2YWx1ZTogSFRNTEVsZW1lbnQpIHtcblxuICAgICAgICB2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2W2RhdGEteW91dHViZV1cIikuZm9yRWFjaCgobm9kZTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS15b3V0dWJlXCIpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY3JlYXRlWW91dHViZUlmcmFtZShwYXJhbXNbMF0sIHBhcmFtcy5sZW5ndGggPiAxID8gcGFyYW1zWzFdIDogdW5kZWZpbmVkKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZS5pbm5lckhUTUw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlSW5wdXRWYWx1ZSh2YWx1ZTogSFRNTEVsZW1lbnQpIHtcblxuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gISFpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnNpbGVudENoYW5nZXMgPSB0cnVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnQgPSBmaW5kU2Nyb2xsUGFyZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgICh0aGlzLnZpZXcuZG9tIGFzIEhUTUxFbGVtZW50KS5mb2N1cyh7cHJldmVudFNjcm9sbDogdHJ1ZX0pO1xuXG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMudmlldy5kb21BdFBvcyh0aGlzLnZpZXcuc3RhdGUuc2VsZWN0aW9uLnRvKTtcbiAgICAgICAgaWYgKHBvcy5ub2RlKSB7XG4gICAgICAgICAgICBpZiAocG9zLm5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9DYXJldCh0aGlzLnNjcm9sbFBhcmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjcm9sbEludG9WaWV3KHBvcy5ub2RlIGFzIEhUTUxFbGVtZW50LCB0aGlzLnNjcm9sbFBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBhc3luYyBlZGl0b3JJbml0aWFsaXplZChldmVudDogRXZlbnQpIHtcblxuICAgICAgICBpZiAodGhpcy51bmluaXRpYWxpemVkVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHRoaXMudHJpeEVkaXRvci5sb2FkSFRNTCh0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLnRyaXhFZGl0b3JDb250cm9sbGVyLnRvb2xiYXJDb250cm9sbGVyLmFwcGx5S2V5Ym9hcmRDb21tYW5kID0gdGhpcy5hcHBseUtleWJvYXJkQ29tbWFuZC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGVkaXRvckZvY3VzZWQoZXZlbnQ6IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGVkaXRvckJsdXJlZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbUNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVNjcm9sbCh2aWV3OiBFZGl0b3JWaWV3KSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnQgPSBmaW5kU2Nyb2xsUGFyZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvcyA9IHZpZXcuZG9tQXRQb3Modmlldy5zdGF0ZS5zZWxlY3Rpb24udG8pO1xuICAgICAgICBpZiAocG9zLm5vZGUpIHtcbiAgICAgICAgICAgIGlmIChwb3Mubm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb0NhcmV0KHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsSW50b1ZpZXcocG9zLm5vZGUgYXMgSFRNTEVsZW1lbnQsIHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVkaXRvckRvYyhodG1sOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB0aGlzLnByZXBhcmVJbnB1dFZhbHVlKG5vZGUpO1xuXG4gICAgICAgIHJldHVybiBET01QYXJzZXIuZnJvbVNjaGVtYSh0aGlzLnNjaGVtYSkucGFyc2Uobm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldENvbnRyb2xDc3MoKSB7XG5cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IHtcbiAgICAgICAgICAgIFwiaW9uLXVudG91Y2hlZFwiOiB0aGlzLmZvcm1Db250cm9sLnVudG91Y2hlZCxcbiAgICAgICAgICAgIFwiaW9uLXRvdWNoZWRcIjogdGhpcy5mb3JtQ29udHJvbC50b3VjaGVkLFxuICAgICAgICAgICAgXCJpb24tcHJpc3RpbmVcIjogdGhpcy5mb3JtQ29udHJvbC5wcmlzdGluZSxcbiAgICAgICAgICAgIFwiaW9uLWRpcnR5XCI6IHRoaXMuZm9ybUNvbnRyb2wuZGlydHksXG4gICAgICAgICAgICBcImlvbi12YWxpZFwiOiB0aGlzLmZvcm1Db250cm9sLnZhbGlkLFxuICAgICAgICAgICAgXCJpb24taW52YWxpZFwiOiAhdGhpcy5mb3JtQ29udHJvbC52YWxpZFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5pdGVtW1wiZWxcIl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBlIG9mIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGMgaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzW2NdKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVJdGVtQ2xhc3NlcygpIHtcblxuICAgICAgICBpZiAoIXRoaXMuaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXRlbTogSFRNTEVsZW1lbnQgPSB0aGlzLml0ZW1bXCJlbFwiXTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1pbnRlcmFjdGl2ZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWhhcy1mb2N1c1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taGFzLWZvY3VzXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBmaXhJdGVtT3ZlcmZsb3coKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgICAgICAgY29uc3QgaXRlbTogSFRNTEVsZW1lbnQgPSB0aGlzLml0ZW1bXCJlbFwiXTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhaXRlbS5zaGFkb3dSb290ICYmICEhaXRlbS5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbS1pbm5lclwiKSk7XG5cbiAgICAgICAgICAgIGl0ZW0uc3R5bGUub3ZlcmZsb3cgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBgLml0ZW0tbmF0aXZlLCAuaXRlbS1pbm5lciwgLmlucHV0LXdyYXBwZXIgeyBvdmVyZmxvdzogaW5pdGlhbCAhaW1wb3J0YW50OyB9YDtcbiAgICAgICAgICAgIGl0ZW0uc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgZWRpdG9yVHJhbnNhY3Rpb24odHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uKSB7XG5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB0aGlzLnZpZXcudXBkYXRlU3RhdGUodGhpcy52aWV3LnN0YXRlLmFwcGx5KHRyYW5zYWN0aW9uKSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UubmV4dCgpO1xuXG4gICAgICAgIGlmICh0cmFuc2FjdGlvbi5kb2NDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5uZXh0KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPbkNoYW5nZSAmJiAhdGhpcy5zaWxlbnRDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNpbGVudENoYW5nZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5Q2hhbmdlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcuZG9tW1wiY29udGVudEVkaXRhYmxlXCJdID0gIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpeEl0ZW1PdmVyZmxvdygpO1xuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICB0aGlzLnJlc2V0Q29udHJvbENzcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIGZvciAoY29uc3QgdW5saXN0ZW4gb2YgdGhpcy5ldmVudFVubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy52aWV3ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xuXG4gICAgICAgIHRoaXMucGx1Z2lucyA9IFtcbiAgICAgICAgICAgIGtleW1hcChidWlsZEtleW1hcChzY2hlbWEpKSxcbiAgICAgICAgICAgIGtleW1hcChiYXNlS2V5bWFwKSxcbiAgICAgICAgICAgIGdhcEN1cnNvcigpLFxuICAgICAgICAgICAgaGlzdG9yeSgpXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBFZGl0b3JTdGF0ZS5jcmVhdGUoe1xuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIHBsdWdpbnM6IHRoaXMucGx1Z2lucyxcbiAgICAgICAgICAgIGRvYzogdGhpcy5lZGl0b3JEb2ModGhpcy51bmluaXRpYWxpemVkVmFsdWUgPyB0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSA6IFwiPGRpdj48L2Rpdj5cIilcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IEVkaXRvclZpZXcodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgIGRpc3BhdGNoVHJhbnNhY3Rpb246ICh0cmFuc2FjdGlvbikgPT4gdGhpcy5lZGl0b3JUcmFuc2FjdGlvbih0cmFuc2FjdGlvbiksXG4gICAgICAgICAgICBoYW5kbGVTY3JvbGxUb1NlbGVjdGlvbjogKHZpZXcpID0+IHRoaXMuaGFuZGxlU2Nyb2xsKHZpZXcpLFxuXG4gICAgICAgICAgICBub2RlVmlld3M6IHtcbiAgICAgICAgICAgICAgICB5b3V0dWJlOiAobm9kZSwgdmlldykgPT4gbmV3IFlvdXR1YmVOb2RlVmlldyhub2RlLCB2aWV3LCB0aGlzLmV2ZW50TWFuYWdlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5yZWFkb25seUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcblxuICAgICAgICBpZiAoY2hhbmdlc1tcInJlYWRvbmx5XCJdIHx8IGNoYW5nZXNbXCJkaXNhYmxlZFwiXSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkb25seUNoYW5nZWQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIl19