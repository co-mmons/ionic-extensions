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
import { Component, ElementRef, HostListener, Input, ViewEncapsulation, ViewChild, Output, EventEmitter } from "@angular/core";
import { NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
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
        this.valueType = "Date";
        if (control) {
            control.valueAccessor = this;
        }
    }
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
    Object.defineProperty(DateTimePickerInput.prototype, "text", {
        get: function () {
            return this.text$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "disabled", {
        /**
         * Whether or not the datetime-picker component is disabled. Default `false`.
         */
        get: function () {
            return this.disabled$;
        },
        set: function (disabled) {
            this.disabled$ = disabled || disabled == "true" ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "value", {
        get: function () {
            if (!this.dateValue) {
                return undefined;
            }
            if (this.valueType && this.valueType == "number") {
                return this.dateValue.getTime();
            }
            return new Date(this.dateValue);
        },
        set: function (value) {
            var changed = false;
            if ((value === undefined || value === null) != (this.dateValue === undefined)) {
                changed = true;
            }
            else if (typeof value === "number" && value != this.dateValue.getTime()) {
                changed = true;
            }
            else if (value instanceof Date && value.getTime() != this.dateValue.getTime()) {
                changed = true;
            }
            this.dateValue = typeof value == "number" ? new Date(value) : value;
            if (changed) {
                this.ionChange.emit(this.value);
                this.updateText();
                this.checkListItemHasValue();
            }
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerInput.prototype.hasValue = function () {
        return !!this.dateValue;
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
            var options = this.displayFormat || defaultDateTimeFormat;
            this.text$ = this.intl.dateTimeFormat(this.dateValue, options);
        }
        else {
            this.text$ = null;
        }
    };
    DateTimePickerInput.prototype.clicked = function (ev) {
        if (ev.detail === 0 || this.disabled) {
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
            var formatOptions, value, v, v, overlayTitle, label, overlay, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.disabled || this.opened) {
                            return [2 /*return*/];
                        }
                        formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
                        {
                            if (formatOptions.timeZone == "UTC") {
                                v = this.dateValue ? this.dateValue : new Date();
                                value = new Date(Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate(), v.getUTCHours(), v.getUTCMinutes(), 0, 0));
                            }
                            else {
                                v = this.dateValue ? this.dateValue : new Date();
                                value = new Date(Date.UTC(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), 0, 0));
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
                                componentProps: { formatOptions: formatOptions, value: value, title: overlayTitle },
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
            var formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
            var value = void 0;
            if (formatOptions.timeZone && formatOptions.timeZone.toUpperCase() == "UTC") {
                value = new Date(newValue.getTime());
            }
            else {
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
    };
    DateTimePickerInput.prototype.writeValue = function (value) {
        if (value instanceof Date) {
            this.value = value;
        }
        else if (typeof value == "number") {
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
    };
    DateTimePickerInput.prototype.ngOnInit = function () {
        this.updateText();
        if (this.listItem) {
            this.listItem.classList.add("item-input", "item-interactive");
        }
    };
    DateTimePickerInput.prototype.ngAfterContentChecked = function () {
        //this.setItemInputControlCss();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateTimePickerInput.prototype, "displayFormat", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateTimePickerInput.prototype, "pickerFormat", void 0);
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
        ViewChild("nativeInput", { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], DateTimePickerInput.prototype, "nativeInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DateTimePickerInput.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DateTimePickerInput.prototype, "valueType", void 0);
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
    DateTimePickerInput = __decorate([
        Component({
            selector: "ionx-datetime",
            template: "\n        <input type=\"text\" #nativeInput class=\"native-input\" readonly [attr.disabled]=\"disabled || null\" (focus)=\"nativeInputFocused()\" (blur)=\"nativeInputBlured()\" [attr.placeholder]=\"placeholder || null\" [attr.value]=\"text || null\"/>\n    ",
            host: {
                "[class.datetime-disabled]": "disabled"
            },
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ElementRef, IntlService, ModalController, NgControl])
    ], DateTimePickerInput);
    return DateTimePickerInput;
}());
export { DateTimePickerInput };
//# sourceMappingURL=input.js.map