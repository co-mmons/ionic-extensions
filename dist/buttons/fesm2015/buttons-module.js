import { Component, NgModule } from '@angular/core';

class Buttons {
    constructor() {
    }
}
Buttons.decorators = [
    { type: Component, args: [{
                selector: "ionx-buttons",
                template: `<ng-content></ng-content>`,
                styles: [`
        :host {
            display: flex;
            align-items: center;
            transform: translateZ(0);
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button {
            height: 32px;
            --padding-top: 0;
            --padding-bottom: 0;
            margin: 0px;
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear {
            --padding-start: 8px;
            --padding-end: 8px;
            margin: 0px 8px;
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear + ion-button.button-clear {
            margin-left: 0px;
        }
        
        :host-context(.ios ion-toolbar) ::ng-deep ion-button {
            font-weight: 400;
        }
    `]
            },] }
];
Buttons.ctorParameters = () => [];

class ButtonsModule {
}
ButtonsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [Buttons],
                exports: [Buttons]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Buttons, ButtonsModule };
//# sourceMappingURL=buttons-module.js.map
