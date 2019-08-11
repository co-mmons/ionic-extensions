import {ChangeDetectorRef, Component, Input} from "@angular/core";
import {IntlService} from "@co.mmons/angular-intl";
import {DateTimezone} from "@co.mmons/js-utils/core";
import {ModalController} from "@ionic/angular";
import {SelectOptions} from "../select";
import {timezoneInfo} from "./timezone-info";

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
    template: `
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button (click)="cancelClicked()" fill="clear">
                        <ion-icon name="close" slot="icon-only"></ion-icon>
                    </ion-button>
                </ion-buttons>

                <ion-title>{{title}}</ion-title>                

                <ion-buttons slot="end">
                    <ion-button (click)="doneClicked()">{{"@co.mmons/js-intl#Done" | intlMessage}}</ion-button>
                </ion-buttons>
            </ion-toolbar>
            <ion-toolbar>
                <ion-segment [(ngModel)]="dateView" (ionChange)="dateViewChanged()">
                    <ion-segment-button *ngFor="let view of dateViews" [value]="view.id">{{view.label}}</ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            
            <div>

                <ion-row ionx--values-header>
                    <ion-col size="3">
                        <ion-button fill="clear" (click)="dateViewMove(-1)">
                            <ion-icon name="arrow-dropleft" slot="icon-only"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col size="6" text-center>{{dateHeader}}</ion-col>
                    <ion-col size="3" text-right>
                        <ion-button fill="clear" (click)="dateViewMove(1)">
                            <ion-icon name="arrow-dropright" slot="icon-only"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
                
                <ion-row ionx--values-grid style="margin: 0px 14px">
                    <ion-col *ngFor="let value of dateValues" [size]="dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)" [style.visibility]="value.hidden ? 'hidden' : 'visible'">
                        <ion-button [fill]="!value.checked ? 'outline' : 'solid'" (click)="dateValueClicked(value.id)">
                            <div>
                                <div>{{value.label}}</div>
                                <small *ngIf="value.sublabel">{{value.sublabel}}</small>
                            </div>
                        </ion-button>
                    </ion-col>
                    <ion-col size="6" *ngIf="dateView == 'days'">
                        <ion-button (click)="todayClicked()">{{"@co.mmons/ionic-extensions#Today" | intlMessage}}</ion-button>
                    </ion-col>
                </ion-row>
                
            </div>

        </ion-content>
        
        <ion-footer *ngIf="timeVisible">
            <ion-toolbar>
                <ion-row>
                    <ion-col size="3">
                        <ion-input type="number" [(ngModel)]="timeHoursFormatted" [min]="0" [max]="23" inputmode="numeric"></ion-input>
                    </ion-col>
                    <ion-col>
                        <ion-range [(ngModel)]="timeHours" min="0" max="23" step="1"></ion-range>                
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="3">
                        <ion-input type="number" [(ngModel)]="timeMinutesFormatted" [min]="0" [max]="59" inputmode="numeric"></ion-input>
                    </ion-col>
                    <ion-col>
                        <ion-range [(ngModel)]="timeMinutes" min="0" max="59" step="1"></ion-range>                
                    </ion-col>
                </ion-row>
                <ion-row *ngIf="!timezoneDisabled">
                    <ion-col size="3"></ion-col>
                    <ion-col size="9">
                        <ionx-select [options]="timezones" [(ngModel)]="timezone" overlay="modal" [title]="'@co.mmons/ionic-extensions#Time zone' | intlMessage" [placeholder]="'@co.mmons/ionic-extensions#No time zone' | intlMessage"></ionx-select>
                    </ion-col>
                </ion-row>
            </ion-toolbar>
        </ion-footer>
    `,
    styles: [
        `
            :host {
                display: flex;
            }
            
            :host-context(.ios) ion-segment {
                margin-bottom: 4px; 
            }

            :host [ionx--values-header] {
                margin: 16px 16px 8px 16px;
            }

            :host-context(.ios) [ionx--values-header] {
                margin-top: 0px;
                margin-bottom: 0px;
            }
            
            :host [ionx--values-header] ion-col {
                padding: 0px;
                align-self: center;
            }

            :host [ionx--values-header] ion-button {
                max-height: 36px;
            }
            
            :host [ionx--values-grid] ion-col {
                display: flex;
                padding: 4px;
                align-items: center;
                justify-content: center;
            }
            
            :host [ionx--values-grid] ion-button {
                --box-shadow: none;
                padding: 0px;
                margin: 0px;
                flex: 1;
                display: flex;
                --width: 100%;
                --padding-start: 2px;
                --padding-end: 2px;
                --padding-top: 2px;
                --padding-bottom: 2px;
                --margin-start: 0px;
                --margin-end: 0px;
                --margin-top: 0px;
                --margin-bottom: 0px;
            }

            :host [ionx--values-grid] ion-button div {
                min-width: 40px;
                line-height: 0.8;
            }
            
            :host-context(.md) [ionx--values-grid] ion-button.button-outline {
                --border-width: 1px;
            }
            
            :host-context(.ios) [ionx--values-grid] ion-button {
                --padding-start: 0px;
                --padding-end: 0px;
                --padding-top: 0px;
                --padding-bottom: 0px;
                --margin-start: 0px;
                --margin-end: 0px;
                --margin-top: 0px;
                --margin-bottom: 0px;
            }
            
            :host ion-footer ion-toolbar {
                --padding-start: 16px;
                --padding-end: 16px;
                --padding-top: 0px;
                --padding-bottom: 0px;
            }

            :host ion-footer ion-range {
                padding: 0px 8px 0px 0px;
            }
            
            :host ion-footer ion-input {
                --padding-end: 8px;
                --padding-start: 0px;
                text-align: center;
            }
            
            :host ion-footer ion-col {
                padding: 0px;
                align-self: center;
            }
            
            :host ion-footer ionx-select {
                padding-left: 0px;
            }
        `
    ]
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
    private timezone: string;

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
        const timezones = await import("./timezones");
        this.timezones = new SelectOptions();
        for (const t of timezones.timezones(this.value)) {
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
