import { ElementRef, Renderer } from "@angular/core";
import { Select as IonSelect, ModalController, App, Config, Item, Form, DeepLinker } from "ionic-angular";
export declare class Select extends IonSelect {
    private modalController;
    constructor(app: App, form: Form, config: Config, elementRef: ElementRef, renderer: Renderer, item: Item, deepLinker: DeepLinker, modalController: ModalController);
    open(ev?: UIEvent): void;
    readonly: boolean;
    ordered: boolean;
    alwaysArrayResult: boolean;
    compareAsString: boolean;
    searchHandler: (query: string, options: {
        label: string;
        value: any;
        hidden: boolean;
        checked: boolean;
    }[]) => void;
    selectionValidator: (option: {
        label: string;
        value: any;
        hidden: boolean;
        checked: boolean;
    }, options: {
        label: string;
        value: any;
        hidden: boolean;
        checked: boolean;
    }[]) => void;
    _updateText(): void;
}
