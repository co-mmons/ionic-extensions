var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";
var FormItemError = /** @class */ (function () {
    function FormItemError(formGroup) {
        this.formGroup = formGroup;
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormItemError.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FormItemError.prototype, "control", null);
    FormItemError = __decorate([
        Component({
            selector: "ionx-form-item-error",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"icon\"></ion-icon>\n        <label>\n            <ng-template [ngIf]=\"_control\">{{_control | intlValidationErrorMessage}}</ng-template>\n            <ng-content></ng-content>\n        </label>\n    ",
            host: {
                "[style.display]": "_control.invalid && _control.touched ? 'flex' : 'none'"
            }
        }),
        __metadata("design:paramtypes", [FormGroupDirective])
    ], FormItemError);
    return FormItemError;
}());
export { FormItemError };
//# sourceMappingURL=item-error.js.map