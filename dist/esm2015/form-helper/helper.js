import * as tslib_1 from "tslib";
import { ContentChildren, Directive, ElementRef, Input, Optional, QueryList } from "@angular/core";
import { FormControlName, FormGroupDirective, NgForm } from "@angular/forms";
import { scrollIntoView } from "../scroll/scroll-into-view";
let FormHelper = class FormHelper {
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
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], FormHelper.prototype, "readonly", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], FormHelper.prototype, "busy", null);
tslib_1.__decorate([
    ContentChildren(FormControlName, { descendants: true }),
    tslib_1.__metadata("design:type", QueryList)
], FormHelper.prototype, "contentControls", void 0);
FormHelper = tslib_1.__decorate([
    Directive({
        selector: "[ionx-form-helper], [ionxFormHelper]",
        exportAs: "ionxFormHelper"
    }),
    tslib_1.__param(1, Optional()), tslib_1.__param(2, Optional()),
    tslib_1.__metadata("design:paramtypes", [ElementRef, NgForm, FormGroupDirective])
], FormHelper);
export { FormHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJmb3JtLWhlbHBlci9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFhLGtCQUFrQixFQUFFLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQU0xRCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBRW5CLFlBQTRCLE9BQW1CLEVBQThCLE1BQWMsRUFBK0Isa0JBQXNDO1FBQXBJLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBOEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUErQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQ2hLLENBQUM7SUFHRCxJQUFXLFFBQVE7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBVyxRQUFRLENBQUMsUUFBaUI7UUFDakMsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBRU0sY0FBYztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBR0QsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxD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QUFNO2dCQUVILElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQztnQkFFeEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDcEksSUFBSSxTQUFTLEVBQUU7b0JBQ1gsU0FBUyxHQUFHLFNBQXdCLENBQUM7aUJBQ3hDO2dCQUVELFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNyQjtTQUNKO1FBRUQsSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQ25CLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBZ0IsSUFBSSxPQUFPLENBQUMsQ0FBQztTQUN6RTtJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsZUFBdUIsRUFBRSxpQkFBMEIsSUFBSTtRQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0osQ0FBQTtBQWpJRztJQURDLEtBQUssRUFBRTs7OzBDQUdQO0FBZUQ7SUFEQyxLQUFLLEVBQUU7OztzQ0FHUDtBQWVEO0lBREMsZUFBZSxDQUFDLGVBQWUsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQztzQ0FDbEIsU0FBUzttREFBa0I7QUF4Q3RELFVBQVU7SUFKdEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHNDQUFzQztRQUNoRCxRQUFRLEVBQUUsZ0JBQWdCO0tBQzdCLENBQUM7SUFHb0QsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBa0MsbUJBQUEsUUFBUSxFQUFFLENBQUE7NkNBQW5FLFVBQVUsRUFBc0MsTUFBTSxFQUFtRCxrQkFBa0I7R0FGdkosVUFBVSxDQXVJdEI7U0F2SVksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPcHRpb25hbCwgUXVlcnlMaXN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtGb3JtQ29udHJvbE5hbWUsIEZvcm1Hcm91cCwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0Zvcm19IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtzY3JvbGxJbnRvVmlld30gZnJvbSBcIi4uL3Njcm9sbC9zY3JvbGwtaW50by12aWV3XCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltpb254LWZvcm0taGVscGVyXSwgW2lvbnhGb3JtSGVscGVyXVwiLFxuICAgIGV4cG9ydEFzOiBcImlvbnhGb3JtSGVscGVyXCJcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUhlbHBlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHVibGljIHJlYWRvbmx5IG5nRm9ybTogTmdGb3JtLCBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IGZvcm1Hcm91cERpcmVjdGl2ZTogRm9ybUdyb3VwRGlyZWN0aXZlKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKFwicmVhZG9ubHlcIik7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgICAgICBpZiAocmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsIFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwicmVhZG9ubHlcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbWFya0FzUmVhZG9ubHkoKSB7XG4gICAgICAgIHRoaXMucmVhZG9ubHkgPSB0cnVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBidXN5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKFwiYnVzeVwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGJ1c3koYnVzeTogYm9vbGVhbikge1xuICAgICAgICBpZiAoYnVzeSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYnVzeVwiLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImJ1c3lcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbWFya0FzQnVzeSgpIHtcbiAgICAgICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEZvcm1Db250cm9sTmFtZSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29udGVudENvbnRyb2xzOiBRdWVyeUxpc3Q8Rm9ybUNvbnRyb2xOYW1lPjtcblxuICAgIHB1YmxpYyBmb3JtQ29udHJvbE5hbWUobmFtZTogc3RyaW5nKTogRm9ybUNvbnRyb2xOYW1lIHtcblxuICAgICAgICBmb3IgKGxldCBhIG9mIHRoaXMuY29udGVudENvbnRyb2xzLnRvQXJyYXkoKSkge1xuICAgICAgICAgICAgaWYgKGEubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZvcm1Hcm91cCgpOiBGb3JtR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUgPyB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZS5mb3JtIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZUFsbChtYXJrQXM6IFwidG91Y2hlZFwiIHwgXCJkaXJ0eVwiID0gXCJ0b3VjaGVkXCIpIHtcblxuICAgICAgICBpZiAoIXRoaXMuZm9ybUdyb3VwRGlyZWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBjb250cm9sTmFtZSBpbiB0aGlzLmZvcm1Hcm91cC5jb250cm9scykge1xuICAgICAgICAgICAgbGV0IGNvbnRyb2wgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1tjb250cm9sTmFtZV07XG5cbiAgICAgICAgICAgIGlmIChtYXJrQXMgPT0gXCJ0b3VjaGVkXCIpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hcmtBcyA9PSBcImRpcnR5XCIpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgY29udHJvbCBvZiB0aGlzLmNvbnRlbnRDb250cm9scy50b0FycmF5KCkpIHtcbiAgICAgICAgICAgIGlmICghY29udHJvbC52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNJbXBsKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2N1c0ltcGwoY29udHJvbDogc3RyaW5nIHwgYW55LCBzY3JvbGw6IGJvb2xlYW4gPSB0cnVlKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250cm9sID09IFwic3RyaW5nXCIgJiYgdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUuZGlyZWN0aXZlcykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT0gY29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sID0gYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2xOYW1lKSB7XG4gICAgICAgICAgICBjb250cm9sID0gY29udHJvbC52YWx1ZUFjY2Vzc29yO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRyb2xbXCJlbFwiXSBpbnN0YW5jZW9mIEVsZW1lbnRSZWYpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjb250cm9sW1wiZWxcIl0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250cm9sW1wiX2VsZW1lbnRSZWZcIl0gaW5zdGFuY2VvZiBFbGVtZW50UmVmKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gY29udHJvbFtcIl9lbGVtZW50UmVmXCJdLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbGVtZW50IHRvIGZvY3VzXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50W1wic2V0Rm9jdXNcIl0pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50W1wic2V0Rm9jdXNcIl0oKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGxldCBmb2N1c2FibGUgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgbGV0IHJlYWxJbnB1dCA9IChlbGVtZW50LnNoYWRvd1Jvb3QgJiYgZWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIubmF0aXZlLWlucHV0XCIpKSB8fCBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF0aXZlLWlucHV0XCIpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFsSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlID0gcmVhbElucHV0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvY3VzYWJsZS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjcm9sbCAmJiBlbGVtZW50KSB7XG4gICAgICAgICAgICBzY3JvbGxJbnRvVmlldyhlbGVtZW50LmNsb3Nlc3QoXCJpb24taXRlbVwiKSBhcyBIVE1MRWxlbWVudCB8fCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBmb2N1cyhmb3JtQ29udHJvbE5hbWU6IHN0cmluZywgc2Nyb2xsSW50b1ZpZXc6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZm9jdXNJbXBsKGZvcm1Db250cm9sTmFtZSwgc2Nyb2xsSW50b1ZpZXcpO1xuICAgIH1cbn1cbiJdfQ==