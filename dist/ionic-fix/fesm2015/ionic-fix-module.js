import { Directive, Optional, ElementRef, Input, HostListener, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { IonBackButtonDelegate, IonRouterOutlet, NavController } from '@ionic/angular';
import { __awaiter } from 'tslib';
import { waitTill, sleep } from '@co.mmons/js-utils/core';

IonBackButtonDelegate.prototype.onClick = () => null;
class IonicBackButtonFix {
    constructor(router, routerOutlet, navCtrl, elementRef) {
        this.router = router;
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
    }
    set defaultHref(value) {
        this.elementRef.nativeElement.defaultHref = value;
    }
    get defaultHref() {
        return this.elementRef.nativeElement.defaultHref;
    }
    onClick(ev) {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            this.navCtrl.back({ animated: true });
            ev.preventDefault();
        }
        else if (this.router && this.defaultHref != null) {
            this.navCtrl.navigateBack(this.defaultHref);
            ev.preventDefault();
        }
    }
}
IonicBackButtonFix.decorators = [
    { type: Directive, args: [{
                selector: "ion-back-button"
            },] }
];
IonicBackButtonFix.ctorParameters = () => [
    { type: Router },
    { type: IonRouterOutlet, decorators: [{ type: Optional }] },
    { type: NavController },
    { type: ElementRef }
];
IonicBackButtonFix.propDecorators = {
    defaultHref: [{ type: Input }],
    onClick: [{ type: HostListener, args: ["click", ["$event"],] }]
};

class IonicInputFix {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tabIndex) {
                this.element.nativeElement.removeAttribute("tabIndex");
                yield waitTill(() => !!this.element.nativeElement.shadowRoot && !!this.element.nativeElement.shadowRoot.querySelector(".native-input"));
                let realInput = this.element.nativeElement.shadowRoot.querySelector(".native-input");
                realInput.setAttribute("tabIndex", this.tabIndex);
            }
        });
    }
}
IonicInputFix.decorators = [
    { type: Directive, args: [{
                selector: "ion-input[ionfix-input]"
            },] }
];
IonicInputFix.ctorParameters = () => [
    { type: ElementRef }
];
IonicInputFix.propDecorators = {
    tabIndex: [{ type: Input, args: ["tabIndex",] }]
};

class IonicItemTargetFix {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.target) {
                for (let i = 1; i < 20; i++) {
                    const a = (this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".item-native")) || undefined;
                    if (!a) {
                        yield sleep(i * 100);
                    }
                    else {
                        a.setAttribute("target", this.target);
                    }
                }
            }
        });
    }
}
IonicItemTargetFix.decorators = [
    { type: Directive, args: [{
                selector: "ion-item[target]"
            },] }
];
IonicItemTargetFix.ctorParameters = () => [
    { type: ElementRef }
];
IonicItemTargetFix.propDecorators = {
    target: [{ type: Input }]
};

class IonicFixModule {
}
IonicFixModule.decorators = [
    { type: NgModule, args: [{
                declarations: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix],
                exports: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { IonicFixModule, IonicInputFix as ɵa, IonicBackButtonFix as ɵb, IonicItemTargetFix as ɵc };
//# sourceMappingURL=ionic-fix-module.js.map
