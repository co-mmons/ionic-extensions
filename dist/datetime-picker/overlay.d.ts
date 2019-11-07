import { ChangeDetectorRef } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { SelectOptions } from "@co.mmons/ionic-extensions/select";
import { ModalController } from "@ionic/angular";
export declare class DateTimePickerOverlay {
    private viewController;
    private intl;
    private changeDetector;
    constructor(viewController: ModalController, intl: IntlService, changeDetector: ChangeDetectorRef);
    private value;
    private formatOptions;
    title: string;
    timezone: string;
    timezoneDisabled: boolean;
    timezones: SelectOptions<String>;
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
    loadTimezones(): Promise<void>;
    ngOnInit(): void;
}
