import * as tslib_1 from "tslib";
import { Component, ComponentRef, Input, ViewChild, ViewContainerRef } from "@angular/core";
var FormItemHint = /** @class */ (function () {
    function FormItemHint() {
    }
    Object.defineProperty(FormItemHint.prototype, "label", {
        set: function (label) {
            this.labelComponentContainer.clear();
            this.labelComponentContainer.insert(label.hostView);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], FormItemHint.prototype, "icon", void 0);
    tslib_1.__decorate([
        ViewChild("labelComponentContainer", { read: ViewContainerRef, static: true }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], FormItemHint.prototype, "labelComponentContainer", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ComponentRef),
        tslib_1.__metadata("design:paramtypes", [ComponentRef])
    ], FormItemHint.prototype, "label", null);
    FormItemHint = tslib_1.__decorate([
        Component({
            selector: "ionx-form-item-hint",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"icon\"></ion-icon>\n        <label>\n            <template #labelComponentContainer></template>\n            <ng-content></ng-content>\n        </label>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormItemHint);
    return FormItemHint;
}());
export { FormItemHint };
//# sourceMappingURL=item-hint.js.map