import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { PopoverControllerComponent, PopoverControllerContentComponent } from "./popover-controller";
var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    PopoverModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [PopoverControllerComponent, PopoverControllerContentComponent],
                    exports: [PopoverControllerComponent],
                    imports: [IonicModule],
                    entryComponents: [PopoverControllerComponent, PopoverControllerContentComponent]
                },] },
    ];
    /** @nocollapse */
    PopoverModule.ctorParameters = function () { return []; };
    return PopoverModule;
}());
export { PopoverModule };
//# sourceMappingURL=index.js.map