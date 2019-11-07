import { __decorate } from 'tslib';
import { ElementRef, Component, NgModule } from '@angular/core';

let PseudoInput = class PseudoInput {
    constructor(element) {
        this.element = element;
    }
};
PseudoInput.ctorParameters = () => [
    { type: ElementRef }
];
PseudoInput = __decorate([
    Component({
        selector: "ionx-pseudo-input",
        exportAs: "ionxPseudoInput",
        template: "<ng-content></ng-content>",
        styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}:host-context(.item-label-stacked){align-self:flex-start;--padding-start:0}:host-context(.md.item-label-stacked){--padding-top:10px;--padding-bottom:9px}:host-context(.ios.item-label-stacked){--padding-top:9px;--padding-bottom:8px}"]
    })
], PseudoInput);

let PseudoInputModule = class PseudoInputModule {
};
PseudoInputModule = __decorate([
    NgModule({
        declarations: [PseudoInput],
        exports: [PseudoInput]
    })
], PseudoInputModule);

/**
 * Generated bundle index. Do not edit.
 */

export { PseudoInput, PseudoInputModule };
//# sourceMappingURL=pseudo-input-module.js.map
