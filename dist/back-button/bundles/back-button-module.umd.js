(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@co.mmons/angular-extensions/browser/match-media'), require('@co.mmons/ionic-extensions/ionic-fix'), require('@ionic/angular')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/back-button', ['exports', '@angular/common', '@angular/core', '@co.mmons/angular-extensions/browser/match-media', '@co.mmons/ionic-extensions/ionic-fix', '@ionic/angular'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"]["back-button"] = {}), global.ng.common, global.ng.core, global.matchMedia, global.ionicFix, global.angular));
})(this, (function (exports, common, core, matchMedia, ionicFix, angular) { 'use strict';

    var BackButton = /** @class */ (function () {
        // template: `<ion-back-button [style.display]="modal ? 'inline-block' : null" [disabled]="disabled" [defaultHref]="defaultHref" [icon]="icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')"></ion-back-button>`
        function BackButton(elementRef) {
            this.elementRef = elementRef;
        }
        BackButton.prototype.ngOnInit = function () {
            if (!!this.elementRef.nativeElement.closest("ion-modal")) {
                this.elementRef.nativeElement.style.setProperty("display", "inline-block");
            }
        };
        return BackButton;
    }());
    BackButton.decorators = [
        { type: core.Directive, args: [{
                    selector: "ion-back-button[ionx-back-button]",
                },] }
    ];
    BackButton.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    BackButton.propDecorators = {
        icon: [{ type: core.Input }]
    };

    var BackButtonModule = /** @class */ (function () {
        function BackButtonModule() {
        }
        return BackButtonModule;
    }());
    BackButtonModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [BackButton],
                    exports: [BackButton],
                    imports: [common.CommonModule, angular.IonicModule, matchMedia.MatchMediaModule, ionicFix.IonicFixModule]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BackButton = BackButton;
    exports.BackButtonModule = BackButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=back-button-module.umd.js.map
