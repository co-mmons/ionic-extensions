import { QueryList, ElementRef } from "@angular/core";
import { Item } from "ionic-angular";
export declare class CollapsibleItem {
    private element;
    private parentList;
    constructor(element: ElementRef, parentList?: CollapsibleList);
    item: Item;
    expanded: boolean;
    clicked(event: Event): void;
}
export declare class CollapsibleList {
    items: QueryList<CollapsibleItem>;
    accordion: boolean;
    expand(itemToExpand: CollapsibleItem): void;
}
export declare class CollapsibleListModule {
}
