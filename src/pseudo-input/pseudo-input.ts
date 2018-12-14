import {Component, ElementRef} from "@angular/core";

@Component({
    selector: "ionx-pseudo-input",
    exportAs: "ionxPseudoInput",
    template: "<ng-content></ng-content>"
})
export class PseudoInput {

    constructor(protected element: ElementRef<HTMLElement>) {
    }
}