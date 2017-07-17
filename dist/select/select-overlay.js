import { Component, ViewChild, ViewChildren } from "@angular/core";
import { NavParams, ViewController, Searchbar, Item, Content } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
var SelectOverlay = (function () {
    function SelectOverlay(navParams, intl, viewController) {
        this.intl = intl;
        this.viewController = viewController;
        this.multiple = false;
        this.options = navParams.get("options");
        this.multiple = navParams.get("multiple");
    }
    SelectOverlay.prototype.optionClicked = function (option) {
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
    SelectOverlay.prototype.okClicked = function () {
        var values = [];
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var o = _a[_i];
            if (o.checked) {
                values.push(o.value);
            }
        }
        this.viewController.dismiss(values);
    };
    SelectOverlay.prototype.cancelClicked = function () {
        this.viewController.dismiss(undefined);
    };
    SelectOverlay.prototype.search = function (ev) {
        var query = this.searchbar.value ? this.searchbar.value.toString() : undefined;
        if (query) {
            query = query.trim().toLowerCase();
        }
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var o = _a[_i];
            o.hidden = query && o.label.toLowerCase().indexOf(query) < 0;
        }
    };
    SelectOverlay.prototype.ionViewDidEnter = function () {
        var items = this.items.toArray();
        var itemToScroll;
        for (var i = 0; i < items.length; i++) {
            if (items[i].getNativeElement().classList.contains("item-checkbox-checked")) {
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
    SelectOverlay.decorators = [
        { type: Component, args: [{
                    selector: "ionx-select-overlay",
                    template: "\n        <ion-header>\n            <ion-searchbar cancelButtonText=\"{{'commons.cancel' | intlMessage}}\" placeholder=\"{{'commons#Search' | intlMessage}}\" (ionInput)=\"search($event)\"></ion-searchbar>\n        </ion-header>\n        <ion-content>\n            <ion-list>\n                <ng-template ngFor [ngForOf]=\"options\" let-option>\n                    <ion-item *ngIf=\"!option.hidden\">\n                        <ion-label>{{option.label}}</ion-label>\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ionChange)=\"optionClicked(option)\"></ion-checkbox>\n                    </ion-item>\n                </ng-template>\n            </ion-list>\n        </ion-content>\n        <ion-footer>\n            <div class=\"ionx-select-overlay-buttons\">\n                <button ion-button clear (click)=\"cancelClicked()\">{{\"commons#Cancel\" | intlMessage}}</button>\n                <button ion-button clear (click)=\"okClicked()\">{{\"commons#Ok\" | intlMessage}}</button>\n            </div>\n        </ion-footer>\n    "
                },] },
    ];
    /** @nocollapse */
    SelectOverlay.ctorParameters = function () { return [
        { type: NavParams, },
        { type: IntlService, },
        { type: ViewController, },
    ]; };
    SelectOverlay.propDecorators = {
        'content': [{ type: ViewChild, args: [Content,] },],
        'items': [{ type: ViewChildren, args: [Item,] },],
        'searchbar': [{ type: ViewChild, args: [Searchbar,] },],
    };
    return SelectOverlay;
}());
export { SelectOverlay };
//# sourceMappingURL=select-overlay.js.map