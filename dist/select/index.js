import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { IntlModule } from "@co.mmons/angular-intl";
import { SpinnerModule } from "../spinner";
import { Select } from "./select";
import { SelectModal } from "./select-modal";
var SelectModule = /** @class */ (function () {
    function SelectModule() {
    }
    SelectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [Select, SelectModal],
                    exports: [Select],
                    imports: [IonicModule, IntlModule, SpinnerModule],
                    entryComponents: [SelectModal]
                },] },
    ];
    /** @nocollapse */
    SelectModule.ctorParameters = function () { return []; };
    return SelectModule;
}());
export { SelectModule };
//# sourceMappingURL=index.js.map