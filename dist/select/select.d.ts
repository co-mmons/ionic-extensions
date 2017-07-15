import { ElementRef, Renderer } from "@angular/core";
import { Select as IonSelect, App, Config, Item, NavController, Form, DeepLinker } from "ionic-angular";
export declare class Select extends IonSelect {
    private app;
    private navController;
    private deepLinker;
    constructor(app: App, form: Form, config: Config, elementRef: ElementRef, renderer: Renderer, item: Item, navController: NavController, deepLinker: DeepLinker);
    _click(ev: UIEvent): void;
    open(ev?: UIEvent): void;
}
