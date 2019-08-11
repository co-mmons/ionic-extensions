import {Component, HostBinding, Input} from "@angular/core";

@Component({
    selector: "ionx-form-heading",
    template: `
        <ng-content select="ion-item"></ng-content>
        <div ionx--under>
            <ng-content></ng-content>
        </div>
    `,
    styles: [
        `
            :host { display: block; margin-top: 16px; }  
            
            :host ::ng-deep ion-item { --padding-start: 0px; --padding-end: 0px; --inner-padding-end: 16px; --inner-padding-start: 16px; }  
            :host ::ng-deep ion-item > ion-label { font-size: 0.9rem; font-weight: 500; }  
            :host-context(ion-grid) ::ng-deep ion-item { --padding-start: 8px; --padding-end: 8px; --inner-padding-end: 0px; --inner-padding-start: 0px; }

            :host [ionx--under]:not(:empty) { padding: 8px 16px; }
            :host-context(ion-grid) [ionx--under]:not(:empty) { padding: 8px; }
            
            :host-context(.ios) ::ng-deep ion-item.item-label > ion-label { font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; }
            
            :host[sticky]:not([sticky=false]) { position: sticky; top: 0px; z-index: 3; }
        `
    ]
})
export class FormHeading {

    constructor() {
    }

    @HostBinding("attr.sticky")
    @Input()
    sticky: boolean;
}
