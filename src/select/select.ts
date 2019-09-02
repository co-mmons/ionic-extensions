import {Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnChanges, OnInit, Optional, Output, QueryList, SimpleChanges, ViewChild} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {IntlService} from "@co.mmons/angular-intl";
import {ModalController, PopoverController} from "@ionic/angular";
import {SelectLabel} from "./select-label";
import {SelectOption} from "./select-option";
import {SelectOptions} from "./select-options";
import {SelectOverlayContent} from "./select-overlay";
import {SelectOverlayOption} from "./select-overlay-option";

@Component({
    selector: "ionx-select",
    host: {
        "[attr.ionx--chips-layout]": "!!orderable || null",
        "[attr.ionx--readonly]": "(!!readonly || !!disabled) || null",
        "[attr.ionx--orderable]": "(!!orderable && !readonly && !disabled && values && values.length > 1) || null",
    },
    styleUrls: ["select.scss"],
    templateUrl: "select.html"
})
export class Select implements ControlValueAccessor, OnChanges, OnInit {


    constructor(private element: ElementRef<HTMLElement>, protected intl: IntlService, private popoverController: PopoverController, protected modalController: ModalController, @Optional() protected control: NgControl) {

        if (control) {
            control.valueAccessor = this;
        }
    }


    private _listItem: HTMLIonItemElement;

    private get listItem() {

        if (this._listItem) {
            return this._listItem;
        }

        return this._listItem = this.element.nativeElement.closest("ion-item");
    }

    // private dragula: dragula.Drake;

    @ViewChild("textContainer", {static: true})
    textContainer: ElementRef<HTMLElement>;

    @Input()
    public placeholder: string;

    @Input()
    public overlay: "popover" | "modal";

    @Input()
    public overlayWhiteSpace: string = "nowrap";

    /**
     * Whether value should be always returned as array, no matter if multiple is set to true.
     */
    @Input()
    public alwaysArray: boolean;

    /**
     * Compare values as string, that is whether toString() of both values are equal.
     */
    @Input()
    public compareAsString: boolean;

    @Input()
    public comparator: (a: any, b: any) => boolean | number;

    /**
     * If multiple value selection is allowed.
     */
    @Input()
    public multiple: boolean;

    /**
     * The title of the select overlay (only in case of modals).
     */
    @Input()
    public title: string;

    /**
     * If multiple values selection can be ordered after selection.
     */
    @Input()
    public orderable: boolean;

    @Input()
    public empty: boolean = true;


    _readonly: boolean;

    @Input()
    public set readonly(readonly: boolean) {

        if (typeof readonly === "string") {
            this.readonly = readonly === "true";
        } else {
            this._readonly = readonly;
        }
    }

    public get readonly(): boolean {
        return !!this._readonly;
    }


    /**
     * A function, that will be used for testing if value passes search critieria.
     * Default implementation checks lowercased label of value against 
     * lowercased searched text.
     */
    @Input()
    public searchTest: (query: string, value: any, label: string) => boolean;

    @Input()
    public checkValidator: (value: any, checked: boolean, otherCheckedValues: any[]) => any[];

    @Output()
    public readonly ionChange: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly change: EventEmitter<any> = this.ionChange;


    _disabled: boolean;

    /**
     * Whether or not the select component is disabled.
     */
    @Input()
    public get disabled() {
        return this._disabled;
    }

    public set disabled(disabled: boolean | string) {
        this._disabled = disabled || disabled == "true" ? true : false;
    }

    /*private*/values: any[] = [];

    @Input()
    public set value(value: any | any[]) {

        let changed = false;

        let newValue = Array.isArray(value) ? value : (value !== undefined && value !== null ? [value] : []);

        if (newValue.length != this.values.length) {
            changed = true;

        } else {
            for (let i = 0; i < this.values.length; i++) {
                if (!this.valueComparator(this.values[i], newValue[i])) {
                    changed = true;
                    break;
                }
            }
        }

        this.values = newValue;

        if (changed) {
            this.checkListItemHasValue();

            let value = this.value;

            if (this.fireOnChange) {
                if (this.controlOnChange) {
                    this.controlOnChange(value);
                }

                this.ionChange.emit(value);
            }
        }

        this.fireOnChange = false;
    }

