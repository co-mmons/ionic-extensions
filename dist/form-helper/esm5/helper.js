import * as tslib_1 from "tslib";
import { ContentChildren, Directive, ElementRef, Input, Optional, QueryList } from "@angular/core";
import { FormControlName, FormGroup, FormGroupDirective, NgForm } from "@angular/forms";
import { scrollIntoView } from "@co.mmons/ionic-extensions/scroll";
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
    FormHelper.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] }
    ]; };
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
    return FormHelper;
}());
export { FormHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXIvIiwic291cmNlcyI6WyJoZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFNakU7SUFFSSxvQkFBNEIsT0FBbUIsRUFBOEIsTUFBYyxFQUErQixrQkFBc0M7UUFBcEksWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUE4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQStCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFDaEssQ0FBQztJQUdELHNCQUFXLGdDQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsQ0FBQzthQUVELFVBQW9CLFFBQWlCO1lBQ2pDLElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDM0Q7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzFEO1FBQ0wsQ0FBQzs7O09BUkE7SUFVTSxtQ0FBYyxHQUFyQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFHRCxzQkFBVyw0QkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMs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QUMsQ0FBQzt1REFDUztJQXhDdEQsVUFBVTtRQUp0QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsc0NBQXNDO1lBQ2hELFFBQVEsRUFBRSxnQkFBZ0I7U0FDN0IsQ0FBQztRQUdvRCxtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFrQyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTtPQUYvRixVQUFVLENBdUl0QjtJQUFELGlCQUFDO0NBQUEsQUF2SUQsSUF1SUM7U0F2SVksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPcHRpb25hbCwgUXVlcnlMaXN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtGb3JtQ29udHJvbE5hbWUsIEZvcm1Hcm91cCwgRm9ybUdyb3VwRGlyZWN0aXZlLCBOZ0Zvcm19IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtzY3JvbGxJbnRvVmlld30gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3Njcm9sbFwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbaW9ueC1mb3JtLWhlbHBlcl0sIFtpb254Rm9ybUhlbHBlcl1cIixcbiAgICBleHBvcnRBczogXCJpb254Rm9ybUhlbHBlclwiXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1IZWxwZXIge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWYsIEBPcHRpb25hbCgpIHB1YmxpYyByZWFkb25seSBuZ0Zvcm06IE5nRm9ybSwgQE9wdGlvbmFsKCkgcHJpdmF0ZSByZWFkb25seSBmb3JtR3JvdXBEaXJlY3RpdmU6IEZvcm1Hcm91cERpcmVjdGl2ZSkge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZShcInJlYWRvbmx5XCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHJlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyZWFkb25seVwiLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcInJlYWRvbmx5XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1hcmtBc1JlYWRvbmx5KCkge1xuICAgICAgICB0aGlzLnJlYWRvbmx5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgYnVzeSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZShcImJ1c3lcIik7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBidXN5KGJ1c3k6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGJ1c3kpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcImJ1c3lcIiwgXCJcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJidXN5XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1hcmtBc0J1c3koKSB7XG4gICAgICAgIHRoaXMuYnVzeSA9IHRydWU7XG4gICAgfVxuXG4gICAgQENvbnRlbnRDaGlsZHJlbihGb3JtQ29udHJvbE5hbWUsIHtkZXNjZW5kYW50czogdHJ1ZX0pXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbnRlbnRDb250cm9sczogUXVlcnlMaXN0PEZvcm1Db250cm9sTmFtZT47XG5cbiAgICBwdWJsaWMgZm9ybUNvbnRyb2xOYW1lKG5hbWU6IHN0cmluZyk6IEZvcm1Db250cm9sTmFtZSB7XG5cbiAgICAgICAgZm9yIChsZXQgYSBvZiB0aGlzLmNvbnRlbnRDb250cm9scy50b0FycmF5KCkpIHtcbiAgICAgICAgICAgIGlmIChhLm5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBmb3JtR3JvdXAoKTogRm9ybUdyb3VwIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUdyb3VwRGlyZWN0aXZlID8gdGhpcy5mb3JtR3JvdXBEaXJlY3RpdmUuZm9ybSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGVBbGwobWFya0FzOiBcInRvdWNoZWRcIiB8IFwiZGlydHlcIiA9IFwidG91Y2hlZFwiKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmZvcm1Hcm91cERpcmVjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgY29udHJvbE5hbWUgaW4gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMpIHtcbiAgICAgICAgICAgIGxldCBjb250cm9sID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHNbY29udHJvbE5hbWVdO1xuXG4gICAgICAgICAgICBpZiAobWFya0FzID09IFwidG91Y2hlZFwiKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXJrQXMgPT0gXCJkaXJ0eVwiKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGNvbnRyb2wgb2YgdGhpcy5jb250ZW50Q29udHJvbHMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAoIWNvbnRyb2wudmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzSW1wbChjb250cm9sKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZm9jdXNJbXBsKGNvbnRyb2w6IHN0cmluZyB8IGFueSwgc2Nyb2xsOiBib29sZWFuID0gdHJ1ZSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udHJvbCA9PSBcInN0cmluZ1wiICYmIHRoaXMuZm9ybUdyb3VwRGlyZWN0aXZlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIHRoaXMuZm9ybUdyb3VwRGlyZWN0aXZlLmRpcmVjdGl2ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYy5uYW1lID09IGNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbCA9IGM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgICAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sTmFtZSkge1xuICAgICAgICAgICAgY29udHJvbCA9IGNvbnRyb2wudmFsdWVBY2Nlc3NvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250cm9sW1wiZWxcIl0gaW5zdGFuY2VvZiBFbGVtZW50UmVmKSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gY29udHJvbFtcImVsXCJdLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udHJvbFtcIl9lbGVtZW50UmVmXCJdIGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xuICAgICAgICAgICAgZWxlbWVudCA9IGNvbnRyb2xbXCJfZWxlbWVudFJlZlwiXS5uYXRpdmVFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWxlbWVudCB0byBmb2N1c1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudFtcInNldEZvY3VzXCJdKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudFtcInNldEZvY3VzXCJdKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNhYmxlID0gZWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGxldCByZWFsSW5wdXQgPSAoZWxlbWVudC5zaGFkb3dSb290ICYmIGVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLm5hdGl2ZS1pbnB1dFwiKSkgfHwgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdGl2ZS1pbnB1dFwiKTtcbiAgICAgICAgICAgICAgICBpZiAocmVhbElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZSA9IHJlYWxJbnB1dCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb2N1c2FibGUuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY3JvbGwgJiYgZWxlbWVudCkge1xuICAgICAgICAgICAgc2Nyb2xsSW50b1ZpZXcoZWxlbWVudC5jbG9zZXN0KFwiaW9uLWl0ZW1cIikgYXMgSFRNTEVsZW1lbnQgfHwgZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZm9jdXMoZm9ybUNvbnRyb2xOYW1lOiBzdHJpbmcsIHNjcm9sbEludG9WaWV3OiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmZvY3VzSW1wbChmb3JtQ29udHJvbE5hbWUsIHNjcm9sbEludG9WaWV3KTtcbiAgICB9XG59XG4iXX0=