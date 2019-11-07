import { __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { ElementRef, Input, Component, NgModule } from '@angular/core';
import { MatchMediaModule } from '@co.mmons/angular-extensions/browser/match-media';
import { IonicFixModule } from '@co.mmons/ionic-extensions/ionic-fix';
import { IonicModule } from '@ionic/angular';

var BackButton = /** @class */ (function () {
    function BackButton(elementRef) {
        this.elementRef = elementRef;
    }
    BackButton.prototype.ngOnInit = function () {
        this.modal = !!this.elementRef.nativeElement.closest("ion-modal");
    };
    BackButton.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], BackButton.prototype, "defaultHref", void 0);
    __decorate([
        Input()
    ], BackButton.prototype, "icon", void 0);
    __decorate([
        Input()
    ], BackButton.prototype, "disabled", void 0);
    BackButton = __decorate([
        Component({
            selector: "ionx-back-button",
            template: "<ion-back-button [style.display]=\"modal ? 'inline-block' : null\" [disabled]=\"disabled\" [defaultHref]=\"defaultHref\" [icon]=\"icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')\"></ion-back-button>",
            styles: [":host{display:inline-block}"]
        })
    ], BackButton);
    return BackButton;
}());

var BackButtonModule = /** @class */ (function () {
    function BackButtonModule() {
    }
    BackButtonModule = __decorate([
        NgModule({
            declarations: [BackButton],
            exports: [BackButton],
            imports: [CommonModule, IonicModule, MatchMediaModule, IonicFixModule]
        })
    ], BackButtonModule);
    return BackButtonModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { BackButton, BackButtonModule };
//# sourceMappingURL=back-button-module.js.map
