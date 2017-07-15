import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { IntlModule } from "@co.mmons/angular-intl";
import { Select } from "./select";
import { SelectOverlay } from "./select-overlay";
var SelectModule = (function () {
    function SelectModule() {
    }
    SelectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [Select, SelectOverlay],
                    exports: [Select],
                    imports: [IonicModule, IntlModule],
                    entryComponents: [SelectOverlay]
                },] },
    ];
    /** @nocollapse */
    SelectModule.ctorParameters = function () { return []; };
    return SelectModule;
}());
export { SelectModule };
//# sourceMappingURL=index.js.map