var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { NgModule, Component, ElementRef, EventEmitter, HostListener, Input, Optional, Output, Renderer, ViewEncapsulation } from "@angular/core";
import { NgControl } from "@angular/forms";
import { IntlService } from "co.mmons.angular-intl";
import { Ion, Config, Item, IonicModule } from "ionic-angular";
import { PickerController } from "ionic-angular/components/picker/picker";
import { Form } from "ionic-angular/util/form";
import { deepCopy, isTrueProperty } from "ionic-angular/util/util";
export var defaultFormat = {
    year: "numeric", month: "numeric", day: "numeric",
    hour: "2-digit", minute: "2-digit"
};
export var DateTimePicker = (function (_super) {
    __extends(DateTimePicker, _super);
    function DateTimePicker(form, config, element, renderer, intl, item, pickerController, formControl) {
        _super.call(this, config, element, renderer, "datetime");
        this.form = form;
        this.intl = intl;
        this.item = item;
        this.pickerController = pickerController;
        this.formControl = formControl;
        this._disabled = false;
        this._text = "";
        this._isOpen = false;
        /**
         * @input {string} The text to display on the picker"s cancel button. Default: `Cancel`.
         */
        this.cancelText = "Cancel";
        /**
         * @input {string} The text to display on the picker"s "Done" button. Default: `Done`.
         */
        this.doneText = "Done";
        /**
         * @input {any} Any additional options that the picker interface can accept.
         * See the [Picker API docs](../../picker/Picker) for the picker options.
         */
        this.pickerOptions = {};
        /**
         * @output Any expression to evaluate when the datetime selection has changed.
         */
        this.ionChange = new EventEmitter();
        /**
         * @output Any expression to evaluate when the datetime selection was cancelled.
         */
        this.ionCancel = new EventEmitter();
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
    DateTimePicker.prototype._click = function (ev) {
        if (ev.detail === 0) {
            // do not continue if the click event came from a form submit
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open();
    };
    DateTimePicker.prototype._keyup = function () {
        if (!this._isOpen) {
            this.open();
        }
    };
    /**
     * @private
     */
    DateTimePicker.prototype.open = function () {
        var _this = this;
        if (this._disabled) {
            return;
        }
        //console.debug("datetime, open picker");
        // the user may have assigned some options specifically for the alert
        var pickerOptions = deepCopy(this.pickerOptions);
        var picker = this.pickerController.create(pickerOptions);
        pickerOptions.buttons = [
            {
                text: this.cancelText,
                role: "cancel",
                handler: function () {
                    _this.ionCancel.emit(null);
                }
            },
            {
                text: this.doneText,
                handler: function (data) {
                    //console.debug("datetime, done", data);
                    var value = _this._value ? _this.getValue() : new Date();
                    value.setSeconds(0);
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
                    }
                    if (data.minute) {
                        value.setMinutes(data.minute.value);
                    }
                    _this.onChange(value);
                    _this.ionChange.emit(data);
                }
            }
        ];
        this.generate(picker);
        this.validate(picker);
        picker.ionChange.subscribe(function () {
            _this.validate(picker);
        });
        picker.present(pickerOptions);
        this._isOpen = true;
        picker.onDidDismiss(function () {
            _this._isOpen = false;
        });
    };
    DateTimePicker.prototype.buildColumns = function () {
        var formatOptions = this.pickerFormat || this.displayFormat || {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        };
        var partsFormated = {};
        var partsPositions = [];
        var year = 1999;
        var month = 5;
        var day = 24;
        var hour = 11;
        var minute = 50;
        var testDate = new Date();
        testDate.setUTCFullYear(year);
        testDate.setUTCMonth(month - 1);
        testDate.setUTCDate(day - 1);
        testDate.setUTCHours(hour - 1);
        testDate.setUTCMinutes(minute - 1);
        for (var part in formatOptions) {
            if (part == "weekday" && formatOptions.day) {
                continue;
            }
            var partOptions = {};
            partOptions[part] = formatOptions[part];
            if (part == "hour") {
                partOptions.minute = "2-digit";
            }
            else if (part == "minute") {
                partOptions.hour = "2-digit";
            }
            var formatter = new Intl.DateTimeFormat("pl", partOptions);
            partsFormated[part] = formatter.format(testDate);
        }
        var testFormated = new Intl.DateTimeFormat("pl", formatOptions).format(testDate);
        for (var part in partsFormated) {
            var idx = testFormated.indexOf(partsFormated[part]);
            if (idx === -1) {
                idx = 100;
            }
            partsPositions.push([part, idx]);
        }
        var columns = [];
        for (var _i = 0, _a = partsPositions.sort(function (a, b) { return a[1] - b[1]; }); _i < _a.length; _i++) {
            var p = _a[_i];
            columns.push(p[0]);
        }
        return columns;
    };
    DateTimePicker.prototype.generate = function (picker) {
        var columns = this.buildColumns();
        var value = this._value || new Date();
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var columnName = columns_1[_i];
            var column = {
                name: columnName,
                options: []
            };
            var date = new Date(2000, 0, 1);
            var pickerFormat = this.pickerFormat || this.displayFormat;
            var formatOptions = {};
            var min = 0, max = 0;
            if (columnName == "year") {
                formatOptions.year = pickerFormat.year || "numeric";
                min = 2000;
                max = 2018;
            }
            else if (columnName == "month") {
                formatOptions.month = pickerFormat.month || "short";
                min = 0;
                max = 11;
            }
            else if (columnName == "day") {
                formatOptions.day = pickerFormat.day || "numeric";
                min = 1;
                max = 30;
            }
            else if (columnName == "hour") {
                formatOptions = undefined;
                min = 0;
                max = 23;
            }
            else if (columnName == "minute") {
                formatOptions = undefined;
                min = 0;
                max = 59;
            }
            var optionIndex = 0;
            var selectedIndex = -1;
            for (var i = min; i <= max; i++) {
                if (columnName == "year") {
                    date.setFullYear(i);
                    if (value.getFullYear() === i) {
                        selectedIndex = optionIndex;
                    }
                }
                else if (columnName == "month") {
                    date.setMonth(i);
                    if (value.getMonth() === i) {
                        selectedIndex = optionIndex;
                    }
                }
                else if (columnName == "day") {
                    date.setDate(i);
                    if (value.getDate() === i) {
                        selectedIndex = optionIndex;
                    }
                }
                else if (columnName == "hour") {
                    date.setHours(i);
                    if (value.getHours() === i) {
                        selectedIndex = optionIndex;
                    }
                }
                else if (columnName == "minute") {
                    date.setMinutes(i);
                    if (value.getMinutes() === i) {
                        selectedIndex = optionIndex;
                    }
                }
                var text = void 0;
                if (formatOptions) {
                    text = this.intl.dateTime(date, formatOptions);
                }
                else {
                    text = i < 10 ? "0" + i : "" + i;
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
    };
    DateTimePicker.prototype.validate = function (picker) {
        var columns = picker.getColumns();
        var yearCol = columns.find(function (col) { return col.name === "year"; });
        var monthCol = columns.find(function (col) { return col.name === "month"; });
        var dayCol = columns.find(function (col) { return col.name === "day"; });
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
    };
    DateTimePicker.prototype.divyColumns = function (picker) {
        var pickerColumns = picker.getColumns();
        var columns = [];
        pickerColumns.forEach(function (col, i) {
            columns.push(0);
            col.options.forEach(function (opt) {
                if (opt.text.length > columns[i]) {
                    columns[i] = opt.text.length;
                }
            });
        });
        if (columns.length === 2) {
            var width = Math.max(columns[0], columns[1]);
            pickerColumns[0].align = "right";
            pickerColumns[1].align = "left";
            pickerColumns[0].optionsWidth = pickerColumns[1].optionsWidth = width * 17 + "px";
        }
        else if (columns.length === 3) {
            var width = Math.max(columns[0], columns[2]);
            pickerColumns[0].align = "right";
            pickerColumns[1].columnWidth = columns[1] * 17 + "px";
            pickerColumns[0].optionsWidth = pickerColumns[2].optionsWidth = width * 17 + "px";
            pickerColumns[2].align = "left";
        }
    };
    /**
     * @private
     */
    DateTimePicker.prototype.setValue = function (value) {
        this._value = typeof value === "number" ? new Date(value) : new Date(value);
    };
    /**
     * @private
     */
    DateTimePicker.prototype.getValue = function () {
        return new Date(this._value);
    };
    /**
     * @private
     */
    DateTimePicker.prototype.checkHasValue = function (inputValue) {
        if (this.item) {
            this.item.setElementClass("input-has-value", !!(inputValue && inputValue !== ""));
        }
    };
    /**
     * @private
     */
    DateTimePicker.prototype.updateText = function () {
        var options = this.displayFormat || defaultFormat;
        console.log(this._value);
        this._text = this.intl.dateTime(this._value, options);
    };
    Object.defineProperty(DateTimePicker.prototype, "disabled", {
        /**
         * @input {boolean} Whether or not the datetime component is disabled. Default `false`.
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    DateTimePicker.prototype.writeValue = function (val) {
        //console.debug("datetime, writeValue", val);
        this.setValue(val);
        this.updateText();
        this.checkHasValue(val);
    };
    /**
     * @private
     */
    DateTimePicker.prototype.ngAfterContentInit = function () {
        this.updateText();
    };
    /**
     * @private
     */
    DateTimePicker.prototype.registerOnChange = function (fn) {
        this._fn = fn;
    };
    /**
     * @private
     */
    DateTimePicker.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DateTimePicker.prototype.onChange = function (val) {
        this.setValue(val);
        this.updateText();
        this.onTouched();
        if (this._fn) {
            this._fn(val);
        }
    };
    /**
     * @private
     */
    DateTimePicker.prototype.onTouched = function () {
    };
    /**
     * @private
     */
    DateTimePicker.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @private
     */
    DateTimePicker.prototype.ngOnDestroy = function () {
        this.form.deregister(this);
    };
    DateTimePicker.prototype.ngOnChanges = function (changes) {
        if (changes["displayFormat"]) {
            this.updateText();
        }
    };
    DateTimePicker.prototype.ngAfterContentChecked = function () {
        this.setItemInputControlCss();
    };
    DateTimePicker.prototype.setItemInputControlCss = function () {
        var item = this.item;
        if (item && this.formControl) {
            this.setControlCss(item, this.formControl);
        }
    };
    DateTimePicker.prototype.setControlCss = function (element, control) {
        element.setElementClass('ng-untouched', control.untouched);
        element.setElementClass('ng-touched', control.touched);
        element.setElementClass('ng-pristine', control.pristine);
        element.setElementClass('ng-dirty', control.dirty);
        element.setElementClass('ng-valid', control.valid);
        element.setElementClass('ng-invalid', !control.valid && control.enabled);
    };
    DateTimePicker.decorators = [
        { type: Component, args: [{
                    selector: "ionx-date-time-picker",
                    template: "\n        <div class=\"datetime-text\">{{_text}}</div>\n        <button aria-haspopup=\"true\" type=\"button\" [id]=\"id\" \n            ion-button=\"item-cover\" [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"disabled\" [disabled]=\"disabled\" class=\"item-cover\">\n        </button>",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        "[class.datetime-disabled]": "_disabled"
                    },
                },] },
    ];
    /** @nocollapse */
    DateTimePicker.ctorParameters = [
        { type: Form, },
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: IntlService, },
        { type: Item, decorators: [{ type: Optional },] },
        { type: PickerController, decorators: [{ type: Optional },] },
        { type: NgControl, decorators: [{ type: Optional },] },
    ];
    DateTimePicker.propDecorators = {
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'displayFormat': [{ type: Input },],
        'pickerFormat': [{ type: Input },],
        'cancelText': [{ type: Input },],
        'doneText': [{ type: Input },],
        'pickerOptions': [{ type: Input },],
        'ionChange': [{ type: Output },],
        'ionCancel': [{ type: Output },],
        '_click': [{ type: HostListener, args: ["click", ["$event"],] },],
        '_keyup': [{ type: HostListener, args: ["keyup.space",] },],
        'disabled': [{ type: Input },],
    };
    return DateTimePicker;
}(Ion));
export var DateTimePickerModule = (function () {
    function DateTimePickerModule() {
    }
    DateTimePickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DateTimePicker],
                    exports: [DateTimePicker],
                    imports: [IonicModule]
                },] },
    ];
    /** @nocollapse */
    DateTimePickerModule.ctorParameters = [];
    return DateTimePickerModule;
}());
//# sourceMappingURL=index.js.map