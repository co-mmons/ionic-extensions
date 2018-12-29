var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController } from "@ionic/angular";
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
        this.dateViews = [{ id: "days", label: "Dzień" }, { id: "months", label: "Miesiąc" }, { id: "years", label: "Rok" }];
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
        this.viewController.dismiss(this.value, null);
    };
    DateTimePickerOverlay.prototype.ngOnInit = function () {
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
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
    DateTimePickerOverlay = __decorate([
        Component({
            selector: "ionx-datetime-overlay",
            template: "\n        <ion-header>\n            <ion-toolbar>\n                <ion-buttons slot=\"start\">\n                    <ion-button (click)=\"cancelClicked()\" fill=\"clear\">\n                        <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n                    </ion-button>\n                </ion-buttons>\n\n                <ion-title>{{title}}</ion-title>                \n\n                <ion-buttons slot=\"end\">\n                    <ion-button (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n                </ion-buttons>\n            </ion-toolbar>\n            <ion-toolbar>\n                <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n                    <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n                </ion-segment>\n            </ion-toolbar>\n        </ion-header>\n        <ion-content>\n            \n            <div class=\"ionx-datetime-overlay-content\">\n\n                <ion-row class=\"ionx-datetime-overlay-date-header\">\n                    <ion-col size=\"3\">\n                        <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                            <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                        </ion-button>\n                    </ion-col>\n                    <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n                    <ion-col size=\"3\" text-right>\n                        <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                            <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                        </ion-button>\n                    </ion-col>\n                </ion-row>\n                <ion-row class=\"ionx-datetime-overlay-date-values\">\n                    <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                        <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                            <div>\n                                <div>{{value.label}}</div>\n                                <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                            </div>\n                        </ion-button>\n                    </ion-col>\n                    <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                        <ion-button (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions#Today\" | intlMessage}}</ion-button>\n                    </ion-col>\n                </ion-row>\n            </div>\n\n        </ion-content>\n        <ion-footer *ngIf=\"timeVisible\">\n            <ion-toolbar>\n                <ion-row>\n                    <ion-col size=\"3\">\n                        <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n                    </ion-col>\n                    <ion-col>\n                        <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>                \n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col size=\"3\">\n                        <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n                    </ion-col>\n                    <ion-col>\n                        <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>                \n                    </ion-col>\n                </ion-row>\n            </ion-toolbar>\n        </ion-footer>\n    "
        }),
        __metadata("design:paramtypes", [ModalController, IntlService, ChangeDetectorRef])
    ], DateTimePickerOverlay);
    return DateTimePickerOverlay;
}());
export { DateTimePickerOverlay };
//# sourceMappingURL=overlay.js.map