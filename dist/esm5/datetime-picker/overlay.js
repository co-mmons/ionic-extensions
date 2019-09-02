import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
import { SelectOptions } from "../select";
import { timezoneInfo } from "./timezone-info";
import { timezones } from "./timezones";
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
        var e_1, _a;
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
        try {
            for (var _b = tslib_1.__values(this.dateValues), _c = _b.next(); !_c.done; _c = _b.next()) {
                var v = _c.value;
                v.checked = v.id == value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_2, _a, _b, _c, t;
            return tslib_1.__generator(this, function (_d) {
                this.timezones = new SelectOptions();
                try {
                    for (_b = tslib_1.__values(timezones(this.value)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        t = _c.value;
                        this.timezones.pushOption(t.id, t.label);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return [2 /*return*/];
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], DateTimePickerOverlay.prototype, "value", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DateTimePickerOverlay.prototype, "formatOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DateTimePickerOverlay.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DateTimePickerOverlay.prototype, "timezone", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], DateTimePickerOverlay.prototype, "timezoneDisabled", void 0);
    DateTimePickerOverlay = tslib_1.__decorate([
        Component({
            selector: "ionx-datetime-overlay",
            template: "<ion-header>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-button (click)=\"cancelClicked()\" fill=\"clear\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ion-buttons>\n\n        <ion-title>{{title}}</ion-title>\n\n        <ion-buttons slot=\"end\">\n            <ion-button (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" text-right>\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
            styles: [":host{display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:flex;padding:4px;align-items:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow:none;padding:0;margin:0;flex:1;display:flex;--width:100%;--padding-start:2px;--padding-end:2px;--padding-top:2px;--padding-bottom:2px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start:16px;--padding-end:16px;--padding-top:0px;--padding-bottom:0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end:8px;--padding-start:0px;text-align:center}:host ion-footer ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width:1px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, IntlService, ChangeDetectorRef])
    ], DateTimePickerOverlay);
    return DateTimePickerOverlay;
}());
export { DateTimePickerOverlay };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsiZGF0ZXRpbWUtcGlja2VyL292ZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFdEMsSUFBTSxtQkFBbUIsR0FBK0I7SUFDcEQsT0FBTyxFQUFFLE9BQU87Q0FDbkIsQ0FBQztBQUVGLElBQU0sZUFBZSxHQUErQjtJQUNoRCxLQUFLLEVBQUUsTUFBTTtJQUNiLElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBK0I7SUFDNUMsS0FBSyxFQUFFLE1BQU07Q0FDaEIsQ0FBQztBQU9GO0lBRUksK0JBQW9CLGNBQStCLEVBQVUsSUFBaUIsRUFBVSxjQUFpQztRQUFyRyxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBc0J6SCxhQUFRLEdBQWdDLE1BQU0sQ0FBQztRQUUvQyxjQUFTLEdBQWtDLENBQUMsRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFD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O29CQUNaLHVCQUF1QjtpQkFDMUI7YUFDSjtZQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFuVUQ7UUFEQyxLQUFLLEVBQUU7MENBQ08sSUFBSTt3REFBQztJQUdwQjtRQURDLEtBQUssRUFBRTs7Z0VBQzBDO0lBR2xEO1FBREMsS0FBSyxFQUFFOzt3REFDTTtJQUdkO1FBREMsS0FBSyxFQUFFOzsyREFDUztJQUdqQjtRQURDLEtBQUssRUFBRTs7bUVBQ2tCO0lBbEJqQixxQkFBcUI7UUFMakMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxraUhBQTJCOztTQUU5QixDQUFDO2lEQUdzQyxlQUFlLEVBQWdCLFdBQVcsRUFBMEIsaUJBQWlCO09BRmhILHFCQUFxQixDQTJVakM7SUFBRCw0QkFBQztDQUFBLEFBM1VELElBMlVDO1NBM1VZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHtEYXRlVGltZXpvbmV9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtTZWxlY3RPcHRpb25zfSBmcm9tIFwiLi4vc2VsZWN0XCI7XG5pbXBvcnQge3RpbWV6b25lSW5mb30gZnJvbSBcIi4vdGltZXpvbmUtaW5mb1wiO1xuaW1wb3J0IHt0aW1lem9uZXN9IGZyb20gXCIuL3RpbWV6b25lc1wiO1xuXG5jb25zdCB3ZWVrZGF5TmFycm93Rm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICB3ZWVrZGF5OiBcInNob3J0XCJcbn07XG5cbmNvbnN0IG1vbnRoWWVhckZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgbW9udGg6IFwibG9uZ1wiLFxuICAgIHllYXI6IFwibnVtZXJpY1wiXG59O1xuXG5jb25zdCBtb250aEZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgbW9udGg6IFwibG9uZ1wiXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRhdGV0aW1lLW92ZXJsYXlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJvdmVybGF5Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIm92ZXJsYXkuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlck92ZXJsYXkge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBwcml2YXRlIGludGw6IEludGxTZXJ2aWNlLCBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSB2YWx1ZTogRGF0ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBmb3JtYXRPcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucztcblxuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgdGltZXpvbmU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgdGltZXpvbmVEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHRpbWV6b25lczogU2VsZWN0T3B0aW9uczxTdHJpbmc+O1xuXG4gICAgZGF0ZUhlYWRlcjogc3RyaW5nO1xuXG4gICAgZGF0ZVZpZXc6IFwiZGF5c1wiIHwgXCJtb250aHNcIiB8IFwieWVhcnNcIiA9IFwiZGF5c1wiO1xuXG4gICAgZGF0ZVZpZXdzOiB7aWQ6IHN0cmluZywgbGFiZWw6IHN0cmluZ31bXSA9IFt7aWQ6IFwiZGF5c1wiLCBsYWJlbDogdGhpcy5pbnRsLm1lc3NhZ2UoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucyNEYXlcIil9LCB7aWQ6IFwibW9udGhzXCIsIGxhYmVsOiB0aGlzLmludGwubWVzc2FnZShcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zI01vbnRoXCIpfSwge2lkOiBcInllYXJzXCIsIGxhYmVsOiB0aGlzLmludGwubWVzc2FnZShcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zI1llYXJcIil9XTtcblxuICAgIHByaXZhdGUgZGF0ZVZpZXdWYWx1ZTogRGF0ZTtcblxuICAgIGRhdGVWaWV3Q2hhbmdlZCgpIHtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgZGF0ZVZpZXdNb3ZlKHN0ZXA6IG51bWJlcikge1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVWaWV3ID09IFwiZGF5c1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDTW9udGgodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKCkgKyBzdGVwKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENGdWxsWWVhcih0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSArIHN0ZXApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcInllYXJzXCIpIHtcblxuICAgICAgICAgICAgbGV0IHllYXJIdW5kcmV0ID0gTWF0aC5mbG9vcih0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAvIDEwMCkgKiAxMDA7XG4gICAgICAgICAgICBsZXQgeWVhclRlbnMgPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAtIHllYXJIdW5kcmV0O1xuXG4gICAgICAgICAgICBsZXQgeWVhclN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh5ZWFyVGVucyA+PSA4MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDgwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA2MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDYwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA0MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDQwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSAyMCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDRnVsbFllYXIoeWVhckh1bmRyZXQgKyB5ZWFyU3RhcnQgKyAoMjAgKiBzdGVwKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuICAgIH1cblxuICAgIGRhdGVWYWx1ZXM6IHtpZDogbnVtYmVyLCBsYWJlbDogc3RyaW5nIHwgbnVtYmVyLCBzdWJsYWJlbD86IHN0cmluZywgY2hlY2tlZD86IGJvb2xlYW4sIGhpZGRlbj86IGJvb2xlYW59W107XG5cbiAgICBkYXRlVmFsdWVDbGlja2VkKHZhbHVlOiBudW1iZXIpIHtcblxuICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJkYXlzXCIpIHtcbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgodmFsdWUpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0bXBEYXRlLmdldFVUQ01vbnRoKCkgIT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRGF0ZSh0bXBEYXRlLmdldFVUQ0RhdGUoKSAtIGkpO1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ01vbnRoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwieWVhcnNcIikge1xuICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih2YWx1ZSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRtcERhdGUuZ2V0VVRDTW9udGgoKSAhPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSkge1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENNb250aCh0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSwgdG1wRGF0ZS5nZXRVVENEYXRlKCkgLSBpKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgdiBvZiB0aGlzLmRhdGVWYWx1ZXMpIHtcbiAgICAgICAgICAgIHYuY2hlY2tlZCA9IHYuaWQgPT0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlID0gbmV3IERhdGUodG1wRGF0ZSk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRtcERhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVEYXRlVmFsdWVzKCkge1xuXG4gICAgICAgIHRoaXMuZGF0ZVZhbHVlcyA9IFtdO1xuXG4gICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBkID0gMTsgZCA8PSAzMzsgZCsrKSB7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENEYXRlKGQpO1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVmFsdWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGQsXG4gICAgICAgICAgICAgICAgICAgIHN1YmxhYmVsOiB0aGlzLmludGwuZGF0ZUZvcm1hdCh0bXBEYXRlLCB3ZWVrZGF5TmFycm93Rm9ybWF0KSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogKHRoaXMudmFsdWUuZ2V0VVRDRnVsbFllYXIoKSA9PSB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgJiYgdGhpcy52YWx1ZS5nZXRVVENNb250aCgpID09IHRtcERhdGUuZ2V0VVRDTW9udGgoKSAmJiB0aGlzLnZhbHVlLmdldFVUQ0RhdGUoKSA9PSBkKSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0bXBEYXRlLmdldFVUQ01vbnRoKCkgIT0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuXG4gICAgICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDE5OTksIHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpKSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgMTI7IG0rKykge1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgobSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVWYWx1ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5pbnRsLmRhdGVGb3JtYXQodG1wRGF0ZSwgbW9udGhGb3JtYXQpLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLnZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgPT0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgJiYgdGhpcy52YWx1ZS5nZXRVVENNb250aCgpID09IG1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcblxuICAgICAgICAgICAgbGV0IHllYXJIdW5kcmV0ID0gTWF0aC5mbG9vcih0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgLyAxMDApICogMTAwO1xuICAgICAgICAgICAgbGV0IHllYXJUZW5zID0gdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpIC0geWVhckh1bmRyZXQ7XG5cbiAgICAgICAgICAgIGxldCB5ZWFyU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHllYXJUZW5zID49IDgwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gODA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDYwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNjA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDQwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDIwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gMjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRnVsbFllYXIoeWVhckh1bmRyZXQgKyB5ZWFyU3RhcnQgLSAxKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAyMDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyAxKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdGhpcy52YWx1ZS5nZXRVVENGdWxsWWVhcigpID09IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlRGF0ZUhlYWRlcigpIHtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gdGhpcy5pbnRsLmRhdGVGb3JtYXQodGhpcy5kYXRlVmlld1ZhbHVlLCBtb250aFllYXJGb3JtYXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgKyBcIlwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB5ZWFySHVuZHJldCA9IE1hdGguZmxvb3IodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLyAxMDApICogMTAwO1xuICAgICAgICAgICAgbGV0IHllYXJUZW5zID0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLSB5ZWFySHVuZHJldDtcblxuICAgICAgICAgICAgbGV0IHllYXJTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAoeWVhclRlbnMgPj0gODApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA4MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA2MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNDApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA0MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gMjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSAyMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gYCR7eWVhckh1bmRyZXQgKyB5ZWFyU3RhcnR9IC0gJHt5ZWFySHVuZHJldCArIHllYXJTdGFydCArIDE5fWA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldCB0aW1lVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5mb3JtYXRPcHRpb25zLmhvdXIgfHwgISF0aGlzLmZvcm1hdE9wdGlvbnMuaG91cjEyIHx8ICEhdGhpcy5mb3JtYXRPcHRpb25zLm1pbnV0ZTtcbiAgICB9XG5cbiAgICBnZXQgdGltZUhvdXJzRm9ybWF0dGVkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFRpbWUodGhpcy52YWx1ZS5nZXRVVENIb3VycygpKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZUhvdXJzRm9ybWF0dGVkKGhvdXJzOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBoID0gcGFyc2VJbnQoaG91cnMpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUhvdXJzID0gaDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lSG91cnMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHRoaXMudGltZUhvdXJzID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0aW1lSG91cnMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUuZ2V0VVRDSG91cnMoKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZUhvdXJzKGhvdXJzOiBudW1iZXIpIHtcblxuICAgICAgICBpZiAoaG91cnMgPCAwIHx8IGhvdXJzID4gMjMpIHtcbiAgICAgICAgICAgIGhvdXJzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUuc2V0VVRDSG91cnMoaG91cnMpO1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDSG91cnMoaG91cnMpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgdGltZU1pbnV0ZXNGb3JtYXR0ZWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSh0aGlzLnZhbHVlLmdldFVUQ01pbnV0ZXMoKSk7XG4gICAgfVxuXG4gICAgc2V0IHRpbWVNaW51dGVzRm9ybWF0dGVkKG1pbnV0ZXM6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGggPSBwYXJzZUludChtaW51dGVzKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVNaW51dGVzID0gaDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTWludXRlcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgdGhpcy50aW1lTWludXRlcyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGltZU1pbnV0ZXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUuZ2V0VVRDTWludXRlcygpO1xuICAgIH1cblxuICAgIHNldCB0aW1lTWludXRlcyhtaW51dGVzOiBudW1iZXIpIHtcblxuICAgICAgICBpZiAobWludXRlcyA8IDAgfHwgbWludXRlcyA+IDU5KSB7XG4gICAgICAgICAgICBtaW51dGVzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUuc2V0VVRDTWludXRlcyhtaW51dGVzKTtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ01pbnV0ZXMobWludXRlcyk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGZvcm1hdFRpbWUodmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIwXCIgKyB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSArIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2RheUNsaWNrZWQoKSB7XG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnZhbHVlLnNldFVUQ0Z1bGxZZWFyKG5vdy5nZXRVVENGdWxsWWVhcigpLCBub3cuZ2V0VVRDTW9udGgoKSwgbm93LmdldFVUQ0RhdGUoKSk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuICAgIH1cblxuICAgIGNhbmNlbENsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIGRvbmVDbGlja2VkKCkge1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMudGltZXpvbmUgJiYgdGhpcy50aW1lem9uZSAhPT0gXCJVVENcIikge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZS5nZXRUaW1lKCkgLSAoRGF0ZVRpbWV6b25lLnRpbWV6b25lT2Zmc2V0KHRoaXMudGltZXpvbmUsIHRoaXMudmFsdWUpICogNjAgKiAxMDAwICogLTEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuZGlzbWlzcyhuZXcgRGF0ZVRpbWV6b25lKHZhbHVlLCB0aGlzLnRpbWV6b25lKSwgbnVsbCk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFRpbWV6b25lcygpIHtcbiAgICAgICAgdGhpcy50aW1lem9uZXMgPSBuZXcgU2VsZWN0T3B0aW9ucygpO1xuICAgICAgICBmb3IgKGNvbnN0IHQgb2YgdGltZXpvbmVzKHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWV6b25lcy5wdXNoT3B0aW9uKHQuaWQsIHQubGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuXG4gICAgICAgIGlmICghdGhpcy50aW1lem9uZURpc2FibGVkKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWV6b25lKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mbyA9IHRpbWV6b25lSW5mbyh0aGlzLnRpbWV6b25lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lem9uZXMgPSBuZXcgU2VsZWN0T3B0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWV6b25lcy5wdXNoT3B0aW9uKGluZm8uaWQsIGluZm8ubGFiZWwpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxvYWRUaW1lem9uZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19