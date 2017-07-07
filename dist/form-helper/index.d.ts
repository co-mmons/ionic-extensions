import { ElementRef } from "@angular/core";
import { FormGroup, FormGroupDirective, NgForm } from "@angular/forms";
export declare class FormHelper {
    readonly element: ElementRef;
    readonly ngForm: NgForm;
    private readonly formGroupDirective;
    constructor(element: ElementRef, ngForm: NgForm, formGroupDirective: FormGroupDirective);
    readonly: boolean;
    markAsReadonly(): void;
    readonly formGroup: FormGroup;
    validateAll(): void;
    private focusImpl(control, scrollIntoView?);
    focus(formControlName: string, scrollIntoView?: boolean): void;
}
export declare class FormHelperModule {
}
