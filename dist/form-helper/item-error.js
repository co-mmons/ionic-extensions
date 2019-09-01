import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";
var FormItemError = /** @class */ (function () {
    function FormItemError(formGroup) {
        this.formGroup = formGroup;
        this.markedAs = "touched";
    }
    Object.defineProperty(FormItemError.prototype, "control", {
        set: function (control) {
            if (control instanceof AbstractControl) {
                this._control = control;
            }
            else if (control) {
                this._control = this.formGroup.form.controls[control];
            }
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], FormItemError.prototype, "icon", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], FormItemError.prototype, "markedAs", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], FormItemError.prototype, "control", null);
    FormItemError = tslib_1.__decorate([
        Component({
            selector: "ionx-form-item-error",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"icon\"></ion-icon>\n        <label>\n            <ng-template [ngIf]=\"_control\">{{_control | intlValidationErrorMessage}}</ng-template>\n            <ng-content></ng-content>\n        </label>\n    ",
            host: {
                "[style.display]": "!_control || (_control.invalid && _control[markedAs]) ? 'flex' : 'none'"
            }
        }),
        tslib_1.__metadata("design:paramtypes", [FormGroupDirective])
    ], FormItemError);
    return FormItemError;
}());
export { FormItemError };
//# sourceMappingURL=item-error.js.map