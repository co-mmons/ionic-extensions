import { __decorate, __metadata, __awaiter, __param } from 'tslib';
import { Component, NgModule, Input, Directive, TemplateRef, ViewContainerRef, ChangeDetectionStrategy, ElementRef, ViewChild, HostListener, Optional, EventEmitter, Output, ContentChild, ContentChildren, QueryList, ChangeDetectorRef, HostBinding, ComponentRef, Injector, ComponentFactoryResolver, Injectable, ApplicationRef, Inject, forwardRef, Renderer, ViewEncapsulation } from '@angular/core';
import { PopoverController, ModalController, IonicModule, IonSearchbar, IonBackButtonDelegate, IonRouterOutlet, NavController, IonToggle } from '@ionic/angular';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgControl, FormsModule, FormControlName, NgForm, FormGroupDirective, AbstractControl } from '@angular/forms';
import { IntlService, IntlModule } from '@co.mmons/angular-intl';
import { waitTill, DateTimezone, sleep } from '@co.mmons/js-utils/core';
import { DomSanitizer } from '@angular/platform-browser';
import { unsubscribe } from '@co.mmons/rxjs-utils';
import { MatchMediaModule } from '@co.mmons/angular-extensions/browser/match-media';
import { Router } from '@angular/router';

let Buttons = class Buttons {
    constructor() {
    }
};
Buttons = __decorate([
    Component({
        selector: "ionx-buttons",
        template: `<ng-content></ng-content>`,
        styles: [`
        :host {
            display: flex;
            align-items: center;
            transform: translateZ(0);
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button {
            height: 32px;
            --padding-top: 0;
            --padding-bottom: 0;
            margin: 0px;
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear {
            --padding-start: 8px;
            --padding-end: 8px;
            margin: 0px 8px;
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear + ion-button.button-clear {
            margin-left: 0px;
        }
        
        :host-context(.ios ion-toolbar) ::ng-deep ion-button {
            font-weight: 400;
        }
    `]
    }),
    __metadata("design:paramtypes", [])
], Buttons);

let ButtonsModule = class ButtonsModule {
};
ButtonsModule = __decorate([
    NgModule({
        declarations: [Buttons],
        exports: [Buttons]
    })
], ButtonsModule);

let SelectLabel = class SelectLabel {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.separator = ", ";
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectLabel.prototype, "separator", void 0);
SelectLabel = __decorate([
    Directive({
        selector: "[ionxSelectLabel]"
    }),
    __metadata("design:paramtypes", [TemplateRef, ViewContainerRef])
], SelectLabel);

