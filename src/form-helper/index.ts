import {NgModule, Directive, ContentChildren, QueryList, ElementRef, Input, Optional} from "@angular/core";
import {FormGroup, FormControlName, FormGroupDirective, NgForm} from "@angular/forms";
import {TextInput} from "ionic-angular";

@Directive({
    selector: "[ionx-form-helper],[ionxFormHelper]",
    exportAs: "ionxFormHelper"
})
export class FormHelper {

    constructor(public readonly element: ElementRef, @Optional() public readonly ngForm: NgForm, @Optional() private readonly formGroupDirective: FormGroupDirective) {
    }

    @Input()
    public get readonly(): boolean {
        return this.element.nativeElement.hasAttribute("readonly");
    }

    public set readonly(readonly: boolean) {
        if (readonly) {
            this.element.nativeElement.setAttribute("readonly", "");
        } else {
            this.element.nativeElement.removeAttribute("readonly");
        }
    }

    public markAsReadonly() {
        this.readonly = true;
    }

    @Input()
    public get busy(): boolean {
        return this.element.nativeElement.hasAttribute("busy");
    }

    public set busy(busy: boolean) {
        if (busy) {
            this.element.nativeElement.setAttribute("busy", "");
        } else {
            this.element.nativeElement.removeAttribute("busy");
        }
    }

    public markAsBusy() {
        this.busy = true;
    }
    
    @ContentChildren(FormControlName, {descendants: true})
    protected readonly contentControls: QueryList<FormControlName>;

    public formControlName(name: string): FormControlName {

        for (let a of this.contentControls.toArray()) {
            if (a.name == name) {
                return a;
            }
        }
    }

    public get formGroup(): FormGroup {
        return this.formGroupDirective ? this.formGroupDirective.form : undefined;
    }

    public validateAll() {

        if (!this.formGroupDirective) {
            return;
        }

        let invalidControlNames: string[] = [];

        for (let controlName in this.formGroup.controls) {
            let control = this.formGroup.controls[controlName];

            let wasPristine = control.pristine;
            let wasUntouched = control.untouched;

            control.markAsDirty();
            control.markAsTouched();
            control.updateValueAndValidity();

            if (!control.valid) {
                invalidControlNames.push(controlName);

            } else if (control.valid) {

                if (wasPristine) {
                    control.markAsPristine();
                }

                if (wasUntouched) {
                    control.markAsUntouched();
                }
            }
        }
        
        for (let control of this.formGroupDirective.directives) {
            for (let invalidControl of invalidControlNames) {
                if (control.name == invalidControl) {
                    this.focusImpl(invalidControl);
                    break;
                }
            }
        }
    }

    private focusImpl(control: string | any, scrollIntoView: boolean = true) {

        if (typeof control == "string" && this.formGroupDirective) {
            for (let c of this.formGroupDirective.directives) {
                if (c.name == control) {
                    control = c;
                    break;
                }
            }
        }

        let elementToScroll: HTMLElement;

        if (control instanceof FormControlName) {
            control = control.valueAccessor;
        }

        if (control instanceof TextInput) {
            control.setFocus();
            elementToScroll = control.getNativeElement().closest(".item");
        } else if (control && typeof control.focus == "function") {
            control.focus();
        }

        if (!elementToScroll && control && control.nativeElement) {
            elementToScroll = control.nativeElement.closest(".item") || control.nativeElement;            
        }

        if (scrollIntoView && elementToScroll) {
            elementToScroll.scrollIntoView();
        }
    }

    public focus(formControlName: string, scrollIntoView: boolean = true) {
        this.focusImpl(formControlName, scrollIntoView);
    }
}

@NgModule({
    declarations: [FormHelper],
    bootstrap: [],
    exports: [FormHelper]
})
export class FormHelperModule {

}
