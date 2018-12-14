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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
import { Component, ElementRef, Input, Optional, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { scrollIntoView } from "../scroll/scroll-into-view";
import { sleep, waitTill } from "@co.mmons/js-utils/core";
import { Config, ModalController, PopoverController } from "@ionic/angular";
var SelectOverlayContent = /** @class */ (function () {
    function SelectOverlayContent(element, config, intl, popoverController, modalController) {
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.multiple = false;
        this.md = config.get("mode") == "md";
        this.ios = !this.md;
    }
    Object.defineProperty(SelectOverlayContent.prototype, "popoverOverlay", {
        get: function () {
            return this.overlay == "popover";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectOverlayContent.prototype, "modalOverlay", {
        get: function () {
            return this.overlay == "modal";
        },
        enumerable: true,
        configurable: true
    });
    SelectOverlayContent.prototype.reordered = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, group.complete(this.optionsChecked)];
                    case 1:
                        _a.optionsChecked = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SelectOverlayContent.prototype.optionClicked = function (option) {
        this.lastClickedOption = option;
        //console.log("clicked", option);
    };
    SelectOverlayContent.prototype.optionChanged = function (option) {
        if (!this.lastClickedOption || option !== this.lastClickedOption) {
            return;
        }
        if (this.multiple && this.valueValidator) {
            var values = [];
            for (var _i = 0, _a = this.optionsChecked; _i < _a.length; _i++) {
                var o = _a[_i];
                if (o !== option) {
                    values.push(o.value);
                }
            }
            var optionWasChecked = option.checked;
            for (var _b = 0, _c = this.options; _b < _c.length; _b++) {
                var o = _c[_b];
                o.checked = false;
            }
            this.optionsChecked = [];
            VALUES: for (var _d = 0, _e = this.valueValidator(option.value, optionWasChecked, values) || []; _d < _e.length; _d++) {
                var v = _e[_d];
                for (var _f = 0, _g = this.options; _f < _g.length; _f++) {
                    var o = _g[_f];
                    if (this.valueComparator(o.value, v)) {
                        o.checked = true;
                        this.optionsChecked.push(o);
                        continue VALUES;
                    }
                }
            }
            this.recalculateVisibleOptions();
        }
        else {
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
                    for (var _h = 0, _j = this.options; _h < _j.length; _h++) {
                        var o = _j[_h];
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
        }
        if (!this.multiple) {
            this.okClicked();
        }
        this.lastClickedOption = undefined;
    };
    SelectOverlayContent.prototype.recalculateVisibleOptions = function () {
        this.visibleCheckedOptionsCount = 0;
        this.visibleOptionsCount = 0;
        for (var i = 0; i < this.options.length; i++) {
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
            var checked = false;
            for (var _i = 0, _a = this.optionsChecked; _i < _a.length; _i++) {
                var o = _a[_i];
                if (o === this.options[i]) {
                    checked = true;
                    break;
                }
            }
            if (!this.options[i].hidden && (!this.ordered || !checked)) {
                this.visibleOptionsCount++;
            }
            if (!this.options[i].hidden && checked) {
                this.visibleCheckedOptionsCount++;
            }
        }
    };
    SelectOverlayContent.prototype.okClicked = function () {
        var values = [];
        for (var _i = 0, _a = this.optionsChecked; _i < _a.length; _i++) {
            var o = _a[_i];
            values.push(o.value);
        }
        this.updateValues(values);
        if (this.popoverController && this.popoverOverlay) {
            this.popoverController.dismiss();
        }
        else if (this.modalController && this.modalOverlay) {
            this.modalController.dismiss();
        }
    };
    SelectOverlayContent.prototype.cancelClicked = function () {
        if (this.popoverController && this.popoverOverlay) {
            this.popoverController.dismiss();
        }
        else if (this.modalController && this.modalOverlay) {
            this.modalController.dismiss();
        }
    };
    SelectOverlayContent.prototype.search = function (ev) {
        var query = this.searchbar.nativeElement.value ? this.searchbar.nativeElement.value.toString() : undefined;
        if (query) {
            query = query.trim().toLowerCase();
        }
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var o = _a[_i];
            if (!query) {
                o.hidden = false;
            }
            else {
                o.hidden = this.searchHandler ? !this.searchHandler(query, o.value, o.label) : o.label.toLowerCase().indexOf(query) < 0;
            }
        }
        this.recalculateVisibleOptions();
    };
    SelectOverlayContent.prototype.ngOnInit = function () {
        if (this.popoverOverlay) {
            this.initOptions();
        }
        //console.log(this.element.nativeElement.parentElement);
        //this.element.nativeElement.parentElement.style.width = "300px";
    };
    SelectOverlayContent.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parent_1, checkPosition_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.modalOverlay) return [3 /*break*/, 4];
                        parent_1 = this.element.nativeElement.offsetParent;
                        checkPosition_1 = function (lastRect) { return __awaiter(_this, void 0, void 0, function () {
                            var rect;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sleep(100)];
                                    case 1:
                                        _a.sent();
                                        rect = parent_1.getBoundingClientRect();
                                        if (!(rect.bottom != lastRect.bottom || rect.top != lastRect.top || rect.left != lastRect.left || rect.right != lastRect.right)) return [3 /*break*/, 3];
                                        lastRect = rect;
                                        return [4 /*yield*/, checkPosition_1(rect)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3: return [2 /*return*/, true];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, checkPosition_1(parent_1.getBoundingClientRect())];
                    case 1:
                        _a.sent();
                        if (!(!window.cordova || window.cordova.platformId == "browser")) return [3 /*break*/, 3];
                        return [4 /*yield*/, waitTill(function () { return !!_this.searchbar && !!_this.searchbar.nativeElement.querySelector("input"); })];
                    case 2:
                        _a.sent();
                        this.searchbar.nativeElement.setFocus();
                        _a.label = 3;
                    case 3:
                        this.initOptions();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SelectOverlayContent.prototype.initOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, option, items, itemToScroll, i;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.optionsChecked = [];
                        for (_i = 0, _a = this.options; _i < _a.length; _i++) {
                            option = _a[_i];
                            if (option.checked) {
                                this.optionsChecked.push(option);
                            }
                        }
                        //this.optionsChecked.sort((a, b) => a.checkedTimestamp - b.checkedTimestamp);
                        this.recalculateVisibleOptions();
                        if (!(this.optionsChecked.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, waitTill(function () { return !!_this.items && _this.items.length > 0; })];
                    case 1:
                        _b.sent();
                        items = this.items.toArray();
                        itemToScroll = void 0;
                        for (i = 0; i < items.length; i++) {
                            if (items[i].nativeElement.classList.contains("ionx-select-checked")) {
                                if (i > 5) {
                                    itemToScroll = items[i - 2].nativeElement;
                                }
                                break;
                            }
                        }
                        if (itemToScroll) {
                            scrollIntoView(itemToScroll);
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectOverlayContent.prototype, "overlay", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectOverlayContent.prototype, "ordered", void 0);
    __decorate([
        ViewChildren("listItem", { read: ElementRef }),
        __metadata("design:type", QueryList)
    ], SelectOverlayContent.prototype, "items", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectOverlayContent.prototype, "multiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], SelectOverlayContent.prototype, "updateValues", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SelectOverlayContent.prototype, "title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], SelectOverlayContent.prototype, "searchHandler", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], SelectOverlayContent.prototype, "valueValidator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], SelectOverlayContent.prototype, "valueComparator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SelectOverlayContent.prototype, "options", void 0);
    __decorate([
        ViewChild("searchbar", { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], SelectOverlayContent.prototype, "searchbar", void 0);
    SelectOverlayContent = __decorate([
        Component({
            selector: "ionx-select-overlay",
            template: "\n        <ion-header *ngIf=\"modalOverlay\">\n            <ion-toolbar>\n                <ion-title>{{title}}</ion-title>\n\n                <ion-buttons slot=\"start\">\n                    <ion-button (click)=\"cancelClicked()\">\n                        <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n                    </ion-button>\n                </ion-buttons>\n\n                <ion-buttons slot=\"end\">\n                    <ion-button (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n                </ion-buttons>\n\n            </ion-toolbar>\n            <ion-toolbar>\n                <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\" (ionInput)=\"search($event)\"></ion-searchbar>\n            </ion-toolbar>\n        </ion-header>\n        <ion-content [scrollY]=\"modalOverlay\">\n            \n            <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!optionsChecked\">\n                <ion-spinner></ion-spinner>\n            </div>\n\n            <div *ngIf=\"optionsChecked\">\n\n                <ion-reorder-group #self (ionItemReorder)=\"reordered(self)\" *ngIf=\"ordered && optionsChecked && multiple && optionsChecked.length && visibleCheckedOptionsCount\" [disabled]=\"false\">\n                    <ng-template ngFor [ngForOf]=\"optionsChecked\" let-option>\n                        <ion-item *ngIf=\"!option.hidden\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option)\"></ion-checkbox>\n                            <ion-label>{{option.label}}</ion-label>\n                            <ion-reorder slot=\"end\"></ion-reorder>\n                        </ion-item>\n                    </ng-template>\n                </ion-reorder-group>\n\n                <ion-item-group *ngIf=\"visibleOptionsCount\">\n                    <ng-template ngFor [ngForOf]=\"options\" let-option>\n                        <ion-item-divider *ngIf=\"md && option.divider && !option.hidden\"><ion-label>{{option.label}}</ion-label></ion-item-divider>\n                        <ion-list-header *ngIf=\"ios && option.divider && !option.hidden\"><ion-label>{{option.label}}</ion-label></ion-list-header>\n                        <ion-item #listItem *ngIf=\"!option.divider && !option.hidden && (!ordered || !option.checked)\" [class.ionx-select-checked]=\"option.checked\">\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionClicked(option)\" (ionChange)=\"optionChanged(option)\"></ion-checkbox>\n                            <ion-label>{{option.label}}</ion-label>\n                        </ion-item>\n                    </ng-template>\n                </ion-item-group>\n\n            </div>\n\n        </ion-content>\n    "
        }),
        __param(3, Optional()), __param(4, Optional()),
        __metadata("design:paramtypes", [ElementRef, Config, IntlService, PopoverController, ModalController])
    ], SelectOverlayContent);
    return SelectOverlayContent;
}());
export { SelectOverlayContent };
//# sourceMappingURL=select-overlay.js.map