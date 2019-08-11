import {Component, Input, ElementRef, ChangeDetectionStrategy} from "@angular/core";

@Component({
    selector: "ionx-select-option",
    changeDetection: ChangeDetectionStrategy.OnPush,
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