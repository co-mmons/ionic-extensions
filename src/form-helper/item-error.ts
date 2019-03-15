import {Component, Input} from "@angular/core";
import {AbstractControl, FormGroupDirective} from "@angular/forms";

@Component({
    selector: "ionx-form-item-error",
    template: `
        <ion-icon [name]="icon" *ngIf="icon"></ion-icon>
        <label>
            <ng-template [ngIf]="_control">{{_control | intlValidationErrorMessage}}</ng-template>
            <ng-content></ng-content>
        </label>
    `,
    host: {
        "[style.display]": "!_control || (_control.invalid && _control[markedAs]) ? 'flex' : 'none'"
    }
})
export class FormItemError {

    constructor(private formGroup: FormGroupDirective) {
    }

    @Input()
    icon: string;

    @Input()
    markedAs: "touched" | "dirty" = "touched";

    _control: AbstractControl;

    @Input()
    set control(control: AbstractControl | string) {
        if (control instanceof AbstractControl) {
            this._control = control;
        } else if (control) {
            this._control = this.formGroup.form.controls[control];
        }
    }

}
