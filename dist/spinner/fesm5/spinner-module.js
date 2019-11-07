import { __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { Input, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

var Spinner = /** @class */ (function () {
    function Spinner() {
        this.backdropVisible = false;
        this.fill = false;
    }
    __decorate([
        Input()
    ], Spinner.prototype, "backdropVisible", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "fill", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "color", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "name", void 0);
    Spinner = __decorate([
        Component({
            selector: "ionx-spinner",
            template: "<ion-backdrop *ngIf=\"backdropVisible\"></ion-backdrop><ion-spinner [name]=\"name\" [color]=\"color\"></ion-spinner>",
            styles: [":host{position:relative;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host ion-backdrop{opacity:.1}:host[fill]{position:absolute;width:100%;height:100%;left:0;top:0}:host[always-on-top]{z-index:100000}"]
        })
    ], Spinner);
    return Spinner;
}());

var SpinnerModule = /** @class */ (function () {
    function SpinnerModule() {
    }
    SpinnerModule = __decorate([
        NgModule({
            declarations: [Spinner],
            exports: [Spinner],
            imports: [CommonModule, IonicModule]
        })
    ], SpinnerModule);
    return SpinnerModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Spinner, SpinnerModule };
//# sourceMappingURL=spinner-module.js.map
