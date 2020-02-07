import {Component, ComponentFactoryResolver, Injector} from "@angular/core";
import {Dialog, DialogController} from "@co.mmons/ionic-extensions/dialog";
import {DialogTestMessage} from "./message";

@Component({
    template: "<ion-button (click)='openDialog()'>Open dialog</ion-button>"
})
export class DialogTestPage {

    constructor(private dialogController: DialogController, private resolver: ComponentFactoryResolver, private injector: Injector) {
    }

    async openDialog() {

        const message = this.resolver.resolveComponentFactory(DialogTestMessage).create(this.injector);
        message.instance.now = new Date();

        const dialog = await this.dialogController.create({
            message: message,
        });

        dialog.present();

    }
}
