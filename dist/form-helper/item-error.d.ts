import { AbstractControl, FormGroupDirective } from "@angular/forms";
export declare class FormItemError {
    private formGroup;
    constructor(formGroup: FormGroupDirective);
    icon: string;
    _control: AbstractControl;
    control: AbstractControl | string;
}
