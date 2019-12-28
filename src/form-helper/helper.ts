import {ContentChildren, Directive, ElementRef, Input, Optional, QueryList} from "@angular/core";
import {FormControlName, FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import scrollIntoView from "scroll-into-view";

@Directive({
    selector: "[ionx-form-helper], [ionxFormHelper]",
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

    public validateAll(markAs: "touched" | "dirty" = "touched") {

        if (!this.formGroupDirective) {
            return;
        }

        for (let controlName in this.formGroup.controls) {
            let control = this.formGroup.controls[controlName];

            if (markAs == "touched") {
                control.markAsTouched();
            }

            if (markAs == "dirty") {
                control.markAsDirty();
            }

            control.updateValueAndValidity();
        }

        for (let control of this.contentControls.toArray()) {
            if (!control.valid) {
                this.focusImpl(control);
                break;
            }
        }
    }

    private focusImpl(control: string | any, scroll: boolean = true) {

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

        if (control["el"] instanceof ElementRef) {
            element = control["el"].nativeElement;
        }

        if (control["_elementRef"] instanceof ElementRef) {
            element = control["_elementRef"].nativeElement;
        }

        // element to focus
        if (element) {

            if (element["setFocus"]) {
                element["setFocus"]();

            } else {

                let focusable = element;

                let realInput = (element.shadowRoot && element.shadowRoot.querySelector(".native-input")) || element.querySelector(".native-input");
                if (realInput) {
                    focusable = realInput as HTMLElement;
                }

                focusable.focus();
            }
        }

        if (scroll && element) {
            scrollIntoView(element.closest("ion-item") as HTMLElement || element);
        }
    }

    public focus(formControlName: string, scrollIntoView: boolean = true) {
        this.focusImpl(formControlName, scrollIntoView);
    }
}
