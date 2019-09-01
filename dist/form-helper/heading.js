import * as tslib_1 from "tslib";
import { Component, HostBinding, Input } from "@angular/core";
var FormHeading = /** @class */ (function () {
    function FormHeading() {
    }
    tslib_1.__decorate([
        HostBinding("attr.sticky"),
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], FormHeading.prototype, "sticky", void 0);
    FormHeading = tslib_1.__decorate([
        Component({
            selector: "ionx-form-heading",
            template: "\n        <ng-content select=\"ion-item\"></ng-content>\n        <div ionx--under>\n            <ng-content></ng-content>\n        </div>\n    ",
            styles: [
                "\n            :host { display: block; margin-top: 16px; }  \n            \n            :host ::ng-deep ion-item { --padding-start: 0px; --padding-end: 0px; --inner-padding-end: 16px; --inner-padding-start: 16px; }  \n            :host ::ng-deep ion-item > ion-label { font-size: 0.9rem; font-weight: 500; }  \n            :host-context(ion-grid) ::ng-deep ion-item { --padding-start: 8px; --padding-end: 8px; --inner-padding-end: 0px; --inner-padding-start: 0px; }\n\n            :host [ionx--under]:not(:empty) { padding: 8px 16px; }\n            :host-context(ion-grid) [ionx--under]:not(:empty) { padding: 8px; }\n            \n            :host-context(.ios) ::ng-deep ion-item.item-label > ion-label { font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; }\n            \n            :host[sticky]:not([sticky=false]) { position: sticky; top: 0px; z-index: 3; }\n        "
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormHeading);
    return FormHeading;
}());
export { FormHeading };
//# sourceMappingURL=heading.js.map