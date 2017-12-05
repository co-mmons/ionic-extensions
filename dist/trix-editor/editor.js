var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ElementRef, ViewEncapsulation, Renderer2, Input, Optional } from "@angular/core";
import { NgControl } from "@angular/forms";
import { Item } from "ionic-angular";
import "trix";
import { EventListenersHelper } from "../helpers/event-listeners-helper";
var TrixEditor = /** @class */ (function () {
    function TrixEditor(element, renderer, formControl, item) {
        this.element = element;
        this.renderer = renderer;
        this.formControl = formControl;
        this.item = item;
        this.eventListeners = new EventListenersHelper();
        if (formControl) {
            this.formControl.valueAccessor = this;
        }
        this.id = "ionx-trix-editor" + (TrixEditor_1.idGenerator++);
        this.toolbar = this.nativeElement.appendChild(document.createElement("trix-toolbar"));
        this.toolbar.id = this.id + "-toolbar";
        this.toolbar.style.position = "sticky";
        this.toolbar.style.top = "0px";
        this.editor = this.nativeElement.appendChild(document.createElement("trix-editor"));
        this.editor.setAttribute("toolbar", this.toolbar.id);
    }
    TrixEditor_1 = TrixEditor;
    Object.defineProperty(TrixEditor.prototype, "value", {
        get: function () {
            if (this.editor["editor"]) {
                return this.editor.value;
            }
            else {
                return this.uninitializedValue;
            }
        },
        set: function (html) {
            if (this.editor["editor"]) {
                this.uninitializedValue = null;
                this.editor["editor"].loadHTML(html);
            }
            else {
                this.uninitializedValue = html;
            }
        },
        enumerable: true,
        configurable: true
    });
    TrixEditor.prototype.registerOnValidatorChange = function (fn) {
    };
    TrixEditor.prototype.setDisabledState = function (isDisabled) {
    };
    TrixEditor.prototype.ngOnChanges = function (changes) {
    };
    TrixEditor.prototype.writeValue = function (currentValue) {
        this.value = currentValue;
    };
    TrixEditor.prototype.registerOnChange = function (fn) {
        this.controlOnChange = fn;
    };
    TrixEditor.prototype.registerOnTouched = function (fn) {
        this.controlOnTouched = fn;
    };
    TrixEditor.prototype.validate = function (c) {
        return null;
    };
    TrixEditor.prototype.editorChanged = function (event) {
        if (this.controlOnChange) {
            this.controlOnChange(this.value);
        }
    };
    TrixEditor.prototype.initFocus = function () {
    };
    TrixEditor.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    Object.defineProperty(TrixEditor.prototype, "nativeElement", {
        get: function () {
            return this.element.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    TrixEditor.prototype.editorInitialized = function (event) {
        if (this.uninitializedValue) {
            this.editor["editor"].loadHTML(this.uninitializedValue);
        }
    };
    TrixEditor.prototype.editorFocused = function (event) {
        if (this.controlOnTouched) {
            this.controlOnTouched(true);
        }
        if (this.item) {
            this.renderer.addClass(this.item.getNativeElement(), "input-has-focus");
        }
    };
    TrixEditor.prototype.editorBlured = function (event) {
        if (this.item) {
            this.renderer.removeClass(this.item.getNativeElement(), "input-has-focus");
        }
    };
    TrixEditor.prototype.resetControlCss = function () {
        var classes = {
            "ng-untouched": this.formControl.untouched,
            "ng-touched": this.formControl.touched,
            "ng-pristine": this.formControl.pristine,
            "ng-dirty": this.formControl.dirty,
            "ng-valid": this.formControl.valid,
            "ng-invalid": !this.formControl.valid
        };
        var elements = [];
        elements.push(this.element.nativeElement);
        if (this.item) {
            elements.push(this.item.getNativeElement());
        }
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var e = elements_1[_i];
            for (var c in classes) {
                if (classes[c]) {
                    this.renderer.addClass(e, c);
                }
                else {
                    this.renderer.removeClass(e, c);
                }
            }
        }
    };
    TrixEditor.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.eventListeners.add(this.editor, "trix-change", function (event) { return _this.editorChanged(event); });
        this.eventListeners.add(this.editor, "trix-focus", function (event) { return _this.editorFocused(event); });
        this.eventListeners.add(this.editor, "trix-blur", function (event) { return _this.editorBlured(event); });
        this.eventListeners.add(this.editor, "trix-initialize", function (event) { return _this.editorInitialized(event); });
        if (this.item) {
            var parent_1 = this.toolbar.parentElement;
            while (true) {
                if (!parent_1) {
                    break;
                }
                parent_1.style.overflow = "visible";
                if (parent_1 === this.item.getNativeElement()) {
                    break;
                }
                parent_1 = parent_1.parentElement;
            }
        }
    };
    TrixEditor.prototype.ngAfterContentChecked = function () {
        this.resetControlCss();
    };
    TrixEditor.prototype.ngOnDestroy = function () {
        this.eventListeners.removeAll();
    };
    TrixEditor.idGenerator = 0;
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TrixEditor.prototype, "value", null);
    TrixEditor = TrixEditor_1 = __decorate([
        Component({
            selector: "ionx-trix-editor",
            template: "",
            encapsulation: ViewEncapsulation.None
        }),
        __param(2, Optional()), __param(3, Optional()),
        __metadata("design:paramtypes", [ElementRef, Renderer2, NgControl, Item])
    ], TrixEditor);
    return TrixEditor;
    var TrixEditor_1;
}());
export { TrixEditor };
//# sourceMappingURL=editor.js.map