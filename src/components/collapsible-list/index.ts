import {
    NgModule, ContentChildren, ContentChild,
    Renderer, QueryList, Directive, Component, Input,
    ElementRef, HostListener, Optional, Inject, forwardRef
} from "@angular/core";

import { Item } from "ionic-angular";

import { isSelfOrChildOf } from "co.mmons.typescript-utils/dom";

@Component({
    selector: "ion-item-collapsible",
    template: "<ng-content></ng-content>",
    host: {
        "class": "item-wrapper"
    }
})
export class CollapsibleItem {

    constructor(private element: ElementRef, @Optional() @Inject(forwardRef(() => CollapsibleList)) private parentList?: CollapsibleList) {
    }

    @ContentChild(Item)
    item: Item;

    @Input("expanded")
    set expanded(expanded: boolean) {

        let alreadyExpanded = this.element.nativeElement.classList.contains("item-expanded");

        if (expanded && !alreadyExpanded) {
            this.element.nativeElement.classList.add("item-expanded");

            if (this.parentList) {
                this.parentList.expand(this);
            }

        } else if (!expanded && alreadyExpanded) {
            this.element.nativeElement.classList.remove("item-expanded");
        }
    }

    get expanded() {
        return this.element.nativeElement.classList.contains("item-expanded");
    }

    @HostListener("click", ["$event"])
    clicked(event: Event) {

        if (isSelfOrChildOf(event.target, this.item.getElementRef().nativeElement)) {

            if (!this.expanded) {
                if (this.parentList) {
                    this.parentList.expand(this);
                } else {
                    this.expanded = true;
                }
            } else {
                this.expanded = false;
            }
        }
    }
}

@Directive({
    selector: "ion-list[collapsible]"
})
export class CollapsibleList {

    @ContentChildren(CollapsibleItem)
    items: QueryList<CollapsibleItem>

    @Input()
    accordion: boolean;

    expand(itemToExpand: CollapsibleItem) {

        if (this.items) {
            for (let item of this.items.toArray()) {
                if (item === itemToExpand) {
                    item.expanded = true;
                } else if (this.accordion) {
                    item.expanded = false;
                }
            }
        }
    }

    ngAfterViewInit() {

        // if list is accordion, we need to make sure, that only one item is expanded        
        if (this.accordion) {

            // last expanded item
            let lastItem: CollapsibleItem;

            for (let item of this.items.toArray()) {

                if (item.expanded) {
                    lastItem = item;
                }
            }

            if (lastItem) {
                this.expand(lastItem);
            }
        }
    }
}

@NgModule({
    declarations: [CollapsibleList, CollapsibleItem],
    bootstrap: [CollapsibleItem],
    exports: [CollapsibleList, CollapsibleItem]
})
export class CollapsibleListModule {

}
