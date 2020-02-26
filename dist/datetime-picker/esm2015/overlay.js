import { __awaiter, __decorate } from "tslib";
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { SelectOptions } from "@co.mmons/ionic-extensions/select";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
import { timezoneInfo } from "./timezone-info";
import { timezones } from "./timezones";
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
        this.dateViews = [{ id: "days", label: this.intl.message("@co.mmons/ionic-extensions/datetime#Day") }, { id: "months", label: this.intl.message("@co.mmons/ionic-extensions/datetime#Month") }, { id: "years", label: this.intl.message("@co.mmons/ionic-extensions/datetime#Year") }];
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
        return __awaiter(this, void 0, void 0, function* () {
            this.timezones = new SelectOptions();
            for (const t of timezones(this.value)) {
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
DateTimePickerOverlay.ctorParameters = () => [
    { type: ModalController },
    { type: IntlService },
    { type: ChangeDetectorRef }
];
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
        template: "<ion-header>\n    <ion-toolbar>\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : null\" (click)=\"$event.preventDefault(); cancelClicked()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"chevron-back\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" class=\"ion-text-center\">{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" class=\"ion-text-right\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"chevron-forward\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button fill=\"outline\" (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions/datetime#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions/datetime#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions/datetime#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
        styles: [":host{display:-webkit-box;display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:-webkit-box;display:flex;padding:4px;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow:none;padding:0;margin:0;-webkit-box-flex:1;flex:1;display:-webkit-box;display:flex;--width:100%;--padding-start:2px;--padding-end:2px;--padding-top:2px;--padding-bottom:2px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start:16px;--padding-end:16px;--padding-top:0px;--padding-bottom:0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end:8px;--padding-start:0px;text-align:center}:host ion-footer ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width:1px}"]
    })
], DateTimePickerOverlay);
export { DateTimePickerOverlay };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2RhdGV0aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbIm92ZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxNQUFNLG1CQUFtQixHQUErQjtJQUNwRCxPQUFPLEVBQUUsT0FBTztDQUNuQixDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQStCO0lBQ2hELEtBQUssRUFBRSxNQUFNO0lBQ2IsSUFBSSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUErQjtJQUM1QyxLQUFLLEVBQUUsTUFBTTtDQUNoQixDQUFDO0FBT0YsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFFOUIsWUFBb0IsY0FBK0IsRUFBVSxJQUFpQixFQUFVLGNBQWlDO1FBQXJHLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQWE7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFzQnpILGFBQVEsR0FBZ0MsTUFBTSxDQUFDO1FBRS9DLGNBQVMsR0FBa0MsQ0FBQyxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJ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SyxFQUFFO29EQUNZO0FBR3BCO0lBREMsS0FBSyxFQUFFOzREQUMwQztBQUdsRDtJQURDLEtBQUssRUFBRTtvREFDTTtBQUdkO0lBREMsS0FBSyxFQUFFO3VEQUNTO0FBR2pCO0lBREMsS0FBSyxFQUFFOytEQUNrQjtBQWxCakIscUJBQXFCO0lBTGpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsMHFIQUEyQjs7S0FFOUIsQ0FBQztHQUNXLHFCQUFxQixDQTJVakM7U0EzVVkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge1NlbGVjdE9wdGlvbnN9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9zZWxlY3RcIjtcbmltcG9ydCB7RGF0ZVRpbWV6b25lfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7dGltZXpvbmVJbmZvfSBmcm9tIFwiLi90aW1lem9uZS1pbmZvXCI7XG5pbXBvcnQge3RpbWV6b25lc30gZnJvbSBcIi4vdGltZXpvbmVzXCI7XG5cbmNvbnN0IHdlZWtkYXlOYXJyb3dGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgIHdlZWtkYXk6IFwic2hvcnRcIlxufTtcblxuY29uc3QgbW9udGhZZWFyRm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICBtb250aDogXCJsb25nXCIsXG4gICAgeWVhcjogXCJudW1lcmljXCJcbn07XG5cbmNvbnN0IG1vbnRoRm9ybWF0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgICBtb250aDogXCJsb25nXCJcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZGF0ZXRpbWUtb3ZlcmxheVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIm92ZXJsYXkuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wib3ZlcmxheS5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyT3ZlcmxheSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsIHByaXZhdGUgaW50bDogSW50bFNlcnZpY2UsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIHZhbHVlOiBEYXRlO1xuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGZvcm1hdE9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zO1xuXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICB0aW1lem9uZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICB0aW1lem9uZURpc2FibGVkOiBib29sZWFuO1xuXG4gICAgdGltZXpvbmVzOiBTZWxlY3RPcHRpb25zPFN0cmluZz47XG5cbiAgICBkYXRlSGVhZGVyOiBzdHJpbmc7XG5cbiAgICBkYXRlVmlldzogXCJkYXlzXCIgfCBcIm1vbnRoc1wiIHwgXCJ5ZWFyc1wiID0gXCJkYXlzXCI7XG5cbiAgICBkYXRlVmlld3M6IHtpZDogc3RyaW5nLCBsYWJlbDogc3RyaW5nfVtdID0gW3tpZDogXCJkYXlzXCIsIGxhYmVsOiB0aGlzLmludGwubWVzc2FnZShcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2RhdGV0aW1lI0RheVwiKX0sIHtpZDogXCJtb250aHNcIiwgbGFiZWw6IHRoaXMuaW50bC5tZXNzYWdlKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGF0ZXRpbWUjTW9udGhcIil9LCB7aWQ6IFwieWVhcnNcIiwgbGFiZWw6IHRoaXMuaW50bC5tZXNzYWdlKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGF0ZXRpbWUjWWVhclwiKX1dO1xuXG4gICAgcHJpdmF0ZSBkYXRlVmlld1ZhbHVlOiBEYXRlO1xuXG4gICAgZGF0ZVZpZXdDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUgPSBuZXcgRGF0ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBkYXRlVmlld01vdmUoc3RlcDogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJkYXlzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENNb250aCh0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSArIHN0ZXApO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ0Z1bGxZZWFyKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpICsgc3RlcCk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwieWVhcnNcIikge1xuXG4gICAgICAgICAgICBsZXQgeWVhckh1bmRyZXQgPSBNYXRoLmZsb29yKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpIC8gMTAwKSAqIDEwMDtcbiAgICAgICAgICAgIGxldCB5ZWFyVGVucyA9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpIC0geWVhckh1bmRyZXQ7XG5cbiAgICAgICAgICAgIGxldCB5ZWFyU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHllYXJUZW5zID49IDgwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gODA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDYwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNjA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDQwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDIwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gMjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENGdWxsWWVhcih5ZWFySHVuZHJldCArIHllYXJTdGFydCArICgyMCAqIHN0ZXApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgZGF0ZVZhbHVlczoge2lkOiBudW1iZXIsIGxhYmVsOiBzdHJpbmcgfCBudW1iZXIsIHN1YmxhYmVsPzogc3RyaW5nLCBjaGVja2VkPzogYm9vbGVhbiwgaGlkZGVuPzogYm9vbGVhbn1bXTtcblxuICAgIGRhdGVWYWx1ZUNsaWNrZWQodmFsdWU6IG51bWJlcikge1xuXG4gICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENEYXRlKHZhbHVlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJtb250aHNcIikge1xuICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENNb250aCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRtcERhdGUuZ2V0VVRDTW9udGgoKSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlID0gbmV3IERhdGUodGhpcy5kYXRlVmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENEYXRlKHRtcERhdGUuZ2V0VVRDRGF0ZSgpIC0gaSk7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG4gICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0Z1bGxZZWFyKHZhbHVlKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodG1wRGF0ZS5nZXRVVENNb250aCgpICE9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ01vbnRoKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpLCB0bXBEYXRlLmdldFVUQ0RhdGUoKSAtIGkpO1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0Z1bGxZZWFyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB2IG9mIHRoaXMuZGF0ZVZhbHVlcykge1xuICAgICAgICAgICAgdi5jaGVja2VkID0gdi5pZCA9PSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXcgRGF0ZSh0bXBEYXRlKTtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodG1wRGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZURhdGVWYWx1ZXMoKSB7XG5cbiAgICAgICAgdGhpcy5kYXRlVmFsdWVzID0gW107XG5cbiAgICAgICAgbGV0IHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVWaWV3ID09IFwiZGF5c1wiKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IDMzOyBkKyspIHtcbiAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0RhdGUoZCk7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVWYWx1ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZCxcbiAgICAgICAgICAgICAgICAgICAgc3VibGFiZWw6IHRoaXMuaW50bC5kYXRlRm9ybWF0KHRtcERhdGUsIHdlZWtkYXlOYXJyb3dGb3JtYXQpLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiAodGhpcy52YWx1ZS5nZXRVVENGdWxsWWVhcigpID09IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSAmJiB0aGlzLnZhbHVlLmdldFVUQ01vbnRoKCkgPT0gdG1wRGF0ZS5nZXRVVENNb250aCgpICYmIHRoaXMudmFsdWUuZ2V0VVRDRGF0ZSgpID09IGQpLFxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRtcERhdGUuZ2V0VVRDTW9udGgoKSAhPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcIm1vbnRoc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB0bXBEYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoMTk5OSwgdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKCkpKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCAxMjsgbSsrKSB7XG4gICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENNb250aChtKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG0sXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLmludGwuZGF0ZUZvcm1hdCh0bXBEYXRlLCBtb250aEZvcm1hdCksXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRoaXMudmFsdWUuZ2V0VVRDRnVsbFllYXIoKSA9PSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAmJiB0aGlzLnZhbHVlLmdldFVUQ01vbnRoKCkgPT0gbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcInllYXJzXCIpIHtcblxuICAgICAgICAgICAgbGV0IHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuXG4gICAgICAgICAgICBsZXQgeWVhckh1bmRyZXQgPSBNYXRoLmZsb29yKHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSAvIDEwMCkgKiAxMDA7XG4gICAgICAgICAgICBsZXQgeWVhclRlbnMgPSB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCkgLSB5ZWFySHVuZHJldDtcblxuICAgICAgICAgICAgbGV0IHllYXJTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAoeWVhclRlbnMgPj0gODApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA4MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA2MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNDApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA0MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gMjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSAyMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFySHVuZHJldCArIHllYXJTdGFydCAtIDEpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDIwOyB5KyspIHtcbiAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0Z1bGxZZWFyKHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSArIDEpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVmFsdWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0aGlzLnZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgPT0gdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVEYXRlSGVhZGVyKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVWaWV3ID09IFwiZGF5c1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVIZWFkZXIgPSB0aGlzLmludGwuZGF0ZUZvcm1hdCh0aGlzLmRhdGVWaWV3VmFsdWUsIG1vbnRoWWVhckZvcm1hdCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVIZWFkZXIgPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSArIFwiXCI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcInllYXJzXCIpIHtcblxuICAgICAgICAgICAgbGV0IHllYXJIdW5kcmV0ID0gTWF0aC5mbG9vcih0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAvIDEwMCkgKiAxMDA7XG4gICAgICAgICAgICBsZXQgeWVhclRlbnMgPSB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDRnVsbFllYXIoKSAtIHllYXJIdW5kcmV0O1xuXG4gICAgICAgICAgICBsZXQgeWVhclN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh5ZWFyVGVucyA+PSA4MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDgwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA2MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDYwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA0MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDQwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSAyMCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRhdGVIZWFkZXIgPSBgJHt5ZWFySHVuZHJldCArIHllYXJTdGFydH0gLSAke3llYXJIdW5kcmV0ICsgeWVhclN0YXJ0ICsgMTl9YDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0IHRpbWVWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmZvcm1hdE9wdGlvbnMuaG91ciB8fCAhIXRoaXMuZm9ybWF0T3B0aW9ucy5ob3VyMTIgfHwgISF0aGlzLmZvcm1hdE9wdGlvbnMubWludXRlO1xuICAgIH1cblxuICAgIGdldCB0aW1lSG91cnNGb3JtYXR0ZWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0VGltZSh0aGlzLnZhbHVlLmdldFVUQ0hvdXJzKCkpO1xuICAgIH1cblxuICAgIHNldCB0aW1lSG91cnNGb3JtYXR0ZWQoaG91cnM6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGggPSBwYXJzZUludChob3Vycyk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lSG91cnMgPSBoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVIb3VycyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgdGhpcy50aW1lSG91cnMgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVIb3VycygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5nZXRVVENIb3VycygpO1xuICAgIH1cblxuICAgIHNldCB0aW1lSG91cnMoaG91cnM6IG51bWJlcikge1xuXG4gICAgICAgIGlmIChob3VycyA8IDAgfHwgaG91cnMgPiAyMykge1xuICAgICAgICAgICAgaG91cnMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRVVENIb3Vycyhob3Vycyk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENIb3Vycyhob3Vycyk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIGdldCB0aW1lTWludXRlc0Zvcm1hdHRlZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaW1lKHRoaXMudmFsdWUuZ2V0VVRDTWludXRlcygpKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZU1pbnV0ZXNGb3JtYXR0ZWQobWludXRlczogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgaCA9IHBhcnNlSW50KG1pbnV0ZXMpO1xuICAgICAgICAgICAgaWYgKCFpc05hTihoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZU1pbnV0ZXMgPSBoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVNaW51dGVzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICB0aGlzLnRpbWVNaW51dGVzID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0aW1lTWludXRlcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5nZXRVVENNaW51dGVzKCk7XG4gICAgfVxuXG4gICAgc2V0IHRpbWVNaW51dGVzKG1pbnV0ZXM6IG51bWJlcikge1xuXG4gICAgICAgIGlmIChtaW51dGVzIDwgMCB8fCBtaW51dGVzID4gNTkpIHtcbiAgICAgICAgICAgIG1pbnV0ZXMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRVVENNaW51dGVzKG1pbnV0ZXMpO1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDTWludXRlcyhtaW51dGVzKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZm9ybWF0VGltZSh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHZhbHVlIDwgMTApIHtcbiAgICAgICAgICAgIHJldHVybiBcIjBcIiArIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICsgXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZGF5Q2xpY2tlZCgpIHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMudmFsdWUuc2V0VVRDRnVsbFllYXIobm93LmdldFVUQ0Z1bGxZZWFyKCksIG5vdy5nZXRVVENNb250aCgpLCBub3cuZ2V0VVRDRGF0ZSgpKTtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG4gICAgfVxuXG4gICAgY2FuY2VsQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy52aWV3Q29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgfVxuXG4gICAgZG9uZUNsaWNrZWQoKSB7XG5cbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy50aW1lem9uZSAmJiB0aGlzLnRpbWV6b25lICE9PSBcIlVUQ1wiKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlLmdldFRpbWUoKSAtIChEYXRlVGltZXpvbmUudGltZXpvbmVPZmZzZXQodGhpcy50aW1lem9uZSwgdGhpcy52YWx1ZSkgKiA2MCAqIDEwMDAgKiAtMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aWV3Q29udHJvbGxlci5kaXNtaXNzKG5ldyBEYXRlVGltZXpvbmUodmFsdWUsIHRoaXMudGltZXpvbmUpLCBudWxsKTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2FkVGltZXpvbmVzKCkge1xuICAgICAgICB0aGlzLnRpbWV6b25lcyA9IG5ldyBTZWxlY3RPcHRpb25zKCk7XG4gICAgICAgIGZvciAoY29uc3QgdCBvZiB0aW1lem9uZXModGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXpvbmVzLnB1c2hPcHRpb24odC5pZCwgdC5sYWJlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlID0gbmV3IERhdGUodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlVmFsdWVzKCk7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVEYXRlSGVhZGVyKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnRpbWV6b25lRGlzYWJsZWQpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXpvbmUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmZvID0gdGltZXpvbmVJbmZvKHRoaXMudGltZXpvbmUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWV6b25lcyA9IG5ldyBTZWxlY3RPcHRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXpvbmVzLnB1c2hPcHRpb24oaW5mby5pZCwgaW5mby5sYWJlbCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubG9hZFRpbWV6b25lcygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=