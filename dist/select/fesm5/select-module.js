import { __decorate, __extends, __values, __awaiter, __generator, __param } from 'tslib';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { TemplateRef, ViewContainerRef, Input, Directive, ElementRef, Component, ChangeDetectionStrategy, Optional, ViewChild, HostListener, EventEmitter, Output, ContentChild, ContentChildren, NgModule } from '@angular/core';
import { NgControl, FormsModule } from '@angular/forms';
import { MatchMediaModule } from '@co.mmons/angular-extensions/browser/match-media';
import { IntlService, IntlModule } from '@co.mmons/angular-intl';
import { ButtonsModule } from '@co.mmons/ionic-extensions/buttons';
import { PopoverController, ModalController, IonicModule } from '@ionic/angular';
import * as dragula from 'dragula';
import { waitTill } from '@co.mmons/js-utils/core';

var SelectLabel = /** @class */ (function () {
    function SelectLabel(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.separator = ", ";
    }
    SelectLabel.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    __decorate([
        Input()
    ], SelectLabel.prototype, "separator", void 0);
    SelectLabel = __decorate([
        Directive({
            selector: "[ionxSelectLabel]"
        })
    ], SelectLabel);
    return SelectLabel;
}());

var SelectOption = /** @class */ (function () {
    function SelectOption(element) {
        this.element = element;
    }
    Object.defineProperty(SelectOption.prototype, "label", {
        get: function () {
            return this.element.nativeElement.innerText;
        },
        enumerable: true,
        configurable: true
    });
    SelectOption.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], SelectOption.prototype, "value", void 0);
    __decorate([
        Input()
    ], SelectOption.prototype, "divider", void 0);
    SelectOption = __decorate([
        Component({
            selector: "ionx-select-option",
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "<ng-content></ng-content>"
        })
    ], SelectOption);
    return SelectOption;
}());

var SelectOptions = /** @class */ (function (_super) {
    __extends(SelectOptions, _super);
    function SelectOptions() {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, SelectOptions.prototype);
        return _this;
    }
    SelectOptions.prototype.pushOption = function (value, label, disabled) {
        this.push({ value: value, label: label, disabled: disabled });
    };
    SelectOptions.prototype.pushDivider = function (label) {
        this.push({ divider: true, label: label });
    };
    return SelectOptions;
}(Array));

