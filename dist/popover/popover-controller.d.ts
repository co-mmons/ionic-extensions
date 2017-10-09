import { EventEmitter } from "@angular/core";
import { PopoverController, NavParams, NavOptions } from "ionic-angular";
export declare class PopoverControllerComponent {
    private controller;
    constructor(controller: PopoverController);
    private cssClass;
    private enableBackdropDismiss;
    private showBackdrop;
    private content;
    readonly willEnter: EventEmitter<any>;
    readonly didEnter: EventEmitter<any>;
    readonly didDismiss: EventEmitter<any>;
    readonly willDismiss: EventEmitter<any>;
    private popover;
    present(options?: Event | NavOptions): Promise<void>;
    private _presented;
    readonly presented: boolean;
    dismiss(data?: any, role?: any, navOptions?: NavOptions): Promise<any>;
}
export declare class PopoverControllerContentComponent {
    private params;
    constructor(params: NavParams);
    private template;
    ngOnDestroy(): void;
}
