var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { ButtonsModule } from "../buttons";
import { Select } from "./select";
import { SelectLabel } from "./select-label";
import { SelectOption } from "./select-option";
import { SelectOverlayContent } from "./select-overlay";
export * from "./select";
export * from "./select-option";
export * from "./select-options";
var SelectModule = /** @class */ (function () {
    function SelectModule() {
    }
    SelectModule = __decorate([
        NgModule({
            declarations: [Select, SelectOption, SelectOverlayContent, SelectLabel],
            entryComponents: [Select, SelectOption, SelectOverlayContent],
            exports: [Select, SelectOption, SelectOverlayContent, SelectLabel],
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, ScrollingModule, ButtonsModule]
        })
    ], SelectModule);
    return SelectModule;
}());
export { SelectModule };
//# sourceMappingURL=index.js.map