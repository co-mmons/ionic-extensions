import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { LoaderController } from "./loader-controller";
import { Loader } from "./loader";
export { Loader } from "./loader";
var LoaderModule = /** @class */ (function () {
    function LoaderModule() {
    }
    LoaderModule = tslib_1.__decorate([
        NgModule({
            declarations: [Loader],
            imports: [IntlModule, IonicModule, CommonModule],
            entryComponents: [Loader],
            providers: [LoaderController]
        })
    ], LoaderModule);
    return LoaderModule;
}());
export { LoaderModule };
//# sourceMappingURL=index.js.map