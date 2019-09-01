import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { PopoverControllerComponent, PopoverControllerContentComponent } from "./popover-controller";
export { PopoverControllerComponent } from "./popover-controller";
var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    PopoverModule = tslib_1.__decorate([
        NgModule({
            declarations: [PopoverControllerComponent, PopoverControllerContentComponent],
            exports: [PopoverControllerComponent],
            imports: [IonicModule, CommonModule],
            entryComponents: [PopoverControllerComponent, PopoverControllerContentComponent]
        })
    ], PopoverModule);
    return PopoverModule;
}());
export { PopoverModule };
//# sourceMappingURL=index.js.map