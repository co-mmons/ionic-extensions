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
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"!!icon\"></ion-icon>\n        <label>\n            <ng-template [ngIf]=\"_control\">{{_control | intlValidationErrorMessage}}</ng-template>\n            <ng-content></ng-content>\n        </label>\n    ",
            host: {
                "[class.ionx--visible]": "!_control || !!(_control.invalid && _control[markedAs])"
            },
            styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:flex}"]
        }),
        tslib_1.__metadata("design:paramtypes", [FormGroupDirective])
    ], FormItemError);
    return FormItemError;
}());
export { FormItemError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsiZm9ybS1oZWxwZXIvaXRlbS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBZ0JuRTtJQUVJLHVCQUFvQixTQUE2QjtRQUE3QixjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQU9qRCxhQUFRLEdBQXdCLFNBQVMsQ0FBQztJQU4xQyxDQUFDO0lBV0Qsc0JBQUksa0NBQU87YUFBWCxVQUFZLE9BQWlDO1lBQ3pDLElBQUksT0FBTyxZQUFZLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3pEO1FBQ0wsQ0FBQzs7O09BQUE7SUFkRDtRQURDLEtBQUssRUFBRTs7K0NBQ0s7SUFHYjtRQURDLEtBQUssRUFBRTs7bURBQ2tDO0lBSzFDO1FBREMsS0FBSyxFQUFFOzs7Z0RBT1A7SUFwQlEsYUFBYTtRQWR6QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFFBQVEsRUFBRSx3UEFNVDtZQUVELElBQUksRUFBRTtnQkFDRix1QkFBdUIsRUFBRSx5REFBeUQ7YUFDckY7O1NBQ0osQ0FBQztpREFHaUMsa0JBQWtCO09BRnhDLGFBQWEsQ0FzQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXRCRCxJQXNCQztTQXRCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cERpcmVjdGl2ZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZm9ybS1pdGVtLWVycm9yXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbi1pY29uIFtuYW1lXT1cImljb25cIiAqbmdJZj1cIiEhaWNvblwiPjwvaW9uLWljb24+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJfY29udHJvbFwiPnt7X2NvbnRyb2wgfCBpbnRsVmFsaWRhdGlvbkVycm9yTWVzc2FnZX19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogW1wiaXRlbS1lcnJvci1pdGVtLWhpbnQuc2Nzc1wiLCBcIml0ZW0tZXJyb3Iuc2Nzc1wiXSxcbiAgICBob3N0OiB7XG4gICAgICAgIFwiW2NsYXNzLmlvbngtLXZpc2libGVdXCI6IFwiIV9jb250cm9sIHx8ICEhKF9jb250cm9sLmludmFsaWQgJiYgX2NvbnRyb2xbbWFya2VkQXNdKVwiXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtSXRlbUVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGljb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbWFya2VkQXM6IFwidG91Y2hlZFwiIHwgXCJkaXJ0eVwiID0gXCJ0b3VjaGVkXCI7XG5cbiAgICBfY29udHJvbDogQWJzdHJhY3RDb250cm9sO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgY29udHJvbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2wgPSB0aGlzLmZvcm1Hcm91cC5mb3JtLmNvbnRyb2xzW2NvbnRyb2xdO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=