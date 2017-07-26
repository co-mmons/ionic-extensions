import {Component, ViewChild, ViewChildren, QueryList} from "@angular/core";
import {Option, NavParams, ViewController, Searchbar, Item, Content, Config} from "ionic-angular";
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
                <ion-searchbar ionx-flat cancelButtonText="{{'commons.cancel' | intlMessage}}" placeholder="{{'commons#Search' | intlMessage}}" (ionInput)="search($event)"></ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ionx-spinner fill ion-fixed *ngIf="!options"></ionx-spinner>
            <ion-list>
                <ng-template ngFor [ngForOf]="options" let-option>
                    <ion-item *ngIf="!option.hidden" [class.ionx-select-checked]="option.checked">
                        <ion-label>{{option.label}}</ion-label>
                        <ion-checkbox [(ngModel)]="option.checked" (ionChange)="optionClicked(option)"></ion-checkbox>
                    </ion-item>
                </ng-template>
            </ion-list>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <div class="ionx-select-overlay-buttons alert-button-group">
                    <button ion-button="alert-button" clear (click)="cancelClicked()">{{"commons#Cancel" | intlMessage}}</button>
                    <button ion-button="alert-button" clear (click)="okClicked()">{{"commons#OK" | intlMessage}}</button>
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
    }

    private ios: boolean;

    private md: boolean;

    private wp: boolean;

	@ViewChild(Content)
	content: Content;

	@ViewChildren(Item)
    items: QueryList<Item>;

    multiple: boolean = false;

    title: any;

    options: any[];

    optionClicked(option: any) {

        if (!option.checked) {
            return;
        }

        if (!this.multiple) {

            for (let o of this.options) {
                if (o.checked && o !== option) {
                    o.checked = false;
                }
            }
        }

    }

    okClicked() {

        let values = [];
        for (let o of this.options) {
            if (o.checked) {
                values.push(o.value);
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
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.items.changes.subscribe(() => this.scrollToSelected());
    }

	ionViewDidEnter() {
        this.options = this.navParams.get("options");
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