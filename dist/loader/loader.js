import * as tslib_1 from "tslib";
import { Component, ElementRef, Input } from "@angular/core";
var Loader = /** @class */ (function () {
    function Loader(elementRef) {
        this.elementRef = elementRef;
        this.progressType = "determinate";
        this.progressValue = 0;
        this.progressBuffer = 0;
    }
    Object.defineProperty(Loader.prototype, "progressPercentVisible", {
        get: function () {
            return typeof this.progressPercent === "number";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loader.prototype, "spinnerMode", {
        get: function () {
            return this.mode === "spinner";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loader.prototype, "progressMode", {
        get: function () {
            return this.mode === "progress";
        },
        enumerable: true,
        configurable: true
    });
    Loader.prototype.dismiss = function () {
        return this.popover.dismiss();
    };
    Loader.prototype.ngOnInit = function () {
        this.popover = this.elementRef.nativeElement.closest("ion-popover");
        if (this.instanceCallback) {
            this.instanceCallback(this);
        }
    };
    Loader.prototype.ngOnDestroy = function () {
        this.popover = undefined;
        this.instanceCallback = undefined;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], Loader.prototype, "instanceCallback", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "header", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "message", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "mode", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "progressMessage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "progressType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], Loader.prototype, "progressValue", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], Loader.prototype, "progressBuffer", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], Loader.prototype, "progressPercent", void 0);
    Loader = tslib_1.__decorate([
        Component({
            selector: "ionx-loader",
            template: "\n        <div style=\"display: flex; align-items: center\">\n            \n            <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n                <ion-spinner></ion-spinner>\n            </div>\n            \n            <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n                <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n                <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n            </div>\n            \n        </div>\n        \n        <ion-progress-bar style=\"margin: 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n        \n        <div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n            <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n            <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n        </div>\n    ",
            styles: [
                ":host { display: block }"
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], Loader);
    return Loader;
}());
export { Loader };
//# sourceMappingURL=loader.js.map