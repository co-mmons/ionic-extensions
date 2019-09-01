import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
var ModalControllerComponent = /** @class */ (function () {
    function ModalControllerComponent(controller) {
        this.controller = controller;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.didDismiss = new EventEmitter();
        this.willDismiss = new EventEmitter();
        this._presented = false;
    }
    ModalControllerComponent.prototype.present = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // already opened - should we close existing and open new?
                        if (this.modal) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.controller.create({ component: ModalControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.backdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass })];
                    case 1:
                        _a.modal = (_b.sent());
                        this.willEnter.next();
                        return [4 /*yield*/, this.modal.present()];
                    case 2:
                        _b.sent();
                        this.didEnter.next();
                        this._presented = true;
                        return [4 /*yield*/, this.modal.onWillDismiss()];
                    case 3:
                        if (_b.sent()) {
                            this.willDismiss.next();
                        }
                        return [4 /*yield*/, this.modal.onDidDismiss()];
                    case 4:
                        if (_b.sent()) {
                            this.didDismiss.next();
                            this.modal = undefined;
                            this._presented = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ModalControllerComponent.prototype, "presented", {
        get: function () {
            return this._presented;
        },
        enumerable: true,
        configurable: true
    });
    ModalControllerComponent.prototype.dismiss = function (data, role) {
        if (this.modal) {
            return this.modal.dismiss(data, role);
        }
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ModalControllerComponent.prototype, "cssClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ModalControllerComponent.prototype, "backdropDismiss", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ModalControllerComponent.prototype, "showBackdrop", void 0);
    tslib_1.__decorate([
        ViewChild("modalContent", { static: true }),
        tslib_1.__metadata("design:type", TemplateRef)
    ], ModalControllerComponent.prototype, "content", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ModalControllerComponent.prototype, "willEnter", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ModalControllerComponent.prototype, "didEnter", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ModalControllerComponent.prototype, "didDismiss", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ModalControllerComponent.prototype, "willDismiss", void 0);
    ModalControllerComponent = tslib_1.__decorate([
        Component({
            selector: "ionx-modal-controller",
            template: "\n        <ng-template #modalContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController])
    ], ModalControllerComponent);
    return ModalControllerComponent;
}());
export { ModalControllerComponent };
var ModalControllerContentComponent = /** @class */ (function () {
    function ModalControllerContentComponent(params) {
        //this.template = params.get("template");
    }
    ModalControllerContentComponent.prototype.ngOnDestroy = function () {
        this.template = undefined;
    };
    ModalControllerContentComponent = tslib_1.__decorate([
        Component({
            template: "\n        <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ModalControllerContentComponent);
    return ModalControllerContentComponent;
}());
export { ModalControllerContentComponent };
//# sourceMappingURL=modal-controller.js.map