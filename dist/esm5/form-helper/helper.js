import * as tslib_1 from "tslib";
import { ContentChildren, Directive, ElementRef, Input, Optional, QueryList } from "@angular/core";
import { FormControlName, FormGroupDirective, NgForm } from "@angular/forms";
import { scrollIntoView } from "../scroll/scroll-into-view";
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
            for (var _b = tslib_1.__values(this.contentControls.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = tslib_1.__values(this.contentControls.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                for (var _b = tslib_1.__values(this.formGroupDirective.directives), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    return FormHelper;
}());
export { FormHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJmb3JtLWhlbHBlci9oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFhLGtCQUFrQixFQUFFLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQU0xRDtJQUVJLG9CQUE0QixPQUFtQixFQUE4QixNQUFjLEVBQStCLGtCQUFzQztRQUFwSSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQThCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBK0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtJQUNoSyxDQUFDO0lBR0Qsc0JBQVcsZ0NBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxDQUFDO2FBRUQsVUFBb0IsUUFBaUI7WUFDakMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUMzRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUQ7UUFDTCxDQUFDOzs7T0FSQTtJQVVNLG1DQUFjLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUdELHNCQUFXLDRCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMs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Q0FBc0M7WUFDaEQsUUFBUSxFQUFFLGdCQUFnQjtTQUM3QixDQUFDO1FBR29ELG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQWtDLG1CQUFBLFFBQVEsRUFBRSxDQUFBO2lEQUFuRSxVQUFVLEVBQXNDLE1BQU0sRUFBbUQsa0JBQWtCO09BRnZKLFVBQVUsQ0F1SXRCO0lBQUQsaUJBQUM7Q0FBQSxBQXZJRCxJQXVJQztTQXZJWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9wdGlvbmFsLCBRdWVyeUxpc3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Zvcm1Db250cm9sTmFtZSwgRm9ybUdyb3VwLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nRm9ybX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge3Njcm9sbEludG9WaWV3fSBmcm9tIFwiLi4vc2Nyb2xsL3Njcm9sbC1pbnRvLXZpZXdcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW2lvbngtZm9ybS1oZWxwZXJdLCBbaW9ueEZvcm1IZWxwZXJdXCIsXG4gICAgZXhwb3J0QXM6IFwiaW9ueEZvcm1IZWxwZXJcIlxufSlcbmV4cG9ydCBjbGFzcyBGb3JtSGVscGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwdWJsaWMgcmVhZG9ubHkgbmdGb3JtOiBOZ0Zvcm0sIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgZm9ybUdyb3VwRGlyZWN0aXZlOiBGb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChyZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgXCJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtYXJrQXNSZWFkb25seSgpIHtcbiAgICAgICAgdGhpcy5yZWFkb25seSA9IHRydWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGJ1c3koKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJidXN5XCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYnVzeShidXN5OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChidXN5KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJidXN5XCIsIFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiYnVzeVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBtYXJrQXNCdXN5KCkge1xuICAgICAgICB0aGlzLmJ1c3kgPSB0cnVlO1xuICAgIH1cblxuICAgIEBDb250ZW50Q2hpbGRyZW4oRm9ybUNvbnRyb2xOYW1lLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb250ZW50Q29udHJvbHM6IFF1ZXJ5TGlzdDxGb3JtQ29udHJvbE5hbWU+O1xuXG4gICAgcHVibGljIGZvcm1Db250cm9sTmFtZShuYW1lOiBzdHJpbmcpOiBGb3JtQ29udHJvbE5hbWUge1xuXG4gICAgICAgIGZvciAobGV0IGEgb2YgdGhpcy5jb250ZW50Q29udHJvbHMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAoYS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZm9ybUdyb3VwKCk6IEZvcm1Hcm91cCB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZSA/IHRoaXMuZm9ybUdyb3VwRGlyZWN0aXZlLmZvcm0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlQWxsKG1hcmtBczogXCJ0b3VjaGVkXCIgfCBcImRpcnR5XCIgPSBcInRvdWNoZWRcIikge1xuXG4gICAgICAgIGlmICghdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGNvbnRyb2xOYW1lIGluIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzKSB7XG4gICAgICAgICAgICBsZXQgY29udHJvbCA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW2NvbnRyb2xOYW1lXTtcblxuICAgICAgICAgICAgaWYgKG1hcmtBcyA9PSBcInRvdWNoZWRcIikge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWFya0FzID09IFwiZGlydHlcIikge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBjb250cm9sIG9mIHRoaXMuY29udGVudENvbnRyb2xzLnRvQXJyYXkoKSkge1xuICAgICAgICAgICAgaWYgKCFjb250cm9sLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0ltcGwoY29udHJvbCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzSW1wbChjb250cm9sOiBzdHJpbmcgfCBhbnksIHNjcm9sbDogYm9vbGVhbiA9IHRydWUpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnRyb2wgPT0gXCJzdHJpbmdcIiAmJiB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiB0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZS5kaXJlY3RpdmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMubmFtZSA9PSBjb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBjO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBjb250cm9sLnZhbHVlQWNjZXNzb3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udHJvbFtcImVsXCJdIGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xuICAgICAgICAgICAgZWxlbWVudCA9IGNvbnRyb2xbXCJlbFwiXS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRyb2xbXCJfZWxlbWVudFJlZlwiXSBpbnN0YW5jZW9mIEVsZW1lbnRSZWYpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjb250cm9sW1wiX2VsZW1lbnRSZWZcIl0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVsZW1lbnQgdG8gZm9jdXNcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJzZXRGb2N1c1wiXSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRbXCJzZXRGb2N1c1wiXSgpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzYWJsZSA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVhbElucHV0ID0gKGVsZW1lbnQuc2hhZG93Um9vdCAmJiBlbGVtZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5uYXRpdmUtaW5wdXRcIikpIHx8IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXRpdmUtaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWxJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGUgPSByZWFsSW5wdXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9jdXNhYmxlLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2Nyb2xsICYmIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNjcm9sbEludG9WaWV3KGVsZW1lbnQuY2xvc2VzdChcImlvbi1pdGVtXCIpIGFzIEhUTUxFbGVtZW50IHx8IGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGZvY3VzKGZvcm1Db250cm9sTmFtZTogc3RyaW5nLCBzY3JvbGxJbnRvVmlldzogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5mb2N1c0ltcGwoZm9ybUNvbnRyb2xOYW1lLCBzY3JvbGxJbnRvVmlldyk7XG4gICAgfVxufVxuIl19