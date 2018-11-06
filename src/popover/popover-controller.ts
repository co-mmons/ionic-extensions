import {Component, TemplateRef, Input, ViewChild, EventEmitter, Output} from "@angular/core";
import {PopoverController} from "@ionic/angular";

@Component({
    selector: "ionx-popover-controller",
    template: `
        <ng-template #popoverContent>
            <ng-content></ng-content>
        </ng-template>
    `
})
export class PopoverControllerComponent {

    constructor(private controller: PopoverController) {
    }

    @Input()
    private cssClass: string;

    @Input()
    private enableBackdropDismiss: boolean;

    @Input()
    private showBackdrop: boolean;

    @ViewChild("popoverContent")
    private content: TemplateRef<any>;

    @Output()
    public readonly willEnter: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly didEnter: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly didDismiss: EventEmitter<any> = new EventEmitter();

    @Output()
    public readonly willDismiss: EventEmitter<any> = new EventEmitter();

    private popover: HTMLIonPopoverElement;

    public async present(event?: Event) {

        // already opened - should we close existing and open new?
        if (this.popover) {
            return;
        }
        
        this.popover = (await this.controller.create({component: PopoverControllerContentComponent, componentProps: {template: this.content}, backdropDismiss: this.enableBackdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass, event: event}));

        this.willEnter.next();

        await this.popover.present();

        this.didEnter.next();

        this._presented = true;

        if (await this.popover.onWillDismiss()) {
            this.willDismiss.next();
        }

        if (await this.popover.onDidDismiss()) {
            this.didDismiss.next();
            this.popover = undefined;
            this._presented = false;
        }
    }

    private _presented: boolean = false;

    public get presented() {
        return this._presented;
    }

    public dismiss(data?: any, role?: any): Promise<any> {

        if (this.popover) {
            return this.popover.dismiss(data, role);
        }

        return new Promise((resolve, reject) => {
            resolve();
        });
    }

}

@Component({
    template: `
        <ng-container *ngTemplateOutlet="template"></ng-container>
    `
})
export class PopoverControllerContentComponent {

    constructor() {
        //this.template = params.get("template");
    }

    @Input()
    template: TemplateRef<any>;

    ngOnDestroy() {
        this.template = undefined;
    }
}