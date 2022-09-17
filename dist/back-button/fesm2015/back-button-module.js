import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Input, NgModule } from '@angular/core';
import { MatchMediaModule } from '@co.mmons/angular-extensions/browser/match-media';
import { IonicFixModule } from '@co.mmons/ionic-extensions/ionic-fix';
import { IonicModule } from '@ionic/angular';

class BackButton {
    // template: `<ion-back-button [style.display]="modal ? 'inline-block' : null" [disabled]="disabled" [defaultHref]="defaultHref" [icon]="icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')"></ion-back-button>`
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (!!this.elementRef.nativeElement.closest("ion-modal")) {
            this.elementRef.nativeElement.style.setProperty("display", "inline-block");
        }
    }
}
BackButton.decorators = [
    { type: Directive, args: [{
                selector: "ion-back-button[ionx-back-button]",
            },] }
];
BackButton.ctorParameters = () => [
    { type: ElementRef }
];
BackButton.propDecorators = {
    icon: [{ type: Input }]
};

class BackButtonModule {
}
BackButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [BackButton],
                exports: [BackButton],
                imports: [CommonModule, IonicModule, MatchMediaModule, IonicFixModule]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { BackButton, BackButtonModule };
//# sourceMappingURL=back-button-module.js.map
