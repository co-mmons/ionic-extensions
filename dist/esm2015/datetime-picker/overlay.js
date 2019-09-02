import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
import { SelectOptions } from "../select";
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
        template: "<ion-header>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-button (click)=\"cancelClicked()\" fill=\"clear\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ion-buttons>\n\n        <ion-title>{{title}}</ion-title>\n\n        <ion-buttons slot=\"end\">\n            <ion-button (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" text-right>\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: [":host{display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:flex;padding:4px;align-items:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow:none;padding:0;margin:0;flex:1;display:flex;--width:100%;--padding-start:2px;--padding-end:2px;--padding-top:2px;--padding-bottom:2px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start:16px;--padding-end:16px;--padding-top:0px;--padding-bottom:0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end:8px;--padding-start:0px;text-align:center}:host ion-footer ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width:1px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController, IntlService, ChangeDetectorRef])
], DateTimePickerOverlay);
export { DateTimePickerOverlay };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsiZGF0ZXRpbWUtcGlja2VyL292ZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE1BQU0sbUJBQW1CLEdBQStCO0lBQ3BELE9BQU8sRUFBRSxPQUFPO0NBQ25CLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBK0I7SUFDaEQsS0FBSyxFQUFFLE1BQU07SUFDYixJQUFJLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQStCO0lBQzVDLEtBQUssRUFBRSxNQUFNO0NBQ2hCLENBQUM7QUFPRixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUU5QixZQUFvQixjQUErQixFQUFVLElBQWlCLEVBQVUsY0FBaUM7UUFBckcsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQXNCekgsYUFBUSxHQUFnQyxNQUFNLENBQUM7UUFFL0MsY0FBUyxHQUFrQyxDQUFDLEVBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsRUFBQyxFQUFFLEVBQUMs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QUFDO0FBR3BCO0lBREMsS0FBSyxFQUFFOzs0REFDMEM7QUFHbEQ7SUFEQyxLQUFLLEVBQUU7O29EQUNNO0FBR2Q7SUFEQyxLQUFLLEVBQUU7O3VEQUNTO0FBR2pCO0lBREMsS0FBSyxFQUFFOzsrREFDa0I7QUFsQmpCLHFCQUFxQjtJQUxqQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLGtpSEFBMkI7O0tBRTlCLENBQUM7NkNBR3NDLGVBQWUsRUFBZ0IsV0FBVyxFQUEwQixpQkFBaUI7R0FGaEgscUJBQXFCLENBNFVqQztTQTVVWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7RGF0ZVRpbWV6b25lfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7U2VsZWN0T3B0aW9uc30gZnJvbSBcIi4uL3NlbGVjdFwiO1xuaW1wb3J0IHt0aW1lem9uZUluZm99IGZyb20gXCIuL3RpbWV6b25lLWluZm9cIjtcblxuY29uc3Qgd2Vla2RheU5hcnJvd0Zvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgd2Vla2RheTogXCJzaG9ydFwiXG59O1xuXG5jb25zdCBtb250aFllYXJGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgIG1vbnRoOiBcImxvbmdcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIlxufTtcblxuY29uc3QgbW9udGhGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgIG1vbnRoOiBcImxvbmdcIlxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kYXRldGltZS1vdmVybGF5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwib3ZlcmxheS5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJvdmVybGF5LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJPdmVybGF5IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlciwgcHJpdmF0ZSBpbnRsOiBJbnRsU2VydmljZSwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgdmFsdWU6IERhdGU7XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgZm9ybWF0T3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnM7XG5cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHRpbWV6b25lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHRpbWV6b25lRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICB0aW1lem9uZXM6IFNlbGVjdE9wdGlvbnM8U3RyaW5nPjtcblxuICAgIGRhdGVIZWFkZXI6IHN0cmluZztcblxuICAgIGRhdGVWaWV3OiBcImRheXNcIiB8IFwibW9udGhzXCIgfCBcInllYXJzXCIgPSBcImRheXNcIjtcblxuICAgIGRhdGVWaWV3czoge2lkOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmd9W10gPSBbe2lkOiBcImRheXNcIiwgbGFiZWw6IHRoaXMuaW50bC5tZXNzYWdlKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMjRGF5XCIpfSwge2lkOiBcIm1vbnRoc1wiLCBsYWJlbDogdGhpcy5pbnRsLm1lc3NhZ2UoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucyNNb250aFwiKX0sIHtpZDogXCJ5ZWFyc1wiLCBsYWJlbDogdGhpcy5pbnRsLm1lc3NhZ2UoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucyNZZWFyXCIpfV07XG5cbiAgICBwcml2YXRlIGRhdGVWaWV3VmFsdWU6IERhdGU7XG5cbiAgICBkYXRlVmlld0NoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuICAgIH1cblxuICAgIGRhdGVWaWV3TW92ZShzdGVwOiBudW1iZXIpIHtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ01vbnRoKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpICsgc3RlcCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDRnVsbFllYXIodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgKyBzdGVwKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB5ZWFySHVuZHJldCA9IE1hdGguZmxvb3IodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLyAxMDApICogMTAwO1xuICAgICAgICAgICAgbGV0IHllYXJUZW5zID0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLSB5ZWFySHVuZHJldDtcblxuICAgICAgICAgICAgbGV0IHllYXJTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAoeWVhclRlbnMgPj0gODApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA4MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA2MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNDApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA0MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gMjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSAyMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ0Z1bGxZZWFyKHllYXJIdW5kcmV0ICsgeWVhclN0YXJ0ICsgKDIwICogc3RlcCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBkYXRlVmFsdWVzOiB7aWQ6IG51bWJlciwgbGFiZWw6IHN0cmluZyB8IG51bWJlciwgc3VibGFiZWw/OiBzdHJpbmcsIGNoZWNrZWQ/OiBib29sZWFuLCBoaWRkZW4/OiBib29sZWFufVtdO1xuXG4gICAgZGF0ZVZhbHVlQ2xpY2tlZCh2YWx1ZTogbnVtYmVyKSB7XG5cbiAgICAgICAgbGV0IHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVWaWV3ID09IFwiZGF5c1wiKSB7XG4gICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0RhdGUodmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgICAgICB0bXBEYXRlLnNldFVUQ01vbnRoKHZhbHVlKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodG1wRGF0ZS5nZXRVVENNb250aCgpICE9IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0RhdGUodG1wRGF0ZS5nZXRVVENEYXRlKCkgLSBpKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENNb250aCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcInllYXJzXCIpIHtcbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRnVsbFllYXIodmFsdWUpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0bXBEYXRlLmdldFVUQ01vbnRoKCkgIT0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKCksIHRtcERhdGUuZ2V0VVRDRGF0ZSgpIC0gaSk7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRnVsbFllYXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy5kYXRlVmFsdWVzKSB7XG4gICAgICAgICAgICB2LmNoZWNrZWQgPSB2LmlkID09IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ldyBEYXRlKHRtcERhdGUpO1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUgPSBuZXcgRGF0ZSh0bXBEYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlRGF0ZVZhbHVlcygpIHtcblxuICAgICAgICB0aGlzLmRhdGVWYWx1ZXMgPSBbXTtcblxuICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJkYXlzXCIpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDE7IGQgPD0gMzM7IGQrKykge1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRGF0ZShkKTtcbiAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBkLFxuICAgICAgICAgICAgICAgICAgICBzdWJsYWJlbDogdGhpcy5pbnRsLmRhdGVGb3JtYXQodG1wRGF0ZSwgd2Vla2RheU5hcnJvd0Zvcm1hdCksXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6ICh0aGlzLnZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgPT0gdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpICYmIHRoaXMudmFsdWUuZ2V0VVRDTW9udGgoKSA9PSB0bXBEYXRlLmdldFVUQ01vbnRoKCkgJiYgdGhpcy52YWx1ZS5nZXRVVENEYXRlKCkgPT0gZCksXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogdG1wRGF0ZS5nZXRVVENNb250aCgpICE9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcblxuICAgICAgICAgICAgbGV0IHRtcERhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygxOTk5LCB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSkpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IDEyOyBtKyspIHtcbiAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ01vbnRoKG0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVmFsdWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogbSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMuaW50bC5kYXRlRm9ybWF0KHRtcERhdGUsIG1vbnRoRm9ybWF0KSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdGhpcy52YWx1ZS5nZXRVVENGdWxsWWVhcigpID09IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpICYmIHRoaXMudmFsdWUuZ2V0VVRDTW9udGgoKSA9PSBtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwieWVhcnNcIikge1xuXG4gICAgICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIGxldCB5ZWFySHVuZHJldCA9IE1hdGguZmxvb3IodG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpIC8gMTAwKSAqIDEwMDtcbiAgICAgICAgICAgIGxldCB5ZWFyVGVucyA9IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSAtIHllYXJIdW5kcmV0O1xuXG4gICAgICAgICAgICBsZXQgeWVhclN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh5ZWFyVGVucyA+PSA4MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDgwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA2MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDYwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA0MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDQwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSAyMCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXJIdW5kcmV0ICsgeWVhclN0YXJ0IC0gMSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMjA7IHkrKykge1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRnVsbFllYXIodG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpICsgMSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVWYWx1ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRoaXMudmFsdWUuZ2V0VVRDRnVsbFllYXIoKSA9PSB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZURhdGVIZWFkZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJkYXlzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUhlYWRlciA9IHRoaXMuaW50bC5kYXRlRm9ybWF0KHRoaXMuZGF0ZVZpZXdWYWx1ZSwgbW9udGhZZWFyRm9ybWF0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUhlYWRlciA9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpICsgXCJcIjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwieWVhcnNcIikge1xuXG4gICAgICAgICAgICBsZXQgeWVhckh1bmRyZXQgPSBNYXRoLmZsb29yKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpIC8gMTAwKSAqIDEwMDtcbiAgICAgICAgICAgIGxldCB5ZWFyVGVucyA9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpIC0geWVhckh1bmRyZXQ7XG5cbiAgICAgICAgICAgIGxldCB5ZWFyU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHllYXJUZW5zID49IDgwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gODA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDYwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNjA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDQwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDIwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gMjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZUhlYWRlciA9IGAke3llYXJIdW5kcmV0ICsgeWVhclN0YXJ0fSAtICR7eWVhckh1bmRyZXQgKyB5ZWFyU3RhcnQgKyAxOX1gO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXQgdGltZVZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZm9ybWF0T3B0aW9ucy5ob3VyIHx8ICEhdGhpcy5mb3JtYXRPcHRpb25zLmhvdXIxMiB8fCAhIXRoaXMuZm9ybWF0T3B0aW9ucy5taW51dGU7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVIb3Vyc0Zvcm1hdHRlZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaW1lKHRoaXMudmFsdWUuZ2V0VVRDSG91cnMoKSk7XG4gICAgfVxuXG4gICAgc2V0IHRpbWVIb3Vyc0Zvcm1hdHRlZChob3Vyczogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgaCA9IHBhcnNlSW50KGhvdXJzKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVIb3VycyA9IGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUhvdXJzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICB0aGlzLnRpbWVIb3VycyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGltZUhvdXJzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLmdldFVUQ0hvdXJzKCk7XG4gICAgfVxuXG4gICAgc2V0IHRpbWVIb3Vycyhob3VyczogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSB7XG4gICAgICAgICAgICBob3VycyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlLnNldFVUQ0hvdXJzKGhvdXJzKTtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ0hvdXJzKGhvdXJzKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVNaW51dGVzRm9ybWF0dGVkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFRpbWUodGhpcy52YWx1ZS5nZXRVVENNaW51dGVzKCkpO1xuICAgIH1cblxuICAgIHNldCB0aW1lTWludXRlc0Zvcm1hdHRlZChtaW51dGVzOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBoID0gcGFyc2VJbnQobWludXRlcyk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTWludXRlcyA9IGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZU1pbnV0ZXMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHRoaXMudGltZU1pbnV0ZXMgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVNaW51dGVzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLmdldFVUQ01pbnV0ZXMoKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZU1pbnV0ZXMobWludXRlczogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAwIHx8IG1pbnV0ZXMgPiA1OSkge1xuICAgICAgICAgICAgbWludXRlcyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlLnNldFVUQ01pbnV0ZXMobWludXRlcyk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENNaW51dGVzKG1pbnV0ZXMpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiMFwiICsgdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgKyBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9kYXlDbGlja2VkKCkge1xuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy52YWx1ZS5zZXRVVENGdWxsWWVhcihub3cuZ2V0VVRDRnVsbFllYXIoKSwgbm93LmdldFVUQ01vbnRoKCksIG5vdy5nZXRVVENEYXRlKCkpO1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUgPSBuZXcgRGF0ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBjYW5jZWxDbGlja2VkKCkge1xuICAgICAgICB0aGlzLnZpZXdDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBkb25lQ2xpY2tlZCgpIHtcblxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnRpbWV6b25lICYmIHRoaXMudGltZXpvbmUgIT09IFwiVVRDXCIpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpIC0gKERhdGVUaW1lem9uZS50aW1lem9uZU9mZnNldCh0aGlzLnRpbWV6b25lLCB0aGlzLnZhbHVlKSAqIDYwICogMTAwMCAqIC0xKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXdDb250cm9sbGVyLmRpc21pc3MobmV3IERhdGVUaW1lem9uZSh2YWx1ZSwgdGhpcy50aW1lem9uZSksIG51bGwpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRUaW1lem9uZXMoKSB7XG4gICAgICAgIGNvbnN0IHRpbWV6b25lcyA9IGF3YWl0IGltcG9ydChcIi4vdGltZXpvbmVzXCIpO1xuICAgICAgICB0aGlzLnRpbWV6b25lcyA9IG5ldyBTZWxlY3RPcHRpb25zKCk7XG4gICAgICAgIGZvciAoY29uc3QgdCBvZiB0aW1lem9uZXMudGltZXpvbmVzKHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWV6b25lcy5wdXNoT3B0aW9uKHQuaWQsIHQubGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuXG4gICAgICAgIGlmICghdGhpcy50aW1lem9uZURpc2FibGVkKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWV6b25lKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mbyA9IHRpbWV6b25lSW5mbyh0aGlzLnRpbWV6b25lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lem9uZXMgPSBuZXcgU2VsZWN0T3B0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWV6b25lcy5wdXNoT3B0aW9uKGluZm8uaWQsIGluZm8ubGFiZWwpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxvYWRUaW1lem9uZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19