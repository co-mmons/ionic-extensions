import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from "@angular/core";
import {ModalController} from "@ionic/angular";

@Component({
    selector: "ionx-modal-controller",
    template: `
        <ng-template #modalContent>
            <ng-content></ng-content>
        </ng-template>
    `
})
export class ModalControllerComponent {

    constructor(private controller: ModalController) {
    }

    @Input()
    private cssClass: string;

    @Input()
    private backdropDismiss: boolean;

    @Input()
    private showBackdrop: boolean;

    @ViewChild("modalContent", {static: true})
    private content: TemplateRef<any>;

    @Output()
    public readonly willEnter: EventEmitter<void> = new EventEmitter();

    @Output()
    public readonly didEnter: EventEmitter<void> = new EventEmitter();

    @Output()
    public readonly didDismiss: EventEmitter<void> = new EventEmitter();

    @Output()
    public readonly willDismiss: EventEmitter<void> = new EventEmitter();

    private modal: HTMLIonModalElement;

    public async present() {

        // already opened - should we close existing and open new?
        if (this.modal) {
            return;
        }
        
        this.modal = (await this.controller.create({component: ModalControllerContentComponent, componentProps: {template: this.content}, backdropDismiss: this.backdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass}));

        this.willEnter.next();

        await this.modal.present();

        this.didEnter.next();

        this._presented = true;

        if (await this.modal.onWillDismiss()) {
            this.willDismiss.next();
        }

        if (await this.modal.onDidDismiss()) {
            this.didDismiss.next();
            this.modal = undefined;
            this._presented = false;
        }
    }

    private _presented: boolean = false;

    public get presented() {
        return this._presented;
    }

    public dismiss(data?: any, role?: any): Promise<any> {

        if (this.modal) {
            return this.modal.dismiss(data, role);
        }

        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

}

@Component({
    template: `
        <ng-container *ngTemplateOutlet="template"></ng-container>
    `
})
export class ModalControllerContentComponent {

    constructor() {
        //this.template = params.get("template");
    }

    template: TemplateRef<any>;

    ngOnDestroy() {
        this.template = undefined;
    }
}
