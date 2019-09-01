import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { IonicBackButtonFix } from "./back-button-fix";
import { IonicInputFix } from "./input-fix";
import { IonicItemTargetFix } from "./item-target";
var IonicFixModule = /** @class */ (function () {
    function IonicFixModule() {
    }
    IonicFixModule = tslib_1.__decorate([
        NgModule({
            declarations: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix],
            exports: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix]
        })
    ], IonicFixModule);
    return IonicFixModule;
}());
export { IonicFixModule };
//# sourceMappingURL=index.js.map