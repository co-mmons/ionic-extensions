import {Component, ComponentFactoryResolver, Injector} from "@angular/core";
import {DialogController} from "@co.mmons/ionic-extensions/dialog";
import {DialogTestBody} from "./body";

@Component({
    template: "<ion-button (click)='openDialog()'>Open dialog</ion-button>"
})
export class DialogTestPage {

    constructor(private dialogController: DialogController, private resolver: ComponentFactoryResolver, private injector: Injector) {
    }

    async openDialog() {

        const dialog = await this.dialogController.create({
            component: DialogTestBody
        });

        dialog.present();

    }
}
