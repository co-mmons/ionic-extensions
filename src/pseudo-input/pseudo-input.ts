import {Component, ElementRef} from "@angular/core";

@Component({
    selector: "ionx-pseudo-input",
    styleUrls: ["pseudo-input.scss"],
    exportAs: "ionxPseudoInput",
    template: "<ng-content></ng-content>"
})
export class PseudoInput {

    constructor(protected element: ElementRef<HTMLElement>) {
    }
}
