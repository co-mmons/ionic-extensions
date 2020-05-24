import {Component} from "@angular/core";

@Component({
    template: `<ion-content ionx-lazy-load-container>
        <div style="height: 3000px"></div>
        <ionx-test-lazy-load-subcomponent1 *ngIf="true"></ionx-test-lazy-load-subcomponent1>
    </ion-content>`
})
export class LazyLoadTestPage {

    constructor() {
    }
}
