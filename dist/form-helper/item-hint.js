var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FormItemHint.prototype, "icon", void 0);
    __decorate([
        ViewChild("labelComponentContainer", { read: ViewContainerRef, static: true }),
        __metadata("design:type", ViewContainerRef)
    ], FormItemHint.prototype, "labelComponentContainer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", ComponentRef),
        __metadata("design:paramtypes", [ComponentRef])
    ], FormItemHint.prototype, "label", null);
    FormItemHint = __decorate([
        Component({
            selector: "ionx-form-item-hint",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"icon\"></ion-icon>\n        <label>\n            <template #labelComponentContainer></template>\n            <ng-content></ng-content>\n        </label>\n    "
        }),
        __metadata("design:paramtypes", [])
    ], FormItemHint);
    return FormItemHint;
}());
export { FormItemHint };
//# sourceMappingURL=item-hint.js.map