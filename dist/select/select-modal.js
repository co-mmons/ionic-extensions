var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ViewChildren, QueryList } from "@angular/core";
import { NavParams, ViewController, Searchbar, Item, Content, Config, reorderArray } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
var SelectModal = /** @class */ (function () {
    function SelectModal(navParams, intl, viewController, config) {
        this.navParams = navParams;
        this.intl = intl;
        this.viewController = viewController;
        this.multiple = false;
        this.multiple = this.navParams.get("multiple");
        this.title = this.navParams.get("title") || intl.message("commons-ionic-extensions#Choose...");
        this.ios = config.get("mode") == "ios";
        this.md = config.get("mode") == "md";
        this.wp = config.get("mode") == "wp";
        this.ordered = this.navParams.get("ordered") && this.multiple;
    }
    SelectModal.prototype.reordered = function (indexes) {
        this.optionsChecked = reorderArray(this.optionsChecked, indexes);
    };
    SelectModal.prototype.optionClicked = function (option) {
        if (!option.checked) {
            for (var i = 0; i < this.optionsChecked.length; i++) {
                if (this.optionsChecked[i] === option) {
                    this.optionsChecked.splice(i, 1);
                    break;
                }
            }
        }
        else {
            if (!this.multiple) {
                for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                    var o = _a[_i];
                    if (o.checked && o !== option) {
                        o.checked = false;
                    }
                }
                this.optionsChecked = [option];
            }
            else {
                this.optionsChecked.push(option);
            }
        }
        this.recalculateVisibleOptions();
    };
    SelectModal.prototype.recalculateVisibleOptions = function () {
        this.visibleCheckedOptionsCount = 0;
        this.visibleOptionsCount = 0;
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (!option.hidden && (!this.ordered || !option.checked)) {
                this.visibleOptionsCount++;
            }
            if (!option.hidden && option.checked) {
                this.visibleCheckedOptionsCount++;
            }
        }
    };
    SelectModal.prototype.okClicked = function () {
        var values = [];
        if (this.ordered) {
            for (var _i = 0, _a = this.optionsChecked; _i < _a.length; _i++) {
                var o = _a[_i];
                values.push(o.value);
            }
        }
        else {
            for (var _b = 0, _c = this.options; _b < _c.length; _b++) {
                var o = _c[_b];
                if (o.checked) {
                    values.push(o.value);
                }
            }
        }
        this.viewController.dismiss(values);
    };
    SelectModal.prototype.cancelClicked = function () {
        this.viewController.dismiss(undefined);
    };
    SelectModal.prototype.search = function (ev) {
        var query = this.searchbar.value ? this.searchbar.value.toString() : undefined;
        if (query) {
            query = query.trim().toLowerCase();
        }
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var o = _a[_i];
            o.hidden = query && o.label.toLowerCase().indexOf(query) < 0;
        }
        this.recalculateVisibleOptions();
    };
    SelectModal.prototype.ngOnInit = function () {
    };
    SelectModal.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.items.changes.subscribe(function () { return _this.scrollToSelected(); });
    };
    SelectModal.prototype.ionViewDidEnter = function () {
        this.options = this.navParams.get("options");
        this.optionsChecked = [];
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (option.checked) {
                this.optionsChecked.push(option);
            }
        }
        this.optionsChecked.sort(function (a, b) { return a.checkedTimestamp - b.checkedTimestamp; });
        this.recalculateVisibleOptions();
    };
    SelectModal.prototype.scrollToSelected = function () {
        var items = this.items.toArray();
        var itemToScroll;
        for (var i = 0; i < items.length; i++) {
            if (items[i].getNativeElement().classList.contains("ionx-select-checked")) {
                if (i > 5) {
                    itemToScroll = items[i - 2].getNativeElement();
                }
                break;
            }
        }
        if (itemToScroll) {
            this.content.scrollTo(0, itemToScroll.offsetTop);
        }
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], SelectModal.prototype, "content", void 0);
    __decorate([
        ViewChildren(Item),
        __metadata("design:type", QueryList)
    ], SelectModal.prototype, "items", void 0);
    __decorate([
        ViewChild(Searchbar),
        __metadata("design:type", Searchbar)
    ], SelectModal.prototype, "searchbar", void 0);
    SelectModal = __decorate([
        Component({
            selector: "ionx-select-modal",
            template: "\n        <ion-header>\n            <ion-toolbar>\n                <ion-title>{{title}}</ion-title>\n\n                <ion-buttons left>\n                    <button ion-button icon-only (click)=\"cancelClicked()\">\n                        <ion-icon name=\"close\"></ion-icon>\n                    </button>\n                </ion-buttons>\n\n            </ion-toolbar>\n            <ion-toolbar>\n                <ion-searchbar ionx-flat cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\" (ionInput)=\"search($event)\"></ion-searchbar>\n            </ion-toolbar>\n        </ion-header>\n        <ion-content>\n            <ionx-spinner fill ion-fixed *ngIf=\"!options\"></ionx-spinner>\n            <ion-list>\n                \n                <ion-item-group [reorder]=\"optionsChecked.length > 1\" (ionItemReorder)=\"reordered($event)\" *ngIf=\"ordered && optionsChecked && optionsChecked.length && visibleCheckedOptionsCount\">\n                    <ng-template ngFor [ngForOf]=\"optionsChecked\" let-option>\n                        <ion-item *ngIf=\"!option.hidden\" [class.ionx-select-checked]=\"true\">\n                            <ion-label>{{option.label}}</ion-label>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ionChange)=\"optionClicked(option)\"></ion-checkbox>\n                        </ion-item>\n                    </ng-template>\n                </ion-item-group>\n\n                <ion-item-group *ngIf=\"visibleOptionsCount\">\n                    <ng-template ngFor [ngForOf]=\"options\" let-option>\n                        <ion-item *ngIf=\"!option.hidden && (!ordered || !option.checked)\" [class.ionx-select-checked]=\"option.checked\">\n                            <ion-label>{{option.label}}</ion-label>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ionChange)=\"optionClicked(option)\"></ion-checkbox>\n                        </ion-item>\n                    </ng-template>\n                </ion-item-group>\n            </ion-list>\n        </ion-content>\n        <ion-footer>\n            <ion-toolbar>\n                <div class=\"ionx-select-overlay-buttons alert-button-group\">\n                    <button ion-button=\"alert-button\" clear (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</button>\n                    <button ion-button=\"alert-button\" clear (click)=\"okClicked()\">{{\"@co.mmons/js-intl#OK\" | intlMessage}}</button>\n                </div>\n            </ion-toolbar>\n        </ion-footer>\n    ",
            host: {
                "[class.alert]": "true",
                "[class.alert-ios]": "ios",
                "[class.alert-wp]": "wp",
                "[class.alert-md]": "md"
            }
        }),
        __metadata("design:paramtypes", [NavParams, IntlService, ViewController, Config])
    ], SelectModal);
    return SelectModal;
}());
export { SelectModal };
//# sourceMappingURL=select-modal.js.map