var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
var Buttons = /** @class */ (function () {
    function Buttons() {
    }
    Buttons = __decorate([
        Component({
            selector: "ionx-buttons",
            template: "<ng-content></ng-content>",
            styles: ["\n        :host {\n            display: flex;\n            align-items: center;\n            transform: translateZ(0);\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button {\n            height: 32px;\n            --padding-top: 0;\n            --padding-bottom: 0;\n            margin: 0px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear {\n            --padding-start: 8px;\n            --padding-end: 8px;\n            margin: 0px 8px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear + ion-button.button-clear {\n            margin-left: 0px;\n        }\n        \n        :host-context(.ios ion-toolbar) ::ng-deep ion-button {\n            font-weight: 400;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [])
    ], Buttons);
    return Buttons;
}());
export { Buttons };
//# sourceMappingURL=buttons.js.map