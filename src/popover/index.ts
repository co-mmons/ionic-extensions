import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";

import {PopoverControllerComponent, PopoverControllerContentComponent} from "./popover-controller";

@NgModule({
    declarations: [PopoverControllerComponent, PopoverControllerContentComponent],
    exports: [PopoverControllerComponent],
    imports: [IonicModule],
    entryComponents: [PopoverControllerComponent, PopoverControllerContentComponent]
})
export class PopoverModule {
}