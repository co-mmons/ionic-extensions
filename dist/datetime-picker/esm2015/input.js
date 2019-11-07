import * as tslib_1 from "tslib";
var DateTimePickerInput_1;
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
import { defaultDateTimeFormat } from "./default-formats";
import { DateTimePickerOverlay } from "./overlay";
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            if (!this._disabled && !this.readonly && !this.listItem.classList.contains("item-has-focus")) {
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
DateTimePickerInput.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService },
    { type: ModalController },
    { type: NgControl }
];
tslib_1.__decorate([
    ViewChild("nativeInput", { read: ElementRef, static: true })
], DateTimePickerInput.prototype, "nativeInput", void 0);
tslib_1.__decorate([
    HostBinding("class.datetime-disabled")
], DateTimePickerInput.prototype, "_disabled", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerInput.prototype, "readonly", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerInput.prototype, "overlayTitle", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerInput.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Output()
], DateTimePickerInput.prototype, "ionChange", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerInput.prototype, "timezoneDisabled", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerInput.prototype, "defaultTimezone", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerInput.prototype, "disabled", null);
tslib_1.__decorate([
    Input()
], DateTimePickerInput.prototype, "displayFormat", null);
tslib_1.__decorate([
    Input()
], DateTimePickerInput.prototype, "pickerFormat", null);
tslib_1.__decorate([
    Input()
], DateTimePickerInput.prototype, "value", null);
tslib_1.__decorate([
    HostListener("click", ["$event"])
], DateTimePickerInput.prototype, "clicked", null);
tslib_1.__decorate([
    HostListener("keyup.space")
], DateTimePickerInput.prototype, "keyuped", null);
DateTimePickerInput = DateTimePickerInput_1 = tslib_1.__decorate([
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
        styles: [":host{position:relative;display:block;-webkit-box-flex:1;flex:1;width:100%;--padding-end:16px;--padding-start:16px;--padding-top:10px;--padding-bottom:10px}:host .native-input{padding-top:var(--padding-top,10px);padding-bottom:var(--padding-bottom,9px);padding-left:var(--padding-start,0);padding-right:var(--padding-end,0);display:inline-block;-webkit-box-flex:1;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:0;background:0 0;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host .native-input::-webkit-input-placeholder{opacity:.5}:host .native-input::-moz-placeholder{opacity:.5}:host .native-input:-ms-input-placeholder{opacity:.5}:host .native-input::-ms-input-placeholder{opacity:.5}:host .native-input::placeholder{opacity:.5}:host .native-input:-webkit-autofill{background-color:transparent}:host-context(.md){--padding-bottom:11px}:host-context(.item-label-stacked){--padding-end:0px;--padding-start:0px;--padding-top:9px;--padding-bottom:9px}:host-context(.ios) .native-input{--padding-top:9px;--padding-bottom:8px}"]
    })
], DateTimePickerInput);
export { DateTimePickerInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kYXRldGltZS1waWNrZXIvIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakosT0FBTyxFQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQWtCaEQsSUFBYSxtQkFBbUIsMkJBQWhDLE1BQWEsbUJBQW1CO0lBTTVCLFlBQ1ksT0FBZ0MsRUFDaEMsSUFBaUIsRUFDakIsZUFBZ0MsRUFDOUIsT0FBa0I7UUFIcEIsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQTJDdkIsY0FBUyxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBeEN6RCxJQUFJLE9BQU8sRUFBRTtZQUNULE9BQU8sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQWRPLE1BQU0sQ0FBQyxlQUFlO1FBQzFCLE9BQU8sSUFBSSxJQUFJLENBQUMs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RTs0REFDZ0I7QUFXeEI7SUFEQyxLQUFLLEVBQUU7bURBR1A7QUFzQkQ7SUFEQyxLQUFLLEVBQUU7d0RBUVA7QUFPRDtJQURDLEtBQUssRUFBRTt1REFRUDtBQU9EO0lBREMsS0FBSyxFQUFFO2dEQW9DUDtBQTREYTtJQURiLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztrREFXakM7QUFHYTtJQURiLFlBQVksQ0FBQyxhQUFhLENBQUM7a0RBRzNCO0FBOU9RLG1CQUFtQjtJQWQvQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZUFBZTtRQUN6QixRQUFRLEVBQUU7Ozs7Ozs7OztLQVNUOztLQUVKLENBQUM7R0FDVyxtQkFBbUIsQ0EyWS9CO1NBM1lZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge0RhdGVUaW1lem9uZX0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge2RlZmF1bHREYXRlVGltZUZvcm1hdH0gZnJvbSBcIi4vZGVmYXVsdC1mb3JtYXRzXCI7XG5pbXBvcnQge0RhdGVUaW1lUGlja2VyT3ZlcmxheX0gZnJvbSBcIi4vb3ZlcmxheVwiO1xuXG50eXBlIFZhbHVlID0gRGF0ZSB8IERhdGVUaW1lem9uZSB8IG51bWJlcjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kYXRldGltZVwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpbnB1dCAjbmF0aXZlSW5wdXRcbiAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICBjbGFzcz1cIm5hdGl2ZS1pbnB1dFwiIFxuICAgICAgICAgICAgICAgcmVhZG9ubHkgW2F0dHIuZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlciB8fCBudWxsXCJcbiAgICAgICAgICAgICAgIFthdHRyLnZhbHVlXT1cInRleHQgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICAoZm9jdXMpPVwibmF0aXZlSW5wdXRGb2N1c2VkKClcIiBcbiAgICAgICAgICAgICAgIChibHVyKT1cIm5hdGl2ZUlucHV0Qmx1cmVkKClcIi8+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFtcImlucHV0LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJJbnB1dCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3VycmVudFRpbWV6b25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBpbnRsOiBJbnRsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcbiAgICAgICAgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge1xuXG4gICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtdXRlQ29udHJvbE9uQ2hhbmdlOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfbGlzdEl0ZW06IEhUTUxJb25JdGVtRWxlbWVudDtcblxuICAgIHByaXZhdGUgX2Rpc3BsYXlGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBfcGlja2VyRm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucztcblxuICAgIEBWaWV3Q2hpbGQoXCJuYXRpdmVJbnB1dFwiLCB7cmVhZDogRWxlbWVudFJlZiwgc3RhdGljOiB0cnVlfSlcbiAgICBwcml2YXRlIG5hdGl2ZUlucHV0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICAgIHByaXZhdGUgX3RleHQ6IHN0cmluZztcblxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmRhdGV0aW1lLWRpc2FibGVkXCIpXG4gICAgLypwcml2YXRlKi8gX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IERhdGVUaW1lem9uZTtcblxuICAgIHByaXZhdGUgb3BlbmVkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25DaGFuZ2U6IEZ1bmN0aW9uO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25Ub3VjaGVkOiBGdW5jdGlvbjtcblxuXG4gICAgQElucHV0KClcbiAgICByZWFkb25seTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIFxuICAgIG92ZXJsYXlUaXRsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VmFsdWU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aW1lem9uZSBjYW5ub3QgYmUgY2hhbmdlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRpbWV6b25lRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUaW1lem9uZSwgdGhhdCB3aWxsIGJlIHNldCwgd2hlbiBuZXcgdmFsdWUgaXMgcGlja2VkIGZyb20gcGlja2VyLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGVmYXVsdFRpbWV6b25lOiBzdHJpbmc7XG5cblxuICAgIGdldCB0ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgZGF0ZXRpbWUtcGlja2VyIGNvbXBvbmVudCBpcyBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbiB8IHN0cmluZykge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGRpc2FibGVkIHx8IGRpc2FibGVkID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGxpc3RJdGVtKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1pdGVtXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBkaXNwbGF5IGZvcm1hdCBvZiB0aGUgZGF0ZSBhbmQgdGltZSBhcyB0ZXh0IHRoYXQgc2hvd3NcbiAgICAgKiB3aXRoaW4gdGhlIGl0ZW0uIFdoZW4gdGhlIGBwaWNrZXJGb3JtYXRgIGlucHV0IGlzIG5vdCB1c2VkLCB0aGVuIHRoZVxuICAgICAqIGBkaXNwbGF5Rm9ybWF0YCBpcyB1c2VkIGZvciBib3RoIGRpc3BsYXkgdGhlIGZvcm1hdHRlZCB0ZXh0LCBhbmQgZGV0ZXJtaW5pbmdcbiAgICAgKiB0aGUgZGF0ZXRpbWUtcGlja2VyIHBpY2tlcidzIGNvbHVtbnMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgZGlzcGxheUZvcm1hdChmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlGb3JtYXQgPSB0aGlzLmludGwuZmluZEZvcm1hdHRlclByZWRlZmluZWRPcHRpb25zKEludGwuRGF0ZVRpbWVGb3JtYXQsIGZvcm1hdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5Rm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGRpc3BsYXlGb3JtYXQoKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheUZvcm1hdDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBwaWNrZXJGb3JtYXQoZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucykge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlckZvcm1hdCA9IHRoaXMuaW50bC5maW5kRm9ybWF0dGVyUHJlZGVmaW5lZE9wdGlvbnMoSW50bC5EYXRlVGltZUZvcm1hdCwgZm9ybWF0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlckZvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwaWNrZXJGb3JtYXQoKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyRm9ybWF0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBWYWx1ZSkge1xuXG4gICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSAhPSAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSAhPT0gdGhpcy5fdmFsdWUuZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgKHRoaXMuX3ZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUuZ2V0VGltZSgpICE9PSB0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZVRpbWV6b25lICYmICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmRhdGUuZ2V0VGltZSgpICE9PSB0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSB8fCB2YWx1ZS50aW1lem9uZSAhPT0gdGhpcy5fdmFsdWUudGltZXpvbmUpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3IERhdGVUaW1lem9uZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ldyBEYXRlVGltZXpvbmUodmFsdWUuZ2V0VGltZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGVUaW1lem9uZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXcgRGF0ZVRpbWV6b25lKG5ldyBEYXRlKHZhbHVlLmRhdGUuZ2V0VGltZSgpKSwgdmFsdWUudGltZXpvbmUgPT09IFwiY3VycmVudFwiID8gRGF0ZVRpbWVQaWNrZXJJbnB1dC5jdXJyZW50VGltZXpvbmUoKSA6IHZhbHVlLnRpbWV6b25lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW9uQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tMaXN0SXRlbUhhc1ZhbHVlKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPbkNoYW5nZSAmJiAhdGhpcy5tdXRlQ29udHJvbE9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm11dGVDb250cm9sT25DaGFuZ2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogVmFsdWUge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lem9uZShuZXcgRGF0ZSh0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSksIHRoaXMuX3ZhbHVlLnRpbWV6b25lKTtcbiAgICB9XG5cbiAgICBjbGVhclZhbHVlKCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xPblRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tMaXN0SXRlbUhhc1ZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcImhhcy12YWx1ZVwiKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJoYXMtdmFsdWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRleHQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGlzcGxheUZvcm1hdCB8fCBkZWZhdWx0RGF0ZVRpbWVGb3JtYXQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWUudGltZXpvbmUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lID0gdGhpcy5fdmFsdWUudGltZXpvbmU7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMudGltZVpvbmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGltZVpvbmVOYW1lID0gXCJzaG9ydFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLl92YWx1ZS50aW1lem9uZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudGltZVpvbmUgPSBcIlVUQ1wiO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudGltZVpvbmVOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGhpcy5pbnRsLmRhdGVUaW1lRm9ybWF0KHRoaXMuX3ZhbHVlLCBvcHRpb25zKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgLypwcm90ZWN0ZWQqLyBjbGlja2VkKGV2OiBVSUV2ZW50KSB7XG5cbiAgICAgICAgaWYgKGV2LmRldGFpbCA9PT0gMCB8fCB0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMub3Blbihldik7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleXVwLnNwYWNlXCIpXG4gICAgLypwcm90ZWN0ZWQqLyBrZXl1cGVkKCkge1xuICAgICAgICB0aGlzLm9wZW4odW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIG9wZW4oZXZlbnQ/OiBFdmVudCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMub3BlbmVkIHx8IHRoaXMucmVhZG9ubHkgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmb3JtYXRPcHRpb25zID0gdGhpcy5waWNrZXJGb3JtYXQgfHwgdGhpcy5kaXNwbGF5Rm9ybWF0IHx8IGRlZmF1bHREYXRlVGltZUZvcm1hdDtcblxuICAgICAgICBsZXQgdGltZXpvbmUgPSB0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLnRpbWV6b25lIDogdGhpcy5kZWZhdWx0VGltZXpvbmU7XG4gICAgICAgIGlmICh0aW1lem9uZSA9PT0gXCJjdXJyZW50XCIpIHtcbiAgICAgICAgICAgIHRpbWV6b25lID0gRGF0ZVRpbWVQaWNrZXJJbnB1dC5jdXJyZW50VGltZXpvbmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWx1ZTogRGF0ZSA9IHRoaXMuX3ZhbHVlICYmIHRoaXMuX3ZhbHVlLmRhdGUgPyB0aGlzLl92YWx1ZS5kYXRlIDogbmV3IERhdGUoKTsge1xuICAgICAgICAgICAgaWYgKCF0aW1lem9uZSB8fCB0aW1lem9uZSA9PT0gXCJVVENcIikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUoRGF0ZS5VVEModmFsdWUuZ2V0VVRDRnVsbFllYXIoKSwgdmFsdWUuZ2V0VVRDTW9udGgoKSwgdmFsdWUuZ2V0VVRDRGF0ZSgpLCB2YWx1ZS5nZXRVVENIb3VycygpLCB2YWx1ZS5nZXRVVENNaW51dGVzKCksIDAsIDApKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZS5nZXRUaW1lKCkgKyAoRGF0ZVRpbWV6b25lLnRpbWV6b25lT2Zmc2V0KHRpbWV6b25lLCB2YWx1ZSkgKiA2MCAqIDEwMDAgKiAtMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG92ZXJsYXlUaXRsZTogc3RyaW5nID0gdGhpcy5vdmVybGF5VGl0bGU7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtICYmICFvdmVybGF5VGl0bGUpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IHRoaXMubGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcImlvbi1sYWJlbFwiKTtcbiAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IGxhYmVsLmlubmVyVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xuICAgICAgICAgICAgY29tcG9uZW50OiBEYXRlVGltZVBpY2tlck92ZXJsYXksXG4gICAgICAgICAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgICAgICAgICAgIGZvcm1hdE9wdGlvbnM6IGZvcm1hdE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHRpbWV6b25lOiB0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLnRpbWV6b25lIDogKHRoaXMuX3ZhbHVlID09PSB1bmRlZmluZWQgPyAodGhpcy5kZWZhdWx0VGltZXpvbmUgPT09IFwiY3VycmVudFwiID8gRGF0ZVRpbWVQaWNrZXJJbnB1dC5jdXJyZW50VGltZXpvbmUoKSA6IHRoaXMuZGVmYXVsdFRpbWV6b25lKSA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgdGltZXpvbmVEaXNhYmxlZDogdGhpcy50aW1lem9uZURpc2FibGVkLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBvdmVybGF5VGl0bGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrZHJvcERpc21pc3M6IHRydWUsIFxuICAgICAgICAgICAgc2hvd0JhY2tkcm9wOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG92ZXJsYXkucHJlc2VudCgpO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheUNsb3NlZCgoYXdhaXQgb3ZlcmxheS5vbkRpZERpc21pc3MoKSkuZGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvdmVybGF5Q2xvc2VkKG5ld1ZhbHVlOiBEYXRlVGltZXpvbmUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250cm9sT25Ub3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWhhcy1mb2N1c1wiKTtcbiAgICAgICAgICAgIHRoaXMubmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5tdXRlQ29udHJvbE9uQ2hhbmdlID0gdHJ1ZTtcblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlIHx8IHZhbHVlIGluc3RhbmNlb2YgRGF0ZVRpbWV6b25lIHx8IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBuYXRpdmVJbnB1dEZvY3VzZWQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXRlbS1oYXMtZm9jdXNcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWhhcy1mb2N1c1wiKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmICghdGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdGl2ZUlucHV0Qmx1cmVkKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1oYXMtZm9jdXNcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbXCJkaXNwbGF5Rm9ybWF0XCJdKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzW1wicmVhZG9ubHlcIl0gfHwgY2hhbmdlc1tcImRpc2FibGVkXCJdKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwQ3NzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgIHRoaXMuc2V0dXBDc3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwQ3NzKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWlucHV0XCIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIC8vdGhpcy5zZXRJdGVtSW5wdXRDb250cm9sQ3NzKCk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBzZXRJdGVtSW5wdXRDb250cm9sQ3NzKCkge1xuICAgIC8vICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbTtcbiAgICAvLyAgICAgaWYgKGl0ZW0gJiYgdGhpcy5jb250cm9sKSB7XG4gICAgLy8gICAgICAgICB0aGlzLnNldENvbnRyb2xDc3MoaXRlbSwgdGhpcy5jb250cm9sKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgc2V0Q29udHJvbENzcyhlbGVtZW50OiBhbnksIGNvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLXVudG91Y2hlZFwiLCBjb250cm9sLnVudG91Y2hlZCk7XG4gICAgLy8gICAgIGVsZW1lbnQuc2V0RWxlbWVudENsYXNzKFwibmctdG91Y2hlZFwiLCBjb250cm9sLnRvdWNoZWQpO1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLXByaXN0aW5lXCIsIGNvbnRyb2wucHJpc3RpbmUpO1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLWRpcnR5XCIsIGNvbnRyb2wuZGlydHkpO1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLXZhbGlkXCIsIGNvbnRyb2wudmFsaWQpO1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLWludmFsaWRcIiwgIWNvbnRyb2wudmFsaWQgJiYgY29udHJvbC5lbmFibGVkKTtcbiAgICAvLyB9XG5cblxufVxuIl19