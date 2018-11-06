var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PopoverControllerComponent.prototype, "cssClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PopoverControllerComponent.prototype, "enableBackdropDismiss", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PopoverControllerComponent.prototype, "showBackdrop", void 0);
    __decorate([
        ViewChild("popoverContent"),
        __metadata("design:type", TemplateRef)
    ], PopoverControllerComponent.prototype, "content", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PopoverControllerComponent.prototype, "willEnter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PopoverControllerComponent.prototype, "didEnter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PopoverControllerComponent.prototype, "didDismiss", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], PopoverControllerComponent.prototype, "willDismiss", void 0);
    PopoverControllerComponent = __decorate([
        Component({
            selector: "ionx-popover-controller",
            encapsulation: ViewEncapsulation.None,
            template: "\n        <ng-template #popoverContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        }),
        __metadata("design:paramtypes", [PopoverController])
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
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], PopoverControllerContentComponent.prototype, "template", void 0);
    PopoverControllerContentComponent = __decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            template: "\n        <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n    "
        }),
        __metadata("design:paramtypes", [])
    ], PopoverControllerContentComponent);
    return PopoverControllerContentComponent;
}());
export { PopoverControllerContentComponent };
//# sourceMappingURL=popover-controller.js.map