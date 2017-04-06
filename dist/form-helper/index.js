import { NgModule, Directive, ContentChildren } from "@angular/core";
import { FormControlName } from "@angular/forms";
import { TextInput } from "ionic-angular";
var FormHelper = (function () {
    function FormHelper() {
    }
    FormHelper.prototype.validateAll = function () {
        var firstNotValidAccessor;
        for (var _i = 0, _a = this.controls.toArray(); _i < _a.length; _i++) {
            var control = _a[_i];
            control.control.markAsDirty();
            control.control.markAsTouched();
            control.control.updateValueAndValidity();
            if (!control.valid && !firstNotValidAccessor) {
                firstNotValidAccessor = control.valueAccessor;
            }
        }
        if (firstNotValidAccessor) {
            var elementToScroll = void 0;
            if (firstNotValidAccessor instanceof TextInput) {
                firstNotValidAccessor.setFocus();
                elementToScroll = firstNotValidAccessor.getNativeElement().closest(".item");
            }
            if (elementToScroll) {
                elementToScroll.scrollIntoView();
            }
        }
    };
    return FormHelper;
}());
export { FormHelper };
FormHelper.decorators = [
    { type: Directive, args: [{
                selector: "[ionx-form-helper],[ionxFormHelper]"
            },] },
];
/** @nocollapse */
FormHelper.ctorParameters = function () { return []; };
FormHelper.propDecorators = {
    'controls': [{ type: ContentChildren, args: [FormControlName, { descendants: true },] },],
};
var FormHelperModule = (function () {
    function FormHelperModule() {
    }
    return FormHelperModule;
}());
export { FormHelperModule };
FormHelperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FormHelper],
                bootstrap: [],
                exports: [FormHelper]
            },] },
];
/** @nocollapse */
FormHelperModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map