var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostBinding, Input } from "@angular/core";
var FormHeading = /** @class */ (function () {
    function FormHeading() {
    }
    __decorate([
        HostBinding("attr.sticky"),
        Input(),
        __metadata("design:type", Boolean)
    ], FormHeading.prototype, "sticky", void 0);
    FormHeading = __decorate([
        Component({
            selector: "ionx-form-heading",
            template: "\n        <ng-content select=\"ion-item\"></ng-content>\n        <div ionx--under>\n            <ng-content></ng-content>\n        </div>\n    ",
            styles: [
                "\n            :host { display: block; margin-top: 16px; }  \n            \n            :host ::ng-deep ion-item { --padding-start: 0px; --padding-end: 0px; --inner-padding-end: 16px; --inner-padding-start: 16px; }  \n            :host ::ng-deep ion-item > ion-label { font-size: 0.9rem; font-weight: 500; }  \n            :host-context(ion-grid) ::ng-deep ion-item { --padding-start: 8px; --padding-end: 8px; --inner-padding-end: 0px; --inner-padding-start: 0px; }\n\n            :host [ionx--under]:not(:empty) { padding: 8px 16px; }\n            :host-context(ion-grid) [ionx--under]:not(:empty) { padding: 8px; }\n            \n            :host-context(.ios) ::ng-deep ion-item.item-label > ion-label { font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; }\n            \n            :host[sticky]:not([sticky=false]) { position: sticky; top: 0px; z-index: 3; }\n        "
            ]
        }),
        __metadata("design:paramtypes", [])
    ], FormHeading);
    return FormHeading;
}());
export { FormHeading };
//# sourceMappingURL=heading.js.map