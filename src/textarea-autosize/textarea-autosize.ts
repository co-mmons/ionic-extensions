import {ElementRef, HostListener, Directive, OnInit} from "@angular/core";
import {waitTill} from "@co.mmons/js-utils/core";

@Directive({
    selector: "ion-textarea[ionx-autosize]"
})

export class TextareaAutosize implements OnInit {

    constructor(public element: ElementRef<HTMLIonTextareaElement>) {
    }

    @HostListener("ionChange")
    protected onChange(): void {
        this.adjust();
    }

    private get textarea() {
        return this.element.nativeElement.querySelector("textarea");
    }

    private adjust(): void {
        let input = this.textarea;
        if (input) {
            input.style.overflow = "hidden";
            input.style.height = "auto";
            input.style.height = input.scrollHeight + "px";
        }
    }

    async ngOnInit() {
        await waitTill(() => !!this.textarea);
    }
}