let SelectOption = class SelectOption {
    constructor(element) {
        this.element = element;
    }
    get label() {
        return this.element.nativeElement.innerText;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectOption.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectOption.prototype, "divider", void 0);
SelectOption = __decorate([
    Component({
        selector: "ionx-select-option",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<ng-content></ng-content>"
    }),
    __metadata("design:paramtypes", [ElementRef])
], SelectOption);

class SelectOptions extends Array {
    constructor() {
        super();
        Object.setPrototypeOf(this, SelectOptions.prototype);
    }
    pushOption(value, label, disabled) {
        this.push({ value: value, label: label, disabled: disabled });
    }
    pushDivider(label) {
        this.push({ divider: true, label: label });
    }
}

let SelectOverlayContent = class SelectOverlayContent {
    constructor(element, intl, popoverController, modalController) {
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.multiple = false;
        this.whiteSpace = "nowrap";
    }
    get popoverOverlay() {
        return this.overlay == "popover";
    }
    get modalOverlay() {
        return this.overlay == "modal";
    }
    optionDivider(option, index, options) {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i] === option && i > 0 && this.options[i - 1].divider) {
                return this.options[i - 1];
            }
        }
    }
    optionClicked(option, ev) {
        if (option.checked && !this.empty && this.checkedOptions.length === 1 && this.checkedOptions[0] === option) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
        }
    }
    optionBeforeChange(option) {
        this.lastClickedOption = option;
        option.checkedTimestamp = Date.now();
    }
    optionChanged(option) {
        if (!this.lastClickedOption || option !== this.lastClickedOption) {
            return;
        }
        if (this.multiple && this.valueValidator) {
            let values = [];
            for (let o of this.checkedOptions) {
                if (o !== option) {
                    values.push(o.value);
                }
            }
            let optionWasChecked = option.checked;
            for (let o of this.options) {
                o.checked = false;
            }
            this.checkedOptions = [];
            VALUES: for (let v of this.valueValidator(option.value, optionWasChecked, values) || []) {
                for (let o of this.options) {
                    if (this.valueComparator(o.value, v)) {
                        o.checked = true;
                        this.checkedOptions.push(o);
                        continue VALUES;
                    }
                }
            }
        }
        else {
            if (!option.checked) {
                for (let i = 0; i < this.checkedOptions.length; i++) {
                    if (this.checkedOptions[i] === option) {
                        this.checkedOptions.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                if (!this.multiple) {
                    for (let o of this.options) {
                        if (o.checked && o !== option) {
                            o.checked = false;
                        }
                    }
                    this.checkedOptions = [option];
                }
                else {
                    this.checkedOptions.push(option);
                }
            }
        }
        if (!this.multiple) {
            this.okClicked();
        }
        this.lastClickedOption = undefined;
    }
    buildVisibleOptions() {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].divider) {
                this.options[i].hidden = true;
                if (this.options.length - 1 > i) {
                    for (let ii = i + 1; ii < this.options.length; ii++) {
                        if (this.options[ii].divider) {
                            break;
                        }
                        if (!this.options[ii].hidden) {
                            this.options[i].hidden = false;
                            break;
                        }
                    }
                }
            }
        }
        this.visibleOptions = [];
        for (let option of this.options) {
            if (!option.hidden) {
                this.visibleOptions.push(option);
            }
        }
    }
    initOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkedOptions = [];
            for (let option of this.options) {
                if (option.checked) {
                    this.checkedOptions.push(option);
                }
            }
            if (this.orderable) {
                this.checkedOptions.sort((a, b) => a.checkedTimestamp - b.checkedTimestamp);
            }
            this.buildVisibleOptions();
            if (this.checkedOptions.length > 0) {
                if (this.modalOverlay) {
                    yield waitTill(() => !!this.scroll);
                    let indexToScroll = -1;
                    for (let i = 0; i < this.visibleOptions.length; i++) {
                        if (this.visibleOptions[i].checked) {
                            indexToScroll = i;
                            break;
                        }
                    }
                    this.scroll.scrollToIndex(indexToScroll);
                }
            }
        });
    }
    okClicked() {
        let values = [];
        if (this.orderable) {
            for (let o of this.checkedOptions) {
                values.push(o.value);
            }
        }
        else {
            OPTIONS: for (let option of this.options) {
                for (let checked of this.checkedOptions) {
                    if (option === checked) {
                        values.push(checked.value);
                        continue OPTIONS;
                    }
                }
            }
        }
        this.updateValues(values);
        if (this.popoverController && this.popoverOverlay) {
            this.popoverController.dismiss();
        }
        else if (this.modalController && this.modalOverlay) {
            this.modalController.dismiss();
        }
    }
    cancelClicked() {
        if (this.popoverController && this.popoverOverlay) {
            this.popoverController.dismiss();
        }
        else if (this.modalController && this.modalOverlay) {
            this.modalController.dismiss();
        }
    }
    search(ev) {
        let query = this.searchbar.nativeElement.value ? this.searchbar.nativeElement.value.toString() : undefined;
        if (query) {
            query = query.trim().toLowerCase();
        }
        for (let o of this.options) {
            if (!query) {
                o.hidden = false;
            }
            else {
                o.hidden = this.searchHandler ? !this.searchHandler(query, o.value, o.label) : (o.label || "").toLowerCase().indexOf(query) < 0;
            }
        }
        this.buildVisibleOptions();
    }
    ngOnInit() {
        if (this.popoverOverlay) {
            this.initOptions();
        }
        else {
            const modal = this.element.nativeElement.closest("ion-modal");
            if (modal.classList.contains("modal-ios")) {
                this.itemHeight = 44.55;
            }
            else {
                this.itemHeight = 49;
            }
        }
    }
    resetScrollHeight() {
        return __awaiter(this, void 0, void 0, function* () {
            const oldHeight = this.scrollHeight;
            let newHeight = this.content.nativeElement.offsetHeight;
            if (newHeight == oldHeight) {
                yield waitTill(() => {
                    newHeight = this.content.nativeElement.offsetHeight;
                    return newHeight !== oldHeight;
                }, undefined, 2000);
            }
            this.scrollHeight = newHeight;
            if (typeof oldHeight !== "number" && this.scroll) {
                this.scroll.checkViewportSize();
            }
        });
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.modalOverlay) {
                this.resetScrollHeight();
                if (!window["cordova"] || window["cordova"].platformId === "browser") {
                    yield waitTill(() => !!this.searchbar && !!this.searchbar.nativeElement.querySelector("input"));
                    this.searchbar.nativeElement.setFocus();
                }
                this.initOptions();
            }
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectOverlayContent.prototype, "overlay", void 0);
__decorate([
    ViewChild(CdkVirtualScrollViewport, { static: false }),
    __metadata("design:type", CdkVirtualScrollViewport)
], SelectOverlayContent.prototype, "scroll", void 0);
__decorate([
    ViewChild("content", { read: ElementRef, static: false }),
    __metadata("design:type", ElementRef)
], SelectOverlayContent.prototype, "content", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectOverlayContent.prototype, "multiple", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectOverlayContent.prototype, "orderable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], SelectOverlayContent.prototype, "updateValues", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectOverlayContent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], SelectOverlayContent.prototype, "searchHandler", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], SelectOverlayContent.prototype, "valueValidator", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], SelectOverlayContent.prototype, "valueComparator", void 0);
__decorate([
    Input(),
    __metadata("design:type", SelectLabel)
], SelectOverlayContent.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], SelectOverlayContent.prototype, "options", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SelectOverlayContent.prototype, "empty", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SelectOverlayContent.prototype, "whiteSpace", void 0);
__decorate([
    ViewChild("searchbar", { read: ElementRef, static: false }),
    __metadata("design:type", ElementRef)
], SelectOverlayContent.prototype, "searchbar", void 0);
__decorate([
    HostListener("window:resize"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SelectOverlayContent.prototype, "resetScrollHeight", null);
SelectOverlayContent = __decorate([
    Component({
        selector: "ionx-select-overlay",
        template: "<ion-header *ngIf=\"modalOverlay\">\n    <ion-toolbar>\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"start\">\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"cancelClicked()\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ionx-buttons>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\"\n                       (ionInput)=\"search($event)\"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n<ion-content [scrollY]=\"false\" [scrollX]=\"false\" #content>\n\n    <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ng-template [ngIf]=\"!!visibleOptions\">\n        <div>\n\n            <cdk-virtual-scroll-viewport [itemSize]=\"itemHeight\" [style.height.px]=\"scrollHeight\" *ngIf=\"modalOverlay\">\n\n                <ion-list lines=\"full\">\n\n                    <ion-item detail=\"false\" [button]=\"!option.divider\" [style.fontWeight]=\"option.divider ? 500 : null\" #listItem *cdkVirtualFor=\"let option of visibleOptions\">\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"\n                                      *ngIf=\"!option.divider\"></ion-checkbox>\n                        <ion-label>\n                            <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                            <ng-template #customLabel>\n                                <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                            </ng-template>\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n            </cdk-virtual-scroll-viewport>\n\n            <ion-list lines=\"full\" *ngIf=\"popoverOverlay\">\n\n                <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n\n                    <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                        <ion-label>{{option.label}}</ion-label>\n                    </ion-item-divider>\n\n                    <ng-template #basicOption>\n\n                        <ion-item detail=\"false\" button=\"true\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\"></ion-checkbox>\n                            <ion-label [style.whiteSpace]=\"whiteSpace\">\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n\n                    </ng-template>\n\n                </ng-template>\n            </ion-list>\n        </div>\n    </ng-template>\n\n</ion-content>\n\n<ion-footer *ngIf=\"multiple && popoverOverlay\" style=\"position: sticky; bottom: 0px\">\n    <ion-toolbar>\n        <ion-buttons slot=\"end\">\n\n            <ion-button size=\"small\" (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-button>\n\n            <ion-button size=\"small\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-button>\n\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: ["@media (min-width:768px){::ng-deep .ionx-select-overlay-width .popover-content{--width:300px;--max-width:90%}}@media (max-width:767px){::ng-deep .ionx-select-overlay-width .popover-content{left:calc(16px + var(--ion-safe-area-left,0px))!important;width:calc(100% - (32px + var(--ion-safe-area-right,0px) + var(--ion-safe-area-left,0px)))}}:host .ionx-select-overlay-spinner{position:absolute;width:100%;height:100%;left:0;top:0}:host .ionx-select-overlay-spinner ion-spinner{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}:host ion-checkbox{margin-right:16px;margin-top:8px;margin-bottom:8px}:host ion-list{margin:4px 0;padding:0}:host ::ng-deep .cdk-virtual-scroll-content-wrapper{max-width:100%}:host ::ng-deep .hydrated{visibility:visible}:host-context(ion-popover) ion-content{--overflow:initial!important}:host-context(ion-popover) ion-content ion-item ion-label{white-space:normal}:host-context(ion-popover) ion-content ion-item.item:last-child{--border-width:0px}:host-context(.ios) ion-item-divider{--background:transparent;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500}"]
    }),
    __param(2, Optional()),
    __param(3, Optional()),
    __metadata("design:paramtypes", [ElementRef,
        IntlService,
        PopoverController,
        ModalController])
], SelectOverlayContent);

let Select = class Select {
    constructor(element, intl, popoverController, modalController, control) {
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.control = control;
        this.overlayWhiteSpace = "nowrap";
        this.empty = true;
        this.ionChange = new EventEmitter();
        this.change = this.ionChange;
        /*private*/ this.values = [];
        this.valueComparator = (a, b) => {
            if (this.compareAsString) {
                if (a !== undefined && a !== null && b !== undefined && b !== null) {
                    return a.toString() == b.toString();
                }
                else {
                    return a == b;
                }
            }
            else if (this.comparator) {
                const r = this.comparator(a, b);
                return r === 0 || r === true;
            }
            return a === b;
        };
        if (control) {
            control.valueAccessor = this;
        }
    }
    get listItem() {
        if (this._listItem) {
            return this._listItem;
        }
        return this._listItem = this.element.nativeElement.closest("ion-item");
    }
    set readonly(readonly) {
        if (typeof readonly === "string") {
            this.readonly = readonly === "true";
        }
        else {
            this._readonly = readonly;
        }
    }
    get readonly() {
        return !!this._readonly;
    }
    /**
     * Whether or not the select component is disabled.
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled || disabled == "true" ? true : false;
    }
    set value(value) {
        let changed = false;
        let newValue = Array.isArray(value) ? value : (value !== undefined && value !== null ? [value] : []);
        if (newValue.length != this.values.length) {
            changed = true;
        }
        else {
            for (let i = 0; i < this.values.length; i++) {
                if (!this.valueComparator(this.values[i], newValue[i])) {
                    changed = true;
                    break;
                }
            }
        }
        this.values = newValue;
        if (changed) {
            this.checkListItemHasValue();
            let value = this.value;
            if (this.fireOnChange) {
                if (this.controlOnChange) {
                    this.controlOnChange(value);
                }
                this.ionChange.emit(value);
            }
        }
        this.fireOnChange = false;
    }
    get value() {
        return this.multiple || this.alwaysArray ? this.values.slice(0) : (this.values.length > 0 ? this.values[0] : undefined);
    }
    /*private*/ labelImpl$(value) {
        if (this.options instanceof SelectOptions) {
            if (!this.cachedLabels) {
                this.cachedLabels = new Array(this.options.length);
            }
            for (let i = 0; i < this.options.length; i++) {
                if (this.valueComparator(value, this.options[i].value)) {
                    if (this.cachedLabels[i]) {
                        return this.cachedLabels[i];
                    }
                    return this.cachedLabels[i] = this.options[i].label ? this.options[i].label : (this.label ? this.label(value) : value + "");
                }
            }
        }
        else if (this.options) {
            if (!this.cachedLabels) {
                this.cachedLabels = new Array(this.options.length);
            }
            for (let i = 0; i < this.options.length; i++) {
                if (this.valueComparator(value, this.options[i])) {
                    if (this.cachedLabels[i]) {
                        return this.cachedLabels[i];
                    }
                    return this.cachedLabels[i] = this.label ? this.label(value) : value + "";
                }
            }
        }
        else if (this.optionsComponents) {
            for (let options = this.optionsComponents.toArray(), i = 0; i < options.length; i++) {
                if (this.valueComparator(value, options[i].value)) {
                    return options[i].label;
                }
            }
        }
        return value;
    }
    writeValue(value) {
        this.value = value;
    }
    hasValue() {
        return this.values.length > 0;
    }
    checkListItemHasValue() {
        if (this.listItem) {
            if (this.hasValue()) {
                this.listItem.classList.add("has-value");
            }
            else {
                this.listItem.classList.remove("has-value");
            }
        }
    }
    set _optionsComponents(val) {
        this.optionsComponents = val;
        //this.optionsComponents.changes.subscribe(() => this.updateText());
    }
    indexOfValue(value) {
        if (!this.values) {
            return -1;
        }
        for (let i = 0; i < this.values.length; i++) {
            if (this.valueComparator(value, this.values[i])) {
                return i;
            }
        }
        return -1;
    }
    registerOnChange(fn) {
        this.controlOnChange = fn;
    }
    registerOnTouched(fn) {
        this.controlOnTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    open(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let overlay = this.overlay;
            if (!overlay) {
                overlay = "popover";
            }
            let options = [];
            if (this.options instanceof SelectOptions) {
                for (const option of this.options) {
                    const valueIndex = option.value ? this.indexOfValue(option.value) : -1;
                    options.push({ value: option.value, checked: option.value ? valueIndex > -1 : false, checkedTimestamp: this.orderable && valueIndex, label: option.label ? option.label : ((!this.searchTest || !this.labelTemplate) ? this.labelImpl$(option.value) : undefined), disabled: option.disabled, divider: option.divider });
                }
            }
            else if (this.options) {
                for (const option of this.options) {
                    const valueIndex = this.indexOfValue(option);
                    options.push({ value: option, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: !this.labelTemplate || !this.searchTest ? this.labelImpl$(option) : undefined });
                }
            }
            else if (this.optionsComponents) {
                for (const option of this.optionsComponents.toArray()) {
                    const valueIndex = this.indexOfValue(option.value);
                    options.push({ value: option.value, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: option.label, divider: !!option.divider });
                }
            }
            let overlayTitle;
            if (this.title) {
                overlayTitle = this.title;
            }
            if (!overlayTitle && this.listItem) {
                const title = this.listItem.querySelector("[ionx-select-overlay-title]");
                if (title) {
                    overlayTitle = title.innerText;
                }
                else {
                    const label = this.listItem.querySelector("ion-label");
                    if (label) {
                        overlayTitle = label.innerText;
                    }
                }
            }
            if (!overlayTitle && this.element.nativeElement.title) {
                overlayTitle = this.element.nativeElement.title;
            }
            if (!overlayTitle && this.placeholder) {
                overlayTitle = this.placeholder;
            }
            let overlayData = {
                overlay: overlay,
                options: options,
                multiple: !!this.multiple,
                title: overlayTitle,
                label: this.labelTemplate,
                orderable: !!this.orderable,
                empty: !!this.empty,
                whiteSpace: this.overlayWhiteSpace,
                valueValidator: this.checkValidator,
                valueComparator: this.valueComparator,
                width: this.element.nativeElement.getBoundingClientRect().width,
                updateValues: (value) => {
                    this.fireOnChange = true;
                    this.value = value;
                    if (this.controlOnTouched) {
                        this.controlOnTouched();
                    }
                }
            };
            if (overlay == "popover") {
                let popover = yield this.popoverController.create({ component: SelectOverlayContent, componentProps: overlayData, cssClass: "ionx-select-overlay-width", event: event });
                popover.present();
            }
            else {
                let modal = yield this.modalController.create({ component: SelectOverlayContent, componentProps: overlayData });
                modal.present();
            }
        });
    }
    // private initDragula() {
    //
    //     if (this.orderable && !this.disabled && !this.readonly) {
    //
    //         if (this.dragula) {
    //             return;
    //         }
    //
    //         this.dragula = (dragula as any)({
    //             containers: [this.textContainer.nativeElement],
    //             direction: "horizontal",
    //
    //             moves: (el, container, handle) => {
    //                 return this.values && this.values.length > 1;
    //             }
    //         });
    //
    //         this.dragula.on("drop", (el, target, source, sibling) => {
    //
    //             const startIndex = parseInt(el.getAttribute("ionx--index"), 0);
    //             let endIndex = sibling ? parseInt(sibling.getAttribute("ionx--index"), 0) : this.values.length;
    //
    //             if (endIndex > startIndex) {
    //                 endIndex -= 1;
    //             }
    //
    //             const element = this.values[startIndex];
    //             this.values.splice(startIndex, 1);
    //             this.values.splice(endIndex, 0, element);
    //
    //             if (this.controlOnChange) {
    //                 this.controlOnChange(this.values.slice());
    //             }
    //
    //             this.ionChange.emit(this.values.slice());
    //         });
    //
    //     } else if (this.dragula) {
    //         this.dragula.destroy();
    //         this.dragula = undefined;
    //     }
    // }
    updateCssClasses() {
        if (this.listItem) {
            this.listItem.classList.add("item-select");
            if (!this.readonly && !this.disabled) {
                this.listItem.classList.add("item-interactive");
            }
            else {
                this.listItem.classList.remove("item-interactive");
            }
            this.element.nativeElement.classList.add("in-item");
        }
        else {
            this.element.nativeElement.classList.remove("in-item");
        }
    }
    ngOnChanges(changes) {
        if (changes.options) {
            this.cachedLabels = undefined;
        }
        if (changes["orderable"] || changes["readonly"] || changes["disabled"]) {
            // this.initDragula();
            this.updateCssClasses();
        }
    }
    ngOnInit() {
        //this.updateText();
        this.updateCssClasses();
        if (this.orderable) {
            // this.initDragula();
        }
    }
};
__decorate([
    ViewChild("textContainer", { static: true }),
    __metadata("design:type", ElementRef)
], Select.prototype, "textContainer", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Select.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Select.prototype, "overlay", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Select.prototype, "overlayWhiteSpace", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Select.prototype, "alwaysArray", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Select.prototype, "compareAsString", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Select.prototype, "comparator", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Select.prototype, "multiple", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Select.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Select.prototype, "orderable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Select.prototype, "empty", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], Select.prototype, "readonly", null);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Select.prototype, "searchTest", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Select.prototype, "checkValidator", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Select.prototype, "ionChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], Select.prototype, "change", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Select.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Select.prototype, "value", null);
__decorate([
    ContentChild(SelectLabel, { static: false }),
    __metadata("design:type", SelectLabel)
], Select.prototype, "labelTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], Select.prototype, "label", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Select.prototype, "options", void 0);
__decorate([
    ContentChildren(SelectOption),
    __metadata("design:type", QueryList),
    __metadata("design:paramtypes", [QueryList])
], Select.prototype, "_optionsComponents", null);
Select = __decorate([
    Component({
        selector: "ionx-select",
        host: {
            "[attr.ionx--chips-layout]": "!!orderable || null",
            "[attr.ionx--readonly]": "(!!readonly || !!disabled) || null",
            "[attr.ionx--orderable]": "(!!orderable && !readonly && !disabled && values && values.length > 1) || null",
        },
        template: "<ng-template #optionTemplate let-value=\"value\" let-index=\"index\">\n    <span *ngIf=\"!labelTemplate; else hasLabelTemplate\">{{labelImpl$(value)}}</span>\n    <ng-template #hasLabelTemplate>\n        <ng-container *ngTemplateOutlet=\"labelTemplate.templateRef; context: {$implicit: value, index: index}\"></ng-container>\n    </ng-template>\n</ng-template>\n\n<div class=\"select-inner\">\n    <div class=\"select-text\" #textContainer [class.select-placeholder]=\"values.length == 0\">\n        <span *ngIf=\"values.length == 0; else showValues\">{{placeholder}}</span>\n        <ng-template #showValues>\n            <ng-template ngFor [ngForOf]=\"values\" let-value let-index=\"index\">\n                <span *ngIf=\"index > 0 && (!labelTemplate || labelTemplate.separator) && !orderable\">{{!labelTemplate ? \", \" : labelTemplate.separator}}</span>\n\n                <ion-chip *ngIf=\"orderable else simpleText\" outline=\"true\" [attr.ionx--index]=\"index\">\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ion-chip>\n\n                <ng-template #simpleText>\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ng-template>\n\n            </ng-template>\n        </ng-template>\n    </div>\n\n    <ng-container  *ngIf=\"!_readonly && !_disabled\">\n        <div class=\"select-icon\" role=\"presentation\" *ngIf=\"!orderable\">\n            <div class=\"select-icon-inner\"></div>\n        </div>\n        <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\" *ngIf=\"!orderable || !values || values.length === 0\"></button>\n    </ng-container>\n\n</div>\n",
        styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:inline-block;overflow:hidden;color:var(--color);font-family:var(--ion-font-family,inherit);max-width:100%}:host .select-inner{display:flex;position:relative}:host .select-icon{position:relative;width:16px;height:20px}:host .select-icon .select-icon-inner{top:50%;right:0;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:.33;pointer-events:none}:host .select-text.select-placeholder{opacity:.5}:host.select-disabled{opacity:.4;pointer-events:none}:host.select-readonly{opacity:1;pointer-events:none}:host.select-readonly .select-icon{display:none}:host[white-space-normal] .select-text{white-space:normal!important}:host button{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0}:host button::-moz-focus-inner{border:0}:host.in-item{position:static}:host ion-chip{max-width:calc(50% - 4px);-webkit-margin-start:0;margin-inline-start:0;margin-bottom:0;cursor:default}:host ion-chip>span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:1.1}:host [ionx--orderable] ion-chip{cursor:move}:host [ionx--chips-layout] .select-text{white-space:normal;width:100%}:host-context(ion-toolbar){color:var(--ion-toolbar-color);--icon-color:var(--ion-toolbar-color);--padding-start:16px;--padding-end:16px}:host-context(.item-label-stacked){align-self:flex-start;--padding-top:8px;--padding-bottom:8px;--padding-start:0;width:100%}:host-context(.item-label-stacked) .select-text{max-width:calc(100% - 16px);flex:initial}"]
    }),
    __param(4, Optional()),
    __metadata("design:paramtypes", [ElementRef, IntlService, PopoverController, ModalController, NgControl])
], Select);

