import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
declare type Value = Date | DateTimezone | number;
export declare class DateTimePickerInput implements ControlValueAccessor, OnChanges {
    private element;
    private intl;
    private modalController;
    protected control: NgControl;
    private static currentTimezone;
    constructor(element: ElementRef<HTMLElement>, intl: IntlService, modalController: ModalController, control: NgControl);
    private muteControlOnChange;
    private _listItem;
    private _displayFormat;
    private _pickerFormat;
    private nativeInput;
    private _text;
    private _disabled;
    private _value;
    private opened;
    private controlOnChange;
    private controlOnTouched;
    readonly: boolean;
    overlayTitle: string;
    placeholder: string;
    readonly ionChange: EventEmitter<Value>;
    /**
     * Whether timezone cannot be changed.
     */
    timezoneDisabled: boolean;
    /**
     * Timezone, that will be set, when new value is picked from picker.
     */
    defaultTimezone: string;
    readonly text: string;
    /**
     * Whether or not the datetime-picker component is disabled.
     */
    disabled: boolean | string;
    private readonly listItem;
    /**
     * The display format of the date and time as text that shows
     * within the item. When the `pickerFormat` input is not used, then the
     * `displayFormat` is used for both display the formatted text, and determining
     * the datetime-picker picker's columns.
     */
    displayFormat: Intl.DateTimeFormatOptions;
    pickerFormat: Intl.DateTimeFormatOptions;
    value: Value;
    clearValue(): void;
    hasValue(): boolean;
    private checkListItemHasValue;
    private updateText;
    protected clicked(ev: UIEvent): void;
    protected keyuped(): void;
    private open;
    private overlayClosed;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(isDisabled: boolean): void;
    nativeInputFocused(): void;
    nativeInputBlured(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    private setupCss;
    ngAfterContentChecked(): void;
}
export {};
