import { __awaiter } from "tslib";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Optional, Output, ViewChild } from "@angular/core";
import { NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
import { defaultDateTimeFormat } from "./default-formats";
import { DateTimePickerOverlay } from "./overlay";
export class DateTimePickerInput {
    constructor(element, intl, modalController, control) {
        this.element = element;
        this.intl = intl;
        this.modalController = modalController;
        this.control = control;
        this._disabled = false;
        this._readonly = false;
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
    get readonly() {
        return this._readonly;
    }
    set readonly(rdonly) {
        this._readonly = rdonly === "" || rdonly === "true" || rdonly === true ? true : false;
        this.setupCss();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled === "" || disabled === "true" || disabled === true ? true : false;
        this.setupCss();
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
            this._displayFormat = this.intl.findPredefinedFormatOptions(format);
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
            this._pickerFormat = this.intl.findPredefinedFormatOptions(format);
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
            this._value = new DateTimezone(new Date(value.date.getTime()), value.timezone === "current" ? DateTimePickerInput.currentTimezone() : value.timezone);
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
                this.listItem.classList.add("item-has-value");
            }
            else {
                this.listItem.classList.remove("item-has-value");
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
    clicked(ev) {
        if (ev.detail === 0 || this.disabled || this.readonly) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open(ev);
    }
    /*protected*/ clearButtonClicked(event) {
        event.stopPropagation();
        this.clearValue();
    }
    open(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.disabled || this.opened || this.readonly) {
                return;
            }
            this.opened = true;
            const formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
            let timezone = this._value ? this._value.timezone : this.defaultTimezone;
            if (timezone === "current") {
                timezone = DateTimePickerInput.currentTimezone();
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
                    timezone: this._value ? this._value.timezone : (this._value === undefined ? (this.defaultTimezone === "current" ? DateTimePickerInput.currentTimezone() : this.defaultTimezone) : undefined),
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
            this.nativeInput.nativeElement.focus();
            setTimeout(() => this.nativeInput.nativeElement.focus());
        }
        this.opened = false;
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
            if (!this._disabled && !this._readonly && !this.listItem.classList.contains("item-has-focus")) {
                this.listItem.classList.add("item-has-focus");
            }
        }
    }
    nativeInputBlured() {
        if (this.listItem) {
            this.listItem.classList.remove("item-has-focus");
        }
    }
    /*private*/ inputKeyUpDown(event) {
        if (event.key === "Tab" || event.key === "Shift" || event.key == "Alt" || event.key == "Ctrl" || event.key === "Meta") {
            return;
        }
        if (!event.metaKey) {
            event.preventDefault();
            this.open(event);
        }
    }
    ngOnChanges(changes) {
        if (changes["displayFormat"]) {
            this.updateText();
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
}
DateTimePickerInput.decorators = [
    { type: Component, args: [{
                selector: "ionx-datetime",
                template: "<div #nativeInput\n     class=\"ionx--input\"\n     contenteditable=\"true\"\n     spellcheck=\"false\"\n     (focus)=\"nativeInputFocused()\"\n     (blur)=\"nativeInputBlured()\"\n     (cut)=\"$event.preventDefault()\"\n     (paste)=\"$event.preventDefault()\"\n     (keyup)=\"inputKeyUpDown($event)\"\n     (keydown)=\"inputKeyUpDown($event)\"\n>{{hasValue() ? text : placeholder}}</div>\n\n<ion-button fill=\"clear\" size=\"small\" (click)=\"clearButtonClicked($event)\" *ngIf=\"clearButtonVisible && !readonly && !disabled && hasValue()\">\n    <ion-icon name=\"close\" [slot]=\"clearButtonText ? 'start' : 'icon-only'\"></ion-icon>\n    <span *ngIf=\"!!clearButtonText\">{{clearButtonText}}</span>\n</ion-button>\n",
                host: {
                    "[class.ionx--placeholder-visible]": "!hasValue()"
                },
                styles: [":host{position:relative;display:flex;align-items:center;flex:1;width:100%;--padding-top: 10px;--padding-bottom: 10px;--padding-start: 0px;--padding-end: 0px}:host .ionx--input{padding-top:var(--padding-top, 10px);padding-bottom:var(--padding-bottom, 9px);padding-left:var(--padding-start);padding-right:var(--padding-end);display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:0;outline:none;-webkit-user-select:none;user-select:none;pointer-events:none}:host:not(.ionx--placeholder-visible).ionx--disabled .ionx--input,:host:not(.ionx--placeholder-visible).ionx--readonly .ionx--input{-webkit-user-select:text;user-select:text;pointer-events:initial}:host.ionx--placeholder-visible .ionx--input,:host.ionx--disabled .ionx--input{opacity:var(--placeholder-opacity, var(--ionx-placeholder-opacity, .5))}:host-context(.md){--padding-bottom: 11px}:host-context(.item-label-stacked){--padding-end: 0px;--padding-start: 0px;--padding-top: 9px;--padding-bottom: 9px}:host-context(.ios) .native-input{--padding-top: 9px;--padding-bottom: 8px}\n"]
            },] }
];
DateTimePickerInput.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService },
    { type: ModalController },
    { type: NgControl, decorators: [{ type: Optional }] }
];
DateTimePickerInput.propDecorators = {
    nativeInput: [{ type: ViewChild, args: ["nativeInput", { read: ElementRef, static: true },] }],
    overlayTitle: [{ type: Input }],
    placeholder: [{ type: Input }],
    ionChange: [{ type: Output }],
    timezoneDisabled: [{ type: Input }],
    defaultTimezone: [{ type: Input }],
    clearButtonVisible: [{ type: Input }],
    clearButtonIcon: [{ type: Input }],
    clearButtonText: [{ type: Input }],
    readonly: [{ type: Input }, { type: HostBinding, args: ["class.ionx--readonly",] }],
    disabled: [{ type: HostBinding, args: ["class.ionx--disabled",] }, { type: Input }],
    displayFormat: [{ type: Input }],
    pickerFormat: [{ type: Input }],
    value: [{ type: Input }],
    clicked: [{ type: HostListener, args: ["click", ["$event"],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0ZXRpbWUtcGlja2VyL2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFFLE1BQU0sRUFBaUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNKLE9BQU8sRUFBdUIsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBWWhELE1BQU0sT0FBTyxtQkFBbUI7SUFNNUIsWUFDWSxPQUFnQyxFQUNoQyxJQUFpQixFQUNqQixlQUFnQyxFQUNsQixPQUFrQjtRQUhoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBcUJwQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFrQjFCLGNBQVMsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXRDekQsSUFBSSxPQUFPLEVBQUU7WUFDVCxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUNoQztJQUNMLENBQUM7SUFkTyxNQUFNLENBQUMsZUFBZTtRQUMxQixPQUFPLElBQUksSUFBSSxDQUFDLGNB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SUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUN0RDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUNuRDtTQUNKO0lBQ0wsQ0FBQzs7O1lBelpKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsMnRCQUF5QjtnQkFFekIsSUFBSSxFQUFFO29CQUNGLG1DQUFtQyxFQUFFLGFBQWE7aUJBQ3JEOzthQUNKOzs7WUFqQmtCLFVBQVU7WUFFckIsV0FBVztZQUVYLGVBQWU7WUFITyxTQUFTLHVCQTJCOUIsUUFBUTs7OzBCQVFaLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7MkJBMEJ6RCxLQUFLOzBCQUdMLEtBQUs7d0JBR0wsTUFBTTsrQkFNTixLQUFLOzhCQU1MLEtBQUs7aUNBSUwsS0FBSzs4QkFHTCxLQUFLOzhCQUdMLEtBQUs7dUJBUUwsS0FBSyxZQUNMLFdBQVcsU0FBQyxzQkFBc0I7dUJBVWxDLFdBQVcsU0FBQyxzQkFBc0IsY0FDbEMsS0FBSzs0QkF5QkwsS0FBSzsyQkFjTCxLQUFLO29CQWNMLEtBQUs7c0JBK0ZMLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPcHRpb25hbCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0NvbnRyb2x9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7RGF0ZVRpbWV6b25lfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7ZGVmYXVsdERhdGVUaW1lRm9ybWF0fSBmcm9tIFwiLi9kZWZhdWx0LWZvcm1hdHNcIjtcbmltcG9ydCB7RGF0ZVRpbWVQaWNrZXJPdmVybGF5fSBmcm9tIFwiLi9vdmVybGF5XCI7XG5cbnR5cGUgVmFsdWUgPSBEYXRlIHwgRGF0ZVRpbWV6b25lIHwgbnVtYmVyO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRhdGV0aW1lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaW5wdXQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiaW5wdXQuc2Nzc1wiXSxcbiAgICBob3N0OiB7XG4gICAgICAgIFwiW2NsYXNzLmlvbngtLXBsYWNlaG9sZGVyLXZpc2libGVdXCI6IFwiIWhhc1ZhbHVlKClcIlxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJJbnB1dCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3VycmVudFRpbWV6b25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBpbnRsOiBJbnRsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge1xuXG4gICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChcIm5hdGl2ZUlucHV0XCIsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgbmF0aXZlSW5wdXQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gICAgcHJpdmF0ZSBtdXRlQ29udHJvbE9uQ2hhbmdlOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfbGlzdEl0ZW06IEhUTUxJb25JdGVtRWxlbWVudDtcblxuICAgIHByaXZhdGUgX2Rpc3BsYXlGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBfcGlja2VyRm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucztcblxuICAgIHByaXZhdGUgX3RleHQ6IHN0cmluZztcblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9yZWFkb25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IERhdGVUaW1lem9uZTtcblxuICAgIHByaXZhdGUgb3BlbmVkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25DaGFuZ2U6IEZ1bmN0aW9uO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25Ub3VjaGVkOiBGdW5jdGlvbjtcblxuXG4gICAgQElucHV0KCkgXG4gICAgb3ZlcmxheVRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxWYWx1ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRpbWV6b25lIGNhbm5vdCBiZSBjaGFuZ2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGltZXpvbmVEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRpbWV6b25lLCB0aGF0IHdpbGwgYmUgc2V0LCB3aGVuIG5ldyB2YWx1ZSBpcyBwaWNrZWQgZnJvbSBwaWNrZXIuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZWZhdWx0VGltZXpvbmU6IHN0cmluZztcblxuXG4gICAgQElucHV0KClcbiAgICBjbGVhckJ1dHRvblZpc2libGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGNsZWFyQnV0dG9uSWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBjbGVhckJ1dHRvblRleHQ6IHN0cmluZztcblxuXG4gICAgZ2V0IHRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW9ueC0tcmVhZG9ubHlcIilcbiAgICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgICB9XG5cbiAgICBzZXQgcmVhZG9ubHkocmRvbmx5OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlYWRvbmx5ID0gKHJkb25seSBhcyBhbnkpID09PSBcIlwiIHx8IChyZG9ubHkgYXMgYW55KSA9PT0gXCJ0cnVlXCIgfHwgcmRvbmx5ID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLnNldHVwQ3NzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW9ueC0tZGlzYWJsZWRcIilcbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IChkaXNhYmxlZCBhcyBhbnkpID09PSBcIlwiIHx8IChkaXNhYmxlZCBhcyBhbnkpID09PSBcInRydWVcIiB8fCBkaXNhYmxlZCA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXR1cENzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGxpc3RJdGVtKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1pdGVtXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBkaXNwbGF5IGZvcm1hdCBvZiB0aGUgZGF0ZSBhbmQgdGltZSBhcyB0ZXh0IHRoYXQgc2hvd3NcbiAgICAgKiB3aXRoaW4gdGhlIGl0ZW0uIFdoZW4gdGhlIGBwaWNrZXJGb3JtYXRgIGlucHV0IGlzIG5vdCB1c2VkLCB0aGVuIHRoZVxuICAgICAqIGBkaXNwbGF5Rm9ybWF0YCBpcyB1c2VkIGZvciBib3RoIGRpc3BsYXkgdGhlIGZvcm1hdHRlZCB0ZXh0LCBhbmQgZGV0ZXJtaW5pbmdcbiAgICAgKiB0aGUgZGF0ZXRpbWUtcGlja2VyIHBpY2tlcidzIGNvbHVtbnMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgZGlzcGxheUZvcm1hdChmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlGb3JtYXQgPSB0aGlzLmludGwuZmluZFByZWRlZmluZWRGb3JtYXRPcHRpb25zKGZvcm1hdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5Rm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGRpc3BsYXlGb3JtYXQoKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheUZvcm1hdDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBwaWNrZXJGb3JtYXQoZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucykge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlckZvcm1hdCA9IHRoaXMuaW50bC5maW5kUHJlZGVmaW5lZEZvcm1hdE9wdGlvbnMoZm9ybWF0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlckZvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwaWNrZXJGb3JtYXQoKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyRm9ybWF0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBWYWx1ZSkge1xuXG4gICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSAhPSAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSAhPT0gdGhpcy5fdmFsdWUuZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgKHRoaXMuX3ZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUuZ2V0VGltZSgpICE9PSB0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZVRpbWV6b25lICYmICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmRhdGUuZ2V0VGltZSgpICE9PSB0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSB8fCB2YWx1ZS50aW1lem9uZSAhPT0gdGhpcy5fdmFsdWUudGltZXpvbmUpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3IERhdGVUaW1lem9uZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ldyBEYXRlVGltZXpvbmUodmFsdWUuZ2V0VGltZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGVUaW1lem9uZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXcgRGF0ZVRpbWV6b25lKG5ldyBEYXRlKHZhbHVlLmRhdGUuZ2V0VGltZSgpKSwgdmFsdWUudGltZXpvbmUgPT09IFwiY3VycmVudFwiID8gRGF0ZVRpbWVQaWNrZXJJbnB1dC5jdXJyZW50VGltZXpvbmUoKSA6IHZhbHVlLnRpbWV6b25lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW9uQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tMaXN0SXRlbUhhc1ZhbHVlKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPbkNoYW5nZSAmJiAhdGhpcy5tdXRlQ29udHJvbE9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm11dGVDb250cm9sT25DaGFuZ2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogVmFsdWUge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lem9uZShuZXcgRGF0ZSh0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSksIHRoaXMuX3ZhbHVlLnRpbWV6b25lKTtcbiAgICB9XG5cbiAgICBjbGVhclZhbHVlKCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xPblRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tMaXN0SXRlbUhhc1ZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taGFzLXZhbHVlXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taGFzLXZhbHVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUZXh0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRpc3BsYXlGb3JtYXQgfHwgZGVmYXVsdERhdGVUaW1lRm9ybWF0KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlLnRpbWV6b25lKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50aW1lWm9uZSA9IHRoaXMuX3ZhbHVlLnRpbWV6b25lO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLnRpbWVab25lTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lTmFtZSA9IFwic2hvcnRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fdmFsdWUudGltZXpvbmUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lID0gXCJVVENcIjtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRoaXMuaW50bC5kYXRlVGltZUZvcm1hdCh0aGlzLl92YWx1ZSwgb3B0aW9ucyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIGNsaWNrZWQoZXY6IFVJRXZlbnQpIHtcblxuICAgICAgICBpZiAoZXYuZGV0YWlsID09PSAwIHx8IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vcGVuKGV2KTtcbiAgICB9XG5cbiAgICAvKnByb3RlY3RlZCovIGNsZWFyQnV0dG9uQ2xpY2tlZChldmVudDogVUlFdmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLmNsZWFyVmFsdWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIG9wZW4oZXZlbnQ/OiBFdmVudCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMub3BlbmVkIHx8IHRoaXMucmVhZG9ubHkgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZm9ybWF0T3B0aW9ucyA9IHRoaXMucGlja2VyRm9ybWF0IHx8IHRoaXMuZGlzcGxheUZvcm1hdCB8fCBkZWZhdWx0RGF0ZVRpbWVGb3JtYXQ7XG5cbiAgICAgICAgbGV0IHRpbWV6b25lID0gdGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS50aW1lem9uZSA6IHRoaXMuZGVmYXVsdFRpbWV6b25lO1xuICAgICAgICBpZiAodGltZXpvbmUgPT09IFwiY3VycmVudFwiKSB7XG4gICAgICAgICAgICB0aW1lem9uZSA9IERhdGVUaW1lUGlja2VySW5wdXQuY3VycmVudFRpbWV6b25lKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWU6IERhdGUgPSB0aGlzLl92YWx1ZSAmJiB0aGlzLl92YWx1ZS5kYXRlID8gdGhpcy5fdmFsdWUuZGF0ZSA6IG5ldyBEYXRlKCk7IHtcbiAgICAgICAgICAgIGlmICghdGltZXpvbmUgfHwgdGltZXpvbmUgPT09IFwiVVRDXCIpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKERhdGUuVVRDKHZhbHVlLmdldFVUQ0Z1bGxZZWFyKCksIHZhbHVlLmdldFVUQ01vbnRoKCksIHZhbHVlLmdldFVUQ0RhdGUoKSwgdmFsdWUuZ2V0VVRDSG91cnMoKSwgdmFsdWUuZ2V0VVRDTWludXRlcygpLCAwLCAwKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpICsgKERhdGVUaW1lem9uZS50aW1lem9uZU9mZnNldCh0aW1lem9uZSwgdmFsdWUpICogNjAgKiAxMDAwICogLTEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdmVybGF5VGl0bGU6IHN0cmluZyA9IHRoaXMub3ZlcmxheVRpdGxlO1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSAmJiAhb3ZlcmxheVRpdGxlKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLmxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoXCJpb24tbGFiZWxcIik7XG4gICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5VGl0bGUgPSBsYWJlbC5pbm5lclRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvdmVybGF5ID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogRGF0ZVRpbWVQaWNrZXJPdmVybGF5LFxuICAgICAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zOiBmb3JtYXRPcHRpb25zLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICB0aW1lem9uZTogdGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS50aW1lem9uZSA6ICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkID8gKHRoaXMuZGVmYXVsdFRpbWV6b25lID09PSBcImN1cnJlbnRcIiA/IERhdGVUaW1lUGlja2VySW5wdXQuY3VycmVudFRpbWV6b25lKCkgOiB0aGlzLmRlZmF1bHRUaW1lem9uZSkgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIHRpbWV6b25lRGlzYWJsZWQ6IHRoaXMudGltZXpvbmVEaXNhYmxlZCxcbiAgICAgICAgICAgICAgICB0aXRsZTogb3ZlcmxheVRpdGxlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFja2Ryb3BEaXNtaXNzOiB0cnVlLCBcbiAgICAgICAgICAgIHNob3dCYWNrZHJvcDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBvdmVybGF5LnByZXNlbnQoKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlDbG9zZWQoKGF3YWl0IG92ZXJsYXkub25EaWREaXNtaXNzKCkpLmRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3ZlcmxheUNsb3NlZChuZXdWYWx1ZTogRGF0ZVRpbWV6b25lKSB7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250cm9sT25Ub3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLm11dGVDb250cm9sT25DaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHwgdmFsdWUgaW5zdGFuY2VvZiBEYXRlVGltZXpvbmUgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIG5hdGl2ZUlucHV0Rm9jdXNlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlZCAmJiAhdGhpcy5fcmVhZG9ubHkgJiYgIXRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXRlbS1oYXMtZm9jdXNcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWhhcy1mb2N1c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdGl2ZUlucHV0Qmx1cmVkKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1oYXMtZm9jdXNcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKnByaXZhdGUqLyBpbnB1dEtleVVwRG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuXG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiVGFiXCIgfHwgZXZlbnQua2V5ID09PSBcIlNoaWZ0XCIgfHwgZXZlbnQua2V5ID09IFwiQWx0XCIgfHwgZXZlbnQua2V5ID09IFwiQ3RybFwiIHx8IGV2ZW50LmtleSA9PT0gXCJNZXRhXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5vcGVuKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgICAgICBpZiAoY2hhbmdlc1tcImRpc3BsYXlGb3JtYXRcIl0pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICB0aGlzLnNldHVwQ3NzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cENzcygpIHtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pbnB1dFwiKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==