let SelectModule = class SelectModule {
};
SelectModule = __decorate([
    NgModule({
        declarations: [Select, SelectOption, SelectOverlayContent, SelectLabel],
        entryComponents: [Select, SelectOption, SelectOverlayContent],
        exports: [Select, SelectOption, SelectOverlayContent, SelectLabel],
        imports: [CommonModule, FormsModule, IonicModule, IntlModule, ScrollingModule, ButtonsModule]
    })
], SelectModule);

const defaultDateTimeFormat = {
    year: "numeric", month: "numeric", day: "numeric",
    hour: "2-digit", minute: "2-digit"
};
const defaultDateFormat = {
    year: "numeric", month: "numeric", day: "numeric"
};

let currentLocale;
function timezoneInfo(tz, date) {
    if (!date) {
        date = new Date();
    }
    const format1 = { hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZone: tz };
    const format2 = { hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short", timeZone: tz };
    if (!currentLocale) {
        currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
    }
    try {
        const d = new Intl.DateTimeFormat(currentLocale, format1).format(date);
        const o = new Intl.DateTimeFormat(currentLocale, format2).format(date).replace(d, "").trim();
        return { id: tz, label: tz.replace("_", " ") + " (" + o + ")", date: d };
    }
    catch (error) {
        throw new Error("Invalid timezone. " + error);
        // console.log(error);
    }
}

const rawTimezones = [
    "Europe/Andorra",
    "Asia/Dubai",
    "Asia/Kabul",
    "Europe/Tirane",
    "Asia/Yerevan",
    "Antarctica/Casey",
    "Antarctica/Davis",
    "Antarctica/DumontDUrville",
    "Antarctica/Mawson",
    "Antarctica/Palmer",
    "Antarctica/Rothera",
    "Antarctica/Syowa",
    "Antarctica/Troll",
    "Antarctica/Vostok",
    "America/Argentina/Buenos_Aires",
    "America/Argentina/Cordoba",
    "America/Argentina/Salta",
    "America/Argentina/Jujuy",
    "America/Argentina/Tucuman",
    "America/Argentina/Catamarca",
    "America/Argentina/La_Rioja",
    "America/Argentina/San_Juan",
    "America/Argentina/Mendoza",
    "America/Argentina/San_Luis",
    "America/Argentina/Rio_Gallegos",
    "America/Argentina/Ushuaia",
    "Pacific/Pago_Pago",
    "Europe/Vienna",
    "Australia/Lord_Howe",
    "Antarctica/Macquarie",
    "Australia/Hobart",
    "Australia/Currie",
    "Australia/Melbourne",
    "Australia/Sydney",
    "Australia/Broken_Hill",
    "Australia/Brisbane",
    "Australia/Lindeman",
    "Australia/Adelaide",
    "Australia/Darwin",
    "Australia/Perth",
    "Australia/Eucla",
    "Asia/Baku",
    "America/Barbados",
    "Asia/Dhaka",
    "Europe/Brussels",
    "Europe/Sofia",
    "Atlantic/Bermuda",
    "Asia/Brunei",
    "America/La_Paz",
    "America/Noronha",
    "America/Belem",
    "America/Fortaleza",
    "America/Recife",
    "America/Araguaina",
    "America/Maceio",
    "America/Bahia",
    "America/Sao_Paulo",
    "America/Campo_Grande",
    "America/Cuiaba",
    "America/Santarem",
    "America/Porto_Velho",
    "America/Boa_Vista",
    "America/Manaus",
    "America/Eirunepe",
    "America/Rio_Branco",
    "America/Nassau",
    "Asia/Thimphu",
    "Europe/Minsk",
    "America/Belize",
    "America/St_Johns",
    "America/Halifax",
    "America/Glace_Bay",
    "America/Moncton",
    "America/Goose_Bay",
    "America/Blanc-Sablon",
    "America/Toronto",
    "America/Nipigon",
    "America/Thunder_Bay",
    "America/Iqaluit",
    "America/Pangnirtung",
    "America/Atikokan",
    "America/Winnipeg",
    "America/Rainy_River",
    "America/Resolute",
    "America/Rankin_Inlet",
    "America/Regina",
    "America/Swift_Current",
    "America/Edmonton",
    "America/Cambridge_Bay",
    "America/Yellowknife",
    "America/Inuvik",
    "America/Creston",
    "America/Dawson_Creek",
    "America/Fort_Nelson",
    "America/Vancouver",
    "America/Whitehorse",
    "America/Dawson",
    "Indian/Cocos",
    "Europe/Zurich",
    "Africa/Abidjan",
    "Pacific/Rarotonga",
    "America/Santiago",
    "America/Punta_Arenas",
    "Pacific/Easter",
    "Asia/Shanghai",
    "Asia/Urumqi",
    "America/Bogota",
    "America/Costa_Rica",
    "America/Havana",
    "Atlantic/Cape_Verde",
    "America/Curacao",
    "Indian/Christmas",
    "Asia/Nicosia",
    "Asia/Famagusta",
    "Europe/Prague",
    "Europe/Berlin",
    "Europe/Copenhagen",
    "America/Santo_Domingo",
    "Africa/Algiers",
    "America/Guayaquil",
    "Pacific/Galapagos",
    "Europe/Tallinn",
    "Africa/Cairo",
    "Africa/El_Aaiun",
    "Europe/Madrid",
    "Africa/Ceuta",
    "Atlantic/Canary",
    "Europe/Helsinki",
    "Pacific/Fiji",
    "Atlantic/Stanley",
    "Pacific/Chuuk",
    "Pacific/Pohnpei",
    "Pacific/Kosrae",
    "Atlantic/Faroe",
    "Europe/Paris",
    "Europe/London",
    "Asia/Tbilisi",
    "America/Cayenne",
    "Africa/Accra",
    "Europe/Gibraltar",
    "America/Godthab",
    "America/Danmarkshavn",
    "America/Scoresbysund",
    "America/Thule",
    "Europe/Athens",
    "Atlantic/South_Georgia",
    "America/Guatemala",
    "Pacific/Guam",
    "Africa/Bissau",
    "America/Guyana",
    "Asia/Hong_Kong",
    "America/Tegucigalpa",
    "America/Port-au-Prince",
    "Europe/Budapest",
    "Asia/Jakarta",
    "Asia/Pontianak",
    "Asia/Makassar",
    "Asia/Jayapura",
    "Europe/Dublin",
    "Asia/Jerusalem",
    "Asia/Kolkata",
    "Indian/Chagos",
    "Asia/Baghdad",
    "Asia/Tehran",
    "Atlantic/Reykjavik",
    "Europe/Rome",
    "America/Jamaica",
    "Asia/Amman",
    "Asia/Tokyo",
    "Africa/Nairobi",
    "Asia/Bishkek",
    "Pacific/Tarawa",
    "Pacific/Enderbury",
    "Pacific/Kiritimati",
    "Asia/Pyongyang",
    "Asia/Seoul",
    "Asia/Almaty",
    "Asia/Qyzylorda",
    "Asia/Qostanay",
    "Asia/Aqtobe",
    "Asia/Aqtau",
    "Asia/Atyrau",
    "Asia/Oral",
    "Asia/Beirut",
    "Asia/Colombo",
    "Africa/Monrovia",
    "Europe/Vilnius",
    "Europe/Luxembourg",
    "Europe/Riga",
    "Africa/Tripoli",
    "Africa/Casablanca",
    "Europe/Monaco",
    "Europe/Chisinau",
    "Pacific/Majuro",
    "Pacific/Kwajalein",
    "Asia/Yangon",
    "Asia/Ulaanbaatar",
    "Asia/Hovd",
    "Asia/Choibalsan",
    "Asia/Macau",
    "America/Martinique",
    "Europe/Malta",
    "Indian/Mauritius",
    "Indian/Maldives",
    "America/Mexico_City",
    "America/Cancun",
    "America/Merida",
    "America/Monterrey",
    "America/Matamoros",
    "America/Mazatlan",
    "America/Chihuahua",
    "America/Ojinaga",
    "America/Hermosillo",
    "America/Tijuana",
    "America/Bahia_Banderas",
    "Asia/Kuala_Lumpur",
    "Asia/Kuching",
    "Africa/Maputo",
    "Africa/Windhoek",
    "Pacific/Noumea",
    "Pacific/Norfolk",
    "Africa/Lagos",
    "America/Managua",
    "Europe/Amsterdam",
    "Europe/Oslo",
    "Asia/Kathmandu",
    "Pacific/Nauru",
    "Pacific/Niue",
    "Pacific/Auckland",
    "Pacific/Chatham",
    "America/Panama",
    "America/Lima",
    "Pacific/Tahiti",
    "Pacific/Marquesas",
    "Pacific/Gambier",
    "Pacific/Port_Moresby",
    "Pacific/Bougainville",
    "Asia/Manila",
    "Asia/Karachi",
    "Europe/Warsaw",
    "America/Miquelon",
    "Pacific/Pitcairn",
    "America/Puerto_Rico",
    "Asia/Gaza",
    "Asia/Hebron",
    "Europe/Lisbon",
    "Atlantic/Madeira",
    "Atlantic/Azores",
    "Pacific/Palau",
    "America/Asuncion",
    "Asia/Qatar",
    "Indian/Reunion",
    "Europe/Bucharest",
    "Europe/Belgrade",
    "Europe/Kaliningrad",
    "Europe/Moscow",
    "Europe/Simferopol",
    "Europe/Kirov",
    "Europe/Astrakhan",
    "Europe/Volgograd",
    "Europe/Saratov",
    "Europe/Ulyanovsk",
    "Europe/Samara",
    "Asia/Yekaterinburg",
    "Asia/Omsk",
    "Asia/Novosibirsk",
    "Asia/Barnaul",
    "Asia/Tomsk",
    "Asia/Novokuznetsk",
    "Asia/Krasnoyarsk",
    "Asia/Irkutsk",
    "Asia/Chita",
    "Asia/Yakutsk",
    "Asia/Khandyga",
    "Asia/Vladivostok",
    "Asia/Ust-Nera",
    "Asia/Magadan",
    "Asia/Sakhalin",
    "Asia/Srednekolymsk",
    "Asia/Kamchatka",
    "Asia/Anadyr",
    "Asia/Riyadh",
    "Pacific/Guadalcanal",
    "Indian/Mahe",
    "Africa/Khartoum",
    "Europe/Stockholm",
    "Asia/Singapore",
    "America/Paramaribo",
    "Africa/Juba",
    "Africa/Sao_Tome",
    "America/El_Salvador",
    "Asia/Damascus",
    "America/Grand_Turk",
    "Africa/Ndjamena",
    "Indian/Kerguelen",
    "Asia/Bangkok",
    "Asia/Dushanbe",
    "Pacific/Fakaofo",
    "Asia/Dili",
    "Asia/Ashgabat",
    "Africa/Tunis",
    "Pacific/Tongatapu",
    "Europe/Istanbul",
    "America/Port_of_Spain",
    "Pacific/Funafuti",
    "Asia/Taipei",
    "Europe/Kiev",
    "Europe/Uzhgorod",
    "Europe/Zaporozhye",
    "Pacific/Wake",
    "America/New_York",
    "America/Detroit",
    "America/Kentucky/Louisville",
    "America/Kentucky/Monticello",
    "America/Indiana/Indianapolis",
    "America/Indiana/Vincennes",
    "America/Indiana/Winamac",
    "America/Indiana/Marengo",
    "America/Indiana/Petersburg",
    "America/Indiana/Vevay",
    "America/Chicago",
    "America/Indiana/Tell_City",
    "America/Indiana/Knox",
    "America/Menominee",
    "America/North_Dakota/Center",
    "America/North_Dakota/New_Salem",
    "America/North_Dakota/Beulah",
    "America/Denver",
    "America/Boise",
    "America/Phoenix",
    "America/Los_Angeles",
    "America/Anchorage",
    "America/Juneau",
    "America/Sitka",
    "America/Metlakatla",
    "America/Yakutat",
    "America/Nome",
    "America/Adak",
    "Pacific/Honolulu",
    "America/Montevideo",
    "Asia/Samarkand",
    "Asia/Tashkent",
    "America/Caracas",
    "Asia/Ho_Chi_Minh",
    "Pacific/Efate",
    "Pacific/Wallis",
    "Pacific/Apia",
    "Africa/Johannesburg"
];
function timezones(date) {
    if (!date) {
        date = new Date();
    }
    const unsorted = [];
    for (const tz of rawTimezones) {
        try {
            unsorted.push(timezoneInfo(tz, date));
        }
        catch (error) {
            // console.warn(error);
        }
    }
    return unsorted.sort((a, b) => a.date.localeCompare(b.date));
}

const weekdayNarrowFormat = {
    weekday: "short"
};
const monthYearFormat = {
    month: "long",
    year: "numeric"
};
const monthFormat = {
    month: "long"
};
let DateTimePickerOverlay = class DateTimePickerOverlay {
    constructor(viewController, intl, changeDetector) {
        this.viewController = viewController;
        this.intl = intl;
        this.changeDetector = changeDetector;
        this.dateView = "days";
        this.dateViews = [{ id: "days", label: this.intl.message("@co.mmons/ionic-extensions#Day") }, { id: "months", label: this.intl.message("@co.mmons/ionic-extensions#Month") }, { id: "years", label: this.intl.message("@co.mmons/ionic-extensions#Year") }];
    }
    dateViewChanged() {
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    }
    dateViewMove(step) {
        if (this.dateView == "days") {
            this.dateViewValue.setUTCMonth(this.dateViewValue.getUTCMonth() + step);
        }
        else if (this.dateView == "months") {
            this.dateViewValue.setUTCFullYear(this.dateViewValue.getUTCFullYear() + step);
        }
        else if (this.dateView == "years") {
            let yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
            let yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
            let yearStart = 0;
            if (yearTens >= 80) {
                yearStart = 80;
            }
            else if (yearTens >= 60) {
                yearStart = 60;
            }
            else if (yearTens >= 40) {
                yearStart = 40;
            }
            else if (yearTens >= 20) {
                yearStart = 20;
            }
            this.dateViewValue.setUTCFullYear(yearHundret + yearStart + (20 * step));
        }
        this.generateDateValues();
        this.generateDateHeader();
    }
    dateValueClicked(value) {
        let tmpDate = new Date(this.dateViewValue);
        if (this.dateView == "days") {
            tmpDate.setUTCDate(value);
        }
        else if (this.dateView == "months") {
            tmpDate.setUTCMonth(value);
            for (let i = 1; i < 5; i++) {
                if (tmpDate.getUTCMonth() != value) {
                    tmpDate = new Date(this.dateViewValue);
                    tmpDate.setUTCDate(tmpDate.getUTCDate() - i);
                    tmpDate.setUTCMonth(value);
                }
                else {
                    break;
                }
            }
        }
        else if (this.dateView == "years") {
            tmpDate.setUTCFullYear(value);
            for (let i = 1; i < 5; i++) {
                if (tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()) {
                    tmpDate = new Date(this.dateViewValue);
                    tmpDate.setUTCMonth(this.dateViewValue.getUTCMonth(), tmpDate.getUTCDate() - i);
                    tmpDate.setUTCFullYear(value);
                }
                else {
                    break;
                }
            }
        }
        for (let v of this.dateValues) {
            v.checked = v.id == value;
        }
        this.value = new Date(tmpDate);
        this.dateViewValue = new Date(tmpDate);
    }
    generateDateValues() {
        this.dateValues = [];
        let tmpDate = new Date(this.dateViewValue);
        if (this.dateView == "days") {
            for (let d = 1; d <= 33; d++) {
                tmpDate.setUTCDate(d);
                tmpDate.setUTCHours(0, 0, 0, 0);
                this.dateValues.push({
                    id: d,
                    label: d,
                    sublabel: this.intl.dateFormat(tmpDate, weekdayNarrowFormat),
                    checked: (this.value.getUTCFullYear() == tmpDate.getUTCFullYear() && this.value.getUTCMonth() == tmpDate.getUTCMonth() && this.value.getUTCDate() == d),
                    hidden: tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()
                });
            }
        }
        else if (this.dateView == "months") {
            let tmpDate = new Date(Date.UTC(1999, this.dateViewValue.getUTCMonth()));
            for (let m = 0; m < 12; m++) {
                tmpDate.setUTCMonth(m);
                this.dateValues.push({
                    id: m,
                    label: this.intl.dateFormat(tmpDate, monthFormat),
                    checked: this.value.getUTCFullYear() == this.dateViewValue.getUTCFullYear() && this.value.getUTCMonth() == m
                });
            }
        }
        else if (this.dateView == "years") {
            let tmpDate = new Date(this.dateViewValue);
            let yearHundret = Math.floor(tmpDate.getUTCFullYear() / 100) * 100;
            let yearTens = tmpDate.getUTCFullYear() - yearHundret;
            let yearStart = 0;
            if (yearTens >= 80) {
                yearStart = 80;
            }
            else if (yearTens >= 60) {
                yearStart = 60;
            }
            else if (yearTens >= 40) {
                yearStart = 40;
            }
            else if (yearTens >= 20) {
                yearStart = 20;
            }
            tmpDate.setUTCFullYear(yearHundret + yearStart - 1);
            for (let y = 0; y < 20; y++) {
                tmpDate.setUTCFullYear(tmpDate.getUTCFullYear() + 1);
                this.dateValues.push({
                    id: tmpDate.getUTCFullYear(),
                    label: tmpDate.getUTCFullYear(),
                    checked: this.value.getUTCFullYear() == tmpDate.getUTCFullYear()
                });
            }
        }
    }
    generateDateHeader() {
        if (this.dateView == "days") {
            this.dateHeader = this.intl.dateFormat(this.dateViewValue, monthYearFormat);
        }
        else if (this.dateView == "months") {
            this.dateHeader = this.dateViewValue.getUTCFullYear() + "";
        }
        else if (this.dateView == "years") {
            let yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
            let yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
            let yearStart = 0;
            if (yearTens >= 80) {
                yearStart = 80;
            }
            else if (yearTens >= 60) {
                yearStart = 60;
            }
            else if (yearTens >= 40) {
                yearStart = 40;
            }
            else if (yearTens >= 20) {
                yearStart = 20;
            }
            this.dateHeader = `${yearHundret + yearStart} - ${yearHundret + yearStart + 19}`;
        }
    }
    get timeVisible() {
        return !!this.formatOptions.hour || !!this.formatOptions.hour12 || !!this.formatOptions.minute;
    }
    get timeHoursFormatted() {
        return this.formatTime(this.value.getUTCHours());
    }
    set timeHoursFormatted(hours) {
        try {
            let h = parseInt(hours);
            if (!isNaN(h)) {
                this.timeHours = h;
            }
            else {
                this.timeHours = 0;
            }
        }
        catch (_a) {
            this.timeHours = 0;
        }
    }
    get timeHours() {
        return this.value.getUTCHours();
    }
    set timeHours(hours) {
        if (hours < 0 || hours > 23) {
            hours = 0;
        }
        this.value.setUTCHours(hours);
        this.dateViewValue.setUTCHours(hours);
        this.changeDetector.detectChanges();
    }
    get timeMinutesFormatted() {
        return this.formatTime(this.value.getUTCMinutes());
    }
    set timeMinutesFormatted(minutes) {
        try {
            let h = parseInt(minutes);
            if (!isNaN(h)) {
                this.timeMinutes = h;
            }
            else {
                this.timeMinutes = 0;
            }
        }
        catch (_a) {
            this.timeMinutes = 0;
        }
    }
    get timeMinutes() {
        return this.value.getUTCMinutes();
    }
    set timeMinutes(minutes) {
        if (minutes < 0 || minutes > 59) {
            minutes = 0;
        }
        this.value.setUTCMinutes(minutes);
        this.dateViewValue.setUTCMinutes(minutes);
        this.changeDetector.detectChanges();
    }
    formatTime(value) {
        if (value < 10) {
            return "0" + value;
        }
        else {
            return value + "";
        }
    }
    todayClicked() {
        let now = new Date();
        this.value.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    }
    cancelClicked() {
        this.viewController.dismiss();
    }
    doneClicked() {
        let value = this.value;
        if (this.timezone && this.timezone !== "UTC") {
            value = new Date(value.getTime() - (DateTimezone.timezoneOffset(this.timezone, this.value) * 60 * 1000 * -1));
        }
        this.viewController.dismiss(new DateTimezone(value, this.timezone), null);
    }
    loadTimezones() {
        return __awaiter(this, void 0, void 0, function* () {
            this.timezones = new SelectOptions();
            for (const t of timezones(this.value)) {
                this.timezones.pushOption(t.id, t.label);
            }
        });
    }
    ngOnInit() {
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
        if (!this.timezoneDisabled) {
            if (this.timezone) {
                try {
                    const info = timezoneInfo(this.timezone);
                    this.timezones = new SelectOptions();
                    this.timezones.pushOption(info.id, info.label);
                }
                catch (error) {
                    // console.warn(error);
                }
            }
            this.loadTimezones();
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Date)
], DateTimePickerOverlay.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateTimePickerOverlay.prototype, "formatOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DateTimePickerOverlay.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DateTimePickerOverlay.prototype, "timezone", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DateTimePickerOverlay.prototype, "timezoneDisabled", void 0);
DateTimePickerOverlay = __decorate([
    Component({
        selector: "ionx-datetime-overlay",
        template: "<ion-header>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-button (click)=\"cancelClicked()\" fill=\"clear\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ion-buttons>\n\n        <ion-title>{{title}}</ion-title>\n\n        <ion-buttons slot=\"end\">\n            <ion-button (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" text-right>\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: [":host{display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:flex;padding:4px;align-items:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow:none;padding:0;margin:0;flex:1;display:flex;--width:100%;--padding-start:2px;--padding-end:2px;--padding-top:2px;--padding-bottom:2px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start:16px;--padding-end:16px;--padding-top:0px;--padding-bottom:0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end:8px;--padding-start:0px;text-align:center}:host ion-footer ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width:1px}"]
    }),
    __metadata("design:paramtypes", [ModalController, IntlService, ChangeDetectorRef])
], DateTimePickerOverlay);

var DateTimePickerInput_1;
let DateTimePickerInput = DateTimePickerInput_1 = class DateTimePickerInput {
    constructor(element, intl, modalController, control) {
        this.element = element;
        this.intl = intl;
        this.modalController = modalController;
        this.control = control;
        this.ionChange = new EventEmitter();
        if (control) {
            control.valueAccessor = this;
        }
    }
    static currentTimezone() {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    get text() {
        return this._text;
    }
    /**
     * Whether or not the datetime-picker component is disabled.
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled || disabled == "true" ? true : false;
    }
    get listItem() {
        if (this._listItem) {
            return this._listItem;
        }
        return this._listItem = this.element.nativeElement.closest("ion-item");
    }
    /**
     * The display format of the date and time as text that shows
     * within the item. When the `pickerFormat` input is not used, then the
     * `displayFormat` is used for both display the formatted text, and determining
     * the datetime-picker picker's columns.
     */
    set displayFormat(format) {
        if (typeof format === "string") {
            this._displayFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
        }
        else {
            this._displayFormat = format;
        }
    }
    get displayFormat() {
        return this._displayFormat;
    }
    set pickerFormat(format) {
        if (typeof format == "string") {
            this._pickerFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
        }
        else {
            this._pickerFormat = format;
        }
    }
    get pickerFormat() {
        return this._pickerFormat;
    }
    set value(value) {
        let changed = false;
        if ((value === undefined || value === null) != (this._value === undefined)) {
            changed = true;
        }
        else if (typeof value === "number" && (this._value === undefined || value !== this._value.date.getTime())) {
            changed = true;
        }
        else if (value instanceof Date && (this._value === undefined || value.getTime() !== this._value.date.getTime())) {
            changed = true;
        }
        else if (value instanceof DateTimezone && (this._value === undefined || value.date.getTime() !== this._value.date.getTime() || value.timezone !== this._value.timezone)) {
            changed = true;
        }
        if (typeof value === "number") {
            this._value = new DateTimezone(value);
        }
        else if (value instanceof Date) {
            this._value = new DateTimezone(value.getTime());
        }
        else if (value instanceof DateTimezone) {
            this._value = new DateTimezone(new Date(value.date.getTime()), value.timezone === "current" ? DateTimePickerInput_1.currentTimezone() : value.timezone);
        }
        else {
            this._value = undefined;
        }
        if (changed) {
            this.ionChange.emit(this.value);
            this.updateText();
            this.checkListItemHasValue();
            if (this.controlOnChange && !this.muteControlOnChange) {
                this.controlOnChange(this.value);
            }
        }
        this.muteControlOnChange = false;
    }
    get value() {
        if (!this._value) {
            return undefined;
        }
        return new DateTimezone(new Date(this._value.date.getTime()), this._value.timezone);
    }
    clearValue() {
        this.value = undefined;
        if (this.controlOnTouched) {
            this.controlOnTouched();
        }
    }
    hasValue() {
        return !!this._value;
    }
    checkListItemHasValue() {
        if (this.listItem) {
            if (this.hasValue()) {
                this.listItem.classList.add("has-value");
            }
            else {
                this.listItem.classList.remove("has-value");
            }
        }
    }
    updateText() {
        if (this.hasValue()) {
            const options = Object.assign({}, this.displayFormat || defaultDateTimeFormat);
            if (this._value.timezone) {
                options.timeZone = this._value.timezone;
                if (!options.timeZoneName) {
                    options.timeZoneName = "short";
                }
            }
            if (!this._value.timezone) {
                options.timeZone = "UTC";
                options.timeZoneName = undefined;
            }
            this._text = this.intl.dateTimeFormat(this._value, options);
        }
        else {
            this._text = null;
        }
    }
    /*protected*/ clicked(ev) {
        if (ev.detail === 0 || this.disabled || this.readonly) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open(ev);
    }
    /*protected*/ keyuped() {
        this.open(undefined);
    }
    open(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.disabled || this.opened || this.readonly) {
                return;
            }
            const formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
            let timezone = this._value ? this._value.timezone : this.defaultTimezone;
            if (timezone === "current") {
                timezone = DateTimePickerInput_1.currentTimezone();
            }
            let value = this._value && this._value.date ? this._value.date : new Date();
            {
                if (!timezone || timezone === "UTC") {
                    value = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate(), value.getUTCHours(), value.getUTCMinutes(), 0, 0));
                }
                else {
                    value = new Date(value.getTime() + (DateTimezone.timezoneOffset(timezone, value) * 60 * 1000 * -1));
                }
            }
            let overlayTitle = this.overlayTitle;
            if (this.listItem && !overlayTitle) {
                let label = this.listItem.querySelector("ion-label");
                if (label) {
                    overlayTitle = label.innerText;
                }
            }
            const overlay = yield this.modalController.create({
                component: DateTimePickerOverlay,
                componentProps: {
                    formatOptions: formatOptions,
                    value: value,
                    timezone: this._value ? this._value.timezone : (this._value === undefined ? (this.defaultTimezone === "current" ? DateTimePickerInput_1.currentTimezone() : this.defaultTimezone) : undefined),
                    timezoneDisabled: this.timezoneDisabled,
                    title: overlayTitle
                },
                backdropDismiss: true,
                showBackdrop: true
            });
            overlay.present();
            this.overlayClosed((yield overlay.onDidDismiss()).data);
        });
    }
    overlayClosed(newValue) {
        if (newValue) {
            this.value = newValue;
        }
        if (this.controlOnTouched) {
            this.controlOnTouched();
        }
        if (this.listItem) {
            this.listItem.classList.add("item-has-focus");
            this.nativeInput.nativeElement.focus();
        }
    }
    writeValue(value) {
        this.muteControlOnChange = true;
        if (value instanceof Date || value instanceof DateTimezone || typeof value === "number") {
            this.value = value;
        }
        else {
            this.value = undefined;
        }
    }
    registerOnChange(fn) {
        this.controlOnChange = fn;
    }
    registerOnTouched(fn) {
        this.controlOnTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    nativeInputFocused() {
        if (this.listItem) {
            if (!this.listItem.classList.contains("item-has-focus")) {
                this.listItem.classList.add("item-has-focus");
                // if (!this.hasValue()) {
                //     this.open();
                // }
            }
        }
    }
    nativeInputBlured() {
        if (this.listItem) {
            this.listItem.classList.remove("item-has-focus");
        }
    }
    ngOnChanges(changes) {
        if (changes["displayFormat"]) {
            this.updateText();
        }
        if (changes["readonly"] || changes["disabled"]) {
            this.setupCss();
        }
    }
    ngOnInit() {
        this.updateText();
        this.setupCss();
    }
    setupCss() {
        if (this.listItem) {
            this.listItem.classList.add("item-input");
            if (this.readonly || this._disabled) {
                this.listItem.classList.remove("item-interactive");
            }
            else {
                this.listItem.classList.add("item-interactive");
            }
        }
    }
    ngAfterContentChecked() {
        //this.setItemInputControlCss();
    }
};
__decorate([
    ViewChild("nativeInput", { read: ElementRef, static: true }),
    __metadata("design:type", ElementRef)
], DateTimePickerInput.prototype, "nativeInput", void 0);
__decorate([
    HostBinding("class.datetime-disabled"),
    __metadata("design:type", Boolean)
], DateTimePickerInput.prototype, "_disabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DateTimePickerInput.prototype, "readonly", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DateTimePickerInput.prototype, "overlayTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DateTimePickerInput.prototype, "placeholder", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DateTimePickerInput.prototype, "ionChange", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DateTimePickerInput.prototype, "timezoneDisabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DateTimePickerInput.prototype, "defaultTimezone", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DateTimePickerInput.prototype, "disabled", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DateTimePickerInput.prototype, "displayFormat", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DateTimePickerInput.prototype, "pickerFormat", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], DateTimePickerInput.prototype, "value", null);
__decorate([
    HostListener("click", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UIEvent]),
    __metadata("design:returntype", void 0)
], DateTimePickerInput.prototype, "clicked", null);
__decorate([
    HostListener("keyup.space"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DateTimePickerInput.prototype, "keyuped", null);
DateTimePickerInput = DateTimePickerInput_1 = __decorate([
    Component({
        selector: "ionx-datetime",
        template: `
        <input #nativeInput
               type="text" 
               class="native-input" 
               readonly [attr.disabled]="disabled || null"
               [attr.placeholder]="placeholder || null"
               [attr.value]="text || null"
               (focus)="nativeInputFocused()" 
               (blur)="nativeInputBlured()"/>
    `,
        styles: [":host{position:relative;display:block;flex:1;width:100%;--padding-end:16px;--padding-start:16px;--padding-top:10px;--padding-bottom:10px}:host .native-input{padding-top:var(--padding-top,10px);padding-bottom:var(--padding-bottom,9px);padding-left:var(--padding-start,0);padding-right:var(--padding-end,0);display:inline-block;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:0;background:0 0;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host .native-input::-webkit-input-placeholder{opacity:.5}:host .native-input::-moz-placeholder{opacity:.5}:host .native-input:-ms-input-placeholder{opacity:.5}:host .native-input::-ms-input-placeholder{opacity:.5}:host .native-input::placeholder{opacity:.5}:host .native-input:-webkit-autofill{background-color:transparent}:host-context(.md){--padding-bottom:11px}:host-context(.item-label-stacked){--padding-end:0px;--padding-start:0px;--padding-top:9px;--padding-bottom:9px}:host-context(.ios) .native-input{--padding-top:9px;--padding-bottom:8px}"]
    }),
    __metadata("design:paramtypes", [ElementRef,
        IntlService,
        ModalController,
        NgControl])
], DateTimePickerInput);

let DateTimePickerModule = class DateTimePickerModule {
};
DateTimePickerModule = __decorate([
    NgModule({
        declarations: [DateTimePickerInput, DateTimePickerOverlay],
        entryComponents: [DateTimePickerOverlay],
        exports: [DateTimePickerInput],
        imports: [CommonModule, FormsModule, IonicModule, IntlModule, SelectModule]
    })
], DateTimePickerModule);

const dialogData = Symbol();

const dialogInstance = Symbol();

let Dialog = class Dialog {
    constructor(injector, sanitizer, elementRef, modalController, resolver, changeDetectorRef) {
        this.injector = injector;
        this.sanitizer = sanitizer;
        this.elementRef = elementRef;
        this.modalController = modalController;
        this.resolver = resolver;
        this.changeDetectorRef = changeDetectorRef;
        this.didLoad = new EventEmitter();
    }
    set buttons(buttons) {
        this._buttons = buttons;
        this.changeDetectorRef.detectChanges();
    }
    get buttons() {
        return this._buttons;
    }
    set message(message) {
        if (typeof message === "string") {
            this.messageText = this.sanitizer.bypassSecurityTrustHtml(message);
            if (this.messageComponent) {
                this.messageComponent.destroy();
            }
            this.messageComponent = undefined;
        }
        else if (message) {
            this.messageText = undefined;
            this.messageComponentContainer.clear();
            if (!(message instanceof ComponentRef)) {
                let type;
                let params;
                if (Array.isArray(message)) {
                    type = message.length >= 1 ? message[0] : undefined;
                    params = message.length >= 2 ? message[1] : undefined;
                }
                else {
                    type = message;
                }
                message = this.resolver.resolveComponentFactory(type).create(this.injector);
                if (params) {
                    for (const param of Object.keys(params)) {
                        message.instance[param] = params[param];
                    }
                }
            }
            this.messageComponent = message;
            this.messageComponent.instance[dialogInstance] = this;
            this.messageComponentContainer.insert(this.messageComponent.hostView);
        }
    }
    /*private*/ buttonClicked(button) {
        const value = this.messageComponent && this.messageComponent.instance[dialogData] ? this.messageComponent.instance[dialogData]() : undefined;
        if (button.handler) {
            const res = button.handler(value);
            if ((typeof res === "boolean" && res) || typeof res !== "boolean") {
                this.modalController.dismiss(value, button.role);
            }
            return;
        }
        else {
            this.modalController.dismiss(button.role !== "cancel" ? value : undefined, button.role);
        }
    }
    ngOnDestroy() {
        if (this.messageComponent) {
            this.messageComponent.instance[dialogInstance] = undefined;
            this.messageComponent.destroy();
        }
    }
    ngOnInit() {
        const modal = this.elementRef.nativeElement.closest("ion-modal");
        modal.style.setProperty("--width", "300px");
        modal.style.setProperty("--height", "auto");
        modal.style.setProperty("--max-width", "90%");
        modal.style.setProperty("--max-height", "90%");
        if (document.querySelector("html.ios")) {
            modal.style.setProperty("--border-radius", "10px");
        }
        else {
            modal.style.setProperty("--border-radius", "4px");
            modal.style.setProperty("--box-shadow", "0 28px 48px rgba(0,0,0,0.4)");
        }
    }
    ionViewDidEnter() {
        const input = this.elementRef.nativeElement.querySelector("input");
        if (input) {
            input.focus();
        }
    }
};
__decorate([
    ViewChild("messageComponentContainer", { read: ViewContainerRef, static: true }),
    __metadata("design:type", ViewContainerRef)
], Dialog.prototype, "messageComponentContainer", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Dialog.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], Dialog.prototype, "buttons", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Dialog.prototype, "message", null);
Dialog = __decorate([
    Component({
        selector: "ionx-dialog",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: "<div ionx--content>\n\n    <div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n    <div ionx--message>\n\n        <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n        <ng-template #messageComponentContainer></ng-template>\n\n    </div>\n\n</div>\n\n<ion-footer *ngIf=\"_buttons && _buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of _buttons\">\n                <span>{{button.text}}</span>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: [":host-context(.md){--ionx--message-font-size:16px;--ionx--header-font-size:20px;--ionx--text-align:left}:host-context(.ios){--ionx--message-font-size:15px;--ionx--header-font-size:18px;--ionx--text-align:center;--ionx--buttons-align:center;--ionx--header-font-weight:600}:host{display:flex;contain:content;position:relative}:host [ionx--message]{font-size:var(--ionx--message-font-size);text-align:var(--ionx--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--ionx--header-font-size);font-weight:var(--ionx--header-font-weight,500);margin:16px;text-align:var(--ionx--text-align)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none}:host ion-footer ionx-buttons{justify-content:var(--ionx--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:600}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios) ion-footer ion-button{flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,.2))))}"]
    }),
    __metadata("design:paramtypes", [Injector,
        DomSanitizer,
        ElementRef,
        ModalController,
        ComponentFactoryResolver,
        ChangeDetectorRef])
], Dialog);

