import * as tslib_1 from "tslib";
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, ViewChild } from "@angular/core";
import { NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController, PopoverController } from "@ionic/angular";
import { SelectLabel } from "./select-label";
import { SelectOption } from "./select-option";
import { SelectOptions } from "./select-options";
import { SelectOverlayContent } from "./select-overlay";
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
tslib_1.__decorate([
    ViewChild("textContainer", { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], Select.prototype, "textContainer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], Select.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], Select.prototype, "overlay", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], Select.prototype, "overlayWhiteSpace", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], Select.prototype, "alwaysArray", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], Select.prototype, "compareAsString", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], Select.prototype, "comparator", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], Select.prototype, "multiple", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], Select.prototype, "title", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], Select.prototype, "orderable", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], Select.prototype, "empty", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], Select.prototype, "readonly", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], Select.prototype, "searchTest", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], Select.prototype, "checkValidator", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], Select.prototype, "ionChange", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], Select.prototype, "change", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], Select.prototype, "disabled", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], Select.prototype, "value", null);
tslib_1.__decorate([
    ContentChild(SelectLabel, { static: false }),
    tslib_1.__metadata("design:type", SelectLabel)
], Select.prototype, "labelTemplate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Function)
], Select.prototype, "label", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], Select.prototype, "options", void 0);
tslib_1.__decorate([
    ContentChildren(SelectOption),
    tslib_1.__metadata("design:type", QueryList),
    tslib_1.__metadata("design:paramtypes", [QueryList])
], Select.prototype, "_optionsComponents", null);
Select = tslib_1.__decorate([
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
    tslib_1.__param(4, Optional()),
    tslib_1.__metadata("design:paramtypes", [ElementRef, IntlService, PopoverController, ModalController, NgControl])
], Select);
export { Select };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc2VsZWN0LyIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFpQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEwsT0FBTyxFQUF1QixTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBYXRELElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07SUFHZixZQUFvQixPQUFnQyxFQUFZLElBQWlCLEVBQVUsaUJBQW9DLEVBQVksZUFBZ0MsRUFBd0IsT0FBa0I7UUFBak0sWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFBWSxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFZLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUF3QixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBK0I5TSxzQkFBaUIsR0FBVyxRQUFRLENBQUM7UUFvQ3JDLFVBQUssR0FBWSxJQUFJLENBQUM7UUFnQ2IsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFB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Q0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztpQkFDMVQ7YUFFSjtpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JCLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDL0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMs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LFNBQVM7R0FINU0sTUFBTSxDQWllbEI7U0FqZVksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE9wdGlvbmFsLCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlciwgUG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtTZWxlY3RMYWJlbH0gZnJvbSBcIi4vc2VsZWN0LWxhYmVsXCI7XG5pbXBvcnQge1NlbGVjdE9wdGlvbn0gZnJvbSBcIi4vc2VsZWN0LW9wdGlvblwiO1xuaW1wb3J0IHtTZWxlY3RPcHRpb25zfSBmcm9tIFwiLi9zZWxlY3Qtb3B0aW9uc1wiO1xuaW1wb3J0IHtTZWxlY3RPdmVybGF5Q29udGVudH0gZnJvbSBcIi4vc2VsZWN0LW92ZXJsYXlcIjtcbmltcG9ydCB7U2VsZWN0T3ZlcmxheU9wdGlvbn0gZnJvbSBcIi4vc2VsZWN0LW92ZXJsYXktb3B0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc2VsZWN0XCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIlthdHRyLmlvbngtLWNoaXBzLWxheW91dF1cIjogXCIhIW9yZGVyYWJsZSB8fCBudWxsXCIsXG4gICAgICAgIFwiW2F0dHIuaW9ueC0tcmVhZG9ubHldXCI6IFwiKCEhcmVhZG9ubHkgfHwgISFkaXNhYmxlZCkgfHwgbnVsbFwiLFxuICAgICAgICBcIlthdHRyLmlvbngtLW9yZGVyYWJsZV1cIjogXCIoISFvcmRlcmFibGUgJiYgIXJlYWRvbmx5ICYmICFkaXNhYmxlZCAmJiB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCA+IDEpIHx8IG51bGxcIixcbiAgICB9LFxuICAgIHN0eWxlVXJsczogW1wic2VsZWN0LnNjc3NcIl0sXG4gICAgdGVtcGxhdGVVcmw6IFwic2VsZWN0Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3QgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkluaXQge1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcm90ZWN0ZWQgaW50bDogSW50bFNlcnZpY2UsIHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyLCBwcm90ZWN0ZWQgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsIEBPcHRpb25hbCgpIHByb3RlY3RlZCBjb250cm9sOiBOZ0NvbnRyb2wpIHtcblxuICAgICAgICBpZiAoY29udHJvbCkge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfbGlzdEl0ZW06IEhUTUxJb25JdGVtRWxlbWVudDtcblxuICAgIHByaXZhdGUgZ2V0IGxpc3RJdGVtKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1pdGVtXCIpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgZHJhZ3VsYTogZHJhZ3VsYS5EcmFrZTtcblxuICAgIEBWaWV3Q2hpbGQoXCJ0ZXh0Q29udGFpbmVyXCIsIHtzdGF0aWM6IHRydWV9KVxuICAgIHRleHRDb250YWluZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG92ZXJsYXk6IFwicG9wb3ZlclwiIHwgXCJtb2RhbFwiO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgb3ZlcmxheVdoaXRlU3BhY2U6IHN0cmluZyA9IFwibm93cmFwXCI7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHZhbHVlIHNob3VsZCBiZSBhbHdheXMgcmV0dXJuZWQgYXMgYXJyYXksIG5vIG1hdHRlciBpZiBtdWx0aXBsZSBpcyBzZXQgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBhbHdheXNBcnJheTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdmFsdWVzIGFzIHN0cmluZywgdGhhdCBpcyB3aGV0aGVyIHRvU3RyaW5nKCkgb2YgYm90aCB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNvbXBhcmVBc1N0cmluZzogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNvbXBhcmF0b3I6IChhOiBhbnksIGI6IGFueSkgPT4gYm9vbGVhbiB8IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIElmIG11bHRpcGxlIHZhbHVlIHNlbGVjdGlvbiBpcyBhbGxvd2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG11bHRpcGxlOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpdGxlIG9mIHRoZSBzZWxlY3Qgb3ZlcmxheSAob25seSBpbiBjYXNlIG9mIG1vZGFscykuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIElmIG11bHRpcGxlIHZhbHVlcyBzZWxlY3Rpb24gY2FuIGJlIG9yZGVyZWQgYWZ0ZXIgc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG9yZGVyYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGVtcHR5OiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgX3JlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZWFkb25seSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5yZWFkb25seSA9IHJlYWRvbmx5ID09PSBcInRydWVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlYWRvbmx5ID0gcmVhZG9ubHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9yZWFkb25seTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24sIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0ZXN0aW5nIGlmIHZhbHVlIHBhc3NlcyBzZWFyY2ggY3JpdGllcmlhLlxuICAgICAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gY2hlY2tzIGxvd2VyY2FzZWQgbGFiZWwgb2YgdmFsdWUgYWdhaW5zdCBcbiAgICAgKiBsb3dlcmNhc2VkIHNlYXJjaGVkIHRleHQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VhcmNoVGVzdDogKHF1ZXJ5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGxhYmVsOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjaGVja1ZhbGlkYXRvcjogKHZhbHVlOiBhbnksIGNoZWNrZWQ6IGJvb2xlYW4sIG90aGVyQ2hlY2tlZFZhbHVlczogYW55W10pID0+IGFueVtdO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IHRoaXMuaW9uQ2hhbmdlO1xuXG5cbiAgICBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgc2VsZWN0IGNvbXBvbmVudCBpcyBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQgfHwgZGlzYWJsZWQgPT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLypwcml2YXRlKi92YWx1ZXM6IGFueVtdID0gW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IGFueSB8IGFueVtdKSB7XG5cbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgbmV3VmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgPyBbdmFsdWVdIDogW10pO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZS5sZW5ndGggIT0gdGhpcy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy52YWx1ZUNvbXBhcmF0b3IodGhpcy52YWx1ZXNbaV0sIG5ld1ZhbHVlW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZXMgPSBuZXdWYWx1ZTtcblxuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja0xpc3RJdGVtSGFzVmFsdWUoKTtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlyZU9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlvbkNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkgfCBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlIHx8IHRoaXMuYWx3YXlzQXJyYXkgPyB0aGlzLnZhbHVlcy5zbGljZSgwKSA6ICh0aGlzLnZhbHVlcy5sZW5ndGggPiAwID8gdGhpcy52YWx1ZXNbMF0gOiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FjaGVkTGFiZWxzOiBzdHJpbmdbXTtcblxuICAgIC8qcHJpdmF0ZSovIGxhYmVsSW1wbCQodmFsdWU6IGFueSk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyBpbnN0YW5jZW9mIFNlbGVjdE9wdGlvbnMpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlZExhYmVscykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkTGFiZWxzID0gbmV3IEFycmF5KHRoaXMub3B0aW9ucy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ29tcGFyYXRvcih2YWx1ZSwgdGhpcy5vcHRpb25zW2ldLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkTGFiZWxzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRMYWJlbHNbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRMYWJlbHNbaV0gPSB0aGlzLm9wdGlvbnNbaV0ubGFiZWwgPyB0aGlzLm9wdGlvbnNbaV0ubGFiZWwgOiAodGhpcy5sYWJlbCA/IHRoaXMubGFiZWwodmFsdWUpIDogdmFsdWUgKyBcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZWRMYWJlbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRMYWJlbHMgPSBuZXcgQXJyYXkodGhpcy5vcHRpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZUNvbXBhcmF0b3IodmFsdWUsIHRoaXMub3B0aW9uc1tpXSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkTGFiZWxzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkTGFiZWxzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRMYWJlbHNbaV0gPSB0aGlzLmxhYmVsID8gdGhpcy5sYWJlbCh2YWx1ZSkgOiB2YWx1ZSArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnNDb21wb25lbnRzKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNDb21wb25lbnRzLnRvQXJyYXkoKSwgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVDb21wYXJhdG9yKHZhbHVlLCBvcHRpb25zW2ldLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uc1tpXS5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXJlT25DaGFuZ2U6IGJvb2xlYW47XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0xpc3RJdGVtSGFzVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaGFzLXZhbHVlXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImhhcy12YWx1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSB2YWx1ZUNvbXBhcmF0b3IgPSAoYTogYW55LCBiOiBhbnkpID0+IHtcblxuICAgICAgICBpZiAodGhpcy5jb21wYXJlQXNTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmIChhICE9PSB1bmRlZmluZWQgJiYgYSAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYSA9PSBiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb21wYXJhdG9yKSB7XG4gICAgICAgICAgICBjb25zdCByID0gdGhpcy5jb21wYXJhdG9yKGEsIGIpO1xuICAgICAgICAgICAgcmV0dXJuIHIgPT09IDAgfHwgciA9PT0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgfVxuXG5cbiAgICBAQ29udGVudENoaWxkKFNlbGVjdExhYmVsLCB7c3RhdGljOiBmYWxzZX0pXG4gICAgLypwcml2YXRlKi8gbGFiZWxUZW1wbGF0ZTogU2VsZWN0TGFiZWw7XG5cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIG9wdGlvbnM6IGFueVtdIHwgU2VsZWN0T3B0aW9ucztcblxuICAgIHByaXZhdGUgb3B0aW9uc0NvbXBvbmVudHM6IFF1ZXJ5TGlzdDxTZWxlY3RPcHRpb24+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTZWxlY3RPcHRpb24pXG4gICAgcHJvdGVjdGVkIHNldCBfb3B0aW9uc0NvbXBvbmVudHModmFsOiBRdWVyeUxpc3Q8U2VsZWN0T3B0aW9uPikge1xuICAgICAgICB0aGlzLm9wdGlvbnNDb21wb25lbnRzID0gdmFsO1xuICAgICAgICAvL3RoaXMub3B0aW9uc0NvbXBvbmVudHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVUZXh0KCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5kZXhPZlZhbHVlKHZhbHVlOiBhbnkpOiBudW1iZXIge1xuXG4gICAgICAgIGlmICghdGhpcy52YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ29tcGFyYXRvcih2YWx1ZSwgdGhpcy52YWx1ZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGNvbnRyb2xPbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPblRvdWNoZWQ6IEZ1bmN0aW9uO1xuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuXG4gICAgcHVibGljIGFzeW5jIG9wZW4oZXZlbnQ6IEV2ZW50KSB7XG5cbiAgICAgICAgbGV0IG92ZXJsYXk6IFwicG9wb3ZlclwiIHwgXCJtb2RhbFwiID0gdGhpcy5vdmVybGF5O1xuXG4gICAgICAgIGlmICghb3ZlcmxheSkge1xuICAgICAgICAgICAgb3ZlcmxheSA9IFwicG9wb3ZlclwiO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdGlvbnM6IFNlbGVjdE92ZXJsYXlPcHRpb25bXSA9IFtdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zIGluc3RhbmNlb2YgU2VsZWN0T3B0aW9ucykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVJbmRleCA9IG9wdGlvbi52YWx1ZSA/IHRoaXMuaW5kZXhPZlZhbHVlKG9wdGlvbi52YWx1ZSkgOiAtMTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBvcHRpb24udmFsdWUsIGNoZWNrZWQ6IG9wdGlvbi52YWx1ZSA/IHZhbHVlSW5kZXggPiAtMSA6IGZhbHNlLCBjaGVja2VkVGltZXN0YW1wOiB0aGlzLm9yZGVyYWJsZSAmJiB2YWx1ZUluZGV4LCBsYWJlbDogb3B0aW9uLmxhYmVsID8gb3B0aW9uLmxhYmVsIDogKCghdGhpcy5zZWFyY2hUZXN0IHx8ICF0aGlzLmxhYmVsVGVtcGxhdGUpID8gdGhpcy5sYWJlbEltcGwkKG9wdGlvbi52YWx1ZSkgOiB1bmRlZmluZWQpLCBkaXNhYmxlZDogb3B0aW9uLmRpc2FibGVkLCBkaXZpZGVyOiBvcHRpb24uZGl2aWRlcn0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUluZGV4ID0gdGhpcy5pbmRleE9mVmFsdWUob3B0aW9uKTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBvcHRpb24sIGNoZWNrZWQ6IHZhbHVlSW5kZXggPiAtMSwgY2hlY2tlZFRpbWVzdGFtcDogdGhpcy5vcmRlcmFibGUgJiYgdmFsdWVJbmRleCwgbGFiZWw6ICF0aGlzLmxhYmVsVGVtcGxhdGUgfHwgIXRoaXMuc2VhcmNoVGVzdCA/IHRoaXMubGFiZWxJbXBsJChvcHRpb24pIDogdW5kZWZpbmVkfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnNDb21wb25lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnNDb21wb25lbnRzLnRvQXJyYXkoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlSW5kZXggPSB0aGlzLmluZGV4T2ZWYWx1ZShvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IG9wdGlvbi52YWx1ZSwgY2hlY2tlZDogdmFsdWVJbmRleCA+IC0xLCBjaGVja2VkVGltZXN0YW1wOiB0aGlzLm9yZGVyYWJsZSAmJiB2YWx1ZUluZGV4LCBsYWJlbDogb3B0aW9uLmxhYmVsLCBkaXZpZGVyOiAhIW9wdGlvbi5kaXZpZGVyfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3ZlcmxheVRpdGxlOiBzdHJpbmc7XG4gICAgICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICAgICAgICBvdmVybGF5VGl0bGUgPSB0aGlzLnRpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvdmVybGF5VGl0bGUgJiYgdGhpcy5saXN0SXRlbSkge1xuXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMubGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcIltpb254LXNlbGVjdC1vdmVybGF5LXRpdGxlXVwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IHRpdGxlLmlubmVyVGV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoXCJpb24tbGFiZWxcIik7XG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IGxhYmVsLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW92ZXJsYXlUaXRsZSAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSkge1xuICAgICAgICAgICAgb3ZlcmxheVRpdGxlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW92ZXJsYXlUaXRsZSAmJiB0aGlzLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICBvdmVybGF5VGl0bGUgPSB0aGlzLnBsYWNlaG9sZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG92ZXJsYXlEYXRhID0ge1xuICAgICAgICAgICAgb3ZlcmxheTogb3ZlcmxheSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICBtdWx0aXBsZTogISF0aGlzLm11bHRpcGxlLFxuICAgICAgICAgICAgdGl0bGU6IG92ZXJsYXlUaXRsZSxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsVGVtcGxhdGUsXG4gICAgICAgICAgICBvcmRlcmFibGU6ICEhdGhpcy5vcmRlcmFibGUsXG4gICAgICAgICAgICBlbXB0eTogISF0aGlzLmVtcHR5LFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogdGhpcy5vdmVybGF5V2hpdGVTcGFjZSxcbiAgICAgICAgICAgIHZhbHVlVmFsaWRhdG9yOiB0aGlzLmNoZWNrVmFsaWRhdG9yLFxuICAgICAgICAgICAgdmFsdWVDb21wYXJhdG9yOiB0aGlzLnZhbHVlQ29tcGFyYXRvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCxcblxuICAgICAgICAgICAgdXBkYXRlVmFsdWVzOiAodmFsdWU6IGFueVtdKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVPbkNoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uVG91Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG92ZXJsYXkgPT0gXCJwb3BvdmVyXCIpIHtcbiAgICAgICAgICAgIGxldCBwb3BvdmVyID0gYXdhaXQgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogU2VsZWN0T3ZlcmxheUNvbnRlbnQsIGNvbXBvbmVudFByb3BzOiBvdmVybGF5RGF0YSwgY3NzQ2xhc3M6IFwiaW9ueC1zZWxlY3Qtb3ZlcmxheS13aWR0aFwiLCBldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgIHBvcG92ZXIucHJlc2VudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IFNlbGVjdE92ZXJsYXlDb250ZW50LCBjb21wb25lbnRQcm9wczogb3ZlcmxheURhdGF9KTtcbiAgICAgICAgICAgIG1vZGFsLnByZXNlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gcHJpdmF0ZSBpbml0RHJhZ3VsYSgpIHtcbiAgICAvL1xuICAgIC8vICAgICBpZiAodGhpcy5vcmRlcmFibGUgJiYgIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcbiAgICAvL1xuICAgIC8vICAgICAgICAgaWYgKHRoaXMuZHJhZ3VsYSkge1xuICAgIC8vICAgICAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAgICAgdGhpcy5kcmFndWxhID0gKGRyYWd1bGEgYXMgYW55KSh7XG4gICAgLy8gICAgICAgICAgICAgY29udGFpbmVyczogW3RoaXMudGV4dENvbnRhaW5lci5uYXRpdmVFbGVtZW50XSxcbiAgICAvLyAgICAgICAgICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgbW92ZXM6IChlbCwgY29udGFpbmVyLCBoYW5kbGUpID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzICYmIHRoaXMudmFsdWVzLmxlbmd0aCA+IDE7XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy9cbiAgICAvLyAgICAgICAgIHRoaXMuZHJhZ3VsYS5vbihcImRyb3BcIiwgKGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZykgPT4ge1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZShcImlvbngtLWluZGV4XCIpLCAwKTtcbiAgICAvLyAgICAgICAgICAgICBsZXQgZW5kSW5kZXggPSBzaWJsaW5nID8gcGFyc2VJbnQoc2libGluZy5nZXRBdHRyaWJ1dGUoXCJpb254LS1pbmRleFwiKSwgMCkgOiB0aGlzLnZhbHVlcy5sZW5ndGg7XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgICBpZiAoZW5kSW5kZXggPiBzdGFydEluZGV4KSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGVuZEluZGV4IC09IDE7XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMudmFsdWVzW3N0YXJ0SW5kZXhdO1xuICAgIC8vICAgICAgICAgICAgIHRoaXMudmFsdWVzLnNwbGljZShzdGFydEluZGV4LCAxKTtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnZhbHVlcy5zcGxpY2UoZW5kSW5kZXgsIDAsIGVsZW1lbnQpO1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uQ2hhbmdlKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlKHRoaXMudmFsdWVzLnNsaWNlKCkpO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgIHRoaXMuaW9uQ2hhbmdlLmVtaXQodGhpcy52YWx1ZXMuc2xpY2UoKSk7XG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvL1xuICAgIC8vICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ3VsYSkge1xuICAgIC8vICAgICAgICAgdGhpcy5kcmFndWxhLmRlc3Ryb3koKTtcbiAgICAvLyAgICAgICAgIHRoaXMuZHJhZ3VsYSA9IHVuZGVmaW5lZDtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQ3NzQ2xhc3NlcygpIHtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1zZWxlY3RcIik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImluLWl0ZW1cIik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbi1pdGVtXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cbiAgICAgICAgaWYgKGNoYW5nZXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5jYWNoZWRMYWJlbHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlc1tcIm9yZGVyYWJsZVwiXSB8fCBjaGFuZ2VzW1wicmVhZG9ubHlcIl0gfHwgY2hhbmdlc1tcImRpc2FibGVkXCJdKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmluaXREcmFndWxhKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNzc0NsYXNzZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvL3RoaXMudXBkYXRlVGV4dCgpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ3NzQ2xhc3NlcygpO1xuXG4gICAgICAgIGlmICh0aGlzLm9yZGVyYWJsZSkge1xuICAgICAgICAgICAgLy8gdGhpcy5pbml0RHJhZ3VsYSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=