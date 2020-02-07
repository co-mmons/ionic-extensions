import {Component, OnInit} from "@angular/core";
import {DialogButton} from "@co.mmons/ionic-extensions/dialog";

@Component({
    template: "<ionx-dialog-content><div ionx-dialog-message>tralalala {{now.getTime()}}</div></ionx-dialog-content><ionx-dialog-buttons [buttons]='buttons'></ionx-dialog-buttons>"
})
export class DialogTestBody implements OnInit {

    constructor() {
    }

    now: Date = new Date();

    buttons: DialogButton[] = [
        {text: "test", handler: () => this.rebuildButtons()}
    ];

    rebuildButtons() {
        console.log("Rebuild");
        this.now = new Date();
        this.buttons = [{text: "test2"}]
        return false;
    }

    ngOnInit() {

    }
}

