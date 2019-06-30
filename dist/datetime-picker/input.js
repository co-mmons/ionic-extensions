var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return __awaiter(this, void 0, void 0, function () {
            var formatOptions, timezone, value, overlayTitle, label, overlay, _a;
            return __generator(this, function (_b) {
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
    __decorate([
        ViewChild("nativeInput", { read: ElementRef, static: true }),
        __metadata("design:type", ElementRef)
    ], DateTimePickerInput.prototype, "nativeInput", void 0);
    __decorate([
        HostBinding("class.datetime-disabled"),
        __metadata("design:type", Boolean)
    ], DateTimePickerInput.prototype, "_disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DateTimePickerInput.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DateTimePickerInput.prototype, "overlayTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DateTimePickerInput.prototype, "placeholder", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DateTimePickerInput.prototype, "ionChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DateTimePickerInput.prototype, "timezoneDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DateTimePickerInput.prototype, "defaultTimezone", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateTimePickerInput.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateTimePickerInput.prototype, "displayFormat", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateTimePickerInput.prototype, "pickerFormat", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateTimePickerInput.prototype, "value", null);
    __decorate([
        HostListener("click", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UIEvent]),
        __metadata("design:returntype", void 0)
    ], DateTimePickerInput.prototype, "clicked", null);
    __decorate([
        HostListener("keyup.space"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DateTimePickerInput.prototype, "keyuped", null);
    DateTimePickerInput = DateTimePickerInput_1 = __decorate([
        Component({
            selector: "ionx-datetime",
            template: "\n        <input #nativeInput\n               type=\"text\" \n               class=\"native-input\" \n               readonly [attr.disabled]=\"disabled || null\"\n               [attr.placeholder]=\"placeholder || null\"\n               [attr.value]=\"text || null\"\n               (focus)=\"nativeInputFocused()\" \n               (blur)=\"nativeInputBlured()\"/>\n    ",
            styles: [
                "\n            :host {\n                position: relative;\n                display: block;\n                flex: 1;\n                width: 100%;\n                --padding-end: 16px;\n                --padding-start: 16px;\n                --padding-top: 10px;\n                --padding-bottom: 10px;\n            }\n            \n            :host-context(.md) {\n                --padding-bottom: 11px;\n            }\n            \n            :host-context(.item-label-stacked) {\n                --padding-end: 0px;\n                --padding-start: 0px;\n                --padding-top: 9px;\n                --padding-bottom: 9px;\n            }\n            \n            :host .native-input {\n                padding-top: var(--padding-top, 10px);\n                padding-bottom: var(--padding-bottom, 9px);\n                padding-left: var(--padding-start, 0px);\n                padding-right: var(--padding-end, 0px);\n                display: inline-block;\n\n                flex: 1;\n\n                width: 100%;\n                max-width: 100%;\n                max-height: 100%;\n\n                border: 0;\n\n                outline: none;\n\n                background: transparent;\n\n                box-sizing: border-box;\n                appearance: none;\n            }\n            \n            :host-context(.ios) .native-input {\n                --padding-top: 9px;\n                --padding-bottom: 8px;\n            }\n            \n            :host .native-input::placeholder {\n                opacity: 0.5;\n            }\n\n            :host .native-input:-webkit-autofill {\n                background-color: transparent;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [ElementRef,
            IntlService,
            ModalController,
            NgControl])
    ], DateTimePickerInput);
    return DateTimePickerInput;
}());
export { DateTimePickerInput };
//# sourceMappingURL=input.js.map