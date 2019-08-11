var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], IonicBackButtonFix.prototype, "defaultHref", null);
    __decorate([
        HostListener("click", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], IonicBackButtonFix.prototype, "onClick", null);
    IonicBackButtonFix = __decorate([
        Directive({
            selector: "ion-back-button"
        }),
        __metadata("design:paramtypes", [Router, IonRouterOutlet, NavController, ElementRef])
    ], IonicBackButtonFix);
    return IonicBackButtonFix;
}());
export { IonicBackButtonFix };
//# sourceMappingURL=back-button-fix.js.map