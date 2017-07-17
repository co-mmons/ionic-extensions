import {Component, ViewChild, ViewChildren, QueryList} from "@angular/core";
import {Option, NavParams, ViewController, Searchbar, Item, Content} from "ionic-angular";
import {IntlService} from "@co.mmons/angular-intl";

@Component({
    selector: "ionx-select-overlay",
    template: `
        <ion-header>
            <ion-searchbar cancelButtonText="{{'commons.cancel' | intlMessage}}" placeholder="{{'commons#Search' | intlMessage}}" (ionInput)="search($event)"></ion-searchbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ng-template ngFor [ngForOf]="options" let-option>
                    <ion-item *ngIf="!option.hidden">
                        <ion-label>{{option.label}}</ion-label>
                        <ion-checkbox [(ngModel)]="option.checked" (ionChange)="optionClicked(option)"></ion-checkbox>
                    </ion-item>
                </ng-template>
            </ion-list>
        </ion-content>
        <ion-footer>
            <div class="ionx-select-overlay-buttons">
                <button ion-button clear (click)="cancelClicked()">{{"commons#Cancel" | intlMessage}}</button>
                <button ion-button clear (click)="okClicked()">{{"commons#Ok" | intlMessage}}</button>
            </div>
        </ion-footer>
    `
})
export class SelectOverlay {

    constructor(navParams: NavParams, private intl: IntlService, private viewController: ViewController) {
        this.options = navParams.get("options");
        this.multiple = navParams.get("multiple");
    }

	@ViewChild(Content)
	content: Content;

	@ViewChildren(Item)
	items: QueryList<Item>;

    multiple: boolean = false;

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

	ionViewDidEnter() {
		let items = this.items.toArray();
		let itemToScroll: HTMLElement;

		for (let i = 0; i < items.length; i++) {
			
			if ((<HTMLElement>items[i].getNativeElement()).classList.contains("item-checkbox-checked")) {

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