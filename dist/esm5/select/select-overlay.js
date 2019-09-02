import * as tslib_1 from "tslib";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, ElementRef, HostListener, Input, Optional, ViewChild } from "@angular/core";
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
                for (var _f = tslib_1.__values(this.checkedOptions), _g = _f.next(); !_g.done; _g = _f.next()) {
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
                for (var _h = tslib_1.__values(this.options), _j = _h.next(); !_j.done; _j = _h.next()) {
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
                VALUES: for (var _k = tslib_1.__values(this.valueValidator(option.value, optionWasChecked, values) || []), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var v = _l.value;
                    try {
                        for (var _m = tslib_1.__values(this.options), _o = _m.next(); !_o.done; _o = _m.next()) {
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
                        for (var _p = tslib_1.__values(this.options), _q = _p.next(); !_q.done; _q = _p.next()) {
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
            for (var _b = tslib_1.__values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_7, _a, _b, _c, option, indexToScroll, i;
            var _this = this;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.checkedOptions = [];
                        try {
                            for (_b = tslib_1.__values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                for (var _d = tslib_1.__values(this.checkedOptions), _e = _d.next(); !_e.done; _e = _d.next()) {
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
                OPTIONS: for (var _f = tslib_1.__values(this.options), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var option = _g.value;
                    try {
                        for (var _h = tslib_1.__values(this.checkedOptions), _j = _h.next(); !_j.done; _j = _h.next()) {
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
            for (var _b = tslib_1.__values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var oldHeight, newHeight;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SelectOverlayContent.prototype, "overlay", void 0);
    tslib_1.__decorate([
        ViewChild(CdkVirtualScrollViewport, { static: false }),
        tslib_1.__metadata("design:type", CdkVirtualScrollViewport)
    ], SelectOverlayContent.prototype, "scroll", void 0);
    tslib_1.__decorate([
        ViewChild("content", { read: ElementRef, static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], SelectOverlayContent.prototype, "content", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SelectOverlayContent.prototype, "multiple", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SelectOverlayContent.prototype, "orderable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], SelectOverlayContent.prototype, "updateValues", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SelectOverlayContent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], SelectOverlayContent.prototype, "searchHandler", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], SelectOverlayContent.prototype, "valueValidator", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], SelectOverlayContent.prototype, "valueComparator", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", SelectLabel)
    ], SelectOverlayContent.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], SelectOverlayContent.prototype, "options", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SelectOverlayContent.prototype, "empty", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SelectOverlayContent.prototype, "whiteSpace", void 0);
    tslib_1.__decorate([
        ViewChild("searchbar", { read: ElementRef, static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], SelectOverlayContent.prototype, "searchbar", void 0);
    tslib_1.__decorate([
        HostListener("window:resize"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Promise)
    ], SelectOverlayContent.prototype, "resetScrollHeight", null);
    SelectOverlayContent = tslib_1.__decorate([
        Component({
            selector: "ionx-select-overlay",
            template: "<ion-header *ngIf=\"modalOverlay\">\n    <ion-toolbar>\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"start\">\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"cancelClicked()\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ionx-buttons>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\"\n                       (ionInput)=\"search($event)\"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n<ion-content [scrollY]=\"false\" [scrollX]=\"false\" #content>\n\n    <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ng-template [ngIf]=\"!!visibleOptions\">\n        <div>\n\n            <cdk-virtual-scroll-viewport [itemSize]=\"itemHeight\" [style.height.px]=\"scrollHeight\" *ngIf=\"modalOverlay\">\n\n                <ion-list lines=\"full\">\n\n                    <ion-item detail=\"false\" [button]=\"!option.divider\" [style.fontWeight]=\"option.divider ? 500 : null\" #listItem *cdkVirtualFor=\"let option of visibleOptions\">\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"\n                                      *ngIf=\"!option.divider\"></ion-checkbox>\n                        <ion-label>\n                            <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                            <ng-template #customLabel>\n                                <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                            </ng-template>\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n            </cdk-virtual-scroll-viewport>\n\n            <ion-list lines=\"full\" *ngIf=\"popoverOverlay\">\n\n                <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n\n                    <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                        <ion-label>{{option.label}}</ion-label>\n                    </ion-item-divider>\n\n                    <ng-template #basicOption>\n\n                        <ion-item detail=\"false\" button=\"true\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\"></ion-checkbox>\n                            <ion-label [style.whiteSpace]=\"whiteSpace\">\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n\n                    </ng-template>\n\n                </ng-template>\n            </ion-list>\n        </div>\n    </ng-template>\n\n</ion-content>\n\n<ion-footer *ngIf=\"multiple && popoverOverlay\" style=\"position: sticky; bottom: 0px\">\n    <ion-toolbar>\n        <ion-buttons slot=\"end\">\n\n            <ion-button size=\"small\" (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-button>\n\n            <ion-button size=\"small\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-button>\n\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
            styles: ["@media (min-width:768px){::ng-deep .ionx-select-overlay-width .popover-content{--width:300px;--max-width:90%}}@media (max-width:767px){::ng-deep .ionx-select-overlay-width .popover-content{left:calc(16px + var(--ion-safe-area-left,0px))!important;width:calc(100% - (32px + var(--ion-safe-area-right,0px) + var(--ion-safe-area-left,0px)))}}:host .ionx-select-overlay-spinner{position:absolute;width:100%;height:100%;left:0;top:0}:host .ionx-select-overlay-spinner ion-spinner{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}:host ion-checkbox{margin-right:16px;margin-top:8px;margin-bottom:8px}:host ion-list{margin:4px 0;padding:0}:host ::ng-deep .cdk-virtual-scroll-content-wrapper{max-width:100%}:host ::ng-deep .hydrated{visibility:visible}:host-context(ion-popover) ion-content{--overflow:initial!important}:host-context(ion-popover) ion-content ion-item ion-label{white-space:normal}:host-context(ion-popover) ion-content ion-item.item:last-child{--border-width:0px}:host-context(.ios) ion-item-divider{--background:transparent;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500}"]
        }),
        tslib_1.__param(2, Optional()),
        tslib_1.__param(3, Optional()),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            IntlService,
            PopoverController,
            ModalController])
    ], SelectOverlayContent);
    return SelectOverlayContent;
}());
export { SelectOverlayContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW92ZXJsYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbInNlbGVjdC9zZWxlY3Qtb3ZlcmxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQVEzQztJQUVJLDhCQUNXLE9BQWdDLEVBQzdCLElBQWlCLEVBQ1AsaUJBQW9DLEVBQ3BDLGVBQWdDO1FBSDdDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQzdCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDUCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQTBCeEQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQThCMUIsZUFBVSxHQUFXLFFBQVEsQ0FBQztJQXREOUIsQ0FBQztJQUtELHNCQUFJLGdEQUFjO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhDQUFZO2FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQW1ERCw0Q0FBYSxHQUFiLFVBQWMsTUFBMkIsRUFBRSxLQUFhLEVBQUUsT0FBOEI7UUFDcEYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDOUI7U0FDSjtJQUNMLENBQUM7SUFFRCw0Q0FBYSxHQUFiLFVBQWMsTUFBMkIsRUFBRSxFQUFTO1FBRWhELElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1lBQ3hHLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNwQixFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDckIsRUFBRSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7SUFFTCxDQUFDO0lBRUQsaURBQWtCLEdBQWxCLFVBQW1CLE1BQTJCO1FBQzFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7UUFDaEMsTUFBTSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsNENBQWEsR0FBYixVQUFjLE1BQTJCOztRQUVyQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDOUQsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFFdEMsSUFBSSxNQUFNLEdBQVUsRUFBRSxDQUFDOztnQkFDdkIsS0FBYyxJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQSxnQkFBQSw0QkFBRTtvQkFBOUIsSUFBSSxDQUFDLFdBQUE7b0JBQ04sSUFBSSxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN4QjtpQkFDSjs7Ozs7Ozs7O1lBRUQsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDOztnQkFFdEMsS0FBYyxJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTtvQkFBdkIsSUFBSSxDQUFDLFdBQUE7b0JBQ04sQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7aUJBQ3JCOzs7Ozs7Ozs7WUFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQzs7Z0JBRXpCLE1BQU0sRUFBRSxLQUFjLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBLGdCQUFBLDRCQUFFO29CQUE1RSxJQUFJLENBQUMsV0FBQTs7d0JBQ2QsS0FBYyxJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTs0QkFBdkIsSUFBSSxDQUFDLFdBQUE7NEJBQ04sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0NBQ2xDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dDQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDNUIsU0FBUyxNQUFNLENBQUM7NkJBQ25CO3lCQUNKOzs7Ozs7Ozs7aUJBQ0o7Ozs7Ozs7OztTQUVKO2FBQU07WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFFakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNqRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO3dCQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLE1BQU07cUJBQ1Q7aUJBQ0o7YUFFSjtpQkFBTTtnQkFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7d0JBRWhCLEtBQWMsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7NEJBQXZCLElBQUksQ0FBQyxXQUFBOzRCQUNOLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssTUFBTSxFQUFFO2dDQUMzQixDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs2QkFDckI7eUJBQ0o7Ozs7Ozs7OztvQkFFRCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBRWxDO3FCQUFNO29CQUNILElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQzthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxrREFBbUIsR0FBM0I7O1FBRUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBRTFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM3QixLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFO3dCQUVqRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFOzRCQUMxQixNQUFNO3lCQUNUO3dCQUVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTs0QkFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzRCQUMvQixNQUFNO3lCQUNUO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDOztZQUN6QixLQUFtQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTtnQkFBNUIsSUFBSSxNQUFNLFdBQUE7Z0JBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQzthQUNKOzs7Ozs7Ozs7SUFDTCxDQUFDO0lBRWEsMENBQVcsR0FBekI7Ozs7Ozs7d0JBRUksSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7OzRCQUN6QixLQUFtQixLQUFBLGlCQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsNENBQUU7Z0NBQXhCLE1BQU07Z0NBQ1gsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO29DQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQ0FDcEM7NkJBQ0o7Ozs7Ozs7Ozt3QkFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7NEJBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLEVBQXZDLENBQXVDLENBQUMsQ0FBQzt5QkFDL0U7d0JBRUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7NkJBRXZCLENBQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEVBQTlCLHdCQUE4Qjs2QkFFMUIsSUFBSSxDQUFDLFlBQVksRUFBakIsd0JBQWlCO3dCQUVqQixxQkFBTSxRQUFRLENBQUMsY0FBTSxPQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFiLENBQWEsQ0FBQyxFQUFBOzt3QkFBbkMsU0FBbUMsQ0FBQzt3QkFFaEMsYUFBYSxHQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUUvQixLQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNqRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO2dDQUNoQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2dDQUNsQixNQUFNOzZCQUNUO3lCQUNKO3dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7S0FHcEQ7SUFFRCx3Q0FBUyxHQUFUOztRQUVJLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7O2dCQUNoQixLQUFjLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsY0FBYyxDQUFBLGdCQUFBLDRCQUFFO29CQUE5QixJQUFJLENBQUMsV0FBQTtvQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDeEI7Ozs7Ozs7OztTQUVKO2FBQU07O2dCQUVILE9BQU8sRUFBRSxLQUFtQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTtvQkFBNUIsSUFBSSxNQUFNLFdBQUE7O3dCQUNwQixLQUFvQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQSxnQkFBQSw0QkFBRTs0QkFBcEMsSUFBSSxPQUFPLFdBQUE7NEJBQ1osSUFBSSxNQUFNLEtBQUssT0FBTyxFQUFFO2dDQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDM0IsU0FBUyxPQUFPLENBQUM7NkJBQ3BCO3lCQUNKOzs7Ozs7Ozs7aUJBQ0o7Ozs7Ozs7OztTQUNKO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNwQzthQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsNENBQWEsR0FBYjtRQUNJLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFLRCxxQ0FBTSxHQUFOLFVBQU8sRUFBTzs7UUFFVixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzNHLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0Qzs7WUFFRCxLQUFjLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFBLGdCQUFBLDRCQUFFO2dCQUF2QixJQUFJLENBQUMsV0FBQTtnQkFDTixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2lCQUNwQjtxQkFBTTtvQkFDSCxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNuSTthQUNKOzs7Ozs7Ozs7UUFFRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUVJLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7YUFBTTtZQUVILElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU5RCxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzthQUN4QjtTQUNKO0lBQ0wsQ0FBQztJQUdpQixnREFBaUIsR0FBdkI7Ozs7Ozs7d0JBRUYsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7d0JBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7NkJBRXBELENBQUEsU0FBUyxJQUFJLFNBQVMsQ0FBQSxFQUF0Qix3QkFBc0I7d0JBQ3RCLHFCQUFNLFFBQVEsQ0FBQztnQ0FDWCxTQUFTLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO2dDQUNwRCxPQUFPLFNBQVMsS0FBSyxTQUFTLENBQUM7NEJBQ25DLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUhuQixTQUdtQixDQUFDOzs7d0JBR3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO3dCQUU5QixJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7eUJBQ25DOzs7OztLQUNKO0lBRUssOENBQWUsR0FBckI7Ozs7Ozs2QkFFUSxJQUFJLENBQUMsWUFBWSxFQUFqQix3QkFBaUI7d0JBRWpCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOzZCQUVyQixDQUFBLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFBLEVBQWhFLHdCQUFnRTt3QkFDaEUscUJBQU0sUUFBUSxDQUFDLGNBQU0sT0FBQSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUF6RSxDQUF5RSxDQUFDLEVBQUE7O3dCQUEvRixTQUErRixDQUFDO3dCQUNoRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7O3dCQUc1QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OztLQUUxQjtJQXBVRDtRQURDLEtBQUssRUFBRTs7eURBQ2dCO0lBV3hCO1FBREMsU0FBUyxDQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDOzBDQUM3Qyx3QkFBd0I7d0RBQUM7SUFPakM7UUFEQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7MENBQy9DLFVBQVU7eURBQXNDO0lBR3pEO1FBREMsS0FBSyxFQUFFOzswREFDa0I7SUFHMUI7UUFEQyxLQUFLLEVBQUU7OzJEQUNXO0lBR25CO1FBREMsS0FBSyxFQUFFOzs4REFDOEI7SUFHdEM7UUFEQyxLQUFLLEVBQUU7O3VEQUNHO0lBR1g7UUFEQyxLQUFLLEVBQUU7OytEQUM2RDtJQUdyRTtRQURDLEtBQUssRUFBRTs7Z0VBQ29FO0lBRzVFO1FBREMsS0FBSyxFQUFFOztpRUFDcUM7SUFHN0M7UUFEQyxLQUFLLEVBQUU7MENBQ0QsV0FBVzt1REFBQztJQUduQjtRQURDLEtBQUssRUFBRTs7eURBQ3VCO0lBRy9CO1FBREMsS0FBSyxFQUFFOzt1REFDTztJQUdmO1FBREMsS0FBSyxFQUFFOzs0REFDc0I7SUE0TTlCO1FBREMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDOzBDQUN2QyxVQUFVOzJEQUEwQjtJQXFDM0M7UUFEWCxZQUFZLENBQUMsZUFBZSxDQUFDOzs7O2lFQWtCN0I7SUFoVVEsb0JBQW9CO1FBTGhDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsMmlJQUFrQzs7U0FFckMsQ0FBQztRQU1PLG1CQUFBLFFBQVEsRUFBRSxDQUFBO1FBQ1YsbUJBQUEsUUFBUSxFQUFFLENBQUE7aURBSEssVUFBVTtZQUNWLFdBQVc7WUFDWSxpQkFBaUI7WUFDbkIsZUFBZTtPQU4vQyxvQkFBb0IsQ0FpVmhDO0lBQUQsMkJBQUM7Q0FBQSxBQWpWRCxJQWlWQztTQWpWWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Nka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9zY3JvbGxpbmdcIjtcbmltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPcHRpb25hbCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7d2FpdFRpbGx9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXIsIFBvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7Q29tcG9uZW50c30gZnJvbSBcIkBpb25pYy9jb3JlXCI7XG5pbXBvcnQge1NlbGVjdExhYmVsfSBmcm9tIFwiLi9zZWxlY3QtbGFiZWxcIjtcbmltcG9ydCB7U2VsZWN0T3ZlcmxheU9wdGlvbn0gZnJvbSBcIi4vc2VsZWN0LW92ZXJsYXktb3B0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc2VsZWN0LW92ZXJsYXlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJzZWxlY3Qtb3ZlcmxheS5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJzZWxlY3Qtb3ZlcmxheS5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdE92ZXJsYXlDb250ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgIHByb3RlY3RlZCBpbnRsOiBJbnRsU2VydmljZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBwb3BvdmVyQ29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXJcbiAgICApIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgb3ZlcmxheTogc3RyaW5nO1xuXG4gICAgZ2V0IHBvcG92ZXJPdmVybGF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5ID09IFwicG9wb3ZlclwiO1xuICAgIH1cblxuICAgIGdldCBtb2RhbE92ZXJsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkgPT0gXCJtb2RhbFwiO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCB7c3RhdGljOiBmYWxzZX0pXG4gICAgc2Nyb2xsOiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG5cbiAgICBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcblxuICAgIGl0ZW1IZWlnaHQ6IG51bWJlcjtcblxuICAgIEBWaWV3Q2hpbGQoXCJjb250ZW50XCIsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlfSlcbiAgICBjb250ZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50ICYgQ29tcG9uZW50cy5Jb25Db250ZW50PjtcblxuICAgIEBJbnB1dCgpXG4gICAgbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgb3JkZXJhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICB1cGRhdGVWYWx1ZXM6ICh2YWx1ZXM6IGFueVtdKSA9PiB2b2lkO1xuXG4gICAgQElucHV0KClcbiAgICB0aXRsZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBzZWFyY2hIYW5kbGVyOiAocXVlcnk6IHN0cmluZywgdmFsdWU6IGFueSwgbGFiZWw6IHN0cmluZykgPT4gYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgdmFsdWVWYWxpZGF0b3I6ICh2YWx1ZTogYW55LCBjaGVja2VkOiBib29sZWFuLCBvdGhlclZhbHVlczogYW55W10pID0+IGFueVtdO1xuXG4gICAgQElucHV0KClcbiAgICB2YWx1ZUNvbXBhcmF0b3I6IChhOiBhbnksIGI6IGFueSkgPT4gYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6IFNlbGVjdExhYmVsO1xuXG4gICAgQElucHV0KClcbiAgICBvcHRpb25zOiBTZWxlY3RPdmVybGF5T3B0aW9uW107XG5cbiAgICBASW5wdXQoKVxuICAgIGVtcHR5OiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICB3aGl0ZVNwYWNlOiBzdHJpbmcgPSBcIm5vd3JhcFwiO1xuXG4gICAgdmlzaWJsZU9wdGlvbnM6IFNlbGVjdE92ZXJsYXlPcHRpb25bXTtcblxuICAgIGNoZWNrZWRPcHRpb25zOiBTZWxlY3RPdmVybGF5T3B0aW9uW107XG5cbiAgICBwcml2YXRlIGxhc3RDbGlja2VkT3B0aW9uOiBTZWxlY3RPdmVybGF5T3B0aW9uO1xuXG4gICAgb3B0aW9uRGl2aWRlcihvcHRpb246IFNlbGVjdE92ZXJsYXlPcHRpb24sIGluZGV4OiBudW1iZXIsIG9wdGlvbnM6IFNlbGVjdE92ZXJsYXlPcHRpb25bXSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1tpXSA9PT0gb3B0aW9uICYmIGkgPiAwICYmIHRoaXMub3B0aW9uc1tpIC0gMV0uZGl2aWRlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNbaSAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3B0aW9uQ2xpY2tlZChvcHRpb246IFNlbGVjdE92ZXJsYXlPcHRpb24sIGV2OiBFdmVudCkge1xuXG4gICAgICAgIGlmIChvcHRpb24uY2hlY2tlZCAmJiAhdGhpcy5lbXB0eSAmJiB0aGlzLmNoZWNrZWRPcHRpb25zLmxlbmd0aCA9PT0gMSAmJiB0aGlzLmNoZWNrZWRPcHRpb25zWzBdID09PSBvcHRpb24pIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvcHRpb25CZWZvcmVDaGFuZ2Uob3B0aW9uOiBTZWxlY3RPdmVybGF5T3B0aW9uKSB7XG4gICAgICAgIHRoaXMubGFzdENsaWNrZWRPcHRpb24gPSBvcHRpb247XG4gICAgICAgIG9wdGlvbi5jaGVja2VkVGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBvcHRpb25DaGFuZ2VkKG9wdGlvbjogU2VsZWN0T3ZlcmxheU9wdGlvbikge1xuXG4gICAgICAgIGlmICghdGhpcy5sYXN0Q2xpY2tlZE9wdGlvbiB8fCBvcHRpb24gIT09IHRoaXMubGFzdENsaWNrZWRPcHRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMudmFsdWVWYWxpZGF0b3IpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlczogYW55W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5jaGVja2VkT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmIChvICE9PSBvcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goby52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgb3B0aW9uV2FzQ2hlY2tlZCA9IG9wdGlvbi5jaGVja2VkO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBvIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIG8uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zID0gW107XG5cbiAgICAgICAgICAgIFZBTFVFUzogZm9yIChsZXQgdiBvZiB0aGlzLnZhbHVlVmFsaWRhdG9yKG9wdGlvbi52YWx1ZSwgb3B0aW9uV2FzQ2hlY2tlZCwgdmFsdWVzKSB8fCBbXSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ29tcGFyYXRvcihvLnZhbHVlLCB2KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgby5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZE9wdGlvbnMucHVzaChvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIFZBTFVFUztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoIW9wdGlvbi5jaGVja2VkKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hlY2tlZE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZE9wdGlvbnNbaV0gPT09IG9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoby5jaGVja2VkICYmIG8gIT09IG9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG8uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucyA9IFtvcHRpb25dO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucy5wdXNoKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLm9rQ2xpY2tlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0Q2xpY2tlZE9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkVmlzaWJsZU9wdGlvbnMoKSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1tpXS5kaXZpZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2ldLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5sZW5ndGggLSAxID4gaSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpaSA9IGkgKyAxOyBpaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGlpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc1tpaV0uZGl2aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uc1tpaV0uaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zW2ldLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbi5oaWRkZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgaW5pdE9wdGlvbnMoKSB7XG5cbiAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWRPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9yZGVyYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkT3B0aW9ucy5zb3J0KChhLCBiKSA9PiBhLmNoZWNrZWRUaW1lc3RhbXAgLSBiLmNoZWNrZWRUaW1lc3RhbXApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWlsZFZpc2libGVPcHRpb25zKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZE9wdGlvbnMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RhbE92ZXJsYXkpIHtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhdGhpcy5zY3JvbGwpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4VG9TY3JvbGw6IG51bWJlciA9IC0xO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZpc2libGVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGVPcHRpb25zW2ldLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4VG9TY3JvbGwgPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbC5zY3JvbGxUb0luZGV4KGluZGV4VG9TY3JvbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb2tDbGlja2VkKCkge1xuXG4gICAgICAgIGxldCB2YWx1ZXMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5vcmRlcmFibGUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IG8gb2YgdGhpcy5jaGVja2VkT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKG8udmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIE9QVElPTlM6IGZvciAobGV0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGVja2VkIG9mIHRoaXMuY2hlY2tlZE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9PT0gY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goY2hlY2tlZC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBPUFRJT05TO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZXModmFsdWVzKTtcblxuICAgICAgICBpZiAodGhpcy5wb3BvdmVyQ29udHJvbGxlciAmJiB0aGlzLnBvcG92ZXJPdmVybGF5KSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGFsQ29udHJvbGxlciAmJiB0aGlzLm1vZGFsT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuY2VsQ2xpY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNvbnRyb2xsZXIgJiYgdGhpcy5wb3BvdmVyT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RhbENvbnRyb2xsZXIgJiYgdGhpcy5tb2RhbE92ZXJsYXkpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoXCJzZWFyY2hiYXJcIiwge3JlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2V9KVxuICAgIHByaXZhdGUgc2VhcmNoYmFyOiBFbGVtZW50UmVmPEhUTUxJb25TZWFyY2hiYXJFbGVtZW50PjtcblxuICAgIHNlYXJjaChldjogYW55KSB7XG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5zZWFyY2hiYXIubmF0aXZlRWxlbWVudC52YWx1ZSA/IHRoaXMuc2VhcmNoYmFyLm5hdGl2ZUVsZW1lbnQudmFsdWUudG9TdHJpbmcoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbyBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgICAgICBvLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvLmhpZGRlbiA9IHRoaXMuc2VhcmNoSGFuZGxlciA/ICF0aGlzLnNlYXJjaEhhbmRsZXIocXVlcnksIG8udmFsdWUsIG8ubGFiZWwpIDogKG8ubGFiZWwgfHwgXCJcIikudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5KSA8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1aWxkVmlzaWJsZU9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBpZiAodGhpcy5wb3BvdmVyT3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5pbml0T3B0aW9ucygpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tbW9kYWxcIik7XG5cbiAgICAgICAgICAgIGlmIChtb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbC1pb3NcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1IZWlnaHQgPSA0NC41NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtSGVpZ2h0ID0gNDk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiKVxuICAgIC8qcHJpdmF0ZSovIGFzeW5jIHJlc2V0U2Nyb2xsSGVpZ2h0KCkge1xuXG4gICAgICAgIGNvbnN0IG9sZEhlaWdodCA9IHRoaXMuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIGlmIChuZXdIZWlnaHQgPT0gb2xkSGVpZ2h0KSB7XG4gICAgICAgICAgICBhd2FpdCB3YWl0VGlsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ID0gdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdIZWlnaHQgIT09IG9sZEhlaWdodDtcbiAgICAgICAgICAgIH0sIHVuZGVmaW5lZCwgMjAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IG5ld0hlaWdodDtcblxuICAgICAgICBpZiAodHlwZW9mIG9sZEhlaWdodCAhPT0gXCJudW1iZXJcIiAmJiB0aGlzLnNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGwuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGlvblZpZXdEaWRFbnRlcigpIHtcblxuICAgICAgICBpZiAodGhpcy5tb2RhbE92ZXJsYXkpIHtcblxuICAgICAgICAgICAgdGhpcy5yZXNldFNjcm9sbEhlaWdodCgpO1xuXG4gICAgICAgICAgICBpZiAoIXdpbmRvd1tcImNvcmRvdmFcIl0gfHwgd2luZG93W1wiY29yZG92YVwiXS5wbGF0Zm9ybUlkID09PSBcImJyb3dzZXJcIikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHdhaXRUaWxsKCgpID0+ICEhdGhpcy5zZWFyY2hiYXIgJiYgISF0aGlzLnNlYXJjaGJhci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hiYXIubmF0aXZlRWxlbWVudC5zZXRGb2N1cygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmluaXRPcHRpb25zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==