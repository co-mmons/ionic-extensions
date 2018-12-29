import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController, PopoverController } from "@ionic/angular";
export declare class Select implements ControlValueAccessor, OnChanges, OnInit {
    private element;
    protected intl: IntlService;
    private popoverController;
    protected modalController: ModalController;
    protected control: NgControl;
    constructor(element: ElementRef<HTMLElement>, intl: IntlService, popoverController: PopoverController, modalController: ModalController, control: NgControl);
    private _listItem;
    private readonly listItem;
    placeholder: string;
    overlay: "popover" | "modal";
    alwaysArray: boolean;
    compareAsString: boolean;
    multiple: boolean;
    orderable: boolean;
    searchHandler: (query: string, value: any, label: string) => boolean;
    validator: (value: any, checked: boolean, otherCheckedValues: any[]) => any[];
    ionChange: EventEmitter<any>;
    private text$;
    readonly text: string;
    private disabled$;
    /**
     * Whether or not the datetime-picker component is disabled. Default `false`.
     */
    disabled: boolean | string;
    private values;
    value: any | any[];
    private muteOnChange;
    writeValue(value: any): void;
    hasValue(): boolean;
    private updateText;
    private checkListItemHasValue;
    private valueComparator;
    private options;
    private options$;
    private isOptionSelected;
    private controlOnChange;
    registerOnChange(fn: Function): void;
    private controlOnTouched;
    registerOnTouched(fn: Function): void;
    setDisabledState(isDisabled: boolean): void;
    open(event: Event): Promise<void>;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
}
