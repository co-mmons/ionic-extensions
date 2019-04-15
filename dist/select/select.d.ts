import { ElementRef, EventEmitter, OnChanges, OnInit, QueryList, SimpleChanges } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController, PopoverController } from "@ionic/angular";
import { SelectOption } from "./select-option";
import { SelectOptions } from "./select-options";
export declare class Select implements ControlValueAccessor, OnChanges, OnInit {
    private element;
    protected intl: IntlService;
    private popoverController;
    protected modalController: ModalController;
    protected control: NgControl;
    constructor(element: ElementRef<HTMLElement>, intl: IntlService, popoverController: PopoverController, modalController: ModalController, control: NgControl);
    private _listItem;
    private readonly listItem;
    private dragula;
    private textContainer;
    placeholder: string;
    overlay: "popover" | "modal";
    /**
     * Whether value should be always returned as array, no matter if multiple is set to true.
     */
    alwaysArray: boolean;
    /**
     * Compare values as string, that is whether toString() of both values are equal.
     */
    compareAsString: boolean;
    comparator: (a: any, b: any) => boolean | number;
    /**
     * If multiple value selection is allowed.
     */
    multiple: boolean;
    /**
     * The title of the select overlay (only in case of modals).
     */
    title: string;
    /**
     * If multiple values selection can be ordered after selection.
     */
    orderable: boolean;
    empty: boolean;
    _readonly: boolean;
    readonly: boolean;
    /**
     * A function, that will be used for testing if value passes search critieria.
     * Default implementation checks lowercased label of value against
     * lowercased searched text.
     */
    searchTest: (query: string, value: any, label: string) => boolean;
    checkValidator: (value: any, checked: boolean, otherCheckedValues: any[]) => any[];
    readonly ionChange: EventEmitter<any>;
    readonly change: EventEmitter<any>;
    _disabled: boolean;
    /**
     * Whether or not the select component is disabled.
     */
    disabled: boolean | string;
    values: any[];
    value: any | any[];
    private cachedLabels;
    labelImpl$(value: any): string;
    private muteOnChange;
    writeValue(value: any): void;
    hasValue(): boolean;
    private checkListItemHasValue;
    private valueComparator;
    private labelTemplate;
    label: (value: any) => string;
    options: any[] | SelectOptions;
    private optionsComponents;
    protected _optionsComponents: QueryList<SelectOption>;
    private indexOfValue;
    private controlOnChange;
    registerOnChange(fn: Function): void;
    private controlOnTouched;
    registerOnTouched(fn: Function): void;
    setDisabledState(isDisabled: boolean): void;
    open(event: Event): Promise<void>;
    private initDragula;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
}
