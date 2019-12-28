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
        var e_3, _a;
        if (scroll === void 0) { scroll = true; }
        if (typeof control == "string" && this.formGroupDirective) {
            try {
                for (var _b = __values(this.formGroupDirective.directives), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c = _c.value;
                    if (c.name == control) {
                        control = c;
                        break;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        var element;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXIvIiwic291cmNlcyI6WyJoZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQU05QztJQUVJLG9CQUE0QixPQUFtQixFQUE4QixNQUFjLEVBQStCLGtCQUFzQztRQUFwSSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQThCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBK0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUNoSyxDQUFDO0lBR0Qsc0JBQVcsZ0NBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxDQUFDO2FBRUQsVUFBb0IsUUFBaUI7WUFDakMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUMzRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUQ7UUFDTCxDQUFDOzs7T0FSQTtJQVVNLG1DQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUdELHNCQUFXLDRCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMs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O0lBeEN0RCxVQUFVO1FBSnRCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQ0FBc0M7WUFDaEQsUUFBUSxFQUFFLGdCQUFnQjtTQUM3QixDQUFDO1FBR29ELFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBa0MsV0FBQSxRQUFRLEVBQUUsQ0FBQTtPQUYvRixVQUFVLENBdUl0QjtJQUFELGlCQUFDO0NBQUEsQUF2SUQsSUF1SUM7U0F2SVksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPcHRpb25hbCwgUXVlcnlMaXN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtGb3JtQ29udHJvbE5hbWUsIEZvcm1Hcm91cCwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0Zvcm19IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHNjcm9sbEludG9WaWV3IGZyb20gXCJzY3JvbGwtaW50by12aWV3XCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltpb254LWZvcm0taGVscGVyXSwgW2lvbnhGb3JtSGVscGVyXVwiLFxuICAgIGV4cG9ydEFzOiBcImlvbnhGb3JtSGVscGVyXCJcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUhlbHBlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHVibGljIHJlYWRvbmx5IG5nRm9ybTogTmdGb3JtLCBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IGZvcm1Hcm91cERpcmVjdGl2ZTogRm9ybUdyb3VwRGlyZWN0aXZlKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKFwicmVhZG9ubHlcIik7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgICAgICBpZiAocmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsIFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwicmVhZG9ubHlcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbWFya0FzUmVhZG9ubHkoKSB7XG4gICAgICAgIHRoaXMucmVhZG9ubHkgPSB0cnVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBidXN5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKFwiYnVzeVwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGJ1c3koYnVzeTogYm9vbGVhbikge1xuICAgICAgICBpZiAoYnVzeSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYnVzeVwiLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImJ1c3lcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbWFya0FzQnVzeSgpIHtcbiAgICAgICAgdGhpcy5idXN5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEZvcm1Db250cm9sTmFtZSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29udGVudENvbnRyb2xzOiBRdWVyeUxpc3Q8Rm9ybUNvbnRyb2xOYW1lPjtcblxuICAgIHB1YmxpYyBmb3JtQ29udHJvbE5hbWUobmFtZTogc3RyaW5nKTogRm9ybUNvbnRyb2xOYW1lIHtcblxuICAgICAgICBmb3IgKGxldCBhIG9mIHRoaXMuY29udGVudENvbnRyb2xzLnRvQXJyYXkoKSkge1xuICAgICAgICAgICAgaWYgKGEubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZvcm1Hcm91cCgpOiBGb3JtR3JvdXAge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUgPyB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZS5mb3JtIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZUFsbChtYXJrQXM6IFwidG91Y2hlZFwiIHwgXCJkaXJ0eVwiID0gXCJ0b3VjaGVkXCIpIHtcblxuICAgICAgICBpZiAoIXRoaXMuZm9ybUdyb3VwRGlyZWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBjb250cm9sTmFtZSBpbiB0aGlzLmZvcm1Hcm91cC5jb250cm9scykge1xuICAgICAgICAgICAgbGV0IGNvbnRyb2wgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9sc1tjb250cm9sTmFtZV07XG5cbiAgICAgICAgICAgIGlmIChtYXJrQXMgPT0gXCJ0b3VjaGVkXCIpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hcmtBcyA9PSBcImRpcnR5XCIpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgY29udHJvbCBvZiB0aGlzLmNvbnRlbnRDb250cm9scy50b0FycmF5KCkpIHtcbiAgICAgICAgICAgIGlmICghY29udHJvbC52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNJbXBsKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2N1c0ltcGwoY29udHJvbDogc3RyaW5nIHwgYW55LCBzY3JvbGw6IGJvb2xlYW4gPSB0cnVlKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb250cm9sID09IFwic3RyaW5nXCIgJiYgdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUuZGlyZWN0aXZlcykge1xuICAgICAgICAgICAgICAgIGlmIChjLm5hbWUgPT0gY29udHJvbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sID0gYztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2xOYW1lKSB7XG4gICAgICAgICAgICBjb250cm9sID0gY29udHJvbC52YWx1ZUFjY2Vzc29yO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRyb2xbXCJlbFwiXSBpbnN0YW5jZW9mIEVsZW1lbnRSZWYpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjb250cm9sW1wiZWxcIl0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250cm9sW1wiX2VsZW1lbnRSZWZcIl0gaW5zdGFuY2VvZiBFbGVtZW50UmVmKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gY29udHJvbFtcIl9lbGVtZW50UmVmXCJdLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbGVtZW50IHRvIGZvY3VzXG4gICAgICAgIGlmIChlbGVtZW50KSB7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50W1wic2V0Rm9jdXNcIl0pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50W1wic2V0Rm9jdXNcIl0oKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGxldCBmb2N1c2FibGUgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgbGV0IHJlYWxJbnB1dCA9IChlbGVtZW50LnNoYWRvd1Jvb3QgJiYgZWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIubmF0aXZlLWlucHV0XCIpKSB8fCBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF0aXZlLWlucHV0XCIpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFsSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlID0gcmVhbElucHV0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvY3VzYWJsZS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjcm9sbCAmJiBlbGVtZW50KSB7XG4gICAgICAgICAgICBzY3JvbGxJbnRvVmlldyhlbGVtZW50LmNsb3Nlc3QoXCJpb24taXRlbVwiKSBhcyBIVE1MRWxlbWVudCB8fCBlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBmb2N1cyhmb3JtQ29udHJvbE5hbWU6IHN0cmluZywgc2Nyb2xsSW50b1ZpZXc6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZm9jdXNJbXBsKGZvcm1Db250cm9sTmFtZSwgc2Nyb2xsSW50b1ZpZXcpO1xuICAgIH1cbn1cbiJdfQ==