import { __awaiter, __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { EventEmitter, Input, ViewChild, Output, Component, NgModule } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';

let ModalControllerComponent = class ModalControllerComponent {
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
};
ModalControllerComponent.ctorParameters = () => [
    { type: ModalController }
];
__decorate([
    Input()
], ModalControllerComponent.prototype, "cssClass", void 0);
__decorate([
    Input()
], ModalControllerComponent.prototype, "backdropDismiss", void 0);
__decorate([
    Input()
], ModalControllerComponent.prototype, "showBackdrop", void 0);
__decorate([
    ViewChild("modalContent", { static: true })
], ModalControllerComponent.prototype, "content", void 0);
__decorate([
    Output()
], ModalControllerComponent.prototype, "willEnter", void 0);
__decorate([
    Output()
], ModalControllerComponent.prototype, "didEnter", void 0);
__decorate([
    Output()
], ModalControllerComponent.prototype, "didDismiss", void 0);
__decorate([
    Output()
], ModalControllerComponent.prototype, "willDismiss", void 0);
ModalControllerComponent = __decorate([
    Component({
        selector: "ionx-modal-controller",
        template: `
        <ng-template #modalContent>
            <ng-content></ng-content>
        </ng-template>
    `
    })
], ModalControllerComponent);
let ModalControllerContentComponent = class ModalControllerContentComponent {
    constructor() {
        //this.template = params.get("template");
    }
    ngOnDestroy() {
        this.template = undefined;
    }
};
ModalControllerContentComponent = __decorate([
    Component({
        template: `
        <ng-container *ngTemplateOutlet="template"></ng-container>
    `
    })
], ModalControllerContentComponent);

let ModalModule = class ModalModule {
};
ModalModule = __decorate([
    NgModule({
        declarations: [ModalControllerComponent, ModalControllerContentComponent],
        exports: [ModalControllerComponent],
        imports: [CommonModule, IonicModule],
        entryComponents: [ModalControllerComponent, ModalControllerContentComponent]
    })
], ModalModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ModalControllerComponent, ModalModule, ModalControllerContentComponent as ɵa };
//# sourceMappingURL=modal-module.js.map
