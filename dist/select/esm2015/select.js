import { __awaiter, __decorate, __param } from "tslib";
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Optional, Output, QueryList, SimpleChanges, ViewChild } from "@angular/core";
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
        this.whiteSpace = "nowrap";
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
__decorate([
    ViewChild("textContainer", { static: true })
], Select.prototype, "textContainer", void 0);
__decorate([
    Input()
], Select.prototype, "placeholder", void 0);
__decorate([
    Input()
], Select.prototype, "overlay", void 0);
__decorate([
    Input()
], Select.prototype, "overlayWhiteSpace", void 0);
__decorate([
    Input(),
    HostBinding("attr.ionx--white-space")
], Select.prototype, "whiteSpace", void 0);
__decorate([
    Input()
], Select.prototype, "alwaysArray", void 0);
__decorate([
    Input()
], Select.prototype, "compareAsString", void 0);
__decorate([
    Input()
], Select.prototype, "comparator", void 0);
__decorate([
    Input()
], Select.prototype, "multiple", void 0);
__decorate([
    Input()
], Select.prototype, "title", void 0);
__decorate([
    Input()
], Select.prototype, "orderable", void 0);
__decorate([
    Input()
], Select.prototype, "empty", void 0);
__decorate([
    Input()
], Select.prototype, "readonly", null);
__decorate([
    Input()
], Select.prototype, "searchTest", void 0);
__decorate([
    Input()
], Select.prototype, "checkValidator", void 0);
__decorate([
    Output()
], Select.prototype, "ionChange", void 0);
__decorate([
    Output()
], Select.prototype, "change", void 0);
__decorate([
    Input()
], Select.prototype, "disabled", null);
__decorate([
    Input()
], Select.prototype, "value", null);
__decorate([
    ContentChild(SelectLabel, { static: false })
], Select.prototype, "labelTemplate", void 0);
__decorate([
    Input()
], Select.prototype, "label", void 0);
__decorate([
    Input()
], Select.prototype, "options", void 0);
__decorate([
    ContentChildren(SelectOption, { descendants: true })
], Select.prototype, "_optionsComponents", null);
Select = __decorate([
    Component({
        selector: "ionx-select",
        host: {
            "[attr.ionx--chips-layout]": "!!orderable || null",
            "[attr.ionx--readonly]": "(!!readonly || !!disabled) || null",
            "[attr.ionx--orderable]": "(!!orderable && !readonly && !disabled && values && values.length > 1) || null",
        },
        template: "<ng-template #optionTemplate let-value=\"value\" let-index=\"index\">\n    <span *ngIf=\"!labelTemplate; else hasLabelTemplate\">{{labelImpl$(value)}}</span>\n    <ng-template #hasLabelTemplate>\n        <ng-container *ngTemplateOutlet=\"labelTemplate.templateRef; context: {$implicit: value, index: index}\"></ng-container>\n    </ng-template>\n</ng-template>\n\n<div class=\"select-inner\">\n    <div class=\"select-text\" #textContainer [class.select-placeholder]=\"values.length == 0\">\n        <span *ngIf=\"values.length == 0; else showValues\">{{placeholder}}</span>\n\n        <ng-template #showValues>\n            <ng-template ngFor [ngForOf]=\"values\" let-value let-index=\"index\">\n                <span *ngIf=\"index > 0 && (!labelTemplate || labelTemplate.separator) && !orderable\">{{!labelTemplate ? \", \" : labelTemplate.separator}}</span>\n\n                <ion-chip *ngIf=\"orderable else simpleText\" outline=\"true\" [attr.ionx--index]=\"index\">\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ion-chip>\n\n                <ng-template #simpleText>\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ng-template>\n\n            </ng-template>\n        </ng-template>\n    </div>\n\n    <ng-container  *ngIf=\"!_readonly && !_disabled\">\n        <div class=\"select-icon\" role=\"presentation\" *ngIf=\"!orderable\">\n            <div class=\"select-icon-inner\"></div>\n        </div>\n        <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\" *ngIf=\"!orderable || !values || values.length === 0\"></button>\n    </ng-container>\n\n</div>\n",
        styles: [":host{--placeholder-opacity:.5;--dropdown-icon-opacity:.5;--disabled-opacity:.5;padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:inline-block;overflow:hidden;color:var(--color);font-family:var(--ion-font-family,inherit);max-width:100%}:host .select-inner{display:-webkit-box;display:flex;position:relative}:host .select-icon{position:relative;width:16px;height:20px}:host .select-icon .select-icon-inner{top:50%;right:0;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:var(--dropdown-icon-opacity,.5);pointer-events:none}:host .select-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .select-text.select-placeholder{opacity:var(--placeholder-opacity,.5)}:host.select-disabled{opacity:var(--disabled-opacity,.5);pointer-events:none}:host.select-readonly{opacity:1;pointer-events:none}:host.select-readonly .select-icon{display:none}:host[ionx--white-space=normal] .select-text,:host[white-space-normal] .select-text{white-space:normal!important;overflow:auto}:host button{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0}:host button::-moz-focus-inner{border:0}:host.in-item{position:static}:host ion-chip{max-width:calc(50% - 4px);-webkit-margin-start:0;margin-inline-start:0;margin-bottom:0;cursor:default}:host ion-chip>span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:1.1}:host [ionx--orderable] ion-chip{cursor:move}:host [ionx--chips-layout] .select-text{white-space:normal;width:100%}:host-context(ion-toolbar){color:var(--ion-toolbar-color);--icon-color:var(--ion-toolbar-color);--padding-start:16px;--padding-end:16px}:host-context(.item-label-stacked){align-self:flex-start;--padding-top:8px;--padding-bottom:8px;--padding-start:0;width:100%}:host-context(.item-label-stacked) .select-text{max-width:calc(100% - 16px);-webkit-box-flex:initial;flex:initial}:host-context(.item-label-stacked)[ionx--chips-layout] .select-text{-webkit-box-flex:1;flex:1}"]
    }),
    __param(4, Optional())
], Select);
export { Select };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc2VsZWN0LyIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvTCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUd0RCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFZOUIsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTTtJQUdmLFlBQW9CLE9BQWdDLEVBQVksSUFBaUIsRUFBVSxpQkFBb0MsRUFBWSxlQUFnQyxFQUF3QixPQUFrQjtRQUFqTSxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUFZLFNBQUksR0FBSixJQUFJLENBQWE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVksb0JBQWUsR0FBZixlQUFlLENB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YUFBYTtRQUN2QixJQUFJLEVBQUU7WUFDRiwyQkFBMkIsRUFBRSxxQkFBcUI7WUFDbEQsdUJBQXVCLEVBQUUsb0NBQW9DO1lBQzdELHdCQUF3QixFQUFFLGdGQUFnRjtTQUM3RztRQUVELDJ5REFBMEI7O0tBQzdCLENBQUM7SUFJZ0wsV0FBQSxRQUFRLEVBQUUsQ0FBQTtHQUgvSyxNQUFNLENBc2VsQjtTQXRlWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE9wdGlvbmFsLCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlciwgUG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0ICogYXMgZHJhZ3VsYSBmcm9tIFwiZHJhZ3VsYVwiO1xuaW1wb3J0IHtTZWxlY3RMYWJlbH0gZnJvbSBcIi4vc2VsZWN0LWxhYmVsXCI7XG5pbXBvcnQge1NlbGVjdE9wdGlvbn0gZnJvbSBcIi4vc2VsZWN0LW9wdGlvblwiO1xuaW1wb3J0IHtTZWxlY3RPcHRpb25zfSBmcm9tIFwiLi9zZWxlY3Qtb3B0aW9uc1wiO1xuaW1wb3J0IHtTZWxlY3RPdmVybGF5Q29udGVudH0gZnJvbSBcIi4vc2VsZWN0LW92ZXJsYXlcIjtcbmltcG9ydCB7U2VsZWN0T3ZlcmxheU9wdGlvbn0gZnJvbSBcIi4vc2VsZWN0LW92ZXJsYXktb3B0aW9uXCI7XG5cbmNvbnN0IGNyZWF0ZURyYWd1bGEgPSBkcmFndWxhO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXNlbGVjdFwiLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCJbYXR0ci5pb254LS1jaGlwcy1sYXlvdXRdXCI6IFwiISFvcmRlcmFibGUgfHwgbnVsbFwiLFxuICAgICAgICBcIlthdHRyLmlvbngtLXJlYWRvbmx5XVwiOiBcIighIXJlYWRvbmx5IHx8ICEhZGlzYWJsZWQpIHx8IG51bGxcIixcbiAgICAgICAgXCJbYXR0ci5pb254LS1vcmRlcmFibGVdXCI6IFwiKCEhb3JkZXJhYmxlICYmICFyZWFkb25seSAmJiAhZGlzYWJsZWQgJiYgdmFsdWVzICYmIHZhbHVlcy5sZW5ndGggPiAxKSB8fCBudWxsXCIsXG4gICAgfSxcbiAgICBzdHlsZVVybHM6IFtcInNlbGVjdC5zY3NzXCJdLFxuICAgIHRlbXBsYXRlVXJsOiBcInNlbGVjdC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25Jbml0IHtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJvdGVjdGVkIGludGw6IEludGxTZXJ2aWNlLCBwcml2YXRlIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlciwgcHJvdGVjdGVkIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgY29udHJvbDogTmdDb250cm9sKSB7XG5cbiAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgX2xpc3RJdGVtOiBIVE1MSW9uSXRlbUVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIGdldCBsaXN0SXRlbSgpIHtcblxuICAgICAgICBpZiAodGhpcy5fbGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0SXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0SXRlbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24taXRlbVwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRyYWd1bGE6IGRyYWd1bGEuRHJha2U7XG5cbiAgICBAVmlld0NoaWxkKFwidGV4dENvbnRhaW5lclwiLCB7c3RhdGljOiB0cnVlfSlcbiAgICB0ZXh0Q29udGFpbmVyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvdmVybGF5OiBcInBvcG92ZXJcIiB8IFwibW9kYWxcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG92ZXJsYXlXaGl0ZVNwYWNlOiBcIm5vd3JhcFwiIHwgXCJub3JtYWxcIiA9IFwibm93cmFwXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZyhcImF0dHIuaW9ueC0td2hpdGUtc3BhY2VcIilcbiAgICBwdWJsaWMgd2hpdGVTcGFjZTogXCJub3dyYXBcIiB8IFwibm9ybWFsXCIgPSBcIm5vd3JhcFwiO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB2YWx1ZSBzaG91bGQgYmUgYWx3YXlzIHJldHVybmVkIGFzIGFycmF5LCBubyBtYXR0ZXIgaWYgbXVsdGlwbGUgaXMgc2V0IHRvIHRydWUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgYWx3YXlzQXJyYXk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHZhbHVlcyBhcyBzdHJpbmcsIHRoYXQgaXMgd2hldGhlciB0b1N0cmluZygpIG9mIGJvdGggdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjb21wYXJlQXNTdHJpbmc6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjb21wYXJhdG9yOiAoYTogYW55LCBiOiBhbnkpID0+IGJvb2xlYW4gfCBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBJZiBtdWx0aXBsZSB2YWx1ZSBzZWxlY3Rpb24gaXMgYWxsb3dlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBtdWx0aXBsZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aXRsZSBvZiB0aGUgc2VsZWN0IG92ZXJsYXkgKG9ubHkgaW4gY2FzZSBvZiBtb2RhbHMpLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBJZiBtdWx0aXBsZSB2YWx1ZXMgc2VsZWN0aW9uIGNhbiBiZSBvcmRlcmVkIGFmdGVyIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvcmRlcmFibGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBlbXB0eTogYm9vbGVhbiA9IHRydWU7XG5cblxuICAgIF9yZWFkb25seTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVhZG9ubHkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZG9ubHkgPSByZWFkb25seSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZWFkb25seSA9IHJlYWRvbmx5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fcmVhZG9ubHk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uLCB0aGF0IHdpbGwgYmUgdXNlZCBmb3IgdGVzdGluZyBpZiB2YWx1ZSBwYXNzZXMgc2VhcmNoIGNyaXRpZXJpYS5cbiAgICAgKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIGNoZWNrcyBsb3dlcmNhc2VkIGxhYmVsIG9mIHZhbHVlIGFnYWluc3QgXG4gICAgICogbG93ZXJjYXNlZCBzZWFyY2hlZCB0ZXh0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNlYXJjaFRlc3Q6IChxdWVyeTogc3RyaW5nLCB2YWx1ZTogYW55LCBsYWJlbDogc3RyaW5nKSA9PiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY2hlY2tWYWxpZGF0b3I6ICh2YWx1ZTogYW55LCBjaGVja2VkOiBib29sZWFuLCBvdGhlckNoZWNrZWRWYWx1ZXM6IGFueVtdKSA9PiBhbnlbXTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSB0aGlzLmlvbkNoYW5nZTtcblxuXG4gICAgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHNlbGVjdCBjb21wb25lbnQgaXMgZGlzYWJsZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbiB8IHN0cmluZykge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGRpc2FibGVkIHx8IGRpc2FibGVkID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8qcHJpdmF0ZSovdmFsdWVzOiBhbnlbXSA9IFtdO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBhbnkgfCBhbnlbXSkge1xuXG4gICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6ICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsID8gW3ZhbHVlXSA6IFtdKTtcblxuICAgICAgICBpZiAobmV3VmFsdWUubGVuZ3RoICE9IHRoaXMudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudmFsdWVDb21wYXJhdG9yKHRoaXMudmFsdWVzW2ldLCBuZXdWYWx1ZVtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWVzID0gbmV3VmFsdWU7XG5cbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tMaXN0SXRlbUhhc1ZhbHVlKCk7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpcmVPbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pb25DaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpcmVPbkNoYW5nZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHwgYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSB8fCB0aGlzLmFsd2F5c0FycmF5ID8gdGhpcy52YWx1ZXMuc2xpY2UoMCkgOiAodGhpcy52YWx1ZXMubGVuZ3RoID4gMCA/IHRoaXMudmFsdWVzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhY2hlZExhYmVsczogc3RyaW5nW107XG5cbiAgICAvKnByaXZhdGUqLyBsYWJlbEltcGwkKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMgaW5zdGFuY2VvZiBTZWxlY3RPcHRpb25zKSB7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZWRMYWJlbHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZExhYmVscyA9IG5ldyBBcnJheSh0aGlzLm9wdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZUNvbXBhcmF0b3IodmFsdWUsIHRoaXMub3B0aW9uc1tpXS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlZExhYmVsc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkTGFiZWxzW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkTGFiZWxzW2ldID0gdGhpcy5vcHRpb25zW2ldLmxhYmVsID8gdGhpcy5vcHRpb25zW2ldLmxhYmVsIDogKHRoaXMubGFiZWwgPyB0aGlzLmxhYmVsKHZhbHVlKSA6IHZhbHVlICsgXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2FjaGVkTGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkTGFiZWxzID0gbmV3IEFycmF5KHRoaXMub3B0aW9ucy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVDb21wYXJhdG9yKHZhbHVlLCB0aGlzLm9wdGlvbnNbaV0pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlZExhYmVsc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZExhYmVsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkTGFiZWxzW2ldID0gdGhpcy5sYWJlbCA/IHRoaXMubGFiZWwodmFsdWUpIDogdmFsdWUgKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zQ29tcG9uZW50cykge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBvcHRpb25zID0gdGhpcy5vcHRpb25zQ29tcG9uZW50cy50b0FycmF5KCksIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ29tcGFyYXRvcih2YWx1ZSwgb3B0aW9uc1tpXS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnNbaV0ubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlyZU9uQ2hhbmdlOiBib29sZWFuO1xuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tMaXN0SXRlbUhhc1ZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcImhhcy12YWx1ZVwiKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJoYXMtdmFsdWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgdmFsdWVDb21wYXJhdG9yID0gKGE6IGFueSwgYjogYW55KSA9PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcGFyZUFzU3RyaW5nKSB7XG4gICAgICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkICYmIGEgIT09IG51bGwgJiYgYiAhPT0gdW5kZWZpbmVkICYmIGIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS50b1N0cmluZygpID09IGIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEgPT0gYjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29tcGFyYXRvcikge1xuICAgICAgICAgICAgY29uc3QgciA9IHRoaXMuY29tcGFyYXRvcihhLCBiKTtcbiAgICAgICAgICAgIHJldHVybiByID09PSAwIHx8IHIgPT09IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBhID09PSBiO1xuICAgIH1cblxuXG4gICAgQENvbnRlbnRDaGlsZChTZWxlY3RMYWJlbCwge3N0YXRpYzogZmFsc2V9KVxuICAgIC8qcHJpdmF0ZSovIGxhYmVsVGVtcGxhdGU6IFNlbGVjdExhYmVsO1xuXG4gICAgQElucHV0KClcbiAgICBsYWJlbDogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcblxuXG4gICAgQElucHV0KClcbiAgICBvcHRpb25zOiBhbnlbXSB8IFNlbGVjdE9wdGlvbnM7XG5cbiAgICBwcml2YXRlIG9wdGlvbnNDb21wb25lbnRzOiBRdWVyeUxpc3Q8U2VsZWN0T3B0aW9uPjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oU2VsZWN0T3B0aW9uLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICAgIHByb3RlY3RlZCBzZXQgX29wdGlvbnNDb21wb25lbnRzKHZhbDogUXVlcnlMaXN0PFNlbGVjdE9wdGlvbj4pIHtcbiAgICAgICAgdGhpcy5vcHRpb25zQ29tcG9uZW50cyA9IHZhbDtcbiAgICAgICAgLy90aGlzLm9wdGlvbnNDb21wb25lbnRzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlVGV4dCgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluZGV4T2ZWYWx1ZSh2YWx1ZTogYW55KTogbnVtYmVyIHtcblxuICAgICAgICBpZiAoIXRoaXMudmFsdWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZUNvbXBhcmF0b3IodmFsdWUsIHRoaXMudmFsdWVzW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBjb250cm9sT25DaGFuZ2U6IEZ1bmN0aW9uO1xuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb250cm9sT25Ub3VjaGVkOiBGdW5jdGlvbjtcblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBhc3luYyBvcGVuKGV2ZW50OiBFdmVudCkge1xuXG4gICAgICAgIGxldCBvdmVybGF5OiBcInBvcG92ZXJcIiB8IFwibW9kYWxcIiA9IHRoaXMub3ZlcmxheTtcblxuICAgICAgICBpZiAoIW92ZXJsYXkpIHtcbiAgICAgICAgICAgIG92ZXJsYXkgPSBcInBvcG92ZXJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvcHRpb25zOiBTZWxlY3RPdmVybGF5T3B0aW9uW10gPSBbXTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyBpbnN0YW5jZW9mIFNlbGVjdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlSW5kZXggPSBvcHRpb24udmFsdWUgPyB0aGlzLmluZGV4T2ZWYWx1ZShvcHRpb24udmFsdWUpIDogLTE7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogb3B0aW9uLnZhbHVlLCBjaGVja2VkOiBvcHRpb24udmFsdWUgPyB2YWx1ZUluZGV4ID4gLTEgOiBmYWxzZSwgY2hlY2tlZFRpbWVzdGFtcDogdGhpcy5vcmRlcmFibGUgJiYgdmFsdWVJbmRleCwgbGFiZWw6IG9wdGlvbi5sYWJlbCA/IG9wdGlvbi5sYWJlbCA6ICgoIXRoaXMuc2VhcmNoVGVzdCB8fCAhdGhpcy5sYWJlbFRlbXBsYXRlKSA/IHRoaXMubGFiZWxJbXBsJChvcHRpb24udmFsdWUpIDogdW5kZWZpbmVkKSwgZGlzYWJsZWQ6IG9wdGlvbi5kaXNhYmxlZCwgZGl2aWRlcjogb3B0aW9uLmRpdmlkZXJ9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVJbmRleCA9IHRoaXMuaW5kZXhPZlZhbHVlKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogb3B0aW9uLCBjaGVja2VkOiB2YWx1ZUluZGV4ID4gLTEsIGNoZWNrZWRUaW1lc3RhbXA6IHRoaXMub3JkZXJhYmxlICYmIHZhbHVlSW5kZXgsIGxhYmVsOiAhdGhpcy5sYWJlbFRlbXBsYXRlIHx8ICF0aGlzLnNlYXJjaFRlc3QgPyB0aGlzLmxhYmVsSW1wbCQob3B0aW9uKSA6IHVuZGVmaW5lZH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zQ29tcG9uZW50cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5vcHRpb25zQ29tcG9uZW50cy50b0FycmF5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUluZGV4ID0gdGhpcy5pbmRleE9mVmFsdWUob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBvcHRpb24udmFsdWUsIGNoZWNrZWQ6IHZhbHVlSW5kZXggPiAtMSwgY2hlY2tlZFRpbWVzdGFtcDogdGhpcy5vcmRlcmFibGUgJiYgdmFsdWVJbmRleCwgbGFiZWw6IG9wdGlvbi5sYWJlbCwgZGl2aWRlcjogISFvcHRpb24uZGl2aWRlcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG92ZXJsYXlUaXRsZTogc3RyaW5nO1xuICAgICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICAgICAgb3ZlcmxheVRpdGxlID0gdGhpcy50aXRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3ZlcmxheVRpdGxlICYmIHRoaXMubGlzdEl0ZW0pIHtcblxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoXCJbaW9ueC1zZWxlY3Qtb3ZlcmxheS10aXRsZV1cIikgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5VGl0bGUgPSB0aXRsZS5pbm5lclRleHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5saXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiaW9uLWxhYmVsXCIpO1xuICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBvdmVybGF5VGl0bGUgPSBsYWJlbC5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvdmVybGF5VGl0bGUgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUpIHtcbiAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvdmVybGF5VGl0bGUgJiYgdGhpcy5wbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgb3ZlcmxheVRpdGxlID0gdGhpcy5wbGFjZWhvbGRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdmVybGF5RGF0YSA9IHtcbiAgICAgICAgICAgIG92ZXJsYXk6IG92ZXJsYXksXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgbXVsdGlwbGU6ICEhdGhpcy5tdWx0aXBsZSxcbiAgICAgICAgICAgIHRpdGxlOiBvdmVybGF5VGl0bGUsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy5sYWJlbFRlbXBsYXRlLFxuICAgICAgICAgICAgb3JkZXJhYmxlOiAhIXRoaXMub3JkZXJhYmxlLFxuICAgICAgICAgICAgZW1wdHk6ICEhdGhpcy5lbXB0eSxcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6IHRoaXMub3ZlcmxheVdoaXRlU3BhY2UsXG4gICAgICAgICAgICB2YWx1ZVZhbGlkYXRvcjogdGhpcy5jaGVja1ZhbGlkYXRvcixcbiAgICAgICAgICAgIHZhbHVlQ29tcGFyYXRvcjogdGhpcy52YWx1ZUNvbXBhcmF0b3IsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsXG5cbiAgICAgICAgICAgIHVwZGF0ZVZhbHVlczogKHZhbHVlOiBhbnlbXSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlT25DaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPblRvdWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvdmVybGF5ID09IFwicG9wb3ZlclwiKSB7XG4gICAgICAgICAgICBsZXQgcG9wb3ZlciA9IGF3YWl0IHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IFNlbGVjdE92ZXJsYXlDb250ZW50LCBjb21wb25lbnRQcm9wczogb3ZlcmxheURhdGEsIGNzc0NsYXNzOiBcImlvbngtc2VsZWN0LW92ZXJsYXktd2lkdGhcIiwgZXZlbnQ6IGV2ZW50fSk7XG4gICAgICAgICAgICBwb3BvdmVyLnByZXNlbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7Y29tcG9uZW50OiBTZWxlY3RPdmVybGF5Q29udGVudCwgY29tcG9uZW50UHJvcHM6IG92ZXJsYXlEYXRhfSk7XG4gICAgICAgICAgICBtb2RhbC5wcmVzZW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgaW5pdERyYWd1bGEoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMub3JkZXJhYmxlICYmICF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWd1bGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ3VsYSA9IGNyZWF0ZURyYWd1bGEoe1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcnM6IFt0aGlzLnRleHRDb250YWluZXIubmF0aXZlRWxlbWVudF0sXG4gICAgICAgICAgICAgICAgbWlycm9yQ29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW9uLWFwcFwiKSxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuXG4gICAgICAgICAgICAgICAgbW92ZXM6IChlbCwgY29udGFpbmVyLCBoYW5kbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzICYmIHRoaXMudmFsdWVzLmxlbmd0aCA+IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ3VsYS5vbihcImRyb3BcIiwgKGVsLCB0YXJnZXQsIHNvdXJjZSwgc2libGluZykgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZShcImlvbngtLWluZGV4XCIpLCAwKTtcbiAgICAgICAgICAgICAgICBsZXQgZW5kSW5kZXggPSBzaWJsaW5nID8gcGFyc2VJbnQoc2libGluZy5nZXRBdHRyaWJ1dGUoXCJpb254LS1pbmRleFwiKSwgMCkgOiB0aGlzLnZhbHVlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoZW5kSW5kZXggPiBzdGFydEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGVuZEluZGV4IC09IDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMudmFsdWVzW3N0YXJ0SW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzLnNwbGljZShzdGFydEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcy5zcGxpY2UoZW5kSW5kZXgsIDAsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlKHRoaXMudmFsdWVzLnNsaWNlKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaW9uQ2hhbmdlLmVtaXQodGhpcy52YWx1ZXMuc2xpY2UoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHJhZ3VsYSkge1xuICAgICAgICAgICAgdGhpcy5kcmFndWxhLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ3VsYSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQ3NzQ2xhc3NlcygpIHtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1zZWxlY3RcIik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImluLWl0ZW1cIik7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbi1pdGVtXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cbiAgICAgICAgaWYgKGNoYW5nZXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5jYWNoZWRMYWJlbHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlc1tcIm9yZGVyYWJsZVwiXSB8fCBjaGFuZ2VzW1wicmVhZG9ubHlcIl0gfHwgY2hhbmdlc1tcImRpc2FibGVkXCJdKSB7XG4gICAgICAgICAgICB0aGlzLmluaXREcmFndWxhKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNzc0NsYXNzZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvL3RoaXMudXBkYXRlVGV4dCgpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ3NzQ2xhc3NlcygpO1xuXG4gICAgICAgIGlmICh0aGlzLm9yZGVyYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RHJhZ3VsYSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=