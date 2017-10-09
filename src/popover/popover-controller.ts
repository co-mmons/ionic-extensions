import {Component, HostListener, TemplateRef, Input, ViewChild, EventEmitter, Output} from "@angular/core";
import {PopoverController, NavParams, NavOptions, PopoverOptions, Popover} from "ionic-angular";

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

    private popover: Popover;

    public async present(options?: Event | NavOptions) {

        // already opened - should we close existing and open new?
        if (this.popover) {
            return;
        }
        
        this.popover = this.controller.create(PopoverControllerContentComponent, {template: this.content}, {enableBackdropDismiss: this.enableBackdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass});
        this.popover.onWillDismiss((data) => this.willDismiss.next(data));
        this.popover.onDidDismiss((data) => {
            this.didDismiss.next(data);
            this.popover = undefined;
            this._presented = false;
        });

        this.willEnter.next();

        await this.popover.present({ev: options});

        this.didEnter.next();
        this._presented = true;
    }

    private _presented: boolean = false;

    public get presented() {
        return this._presented;
    }

    public dismiss(data?: any, role?: any, navOptions?: NavOptions): Promise<any> {

        if (this.popover) {
            return this.popover.dismiss(data, role, navOptions);
        }

        return new Promise((resolve, reject) => {
            resolve();
        });
    }

}

@Component({
    template: `
        <ng-template [ngTemplateOutlet]="template"></ng-template>
    `
})
export class PopoverControllerContentComponent {

    constructor(private params: NavParams) {
        this.template = params.get("template");
    }

    private template: TemplateRef<any>;

    ngOnDestroy() {
        this.template = undefined;
    }
}