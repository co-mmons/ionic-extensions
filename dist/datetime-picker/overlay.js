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
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
import { SelectOptions } from "../select";
import { timezoneInfo } from "./timezone-info";
var weekdayNarrowFormat = {
    weekday: "short"
};
var monthYearFormat = {
    month: "long",
    year: "numeric"
};
var monthFormat = {
    month: "long"
};
var DateTimePickerOverlay = /** @class */ (function () {
    function DateTimePickerOverlay(viewController, intl, changeDetector) {
        this.viewController = viewController;
        this.intl = intl;
        this.changeDetector = changeDetector;
        this.dateView = "days";
        this.dateViews = [{ id: "days", label: this.intl.message("@co.mmons/ionic-extensions#Day") }, { id: "months", label: this.intl.message("@co.mmons/ionic-extensions#Month") }, { id: "years", label: this.intl.message("@co.mmons/ionic-extensions#Year") }];
    }
    DateTimePickerOverlay.prototype.dateViewChanged = function () {
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    };
    DateTimePickerOverlay.prototype.dateViewMove = function (step) {
        if (this.dateView == "days") {
            this.dateViewValue.setUTCMonth(this.dateViewValue.getUTCMonth() + step);
        }
        else if (this.dateView == "months") {
            this.dateViewValue.setUTCFullYear(this.dateViewValue.getUTCFullYear() + step);
        }
        else if (this.dateView == "years") {
            var yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
            var yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
            var yearStart = 0;
            if (yearTens >= 80) {
                yearStart = 80;
            }
            else if (yearTens >= 60) {
                yearStart = 60;
            }
            else if (yearTens >= 40) {
                yearStart = 40;
            }
            else if (yearTens >= 20) {
                yearStart = 20;
            }
            this.dateViewValue.setUTCFullYear(yearHundret + yearStart + (20 * step));
        }
        this.generateDateValues();
        this.generateDateHeader();
    };
    DateTimePickerOverlay.prototype.dateValueClicked = function (value) {
        var tmpDate = new Date(this.dateViewValue);
        if (this.dateView == "days") {
            tmpDate.setUTCDate(value);
        }
        else if (this.dateView == "months") {
            tmpDate.setUTCMonth(value);
            for (var i = 1; i < 5; i++) {
                if (tmpDate.getUTCMonth() != value) {
                    tmpDate = new Date(this.dateViewValue);
                    tmpDate.setUTCDate(tmpDate.getUTCDate() - i);
                    tmpDate.setUTCMonth(value);
                }
                else {
                    break;
                }
            }
        }
        else if (this.dateView == "years") {
            tmpDate.setUTCFullYear(value);
            for (var i = 1; i < 5; i++) {
                if (tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()) {
                    tmpDate = new Date(this.dateViewValue);
                    tmpDate.setUTCMonth(this.dateViewValue.getUTCMonth(), tmpDate.getUTCDate() - i);
                    tmpDate.setUTCFullYear(value);
                }
                else {
                    break;
                }
            }
        }
        for (var _i = 0, _a = this.dateValues; _i < _a.length; _i++) {
            var v = _a[_i];
            v.checked = v.id == value;
        }
        this.value = new Date(tmpDate);
        this.dateViewValue = new Date(tmpDate);
    };
    DateTimePickerOverlay.prototype.generateDateValues = function () {
        this.dateValues = [];
        var tmpDate = new Date(this.dateViewValue);
        if (this.dateView == "days") {
            for (var d = 1; d <= 33; d++) {
                tmpDate.setUTCDate(d);
                tmpDate.setUTCHours(0, 0, 0, 0);
                this.dateValues.push({
                    id: d,
                    label: d,
                    sublabel: this.intl.dateFormat(tmpDate, weekdayNarrowFormat),
                    checked: (this.value.getUTCFullYear() == tmpDate.getUTCFullYear() && this.value.getUTCMonth() == tmpDate.getUTCMonth() && this.value.getUTCDate() == d),
                    hidden: tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()
                });
            }
        }
        else if (this.dateView == "months") {
            var tmpDate_1 = new Date(Date.UTC(1999, this.dateViewValue.getUTCMonth()));
            for (var m = 0; m < 12; m++) {
                tmpDate_1.setUTCMonth(m);
                this.dateValues.push({
                    id: m,
                    label: this.intl.dateFormat(tmpDate_1, monthFormat),
                    checked: this.value.getUTCFullYear() == this.dateViewValue.getUTCFullYear() && this.value.getUTCMonth() == m
                });
            }
        }
        else if (this.dateView == "years") {
            var tmpDate_2 = new Date(this.dateViewValue);
            var yearHundret = Math.floor(tmpDate_2.getUTCFullYear() / 100) * 100;
            var yearTens = tmpDate_2.getUTCFullYear() - yearHundret;
            var yearStart = 0;
            if (yearTens >= 80) {
                yearStart = 80;
            }
            else if (yearTens >= 60) {
                yearStart = 60;
            }
            else if (yearTens >= 40) {
                yearStart = 40;
            }
            else if (yearTens >= 20) {
                yearStart = 20;
            }
            tmpDate_2.setUTCFullYear(yearHundret + yearStart - 1);
            for (var y = 0; y < 20; y++) {
                tmpDate_2.setUTCFullYear(tmpDate_2.getUTCFullYear() + 1);
                this.dateValues.push({
                    id: tmpDate_2.getUTCFullYear(),
                    label: tmpDate_2.getUTCFullYear(),
                    checked: this.value.getUTCFullYear() == tmpDate_2.getUTCFullYear()
                });
            }
        }
    };
    DateTimePickerOverlay.prototype.generateDateHeader = function () {
        if (this.dateView == "days") {
            this.dateHeader = this.intl.dateFormat(this.dateViewValue, monthYearFormat);
        }
        else if (this.dateView == "months") {
            this.dateHeader = this.dateViewValue.getUTCFullYear() + "";
        }
        else if (this.dateView == "years") {
            var yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
            var yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
            var yearStart = 0;
            if (yearTens >= 80) {
                yearStart = 80;
            }
            else if (yearTens >= 60) {
                yearStart = 60;
            }
            else if (yearTens >= 40) {
                yearStart = 40;
            }
            else if (yearTens >= 20) {
                yearStart = 20;
            }
            this.dateHeader = yearHundret + yearStart + " - " + (yearHundret + yearStart + 19);
        }
    };
    Object.defineProperty(DateTimePickerOverlay.prototype, "timeVisible", {
        get: function () {
            return !!this.formatOptions.hour || !!this.formatOptions.hour12 || !!this.formatOptions.minute;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerOverlay.prototype, "timeHoursFormatted", {
        get: function () {
            return this.formatTime(this.value.getUTCHours());
        },
        set: function (hours) {
            try {
                var h = parseInt(hours);
                if (!isNaN(h)) {
                    this.timeHours = h;
                }
                else {
                    this.timeHours = 0;
                }
            }
            catch (_a) {
                this.timeHours = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerOverlay.prototype, "timeHours", {
        get: function () {
            return this.value.getUTCHours();
        },
        set: function (hours) {
            if (hours < 0 || hours > 23) {
                hours = 0;
            }
            this.value.setUTCHours(hours);
            this.dateViewValue.setUTCHours(hours);
            this.changeDetector.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerOverlay.prototype, "timeMinutesFormatted", {
        get: function () {
            return this.formatTime(this.value.getUTCMinutes());
        },
        set: function (minutes) {
            try {
                var h = parseInt(minutes);
                if (!isNaN(h)) {
                    this.timeMinutes = h;
                }
                else {
                    this.timeMinutes = 0;
                }
            }
            catch (_a) {
                this.timeMinutes = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerOverlay.prototype, "timeMinutes", {
        get: function () {
            return this.value.getUTCMinutes();
        },
        set: function (minutes) {
            if (minutes < 0 || minutes > 59) {
                minutes = 0;
            }
            this.value.setUTCMinutes(minutes);
            this.dateViewValue.setUTCMinutes(minutes);
            this.changeDetector.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerOverlay.prototype.formatTime = function (value) {
        if (value < 10) {
            return "0" + value;
        }
        else {
            return value + "";
        }
    };
    DateTimePickerOverlay.prototype.todayClicked = function () {
        var now = new Date();
        this.value.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    };
    DateTimePickerOverlay.prototype.cancelClicked = function () {
        this.viewController.dismiss();
    };
    DateTimePickerOverlay.prototype.doneClicked = function () {
        var value = this.value;
        if (this.timezone && this.timezone !== "UTC") {
            value = new Date(value.getTime() - (DateTimezone.timezoneOffset(this.timezone, this.value) * 60 * 1000 * -1));
        }
        this.viewController.dismiss(new DateTimezone(value, this.timezone), null);
    };
    DateTimePickerOverlay.prototype.loadTimezones = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timezones, _i, _a, t;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, import("./timezones")];
                    case 1:
                        timezones = _b.sent();
                        this.timezones = new SelectOptions();
                        for (_i = 0, _a = timezones.timezones(this.value); _i < _a.length; _i++) {
                            t = _a[_i];
                            this.timezones.pushOption(t.id, t.label);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DateTimePickerOverlay.prototype.ngOnInit = function () {
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
        if (!this.timezoneDisabled) {
            if (this.timezone) {
                try {
                    var info = timezoneInfo(this.timezone);
                    this.timezones = new SelectOptions();
                    this.timezones.pushOption(info.id, info.label);
                }
                catch (error) {
                    // console.warn(error);
                }
            }
            this.loadTimezones();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], DateTimePickerOverlay.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateTimePickerOverlay.prototype, "formatOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DateTimePickerOverlay.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DateTimePickerOverlay.prototype, "timezone", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DateTimePickerOverlay.prototype, "timezoneDisabled", void 0);
    DateTimePickerOverlay = __decorate([
        Component({
            selector: "ionx-datetime-overlay",
            template: "\n        <ion-header>\n            <ion-toolbar>\n                <ion-buttons slot=\"start\">\n                    <ion-button (click)=\"cancelClicked()\" fill=\"clear\">\n                        <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n                    </ion-button>\n                </ion-buttons>\n\n                <ion-title>{{title}}</ion-title>                \n\n                <ion-buttons slot=\"end\">\n                    <ion-button (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n                </ion-buttons>\n            </ion-toolbar>\n            <ion-toolbar>\n                <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n                    <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n                </ion-segment>\n            </ion-toolbar>\n        </ion-header>\n        <ion-content>\n            \n            <div>\n\n                <ion-row ionx--values-header>\n                    <ion-col size=\"3\">\n                        <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                            <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                        </ion-button>\n                    </ion-col>\n                    <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n                    <ion-col size=\"3\" text-right>\n                        <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                            <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                        </ion-button>\n                    </ion-col>\n                </ion-row>\n                \n                <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n                    <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                        <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                            <div>\n                                <div>{{value.label}}</div>\n                                <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                            </div>\n                        </ion-button>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                        <ion-button (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions#Today\" | intlMessage}}</ion-button>\n                    </ion-col>\n                </ion-row>\n                \n            </div>\n\n        </ion-content>\n        \n        <ion-footer *ngIf=\"timeVisible\">\n            <ion-toolbar>\n                <ion-row>\n                    <ion-col size=\"3\">\n                        <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n                    </ion-col>\n                    <ion-col>\n                        <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>                \n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col size=\"3\">\n                        <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n                    </ion-col>\n                    <ion-col>\n                        <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>                \n                    </ion-col>\n                </ion-row>\n                <ion-row *ngIf=\"!timezoneDisabled\">\n                    <ion-col size=\"3\"></ion-col>\n                    <ion-col size=\"9\">\n                        <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions#No time zone' | intlMessage\"></ionx-select>\n                    </ion-col>\n                </ion-row>\n            </ion-toolbar>\n        </ion-footer>\n    ",
            styles: [
                "\n            :host {\n                display: flex;\n            }\n            \n            :host-context(.ios) ion-segment {\n                margin-bottom: 4px; \n            }\n\n            :host [ionx--values-header] {\n                margin: 16px 16px 8px 16px;\n            }\n\n            :host-context(.ios) [ionx--values-header] {\n                margin-top: 0px;\n                margin-bottom: 0px;\n            }\n            \n            :host [ionx--values-header] ion-col {\n                padding: 0px;\n                align-self: center;\n            }\n\n            :host [ionx--values-header] ion-button {\n                max-height: 36px;\n            }\n            \n            :host [ionx--values-grid] ion-col {\n                display: flex;\n                padding: 4px;\n                align-items: center;\n                justify-content: center;\n            }\n            \n            :host [ionx--values-grid] ion-button {\n                --box-shadow: none;\n                padding: 0px;\n                margin: 0px;\n                flex: 1;\n                display: flex;\n                --width: 100%;\n                --padding-start: 2px;\n                --padding-end: 2px;\n                --padding-top: 2px;\n                --padding-bottom: 2px;\n                --margin-start: 0px;\n                --margin-end: 0px;\n                --margin-top: 0px;\n                --margin-bottom: 0px;\n            }\n\n            :host [ionx--values-grid] ion-button div {\n                min-width: 40px;\n                line-height: 0.8;\n            }\n            \n            :host-context(.md) [ionx--values-grid] ion-button.button-outline {\n                --border-width: 1px;\n            }\n            \n            :host-context(.ios) [ionx--values-grid] ion-button {\n                --padding-start: 0px;\n                --padding-end: 0px;\n                --padding-top: 0px;\n                --padding-bottom: 0px;\n                --margin-start: 0px;\n                --margin-end: 0px;\n                --margin-top: 0px;\n                --margin-bottom: 0px;\n            }\n            \n            :host ion-footer ion-toolbar {\n                --padding-start: 16px;\n                --padding-end: 16px;\n                --padding-top: 0px;\n                --padding-bottom: 0px;\n            }\n\n            :host ion-footer ion-range {\n                padding: 0px 8px 0px 0px;\n            }\n            \n            :host ion-footer ion-input {\n                --padding-end: 8px;\n                --padding-start: 0px;\n                text-align: center;\n            }\n            \n            :host ion-footer ion-col {\n                padding: 0px;\n                align-self: center;\n            }\n            \n            :host ion-footer ionx-select {\n                padding-left: 0px;\n            }\n        "
            ]
        }),
        __metadata("design:paramtypes", [ModalController, IntlService, ChangeDetectorRef])
    ], DateTimePickerOverlay);
    return DateTimePickerOverlay;
}());
export { DateTimePickerOverlay };
//# sourceMappingURL=overlay.js.map