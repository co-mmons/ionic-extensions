import { NgModule, ContentChildren, ContentChild, Renderer, QueryList, Directive, Component, Input, ElementRef, HostListener, Optional, Inject, forwardRef } from "@angular/core";
import { Item } from "ionic-angular";
import { isSelfOrChildOf } from "@co.mmons/web-utils/dom";
var CollapsibleItem = /** @class */ (function () {
    function CollapsibleItem(element, parentList) {
        this.element = element;
        this.parentList = parentList;
    }
    Object.defineProperty(CollapsibleItem.prototype, "expanded", {
        get: function () {
            return this.element.nativeElement.classList.contains("item-expanded");
        },
        set: function (expanded) {
            var alreadyExpanded = this.element.nativeElement.classList.contains("item-expanded");
            if (expanded && !alreadyExpanded) {
                this.element.nativeElement.classList.add("item-expanded");
                if (this.parentList) {
                    this.parentList.expand(this);
                }
            }
            else if (!expanded && alreadyExpanded) {
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
    return CollapsibleItem;
}());
export { CollapsibleItem };
var CollapsibleList = /** @class */ (function () {
    function CollapsibleList() {
    }
    CollapsibleList.prototype.expand = function (itemToExpand) {
        if (this.items) {
            for (var _i = 0, _a = this.items.toArray(); _i < _a.length; _i++) {
                var item = _a[_i];
                if (item === itemToExpand) {
                    item.expanded = true;
                }
                else if (this.accordion) {
                    item.expanded = false;
                }
            }
        }
    };
    CollapsibleList.prototype.ngAfterViewInit = function () {
        // if list is accordion, we need to make sure, that only one item is expanded
        if (this.accordion) {
            // last expanded item
            var lastItem = void 0;
            for (var _i = 0, _a = this.items.toArray(); _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.expanded) {
                    lastItem = item;
                }
            }
            if (lastItem) {
                this.expand(lastItem);
            }
        }
    };
    return CollapsibleList;
}());
export { CollapsibleList };
var CollapsibleListModule = /** @class */ (function () {
    function CollapsibleListModule() {
    }
    return CollapsibleListModule;
}());
export { CollapsibleListModule };
//# sourceMappingURL=index.js.map