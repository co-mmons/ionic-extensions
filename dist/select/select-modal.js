var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ViewChild, ViewChildren, QueryList } from "@angular/core";
import { NavParams, ViewController, Searchbar, Item, Content, Config, reorderArray } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
import { waitTill } from "@co.mmons/js-utils/core/wait";
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
        this.alwaysArrayResult = !!this.navParams.get("alwaysArrayResult");
        this.selectionValidator = this.navParams.get("selectionValidator");
        this.searchHandler = this.navParams.get("searchHandler");
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
        if (this.selectionValidator) {
            this.selectionValidator(option, this.options);
        }
    };
    SelectModal.prototype.recalculateVisibleOptions = function () {
        this.visibleCheckedOptionsCount = 0;
        this.visibleOptionsCount = 0;
        for (var i = 0; i < this.options.length; i++) {
            // check, whether divider can be shown
            if (this.options[i].divider) {
                this.options[i].hidden = true;
                if (this.options.length - 1 > i) {
                    for (var ii = i + 1; ii < this.options.length; ii++) {
                        if (this.options[ii].divider) {
                            break;
                        }
                        if (!this.options[ii].hidden) {
                            this.options[i].hidden = false;
                            break;
                        }
                    }
                }
            }
            if (!this.options[i].hidden && (!this.ordered || !this.options[i].checked)) {
                this.visibleOptionsCount++;
            }
            if (!this.options[i].hidden && this.options[i].checked) {
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
        if (this.multiple || this.alwaysArrayResult) {
            this.viewController.dismiss(values);
        }
        else {
            this.viewController.dismiss(values.length > 0 ? values[0] : undefined);
        }
    };
    SelectModal.prototype.cancelClicked = function () {
        this.viewController.dismiss(undefined);
    };
    SelectModal.prototype.search = function (ev) {
        var query = this.searchbar.value ? this.searchbar.value.toString() : undefined;
        if (query) {
            query = query.trim().toLowerCase();
        }
        if (this.searchHandler) {
            this.searchHandler(query, this.options);
        }
        else {
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var o = _a[_i];
                o.hidden = query && o.label.toLowerCase().indexOf(query) < 0;
            }
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _i, _a, option;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.options = this.navParams.get("options");
                        this.optionsChecked = [];
                        for (_i = 0, _a = this.options; _i < _a.length; _i++) {
                            option = _a[_i];
                            if (option.checked) {
                                this.optionsChecked.push(option);
                            }
                        }
                        this.optionsChecked.sort(function (a, b) { return a.checkedTimestamp - b.checkedTimestamp; });
                        this.recalculateVisibleOptions();
                        return [4 /*yield*/, waitTill(function () { return !!_this.searchbar; })];
                    case 1:
                        _b.sent();
                        this.searchbar.setFocus();
                        return [2 /*return*/];
                }
            });
        });
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
            template: "\n        <ion-header>\n            <ion-toolbar>\n                <ion-title>{{title}}</ion-title>\n\n                <ion-buttons left>\n                    <button ion-button icon-only (click)=\"cancelClicked()\">\n                        <ion-icon name=\"close\"></ion-icon>\n                    </button>\n                </ion-buttons>\n\n                <ion-buttons right>\n                    <button ion-button (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</button>\n                    <button ion-button (click)=\"okClicked()\">{{\"@co.mmons/js-intl#OK\" | intlMessage}}</button>\n                </ion-buttons>\n\n            </ion-toolbar>\n            <ion-toolbar>\n                <ion-searchbar ionx-flat cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\" (ionInput)=\"search($event)\"></ion-searchbar>\n            </ion-toolbar>\n        </ion-header>\n        <ion-content>\n            <ionx-spinner fill ion-fixed *ngIf=\"!options\"></ionx-spinner>\n            <ion-list>\n                \n                <ion-item-group [reorder]=\"optionsChecked.length > 1\" (ionItemReorder)=\"reordered($event)\" *ngIf=\"ordered && optionsChecked && optionsChecked.length && visibleCheckedOptionsCount\">\n                    <ng-template ngFor [ngForOf]=\"optionsChecked\" let-option>\n                        <ion-item *ngIf=\"!option.hidden\" [class.ionx-select-checked]=\"true\">\n                            <ion-label>{{option.label}}</ion-label>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ionChange)=\"optionClicked(option)\"></ion-checkbox>\n                        </ion-item>\n                    </ng-template>\n                </ion-item-group>\n\n                <ion-item-group *ngIf=\"visibleOptionsCount\">\n                    <ng-template ngFor [ngForOf]=\"options\" let-option>\n                        <ion-item-divider *ngIf=\"option.divider && !option.hidden\">{{option.label}}</ion-item-divider>\n                        <ion-item *ngIf=\"!option.divider && !option.hidden && (!ordered || !option.checked)\" [class.ionx-select-checked]=\"option.checked\">\n                            <ion-label>{{option.label}}</ion-label>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ionChange)=\"optionClicked(option)\"></ion-checkbox>\n                        </ion-item>\n                    </ng-template>\n                </ion-item-group>\n            </ion-list>\n        </ion-content>\n    ",
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