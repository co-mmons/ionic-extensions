import { __awaiter, __decorate, __generator, __param, __values } from "tslib";
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
                scrollIntoView(this.view.dom.querySelector(".ionx--selected") || pos.node, this.scrollParent);
            }
        }
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
        if (pos.node) {
            if (pos.node.nodeType === Node.TEXT_NODE) {
                scrollToCaret(this.scrollParent);
            }
            else {
                scrollIntoView(view.dom.querySelector(".ionx--selected") || pos.node, this.scrollParent);
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
            styles: [":host ::ng-deep .ProseMirror{outline:0;-moz-user-select:text;-ms-user-select:text;user-select:text;-webkit-user-select:text}:host ::ng-deep .ProseMirror[contenteditable=true]{min-height:60px;white-space:pre-wrap;word-wrap:break-word}:host ::ng-deep .ProseMirror[contenteditable=true] .ionx--selected{border:4px solid var(--ion-color-primary)}:host ::ng-deep .ProseMirror:not([contenteditable=true]) .ionx--interactive{display:none}:host ::ng-deep .ProseMirror p{margin:16px 0 0}:host ::ng-deep .ProseMirror p:first-child{margin-top:0}:host ::ng-deep .ProseMirror h1{font-size:130%}:host ::ng-deep .ProseMirror h2{font-size:125%}:host ::ng-deep .ProseMirror h3{font-size:120%}:host ::ng-deep .ProseMirror h4{font-size:115%}:host ::ng-deep .ProseMirror h5{font-size:110%}:host ::ng-deep .ProseMirror h6{font-size:105%}:host ::ng-deep .ProseMirror h1,:host ::ng-deep .ProseMirror h2,:host ::ng-deep .ProseMirror h3,:host ::ng-deep .ProseMirror h4,:host ::ng-deep .ProseMirror h5,:host ::ng-deep .ProseMirror h6{margin-top:16px;margin-bottom:8px}:host ::ng-deep .ProseMirror h1:first-child,:host ::ng-deep .ProseMirror h2:first-child,:host ::ng-deep .ProseMirror h3:first-child,:host ::ng-deep .ProseMirror h4:first-child,:host ::ng-deep .ProseMirror h5:first-child,:host ::ng-deep .ProseMirror h6:first-child{margin-top:0}:host ::ng-deep .ProseMirror ul:first-child{margin-top:0}"]
        }),
        __param(2, Optional()),
        __param(3, Optional())
    ], HtmlEditor);
    return HtmlEditor;
}());
export { HtmlEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJlZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6TCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDNUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFDLFdBQVcsRUFBc0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMs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LElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUVMLENBQUM7O0lBM1djLHNCQUFXLEdBQVcsQ0FBQyxDQUFDOztnQkFHbEIsVUFBVTtnQkFDTixZQUFZO2dCQUNBLFNBQVMsdUJBQXpDLFFBQVE7Z0JBQ2lCLE9BQU8sdUJBQWhDLFFBQVE7O0lBa0JEO1FBRFgsV0FBVyxDQUFDLCtCQUErQixDQUFDO3dEQUNQO0lBR3RDO1FBREMsS0FBSyxFQUFFO2dEQUNxQjtJQUc3QjtRQURDLEtBQUssRUFBRTtnREFDVTtJQUdsQjtRQURDLEtBQUssRUFBRTtnREFDVTtJQTRCbEI7UUFEQyxNQUFNLEVBQUU7OENBQytDO0lBR3hEO1FBREMsTUFBTSxFQUFFO3VEQUN3RDtJQUdqRTtRQURDLEtBQUssRUFBRTsyQ0FrQlA7SUF0RlEsVUFBVTtRQVB0QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSxrSEFFVDs7U0FFSixDQUFDO1FBUU8sV0FBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLFdBQUEsUUFBUSxFQUFFLENBQUE7T0FSTixVQUFVLENBOFd0QjtJQUFELGlCQUFDO0NBQUEsQUE5V0QsSUE4V0M7U0E5V1ksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIE91dHB1dCwgU2ltcGxlQ2hhbmdlc30gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7d2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtJb25JdGVtfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7YmFzZUtleW1hcH0gZnJvbSBcInByb3NlbWlycm9yLWNvbW1hbmRzXCI7XG5pbXBvcnQge2dhcEN1cnNvcn0gZnJvbSBcInByb3NlbWlycm9yLWdhcGN1cnNvclwiO1xuaW1wb3J0IHtoaXN0b3J5fSBmcm9tIFwicHJvc2VtaXJyb3ItaGlzdG9yeVwiO1xuaW1wb3J0IHtrZXltYXB9IGZyb20gXCJwcm9zZW1pcnJvci1rZXltYXBcIjtcbmltcG9ydCB7RE9NUGFyc2VyLCBET01TZXJpYWxpemVyLCBTY2hlbWF9IGZyb20gXCJwcm9zZW1pcnJvci1tb2RlbFwiO1xuaW1wb3J0IHtFZGl0b3JTdGF0ZSwgUGx1Z2luLCBUcmFuc2FjdGlvbn0gZnJvbSBcInByb3NlbWlycm9yLXN0YXRlXCI7XG5pbXBvcnQge0VkaXRvclZpZXd9IGZyb20gXCJwcm9zZW1pcnJvci12aWV3XCI7XG5pbXBvcnQge0h0bWxFZGl0b3JGZWF0dXJlc30gZnJvbSBcIi4vZWRpdG9yLWZlYXR1cmVzXCI7XG5pbXBvcnQge2J1aWxkS2V5bWFwfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9rZXltYXBcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7Y3JlYXRlWW91dHViZUlmcmFtZSwgWW91dHViZU5vZGVWaWV3fSBmcm9tIFwiLi9wcm9zZW1pcnJvci92aWV3cy95b3V0dWJlXCI7XG5pbXBvcnQge2ZpbmRTY3JvbGxQYXJlbnQsIHNjcm9sbEludG9WaWV3LCBzY3JvbGxUb0NhcmV0fSBmcm9tIFwiLi9zY3JvbGxcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1odG1sLWVkaXRvclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb254LWh0bWwtZWRpdG9yLXRvb2xiYXIgW3N0eWxlLmRpc3BsYXldPVwicmVhZG9ubHkgPyAnbm9uZScgOiAnJ1wiPjwvaW9ueC1odG1sLWVkaXRvci10b29sYmFyPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbXCJlZGl0b3Iuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBIdG1sRWRpdG9yIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaWRHZW5lcmF0b3I6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHVibGljIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGZvcm1Db250cm9sOiBOZ0NvbnRyb2wsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaXRlbTogSW9uSXRlbVxuICAgICkge1xuXG4gICAgICAgIGlmIChmb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaWQgPSBcImlvbngtdHJpeC1lZGl0b3JcIiArIChIdG1sRWRpdG9yLmlkR2VuZXJhdG9yKyspO1xuICAgICAgICB0aGlzLml0ZW1JbnB1dFdyYXBwZXIgPSAhIXRoaXMuaXRlbTtcblxuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJuby1ibHVyXCIsIFwiXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXZlbnRVbmxpc3RlbmVyczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gICAgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmlvbngtaXRlbS1pbnB1dC13cmFwcGVyXCIpXG4gICAgLypwcml2YXRlKi8gaXRlbUlucHV0V3JhcHBlcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZmVhdHVyZXM6IEh0bWxFZGl0b3JGZWF0dXJlcztcblxuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUsIHRoYXQgc2hvdWxkIGJlIHNldCB3aGVuIGVkaXRvciBpcyBmdWxseSBpbml0aWFsaXplZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVuaW5pdGlhbGl6ZWRWYWx1ZTogYW55O1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25DaGFuZ2U6IEZ1bmN0aW9uO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25Ub3VjaGVkOiBGdW5jdGlvbjtcblxuICAgIHByaXZhdGUgZm9jdXNlZDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgc2lsZW50Q2hhbmdlczogYm9vbGVhbjtcblxuICAgIHZpZXc6IEVkaXRvclZpZXc7XG5cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuc3RhdGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzY2hlbWE6IFNjaGVtYTtcblxuICAgIHByaXZhdGUgcGx1Z2luczogUGx1Z2luW107XG5cbiAgICBwcml2YXRlIHNjcm9sbFBhcmVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCB2YWx1ZShodG1sOiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAodGhpcy52aWV3KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gRWRpdG9yU3RhdGUuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHRoaXMudmlldy5zdGF0ZS5zY2hlbWEsXG4gICAgICAgICAgICAgICAgcGx1Z2luczogdGhpcy52aWV3LnN0YXRlLnBsdWdpbnMsXG4gICAgICAgICAgICAgICAgZG9jOiB0aGlzLmVkaXRvckRvYyhodG1sIHx8IFwiPGRpdj48L2Rpdj5cIilcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnZpZXcudXBkYXRlU3RhdGUoc3RhdGUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSA9IGh0bWw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNpbGVudENoYW5nZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnZpZXcpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gRE9NU2VyaWFsaXplci5mcm9tU2NoZW1hKHRoaXMuc2NoZW1hKS5zZXJpYWxpemVGcmFnbWVudCh0aGlzLnN0YXRlLmRvYy5jb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB0bXAuYXBwZW5kQ2hpbGQodmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoIXRtcC5pbm5lclRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZU91dHB1dFZhbHVlKHRtcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBuYXRpdmVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZU91dHB1dFZhbHVlKHZhbHVlOiBIVE1MRWxlbWVudCkge1xuXG4gICAgICAgIHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZbZGF0YS15b3V0dWJlXVwiKS5mb3JFYWNoKChub2RlOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXlvdXR1YmVcIikuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChjcmVhdGVZb3V0dWJlSWZyYW1lKHBhcmFtc1swXSwgcGFyYW1zLmxlbmd0aCA+IDEgPyBwYXJhbXNbMV0gOiB1bmRlZmluZWQpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlLmlubmVySFRNTDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVJbnB1dFZhbHVlKHZhbHVlOiBIVE1MRWxlbWVudCkge1xuXG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSAhIWlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuc2lsZW50Q2hhbmdlcyA9IHRydWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcblxuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsUGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFBhcmVudCA9IGZpbmRTY3JvbGxQYXJlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgKHRoaXMudmlldy5kb20gYXMgSFRNTEVsZW1lbnQpLmZvY3VzKHtwcmV2ZW50U2Nyb2xsOiB0cnVlfSk7XG5cbiAgICAgICAgY29uc3QgcG9zID0gdGhpcy52aWV3LmRvbUF0UG9zKHRoaXMudmlldy5zdGF0ZS5zZWxlY3Rpb24udG8pO1xuICAgICAgICBpZiAocG9zLm5vZGUpIHtcbiAgICAgICAgICAgIGlmIChwb3Mubm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb0NhcmV0KHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsSW50b1ZpZXcodGhpcy52aWV3LmRvbS5xdWVyeVNlbGVjdG9yKFwiLmlvbngtLXNlbGVjdGVkXCIpIHx8IHBvcy5ub2RlIGFzIEhUTUxFbGVtZW50LCB0aGlzLnNjcm9sbFBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgcHJpdmF0ZSBhc3luYyBlZGl0b3JJbml0aWFsaXplZChldmVudDogRXZlbnQpIHtcblxuICAgICAgICBpZiAodGhpcy51bmluaXRpYWxpemVkVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHRoaXMudHJpeEVkaXRvci5sb2FkSFRNTCh0aGlzLnVuaW5pdGlhbGl6ZWRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLnRyaXhFZGl0b3JDb250cm9sbGVyLnRvb2xiYXJDb250cm9sbGVyLmFwcGx5S2V5Ym9hcmRDb21tYW5kID0gdGhpcy5hcHBseUtleWJvYXJkQ29tbWFuZC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGVkaXRvckZvY3VzZWQoZXZlbnQ6IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBwcml2YXRlIGVkaXRvckJsdXJlZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbUNsYXNzZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVNjcm9sbCh2aWV3OiBFZGl0b3JWaWV3KSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxQYXJlbnQgPSBmaW5kU2Nyb2xsUGFyZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvcyA9IHZpZXcuZG9tQXRQb3Modmlldy5zdGF0ZS5zZWxlY3Rpb24udG8pO1xuICAgICAgICBpZiAocG9zLm5vZGUpIHtcbiAgICAgICAgICAgIGlmIChwb3Mubm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb0NhcmV0KHRoaXMuc2Nyb2xsUGFyZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsSW50b1ZpZXcodmlldy5kb20ucXVlcnlTZWxlY3RvcihcIi5pb254LS1zZWxlY3RlZFwiKSB8fCBwb3Mubm9kZSBhcyBIVE1MRWxlbWVudCwgdGhpcy5zY3JvbGxQYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZWRpdG9yRG9jKGh0bWw6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBub2RlLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIHRoaXMucHJlcGFyZUlucHV0VmFsdWUobm9kZSk7XG5cbiAgICAgICAgcmV0dXJuIERPTVBhcnNlci5mcm9tU2NoZW1hKHRoaXMuc2NoZW1hKS5wYXJzZShub2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0Q29udHJvbENzcygpIHtcblxuICAgICAgICBjb25zdCBjbGFzc2VzID0ge1xuICAgICAgICAgICAgXCJpb24tdW50b3VjaGVkXCI6IHRoaXMuZm9ybUNvbnRyb2wudW50b3VjaGVkLFxuICAgICAgICAgICAgXCJpb24tdG91Y2hlZFwiOiB0aGlzLmZvcm1Db250cm9sLnRvdWNoZWQsXG4gICAgICAgICAgICBcImlvbi1wcmlzdGluZVwiOiB0aGlzLmZvcm1Db250cm9sLnByaXN0aW5lLFxuICAgICAgICAgICAgXCJpb24tZGlydHlcIjogdGhpcy5mb3JtQ29udHJvbC5kaXJ0eSxcbiAgICAgICAgICAgIFwiaW9uLXZhbGlkXCI6IHRoaXMuZm9ybUNvbnRyb2wudmFsaWQsXG4gICAgICAgICAgICBcImlvbi1pbnZhbGlkXCI6ICF0aGlzLmZvcm1Db250cm9sLnZhbGlkXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgICAgICAgZWxlbWVudHMucHVzaCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgICAgICAgZWxlbWVudHMucHVzaCh0aGlzLml0ZW1bXCJlbFwiXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYyBpbiBjbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzZXNbY10pIHtcbiAgICAgICAgICAgICAgICAgICAgZS5jbGFzc0xpc3QuYWRkKGMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUl0ZW1DbGFzc2VzKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5pdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpdGVtOiBIVE1MRWxlbWVudCA9IHRoaXMuaXRlbVtcImVsXCJdO1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pbnRlcmFjdGl2ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taGFzLWZvY3VzXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1oYXMtZm9jdXNcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGZpeEl0ZW1PdmVyZmxvdygpIHtcblxuICAgICAgICBpZiAodGhpcy5pdGVtKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtOiBIVE1MRWxlbWVudCA9IHRoaXMuaXRlbVtcImVsXCJdO1xuICAgICAgICAgICAgYXdhaXQgd2FpdFRpbGwoKCkgPT4gISFpdGVtLnNoYWRvd1Jvb3QgJiYgISFpdGVtLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5pdGVtLWlubmVyXCIpKTtcblxuICAgICAgICAgICAgaXRlbS5zdHlsZS5vdmVyZmxvdyA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCA9IGAuaXRlbS1uYXRpdmUsIC5pdGVtLWlubmVyLCAuaW5wdXQtd3JhcHBlciB7IG92ZXJmbG93OiBpbml0aWFsICFpbXBvcnRhbnQ7IH1gO1xuICAgICAgICAgICAgaXRlbS5zaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlZGl0b3JUcmFuc2FjdGlvbih0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24pIHtcblxuICAgICAgICAodGhpcy52aWV3LmRvbSBhcyBIVE1MRWxlbWVudCkuZm9jdXMoe3ByZXZlbnRTY3JvbGw6IHRydWV9KTtcblxuICAgICAgICB0aGlzLnZpZXcudXBkYXRlU3RhdGUodGhpcy52aWV3LnN0YXRlLmFwcGx5KHRyYW5zYWN0aW9uKSk7XG5cbiAgICAgICAgdGhpcy5mb2N1cygpO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLm5leHQoKTtcblxuICAgICAgICBpZiAodHJhbnNhY3Rpb24uZG9jQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2UubmV4dCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sT25DaGFuZ2UgJiYgIXRoaXMuc2lsZW50Q2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaWxlbnRDaGFuZ2VzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWFkb25seUNoYW5nZWQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudmlldykge1xuICAgICAgICAgICAgdGhpcy52aWV3LmRvbVtcImNvbnRlbnRFZGl0YWJsZVwiXSA9ICF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmRpc2FibGVkID8gXCJ0cnVlXCIgOiBcImZhbHNlXCI7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maXhJdGVtT3ZlcmZsb3coKTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtQ2xhc3NlcygpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy5yZXNldENvbnRyb2xDc3MoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICBmb3IgKGNvbnN0IHVubGlzdGVuIG9mIHRoaXMuZXZlbnRVbmxpc3RlbmVycykge1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlldy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMudmlldyA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcblxuICAgICAgICB0aGlzLnBsdWdpbnMgPSBbXG4gICAgICAgICAgICBrZXltYXAoYnVpbGRLZXltYXAoc2NoZW1hKSksXG4gICAgICAgICAgICBrZXltYXAoYmFzZUtleW1hcCksXG4gICAgICAgICAgICBnYXBDdXJzb3IoKSxcbiAgICAgICAgICAgIGhpc3RvcnkoKVxuICAgICAgICBdO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlID0gRWRpdG9yU3RhdGUuY3JlYXRlKHtcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBwbHVnaW5zOiB0aGlzLnBsdWdpbnMsXG4gICAgICAgICAgICBkb2M6IHRoaXMuZWRpdG9yRG9jKHRoaXMudW5pbml0aWFsaXplZFZhbHVlID8gdGhpcy51bmluaXRpYWxpemVkVmFsdWUgOiBcIjxkaXY+PC9kaXY+XCIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBFZGl0b3JWaWV3KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCB7XG4gICAgICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgICAgICBkaXNwYXRjaFRyYW5zYWN0aW9uOiAodHJhbnNhY3Rpb24pID0+IHRoaXMuZWRpdG9yVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pLFxuICAgICAgICAgICAgaGFuZGxlU2Nyb2xsVG9TZWxlY3Rpb246ICh2aWV3KSA9PiB0aGlzLmhhbmRsZVNjcm9sbCh2aWV3KSxcblxuICAgICAgICAgICAgbm9kZVZpZXdzOiB7XG4gICAgICAgICAgICAgICAgeW91dHViZTogKG5vZGUsIHZpZXcpID0+IG5ldyBZb3V0dWJlTm9kZVZpZXcobm9kZSwgdmlldywgdGhpcy5ldmVudE1hbmFnZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2lsZW50Q2hhbmdlcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5IHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHlDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbXCJyZWFkb25seVwiXSB8fCBjaGFuZ2VzW1wiZGlzYWJsZWRcIl0pIHtcbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHlDaGFuZ2VkKCk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiJdfQ==