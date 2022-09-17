import { EventEmitter, TemplateRef } from "@angular/core";
import { ModalController } from "@ionic/angular";
export declare class ModalControllerComponent {
    private controller;
    constructor(controller: ModalController);
    private cssClass;
    private backdropDismiss;
    private showBackdrop;
    private content;
    readonly willEnter: EventEmitter<void>;
    readonly didEnter: EventEmitter<void>;
    readonly didDismiss: EventEmitter<void>;
    readonly willDismiss: EventEmitter<void>;
    private modal;
    present(): Promise<void>;
    private _presented;
    get presented(): boolean;
    dismiss(data?: any, role?: any): Promise<any>;
}
export declare class ModalControllerContentComponent {
    constructor();
    template: TemplateRef<any>;
    ngOnDestroy(): void;
}
