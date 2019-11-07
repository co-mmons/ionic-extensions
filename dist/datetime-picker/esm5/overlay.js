import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { SelectOptions } from "@co.mmons/ionic-extensions/select";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
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
    DateTimePickerOverlay.ctorParameters = function () { return [
        { type: ModalController },
        { type: IntlService },
        { type: ChangeDetectorRef }
    ]; };
    tslib_1.__decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "value", void 0);
    tslib_1.__decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "formatOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "title", void 0);
    tslib_1.__decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "timezone", void 0);
    tslib_1.__decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "timezoneDisabled", void 0);
    DateTimePickerOverlay = tslib_1.__decorate([
        Component({
            selector: "ionx-datetime-overlay",
            template: "<ion-header>\n    <ion-toolbar>\n        <ionx-buttons slot=\"start\">\n            <ion-button (click)=\"cancelClicked()\" fill=\"clear\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ionx-buttons>\n\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" text-right>\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button fill=\"outline\" (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
            styles: [":host{display:-webkit-box;display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:-webkit-box;display:flex;padding:4px;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow:none;padding:0;margin:0;-webkit-box-flex:1;flex:1;display:-webkit-box;display:flex;--width:100%;--padding-start:2px;--padding-end:2px;--padding-top:2px;--padding-bottom:2px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start:16px;--padding-end:16px;--padding-top:0px;--padding-bottom:0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end:8px;--padding-start:0px;text-align:center}:host ion-footer ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width:1px}"]
        })
    ], DateTimePickerOverlay);
    return DateTimePickerOverlay;
}());
export { DateTimePickerOverlay };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2RhdGV0aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbIm92ZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxJQUFNLG1CQUFtQixHQUErQjtJQUNwRCxPQUFPLEVBQUUsT0FBTztDQUNuQixDQUFDO0FBRUYsSUFBTSxlQUFlLEdBQStCO0lBQ2hELEtBQUssRUFBRSxNQUFNO0lBQ2IsSUFBSSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUErQjtJQUM1QyxLQUFLLEVBQUUsTUFBTTtDQUNoQixDQUFDO0FBT0Y7SUFFSSwrQkFBb0IsY0FBK0IsRUFBVSxJQUFpQixFQUFVLGNBQWlDO1FBQXJHLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQWE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFzQnpILGFBQVEsR0FBZ0MsTUFBTSxDQUFDO1FBRS9DLGNBQVMsR0FBa0MsQ0FBQyxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLEVB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QUU7b0JBQ1osdUJBQXVCO2lCQUMxQjthQUNKO1lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQzs7Z0JBdlVtQyxlQUFlO2dCQUFnQixXQUFXO2dCQUEwQixpQkFBaUI7O0lBSXpIO1FBREMsS0FBSyxFQUFFO3dEQUNZO0lBR3BCO1FBREMsS0FBSyxFQUFFO2dFQUMwQztJQUdsRDtRQURDLEtBQUssRUFBRTt3REFDTTtJQUdkO1FBREMsS0FBSyxFQUFFOzJEQUNTO0lBR2pCO1FBREMsS0FBSyxFQUFFO21FQUNrQjtJQWxCakIscUJBQXFCO1FBTGpDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsNmxIQUEyQjs7U0FFOUIsQ0FBQztPQUNXLHFCQUFxQixDQTJVakM7SUFBRCw0QkFBQztDQUFBLEFBM1VELElBMlVDO1NBM1VZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHtTZWxlY3RPcHRpb25zfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc2VsZWN0XCI7XG5pbXBvcnQge0RhdGVUaW1lem9uZX0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3RpbWV6b25lSW5mb30gZnJvbSBcIi4vdGltZXpvbmUtaW5mb1wiO1xuaW1wb3J0IHt0aW1lem9uZXN9IGZyb20gXCIuL3RpbWV6b25lc1wiO1xuXG5jb25zdCB3ZWVrZGF5TmFycm93Rm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICB3ZWVrZGF5OiBcInNob3J0XCJcbn07XG5cbmNvbnN0IG1vbnRoWWVhckZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgbW9udGg6IFwibG9uZ1wiLFxuICAgIHllYXI6IFwibnVtZXJpY1wiXG59O1xuXG5jb25zdCBtb250aEZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgbW9udGg6IFwibG9uZ1wiXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRhdGV0aW1lLW92ZXJsYXlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJvdmVybGF5Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIm92ZXJsYXkuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlck92ZXJsYXkge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBwcml2YXRlIGludGw6IEludGxTZXJ2aWNlLCBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSB2YWx1ZTogRGF0ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBmb3JtYXRPcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucztcblxuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgdGltZXpvbmU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgdGltZXpvbmVEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHRpbWV6b25lczogU2VsZWN0T3B0aW9uczxTdHJpbmc+O1xuXG4gICAgZGF0ZUhlYWRlcjogc3RyaW5nO1xuXG4gICAgZGF0ZVZpZXc6IFwiZGF5c1wiIHwgXCJtb250aHNcIiB8IFwieWVhcnNcIiA9IFwiZGF5c1wiO1xuXG4gICAgZGF0ZVZpZXdzOiB7aWQ6IHN0cmluZywgbGFiZWw6IHN0cmluZ31bXSA9IFt7aWQ6IFwiZGF5c1wiLCBsYWJlbDogdGhpcy5pbnRsLm1lc3NhZ2UoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucyNEYXlcIil9LCB7aWQ6IFwibW9udGhzXCIsIGxhYmVsOiB0aGlzLmludGwubWVzc2FnZShcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zI01vbnRoXCIpfSwge2lkOiBcInllYXJzXCIsIGxhYmVsOiB0aGlzLmludGwubWVzc2FnZShcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zI1llYXJcIil9XTtcblxuICAgIHByaXZhdGUgZGF0ZVZpZXdWYWx1ZTogRGF0ZTtcblxuICAgIGRhdGVWaWV3Q2hhbmdlZCgpIHtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgZGF0ZVZpZXdNb3ZlKHN0ZXA6IG51bWJlcikge1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVWaWV3ID09IFwiZGF5c1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDTW9udGgodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKCkgKyBzdGVwKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENGdWxsWWVhcih0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSArIHN0ZXApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcInllYXJzXCIpIHtcblxuICAgICAgICAgICAgbGV0IHllYXJIdW5kcmV0ID0gTWF0aC5mbG9vcih0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAvIDEwMCkgKiAxMDA7XG4gICAgICAgICAgICBsZXQgeWVhclRlbnMgPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAtIHllYXJIdW5kcmV0O1xuXG4gICAgICAgICAgICBsZXQgeWVhclN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh5ZWFyVGVucyA+PSA4MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDgwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA2MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDYwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA0MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDQwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSAyMCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDRnVsbFllYXIoeWVhckh1bmRyZXQgKyB5ZWFyU3RhcnQgKyAoMjAgKiBzdGVwKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuICAgIH1cblxuICAgIGRhdGVWYWx1ZXM6IHtpZDogbnVtYmVyLCBsYWJlbDogc3RyaW5nIHwgbnVtYmVyLCBzdWJsYWJlbD86IHN0cmluZywgY2hlY2tlZD86IGJvb2xlYW4sIGhpZGRlbj86IGJvb2xlYW59W107XG5cbiAgICBkYXRlVmFsdWVDbGlja2VkKHZhbHVlOiBudW1iZXIpIHtcblxuICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJkYXlzXCIpIHtcbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgodmFsdWUpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0bXBEYXRlLmdldFVUQ01vbnRoKCkgIT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRGF0ZSh0bXBEYXRlLmdldFVUQ0RhdGUoKSAtIGkpO1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ01vbnRoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwieWVhcnNcIikge1xuICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih2YWx1ZSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRtcERhdGUuZ2V0VVRDTW9udGgoKSAhPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSkge1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENNb250aCh0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSwgdG1wRGF0ZS5nZXRVVENEYXRlKCkgLSBpKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgdiBvZiB0aGlzLmRhdGVWYWx1ZXMpIHtcbiAgICAgICAgICAgIHYuY2hlY2tlZCA9IHYuaWQgPT0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlID0gbmV3IERhdGUodG1wRGF0ZSk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRtcERhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVEYXRlVmFsdWVzKCkge1xuXG4gICAgICAgIHRoaXMuZGF0ZVZhbHVlcyA9IFtdO1xuXG4gICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBkID0gMTsgZCA8PSAzMzsgZCsrKSB7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENEYXRlKGQpO1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVmFsdWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGQsXG4gICAgICAgICAgICAgICAgICAgIHN1YmxhYmVsOiB0aGlzLmludGwuZGF0ZUZvcm1hdCh0bXBEYXRlLCB3ZWVrZGF5TmFycm93Rm9ybWF0KSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogKHRoaXMudmFsdWUuZ2V0VVRDRnVsbFllYXIoKSA9PSB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgJiYgdGhpcy52YWx1ZS5nZXRVVENNb250aCgpID09IHRtcERhdGUuZ2V0VVRDTW9udGgoKSAmJiB0aGlzLnZhbHVlLmdldFVUQ0RhdGUoKSA9PSBkKSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0bXBEYXRlLmdldFVUQ01vbnRoKCkgIT0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuXG4gICAgICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDE5OTksIHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpKSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgMTI7IG0rKykge1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgobSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVWYWx1ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5pbnRsLmRhdGVGb3JtYXQodG1wRGF0ZSwgbW9udGhGb3JtYXQpLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLnZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgPT0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgJiYgdGhpcy52YWx1ZS5nZXRVVENNb250aCgpID09IG1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcblxuICAgICAgICAgICAgbGV0IHllYXJIdW5kcmV0ID0gTWF0aC5mbG9vcih0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgLyAxMDApICogMTAwO1xuICAgICAgICAgICAgbGV0IHllYXJUZW5zID0gdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpIC0geWVhckh1bmRyZXQ7XG5cbiAgICAgICAgICAgIGxldCB5ZWFyU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHllYXJUZW5zID49IDgwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gODA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDYwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNjA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDQwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDIwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gMjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRnVsbFllYXIoeWVhckh1bmRyZXQgKyB5ZWFyU3RhcnQgLSAxKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAyMDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyAxKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdGhpcy52YWx1ZS5nZXRVVENGdWxsWWVhcigpID09IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlRGF0ZUhlYWRlcigpIHtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gdGhpcy5pbnRsLmRhdGVGb3JtYXQodGhpcy5kYXRlVmlld1ZhbHVlLCBtb250aFllYXJGb3JtYXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgKyBcIlwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB5ZWFySHVuZHJldCA9IE1hdGguZmxvb3IodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLyAxMDApICogMTAwO1xuICAgICAgICAgICAgbGV0IHllYXJUZW5zID0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLSB5ZWFySHVuZHJldDtcblxuICAgICAgICAgICAgbGV0IHllYXJTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAoeWVhclRlbnMgPj0gODApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA4MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA2MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNDApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA0MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gMjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSAyMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gYCR7eWVhckh1bmRyZXQgKyB5ZWFyU3RhcnR9IC0gJHt5ZWFySHVuZHJldCArIHllYXJTdGFydCArIDE5fWA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldCB0aW1lVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5mb3JtYXRPcHRpb25zLmhvdXIgfHwgISF0aGlzLmZvcm1hdE9wdGlvbnMuaG91cjEyIHx8ICEhdGhpcy5mb3JtYXRPcHRpb25zLm1pbnV0ZTtcbiAgICB9XG5cbiAgICBnZXQgdGltZUhvdXJzRm9ybWF0dGVkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFRpbWUodGhpcy52YWx1ZS5nZXRVVENIb3VycygpKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZUhvdXJzRm9ybWF0dGVkKGhvdXJzOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBoID0gcGFyc2VJbnQoaG91cnMpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUhvdXJzID0gaDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lSG91cnMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHRoaXMudGltZUhvdXJzID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0aW1lSG91cnMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUuZ2V0VVRDSG91cnMoKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZUhvdXJzKGhvdXJzOiBudW1iZXIpIHtcblxuICAgICAgICBpZiAoaG91cnMgPCAwIHx8IGhvdXJzID4gMjMpIHtcbiAgICAgICAgICAgIGhvdXJzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUuc2V0VVRDSG91cnMoaG91cnMpO1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDSG91cnMoaG91cnMpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgdGltZU1pbnV0ZXNGb3JtYXR0ZWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSh0aGlzLnZhbHVlLmdldFVUQ01pbnV0ZXMoKSk7XG4gICAgfVxuXG4gICAgc2V0IHRpbWVNaW51dGVzRm9ybWF0dGVkKG1pbnV0ZXM6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGggPSBwYXJzZUludChtaW51dGVzKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVNaW51dGVzID0gaDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTWludXRlcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgdGhpcy50aW1lTWludXRlcyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGltZU1pbnV0ZXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUuZ2V0VVRDTWludXRlcygpO1xuICAgIH1cblxuICAgIHNldCB0aW1lTWludXRlcyhtaW51dGVzOiBudW1iZXIpIHtcblxuICAgICAgICBpZiAobWludXRlcyA8IDAgfHwgbWludXRlcyA+IDU5KSB7XG4gICAgICAgICAgICBtaW51dGVzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUuc2V0VVRDTWludXRlcyhtaW51dGVzKTtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ01pbnV0ZXMobWludXRlcyk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGZvcm1hdFRpbWUodmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIwXCIgKyB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSArIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2RheUNsaWNrZWQoKSB7XG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnZhbHVlLnNldFVUQ0Z1bGxZZWFyKG5vdy5nZXRVVENGdWxsWWVhcigpLCBub3cuZ2V0VVRDTW9udGgoKSwgbm93LmdldFVUQ0RhdGUoKSk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuICAgIH1cblxuICAgIGNhbmNlbENsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIGRvbmVDbGlja2VkKCkge1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMudGltZXpvbmUgJiYgdGhpcy50aW1lem9uZSAhPT0gXCJVVENcIikge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZS5nZXRUaW1lKCkgLSAoRGF0ZVRpbWV6b25lLnRpbWV6b25lT2Zmc2V0KHRoaXMudGltZXpvbmUsIHRoaXMudmFsdWUpICogNjAgKiAxMDAwICogLTEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuZGlzbWlzcyhuZXcgRGF0ZVRpbWV6b25lKHZhbHVlLCB0aGlzLnRpbWV6b25lKSwgbnVsbCk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFRpbWV6b25lcygpIHtcbiAgICAgICAgdGhpcy50aW1lem9uZXMgPSBuZXcgU2VsZWN0T3B0aW9ucygpO1xuICAgICAgICBmb3IgKGNvbnN0IHQgb2YgdGltZXpvbmVzKHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWV6b25lcy5wdXNoT3B0aW9uKHQuaWQsIHQubGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuXG4gICAgICAgIGlmICghdGhpcy50aW1lem9uZURpc2FibGVkKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWV6b25lKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mbyA9IHRpbWV6b25lSW5mbyh0aGlzLnRpbWV6b25lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lem9uZXMgPSBuZXcgU2VsZWN0T3B0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWV6b25lcy5wdXNoT3B0aW9uKGluZm8uaWQsIGluZm8ubGFiZWwpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxvYWRUaW1lem9uZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19