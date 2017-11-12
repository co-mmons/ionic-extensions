import {Directive, ElementRef, Renderer, ChangeDetectionStrategy, ViewEncapsulation, Optional, Inject, forwardRef} from "@angular/core";
import {Ion, Config, Toolbar, Navbar} from "ionic-angular";

@Directive({
    selector: "ion-title[ionx-with-subtitle]"
})
export class ToolbarSubtitle extends Ion {

    constructor(config: Config, elementRef: ElementRef, renderer: Renderer) {
        super(config, elementRef, renderer, "ToolbarSubtitle");
    }
}