let DialogController = class DialogController {
    constructor(modalController) {
        this.modalController = modalController;
    }
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.modalController.create(Object.assign({}, options, {
                component: Dialog,
                componentProps: {
                    header: options.header,
                    message: options.message,
                    buttons: options.buttons
                }
            }));
        });
    }
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    dismiss(data, role, id) {
        return this.modalController.dismiss(data, role, id);
    }
};
DialogController = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ModalController])
], DialogController);

let DialogModule = class DialogModule {
};
DialogModule = __decorate([
    NgModule({
        declarations: [Dialog],
        imports: [IntlModule, IonicModule, CommonModule, ButtonsModule],
        entryComponents: [Dialog],
        providers: [DialogController]
    })
], DialogModule);

let ExpandingSearchbarStyles = class ExpandingSearchbarStyles {
};
ExpandingSearchbarStyles = __decorate([
    Component({
        template: "",
        styles: [":host{display:none}::ng-deep ion-searchbar.ionx-expanding-searchbar{position:absolute;top:0;left:0;width:0;overflow:hidden;padding:0;margin:0}::ng-deep ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{opacity:1;width:100%}::ng-deep ion-searchbar.ionx-expanding-searchbar:not(.searchbar-show-cancel) .searchbar-clear-button{display:block!important}::ng-deep ion-toolbar ion-searchbar.ionx-expanding-searchbar-expanded{padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end)}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:8px;padding-right:8px}::ng-deep .ios ion-searchbar.ionx-expanding-searchbar{height:36px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:0;padding-right:0}::ng-deep .ionx-expanding-searchbar-parent>:not(.ionx-expanding-searchbar){visibility:hidden!important}"]
    })
], ExpandingSearchbarStyles);

