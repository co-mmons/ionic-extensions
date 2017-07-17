import { QueryList } from "@angular/core";
import { NavParams, ViewController, Searchbar, Item, Content } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
export declare class SelectOverlay {
    private intl;
    private viewController;
    constructor(navParams: NavParams, intl: IntlService, viewController: ViewController);
    content: Content;
    items: QueryList<Item>;
    multiple: boolean;
    options: any[];
    optionClicked(option: any): void;
    okClicked(): void;
    cancelClicked(): void;
    searchbar: Searchbar;
    search(ev: any): void;
    ionViewDidEnter(): void;
}
