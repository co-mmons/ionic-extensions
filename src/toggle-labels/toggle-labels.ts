import {Component, ContentChild, Input} from "@angular/core";
import {IonToggle} from "@ionic/angular";

@Component({
    selector: "ionx-toggle-labels",
    template: `
        <span ionx--off (click)="switchOff()">
            <ng-template [ngIf]="!!off">{{off}}</ng-template>
            <ng-content select="[slot=off]"></ng-content>
        </span>
        
        <ng-content select="ion-toggle"></ng-content>

        <span ionx--on (click)="switchOn()">
            <ng-template [ngIf]="!!on">{{on}}</ng-template>
            <ng-content select="[slot=on]"></ng-content>
        </span>
    `,
    styles: [
        ":host { display: flex; align-items: center; }",
        ":host ::ng-deep ion-toggle { padding-inline-start: 2px; padding-inline-end: 2px; }",
        ":host [ionx--on] { cursor: pointer; margin-left: 4px; }",
        ":host [ionx--off] { cursor: pointer; margin-right: 4px; }",
        ":host-context(.item-label-stacked) { align-self: flex-start }",
        ":host-context(.ios .item-label-stacked) { margin-top: 2px; margin-bottom: 2px; }"
    ]
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
