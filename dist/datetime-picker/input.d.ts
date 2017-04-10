import { ElementRef, Renderer, OnChanges, SimpleChanges } from "@angular/core";
import { NgControl, ControlValueAccessor } from "@angular/forms";
import { App, Ion, Config, Item, PopoverController } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
export declare class DateTime extends Ion implements ControlValueAccessor, OnChanges {
    private app;
    private config;
    private elementRef;
    private renderer;
    private intl;
    private popoverController;
    private item;
    private control;
    constructor(app: App, config: Config, elementRef: ElementRef, renderer: Renderer, intl: IntlService, popoverController: PopoverController, item: Item, control: NgControl);
    /**
     * The display format of the date and time as text that shows
     * within the item. When the `pickerFormat` input is not used, then the
     * `displayFormat` is used for both display the formatted text, and determining
     * the datetime-picker picker"s columns.
     */
    displayFormat: Intl.DateTimeFormatOptions;
    /**
     * The format of the date and time picker columns the user selects.
     * A datetime-picker input can have one or many datetime-picker parts, each getting their
     * own column which allow individual selection of that particular datetime-picker part. For
     * example, year and month columns are two individually selectable columns which help
     * choose an exact date from the datetime-picker picker.
     */
    pickerFormat: Intl.DateTimeFormatOptions;
    placeholder: string;
    _text: string;
    _disabled: boolean;
    /**
     * Whether or not the datetime-picker component is disabled. Default `false`.
     */
    disabled: boolean | string;
    valueType: string;
    private _value;
    value: number | Date;
    private checkHasValue();
    private updateText();
    private clicked(ev);
    private keyuped();
    private opened;
    private open(event);
    private overlayClosed(newValue);
    writeValue(value: any): void;
    private controlOnChange;
    registerOnChange(fn: Function): void;
    private controlOnTouched;
    registerOnTouched(fn: Function): void;
    setDisabledState(isDisabled: boolean): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    private setItemInputControlCss();
    private setControlCss(element, control);
}
