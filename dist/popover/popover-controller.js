import * as tslib_1 from "tslib";
import { Component, TemplateRef, Input, ViewChild, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import { PopoverController } from "@ionic/angular";
var PopoverControllerComponent = /** @class */ (function () {
    function PopoverControllerComponent(controller) {
        this.controller = controller;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.didDismiss = new EventEmitter();
        this.willDismiss = new EventEmitter();
        this._dismissing = false;
        this._presented = false;
    }
    PopoverControllerComponent.prototype.present = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // already opened - should we close existing and open new?
                        if (this.popover) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.controller.create({ component: PopoverControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.enableBackdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass, event: event })];
                    case 1:
                        _a.popover = (_b.sent());
                        this.willEnter.next();
                        return [4 /*yield*/, this.popover.present()];
                    case 2:
                        _b.sent();
                        this.didEnter.next();
                        this._presented = true;
                        return [4 /*yield*/, this.popover.onWillDismiss()];
                    case 3:
                        if (_b.sent()) {
                            this.willDismiss.next();
                        }
                        this._dismissing = true;
                        return [4 /*yield*/, this.popover.onDidDismiss()];
                    case 4:
                        if (_b.sent()) {
                            this.didDismiss.next();
                            this.popover = undefined;
                            this._presented = false;
                            this._dismissing = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(PopoverControllerComponent.prototype, "dismissing", {
        get: function () {
            return this._dismissing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopoverControllerComponent.prototype, "presented", {
        get: function () {
            return this._presented;
        },
        enumerable: true,
        configurable: true
    });
    PopoverControllerComponent.prototype.dismiss = function (data, role) {
        if (this.popover) {
            return this.popover.dismiss(data, role);
        }
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], PopoverControllerComponent.prototype, "cssClass", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PopoverControllerComponent.prototype, "enableBackdropDismiss", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PopoverControllerComponent.prototype, "showBackdrop", void 0);
    tslib_1.__decorate([
        ViewChild("popoverContent", { static: true }),
        tslib_1.__metadata("design:type", TemplateRef)
    ], PopoverControllerComponent.prototype, "content", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PopoverControllerComponent.prototype, "willEnter", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PopoverControllerComponent.prototype, "didEnter", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PopoverControllerComponent.prototype, "didDismiss", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PopoverControllerComponent.prototype, "willDismiss", void 0);
    PopoverControllerComponent = tslib_1.__decorate([
        Component({
            selector: "ionx-popover-controller",
            encapsulation: ViewEncapsulation.None,
            template: "\n        <ng-template #popoverContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController])
    ], PopoverControllerComponent);
    return PopoverControllerComponent;
}());
export { PopoverControllerComponent };
var PopoverControllerContentComponent = /** @class */ (function () {
    function PopoverControllerContentComponent() {
        //this.template = params.get("template");
    }
    PopoverControllerContentComponent.prototype.ngOnDestroy = function () {
        this.template = undefined;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], PopoverControllerContentComponent.prototype, "template", void 0);
    PopoverControllerContentComponent = tslib_1.__decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            template: "\n        <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PopoverControllerContentComponent);
    return PopoverControllerContentComponent;
}());
export { PopoverControllerContentComponent };
//# sourceMappingURL=popover-controller.js.map