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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
import { Component, Input, ViewChild, EventEmitter, Output } from "@angular/core";
import { PopoverController, NavParams } from "ionic-angular";
var PopoverControllerComponent = (function () {
    function PopoverControllerComponent(controller) {
        this.controller = controller;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.didDismiss = new EventEmitter();
        this.willDismiss = new EventEmitter();
        this._presented = false;
    }
    PopoverControllerComponent.prototype.present = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // already opened - should we close existing and open new?
                        if (this.popover) {
                            return [2 /*return*/];
                        }
                        this.popover = this.controller.create(PopoverControllerContentComponent, { template: this.content }, { enableBackdropDismiss: this.enableBackdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass });
                        this.popover.onWillDismiss(function (data) { return _this.willDismiss.next(data); });
                        this.popover.onDidDismiss(function (data) {
                            _this.didDismiss.next(data);
                            _this.popover = undefined;
                            _this._presented = false;
                        });
                        this.willEnter.next();
                        return [4 /*yield*/, this.popover.present({ ev: options })];
                    case 1:
                        _a.sent();
                        this.didEnter.next();
                        this._presented = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(PopoverControllerComponent.prototype, "presented", {
        get: function () {
            return this._presented;
        },
        enumerable: true,
        configurable: true
    });
    PopoverControllerComponent.prototype.dismiss = function (data, role, navOptions) {
        if (this.popover) {
            return this.popover.dismiss(data, role, navOptions);
        }
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    PopoverControllerComponent.decorators = [
        { type: Component, args: [{
                    selector: "ionx-popover-controller",
                    template: "\n        <ng-template #popoverContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    PopoverControllerComponent.ctorParameters = function () { return [
        { type: PopoverController, },
    ]; };
    PopoverControllerComponent.propDecorators = {
        'cssClass': [{ type: Input },],
        'enableBackdropDismiss': [{ type: Input },],
        'showBackdrop': [{ type: Input },],
        'content': [{ type: ViewChild, args: ["popoverContent",] },],
        'willEnter': [{ type: Output },],
        'didEnter': [{ type: Output },],
        'didDismiss': [{ type: Output },],
        'willDismiss': [{ type: Output },],
    };
    return PopoverControllerComponent;
}());
export { PopoverControllerComponent };
var PopoverControllerContentComponent = (function () {
    function PopoverControllerContentComponent(params) {
        this.params = params;
        this.template = params.get("template");
    }
    PopoverControllerContentComponent.prototype.ngOnDestroy = function () {
        this.template = undefined;
    };
    PopoverControllerContentComponent.decorators = [
        { type: Component, args: [{
                    template: "\n        <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    PopoverControllerContentComponent.ctorParameters = function () { return [
        { type: NavParams, },
    ]; };
    return PopoverControllerContentComponent;
}());
export { PopoverControllerContentComponent };
//# sourceMappingURL=popover-controller.js.map