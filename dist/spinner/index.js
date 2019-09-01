import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Spinner } from "./spinner";
export { Spinner } from "./spinner";
var SpinnerModule = /** @class */ (function () {
    function SpinnerModule() {
    }
    SpinnerModule = tslib_1.__decorate([
        NgModule({
            declarations: [Spinner],
            exports: [Spinner],
            imports: [CommonModule, IonicModule]
        })
    ], SpinnerModule);
    return SpinnerModule;
}());
export { SpinnerModule };
//# sourceMappingURL=index.js.map