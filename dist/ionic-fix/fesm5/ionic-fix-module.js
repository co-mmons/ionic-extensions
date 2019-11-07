import { __decorate, __param, __awaiter, __generator } from 'tslib';
import { Optional, ElementRef, Input, HostListener, Directive, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { IonBackButtonDelegate, IonRouterOutlet, NavController } from '@ionic/angular';
import { waitTill, sleep } from '@co.mmons/js-utils/core';

IonBackButtonDelegate.prototype.onClick = function () { return null; };
var IonicBackButtonFix = /** @class */ (function () {
    function IonicBackButtonFix(router, routerOutlet, navCtrl, elementRef) {
        this.router = router;
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
    }
    Object.defineProperty(IonicBackButtonFix.prototype, "defaultHref", {
        get: function () {
            return this.elementRef.nativeElement.defaultHref;
        },
        set: function (value) {
            this.elementRef.nativeElement.defaultHref = value;
        },
        enumerable: true,
        configurable: true
    });
    IonicBackButtonFix.prototype.onClick = function (ev) {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            this.navCtrl.back({ animated: true });
            ev.preventDefault();
        }
        else if (this.router && this.defaultHref != null) {
            this.navCtrl.navigateBack(this.defaultHref);
            ev.preventDefault();
        }
    };
    IonicBackButtonFix.ctorParameters = function () { return [
        { type: Router },
        { type: IonRouterOutlet, decorators: [{ type: Optional }] },
        { type: NavController },
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], IonicBackButtonFix.prototype, "defaultHref", null);
    __decorate([
        HostListener("click", ["$event"])
    ], IonicBackButtonFix.prototype, "onClick", null);
    IonicBackButtonFix = __decorate([
        Directive({
            selector: "ion-back-button"
        }),
        __param(1, Optional())
    ], IonicBackButtonFix);
    return IonicBackButtonFix;
}());

var IonicInputFix = /** @class */ (function () {
    function IonicInputFix(element) {
        this.element = element;
    }
    IonicInputFix.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var realInput;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.tabIndex) return [3 /*break*/, 2];
                        this.element.nativeElement.removeAttribute("tabIndex");
                        return [4 /*yield*/, waitTill(function () { return !!_this.element.nativeElement.shadowRoot && !!_this.element.nativeElement.shadowRoot.querySelector(".native-input"); })];
                    case 1:
                        _a.sent();
                        realInput = this.element.nativeElement.shadowRoot.querySelector(".native-input");
                        realInput.setAttribute("tabIndex", this.tabIndex);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    IonicInputFix.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input("tabIndex")
    ], IonicInputFix.prototype, "tabIndex", void 0);
    IonicInputFix = __decorate([
        Directive({
            selector: "ion-input[ionfix-input]"
        })
    ], IonicInputFix);
    return IonicInputFix;
}());

var IonicItemTargetFix = /** @class */ (function () {
    function IonicItemTargetFix(element) {
        this.element = element;
    }
    IonicItemTargetFix.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.target) return [3 /*break*/, 5];
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i < 20)) return [3 /*break*/, 5];
                        a = (this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".item-native")) || undefined;
                        if (!!a) return [3 /*break*/, 3];
                        return [4 /*yield*/, sleep(i * 100)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        a.setAttribute("target", this.target);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    IonicItemTargetFix.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], IonicItemTargetFix.prototype, "target", void 0);
    IonicItemTargetFix = __decorate([
        Directive({
            selector: "ion-item[target]"
        })
    ], IonicItemTargetFix);
    return IonicItemTargetFix;
}());

var IonicFixModule = /** @class */ (function () {
    function IonicFixModule() {
    }
    IonicFixModule = __decorate([
        NgModule({
            declarations: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix],
            exports: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix]
        })
    ], IonicFixModule);
    return IonicFixModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { IonicFixModule, IonicInputFix as ɵa, IonicBackButtonFix as ɵb, IonicItemTargetFix as ɵc };
//# sourceMappingURL=ionic-fix-module.js.map