const expandedCssClass = "ionx-expanding-searchbar-expanded";
const parentCssClass = "ionx-expanding-searchbar-parent";
let stylesInjected = false;
let ExpandingSearchbar = class ExpandingSearchbar {
    constructor(injector, resolver, appRef, element, searchbar) {
        this.appRef = appRef;
        this.element = element;
        this.searchbar = searchbar;
        this.subscriptions = [];
        if (!stylesInjected) {
            let styles = resolver.resolveComponentFactory(ExpandingSearchbarStyles).create(injector);
            this.appRef.attachView(styles.hostView);
        }
    }
    get parentElement() {
        let parent = this.element.nativeElement.parentElement;
        if (parent) {
            return parent;
        }
    }
    get expanded() {
        return this.element.nativeElement.classList.contains(expandedCssClass);
    }
    set expanded(expanded) {
        this.parentElement;
        if (expanded) {
            this.element.nativeElement.classList.add(expandedCssClass);
            this.parentElement.classList.add(parentCssClass);
            this.searchbar.setFocus();
        }
        else {
            this.element.nativeElement.classList.remove(expandedCssClass);
            this.parentElement.classList.remove(parentCssClass);
            //this.searchbar.value = "";
            setTimeout(() => this.element.nativeElement.querySelector(".searchbar-input").blur(), 50);
        }
    }
    expand() {
        this.expanded = true;
    }
    collapseIfPossible(cleared) {
        if (this.expanded && (cleared || !this.searchbar.value)) {
            setTimeout(() => {
                this.expanded = false;
            }, cleared ? 250 : 0);
        }
    }
    ngOnInit() {
        //this.subscriptions.push(this.searchbar.ionBlur.subscribe(() => this.collapseIfPossible()));
        this.subscriptions.push(this.searchbar.ionClear.subscribe(() => this.collapseIfPossible(true)));
        this.element.nativeElement.classList.add("ionx-expanding-searchbar");
    }
    ngOnDestroy() {
        unsubscribe(this.subscriptions);
    }
};
__decorate([
    Input("ionx-expanded"),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ExpandingSearchbar.prototype, "expanded", null);
ExpandingSearchbar = __decorate([
    Directive({
        selector: "ion-searchbar[ionx-expanding-searchbar]",
        exportAs: "ionxExpandingSearchbar"
    }),
    __metadata("design:paramtypes", [Injector,
        ComponentFactoryResolver,
        ApplicationRef,
        ElementRef,
        IonSearchbar])
], ExpandingSearchbar);

let ExpandingSearchbarModule = class ExpandingSearchbarModule {
};
ExpandingSearchbarModule = __decorate([
    NgModule({
        declarations: [ExpandingSearchbar, ExpandingSearchbarStyles],
        exports: [ExpandingSearchbar],
        imports: [IonicModule]
    })
], ExpandingSearchbarModule);

let FormHeading = class FormHeading {
    constructor() {
    }
};
__decorate([
    HostBinding("attr.sticky"),
    Input(),
    __metadata("design:type", Boolean)
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
    }),
    __metadata("design:paramtypes", [])
], FormHeading);

