import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController } from "@ionic/angular";
export declare class DateTimePickerInput implements ControlValueAccessor, OnChanges {
    private element;
    private intl;
    private modalController;
    protected control: NgControl;
    constructor(element: ElementRef<HTMLElement>, intl: IntlService, modalController: ModalController, control: NgControl);
    private _listItem;
    private readonly listItem;
    private _displayFormat;
    /**
     * The display format of the date and time as text that shows
     * within the item. When the `pickerFormat` input is not used, then the
     * `displayFormat` is used for both display the formatted text, and determining
     * the datetime-picker picker's columns.
     */
    displayFormat: Intl.DateTimeFormatOptions | string;
    private _pickerFormat;
    pickerFormat: Intl.DateTimeFormatOptions | string;
    overlayTitle: string;
    placeholder: string;
    ionChange: EventEmitter<Date | number>;
    private nativeInput;
    private text$;
    readonly text: string;
    disabled$: boolean;
    /**
     * Whether or not the datetime-picker component is disabled. Default `false`.
     */
    disabled: boolean | string;
    valueType: "Date" | "number";
    private dateValue;
    value: number | Date;
    hasValue(): boolean;
    private checkListItemHasValue;
    private updateText;
    protected clicked(ev: UIEvent): void;
    protected keyuped(): void;
    private opened;
    private open;
    private overlayClosed;
    writeValue(value: any): void;
    private controlOnChange;
    registerOnChange(fn: Function): void;
    private controlOnTouched;
    registerOnTouched(fn: Function): void;
    setDisabledState(isDisabled: boolean): void;
    nativeInputFocused(): void;
    nativeInputBlured(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterContentChecked(): void;
}
