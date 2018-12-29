import { ElementRef, QueryList } from "@angular/core";
import { FormControlName, FormGroup, FormGroupDirective, NgForm } from "@angular/forms";
export declare class FormHelper {
    readonly element: ElementRef;
    readonly ngForm: NgForm;
    private readonly formGroupDirective;
    constructor(element: ElementRef, ngForm: NgForm, formGroupDirective: FormGroupDirective);
    readonly: boolean;
    markAsReadonly(): void;
    busy: boolean;
    markAsBusy(): void;
    protected readonly contentControls: QueryList<FormControlName>;
    formControlName(name: string): FormControlName;
    readonly formGroup: FormGroup;
    validateAll(markAs?: "touched" | "dirty"): void;
    private focusImpl;
    focus(formControlName: string, scrollIntoView?: boolean): void;
}
