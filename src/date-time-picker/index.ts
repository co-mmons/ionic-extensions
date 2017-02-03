import { NgModule, AfterContentInit, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnDestroy, Optional, Output, Renderer, ViewEncapsulation, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "co.mmons.angular-intl";

import { Ion, Config, Item, IonicModule } from "ionic-angular";
import { Picker, PickerController } from "ionic-angular/components/picker/picker";
import { PickerColumn, PickerColumnOption } from "ionic-angular/components/picker/picker-options";
import { Form } from "ionic-angular/util/form";
import { deepCopy, isBlank, isPresent, isTrueProperty, isArray, isString } from "ionic-angular/util/util";
import { dateValueRange, renderDateTime, renderTextFormat, convertFormatToKey, getValueFromFormat, parseTemplate, parseDate, updateDate, DateTimeData, convertDataToISO, daysInMonth, dateSortValue, dateDataSortValue, LocaleData } from "ionic-angular/util/datetime-util";

export const defaultDateTimeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric", month: "numeric", day: "numeric",
    hour: "2-digit", minute: "2-digit"
};

export const defaultDateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric", month: "numeric", day: "numeric"
};

@Component({
    selector: "ionx-date-time-picker, ionx-datetime",
    template: `
        <div class="datetime-text">{{_text}}</div>
        <button aria-haspopup="true" type="button" [id]="id" 
            ion-button="item-cover" [attr.aria-labelledby]="_labelId"
            [attr.aria-disabled]="disabled" [disabled]="disabled" class="item-cover">
        </button>`,
    encapsulation: ViewEncapsulation.None,
    host: {
        "[class.datetime-disabled]": "_disabled"
    },
})
export class DateTimePicker extends Ion implements AfterContentInit, ControlValueAccessor, OnDestroy {
    _disabled: any = false;
    _labelId: string;
    _text: string = "";
    _fn: Function;
    _isOpen: boolean = false;
    _value: Date;

    /**
     * @private
     */
    id: string;

    @Input()
    valueType: string;

    /**
     * @input {string} The minimum datetime allowed. Value must be a date string
     * following the
     * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
     * such as `1996-12-19`. The format does not have to be specific to an exact
     * datetime. For example, the minimum could just be the year, such as `1994`.
     * Defaults to the beginning of the year, 100 years ago from today.
     */
    @Input() min: string;

    /**
     * @input {string} The maximum datetime allowed. Value must be a date string
     * following the
     * [ISO 8601 datetime format standard](https://www.w3.org/TR/NOTE-datetime),
     * `1996-12-19`. The format does not have to be specific to an exact
     * datetime. For example, the maximum could just be the year, such as `1994`.
     * Defaults to the end of this year.
     */
    @Input() max: string;

    /**
     * The display format of the date and time as text that shows
     * within the item. When the `pickerFormat` input is not used, then the
     * `displayFormat` is used for both display the formatted text, and determining
     * the datetime picker"s columns.
     */
    @Input() displayFormat: Intl.DateTimeFormatOptions;

    /**
     * The format of the date and time picker columns the user selects.
     * A datetime input can have one or many datetime parts, each getting their
     * own column which allow individual selection of that particular datetime part. For
     * example, year and month columns are two individually selectable columns which help
     * choose an exact date from the datetime picker.
     */
    @Input() pickerFormat: Intl.DateTimeFormatOptions;

    /**
     * @input {string} The text to display on the picker"s cancel button. Default: `Cancel`.
     */
    @Input() cancelText: string = "Cancel";

    /**
     * @input {string} The text to display on the picker"s "Done" button. Default: `Done`.
     */
    @Input() doneText: string = "Done";

    /**
     * @input {any} Any additional options that the picker interface can accept.
     * See the [Picker API docs](../../picker/Picker) for the picker options.
     */
    @Input() pickerOptions: any = {};

    /**
     * @output Any expression to evaluate when the datetime selection has changed.
     */
    @Output() ionChange: EventEmitter<any> = new EventEmitter();

    /**
     * @output Any expression to evaluate when the datetime selection was cancelled.
     */
    @Output() ionCancel: EventEmitter<any> = new EventEmitter();

