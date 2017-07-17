import { ElementRef, Renderer } from "@angular/core";
import { Select as IonSelect, App, Config, Item, Form, DeepLinker } from "ionic-angular";
export declare class Select extends IonSelect {
    private app;
    constructor(app: App, form: Form, config: Config, elementRef: ElementRef, renderer: Renderer, item: Item, deepLinker: DeepLinker);
    _click(ev: UIEvent): void;
    open(ev?: UIEvent): void;
    readonly: boolean;
}
