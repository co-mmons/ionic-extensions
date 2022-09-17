import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, ElementRef, Directive, Optional, ContentChildren, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { FormControlName, NgForm, FormGroupDirective, FormsModule } from '@angular/forms';
import { MatchMediaModule } from '@co.mmons/angular-extensions/browser/match-media';
import { IntlModule } from '@co.mmons/angular-intl';
import { IonicModule } from '@ionic/angular';
import scrollIntoView from 'scroll-into-view';

class FormHeading {
    constructor() {
    }
}
FormHeading.decorators = [
    { type: Component, args: [{
                selector: "ionx-form-heading",
                template: `
        <ng-content select="ion-item"></ng-content>
        <div ionx--under>
            <ng-content></ng-content>
        </div>
    `,
                styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start: 0px;--padding-end: 0px;--inner-padding-end: 16px;--inner-padding-start: 16px}:host ::ng-deep ion-item>ion-label{font-weight:500}:host ::ng-deep ion-item>ion-label[size=large]{font-size:large}:host ::ng-deep ion-item>ion-label[size=small]{font-size:small}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:sticky;top:0px;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start: 8px;--padding-end: 8px;--inner-padding-end: 0px;--inner-padding-start: 0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}:host-context(.ios) ::ng-deep ion-button{height:auto}\n"]
            },] }
];
FormHeading.ctorParameters = () => [];
FormHeading.propDecorators = {
    sticky: [{ type: HostBinding, args: ["attr.sticky",] }, { type: Input }]
};

class FormHelper {
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

class FormItem {
}
FormItem.decorators = [
    { type: Component, args: [{
                selector: "ionx-form-item",
                template: `<ng-content select="ion-item"></ng-content><ng-content select="ionx-form-item-error"></ng-content><ng-content select="ionx-form-item-hint"></ng-content><ng-content></ng-content>`,
                styles: [":host{display:flex;flex-direction:column}:host ::ng-deep ion-item{--padding-start: 0px;--inner-padding-end: 0px;--inner-padding-start: 0px;--padding-end: 0px;--inner-border-width: 0px;--border-width: 0px 0px 1px 0px}\n"]
            },] }
];

class FormItemError {
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
}
FormItemError.decorators = [
    { type: Component, args: [{
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
                styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}\n", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:flex}\n"]
            },] }
];
FormItemError.ctorParameters = () => [
    { type: FormGroupDirective }
];
FormItemError.propDecorators = {
    icon: [{ type: Input }],
    markedAs: [{ type: Input }],
    controlOrName: [{ type: Input, args: ["control",] }]
};

class FormItemHint {
    constructor() {
    }
    set label(label) {
        this.labelComponentContainer.clear();
        this.labelComponentContainer.insert(label.hostView);
    }
}
FormItemHint.decorators = [
    { type: Component, args: [{
                selector: "ionx-form-item-hint",
                template: `
        <ion-icon [name]="icon" *ngIf="icon"></ion-icon>
        <label>
            <template #labelComponentContainer></template>
            <ng-content></ng-content>
        </label>
    `,
                styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}\n", ":host{color:var(--ion-color-medium)}\n"]
            },] }
];
FormItemHint.ctorParameters = () => [];
FormItemHint.propDecorators = {
    icon: [{ type: Input }],
    labelComponentContainer: [{ type: ViewChild, args: ["labelComponentContainer", { read: ViewContainerRef, static: true },] }],
    label: [{ type: Input }]
};

class FormHelperModule {
}
FormHelperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FormItem, FormHeading, FormItemError, FormItemHint, FormHelper],
                imports: [CommonModule, FormsModule, IonicModule, IntlModule, MatchMediaModule],
                exports: [FormItem, FormItemError, FormItemHint, FormHeading, FormHelper]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { FormHeading, FormHelper, FormHelperModule, FormItem, FormItemError, FormItemHint };
//# sourceMappingURL=form-helper-module.js.map
