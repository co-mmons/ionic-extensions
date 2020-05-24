import {Component} from "@angular/core";

@Component({
    selector: "ionx-test-lazy-load-subcomponent2",
    template: `
        <div style="width: 200px; height: 200px" [ionx-lazy-load]="'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Smotrych_River.JPG/1200px-Smotrych_River.JPG'"></div>
    `,
    styles: [`
        :host {
            display: block;
        }
    `]
})
export class Subcomponent2 {

}
