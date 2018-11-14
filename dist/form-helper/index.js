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
        var invalidControlNames = [];
        for (var controlName in this.formGroup.controls) {
            var control = this.formGroup.controls[controlName];
            var wasPristine = control.pristine;
            var wasUntouched = control.untouched;
            control.markAsDirty();
            control.markAsTouched();
            control.updateValueAndValidity();
            if (!control.valid) {
                invalidControlNames.push(controlName);
            }
            else if (control.valid) {
                if (wasPristine) {
                    control.markAsPristine();
                }
                if (wasUntouched) {
                    control.markAsUntouched();
                }
            }
        }
        for (var _i = 0, _a = this.formGroupDirective.directives; _i < _a.length; _i++) {
            var control = _a[_i];
            for (var _b = 0, invalidControlNames_1 = invalidControlNames; _b < invalidControlNames_1.length; _b++) {
                var invalidControl = invalidControlNames_1[_b];
                if (control.name == invalidControl) {
                    this.focusImpl(invalidControl);
                    break;
                }
            }
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
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], FormHelper.prototype, "readonly", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], FormHelper.prototype, "busy", null);
    __decorate([
        ContentChildren(FormControlName, { descendants: true }),
        __metadata("design:type", QueryList)
    ], FormHelper.prototype, "contentControls", void 0);
    FormHelper = __decorate([
        Directive({
            selector: "[ionx-form-helper],[ionxFormHelper]",
            exportAs: "ionxFormHelper"
        }),
        __param(1, Optional()), __param(2, Optional()),
        __metadata("design:paramtypes", [ElementRef, NgForm, FormGroupDirective])
    ], FormHelper);
    return FormHelper;
}());
export { FormHelper };
var FormHelperModule = /** @class */ (function () {
    function FormHelperModule() {
    }
    FormHelperModule = __decorate([
        NgModule({
            declarations: [FormHelper],
            bootstrap: [],
            exports: [FormHelper]
        })
    ], FormHelperModule);
    return FormHelperModule;
}());
export { FormHelperModule };
//# sourceMappingURL=index.js.map
