import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { Spinner } from "./spinner";
export { Spinner } from "./spinner";
var SpinnerModule = (function () {
    function SpinnerModule() {
    }
    SpinnerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [Spinner],
                    exports: [Spinner],
                    imports: [IonicModule]
                },] },
    ];
    /** @nocollapse */
    SpinnerModule.ctorParameters = function () { return []; };
    return SpinnerModule;
}());
export { SpinnerModule };
//# sourceMappingURL=index.js.map