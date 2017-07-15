import { Option, NavParams, ViewController, Searchbar } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
export declare class SelectOverlay {
    private intl;
    private viewController;
    constructor(navParams: NavParams, intl: IntlService, viewController: ViewController);
    multiple: boolean;
    options: any[];
    optionClicked(option: Option): void;
    okClicked(): void;
    cancelClicked(): void;
    searchbar: Searchbar;
    search(ev: any): void;
}
