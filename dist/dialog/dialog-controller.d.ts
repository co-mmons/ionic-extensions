import { ModalController } from "@ionic/angular";
import { DialogOptions } from "./dialog-options";
export declare class DialogController {
    protected modalController: ModalController;
    constructor(modalController: ModalController);
    create(options: DialogOptions): Promise<HTMLIonModalElement>;
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    dismiss(data?: any, role?: string, id?: string): Promise<boolean>;
}
