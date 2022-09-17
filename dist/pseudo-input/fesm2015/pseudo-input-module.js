import { Component, ElementRef, NgModule } from '@angular/core';

class PseudoInput {
    constructor(element) {
        this.element = element;
    }
}
PseudoInput.decorators = [
    { type: Component, args: [{
                selector: "ionx-pseudo-input",
                exportAs: "ionxPseudoInput",
                template: "<ng-content></ng-content>",
                styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;user-select:text}:host-context(.item-label-stacked){align-self:flex-start;--padding-start: 0}:host-context(.md .item-label-stacked){--padding-top: 10px;--padding-bottom: 9px}:host-context(.ios .item-label-stacked){--padding-top: 9px;--padding-bottom: 8px}\n"]
            },] }
];
PseudoInput.ctorParameters = () => [
    { type: ElementRef }
];

class PseudoInputModule {
}
PseudoInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [PseudoInput],
                exports: [PseudoInput]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { PseudoInput, PseudoInputModule };
//# sourceMappingURL=pseudo-input-module.js.map
