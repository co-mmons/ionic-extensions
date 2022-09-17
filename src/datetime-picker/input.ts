import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Optional, Output, SimpleChanges, ViewChild} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {IntlService} from "@co.mmons/angular-intl";
import {DateTimezone} from "@co.mmons/js-utils/core";
import {ModalController} from "@ionic/angular";
import {defaultDateTimeFormat} from "./default-formats";
import {DateTimePickerOverlay} from "./overlay";

type Value = Date | DateTimezone | number;

@Component({
    selector: "ionx-datetime",
    templateUrl: "input.html",
    styleUrls: ["input.scss"],
    host: {
        "[class.ionx--placeholder-visible]": "!hasValue()"
    }
})
export class DateTimePickerInput implements ControlValueAccessor, OnChanges {

    private static currentTimezone() {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    constructor(
        private element: ElementRef<HTMLElement>,
        private intl: IntlService,
        private modalController: ModalController,
        @Optional() protected control: NgControl
    ) {

        if (control) {
            control.valueAccessor = this;
        }
    }

    @ViewChild("nativeInput", {read: ElementRef, static: true})
    private nativeInput: ElementRef<HTMLElement>;

    private muteControlOnChange: boolean;

    private _listItem: HTMLIonItemElement;

    private _displayFormat: Intl.DateTimeFormatOptions;

    private _pickerFormat: Intl.DateTimeFormatOptions;

    private _text: string;

    private _disabled: boolean = false;

    private _readonly: boolean = false;

    private _value: DateTimezone;

    private opened: boolean;

    private controlOnChange: Function;

    private controlOnTouched: Function;


    @Input() 
    overlayTitle: string;

    @Input()
    placeholder: string;

    @Output()
    readonly ionChange: EventEmitter<Value> = new EventEmitter();

    /**
     * Whether timezone cannot be changed.
     */
    @Input()
    timezoneDisabled: boolean;

    /**
     * Timezone, that will be set, when new value is picked from picker.
     */
    @Input()
    defaultTimezone: string;


    @Input()
    clearButtonVisible: boolean;

    @Input()
    clearButtonIcon: string;

    @Input()
    clearButtonText: string;


    get text() {
        return this._text;
    }

    @Input()
    @HostBinding("class.ionx--readonly")
    get readonly(): boolean {
        return this._readonly;
    }

    set readonly(rdonly: boolean) {
        this._readonly = (rdonly as any) === "" || (rdonly as any) === "true" || rdonly === true ? true : false;
        this.setupCss();
    }

    @HostBinding("class.ionx--disabled")
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(disabled: boolean) {
        this._disabled = (disabled as any) === "" || (disabled as any) === "true" || disabled === true ? true : false;
        this.setupCss();
    }

    private get listItem() {

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
    @Input()
    set displayFormat(format: Intl.DateTimeFormatOptions) {

        if (typeof format === "string") {
            this._displayFormat = this.intl.findPredefinedFormatOptions(format);
        } else {
            this._displayFormat = format;
        }
    }

    get displayFormat(): Intl.DateTimeFormatOptions {
        return this._displayFormat;
    }

    @Input()
    set pickerFormat(format: Intl.DateTimeFormatOptions) {

        if (typeof format == "string") {
            this._pickerFormat = this.intl.findPredefinedFormatOptions(format);
        } else {
            this._pickerFormat = format;
        }
    }

    get pickerFormat(): Intl.DateTimeFormatOptions {
        return this._pickerFormat;
    }

    @Input()
    set value(value: Value) {

        let changed = false;

        if ((value === undefined || value === null) != (this._value === undefined)) {
            changed = true;
        } else if (typeof value === "number" && (this._value === undefined || value !== this._value.date.getTime())) {
            changed = true;
        } else if (value instanceof Date && (this._value === undefined || value.getTime() !== this._value.date.getTime())) {
            changed = true;
        } else if (value instanceof DateTimezone && (this._value === undefined || value.date.getTime() !== this._value.date.getTime() || value.timezone !== this._value.timezone)) {
            changed = true;
        }

        if (typeof value === "number") {
            this._value = new DateTimezone(value);
        } else if (value instanceof Date) {
            this._value = new DateTimezone(value.getTime());
        } else if (value instanceof DateTimezone) {
            this._value = new DateTimezone(new Date(value.date.getTime()), value.timezone === "current" ? DateTimePickerInput.currentTimezone() : value.timezone);
        } else {
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

    get value(): Value {

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

    hasValue(): boolean {
        return !!this._value;
    }

    private checkListItemHasValue() {
        if (this.listItem) {
            if (this.hasValue()) {
                this.listItem.classList.add("item-has-value")
            } else {
                this.listItem.classList.remove("item-has-value");
            }
        }
    }

    private updateText() {

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

        } else {
            this._text = null;
        }
    }


    @HostListener("click", ["$event"])
    clicked(ev: UIEvent) {

        if (ev.detail === 0 || this.disabled || this.readonly) {
            return;
        }

        ev.preventDefault();
        ev.stopPropagation();

        this.open(ev);
    }

    /*protected*/ clearButtonClicked(event: UIEvent) {
        event.stopPropagation();

        this.clearValue();
    }

    private async open(event?: Event) {

        if (this.disabled || this.opened || this.readonly ) {
            return;
        }

        this.opened = true;

        const formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;

        let timezone = this._value ? this._value.timezone : this.defaultTimezone;
        if (timezone === "current") {
            timezone = DateTimePickerInput.currentTimezone();
        }

        let value: Date = this._value && this._value.date ? this._value.date : new Date(); {
            if (!timezone || timezone === "UTC") {
                value = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate(), value.getUTCHours(), value.getUTCMinutes(), 0, 0));
            } else {
                value = new Date(value.getTime() + (DateTimezone.timezoneOffset(timezone, value) * 60 * 1000 * -1));
            }
        }

        let overlayTitle: string = this.overlayTitle;
        if (this.listItem && !overlayTitle) {
            let label = this.listItem.querySelector("ion-label");
            if (label) {
                overlayTitle = label.innerText;
            }
        }

        const overlay = await this.modalController.create({
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

        this.overlayClosed((await overlay.onDidDismiss()).data);
    }

    private overlayClosed(newValue: DateTimezone) {

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


    public writeValue(value: any): void {

        this.muteControlOnChange = true;

        if (value instanceof Date || value instanceof DateTimezone || typeof value === "number") {
            this.value = value;
        } else {
            this.value = undefined;
        }
    }

    public registerOnChange(fn: Function): void {
        this.controlOnChange = fn;
    }

    public registerOnTouched(fn: Function): void {
        this.controlOnTouched = fn;
    }

    public setDisabledState(isDisabled: boolean) {
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

    /*private*/ inputKeyUpDown(event: KeyboardEvent) {

        if (event.key === "Tab" || event.key === "Shift" || event.key == "Alt" || event.key == "Ctrl" || event.key === "Meta") {
            return;
        }

        if (!event.metaKey) {
            event.preventDefault();

            this.open(event);
        }
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes["displayFormat"]) {
            this.updateText();
        }
    }

    ngOnInit() {
        this.updateText();
        this.setupCss();
    }

    private setupCss() {

        if (this.listItem) {
            this.listItem.classList.add("item-input");

            if (this.readonly || this._disabled) {
                this.listItem.classList.remove("item-interactive");
            } else {
                this.listItem.classList.add("item-interactive");
            }
        }
    }


}
