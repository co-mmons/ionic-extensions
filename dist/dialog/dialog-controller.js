import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Dialog } from "./dialog";
var DialogController = /** @class */ (function () {
    function DialogController(modalController) {
        this.modalController = modalController;
    }
    DialogController.prototype.create = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.modalController.create(Object.assign({}, options, {
                        component: Dialog,
                        componentProps: {
                            header: options.header,
                            message: options.message,
                            buttons: options.buttons
                        }
                    }))];
            });
        });
    };
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    DialogController.prototype.dismiss = function (data, role, id) {
        return this.modalController.dismiss(data, role, id);
    };
    DialogController = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ModalController])
    ], DialogController);
    return DialogController;
}());
export { DialogController };
//# sourceMappingURL=dialog-controller.js.map