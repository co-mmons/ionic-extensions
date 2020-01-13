import { __decorate, __param, __values } from "tslib";
import { ContentChildren, Directive, ElementRef, Input, Optional, QueryList } from "@angular/core";
import { FormControlName, FormGroup, FormGroupDirective, NgForm } from "@angular/forms";
import scrollIntoView from "scroll-into-view";
var FormHelper = /** @class */ (function () {
    function FormHelper(element, ngForm, formGroupDirective) {
        this.element = element;
        this.ngForm = ngForm;
        this.formGroupDirective = formGroupDirective;
    }
    Object.defineProperty(FormHelper.prototype, "readonly", {
        get: function () {
            return this.element.nativeElement.hasAttribute("readonly");
        },
        set: function (readonly) {
            if (readonly) {
                this.element.nativeElement.setAttribute("readonly", "");
            }
            else {
                this.element.nativeElement.removeAttribute("readonly");
            }
        },
        enumerable: true,
        configurable: true
    });
    FormHelper.prototype.markAsReadonly = function () {
        this.readonly = true;
    };
    Object.defineProperty(FormHelper.prototype, "busy", {
        get: function () {
            return this.element.nativeElement.hasAttribute("busy");
        },
        set: function (busy) {
            if (busy) {
                this.element.nativeElement.setAttribute("busy", "");
            }
            else {
                this.element.nativeElement.removeAttribute("busy");
            }
        },
        enumerable: true,
        configurable: true
    });
    FormHelper.prototype.markAsBusy = function () {
        this.busy = true;
    };
    FormHelper.prototype.formControlName = function (name) {
        var e_1, _a;
        try {
            for (var _b = __values(this.contentControls.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var a = _c.value;
                if (a.name == name) {
                    return a;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Object.defineProperty(FormHelper.prototype, "formGroup", {
        get: function () {
            return this.formGroupDirective ? this.formGroupDirective.form : undefined;
        },
        enumerable: true,
        configurable: true
    });
    FormHelper.prototype.validateAll = function (markAs) {
        var e_2, _a;
        if (markAs === void 0) { markAs = "touched"; }
        if (!this.formGroupDirective) {
            return;
        }
        for (var controlName in this.formGroup.controls) {
            var control = this.formGroup.controls[controlName];
            if (markAs == "touched") {
                control.markAsTouched();
            }
            if (markAs == "dirty") {
                control.markAsDirty();
            }
            control.updateValueAndValidity();
        }
        try {
            for (var _b = __values(this.contentControls.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var control = _c.value;
                if (!control.valid) {
                    this.focusImpl(control);
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    FormHelper.prototype.focusImpl = function (control, scroll) {
        var e_3, _a, e_4, _b;
        if (scroll === void 0) { scroll = true; }
        if (typeof control == "string" && this.formGroupDirective) {
            try {
                for (var _c = __values(this.formGroupDirective.directives), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var c = _d.value;
                    if (c.name == control) {
                        control = c;
                        break;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        var element;
        if (control instanceof FormControlName) {
            control = control.valueAccessor;
        }
        try {
            for (var _e = __values(["el", "_elementRef", "element", "elementRef"]), _f = _e.next(); !_f.done; _f = _e.next()) {
                var elementProperty = _f.value;
                if (control[elementProperty] instanceof ElementRef) {
                    element = control[elementProperty].nativeElement;
                    break;
                }
                else if (control[elementProperty] instanceof HTMLElement) {
                    element = control[elementProperty];
                    break;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_4) throw e_4.error; }
        }
        // element to focus
        if (element) {
            if (element["setFocus"]) {
                element["setFocus"]();
            }
            else {
                var focusable = element;
                var realInput = (element.shadowRoot && element.shadowRoot.querySelector(".native-input")) || element.querySelector(".native-input");
                if (realInput) {
                    focusable = realInput;
                }
                focusable.focus();
            }
        }
        if (scroll && element) {
            scrollIntoView(element.closest("ion-item") || element);
        }
    };
    FormHelper.prototype.focus = function (formControlName, scrollIntoView) {
        if (scrollIntoView === void 0) { scrollIntoView = true; }
        this.focusImpl(formControlName, scrollIntoView);
    };
    FormHelper.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        Input()
    ], FormHelper.prototype, "readonly", null);
    __decorate([
        Input()
    ], FormHelper.prototype, "busy", null);
    __decorate([
        ContentChildren(FormControlName, { descendants: true })
    ], FormHelper.prototype, "contentControls", void 0);
    FormHelper = __decorate([
        Directive({
            selector: "[ionx-form-helper], [ionxFormHelper]",
            exportAs: "ionxFormHelper"
        }),
        __param(1, Optional()), __param(2, Optional())
    ], FormHelper);
    return FormHelper;
}());
export { FormHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXIvIiwic291cmNlcyI6WyJoZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQU05QztJQUVJLG9CQUE0QixPQUFtQixFQUE4QixNQUFjLEVBQStCLGtCQUFzQztRQUFwSSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQThCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBK0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUNoSyxDQUFDO0lBR0Qsc0JBQVcsZ0NBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxDQUFDO2FBRUQsVUFBb0IsUUFBaUI7WUFDakMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUMzRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUQ7UUFDTCxDQUFDOzs7T0FSQTtJQVVNLG1DQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUdELHNCQUFXLDRCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMs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QUFvRixrQkFBa0IsdUJBQWxFLFFBQVE7O0lBSXRHO1FBREMsS0FBSyxFQUFFOzhDQUdQO0lBZUQ7UUFEQyxLQUFLLEVBQUU7MENBR1A7SUFlRDtRQURDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUM7dURBQ1M7SUF4Q3RELFVBQVU7UUFKdEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHNDQUFzQztZQUNoRCxRQUFRLEVBQUUsZ0JBQWdCO1NBQzdCLENBQUM7UUFHb0QsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFrQyxXQUFBLFFBQVEsRUFBRSxDQUFBO09BRi9GLFVBQVUsQ0F5SXRCO0lBQUQsaUJBQUM7Q0FBQSxBQXpJRCxJQXlJQztTQXpJWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9wdGlvbmFsLCBRdWVyeUxpc3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Zvcm1Db250cm9sTmFtZSwgRm9ybUdyb3VwLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nRm9ybX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgc2Nyb2xsSW50b1ZpZXcgZnJvbSBcInNjcm9sbC1pbnRvLXZpZXdcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW2lvbngtZm9ybS1oZWxwZXJdLCBbaW9ueEZvcm1IZWxwZXJdXCIsXG4gICAgZXhwb3J0QXM6IFwiaW9ueEZvcm1IZWxwZXJcIlxufSlcbmV4cG9ydCBjbGFzcyBGb3JtSGVscGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwdWJsaWMgcmVhZG9ubHkgbmdGb3JtOiBOZ0Zvcm0sIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgZm9ybUdyb3VwRGlyZWN0aXZlOiBGb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChyZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgXCJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtYXJrQXNSZWFkb25seSgpIHtcbiAgICAgICAgdGhpcy5yZWFkb25seSA9IHRydWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGJ1c3koKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJidXN5XCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYnVzeShidXN5OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChidXN5KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJidXN5XCIsIFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiYnVzeVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtYXJrQXNCdXN5KCkge1xuICAgICAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuICAgIH1cblxuICAgIEBDb250ZW50Q2hpbGRyZW4oRm9ybUNvbnRyb2xOYW1lLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb250ZW50Q29udHJvbHM6IFF1ZXJ5TGlzdDxGb3JtQ29udHJvbE5hbWU+O1xuXG4gICAgcHVibGljIGZvcm1Db250cm9sTmFtZShuYW1lOiBzdHJpbmcpOiBGb3JtQ29udHJvbE5hbWUge1xuXG4gICAgICAgIGZvciAobGV0IGEgb2YgdGhpcy5jb250ZW50Q29udHJvbHMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAoYS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZm9ybUdyb3VwKCk6IEZvcm1Hcm91cCB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZSA/IHRoaXMuZm9ybUdyb3VwRGlyZWN0aXZlLmZvcm0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlQWxsKG1hcmtBczogXCJ0b3VjaGVkXCIgfCBcImRpcnR5XCIgPSBcInRvdWNoZWRcIikge1xuXG4gICAgICAgIGlmICghdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGNvbnRyb2xOYW1lIGluIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzKSB7XG4gICAgICAgICAgICBsZXQgY29udHJvbCA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW2NvbnRyb2xOYW1lXTtcblxuICAgICAgICAgICAgaWYgKG1hcmtBcyA9PSBcInRvdWNoZWRcIikge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWFya0FzID09IFwiZGlydHlcIikge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBjb250cm9sIG9mIHRoaXMuY29udGVudENvbnRyb2xzLnRvQXJyYXkoKSkge1xuICAgICAgICAgICAgaWYgKCFjb250cm9sLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0ltcGwoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzSW1wbChjb250cm9sOiBzdHJpbmcgfCBhbnksIHNjcm9sbDogYm9vbGVhbiA9IHRydWUpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRyb2wgPT0gXCJzdHJpbmdcIiAmJiB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZS5kaXJlY3RpdmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PSBjb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBjO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBjb250cm9sLnZhbHVlQWNjZXNzb3I7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnRQcm9wZXJ0eSBvZiBbXCJlbFwiLCBcIl9lbGVtZW50UmVmXCIsIFwiZWxlbWVudFwiLCBcImVsZW1lbnRSZWZcIl0pIHtcbiAgICAgICAgICAgIGlmIChjb250cm9sW2VsZW1lbnRQcm9wZXJ0eV0gaW5zdGFuY2VvZiBFbGVtZW50UmVmKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGNvbnRyb2xbZWxlbWVudFByb3BlcnR5XS5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb250cm9sW2VsZW1lbnRQcm9wZXJ0eV0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBjb250cm9sW2VsZW1lbnRQcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbGVtZW50IHRvIGZvY3VzXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50W1wic2V0Rm9jdXNcIl0pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50W1wic2V0Rm9jdXNcIl0oKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGxldCBmb2N1c2FibGUgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgbGV0IHJlYWxJbnB1dCA9IChlbGVtZW50LnNoYWRvd1Jvb3QgJiYgZWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIubmF0aXZlLWlucHV0XCIpKSB8fCBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF0aXZlLWlucHV0XCIpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFsSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlID0gcmVhbElucHV0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvY3VzYWJsZS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjcm9sbCAmJiBlbGVtZW50KSB7XG4gICAgICAgICAgICBzY3JvbGxJbnRvVmlldyhlbGVtZW50LmNsb3Nlc3QoXCJpb24taXRlbVwiKSBhcyBIVE1MRWxlbWVudCB8fCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBmb2N1cyhmb3JtQ29udHJvbE5hbWU6IHN0cmluZywgc2Nyb2xsSW50b1ZpZXc6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZm9jdXNJbXBsKGZvcm1Db250cm9sTmFtZSwgc2Nyb2xsSW50b1ZpZXcpO1xuICAgIH1cbn1cbiJdfQ==