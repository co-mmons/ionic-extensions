import * as tslib_1 from "tslib";
import { ContentChildren, Directive, ElementRef, Input, Optional, QueryList } from "@angular/core";
import { FormControlName, FormGroup, FormGroupDirective, NgForm } from "@angular/forms";
import { scrollIntoView } from "@co.mmons/ionic-extensions/scroll";
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
FormHelper.ctorParameters = () => [
    { type: ElementRef },
    { type: NgForm, decorators: [{ type: Optional }] },
    { type: FormGroupDirective, decorators: [{ type: Optional }] }
];
tslib_1.__decorate([
    Input()
], FormHelper.prototype, "readonly", null);
tslib_1.__decorate([
    Input()
], FormHelper.prototype, "busy", null);
tslib_1.__decorate([
    ContentChildren(FormControlName, { descendants: true })
], FormHelper.prototype, "contentControls", void 0);
FormHelper = tslib_1.__decorate([
    Directive({
        selector: "[ionx-form-helper], [ionxFormHelper]",
        exportAs: "ionxFormHelper"
    }),
    tslib_1.__param(1, Optional()), tslib_1.__param(2, Optional())
], FormHelper);
export { FormHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXIvIiwic291cmNlcyI6WyJoZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFNakUsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQUVuQixZQUE0QixPQUFtQixFQUE4QixNQUFjLEVBQStCLGtCQUFzQztRQUFwSSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQThCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBK0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUNoSyxDQUFDO0lBR0QsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELElBQVcsUUFBUSxDQUFDLFFBQWlCO1FBQ2pDLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMzRDthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQztJQUVNLGNBQWM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUdELElBQVcsSUFBSTtRQUNYLE9BQU8sSUFBSSxD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LCBFbGVtZW50UmVmLCBJbnB1dCwgT3B0aW9uYWwsIFF1ZXJ5TGlzdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybUNvbnRyb2xOYW1lLCBGb3JtR3JvdXAsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdGb3JtfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7c2Nyb2xsSW50b1ZpZXd9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9zY3JvbGxcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW2lvbngtZm9ybS1oZWxwZXJdLCBbaW9ueEZvcm1IZWxwZXJdXCIsXG4gICAgZXhwb3J0QXM6IFwiaW9ueEZvcm1IZWxwZXJcIlxufSlcbmV4cG9ydCBjbGFzcyBGb3JtSGVscGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwdWJsaWMgcmVhZG9ubHkgbmdGb3JtOiBOZ0Zvcm0sIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgZm9ybUdyb3VwRGlyZWN0aXZlOiBGb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChyZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgXCJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtYXJrQXNSZWFkb25seSgpIHtcbiAgICAgICAgdGhpcy5yZWFkb25seSA9IHRydWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGJ1c3koKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJidXN5XCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYnVzeShidXN5OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChidXN5KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJidXN5XCIsIFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiYnVzeVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtYXJrQXNCdXN5KCkge1xuICAgICAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuICAgIH1cblxuICAgIEBDb250ZW50Q2hpbGRyZW4oRm9ybUNvbnRyb2xOYW1lLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb250ZW50Q29udHJvbHM6IFF1ZXJ5TGlzdDxGb3JtQ29udHJvbE5hbWU+O1xuXG4gICAgcHVibGljIGZvcm1Db250cm9sTmFtZShuYW1lOiBzdHJpbmcpOiBGb3JtQ29udHJvbE5hbWUge1xuXG4gICAgICAgIGZvciAobGV0IGEgb2YgdGhpcy5jb250ZW50Q29udHJvbHMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAoYS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZm9ybUdyb3VwKCk6IEZvcm1Hcm91cCB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZSA/IHRoaXMuZm9ybUdyb3VwRGlyZWN0aXZlLmZvcm0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlQWxsKG1hcmtBczogXCJ0b3VjaGVkXCIgfCBcImRpcnR5XCIgPSBcInRvdWNoZWRcIikge1xuXG4gICAgICAgIGlmICghdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGNvbnRyb2xOYW1lIGluIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzKSB7XG4gICAgICAgICAgICBsZXQgY29udHJvbCA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW2NvbnRyb2xOYW1lXTtcblxuICAgICAgICAgICAgaWYgKG1hcmtBcyA9PSBcInRvdWNoZWRcIikge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWFya0FzID09IFwiZGlydHlcIikge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBjb250cm9sIG9mIHRoaXMuY29udGVudENvbnRyb2xzLnRvQXJyYXkoKSkge1xuICAgICAgICAgICAgaWYgKCFjb250cm9sLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0ltcGwoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzSW1wbChjb250cm9sOiBzdHJpbmcgfCBhbnksIHNjcm9sbDogYm9vbGVhbiA9IHRydWUpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRyb2wgPT0gXCJzdHJpbmdcIiAmJiB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZS5kaXJlY3RpdmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PSBjb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBjO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBjb250cm9sLnZhbHVlQWNjZXNzb3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udHJvbFtcImVsXCJdIGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xuICAgICAgICAgICAgZWxlbWVudCA9IGNvbnRyb2xbXCJlbFwiXS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRyb2xbXCJfZWxlbWVudFJlZlwiXSBpbnN0YW5jZW9mIEVsZW1lbnRSZWYpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjb250cm9sW1wiX2VsZW1lbnRSZWZcIl0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVsZW1lbnQgdG8gZm9jdXNcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJzZXRGb2N1c1wiXSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRbXCJzZXRGb2N1c1wiXSgpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzYWJsZSA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVhbElucHV0ID0gKGVsZW1lbnQuc2hhZG93Um9vdCAmJiBlbGVtZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5uYXRpdmUtaW5wdXRcIikpIHx8IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXRpdmUtaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWxJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGUgPSByZWFsSW5wdXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Nyb2xsICYmIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNjcm9sbEludG9WaWV3KGVsZW1lbnQuY2xvc2VzdChcImlvbi1pdGVtXCIpIGFzIEhUTUxFbGVtZW50IHx8IGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGZvY3VzKGZvcm1Db250cm9sTmFtZTogc3RyaW5nLCBzY3JvbGxJbnRvVmlldzogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5mb2N1c0ltcGwoZm9ybUNvbnRyb2xOYW1lLCBzY3JvbGxJbnRvVmlldyk7XG4gICAgfVxufVxuIl19