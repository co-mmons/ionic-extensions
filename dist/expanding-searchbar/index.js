import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { ExpandingSearchbar } from "./expanding-searchbar";
var ExpandingSearchbarModule = (function () {
    function ExpandingSearchbarModule() {
    }
    ExpandingSearchbarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ExpandingSearchbar],
                    exports: [ExpandingSearchbar],
                    imports: [IonicModule]
                },] },
    ];
    /** @nocollapse */
    ExpandingSearchbarModule.ctorParameters = function () { return []; };
    return ExpandingSearchbarModule;
}());
export { ExpandingSearchbarModule };
//# sourceMappingURL=index.js.map