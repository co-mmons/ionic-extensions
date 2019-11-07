import { __awaiter, __generator, __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { EventEmitter, Input, ViewChild, Output, Component, ViewEncapsulation, NgModule } from '@angular/core';
import { PopoverController, IonicModule } from '@ionic/angular';

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
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
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
    PopoverControllerComponent.ctorParameters = function () { return [
        { type: PopoverController }
    ]; };
    __decorate([
        Input()
    ], PopoverControllerComponent.prototype, "cssClass", void 0);
    __decorate([
        Input()
    ], PopoverControllerComponent.prototype, "enableBackdropDismiss", void 0);
    __decorate([
        Input()
    ], PopoverControllerComponent.prototype, "showBackdrop", void 0);
    __decorate([
        ViewChild("popoverContent", { static: true })
    ], PopoverControllerComponent.prototype, "content", void 0);
    __decorate([
        Output()
    ], PopoverControllerComponent.prototype, "willEnter", void 0);
    __decorate([
        Output()
    ], PopoverControllerComponent.prototype, "didEnter", void 0);
    __decorate([
        Output()
    ], PopoverControllerComponent.prototype, "didDismiss", void 0);
    __decorate([
        Output()
    ], PopoverControllerComponent.prototype, "willDismiss", void 0);
    PopoverControllerComponent = __decorate([
        Component({
            selector: "ionx-popover-controller",
            encapsulation: ViewEncapsulation.None,
            template: "\n        <ng-template #popoverContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], PopoverControllerComponent);
    return PopoverControllerComponent;
}());
var PopoverControllerContentComponent = /** @class */ (function () {
    function PopoverControllerContentComponent() {
        //this.template = params.get("template");
    }
    PopoverControllerContentComponent.prototype.ngOnDestroy = function () {
        this.template = undefined;
    };
    __decorate([
        Input()
    ], PopoverControllerContentComponent.prototype, "template", void 0);
    PopoverControllerContentComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            template: "\n        <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n    "
        })
    ], PopoverControllerContentComponent);
    return PopoverControllerContentComponent;
}());

var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    PopoverModule = __decorate([
        NgModule({
            declarations: [PopoverControllerComponent, PopoverControllerContentComponent],
            exports: [PopoverControllerComponent],
            imports: [IonicModule, CommonModule],
            entryComponents: [PopoverControllerComponent, PopoverControllerContentComponent]
        })
    ], PopoverModule);
    return PopoverModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { PopoverControllerComponent, PopoverModule, PopoverControllerContentComponent as ɵa };
//# sourceMappingURL=popover-module.js.map
