import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatchMediaModule } from "@co.mmons/angular-extensions/browser/match-media";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { FormHeading } from "./heading";
import { FormHelper } from "./helper";
import { FormItem } from "./item";
import { FormItemError } from "./item-error";
import { FormItemHint } from "./item-hint";
export * from "./heading";
export * from "./helper";
export * from "./item";
export * from "./item-error";
export * from "./item-hint";
var FormHelperModule = /** @class */ (function () {
    function FormHelperModule() {
    }
    FormHelperModule = tslib_1.__decorate([
        NgModule({
            declarations: [FormItem, FormHeading, FormItemError, FormItemHint, FormHelper],
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, MatchMediaModule],
            exports: [FormItem, FormItemError, FormItemHint, FormHeading, FormHelper]
        })
    ], FormHelperModule);
    return FormHelperModule;
}());
export { FormHelperModule };
//# sourceMappingURL=index.js.map