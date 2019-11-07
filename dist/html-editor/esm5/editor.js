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
            styles: ["\n        :host ::ng-deep .ProseMirror {\n            outline: none; \n        }\n\n        :host ::ng-deep .ProseMirror[contenteditable=true] {\n            min-height: 60px;\n            white-space: pre-wrap;\n            word-wrap: break-word;\n        }\n        \n        :host ::ng-deep .ProseMirror p {\n            margin: 16px 0px 0px 0px;\n        }\n        \n        :host ::ng-deep .ProseMirror p:first-child {\n            margin-top: 0px;\n        }\n\n        :host ::ng-deep .ProseMirror h1 {\n            font-size: 130%;\n        }\n\n        :host ::ng-deep .ProseMirror h2 {\n            font-size: 125%;\n        }\n\n        :host ::ng-deep .ProseMirror h3 {\n            font-size: 120%;\n        }\n\n        :host ::ng-deep .ProseMirror h4 {\n            font-size: 115%;\n        }\n\n        :host ::ng-deep .ProseMirror h5 {\n            font-size: 110%;\n        }\n\n        :host ::ng-deep .ProseMirror h6 {\n            font-size: 105%;\n        }\n\n        :host ::ng-deep .ProseMirror h1, :host ::ng-deep .ProseMirror h2, :host ::ng-deep .ProseMirror h3, :host ::ng-deep .ProseMirror h4, :host ::ng-deep .ProseMirror h5, :host ::ng-deep .ProseMirror h6 {\n            margin-top: 16px;\n            margin-bottom: 8px;\n        }\n        \n        :host ::ng-deep .ProseMirror h1:first-child, :host ::ng-deep .ProseMirror h2:first-child, :host ::ng-deep .ProseMirror h3:first-child, :host ::ng-deep .ProseMirror h4:first-child, :host ::ng-deep .ProseMirror h5:first-child, :host ::ng-deep .ProseMirror h6:first-child {\n            margin-top: 0px;\n        }\n\n        :host ::ng-deep .ProseMirror ul:first-child {\n            margin-top: 0px;\n        }\n        \n        :host ::ng-deep .ProseMirror[contenteditable=true] .ionx--selected {\n            border: 4px solid var(--ion-color-primary);\n        }\n        \n        :host ::ng-deep .ProseMirror[contenteditable=false] .ionx--interactive {\n            display: none;\n        }\n    "]
        }),
        tslib_1.__param(2, Optional()),
        tslib_1.__param(3, Optional())
    ], HtmlEditor);
    return HtmlEditor;
}());
export { HtmlEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJlZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6TCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDNUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFDLFdBQVcsRUFBc0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMs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TyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUVMLENBQUM7O0lBcFZjLHNCQUFXLEdBQVcsQ0FBQyxDQUFDOztnQkFHbEIsVUFBVTtnQkFDTixZQUFZO2dCQUNBLFNBQVMsdUJBQXpDLFFBQVE7Z0JBQ2lCLE9BQU8sdUJBQWhDLFFBQVE7O0lBZ0JEO1FBRFgsV0FBVyxDQUFDLCtCQUErQixDQUFDO3dEQUNQO0lBR3RDO1FBREMsS0FBSyxFQUFFO2dEQUNxQjtJQUc3QjtRQURDLEtBQUssRUFBRTtnREFDVTtJQUdsQjtRQURDLEtBQUssRUFBRTtnREFDVTtJQTRCbEI7UUFEQyxNQUFNLEVBQUU7OENBQytDO0lBR3hEO1FBREMsTUFBTSxFQUFFO3VEQUN3RDtJQUdqRTtRQURDLEtBQUssRUFBRTsyQ0FnQlA7SUFsRlEsVUFBVTtRQXRFdEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsa0hBRVQ7cUJBQ1EsczhEQStEUjtTQUNKLENBQUM7UUFRTyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLG1CQUFBLFFBQVEsRUFBRSxDQUFBO09BUk4sVUFBVSxDQXVWdEI7SUFBRCxpQkFBQztDQUFBLEFBdlZELElBdVZDO1NBdlZZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE9wdGlvbmFsLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXN9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0NvbnRyb2x9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQge3dhaXRUaWxsfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7SW9uSXRlbX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge2Jhc2VLZXltYXB9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtnYXBDdXJzb3J9IGZyb20gXCJwcm9zZW1pcnJvci1nYXBjdXJzb3JcIjtcbmltcG9ydCB7aGlzdG9yeX0gZnJvbSBcInByb3NlbWlycm9yLWhpc3RvcnlcIjtcbmltcG9ydCB7a2V5bWFwfSBmcm9tIFwicHJvc2VtaXJyb3Ita2V5bWFwXCI7XG5pbXBvcnQge0RPTVBhcnNlciwgRE9NU2VyaWFsaXplciwgU2NoZW1hfSBmcm9tIFwicHJvc2VtaXJyb3ItbW9kZWxcIjtcbmltcG9ydCB7RWRpdG9yU3RhdGUsIFBsdWdpbiwgVHJhbnNhY3Rpb259IGZyb20gXCJwcm9zZW1pcnJvci1zdGF0ZVwiO1xuaW1wb3J0IHtFZGl0b3JWaWV3fSBmcm9tIFwicHJvc2VtaXJyb3Itdmlld1wiO1xuaW1wb3J0IHtIdG1sRWRpdG9yRmVhdHVyZXN9IGZyb20gXCIuL2VkaXRvci1mZWF0dXJlc1wiO1xuaW1wb3J0IHtidWlsZEtleW1hcH0gZnJvbSBcIi4vcHJvc2VtaXJyb3Iva2V5bWFwXCI7XG5pbXBvcnQge3NjaGVtYX0gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivc2NoZW1hXCI7XG5pbXBvcnQge2NyZWF0ZVlvdXR1YmVJZnJhbWUsIFlvdXR1YmVOb2RlVmlld30gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivdmlld3MveW91dHViZVwiO1xuaW1wb3J0IHtmaW5kU2Nyb2xsUGFyZW50LCBzY3JvbGxJbnRvVmlld30gZnJvbSBcIi4vc2Nyb2xsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtaHRtbC1lZGl0b3JcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9ueC1odG1sLWVkaXRvci10b29sYmFyIFtzdHlsZS5kaXNwbGF5XT1cInJlYWRvbmx5ID8gJ25vbmUnIDogJydcIj48L2lvbngtaHRtbC1lZGl0b3ItdG9vbGJhcj5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3QgOjpuZy1kZWVwIC5Qcm9zZU1pcnJvciB7XG4gICAgICAgICAgICBvdXRsaW5lOiBub25lOyBcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3JbY29udGVudGVkaXRhYmxlPXRydWVdIHtcbiAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDYwcHg7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gICAgICAgICAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgcCB7XG4gICAgICAgICAgICBtYXJnaW46IDE2cHggMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgcDpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAwcHg7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCA6Om5nLWRlZXAgLlByb3NlTWlycm9yIGgxIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTMwJTtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgaDIge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMjUlO1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3QgOjpuZy1kZWVwIC5Qcm9zZU1pcnJvciBoMyB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEyMCU7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCA6Om5nLWRlZXAgLlByb3NlTWlycm9yIGg0IHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTE1JTtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgaDUge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMTAlO1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3QgOjpuZy1kZWVwIC5Qcm9zZU1pcnJvciBoNiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEwNSU7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCA6Om5nLWRlZXAgLlByb3NlTWlycm9yIGgxLCA6aG9zdCA6Om5nLWRlZXAgLlByb3NlTWlycm9yIGgyLCA6aG9zdCA6Om5nLWRlZXAgLlByb3NlTWlycm9yIGgzLCA6aG9zdCA6Om5nLWRlZXAgLlByb3NlTWlycm9yIGg0LCA6aG9zdCA6Om5nLWRlZXAgLlByb3NlTWlycm9yIGg1LCA6aG9zdCA6Om5nLWRlZXAgLlByb3NlTWlycm9yIGg2IHtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgaDE6Zmlyc3QtY2hpbGQsIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgaDI6Zmlyc3QtY2hpbGQsIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgaDM6Zmlyc3QtY2hpbGQsIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgaDQ6Zmlyc3QtY2hpbGQsIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgaDU6Zmlyc3QtY2hpbGQsIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3IgaDY6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3QgOjpuZy1kZWVwIC5Qcm9zZU1pcnJvciB1bDpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3JbY29udGVudGVkaXRhYmxlPXRydWVdIC5pb254LS1zZWxlY3RlZCB7XG4gICAgICAgICAgICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0IDo6bmctZGVlcCAuUHJvc2VNaXJyb3JbY29udGVudGVkaXRhYmxlPWZhbHNlXSAuaW9ueC0taW50ZXJhY3RpdmUge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIEh0bWxFZGl0b3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpZEdlbmVyYXRvcjogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwdWJsaWMgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZm9ybUNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBpdGVtOiBJb25JdGVtXG4gICAgKSB7XG5cbiAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pZCA9IFwiaW9ueC10cml4LWVkaXRvclwiICsgKEh0bWxFZGl0b3IuaWRHZW5lcmF0b3IrKyk7XG4gICAgICAgIHRoaXMuaXRlbUlucHV0V3JhcHBlciA9ICEhdGhpcy5pdGVtO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXZlbnRVbmxpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gICAgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmlvbngtaXRlbS1pbnB1dC13cmFwcGVyXCIpXG4gICAgLypwcml2YXRlKi8gaXRlbUlucHV0V3JhcHBlcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZmVhdHVyZXM6IEh0bWxFZGl0b3JGZWF0dXJlcztcblxuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUsIHRoYXQgc2hvdWxkIGJlIHNldCB3aGVuIGVkaXRvciBpcyBmdWxseSBpbml0aWFsaXplZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVuaW5pdGlhbGl6ZWRWYWx1ZTogYW55O1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25DaGFuZ2U6IEZ1bmN0aW9uO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25Ub3VjaGVkOiBGdW5jdGlvbjtcblxuICAgIHByaXZhdGUgZm9jdXNlZDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgc2lsZW50Q2hhbmdlczogYm9vbGVhbjtcblxuICAgIHZpZXc6IEVkaXRvclZpZXc7XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuc3RhdGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzY2hlbWE6IFNjaGVtYTtcblxuICAgIHByaXZhdGUgcGx1Z2luczogUGx1Z2luW107XG5cbiAgICBwcml2YXRlIHNjcm9sbFBhcmVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCB2YWx1ZShodG1sOiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gRWRpdG9yU3RhdGUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHRoaXMudmlldy5zdGF0ZS5zY2hlbWEsXG4gICAgICAgICAgICAgICAgcGx1Z2luczogdGhpcy52aWV3LnN0YXRlLnBsdWdpbnMsXG4gICAgICAgICAgICAgICAgZG9jOiB0aGlzLmVkaXRvckRvYyhodG1sIHx8IFwiPGRpdj48L2Rpdj5cIilcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnZpZXcudXBkYXRlU3RhdGUoc3RhdGUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSA9IGh0bWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gRE9NU2VyaWFsaXplci5mcm9tU2NoZW1hKHRoaXMuc2NoZW1hKS5zZXJpYWxpemVGcmFnbWVudCh0aGlzLnN0YXRlLmRvYy5jb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB0bXAuYXBwZW5kQ2hpbGQodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoIXRtcC5pbm5lclRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZU91dHB1dFZhbHVlKHRtcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBuYXRpdmVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZU91dHB1dFZhbHVlKHZhbHVlOiBIVE1MRWxlbWVudCkge1xuXG4gICAgICAgIHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZbZGF0YS15b3V0dWJlXVwiKS5mb3JFYWNoKChub2RlOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXlvdXR1YmVcIikuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjcmVhdGVZb3V0dWJlSWZyYW1lKHBhcmFtc1swXSwgcGFyYW1zLmxlbmd0aCA+IDEgPyBwYXJhbXNbMV0gOiB1bmRlZmluZWQpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlLmlubmVySFRNTDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVJbnB1dFZhbHVlKHZhbHVlOiBIVE1MRWxlbWVudCkge1xuXG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSAhIWlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuc2lsZW50Q2hhbmdlcyA9IHRydWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgKHRoaXMudmlldy5kb20gYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICAgIC8vIHRoaXMuY29udGVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGFzeW5jIGVkaXRvckluaXRpYWxpemVkKGV2ZW50OiBFdmVudCkge1xuXG4gICAgICAgIGlmICh0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSkge1xuICAgICAgICAgICAgLy8gdGhpcy50cml4RWRpdG9yLmxvYWRIVE1MKHRoaXMudW5pbml0aWFsaXplZFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMudHJpeEVkaXRvckNvbnRyb2xsZXIudG9vbGJhckNvbnRyb2xsZXIuYXBwbHlLZXlib2FyZENvbW1hbmQgPSB0aGlzLmFwcGx5S2V5Ym9hcmRDb21tYW5kLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgZWRpdG9yRm9jdXNlZChldmVudDogRXZlbnQpIHtcblxuICAgICAgICBpZiAodGhpcy5jb250cm9sT25Ub3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHByaXZhdGUgZWRpdG9yQmx1cmVkKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlU2Nyb2xsKHZpZXc6IEVkaXRvclZpZXcpIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsUGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFBhcmVudCA9IGZpbmRTY3JvbGxQYXJlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9zID0gdmlldy5kb21BdFBvcyh2aWV3LnN0YXRlLnNlbGVjdGlvbi50byk7XG5cbiAgICAgICAgaWYgKHBvcy5ub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNjcm9sbEludG9WaWV3KHBvcy5ub2RlLCB1bmRlZmluZWQsIHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVkaXRvckRvYyhodG1sOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB0aGlzLnByZXBhcmVJbnB1dFZhbHVlKG5vZGUpO1xuXG4gICAgICAgIHJldHVybiBET01QYXJzZXIuZnJvbVNjaGVtYSh0aGlzLnNjaGVtYSkucGFyc2Uobm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldENvbnRyb2xDc3MoKSB7XG5cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IHtcbiAgICAgICAgICAgIFwiaW9uLXVudG91Y2hlZFwiOiB0aGlzLmZvcm1Db250cm9sLnVudG91Y2hlZCxcbiAgICAgICAgICAgIFwiaW9uLXRvdWNoZWRcIjogdGhpcy5mb3JtQ29udHJvbC50b3VjaGVkLFxuICAgICAgICAgICAgXCJpb24tcHJpc3RpbmVcIjogdGhpcy5mb3JtQ29udHJvbC5wcmlzdGluZSxcbiAgICAgICAgICAgIFwiaW9uLWRpcnR5XCI6IHRoaXMuZm9ybUNvbnRyb2wuZGlydHksXG4gICAgICAgICAgICBcImlvbi12YWxpZFwiOiB0aGlzLmZvcm1Db250cm9sLnZhbGlkLFxuICAgICAgICAgICAgXCJpb24taW52YWxpZFwiOiAhdGhpcy5mb3JtQ29udHJvbC52YWxpZFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5pdGVtW1wiZWxcIl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBlIG9mIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGMgaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzW2NdKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVJdGVtQ2xhc3NlcygpIHtcblxuICAgICAgICBpZiAoIXRoaXMuaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXRlbTogSFRNTEVsZW1lbnQgPSB0aGlzLml0ZW1bXCJlbFwiXTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1pbnRlcmFjdGl2ZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWhhcy1mb2N1c1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taGFzLWZvY3VzXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBmaXhJdGVtT3ZlcmZsb3coKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgICAgICAgY29uc3QgaXRlbTogSFRNTEVsZW1lbnQgPSB0aGlzLml0ZW1bXCJlbFwiXTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhaXRlbS5zaGFkb3dSb290KTtcblxuICAgICAgICAgICAgaXRlbS5zdHlsZS5vdmVyZmxvdyA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCA9IGAuaXRlbS1uYXRpdmUsIC5pdGVtLWlubmVyLCAuaW5wdXQtd3JhcHBlciB7IG92ZXJmbG93OiBpbml0aWFsICFpbXBvcnRhbnQ7IH1gO1xuICAgICAgICAgICAgaXRlbS5zaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlZGl0b3JUcmFuc2FjdGlvbih0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24pIHtcblxuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIHRoaXMudmlldy51cGRhdGVTdGF0ZSh0aGlzLnZpZXcuc3RhdGUuYXBwbHkodHJhbnNhY3Rpb24pKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5uZXh0KCk7XG5cbiAgICAgICAgaWYgKHRyYW5zYWN0aW9uLmRvY0NoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlLm5leHQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uQ2hhbmdlICYmICF0aGlzLnNpbGVudENoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2lsZW50Q2hhbmdlcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHlDaGFuZ2VkKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMudmlldy5kb21bXCJjb250ZW50RWRpdGFibGVcIl0gPSAhdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZml4SXRlbU92ZXJmbG93KCk7XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbUNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIHRoaXMucmVzZXRDb250cm9sQ3NzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICAgICAgZm9yIChjb25zdCB1bmxpc3RlbiBvZiB0aGlzLmV2ZW50VW5saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXcuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnZpZXcgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XG5cbiAgICAgICAgdGhpcy5wbHVnaW5zID0gW1xuICAgICAgICAgICAga2V5bWFwKGJ1aWxkS2V5bWFwKHNjaGVtYSkpLFxuICAgICAgICAgICAga2V5bWFwKGJhc2VLZXltYXApLFxuICAgICAgICAgICAgZ2FwQ3Vyc29yKCksXG4gICAgICAgICAgICBoaXN0b3J5KClcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBzdGF0ZSA9IEVkaXRvclN0YXRlLmNyZWF0ZSh7XG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgcGx1Z2luczogdGhpcy5wbHVnaW5zLFxuICAgICAgICAgICAgZG9jOiB0aGlzLmVkaXRvckRvYyh0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSA/IHRoaXMudW5pbml0aWFsaXplZFZhbHVlIDogXCI8ZGl2PjwvZGl2PlwiKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgRWRpdG9yVmlldyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwge1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgZGlzcGF0Y2hUcmFuc2FjdGlvbjogKHRyYW5zYWN0aW9uKSA9PiB0aGlzLmVkaXRvclRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKSxcbiAgICAgICAgICAgIGhhbmRsZVNjcm9sbFRvU2VsZWN0aW9uOiAodmlldykgPT4gdGhpcy5oYW5kbGVTY3JvbGwodmlldyksXG5cbiAgICAgICAgICAgIG5vZGVWaWV3czoge1xuICAgICAgICAgICAgICAgIHlvdXR1YmU6IChub2RlLCB2aWV3KSA9PiBuZXcgWW91dHViZU5vZGVWaWV3KG5vZGUsIHZpZXcsIHRoaXMuZXZlbnRNYW5hZ2VyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNpbGVudENoYW5nZXMgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRvbmx5Q2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuXG4gICAgICAgIGlmIChjaGFuZ2VzW1wicmVhZG9ubHlcIl0gfHwgY2hhbmdlc1tcImRpc2FibGVkXCJdKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRvbmx5Q2hhbmdlZCgpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iXX0=