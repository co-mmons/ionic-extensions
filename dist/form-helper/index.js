var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatchMediaModule } from "@co.mmons/angular-extensions/browser/match-media";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { FormHeading } from "./heading";
import { FormHelper } from "./helper";
import { FormItem } from "./item";
import { ItemError } from "./item-error";
import { ItemHint } from "./item-hint";
var FormHelperModule = /** @class */ (function () {
    function FormHelperModule() {
    }
    FormHelperModule = __decorate([
        NgModule({
            declarations: [FormItem, FormHeading, ItemError, ItemHint, FormHelper],
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, MatchMediaModule],
            exports: [FormItem, ItemError, ItemHint, FormHeading, FormHelper]
        })
    ], FormHelperModule);
    return FormHelperModule;
}());
export { FormHelperModule };
//# sourceMappingURL=index.js.map