import {Component, ViewChild, ViewChildren, QueryList} from "@angular/core";
import {Option, NavParams, ViewController, Searchbar, Item, Content, Config, reorderArray} from "ionic-angular";
import {IntlService} from "@co.mmons/angular-intl";

@Component({
    selector: "ionx-select-modal",
    template: `
        <ion-header>
            <ion-toolbar>
                <ion-title>{{title}}</ion-title>

                <ion-buttons left>
                    <button ion-button icon-only (click)="cancelClicked()">
                        <ion-icon name="close"></ion-icon>
                    </button>
                </ion-buttons>

            </ion-toolbar>
            <ion-toolbar>
                <ion-searchbar ionx-flat cancelButtonText="{{'@co.mmons/js-intl#Cancel' | intlMessage}}" placeholder="{{'@co.mmons/js-intl#Search' | intlMessage}}" (ionInput)="search($event)"></ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ionx-spinner fill ion-fixed *ngIf="!options"></ionx-spinner>
            <ion-list>
                
                <ion-item-group [reorder]="optionsChecked.length > 1" (ionItemReorder)="reordered($event)" *ngIf="ordered && optionsChecked && optionsChecked.length && visibleCheckedOptionsCount">
                    <ng-template ngFor [ngForOf]="optionsChecked" let-option>
                        <ion-item *ngIf="!option.hidden" [class.ionx-select-checked]="true">
                            <ion-label>{{option.label}}</ion-label>
                            <ion-checkbox [(ngModel)]="option.checked" (ionChange)="optionClicked(option)"></ion-checkbox>
                        </ion-item>
                    </ng-template>
                </ion-item-group>

                <ion-item-group *ngIf="visibleOptionsCount">
                    <ng-template ngFor [ngForOf]="options" let-option>
                        <ion-item *ngIf="!option.hidden && (!ordered || !option.checked)" [class.ionx-select-checked]="option.checked">
                            <ion-label>{{option.label}}</ion-label>
                            <ion-checkbox [(ngModel)]="option.checked" (ionChange)="optionClicked(option)"></ion-checkbox>
                        </ion-item>
                    </ng-template>
                </ion-item-group>
            </ion-list>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <div class="ionx-select-overlay-buttons alert-button-group">
                    <button ion-button="alert-button" clear (click)="cancelClicked()">{{"@co.mmons/js-intl#Cancel" | intlMessage}}</button>
                    <button ion-button="alert-button" clear (click)="okClicked()">{{"@co.mmons/js-intl#OK" | intlMessage}}</button>
                </div>
            </ion-toolbar>
        </ion-footer>
    `,
    host: {
        "[class.alert]": "true",
        "[class.alert-ios]": "ios",
        "[class.alert-wp]": "wp",
        "[class.alert-md]": "md"
    }
})
export class SelectModal {

    constructor(private navParams: NavParams, private intl: IntlService, private viewController: ViewController, config: Config) {
        this.multiple = this.navParams.get("multiple");
        this.title = this.navParams.get("title") || intl.message("commons-ionic-extensions#Choose...");
        this.ios = config.get("mode") == "ios";
        this.md = config.get("mode") == "md";
        this.wp = config.get("mode") == "wp";
        this.ordered = this.navParams.get("ordered") && this.multiple;
    }

    private ios: boolean;

    private md: boolean;

    private wp: boolean;

    private ordered: boolean;

    private reordered(indexes: {from: number, to: number}) {
        this.optionsChecked = reorderArray(this.optionsChecked, indexes);
    }

	@ViewChild(Content)
	content: Content;

	@ViewChildren(Item)
    items: QueryList<Item>;

    multiple: boolean = false;

    title: any;

    options: any[];

    visibleOptionsCount: number;

    visibleCheckedOptionsCount: number;

    optionsChecked: any[];

    optionClicked(option: any) {

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

    recalculateVisibleOptions() {

        this.visibleCheckedOptionsCount = 0;
        this.visibleOptionsCount = 0;
        
        for (let option of this.options) {

            if (!option.hidden && (!this.ordered || !option.checked)) {
                this.visibleOptionsCount++;
            }

            if (!option.hidden && option.checked) {
                this.visibleCheckedOptionsCount++;
            }
        }

    }

    okClicked() {

        let values = [];

        if (this.ordered) {
            for (let o of this.optionsChecked) {
                values.push(o.value);
            }
        } else {
            for (let o of this.options) {
                if (o.checked) {
                    values.push(o.value);
                }
            }
        }

        this.viewController.dismiss(values);
    }

    cancelClicked() {
        this.viewController.dismiss(undefined);
    }

    @ViewChild(Searchbar)
    searchbar: Searchbar;

    search(ev: any) {

        let query = this.searchbar.value ? this.searchbar.value.toString() : undefined;
        if (query) {
            query = query.trim().toLowerCase();
        }

        for (let o of this.options) {
            o.hidden = query && o.label.toLowerCase().indexOf(query) < 0;
        }

        this.recalculateVisibleOptions();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.items.changes.subscribe(() => this.scrollToSelected());
    }

	ionViewDidEnter() {
        this.options = this.navParams.get("options");
        
        this.optionsChecked = [];
        for (let option of this.options) {
            if (option.checked) {
                this.optionsChecked.push(option);
            }
        }
        this.optionsChecked.sort((a, b) => a.checkedTimestamp - b.checkedTimestamp);

        this.recalculateVisibleOptions();
    }

    private scrollToSelected() {

        let items = this.items.toArray();
		let itemToScroll: HTMLElement;

		for (let i = 0; i < items.length; i++) {
			
			if ((<HTMLElement>items[i].getNativeElement()).classList.contains("ionx-select-checked")) {

				if (i > 5) {
					itemToScroll = items[i - 2].getNativeElement();
				}

				break;
			}
		}

        if (itemToScroll) {
			this.content.scrollTo(0, itemToScroll.offsetTop);
        }
	}


}