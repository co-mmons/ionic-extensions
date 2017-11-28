import {Component, ElementRef} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import {IntlService} from "@co.mmons/angular-intl";

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
        <div class="ionx-datetime-overlay-content">
            <ion-segment [(ngModel)]="dateView" (ionChange)="dateViewChanged()">
                <ion-segment-button *ngFor="let view of dateViews" [value]="view.id">{{view.label}}</ion-segment-button>
            </ion-segment>
            <ion-row class="ionx-datetime-overlay-date-header">
                <ion-col col-3>
                    <button ion-button clear icon-only (click)="dateViewMove(-1)">
                        <ion-icon name="arrow-dropleft"></ion-icon>
                    </button>
                </ion-col>
                <ion-col col-6 text-center>{{dateHeader}}</ion-col>
                <ion-col col-3 text-right>
                    <button ion-button clear icon-only (click)="dateViewMove(1)">
                        <ion-icon name="arrow-dropright"></ion-icon>
                    </button>
                </ion-col>
            </ion-row>
            <ion-row class="ionx-datetime-overlay-date-values">
                <ion-col *ngFor="let value of dateValues" [attr.col-2]="dateView == 'days' ? true : null" [attr.col-3]="dateView == 'years' ? true : null" [attr.col-6]="dateView == 'months' ? true : null" [style.visibility]="value.hidden ? 'hidden' : 'visible'">
                    <button ion-button [outline]="!value.checked" (click)="dateValueClicked(value.id)">
                        <span>{{value.label}}</span>
                        <small *ngIf="value.sublabel">{{value.sublabel}}</small>
                    </button>
                </ion-col>
                <ion-col col-6 *ngIf="dateView == 'days'">
                    <button ion-button (click)="todayClicked()">Dzisiaj</button>
                </ion-col>
            </ion-row>
        </div>
        <div class="ionx-datetime-overlay-time" *ngIf="timeVisible">
            <ion-row>
                <ion-col col-2>{{formatTime(timeHours)}}</ion-col>
                <ion-col>
                    <ion-range [(ngModel)]="timeHours" min="0" max="23" step="1"></ion-range>                
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col col-2>{{formatTime(timeMinutes)}}</ion-col>
                <ion-col>
                    <ion-range [(ngModel)]="timeMinutes" min="0" max="59" step="1"></ion-range>                
                </ion-col>
            </ion-row>
        </div>
        <ion-row class="ionx-datetime-overlay-footer">
            <ion-col text-right>
                <button ion-button small (click)="cancelClicked()">Anuluj</button>
                <button ion-button small (click)="doneClicked()">Gotowe</button>
            </ion-col>
        </ion-row>
    `
})
export class DateTimeOverlay {

    constructor(private element: ElementRef, params: NavParams, private viewController: ViewController, private intl: IntlService) {
        this.formatOptions = params.get("formatOptions");
        this.value = params.get("value");

        if (this.formatOptions.hour || this.formatOptions.hour12 || this.formatOptions.minute) {
            this.timeVisible = true;
        }
    }

    private value: Date;

    private formatOptions: Intl.DateTimeFormatOptions;

    dateHeader: string;

    dateView: "days" | "months" | "years" = "days";

    dateViews: {id: string, label: string}[] = [{id: "days", label: "Dzień"}, {id: "months", label: "Miesiąc"}, {id: "years", label: "Rok"}];

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
                this.dateValues.push({
                    id: d,
                    label: d,
                    sublabel: this.intl.dateFormat(tmpDate, weekdayNarrowFormat),
                    checked: (this.value.getUTCFullYear() == tmpDate.getUTCFullYear() && this.value.getUTCMonth() == tmpDate.getUTCMonth() && this.value.getUTCDate() == d),
                    hidden: tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()
                });
            }

        } else if (this.dateView == "months") {

            let tmpDate = new Date(1999, this.dateViewValue.getUTCMonth());

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

    timeVisible: boolean = false;

    get timeHours(): number {
        return this.value.getUTCHours();
    }

    set timeHours(hours: number) {
        this.value.setUTCHours(hours);
    }

    get timeMinutes(): number {
        return this.value.getUTCMinutes();
    }

    set timeMinutes(minutes: number) {
        this.value.setUTCMinutes(minutes);
    }

    formatTime(value: number): number | string {
        if (value < 10) {
            return "0" + value;
        } else {
            return value;
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
        this.viewController.dismiss(this.value, null, {animate: false});
    }

    ngOnInit() {

        // find popover-content parent
        {
            let parent = this.element.nativeElement.parentElement;
            while (parent) {

                if (parent.classList.contains("popover-content")) {
                    parent.classList.add("ionx-datetime-popover-content");
                    break;
                }

                parent = parent.parentElement;
            }
        }

        this.dateViewValue = new Date(this.value);
        this.generateDateValues();
        this.generateDateHeader();
    }

}