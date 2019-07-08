import { ModalController } from "@ionic/angular";
import { DialogOptions } from "./dialog-options";
export declare class DialogController {
    protected modalController: ModalController;
    constructor(modalController: ModalController);
    create(options: DialogOptions): Promise<HTMLIonModalElement>;
}
