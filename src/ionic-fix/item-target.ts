import {Directive, ElementRef, Input} from "@angular/core";
import {sleep} from "@co.mmons/js-utils/core";

@Directive({
    selector: "ion-item[target]"
})
export class IonicItemTargetFix {

    constructor(private element: ElementRef<HTMLElement>) {
    }

    @Input()
    target: string;

    async ngAfterViewInit() {

        if (this.target) {

            for (let i = 1; i < 20; i++) {

                const a = (this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".item-native")) || undefined;

                if (!a) {
                    await sleep(i * 100);
                } else {
                    a.setAttribute("target", this.target);
                }
            }
        }
    }
}
