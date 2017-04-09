import { Component, Input, ElementRef, Renderer, Optional, ViewEncapsulation, forwardRef, HostListener } from "@angular/core";
import { NgControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { App, Ion, Form, Config, Item, PopoverController } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";

import { defaultDateFormat, defaultDateTimeFormat } from "./default-formats"
import { DateTimeOverlay } from "./overlay";
import { DateTimeOverlayViewController } from "./overlay-view-controller";

@Component({
    selector: "ionx-datetime",
    template: `
        <div *ngIf="!_text" class="datetime-text datetime-placeholder">{{placeholder}}</div>
        <div *ngIf="_text" class="datetime-text">{{_text}}</div>
        <button aria-haspopup="true" type="button" [id]="id" ion-button="item-cover" [attr.aria-labelledby]="_labelId" [attr.aria-disabled]="_disabled" class="item-cover"></button>
    `,
    host: {
        "[class.datetime-disabled]": "_disabled"
    },
    encapsulation: ViewEncapsulation.None
})
export class DateTime extends Ion implements ControlValueAccessor {

    constructor(private app: App,
                private config: Config,
                private elementRef: ElementRef,
                private renderer: Renderer,
                private intl: IntlService,
                private popoverController: PopoverController,
                @Optional() private item: Item,
                @Optional() private control: NgControl,) {
        super(config, elementRef, renderer, "datetime");

        if (control) {
            control.valueAccessor = this;
        }
    }

    /**
     * The display format of the date and time as text that shows
     * within the item. When the `pickerFormat` input is not used, then the
     * `displayFormat` is used for both display the formatted text, and determining
     * the datetime-picker picker"s columns.
     */
    @Input()
    public displayFormat: Intl.DateTimeFormatOptions;

    /**
     * The format of the date and time picker columns the user selects.
     * A datetime-picker input can have one or many datetime-picker parts, each getting their
     * own column which allow individual selection of that particular datetime-picker part. For
     * example, year and month columns are two individually selectable columns which help
     * choose an exact date from the datetime-picker picker.
     */
    @Input() pickerFormat: Intl.DateTimeFormatOptions;

    placeholder: string;
    _labelId: string;
    _text: string;


    _disabled: boolean;

    /**
     * Whether or not the datetime-picker component is disabled. Default `false`.
     */
    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(disabled: boolean | string) {
        this._disabled = disabled || disabled == "true" ? true : false;
    }

    @Input()
    valueType: string;

    private _value: Date;

    public set value(value: number | Date) {

        let changed = false;

        if ((value === undefined || value === null) != (this._value === undefined)) {
            changed = true;
        } else if (typeof value === "number" && value != this._value.getTime()) {
            changed = true;
        } else if (value instanceof Date && value.getTime() != this._value.getTime()) {
            changed = true;
        }

        this._value = typeof value == "number" ? new Date(value) : value;

        if (changed) {
            this.updateText();
            this.checkHasValue();
        }
    }

    public get value(): Date | number {

        if (!this._value) {
            return undefined;
        }

        if (this.valueType && this.valueType == "number") {
            return this._value.getTime();
        }

        return new Date(this._value);
    }

    private checkHasValue() {
        if (this.item) {
            this.item.setElementClass("input-has-value", this._value ? true : false);
        }
    }

    private updateText() {
        if (this._value) {
            let options = this.displayFormat || defaultDateTimeFormat;
            this._text = this.intl.dateTimeFormat(this._value, options);
        } else {
            this._text = null;
        }
    }


    @HostListener("click", ["$event"])
    private clicked(ev: UIEvent) {

        // do not continue if the click event came from a form submit
        if (ev.detail === 0) {
            return;
        }

        ev.preventDefault();
        ev.stopPropagation();
        this.open();
    }

    @HostListener("keyup.space")
    private keyuped() {
        this.open();
    }

    private opened: boolean;

    private open() {

        if (this.disabled || this.opened) {
            return;
        }

        let formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;

        let value: Date;
        if (formatOptions.timeZone == "UTC") {

            if (this._value) {
                value = new Date(this._value.getTime());
            } else {
                let v = new Date();
                value = new Date(Date.UTC(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds()));
            }

        } else {

            if (this._value) {
                value = new Date(Date.UTC(this._value.getFullYear(), this._value.getMonth(), this._value.getDate(), this._value.getHours(), this._value.getMinutes(), this._value.getSeconds()));
            } else {
                value = new Date();
            }
        }

        let view = this.popoverController.create(DateTimeOverlay, {
            formatOptions: formatOptions,
            value: value
        });

        view.onDidDismiss(newValue => this.overlayClosed(newValue));
        view.present({});
    }

    private overlayClosed(newValue: Date) {
        if (newValue) {

            let formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;

            let value: Date;
            if (formatOptions.timeZone == "UTC") {
                value = new Date(newValue.getTime());
            } else {
                value = new Date(newValue.getUTCFullYear(), newValue.getUTCMonth(), newValue.getUTCDate(), newValue.getUTCHours(), newValue.getUTCMinutes(), newValue.getUTCSeconds());
            }

            this.value = value;

            if (this.controlOnChange) {
                this.controlOnChange(this.value);
            }
        }

        if (this.controlOnTouched) {
            this.controlOnTouched();
        }
    }

    writeValue(value: any): void {
        if (value instanceof Date) {
            this.value = value;
        } else if (typeof value == "number") {
            this.value = value;
        } else {
            this.value = undefined;
        }
    }

    private controlOnChange: Function;

    registerOnChange(fn: Function): void {
        this.controlOnChange = fn;
    }

    private controlOnTouched: Function;

    registerOnTouched(fn: Function): void {
        this.controlOnTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    ngOnInit() {
        this.updateText();
    }
    
    ngAfterContentChecked() {
        this.setItemInputControlCss();
    }

    private setItemInputControlCss() {
        let item = this.item;
        if (item && this.control) {
            this.setControlCss(item, this.control);
        }
    }

    private setControlCss(element: any, control: NgControl) {
        element.setElementClass("ng-untouched", control.untouched);
        element.setElementClass("ng-touched", control.touched);
        element.setElementClass("ng-pristine", control.pristine);
        element.setElementClass("ng-dirty", control.dirty);
        element.setElementClass("ng-valid", control.valid);
        element.setElementClass("ng-invalid", !control.valid && control.enabled);
    }


}