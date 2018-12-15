var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { Component, ContentChildren, ElementRef, Input, Optional, QueryList, ViewEncapsulation, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController, PopoverController } from "@ionic/angular";
import { SelectOverlayContent } from "./select-overlay";
import { SelectOption } from "./select-option";
var Select = /** @class */ (function () {
    function Select(element, intl, popoverController, modalController, control) {
        var _this = this;
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.control = control;
        this.ionChange = new EventEmitter();
        this.values = [];
        this.valueComparator = function (a, b) {
            if (_this.compareAsString) {
                if (a !== undefined && a !== null && b !== undefined && b !== null) {
                    return a.toString() == b.toString();
                }
                else {
                    return a == b;
                }
            }
            return a === b;
        };
        if (control) {
            control.valueAccessor = this;
        }
    }
    Object.defineProperty(Select.prototype, "listItem", {
        get: function () {
            if (this._listItem) {
                return this._listItem;
            }
            return this._listItem = this.element.nativeElement.closest("ion-item");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "text", {
        get: function () {
            return this.text$ || this.placeholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "disabled", {
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
    Object.defineProperty(Select.prototype, "value", {
        get: function () {
            return this.multiple || this.alwaysArray ? this.values.slice(0) : (this.values.length > 0 ? this.values[0] : undefined);
        },
        set: function (value) {
            var changed = false;
            var newValue = Array.isArray(value) ? value : (value ? [value] : []);
            if (newValue.length != this.values.length) {
                changed = true;
            }
            else {
                for (var i = 0; i < this.values.length; i++) {
                    if (!this.valueComparator(this.values[i], newValue[i])) {
                        changed = true;
                        break;
                    }
                }
            }
            this.values = newValue;
            if (changed) {
                this.updateText();
                this.checkListItemHasValue();
                var value_1 = this.value;
                if (this.controlOnChange && !this.muteOnChange) {
                    this.controlOnChange(value_1);
                }
                this.ionChange.emit(value_1);
            }
            this.muteOnChange = false;
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.writeValue = function (value) {
        this.muteOnChange = true;
        this.value = value;
    };
    Select.prototype.hasValue = function () {
        return this.values.length > 0;
    };
    Select.prototype.updateText = function () {
        if (this.hasValue()) {
            var labels = [];
            if (this.options$) {
                for (var _i = 0, _a = this.options$.toArray(); _i < _a.length; _i++) {
                    var opt = _a[_i];
                    for (var _b = 0, _c = this.values || []; _b < _c.length; _b++) {
                        var val = _c[_b];
                        if (this.valueComparator(opt.value, val)) {
                            labels.push(opt.label);
                        }
                    }
                }
            }
            this.text$ = labels.join(", ") || undefined;
        }
        else {
            this.text$ = null;
        }
    };
    Select.prototype.checkListItemHasValue = function () {
        if (this.listItem) {
            if (this.hasValue()) {
                this.listItem.classList.add("has-value");
            }
            else {
                this.listItem.classList.remove("has-value");
            }
        }
    };
    Object.defineProperty(Select.prototype, "options", {
        set: function (val) {
            this.options$ = val;
            // const values = this.getValues();
            // if (values.length === 0) {
            //     // there are no values set at this point
            //     // so check to see who should be selected
            //     // we use writeValue() because we don't want to update ngModel
            //     this.writeValue(val.filter(o => o.selected).map(o => o.value));
            // } else {
            //     this._updateText();
            // }
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.isOptionSelected = function (option) {
        for (var _i = 0, _a = this.values || []; _i < _a.length; _i++) {
            var v = _a[_i];
            if (this.valueComparator(option.value, v)) {
                return true;
            }
        }
        return false;
    };
    Select.prototype.registerOnChange = function (fn) {
        this.controlOnChange = fn;
    };
    Select.prototype.registerOnTouched = function (fn) {
        this.controlOnTouched = fn;
    };
    Select.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Select.prototype.open = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var overlay, options, _i, _a, option, overlayTitle, label, overlayData, popover, modal;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        overlay = this.overlay;
                        if (!overlay) {
                            overlay = "popover";
                        }
                        options = [];
                        for (_i = 0, _a = this.options$.toArray(); _i < _a.length; _i++) {
                            option = _a[_i];
                            options.push({ value: option.value, checked: this.isOptionSelected(option), label: option.label, divider: !!option.divider });
                        }
                        if (this.listItem) {
                            label = this.listItem.querySelector("ion-label");
                            if (label) {
                                overlayTitle = label.innerText;
                            }
                        }
                        else if (this.element.nativeElement.title) {
                            overlayTitle = this.element.nativeElement.title;
                        }
                        else if (this.placeholder) {
                            overlayTitle = this.placeholder;
                        }
                        overlayData = {
                            overlay: overlay,
                            options: options,
                            multiple: !!this.multiple,
                            title: overlayTitle,
                            ordered: !!this.orderable,
                            valueValidator: this.validator,
                            valueComparator: this.valueComparator,
                            width: this.element.nativeElement.getBoundingClientRect().width,
                            updateValues: function (value) {
                                _this.value = value;
                                if (_this.controlOnTouched) {
                                    _this.controlOnTouched();
                                }
                            }
                        };
                        if (!(overlay == "popover")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.popoverController.create({ component: SelectOverlayContent, componentProps: overlayData, cssClass: "ionx-select-overlay-width", event: event })];
                    case 1:
                        popover = _b.sent();
                        popover.present();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.modalController.create({ component: SelectOverlayContent, componentProps: overlayData })];
                    case 3:
                        modal = _b.sent();
                        modal.present();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Select.prototype.ngOnChanges = function (changes) {
        // if (changes["displayFormat"]) {
        //     this.updateText();
        // }
    };
    Select.prototype.ngOnInit = function () {
        this.updateText();
        if (this.listItem) {
            this.listItem.classList.add("item-select", "item-interactive");
            this.element.nativeElement.classList.add("in-item");
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Select.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Select.prototype, "overlay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Select.prototype, "alwaysArray", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Select.prototype, "compareAsString", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Select.prototype, "multiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Select.prototype, "orderable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], Select.prototype, "searchHandler", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], Select.prototype, "validator", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Select.prototype, "ionChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Select.prototype, "disabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Select.prototype, "value", null);
    __decorate([
        ContentChildren(SelectOption),
        __metadata("design:type", QueryList),
        __metadata("design:paramtypes", [QueryList])
    ], Select.prototype, "options", null);
    Select = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            selector: "ionx-select",
            host: {
                "class": "select interactive"
            },
            template: "\n        <div class=\"select-inner\">\n            <div class=\"select-text\" [class.select-placeholder]=\"!hasValue()\">{{text}}</div>\n            <div class=\"select-icon\" role=\"presentation\">\n                <div class=\"select-icon-inner\"></div>\n            </div>\n            <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\"></button>\n        </div>\n    "
        }),
        __param(4, Optional()),
        __metadata("design:paramtypes", [ElementRef, IntlService, PopoverController, ModalController, NgControl])
    ], Select);
    return Select;
}());
export { Select };
//# sourceMappingURL=select.js.map