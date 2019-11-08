import {Component, Input} from "@angular/core";
import {AbstractControl, FormGroupDirective} from "@angular/forms";

@Component({
    selector: "ionx-form-item-error",
    template: `
        <ion-icon [name]="icon" *ngIf="!!icon"></ion-icon>
        <label>
            <ng-template [ngIf]="control">{{control | intlValidationErrorMessage}}</ng-template>
            <ng-content></ng-content>
        </label>
    `,
    styleUrls: ["item-error-item-hint.scss", "item-error.scss"],
    host: {
        "[class.ionx--visible]": "!control || !!(control.invalid && control[markedAs])"
    }
})
export class FormItemError {

    constructor(private formGroup: FormGroupDirective) {
    }

    @Input()
    icon: string;

    @Input()
    markedAs: "touched" | "dirty" = "touched";

    private _control: AbstractControl | string;

    get control() {
        if (typeof this._control === "string") {
            return this.formGroup.form && this.formGroup.form.controls[this._control];
        } else {
            return this._control;
        }
    }

    @Input("control")
    set controlOrName(control: AbstractControl | string) {
        this._control = control;
    }

}
