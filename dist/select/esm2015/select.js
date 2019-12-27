import * as tslib_1 from "tslib";
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnChanges, OnInit, Optional, Output, QueryList, SimpleChanges, ViewChild } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController, PopoverController } from "@ionic/angular";
import * as dragula from "dragula";
import { SelectLabel } from "./select-label";
import { SelectOption } from "./select-option";
import { SelectOptions } from "./select-options";
import { SelectOverlayContent } from "./select-overlay";
const createDragula = dragula;
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
    initDragula() {
        if (this.orderable && !this.disabled && !this.readonly) {
            if (this.dragula) {
                return;
            }
            this.dragula = createDragula({
                containers: [this.textContainer.nativeElement],
                mirrorContainer: document.querySelector("ion-app"),
                direction: "horizontal",
                moves: (el, container, handle) => {
                    return this.values && this.values.length > 1;
                }
            });
            this.dragula.on("drop", (el, target, source, sibling) => {
                const startIndex = parseInt(el.getAttribute("ionx--index"), 0);
                let endIndex = sibling ? parseInt(sibling.getAttribute("ionx--index"), 0) : this.values.length;
                if (endIndex > startIndex) {
                    endIndex -= 1;
                }
                const element = this.values[startIndex];
                this.values.splice(startIndex, 1);
                this.values.splice(endIndex, 0, element);
                if (this.controlOnChange) {
                    this.controlOnChange(this.values.slice());
                }
                this.ionChange.emit(this.values.slice());
            });
        }
        else if (this.dragula) {
            this.dragula.destroy();
            this.dragula = undefined;
        }
    }
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
            this.initDragula();
            this.updateCssClasses();
        }
    }
    ngOnInit() {
        //this.updateText();
        this.updateCssClasses();
        if (this.orderable) {
            this.initDragula();
        }
    }
};
Select.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService },
    { type: PopoverController },
    { type: ModalController },
    { type: NgControl, decorators: [{ type: Optional }] }
];
tslib_1.__decorate([
    ViewChild("textContainer", { static: true })
], Select.prototype, "textContainer", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "overlay", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "overlayWhiteSpace", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "alwaysArray", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "compareAsString", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "comparator", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "multiple", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "title", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "orderable", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "empty", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "readonly", null);
tslib_1.__decorate([
    Input()
], Select.prototype, "searchTest", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "checkValidator", void 0);
tslib_1.__decorate([
    Output()
], Select.prototype, "ionChange", void 0);
tslib_1.__decorate([
    Output()
], Select.prototype, "change", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], Select.prototype, "value", null);
tslib_1.__decorate([
    ContentChild(SelectLabel, { static: false })
], Select.prototype, "labelTemplate", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "label", void 0);
tslib_1.__decorate([
    Input()
], Select.prototype, "options", void 0);
tslib_1.__decorate([
    ContentChildren(SelectOption, { descendants: true })
], Select.prototype, "_optionsComponents", null);
Select = tslib_1.__decorate([
    Component({
        selector: "ionx-select",
        host: {
            "[attr.ionx--chips-layout]": "!!orderable || null",
            "[attr.ionx--readonly]": "(!!readonly || !!disabled) || null",
            "[attr.ionx--orderable]": "(!!orderable && !readonly && !disabled && values && values.length > 1) || null",
        },
        template: "<ng-template #optionTemplate let-value=\"value\" let-index=\"index\">\n    <span *ngIf=\"!labelTemplate; else hasLabelTemplate\">{{labelImpl$(value)}}</span>\n    <ng-template #hasLabelTemplate>\n        <ng-container *ngTemplateOutlet=\"labelTemplate.templateRef; context: {$implicit: value, index: index}\"></ng-container>\n    </ng-template>\n</ng-template>\n\n<div class=\"select-inner\">\n    <div class=\"select-text\" #textContainer [class.select-placeholder]=\"values.length == 0\">\n        <span *ngIf=\"values.length == 0; else showValues\">{{placeholder}}</span>\n\n        <ng-template #showValues>\n            <ng-template ngFor [ngForOf]=\"values\" let-value let-index=\"index\">\n                <span *ngIf=\"index > 0 && (!labelTemplate || labelTemplate.separator) && !orderable\">{{!labelTemplate ? \", \" : labelTemplate.separator}}</span>\n\n                <ion-chip *ngIf=\"orderable else simpleText\" outline=\"true\" [attr.ionx--index]=\"index\">\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ion-chip>\n\n                <ng-template #simpleText>\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ng-template>\n\n            </ng-template>\n        </ng-template>\n    </div>\n\n    <ng-container  *ngIf=\"!_readonly && !_disabled\">\n        <div class=\"select-icon\" role=\"presentation\" *ngIf=\"!orderable\">\n            <div class=\"select-icon-inner\"></div>\n        </div>\n        <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\" *ngIf=\"!orderable || !values || values.length === 0\"></button>\n    </ng-container>\n\n</div>\n",
        styles: [":host{--placeholder-opacity:.5;--dropdown-icon-opacity:.5;--disabled-opacity:.5;padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:inline-block;overflow:hidden;color:var(--color);font-family:var(--ion-font-family,inherit);max-width:100%}:host .select-inner{display:-webkit-box;display:flex;position:relative}:host .select-icon{position:relative;width:16px;height:20px}:host .select-icon .select-icon-inner{top:50%;right:0;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:var(--dropdown-icon-opacity,.5);pointer-events:none}:host .select-text.select-placeholder{opacity:var(--placeholder-opacity,.5)}:host.select-disabled{opacity:var(--disabled-opacity,.5);pointer-events:none}:host.select-readonly{opacity:1;pointer-events:none}:host.select-readonly .select-icon{display:none}:host[white-space-normal] .select-text{white-space:normal!important}:host button{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0}:host button::-moz-focus-inner{border:0}:host.in-item{position:static}:host ion-chip{max-width:calc(50% - 4px);-webkit-margin-start:0;margin-inline-start:0;margin-bottom:0;cursor:default}:host ion-chip>span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:1.1}:host [ionx--orderable] ion-chip{cursor:move}:host [ionx--chips-layout] .select-text{white-space:normal;width:100%}:host-context(ion-toolbar){color:var(--ion-toolbar-color);--icon-color:var(--ion-toolbar-color);--padding-start:16px;--padding-end:16px}:host-context(.item-label-stacked){align-self:flex-start;--padding-top:8px;--padding-bottom:8px;--padding-start:0;width:100%}:host-context(.item-label-stacked) .select-text{max-width:calc(100% - 16px);-webkit-box-flex:initial;flex:initial}:host-context(.item-label-stacked)[ionx--chips-layout] .select-text{-webkit-box-flex:1;flex:1}"]
    }),
    tslib_1.__param(4, Optional())
], Select);
export { Select };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc2VsZWN0LyIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xMLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR3RELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQztBQVk5QixJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBR2YsWUFBb0IsT0FBZ0MsRUFBWSxJQUFpQixFQUFVLGlCQUFvQyxFQUFZLGVBQWdDLEVBQXdCLE9BQWtCO1FBQWpNLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBWSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBd0Is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Z0Y7U0FDN0c7UUFFRCwyeURBQTBCOztLQUM3QixDQUFDO0lBSWdMLG1CQUFBLFFBQVEsRUFBRSxDQUFBO0dBSC9LLE1BQU0sQ0FrZWxCO1NBbGVZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPcHRpb25hbCwgT3V0cHV0LCBRdWVyeUxpc3QsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXIsIFBvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCAqIGFzIGRyYWd1bGEgZnJvbSBcImRyYWd1bGFcIjtcbmltcG9ydCB7U2VsZWN0TGFiZWx9IGZyb20gXCIuL3NlbGVjdC1sYWJlbFwiO1xuaW1wb3J0IHtTZWxlY3RPcHRpb259IGZyb20gXCIuL3NlbGVjdC1vcHRpb25cIjtcbmltcG9ydCB7U2VsZWN0T3B0aW9uc30gZnJvbSBcIi4vc2VsZWN0LW9wdGlvbnNcIjtcbmltcG9ydCB7U2VsZWN0T3ZlcmxheUNvbnRlbnR9IGZyb20gXCIuL3NlbGVjdC1vdmVybGF5XCI7XG5pbXBvcnQge1NlbGVjdE92ZXJsYXlPcHRpb259IGZyb20gXCIuL3NlbGVjdC1vdmVybGF5LW9wdGlvblwiO1xuXG5jb25zdCBjcmVhdGVEcmFndWxhID0gZHJhZ3VsYTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1zZWxlY3RcIixcbiAgICBob3N0OiB7XG4gICAgICAgIFwiW2F0dHIuaW9ueC0tY2hpcHMtbGF5b3V0XVwiOiBcIiEhb3JkZXJhYmxlIHx8IG51bGxcIixcbiAgICAgICAgXCJbYXR0ci5pb254LS1yZWFkb25seV1cIjogXCIoISFyZWFkb25seSB8fCAhIWRpc2FibGVkKSB8fCBudWxsXCIsXG4gICAgICAgIFwiW2F0dHIuaW9ueC0tb3JkZXJhYmxlXVwiOiBcIighIW9yZGVyYWJsZSAmJiAhcmVhZG9ubHkgJiYgIWRpc2FibGVkICYmIHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoID4gMSkgfHwgbnVsbFwiLFxuICAgIH0sXG4gICAgc3R5bGVVcmxzOiBbXCJzZWxlY3Quc2Nzc1wiXSxcbiAgICB0ZW1wbGF0ZVVybDogXCJzZWxlY3QuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMsIE9uSW5pdCB7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByb3RlY3RlZCBpbnRsOiBJbnRsU2VydmljZSwgcHJpdmF0ZSBwb3BvdmVyQ29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIsIHByb3RlY3RlZCBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlciwgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbCkge1xuXG4gICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF9saXN0SXRlbTogSFRNTElvbkl0ZW1FbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBnZXQgbGlzdEl0ZW0oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdEl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdEl0ZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLWl0ZW1cIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFndWxhOiBkcmFndWxhLkRyYWtlO1xuXG4gICAgQFZpZXdDaGlsZChcInRleHRDb250YWluZXJcIiwge3N0YXRpYzogdHJ1ZX0pXG4gICAgdGV4dENvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgb3ZlcmxheTogXCJwb3BvdmVyXCIgfCBcIm1vZGFsXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvdmVybGF5V2hpdGVTcGFjZTogc3RyaW5nID0gXCJub3dyYXBcIjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdmFsdWUgc2hvdWxkIGJlIGFsd2F5cyByZXR1cm5lZCBhcyBhcnJheSwgbm8gbWF0dGVyIGlmIG11bHRpcGxlIGlzIHNldCB0byB0cnVlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGFsd2F5c0FycmF5OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQ29tcGFyZSB2YWx1ZXMgYXMgc3RyaW5nLCB0aGF0IGlzIHdoZXRoZXIgdG9TdHJpbmcoKSBvZiBib3RoIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY29tcGFyZUFzU3RyaW5nOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY29tcGFyYXRvcjogKGE6IGFueSwgYjogYW55KSA9PiBib29sZWFuIHwgbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogSWYgbXVsdGlwbGUgdmFsdWUgc2VsZWN0aW9uIGlzIGFsbG93ZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGl0bGUgb2YgdGhlIHNlbGVjdCBvdmVybGF5IChvbmx5IGluIGNhc2Ugb2YgbW9kYWxzKS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSWYgbXVsdGlwbGUgdmFsdWVzIHNlbGVjdGlvbiBjYW4gYmUgb3JkZXJlZCBhZnRlciBzZWxlY3Rpb24uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgb3JkZXJhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZW1wdHk6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICBfcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcblxuICAgICAgICBpZiAodHlwZW9mIHJlYWRvbmx5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRvbmx5ID0gcmVhZG9ubHkgPT09IFwidHJ1ZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVhZG9ubHkgPSByZWFkb25seTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3JlYWRvbmx5O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiwgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRlc3RpbmcgaWYgdmFsdWUgcGFzc2VzIHNlYXJjaCBjcml0aWVyaWEuXG4gICAgICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBjaGVja3MgbG93ZXJjYXNlZCBsYWJlbCBvZiB2YWx1ZSBhZ2FpbnN0IFxuICAgICAqIGxvd2VyY2FzZWQgc2VhcmNoZWQgdGV4dC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWFyY2hUZXN0OiAocXVlcnk6IHN0cmluZywgdmFsdWU6IGFueSwgbGFiZWw6IHN0cmluZykgPT4gYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNoZWNrVmFsaWRhdG9yOiAodmFsdWU6IGFueSwgY2hlY2tlZDogYm9vbGVhbiwgb3RoZXJDaGVja2VkVmFsdWVzOiBhbnlbXSkgPT4gYW55W107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gdGhpcy5pb25DaGFuZ2U7XG5cblxuICAgIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSBzZWxlY3QgY29tcG9uZW50IGlzIGRpc2FibGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZCB8fCBkaXNhYmxlZCA9PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKnByaXZhdGUqL3ZhbHVlczogYW55W10gPSBbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55IHwgYW55W10pIHtcblxuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCA/IFt2YWx1ZV0gOiBbXSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlLmxlbmd0aCAhPSB0aGlzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZhbHVlQ29tcGFyYXRvcih0aGlzLnZhbHVlc1tpXSwgbmV3VmFsdWVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlcyA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTGlzdEl0ZW1IYXNWYWx1ZSgpO1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maXJlT25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250cm9sT25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaW9uQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlT25DaGFuZ2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGFueSB8IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgfHwgdGhpcy5hbHdheXNBcnJheSA/IHRoaXMudmFsdWVzLnNsaWNlKDApIDogKHRoaXMudmFsdWVzLmxlbmd0aCA+IDAgPyB0aGlzLnZhbHVlc1swXSA6IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWNoZWRMYWJlbHM6IHN0cmluZ1tdO1xuXG4gICAgLypwcml2YXRlKi8gbGFiZWxJbXBsJCh2YWx1ZTogYW55KTogc3RyaW5nIHtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zIGluc3RhbmNlb2YgU2VsZWN0T3B0aW9ucykge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FjaGVkTGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRMYWJlbHMgPSBuZXcgQXJyYXkodGhpcy5vcHRpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVDb21wYXJhdG9yKHZhbHVlLCB0aGlzLm9wdGlvbnNbaV0udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZWRMYWJlbHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZExhYmVsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZExhYmVsc1tpXSA9IHRoaXMub3B0aW9uc1tpXS5sYWJlbCA/IHRoaXMub3B0aW9uc1tpXS5sYWJlbCA6ICh0aGlzLmxhYmVsID8gdGhpcy5sYWJlbCh2YWx1ZSkgOiB2YWx1ZSArIFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlZExhYmVscykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZExhYmVscyA9IG5ldyBBcnJheSh0aGlzLm9wdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ29tcGFyYXRvcih2YWx1ZSwgdGhpcy5vcHRpb25zW2ldKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZWRMYWJlbHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRMYWJlbHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZExhYmVsc1tpXSA9IHRoaXMubGFiZWwgPyB0aGlzLmxhYmVsKHZhbHVlKSA6IHZhbHVlICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uc0NvbXBvbmVudHMpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgb3B0aW9ucyA9IHRoaXMub3B0aW9uc0NvbXBvbmVudHMudG9BcnJheSgpLCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZUNvbXBhcmF0b3IodmFsdWUsIG9wdGlvbnNbaV0udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zW2ldLmxhYmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpcmVPbkNoYW5nZTogYm9vbGVhbjtcblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGhhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrTGlzdEl0ZW1IYXNWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJoYXMtdmFsdWVcIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHZhbHVlQ29tcGFyYXRvciA9IChhOiBhbnksIGI6IGFueSkgPT4ge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbXBhcmVBc1N0cmluZykge1xuICAgICAgICAgICAgaWYgKGEgIT09IHVuZGVmaW5lZCAmJiBhICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhID09IGI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbXBhcmF0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSB0aGlzLmNvbXBhcmF0b3IoYSwgYik7XG4gICAgICAgICAgICByZXR1cm4gciA9PT0gMCB8fCByID09PSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICB9XG5cblxuICAgIEBDb250ZW50Q2hpbGQoU2VsZWN0TGFiZWwsIHtzdGF0aWM6IGZhbHNlfSlcbiAgICAvKnByaXZhdGUqLyBsYWJlbFRlbXBsYXRlOiBTZWxlY3RMYWJlbDtcblxuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgb3B0aW9uczogYW55W10gfCBTZWxlY3RPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBvcHRpb25zQ29tcG9uZW50czogUXVlcnlMaXN0PFNlbGVjdE9wdGlvbj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFNlbGVjdE9wdGlvbiwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgICBwcm90ZWN0ZWQgc2V0IF9vcHRpb25zQ29tcG9uZW50cyh2YWw6IFF1ZXJ5TGlzdDxTZWxlY3RPcHRpb24+KSB7XG4gICAgICAgIHRoaXMub3B0aW9uc0NvbXBvbmVudHMgPSB2YWw7XG4gICAgICAgIC8vdGhpcy5vcHRpb25zQ29tcG9uZW50cy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVRleHQoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmRleE9mVmFsdWUodmFsdWU6IGFueSk6IG51bWJlciB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVDb21wYXJhdG9yKHZhbHVlLCB0aGlzLnZhbHVlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgY29udHJvbE9uQ2hhbmdlOiBGdW5jdGlvbjtcblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29udHJvbE9uVG91Y2hlZDogRnVuY3Rpb247XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgYXN5bmMgb3BlbihldmVudDogRXZlbnQpIHtcblxuICAgICAgICBsZXQgb3ZlcmxheTogXCJwb3BvdmVyXCIgfCBcIm1vZGFsXCIgPSB0aGlzLm92ZXJsYXk7XG5cbiAgICAgICAgaWYgKCFvdmVybGF5KSB7XG4gICAgICAgICAgICBvdmVybGF5ID0gXCJwb3BvdmVyXCI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3B0aW9uczogU2VsZWN0T3ZlcmxheU9wdGlvbltdID0gW107XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMgaW5zdGFuY2VvZiBTZWxlY3RPcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUluZGV4ID0gb3B0aW9uLnZhbHVlID8gdGhpcy5pbmRleE9mVmFsdWUob3B0aW9uLnZhbHVlKSA6IC0xO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IG9wdGlvbi52YWx1ZSwgY2hlY2tlZDogb3B0aW9uLnZhbHVlID8gdmFsdWVJbmRleCA+IC0xIDogZmFsc2UsIGNoZWNrZWRUaW1lc3RhbXA6IHRoaXMub3JkZXJhYmxlICYmIHZhbHVlSW5kZXgsIGxhYmVsOiBvcHRpb24ubGFiZWwgPyBvcHRpb24ubGFiZWwgOiAoKCF0aGlzLnNlYXJjaFRlc3QgfHwgIXRoaXMubGFiZWxUZW1wbGF0ZSkgPyB0aGlzLmxhYmVsSW1wbCQob3B0aW9uLnZhbHVlKSA6IHVuZGVmaW5lZCksIGRpc2FibGVkOiBvcHRpb24uZGlzYWJsZWQsIGRpdmlkZXI6IG9wdGlvbi5kaXZpZGVyfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlSW5kZXggPSB0aGlzLmluZGV4T2ZWYWx1ZShvcHRpb24pO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IG9wdGlvbiwgY2hlY2tlZDogdmFsdWVJbmRleCA+IC0xLCBjaGVja2VkVGltZXN0YW1wOiB0aGlzLm9yZGVyYWJsZSAmJiB2YWx1ZUluZGV4LCBsYWJlbDogIXRoaXMubGFiZWxUZW1wbGF0ZSB8fCAhdGhpcy5zZWFyY2hUZXN0ID8gdGhpcy5sYWJlbEltcGwkKG9wdGlvbikgOiB1bmRlZmluZWR9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uc0NvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9uc0NvbXBvbmVudHMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVJbmRleCA9IHRoaXMuaW5kZXhPZlZhbHVlKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogb3B0aW9uLnZhbHVlLCBjaGVja2VkOiB2YWx1ZUluZGV4ID4gLTEsIGNoZWNrZWRUaW1lc3RhbXA6IHRoaXMub3JkZXJhYmxlICYmIHZhbHVlSW5kZXgsIGxhYmVsOiBvcHRpb24ubGFiZWwsIGRpdmlkZXI6ICEhb3B0aW9uLmRpdmlkZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdmVybGF5VGl0bGU6IHN0cmluZztcbiAgICAgICAgaWYgKHRoaXMudGl0bGUpIHtcbiAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IHRoaXMudGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW92ZXJsYXlUaXRsZSAmJiB0aGlzLmxpc3RJdGVtKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5saXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiW2lvbngtc2VsZWN0LW92ZXJsYXktdGl0bGVdXCIpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheVRpdGxlID0gdGl0bGUuaW5uZXJUZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMubGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcImlvbi1sYWJlbFwiKTtcbiAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVRpdGxlID0gbGFiZWwuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3ZlcmxheVRpdGxlICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlKSB7XG4gICAgICAgICAgICBvdmVybGF5VGl0bGUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3ZlcmxheVRpdGxlICYmIHRoaXMucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IHRoaXMucGxhY2Vob2xkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3ZlcmxheURhdGEgPSB7XG4gICAgICAgICAgICBvdmVybGF5OiBvdmVybGF5LFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICAgIG11bHRpcGxlOiAhIXRoaXMubXVsdGlwbGUsXG4gICAgICAgICAgICB0aXRsZTogb3ZlcmxheVRpdGxlLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMubGFiZWxUZW1wbGF0ZSxcbiAgICAgICAgICAgIG9yZGVyYWJsZTogISF0aGlzLm9yZGVyYWJsZSxcbiAgICAgICAgICAgIGVtcHR5OiAhIXRoaXMuZW1wdHksXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiB0aGlzLm92ZXJsYXlXaGl0ZVNwYWNlLFxuICAgICAgICAgICAgdmFsdWVWYWxpZGF0b3I6IHRoaXMuY2hlY2tWYWxpZGF0b3IsXG4gICAgICAgICAgICB2YWx1ZUNvbXBhcmF0b3I6IHRoaXMudmFsdWVDb21wYXJhdG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLFxuXG4gICAgICAgICAgICB1cGRhdGVWYWx1ZXM6ICh2YWx1ZTogYW55W10pID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250cm9sT25Ub3VjaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob3ZlcmxheSA9PSBcInBvcG92ZXJcIikge1xuICAgICAgICAgICAgbGV0IHBvcG92ZXIgPSBhd2FpdCB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmNyZWF0ZSh7Y29tcG9uZW50OiBTZWxlY3RPdmVybGF5Q29udGVudCwgY29tcG9uZW50UHJvcHM6IG92ZXJsYXlEYXRhLCBjc3NDbGFzczogXCJpb254LXNlbGVjdC1vdmVybGF5LXdpZHRoXCIsIGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgcG9wb3Zlci5wcmVzZW50KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogU2VsZWN0T3ZlcmxheUNvbnRlbnQsIGNvbXBvbmVudFByb3BzOiBvdmVybGF5RGF0YX0pO1xuICAgICAgICAgICAgbW9kYWwucHJlc2VudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGluaXREcmFndWxhKCkge1xuXG4gICAgICAgIGlmICh0aGlzLm9yZGVyYWJsZSAmJiAhdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFndWxhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRyYWd1bGEgPSBjcmVhdGVEcmFndWxhKHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJzOiBbdGhpcy50ZXh0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnRdLFxuICAgICAgICAgICAgICAgIG1pcnJvckNvbnRhaW5lcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlvbi1hcHBcIiksXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcblxuICAgICAgICAgICAgICAgIG1vdmVzOiAoZWwsIGNvbnRhaW5lciwgaGFuZGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlcyAmJiB0aGlzLnZhbHVlcy5sZW5ndGggPiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWd1bGEub24oXCJkcm9wXCIsIChlbCwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmcpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoXCJpb254LS1pbmRleFwiKSwgMCk7XG4gICAgICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gc2libGluZyA/IHBhcnNlSW50KHNpYmxpbmcuZ2V0QXR0cmlidXRlKFwiaW9ueC0taW5kZXhcIiksIDApIDogdGhpcy52YWx1ZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVuZEluZGV4ID4gc3RhcnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBlbmRJbmRleCAtPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnZhbHVlc1tzdGFydEluZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcy5zcGxpY2Uoc3RhcnRJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMuc3BsaWNlKGVuZEluZGV4LCAwLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSh0aGlzLnZhbHVlcy5zbGljZSgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlvbkNoYW5nZS5lbWl0KHRoaXMudmFsdWVzLnNsaWNlKCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyYWd1bGEpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ3VsYS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmRyYWd1bGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUNzc0NsYXNzZXMoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0tc2VsZWN0XCIpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbi1pdGVtXCIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaW4taXRlbVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVkTGFiZWxzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbXCJvcmRlcmFibGVcIl0gfHwgY2hhbmdlc1tcInJlYWRvbmx5XCJdIHx8IGNoYW5nZXNbXCJkaXNhYmxlZFwiXSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RHJhZ3VsYSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDc3NDbGFzc2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy90aGlzLnVwZGF0ZVRleHQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNzc0NsYXNzZXMoKTtcblxuICAgICAgICBpZiAodGhpcy5vcmRlcmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERyYWd1bGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19