var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, ContentChildren, ContentChild, QueryList, Directive, Component, Input, ElementRef, HostListener, Optional, Inject, forwardRef } from "@angular/core";
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
    __decorate([
        ContentChild(Item), 
        __metadata('design:type', Item)
    ], CollapsibleItem.prototype, "item", void 0);
    __decorate([
        HostListener("click", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Event]), 
        __metadata('design:returntype', void 0)
    ], CollapsibleItem.prototype, "clicked", null);
    CollapsibleItem = __decorate([
        Component({
            selector: "ion-item-collapsible",
            template: "<ng-content></ng-content>",
            host: {
                "class": "item-wrapper"
            }
        }),
        __param(1, Optional()),
        __param(1, Inject(forwardRef(function () { return CollapsibleList; }))), 
        __metadata('design:paramtypes', [ElementRef, CollapsibleList])
    ], CollapsibleItem);
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
    __decorate([
        ContentChildren(CollapsibleItem), 
        __metadata('design:type', QueryList)
    ], CollapsibleList.prototype, "items", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], CollapsibleList.prototype, "accordion", void 0);
    CollapsibleList = __decorate([
        Directive({
            selector: "ion-list[collapsible]"
        }), 
        __metadata('design:paramtypes', [])
    ], CollapsibleList);
    return CollapsibleList;
}());
export var CollapsibleListModule = (function () {
    function CollapsibleListModule() {
    }
    CollapsibleListModule = __decorate([
        NgModule({
            declarations: [CollapsibleList, CollapsibleItem],
            bootstrap: [CollapsibleItem],
            exports: [CollapsibleList, CollapsibleItem]
        }), 
        __metadata('design:paramtypes', [])
    ], CollapsibleListModule);
    return CollapsibleListModule;
}());
//# sourceMappingURL=index.js.map