import {Component, Input, ElementRef} from "@angular/core";

@Component({
    selector: "ionx-select-option",
    template: "<ng-content></ng-content>"
})
export class SelectOption {

    constructor(private element: ElementRef<HTMLElement>) {
    }

    @Input()
    value: any;

    @Input()
    divider: boolean;

    get label(): string {
        return this.element.nativeElement.innerText;
    }
}