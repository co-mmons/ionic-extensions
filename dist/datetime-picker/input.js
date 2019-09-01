import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from "@angular/core";
import { NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
import { defaultDateTimeFormat } from "./default-formats";
import { DateTimePickerOverlay } from "./overlay";
var DateTimePickerInput = /** @class */ (function () {
    function DateTimePickerInput(element, intl, modalController, control) {
        this.element = element;
        this.intl = intl;
        this.modalController = modalController;
        this.control = control;
        this.ionChange = new EventEmitter();
        if (control) {
            control.valueAccessor = this;
        }
    }
    DateTimePickerInput_1 = DateTimePickerInput;
    DateTimePickerInput.currentTimezone = function () {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    };
    Object.defineProperty(DateTimePickerInput.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "disabled", {
        /**
         * Whether or not the datetime-picker component is disabled.
         */
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = disabled || disabled == "true" ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "listItem", {
        get: function () {
            if (this._listItem) {
                return this._listItem;
            }
            return this._listItem = this.element.nativeElement.closest("ion-item");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "displayFormat", {
        get: function () {
            return this._displayFormat;
        },
        /**
         * The display format of the date and time as text that shows
         * within the item. When the `pickerFormat` input is not used, then the
         * `displayFormat` is used for both display the formatted text, and determining
         * the datetime-picker picker's columns.
         */
        set: function (format) {
            if (typeof format === "string") {
                this._displayFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
            }
            else {
                this._displayFormat = format;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "pickerFormat", {
        get: function () {
            return this._pickerFormat;
        },
        set: function (format) {
            if (typeof format == "string") {
                this._pickerFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
            }
            else {
                this._pickerFormat = format;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "value", {
        get: function () {
            if (!this._value) {
                return undefined;
            }
            return new DateTimezone(new Date(this._value.date.getTime()), this._value.timezone);
        },
        set: function (value) {
            var changed = false;
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
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerInput.prototype.clearValue = function () {
        this.value = undefined;
        if (this.controlOnTouched) {
            this.controlOnTouched();
        }
    };
    DateTimePickerInput.prototype.hasValue = function () {
        return !!this._value;
    };
    DateTimePickerInput.prototype.checkListItemHasValue = function () {
        if (this.listItem) {
            if (this.hasValue()) {
                this.listItem.classList.add("has-value");
            }
            else {
                this.listItem.classList.remove("has-value");
            }
        }
    };
    DateTimePickerInput.prototype.updateText = function () {
        if (this.hasValue()) {
            var options = Object.assign({}, this.displayFormat || defaultDateTimeFormat);
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
    };
    DateTimePickerInput.prototype.clicked = function (ev) {
        if (ev.detail === 0 || this.disabled || this.readonly) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open(ev);
    };
    DateTimePickerInput.prototype.keyuped = function () {
        this.open(undefined);
    };
    DateTimePickerInput.prototype.open = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var formatOptions, timezone, value, overlayTitle, label, overlay, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.disabled || this.opened || this.readonly) {
                            return [2 /*return*/];
                        }
                        formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
                        timezone = this._value ? this._value.timezone : this.defaultTimezone;
                        if (timezone === "current") {
                            timezone = DateTimePickerInput_1.currentTimezone();
                        }
                        value = this._value && this._value.date ? this._value.date : new Date();
                        {
                            if (!timezone || timezone === "UTC") {
                                value = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate(), value.getUTCHours(), value.getUTCMinutes(), 0, 0));
                            }
                            else {
                                value = new Date(value.getTime() + (DateTimezone.timezoneOffset(timezone, value) * 60 * 1000 * -1));
                            }
                        }
                        overlayTitle = this.overlayTitle;
                        if (this.listItem && !overlayTitle) {
                            label = this.listItem.querySelector("ion-label");
                            if (label) {
                                overlayTitle = label.innerText;
                            }
                        }
                        return [4 /*yield*/, this.modalController.create({
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
                            })];
                    case 1:
                        overlay = _b.sent();
                        overlay.present();
                        _a = this.overlayClosed;
                        return [4 /*yield*/, overlay.onDidDismiss()];
                    case 2:
                        _a.apply(this, [(_b.sent()).data]);
                        return [2 /*return*/];
                }
            });
        });
    };
    DateTimePickerInput.prototype.overlayClosed = function (newValue) {
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
    };
    DateTimePickerInput.prototype.writeValue = function (value) {
        this.muteControlOnChange = true;
        if (value instanceof Date || value instanceof DateTimezone || typeof value === "number") {
            this.value = value;
        }
        else {
            this.value = undefined;
        }
    };
    DateTimePickerInput.prototype.registerOnChange = function (fn) {
        this.controlOnChange = fn;
    };
    DateTimePickerInput.prototype.registerOnTouched = function (fn) {
        this.controlOnTouched = fn;
    };
    DateTimePickerInput.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    DateTimePickerInput.prototype.nativeInputFocused = function () {
        if (this.listItem) {
            if (!this.listItem.classList.contains("item-has-focus")) {
                this.listItem.classList.add("item-has-focus");
                // if (!this.hasValue()) {
                //     this.open();
                // }
            }
        }
    };
    DateTimePickerInput.prototype.nativeInputBlured = function () {
        if (this.listItem) {
            this.listItem.classList.remove("item-has-focus");
        }
    };
    DateTimePickerInput.prototype.ngOnChanges = function (changes) {
        if (changes["displayFormat"]) {
            this.updateText();
        }
        if (changes["readonly"] || changes["disabled"]) {
            this.setupCss();
        }
    };
    DateTimePickerInput.prototype.ngOnInit = function () {
        this.updateText();
        this.setupCss();
    };
    DateTimePickerInput.prototype.setupCss = function () {
        if (this.listItem) {
            this.listItem.classList.add("item-input");
            if (this.readonly || this._disabled) {
                this.listItem.classList.remove("item-interactive");
            }
            else {
                this.listItem.classList.add("item-interactive");
            }
        }
    };
    DateTimePickerInput.prototype.ngAfterContentChecked = function () {
        //this.setItemInputControlCss();
    };
    var DateTimePickerInput_1;
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
            template: "\n        <input #nativeInput\n               type=\"text\" \n               class=\"native-input\" \n               readonly [attr.disabled]=\"disabled || null\"\n               [attr.placeholder]=\"placeholder || null\"\n               [attr.value]=\"text || null\"\n               (focus)=\"nativeInputFocused()\" \n               (blur)=\"nativeInputBlured()\"/>\n    ",
            styles: [
                "\n            :host {\n                position: relative;\n                display: block;\n                flex: 1;\n                width: 100%;\n                --padding-end: 16px;\n                --padding-start: 16px;\n                --padding-top: 10px;\n                --padding-bottom: 10px;\n            }\n            \n            :host-context(.md) {\n                --padding-bottom: 11px;\n            }\n            \n            :host-context(.item-label-stacked) {\n                --padding-end: 0px;\n                --padding-start: 0px;\n                --padding-top: 9px;\n                --padding-bottom: 9px;\n            }\n            \n            :host .native-input {\n                padding-top: var(--padding-top, 10px);\n                padding-bottom: var(--padding-bottom, 9px);\n                padding-left: var(--padding-start, 0px);\n                padding-right: var(--padding-end, 0px);\n                display: inline-block;\n\n                flex: 1;\n\n                width: 100%;\n                max-width: 100%;\n                max-height: 100%;\n\n                border: 0;\n\n                outline: none;\n\n                background: transparent;\n\n                box-sizing: border-box;\n                appearance: none;\n            }\n            \n            :host-context(.ios) .native-input {\n                --padding-top: 9px;\n                --padding-bottom: 8px;\n            }\n            \n            :host .native-input::placeholder {\n                opacity: 0.5;\n            }\n\n            :host .native-input:-webkit-autofill {\n                background-color: transparent;\n            }\n        "
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            IntlService,
            ModalController,
            NgControl])
    ], DateTimePickerInput);
    return DateTimePickerInput;
}());
export { DateTimePickerInput };
//# sourceMappingURL=input.js.map