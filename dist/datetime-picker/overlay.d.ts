import { ChangeDetectorRef } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController } from "@ionic/angular";
export declare class DateTimePickerOverlay {
    private viewController;
    private intl;
    private changeDetector;
    constructor(viewController: ModalController, intl: IntlService, changeDetector: ChangeDetectorRef);
    private value;
    private formatOptions;
    title: string;
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
    private generateDateValues;
    private generateDateHeader;
    readonly timeVisible: boolean;
    timeHoursFormatted: string;
    timeHours: number;
    timeMinutesFormatted: string;
    timeMinutes: number;
    formatTime(value: number): string;
    todayClicked(): void;
    cancelClicked(): void;
    doneClicked(): void;
    ngOnInit(): void;
}