var SelectOverlayContent = /** @class */ (function () {
    function SelectOverlayContent(element, intl, popoverController, modalController) {
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.multiple = false;
        this.whiteSpace = "nowrap";
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
    SelectOverlayContent.prototype.optionClicked = function (option, ev) {
        if (option.checked && !this.empty && this.checkedOptions.length === 1 && this.checkedOptions[0] === option) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
        }
    };
    SelectOverlayContent.prototype.optionBeforeChange = function (option) {
        this.lastClickedOption = option;
        option.checkedTimestamp = Date.now();
    };
    SelectOverlayContent.prototype.optionChanged = function (option) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e;
        if (!this.lastClickedOption || option !== this.lastClickedOption) {
            return;
        }
        if (this.multiple && this.valueValidator) {
            var values = [];
            try {
                for (var _f = __values(this.checkedOptions), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var o = _g.value;
                    if (o !== option) {
                        values.push(o.value);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var optionWasChecked = option.checked;
            try {
                for (var _h = __values(this.options), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var o = _j.value;
                    o.checked = false;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.checkedOptions = [];
            try {
                VALUES: for (var _k = __values(this.valueValidator(option.value, optionWasChecked, values) || []), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var v = _l.value;
                    try {
                        for (var _m = __values(this.options), _o = _m.next(); !_o.done; _o = _m.next()) {
                            var o = _o.value;
                            if (this.valueComparator(o.value, v)) {
                                o.checked = true;
                                this.checkedOptions.push(o);
                                continue VALUES;
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                }
                finally { if (e_3) throw e_3.error; }
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
                    try {
                        for (var _p = __values(this.options), _q = _p.next(); !_q.done; _q = _p.next()) {
                            var o = _q.value;
                            if (o.checked && o !== option) {
                                o.checked = false;
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                        }
                        finally { if (e_5) throw e_5.error; }
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
        var e_6, _a;
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
        try {
            for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                var option = _c.value;
                if (!option.hidden) {
                    this.visibleOptions.push(option);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    SelectOverlayContent.prototype.initOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_7, _a, _b, _c, option, indexToScroll, i;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.checkedOptions = [];
                        try {
                            for (_b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                                option = _c.value;
                                if (option.checked) {
                                    this.checkedOptions.push(option);
                                }
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                        if (this.orderable) {
                            this.checkedOptions.sort(function (a, b) { return a.checkedTimestamp - b.checkedTimestamp; });
                        }
                        this.buildVisibleOptions();
                        if (!(this.checkedOptions.length > 0)) return [3 /*break*/, 2];
                        if (!this.modalOverlay) return [3 /*break*/, 2];
                        return [4 /*yield*/, waitTill(function () { return !!_this.scroll; })];
                    case 1:
                        _d.sent();
                        indexToScroll = -1;
                        for (i = 0; i < this.visibleOptions.length; i++) {
                            if (this.visibleOptions[i].checked) {
                                indexToScroll = i;
                                break;
                            }
                        }
                        this.scroll.scrollToIndex(indexToScroll);
                        _d.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SelectOverlayContent.prototype.okClicked = function () {
        var e_8, _a, e_9, _b, e_10, _c;
        var values = [];
        if (this.orderable) {
            try {
                for (var _d = __values(this.checkedOptions), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var o = _e.value;
                    values.push(o.value);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        else {
            try {
                OPTIONS: for (var _f = __values(this.options), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var option = _g.value;
                    try {
                        for (var _h = __values(this.checkedOptions), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var checked = _j.value;
                            if (option === checked) {
                                values.push(checked.value);
                                continue OPTIONS;
                            }
                        }
                    }
                    catch (e_10_1) { e_10 = { error: e_10_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                        }
                        finally { if (e_10) throw e_10.error; }
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_9) throw e_9.error; }
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
        var e_11, _a;
        var query = this.searchbar.nativeElement.value ? this.searchbar.nativeElement.value.toString() : undefined;
        if (query) {
            query = query.trim().toLowerCase();
        }
        try {
            for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                var o = _c.value;
                if (!query) {
                    o.hidden = false;
                }
                else {
                    o.hidden = this.searchHandler ? !this.searchHandler(query, o.value, o.label) : (o.label || "").toLowerCase().indexOf(query) < 0;
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
        this.buildVisibleOptions();
    };
    SelectOverlayContent.prototype.ngOnInit = function () {
        if (this.popoverOverlay) {
            this.initOptions();
        }
        else {
            var modal = this.element.nativeElement.closest("ion-modal");
            if (modal.classList.contains("modal-ios")) {
                this.itemHeight = 44.55;
            }
            else {
                this.itemHeight = 49;
            }
        }
    };
    SelectOverlayContent.prototype.resetScrollHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldHeight, newHeight;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldHeight = this.scrollHeight;
                        newHeight = this.content.nativeElement.offsetHeight;
                        if (!(newHeight == oldHeight)) return [3 /*break*/, 2];
                        return [4 /*yield*/, waitTill(function () {
                                newHeight = _this.content.nativeElement.offsetHeight;
                                return newHeight !== oldHeight;
                            }, undefined, 2000)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.scrollHeight = newHeight;
                        if (typeof oldHeight !== "number" && this.scroll) {
                            this.scroll.checkViewportSize();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SelectOverlayContent.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.modalOverlay) return [3 /*break*/, 3];
                        this.resetScrollHeight();
                        if (!(!window["cordova"] || window["cordova"].platformId === "browser")) return [3 /*break*/, 2];
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
    SelectOverlayContent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IntlService },
        { type: PopoverController, decorators: [{ type: Optional }] },
        { type: ModalController, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "overlay", void 0);
    __decorate([
        ViewChild(CdkVirtualScrollViewport, { static: false })
    ], SelectOverlayContent.prototype, "scroll", void 0);
    __decorate([
        ViewChild("content", { read: ElementRef, static: false })
    ], SelectOverlayContent.prototype, "content", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "orderable", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "updateValues", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "title", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "searchHandler", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "valueValidator", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "valueComparator", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "label", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "options", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "empty", void 0);
    __decorate([
        Input()
    ], SelectOverlayContent.prototype, "whiteSpace", void 0);
    __decorate([
        ViewChild("searchbar", { read: ElementRef, static: false })
    ], SelectOverlayContent.prototype, "searchbar", void 0);
    __decorate([
        HostListener("window:resize")
    ], SelectOverlayContent.prototype, "resetScrollHeight", null);
    SelectOverlayContent = __decorate([
        Component({
            selector: "ionx-select-overlay",
            template: "<ion-header *ngIf=\"modalOverlay\">\n    <ion-toolbar>\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back'\" (click)=\"$event.preventDefault(); cancelClicked()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\"\n                       (ionInput)=\"search($event)\"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n<ion-content [scrollY]=\"false\" [scrollX]=\"false\" #content>\n\n    <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ng-template [ngIf]=\"!!visibleOptions\">\n        <div>\n\n            <cdk-virtual-scroll-viewport [itemSize]=\"itemHeight\" [style.height.px]=\"scrollHeight\" *ngIf=\"modalOverlay\">\n\n                <ion-list lines=\"full\">\n\n                    <ion-item detail=\"false\" [button]=\"!option.divider\" [style.fontWeight]=\"option.divider ? 500 : null\" #listItem *cdkVirtualFor=\"let option of visibleOptions\">\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"\n                                      *ngIf=\"!option.divider\"></ion-checkbox>\n                        <ion-label>\n                            <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                            <ng-template #customLabel>\n                                <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                            </ng-template>\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n            </cdk-virtual-scroll-viewport>\n\n            <ion-list lines=\"full\" *ngIf=\"popoverOverlay\">\n\n                <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n\n                    <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                        <ion-label>{{option.label}}</ion-label>\n                    </ion-item-divider>\n\n                    <ng-template #basicOption>\n\n                        <ion-item detail=\"false\" button=\"true\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\"></ion-checkbox>\n                            <ion-label [style.whiteSpace]=\"whiteSpace\">\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n\n                    </ng-template>\n\n                </ng-template>\n            </ion-list>\n        </div>\n    </ng-template>\n\n</ion-content>\n\n<ion-footer *ngIf=\"multiple && popoverOverlay\" style=\"position: sticky; bottom: 0px\">\n    <ion-toolbar>\n        <ion-buttons slot=\"end\">\n\n            <ion-button size=\"small\" (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-button>\n\n            <ion-button size=\"small\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-button>\n\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
            styles: ["@media (min-width:768px){::ng-deep .ionx-select-overlay-width .popover-content{--width:300px;--max-width:90%}}@media (max-width:767px){::ng-deep .ionx-select-overlay-width .popover-content{left:calc(16px + var(--ion-safe-area-left,0px))!important;width:calc(100% - (32px + var(--ion-safe-area-right,0px) + var(--ion-safe-area-left,0px)))}}:host .ionx-select-overlay-spinner{position:absolute;width:100%;height:100%;left:0;top:0}:host .ionx-select-overlay-spinner ion-spinner{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}:host ion-checkbox{margin-right:16px;margin-top:8px;margin-bottom:8px;-ms-grid-row-align:center;align-self:center}:host ion-list{margin:4px 0;padding:0}:host ::ng-deep .cdk-virtual-scroll-content-wrapper{max-width:100%}:host ::ng-deep .hydrated{visibility:visible}:host-context(ion-popover) ion-content{--overflow:initial!important}:host-context(ion-popover) ion-content ion-item ion-label{white-space:normal}:host-context(ion-popover) ion-content ion-item.item:last-child{--border-width:0px}:host-context(.ios) ion-item-divider{--background:transparent;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500}"]
        }),
        __param(2, Optional()),
        __param(3, Optional())
    ], SelectOverlayContent);
    return SelectOverlayContent;
}());

var createDragula = dragula;
var Select = /** @class */ (function () {
    function Select(element, intl, popoverController, modalController, control) {
        var _this = this;
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.control = control;
        this.overlayWhiteSpace = "nowrap";
        this.empty = true;
        this.ionChange = new EventEmitter();
        this.change = this.ionChange;
        /*private*/ this.values = [];
        this.valueComparator = function (a, b) {
            if (_this.compareAsString) {
                if (a !== undefined && a !== null && b !== undefined && b !== null) {
                    return a.toString() == b.toString();
                }
                else {
                    return a == b;
                }
            }
            else if (_this.comparator) {
                var r = _this.comparator(a, b);
                return r === 0 || r === true;
            }
            return a === b;
        };
        if (control) {
            control.valueAccessor = this;
        }
    }
    Object.defineProperty(Select.prototype, "listItem", {
        get: function () {
            if (this._listItem) {
                return this._listItem;
            }
            return this._listItem = this.element.nativeElement.closest("ion-item");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "readonly", {
        get: function () {
            return !!this._readonly;
        },
        set: function (readonly) {
            if (typeof readonly === "string") {
                this.readonly = readonly === "true";
            }
            else {
                this._readonly = readonly;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "disabled", {
        /**
         * Whether or not the select component is disabled.
         */
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = disabled || disabled == "true" ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "value", {
        get: function () {
            return this.multiple || this.alwaysArray ? this.values.slice(0) : (this.values.length > 0 ? this.values[0] : undefined);
        },
        set: function (value) {
            var changed = false;
            var newValue = Array.isArray(value) ? value : (value !== undefined && value !== null ? [value] : []);
            if (newValue.length != this.values.length) {
                changed = true;
            }
            else {
                for (var i = 0; i < this.values.length; i++) {
                    if (!this.valueComparator(this.values[i], newValue[i])) {
                        changed = true;
                        break;
                    }
                }
            }
            this.values = newValue;
            if (changed) {
                this.checkListItemHasValue();
                var value_1 = this.value;
                if (this.fireOnChange) {
                    if (this.controlOnChange) {
                        this.controlOnChange(value_1);
                    }
                    this.ionChange.emit(value_1);
                }
            }
            this.fireOnChange = false;
        },
        enumerable: true,
        configurable: true
    });
    /*private*/ Select.prototype.labelImpl$ = function (value) {
        if (this.options instanceof SelectOptions) {
            if (!this.cachedLabels) {
                this.cachedLabels = new Array(this.options.length);
            }
            for (var i = 0; i < this.options.length; i++) {
                if (this.valueComparator(value, this.options[i].value)) {
                    if (this.cachedLabels[i]) {
                        return this.cachedLabels[i];
                    }
                    return this.cachedLabels[i] = this.options[i].label ? this.options[i].label : (this.label ? this.label(value) : value + "");
                }
            }
        }
        else if (this.options) {
            if (!this.cachedLabels) {
                this.cachedLabels = new Array(this.options.length);
            }
            for (var i = 0; i < this.options.length; i++) {
                if (this.valueComparator(value, this.options[i])) {
                    if (this.cachedLabels[i]) {
                        return this.cachedLabels[i];
                    }
                    return this.cachedLabels[i] = this.label ? this.label(value) : value + "";
                }
            }
        }
        else if (this.optionsComponents) {
            for (var options = this.optionsComponents.toArray(), i = 0; i < options.length; i++) {
                if (this.valueComparator(value, options[i].value)) {
                    return options[i].label;
                }
            }
        }
        return value;
    };
    Select.prototype.writeValue = function (value) {
        this.value = value;
    };
    Select.prototype.hasValue = function () {
        return this.values.length > 0;
    };
    Select.prototype.checkListItemHasValue = function () {
        if (this.listItem) {
            if (this.hasValue()) {
                this.listItem.classList.add("has-value");
            }
            else {
                this.listItem.classList.remove("has-value");
            }
        }
    };
    Object.defineProperty(Select.prototype, "_optionsComponents", {
        set: function (val) {
            this.optionsComponents = val;
            //this.optionsComponents.changes.subscribe(() => this.updateText());
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.indexOfValue = function (value) {
        if (!this.values) {
            return -1;
        }
        for (var i = 0; i < this.values.length; i++) {
            if (this.valueComparator(value, this.values[i])) {
                return i;
            }
        }
        return -1;
    };
    Select.prototype.registerOnChange = function (fn) {
        this.controlOnChange = fn;
    };
    Select.prototype.registerOnTouched = function (fn) {
        this.controlOnTouched = fn;
    };
    Select.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Select.prototype.open = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, e_3, _c, overlay, options, _d, _e, option, valueIndex, _f, _g, option, valueIndex, _h, _j, option, valueIndex, overlayTitle, title, label, overlayData, popover, modal;
            var _this = this;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        overlay = this.overlay;
                        if (!overlay) {
                            overlay = "popover";
                        }
                        options = [];
                        if (this.options instanceof SelectOptions) {
                            try {
                                for (_d = __values(this.options), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    option = _e.value;
                                    valueIndex = option.value ? this.indexOfValue(option.value) : -1;
                                    options.push({ value: option.value, checked: option.value ? valueIndex > -1 : false, checkedTimestamp: this.orderable && valueIndex, label: option.label ? option.label : ((!this.searchTest || !this.labelTemplate) ? this.labelImpl$(option.value) : undefined), disabled: option.disabled, divider: option.divider });
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        else if (this.options) {
                            try {
                                for (_f = __values(this.options), _g = _f.next(); !_g.done; _g = _f.next()) {
                                    option = _g.value;
                                    valueIndex = this.indexOfValue(option);
                                    options.push({ value: option, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: !this.labelTemplate || !this.searchTest ? this.labelImpl$(option) : undefined });
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        else if (this.optionsComponents) {
                            try {
                                for (_h = __values(this.optionsComponents.toArray()), _j = _h.next(); !_j.done; _j = _h.next()) {
                                    option = _j.value;
                                    valueIndex = this.indexOfValue(option.value);
                                    options.push({ value: option.value, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: option.label, divider: !!option.divider });
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                        if (this.title) {
                            overlayTitle = this.title;
                        }
                        if (!overlayTitle && this.listItem) {
                            title = this.listItem.querySelector("[ionx-select-overlay-title]");
                            if (title) {
                                overlayTitle = title.innerText;
                            }
                            else {
                                label = this.listItem.querySelector("ion-label");
                                if (label) {
                                    overlayTitle = label.innerText;
                                }
                            }
                        }
                        if (!overlayTitle && this.element.nativeElement.title) {
                            overlayTitle = this.element.nativeElement.title;
                        }
                        if (!overlayTitle && this.placeholder) {
                            overlayTitle = this.placeholder;
                        }
                        overlayData = {
                            overlay: overlay,
                            options: options,
                            multiple: !!this.multiple,
                            title: overlayTitle,
                            label: this.labelTemplate,
                            orderable: !!this.orderable,
                            empty: !!this.empty,
                            whiteSpace: this.overlayWhiteSpace,
                            valueValidator: this.checkValidator,
                            valueComparator: this.valueComparator,
                            width: this.element.nativeElement.getBoundingClientRect().width,
                            updateValues: function (value) {
                                _this.fireOnChange = true;
                                _this.value = value;
                                if (_this.controlOnTouched) {
                                    _this.controlOnTouched();
                                }
                            }
                        };
                        if (!(overlay == "popover")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.popoverController.create({ component: SelectOverlayContent, componentProps: overlayData, cssClass: "ionx-select-overlay-width", event: event })];
                    case 1:
                        popover = _k.sent();
                        popover.present();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.modalController.create({ component: SelectOverlayContent, componentProps: overlayData })];
                    case 3:
                        modal = _k.sent();
                        modal.present();
                        _k.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Select.prototype.initDragula = function () {
        var _this = this;
        if (this.orderable && !this.disabled && !this.readonly) {
            if (this.dragula) {
                return;
            }
            this.dragula = createDragula({
                containers: [this.textContainer.nativeElement],
                mirrorContainer: document.querySelector("ion-app"),
                direction: "horizontal",
                moves: function (el, container, handle) {
                    return _this.values && _this.values.length > 1;
                }
            });
            this.dragula.on("drop", function (el, target, source, sibling) {
                var startIndex = parseInt(el.getAttribute("ionx--index"), 0);
                var endIndex = sibling ? parseInt(sibling.getAttribute("ionx--index"), 0) : _this.values.length;
                if (endIndex > startIndex) {
                    endIndex -= 1;
                }
                var element = _this.values[startIndex];
                _this.values.splice(startIndex, 1);
                _this.values.splice(endIndex, 0, element);
                if (_this.controlOnChange) {
                    _this.controlOnChange(_this.values.slice());
                }
                _this.ionChange.emit(_this.values.slice());
            });
        }
        else if (this.dragula) {
            this.dragula.destroy();
            this.dragula = undefined;
        }
    };
    Select.prototype.updateCssClasses = function () {
        if (this.listItem) {
            this.listItem.classList.add("item-select");
            if (!this.readonly && !this.disabled) {
                this.listItem.classList.add("item-interactive");
            }
            else {
                this.listItem.classList.remove("item-interactive");
            }
            this.element.nativeElement.classList.add("in-item");
        }
        else {
            this.element.nativeElement.classList.remove("in-item");
        }
    };
    Select.prototype.ngOnChanges = function (changes) {
        if (changes.options) {
            this.cachedLabels = undefined;
        }
        if (changes["orderable"] || changes["readonly"] || changes["disabled"]) {
            this.initDragula();
            this.updateCssClasses();
        }
    };
    Select.prototype.ngOnInit = function () {
        //this.updateText();
        this.updateCssClasses();
        if (this.orderable) {
            this.initDragula();
        }
    };
    Select.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IntlService },
        { type: PopoverController },
        { type: ModalController },
        { type: NgControl, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        ViewChild("textContainer", { static: true })
    ], Select.prototype, "textContainer", void 0);
    __decorate([
        Input()
    ], Select.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], Select.prototype, "overlay", void 0);
    __decorate([
        Input()
    ], Select.prototype, "overlayWhiteSpace", void 0);
    __decorate([
        Input()
    ], Select.prototype, "alwaysArray", void 0);
    __decorate([
        Input()
    ], Select.prototype, "compareAsString", void 0);
    __decorate([
        Input()
    ], Select.prototype, "comparator", void 0);
    __decorate([
        Input()
    ], Select.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], Select.prototype, "title", void 0);
    __decorate([
        Input()
    ], Select.prototype, "orderable", void 0);
    __decorate([
        Input()
    ], Select.prototype, "empty", void 0);
    __decorate([
        Input()
    ], Select.prototype, "readonly", null);
    __decorate([
        Input()
    ], Select.prototype, "searchTest", void 0);
    __decorate([
        Input()
    ], Select.prototype, "checkValidator", void 0);
    __decorate([
        Output()
    ], Select.prototype, "ionChange", void 0);
    __decorate([
        Output()
    ], Select.prototype, "change", void 0);
    __decorate([
        Input()
    ], Select.prototype, "disabled", null);
    __decorate([
        Input()
    ], Select.prototype, "value", null);
    __decorate([
        ContentChild(SelectLabel, { static: false })
    ], Select.prototype, "labelTemplate", void 0);
    __decorate([
        Input()
    ], Select.prototype, "label", void 0);
    __decorate([
        Input()
    ], Select.prototype, "options", void 0);
    __decorate([
        ContentChildren(SelectOption, { descendants: true })
    ], Select.prototype, "_optionsComponents", null);
    Select = __decorate([
        Component({
            selector: "ionx-select",
            host: {
                "[attr.ionx--chips-layout]": "!!orderable || null",
                "[attr.ionx--readonly]": "(!!readonly || !!disabled) || null",
                "[attr.ionx--orderable]": "(!!orderable && !readonly && !disabled && values && values.length > 1) || null",
            },
            template: "<ng-template #optionTemplate let-value=\"value\" let-index=\"index\">\n    <span *ngIf=\"!labelTemplate; else hasLabelTemplate\">{{labelImpl$(value)}}</span>\n    <ng-template #hasLabelTemplate>\n        <ng-container *ngTemplateOutlet=\"labelTemplate.templateRef; context: {$implicit: value, index: index}\"></ng-container>\n    </ng-template>\n</ng-template>\n\n<div class=\"select-inner\">\n    <div class=\"select-text\" #textContainer [class.select-placeholder]=\"values.length == 0\">\n        <span *ngIf=\"values.length == 0; else showValues\">{{placeholder}}</span>\n\n        <ng-template #showValues>\n            <ng-template ngFor [ngForOf]=\"values\" let-value let-index=\"index\">\n                <span *ngIf=\"index > 0 && (!labelTemplate || labelTemplate.separator) && !orderable\">{{!labelTemplate ? \", \" : labelTemplate.separator}}</span>\n\n                <ion-chip *ngIf=\"orderable else simpleText\" outline=\"true\" [attr.ionx--index]=\"index\">\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ion-chip>\n\n                <ng-template #simpleText>\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ng-template>\n\n            </ng-template>\n        </ng-template>\n    </div>\n\n    <ng-container  *ngIf=\"!_readonly && !_disabled\">\n        <div class=\"select-icon\" role=\"presentation\" *ngIf=\"!orderable\">\n            <div class=\"select-icon-inner\"></div>\n        </div>\n        <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\" *ngIf=\"!orderable || !values || values.length === 0\"></button>\n    </ng-container>\n\n</div>\n",
            styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:inline-block;overflow:hidden;color:var(--color);font-family:var(--ion-font-family,inherit);max-width:100%}:host .select-inner{display:-webkit-box;display:flex;position:relative}:host .select-icon{position:relative;width:16px;height:20px}:host .select-icon .select-icon-inner{top:50%;right:0;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:.33;pointer-events:none}:host .select-text.select-placeholder{opacity:.5}:host.select-disabled{opacity:.4;pointer-events:none}:host.select-readonly{opacity:1;pointer-events:none}:host.select-readonly .select-icon{display:none}:host[white-space-normal] .select-text{white-space:normal!important}:host button{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0}:host button::-moz-focus-inner{border:0}:host.in-item{position:static}:host ion-chip{max-width:calc(50% - 4px);-webkit-margin-start:0;margin-inline-start:0;margin-bottom:0;cursor:default}:host ion-chip>span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:1.1}:host [ionx--orderable] ion-chip{cursor:move}:host [ionx--chips-layout] .select-text{white-space:normal;width:100%}:host-context(ion-toolbar){color:var(--ion-toolbar-color);--icon-color:var(--ion-toolbar-color);--padding-start:16px;--padding-end:16px}:host-context(.item-label-stacked){align-self:flex-start;--padding-top:8px;--padding-bottom:8px;--padding-start:0;width:100%}:host-context(.item-label-stacked) .select-text{max-width:calc(100% - 16px);-webkit-box-flex:initial;flex:initial}:host-context(.item-label-stacked)[ionx--chips-layout] .select-text{-webkit-box-flex:1;flex:1}"]
        }),
        __param(4, Optional())
    ], Select);
    return Select;
}());

var SelectModule = /** @class */ (function () {
    function SelectModule() {
    }
    SelectModule = __decorate([
        NgModule({
            declarations: [Select, SelectOption, SelectOverlayContent, SelectLabel],
            entryComponents: [Select, SelectOption, SelectOverlayContent],
            exports: [Select, SelectOption, SelectOverlayContent, SelectLabel],
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, ScrollingModule, ButtonsModule, MatchMediaModule]
        })
    ], SelectModule);
    return SelectModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Select, SelectModule, SelectOption, SelectOptions, SelectLabel as ɵa, SelectOverlayContent as ɵb };
//# sourceMappingURL=select-module.js.map
