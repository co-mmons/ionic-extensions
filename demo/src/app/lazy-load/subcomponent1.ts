import {Component} from "@angular/core";

@Component({
    selector: "ionx-test-lazy-load-subcomponent1",
    template: `
        <ion-card *ngFor="let a of [1,2,3,4,5]">
            <ion-card-content>
                <ionx-test-lazy-load-subcomponent2></ionx-test-lazy-load-subcomponent2>
            </ion-card-content>
        </ion-card>
    `,
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class Subcomponent1 {

}