    constructor(private form: Form, config: Config, element: ElementRef, renderer: Renderer, private intl: IntlService,
        @Optional() private item: Item, @Optional() private pickerController: PickerController,
        @Optional() public formControl: NgControl) {

        super(config, element, renderer, "datetime");

        form.register(this);

        if (item) {
            this.id = "dt-" + item.registerInput("datetime");
            this._labelId = "lbl-" + item.id;
            this.item.setElementClass("item-datetime", true);
        }

        if (this.formControl) {
            this.formControl.valueAccessor = this;
        }
    }

    @HostListener("click", ["$event"])
    _click(ev: UIEvent) {
        if (ev.detail === 0) {
            // do not continue if the click event came from a form submit
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open();
    }

    @HostListener("keyup.space")
    _keyup() {
        if (!this._isOpen) {
            this.open();
        }
    }

    /**
     * @private
     */
    open() {
        if (this._disabled) {
            return;
        }

        //console.debug("datetime, open picker");

        // the user may have assigned some options specifically for the alert
        const pickerOptions = deepCopy(this.pickerOptions);

        const picker = this.pickerController.create(pickerOptions);
        pickerOptions.buttons = [
            {
                text: this.cancelText,
                role: "cancel",
                handler: () => {
                    this.ionCancel.emit(null);
                }
            },
            {
                text: this.doneText,
                handler: (data: any) => {
                    //console.debug("datetime, done", data);

                    let value = this._value ? new Date(this._value) : new Date();
                    value.setSeconds(0);
                    value.setMilliseconds(0);

                    if (data.year) {
                        value.setFullYear(data.year.value);
                    }

                    if (data.month) {
                        value.setMonth(data.month.value);
                    }

                    if (data.day) {
                        value.setDate(data.day.value);
                    }

                    if (data.hour) {
                        value.setHours(data.hour.value);
                    } else {
                        value.setHours(0);
                    }

                    if (data.minute) {
                        value.setMinutes(data.minute.value);
                    } else {
                        value.setMinutes(0);
                    }

                    this.onChange(value);
                    this.ionChange.emit(this.value);
                }
            }
        ];

        this.generate(picker);
        this.validate(picker);

        picker.ionChange.subscribe(() => {
            this.validate(picker);
        });

        picker.present(pickerOptions);

        this._isOpen = true;
        picker.onDidDismiss(() => {
            this._isOpen = false;
        });
    }

    private buildColumns() {

        let formatOptions: Intl.DateTimeFormatOptions = this.pickerFormat || this.displayFormat || {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        };

        let partsFormated = {};
        let partsPositions = [];

        let year = 1999;
        let month = 5;
        let day = 24;
        let hour = 11;
        let minute = 50;

        let testDate = new Date();
        testDate.setUTCFullYear(year);
        testDate.setUTCMonth(month - 1);
        testDate.setUTCDate(day - 1);
        testDate.setUTCHours(hour - 1);
        testDate.setUTCMinutes(minute - 1);

        for (let part in formatOptions) {

            if (part == "weekday" && formatOptions.day) {
                continue;
            }

            let partOptions: Intl.DateTimeFormatOptions = {};
            partOptions[part] = formatOptions[part];

            if (part == "hour") {
                partOptions.minute = "2-digit";
            } else if (part == "minute") {
                partOptions.hour = "2-digit";
            }

            let formatter = new Intl.DateTimeFormat("pl", partOptions);
            partsFormated[part] = formatter.format(testDate);
        }

        let testFormated = new Intl.DateTimeFormat("pl", formatOptions).format(testDate);

        for (let part in partsFormated) {

            let idx = testFormated.indexOf(partsFormated[part]);
            if (idx === -1) {
                idx = 100;
            }

            partsPositions.push([part, idx]);
        }

        let columns: string[] = [];
        for (let p of partsPositions.sort((a, b) => a[1] - b[1])) {
            columns.push(p[0]);
        }

        return columns;
    }

    private generate(picker: Picker) {

        let columns = this.buildColumns();
        let value = this._value || new Date();

        for (let columnName of columns) {

            let column: PickerColumn = {
                name: columnName,
                options: []
            };

            let date = new Date(2000, 0, 1);

            let pickerFormat = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
            let formatOptions: Intl.DateTimeFormatOptions = {};

            let min = 0, max = 0;

            if (columnName == "year") {
                formatOptions.year = pickerFormat.year || "numeric";
                min = 2000;
                max = 2018;
            } else if (columnName == "month") {
                formatOptions.month = pickerFormat.month || "short";
                min = 0;
                max = 11;
            } else if (columnName == "day") {
                formatOptions.day = pickerFormat.day || "numeric";
                min = 1;
                max = 30;
            } else if (columnName == "hour") {
                formatOptions = undefined;
                min = 0;
                max = 23;
            } else if (columnName == "minute") {
                formatOptions = undefined;
                min = 0;
                max = 59;
            }

            let optionIndex = 0;
            let selectedIndex = -1;

            for (let i = min; i <= max; i++) {

                if (columnName == "year") {
                    date.setFullYear(i);

                    if (value.getFullYear() === i) {
                        selectedIndex = optionIndex;
                    }

                } else if (columnName == "month") {
                    date.setMonth(i);

                    if (value.getMonth() === i) {
                        selectedIndex = optionIndex;
                    }

                } else if (columnName == "day") {
                    date.setDate(i);

                    if (value.getDate() === i) {
                        selectedIndex = optionIndex;
                    }

                } else if (columnName == "hour") {
                    date.setHours(i);

                    if (value.getHours() === i) {
                        selectedIndex = optionIndex;
                    }

                } else if (columnName == "minute") {
                    date.setMinutes(i);

                    if (value.getMinutes() === i) {
                        selectedIndex = optionIndex;
                    }
                }

                let text: string;
                if (formatOptions) {
                    text = this.intl.dateTime(date, formatOptions);
                } else {
                    text = i < 10 ? `0${i}` : `${i}`;
                }

                column.options.push({ value: i, text: text });

                optionIndex++;
            }

            if (selectedIndex > -1) {
                column.selectedIndex = selectedIndex;
            }

            picker.addColumn(column);
        }

        this.divyColumns(picker);
    }

    private validate(picker: Picker) {

        let columns = picker.getColumns();

        let yearCol = columns.find(col => col.name === "year");
        let monthCol = columns.find(col => col.name === "month");
        let dayCol = columns.find(col => col.name === "day");

        // let i: number;
        // let today = new Date();
        // let columns = picker.getColumns();

        // // find the columns used
        // let yearCol = columns.find(col => col.name === "year");
        // let monthCol = columns.find(col => col.name === "month");
        // let dayCol = columns.find(col => col.name === "day");

        // let yearOpt: PickerColumnOption;
        // let monthOpt: PickerColumnOption;
        // let dayOpt: PickerColumnOption;

        // // default to the current year
        // let selectedYear: number = today.getFullYear();

        // if (yearCol) {
        //     // default to the first value if the current year doesn"t exist in the options
        //     if (!yearCol.options.find(col => col.value === today.getFullYear())) {
        //         selectedYear = yearCol.options[0].value;
        //     }

        //     yearOpt = yearCol.options[yearCol.selectedIndex];
        //     if (yearOpt) {
        //         // they have a selected year value
        //         selectedYear = yearOpt.value;
        //     }
        // }

        // // default to assuming this month has 31 days
        // let numDaysInMonth = 31;
        // let selectedMonth: number;
        // if (monthCol) {
        //     monthOpt = monthCol.options[monthCol.selectedIndex];
        //     if (monthOpt) {
        //         // they have a selected month value
        //         selectedMonth = monthOpt.value;

        //         // calculate how many days are in this month
        //         numDaysInMonth = daysInMonth(selectedMonth, selectedYear);
        //     }
        // }

        // // create sort values for the min/max datetimes
        // let minCompareVal = dateDataSortValue(this._min);
        // let maxCompareVal = dateDataSortValue(this._max);

        // if (monthCol) {
        //     // enable/disable which months are valid
        //     // to show within the min/max date range
        //     for (i = 0; i < monthCol.options.length; i++) {
        //         monthOpt = monthCol.options[i];

        //         // loop through each month and see if it
        //         // is within the min/max date range
        //         monthOpt.disabled = (dateSortValue(selectedYear, monthOpt.value, 31) < minCompareVal ||
        //             dateSortValue(selectedYear, monthOpt.value, 1) > maxCompareVal);
        //     }
        // }

        // if (dayCol) {
        //     if (isPresent(selectedMonth)) {
        //         // enable/disable which days are valid
        //         // to show within the min/max date range
        //         for (i = 0; i < dayCol.options.length; i++) {
        //             dayOpt = dayCol.options[i];

        //             // loop through each day and see if it
        //             // is within the min/max date range
        //             var compareVal = dateSortValue(selectedYear, selectedMonth, dayOpt.value);

        //             dayOpt.disabled = (compareVal < minCompareVal ||
        //                 compareVal > maxCompareVal ||
        //                 numDaysInMonth <= i);
        //         }

        //     } else {
        //         // enable/disable which numbers of days to show in this month
        //         for (i = 0; i < dayCol.options.length; i++) {
        //             dayCol.options[i].disabled = (numDaysInMonth <= i);
        //         }
        //     }
        // }

        // picker.refresh();
    }

    divyColumns(picker: Picker) {
        let pickerColumns = picker.getColumns();
        let columns: number[] = [];

        pickerColumns.forEach((col, i) => {
            columns.push(0);

            col.options.forEach(opt => {
                if (opt.text.length > columns[i]) {
                    columns[i] = opt.text.length;
                }
            });

        });

        if (columns.length === 2) {
            var width = Math.max(columns[0], columns[1]);
            pickerColumns[0].align = "right";
            pickerColumns[1].align = "left";
            pickerColumns[0].optionsWidth = pickerColumns[1].optionsWidth = `${width * 17}px`;

        } else if (columns.length === 3) {
            var width = Math.max(columns[0], columns[2]);
            pickerColumns[0].align = "right";
            pickerColumns[1].columnWidth = `${columns[1] * 17}px`;
            pickerColumns[0].optionsWidth = pickerColumns[2].optionsWidth = `${width * 17}px`;
            pickerColumns[2].align = "left";
        }
    }

    public set value(value: number | Date) {
        if (value) {
            this._value = typeof value === "number" ? new Date(value) : new Date(value);
        } else {
            this._value = undefined;
        }
    }

    public get value(): Date | number {

        if (!this._value) {
            return undefined;
        }
        
        if (this.valueType && this.valueType == "number") {
            return this._value.getTime();
        }

        return this._value ? new Date(this._value) : undefined;
    }

    /**
     * @private
     */
    checkHasValue(inputValue: any) {
        if (this.item) {
            this.item.setElementClass("input-has-value", !inputValue);
        }
    }

    /**
     * @private
     */
    updateText() {
        if (this._value) {
            let options = this.displayFormat || defaultDateTimeFormat;
            //console.log(this._value);
            this._text = this.intl.dateTime(this._value, options);
        } else {
            this._text = null;
        }
    }

    /**
     * @input {boolean} Whether or not the datetime component is disabled. Default `false`.
     */
    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(val) {
        this._disabled = isTrueProperty(val);
    }

    /**
     * @private
     */
    writeValue(val: any) {
        //console.debug("datetime, writeValue", val);
        this.value = val;
        this.updateText();
        this.checkHasValue(val);
    }

    /**
     * @private
     */
    ngAfterContentInit() {
        this.updateText();
    }

    /**
     * @private
     */
    registerOnChange(fn: Function): void {
        this._fn = fn;
    }

    /**
     * @private
     */
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    private onChange(val: any) {
        this.value = val;
        this.updateText();
        this.onTouched();

        if (this._fn) {
            this._fn(this.value);
        }
    }

    /**
     * @private
     */
    onTouched() {

    }

    /**
     * @private
     */
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    /**
     * @private
     */
    ngOnDestroy() {
        this.form.deregister(this);
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes["displayFormat"]) {
            this.updateText();
        }
    }
    ngAfterContentChecked() {
        this.setItemInputControlCss();
    }

    private setItemInputControlCss() {
        let item = this.item;
        if (item && this.formControl) {
            this.setControlCss(item, this.formControl);
        }
    }

    private setControlCss(element: any, control: NgControl) {
        element.setElementClass('ng-untouched', control.untouched);
        element.setElementClass('ng-touched', control.touched);
        element.setElementClass('ng-pristine', control.pristine);
        element.setElementClass('ng-dirty', control.dirty);
        element.setElementClass('ng-valid', control.valid);
        element.setElementClass('ng-invalid', !control.valid && control.enabled);
    }

}


@NgModule({
    declarations: [DateTimePicker],
    exports: [DateTimePicker],
    imports: [IonicModule]
})
export class DateTimePickerModule {
}