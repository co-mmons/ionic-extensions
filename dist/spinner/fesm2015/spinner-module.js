import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

class Spinner {
    constructor() {
        this.backdropVisible = false;
        this.fill = false;
    }
}
Spinner.decorators = [
    { type: Component, args: [{
                selector: "ionx-spinner",
                template: `<ion-backdrop *ngIf="backdropVisible"></ion-backdrop><ion-spinner [name]="name" [color]="color"></ion-spinner>`,
                styles: [":host{position:relative;display:flex;align-items:center;justify-content:center;--spinner--backdrop-background-color: var(--backdrop-background-color, #000);--spinner--backdrop-opacity: var(--backdrop-opacity, .1)}:host ion-backdrop{opacity:var(--spinner--backdrop-opacity);background-color:var(--spinner--backdrop-background-color)}:host[fill]{position:absolute;width:100%;height:100%;left:0px;top:0px}:host[always-on-top]{z-index:100000}:host.ionx--backdrop-visible ion-backdrop{z-index:1}:host.ionx--backdrop-visible ion-spinner{z-index:2}\n"]
            },] }
];
Spinner.propDecorators = {
    backdropVisible: [{ type: Input }, { type: HostBinding, args: ["class.ionx--backdrop-visible",] }],
    fill: [{ type: Input }],
    color: [{ type: Input }],
    name: [{ type: Input }]
};

class SpinnerModule {
}
SpinnerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [Spinner],
                exports: [Spinner],
                imports: [CommonModule, IonicModule]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Spinner, SpinnerModule };
//# sourceMappingURL=spinner-module.js.map
