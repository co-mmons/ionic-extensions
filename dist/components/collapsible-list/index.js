import { NgModule, ContentChildren, ContentChild, Directive, Component, Input, ElementRef, HostListener, Optional, Inject, forwardRef } from "@angular/core";
import { Item } from "ionic-angular";
import { isSelfOrChildOf } from "co.mmons.typescript-utils/dom";
export var CollapsibleItem = (function () {
    function CollapsibleItem(element, parentList) {
        this.element = element;
        this.parentList = parentList;
    }
    Object.defineProperty(CollapsibleItem.prototype, "expanded", {
        get: function () {
            return this.element.nativeElement.classList.contains("item-expanded");
        },
        set: function (expanded) {
            if (expanded) {
                this.element.nativeElement.classList.add("item-expanded");
            }
            else {
                this.element.nativeElement.classList.remove("item-expanded");
            }
        },
        enumerable: true,
        configurable: true
    });
    CollapsibleItem.prototype.clicked = function (event) {
        if (isSelfOrChildOf(event.target, this.item.getElementRef().nativeElement)) {
            if (!this.expanded) {
                if (this.parentList) {
                    this.parentList.expand(this);
                }
                else {
                    this.expanded = true;
                }
            }
            else {
                this.expanded = false;
            }
        }
    };
    CollapsibleItem.decorators = [
        { type: Component, args: [{
                    selector: "ion-item-collapsible",
                    template: "<ng-content></ng-content>",
                    host: {
                        "class": "item-wrapper"
                    }
                },] },
    ];
    /** @nocollapse */
    CollapsibleItem.ctorParameters = [
        { type: ElementRef, },
        { type: CollapsibleList, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(function () { return CollapsibleList; }),] },] },
    ];
    CollapsibleItem.propDecorators = {
        'item': [{ type: ContentChild, args: [Item,] },],
        'clicked': [{ type: HostListener, args: ["click", ["$event"],] },],
    };
    return CollapsibleItem;
}());
export var CollapsibleList = (function () {
    function CollapsibleList() {
    }
    CollapsibleList.prototype.expand = function (itemToExpand) {
        for (var _i = 0, _a = this.items.toArray(); _i < _a.length; _i++) {
            var item = _a[_i];
            if (item === itemToExpand) {
                item.expanded = true;
            }
            else if (this.accordion) {
                item.expanded = false;
            }
        }
    };
    CollapsibleList.decorators = [
        { type: Directive, args: [{
                    selector: "ion-list[collapsible]"
                },] },
    ];
    /** @nocollapse */
    CollapsibleList.ctorParameters = [];
    CollapsibleList.propDecorators = {
        'items': [{ type: ContentChildren, args: [CollapsibleItem,] },],
        'accordion': [{ type: Input },],
    };
    return CollapsibleList;
}());
export var CollapsibleListModule = (function () {
    function CollapsibleListModule() {
    }
    CollapsibleListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CollapsibleList, CollapsibleItem],
                    exports: [CollapsibleList, CollapsibleItem]
                },] },
    ];
    /** @nocollapse */
    CollapsibleListModule.ctorParameters = [];
    return CollapsibleListModule;
}());
//# sourceMappingURL=index.js.map