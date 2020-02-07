import { Injector } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { DialogButton } from "./dialog-button";
/**
 * Komponent, który strukturyzuje widok dialogu.
 */
export declare class DialogButtons {
    private injector;
    private modalController;
    constructor(injector: Injector, modalController: ModalController);
    buttons: DialogButton[];
    buttonClicked(button: DialogButton): void;
}
