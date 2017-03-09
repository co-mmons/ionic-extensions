import { NgModule } from "@angular/core";
import { LazyImage, LazyImageContainer } from "./lazy-image";
export var LazyImageModule = (function () {
    function LazyImageModule() {
    }
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
    return LazyImageModule;
}());
//# sourceMappingURL=lazy-image-module.js.map