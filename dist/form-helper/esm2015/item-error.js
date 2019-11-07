import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
import { AbstractControl, FormGroupDirective } from "@angular/forms";
let FormItemError = class FormItemError {
    constructor(formGroup) {
        this.formGroup = formGroup;
        this.markedAs = "touched";
    }
    set control(control) {
        if (control instanceof AbstractControl) {
            this._control = control;
        }
        else if (control) {
            this._control = this.formGroup.form.controls[control];
        }
    }
};
FormItemError.ctorParameters = () => [
    { type: FormGroupDirective }
];
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
        template: `
        <ion-icon [name]="icon" *ngIf="!!icon"></ion-icon>
        <label>
            <ng-template [ngIf]="_control">{{_control | intlValidationErrorMessage}}</ng-template>
            <ng-content></ng-content>
        </label>
    `,
        host: {
            "[class.ionx--visible]": "!_control || !!(_control.invalid && _control[markedAs])"
        },
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:-webkit-box;display:flex}"]
    })
], FormItemError);
export { FormItemError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyLyIsInNvdXJjZXMiOlsiaXRlbS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBZ0JuRSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBRXRCLFlBQW9CLFNBQTZCO1FBQTdCLGNBQVMsR0FBVCxTQUFTLENBQW9CO1FBT2pELGFBQVEsR0FBd0IsU0FBUyxDQUFDO0lBTjFDLENBQUM7SUFXRCxJQUFJLE9BQU8sQ0FBQyxPQUFpQztRQUN6QyxJQUFJLE9BQU8sWUFBWSxlQUFlLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDM0I7YUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6RDtJQUNMLENBQUM7Q0FFSixDQUFBOztZQXBCa0Msa0JBQWtCOztBQUlqRDtJQURDLEtBQUssRUFBRTsyQ0FDSztBQUdiO0lBREMsS0FBSyxFQUFFOytDQUNrQztBQUsxQztJQURDLEtBQUssRUFBRTs0Q0FPUDtBQXBCUSxhQUFhO0lBZHpCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsUUFBUSxFQUFFOzs7Ozs7S0FNVDtRQUVELElBQUksRUFBRTtZQUNGLHVCQUF1QixFQUFFLHlEQUF5RDtTQUNyRjs7S0FDSixDQUFDO0dBQ1csYUFBYSxDQXNCekI7U0F0QlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXBEaXJlY3RpdmV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWZvcm0taXRlbS1lcnJvclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24taWNvbiBbbmFtZV09XCJpY29uXCIgKm5nSWY9XCIhIWljb25cIj48L2lvbi1pY29uPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiX2NvbnRyb2xcIj57e19jb250cm9sIHwgaW50bFZhbGlkYXRpb25FcnJvck1lc3NhZ2V9fTwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFtcIml0ZW0tZXJyb3ItaXRlbS1oaW50LnNjc3NcIiwgXCJpdGVtLWVycm9yLnNjc3NcIl0sXG4gICAgaG9zdDoge1xuICAgICAgICBcIltjbGFzcy5pb254LS12aXNpYmxlXVwiOiBcIiFfY29udHJvbCB8fCAhIShfY29udHJvbC5pbnZhbGlkICYmIF9jb250cm9sW21hcmtlZEFzXSlcIlxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUl0ZW1FcnJvciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBpY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIG1hcmtlZEFzOiBcInRvdWNoZWRcIiB8IFwiZGlydHlcIiA9IFwidG91Y2hlZFwiO1xuXG4gICAgX2NvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGNvbnRyb2woY29udHJvbDogQWJzdHJhY3RDb250cm9sIHwgc3RyaW5nKSB7XG4gICAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgQWJzdHJhY3RDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250cm9sID0gY29udHJvbDtcbiAgICAgICAgfSBlbHNlIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250cm9sID0gdGhpcy5mb3JtR3JvdXAuZm9ybS5jb250cm9sc1tjb250cm9sXTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19