import {ContentChildren, Directive, ElementRef, Input, NgModule, Optional, QueryList} from "@angular/core";
import {FormControlName, FormGroup, FormGroupDirective, NgForm} from "@angular/forms";

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
        
        for (let invalidControl of invalidControlNames) {
            for (let control of this.formGroupDirective.directives) {
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

        let element: HTMLElement;

        if (control instanceof FormControlName) {
            control = control.valueAccessor;
        }

        if (control["element"] instanceof ElementRef) {
            element = control["element"].nativeElement;
        }

        // element to focus
        if (element) {
            
            let focusable = element;

            let realInput = (element.shadowRoot && element.shadowRoot.querySelector(".native-input")) || element.querySelector(".native-input");
            if (realInput) {
                focusable = realInput as HTMLElement;
            }

            focusable.focus();
        }

        if (scrollIntoView && element) {            
            this.scrollIntoView(element.closest("ion-item") as HTMLElement || element);
        }
    }

    private findParentImpl(element: HTMLElement): HTMLElement {

        if (!element) {
            return;
        }

        if (element.scrollHeight >= element.clientHeight) {
            const overflowY = window.getComputedStyle(element).overflowY;
            if (overflowY !== "visible" && overflowY !== "hidden") {
                return element;
            }
        }

        if (element.assignedSlot) {
            let p = this.findParentImpl(element.assignedSlot.parentElement);
            if (p) {
                return p;
            }
        }

        return this.findParentImpl(element.parentElement);
    }

    private scrollIntoView(element: HTMLElement) {
        let parent = this.findParentImpl(element);

        if (parent) {

            let top = element.offsetTop;

            if (element.offsetParent) {
                let offsetParent = element.offsetParent as HTMLElement;
                while (offsetParent != parent && !!offsetParent) {
                    top += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent as HTMLElement;
                }
            }

            parent.scrollTo({top: top, behavior: "smooth"});
            return;
        }

        element.scrollIntoView();
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
