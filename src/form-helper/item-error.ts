import {Component, Input} from "@angular/core";
import {AbstractControl, FormGroupDirective} from "@angular/forms";

@Component({
    selector: "ionx-form-item-error",
    template: `
        <ion-icon [name]="icon" *ngIf="!!icon"></ion-icon>
        <label>
            <ng-template [ngIf]="_control">{{_control | intlValidationErrorMessage}}</ng-template>
            <ng-content></ng-content>
        </label>
    `,
    styleUrls: ["item-error-item-hint.scss", "item-error.scss"],
    host: {
        "[class.ionx--visible]": "!_control || !!(_control.invalid && _control[markedAs])"
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