function findParentImpl(element) {
    if (!element) {
        return;
    }
    if (element.scrollHeight >= element.clientHeight) {
        const overflowY = window.getComputedStyle(element).overflowY;
        if (overflowY !== "visible" && overflowY !== "hidden") {
            return element;
        }
    }
    if (element.assignedSlot) {
        let p = findParentImpl(element.assignedSlot.parentElement);
        if (p) {
            return p;
        }
    }
    return findParentImpl(element.parentElement);
}
function scrollIntoView(element, scrollBehavior) {
    let parent = findParentImpl(element);
    if (parent) {
        let top = element.offsetTop;
        if (element.offsetParent) {
            let offsetParent = element.offsetParent;
            while (offsetParent !== parent && !!offsetParent) {
                top += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent;
            }
        }
        parent.scrollTo({ top: top, behavior: scrollBehavior });
        return;
    }
    element.scrollIntoView();
}

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
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], FormHelper.prototype, "readonly", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], FormHelper.prototype, "busy", null);
__decorate([
    ContentChildren(FormControlName, { descendants: true }),
    __metadata("design:type", QueryList)
], FormHelper.prototype, "contentControls", void 0);
FormHelper = __decorate([
    Directive({
        selector: "[ionx-form-helper], [ionxFormHelper]",
        exportAs: "ionxFormHelper"
    }),
    __param(1, Optional()), __param(2, Optional()),
    __metadata("design:paramtypes", [ElementRef, NgForm, FormGroupDirective])
], FormHelper);

let FormItem = class FormItem {
};
FormItem = __decorate([
    Component({
        selector: "ionx-form-item",
        template: `<ng-content select="ion-item"></ng-content><ng-content select="ionx-form-item-error"></ng-content><ng-content select="ionx-form-item-hint"></ng-content><ng-content></ng-content>`
    })
], FormItem);

let FormItemError = class FormItemError {
    constructor(formGroup) {
        this.formGroup = formGroup;
        this.markedAs = "touched";
    }
    set control(control) {
        if (control instanceof AbstractControl) {
            this._control = control;
        }
        else if (control) {
            this._control = this.formGroup.form.controls[control];
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], FormItemError.prototype, "icon", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], FormItemError.prototype, "markedAs", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], FormItemError.prototype, "control", null);
FormItemError = __decorate([
    Component({
        selector: "ionx-form-item-error",
        template: `
        <ion-icon [name]="icon" *ngIf="!!icon"></ion-icon>
        <label>
            <ng-template [ngIf]="_control">{{_control | intlValidationErrorMessage}}</ng-template>
            <ng-content></ng-content>
        </label>
    `,
        host: {
            "[class.ionx--visible]": "!_control || !!(_control.invalid && _control[markedAs])"
        },
        styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:flex}"]
    }),
    __metadata("design:paramtypes", [FormGroupDirective])
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
    Input(),
    __metadata("design:type", String)
], FormItemHint.prototype, "icon", void 0);
__decorate([
    ViewChild("labelComponentContainer", { read: ViewContainerRef, static: true }),
    __metadata("design:type", ViewContainerRef)
], FormItemHint.prototype, "labelComponentContainer", void 0);
__decorate([
    Input(),
    __metadata("design:type", ComponentRef),
    __metadata("design:paramtypes", [ComponentRef])
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
        styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-medium)}"]
    }),
    __metadata("design:paramtypes", [])
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

const defaultOptions = {
    selector: "img",
    container: window,
    scroll: null,
    threshold: 300,
    throttle: 150,
    dataSrc: "original",
    dataSrcSet: "original-set",
    dataAlternate: "alternate",
    classLoading: "ionx-lazy-image-loading",
    classLoaded: "ionx-lazy-image-loaded",
    skipInvisible: true,
    callbackLoad: null,
    callbackError: null,
    callbackSet: null,
    callbackProcessed: null
};
function _isInsideViewport(element, container, threshold) {
    var ownerDocument, documentTop, documentLeft;
    function _getDocumentWidth() {
        return window.innerWidth || (ownerDocument.documentElement.clientWidth || document.body.clientWidth);
    }
    function _getDocumentHeight() {
        return window.innerHeight || (ownerDocument.documentElement.clientHeight || document.body.clientHeight);
    }
    function _getTopOffset(element) {
        return element.getBoundingClientRect().top + documentTop - ownerDocument.documentElement.clientTop;
    }
    function _getLeftOffset(element) {
        return element.getBoundingClientRect().left + documentLeft - ownerDocument.documentElement.clientLeft;
    }
    function _isBelowViewport() {
        var fold;
        if (container === window) {
            fold = _getDocumentHeight() + documentTop;
        }
        else {
            fold = _getTopOffset(container) + container.offsetHeight;
        }
        return fold <= _getTopOffset(element) - threshold;
    }
    function _isAtRightOfViewport() {
        var fold;
        if (container === window) {
            fold = _getDocumentWidth() + window.pageXOffset;
        }
        else {
            fold = _getLeftOffset(container) + _getDocumentWidth();
        }
        return fold <= _getLeftOffset(element) - threshold;
    }
    function _isAboveViewport() {
        var fold;
        if (container === window) {
            fold = documentTop;
        }
        else {
            fold = _getTopOffset(container);
        }
        return fold >= _getTopOffset(element) + threshold + element.offsetHeight;
    }
    function _isAtLeftOfViewport() {
        var fold;
        if (container === window) {
            fold = documentLeft;
        }
        else {
            fold = _getLeftOffset(container);
        }
        return fold >= _getLeftOffset(element) + threshold + element.offsetWidth;
    }
    ownerDocument = element.ownerDocument;
    documentTop = window.pageYOffset || ownerDocument.body.scrollTop;
    documentLeft = window.pageXOffset || ownerDocument.body.scrollLeft;
    return !_isBelowViewport() && !_isAboveViewport() && !_isAtRightOfViewport() && !_isAtLeftOfViewport();
}
function _now() {
    var d = new Date();
    return d.getTime();
}
function _convertToArray(nodeSet) {
    return Array.prototype.slice.call(nodeSet);
}
function setSourcesForPicture(element, srcsetDataAttribute) {
    let parent = element.parentElement;
    if (parent.tagName !== 'PICTURE') {
        return;
    }
    for (let i = 0; i < parent.children.length; i++) {
        let pictureChild = parent.children[i];
        if (pictureChild.tagName === 'SOURCE') {
            let sourceSrcset = pictureChild.getAttribute('data-' + srcsetDataAttribute);
            if (sourceSrcset) {
                pictureChild.setAttribute('srcset', sourceSrcset);
            }
        }
    }
}
/**
 * Sets sources (e.g. src) for lazy load element.
 * @param element Element, whose image to be loaded.
 * @param srcsetDataAttribute
 * @param srcDataAttribute
 */
function setSources(element, srcsetDataAttribute, srcDataAttribute) {
    let tagName = element.tagName.toUpperCase();
    let elementSrc = element.getAttribute("data-" + srcDataAttribute);
    if (tagName === "IFRAME") {
        if (elementSrc) {
            element.setAttribute("src", elementSrc);
        }
        return;
    }
    else {
        if (tagName === "IMG") {
            setSourcesForPicture(element, srcsetDataAttribute);
        }
        let dataTarget = element;
        if (element["__ionxLazyImageTmpImg"]) {
            dataTarget = element["__ionxLazyImageTmpImg"];
        }
        let imgSrcSet = element.getAttribute("data-" + srcsetDataAttribute);
        if (imgSrcSet) {
            dataTarget.setAttribute("srcset", imgSrcSet);
        }
        if (elementSrc) {
            dataTarget.setAttribute("src", elementSrc);
        }
        return;
    }
    //if (elementSrc) element.style.backgroundImage = "url(" + elementSrc + ")";
}
function _bind(fn, obj) {
    return function () {
        return fn.apply(obj, arguments);
    };
}
var instanceCounter = 0;
var instances = {};
class LazyLoad {
    constructor(options) {
        this.id = (++instanceCounter) + "";
        instances[this.id] = this;
        this._options = Object.assign({}, defaultOptions, options);
        this._queryOriginNode = this._options.container === window ? document : this._options.container;
        this._previousLoopTime = 0;
        this._loopTimeout = null;
        this._handleScrollFn = _bind(this.handleScroll, this);
        window.addEventListener("resize", this._handleScrollFn);
        this.update();
    }
    get container() {
        return this._queryOriginNode;
    }
    _showOnAppear(element) {
        let errorCallback = () => {
            let eventTarget = element;
            if (element["__ionxLazyImageTmpImg"]) {
                eventTarget = element["__ionxLazyImageTmpImg"];
            }
            let alternate = this._options.dataAlternate && element.getAttribute("data-" + this._options.dataAlternate);
            if (alternate && eventTarget["src"] != alternate) {
                eventTarget["src"] = alternate;
                return;
            }
            delete element["__ionxLazyImageTmpImg"];
            eventTarget.removeEventListener("load", loadCallback);
            eventTarget.removeEventListener("error", errorCallback);
            element.classList.remove(this._options.classLoading);
            element.lazyLoadError = true;
            if (this._options.callbackError) {
                this._options.callbackError.callback_error(element);
            }
        };
        let loadCallback = () => {
            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (this._options === null) {
                return;
            }
            let eventTarget = element;
            // if target element is not <img>, the real target of onload callback is temporary image
            if (element["__ionxLazyImageTmpImg"]) {
                eventTarget = element["__ionxLazyImageTmpImg"];
                element.style.backgroundImage = `url(${eventTarget.src})`;
                delete element["__ionxLazyImageTmpImg"];
            }
            element.lazyLoadError = false;
            if (this._options.callbackLoad) {
                this._options.callbackLoad(element);
            }
            element.classList.remove(this._options.classLoading);
            element.classList.add(this._options.classLoaded);
            eventTarget.removeEventListener("load", loadCallback);
            eventTarget.removeEventListener("error", errorCallback);
        };
        element.classList.add(this._options.classLoading);
        if (element.tagName.toUpperCase() === "IMG" || element.tagName.toUpperCase() === "IFRAME") {
            element.addEventListener("load", loadCallback);
            element.addEventListener("error", errorCallback);
        }
        else {
            let tmpImg = new Image();
            tmpImg.addEventListener("load", loadCallback);
            tmpImg.addEventListener("error", errorCallback);
            element["__ionxLazyImageTmpImg"] = tmpImg;
        }
        setSources(element, this._options.dataSrcSet, this._options.dataSrc);
        if (this._options.callbackSet) {
            this._options.callbackSet(element);
        }
    }
    _loopThroughElements() {
        let elementsLength = (!this._elements) ? 0 : this._elements.length;
        let processedIndexes = [];
        for (let i = 0; i < elementsLength; i++) {
            let element = this._elements[i];
            /* If must skip_invisible and element is invisible, skip it */
            if (this._options.skipInvisible && (element.offsetParent === null)) {
                continue;
            }
            if (_isInsideViewport(element, this._options.container, this._options.threshold)) {
                this._showOnAppear(element);
                /* Marking the element as processed. */
                processedIndexes.push(i);
                element.lazyLoadProcessed = true;
            }
        }
        /* Removing processed elements from this._elements. */
        while (processedIndexes.length > 0) {
            this._elements.splice(processedIndexes.pop(), 1);
            if (this._options.callbackProcessed) {
                this._options.callbackProcessed(this._elements.length);
            }
        }
        /* Stop listening to scroll event when 0 elements remains */
        if (elementsLength === 0) {
            this._stopScrollHandler();
        }
    }
    ;
    _purgeElements() {
        let elementsToPurge = [];
        for (let i = 0; i < this._elements.length; i++) {
            let element = this._elements[i];
            /* If the element has already been processed, skip it */
            if (element.lazyLoadProcessed) {
                elementsToPurge.push(i);
            }
        }
        /* Removing elements to purge from this._elements. */
        while (elementsToPurge.length > 0) {
            this._elements.splice(elementsToPurge.pop(), 1);
        }
    }
    ;
    _startScrollHandler() {
        if (!this._isHandlingScroll) {
            this._isHandlingScroll = true;
            this._options.container.addEventListener("scroll", this._handleScrollFn);
            if (this._options.scroll) {
                this._options.scroll.addEventListener("scroll", this._handleScrollFn);
            }
        }
    }
    ;
    _stopScrollHandler() {
        if (this._isHandlingScroll) {
            this._isHandlingScroll = false;
            this._options.container.removeEventListener("scroll", this._handleScrollFn);
            if (this._options.scroll) {
                this._options.scroll.removeEventListener("scroll", this._handleScrollFn);
            }
        }
    }
    ;
    handleScroll() {
        var remainingTime, now, throttle;
        // IE8 fix for destroy() malfunctioning
        if (!this._options) {
            return;
        }
        now = _now();
        throttle = this._options.throttle;
        if (throttle !== 0) {
            remainingTime = throttle - (now - this._previousLoopTime);
            if (remainingTime <= 0 || remainingTime > throttle) {
                if (this._loopTimeout) {
                    clearTimeout(this._loopTimeout);
                    this._loopTimeout = null;
                }
                this._previousLoopTime = now;
                this._loopThroughElements();
            }
            else if (!this._loopTimeout) {
                this._loopTimeout = setTimeout(_bind(function () {
                    this._previousLoopTime = _now();
                    this._loopTimeout = null;
                    this._loopThroughElements();
                }, this), remainingTime);
            }
        }
        else {
            this._loopThroughElements();
        }
    }
    ;
    update(options) {
        this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._options.selector));
        if (options && options.retryError) {
            for (let element of this._elements) {
                if (element.lazyLoadProcessed && element.lazyLoadError) {
                    element.lazyLoadProcessed = false;
                }
            }
        }
        this._purgeElements();
        this._loopThroughElements();
        this._startScrollHandler();
    }
    destroy() {
        window.removeEventListener("resize", this._handleScrollFn);
        if (this._loopTimeout) {
            clearTimeout(this._loopTimeout);
            this._loopTimeout = null;
        }
        this._stopScrollHandler();
        this._elements = null;
        this._queryOriginNode = null;
        this._options = null;
        delete instances[this.id];
    }
}
function ensureLazyImagesLoaded(root, options) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let instanceId in instances) {
            let loader = instances[instanceId];
            let container = loader.container;
            if (root === container) {
                loader.update({ retryError: options && options.retryError });
            }
            else {
                let parent = container.parentElement;
                while (parent && parent !== root) {
                    parent = parent.parentElement;
                }
                if (parent) {
                    loader.update({ retryError: options && options.retryError });
                }
            }
        }
    });
}

