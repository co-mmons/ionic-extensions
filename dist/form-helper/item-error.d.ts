import { AbstractControl, FormGroupDirective } from "@angular/forms";
export declare class ItemError {
    private formGroup;
    constructor(formGroup: FormGroupDirective);
    icon: string;
    _control: AbstractControl;
    control: AbstractControl | string;
}
