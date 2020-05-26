import { __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { Input, HostBinding, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

let Spinner = class Spinner {
    constructor() {
        this.backdropVisible = false;
        this.fill = false;
    }
};
__decorate([
    Input(),
    HostBinding("class.ionx--backdrop-visible")
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
        template: `<ion-backdrop *ngIf="backdropVisible"></ion-backdrop><ion-spinner [name]="name" [color]="color"></ion-spinner>`,
        styles: [":host{position:relative;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;--spinner--backdrop-background-color:var(--backdrop-background-color, #000);--spinner--backdrop-opacity:var(--backdrop-opacity, .1)}:host ion-backdrop{opacity:var(--spinner--backdrop-opacity);background-color:var(--spinner--backdrop-background-color)}:host[fill]{position:absolute;width:100%;height:100%;left:0;top:0}:host[always-on-top]{z-index:100000}:host.ionx--backdrop-visible ion-backdrop{z-index:1}:host.ionx--backdrop-visible ion-spinner{z-index:2}"]
    })
], Spinner);

let SpinnerModule = class SpinnerModule {
};
SpinnerModule = __decorate([
    NgModule({
        declarations: [Spinner],
        exports: [Spinner],
        imports: [CommonModule, IonicModule]
    })
], SpinnerModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Spinner, SpinnerModule };
//# sourceMappingURL=spinner-module.js.map
