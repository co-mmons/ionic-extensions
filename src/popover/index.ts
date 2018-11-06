import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {PopoverControllerComponent, PopoverControllerContentComponent} from "./popover-controller";

export {PopoverControllerComponent} from "./popover-controller";

@NgModule({
    declarations: [PopoverControllerComponent, PopoverControllerContentComponent],
    exports: [PopoverControllerComponent],
    imports: [IonicModule, CommonModule],
    entryComponents: [PopoverControllerComponent, PopoverControllerContentComponent]
})
export class PopoverModule {
}