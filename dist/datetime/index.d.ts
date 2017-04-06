import { AfterContentInit, ElementRef, EventEmitter, OnDestroy, Renderer, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { Ion, Config, Item, Picker, PickerController } from "ionic-angular";
import { Form } from "ionic-angular/util/form";
export declare const defaultDateTimeFormat: Intl.DateTimeFormatOptions;
export declare const defaultDateFormat: Intl.DateTimeFormatOptions;
export declare class DateTime extends Ion implements AfterContentInit, ControlValueAccessor, OnDestroy {
    private form;
    private intl;
    private item;
    private pickerController;
    formControl: NgControl;
    _disabled: any;
    _labelId: string;
    _text: string;
    _fn: Function;
    _isOpen: boolean;
    _value: Date;
    /**
     * @private
     */
    id: string;
    valueType: string;
    /**
     * @input {string} The minimum datetime allowed. Value must be a date string
     * following the
     * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
     * such as `1996-12-19`. The format does not have to be specific to an exact
     * datetime. For example, the minimum could just be the year, such as `1994`.
     * Defaults to the beginning of the year, 100 years ago from today.
     */
    min: string;
    /**
     * @input {string} The maximum datetime allowed. Value must be a date string
     * following the
     * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
     * `1996-12-19`. The format does not have to be specific to an exact
     * datetime. For example, the maximum could just be the year, such as `1994`.
     * Defaults to the end of this year.
     */
    max: string;
    /**
     * The display format of the date and time as text that shows
     * within the item. When the `pickerFormat` input is not used, then the
     * `displayFormat` is used for both display the formatted text, and determining
     * the datetime picker"s columns.
     */
    displayFormat: Intl.DateTimeFormatOptions;
    /**
     * The format of the date and time picker columns the user selects.
     * A datetime input can have one or many datetime parts, each getting their
     * own column which allow individual selection of that particular datetime part. For
     * example, year and month columns are two individually selectable columns which help
     * choose an exact date from the datetime picker.
     */
    pickerFormat: Intl.DateTimeFormatOptions;
    /**
     * @input {string} The text to display on the picker"s cancel button. Default: `Cancel`.
     */
    cancelText: string;
    /**
     * @input {string} The text to display on the picker"s "Done" button. Default: `Done`.
     */
    doneText: string;
    /**
     * @input {any} Any additional options that the picker interface can accept.
     * See the [Picker API docs](../../picker/Picker) for the picker options.
     */
    pickerOptions: any;
    /**
     * @output Any expression to evaluate when the datetime selection has changed.
     */
    ionChange: EventEmitter<any>;
    /**
     * @output Any expression to evaluate when the datetime selection was cancelled.
     */
    ionCancel: EventEmitter<any>;
    constructor(form: Form, config: Config, element: ElementRef, renderer: Renderer, intl: IntlService, item: Item, pickerController: PickerController, formControl: NgControl);
    _click(ev: UIEvent): void;
    _keyup(): void;
    /**
     * @private
     */
    open(): void;
    private buildColumns();
    private generate(picker);
    private validate(picker);
    divyColumns(picker: Picker): void;
    value: number | Date;
    /**
     * @private
     */
    checkHasValue(inputValue: any): void;
    /**
     * @private
     */
    updateText(): void;
    /**
     * @input {boolean} Whether or not the datetime component is disabled. Default `false`.
     */
    disabled: any;
    /**
     * @private
     */
    writeValue(val: any): void;
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    registerOnChange(fn: Function): void;
    /**
     * @private
     */
    registerOnTouched(fn: any): void;
    private onChange(val);
    /**
     * @private
     */
    onTouched(): void;
    /**
     * @private
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentChecked(): void;
    private setItemInputControlCss();
    private setControlCss(element, control);
}
export declare class DateTimeModule {
}
