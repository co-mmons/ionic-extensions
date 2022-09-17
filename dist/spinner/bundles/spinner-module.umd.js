(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ionic/angular')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/spinner', ['exports', '@angular/common', '@angular/core', '@ionic/angular'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"].spinner = {}), global.ng.common, global.ng.core, global.angular));
})(this, (function (exports, common, core, angular) { 'use strict';

    var Spinner = /** @class */ (function () {
        function Spinner() {
            this.backdropVisible = false;
            this.fill = false;
        }
        return Spinner;
    }());
    Spinner.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-spinner",
                    template: "<ion-backdrop *ngIf=\"backdropVisible\"></ion-backdrop><ion-spinner [name]=\"name\" [color]=\"color\"></ion-spinner>",
                    styles: [":host{position:relative;display:flex;align-items:center;justify-content:center;--spinner--backdrop-background-color: var(--backdrop-background-color, #000);--spinner--backdrop-opacity: var(--backdrop-opacity, .1)}:host ion-backdrop{opacity:var(--spinner--backdrop-opacity);background-color:var(--spinner--backdrop-background-color)}:host[fill]{position:absolute;width:100%;height:100%;left:0px;top:0px}:host[always-on-top]{z-index:100000}:host.ionx--backdrop-visible ion-backdrop{z-index:1}:host.ionx--backdrop-visible ion-spinner{z-index:2}\n"]
                },] }
    ];
    Spinner.propDecorators = {
        backdropVisible: [{ type: core.Input }, { type: core.HostBinding, args: ["class.ionx--backdrop-visible",] }],
        fill: [{ type: core.Input }],
        color: [{ type: core.Input }],
        name: [{ type: core.Input }]
    };

    var SpinnerModule = /** @class */ (function () {
        function SpinnerModule() {
        }
        return SpinnerModule;
    }());
    SpinnerModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [Spinner],
                    exports: [Spinner],
                    imports: [common.CommonModule, angular.IonicModule]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Spinner = Spinner;
    exports.SpinnerModule = SpinnerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=spinner-module.umd.js.map
