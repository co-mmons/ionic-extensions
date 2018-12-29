import {Component} from "@angular/core";

@Component({
    selector: "ionx-form-heading",
    template: `<ng-content selector="ion-item"></ng-content>
    `
    })
export class FormHeading {

    constructor() {
    }
}