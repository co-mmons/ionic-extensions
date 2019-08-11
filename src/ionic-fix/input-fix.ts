import {Directive, ElementRef, Input} from "@angular/core";
import {waitTill} from "@co.mmons/js-utils/core";

@Directive({
    selector: "ion-input[ionfix-input]"
})
export class IonicInputFix {

    constructor(private element: ElementRef<HTMLIonInputElement>) {
    }

    @Input("tabIndex")
    tabIndex: string;

    async ngAfterViewInit() {

        if (this.tabIndex) {
            this.element.nativeElement.removeAttribute("tabIndex");

            await waitTill(() => !!this.element.nativeElement.shadowRoot && !!this.element.nativeElement.shadowRoot.querySelector(".native-input"));

            let realInput = this.element.nativeElement.shadowRoot.querySelector(".native-input");
            realInput.setAttribute("tabIndex", this.tabIndex);
        }
    }
}