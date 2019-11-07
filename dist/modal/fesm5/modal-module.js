import { __awaiter, __generator, __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { EventEmitter, Input, ViewChild, Output, Component, NgModule } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';

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
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
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
    ModalControllerComponent.ctorParameters = function () { return [
        { type: ModalController }
    ]; };
    __decorate([
        Input()
    ], ModalControllerComponent.prototype, "cssClass", void 0);
    __decorate([
        Input()
    ], ModalControllerComponent.prototype, "backdropDismiss", void 0);
    __decorate([
        Input()
    ], ModalControllerComponent.prototype, "showBackdrop", void 0);
    __decorate([
        ViewChild("modalContent", { static: true })
    ], ModalControllerComponent.prototype, "content", void 0);
    __decorate([
        Output()
    ], ModalControllerComponent.prototype, "willEnter", void 0);
    __decorate([
        Output()
    ], ModalControllerComponent.prototype, "didEnter", void 0);
    __decorate([
        Output()
    ], ModalControllerComponent.prototype, "didDismiss", void 0);
    __decorate([
        Output()
    ], ModalControllerComponent.prototype, "willDismiss", void 0);
    ModalControllerComponent = __decorate([
        Component({
            selector: "ionx-modal-controller",
            template: "\n        <ng-template #modalContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], ModalControllerComponent);
    return ModalControllerComponent;
}());
var ModalControllerContentComponent = /** @class */ (function () {
    function ModalControllerContentComponent() {
        //this.template = params.get("template");
    }
    ModalControllerContentComponent.prototype.ngOnDestroy = function () {
        this.template = undefined;
    };
    ModalControllerContentComponent = __decorate([
        Component({
            template: "\n        <ng-container *ngTemplateOutlet=\"template\"></ng-container>\n    "
        })
    ], ModalControllerContentComponent);
    return ModalControllerContentComponent;
}());

var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule = __decorate([
        NgModule({
            declarations: [ModalControllerComponent, ModalControllerContentComponent],
            exports: [ModalControllerComponent],
            imports: [CommonModule, IonicModule],
            entryComponents: [ModalControllerComponent, ModalControllerContentComponent]
        })
    ], ModalModule);
    return ModalModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ModalControllerComponent, ModalModule, ModalControllerContentComponent as ɵa };
//# sourceMappingURL=modal-module.js.map
