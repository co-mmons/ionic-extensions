import { __awaiter } from "tslib";
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
export class DateTimePickerOverlay {
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
}
DateTimePickerOverlay.decorators = [
    { type: Component, args: [{
                selector: "ionx-datetime-overlay",
                template: "<ion-header>\n    <ion-toolbar>\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : null\" (click)=\"$event.preventDefault(); cancelClicked()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"chevron-back\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" class=\"ion-text-center\">{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" class=\"ion-text-right\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"chevron-forward\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button fill=\"outline\" (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions/datetime#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions/datetime#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions/datetime#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
                styles: [":host{display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:flex;padding:4px;align-items:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow: none;padding:0;margin:0;flex:1;display:flex;--width: 100%;--padding-start: 2px;--padding-end: 2px;--padding-top: 2px;--padding-bottom: 2px;--margin-start: 0px;--margin-end: 0px;--margin-top: 0px;--margin-bottom: 0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start: 16px;--padding-end: 16px;--padding-top: 0px;--padding-bottom: 0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end: 8px;--padding-start: 0px;text-align:center}:host ion-footer ion-col{padding:0;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start: 0px;--padding-end: 0px;--padding-top: 0px;--padding-bottom: 0px;--margin-start: 0px;--margin-end: 0px;--margin-top: 0px;--margin-bottom: 0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width: 1px}\n"]
            },] }
];
DateTimePickerOverlay.ctorParameters = () => [
    { type: ModalController },
    { type: IntlService },
    { type: ChangeDetectorRef }
];
DateTimePickerOverlay.propDecorators = {
    value: [{ type: Input }],
    formatOptions: [{ type: Input }],
    title: [{ type: Input }],
    timezone: [{ type: Input }],
    timezoneDisabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRldGltZS1waWNrZXIvb3ZlcmxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXRDLE1BQU0sbUJBQW1CLEdBQStCO0lBQ3BELE9BQU8sRUFBRSxPQUFPO0NBQ25CLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBK0I7SUFDaEQsS0FBSyxFQUFFLE1BQU07SUFDYixJQUFJLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQStCO0lBQzVDLEtBQUssRUFBRSxNQUFNO0NBQ2hCLENBQUM7QUFPRixNQUFNLE9BQU8scUJBQXFCO0lBRTlCLFlBQW9CLGNBQStCLEVBQVUsSUFBaUIsRUFBVSxjQUFpQztRQUFyRyxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBc0J6SCxhQUFRLEdBQWdDLE1BQU0sQ0FBQztRQUUvQyxjQUFTLEdBQWtDLENBQUMsRUFBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQyxFQUFD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QWlCOzs7b0JBK0JwQixLQUFLOzRCQUdMLEtBQUs7b0JBR0wsS0FBSzt1QkFHTCxLQUFLOytCQUdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7U2VsZWN0T3B0aW9uc30gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3NlbGVjdFwiO1xuaW1wb3J0IHtEYXRlVGltZXpvbmV9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHt0aW1lem9uZUluZm99IGZyb20gXCIuL3RpbWV6b25lLWluZm9cIjtcbmltcG9ydCB7dGltZXpvbmVzfSBmcm9tIFwiLi90aW1lem9uZXNcIjtcblxuY29uc3Qgd2Vla2RheU5hcnJvd0Zvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgPSB7XG4gICAgd2Vla2RheTogXCJzaG9ydFwiXG59O1xuXG5jb25zdCBtb250aFllYXJGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgIG1vbnRoOiBcImxvbmdcIixcbiAgICB5ZWFyOiBcIm51bWVyaWNcIlxufTtcblxuY29uc3QgbW9udGhGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge1xuICAgIG1vbnRoOiBcImxvbmdcIlxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1kYXRldGltZS1vdmVybGF5XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwib3ZlcmxheS5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJvdmVybGF5LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJPdmVybGF5IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlciwgcHJpdmF0ZSBpbnRsOiBJbnRsU2VydmljZSwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgdmFsdWU6IERhdGU7XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgZm9ybWF0T3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnM7XG5cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHRpbWV6b25lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHRpbWV6b25lRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICB0aW1lem9uZXM6IFNlbGVjdE9wdGlvbnM8U3RyaW5nPjtcblxuICAgIGRhdGVIZWFkZXI6IHN0cmluZztcblxuICAgIGRhdGVWaWV3OiBcImRheXNcIiB8IFwibW9udGhzXCIgfCBcInllYXJzXCIgPSBcImRheXNcIjtcblxuICAgIGRhdGVWaWV3czoge2lkOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmd9W10gPSBbe2lkOiBcImRheXNcIiwgbGFiZWw6IHRoaXMuaW50bC5tZXNzYWdlKFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZGF0ZXRpbWUjRGF5XCIpfSwge2lkOiBcIm1vbnRoc1wiLCBsYWJlbDogdGhpcy5pbnRsLm1lc3NhZ2UoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kYXRldGltZSNNb250aFwiKX0sIHtpZDogXCJ5ZWFyc1wiLCBsYWJlbDogdGhpcy5pbnRsLm1lc3NhZ2UoXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kYXRldGltZSNZZWFyXCIpfV07XG5cbiAgICBwcml2YXRlIGRhdGVWaWV3VmFsdWU6IERhdGU7XG5cbiAgICBkYXRlVmlld0NoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZVZhbHVlcygpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlRGF0ZUhlYWRlcigpO1xuICAgIH1cblxuICAgIGRhdGVWaWV3TW92ZShzdGVwOiBudW1iZXIpIHtcblxuICAgICAgICBpZiAodGhpcy5kYXRlVmlldyA9PSBcImRheXNcIikge1xuICAgICAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ01vbnRoKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpICsgc3RlcCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUuc2V0VVRDRnVsbFllYXIodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgKyBzdGVwKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJ5ZWFyc1wiKSB7XG5cbiAgICAgICAgICAgIGxldCB5ZWFySHVuZHJldCA9IE1hdGguZmxvb3IodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLyAxMDApICogMTAwO1xuICAgICAgICAgICAgbGV0IHllYXJUZW5zID0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgLSB5ZWFySHVuZHJldDtcblxuICAgICAgICAgICAgbGV0IHllYXJTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAoeWVhclRlbnMgPj0gODApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA4MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA2MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gNDApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSA0MDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoeWVhclRlbnMgPj0gMjApIHtcbiAgICAgICAgICAgICAgICB5ZWFyU3RhcnQgPSAyMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ0Z1bGxZZWFyKHllYXJIdW5kcmV0ICsgeWVhclN0YXJ0ICsgKDIwICogc3RlcCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBkYXRlVmFsdWVzOiB7aWQ6IG51bWJlciwgbGFiZWw6IHN0cmluZyB8IG51bWJlciwgc3VibGFiZWw/OiBzdHJpbmcsIGNoZWNrZWQ/OiBib29sZWFuLCBoaWRkZW4/OiBib29sZWFufVtdO1xuXG4gICAgZGF0ZVZhbHVlQ2xpY2tlZCh2YWx1ZTogbnVtYmVyKSB7XG5cbiAgICAgICAgbGV0IHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmRhdGVWaWV3ID09IFwiZGF5c1wiKSB7XG4gICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0RhdGUodmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcIm1vbnRoc1wiKSB7XG4gICAgICAgICAgICB0bXBEYXRlLnNldFVUQ01vbnRoKHZhbHVlKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodG1wRGF0ZS5nZXRVVENNb250aCgpICE9IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWaWV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0RhdGUodG1wRGF0ZS5nZXRVVENEYXRlKCkgLSBpKTtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZS5zZXRVVENNb250aCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRlVmlldyA9PSBcInllYXJzXCIpIHtcbiAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRnVsbFllYXIodmFsdWUpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0bXBEYXRlLmdldFVUQ01vbnRoKCkgIT0gdGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDTW9udGgodGhpcy5kYXRlVmlld1ZhbHVlLmdldFVUQ01vbnRoKCksIHRtcERhdGUuZ2V0VVRDRGF0ZSgpIC0gaSk7XG4gICAgICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRnVsbFllYXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy5kYXRlVmFsdWVzKSB7XG4gICAgICAgICAgICB2LmNoZWNrZWQgPSB2LmlkID09IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ldyBEYXRlKHRtcERhdGUpO1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUgPSBuZXcgRGF0ZSh0bXBEYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlRGF0ZVZhbHVlcygpIHtcblxuICAgICAgICB0aGlzLmRhdGVWYWx1ZXMgPSBbXTtcblxuICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJkYXlzXCIpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgZCA9IDE7IGQgPD0gMzM7IGQrKykge1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRGF0ZShkKTtcbiAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGQsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBkLFxuICAgICAgICAgICAgICAgICAgICBzdWJsYWJlbDogdGhpcy5pbnRsLmRhdGVGb3JtYXQodG1wRGF0ZSwgd2Vla2RheU5hcnJvd0Zvcm1hdCksXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6ICh0aGlzLnZhbHVlLmdldFVUQ0Z1bGxZZWFyKCkgPT0gdG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpICYmIHRoaXMudmFsdWUuZ2V0VVRDTW9udGgoKSA9PSB0bXBEYXRlLmdldFVUQ01vbnRoKCkgJiYgdGhpcy52YWx1ZS5nZXRVVENEYXRlKCkgPT0gZCksXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogdG1wRGF0ZS5nZXRVVENNb250aCgpICE9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENNb250aCgpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcblxuICAgICAgICAgICAgbGV0IHRtcERhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQygxOTk5LCB0aGlzLmRhdGVWaWV3VmFsdWUuZ2V0VVRDTW9udGgoKSkpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBtID0gMDsgbSA8IDEyOyBtKyspIHtcbiAgICAgICAgICAgICAgICB0bXBEYXRlLnNldFVUQ01vbnRoKG0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVmFsdWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogbSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMuaW50bC5kYXRlRm9ybWF0KHRtcERhdGUsIG1vbnRoRm9ybWF0KSxcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdGhpcy52YWx1ZS5nZXRVVENGdWxsWWVhcigpID09IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpICYmIHRoaXMudmFsdWUuZ2V0VVRDTW9udGgoKSA9PSBtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwieWVhcnNcIikge1xuXG4gICAgICAgICAgICBsZXQgdG1wRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZpZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIGxldCB5ZWFySHVuZHJldCA9IE1hdGguZmxvb3IodG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpIC8gMTAwKSAqIDEwMDtcbiAgICAgICAgICAgIGxldCB5ZWFyVGVucyA9IHRtcERhdGUuZ2V0VVRDRnVsbFllYXIoKSAtIHllYXJIdW5kcmV0O1xuXG4gICAgICAgICAgICBsZXQgeWVhclN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh5ZWFyVGVucyA+PSA4MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDgwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA2MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDYwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSA0MCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDQwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh5ZWFyVGVucyA+PSAyMCkge1xuICAgICAgICAgICAgICAgIHllYXJTdGFydCA9IDIwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0bXBEYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXJIdW5kcmV0ICsgeWVhclN0YXJ0IC0gMSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMjA7IHkrKykge1xuICAgICAgICAgICAgICAgIHRtcERhdGUuc2V0VVRDRnVsbFllYXIodG1wRGF0ZS5nZXRVVENGdWxsWWVhcigpICsgMSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVWYWx1ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRoaXMudmFsdWUuZ2V0VVRDRnVsbFllYXIoKSA9PSB0bXBEYXRlLmdldFVUQ0Z1bGxZZWFyKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZURhdGVIZWFkZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcgPT0gXCJkYXlzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUhlYWRlciA9IHRoaXMuaW50bC5kYXRlRm9ybWF0KHRoaXMuZGF0ZVZpZXdWYWx1ZSwgbW9udGhZZWFyRm9ybWF0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwibW9udGhzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUhlYWRlciA9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpICsgXCJcIjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGVWaWV3ID09IFwieWVhcnNcIikge1xuXG4gICAgICAgICAgICBsZXQgeWVhckh1bmRyZXQgPSBNYXRoLmZsb29yKHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpIC8gMTAwKSAqIDEwMDtcbiAgICAgICAgICAgIGxldCB5ZWFyVGVucyA9IHRoaXMuZGF0ZVZpZXdWYWx1ZS5nZXRVVENGdWxsWWVhcigpIC0geWVhckh1bmRyZXQ7XG5cbiAgICAgICAgICAgIGxldCB5ZWFyU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHllYXJUZW5zID49IDgwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gODA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDYwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNjA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDQwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gNDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHllYXJUZW5zID49IDIwKSB7XG4gICAgICAgICAgICAgICAgeWVhclN0YXJ0ID0gMjA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZUhlYWRlciA9IGAke3llYXJIdW5kcmV0ICsgeWVhclN0YXJ0fSAtICR7eWVhckh1bmRyZXQgKyB5ZWFyU3RhcnQgKyAxOX1gO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXQgdGltZVZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZm9ybWF0T3B0aW9ucy5ob3VyIHx8ICEhdGhpcy5mb3JtYXRPcHRpb25zLmhvdXIxMiB8fCAhIXRoaXMuZm9ybWF0T3B0aW9ucy5taW51dGU7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVIb3Vyc0Zvcm1hdHRlZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaW1lKHRoaXMudmFsdWUuZ2V0VVRDSG91cnMoKSk7XG4gICAgfVxuXG4gICAgc2V0IHRpbWVIb3Vyc0Zvcm1hdHRlZChob3Vyczogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgaCA9IHBhcnNlSW50KGhvdXJzKTtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVIb3VycyA9IGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUhvdXJzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICB0aGlzLnRpbWVIb3VycyA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdGltZUhvdXJzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLmdldFVUQ0hvdXJzKCk7XG4gICAgfVxuXG4gICAgc2V0IHRpbWVIb3Vycyhob3VyczogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSB7XG4gICAgICAgICAgICBob3VycyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlLnNldFVUQ0hvdXJzKGhvdXJzKTtcbiAgICAgICAgdGhpcy5kYXRlVmlld1ZhbHVlLnNldFVUQ0hvdXJzKGhvdXJzKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVNaW51dGVzRm9ybWF0dGVkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFRpbWUodGhpcy52YWx1ZS5nZXRVVENNaW51dGVzKCkpO1xuICAgIH1cblxuICAgIHNldCB0aW1lTWludXRlc0Zvcm1hdHRlZChtaW51dGVzOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBoID0gcGFyc2VJbnQobWludXRlcyk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKGgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lTWludXRlcyA9IGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZU1pbnV0ZXMgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHRoaXMudGltZU1pbnV0ZXMgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRpbWVNaW51dGVzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLmdldFVUQ01pbnV0ZXMoKTtcbiAgICB9XG5cbiAgICBzZXQgdGltZU1pbnV0ZXMobWludXRlczogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKG1pbnV0ZXMgPCAwIHx8IG1pbnV0ZXMgPiA1OSkge1xuICAgICAgICAgICAgbWludXRlcyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlLnNldFVUQ01pbnV0ZXMobWludXRlcyk7XG4gICAgICAgIHRoaXMuZGF0ZVZpZXdWYWx1ZS5zZXRVVENNaW51dGVzKG1pbnV0ZXMpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBmb3JtYXRUaW1lKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBpZiAodmFsdWUgPCAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiMFwiICsgdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgKyBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9kYXlDbGlja2VkKCkge1xuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy52YWx1ZS5zZXRVVENGdWxsWWVhcihub3cuZ2V0VVRDRnVsbFllYXIoKSwgbm93LmdldFVUQ01vbnRoKCksIG5vdy5nZXRVVENEYXRlKCkpO1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUgPSBuZXcgRGF0ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBjYW5jZWxDbGlja2VkKCkge1xuICAgICAgICB0aGlzLnZpZXdDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBkb25lQ2xpY2tlZCgpIHtcblxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLnRpbWV6b25lICYmIHRoaXMudGltZXpvbmUgIT09IFwiVVRDXCIpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUuZ2V0VGltZSgpIC0gKERhdGVUaW1lem9uZS50aW1lem9uZU9mZnNldCh0aGlzLnRpbWV6b25lLCB0aGlzLnZhbHVlKSAqIDYwICogMTAwMCAqIC0xKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXdDb250cm9sbGVyLmRpc21pc3MobmV3IERhdGVUaW1lem9uZSh2YWx1ZSwgdGhpcy50aW1lem9uZSksIG51bGwpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRUaW1lem9uZXMoKSB7XG4gICAgICAgIHRoaXMudGltZXpvbmVzID0gbmV3IFNlbGVjdE9wdGlvbnMoKTtcbiAgICAgICAgZm9yIChjb25zdCB0IG9mIHRpbWV6b25lcyh0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy50aW1lem9uZXMucHVzaE9wdGlvbih0LmlkLCB0LmxhYmVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmRhdGVWaWV3VmFsdWUgPSBuZXcgRGF0ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZURhdGVIZWFkZXIoKTtcblxuICAgICAgICBpZiAoIXRoaXMudGltZXpvbmVEaXNhYmxlZCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lem9uZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0aW1lem9uZUluZm8odGhpcy50aW1lem9uZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXpvbmVzID0gbmV3IFNlbGVjdE9wdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lem9uZXMucHVzaE9wdGlvbihpbmZvLmlkLCBpbmZvLmxhYmVsKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sb2FkVGltZXpvbmVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==