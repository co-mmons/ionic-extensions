import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
var Buttons = /** @class */ (function () {
    function Buttons() {
    }
    Buttons = tslib_1.__decorate([
        Component({
            selector: "ionx-buttons",
            template: "<ng-content></ng-content>",
            styles: ["\n        :host {\n            display: flex;\n            align-items: center;\n            transform: translateZ(0);\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button {\n            height: 32px;\n            --padding-top: 0;\n            --padding-bottom: 0;\n            margin: 0px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear {\n            --padding-start: 8px;\n            --padding-end: 8px;\n            margin: 0px 8px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear + ion-button.button-clear {\n            margin-left: 0px;\n        }\n        \n        :host-context(.ios ion-toolbar) ::ng-deep ion-button {\n            font-weight: 400;\n        }\n    "]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], Buttons);
    return Buttons;
}());
export { Buttons };
//# sourceMappingURL=buttons.js.map