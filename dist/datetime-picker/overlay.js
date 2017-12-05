var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
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
var DateTimeOverlay = /** @class */ (function () {
    function DateTimeOverlay(element, params, viewController, intl) {
        this.element = element;
        this.viewController = viewController;
        this.intl = intl;
        this.dateView = "days";
        this.dateViews = [{ id: "days", label: "Dzień" }, { id: "months", label: "Miesiąc" }, { id: "years", label: "Rok" }];
        this.timeVisible = false;
        this.formatOptions = params.get("formatOptions");
        this.value = params.get("value");
        if (this.formatOptions.hour || this.formatOptions.hour12 || this.formatOptions.minute) {
            this.timeVisible = true;
        }
    }
    DateTimeOverlay.prototype.dateViewChanged = function () {
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    };
    DateTimeOverlay.prototype.dateViewMove = function (step) {
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
    DateTimeOverlay.prototype.dateValueClicked = function (value) {
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
    DateTimeOverlay.prototype.generateDateValues = function () {
        this.dateValues = [];
        var tmpDate = new Date(this.dateViewValue);
        if (this.dateView == "days") {
            for (var d = 1; d <= 33; d++) {
                tmpDate.setUTCDate(d);
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
            var tmpDate_1 = new Date(1999, this.dateViewValue.getUTCMonth());
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
    DateTimeOverlay.prototype.generateDateHeader = function () {
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
    Object.defineProperty(DateTimeOverlay.prototype, "timeHours", {
        get: function () {
            return this.value.getUTCHours();
        },
        set: function (hours) {
            this.value.setUTCHours(hours);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimeOverlay.prototype, "timeMinutes", {
        get: function () {
            return this.value.getUTCMinutes();
        },
        set: function (minutes) {
            this.value.setUTCMinutes(minutes);
        },
        enumerable: true,
        configurable: true
    });
    DateTimeOverlay.prototype.formatTime = function (value) {
        if (value < 10) {
            return "0" + value;
        }
        else {
            return value;
        }
    };
    DateTimeOverlay.prototype.todayClicked = function () {
        var now = new Date();
        this.value.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    };
    DateTimeOverlay.prototype.cancelClicked = function () {
        this.viewController.dismiss();
    };
    DateTimeOverlay.prototype.doneClicked = function () {
        this.viewController.dismiss(this.value, null, { animate: false });
    };
    DateTimeOverlay.prototype.ngOnInit = function () {
        // find popover-content parent
        {
            var parent_1 = this.element.nativeElement.parentElement;
            while (parent_1) {
                if (parent_1.classList.contains("popover-content")) {
                    parent_1.classList.add("ionx-datetime-popover-content");
                    break;
                }
                parent_1 = parent_1.parentElement;
            }
        }
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    };
    DateTimeOverlay = __decorate([
        Component({
            selector: "ionx-datetime-overlay",
            template: "\n        <div class=\"ionx-datetime-overlay-content\">\n            <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n                <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n            </ion-segment>\n            <ion-row class=\"ionx-datetime-overlay-date-header\">\n                <ion-col col-3>\n                    <button ion-button clear icon-only (click)=\"dateViewMove(-1)\">\n                        <ion-icon name=\"arrow-dropleft\"></ion-icon>\n                    </button>\n                </ion-col>\n                <ion-col col-6 text-center>{{dateHeader}}</ion-col>\n                <ion-col col-3 text-right>\n                    <button ion-button clear icon-only (click)=\"dateViewMove(1)\">\n                        <ion-icon name=\"arrow-dropright\"></ion-icon>\n                    </button>\n                </ion-col>\n            </ion-row>\n            <ion-row class=\"ionx-datetime-overlay-date-values\">\n                <ion-col *ngFor=\"let value of dateValues\" [attr.col-2]=\"dateView == 'days' ? true : null\" [attr.col-3]=\"dateView == 'years' ? true : null\" [attr.col-6]=\"dateView == 'months' ? true : null\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                    <button ion-button [outline]=\"!value.checked\" (click)=\"dateValueClicked(value.id)\">\n                        <span>{{value.label}}</span>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </button>\n                </ion-col>\n                <ion-col col-6 *ngIf=\"dateView == 'days'\">\n                    <button ion-button (click)=\"todayClicked()\">Dzisiaj</button>\n                </ion-col>\n            </ion-row>\n        </div>\n        <div class=\"ionx-datetime-overlay-time\" *ngIf=\"timeVisible\">\n            <ion-row>\n                <ion-col col-2>{{formatTime(timeHours)}}</ion-col>\n                <ion-col>\n                    <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>                \n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col col-2>{{formatTime(timeMinutes)}}</ion-col>\n                <ion-col>\n                    <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>                \n                </ion-col>\n            </ion-row>\n        </div>\n        <ion-row class=\"ionx-datetime-overlay-footer\">\n            <ion-col text-right>\n                <button ion-button small (click)=\"cancelClicked()\">Anuluj</button>\n                <button ion-button small (click)=\"doneClicked()\">Gotowe</button>\n            </ion-col>\n        </ion-row>\n    "
        }),
        __metadata("design:paramtypes", [ElementRef, NavParams, ViewController, IntlService])
    ], DateTimeOverlay);
    return DateTimeOverlay;
}());
export { DateTimeOverlay };
//# sourceMappingURL=overlay.js.map