import { AbstractControl, FormGroupDirective } from "@angular/forms";
export declare class FormItemError {
    private formGroup;
    constructor(formGroup: FormGroupDirective);
    icon: string;
    markedAs: "touched" | "dirty";
    private _control;
    readonly control: AbstractControl;
    controlOrName: AbstractControl | string;
}
