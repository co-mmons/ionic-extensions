(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@ionic/angular')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/toggle-labels', ['exports', '@angular/common', '@angular/core', '@ionic/angular'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"]["toggle-labels"] = {}), global.ng.common, global.ng.core, global.angular));
})(this, (function (exports, common, core, angular) { 'use strict';

    var ToggleLabels = /** @class */ (function () {
        function ToggleLabels() {
        }
        ToggleLabels.prototype.switchOn = function () {
            this.toggle.checked = true;
        };
        ToggleLabels.prototype.switchOff = function () {
            this.toggle.checked = false;
        };
        return ToggleLabels;
    }());
    ToggleLabels.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-toggle-labels",
                    template: "<span ionx--off (click)=\"switchOff()\">\n    <ng-template [ngIf]=\"!!off\">{{off}}</ng-template>\n    <ng-content select=\"[slot=off]\"></ng-content>\n    </span>\n\n<ng-content select=\"ion-toggle\"></ng-content>\n\n<span ionx--on (click)=\"switchOn()\">\n    <ng-template [ngIf]=\"!!on\">{{on}}</ng-template>\n    <ng-content select=\"[slot=on]\"></ng-content>\n</span>\n",
                    styles: [":host{display:flex;align-items:center}:host ::ng-deep ion-toggle{padding-inline-start:2px;padding-inline-end:2px}:host [ionx--on]{cursor:pointer;margin-left:4px}:host [ionx--off]{cursor:pointer;margin-right:4px}:host-context(.item-label-stacked){align-self:flex-start}:host-context(.ios .item-label-stacked){margin-top:2px;margin-bottom:2px}\n"]
                },] }
    ];
    ToggleLabels.ctorParameters = function () { return []; };
    ToggleLabels.propDecorators = {
        on: [{ type: core.Input }],
        off: [{ type: core.Input }],
        toggle: [{ type: core.ContentChild, args: [angular.IonToggle, { static: false },] }]
    };

    var ToggleLabelsModule = /** @class */ (function () {
        function ToggleLabelsModule() {
        }
        return ToggleLabelsModule;
    }());
    ToggleLabelsModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [ToggleLabels],
                    exports: [ToggleLabels],
                    imports: [common.CommonModule, angular.IonicModule]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ToggleLabels = ToggleLabels;
    exports.ToggleLabelsModule = ToggleLabelsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=toggle-labels-module.umd.js.map
