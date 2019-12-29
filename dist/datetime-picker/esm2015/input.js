var DateTimePickerInput_1;
import { __awaiter, __decorate, __param } from "tslib";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Optional, Output, SimpleChanges, ViewChild } from "@angular/core";
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
        this._disabled = rdonly === "" || rdonly === "true" || rdonly === true ? true : false;
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
};
DateTimePickerInput.ctorParameters = () => [
    { type: ElementRef },
    { type: IntlService },
    { type: ModalController },
    { type: NgControl, decorators: [{ type: Optional }] }
];
__decorate([
    ViewChild("nativeInput", { read: ElementRef, static: true })
], DateTimePickerInput.prototype, "nativeInput", void 0);
__decorate([
    Input()
], DateTimePickerInput.prototype, "overlayTitle", void 0);
__decorate([
    Input()
], DateTimePickerInput.prototype, "placeholder", void 0);
__decorate([
    Output()
], DateTimePickerInput.prototype, "ionChange", void 0);
__decorate([
    Input()
], DateTimePickerInput.prototype, "timezoneDisabled", void 0);
__decorate([
    Input()
], DateTimePickerInput.prototype, "defaultTimezone", void 0);
__decorate([
    Input()
], DateTimePickerInput.prototype, "clearButtonVisible", void 0);
__decorate([
    Input()
], DateTimePickerInput.prototype, "clearButtonIcon", void 0);
__decorate([
    Input()
], DateTimePickerInput.prototype, "clearButtonText", void 0);
__decorate([
    Input(),
    HostBinding("class.ionx--readonly")
], DateTimePickerInput.prototype, "readonly", null);
__decorate([
    HostBinding("class.ionx--disabled"),
    Input()
], DateTimePickerInput.prototype, "disabled", null);
__decorate([
    Input()
], DateTimePickerInput.prototype, "displayFormat", null);
__decorate([
    Input()
], DateTimePickerInput.prototype, "pickerFormat", null);
__decorate([
    Input()
], DateTimePickerInput.prototype, "value", null);
__decorate([
    HostListener("click", ["$event"])
], DateTimePickerInput.prototype, "clicked", null);
DateTimePickerInput = DateTimePickerInput_1 = __decorate([
    Component({
        selector: "ionx-datetime",
        template: "<div #nativeInput\n     class=\"ionx--input\"\n     contenteditable=\"true\"\n     spellcheck=\"false\"\n     (focus)=\"nativeInputFocused()\"\n     (blur)=\"nativeInputBlured()\"\n     (cut)=\"$event.preventDefault()\"\n     (paste)=\"$event.preventDefault()\"\n     (keyup)=\"inputKeyUpDown($event)\"\n     (keydown)=\"inputKeyUpDown($event)\"\n>{{hasValue() ? text : placeholder}}</div>\n\n<ion-button fill=\"clear\" size=\"small\" (click)=\"clearButtonClicked($event)\" *ngIf=\"clearButtonVisible && !readonly && !disabled && hasValue()\">\n    <ion-icon name=\"close\" [slot]=\"clearButtonText ? 'start' : 'icon-only'\"></ion-icon>\n    <span *ngIf=\"!!clearButtonText\">{{clearButtonText}}</span>\n</ion-button>\n",
        host: {
            "[class.ionx--placeholder-visible]": "!hasValue()"
        },
        styles: [":host{position:relative;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-flex:1;flex:1;width:100%;--padding-top:10px;--padding-bottom:10px;--padding-start:0px;--padding-end:0px}:host .ionx--input{padding-top:var(--padding-top,10px);padding-bottom:var(--padding-bottom,9px);padding-left:var(--padding-start);padding-right:var(--padding-end);display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:0;outline:0}:host.ionx--disabled .ionx--input,:host.ionx--placeholder-visible .ionx--input{opacity:var(--placeholder-opacity,var(--ionx-placeholder-opacity,.5))}:host-context(.md){--padding-bottom:11px}:host-context(.item-label-stacked){--padding-end:0px;--padding-start:0px;--padding-top:9px;--padding-bottom:9px}:host-context(.ios) .native-input{--padding-top:9px;--padding-bottom:8px}"]
    }),
    __param(3, Optional())
], DateTimePickerInput);
export { DateTimePickerInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kYXRldGltZS1waWNrZXIvIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNKLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFZaEQsSUFBYSxtQkFBbUIsMkJBQWhDLE1BQWEsbUJBQW1CO0lBTTVCLFlBQ1ksT0FBZ0MsRUFDaEMsSUFBaUIsRUFDakIsZUFBZ0MsRUFDbEIsT0FBa0I7UUFIaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDbEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQXFCcEMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBa0IxQixjQUFTLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUF0Q3pELElBQUksT0FBTyxFQUFFO1lBQ1QsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7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QUFDO2tEQVdqQztBQTNQUSxtQkFBbUI7SUFSL0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGVBQWU7UUFDekIsMnRCQUF5QjtRQUV6QixJQUFJLEVBQUU7WUFDRixtQ0FBbUMsRUFBRSxhQUFhO1NBQ3JEOztLQUNKLENBQUM7SUFXTyxXQUFBLFFBQVEsRUFBRSxDQUFBO0dBVk4sbUJBQW1CLENBb1ovQjtTQXBaWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPcHRpb25hbCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0NvbnRyb2x9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7RGF0ZVRpbWV6b25lfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7ZGVmYXVsdERhdGVUaW1lRm9ybWF0fSBmcm9tIFwiLi9kZWZhdWx0LWZvcm1hdHNcIjtcbmltcG9ydCB7RGF0ZVRpbWVQaWNrZXJPdmVybGF5fSBmcm9tIFwiLi9vdmVybGF5XCI7XG5cbnR5cGUgVmFsdWUgPSBEYXRlIHwgRGF0ZVRpbWV6b25lIHwgbnVtYmVyO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRhdGV0aW1lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaW5wdXQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiaW5wdXQuc2Nzc1wiXSxcbiAgICBob3N0OiB7XG4gICAgICAgIFwiW2NsYXNzLmlvbngtLXBsYWNlaG9sZGVyLXZpc2libGVdXCI6IFwiIWhhc1ZhbHVlKClcIlxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJJbnB1dCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3VycmVudFRpbWV6b25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBpbnRsOiBJbnRsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbFxuICAgICkge1xuXG4gICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChcIm5hdGl2ZUlucHV0XCIsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgbmF0aXZlSW5wdXQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gICAgcHJpdmF0ZSBtdXRlQ29udHJvbE9uQ2hhbmdlOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfbGlzdEl0ZW06IEhUTUxJb25JdGVtRWxlbWVudDtcblxuICAgIHByaXZhdGUgX2Rpc3BsYXlGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBfcGlja2VyRm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucztcblxuICAgIHByaXZhdGUgX3RleHQ6IHN0cmluZztcblxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9yZWFkb25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IERhdGVUaW1lem9uZTtcblxuICAgIHByaXZhdGUgb3BlbmVkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25DaGFuZ2U6IEZ1bmN0aW9uO1xuXG4gICAgcHJpdmF0ZSBjb250cm9sT25Ub3VjaGVkOiBGdW5jdGlvbjtcblxuXG4gICAgQElucHV0KCkgXG4gICAgb3ZlcmxheVRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxWYWx1ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRpbWV6b25lIGNhbm5vdCBiZSBjaGFuZ2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGltZXpvbmVEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRpbWV6b25lLCB0aGF0IHdpbGwgYmUgc2V0LCB3aGVuIG5ldyB2YWx1ZSBpcyBwaWNrZWQgZnJvbSBwaWNrZXIuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZWZhdWx0VGltZXpvbmU6IHN0cmluZztcblxuXG4gICAgQElucHV0KClcbiAgICBjbGVhckJ1dHRvblZpc2libGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGNsZWFyQnV0dG9uSWNvbjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBjbGVhckJ1dHRvblRleHQ6IHN0cmluZztcblxuXG4gICAgZ2V0IHRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW9ueC0tcmVhZG9ubHlcIilcbiAgICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgICB9XG5cbiAgICBzZXQgcmVhZG9ubHkocmRvbmx5OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gKHJkb25seSBhcyBhbnkpID09PSBcIlwiIHx8IChyZG9ubHkgYXMgYW55KSA9PT0gXCJ0cnVlXCIgfHwgcmRvbmx5ID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLnNldHVwQ3NzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW9ueC0tZGlzYWJsZWRcIilcbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IChkaXNhYmxlZCBhcyBhbnkpID09PSBcIlwiIHx8IChkaXNhYmxlZCBhcyBhbnkpID09PSBcInRydWVcIiB8fCBkaXNhYmxlZCA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXR1cENzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGxpc3RJdGVtKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1pdGVtXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBkaXNwbGF5IGZvcm1hdCBvZiB0aGUgZGF0ZSBhbmQgdGltZSBhcyB0ZXh0IHRoYXQgc2hvd3NcbiAgICAgKiB3aXRoaW4gdGhlIGl0ZW0uIFdoZW4gdGhlIGBwaWNrZXJGb3JtYXRgIGlucHV0IGlzIG5vdCB1c2VkLCB0aGVuIHRoZVxuICAgICAqIGBkaXNwbGF5Rm9ybWF0YCBpcyB1c2VkIGZvciBib3RoIGRpc3BsYXkgdGhlIGZvcm1hdHRlZCB0ZXh0LCBhbmQgZGV0ZXJtaW5pbmdcbiAgICAgKiB0aGUgZGF0ZXRpbWUtcGlja2VyIHBpY2tlcidzIGNvbHVtbnMuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgZGlzcGxheUZvcm1hdChmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlGb3JtYXQgPSB0aGlzLmludGwuZmluZEZvcm1hdHRlclByZWRlZmluZWRPcHRpb25zKEludGwuRGF0ZVRpbWVGb3JtYXQsIGZvcm1hdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5Rm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGRpc3BsYXlGb3JtYXQoKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheUZvcm1hdDtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBwaWNrZXJGb3JtYXQoZm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucykge1xuXG4gICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlckZvcm1hdCA9IHRoaXMuaW50bC5maW5kRm9ybWF0dGVyUHJlZGVmaW5lZE9wdGlvbnMoSW50bC5EYXRlVGltZUZvcm1hdCwgZm9ybWF0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlckZvcm1hdCA9IGZvcm1hdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBwaWNrZXJGb3JtYXQoKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyRm9ybWF0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBWYWx1ZSkge1xuXG4gICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSAhPSAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSAhPT0gdGhpcy5fdmFsdWUuZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgKHRoaXMuX3ZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUuZ2V0VGltZSgpICE9PSB0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZVRpbWV6b25lICYmICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmRhdGUuZ2V0VGltZSgpICE9PSB0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSB8fCB2YWx1ZS50aW1lem9uZSAhPT0gdGhpcy5fdmFsdWUudGltZXpvbmUpKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3IERhdGVUaW1lem9uZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ldyBEYXRlVGltZXpvbmUodmFsdWUuZ2V0VGltZSgpKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGVUaW1lem9uZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXcgRGF0ZVRpbWV6b25lKG5ldyBEYXRlKHZhbHVlLmRhdGUuZ2V0VGltZSgpKSwgdmFsdWUudGltZXpvbmUgPT09IFwiY3VycmVudFwiID8gRGF0ZVRpbWVQaWNrZXJJbnB1dC5jdXJyZW50VGltZXpvbmUoKSA6IHZhbHVlLnRpbWV6b25lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW9uQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tMaXN0SXRlbUhhc1ZhbHVlKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPbkNoYW5nZSAmJiAhdGhpcy5tdXRlQ29udHJvbE9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm11dGVDb250cm9sT25DaGFuZ2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogVmFsdWUge1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lem9uZShuZXcgRGF0ZSh0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSksIHRoaXMuX3ZhbHVlLnRpbWV6b25lKTtcbiAgICB9XG5cbiAgICBjbGVhclZhbHVlKCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xPblRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzVmFsdWUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tMaXN0SXRlbUhhc1ZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taGFzLXZhbHVlXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taGFzLXZhbHVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUZXh0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRpc3BsYXlGb3JtYXQgfHwgZGVmYXVsdERhdGVUaW1lRm9ybWF0KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlLnRpbWV6b25lKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50aW1lWm9uZSA9IHRoaXMuX3ZhbHVlLnRpbWV6b25lO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLnRpbWVab25lTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lTmFtZSA9IFwic2hvcnRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fdmFsdWUudGltZXpvbmUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lID0gXCJVVENcIjtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IHRoaXMuaW50bC5kYXRlVGltZUZvcm1hdCh0aGlzLl92YWx1ZSwgb3B0aW9ucyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIGNsaWNrZWQoZXY6IFVJRXZlbnQpIHtcblxuICAgICAgICBpZiAoZXYuZGV0YWlsID09PSAwIHx8IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vcGVuKGV2KTtcbiAgICB9XG5cbiAgICAvKnByb3RlY3RlZCovIGNsZWFyQnV0dG9uQ2xpY2tlZChldmVudDogVUlFdmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLmNsZWFyVmFsdWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIG9wZW4oZXZlbnQ/OiBFdmVudCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMub3BlbmVkIHx8IHRoaXMucmVhZG9ubHkgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZm9ybWF0T3B0aW9ucyA9IHRoaXMucGlja2VyRm9ybWF0IHx8IHRoaXMuZGlzcGxheUZvcm1hdCB8fCBkZWZhdWx0RGF0ZVRpbWVGb3JtYXQ7XG5cbiAgICAgICAgbGV0IHRpbWV6b25lID0gdGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS50aW1lem9uZSA6IHRoaXMuZGVmYXVsdFRpbWV6b25lO1xuICAgICAgICBpZiAodGltZXpvbmUgPT09IFwiY3VycmVudFwiKSB7XG4gICAgICAgICAgICB0aW1lem9uZSA9IERhdGVUaW1lUGlja2VySW5wdXQuY3VycmVudFRpbWV6b25lKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWU6IERhdGUgPSB0aGlzLl92YWx1ZSAmJiB0aGlzLl92YWx1ZS5kYXRlID8gdGhpcy5fdmFsdWUuZGF0ZSA6IG5ldyBEYXRlKCk7IHtcbiAgICAgICAgICAgIGlmICghdGltZXpvbmUgfHwgdGltZXpvbmUgPT09IFwiVVRDXCIpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKERhdGUuVVRDKHZhbHVlLmdldFVUQ0Z1bGxZZWFyKCksIHZhbHVlLmdldFVUQ01vbnRoKCksIHZhbHVlLmdldFVUQ0RhdGUoKSwgdmFsdWUuZ2V0VVRDSG91cnMoKSwgdmFsdWUuZ2V0VVRDTWludXRlcygpLCAwLCAwKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpICsgKERhdGVUaW1lem9uZS50aW1lem9uZU9mZnNldCh0aW1lem9uZSwgdmFsdWUpICogNjAgKiAxMDAwICogLTEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdmVybGF5VGl0bGU6IHN0cmluZyA9IHRoaXMub3ZlcmxheVRpdGxlO1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSAmJiAhb3ZlcmxheVRpdGxlKSB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLmxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoXCJpb24tbGFiZWxcIik7XG4gICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5VGl0bGUgPSBsYWJlbC5pbm5lclRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvdmVybGF5ID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogRGF0ZVRpbWVQaWNrZXJPdmVybGF5LFxuICAgICAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICAgICAgICBmb3JtYXRPcHRpb25zOiBmb3JtYXRPcHRpb25zLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICB0aW1lem9uZTogdGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS50aW1lem9uZSA6ICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkID8gKHRoaXMuZGVmYXVsdFRpbWV6b25lID09PSBcImN1cnJlbnRcIiA/IERhdGVUaW1lUGlja2VySW5wdXQuY3VycmVudFRpbWV6b25lKCkgOiB0aGlzLmRlZmF1bHRUaW1lem9uZSkgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIHRpbWV6b25lRGlzYWJsZWQ6IHRoaXMudGltZXpvbmVEaXNhYmxlZCxcbiAgICAgICAgICAgICAgICB0aXRsZTogb3ZlcmxheVRpdGxlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFja2Ryb3BEaXNtaXNzOiB0cnVlLCBcbiAgICAgICAgICAgIHNob3dCYWNrZHJvcDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICBvdmVybGF5LnByZXNlbnQoKTtcblxuICAgICAgICB0aGlzLm92ZXJsYXlDbG9zZWQoKGF3YWl0IG92ZXJsYXkub25EaWREaXNtaXNzKCkpLmRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3ZlcmxheUNsb3NlZChuZXdWYWx1ZTogRGF0ZVRpbWV6b25lKSB7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250cm9sT25Ub3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLm5hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLm11dGVDb250cm9sT25DaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHwgdmFsdWUgaW5zdGFuY2VvZiBEYXRlVGltZXpvbmUgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIG5hdGl2ZUlucHV0Rm9jdXNlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlZCAmJiAhdGhpcy5fcmVhZG9ubHkgJiYgIXRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaXRlbS1oYXMtZm9jdXNcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWhhcy1mb2N1c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdGl2ZUlucHV0Qmx1cmVkKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1oYXMtZm9jdXNcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKnByaXZhdGUqLyBpbnB1dEtleVVwRG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuXG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiVGFiXCIgfHwgZXZlbnQua2V5ID09PSBcIlNoaWZ0XCIgfHwgZXZlbnQua2V5ID09IFwiQWx0XCIgfHwgZXZlbnQua2V5ID09IFwiQ3RybFwiIHx8IGV2ZW50LmtleSA9PT0gXCJNZXRhXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZXZlbnQubWV0YUtleSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5vcGVuKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgICAgICBpZiAoY2hhbmdlc1tcImRpc3BsYXlGb3JtYXRcIl0pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICB0aGlzLnNldHVwQ3NzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cENzcygpIHtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pbnB1dFwiKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==