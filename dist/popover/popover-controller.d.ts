import { TemplateRef, EventEmitter } from "@angular/core";
import { PopoverController } from "@ionic/angular";
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
    present(options?: Event): Promise<void>;
    private _presented;
    readonly presented: boolean;
    dismiss(data?: any, role?: any): Promise<any>;
}
export declare class PopoverControllerContentComponent {
    constructor(params: any);
    template: TemplateRef<any>;
    ngOnDestroy(): void;
}
