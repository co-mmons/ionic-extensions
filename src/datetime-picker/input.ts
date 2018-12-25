import {Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewEncapsulation} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {IntlService} from "@co.mmons/angular-intl";
import {ModalController} from "@ionic/angular";
import {defaultDateTimeFormat} from "./default-formats";
import {DateTimePickerOverlay} from "./overlay";

@Component({
    selector: "ionx-datetime",
    template: `
        <input type="text" #nativeInput class="native-input" readonly [attr.disabled]="disabled || null" (focus)="nativeInputFocused()" (blur)="nativeInputBlured()" [attr.placeholder]="placeholder || null" [attr.value]="text || null"/>
    `,
    host: {
        "[class.datetime-disabled]": "disabled"
    },
    encapsulation: ViewEncapsulation.None
})
export class DateTimePickerInput implements ControlValueAccessor, OnChanges {

    constructor(private element: ElementRef<HTMLElement>, private intl: IntlService, private modalController: ModalController, protected control: NgControl) {

        if (control) {
            control.valueAccessor = this;
        }
    }

    private _listItem: HTMLIonItemElement;

    private get listItem() {

        if (this._listItem) {
            return this._listItem;
        }

        return this._listItem = this.element.nativeElement.closest("ion-item");
    }

    private _displayFormat: Intl.DateTimeFormatOptions;

    /**
     * The display format of the date and time as text that shows
     * within the item. When the `pickerFormat` input is not used, then the
     * `displayFormat` is used for both display the formatted text, and determining
     * the datetime-picker picker's columns.
     */
    @Input()
    //@ts-ignore
    public set displayFormat(format: Intl.DateTimeFormatOptions | string) {

        if (typeof format == "string") {
            this._displayFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
        } else {
            this._displayFormat = format;
        }
    }

    //@ts-ignore
    public get displayFormat(): Intl.DateTimeFormatOptions {
        return this._displayFormat;
    }

    private _pickerFormat: Intl.DateTimeFormatOptions;

    @Input() 
    //@ts-ignore
    public set pickerFormat(format: Intl.DateTimeFormatOptions | string) {
        if (typeof format == "string") {
            this._pickerFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
        } else {
            this._pickerFormat = format;
        }
    }

    //@ts-ignore
    public get pickerFormat(): Intl.DateTimeFormatOptions {
        return this._pickerFormat;
    }

    @Input() 
    public overlayTitle: string;

    @Input()
    public placeholder: string;

    @Output()
    public ionChange: EventEmitter<Date | number> = new EventEmitter();

    @ViewChild("nativeInput", {read: ElementRef})
    private nativeInput: ElementRef<HTMLElement>;

    private text$: string;

    get text() {
        return this.text$;
    }

    disabled$: boolean;

    /**
     * Whether or not the datetime-picker component is disabled. Default `false`.
     */
    @Input()
    public get disabled() {
        return this.disabled$;
    }

    public set disabled(disabled: boolean | string) {
        this.disabled$ = disabled || disabled == "true" ? true : false;
    }

    @Input()
    public valueType: "Date" | "number" = "Date";


    private dateValue: Date;

    @Input()
    public set value(value: number | Date) {

        let changed = false;

        if ((value === undefined || value === null) != (this.dateValue === undefined)) {
            changed = true;
        } else if (typeof value === "number" && value != this.dateValue.getTime()) {
            changed = true;
        } else if (value instanceof Date && value.getTime() != this.dateValue.getTime()) {
            changed = true;
        }

        this.dateValue = typeof value == "number" ? new Date(value) : value;

        if (changed) {
            this.ionChange.emit(this.value);
            this.updateText();
            this.checkListItemHasValue();
        }
    }

    public get value(): Date | number {

        if (!this.dateValue) {
            return undefined;
        }

        if (this.valueType && this.valueType == "number") {
            return this.dateValue.getTime();
        }

        return new Date(this.dateValue);
    }

    public hasValue(): boolean {
        return !!this.dateValue;
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
            let options = this.displayFormat || defaultDateTimeFormat;
            this.text$ = this.intl.dateTimeFormat(this.dateValue, options);
        } else {
            this.text$ = null;
        }
    }


    @HostListener("click", ["$event"])
    protected clicked(ev: UIEvent) {

        if (ev.detail === 0 || this.disabled) {
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

    private opened: boolean;

    private async open(event?: Event) {

        if (this.disabled || this.opened) {
            return;
        }

        let formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;

        let value: Date; {

            if (formatOptions.timeZone == "UTC") {
                let v = this.dateValue ? this.dateValue : new Date();
                value = new Date(Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate(), v.getUTCHours(), v.getUTCMinutes(), 0, 0));

            } else {
                let v = this.dateValue ? this.dateValue : new Date();
                value = new Date(Date.UTC(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), 0, 0));
            }
        }

        let overlayTitle: string = this.overlayTitle;
        if (this.listItem && !overlayTitle) {
            let label = this.listItem.querySelector("ion-label");
            if (label) {
                overlayTitle = label.innerText;
            }
        }

        let overlay = await this.modalController.create({
            component: DateTimePickerOverlay,
            componentProps: {formatOptions: formatOptions, value: value, title: overlayTitle}, 
            backdropDismiss: true, 
            showBackdrop: true
        });

        overlay.present();

        this.overlayClosed((await overlay.onDidDismiss()).data);
    }

    private overlayClosed(newValue: Date) {
        if (newValue) {

            let formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;

            let value: Date;
            if (formatOptions.timeZone && formatOptions.timeZone.toUpperCase() == "UTC") {
                value = new Date(newValue.getTime());
            } else {
                value = new Date(newValue.getUTCFullYear(), newValue.getUTCMonth(), newValue.getUTCDate(), newValue.getUTCHours(), newValue.getUTCMinutes(), newValue.getUTCSeconds(), 0);
            }

            this.value = value;

            if (this.controlOnChange) {
                this.controlOnChange(this.value);
            }
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
        if (value instanceof Date) {
            this.value = value;
        } else if (typeof value == "number") {
            this.value = value;
        } else {
            this.value = undefined;
        }
    }

    private controlOnChange: Function;

    public registerOnChange(fn: Function): void {
        this.controlOnChange = fn;
    }

    private controlOnTouched: Function;

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
    }

    ngOnInit() {
        this.updateText();

        if (this.listItem) {
            this.listItem.classList.add("item-input", "item-interactive");
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