let ImageLoader = class ImageLoader {
    constructor(element) {
        this.element = element;
    }
    set src(value) {
        let old = this._src;
        this._src = value;
        if (old != this._src) {
            this.reload();
        }
    }
    get src() {
        return this._src;
    }
    set src2(value) {
        this.src = value;
    }
    set alternate(value) {
        let old = this._alternate;
        this._alternate = value;
        if (old != this._alternate) {
            this.reload();
        }
    }
    set alternate2(value) {
        this.alternate = value;
    }
    set cssClasses(value) {
        this._cssClasses = value;
    }
    set cssClasses2(value) {
        this._cssClasses = value;
    }
    set cssClassesTarget(value) {
        this._cssClassesTarget = value;
    }
    set cssClassesParent(value) {
        this._cssClassesTarget = value;
    }
    reload() {
        if (!this.loading && this.initialized) {
            this.loaded = false;
            this.error = false;
            if (this._cssClasses) {
                let target = this._cssClassesTarget ? this.element.nativeElement.closest(this._cssClassesTarget) : this.element.nativeElement;
                if (this._cssClasses.loaded) {
                    target.classList.remove(this._cssClasses.loaded);
                }
                if (this._cssClasses.error) {
                    target.classList.remove(this._cssClasses.error);
                }
            }
            this.load();
        }
    }
    load() {
        if (this.loaded || this.error || !this._src || this.loading) {
            return;
        }
        this.loading = true;
        if (this._cssClasses && this._cssClasses.loading) {
            this.element.nativeElement.classList.add(this._cssClasses.loading);
        }
        let element = this.element.nativeElement;
        let img;
        // if host element is not <img>, we need to create tmp 
        if (element.tagName.toLowerCase() != "img") {
            img = this.tmpImg = new Image();
        }
        else {
            img = element;
        }
        img.onload = () => {
            if (img !== element) {
                element.style.backgroundImage = `url(${img.src})`;
            }
            img.onerror = undefined;
            img.onload = undefined;
            this.tmpImg = undefined;
            this.loaded = true;
            this.loading = false;
            this.error = false;
            if (this._cssClasses) {
                let target = this._cssClassesTarget ? element.closest(this._cssClassesTarget) : element;
                if (this._cssClasses.loading) {
                    target.classList.remove(this._cssClasses.loading);
                }
                if (this._cssClasses.loaded) {
                    target.classList.add(this._cssClasses.loaded);
                }
            }
        };
        img.onerror = () => {
            if (this._alternate && this._alternate != img.src) {
                img.src = this._alternate;
                return;
            }
            img.onerror = undefined;
            img.onload = undefined;
            this.tmpImg = undefined;
            this.loading = false;
            this.loaded = false;
            this.error = true;
            if (this._cssClasses) {
                let target = this._cssClassesTarget ? element.closest(this._cssClassesTarget) : element;
                if (this._cssClasses.loading) {
                    target.classList.remove(this._cssClasses.loading);
                }
                if (this._cssClasses.error) {
                    target.classList.add(this._cssClasses.error);
                }
            }
        };
        img.src = this._src;
    }
    ngAfterViewInit() {
        this.initialized = true;
        this.element.nativeElement["ionxImageLoader"] = this;
        this.load();
    }
    ngOnDestroy() {
        if (this.element.nativeElement) {
            delete this.element.nativeElement["ionxImageLoader"];
        }
    }
};
__decorate([
    Input("src"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageLoader.prototype, "src", null);
__decorate([
    Input("ionx-image-loader"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageLoader.prototype, "src2", null);
__decorate([
    Input("alternate"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageLoader.prototype, "alternate", null);
__decorate([
    Input("ionx-image-loader-alternate"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageLoader.prototype, "alternate2", null);
__decorate([
    Input("css-classes"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ImageLoader.prototype, "cssClasses", null);
__decorate([
    Input("ionx-image-loader-css-classes"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ImageLoader.prototype, "cssClasses2", null);
__decorate([
    Input("css-classes-target"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageLoader.prototype, "cssClassesTarget", null);
__decorate([
    Input("ionx-image-loader-css-classes-target"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageLoader.prototype, "cssClassesParent", null);
ImageLoader = __decorate([
    Directive({
        selector: "[ionx-image-loader]",
        host: {
            "[attr.ionx-image-loader]": "true"
        }
    }),
    __metadata("design:paramtypes", [ElementRef])
], ImageLoader);
function ensureImagesLoaded(root, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let images = root.querySelectorAll("[ionx-image-loader]");
        for (let i = 0; i < images.length; i++) {
            let image = images.item(i);
            if (!image.ionxImageLoader || !image.ionxImageLoader.src || image.ionxImageLoader.loaded || (image.ionxImageLoader.error && (!options || !options.retryError))) {
                continue;
            }
            image.ionxImageLoader.reload();
        }
        if (options && options.lazy) {
            yield ensureLazyImagesLoaded(root, { retryError: options && options.retryError });
        }
    });
}

let ImageLoaderModule = class ImageLoaderModule {
};
ImageLoaderModule = __decorate([
    NgModule({
        declarations: [ImageLoader],
        exports: [ImageLoader]
    })
], ImageLoaderModule);

IonBackButtonDelegate.prototype.onClick = () => null;
let IonicBackButtonFix = class IonicBackButtonFix {
    constructor(router, routerOutlet, navCtrl, elementRef) {
        this.router = router;
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
    }
    set defaultHref(value) {
        this.elementRef.nativeElement.defaultHref = value;
    }
    get defaultHref() {
        return this.elementRef.nativeElement.defaultHref;
    }
    onClick(ev) {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            this.navCtrl.back({ animated: true });
            ev.preventDefault();
        }
        else if (this.router && this.defaultHref != null) {
            this.navCtrl.navigateBack(this.defaultHref);
            ev.preventDefault();
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], IonicBackButtonFix.prototype, "defaultHref", null);
__decorate([
    HostListener("click", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], IonicBackButtonFix.prototype, "onClick", null);
IonicBackButtonFix = __decorate([
    Directive({
        selector: "ion-back-button"
    }),
    __metadata("design:paramtypes", [Router, IonRouterOutlet, NavController, ElementRef])
], IonicBackButtonFix);

let IonicInputFix = class IonicInputFix {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tabIndex) {
                this.element.nativeElement.removeAttribute("tabIndex");
                yield waitTill(() => !!this.element.nativeElement.shadowRoot && !!this.element.nativeElement.shadowRoot.querySelector(".native-input"));
                let realInput = this.element.nativeElement.shadowRoot.querySelector(".native-input");
                realInput.setAttribute("tabIndex", this.tabIndex);
            }
        });
    }
};
__decorate([
    Input("tabIndex"),
    __metadata("design:type", String)
], IonicInputFix.prototype, "tabIndex", void 0);
IonicInputFix = __decorate([
    Directive({
        selector: "ion-input[ionfix-input]"
    }),
    __metadata("design:paramtypes", [ElementRef])
], IonicInputFix);

let IonicItemTargetFix = class IonicItemTargetFix {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.target) {
                for (let i = 1; i < 20; i++) {
                    const a = (this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".item-native")) || undefined;
                    if (!a) {
                        yield sleep(i * 100);
                    }
                    else {
                        a.setAttribute("target", this.target);
                    }
                }
            }
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], IonicItemTargetFix.prototype, "target", void 0);
IonicItemTargetFix = __decorate([
    Directive({
        selector: "ion-item[target]"
    }),
    __metadata("design:paramtypes", [ElementRef])
], IonicItemTargetFix);

let IonicFixModule = class IonicFixModule {
};
IonicFixModule = __decorate([
    NgModule({
        declarations: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix],
        exports: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix]
    })
], IonicFixModule);

var LazyImage_1;
let LazyImage = LazyImage_1 = class LazyImage {
    constructor(element, renderer, container) {
        this.element = element;
        this.renderer = renderer;
        this.container = container;
    }
    set src(value) {
        this._src = value;
        this.reset();
    }
    set alternate(value) {
        this._alternate = value;
        this.reset();
    }
    reset() {
        if (this._src) {
            this.renderer.setElementClass(this.element.nativeElement, "ionx-lazy-image", true);
            this.renderer.setElementAttribute(this.element.nativeElement, "data-original", this._src);
        }
        if (this._alternate) {
            this.renderer.setElementAttribute(this.element.nativeElement, "data-alternate", this._alternate);
        }
    }
    revalidate() {
        // children.length > 1 because this is also included in children query
        if (this.container && this.children.length > 1) {
            this.container.revalidate();
        }
    }
    ngAfterContentInit() {
        this.children.changes.subscribe(() => this.revalidate());
        this.revalidate();
    }
};
__decorate([
    ContentChildren(LazyImage_1, { descendants: true }),
    __metadata("design:type", QueryList)
], LazyImage.prototype, "children", void 0);
__decorate([
    Input("ionx-lazy-image"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], LazyImage.prototype, "src", null);
__decorate([
    Input("ionx-lazy-image-alternate"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], LazyImage.prototype, "alternate", null);
LazyImage = LazyImage_1 = __decorate([
    Directive({
        selector: "[ionx-lazy-image]"
    }),
    __param(2, Optional()), __param(2, Inject(forwardRef(() => LazyImageContainer))),
    __metadata("design:paramtypes", [ElementRef, Renderer, LazyImageContainer])
], LazyImage);
let LazyImageContainer = class LazyImageContainer {
    constructor(element) {
        this.element = element;
    }
    revalidate() {
        if (this.lazyLoad) {
            this.lazyLoad.update();
            let rect = this.element.nativeElement.getBoundingClientRect();
            if (rect.width == 0 || rect.height == 0) {
                //setTimeout(() => this.revalidate(), 200);
            }
            //console.log(this.children);
            //window.dispatchEvent(new Event("resize"));
        }
    }
    ngOnInit() {
        this.initLazyLoad();
    }
    ngAfterContentInit() {
        this.children.changes.subscribe(() => this.revalidate());
        if (this.children.length > 0) {
            this.revalidate();
        }
    }
    ngOnDestroy() {
        if (this.lazyLoad) {
            this.lazyLoad.destroy();
        }
    }
    initLazyLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {};
            options.selector = ".ionx-lazy-image";
            options.container = this.element.nativeElement;
            if (this.element.nativeElement.tagName.toLowerCase() === "ion-content") {
                for (let i = 0; i < 40; i++) {
                    options.scroll = this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".inner-scroll");
                    if (!options.scroll) {
                        yield sleep(50);
                    }
                    else {
                        break;
                    }
                }
            }
            this.lazyLoad = new LazyLoad(options);
        });
    }
};
__decorate([
    ContentChildren(LazyImage, { descendants: true }),
    __metadata("design:type", QueryList)
], LazyImageContainer.prototype, "children", void 0);
LazyImageContainer = __decorate([
    Directive({
        selector: "ion-content[ionx-lazy-image], [ionx-lazy-image-container]"
    }),
    __metadata("design:paramtypes", [ElementRef])
], LazyImageContainer);

let LazyImageModule = class LazyImageModule {
};
LazyImageModule = __decorate([
    NgModule({
        declarations: [LazyImage, LazyImageContainer],
        exports: [LazyImage, LazyImageContainer]
    })
], LazyImageModule);

let Loader = class Loader {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.progressType = "determinate";
        this.progressValue = 0;
        this.progressBuffer = 0;
    }
    get progressPercentVisible() {
        return typeof this.progressPercent === "number";
    }
    get spinnerMode() {
        return this.mode === "spinner";
    }
    get progressMode() {
        return this.mode === "progress";
    }
    dismiss() {
        return this.popover.dismiss();
    }
    ngOnInit() {
        this.popover = this.elementRef.nativeElement.closest("ion-popover");
        if (this.instanceCallback) {
            this.instanceCallback(this);
        }
    }
    ngOnDestroy() {
        this.popover = undefined;
        this.instanceCallback = undefined;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Function)
], Loader.prototype, "instanceCallback", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Loader.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Loader.prototype, "message", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Loader.prototype, "mode", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Loader.prototype, "progressMessage", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Loader.prototype, "progressType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Loader.prototype, "progressValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Loader.prototype, "progressBuffer", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], Loader.prototype, "progressPercent", void 0);
Loader = __decorate([
    Component({
        selector: "ionx-loader",
        template: "<div style=\"display: flex; align-items: center\">\n\n    <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n        <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n        <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n    </div>\n\n</div>\n\n<ion-progress-bar style=\"margin: 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n\n<div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n    <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n    <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n</div>\n",
        styles: [`:host { display: block }`]
    }),
    __metadata("design:paramtypes", [ElementRef])
], Loader);

let LoaderController = class LoaderController {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    present(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let loader;
            const loaderInstance = (instance) => loader = instance;
            const popover = yield this.popoverController.create({
                animated: false,
                cssClass: "ionx-popover-flex",
                backdropDismiss: false,
                keyboardClose: false,
                component: Loader,
                componentProps: {
                    instanceCallback: (loader) => loaderInstance(loader),
                    header: options.header,
                    message: options.message,
                    mode: options.mode || "spinner"
                }
            });
            // popover.style.setProperty("--width", "100%");
            // popover.style.setProperty("--maxHeight", "100%");
            // const content = popover.querySelector(".popover-content") as HTMLElement;
            // content.style.background = "transparent";
            // content.style.borderRadius = "0px";
            // content.style.left = "0px !important";
            // content.style.top = "0px !important";
            // content.style.height = "100%";
            // content.style.width = "100%";
            // content.style.maxWidth = "none";
            // content.style.maxHeight = "none";
            // content.style.boxShadow = "none";
            popover.present();
            yield waitTill(() => !!loader);
            return loader;
        });
    }
};
LoaderController = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PopoverController])
], LoaderController);

