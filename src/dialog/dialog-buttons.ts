import {Component, Injector, Input} from "@angular/core";
import {ModalController} from "@ionic/angular";
import {Dialog} from "./dialog";
import {DialogButton} from "./dialog-button";

/**
 * Komponent, który strukturyzuje widok dialogu.
 */
@Component({
    selector: "ionx-dialog-buttons",
    styleUrls: ["dialog-buttons.scss"],
    templateUrl: "dialog-buttons.html"
})
export class DialogButtons {

    constructor(private injector: Injector, private modalController: ModalController) {
    }

    @Input()
    buttons: DialogButton[];

    /*private*/ buttonClicked(button: DialogButton) {

        const dialog = this.injector.get(Dialog);
        const value = dialog && dialog.value && dialog.value();

        if (button.handler) {
            const res = button.handler(value);

            if ((typeof res === "boolean" && res) || typeof res !== "boolean") {
                this.modalController.dismiss(value, button.role);
            }

            return;

        } else {
            this.modalController.dismiss(button.role !== "cancel" ? value : undefined, button.role);
        }
    }
}
