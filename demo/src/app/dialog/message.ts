import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, Optional} from "@angular/core";
import {Dialog, dialogInstance} from "@co.mmons/ionic-extensions/dialog";

@Component({
    template: "tralalala {{now.getTime()}}"
})
export class DialogTestMessage implements OnInit, AfterViewInit {

    constructor() {
    }

    now: Date = new Date();

    ngOnInit() {

        setInterval(() => {
            this.now = new Date()
            const dialog: Dialog = this[dialogInstance];
            dialog.buttons = [{text: "test"}];
        }, 1000);
    }

    ngAfterViewInit() {
    }

}
