import { __decorate } from 'tslib';
import { ElementRef, Component, NgModule } from '@angular/core';

var PseudoInput = /** @class */ (function () {
    function PseudoInput(element) {
        this.element = element;
    }
    PseudoInput.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PseudoInput = __decorate([
        Component({
            selector: "ionx-pseudo-input",
            exportAs: "ionxPseudoInput",
            template: "<ng-content></ng-content>",
            styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}:host-context(.item-label-stacked){align-self:flex-start;--padding-start:0}:host-context(.md.item-label-stacked){--padding-top:10px;--padding-bottom:9px}:host-context(.ios.item-label-stacked){--padding-top:9px;--padding-bottom:8px}"]
        })
    ], PseudoInput);
    return PseudoInput;
}());

var PseudoInputModule = /** @class */ (function () {
    function PseudoInputModule() {
    }
    PseudoInputModule = __decorate([
        NgModule({
            declarations: [PseudoInput],
            exports: [PseudoInput]
        })
    ], PseudoInputModule);
    return PseudoInputModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { PseudoInput, PseudoInputModule };
//# sourceMappingURL=pseudo-input-module.js.map
