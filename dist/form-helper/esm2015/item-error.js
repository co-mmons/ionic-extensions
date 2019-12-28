import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";
let FormItemError = class FormItemError {
    constructor(formGroup) {
        this.formGroup = formGroup;
        this.markedAs = "touched";
    }
    get control() {
        if (typeof this._control === "string") {
            return this.formGroup.form && this.formGroup.form.controls[this._control];
        }
        else {
            return this._control;
        }
    }
    set controlOrName(control) {
        this._control = control;
    }
};
FormItemError.ctorParameters = () => [
    { type: FormGroupDirective }
];
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
        template: `
        <ion-icon [name]="icon" *ngIf="!!icon"></ion-icon>
        <label>
            <ng-template [ngIf]="control">{{control | intlValidationErrorMessage}}</ng-template>
            <ng-content></ng-content>
        </label>
    `,
        host: {
            "[class.ionx--visible]": "!control || !!(control.invalid && control[markedAs])"
        },
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:-webkit-box;display:flex}"]
    })
], FormItemError);
export { FormItemError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyLyIsInNvdXJjZXMiOlsiaXRlbS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBZ0JuRSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBRXRCLFlBQW9CLFNBQTZCO1FBQTdCLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBT2pELGFBQVEsR0FBd0IsU0FBUyxDQUFDO0lBTjFDLENBQUM7SUFVRCxJQUFJLE9BQU87UUFDUCxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDbkMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzdFO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBR0QsSUFBSSxhQUFhLENBQUMsT0FBaUM7UUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztDQUVKLENBQUE7O1lBeEJrQyxrQkFBa0I7O0FBSWpEO0lBREMsS0FBSyxFQUFFOzJDQUNLO0FBR2I7SUFEQyxLQUFLLEVBQUU7K0NBQ2tDO0FBYTFDO0lBREMsS0FBSyxDQUFDLFNBQVMsQ0FBQztrREFHaEI7QUF4QlEsYUFBYTtJQWR6QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLFFBQVEsRUFBRTs7Ozs7O0tBTVQ7UUFFRCxJQUFJLEVBQUU7WUFDRix1QkFBdUIsRUFBRSxzREFBc0Q7U0FDbEY7O0tBQ0osQ0FBQztHQUNXLGFBQWEsQ0EwQnpCO1NBMUJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwRGlyZWN0aXZlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1mb3JtLWl0ZW0tZXJyb3JcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9uLWljb24gW25hbWVdPVwiaWNvblwiICpuZ0lmPVwiISFpY29uXCI+PC9pb24taWNvbj5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImNvbnRyb2xcIj57e2NvbnRyb2wgfCBpbnRsVmFsaWRhdGlvbkVycm9yTWVzc2FnZX19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogW1wiaXRlbS1lcnJvci1pdGVtLWhpbnQuc2Nzc1wiLCBcIml0ZW0tZXJyb3Iuc2Nzc1wiXSxcbiAgICBob3N0OiB7XG4gICAgICAgIFwiW2NsYXNzLmlvbngtLXZpc2libGVdXCI6IFwiIWNvbnRyb2wgfHwgISEoY29udHJvbC5pbnZhbGlkICYmIGNvbnRyb2xbbWFya2VkQXNdKVwiXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtSXRlbUVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGljb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbWFya2VkQXM6IFwidG91Y2hlZFwiIHwgXCJkaXJ0eVwiID0gXCJ0b3VjaGVkXCI7XG5cbiAgICBwcml2YXRlIF9jb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBzdHJpbmc7XG5cbiAgICBnZXQgY29udHJvbCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jb250cm9sID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXAuZm9ybSAmJiB0aGlzLmZvcm1Hcm91cC5mb3JtLmNvbnRyb2xzW3RoaXMuX2NvbnRyb2xdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRyb2w7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoXCJjb250cm9sXCIpXG4gICAgc2V0IGNvbnRyb2xPck5hbWUoY29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2wgPSBjb250cm9sO1xuICAgIH1cblxufVxuIl19