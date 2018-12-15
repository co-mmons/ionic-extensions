import {ChangeDetectionStrategy, Component, ElementRef, Input, Optional, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {IntlService} from "@co.mmons/angular-intl";
import {sleep, waitTill} from "@co.mmons/js-utils/core";
import {Config, IonReorderGroup, ModalController, PopoverController} from "@ionic/angular";
import {scrollIntoView} from "../scroll/scroll-into-view";
import {SelectOverlayOption} from "./select-overlay-option";

@Component({
    selector: "ionx-select-overlay",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ion-header *ngIf="modalOverlay">
            <ion-toolbar>
                <ion-title>{{title}}</ion-title>

                <ion-buttons slot="start">
                    <ion-button (click)="cancelClicked()">
                        <ion-icon name="close" slot="icon-only"></ion-icon>
                    </ion-button>
                </ion-buttons>

                <ion-buttons slot="end">
                    <ion-button (click)="okClicked()">{{"@co.mmons/js-intl#Done" | intlMessage}}</ion-button>
                </ion-buttons>

            </ion-toolbar>
            <ion-toolbar>
                <ion-searchbar #searchbar cancelButtonText="{{'@co.mmons/js-intl#Cancel' | intlMessage}}" placeholder="{{'@co.mmons/js-intl#Search' | intlMessage}}" (ionInput)="search($event)"></ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content [scrollY]="modalOverlay">
            
            <div class="ionx-select-overlay-spinner" slot="fixed" *ngIf="!optionsChecked">
                <ion-spinner></ion-spinner>
            </div>

            <div *ngIf="optionsChecked">

                <ion-reorder-group #self (ionItemReorder)="reordered(self)" *ngIf="ordered && optionsChecked && multiple && optionsChecked.length && visibleCheckedOptionsCount" [disabled]="false">
                    <ng-template ngFor [ngForOf]="optionsChecked" let-option>
                        <ion-item *ngIf="!option.hidden" #listItem>
                            <ion-checkbox [(ngModel)]="option.checked" (ionChange)="optionChanged(option)" (click)="optionClicked(option)"></ion-checkbox>
                            <ion-label>{{option.label}}</ion-label>
                            <ion-reorder slot="end"></ion-reorder>
                        </ion-item>
                    </ng-template>
                </ion-reorder-group>

                <ion-item-group *ngIf="visibleOptionsCount">
                    <ng-template ngFor [ngForOf]="options" let-option>
                        <ion-item-divider *ngIf="md && option.divider && !option.hidden"><ion-label>{{option.label}}</ion-label></ion-item-divider>
                        <ion-list-header *ngIf="ios && option.divider && !option.hidden"><ion-label>{{option.label}}</ion-label></ion-list-header>
                        <ion-item #listItem *ngIf="!option.divider && !option.hidden && (!ordered || !option.checked)" [class.ionx-select-checked]="option.checked">
                            <ion-checkbox [(ngModel)]="option.checked" (ngModelChange)="optionClicked(option)" (ionChange)="optionChanged(option)"></ion-checkbox>
                            <ion-label>{{option.label}}</ion-label>
                        </ion-item>
                    </ng-template>
                </ion-item-group>

            </div>

        </ion-content>
    `
})
export class SelectOverlayContent {

    constructor(private element: ElementRef<HTMLElement>, config: Config, protected intl: IntlService, @Optional() private popoverController: PopoverController, @Optional() private modalController: ModalController) {
        this.md = config.get("mode") == "md";
        this.ios = !this.md;
    }

    readonly md: boolean;
    readonly ios: boolean;

    @Input()
    private overlay: string;

    get popoverOverlay() {
        return this.overlay == "popover";
    }

    get modalOverlay() {
        return this.overlay == "modal";
    }

    @Input()
    ordered: boolean;

    async reordered(group: IonReorderGroup) {
        this.optionsChecked = await group.complete(this.optionsChecked);
    }

    @ViewChildren("listItem", {read: ElementRef})
    items: QueryList<ElementRef<HTMLIonItemElement>>;

    @Input()
    multiple: boolean = false;

    @Input()
    updateValues: (values: any[]) => void;

    @Input()
    title: any;

    @Input()
    searchHandler: (query: string, value: any, label: string) => boolean;

    @Input()
    valueValidator: (value: any, checked: boolean, otherValues: any[]) => any[];

    @Input()
    valueComparator: (a: any, b: any) => boolean;

    @Input()
    options: SelectOverlayOption[];

    visibleOptionsCount: number;

    visibleCheckedOptionsCount: number;

    optionsChecked: SelectOverlayOption[];

    private lastClickedOption: SelectOverlayOption;

    optionClicked(option: SelectOverlayOption) {
        this.lastClickedOption = option;
        //console.log("clicked", option);
    }

    optionChanged(option: SelectOverlayOption) {

        if (!this.lastClickedOption || option !== this.lastClickedOption) {
            return;
        }

        if (this.multiple && this.valueValidator) {

            let values: any[] = [];
            for (let o of this.optionsChecked) {
                if (o !== option) {
                    values.push(o.value);
                }
            }

            let optionWasChecked = option.checked;

            for (let o of this.options) {
                o.checked = false;
            }

            this.optionsChecked = [];

            VALUES: for (let v of this.valueValidator(option.value, optionWasChecked, values) || []) {
                for (let o of this.options) {
                    if (this.valueComparator(o.value, v)) {
                        o.checked = true;
                        this.optionsChecked.push(o);
                        continue VALUES;
                    }
                }
            }

            this.recalculateVisibleOptions();

        } else {

            if (!option.checked) {

                for (let i = 0; i < this.optionsChecked.length; i++) {
                    if (this.optionsChecked[i] === option) {
                        this.optionsChecked.splice(i, 1);
                        break;
                    }
                }

            } else {

                if (!this.multiple) {

                    for (let o of this.options) {
                        if (o.checked && o !== option) {
                            o.checked = false;
                        }
                    }

                    this.optionsChecked = [option];

                } else {
                    this.optionsChecked.push(option);
                }
            }

            this.recalculateVisibleOptions();
        }

        if (!this.multiple) {
            this.okClicked();
        }

        this.lastClickedOption = undefined;
    }

    recalculateVisibleOptions() {

        this.visibleCheckedOptionsCount = 0;
        this.visibleOptionsCount = 0;

        for (let i = 0; i < this.options.length; i++) {

            if (this.options[i].divider) {
                this.options[i].hidden = true;
                if (this.options.length - 1 > i) {
                    for (let ii = i + 1; ii < this.options.length; ii++) {

                        if (this.options[ii].divider) {
                            break;
                        }

                        if (!this.options[ii].hidden) {
                            this.options[i].hidden = false;
                            break;
                        }
                    }
                }
            }

            let checked = false;
            for (let o of this.optionsChecked) {
                if (o === this.options[i]) {
                    checked = true;
                    break;
                }
            }

            if (!this.options[i].hidden && (!this.ordered || !checked)) {
                this.visibleOptionsCount++;
            }

            if (!this.options[i].hidden && checked) {
                this.visibleCheckedOptionsCount++;
            }
        }

    }

    okClicked() {

        let values = [];

        for (let o of this.optionsChecked) {
            values.push(o.value);
        }

        this.updateValues(values);

        if (this.popoverController && this.popoverOverlay) {
            this.popoverController.dismiss();
        } else if (this.modalController && this.modalOverlay) {
            this.modalController.dismiss();
        }
    }

    cancelClicked() {
        if (this.popoverController && this.popoverOverlay) {
            this.popoverController.dismiss();
        } else if (this.modalController && this.modalOverlay) {
            this.modalController.dismiss();
        }
    }

    @ViewChild("searchbar", {read: ElementRef})
    private searchbar: ElementRef<HTMLIonSearchbarElement>;

    search(ev: any) {

        let query = this.searchbar.nativeElement.value ? this.searchbar.nativeElement.value.toString() : undefined;
        if (query) {
            query = query.trim().toLowerCase();
        }

        for (let o of this.options) {
            if (!query) {
                o.hidden = false;
            } else {
                o.hidden = this.searchHandler ? !this.searchHandler(query, o.value, o.label) : o.label.toLowerCase().indexOf(query) < 0;
            }
        }

        this.recalculateVisibleOptions();
    }

    ngOnInit() {
        if (this.popoverOverlay) {
            this.initOptions();
        }
        //console.log(this.element.nativeElement.parentElement);
        //this.element.nativeElement.parentElement.style.width = "300px";
    }

    async ngAfterViewInit() {

        if (this.modalOverlay) {

            // dirty way to check if modal animation finished
            // we check if position didn't change
            let parent = this.element.nativeElement.offsetParent as HTMLElement;
            let checkPosition = async (lastRect: ClientRect) => {
                await sleep(100);

                let rect = parent.getBoundingClientRect();
                if (rect.bottom != lastRect.bottom || rect.top != lastRect.top || rect.left != lastRect.left || rect.right != lastRect.right) {
                    lastRect = rect;
                    await checkPosition(rect);
                } else {
                    return true;
                }
            };

            await checkPosition(parent.getBoundingClientRect());

            if (!window.cordova || window.cordova.platformId == "browser") {
                await waitTill(() => !!this.searchbar && !!this.searchbar.nativeElement.querySelector("input"));
                this.searchbar.nativeElement.setFocus();
            }

            this.initOptions();
        }
    }

    private async initOptions() {

        this.optionsChecked = [];
        for (let option of this.options) {
            if (option.checked) {
                this.optionsChecked.push(option);
            }
        }

        //this.optionsChecked.sort((a, b) => a.checkedTimestamp - b.checkedTimestamp);
        this.recalculateVisibleOptions();

        if (this.optionsChecked.length > 0) {
            await waitTill(() => !!this.items && this.items.length > 0);

            let items = this.items.toArray();
            let itemToScroll: HTMLElement;

            for (let i = 0; i < items.length; i++) {

                if (items[i].nativeElement.classList.contains("ionx-select-checked")) {

                    if (i > 5) {
                        itemToScroll = items[i - 2].nativeElement;
                    }

                    break;
                }
            }
            
            if (itemToScroll) {
                scrollIntoView(itemToScroll);
            }
        }
    }


}