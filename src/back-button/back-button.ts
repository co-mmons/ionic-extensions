import {Component, ElementRef, Input, OnInit} from "@angular/core";

@Component({
    selector: "ionx-back-button",
    styleUrls: ["back-button.scss"],
    template: `<ion-back-button [style.display]="modal ? 'inline-block' : null" [disabled]="disabled" [defaultHref]="defaultHref" [icon]="icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')"></ion-back-button>`
})
export class BackButton implements OnInit {

    constructor(private elementRef: ElementRef<HTMLElement>) {
    }

    @Input()
    defaultHref: string;

    @Input()
    icon: string;

    modal: boolean;

    @Input()
    disabled: boolean;

    ngOnInit() {
        this.modal = !!this.elementRef.nativeElement.closest("ion-modal");
    }

}
