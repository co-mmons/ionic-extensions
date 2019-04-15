import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {Component, ElementRef, HostListener, Input, Optional, ViewChild} from "@angular/core";
import {IntlService} from "@co.mmons/angular-intl";
import {waitTill} from "@co.mmons/js-utils/core";
import {ModalController, PopoverController} from "@ionic/angular";
import {Components} from "@ionic/core";
import {SelectLabel} from "./select-label";
import {SelectOverlayOption} from "./select-overlay-option";

@Component({
    selector: "ionx-select-overlay",
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
                <ion-searchbar #searchbar cancelButtonText="{{'@co.mmons/js-intl#Cancel' | intlMessage}}" placeholder="{{'@co.mmons/js-intl#Search' | intlMessage}}"
                               (ionInput)="search($event)"></ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content [scrollY]="false" [scrollX]="false" #content>

            <div class="ionx-select-overlay-spinner" slot="fixed" *ngIf="!checkedOptions">
                <ion-spinner></ion-spinner>
            </div>

            <ng-template [ngIf]="!!visibleOptions">
                <div>

                    <cdk-virtual-scroll-viewport [itemSize]="itemHeight" [style.height.px]="scrollHeight" *ngIf="modalOverlay">

                        <ion-list lines="full">

                            <ion-item detail="false" [button]="!option.divider" [style.fontWeight]="option.divider ? 500 : null" #listItem *cdkVirtualFor="let option of visibleOptions">
                                <ion-checkbox [(ngModel)]="option.checked" (ngModelChange)="optionBeforeChange(option)" (ionChange)="optionChanged(option)" (click)="optionClicked(option, $event)" slot="start"
                                              *ngIf="!option.divider"></ion-checkbox>
                                <ion-label>
                                    <span *ngIf="!label; else customLabel">{{option.label}}</span>
                                    <ng-template #customLabel>
                                        <ng-container *ngTemplateOutlet="label.templateRef; context: {$implicit: option.value}"></ng-container>
                                    </ng-template>
                                </ion-label>
                            </ion-item>
                        </ion-list>

                    </cdk-virtual-scroll-viewport>

                    <ion-list lines="full" *ngIf="popoverOverlay">

                        <ng-template ngFor [ngForOf]="visibleOptions" let-option>

                            <ion-item-divider *ngIf="option.divider; else basicOption">
                                <ion-label>{{option.label}}</ion-label>
                            </ion-item-divider>

                            <ng-template #basicOption>

                                <ion-item detail="false" button="true" #listItem>
                                    <ion-checkbox [(ngModel)]="option.checked" (ngModelChange)="optionBeforeChange(option)" (ionChange)="optionChanged(option)"></ion-checkbox>
                                    <ion-label>
                                        <span *ngIf="!label; else customLabel">{{option.label}}</span>
                                        <ng-template #customLabel>
                                            <ng-container *ngTemplateOutlet="label.templateRef; context: {$implicit: option.value}"></ng-container>
                                        </ng-template>
                                    </ion-label>
                                </ion-item>

                            </ng-template>

                        </ng-template>
                    </ion-list>
                </div>
            </ng-template>

        </ion-content>
    `,
    styles: [
        `:host ::ng-deep .cdk-virtual-scroll-content-wrapper { max-width: 100% }`,
        `:host ::ng-deep .hydrated { visibility: visible }`
    ]
})
export class SelectOverlayContent {

    constructor(
        public element: ElementRef<HTMLElement>,
        protected intl: IntlService,
        @Optional() private popoverController: PopoverController,
        @Optional() private modalController: ModalController
    ) {
    }

    @Input()
    private overlay: string;

    get popoverOverlay() {
        return this.overlay == "popover";
    }

    get modalOverlay() {
        return this.overlay == "modal";
    }

    @ViewChild(CdkVirtualScrollViewport)
    scroll: CdkVirtualScrollViewport;

    scrollHeight: number;

    itemHeight: number;

    @ViewChild("content", {read: ElementRef})
    content: ElementRef<HTMLElement & Components.IonContent>;

    @Input()
    multiple: boolean = false;

    @Input()
    orderable: boolean;

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
    label: SelectLabel;

    @Input()
    options: SelectOverlayOption[];

    @Input()
    empty: boolean;

    visibleOptions: SelectOverlayOption[];

    checkedOptions: SelectOverlayOption[];

    private lastClickedOption: SelectOverlayOption;

    optionDivider(option: SelectOverlayOption, index: number, options: SelectOverlayOption[]) {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i] === option && i > 0 && this.options[i - 1].divider) {
                return this.options[i - 1];
            }
        }
    }

    optionClicked(option: SelectOverlayOption, ev: Event) {

        if (option.checked && !this.empty) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
        }

    }

    optionBeforeChange(option: SelectOverlayOption) {
        this.lastClickedOption = option;
        option.checkedTimestamp = Date.now();
    }

    optionChanged(option: SelectOverlayOption) {

        if (!this.lastClickedOption || option !== this.lastClickedOption) {
            return;
        }

        if (this.multiple && this.valueValidator) {

            let values: any[] = [];
            for (let o of this.checkedOptions) {
                if (o !== option) {
                    values.push(o.value);
                }
            }

            let optionWasChecked = option.checked;

            for (let o of this.options) {
                o.checked = false;
            }

            this.checkedOptions = [];

            VALUES: for (let v of this.valueValidator(option.value, optionWasChecked, values) || []) {
                for (let o of this.options) {
                    if (this.valueComparator(o.value, v)) {
                        o.checked = true;
                        this.checkedOptions.push(o);
                        continue VALUES;
                    }
                }
            }

        } else {

            if (!option.checked) {

                for (let i = 0; i < this.checkedOptions.length; i++) {
                    if (this.checkedOptions[i] === option) {
                        this.checkedOptions.splice(i, 1);
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

                    this.checkedOptions = [option];

                } else {
                    this.checkedOptions.push(option);
                }
            }
        }

        if (!this.multiple) {
            this.okClicked();
        }

        this.lastClickedOption = undefined;
    }

    private buildVisibleOptions() {

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
        }

        this.visibleOptions = [];
        for (let option of this.options) {
            if (!option.hidden) {
                this.visibleOptions.push(option);
            }
        }
    }

    private async initOptions() {

        this.checkedOptions = [];
        for (let option of this.options) {
            if (option.checked) {
                this.checkedOptions.push(option);
            }
        }

        if (this.orderable) {
            this.checkedOptions.sort((a, b) => a.checkedTimestamp - b.checkedTimestamp);
        }

        this.buildVisibleOptions();

        if (this.checkedOptions.length > 0) {

            if (this.modalOverlay) {

                await waitTill(() => !!this.scroll);

                let indexToScroll: number = -1;

                for (let i = 0; i < this.visibleOptions.length; i++) {
                    if (this.visibleOptions[i].checked) {
                        indexToScroll = i;
                        break;
                    }
                }

                this.scroll.scrollToIndex(indexToScroll);
            }
        }
    }

    okClicked() {

        let values = [];

        if (this.orderable) {
            for (let o of this.checkedOptions) {
                values.push(o.value);
            }

        } else {

            OPTIONS: for (let option of this.options) {
                for (let checked of this.checkedOptions) {
                    if (option === checked) {
                        values.push(checked.value);
                        continue OPTIONS;
                    }
                }
            }
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
                o.hidden = this.searchHandler ? !this.searchHandler(query, o.value, o.label) : (o.label || "").toLowerCase().indexOf(query) < 0;
            }
        }

        this.buildVisibleOptions();
    }

    ngOnInit() {

        if (this.popoverOverlay) {
            this.initOptions();
        } else {

            const modal = this.element.nativeElement.closest("ion-modal");

            if (modal.classList.contains("modal-ios")) {
                this.itemHeight = 44.55;
            } else {
                this.itemHeight = 49;
            }
        }
    }

    @HostListener("window:resize")
    private async resetScrollHeight() {

        const oldHeight = this.scrollHeight;
        let newHeight = this.content.nativeElement.offsetHeight;

        if (newHeight == oldHeight) {
            await waitTill(() => {
                newHeight = this.content.nativeElement.offsetHeight;
                return newHeight !== oldHeight;
            }, undefined, 2000);
        }

        this.scrollHeight = newHeight;

        if (typeof oldHeight !== "number" && this.scroll) {
            this.scroll.checkViewportSize();
        }
    }

    async ionViewDidEnter() {

        if (this.modalOverlay) {

            this.resetScrollHeight();

            if (!window.cordova || window.cordova.platformId == "browser") {
                await waitTill(() => !!this.searchbar && !!this.searchbar.nativeElement.querySelector("input"));
                this.searchbar.nativeElement.setFocus();
            }

            this.initOptions();
        }
    }

}
