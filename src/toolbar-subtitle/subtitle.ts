import {Directive, ElementRef, Renderer} from "@angular/core";
import {Ion, Config} from "ionic-angular";

@Directive({
    selector: "ion-title[ionx-with-subtitle]"
})
export class ToolbarSubtitle extends Ion {

    constructor(config: Config, elementRef: ElementRef, renderer: Renderer) {
        super(config, elementRef, renderer, "ToolbarSubtitle");
    }
}