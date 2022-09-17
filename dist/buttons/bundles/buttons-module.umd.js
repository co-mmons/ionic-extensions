(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/buttons', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"].buttons = {}), global.ng.core));
})(this, (function (exports, core) { 'use strict';

    var Buttons = /** @class */ (function () {
        function Buttons() {
        }
        return Buttons;
    }());
    Buttons.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-buttons",
                    template: "<ng-content></ng-content>",
                    styles: ["\n        :host {\n            display: flex;\n            align-items: center;\n            transform: translateZ(0);\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button {\n            height: 32px;\n            --padding-top: 0;\n            --padding-bottom: 0;\n            margin: 0px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear {\n            --padding-start: 8px;\n            --padding-end: 8px;\n            margin: 0px 8px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear + ion-button.button-clear {\n            margin-left: 0px;\n        }\n        \n        :host-context(.ios ion-toolbar) ::ng-deep ion-button {\n            font-weight: 400;\n        }\n    "]
                },] }
    ];
    Buttons.ctorParameters = function () { return []; };

    var ButtonsModule = /** @class */ (function () {
        function ButtonsModule() {
        }
        return ButtonsModule;
    }());
    ButtonsModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [Buttons],
                    exports: [Buttons]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Buttons = Buttons;
    exports.ButtonsModule = ButtonsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=buttons-module.umd.js.map
