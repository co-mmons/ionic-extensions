import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
import { SelectOptions } from "@co.mmons/ionic-extensions/select";
import { timezoneInfo } from "./timezone-info";
const weekdayNarrowFormat = {
    weekday: "short"
};
const monthYearFormat = {
    month: "long",
    year: "numeric"
};
const monthFormat = {
    month: "long"
};
let DateTimePickerOverlay = class DateTimePickerOverlay {
    constructor(viewController, intl, changeDetector) {
        this.viewController = viewController;
        this.intl = intl;
        this.changeDetector = changeDetector;
        this.dateView = "days";
        this.dateViews = [{ id: "days", label: this.intl.message("@co.mmons/ionic-extensions#Day") }, { id: "months", label: this.intl.message("@co.mmons/ionic-extensions#Month") }, { id: "years", label: this.intl.message("@co.mmons/ionic-extensions#Year") }];
    }
    dateViewChanged() {
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    }
    dateViewMove(step) {
        if (this.dateView == "days") {
            this.dateViewValue.setUTCMonth(this.dateViewValue.getUTCMonth() + step);
        }
        else if (this.dateView == "months") {
            this.dateViewValue.setUTCFullYear(this.dateViewValue.getUTCFullYear() + step);
        }
        else if (this.dateView == "years") {
            let yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
            let yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
            let yearStart = 0;
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
    }
    dateValueClicked(value) {
        let tmpDate = new Date(this.dateViewValue);
        if (this.dateView == "days") {
            tmpDate.setUTCDate(value);
        }
        else if (this.dateView == "months") {
            tmpDate.setUTCMonth(value);
            for (let i = 1; i < 5; i++) {
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
            for (let i = 1; i < 5; i++) {
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
        for (let v of this.dateValues) {
            v.checked = v.id == value;
        }
        this.value = new Date(tmpDate);
        this.dateViewValue = new Date(tmpDate);
    }
    generateDateValues() {
        this.dateValues = [];
        let tmpDate = new Date(this.dateViewValue);
        if (this.dateView == "days") {
            for (let d = 1; d <= 33; d++) {
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
            let tmpDate = new Date(Date.UTC(1999, this.dateViewValue.getUTCMonth()));
            for (let m = 0; m < 12; m++) {
                tmpDate.setUTCMonth(m);
                this.dateValues.push({
                    id: m,
                    label: this.intl.dateFormat(tmpDate, monthFormat),
                    checked: this.value.getUTCFullYear() == this.dateViewValue.getUTCFullYear() && this.value.getUTCMonth() == m
                });
            }
        }
        else if (this.dateView == "years") {
            let tmpDate = new Date(this.dateViewValue);
            let yearHundret = Math.floor(tmpDate.getUTCFullYear() / 100) * 100;
            let yearTens = tmpDate.getUTCFullYear() - yearHundret;
            let yearStart = 0;
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
            tmpDate.setUTCFullYear(yearHundret + yearStart - 1);
            for (let y = 0; y < 20; y++) {
                tmpDate.setUTCFullYear(tmpDate.getUTCFullYear() + 1);
                this.dateValues.push({
                    id: tmpDate.getUTCFullYear(),
                    label: tmpDate.getUTCFullYear(),
                    checked: this.value.getUTCFullYear() == tmpDate.getUTCFullYear()
                });
            }
        }
    }
    generateDateHeader() {
        if (this.dateView == "days") {
            this.dateHeader = this.intl.dateFormat(this.dateViewValue, monthYearFormat);
        }
        else if (this.dateView == "months") {
            this.dateHeader = this.dateViewValue.getUTCFullYear() + "";
        }
        else if (this.dateView == "years") {
            let yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
            let yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
            let yearStart = 0;
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
            this.dateHeader = `${yearHundret + yearStart} - ${yearHundret + yearStart + 19}`;
        }
    }
    get timeVisible() {
        return !!this.formatOptions.hour || !!this.formatOptions.hour12 || !!this.formatOptions.minute;
    }
    get timeHoursFormatted() {
        return this.formatTime(this.value.getUTCHours());
    }
    set timeHoursFormatted(hours) {
        try {
            let h = parseInt(hours);
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
    }
    get timeHours() {
        return this.value.getUTCHours();
    }
    set timeHours(hours) {
        if (hours < 0 || hours > 23) {
            hours = 0;
        }
        this.value.setUTCHours(hours);
        this.dateViewValue.setUTCHours(hours);
        this.changeDetector.detectChanges();
    }
    get timeMinutesFormatted() {
        return this.formatTime(this.value.getUTCMinutes());
    }
    set timeMinutesFormatted(minutes) {
        try {
            let h = parseInt(minutes);
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
    }
    get timeMinutes() {
        return this.value.getUTCMinutes();
    }
    set timeMinutes(minutes) {
        if (minutes < 0 || minutes > 59) {
            minutes = 0;
        }
        this.value.setUTCMinutes(minutes);
        this.dateViewValue.setUTCMinutes(minutes);
        this.changeDetector.detectChanges();
    }
    formatTime(value) {
        if (value < 10) {
            return "0" + value;
        }
        else {
            return value + "";
        }
    }
    todayClicked() {
        let now = new Date();
        this.value.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    }
    cancelClicked() {
        this.viewController.dismiss();
    }
    doneClicked() {
        let value = this.value;
        if (this.timezone && this.timezone !== "UTC") {
            value = new Date(value.getTime() - (DateTimezone.timezoneOffset(this.timezone, this.value) * 60 * 1000 * -1));
        }
        this.viewController.dismiss(new DateTimezone(value, this.timezone), null);
    }
    loadTimezones() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const timezones = yield import("./timezones");
            this.timezones = new SelectOptions();
            for (const t of timezones.timezones(this.value)) {
                this.timezones.pushOption(t.id, t.label);
            }
        });
    }
    ngOnInit() {
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
        if (!this.timezoneDisabled) {
            if (this.timezone) {
                try {
                    const info = timezoneInfo(this.timezone);
                    this.timezones = new SelectOptions();
                    this.timezones.pushOption(info.id, info.label);
                }
                catch (error) {
                    // console.warn(error);
                }
            }
            this.loadTimezones();
        }
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
        template: "<ion-header>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-button (click)=\"cancelClicked()\" fill=\"clear\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ion-buttons>\n\n        <ion-title>{{title}}</ion-title>\n\n        <ion-buttons slot=\"end\">\n            <ion-button (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" text-right>\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button fill=\"outline\" (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: [":host{display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:flex;padding:4px;align-items:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow:none;padding:0;margin:0;flex:1;display:flex;--width:100%;--padding-start:2px;--padding-end:2px;--padding-top:2px;--padding-bottom:2px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start:16px;--padding-end:16px;--padding-top:0px;--padding-bottom:0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end:8px;--padding-start:0px;text-align:center}:host ion-footer ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width:1px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController, IntlService, ChangeDetectorRef])
], DateTimePickerOverlay);
export { DateTimePickerOverlay };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2RhdGV0aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbIm92ZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsTUFBTSxtQkFBbUIsR0FBK0I7SUFDcEQsT0FBTyxFQUFFLE9BQU87Q0FDbkIsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUErQjtJQUNoRCxLQUFLLEVBQUUsTUFBTTtJQUNiLElBQUksRUFBRSxTQUFTO0NBQ2xCLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBK0I7SUFDNUMsS0FBSyxFQUFFLE1BQU07Q0FDaEIsQ0FBQztBQU9GLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBRTlCLFlBQW9CLGNBQStCLEVBQVUsSUFBaUIsRUFBVSxjQUFpQztRQUFyRyxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBc0J6SCxhQUFRLEdBQWdDLE1BQU0sQ0FBQztRQUUvQyxjQUFTLEdBQWtDLENBQUMsRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFDLEVBQUUsRUFB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b0RBQUM7QUFHcEI7SUFEQyxLQUFLLEVBQUU7OzREQUMwQztBQUdsRDtJQURDLEtBQUssRUFBRTs7b0RBQ007QUFHZDtJQURDLEtBQUssRUFBRTs7dURBQ1M7QUFHakI7SUFEQyxLQUFLLEVBQUU7OytEQUNrQjtBQWxCakIscUJBQXFCO0lBTGpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsbWpIQUEyQjs7S0FFOUIsQ0FBQzs2Q0FHc0MsZUFBZSxFQUFnQixXQUFXLEVBQTBCLGlCQUFpQjtHQUZoSCxxQkFBcUIsQ0E0VWpDO1NBNVVZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHtEYXRlVGltZXpvbmV9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtTZWxlY3RPcHRpb25zfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc2VsZWN0XCI7XG5pbXBvcnQge3RpbWV6b25lSW5mb30gZnJvbSBcIi4vdGltZXpvbmUtaW5mb1wiO1xuXG5jb25zdCB3ZWVrZGF5TmFycm93Rm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICB3ZWVrZGF5OiBcInNob3J0XCJcbn07XG5cbmNvbnN0IG1vbnRoWWVhckZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgbW9udGg6IFwibG9uZ1wiLFxuICAgIHllYXI6IFwibnVtZXJpY1wiXG59O1xuXG5jb25zdCBtb250aEZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgbW9udGg6IFwibG9uZ1wiXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRhdGV0aW1lLW92ZXJsYXlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJvdmVybGF5Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIm92ZXJsYXkuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlck92ZXJsYXkge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3Q29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLCBwcml2YXRlIGludGw6IEludGxTZXJ2aWNlLCBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSB2YWx1ZTogRGF0ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBmb3JtYXRPcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucztcblxuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgdGltZXpvbmU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgdGltZXpvbmVEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHRpbWV6b25lczogU2VsZWN0T3B0aW9uczxTdHJpbmc+O1xuXG4gICAgZGF0ZUhlYWRlcjogc3RyaW5nO1xuXG4gICAgZGF0ZVZpZXc6IFwiZGF5c1wiIHwgXCJtb250aHNcIiB8IFwieWVhcnNcIiA9IFwiZGF5c1wiO1xuXG4gICAgZGF0ZVZpZXdzOiB7aWQ6IHN0cmluZywgbGFiZWw6IHN0cmluZ31bXSA9IFt7aWQ6IFwiZGF5c1wiLCBsYWJlbDogdGhpcy5pbnRsLm1lc3NhZ2UoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucyNEYXlcIil9LCB7aWQ6IFwibW9udGhzXCIsIGxhYmVsOiB0aGlzLmludGwubWVzc2FnZShcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zI01vbnRoXCIpfSwge2lkOiBcInllYXJzXCIsIGxhYmVsOiB0aGlzLmludGwubWVzc2FnZShcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zI1llYXJcIil9XTtcblxuICAgIHByaXZhdGUgZGF0ZVZpZXdWYWx1ZTogRGF0ZTtcblxuICAgIGRhdGVWaWV3Q2hhbmdlZCgpIHtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgZGF0ZVZpZXdNb3ZlKHN0ZXA6IG51bWJlcikge1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVWaWV3ID09IFwiZGF5c1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDTW9udGgodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKCkgKyBzdGVwKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENGdWxsWWVhcih0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSArIHN0ZXApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcInllYXJzXCIpIHtcblxuICAgICAgICAgICAgbGV0IHllYXJIdW5kcmV0ID0gTWF0aC5mbG9vcih0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAvIDEwMCkgKiAxMDA7XG4gICAgICAgICAgICBsZXQgeWVhclRlbnMgPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAtIHllYXJIdW5kcmV0O1xuXG4gICAgICAgICAgICBsZXQgeWVhclN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh5ZWFyVGVucyA+PSA4MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDgwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA2MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDYwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA0MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDQwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSAyMCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDRnVsbFllYXIoeWVhckh1bmRyZXQgKyB5ZWFyU3RhcnQgKyAoMjAgKiBzdGVwKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuICAgIH1cblxuICAgIGRhdGVWYWx1ZXM6IHtpZDogbnVtYmVyLCBsYWJlbDogc3RyaW5nIHwgbnVtYmVyLCBzdWJsYWJlbD86IHN0cmluZywgY2hlY2tlZD86IGJvb2xlYW4sIGhpZGRlbj86IGJvb2xlYW59W107XG5cbiAgICBkYXRlVmFsdWVDbGlja2VkKHZhbHVlOiBudW1iZXIpIHtcblxuICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJkYXlzXCIpIHtcbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgodmFsdWUpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0bXBEYXRlLmdldFVUQ01vbnRoKCkgIT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRGF0ZSh0bXBEYXRlLmdldFVUQ0RhdGUoKSAtIGkpO1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ01vbnRoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwieWVhcnNcIikge1xuICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih2YWx1ZSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRtcERhdGUuZ2V0VVRDTW9udGgoKSAhPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSkge1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENNb250aCh0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSwgdG1wRGF0ZS5nZXRVVENEYXRlKCkgLSBpKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgdiBvZiB0aGlzLmRhdGVWYWx1ZXMpIHtcbiAgICAgICAgICAgIHYuY2hlY2tlZCA9IHYuaWQgPT0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlID0gbmV3IERhdGUodG1wRGF0ZSk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRtcERhdGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVEYXRlVmFsdWVzKCkge1xuXG4gICAgICAgIHRoaXMuZGF0ZVZhbHVlcyA9IFtdO1xuXG4gICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBkID0gMTsgZCA8PSAzMzsgZCsrKSB7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENEYXRlKGQpO1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVmFsdWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogZCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGQsXG4gICAgICAgICAgICAgICAgICAgIHN1YmxhYmVsOiB0aGlzLmludGwuZGF0ZUZvcm1hdCh0bXBEYXRlLCB3ZWVrZGF5TmFycm93Rm9ybWF0KSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogKHRoaXMudmFsdWUuZ2V0VVRDRnVsbFllYXIoKSA9PSB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgJiYgdGhpcy52YWx1ZS5nZXRVVENNb250aCgpID09IHRtcERhdGUuZ2V0VVRDTW9udGgoKSAmJiB0aGlzLnZhbHVlLmdldFVUQ0RhdGUoKSA9PSBkKSxcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0bXBEYXRlLmdldFVUQ01vbnRoKCkgIT0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuXG4gICAgICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKDE5OTksIHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpKSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgMTI7IG0rKykge1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgobSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVWYWx1ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBtLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5pbnRsLmRhdGVGb3JtYXQodG1wRGF0ZSwgbW9udGhGb3JtYXQpLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLnZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgPT0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgJiYgdGhpcy52YWx1ZS5nZXRVVENNb250aCgpID09IG1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcblxuICAgICAgICAgICAgbGV0IHllYXJIdW5kcmV0ID0gTWF0aC5mbG9vcih0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgLyAxMDApICogMTAwO1xuICAgICAgICAgICAgbGV0IHllYXJUZW5zID0gdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpIC0geWVhckh1bmRyZXQ7XG5cbiAgICAgICAgICAgIGxldCB5ZWFyU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHllYXJUZW5zID49IDgwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gODA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDYwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNjA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDQwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDIwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gMjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRnVsbFllYXIoeWVhckh1bmRyZXQgKyB5ZWFyU3RhcnQgLSAxKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCAyMDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgKyAxKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdGhpcy52YWx1ZS5nZXRVVENGdWxsWWVhcigpID09IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlRGF0ZUhlYWRlcigpIHtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gdGhpcy5pbnRsLmRhdGVGb3JtYXQodGhpcy5kYXRlVmlld1ZhbHVlLCBtb250aFllYXJGb3JtYXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgKyBcIlwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB5ZWFySHVuZHJldCA9IE1hdGguZmxvb3IodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLyAxMDApICogMTAwO1xuICAgICAgICAgICAgbGV0IHllYXJUZW5zID0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLSB5ZWFySHVuZHJldDtcblxuICAgICAgICAgICAgbGV0IHllYXJTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAoeWVhclRlbnMgPj0gODApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA4MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA2MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNDApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA0MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gMjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSAyMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kYXRlSGVhZGVyID0gYCR7eWVhckh1bmRyZXQgKyB5ZWFyU3RhcnR9IC0gJHt5ZWFySHVuZHJldCArIHllYXJTdGFydCArIDE5fWA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldCB0aW1lVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5mb3JtYXRPcHRpb25zLmhvdXIgfHwgISF0aGlzLmZvcm1hdE9wdGlvbnMuaG91cjEyIHx8ICEhdGhpcy5mb3JtYXRPcHRpb25zLm1pbnV0ZTtcbiAgICB9XG5cbiAgICBnZXQgdGltZUhvdXJzRm9ybWF0dGVkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFRpbWUodGhpcy52YWx1ZS5nZXRVVENIb3VycygpKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZUhvdXJzRm9ybWF0dGVkKGhvdXJzOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBoID0gcGFyc2VJbnQoaG91cnMpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUhvdXJzID0gaDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lSG91cnMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHRoaXMudGltZUhvdXJzID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0aW1lSG91cnMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUuZ2V0VVRDSG91cnMoKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZUhvdXJzKGhvdXJzOiBudW1iZXIpIHtcblxuICAgICAgICBpZiAoaG91cnMgPCAwIHx8IGhvdXJzID4gMjMpIHtcbiAgICAgICAgICAgIGhvdXJzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUuc2V0VVRDSG91cnMoaG91cnMpO1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDSG91cnMoaG91cnMpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgdGltZU1pbnV0ZXNGb3JtYXR0ZWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSh0aGlzLnZhbHVlLmdldFVUQ01pbnV0ZXMoKSk7XG4gICAgfVxuXG4gICAgc2V0IHRpbWVNaW51dGVzRm9ybWF0dGVkKG1pbnV0ZXM6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGggPSBwYXJzZUludChtaW51dGVzKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVNaW51dGVzID0gaDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTWludXRlcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgdGhpcy50aW1lTWludXRlcyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGltZU1pbnV0ZXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUuZ2V0VVRDTWludXRlcygpO1xuICAgIH1cblxuICAgIHNldCB0aW1lTWludXRlcyhtaW51dGVzOiBudW1iZXIpIHtcblxuICAgICAgICBpZiAobWludXRlcyA8IDAgfHwgbWludXRlcyA+IDU5KSB7XG4gICAgICAgICAgICBtaW51dGVzID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUuc2V0VVRDTWludXRlcyhtaW51dGVzKTtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ01pbnV0ZXMobWludXRlcyk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGZvcm1hdFRpbWUodmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSA8IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCIwXCIgKyB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSArIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2RheUNsaWNrZWQoKSB7XG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnZhbHVlLnNldFVUQ0Z1bGxZZWFyKG5vdy5nZXRVVENGdWxsWWVhcigpLCBub3cuZ2V0VVRDTW9udGgoKSwgbm93LmdldFVUQ0RhdGUoKSk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuICAgIH1cblxuICAgIGNhbmNlbENsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIGRvbmVDbGlja2VkKCkge1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMudGltZXpvbmUgJiYgdGhpcy50aW1lem9uZSAhPT0gXCJVVENcIikge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZS5nZXRUaW1lKCkgLSAoRGF0ZVRpbWV6b25lLnRpbWV6b25lT2Zmc2V0KHRoaXMudGltZXpvbmUsIHRoaXMudmFsdWUpICogNjAgKiAxMDAwICogLTEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld0NvbnRyb2xsZXIuZGlzbWlzcyhuZXcgRGF0ZVRpbWV6b25lKHZhbHVlLCB0aGlzLnRpbWV6b25lKSwgbnVsbCk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFRpbWV6b25lcygpIHtcbiAgICAgICAgY29uc3QgdGltZXpvbmVzID0gYXdhaXQgaW1wb3J0KFwiLi90aW1lem9uZXNcIik7XG4gICAgICAgIHRoaXMudGltZXpvbmVzID0gbmV3IFNlbGVjdE9wdGlvbnMoKTtcbiAgICAgICAgZm9yIChjb25zdCB0IG9mIHRpbWV6b25lcy50aW1lem9uZXModGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXpvbmVzLnB1c2hPcHRpb24odC5pZCwgdC5sYWJlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnRpbWV6b25lRGlzYWJsZWQpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXpvbmUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmZvID0gdGltZXpvbmVJbmZvKHRoaXMudGltZXpvbmUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWV6b25lcyA9IG5ldyBTZWxlY3RPcHRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXpvbmVzLnB1c2hPcHRpb24oaW5mby5pZCwgaW5mby5sYWJlbCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubG9hZFRpbWV6b25lcygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=