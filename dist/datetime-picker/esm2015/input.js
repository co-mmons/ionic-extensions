import * as tslib_1 from "tslib";
var DateTimePickerInput_1;
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from "@angular/core";
import { NgControl } from "@angular/forms";
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
tslib_1.__decorate([
    ViewChild("nativeInput", { read: ElementRef, static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], DateTimePickerInput.prototype, "nativeInput", void 0);
tslib_1.__decorate([
    HostBinding("class.datetime-disabled"),
    tslib_1.__metadata("design:type", Boolean)
], DateTimePickerInput.prototype, "_disabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], DateTimePickerInput.prototype, "readonly", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DateTimePickerInput.prototype, "overlayTitle", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DateTimePickerInput.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], DateTimePickerInput.prototype, "ionChange", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], DateTimePickerInput.prototype, "timezoneDisabled", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DateTimePickerInput.prototype, "defaultTimezone", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], DateTimePickerInput.prototype, "disabled", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], DateTimePickerInput.prototype, "displayFormat", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], DateTimePickerInput.prototype, "pickerFormat", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [Object])
], DateTimePickerInput.prototype, "value", null);
tslib_1.__decorate([
    HostListener("click", ["$event"]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UIEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], DateTimePickerInput.prototype, "clicked", null);
tslib_1.__decorate([
    HostListener("keyup.space"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
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
        styles: [":host{position:relative;display:block;flex:1;width:100%;--padding-end:16px;--padding-start:16px;--padding-top:10px;--padding-bottom:10px}:host .native-input{padding-top:var(--padding-top,10px);padding-bottom:var(--padding-bottom,9px);padding-left:var(--padding-start,0);padding-right:var(--padding-end,0);display:inline-block;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:0;background:0 0;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host .native-input::-webkit-input-placeholder{opacity:.5}:host .native-input::-moz-placeholder{opacity:.5}:host .native-input:-ms-input-placeholder{opacity:.5}:host .native-input::-ms-input-placeholder{opacity:.5}:host .native-input::placeholder{opacity:.5}:host .native-input:-webkit-autofill{background-color:transparent}:host-context(.md){--padding-bottom:11px}:host-context(.item-label-stacked){--padding-end:0px;--padding-start:0px;--padding-top:9px;--padding-bottom:9px}:host-context(.ios) .native-input{--padding-top:9px;--padding-bottom:8px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        IntlService,
        ModalController,
        NgControl])
], DateTimePickerInput);
export { DateTimePickerInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kYXRldGltZS1waWNrZXIvIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqSixPQUFPLEVBQXVCLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQWtCaEQsSUFBYSxtQkFBbUIsMkJBQWhDLE1BQWEsbUJBQW1CO0lBTTVCLFlBQ1ksT0FBZ0MsRUFDaEMsSUFBaUIsRUFDakIsZUFBZ0MsRUFDOUIsT0FBa0I7UUFIcEIsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQTJDdkIsY0FBUyxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBeEN6RCxJQUFJLE9BQU8sRUFBRTtZQUNULE9BQU8sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQWRPLE1BQU0sQ0FBQyxlQUFlO1FBQzFCLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMs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T0Q7SUFEQyxLQUFLLEVBQUU7OztnREFvQ1A7QUE0RGE7SUFEYixZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUNSLE9BQU87O2tEQVVoQztBQUdhO0lBRGIsWUFBWSxDQUFDLGFBQWEsQ0FBQzs7OztrREFHM0I7QUE5T1EsbUJBQW1CO0lBZC9CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7O0tBU1Q7O0tBRUosQ0FBQzs2Q0FRdUIsVUFBVTtRQUNiLFdBQVc7UUFDQSxlQUFlO1FBQ3JCLFNBQVM7R0FWdkIsbUJBQW1CLENBMlkvQjtTQTNZWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHtEYXRlVGltZXpvbmV9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtkZWZhdWx0RGF0ZVRpbWVGb3JtYXR9IGZyb20gXCIuL2RlZmF1bHQtZm9ybWF0c1wiO1xuaW1wb3J0IHtEYXRlVGltZVBpY2tlck92ZXJsYXl9IGZyb20gXCIuL292ZXJsYXlcIjtcblxudHlwZSBWYWx1ZSA9IERhdGUgfCBEYXRlVGltZXpvbmUgfCBudW1iZXI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZGF0ZXRpbWVcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW5wdXQgI25hdGl2ZUlucHV0XG4gICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgY2xhc3M9XCJuYXRpdmUtaW5wdXRcIiBcbiAgICAgICAgICAgICAgIHJlYWRvbmx5IFthdHRyLmRpc2FibGVkXT1cImRpc2FibGVkIHx8IG51bGxcIlxuICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXIgfHwgbnVsbFwiXG4gICAgICAgICAgICAgICBbYXR0ci52YWx1ZV09XCJ0ZXh0IHx8IG51bGxcIlxuICAgICAgICAgICAgICAgKGZvY3VzKT1cIm5hdGl2ZUlucHV0Rm9jdXNlZCgpXCIgXG4gICAgICAgICAgICAgICAoYmx1cik9XCJuYXRpdmVJbnB1dEJsdXJlZCgpXCIvPlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbXCJpbnB1dC5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VySW5wdXQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcblxuICAgIHByaXZhdGUgc3RhdGljIGN1cnJlbnRUaW1lem9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgaW50bDogSW50bFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXG4gICAgICAgIHByb3RlY3RlZCBjb250cm9sOiBOZ0NvbnRyb2xcbiAgICApIHtcblxuICAgICAgICBpZiAoY29udHJvbCkge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbXV0ZUNvbnRyb2xPbkNoYW5nZTogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgX2xpc3RJdGVtOiBIVE1MSW9uSXRlbUVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIF9kaXNwbGF5Rm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucztcblxuICAgIHByaXZhdGUgX3BpY2tlckZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnM7XG5cbiAgICBAVmlld0NoaWxkKFwibmF0aXZlSW5wdXRcIiwge3JlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBuYXRpdmVJbnB1dDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgICBwcml2YXRlIF90ZXh0OiBzdHJpbmc7XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5kYXRldGltZS1kaXNhYmxlZFwiKVxuICAgIC8qcHJpdmF0ZSovIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgX3ZhbHVlOiBEYXRlVGltZXpvbmU7XG5cbiAgICBwcml2YXRlIG9wZW5lZDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgY29udHJvbE9uQ2hhbmdlOiBGdW5jdGlvbjtcblxuICAgIHByaXZhdGUgY29udHJvbE9uVG91Y2hlZDogRnVuY3Rpb247XG5cblxuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBcbiAgICBvdmVybGF5VGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFZhbHVlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGltZXpvbmUgY2Fubm90IGJlIGNoYW5nZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aW1lem9uZURpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGltZXpvbmUsIHRoYXQgd2lsbCBiZSBzZXQsIHdoZW4gbmV3IHZhbHVlIGlzIHBpY2tlZCBmcm9tIHBpY2tlci5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRlZmF1bHRUaW1lem9uZTogc3RyaW5nO1xuXG5cbiAgICBnZXQgdGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIGRhdGV0aW1lLXBpY2tlciBjb21wb25lbnQgaXMgZGlzYWJsZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZCB8fCBkaXNhYmxlZCA9PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBsaXN0SXRlbSgpIHtcblxuICAgICAgICBpZiAodGhpcy5fbGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0SXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0SXRlbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24taXRlbVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGlzcGxheSBmb3JtYXQgb2YgdGhlIGRhdGUgYW5kIHRpbWUgYXMgdGV4dCB0aGF0IHNob3dzXG4gICAgICogd2l0aGluIHRoZSBpdGVtLiBXaGVuIHRoZSBgcGlja2VyRm9ybWF0YCBpbnB1dCBpcyBub3QgdXNlZCwgdGhlbiB0aGVcbiAgICAgKiBgZGlzcGxheUZvcm1hdGAgaXMgdXNlZCBmb3IgYm90aCBkaXNwbGF5IHRoZSBmb3JtYXR0ZWQgdGV4dCwgYW5kIGRldGVybWluaW5nXG4gICAgICogdGhlIGRhdGV0aW1lLXBpY2tlciBwaWNrZXIncyBjb2x1bW5zLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRpc3BsYXlGb3JtYXQoZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucykge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5Rm9ybWF0ID0gdGhpcy5pbnRsLmZpbmRGb3JtYXR0ZXJQcmVkZWZpbmVkT3B0aW9ucyhJbnRsLkRhdGVUaW1lRm9ybWF0LCBmb3JtYXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGxheUZvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBkaXNwbGF5Rm9ybWF0KCk6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlGb3JtYXQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgcGlja2VyRm9ybWF0KGZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9waWNrZXJGb3JtYXQgPSB0aGlzLmludGwuZmluZEZvcm1hdHRlclByZWRlZmluZWRPcHRpb25zKEludGwuRGF0ZVRpbWVGb3JtYXQsIGZvcm1hdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9waWNrZXJGb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcGlja2VyRm9ybWF0KCk6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlckZvcm1hdDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVmFsdWUpIHtcblxuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICgodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgIT0gKHRoaXMuX3ZhbHVlID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgKHRoaXMuX3ZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgIT09IHRoaXMuX3ZhbHVlLmRhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlICYmICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmdldFRpbWUoKSAhPT0gdGhpcy5fdmFsdWUuZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGVUaW1lem9uZSAmJiAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5kYXRlLmdldFRpbWUoKSAhPT0gdGhpcy5fdmFsdWUuZGF0ZS5nZXRUaW1lKCkgfHwgdmFsdWUudGltZXpvbmUgIT09IHRoaXMuX3ZhbHVlLnRpbWV6b25lKSkge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ldyBEYXRlVGltZXpvbmUodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXcgRGF0ZVRpbWV6b25lKHZhbHVlLmdldFRpbWUoKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlVGltZXpvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3IERhdGVUaW1lem9uZShuZXcgRGF0ZSh2YWx1ZS5kYXRlLmdldFRpbWUoKSksIHZhbHVlLnRpbWV6b25lID09PSBcImN1cnJlbnRcIiA/IERhdGVUaW1lUGlja2VySW5wdXQuY3VycmVudFRpbWV6b25lKCkgOiB2YWx1ZS50aW1lem9uZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmlvbkNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTGlzdEl0ZW1IYXNWYWx1ZSgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sT25DaGFuZ2UgJiYgIXRoaXMubXV0ZUNvbnRyb2xPbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tdXRlQ29udHJvbE9uQ2hhbmdlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCk6IFZhbHVlIHtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZXpvbmUobmV3IERhdGUodGhpcy5fdmFsdWUuZGF0ZS5nZXRUaW1lKCkpLCB0aGlzLl92YWx1ZS50aW1lem9uZSk7XG4gICAgfVxuXG4gICAgY2xlYXJWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodGhpcy5jb250cm9sT25Ub3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrTGlzdEl0ZW1IYXNWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJoYXMtdmFsdWVcIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUZXh0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRpc3BsYXlGb3JtYXQgfHwgZGVmYXVsdERhdGVUaW1lRm9ybWF0KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlLnRpbWV6b25lKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50aW1lWm9uZSA9IHRoaXMuX3ZhbHVlLnRpbWV6b25lO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLnRpbWVab25lTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lTmFtZSA9IFwic2hvcnRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fdmFsdWUudGltZXpvbmUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lID0gXCJVVENcIjtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRoaXMuaW50bC5kYXRlVGltZUZvcm1hdCh0aGlzLl92YWx1ZSwgb3B0aW9ucyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIC8qcHJvdGVjdGVkKi8gY2xpY2tlZChldjogVUlFdmVudCkge1xuXG4gICAgICAgIGlmIChldi5kZXRhaWwgPT09IDAgfHwgdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLm9wZW4oZXYpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXl1cC5zcGFjZVwiKVxuICAgIC8qcHJvdGVjdGVkKi8ga2V5dXBlZCgpIHtcbiAgICAgICAgdGhpcy5vcGVuKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBvcGVuKGV2ZW50PzogRXZlbnQpIHtcblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLm9wZW5lZCB8fCB0aGlzLnJlYWRvbmx5ICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZm9ybWF0T3B0aW9ucyA9IHRoaXMucGlja2VyRm9ybWF0IHx8IHRoaXMuZGlzcGxheUZvcm1hdCB8fCBkZWZhdWx0RGF0ZVRpbWVGb3JtYXQ7XG5cbiAgICAgICAgbGV0IHRpbWV6b25lID0gdGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS50aW1lem9uZSA6IHRoaXMuZGVmYXVsdFRpbWV6b25lO1xuICAgICAgICBpZiAodGltZXpvbmUgPT09IFwiY3VycmVudFwiKSB7XG4gICAgICAgICAgICB0aW1lem9uZSA9IERhdGVUaW1lUGlja2VySW5wdXQuY3VycmVudFRpbWV6b25lKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWU6IERhdGUgPSB0aGlzLl92YWx1ZSAmJiB0aGlzLl92YWx1ZS5kYXRlID8gdGhpcy5fdmFsdWUuZGF0ZSA6IG5ldyBEYXRlKCk7IHtcbiAgICAgICAgICAgIGlmICghdGltZXpvbmUgfHwgdGltZXpvbmUgPT09IFwiVVRDXCIpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKERhdGUuVVRDKHZhbHVlLmdldFVUQ0Z1bGxZZWFyKCksIHZhbHVlLmdldFVUQ01vbnRoKCksIHZhbHVlLmdldFVUQ0RhdGUoKSwgdmFsdWUuZ2V0VVRDSG91cnMoKSwgdmFsdWUuZ2V0VVRDTWludXRlcygpLCAwLCAwKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpICsgKERhdGVUaW1lem9uZS50aW1lem9uZU9mZnNldCh0aW1lem9uZSwgdmFsdWUpICogNjAgKiAxMDAwICogLTEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdmVybGF5VGl0bGU6IHN0cmluZyA9IHRoaXMub3ZlcmxheVRpdGxlO1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSAmJiAhb3ZlcmxheVRpdGxlKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLmxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoXCJpb24tbGFiZWxcIik7XG4gICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5VGl0bGUgPSBsYWJlbC5pbm5lclRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvdmVybGF5ID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogRGF0ZVRpbWVQaWNrZXJPdmVybGF5LFxuICAgICAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zOiBmb3JtYXRPcHRpb25zLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICB0aW1lem9uZTogdGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS50aW1lem9uZSA6ICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkID8gKHRoaXMuZGVmYXVsdFRpbWV6b25lID09PSBcImN1cnJlbnRcIiA/IERhdGVUaW1lUGlja2VySW5wdXQuY3VycmVudFRpbWV6b25lKCkgOiB0aGlzLmRlZmF1bHRUaW1lem9uZSkgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIHRpbWV6b25lRGlzYWJsZWQ6IHRoaXMudGltZXpvbmVEaXNhYmxlZCxcbiAgICAgICAgICAgICAgICB0aXRsZTogb3ZlcmxheVRpdGxlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFja2Ryb3BEaXNtaXNzOiB0cnVlLCBcbiAgICAgICAgICAgIHNob3dCYWNrZHJvcDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBvdmVybGF5LnByZXNlbnQoKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlDbG9zZWQoKGF3YWl0IG92ZXJsYXkub25EaWREaXNtaXNzKCkpLmRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3ZlcmxheUNsb3NlZChuZXdWYWx1ZTogRGF0ZVRpbWV6b25lKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1oYXMtZm9jdXNcIik7XG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMubXV0ZUNvbnRyb2xPbkNoYW5nZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIERhdGVUaW1lem9uZSB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgbmF0aXZlSW5wdXRGb2N1c2VkKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXRlbS1oYXMtZm9jdXNcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWhhcy1mb2N1c1wiKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmICghdGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdGl2ZUlucHV0Qmx1cmVkKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1oYXMtZm9jdXNcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbXCJkaXNwbGF5Rm9ybWF0XCJdKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzW1wicmVhZG9ubHlcIl0gfHwgY2hhbmdlc1tcImRpc2FibGVkXCJdKSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwQ3NzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgIHRoaXMuc2V0dXBDc3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwQ3NzKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWlucHV0XCIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIC8vdGhpcy5zZXRJdGVtSW5wdXRDb250cm9sQ3NzKCk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBzZXRJdGVtSW5wdXRDb250cm9sQ3NzKCkge1xuICAgIC8vICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbTtcbiAgICAvLyAgICAgaWYgKGl0ZW0gJiYgdGhpcy5jb250cm9sKSB7XG4gICAgLy8gICAgICAgICB0aGlzLnNldENvbnRyb2xDc3MoaXRlbSwgdGhpcy5jb250cm9sKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgc2V0Q29udHJvbENzcyhlbGVtZW50OiBhbnksIGNvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLXVudG91Y2hlZFwiLCBjb250cm9sLnVudG91Y2hlZCk7XG4gICAgLy8gICAgIGVsZW1lbnQuc2V0RWxlbWVudENsYXNzKFwibmctdG91Y2hlZFwiLCBjb250cm9sLnRvdWNoZWQpO1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLXByaXN0aW5lXCIsIGNvbnRyb2wucHJpc3RpbmUpO1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLWRpcnR5XCIsIGNvbnRyb2wuZGlydHkpO1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLXZhbGlkXCIsIGNvbnRyb2wudmFsaWQpO1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLWludmFsaWRcIiwgIWNvbnRyb2wudmFsaWQgJiYgY29udHJvbC5lbmFibGVkKTtcbiAgICAvLyB9XG5cblxufVxuIl19