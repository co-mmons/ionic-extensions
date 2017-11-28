import { ElementRef } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
export declare class DateTimeOverlay {
    private element;
    private viewController;
    private intl;
    constructor(element: ElementRef, params: NavParams, viewController: ViewController, intl: IntlService);
    private value;
    private formatOptions;
    dateHeader: string;
    dateView: "days" | "months" | "years";
    dateViews: {
        id: string;
        label: string;
    }[];
    private dateViewValue;
    dateViewChanged(): void;
    dateViewMove(step: number): void;
    dateValues: {
        id: number;
        label: string | number;
        sublabel?: string;
        checked?: boolean;
        hidden?: boolean;
    }[];
    dateValueClicked(value: number): void;
    private generateDateValues();
    private generateDateHeader();
    timeVisible: boolean;
    timeHours: number;
    timeMinutes: number;
    formatTime(value: number): number | string;
    todayClicked(): void;
    cancelClicked(): void;
    doneClicked(): void;
    ngOnInit(): void;
}
