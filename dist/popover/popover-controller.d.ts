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
    present(event?: Event): Promise<void>;
    private _dismissing;
    get dismissing(): boolean;
    private _presented;
    get presented(): boolean;
    dismiss(data?: any, role?: any): Promise<any>;
}
export declare class PopoverControllerContentComponent {
    constructor();
    template: TemplateRef<any>;
    ngOnDestroy(): void;
}
