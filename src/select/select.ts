import {Component, ContentChildren, ElementRef, Input, OnChanges, OnInit, Optional, QueryList, SimpleChanges, ViewEncapsulation, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {IntlService} from "@co.mmons/angular-intl";
import {ModalController, PopoverController} from "@ionic/angular";
import {SelectOverlayContent} from "./select-overlay";
import {SelectOverlayOption} from "./select-overlay-option";
import {SelectOption} from "./select-option";

@Component({
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "ionx-select",
    host: {
        "class": "select interactive"
    },
    template: `
        <div class="select-inner">
            <div class="select-text" [class.select-placeholder]="!hasValue()">{{text}}</div>
            <div class="select-icon" role="presentation">
                <div class="select-icon-inner"></div>
            </div>
            <button type="button" role="combobox" aria-haspopup="dialog" class="select-cover" (click)="open($event)"></button>
        </div>
    `
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


    @Input()
    public placeholder: string;

    @Input()
    public overlay: "popover" | "modal";

    @Input()
    public alwaysArray: boolean;

    @Input()
    public compareAsString: boolean;

    @Input()
    public multiple: boolean;

    @Input()
    public orderable: boolean;

    @Input()
    public searchHandler: (query: string, value: any, label: string) => boolean;

    @Input()
    public validator: (value: any, checked: boolean, otherCheckedValues: any[]) => any[];

    @Output()
    public ionChange: EventEmitter<any> = new EventEmitter();


    private text$: string;

    get text() {
        return this.text$ || this.placeholder;
    }

    private disabled$: boolean;

    /**
     * Whether or not the datetime-picker component is disabled. Default `false`.
     */
    @Input()
    public get disabled() {
        return this.disabled$;
    }

    public set disabled(disabled: boolean | string) {
        this.disabled$ = disabled || disabled == "true" ? true : false;
    }

    private values: any[] = [];

    @Input()
    public set value(value: any | any[]) {

        let changed = false;

        let newValue = Array.isArray(value) ? value : (value ? [value] : []);

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
            this.updateText();
            this.checkListItemHasValue();

            let value = this.value;

            if (this.controlOnChange && !this.muteOnChange) {
                this.controlOnChange(value);
            }
            
            this.ionChange.emit(value);
        }

        this.muteOnChange = false;
    }

    public get value(): any | any[] {
        return this.multiple || this.alwaysArray ? this.values.slice(0) : (this.values.length > 0 ? this.values[0] : undefined);
    }

    private muteOnChange: boolean;

    writeValue(value: any): void {
        this.muteOnChange = true;
        this.value = value;
    }

    public hasValue(): boolean {
        return this.values.length > 0;
    }


    private updateText() {
        if (this.hasValue()) {

            let labels: string[] = [];
            if (this.options$) {
                for (let opt of this.options$.toArray()) {
                    for (let val of this.values || []) {
                        if (this.valueComparator(opt.value, val)) {
                            labels.push(opt.label);
                        }
                    }
                }
            }

            this.text$ = labels.join(", ") || undefined;

        } else {
            this.text$ = null;
        }
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


    private valueComparator = (a, b) => {

        if (this.compareAsString) {
            if (a !== undefined && a !== null && b !== undefined && b !== null) {
                return a.toString() == b.toString();
            } else {
                return a == b;
            }
        }
        
        return a === b;
    }


    private options$: QueryList<SelectOption>;

    @ContentChildren(SelectOption)
    set options(val: QueryList<SelectOption>) {
        this.options$ = val;
        // const values = this.getValues();
        // if (values.length === 0) {
        //     // there are no values set at this point
        //     // so check to see who should be selected
        //     // we use writeValue() because we don't want to update ngModel
        //     this.writeValue(val.filter(o => o.selected).map(o => o.value));
        // } else {
        //     this._updateText();
        // }
    }

    private isOptionSelected(option: SelectOption) {

        for (let v of this.values || []) {
            if (this.valueComparator(option.value, v)) {
                return true;
            }
        }

        return false;
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
        for (let option of this.options$.toArray()) {
            options.push({value: option.value, checked: this.isOptionSelected(option), label: option.label, divider: !!option.divider});
        }

        let overlayTitle: string;
        if (this.listItem) {
            let label = this.listItem.querySelector("ion-label");
            if (label) {
                overlayTitle = label.innerText;
            }
        } else if (this.element.nativeElement.title) {
            overlayTitle = this.element.nativeElement.title;
        } else if (this.placeholder) {
            overlayTitle = this.placeholder;
        }

        let overlayData = {
            overlay: overlay,
            options: options,
            multiple: !!this.multiple,
            title: overlayTitle,
            ordered: !!this.orderable,
            valueValidator: this.validator,
            valueComparator: this.valueComparator,
            width: this.element.nativeElement.getBoundingClientRect().width,

            updateValues: (value: any[]) => {
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


    ngOnChanges(changes: SimpleChanges) {

        // if (changes["displayFormat"]) {
        //     this.updateText();
        // }
    }

    ngOnInit() {
        this.updateText();

        if (this.listItem) {
            this.listItem.classList.add("item-select", "item-interactive");
            this.element.nativeElement.classList.add("in-item");
        }
    }

}