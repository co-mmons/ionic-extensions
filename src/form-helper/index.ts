import { NgModule, Directive, ContentChildren, QueryList } from "@angular/core";
import { FormControlName } from "@angular/forms";
import { TextInput, TextArea } from "ionic-angular";

@Directive({
    selector: "[ionx-form-helper]"
})
export class FormHelper {

    @ContentChildren(FormControlName, {descendants: true})
    public controls: QueryList<FormControlName>;

    public validateAll() {

        let firstNotValidAccessor;;
        
        for (let control of this.controls.toArray()) {
            
            control.control.markAsDirty();
            control.control.markAsTouched();
            control.control.updateValueAndValidity();

            if (!control.valid && !firstNotValidAccessor) {
                firstNotValidAccessor = control.valueAccessor;
            }
        }

        if (firstNotValidAccessor) {

            let elementToScroll: HTMLElement;

            if (firstNotValidAccessor instanceof TextInput || firstNotValidAccessor instanceof TextArea) {
                firstNotValidAccessor.setFocus();
                elementToScroll = firstNotValidAccessor.getNativeElement().closest(".item");
            }

            if (elementToScroll) {
                elementToScroll.scrollIntoView();
            }
        }
    }

}

@NgModule({
    declarations: [FormHelper],
    bootstrap: [],
    exports: [FormHelper]
})
export class FormHelperModule {

}