let LoaderModule = class LoaderModule {
};
LoaderModule = __decorate([
    NgModule({
        declarations: [Loader],
        imports: [IntlModule, IonicModule, CommonModule],
        entryComponents: [Loader],
        providers: [LoaderController]
    })
], LoaderModule);

let ModalControllerComponent = class ModalControllerComponent {
    constructor(controller) {
        this.controller = controller;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.didDismiss = new EventEmitter();
        this.willDismiss = new EventEmitter();
        this._presented = false;
    }
    present() {
        return __awaiter(this, void 0, void 0, function* () {
            // already opened - should we close existing and open new?
            if (this.modal) {
                return;
            }
            this.modal = (yield this.controller.create({ component: ModalControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.backdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass }));
            this.willEnter.next();
            yield this.modal.present();
            this.didEnter.next();
            this._presented = true;
            if (yield this.modal.onWillDismiss()) {
                this.willDismiss.next();
            }
            if (yield this.modal.onDidDismiss()) {
                this.didDismiss.next();
                this.modal = undefined;
                this._presented = false;
            }
        });
    }
    get presented() {
        return this._presented;
    }
    dismiss(data, role) {
        if (this.modal) {
            return this.modal.dismiss(data, role);
        }
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], ModalControllerComponent.prototype, "cssClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ModalControllerComponent.prototype, "backdropDismiss", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ModalControllerComponent.prototype, "showBackdrop", void 0);
__decorate([
    ViewChild("modalContent", { static: true }),
    __metadata("design:type", TemplateRef)
], ModalControllerComponent.prototype, "content", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ModalControllerComponent.prototype, "willEnter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ModalControllerComponent.prototype, "didEnter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ModalControllerComponent.prototype, "didDismiss", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ModalControllerComponent.prototype, "willDismiss", void 0);
ModalControllerComponent = __decorate([
    Component({
        selector: "ionx-modal-controller",
        template: `
        <ng-template #modalContent>
            <ng-content></ng-content>
        </ng-template>
    `
    }),
    __metadata("design:paramtypes", [ModalController])
], ModalControllerComponent);
let ModalControllerContentComponent = class ModalControllerContentComponent {
    constructor() {
        //this.template = params.get("template");
    }
    ngOnDestroy() {
        this.template = undefined;
    }
};
ModalControllerContentComponent = __decorate([
    Component({
        template: `
        <ng-container *ngTemplateOutlet="template"></ng-container>
    `
    }),
    __metadata("design:paramtypes", [])
], ModalControllerContentComponent);

let ModalModule = class ModalModule {
};
ModalModule = __decorate([
    NgModule({
        declarations: [ModalControllerComponent, ModalControllerContentComponent],
        exports: [ModalControllerComponent],
        imports: [CommonModule, IonicModule],
        entryComponents: [ModalControllerComponent, ModalControllerContentComponent]
    })
], ModalModule);

let PopoverControllerComponent = class PopoverControllerComponent {
    constructor(controller) {
        this.controller = controller;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.didDismiss = new EventEmitter();
        this.willDismiss = new EventEmitter();
        this._dismissing = false;
        this._presented = false;
    }
    present(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // already opened - should we close existing and open new?
            if (this.popover) {
                return;
            }
            this.popover = (yield this.controller.create({ component: PopoverControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.enableBackdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass, event: event }));
            this.willEnter.next();
            yield this.popover.present();
            this.didEnter.next();
            this._presented = true;
            if (yield this.popover.onWillDismiss()) {
                this.willDismiss.next();
            }
            this._dismissing = true;
            if (yield this.popover.onDidDismiss()) {
                this.didDismiss.next();
                this.popover = undefined;
                this._presented = false;
                this._dismissing = false;
            }
        });
    }
    get dismissing() {
        return this._dismissing;
    }
    get presented() {
        return this._presented;
    }
    dismiss(data, role) {
        if (this.popover) {
            return this.popover.dismiss(data, role);
        }
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], PopoverControllerComponent.prototype, "cssClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PopoverControllerComponent.prototype, "enableBackdropDismiss", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PopoverControllerComponent.prototype, "showBackdrop", void 0);
__decorate([
    ViewChild("popoverContent", { static: true }),
    __metadata("design:type", TemplateRef)
], PopoverControllerComponent.prototype, "content", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PopoverControllerComponent.prototype, "willEnter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PopoverControllerComponent.prototype, "didEnter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PopoverControllerComponent.prototype, "didDismiss", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], PopoverControllerComponent.prototype, "willDismiss", void 0);
PopoverControllerComponent = __decorate([
    Component({
        selector: "ionx-popover-controller",
        encapsulation: ViewEncapsulation.None,
        template: `
        <ng-template #popoverContent>
            <ng-content></ng-content>
        </ng-template>
    `
    }),
    __metadata("design:paramtypes", [PopoverController])
], PopoverControllerComponent);
let PopoverControllerContentComponent = class PopoverControllerContentComponent {
    constructor() {
        //this.template = params.get("template");
    }
    ngOnDestroy() {
        this.template = undefined;
    }
};
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], PopoverControllerContentComponent.prototype, "template", void 0);
PopoverControllerContentComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        template: `
        <ng-template [ngTemplateOutlet]="template"></ng-template>
    `
    }),
    __metadata("design:paramtypes", [])
], PopoverControllerContentComponent);

let PopoverModule = class PopoverModule {
};
PopoverModule = __decorate([
    NgModule({
        declarations: [PopoverControllerComponent, PopoverControllerContentComponent],
        exports: [PopoverControllerComponent],
        imports: [IonicModule, CommonModule],
        entryComponents: [PopoverControllerComponent, PopoverControllerContentComponent]
    })
], PopoverModule);

let PseudoInput = class PseudoInput {
    constructor(element) {
        this.element = element;
    }
};
PseudoInput = __decorate([
    Component({
        selector: "ionx-pseudo-input",
        exportAs: "ionxPseudoInput",
        template: "<ng-content></ng-content>",
        styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}:host-context(.item-label-stacked) ionx-pseudo-input{align-self:flex-start;--padding-start:0}:host-context(.md.item-label-stacked) ionx-pseudo-input{--padding-top:10px;--padding-bottom:9px}:host-context(.ios.item-label-stacked) ionx-pseudo-input{--padding-top:9px;--padding-bottom:8px}"]
    }),
    __metadata("design:paramtypes", [ElementRef])
], PseudoInput);

let PseudoInputModule = class PseudoInputModule {
};
PseudoInputModule = __decorate([
    NgModule({
        declarations: [PseudoInput],
        exports: [PseudoInput]
    })
], PseudoInputModule);

let Spinner = class Spinner {
    constructor() {
        this.backdropVisible = false;
        this.fill = false;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Spinner.prototype, "backdropVisible", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], Spinner.prototype, "fill", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Spinner.prototype, "color", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], Spinner.prototype, "name", void 0);
Spinner = __decorate([
    Component({
        selector: "ionx-spinner",
        template: `<ion-backdrop *ngIf="backdropVisible"></ion-backdrop><ion-spinner [name]="name" [color]="color"></ion-spinner>`,
        styles: [":host{position:relative;display:flex;align-items:center;justify-content:center}:host ion-backdrop{opacity:.1}:host[fill]{position:absolute;width:100%;height:100%;left:0;top:0}:host[always-on-top]{z-index:100000}"]
    })
], Spinner);

let SpinnerModule = class SpinnerModule {
};
SpinnerModule = __decorate([
    NgModule({
        declarations: [Spinner],
        exports: [Spinner],
        imports: [CommonModule, IonicModule]
    })
], SpinnerModule);

let TextareaAutosize = class TextareaAutosize {
    constructor(element) {
        this.element = element;
    }
    onChange() {
        this.adjust();
    }
    get textarea() {
        return this.element.nativeElement.querySelector("textarea");
    }
    adjust() {
        let input = this.textarea;
        if (input) {
            input.style.overflow = "hidden";
            input.style.height = "auto";
            input.style.height = input.scrollHeight + "px";
        }
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield waitTill(() => !!this.textarea);
            this.adjust();
        });
    }
};
__decorate([
    HostListener("ionChange"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TextareaAutosize.prototype, "onChange", null);
TextareaAutosize = __decorate([
    Directive({
        selector: "ion-textarea[ionx-autosize]"
    }),
    __metadata("design:paramtypes", [ElementRef])
], TextareaAutosize);

let TextareaAutosizeModule = class TextareaAutosizeModule {
};
TextareaAutosizeModule = __decorate([
    NgModule({
        declarations: [TextareaAutosize],
        exports: [TextareaAutosize],
        imports: [IonicModule]
    })
], TextareaAutosizeModule);

let ToggleLabels = class ToggleLabels {
    constructor() {
    }
    switchOn() {
        this.toggle.checked = true;
    }
    switchOff() {
        this.toggle.checked = false;
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], ToggleLabels.prototype, "on", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ToggleLabels.prototype, "off", void 0);
__decorate([
    ContentChild(IonToggle, { static: false }),
    __metadata("design:type", IonToggle)
], ToggleLabels.prototype, "toggle", void 0);
ToggleLabels = __decorate([
    Component({
        selector: "ionx-toggle-labels",
        template: "<span ionx--off (click)=\"switchOff()\">\n    <ng-template [ngIf]=\"!!off\">{{off}}</ng-template>\n    <ng-content select=\"[slot=off]\"></ng-content>\n    </span>\n\n<ng-content select=\"ion-toggle\"></ng-content>\n\n<span ionx--on (click)=\"switchOn()\">\n    <ng-template [ngIf]=\"!!on\">{{on}}</ng-template>\n    <ng-content select=\"[slot=on]\"></ng-content>\n</span>\n",
        styles: [":host{display:flex;align-items:center}:host ::ng-deep ion-toggle{-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:2px;padding-inline-end:2px}:host [ionx--on]{cursor:pointer;margin-left:4px}:host [ionx--off]{cursor:pointer;margin-right:4px}:host-context(.item-label-stacked){align-self:flex-start}:host-context(.ios.item-label-stacked){margin-top:2px;margin-bottom:2px}"]
    }),
    __metadata("design:paramtypes", [])
], ToggleLabels);

let ToggleLabelsModule = class ToggleLabelsModule {
};
ToggleLabelsModule = __decorate([
    NgModule({
        declarations: [ToggleLabels],
        exports: [ToggleLabels],
        imports: [CommonModule, IonicModule]
    })
], ToggleLabelsModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Buttons, ButtonsModule, DateTimePickerInput, DateTimePickerModule, Dialog, DialogController, DialogModule, ExpandingSearchbar, ExpandingSearchbarModule, FormHeading, FormHelper, FormHelperModule, FormItem, FormItemError, FormItemHint, ImageLoader, ImageLoaderModule, IonicFixModule, LazyImage, LazyImageContainer, LazyImageModule, Loader, LoaderModule, ModalControllerComponent, ModalModule, PopoverControllerComponent, PopoverModule, PseudoInput, PseudoInputModule, Select, SelectModule, SelectOption, SelectOptions, Spinner, SpinnerModule, TextareaAutosizeModule, ToggleLabels, ToggleLabelsModule, dialogData, dialogInstance, ensureImagesLoaded, ensureLazyImagesLoaded, ModalControllerContentComponent as ɵa, PopoverControllerContentComponent as ɵb, DateTimePickerOverlay as ɵc, SelectLabel as ɵd, SelectOverlayContent as ɵe, ExpandingSearchbarStyles as ɵf, IonicInputFix as ɵg, IonicBackButtonFix as ɵh, IonicItemTargetFix as ɵi, LoaderController as ɵj, TextareaAutosize as ɵk };
//# sourceMappingURL=co.mmons-ionic-extensions.js.map
