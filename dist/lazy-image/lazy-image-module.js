import { NgModule } from "@angular/core";
import { LazyImage, LazyImageContainer } from "./lazy-image";
var LazyImageModule = (function () {
    function LazyImageModule() {
    }
    return LazyImageModule;
}());
export { LazyImageModule };
LazyImageModule.decorators = [
    { type: NgModule, args: [{
                declarations: [LazyImage, LazyImageContainer],
                imports: [],
                exports: [LazyImage, LazyImageContainer],
                providers: []
            },] },
];
/** @nocollapse */
LazyImageModule.ctorParameters = function () { return []; };
//# sourceMappingURL=lazy-image-module.js.map