    public get value(): any | any[] {
        return this.multiple || this.alwaysArray ? this.values.slice(0) : (this.values.length > 0 ? this.values[0] : undefined);
    }

    private cachedLabels: string[];

    /*private*/ labelImpl$(value: any): string {

        if (this.options instanceof SelectOptions) {

            if (!this.cachedLabels) {
                this.cachedLabels = new Array(this.options.length);
            }
            
            for (let i = 0; i < this.options.length; i++) {
                
                if (this.valueComparator(value, this.options[i].value)) {
                    
                    if (this.cachedLabels[i]) {
                        return this.cachedLabels[i];
                    }

                    return this.cachedLabels[i] = this.options[i].label ? this.options[i].label : (this.label ? this.label(value) : value + "");
                }
            }

        } else if (this.options) {

                if (!this.cachedLabels) {
                    this.cachedLabels = new Array(this.options.length);
                }

                for (let i = 0; i < this.options.length; i++) {

                    if (this.valueComparator(value, this.options[i])) {

                        if (this.cachedLabels[i]) {
                            return this.cachedLabels[i];
                        }

                        return this.cachedLabels[i] = this.label ? this.label(value) : value + "";
                    }
                }

        } else if (this.optionsComponents) {

            for (let options = this.optionsComponents.toArray(), i = 0; i < options.length; i++) {
                if (this.valueComparator(value, options[i].value)) {
                    return options[i].label;
                }
            }
        }

        return value;
    }

    private fireOnChange: boolean;

    writeValue(value: any): void {
        this.value = value;
    }

    public hasValue(): boolean {
        return this.values.length > 0;
    }

    private checkListItemHasValue() {
        if (this.listItem) {
            if (this.hasValue()) {
                this.listItem.classList.add("has-value")
            } else {
                this.listItem.classList.remove("has-value");
            }
        }
    }


    private valueComparator = (a: any, b: any) => {

        if (this.compareAsString) {
            if (a !== undefined && a !== null && b !== undefined && b !== null) {
                return a.toString() == b.toString();
            } else {
                return a == b;
            }

        } else if (this.comparator) {
            const r = this.comparator(a, b);
            return r === 0 || r === true;
        }
        
        return a === b;
    }


    @ContentChild(SelectLabel, {static: false})
    /*private*/ labelTemplate: SelectLabel;

    @Input()
    label: (value: any) => string;


    @Input()
    options: any[] | SelectOptions;

    private optionsComponents: QueryList<SelectOption>;

    @ContentChildren(SelectOption)
    protected set _optionsComponents(val: QueryList<SelectOption>) {
        this.optionsComponents = val;
        //this.optionsComponents.changes.subscribe(() => this.updateText());
    }

    private indexOfValue(value: any): number {

        if (!this.values) {
            return -1;
        }

        for (let i = 0; i < this.values.length; i++) {
            if (this.valueComparator(value, this.values[i])) {
                return i;
            }
        }

        return -1;
    }


    private controlOnChange: Function;

    public registerOnChange(fn: Function): void {
        this.controlOnChange = fn;
    }

    private controlOnTouched: Function;

    public registerOnTouched(fn: Function): void {
        this.controlOnTouched = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }


