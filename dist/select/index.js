var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { IntlModule } from "@co.mmons/angular-intl";
import { SpinnerModule } from "../spinner";
import { Select } from "./select";
import { SelectModal } from "./select-modal";
var SelectModule = /** @class */ (function () {
    function SelectModule() {
    }
    SelectModule = __decorate([
        NgModule({
            declarations: [Select, SelectModal],
            exports: [Select],
            imports: [IonicModule, IntlModule, SpinnerModule],
            entryComponents: [SelectModal]
        })
    ], SelectModule);
    return SelectModule;
}());
export { SelectModule };
//# sourceMappingURL=index.js.map