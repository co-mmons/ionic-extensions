import { CommonModule } from '@angular/common';
import { EventEmitter, Component, Input, ViewChild, Output, NgModule } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { __awaiter } from 'tslib';

class ModalControllerComponent {
    constructor(controller) {
        this.controller = controller;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.didDismiss = new EventEmitter();
        this.willDismiss = new EventEmitter();
        this._presented = false;
    }
    present() {
        return __awaiter(this, void 0, void 0, function* () {
            // already opened - should we close existing and open new?
            if (this.modal) {
                return;
            }
            this.modal = (yield this.controller.create({ component: ModalControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.backdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass }));
            this.willEnter.next();
            yield this.modal.present();
            this.didEnter.next();
            this._presented = true;
            if (yield this.modal.onWillDismiss()) {
                this.willDismiss.next();
            }
            if (yield this.modal.onDidDismiss()) {
                this.didDismiss.next();
                this.modal = undefined;
                this._presented = false;
            }
        });
    }
    get presented() {
        return this._presented;
    }
    dismiss(data, role) {
        if (this.modal) {
            return this.modal.dismiss(data, role);
        }
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}
ModalControllerComponent.decorators = [
    { type: Component, args: [{
                selector: "ionx-modal-controller",
                template: `
        <ng-template #modalContent>
            <ng-content></ng-content>
        </ng-template>
    `
            },] }
];
ModalControllerComponent.ctorParameters = () => [
    { type: ModalController }
];
ModalControllerComponent.propDecorators = {
    cssClass: [{ type: Input }],
    backdropDismiss: [{ type: Input }],
    showBackdrop: [{ type: Input }],
    content: [{ type: ViewChild, args: ["modalContent", { static: true },] }],
    willEnter: [{ type: Output }],
    didEnter: [{ type: Output }],
    didDismiss: [{ type: Output }],
    willDismiss: [{ type: Output }]
};
class ModalControllerContentComponent {
    constructor() {
        //this.template = params.get("template");
    }
    ngOnDestroy() {
        this.template = undefined;
    }
}
ModalControllerContentComponent.decorators = [
    { type: Component, args: [{
                template: `
        <ng-container *ngTemplateOutlet="template"></ng-container>
    `
            },] }
];
ModalControllerContentComponent.ctorParameters = () => [];

class ModalModule {
}
ModalModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ModalControllerComponent, ModalControllerContentComponent],
                exports: [ModalControllerComponent],
                imports: [CommonModule, IonicModule],
                entryComponents: [ModalControllerComponent, ModalControllerContentComponent]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { ModalControllerComponent, ModalModule, ModalControllerContentComponent as ɵa };
//# sourceMappingURL=modal-module.js.map
