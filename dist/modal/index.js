import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ModalControllerComponent, ModalControllerContentComponent } from "./modal-controller";
export { ModalControllerComponent } from "./modal-controller";
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule = tslib_1.__decorate([
        NgModule({
            declarations: [ModalControllerComponent, ModalControllerContentComponent],
            exports: [ModalControllerComponent],
            imports: [IonicModule],
            entryComponents: [ModalControllerComponent, ModalControllerContentComponent]
        })
    ], ModalModule);
    return ModalModule;
}());
export { ModalModule };
//# sourceMappingURL=index.js.map