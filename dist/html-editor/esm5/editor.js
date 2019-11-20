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
import { findScrollParent, scrollIntoView } from "./scroll";
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
            styles: [":host ::ng-deep .ProseMirror{outline:0}:host ::ng-deep .ProseMirror[contenteditable=true]{min-height:60px;white-space:pre-wrap;word-wrap:break-word;-moz-user-select:text;-ms-user-select:text;user-select:text;-webkit-user-select:text}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--selected{border:4px solid var(--ion-color-primary)}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--interactive{display:none}:host ::ng-deep .ProseMirror p{margin:16px 0 0}:host ::ng-deep .ProseMirror p:first-child{margin-top:0}:host ::ng-deep .ProseMirror h1{font-size:130%}:host ::ng-deep .ProseMirror h2{font-size:125%}:host ::ng-deep .ProseMirror h3{font-size:120%}:host ::ng-deep .ProseMirror h4{font-size:115%}:host ::ng-deep .ProseMirror h5{font-size:110%}:host ::ng-deep .ProseMirror h6{font-size:105%}:host ::ng-deep .ProseMirror h1,:host ::ng-deep .ProseMirror h2,:host ::ng-deep .ProseMirror h3,:host ::ng-deep .ProseMirror h4,:host ::ng-deep .ProseMirror h5,:host ::ng-deep .ProseMirror h6{margin-top:16px;margin-bottom:8px}:host ::ng-deep .ProseMirror h1:first-child,:host ::ng-deep .ProseMirror h2:first-child,:host ::ng-deep .ProseMirror h3:first-child,:host ::ng-deep .ProseMirror h4:first-child,:host ::ng-deep .ProseMirror h5:first-child,:host ::ng-deep .ProseMirror h6:first-child{margin-top:0}:host ::ng-deep .ProseMirror ul:first-child{margin-top:0}"]
        }),
        tslib_1.__param(2, Optional()),
        tslib_1.__param(3, Optional())
    ], HtmlEditor);
    return HtmlEditor;
}());
export { HtmlEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJlZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6TCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDNUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFDLFdBQVcsRUFBc0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMs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QixJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDNUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBRUwsQ0FBQzs7SUF0VmMsc0JBQVcsR0FBVyxDQUFDLENBQUM7O2dCQUdsQixVQUFVO2dCQUNOLFlBQVk7Z0JBQ0EsU0FBUyx1QkFBekMsUUFBUTtnQkFDaUIsT0FBTyx1QkFBaEMsUUFBUTs7SUFnQkQ7UUFEWCxXQUFXLENBQUMsK0JBQStCLENBQUM7d0RBQ1A7SUFHdEM7UUFEQyxLQUFLLEVBQUU7Z0RBQ3FCO0lBRzdCO1FBREMsS0FBSyxFQUFFO2dEQUNVO0lBR2xCO1FBREMsS0FBSyxFQUFFO2dEQUNVO0lBNEJsQjtRQURDLE1BQU0sRUFBRTs4Q0FDK0M7SUFHeEQ7UUFEQyxNQUFNLEVBQUU7dURBQ3dEO0lBR2pFO1FBREMsS0FBSyxFQUFFOzJDQWtCUDtJQXBGUSxVQUFVO1FBUHRCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLGtIQUVUOztTQUVKLENBQUM7UUFRTyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO09BUk4sVUFBVSxDQXlWdEI7SUFBRCxpQkFBQztDQUFBLEFBelZELElBeVZDO1NBelZZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE9wdGlvbmFsLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXN9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0NvbnRyb2x9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7SW9uSXRlbX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge2Jhc2VLZXltYXB9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtnYXBDdXJzb3J9IGZyb20gXCJwcm9zZW1pcnJvci1nYXBjdXJzb3JcIjtcbmltcG9ydCB7aGlzdG9yeX0gZnJvbSBcInByb3NlbWlycm9yLWhpc3RvcnlcIjtcbmltcG9ydCB7a2V5bWFwfSBmcm9tIFwicHJvc2VtaXJyb3Ita2V5bWFwXCI7XG5pbXBvcnQge0RPTVBhcnNlciwgRE9NU2VyaWFsaXplciwgU2NoZW1hfSBmcm9tIFwicHJvc2VtaXJyb3ItbW9kZWxcIjtcbmltcG9ydCB7RWRpdG9yU3RhdGUsIFBsdWdpbiwgVHJhbnNhY3Rpb259IGZyb20gXCJwcm9zZW1pcnJvci1zdGF0ZVwiO1xuaW1wb3J0IHtFZGl0b3JWaWV3fSBmcm9tIFwicHJvc2VtaXJyb3Itdmlld1wiO1xuaW1wb3J0IHtIdG1sRWRpdG9yRmVhdHVyZXN9IGZyb20gXCIuL2VkaXRvci1mZWF0dXJlc1wiO1xuaW1wb3J0IHtidWlsZEtleW1hcH0gZnJvbSBcIi4vcHJvc2VtaXJyb3Iva2V5bWFwXCI7XG5pbXBvcnQge3NjaGVtYX0gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivc2NoZW1hXCI7XG5pbXBvcnQge2NyZWF0ZVlvdXR1YmVJZnJhbWUsIFlvdXR1YmVOb2RlVmlld30gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivdmlld3MveW91dHViZVwiO1xuaW1wb3J0IHtmaW5kU2Nyb2xsUGFyZW50LCBzY3JvbGxJbnRvVmlld30gZnJvbSBcIi4vc2Nyb2xsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtaHRtbC1lZGl0b3JcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9ueC1odG1sLWVkaXRvci10b29sYmFyIFtzdHlsZS5kaXNwbGF5XT1cInJlYWRvbmx5ID8gJ25vbmUnIDogJydcIj48L2lvbngtaHRtbC1lZGl0b3ItdG9vbGJhcj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogW1wiZWRpdG9yLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgSHRtbEVkaXRvciBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblxuICAgIHByaXZhdGUgc3RhdGljIGlkR2VuZXJhdG9yOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHB1YmxpYyBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb3JtQ29udHJvbDogTmdDb250cm9sLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGl0ZW06IElvbkl0ZW1cbiAgICApIHtcblxuICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlkID0gXCJpb254LXRyaXgtZWRpdG9yXCIgKyAoSHRtbEVkaXRvci5pZEdlbmVyYXRvcisrKTtcbiAgICAgICAgdGhpcy5pdGVtSW5wdXRXcmFwcGVyID0gISF0aGlzLml0ZW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBldmVudFVubGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG5cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW9ueC1pdGVtLWlucHV0LXdyYXBwZXJcIilcbiAgICAvKnByaXZhdGUqLyBpdGVtSW5wdXRXcmFwcGVyOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBmZWF0dXJlczogSHRtbEVkaXRvckZlYXR1cmVzO1xuXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSwgdGhhdCBzaG91bGQgYmUgc2V0IHdoZW4gZWRpdG9yIGlzIGZ1bGx5IGluaXRpYWxpemVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgdW5pbml0aWFsaXplZFZhbHVlOiBhbnk7XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPblRvdWNoZWQ6IEZ1bmN0aW9uO1xuXG4gICAgcHJpdmF0ZSBmb2N1c2VkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBzaWxlbnRDaGFuZ2VzOiBib29sZWFuO1xuXG4gICAgdmlldzogRWRpdG9yVmlldztcblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5zdGF0ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNjaGVtYTogU2NoZW1hO1xuXG4gICAgcHJpdmF0ZSBwbHVnaW5zOiBQbHVnaW5bXTtcblxuICAgIHByaXZhdGUgc2Nyb2xsUGFyZW50OiBIVE1MRWxlbWVudDtcblxuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHZhbHVlKGh0bWw6IHN0cmluZykge1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHtcblxuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBFZGl0b3JTdGF0ZS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHNjaGVtYTogdGhpcy52aWV3LnN0YXRlLnNjaGVtYSxcbiAgICAgICAgICAgICAgICBwbHVnaW5zOiB0aGlzLnZpZXcuc3RhdGUucGx1Z2lucyxcbiAgICAgICAgICAgICAgICBkb2M6IHRoaXMuZWRpdG9yRG9jKGh0bWwgfHwgXCI8ZGl2PjwvZGl2PlwiKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudmlldy51cGRhdGVTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5pbml0aWFsaXplZFZhbHVlID0gaHRtbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2lsZW50Q2hhbmdlcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMudmlldykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBET01TZXJpYWxpemVyLmZyb21TY2hlbWEodGhpcy5zY2hlbWEpLnNlcmlhbGl6ZUZyYWdtZW50KHRoaXMuc3RhdGUuZG9jLmNvbnRlbnQpO1xuICAgICAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRtcC5hcHBlbmRDaGlsZCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICghdG1wLmlubmVyVGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlT3V0cHV0VmFsdWUodG1wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudW5pbml0aWFsaXplZFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlT3V0cHV0VmFsdWUodmFsdWU6IEhUTUxFbGVtZW50KSB7XG5cbiAgICAgICAgdmFsdWUucXVlcnlTZWxlY3RvckFsbChcImRpdltkYXRhLXlvdXR1YmVdXCIpLmZvckVhY2goKG5vZGU6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBub2RlLmdldEF0dHJpYnV0ZShcImRhdGEteW91dHViZVwiKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNyZWF0ZVlvdXR1YmVJZnJhbWUocGFyYW1zWzBdLCBwYXJhbXMubGVuZ3RoID4gMSA/IHBhcmFtc1sxXSA6IHVuZGVmaW5lZCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWUuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUlucHV0VmFsdWUodmFsdWU6IEhUTUxFbGVtZW50KSB7XG5cbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9ICEhaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICAodGhpcy52aWV3LmRvbSBhcyBIVE1MRWxlbWVudCkuZm9jdXMoKTtcbiAgICAgICAgLy8gdGhpcy5jb250ZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgYXN5bmMgZWRpdG9ySW5pdGlhbGl6ZWQoZXZlbnQ6IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMudW5pbml0aWFsaXplZFZhbHVlKSB7XG4gICAgICAgICAgICAvLyB0aGlzLnRyaXhFZGl0b3IubG9hZEhUTUwodGhpcy51bmluaXRpYWxpemVkVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcy50cml4RWRpdG9yQ29udHJvbGxlci50b29sYmFyQ29udHJvbGxlci5hcHBseUtleWJvYXJkQ29tbWFuZCA9IHRoaXMuYXBwbHlLZXlib2FyZENvbW1hbmQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBlZGl0b3JGb2N1c2VkKGV2ZW50OiBFdmVudCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xPblRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbUNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBlZGl0b3JCbHVyZWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVTY3JvbGwodmlldzogRWRpdG9yVmlldykge1xuXG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsUGFyZW50ID0gZmluZFNjcm9sbFBhcmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3MgPSB2aWV3LmRvbUF0UG9zKHZpZXcuc3RhdGUuc2VsZWN0aW9uLnRvKTtcblxuICAgICAgICBpZiAocG9zLm5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgc2Nyb2xsSW50b1ZpZXcocG9zLm5vZGUsIHVuZGVmaW5lZCwgdGhpcy5zY3JvbGxQYXJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZWRpdG9yRG9jKGh0bWw6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIHRoaXMucHJlcGFyZUlucHV0VmFsdWUobm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIERPTVBhcnNlci5mcm9tU2NoZW1hKHRoaXMuc2NoZW1hKS5wYXJzZShub2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0Q29udHJvbENzcygpIHtcblxuICAgICAgICBjb25zdCBjbGFzc2VzID0ge1xuICAgICAgICAgICAgXCJpb24tdW50b3VjaGVkXCI6IHRoaXMuZm9ybUNvbnRyb2wudW50b3VjaGVkLFxuICAgICAgICAgICAgXCJpb24tdG91Y2hlZFwiOiB0aGlzLmZvcm1Db250cm9sLnRvdWNoZWQsXG4gICAgICAgICAgICBcImlvbi1wcmlzdGluZVwiOiB0aGlzLmZvcm1Db250cm9sLnByaXN0aW5lLFxuICAgICAgICAgICAgXCJpb24tZGlydHlcIjogdGhpcy5mb3JtQ29udHJvbC5kaXJ0eSxcbiAgICAgICAgICAgIFwiaW9uLXZhbGlkXCI6IHRoaXMuZm9ybUNvbnRyb2wudmFsaWQsXG4gICAgICAgICAgICBcImlvbi1pbnZhbGlkXCI6ICF0aGlzLmZvcm1Db250cm9sLnZhbGlkXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICAgICAgZWxlbWVudHMucHVzaCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgICAgICAgZWxlbWVudHMucHVzaCh0aGlzLml0ZW1bXCJlbFwiXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYyBpbiBjbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzZXNbY10pIHtcbiAgICAgICAgICAgICAgICAgICAgZS5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUl0ZW1DbGFzc2VzKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5pdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpdGVtOiBIVE1MRWxlbWVudCA9IHRoaXMuaXRlbVtcImVsXCJdO1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pbnRlcmFjdGl2ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taGFzLWZvY3VzXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1oYXMtZm9jdXNcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGZpeEl0ZW1PdmVyZmxvdygpIHtcblxuICAgICAgICBpZiAodGhpcy5pdGVtKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtOiBIVE1MRWxlbWVudCA9IHRoaXMuaXRlbVtcImVsXCJdO1xuICAgICAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISFpdGVtLnNoYWRvd1Jvb3QpO1xuXG4gICAgICAgICAgICBpdGVtLnN0eWxlLm92ZXJmbG93ID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gYC5pdGVtLW5hdGl2ZSwgLml0ZW0taW5uZXIsIC5pbnB1dC13cmFwcGVyIHsgb3ZlcmZsb3c6IGluaXRpYWwgIWltcG9ydGFudDsgfWA7XG4gICAgICAgICAgICBpdGVtLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGVkaXRvclRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbikge1xuXG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgdGhpcy52aWV3LnVwZGF0ZVN0YXRlKHRoaXMudmlldy5zdGF0ZS5hcHBseSh0cmFuc2FjdGlvbikpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLm5leHQoKTtcblxuICAgICAgICBpZiAodHJhbnNhY3Rpb24uZG9jQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2UubmV4dCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sT25DaGFuZ2UgJiYgIXRoaXMuc2lsZW50Q2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seUNoYW5nZWQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudmlldykge1xuICAgICAgICAgICAgdGhpcy52aWV3LmRvbVtcImNvbnRlbnRFZGl0YWJsZVwiXSA9ICF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmRpc2FibGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCI7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maXhJdGVtT3ZlcmZsb3coKTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy5yZXNldENvbnRyb2xDc3MoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICBmb3IgKGNvbnN0IHVubGlzdGVuIG9mIHRoaXMuZXZlbnRVbmxpc3RlbmVycykge1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlldy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudmlldyA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcblxuICAgICAgICB0aGlzLnBsdWdpbnMgPSBbXG4gICAgICAgICAgICBrZXltYXAoYnVpbGRLZXltYXAoc2NoZW1hKSksXG4gICAgICAgICAgICBrZXltYXAoYmFzZUtleW1hcCksXG4gICAgICAgICAgICBnYXBDdXJzb3IoKSxcbiAgICAgICAgICAgIGhpc3RvcnkoKVxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlID0gRWRpdG9yU3RhdGUuY3JlYXRlKHtcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBwbHVnaW5zOiB0aGlzLnBsdWdpbnMsXG4gICAgICAgICAgICBkb2M6IHRoaXMuZWRpdG9yRG9jKHRoaXMudW5pbml0aWFsaXplZFZhbHVlID8gdGhpcy51bmluaXRpYWxpemVkVmFsdWUgOiBcIjxkaXY+PC9kaXY+XCIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBFZGl0b3JWaWV3KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCB7XG4gICAgICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgICAgICBkaXNwYXRjaFRyYW5zYWN0aW9uOiAodHJhbnNhY3Rpb24pID0+IHRoaXMuZWRpdG9yVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pLFxuICAgICAgICAgICAgaGFuZGxlU2Nyb2xsVG9TZWxlY3Rpb246ICh2aWV3KSA9PiB0aGlzLmhhbmRsZVNjcm9sbCh2aWV3KSxcblxuICAgICAgICAgICAgbm9kZVZpZXdzOiB7XG4gICAgICAgICAgICAgICAgeW91dHViZTogKG5vZGUsIHZpZXcpID0+IG5ldyBZb3V0dWJlTm9kZVZpZXcobm9kZSwgdmlldywgdGhpcy5ldmVudE1hbmFnZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2lsZW50Q2hhbmdlcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5IHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHlDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbXCJyZWFkb25seVwiXSB8fCBjaGFuZ2VzW1wiZGlzYWJsZWRcIl0pIHtcbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHlDaGFuZ2VkKCk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiJdfQ==