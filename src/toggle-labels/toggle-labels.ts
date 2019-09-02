import {Component, ContentChild, Input} from "@angular/core";
import {IonToggle} from "@ionic/angular";

@Component({
    selector: "ionx-toggle-labels",
    templateUrl: "toggle-labels.html",
    styleUrls: ["toggle-labels.scss"]
})
export class ToggleLabels {

    constructor() {
    }

    @Input()
    on: string;

    @Input()
    off: string;

    @ContentChild(IonToggle, {static: false})
    private toggle: IonToggle;

    switchOn() {
        this.toggle.checked = true;
    }

    switchOff() {
        this.toggle.checked = false;
    }

}
