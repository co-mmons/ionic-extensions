import { ContentChildren, Directive, ElementRef, Input, Optional } from "@angular/core";
import { FormControlName, FormGroupDirective, NgForm } from "@angular/forms";
import scrollIntoView from "scroll-into-view";
export class FormHelper {
    constructor(element, ngForm, formGroupDirective) {
        this.element = element;
        this.ngForm = ngForm;
        this.formGroupDirective = formGroupDirective;
    }
    get readonly() {
        return this.element.nativeElement.hasAttribute("readonly");
    }
    set readonly(readonly) {
        if (readonly) {
            this.element.nativeElement.setAttribute("readonly", "");
        }
        else {
            this.element.nativeElement.removeAttribute("readonly");
        }
    }
    markAsReadonly() {
        this.readonly = true;
    }
    get busy() {
        return this.element.nativeElement.hasAttribute("busy");
    }
    set busy(busy) {
        if (busy) {
            this.element.nativeElement.setAttribute("busy", "");
        }
        else {
            this.element.nativeElement.removeAttribute("busy");
        }
    }
    markAsBusy() {
        this.busy = true;
    }
    formControlName(name) {
        for (let a of this.contentControls.toArray()) {
            if (a.name == name) {
                return a;
            }
        }
    }
    get formGroup() {
        return this.formGroupDirective ? this.formGroupDirective.form : undefined;
    }
    validateAll(markAs = "touched") {
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
    focusImpl(control, scroll = true) {
        if (typeof control == "string" && this.formGroupDirective) {
            for (let c of this.formGroupDirective.directives) {
                if (c.name == control) {
                    control = c;
                    break;
                }
            }
        }
        let element;
        if (control instanceof FormControlName) {
            control = control.valueAccessor;
        }
        for (const elementProperty of ["el", "_elementRef", "element", "elementRef"]) {
            if (control[elementProperty] instanceof ElementRef) {
                element = control[elementProperty].nativeElement;
                break;
            }
            else if (control[elementProperty] instanceof HTMLElement) {
                element = control[elementProperty];
                break;
            }
        }
        // element to focus
        if (element) {
            if (element["setFocus"]) {
                element["setFocus"]();
            }
            else {
                let focusable = element;
                let realInput = (element.shadowRoot && element.shadowRoot.querySelector(".native-input")) || element.querySelector(".native-input");
                if (realInput) {
                    focusable = realInput;
                }
                focusable.focus();
            }
        }
        if (scroll && element) {
            scrollIntoView(element.closest("ion-item") || element);
        }
    }
    focus(formControlName, scrollIntoView = true) {
        this.focusImpl(formControlName, scrollIntoView);
    }
}
FormHelper.decorators = [
    { type: Directive, args: [{
                selector: "[ionx-form-helper], [ionxFormHelper]",
                exportAs: "ionxFormHelper"
            },] }
];
FormHelper.ctorParameters = () => [
    { type: ElementRef },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] }
];
FormHelper.propDecorators = {
    readonly: [{ type: Input }],
    busy: [{ type: Input }],
    contentControls: [{ type: ContentChildren, args: [FormControlName, { descendants: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Zvcm0taGVscGVyL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFhLGtCQUFrQixFQUFFLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBTTlDLE1BQU0sT0FBTyxVQUFVO0lBRW5CLFlBQTRCLE9BQW1CLEVBQThCLE1BQWMsRUFBK0Isa0JBQXNDO1FBQXBJLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBOEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUErQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQ2hLLENBQUM7SUFFRCxJQUNXLFFBQVE7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBVyxRQUFRLENBQUMsUUFBaUI7UUFDakMsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBRU0sY0FBYztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFDVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJ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Z0JBQ3JCLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2FBRXpCO2lCQUFNO2dCQUVILElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQztnQkFFeEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDcEksSUFBSSxTQUFTLEVBQUU7b0JBQ1gsU0FBUyxHQUFHLFNBQXdCLENBQUM7aUJBQ3hDO2dCQUVELFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNyQjtTQUNKO1FBRUQsSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ25CLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBZ0IsSUFBSSxPQUFPLENBQUMsQ0FBQztTQUN6RTtJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsZUFBdUIsRUFBRSxpQkFBMEIsSUFBSTtRQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7WUE1SUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRSxnQkFBZ0I7YUFDN0I7OztZQVBtQyxVQUFVO1lBQ1UsTUFBTSx1QkFTUixRQUFRO1lBVDFCLGtCQUFrQix1QkFTNEMsUUFBUTs7O3VCQUdyRyxLQUFLO21CQWlCTCxLQUFLOzhCQWlCTCxlQUFlLFNBQUMsZUFBZSxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPcHRpb25hbCwgUXVlcnlMaXN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtGb3JtQ29udHJvbE5hbWUsIEZvcm1Hcm91cCwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0Zvcm19IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHNjcm9sbEludG9WaWV3IGZyb20gXCJzY3JvbGwtaW50by12aWV3XCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltpb254LWZvcm0taGVscGVyXSwgW2lvbnhGb3JtSGVscGVyXVwiLFxuICAgIGV4cG9ydEFzOiBcImlvbnhGb3JtSGVscGVyXCJcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUhlbHBlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHVibGljIHJlYWRvbmx5IG5nRm9ybTogTmdGb3JtLCBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IGZvcm1Hcm91cERpcmVjdGl2ZTogRm9ybUdyb3VwRGlyZWN0aXZlKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKFwicmVhZG9ubHlcIik7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgICAgICBpZiAocmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsIFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwicmVhZG9ubHlcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbWFya0FzUmVhZG9ubHkoKSB7XG4gICAgICAgIHRoaXMucmVhZG9ubHkgPSB0cnVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBidXN5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKFwiYnVzeVwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGJ1c3koYnVzeTogYm9vbGVhbikge1xuICAgICAgICBpZiAoYnVzeSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYnVzeVwiLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImJ1c3lcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbWFya0FzQnVzeSgpIHtcbiAgICAgICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEZvcm1Db250cm9sTmFtZSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29udGVudENvbnRyb2xzOiBRdWVyeUxpc3Q8Rm9ybUNvbnRyb2xOYW1lPjtcblxuICAgIHB1YmxpYyBmb3JtQ29udHJvbE5hbWUobmFtZTogc3RyaW5nKTogRm9ybUNvbnRyb2xOYW1lIHtcblxuICAgICAgICBmb3IgKGxldCBhIG9mIHRoaXMuY29udGVudENvbnRyb2xzLnRvQXJyYXkoKSkge1xuICAgICAgICAgICAgaWYgKGEubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZvcm1Hcm91cCgpOiBGb3JtR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUgPyB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZS5mb3JtIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZUFsbChtYXJrQXM6IFwidG91Y2hlZFwiIHwgXCJkaXJ0eVwiID0gXCJ0b3VjaGVkXCIpIHtcblxuICAgICAgICBpZiAoIXRoaXMuZm9ybUdyb3VwRGlyZWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBjb250cm9sTmFtZSBpbiB0aGlzLmZvcm1Hcm91cC5jb250cm9scykge1xuICAgICAgICAgICAgbGV0IGNvbnRyb2wgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1tjb250cm9sTmFtZV07XG5cbiAgICAgICAgICAgIGlmIChtYXJrQXMgPT0gXCJ0b3VjaGVkXCIpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hcmtBcyA9PSBcImRpcnR5XCIpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgY29udHJvbCBvZiB0aGlzLmNvbnRlbnRDb250cm9scy50b0FycmF5KCkpIHtcbiAgICAgICAgICAgIGlmICghY29udHJvbC52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNJbXBsKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2N1c0ltcGwoY29udHJvbDogc3RyaW5nIHwgYW55LCBzY3JvbGw6IGJvb2xlYW4gPSB0cnVlKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250cm9sID09IFwic3RyaW5nXCIgJiYgdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUuZGlyZWN0aXZlcykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT0gY29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sID0gYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2xOYW1lKSB7XG4gICAgICAgICAgICBjb250cm9sID0gY29udHJvbC52YWx1ZUFjY2Vzc29yO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50UHJvcGVydHkgb2YgW1wiZWxcIiwgXCJfZWxlbWVudFJlZlwiLCBcImVsZW1lbnRcIiwgXCJlbGVtZW50UmVmXCJdKSB7XG4gICAgICAgICAgICBpZiAoY29udHJvbFtlbGVtZW50UHJvcGVydHldIGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjb250cm9sW2VsZW1lbnRQcm9wZXJ0eV0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbFtlbGVtZW50UHJvcGVydHldIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gY29udHJvbFtlbGVtZW50UHJvcGVydHldO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWxlbWVudCB0byBmb2N1c1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudFtcInNldEZvY3VzXCJdKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFtcInNldEZvY3VzXCJdKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNhYmxlID0gZWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGxldCByZWFsSW5wdXQgPSAoZWxlbWVudC5zaGFkb3dSb290ICYmIGVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLm5hdGl2ZS1pbnB1dFwiKSkgfHwgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdGl2ZS1pbnB1dFwiKTtcbiAgICAgICAgICAgICAgICBpZiAocmVhbElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZSA9IHJlYWxJbnB1dCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb2N1c2FibGUuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY3JvbGwgJiYgZWxlbWVudCkge1xuICAgICAgICAgICAgc2Nyb2xsSW50b1ZpZXcoZWxlbWVudC5jbG9zZXN0KFwiaW9uLWl0ZW1cIikgYXMgSFRNTEVsZW1lbnQgfHwgZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZm9jdXMoZm9ybUNvbnRyb2xOYW1lOiBzdHJpbmcsIHNjcm9sbEludG9WaWV3OiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmZvY3VzSW1wbChmb3JtQ29udHJvbE5hbWUsIHNjcm9sbEludG9WaWV3KTtcbiAgICB9XG59XG4iXX0=