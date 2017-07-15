import {Component, ViewChild} from "@angular/core";
import {Option, NavParams, ViewController, Searchbar} from "ionic-angular";
import {IntlService} from "@co.mmons/angular-intl";

@Component({
    selector: "ionx-select-overlay",
    template: `
        <ion-header>
            <ion-searchbar cancelButtonText="{{'commons.cancel' | intlMessage}}" placeholder="{{'commons.search' | intlMessage}}" (ionInput)="search($event)"></ion-searchbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ng-template ngFor [ngForOf]="options" let-option>
                    <ion-item *ngIf="!option.hidden" (click)="optionClicked(option)">
                        <ion-label>{{option.label}}</ion-label>
                        <ion-checkbox [(ngModel)]="option.checked"></ion-checkbox>
                    </ion-item>
                </ng-template>
            </ion-list>
        </ion-content>
        <ion-footer>
            <div class="ionx-select-overlay-buttons">
                <button ion-button clear (click)="cancelClicked()">{{"commons.cancel" | intlMessage}}</button>
                <button ion-button clear (click)="okClicked()">{{"commons.ok" | intlMessage}}</button>
            </div>
        </ion-footer>
    `
})
export class SelectOverlay {

    constructor(navParams: NavParams, private intl: IntlService, private viewController: ViewController) {
        this.options = navParams.get("options");
        this.multiple = navParams.get("multiple");
    }

    multiple: boolean = false;

    options: any[];

    optionClicked(option: Option) {

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
}