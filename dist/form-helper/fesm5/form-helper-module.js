import { __decorate, __values, __param } from 'tslib';
import { CommonModule } from '@angular/common';
import { HostBinding, Input, Component, ElementRef, Optional, ContentChildren, Directive, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { FormControlName, NgForm, FormGroupDirective, FormsModule } from '@angular/forms';
import { MatchMediaModule } from '@co.mmons/angular-extensions/browser/match-media';
import { IntlModule } from '@co.mmons/angular-intl';
import { IonicModule } from '@ionic/angular';
import scrollIntoView from 'scroll-into-view';

var FormHeading = /** @class */ (function () {
    function FormHeading() {
    }
    __decorate([
        HostBinding("attr.sticky"),
        Input()
    ], FormHeading.prototype, "sticky", void 0);
    FormHeading = __decorate([
        Component({
            selector: "ionx-form-heading",
            template: "\n        <ng-content select=\"ion-item\"></ng-content>\n        <div ionx--under>\n            <ng-content></ng-content>\n        </div>\n    ",
            styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start:0px;--padding-end:0px;--inner-padding-end:16px;--inner-padding-start:16px}:host ::ng-deep ion-item>ion-label{font-weight:500}:host ::ng-deep ion-item>ion-label[size=large]{font-size:large}:host ::ng-deep ion-item>ion-label[size=small]{font-size:small}:host ::ng-deep ion-button{height:auto}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:-webkit-sticky;position:sticky;top:0;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start:8px;--padding-end:8px;--inner-padding-end:0px;--inner-padding-start:0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}"]
        })
    ], FormHeading);
    return FormHeading;
}());

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

var FormItem = /** @class */ (function () {
    function FormItem() {
    }
    FormItem = __decorate([
        Component({
            selector: "ionx-form-item",
            template: "<ng-content select=\"ion-item\"></ng-content><ng-content select=\"ionx-form-item-error\"></ng-content><ng-content select=\"ionx-form-item-hint\"></ng-content><ng-content></ng-content>",
            styles: [":host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host ::ng-deep ion-item{--padding-start:0px;--inner-padding-end:0px;--inner-padding-start:0px;--padding-end:0px;--inner-border-width:0px;--border-width:0px 0px 1px 0px}"]
        })
    ], FormItem);
    return FormItem;
}());

var FormItemError = /** @class */ (function () {
    function FormItemError(formGroup) {
        this.formGroup = formGroup;
        this.markedAs = "touched";
    }
    Object.defineProperty(FormItemError.prototype, "control", {
        get: function () {
            if (typeof this._control === "string") {
                return this.formGroup.form && this.formGroup.form.controls[this._control];
            }
            else {
                return this._control;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormItemError.prototype, "controlOrName", {
        set: function (control) {
            this._control = control;
        },
        enumerable: true,
        configurable: true
    });
    FormItemError.ctorParameters = function () { return [
        { type: FormGroupDirective }
    ]; };
    __decorate([
        Input()
    ], FormItemError.prototype, "icon", void 0);
    __decorate([
        Input()
    ], FormItemError.prototype, "markedAs", void 0);
    __decorate([
        Input("control")
    ], FormItemError.prototype, "controlOrName", null);
    FormItemError = __decorate([
        Component({
            selector: "ionx-form-item-error",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"!!icon\"></ion-icon>\n        <label>\n            <ng-template [ngIf]=\"control\">{{control | intlValidationErrorMessage}}</ng-template>\n            <ng-content></ng-content>\n        </label>\n    ",
            host: {
                "[class.ionx--visible]": "!control || !!(control.invalid && control[markedAs])"
            },
            styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:-webkit-box;display:flex}"]
        })
    ], FormItemError);
    return FormItemError;
}());

var FormItemHint = /** @class */ (function () {
    function FormItemHint() {
    }
    Object.defineProperty(FormItemHint.prototype, "label", {
        set: function (label) {
            this.labelComponentContainer.clear();
            this.labelComponentContainer.insert(label.hostView);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], FormItemHint.prototype, "icon", void 0);
    __decorate([
        ViewChild("labelComponentContainer", { read: ViewContainerRef, static: true })
    ], FormItemHint.prototype, "labelComponentContainer", void 0);
    __decorate([
        Input()
    ], FormItemHint.prototype, "label", null);
    FormItemHint = __decorate([
        Component({
            selector: "ionx-form-item-hint",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"icon\"></ion-icon>\n        <label>\n            <template #labelComponentContainer></template>\n            <ng-content></ng-content>\n        </label>\n    ",
            styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-medium)}"]
        })
    ], FormItemHint);
    return FormItemHint;
}());

var FormHelperModule = /** @class */ (function () {
    function FormHelperModule() {
    }
    FormHelperModule = __decorate([
        NgModule({
            declarations: [FormItem, FormHeading, FormItemError, FormItemHint, FormHelper],
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, MatchMediaModule],
            exports: [FormItem, FormItemError, FormItemHint, FormHeading, FormHelper]
        })
    ], FormHelperModule);
    return FormHelperModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { FormHeading, FormHelper, FormHelperModule, FormItem, FormItemError, FormItemHint };
//# sourceMappingURL=form-helper-module.js.map
