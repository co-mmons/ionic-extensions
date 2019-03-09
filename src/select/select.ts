import {Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnChanges, OnInit, Optional, Output, QueryList, SimpleChanges, ViewEncapsulation} from "@angular/core";
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {IntlService} from "@co.mmons/angular-intl";
import {ModalController, PopoverController} from "@ionic/angular";
import {SelectLabel} from "./select-label";
import {SelectOption} from "./select-option";
import {SelectOptions} from "./select-options";
import {SelectOverlayContent} from "./select-overlay";
import {SelectOverlayOption} from "./select-overlay-option";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "ionx-select",
    host: {
        "class": "select interactive"
    },
    template: `
        <div class="select-inner">
            <div class="select-text" [class.select-placeholder]="values.length == 0">
                <span *ngIf="values.length == 0; else showValues">{{placeholder}}</span>
                <ng-template #showValues>
                    <ng-template ngFor [ngForOf]="values" let-value let-index="index">
                        <span *ngIf="index > 0 && (!labelTemplate || labelTemplate.separator)">{{!labelTemplate ? ", " : labelTemplate.separator}}</span>
                        <span *ngIf="!labelTemplate; else hasLabelTemplate">{{labelImpl$(value)}}</span>
                        <ng-template #hasLabelTemplate>
                            <ng-container *ngTemplateOutlet="labelTemplate.templateRef; context: {$implicit: value, index: index}"></ng-container>
                        </ng-template>
                    </ng-template>
                </ng-template>
            </div>
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


    private _disabled: boolean;

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

    values: any[] = [];

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

    private muteOnChange: boolean;

    writeValue(value: any): void {
        this.muteOnChange = true;
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


    @ContentChild(SelectLabel)
    // @ts-ignore
    private labelTemplate: SelectLabel;

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

    private isValueSelected(value: any) {

        for (let v of this.values || []) {
            if (this.valueComparator(value, v)) {
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
        if (this.options instanceof SelectOptions) {
            for (let option of this.options) {
                options.push({value: option.value, checked: option.value ? this.isValueSelected(option.value) : false, label: option.label ? option.label : ((!this.searchTest || !this.labelTemplate) ? this.labelImpl$(option.value) : undefined), disabled: option.disabled, divider: option.divider});
            }

        } else if (this.options) {
            for (let option of this.options) {
                options.push({value: option, checked: this.isValueSelected(option), label: !this.labelTemplate || !this.searchTest ? this.labelImpl$(option) : undefined});
            }

        } else if (this.optionsComponents) {
            for (let option of this.optionsComponents.toArray()) {
                options.push({value: option.value, checked: this.isValueSelected(option.value), label: option.label, divider: !!option.divider});
            }

        }

        let overlayTitle: string;
        if (this.title) {
            overlayTitle = this.title;
        } else if (this.listItem) {
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
            label: this.labelTemplate,
            orderable: !!this.orderable,
            valueValidator: this.checkValidator,
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

        if (changes.options) {
            this.cachedLabels = undefined;
        }
    }

    ngOnInit() {
        //this.updateText();

        if (this.listItem) {
            this.listItem.classList.add("item-select", "item-interactive");
            this.element.nativeElement.classList.add("in-item");
        }
    }

}
