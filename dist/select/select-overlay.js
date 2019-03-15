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
import { Component, ElementRef, Input, Optional, ViewChild } from "@angular/core";
import { IntlService } from "@co.mmons/angular-intl";
import { waitTill } from "@co.mmons/js-utils/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { SelectLabel } from "./select-label";
var SelectOverlayContent = /** @class */ (function () {
    function SelectOverlayContent(element, intl, popoverController, modalController) {
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.multiple = false;
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
    SelectOverlayContent.prototype.optionDivider = function (option, index, options) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i] === option && i > 0 && this.options[i - 1].divider) {
                return this.options[i - 1];
            }
        }
    };
    SelectOverlayContent.prototype.optionClicked = function (option) {
        this.lastClickedOption = option;
    };
    SelectOverlayContent.prototype.optionChanged = function (option) {
        if (!this.lastClickedOption || option !== this.lastClickedOption) {
            return;
        }
        if (this.multiple && this.valueValidator) {
            var values = [];
            for (var _i = 0, _a = this.checkedOptions; _i < _a.length; _i++) {
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
            this.checkedOptions = [];
            VALUES: for (var _d = 0, _e = this.valueValidator(option.value, optionWasChecked, values) || []; _d < _e.length; _d++) {
                var v = _e[_d];
                for (var _f = 0, _g = this.options; _f < _g.length; _f++) {
                    var o = _g[_f];
                    if (this.valueComparator(o.value, v)) {
                        o.checked = true;
                        this.checkedOptions.push(o);
                        continue VALUES;
                    }
                }
            }
        }
        else {
            if (!option.checked) {
                for (var i = 0; i < this.checkedOptions.length; i++) {
                    if (this.checkedOptions[i] === option) {
                        this.checkedOptions.splice(i, 1);
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
                    this.checkedOptions = [option];
                }
                else {
                    this.checkedOptions.push(option);
                }
            }
        }
        if (!this.multiple) {
            this.okClicked();
        }
        this.lastClickedOption = undefined;
    };
    SelectOverlayContent.prototype.buildVisibleOptions = function () {
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
        }
        this.visibleOptions = [];
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (!option.hidden && !option.divider) {
                this.visibleOptions.push(option);
            }
        }
    };
    SelectOverlayContent.prototype.initOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, option, indexToScroll, i, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.checkedOptions = [];
                        for (_i = 0, _a = this.options; _i < _a.length; _i++) {
                            option = _a[_i];
                            if (option.checked) {
                                this.checkedOptions.push(option);
                            }
                        }
                        //this.checkedOptions.sort((a, b) => a.checkedTimestamp - b.checkedTimestamp);
                        this.buildVisibleOptions();
                        if (!(this.checkedOptions.length > 0)) return [3 /*break*/, 4];
                        if (!this.modalOverlay) return [3 /*break*/, 4];
                        return [4 /*yield*/, waitTill(function () { return !!_this.scroll; })];
                    case 1:
                        _c.sent();
                        indexToScroll = -1;
                        for (i = 0; i < this.visibleOptions.length; i++) {
                            if (this.visibleOptions[i].checked) {
                                indexToScroll = i;
                                break;
                            }
                        }
                        if (!(indexToScroll > 10)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.content.nativeElement.getScrollElement()];
                    case 2:
                        _b = (_c.sent());
                        return [4 /*yield*/, this.scroll.nativeElement.positionForItem(indexToScroll - 4)];
                    case 3:
                        _b.scrollTop = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SelectOverlayContent.prototype.okClicked = function () {
        var values = [];
        if (this.orderable) {
            for (var _i = 0, _a = this.checkedOptions; _i < _a.length; _i++) {
                var o = _a[_i];
                values.push(o.value);
            }
        }
        else {
            OPTIONS: for (var _b = 0, _c = this.options; _b < _c.length; _b++) {
                var option = _c[_b];
                for (var _d = 0, _e = this.checkedOptions; _d < _e.length; _d++) {
                    var checked = _e[_d];
                    if (option === checked) {
                        values.push(checked.value);
                        continue OPTIONS;
                    }
                }
            }
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
                o.hidden = this.searchHandler ? !this.searchHandler(query, o.value, o.label) : (o.label || "").toLowerCase().indexOf(query) < 0;
            }
        }
        this.buildVisibleOptions();
    };
    SelectOverlayContent.prototype.ngOnInit = function () {
        if (this.popoverOverlay) {
            this.initOptions();
        }
    };
    SelectOverlayContent.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.modalOverlay) return [3 /*break*/, 3];
                        if (!(!window.cordova || window.cordova.platformId == "browser")) return [3 /*break*/, 2];
                        return [4 /*yield*/, waitTill(function () { return !!_this.searchbar && !!_this.searchbar.nativeElement.querySelector("input"); })];
                    case 1:
                        _a.sent();
                        this.searchbar.nativeElement.setFocus();
                        _a.label = 2;
                    case 2:
                        this.initOptions();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SelectOverlayContent.prototype, "overlay", void 0);
    __decorate([
        ViewChild("virtualScroll", { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], SelectOverlayContent.prototype, "scroll", void 0);
    __decorate([
        ViewChild("content", { read: ElementRef }),
        __metadata("design:type", ElementRef)
    ], SelectOverlayContent.prototype, "content", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectOverlayContent.prototype, "multiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SelectOverlayContent.prototype, "orderable", void 0);
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
        __metadata("design:type", SelectLabel)
    ], SelectOverlayContent.prototype, "label", void 0);
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
            template: "\n        <ion-header *ngIf=\"modalOverlay\">\n            <ion-toolbar>\n                <ion-title>{{title}}</ion-title>\n\n                <ion-buttons slot=\"start\">\n                    <ion-button (click)=\"cancelClicked()\">\n                        <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n                    </ion-button>\n                </ion-buttons>\n\n                <ion-buttons slot=\"end\">\n                    <ion-button (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n                </ion-buttons>\n\n            </ion-toolbar>\n            <ion-toolbar>\n                <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\" (ionInput)=\"search($event)\"></ion-searchbar>\n            </ion-toolbar>\n        </ion-header>\n        <ion-content [scrollY]=\"modalOverlay\" #content>\n            \n            <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n                <ion-spinner></ion-spinner>\n            </div>\n\n            <ion-list *ngIf=\"visibleOptions\" lines=\"full\">\n                \n                <ng-container *ngIf=\"modalOverlay; else popoverOptions\">\n            \n                    <ion-virtual-scroll [items]=\"visibleOptions\" [headerFn]=\"optionDivider.bind(this)\" #virtualScroll>\n                        <ion-item-divider *virtualHeader=\"let option\">\n                            <ion-label>{{option.label}}</ion-label>\n                        </ion-item-divider>\n    \n                        <ion-item detail=\"false\" button=\"true\" #listItem style=\"opacity: 1\" *virtualItem=\"let option\">\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionClicked(option)\" (ionChange)=\"optionChanged(option)\"></ion-checkbox>\n                            <ion-label>\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n                    </ion-virtual-scroll>\n                    \n                </ng-container>\n                \n                <ng-template #popoverOptions>\n                    \n                    <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n                    \n                        <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                            <ion-label>{{option.label}}</ion-label>\n                        </ion-item-divider>\n                        \n                        <ng-template #basicOption>\n                        \n                            <ion-item detail=\"false\" button=\"true\" #listItem>\n                                <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionClicked(option)\" (ionChange)=\"optionChanged(option)\"></ion-checkbox>\n                                <ion-label>\n                                    <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                    <ng-template #customLabel>\n                                        <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                    </ng-template>\n                                </ion-label>\n                            </ion-item>\n                            \n                        </ng-template>\n                    \n                    </ng-template>\n                \n                </ng-template>\n            </ion-list>\n\n        </ion-content>\n    "
        }),
        __param(2, Optional()), __param(3, Optional()),
        __metadata("design:paramtypes", [ElementRef, IntlService, PopoverController, ModalController])
    ], SelectOverlayContent);
    return SelectOverlayContent;
}());
export { SelectOverlayContent };
//# sourceMappingURL=select-overlay.js.map