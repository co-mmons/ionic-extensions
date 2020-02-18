import { AbstractControl, FormGroupDirective } from "@angular/forms";
export declare class FormItemError {
    private formGroup;
    constructor(formGroup: FormGroupDirective);
    icon: string;
    markedAs: "touched" | "dirty";
    private _control;
    get control(): AbstractControl;
    set controlOrName(control: AbstractControl | string);
}
