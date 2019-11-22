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
        var selectedView = this.view.dom.querySelector(".ionx--selected");
        if (selectedView) {
            scrollIntoView(selectedView, this.scrollParent);
        }
        else {
            var pos = this.view.domAtPos(this.view.state.selection.to);
            if (pos.node) {
                if (pos.node.nodeType === Node.TEXT_NODE) {
                    scrollToCaret(this.scrollParent);
                }
                else {
                    scrollIntoView(pos.node, this.scrollParent);
                }
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
            styles: [":host ::ng-deep .ProseMirror{outline:0;-moz-user-select:text;-ms-user-select:text;user-select:text;-webkit-user-select:text}:host ::ng-deep .ProseMirror[contenteditable=true]{min-height:60px;white-space:pre-wrap;word-wrap:break-word}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--selected{border:4px solid var(--ion-color-primary)}:host ::ng-deep .ProseMirror:not([contenteditable=true]) .ionx--interactive{display:none}:host ::ng-deep .ProseMirror p{margin:16px 0 0}:host ::ng-deep .ProseMirror p:first-child{margin-top:0}:host ::ng-deep .ProseMirror h1{font-size:130%}:host ::ng-deep .ProseMirror h2{font-size:125%}:host ::ng-deep .ProseMirror h3{font-size:120%}:host ::ng-deep .ProseMirror h4{font-size:115%}:host ::ng-deep .ProseMirror h5{font-size:110%}:host ::ng-deep .ProseMirror h6{font-size:105%}:host ::ng-deep .ProseMirror h1,:host ::ng-deep .ProseMirror h2,:host ::ng-deep .ProseMirror h3,:host ::ng-deep .ProseMirror h4,:host ::ng-deep .ProseMirror h5,:host ::ng-deep .ProseMirror h6{margin-top:16px;margin-bottom:8px}:host ::ng-deep .ProseMirror h1:first-child,:host ::ng-deep .ProseMirror h2:first-child,:host ::ng-deep .ProseMirror h3:first-child,:host ::ng-deep .ProseMirror h4:first-child,:host ::ng-deep .ProseMirror h5:first-child,:host ::ng-deep .ProseMirror h6:first-child{margin-top:0}:host ::ng-deep .ProseMirror ul:first-child{margin-top:0}"]
        }),
        tslib_1.__param(2, Optional()),
        tslib_1.__param(3, Optional())
    ], HtmlEditor);
    return HtmlEditor;
}());
export { HtmlEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJlZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6TCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDNUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFDLFdBQVcsRUFBc0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMs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LFVBQVUsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUVMLENBQUM7O0lBOVdjLHNCQUFXLEdBQVcsQ0FBQyxDQUFDOztnQkFHbEIsVUFBVTtnQkFDTixZQUFZO2dCQUNBLFNBQVMsdUJBQXpDLFFBQVE7Z0JBQ2lCLE9BQU8sdUJBQWhDLFFBQVE7O0lBa0JEO1FBRFgsV0FBVyxDQUFDLCtCQUErQixDQUFDO3dEQUNQO0lBR3RDO1FBREMsS0FBSyxFQUFFO2dEQUNxQjtJQUc3QjtRQURDLEtBQUssRUFBRTtnREFDVTtJQUdsQjtRQURDLEtBQUssRUFBRTtnREFDVTtJQTRCbEI7UUFEQyxNQUFNLEVBQUU7OENBQytDO0lBR3hEO1FBREMsTUFBTSxFQUFFO3VEQUN3RDtJQUdqRTtRQURDLEtBQUssRUFBRTsyQ0FrQlA7SUF0RlEsVUFBVTtRQVB0QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSxrSEFFVDs7U0FFSixDQUFDO1FBUU8sbUJBQUEsUUFBUSxFQUFFLENBQUE7UUFDVixtQkFBQSxRQUFRLEVBQUUsQ0FBQTtPQVJOLFVBQVUsQ0FpWHRCO0lBQUQsaUJBQUM7Q0FBQSxBQWpYRCxJQWlYQztTQWpYWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7RXZlbnRNYW5hZ2VyfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHt3YWl0VGlsbH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge0lvbkl0ZW19IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtiYXNlS2V5bWFwfSBmcm9tIFwicHJvc2VtaXJyb3ItY29tbWFuZHNcIjtcbmltcG9ydCB7Z2FwQ3Vyc29yfSBmcm9tIFwicHJvc2VtaXJyb3ItZ2FwY3Vyc29yXCI7XG5pbXBvcnQge2hpc3Rvcnl9IGZyb20gXCJwcm9zZW1pcnJvci1oaXN0b3J5XCI7XG5pbXBvcnQge2tleW1hcH0gZnJvbSBcInByb3NlbWlycm9yLWtleW1hcFwiO1xuaW1wb3J0IHtET01QYXJzZXIsIERPTVNlcmlhbGl6ZXIsIFNjaGVtYX0gZnJvbSBcInByb3NlbWlycm9yLW1vZGVsXCI7XG5pbXBvcnQge0VkaXRvclN0YXRlLCBQbHVnaW4sIFRyYW5zYWN0aW9ufSBmcm9tIFwicHJvc2VtaXJyb3Itc3RhdGVcIjtcbmltcG9ydCB7RWRpdG9yVmlld30gZnJvbSBcInByb3NlbWlycm9yLXZpZXdcIjtcbmltcG9ydCB7SHRtbEVkaXRvckZlYXR1cmVzfSBmcm9tIFwiLi9lZGl0b3ItZmVhdHVyZXNcIjtcbmltcG9ydCB7YnVpbGRLZXltYXB9IGZyb20gXCIuL3Byb3NlbWlycm9yL2tleW1hcFwiO1xuaW1wb3J0IHtzY2hlbWF9IGZyb20gXCIuL3Byb3NlbWlycm9yL3NjaGVtYVwiO1xuaW1wb3J0IHtjcmVhdGVZb3V0dWJlSWZyYW1lLCBZb3V0dWJlTm9kZVZpZXd9IGZyb20gXCIuL3Byb3NlbWlycm9yL3ZpZXdzL3lvdXR1YmVcIjtcbmltcG9ydCB7ZmluZFNjcm9sbFBhcmVudCwgc2Nyb2xsSW50b1ZpZXcsIHNjcm9sbFRvQ2FyZXR9IGZyb20gXCIuL3Njcm9sbFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWh0bWwtZWRpdG9yXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbngtaHRtbC1lZGl0b3ItdG9vbGJhciBbc3R5bGUuZGlzcGxheV09XCJyZWFkb25seSA/ICdub25lJyA6ICcnXCI+PC9pb254LWh0bWwtZWRpdG9yLXRvb2xiYXI+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFtcImVkaXRvci5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEh0bWxFZGl0b3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpZEdlbmVyYXRvcjogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwdWJsaWMgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZm9ybUNvbnRyb2w6IE5nQ29udHJvbCxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBpdGVtOiBJb25JdGVtXG4gICAgKSB7XG5cbiAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Db250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pZCA9IFwiaW9ueC10cml4LWVkaXRvclwiICsgKEh0bWxFZGl0b3IuaWRHZW5lcmF0b3IrKyk7XG4gICAgICAgIHRoaXMuaXRlbUlucHV0V3JhcHBlciA9ICEhdGhpcy5pdGVtO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vLWJsdXJcIiwgXCJcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBldmVudFVubGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG5cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW9ueC1pdGVtLWlucHV0LXdyYXBwZXJcIilcbiAgICAvKnByaXZhdGUqLyBpdGVtSW5wdXRXcmFwcGVyOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBmZWF0dXJlczogSHRtbEVkaXRvckZlYXR1cmVzO1xuXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSwgdGhhdCBzaG91bGQgYmUgc2V0IHdoZW4gZWRpdG9yIGlzIGZ1bGx5IGluaXRpYWxpemVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgdW5pbml0aWFsaXplZFZhbHVlOiBhbnk7XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPblRvdWNoZWQ6IEZ1bmN0aW9uO1xuXG4gICAgcHJpdmF0ZSBmb2N1c2VkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBzaWxlbnRDaGFuZ2VzOiBib29sZWFuO1xuXG4gICAgdmlldzogRWRpdG9yVmlldztcblxuICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5zdGF0ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNjaGVtYTogU2NoZW1hO1xuXG4gICAgcHJpdmF0ZSBwbHVnaW5zOiBQbHVnaW5bXTtcblxuICAgIHByaXZhdGUgc2Nyb2xsUGFyZW50OiBIVE1MRWxlbWVudDtcblxuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHZhbHVlKGh0bWw6IHN0cmluZykge1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHtcblxuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBFZGl0b3JTdGF0ZS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHNjaGVtYTogdGhpcy52aWV3LnN0YXRlLnNjaGVtYSxcbiAgICAgICAgICAgICAgICBwbHVnaW5zOiB0aGlzLnZpZXcuc3RhdGUucGx1Z2lucyxcbiAgICAgICAgICAgICAgICBkb2M6IHRoaXMuZWRpdG9yRG9jKGh0bWwgfHwgXCI8ZGl2PjwvZGl2PlwiKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMudmlldy51cGRhdGVTdGF0ZShzdGF0ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5pbml0aWFsaXplZFZhbHVlID0gaHRtbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2lsZW50Q2hhbmdlcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMudmlldykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBET01TZXJpYWxpemVyLmZyb21TY2hlbWEodGhpcy5zY2hlbWEpLnNlcmlhbGl6ZUZyYWdtZW50KHRoaXMuc3RhdGUuZG9jLmNvbnRlbnQpO1xuICAgICAgICAgICAgY29uc3QgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRtcC5hcHBlbmRDaGlsZCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICghdG1wLmlubmVyVGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwYXJlT3V0cHV0VmFsdWUodG1wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudW5pbml0aWFsaXplZFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlT3V0cHV0VmFsdWUodmFsdWU6IEhUTUxFbGVtZW50KSB7XG5cbiAgICAgICAgdmFsdWUucXVlcnlTZWxlY3RvckFsbChcImRpdltkYXRhLXlvdXR1YmVdXCIpLmZvckVhY2goKG5vZGU6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBub2RlLmdldEF0dHJpYnV0ZShcImRhdGEteW91dHViZVwiKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNyZWF0ZVlvdXR1YmVJZnJhbWUocGFyYW1zWzBdLCBwYXJhbXMubGVuZ3RoID4gMSA/IHBhcmFtc1sxXSA6IHVuZGVmaW5lZCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWUuaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUlucHV0VmFsdWUodmFsdWU6IEhUTUxFbGVtZW50KSB7XG5cbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9ICEhaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsUGFyZW50ID0gZmluZFNjcm9sbFBhcmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAodGhpcy52aWV3LmRvbSBhcyBIVE1MRWxlbWVudCkuZm9jdXMoe3ByZXZlbnRTY3JvbGw6IHRydWV9KTtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZFZpZXcgPSAodGhpcy52aWV3LmRvbSBhcyBIVE1MRWxlbWVudCkucXVlcnlTZWxlY3RvcihcIi5pb254LS1zZWxlY3RlZFwiKTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRWaWV3KSB7XG4gICAgICAgICAgICBzY3JvbGxJbnRvVmlldyhzZWxlY3RlZFZpZXcgYXMgSFRNTEVsZW1lbnQsIHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHRoaXMudmlldy5kb21BdFBvcyh0aGlzLnZpZXcuc3RhdGUuc2VsZWN0aW9uLnRvKTtcbiAgICAgICAgICAgIGlmIChwb3Mubm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChwb3Mubm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9DYXJldCh0aGlzLnNjcm9sbFBhcmVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSW50b1ZpZXcocG9zLm5vZGUgYXMgSFRNTEVsZW1lbnQsIHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBhc3luYyBlZGl0b3JJbml0aWFsaXplZChldmVudDogRXZlbnQpIHtcblxuICAgICAgICBpZiAodGhpcy51bmluaXRpYWxpemVkVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHRoaXMudHJpeEVkaXRvci5sb2FkSFRNTCh0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLnRyaXhFZGl0b3JDb250cm9sbGVyLnRvb2xiYXJDb250cm9sbGVyLmFwcGx5S2V5Ym9hcmRDb21tYW5kID0gdGhpcy5hcHBseUtleWJvYXJkQ29tbWFuZC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGVkaXRvckZvY3VzZWQoZXZlbnQ6IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGVkaXRvckJsdXJlZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbUNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVNjcm9sbCh2aWV3OiBFZGl0b3JWaWV3KSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnQgPSBmaW5kU2Nyb2xsUGFyZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvcyA9IHZpZXcuZG9tQXRQb3Modmlldy5zdGF0ZS5zZWxlY3Rpb24udG8pO1xuICAgICAgICBpZiAocG9zLm5vZGUpIHtcbiAgICAgICAgICAgIGlmIChwb3Mubm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb0NhcmV0KHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsSW50b1ZpZXcocG9zLm5vZGUgYXMgSFRNTEVsZW1lbnQsIHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVkaXRvckRvYyhodG1sOiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB0aGlzLnByZXBhcmVJbnB1dFZhbHVlKG5vZGUpO1xuXG4gICAgICAgIHJldHVybiBET01QYXJzZXIuZnJvbVNjaGVtYSh0aGlzLnNjaGVtYSkucGFyc2Uobm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldENvbnRyb2xDc3MoKSB7XG5cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IHtcbiAgICAgICAgICAgIFwiaW9uLXVudG91Y2hlZFwiOiB0aGlzLmZvcm1Db250cm9sLnVudG91Y2hlZCxcbiAgICAgICAgICAgIFwiaW9uLXRvdWNoZWRcIjogdGhpcy5mb3JtQ29udHJvbC50b3VjaGVkLFxuICAgICAgICAgICAgXCJpb24tcHJpc3RpbmVcIjogdGhpcy5mb3JtQ29udHJvbC5wcmlzdGluZSxcbiAgICAgICAgICAgIFwiaW9uLWRpcnR5XCI6IHRoaXMuZm9ybUNvbnRyb2wuZGlydHksXG4gICAgICAgICAgICBcImlvbi12YWxpZFwiOiB0aGlzLmZvcm1Db250cm9sLnZhbGlkLFxuICAgICAgICAgICAgXCJpb24taW52YWxpZFwiOiAhdGhpcy5mb3JtQ29udHJvbC52YWxpZFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgICAgICAgIGVsZW1lbnRzLnB1c2godGhpcy5pdGVtW1wiZWxcIl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBlIG9mIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGMgaW4gY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzW2NdKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuY2xhc3NMaXN0LmFkZChjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVJdGVtQ2xhc3NlcygpIHtcblxuICAgICAgICBpZiAoIXRoaXMuaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXRlbTogSFRNTEVsZW1lbnQgPSB0aGlzLml0ZW1bXCJlbFwiXTtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1pbnRlcmFjdGl2ZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWhhcy1mb2N1c1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taGFzLWZvY3VzXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBmaXhJdGVtT3ZlcmZsb3coKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgICAgICAgY29uc3QgaXRlbTogSFRNTEVsZW1lbnQgPSB0aGlzLml0ZW1bXCJlbFwiXTtcbiAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhaXRlbS5zaGFkb3dSb290ICYmICEhaXRlbS5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIuaXRlbS1pbm5lclwiKSk7XG5cbiAgICAgICAgICAgIGl0ZW0uc3R5bGUub3ZlcmZsb3cgPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBgLml0ZW0tbmF0aXZlLCAuaXRlbS1pbm5lciwgLmlucHV0LXdyYXBwZXIgeyBvdmVyZmxvdzogaW5pdGlhbCAhaW1wb3J0YW50OyB9YDtcbiAgICAgICAgICAgIGl0ZW0uc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgZWRpdG9yVHJhbnNhY3Rpb24odHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uKSB7XG5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB0aGlzLnZpZXcudXBkYXRlU3RhdGUodGhpcy52aWV3LnN0YXRlLmFwcGx5KHRyYW5zYWN0aW9uKSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UubmV4dCgpO1xuXG4gICAgICAgIGlmICh0cmFuc2FjdGlvbi5kb2NDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5uZXh0KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPbkNoYW5nZSAmJiAhdGhpcy5zaWxlbnRDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNpbGVudENoYW5nZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5Q2hhbmdlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcuZG9tW1wiY29udGVudEVkaXRhYmxlXCJdID0gIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpeEl0ZW1PdmVyZmxvdygpO1xuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1DbGFzc2VzKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICB0aGlzLnJlc2V0Q29udHJvbENzcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIGZvciAoY29uc3QgdW5saXN0ZW4gb2YgdGhpcy5ldmVudFVubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3LmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy52aWV3ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xuXG4gICAgICAgIHRoaXMucGx1Z2lucyA9IFtcbiAgICAgICAgICAgIGtleW1hcChidWlsZEtleW1hcChzY2hlbWEpKSxcbiAgICAgICAgICAgIGtleW1hcChiYXNlS2V5bWFwKSxcbiAgICAgICAgICAgIGdhcEN1cnNvcigpLFxuICAgICAgICAgICAgaGlzdG9yeSgpXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBFZGl0b3JTdGF0ZS5jcmVhdGUoe1xuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIHBsdWdpbnM6IHRoaXMucGx1Z2lucyxcbiAgICAgICAgICAgIGRvYzogdGhpcy5lZGl0b3JEb2ModGhpcy51bmluaXRpYWxpemVkVmFsdWUgPyB0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSA6IFwiPGRpdj48L2Rpdj5cIilcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IEVkaXRvclZpZXcodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgIGRpc3BhdGNoVHJhbnNhY3Rpb246ICh0cmFuc2FjdGlvbikgPT4gdGhpcy5lZGl0b3JUcmFuc2FjdGlvbih0cmFuc2FjdGlvbiksXG4gICAgICAgICAgICBoYW5kbGVTY3JvbGxUb1NlbGVjdGlvbjogKHZpZXcpID0+IHRoaXMuaGFuZGxlU2Nyb2xsKHZpZXcpLFxuXG4gICAgICAgICAgICBub2RlVmlld3M6IHtcbiAgICAgICAgICAgICAgICB5b3V0dWJlOiAobm9kZSwgdmlldykgPT4gbmV3IFlvdXR1YmVOb2RlVmlldyhub2RlLCB2aWV3LCB0aGlzLmV2ZW50TWFuYWdlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5yZWFkb25seUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcblxuICAgICAgICBpZiAoY2hhbmdlc1tcInJlYWRvbmx5XCJdIHx8IGNoYW5nZXNbXCJkaXNhYmxlZFwiXSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkb25seUNoYW5nZWQoKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIl19