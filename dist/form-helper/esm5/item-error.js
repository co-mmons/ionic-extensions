import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";
var FormItemError = /** @class */ (function () {
    function FormItemError(formGroup) {
        this.formGroup = formGroup;
        this.markedAs = "touched";
    }
    Object.defineProperty(FormItemError.prototype, "control", {
        get: function () {
            if (typeof this._control === "string") {
                return this.formGroup.form && this.formGroup.form.controls[this._control];
            }
            else {
                return this._control;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormItemError.prototype, "controlOrName", {
        set: function (control) {
            this._control = control;
        },
        enumerable: true,
        configurable: true
    });
    FormItemError.ctorParameters = function () { return [
        { type: FormGroupDirective }
    ]; };
    __decorate([
        Input()
    ], FormItemError.prototype, "icon", void 0);
    __decorate([
        Input()
    ], FormItemError.prototype, "markedAs", void 0);
    __decorate([
        Input("control")
    ], FormItemError.prototype, "controlOrName", null);
    FormItemError = __decorate([
        Component({
            selector: "ionx-form-item-error",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"!!icon\"></ion-icon>\n        <label>\n            <ng-template [ngIf]=\"control\">{{control | intlValidationErrorMessage}}</ng-template>\n            <ng-content></ng-content>\n        </label>\n    ",
            host: {
                "[class.ionx--visible]": "!control || !!(control.invalid && control[markedAs])"
            },
            styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:-webkit-box;display:flex}"]
        })
    ], FormItemError);
    return FormItemError;
}());
export { FormItemError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyLyIsInNvdXJjZXMiOlsiaXRlbS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBZ0JuRTtJQUVJLHVCQUFvQixTQUE2QjtRQUE3QixjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQU9qRCxhQUFRLEdBQXdCLFNBQVMsQ0FBQztJQU4xQyxDQUFDO0lBVUQsc0JBQUksa0NBQU87YUFBWDtZQUNJLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzdFO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN4QjtRQUNMLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksd0NBQWE7YUFBakIsVUFBa0IsT0FBaUM7WUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7O2dCQXRCOEIsa0JBQWtCOztJQUlqRDtRQURDLEtBQUssRUFBRTsrQ0FDSztJQUdiO1FBREMsS0FBSyxFQUFFO21EQUNrQztJQWExQztRQURDLEtBQUssQ0FBQyxTQUFTLENBQUM7c0RBR2hCO0lBeEJRLGFBQWE7UUFkekIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxRQUFRLEVBQUUsc1BBTVQ7WUFFRCxJQUFJLEVBQUU7Z0JBQ0YsdUJBQXVCLEVBQUUsc0RBQXNEO2FBQ2xGOztTQUNKLENBQUM7T0FDVyxhQUFhLENBMEJ6QjtJQUFELG9CQUFDO0NBQUEsQUExQkQsSUEwQkM7U0ExQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXBEaXJlY3RpdmV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWZvcm0taXRlbS1lcnJvclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24taWNvbiBbbmFtZV09XCJpY29uXCIgKm5nSWY9XCIhIWljb25cIj48L2lvbi1pY29uPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY29udHJvbFwiPnt7Y29udHJvbCB8IGludGxWYWxpZGF0aW9uRXJyb3JNZXNzYWdlfX08L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2xhYmVsPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbXCJpdGVtLWVycm9yLWl0ZW0taGludC5zY3NzXCIsIFwiaXRlbS1lcnJvci5zY3NzXCJdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCJbY2xhc3MuaW9ueC0tdmlzaWJsZV1cIjogXCIhY29udHJvbCB8fCAhIShjb250cm9sLmludmFsaWQgJiYgY29udHJvbFttYXJrZWRBc10pXCJcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEZvcm1JdGVtRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSkge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBtYXJrZWRBczogXCJ0b3VjaGVkXCIgfCBcImRpcnR5XCIgPSBcInRvdWNoZWRcIjtcblxuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFic3RyYWN0Q29udHJvbCB8IHN0cmluZztcblxuICAgIGdldCBjb250cm9sKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbnRyb2wgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1Hcm91cC5mb3JtICYmIHRoaXMuZm9ybUdyb3VwLmZvcm0uY29udHJvbHNbdGhpcy5fY29udHJvbF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dChcImNvbnRyb2xcIilcbiAgICBzZXQgY29udHJvbE9yTmFtZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG4gICAgfVxuXG59XG4iXX0=