import { __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { Input, ContentChild, Component, NgModule } from '@angular/core';
import { IonToggle, IonicModule } from '@ionic/angular';

let ToggleLabels = class ToggleLabels {
    constructor() {
    }
    switchOn() {
        this.toggle.checked = true;
    }
    switchOff() {
        this.toggle.checked = false;
    }
};
__decorate([
    Input()
], ToggleLabels.prototype, "on", void 0);
__decorate([
    Input()
], ToggleLabels.prototype, "off", void 0);
__decorate([
    ContentChild(IonToggle, { static: false })
], ToggleLabels.prototype, "toggle", void 0);
ToggleLabels = __decorate([
    Component({
        selector: "ionx-toggle-labels",
        template: "<span ionx--off (click)=\"switchOff()\">\n    <ng-template [ngIf]=\"!!off\">{{off}}</ng-template>\n    <ng-content select=\"[slot=off]\"></ng-content>\n    </span>\n\n<ng-content select=\"ion-toggle\"></ng-content>\n\n<span ionx--on (click)=\"switchOn()\">\n    <ng-template [ngIf]=\"!!on\">{{on}}</ng-template>\n    <ng-content select=\"[slot=on]\"></ng-content>\n</span>\n",
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}:host ::ng-deep ion-toggle{-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:2px;padding-inline-end:2px}:host [ionx--on]{cursor:pointer;margin-left:4px}:host [ionx--off]{cursor:pointer;margin-right:4px}:host-context(.item-label-stacked){align-self:flex-start}:host-context(.ios.item-label-stacked){margin-top:2px;margin-bottom:2px}"]
    })
], ToggleLabels);

let ToggleLabelsModule = class ToggleLabelsModule {
};
ToggleLabelsModule = __decorate([
    NgModule({
        declarations: [ToggleLabels],
        exports: [ToggleLabels],
        imports: [CommonModule, IonicModule]
    })
], ToggleLabelsModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ToggleLabels, ToggleLabelsModule };
//# sourceMappingURL=toggle-labels-module.js.map
