import { __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { ElementRef, Input, Directive, NgModule } from '@angular/core';
import { MatchMediaModule } from '@co.mmons/angular-extensions/browser/match-media';
import { IonicFixModule } from '@co.mmons/ionic-extensions/ionic-fix';
import { IonicModule } from '@ionic/angular';

let BackButton = class BackButton {
    // template: `<ion-back-button [style.display]="modal ? 'inline-block' : null" [disabled]="disabled" [defaultHref]="defaultHref" [icon]="icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')"></ion-back-button>`
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (!!this.elementRef.nativeElement.closest("ion-modal")) {
            this.elementRef.nativeElement.style.setProperty("display", "inline-block");
        }
    }
};
BackButton.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], BackButton.prototype, "icon", void 0);
BackButton = __decorate([
    Directive({
        selector: "ion-back-button[ionx-back-button]",
    })
], BackButton);

let BackButtonModule = class BackButtonModule {
};
BackButtonModule = __decorate([
    NgModule({
        declarations: [BackButton],
        exports: [BackButton],
        imports: [CommonModule, IonicModule, MatchMediaModule, IonicFixModule]
    })
], BackButtonModule);

/**
 * Generated bundle index. Do not edit.
 */

export { BackButton, BackButtonModule };
//# sourceMappingURL=back-button-module.js.map
