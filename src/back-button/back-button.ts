import {Directive, ElementRef, Input, OnInit} from "@angular/core";

@Directive({
    selector: "ion-back-button[ionx-back-button]",
})
export class BackButton implements OnInit {
    // template: `<ion-back-button [style.display]="modal ? 'inline-block' : null" [disabled]="disabled" [defaultHref]="defaultHref" [icon]="icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')"></ion-back-button>`

    constructor(private elementRef: ElementRef<HTMLIonBackButtonElement>) {
    }

    @Input()
    icon: string;

    ngOnInit() {

        if (!!this.elementRef.nativeElement.closest("ion-modal")) {
            this.elementRef.nativeElement.style.setProperty("display", "inline-block");
        }
    }

}
