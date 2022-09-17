import { CommonModule } from '@angular/common';
import { Component, Input, ContentChild, NgModule } from '@angular/core';
import { IonToggle, IonicModule } from '@ionic/angular';

class ToggleLabels {
    constructor() {
    }
    switchOn() {
        this.toggle.checked = true;
    }
    switchOff() {
        this.toggle.checked = false;
    }
}
ToggleLabels.decorators = [
    { type: Component, args: [{
                selector: "ionx-toggle-labels",
                template: "<span ionx--off (click)=\"switchOff()\">\n    <ng-template [ngIf]=\"!!off\">{{off}}</ng-template>\n    <ng-content select=\"[slot=off]\"></ng-content>\n    </span>\n\n<ng-content select=\"ion-toggle\"></ng-content>\n\n<span ionx--on (click)=\"switchOn()\">\n    <ng-template [ngIf]=\"!!on\">{{on}}</ng-template>\n    <ng-content select=\"[slot=on]\"></ng-content>\n</span>\n",
                styles: [":host{display:flex;align-items:center}:host ::ng-deep ion-toggle{padding-inline-start:2px;padding-inline-end:2px}:host [ionx--on]{cursor:pointer;margin-left:4px}:host [ionx--off]{cursor:pointer;margin-right:4px}:host-context(.item-label-stacked){align-self:flex-start}:host-context(.ios .item-label-stacked){margin-top:2px;margin-bottom:2px}\n"]
            },] }
];
ToggleLabels.ctorParameters = () => [];
ToggleLabels.propDecorators = {
    on: [{ type: Input }],
    off: [{ type: Input }],
    toggle: [{ type: ContentChild, args: [IonToggle, { static: false },] }]
};

class ToggleLabelsModule {
}
ToggleLabelsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ToggleLabels],
                exports: [ToggleLabels],
                imports: [CommonModule, IonicModule]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { ToggleLabels, ToggleLabelsModule };
//# sourceMappingURL=toggle-labels-module.js.map
