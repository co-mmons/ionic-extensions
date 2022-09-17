(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/pseudo-input', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"]["pseudo-input"] = {}), global.ng.core));
})(this, (function (exports, core) { 'use strict';

    var PseudoInput = /** @class */ (function () {
        function PseudoInput(element) {
            this.element = element;
        }
        return PseudoInput;
    }());
    PseudoInput.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-pseudo-input",
                    exportAs: "ionxPseudoInput",
                    template: "<ng-content></ng-content>",
                    styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;user-select:text}:host-context(.item-label-stacked){align-self:flex-start;--padding-start: 0}:host-context(.md .item-label-stacked){--padding-top: 10px;--padding-bottom: 9px}:host-context(.ios .item-label-stacked){--padding-top: 9px;--padding-bottom: 8px}\n"]
                },] }
    ];
    PseudoInput.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };

    var PseudoInputModule = /** @class */ (function () {
        function PseudoInputModule() {
        }
        return PseudoInputModule;
    }());
    PseudoInputModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [PseudoInput],
                    exports: [PseudoInput]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PseudoInput = PseudoInput;
    exports.PseudoInputModule = PseudoInputModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=pseudo-input-module.umd.js.map
