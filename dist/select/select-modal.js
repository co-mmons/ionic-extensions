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
import { NavParams, ViewController, Searchbar, Item, Content, Config } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
var SelectModal = (function () {
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
    }
    SelectModal.prototype.optionClicked = function (option) {
        if (!option.checked) {
            return;
        }
        if (!this.multiple) {
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var o = _a[_i];
                if (o.checked && o !== option) {
                    o.checked = false;
                }
            }
        }
    };
    SelectModal.prototype.okClicked = function () {
        var values = [];
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var o = _a[_i];
            if (o.checked) {
                values.push(o.value);
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
    };
    SelectModal.prototype.ngOnInit = function () {
    };
    SelectModal.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.items.changes.subscribe(function () { return _this.scrollToSelected(); });
    };
    SelectModal.prototype.ionViewDidEnter = function () {
        this.options = this.navParams.get("options");
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
            template: "\n        <ion-header>\n            <ion-toolbar>\n                <ion-title>{{title}}</ion-title>\n\n                <ion-buttons left>\n                    <button ion-button icon-only (click)=\"cancelClicked()\">\n                        <ion-icon name=\"close\"></ion-icon>\n                    </button>\n                </ion-buttons>\n\n            </ion-toolbar>\n            <ion-toolbar>\n                <ion-searchbar ionx-flat cancelButtonText=\"{{'commons.cancel' | intlMessage}}\" placeholder=\"{{'commons#Search' | intlMessage}}\" (ionInput)=\"search($event)\"></ion-searchbar>\n            </ion-toolbar>\n        </ion-header>\n        <ion-content>\n            <ionx-spinner fill ion-fixed *ngIf=\"!options\"></ionx-spinner>\n            <ion-list>\n                <ng-template ngFor [ngForOf]=\"options\" let-option>\n                    <ion-item *ngIf=\"!option.hidden\" [class.ionx-select-checked]=\"option.checked\">\n                        <ion-label>{{option.label}}</ion-label>\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ionChange)=\"optionClicked(option)\"></ion-checkbox>\n                    </ion-item>\n                </ng-template>\n            </ion-list>\n        </ion-content>\n        <ion-footer>\n            <ion-toolbar>\n                <div class=\"ionx-select-overlay-buttons alert-button-group\">\n                    <button ion-button=\"alert-button\" clear (click)=\"cancelClicked()\">{{\"commons#Cancel\" | intlMessage}}</button>\n                    <button ion-button=\"alert-button\" clear (click)=\"okClicked()\">{{\"commons#OK\" | intlMessage}}</button>\n                </div>\n            </ion-toolbar>\n        </ion-footer>\n    ",
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