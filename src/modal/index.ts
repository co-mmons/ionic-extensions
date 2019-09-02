import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";

import {ModalControllerComponent, ModalControllerContentComponent} from "./modal-controller";

export {ModalControllerComponent} from "./modal-controller";

@NgModule({
    declarations: [ModalControllerComponent, ModalControllerContentComponent],
    exports: [ModalControllerComponent],
    imports: [CommonModule, IonicModule],
    entryComponents: [ModalControllerComponent, ModalControllerContentComponent]
})
export class ModalModule {
}
