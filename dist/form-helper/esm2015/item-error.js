import { Component, Input } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";
export class FormItemError {
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
}
FormItemError.decorators = [
    { type: Component, args: [{
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
                styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}\n", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:flex}\n"]
            },] }
];
FormItemError.ctorParameters = () => [
    { type: FormGroupDirective }
];
FormItemError.propDecorators = {
    icon: [{ type: Input }],
    markedAs: [{ type: Input }],
    controlOrName: [{ type: Input, args: ["control",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mb3JtLWhlbHBlci9pdGVtLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBa0Isa0JBQWtCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQWdCbkUsTUFBTSxPQUFPLGFBQWE7SUFFdEIsWUFBb0IsU0FBNkI7UUFBN0IsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFPakQsYUFBUSxHQUF3QixTQUFTLENBQUM7SUFOMUMsQ0FBQztJQVVELElBQUksT0FBTztRQUNQLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0U7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFRCxJQUNJLGFBQWEsQ0FBQyxPQUFpQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDOzs7WUF0Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7O0tBTVQ7Z0JBRUQsSUFBSSxFQUFFO29CQUNGLHVCQUF1QixFQUFFLHNEQUFzRDtpQkFDbEY7O2FBQ0o7OztZQWZ3QixrQkFBa0I7OzttQkFxQnRDLEtBQUs7dUJBR0wsS0FBSzs0QkFhTCxLQUFLLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXBEaXJlY3RpdmV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWZvcm0taXRlbS1lcnJvclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24taWNvbiBbbmFtZV09XCJpY29uXCIgKm5nSWY9XCIhIWljb25cIj48L2lvbi1pY29uPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY29udHJvbFwiPnt7Y29udHJvbCB8IGludGxWYWxpZGF0aW9uRXJyb3JNZXNzYWdlfX08L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2xhYmVsPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbXCJpdGVtLWVycm9yLWl0ZW0taGludC5zY3NzXCIsIFwiaXRlbS1lcnJvci5zY3NzXCJdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCJbY2xhc3MuaW9ueC0tdmlzaWJsZV1cIjogXCIhY29udHJvbCB8fCAhIShjb250cm9sLmludmFsaWQgJiYgY29udHJvbFttYXJrZWRBc10pXCJcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEZvcm1JdGVtRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtR3JvdXA6IEZvcm1Hcm91cERpcmVjdGl2ZSkge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBtYXJrZWRBczogXCJ0b3VjaGVkXCIgfCBcImRpcnR5XCIgPSBcInRvdWNoZWRcIjtcblxuICAgIHByaXZhdGUgX2NvbnRyb2w6IEFic3RyYWN0Q29udHJvbCB8IHN0cmluZztcblxuICAgIGdldCBjb250cm9sKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbnRyb2wgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1Hcm91cC5mb3JtICYmIHRoaXMuZm9ybUdyb3VwLmZvcm0uY29udHJvbHNbdGhpcy5fY29udHJvbF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udHJvbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dChcImNvbnRyb2xcIilcbiAgICBzZXQgY29udHJvbE9yTmFtZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IGNvbnRyb2w7XG4gICAgfVxuXG59XG4iXX0=