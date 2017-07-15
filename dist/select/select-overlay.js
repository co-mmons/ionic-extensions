var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { NavParams, ViewController, Searchbar } from "ionic-angular";
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
    return SelectOverlay;
}());
__decorate([
    ViewChild(Searchbar),
    __metadata("design:type", Searchbar)
], SelectOverlay.prototype, "searchbar", void 0);
SelectOverlay = __decorate([
    Component({
        selector: "ionx-select-overlay",
        template: "\n        <ion-header>\n            <ion-searchbar cancelButtonText=\"{{'commons.cancel' | intlMessage}}\" placeholder=\"{{'commons.search' | intlMessage}}\" (ionInput)=\"search($event)\"></ion-searchbar>\n        </ion-header>\n        <ion-content>\n            <ion-list>\n                <ng-template ngFor [ngForOf]=\"options\" let-option>\n                    <ion-item *ngIf=\"!option.hidden\" (click)=\"optionClicked(option)\">\n                        <ion-label>{{option.label}}</ion-label>\n                        <ion-checkbox [(ngModel)]=\"option.checked\"></ion-checkbox>\n                    </ion-item>\n                </ng-template>\n            </ion-list>\n        </ion-content>\n        <ion-footer>\n            <div class=\"ionx-select-overlay-buttons\">\n                <button ion-button clear (click)=\"cancelClicked()\">{{\"commons.cancel\" | intlMessage}}</button>\n                <button ion-button clear (click)=\"okClicked()\">{{\"commons.ok\" | intlMessage}}</button>\n            </div>\n        </ion-footer>\n    "
    }),
    __metadata("design:paramtypes", [NavParams, IntlService, ViewController])
], SelectOverlay);
export { SelectOverlay };
//# sourceMappingURL=select-overlay.js.map