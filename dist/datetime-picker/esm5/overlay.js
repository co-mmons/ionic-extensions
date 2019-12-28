import { __awaiter, __decorate, __generator, __values } from "tslib";
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
        this.dateViews = [{ id: "days", label: this.intl.message("@co.mmons/ionic-extensions/datetime#Day") }, { id: "months", label: this.intl.message("@co.mmons/ionic-extensions/datetime#Month") }, { id: "years", label: this.intl.message("@co.mmons/ionic-extensions/datetime#Year") }];
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
            for (var _b = __values(this.dateValues), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, t;
            var e_2, _c;
            return __generator(this, function (_d) {
                this.timezones = new SelectOptions();
                try {
                    for (_a = __values(timezones(this.value)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        t = _b.value;
                        this.timezones.pushOption(t.id, t.label);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
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
    __decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "value", void 0);
    __decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "formatOptions", void 0);
    __decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "title", void 0);
    __decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "timezone", void 0);
    __decorate([
        Input()
    ], DateTimePickerOverlay.prototype, "timezoneDisabled", void 0);
    DateTimePickerOverlay = __decorate([
        Component({
            selector: "ionx-datetime-overlay",
            template: "<ion-header>\n    <ion-toolbar>\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); cancelClicked()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" text-right>\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button fill=\"outline\" (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions/datetime#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions/datetime#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions/datetime#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
            styles: [":host{display:-webkit-box;display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:-webkit-box;display:flex;padding:4px;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow:none;padding:0;margin:0;-webkit-box-flex:1;flex:1;display:-webkit-box;display:flex;--width:100%;--padding-start:2px;--padding-end:2px;--padding-top:2px;--padding-bottom:2px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start:16px;--padding-end:16px;--padding-top:0px;--padding-bottom:0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end:8px;--padding-start:0px;text-align:center}:host ion-footer ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width:1px}"]
        })
    ], DateTimePickerOverlay);
    return DateTimePickerOverlay;
}());
export { DateTimePickerOverlay };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2RhdGV0aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbIm92ZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxJQUFNLG1CQUFtQixHQUErQjtJQUNwRCxPQUFPLEVBQUUsT0FBTztDQUNuQixDQUFDO0FBRUYsSUFBTSxlQUFlLEdBQStCO0lBQ2hELEtBQUssRUFBRSxNQUFNO0lBQ2IsSUFBSSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUErQjtJQUM1QyxLQUFLLEVBQUUsTUFBTTtDQUNoQixDQUFDO0FBT0Y7SUFFSSwrQkFBb0IsY0FBK0IsRUFBVSxJQUFpQixFQUFVLGNBQWlDO1FBQXJHLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQWE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFzQnpILGFBQVEsR0FBZ0MsTUFBTSxDQUFDO1FBRS9DLGNBQVMsR0FBa0MsQ0FBQyxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHlDQUF5QyxDQUFDLEVB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RTtvQkFDWix1QkFBdUI7aUJBQzFCO2FBQ0o7WUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDOztnQkF2VW1DLGVBQWU7Z0JBQWdCLFdBQVc7Z0JBQTBCLGlCQUFpQjs7SUFJekg7UUFEQyxLQUFLLEVBQUU7d0RBQ1k7SUFHcEI7UUFEQyxLQUFLLEVBQUU7Z0VBQzBDO0lBR2xEO1FBREMsS0FBSyxFQUFFO3dEQUNNO0lBR2Q7UUFEQyxLQUFLLEVBQUU7MkRBQ1M7SUFHakI7UUFEQyxLQUFLLEVBQUU7bUVBQ2tCO0lBbEJqQixxQkFBcUI7UUFMakMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyx3cEhBQTJCOztTQUU5QixDQUFDO09BQ1cscUJBQXFCLENBMlVqQztJQUFELDRCQUFDO0NBQUEsQUEzVUQsSUEyVUM7U0EzVVkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge1NlbGVjdE9wdGlvbnN9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9zZWxlY3RcIjtcbmltcG9ydCB7RGF0ZVRpbWV6b25lfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7dGltZXpvbmVJbmZvfSBmcm9tIFwiLi90aW1lem9uZS1pbmZvXCI7XG5pbXBvcnQge3RpbWV6b25lc30gZnJvbSBcIi4vdGltZXpvbmVzXCI7XG5cbmNvbnN0IHdlZWtkYXlOYXJyb3dGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgIHdlZWtkYXk6IFwic2hvcnRcIlxufTtcblxuY29uc3QgbW9udGhZZWFyRm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICBtb250aDogXCJsb25nXCIsXG4gICAgeWVhcjogXCJudW1lcmljXCJcbn07XG5cbmNvbnN0IG1vbnRoRm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICBtb250aDogXCJsb25nXCJcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZGF0ZXRpbWUtb3ZlcmxheVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIm92ZXJsYXkuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wib3ZlcmxheS5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyT3ZlcmxheSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsIHByaXZhdGUgaW50bDogSW50bFNlcnZpY2UsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIHZhbHVlOiBEYXRlO1xuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGZvcm1hdE9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zO1xuXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICB0aW1lem9uZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICB0aW1lem9uZURpc2FibGVkOiBib29sZWFuO1xuXG4gICAgdGltZXpvbmVzOiBTZWxlY3RPcHRpb25zPFN0cmluZz47XG5cbiAgICBkYXRlSGVhZGVyOiBzdHJpbmc7XG5cbiAgICBkYXRlVmlldzogXCJkYXlzXCIgfCBcIm1vbnRoc1wiIHwgXCJ5ZWFyc1wiID0gXCJkYXlzXCI7XG5cbiAgICBkYXRlVmlld3M6IHtpZDogc3RyaW5nLCBsYWJlbDogc3RyaW5nfVtdID0gW3tpZDogXCJkYXlzXCIsIGxhYmVsOiB0aGlzLmludGwubWVzc2FnZShcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2RhdGV0aW1lI0RheVwiKX0sIHtpZDogXCJtb250aHNcIiwgbGFiZWw6IHRoaXMuaW50bC5tZXNzYWdlKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGF0ZXRpbWUjTW9udGhcIil9LCB7aWQ6IFwieWVhcnNcIiwgbGFiZWw6IHRoaXMuaW50bC5tZXNzYWdlKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGF0ZXRpbWUjWWVhclwiKX1dO1xuXG4gICAgcHJpdmF0ZSBkYXRlVmlld1ZhbHVlOiBEYXRlO1xuXG4gICAgZGF0ZVZpZXdDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUgPSBuZXcgRGF0ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBkYXRlVmlld01vdmUoc3RlcDogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJkYXlzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENNb250aCh0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSArIHN0ZXApO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ0Z1bGxZZWFyKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpICsgc3RlcCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwieWVhcnNcIikge1xuXG4gICAgICAgICAgICBsZXQgeWVhckh1bmRyZXQgPSBNYXRoLmZsb29yKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpIC8gMTAwKSAqIDEwMDtcbiAgICAgICAgICAgIGxldCB5ZWFyVGVucyA9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpIC0geWVhckh1bmRyZXQ7XG5cbiAgICAgICAgICAgIGxldCB5ZWFyU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHllYXJUZW5zID49IDgwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gODA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDYwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNjA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDQwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDIwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gMjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENGdWxsWWVhcih5ZWFySHVuZHJldCArIHllYXJTdGFydCArICgyMCAqIHN0ZXApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgZGF0ZVZhbHVlczoge2lkOiBudW1iZXIsIGxhYmVsOiBzdHJpbmcgfCBudW1iZXIsIHN1YmxhYmVsPzogc3RyaW5nLCBjaGVja2VkPzogYm9vbGVhbiwgaGlkZGVuPzogYm9vbGVhbn1bXTtcblxuICAgIGRhdGVWYWx1ZUNsaWNrZWQodmFsdWU6IG51bWJlcikge1xuXG4gICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENEYXRlKHZhbHVlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENNb250aCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRtcERhdGUuZ2V0VVRDTW9udGgoKSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENEYXRlKHRtcERhdGUuZ2V0VVRDRGF0ZSgpIC0gaSk7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG4gICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0Z1bGxZZWFyKHZhbHVlKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodG1wRGF0ZS5nZXRVVENNb250aCgpICE9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ01vbnRoKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpLCB0bXBEYXRlLmdldFVUQ0RhdGUoKSAtIGkpO1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0Z1bGxZZWFyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB2IG9mIHRoaXMuZGF0ZVZhbHVlcykge1xuICAgICAgICAgICAgdi5jaGVja2VkID0gdi5pZCA9PSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXcgRGF0ZSh0bXBEYXRlKTtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodG1wRGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZURhdGVWYWx1ZXMoKSB7XG5cbiAgICAgICAgdGhpcy5kYXRlVmFsdWVzID0gW107XG5cbiAgICAgICAgbGV0IHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVWaWV3ID09IFwiZGF5c1wiKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IDMzOyBkKyspIHtcbiAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0RhdGUoZCk7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVWYWx1ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZCxcbiAgICAgICAgICAgICAgICAgICAgc3VibGFiZWw6IHRoaXMuaW50bC5kYXRlRm9ybWF0KHRtcERhdGUsIHdlZWtkYXlOYXJyb3dGb3JtYXQpLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiAodGhpcy52YWx1ZS5nZXRVVENGdWxsWWVhcigpID09IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSAmJiB0aGlzLnZhbHVlLmdldFVUQ01vbnRoKCkgPT0gdG1wRGF0ZS5nZXRVVENNb250aCgpICYmIHRoaXMudmFsdWUuZ2V0VVRDRGF0ZSgpID09IGQpLFxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRtcERhdGUuZ2V0VVRDTW9udGgoKSAhPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcIm1vbnRoc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoMTk5OSwgdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKCkpKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCAxMjsgbSsrKSB7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENNb250aChtKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG0sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLmludGwuZGF0ZUZvcm1hdCh0bXBEYXRlLCBtb250aEZvcm1hdCksXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRoaXMudmFsdWUuZ2V0VVRDRnVsbFllYXIoKSA9PSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAmJiB0aGlzLnZhbHVlLmdldFVUQ01vbnRoKCkgPT0gbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcInllYXJzXCIpIHtcblxuICAgICAgICAgICAgbGV0IHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuXG4gICAgICAgICAgICBsZXQgeWVhckh1bmRyZXQgPSBNYXRoLmZsb29yKHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSAvIDEwMCkgKiAxMDA7XG4gICAgICAgICAgICBsZXQgeWVhclRlbnMgPSB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgLSB5ZWFySHVuZHJldDtcblxuICAgICAgICAgICAgbGV0IHllYXJTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAoeWVhclRlbnMgPj0gODApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA4MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA2MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNDApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA0MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gMjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSAyMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFySHVuZHJldCArIHllYXJTdGFydCAtIDEpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDIwOyB5KyspIHtcbiAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0Z1bGxZZWFyKHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSArIDEpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVmFsdWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLnZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgPT0gdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVEYXRlSGVhZGVyKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVWaWV3ID09IFwiZGF5c1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVIZWFkZXIgPSB0aGlzLmludGwuZGF0ZUZvcm1hdCh0aGlzLmRhdGVWaWV3VmFsdWUsIG1vbnRoWWVhckZvcm1hdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVIZWFkZXIgPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSArIFwiXCI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcInllYXJzXCIpIHtcblxuICAgICAgICAgICAgbGV0IHllYXJIdW5kcmV0ID0gTWF0aC5mbG9vcih0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAvIDEwMCkgKiAxMDA7XG4gICAgICAgICAgICBsZXQgeWVhclRlbnMgPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAtIHllYXJIdW5kcmV0O1xuXG4gICAgICAgICAgICBsZXQgeWVhclN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh5ZWFyVGVucyA+PSA4MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDgwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA2MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDYwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA0MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDQwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSAyMCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRhdGVIZWFkZXIgPSBgJHt5ZWFySHVuZHJldCArIHllYXJTdGFydH0gLSAke3llYXJIdW5kcmV0ICsgeWVhclN0YXJ0ICsgMTl9YDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0IHRpbWVWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmZvcm1hdE9wdGlvbnMuaG91ciB8fCAhIXRoaXMuZm9ybWF0T3B0aW9ucy5ob3VyMTIgfHwgISF0aGlzLmZvcm1hdE9wdGlvbnMubWludXRlO1xuICAgIH1cblxuICAgIGdldCB0aW1lSG91cnNGb3JtYXR0ZWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSh0aGlzLnZhbHVlLmdldFVUQ0hvdXJzKCkpO1xuICAgIH1cblxuICAgIHNldCB0aW1lSG91cnNGb3JtYXR0ZWQoaG91cnM6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGggPSBwYXJzZUludChob3Vycyk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lSG91cnMgPSBoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVIb3VycyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgdGhpcy50aW1lSG91cnMgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVIb3VycygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5nZXRVVENIb3VycygpO1xuICAgIH1cblxuICAgIHNldCB0aW1lSG91cnMoaG91cnM6IG51bWJlcikge1xuXG4gICAgICAgIGlmIChob3VycyA8IDAgfHwgaG91cnMgPiAyMykge1xuICAgICAgICAgICAgaG91cnMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRVVENIb3Vycyhob3Vycyk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENIb3Vycyhob3Vycyk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGdldCB0aW1lTWludXRlc0Zvcm1hdHRlZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaW1lKHRoaXMudmFsdWUuZ2V0VVRDTWludXRlcygpKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZU1pbnV0ZXNGb3JtYXR0ZWQobWludXRlczogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgaCA9IHBhcnNlSW50KG1pbnV0ZXMpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZU1pbnV0ZXMgPSBoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVNaW51dGVzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICB0aGlzLnRpbWVNaW51dGVzID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0aW1lTWludXRlcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5nZXRVVENNaW51dGVzKCk7XG4gICAgfVxuXG4gICAgc2V0IHRpbWVNaW51dGVzKG1pbnV0ZXM6IG51bWJlcikge1xuXG4gICAgICAgIGlmIChtaW51dGVzIDwgMCB8fCBtaW51dGVzID4gNTkpIHtcbiAgICAgICAgICAgIG1pbnV0ZXMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRVVENNaW51dGVzKG1pbnV0ZXMpO1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDTWludXRlcyhtaW51dGVzKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZm9ybWF0VGltZSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHZhbHVlIDwgMTApIHtcbiAgICAgICAgICAgIHJldHVybiBcIjBcIiArIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICsgXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZGF5Q2xpY2tlZCgpIHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMudmFsdWUuc2V0VVRDRnVsbFllYXIobm93LmdldFVUQ0Z1bGxZZWFyKCksIG5vdy5nZXRVVENNb250aCgpLCBub3cuZ2V0VVRDRGF0ZSgpKTtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgY2FuY2VsQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy52aWV3Q29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgfVxuXG4gICAgZG9uZUNsaWNrZWQoKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy50aW1lem9uZSAmJiB0aGlzLnRpbWV6b25lICE9PSBcIlVUQ1wiKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlLmdldFRpbWUoKSAtIChEYXRlVGltZXpvbmUudGltZXpvbmVPZmZzZXQodGhpcy50aW1lem9uZSwgdGhpcy52YWx1ZSkgKiA2MCAqIDEwMDAgKiAtMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3Q29udHJvbGxlci5kaXNtaXNzKG5ldyBEYXRlVGltZXpvbmUodmFsdWUsIHRoaXMudGltZXpvbmUpLCBudWxsKTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2FkVGltZXpvbmVzKCkge1xuICAgICAgICB0aGlzLnRpbWV6b25lcyA9IG5ldyBTZWxlY3RPcHRpb25zKCk7XG4gICAgICAgIGZvciAoY29uc3QgdCBvZiB0aW1lem9uZXModGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXpvbmVzLnB1c2hPcHRpb24odC5pZCwgdC5sYWJlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnRpbWV6b25lRGlzYWJsZWQpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXpvbmUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmZvID0gdGltZXpvbmVJbmZvKHRoaXMudGltZXpvbmUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWV6b25lcyA9IG5ldyBTZWxlY3RPcHRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXpvbmVzLnB1c2hPcHRpb24oaW5mby5pZCwgaW5mby5sYWJlbCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubG9hZFRpbWV6b25lcygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=