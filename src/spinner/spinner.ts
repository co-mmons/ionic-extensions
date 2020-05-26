import {Component, HostBinding, Input} from "@angular/core";

@Component({
    selector: "ionx-spinner",
    styleUrls: ["spinner.scss"],
    template: `<ion-backdrop *ngIf="backdropVisible"></ion-backdrop><ion-spinner [name]="name" [color]="color"></ion-spinner>`
})
export class Spinner {

    @Input()
    @HostBinding("class.ionx--backdrop-visible")
    backdropVisible: boolean = false;

    @Input()
    fill: boolean = false;

    @Input()
    color: string;

    @Input()
    name: string;

}
