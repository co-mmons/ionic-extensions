import { __decorate, __param, __awaiter } from 'tslib';
import { Optional, ElementRef, Input, HostListener, Directive, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { IonBackButtonDelegate, IonRouterOutlet, NavController } from '@ionic/angular';
import { waitTill, sleep } from '@co.mmons/js-utils/core';

IonBackButtonDelegate.prototype.onClick = () => null;
let IonicBackButtonFix = class IonicBackButtonFix {
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
};
IonicBackButtonFix.ctorParameters = () => [
    { type: Router },
    { type: IonRouterOutlet, decorators: [{ type: Optional }] },
    { type: NavController },
    { type: ElementRef }
];
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

let IonicInputFix = class IonicInputFix {
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
};
IonicInputFix.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input("tabIndex")
], IonicInputFix.prototype, "tabIndex", void 0);
IonicInputFix = __decorate([
    Directive({
        selector: "ion-input[ionfix-input]"
    })
], IonicInputFix);

let IonicItemTargetFix = class IonicItemTargetFix {
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
};
IonicItemTargetFix.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], IonicItemTargetFix.prototype, "target", void 0);
IonicItemTargetFix = __decorate([
    Directive({
        selector: "ion-item[target]"
    })
], IonicItemTargetFix);

let IonicFixModule = class IonicFixModule {
};
IonicFixModule = __decorate([
    NgModule({
        declarations: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix],
        exports: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix]
    })
], IonicFixModule);

/**
 * Generated bundle index. Do not edit.
 */

export { IonicFixModule, IonicInputFix as ɵa, IonicBackButtonFix as ɵb, IonicItemTargetFix as ɵc };
//# sourceMappingURL=ionic-fix-module.js.map