    public async open(event: Event) {

        let overlay: "popover" | "modal" = this.overlay;

        if (!overlay) {
            overlay = "popover";
        }

        let options: SelectOverlayOption[] = [];
        if (this.options instanceof SelectOptions) {
            for (const option of this.options) {
                const valueIndex = option.value ? this.indexOfValue(option.value) : -1;
                options.push({value: option.value, checked: option.value ? valueIndex > -1 : false, checkedTimestamp: this.orderable && valueIndex, label: option.label ? option.label : ((!this.searchTest || !this.labelTemplate) ? this.labelImpl$(option.value) : undefined), disabled: option.disabled, divider: option.divider});
            }

        } else if (this.options) {
            for (const option of this.options) {
                const valueIndex = this.indexOfValue(option);
                options.push({value: option, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: !this.labelTemplate || !this.searchTest ? this.labelImpl$(option) : undefined});
            }

        } else if (this.optionsComponents) {
            for (const option of this.optionsComponents.toArray()) {
                const valueIndex = this.indexOfValue(option.value);
                options.push({value: option.value, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: option.label, divider: !!option.divider});
            }
        }

        let overlayTitle: string;
        if (this.title) {
            overlayTitle = this.title;
        }

        if (!overlayTitle && this.listItem) {

            const title = this.listItem.querySelector("[ionx-select-overlay-title]") as HTMLElement;
            if (title) {
                overlayTitle = title.innerText;
            } else {
                const label = this.listItem.querySelector("ion-label");
                if (label) {
                    overlayTitle = label.innerText;
                }
            }
        }

        if (!overlayTitle && this.element.nativeElement.title) {
            overlayTitle = this.element.nativeElement.title;
        }

        if (!overlayTitle && this.placeholder) {
            overlayTitle = this.placeholder;
        }

        let overlayData = {
            overlay: overlay,
            options: options,
            multiple: !!this.multiple,
            title: overlayTitle,
            label: this.labelTemplate,
            orderable: !!this.orderable,
            empty: !!this.empty,
            whiteSpace: this.overlayWhiteSpace,
            valueValidator: this.checkValidator,
            valueComparator: this.valueComparator,
            width: this.element.nativeElement.getBoundingClientRect().width,

            updateValues: (value: any[]) => {

                this.fireOnChange = true;
                this.value = value;

                if (this.controlOnTouched) {
                    this.controlOnTouched();
                }
            }
        };

        if (overlay == "popover") {
            let popover = await this.popoverController.create({component: SelectOverlayContent, componentProps: overlayData, cssClass: "ionx-select-overlay-width", event: event});
            popover.present();
        } else {
            let modal = await this.modalController.create({component: SelectOverlayContent, componentProps: overlayData});
            modal.present();
        }
    }


    // private initDragula() {
    //
    //     if (this.orderable && !this.disabled && !this.readonly) {
    //
    //         if (this.dragula) {
    //             return;
    //         }
    //
    //         this.dragula = (dragula as any)({
    //             containers: [this.textContainer.nativeElement],
    //             direction: "horizontal",
    //
    //             moves: (el, container, handle) => {
    //                 return this.values && this.values.length > 1;
    //             }
    //         });
    //
    //         this.dragula.on("drop", (el, target, source, sibling) => {
    //
    //             const startIndex = parseInt(el.getAttribute("ionx--index"), 0);
    //             let endIndex = sibling ? parseInt(sibling.getAttribute("ionx--index"), 0) : this.values.length;
    //
    //             if (endIndex > startIndex) {
    //                 endIndex -= 1;
    //             }
    //
    //             const element = this.values[startIndex];
    //             this.values.splice(startIndex, 1);
    //             this.values.splice(endIndex, 0, element);
    //
    //             if (this.controlOnChange) {
    //                 this.controlOnChange(this.values.slice());
    //             }
    //
    //             this.ionChange.emit(this.values.slice());
    //         });
    //
    //     } else if (this.dragula) {
    //         this.dragula.destroy();
    //         this.dragula = undefined;
    //     }
    // }

    private updateCssClasses() {

        if (this.listItem) {
            this.listItem.classList.add("item-select");

            if (!this.readonly && !this.disabled) {
                this.listItem.classList.add("item-interactive");
            } else {
                this.listItem.classList.remove("item-interactive");
            }


            this.element.nativeElement.classList.add("in-item");

        } else {
            this.element.nativeElement.classList.remove("in-item");
        }
    }


    ngOnChanges(changes: SimpleChanges) {

        if (changes.options) {
            this.cachedLabels = undefined;
        }

        if (changes["orderable"] || changes["readonly"] || changes["disabled"]) {
            // this.initDragula();
            this.updateCssClasses();
        }
    }

    ngOnInit() {
        //this.updateText();

        this.updateCssClasses();

        if (this.orderable) {
            // this.initDragula();
        }
    }

}
