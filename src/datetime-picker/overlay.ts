import {ChangeDetectorRef, Component, Input} from "@angular/core";
import {IntlService} from "@co.mmons/angular-intl";
import {DateTimezone} from "@co.mmons/js-utils/core";
import {ModalController} from "@ionic/angular";
import {SelectOptions} from "../select";
import {timezoneInfo} from "./timezone-info";
import {timezones} from "./timezones";

const weekdayNarrowFormat: Intl.DateTimeFormatOptions = {
    weekday: "short"
};

const monthYearFormat: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric"
};

const monthFormat: Intl.DateTimeFormatOptions = {
    month: "long"
};

@Component({
    selector: "ionx-datetime-overlay",
    templateUrl: "overlay.html",
    styleUrls: ["overlay.scss"]
})
export class DateTimePickerOverlay {

    constructor(private viewController: ModalController, private intl: IntlService, private changeDetector: ChangeDetectorRef) {
    }

    @Input()
    private value: Date;

    @Input()
    private formatOptions: Intl.DateTimeFormatOptions;

    @Input()
    title: string;

    @Input()
    timezone: string;

    @Input()
    timezoneDisabled: boolean;

    timezones: SelectOptions<String>;

    dateHeader: string;

    dateView: "days" | "months" | "years" = "days";

    dateViews: {id: string, label: string}[] = [{id: "days", label: this.intl.message("@co.mmons/ionic-extensions#Day")}, {id: "months", label: this.intl.message("@co.mmons/ionic-extensions#Month")}, {id: "years", label: this.intl.message("@co.mmons/ionic-extensions#Year")}];

    private dateViewValue: Date;

    dateViewChanged() {
        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    }

    dateViewMove(step: number) {

        if (this.dateView == "days") {
            this.dateViewValue.setUTCMonth(this.dateViewValue.getUTCMonth() + step);
        } else if (this.dateView == "months") {
            this.dateViewValue.setUTCFullYear(this.dateViewValue.getUTCFullYear() + step);

        } else if (this.dateView == "years") {

            let yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
            let yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;

            let yearStart = 0;
            if (yearTens >= 80) {
                yearStart = 80;
            } else if (yearTens >= 60) {
                yearStart = 60;
            } else if (yearTens >= 40) {
                yearStart = 40;
            } else if (yearTens >= 20) {
                yearStart = 20;
            }

            this.dateViewValue.setUTCFullYear(yearHundret + yearStart + (20 * step));
        }

        this.generateDateValues();
        this.generateDateHeader();
    }

    dateValues: {id: number, label: string | number, sublabel?: string, checked?: boolean, hidden?: boolean}[];

    dateValueClicked(value: number) {

        let tmpDate = new Date(this.dateViewValue);

        if (this.dateView == "days") {
            tmpDate.setUTCDate(value);

        } else if (this.dateView == "months") {
            tmpDate.setUTCMonth(value);

            for (let i = 1; i < 5; i++) {
                if (tmpDate.getUTCMonth() != value) {
                    tmpDate = new Date(this.dateViewValue);
                    tmpDate.setUTCDate(tmpDate.getUTCDate() - i);
                    tmpDate.setUTCMonth(value);
                } else {
                    break;
                }
            }

        } else if (this.dateView == "years") {
            tmpDate.setUTCFullYear(value);

            for (let i = 1; i < 5; i++) {
                if (tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()) {
                    tmpDate = new Date(this.dateViewValue);
                    tmpDate.setUTCMonth(this.dateViewValue.getUTCMonth(), tmpDate.getUTCDate() - i);
                    tmpDate.setUTCFullYear(value);
                } else {
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

    private generateDateValues() {

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

        } else if (this.dateView == "months") {

            let tmpDate = new Date(Date.UTC(1999, this.dateViewValue.getUTCMonth()));

            for (let m = 0; m < 12; m++) {
                tmpDate.setUTCMonth(m);

                this.dateValues.push({
                    id: m,
                    label: this.intl.dateFormat(tmpDate, monthFormat),
                    checked: this.value.getUTCFullYear() == this.dateViewValue.getUTCFullYear() && this.value.getUTCMonth() == m
                });
            }

        } else if (this.dateView == "years") {

            let tmpDate = new Date(this.dateViewValue);

            let yearHundret = Math.floor(tmpDate.getUTCFullYear() / 100) * 100;
            let yearTens = tmpDate.getUTCFullYear() - yearHundret;

            let yearStart = 0;
            if (yearTens >= 80) {
                yearStart = 80;
            } else if (yearTens >= 60) {
                yearStart = 60;
            } else if (yearTens >= 40) {
                yearStart = 40;
            } else if (yearTens >= 20) {
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

    private generateDateHeader() {

        if (this.dateView == "days") {
            this.dateHeader = this.intl.dateFormat(this.dateViewValue, monthYearFormat);
        } else if (this.dateView == "months") {
            this.dateHeader = this.dateViewValue.getUTCFullYear() + "";
        } else if (this.dateView == "years") {

            let yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
            let yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;

            let yearStart = 0;
            if (yearTens >= 80) {
                yearStart = 80;
            } else if (yearTens >= 60) {
                yearStart = 60;
            } else if (yearTens >= 40) {
                yearStart = 40;
            } else if (yearTens >= 20) {
                yearStart = 20;
            }

            this.dateHeader = `${yearHundret + yearStart} - ${yearHundret + yearStart + 19}`;
        }

    }

    get timeVisible(): boolean {
        return !!this.formatOptions.hour || !!this.formatOptions.hour12 || !!this.formatOptions.minute;
    }

    get timeHoursFormatted(): string {
        return this.formatTime(this.value.getUTCHours());
    }

    set timeHoursFormatted(hours: string) {
        try {
            let h = parseInt(hours);
            if (!isNaN(h)) {
                this.timeHours = h;
            } else {
                this.timeHours = 0;
            }
        } catch {
            this.timeHours = 0;
        }
    }

    get timeHours(): number {
        return this.value.getUTCHours();
    }

    set timeHours(hours: number) {

        if (hours < 0 || hours > 23) {
            hours = 0;
        }

        this.value.setUTCHours(hours);
        this.dateViewValue.setUTCHours(hours);
        this.changeDetector.detectChanges();
    }

    get timeMinutesFormatted(): string {
        return this.formatTime(this.value.getUTCMinutes());
    }

    set timeMinutesFormatted(minutes: string) {
        try {
            let h = parseInt(minutes);
            if (!isNaN(h)) {
                this.timeMinutes = h;
            } else {
                this.timeMinutes = 0;
            }
        } catch {
            this.timeMinutes = 0;
        }
    }

    get timeMinutes(): number {
        return this.value.getUTCMinutes();
    }

    set timeMinutes(minutes: number) {

        if (minutes < 0 || minutes > 59) {
            minutes = 0;
        }

        this.value.setUTCMinutes(minutes);
        this.dateViewValue.setUTCMinutes(minutes);
        this.changeDetector.detectChanges();
    }

    formatTime(value: number): string {
        if (value < 10) {
            return "0" + value;
        } else {
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

    async loadTimezones() {
        this.timezones = new SelectOptions();
        for (const t of timezones(this.value)) {
            this.timezones.pushOption(t.id, t.label);
        }
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
                } catch (error) {
                    // console.warn(error);
                }
            }

            this.loadTimezones();
        }
    }

}
