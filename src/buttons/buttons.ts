import {Component} from "@angular/core";

@Component({
    selector: "ionx-buttons",
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: flex;
            align-items: center;
            transform: translateZ(0);
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button {
            height: 32px;
            --padding-top: 0;
            --padding-bottom: 0;
            margin: 0px;
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear {
            --padding-start: 8px;
            --padding-end: 8px;
            margin: 0px 8px;
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear + ion-button.button-clear {
            margin-left: 0px;
        }
        
        :host-context(.ios ion-toolbar) ::ng-deep ion-button {
            font-weight: 400;
        }
    `]
})
export class Buttons {

    constructor() {
    }

}
