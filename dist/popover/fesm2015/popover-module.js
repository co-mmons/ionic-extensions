import { CommonModule } from '@angular/common';
import { EventEmitter, Component, ViewEncapsulation, Input, ViewChild, Output, NgModule } from '@angular/core';
import { PopoverController, IonicModule } from '@ionic/angular';
import { __awaiter } from 'tslib';

class PopoverControllerComponent {
    constructor(controller) {
        this.controller = controller;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.didDismiss = new EventEmitter();
        this.willDismiss = new EventEmitter();
        this._dismissing = false;
        this._presented = false;
    }
    present(event) {
        return __awaiter(this, void 0, void 0, function* () {
            // already opened - should we close existing and open new?
            if (this.popover) {
                return;
            }
            this.popover = (yield this.controller.create({ component: PopoverControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.enableBackdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass, event: event }));
            this.willEnter.next();
            yield this.popover.present();
            this.didEnter.next();
            this._presented = true;
            if (yield this.popover.onWillDismiss()) {
                this.willDismiss.next();
            }
            this._dismissing = true;
            if (yield this.popover.onDidDismiss()) {
                this.didDismiss.next();
                this.popover = undefined;
                this._presented = false;
                this._dismissing = false;
            }
        });
    }
    get dismissing() {
        return this._dismissing;
    }
    get presented() {
        return this._presented;
    }
    dismiss(data, role) {
        if (this.popover) {
            return this.popover.dismiss(data, role);
        }
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}
PopoverControllerComponent.decorators = [
    { type: Component, args: [{
                selector: "ionx-popover-controller",
                encapsulation: ViewEncapsulation.None,
                template: `
        <ng-template #popoverContent>
            <ng-content></ng-content>
        </ng-template>
    `
            },] }
];
PopoverControllerComponent.ctorParameters = () => [
    { type: PopoverController }
];
PopoverControllerComponent.propDecorators = {
    cssClass: [{ type: Input }],
    enableBackdropDismiss: [{ type: Input }],
    showBackdrop: [{ type: Input }],
    content: [{ type: ViewChild, args: ["popoverContent", { static: true },] }],
    willEnter: [{ type: Output }],
    didEnter: [{ type: Output }],
    didDismiss: [{ type: Output }],
    willDismiss: [{ type: Output }]
};
class PopoverControllerContentComponent {
    constructor() {
        //this.template = params.get("template");
    }
    ngOnDestroy() {
        this.template = undefined;
    }
}
PopoverControllerContentComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                template: `
        <ng-template [ngTemplateOutlet]="template"></ng-template>
    `
            },] }
];
PopoverControllerContentComponent.ctorParameters = () => [];
PopoverControllerContentComponent.propDecorators = {
    template: [{ type: Input }]
};

class PopoverModule {
}
PopoverModule.decorators = [
    { type: NgModule, args: [{
                declarations: [PopoverControllerComponent, PopoverControllerContentComponent],
                exports: [PopoverControllerComponent],
                imports: [IonicModule, CommonModule],
                entryComponents: [PopoverControllerComponent, PopoverControllerContentComponent]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { PopoverControllerComponent, PopoverModule, PopoverControllerContentComponent as ɵa };
//# sourceMappingURL=popover-module.js.map
