import { QueryList } from "@angular/core";
import { NavParams, ViewController, Searchbar, Item, Content, Config } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
export declare class SelectModal {
    private navParams;
    protected intl: IntlService;
    private viewController;
    constructor(navParams: NavParams, intl: IntlService, viewController: ViewController, config: Config);
    ios: boolean;
    md: boolean;
    wp: boolean;
    ordered: boolean;
    reordered(indexes: {
        from: number;
        to: number;
    }): void;
    content: Content;
    items: QueryList<Item>;
    multiple: boolean;
    alwaysArrayResult: boolean;
    title: any;
    searchHandler: any;
    selectionValidator: any;
    options: any[];
    visibleOptionsCount: number;
    visibleCheckedOptionsCount: number;
    optionsChecked: any[];
    optionClicked(option: any): void;
    recalculateVisibleOptions(): void;
    okClicked(): void;
    cancelClicked(): void;
    searchbar: Searchbar;
    search(ev: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ionViewDidEnter(): Promise<void>;
    private scrollToSelected();
}
