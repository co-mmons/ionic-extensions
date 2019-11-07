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
    FormItemError.ctorParameters = function () { return [
        { type: FormGroupDirective }
    ]; };
    tslib_1.__decorate([
        Input()
    ], FormItemError.prototype, "icon", void 0);
    tslib_1.__decorate([
        Input()
    ], FormItemError.prototype, "markedAs", void 0);
    tslib_1.__decorate([
        Input()
    ], FormItemError.prototype, "control", null);
    FormItemError = tslib_1.__decorate([
        Component({
            selector: "ionx-form-item-error",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"!!icon\"></ion-icon>\n        <label>\n            <ng-template [ngIf]=\"_control\">{{_control | intlValidationErrorMessage}}</ng-template>\n            <ng-content></ng-content>\n        </label>\n    ",
            host: {
                "[class.ionx--visible]": "!_control || !!(_control.invalid && _control[markedAs])"
            },
            styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:-webkit-box;display:flex}"]
        })
    ], FormItemError);
    return FormItemError;
}());
export { FormItemError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyLyIsInNvdXJjZXMiOlsiaXRlbS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBZ0JuRTtJQUVJLHVCQUFvQixTQUE2QjtRQUE3QixjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQU9qRCxhQUFRLEdBQXdCLFNBQVMsQ0FBQztJQU4xQyxDQUFDO0lBV0Qsc0JBQUksa0NBQU87YUFBWCxVQUFZLE9BQWlDO1lBQ3pDLElBQUksT0FBTyxZQUFZLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3pEO1FBQ0wsQ0FBQzs7O09BQUE7O2dCQWxCOEIsa0JBQWtCOztJQUlqRDtRQURDLEtBQUssRUFBRTsrQ0FDSztJQUdiO1FBREMsS0FBSyxFQUFFO21EQUNrQztJQUsxQztRQURDLEtBQUssRUFBRTtnREFPUDtJQXBCUSxhQUFhO1FBZHpCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsUUFBUSxFQUFFLHdQQU1UO1lBRUQsSUFBSSxFQUFFO2dCQUNGLHVCQUF1QixFQUFFLHlEQUF5RDthQUNyRjs7U0FDSixDQUFDO09BQ1csYUFBYSxDQXNCekI7SUFBRCxvQkFBQztDQUFBLEFBdEJELElBc0JDO1NBdEJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwRGlyZWN0aXZlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1mb3JtLWl0ZW0tZXJyb3JcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9uLWljb24gW25hbWVdPVwiaWNvblwiICpuZ0lmPVwiISFpY29uXCI+PC9pb24taWNvbj5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIl9jb250cm9sXCI+e3tfY29udHJvbCB8IGludGxWYWxpZGF0aW9uRXJyb3JNZXNzYWdlfX08L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2xhYmVsPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbXCJpdGVtLWVycm9yLWl0ZW0taGludC5zY3NzXCIsIFwiaXRlbS1lcnJvci5zY3NzXCJdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCJbY2xhc3MuaW9ueC0tdmlzaWJsZV1cIjogXCIhX2NvbnRyb2wgfHwgISEoX2NvbnRyb2wuaW52YWxpZCAmJiBfY29udHJvbFttYXJrZWRBc10pXCJcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEZvcm1JdGVtRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSkge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBtYXJrZWRBczogXCJ0b3VjaGVkXCIgfCBcImRpcnR5XCIgPSBcInRvdWNoZWRcIjtcblxuICAgIF9jb250cm9sOiBBYnN0cmFjdENvbnRyb2w7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBjb250cm9sKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCB8IHN0cmluZykge1xuICAgICAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5fY29udHJvbCA9IHRoaXMuZm9ybUdyb3VwLmZvcm0uY29udHJvbHNbY29udHJvbF07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==