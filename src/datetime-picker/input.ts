import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {IntlService} from "@co.mmons/angular-intl";
import {DateTimezone} from "@co.mmons/js-utils/core";
import {ModalController} from "@ionic/angular";
import {defaultDateTimeFormat} from "./default-formats";
import {DateTimePickerOverlay} from "./overlay";

type Value = Date | DateTimezone | number;

@Component({
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
    styles: [
        `
            :host {
                position: relative;
                display: block;
                flex: 1;
                width: 100%;
                --padding-end: 16px;
                --padding-start: 16px;
                --padding-top: 10px;
                --padding-bottom: 10px;
            }
            
            :host-context(.md) {
                --padding-bottom: 11px;
            }
            
            :host-context(.item-label-stacked) {
                --padding-end: 0px;
                --padding-start: 0px;
                --padding-top: 9px;
                --padding-bottom: 9px;
            }
            
            :host .native-input {
                padding-top: var(--padding-top, 10px);
                padding-bottom: var(--padding-bottom, 9px);
                padding-left: var(--padding-start, 0px);
                padding-right: var(--padding-end, 0px);
                display: inline-block;

                flex: 1;

                width: 100%;
                max-width: 100%;
                max-height: 100%;

                border: 0;

                outline: none;

                background: transparent;

                box-sizing: border-box;
                appearance: none;
            }
            
            :host-context(.ios) .native-input {
                --padding-top: 9px;
                --padding-bottom: 8px;
            }
            
            :host .native-input::placeholder {
                opacity: 0.5;
            }

            :host .native-input:-webkit-autofill {
                background-color: transparent;
            }
        `
    ]
})
export class DateTimePickerInput implements ControlValueAccessor, OnChanges {

    private static currentTimezone() {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    constructor(
        private element: ElementRef<HTMLElement>,
        private intl: IntlService,
        private modalController: ModalController,
        protected control: NgControl
    ) {

        if (control) {
            control.valueAccessor = this;
        }
    }

    private muteControlOnChange: boolean;

    private _listItem: HTMLIonItemElement;

    private _displayFormat: Intl.DateTimeFormatOptions;

    private _pickerFormat: Intl.DateTimeFormatOptions;

    @ViewChild("nativeInput", {read: ElementRef, static: true})
    private nativeInput: ElementRef<HTMLElement>;

    private _text: string;

    @HostBinding("class.datetime-disabled")
    private _disabled: boolean;

    private _value: DateTimezone;

    private opened: boolean;

    private controlOnChange: Function;

    private controlOnTouched: Function;


    @Input()
    readonly: boolean;

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


    get text() {
        return this._text;
    }

    /**
     * Whether or not the datetime-picker component is disabled.
     */
    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(disabled: boolean | string) {
        this._disabled = disabled || disabled == "true" ? true : false;
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
            this._displayFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
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
            this._pickerFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
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
                this.listItem.classList.add("has-value")
            } else {
                this.listItem.classList.remove("has-value");
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
    protected clicked(ev: UIEvent) {

        if (ev.detail === 0 || this.disabled || this.readonly) {
            return;
        }

        ev.preventDefault();
        ev.stopPropagation();

        this.open(ev);
    }

    @HostListener("keyup.space")
    protected keyuped() {
        this.open(undefined);
    }

    private async open(event?: Event) {

        if (this.disabled || this.opened || this.readonly ) {
            return;
        }

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
            this.listItem.classList.add("item-has-focus");
            this.nativeInput.nativeElement.focus();
        }
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

    ngOnChanges(changes: SimpleChanges) {

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

    ngAfterContentChecked() {
        //this.setItemInputControlCss();
    }

    // private setItemInputControlCss() {
    //     let item = this.item;
    //     if (item && this.control) {
    //         this.setControlCss(item, this.control);
    //     }
    // }

    // private setControlCss(element: any, control: NgControl) {
    //     element.setElementClass("ng-untouched", control.untouched);
    //     element.setElementClass("ng-touched", control.touched);
    //     element.setElementClass("ng-pristine", control.pristine);
    //     element.setElementClass("ng-dirty", control.dirty);
    //     element.setElementClass("ng-valid", control.valid);
    //     element.setElementClass("ng-invalid", !control.valid && control.enabled);
    // }


}
