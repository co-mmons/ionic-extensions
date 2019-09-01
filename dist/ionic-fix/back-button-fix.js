import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IonRouterOutlet, NavController, IonBackButtonDelegate } from "@ionic/angular";
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], IonicBackButtonFix.prototype, "defaultHref", null);
    tslib_1.__decorate([
        HostListener("click", ["$event"]),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Event]),
        tslib_1.__metadata("design:returntype", void 0)
    ], IonicBackButtonFix.prototype, "onClick", null);
    IonicBackButtonFix = tslib_1.__decorate([
        Directive({
            selector: "ion-back-button"
        }),
        tslib_1.__metadata("design:paramtypes", [Router, IonRouterOutlet, NavController, ElementRef])
    ], IonicBackButtonFix);
    return IonicBackButtonFix;
}());
export { IonicBackButtonFix };
//# sourceMappingURL=back-button-fix.js.map