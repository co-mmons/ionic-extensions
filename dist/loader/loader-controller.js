import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
import { PopoverController } from "@ionic/angular";
import { Loader } from "./loader";
var LoaderController = /** @class */ (function () {
    function LoaderController(popoverController) {
        this.popoverController = popoverController;
    }
    LoaderController.prototype.present = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loader, loaderInstance, popover;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loaderInstance = function (instance) { return loader = instance; };
                        return [4 /*yield*/, this.popoverController.create({
                                animated: false,
                                cssClass: "ionx-popover-flex",
                                backdropDismiss: false,
                                keyboardClose: false,
                                component: Loader,
                                componentProps: {
                                    instanceCallback: function (loader) { return loaderInstance(loader); },
                                    header: options.header,
                                    message: options.message,
                                    mode: options.mode || "spinner"
                                }
                            })];
                    case 1:
                        popover = _a.sent();
                        // popover.style.setProperty("--width", "100%");
                        // popover.style.setProperty("--maxHeight", "100%");
                        // const content = popover.querySelector(".popover-content") as HTMLElement;
                        // content.style.background = "transparent";
                        // content.style.borderRadius = "0px";
                        // content.style.left = "0px !important";
                        // content.style.top = "0px !important";
                        // content.style.height = "100%";
                        // content.style.width = "100%";
                        // content.style.maxWidth = "none";
                        // content.style.maxHeight = "none";
                        // content.style.boxShadow = "none";
                        popover.present();
                        return [4 /*yield*/, waitTill(function () { return !!loader; })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, loader];
                }
            });
        });
    };
    LoaderController = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [PopoverController])
    ], LoaderController);
    return LoaderController;
}());
export { LoaderController };
//# sourceMappingURL=loader-controller.js.map