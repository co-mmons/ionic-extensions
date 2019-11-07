import { __awaiter, __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { EventEmitter, Input, ViewChild, Output, Component, ViewEncapsulation, NgModule } from '@angular/core';
import { PopoverController, IonicModule } from '@ionic/angular';

let PopoverControllerComponent = class PopoverControllerComponent {
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
};
PopoverControllerComponent.ctorParameters = () => [
    { type: PopoverController }
];
__decorate([
    Input()
], PopoverControllerComponent.prototype, "cssClass", void 0);
__decorate([
    Input()
], PopoverControllerComponent.prototype, "enableBackdropDismiss", void 0);
__decorate([
    Input()
], PopoverControllerComponent.prototype, "showBackdrop", void 0);
__decorate([
    ViewChild("popoverContent", { static: true })
], PopoverControllerComponent.prototype, "content", void 0);
__decorate([
    Output()
], PopoverControllerComponent.prototype, "willEnter", void 0);
__decorate([
    Output()
], PopoverControllerComponent.prototype, "didEnter", void 0);
__decorate([
    Output()
], PopoverControllerComponent.prototype, "didDismiss", void 0);
__decorate([
    Output()
], PopoverControllerComponent.prototype, "willDismiss", void 0);
PopoverControllerComponent = __decorate([
    Component({
        selector: "ionx-popover-controller",
        encapsulation: ViewEncapsulation.None,
        template: `
        <ng-template #popoverContent>
            <ng-content></ng-content>
        </ng-template>
    `
    })
], PopoverControllerComponent);
let PopoverControllerContentComponent = class PopoverControllerContentComponent {
    constructor() {
        //this.template = params.get("template");
    }
    ngOnDestroy() {
        this.template = undefined;
    }
};
__decorate([
    Input()
], PopoverControllerContentComponent.prototype, "template", void 0);
PopoverControllerContentComponent = __decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        template: `
        <ng-template [ngTemplateOutlet]="template"></ng-template>
    `
    })
], PopoverControllerContentComponent);

let PopoverModule = class PopoverModule {
};
PopoverModule = __decorate([
    NgModule({
        declarations: [PopoverControllerComponent, PopoverControllerContentComponent],
        exports: [PopoverControllerComponent],
        imports: [IonicModule, CommonModule],
        entryComponents: [PopoverControllerComponent, PopoverControllerContentComponent]
    })
], PopoverModule);

/**
 * Generated bundle index. Do not edit.
 */

export { PopoverControllerComponent, PopoverModule, PopoverControllerContentComponent as ɵa };
//# sourceMappingURL=popover-module.js.map
