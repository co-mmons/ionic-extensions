import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SelectModule } from "../select";
import { DateTimePickerInput } from "./input";
import { DateTimePickerOverlay } from "./overlay";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IntlModule } from "@co.mmons/angular-intl";
export { DateTimePickerInput } from "./input";
var DateTimePickerModule = /** @class */ (function () {
    function DateTimePickerModule() {
    }
    DateTimePickerModule = tslib_1.__decorate([
        NgModule({
            declarations: [DateTimePickerInput, DateTimePickerOverlay],
            entryComponents: [DateTimePickerOverlay],
            exports: [DateTimePickerInput],
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, SelectModule]
        })
    ], DateTimePickerModule);
    return DateTimePickerModule;
}());
export { DateTimePickerModule };
//# sourceMappingURL=index.js.map