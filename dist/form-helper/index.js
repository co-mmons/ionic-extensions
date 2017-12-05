import { NgModule, Directive, ContentChildren, QueryList, ElementRef, Input, Optional } from "@angular/core";
import { FormControlName, FormGroupDirective, NgForm } from "@angular/forms";
import { TextInput } from "ionic-angular";
var FormHelper = /** @class */ (function () {
    function FormHelper(element, ngForm, formGroupDirective) {
        this.element = element;
        this.ngForm = ngForm;
        this.formGroupDirective = formGroupDirective;
    }
    Object.defineProperty(FormHelper.prototype, "readonly", {
        get: function () {
            return this.element.nativeElement.hasAttribute("readonly");
        },
        set: function (readonly) {
            if (readonly) {
                this.element.nativeElement.setAttribute("readonly", "");
            }
            else {
                this.element.nativeElement.removeAttribute("readonly");
            }
        },
        enumerable: true,
        configurable: true
    });
    FormHelper.prototype.markAsReadonly = function () {
        this.readonly = true;
    };
    Object.defineProperty(FormHelper.prototype, "busy", {
        get: function () {
            return this.element.nativeElement.hasAttribute("busy");
        },
        set: function (busy) {
            if (busy) {
                this.element.nativeElement.setAttribute("busy", "");
            }
            else {
                this.element.nativeElement.removeAttribute("busy");
            }
        },
        enumerable: true,
        configurable: true
    });
    FormHelper.prototype.markAsBusy = function () {
        this.busy = true;
    };
    FormHelper.prototype.formControlName = function (name) {
        for (var _i = 0, _a = this.contentControls.toArray(); _i < _a.length; _i++) {
            var a = _a[_i];
            if (a.name == name) {
                return a;
            }
        }
    };
    Object.defineProperty(FormHelper.prototype, "formGroup", {
        get: function () {
            return this.formGroupDirective ? this.formGroupDirective.form : undefined;
        },
        enumerable: true,
        configurable: true
    });
    FormHelper.prototype.validateAll = function () {
        if (!this.formGroupDirective) {
            return;
        }
        var firstNotValidControl;
        for (var _i = 0, _a = this.formGroupDirective.directives; _i < _a.length; _i++) {
            var control = _a[_i];
            var wasPristine = control.control.pristine;
            var wasUntouched = control.control.untouched;
            control.control.markAsDirty();
            control.control.markAsTouched();
            control.control.updateValueAndValidity();
            if (!control.valid && !firstNotValidControl) {
                firstNotValidControl = control;
            }
            else if (control.valid) {
                if (wasPristine) {
                    control.control.markAsPristine();
                }
                if (wasUntouched) {
                    control.control.markAsUntouched();
                }
            }
        }
        if (firstNotValidControl) {
            this.focusImpl(firstNotValidControl);
        }
    };
    FormHelper.prototype.focusImpl = function (control, scrollIntoView) {
        if (scrollIntoView === void 0) { scrollIntoView = true; }
        if (typeof control == "string" && this.formGroupDirective) {
            for (var _i = 0, _a = this.formGroupDirective.directives; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c.name == control) {
                    control = c;
                    break;
                }
            }
        }
        var elementToScroll;
        if (control instanceof FormControlName) {
            control = control.valueAccessor;
        }
        if (control instanceof TextInput) {
            control.setFocus();
            elementToScroll = control.getNativeElement().closest(".item");
        }
        else if (control && typeof control.focus == "function") {
            control.focus();
        }
        if (!elementToScroll && control && control.nativeElement) {
            elementToScroll = control.nativeElement.closest(".item") || control.nativeElement;
        }
        if (scrollIntoView && elementToScroll) {
            elementToScroll.scrollIntoView();
        }
    };
    FormHelper.prototype.focus = function (formControlName, scrollIntoView) {
        if (scrollIntoView === void 0) { scrollIntoView = true; }
        this.focusImpl(formControlName, scrollIntoView);
    };
    return FormHelper;
}());
export { FormHelper };
var FormHelperModule = /** @class */ (function () {
    function FormHelperModule() {
    }
    return FormHelperModule;
}());
export { FormHelperModule };
//# sourceMappingURL=index.js.map