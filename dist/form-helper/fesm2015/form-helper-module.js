import { __decorate, __param } from 'tslib';
import { CommonModule } from '@angular/common';
import { HostBinding, Input, Component, ElementRef, Optional, ContentChildren, Directive, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { FormControlName, NgForm, FormGroupDirective, FormsModule } from '@angular/forms';
import { MatchMediaModule } from '@co.mmons/angular-extensions/browser/match-media';
import { IntlModule } from '@co.mmons/angular-intl';
import { IonicModule } from '@ionic/angular';
import scrollIntoView from 'scroll-into-view';

let FormHeading = class FormHeading {
    constructor() {
    }
};
__decorate([
    HostBinding("attr.sticky"),
    Input()
], FormHeading.prototype, "sticky", void 0);
FormHeading = __decorate([
    Component({
        selector: "ionx-form-heading",
        template: `
        <ng-content select="ion-item"></ng-content>
        <div ionx--under>
            <ng-content></ng-content>
        </div>
    `,
        styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start:0px;--padding-end:0px;--inner-padding-end:16px;--inner-padding-start:16px}:host ::ng-deep ion-item>ion-label{font-size:.9rem;font-weight:500}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:-webkit-sticky;position:sticky;top:0;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start:8px;--padding-end:8px;--inner-padding-end:0px;--inner-padding-start:0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}:host-context(.ios) ::ng-deep ion-item.item-label>ion-label{font-size:.8rem;letter-spacing:1px;text-transform:uppercase}"]
    })
], FormHeading);

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

let FormItem = class FormItem {
};
FormItem = __decorate([
    Component({
        selector: "ionx-form-item",
        template: `<ng-content select="ion-item"></ng-content><ng-content select="ionx-form-item-error"></ng-content><ng-content select="ionx-form-item-hint"></ng-content><ng-content></ng-content>`,
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host ::ng-deep ion-item{--padding-start:0px;--inner-padding-end:0px;--inner-padding-start:0px;--padding-end:0px;--inner-border-width:0px;--border-width:0px 0px 1px 0px}"]
    })
], FormItem);

let FormItemError = class FormItemError {
    constructor(formGroup) {
        this.formGroup = formGroup;
        this.markedAs = "touched";
    }
    get control() {
        if (typeof this._control === "string") {
            return this.formGroup.form && this.formGroup.form.controls[this._control];
        }
        else {
            return this._control;
        }
    }
    set controlOrName(control) {
        this._control = control;
    }
};
FormItemError.ctorParameters = () => [
    { type: FormGroupDirective }
];
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
        template: `
        <ion-icon [name]="icon" *ngIf="!!icon"></ion-icon>
        <label>
            <ng-template [ngIf]="control">{{control | intlValidationErrorMessage}}</ng-template>
            <ng-content></ng-content>
        </label>
    `,
        host: {
            "[class.ionx--visible]": "!control || !!(control.invalid && control[markedAs])"
        },
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:-webkit-box;display:flex}"]
    })
], FormItemError);

let FormItemHint = class FormItemHint {
    constructor() {
    }
    set label(label) {
        this.labelComponentContainer.clear();
        this.labelComponentContainer.insert(label.hostView);
    }
};
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
        template: `
        <ion-icon [name]="icon" *ngIf="icon"></ion-icon>
        <label>
            <template #labelComponentContainer></template>
            <ng-content></ng-content>
        </label>
    `,
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-medium)}"]
    })
], FormItemHint);

let FormHelperModule = class FormHelperModule {
};
FormHelperModule = __decorate([
    NgModule({
        declarations: [FormItem, FormHeading, FormItemError, FormItemHint, FormHelper],
        imports: [CommonModule, FormsModule, IonicModule, IntlModule, MatchMediaModule],
        exports: [FormItem, FormItemError, FormItemHint, FormHeading, FormHelper]
    })
], FormHelperModule);

/**
 * Generated bundle index. Do not edit.
 */

export { FormHeading, FormHelper, FormHelperModule, FormItem, FormItemError, FormItemHint };
//# sourceMappingURL=form-helper-module.js.map
