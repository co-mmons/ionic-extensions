import {Component, HostBinding, Input} from "@angular/core";

@Component({
    selector: "ionx-form-heading",
    template: `
        <ng-content select="ion-item"></ng-content>
        <div ionx--under>
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ["heading.scss"]
})
export class FormHeading {

    constructor() {
    }

    @HostBinding("attr.sticky")
    @Input()
    sticky: boolean;
}
