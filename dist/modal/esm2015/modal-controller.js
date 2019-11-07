import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
tslib_1.__decorate([
    Input()
], ModalControllerComponent.prototype, "cssClass", void 0);
tslib_1.__decorate([
    Input()
], ModalControllerComponent.prototype, "backdropDismiss", void 0);
tslib_1.__decorate([
    Input()
], ModalControllerComponent.prototype, "showBackdrop", void 0);
tslib_1.__decorate([
    ViewChild("modalContent", { static: true })
], ModalControllerComponent.prototype, "content", void 0);
tslib_1.__decorate([
    Output()
], ModalControllerComponent.prototype, "willEnter", void 0);
tslib_1.__decorate([
    Output()
], ModalControllerComponent.prototype, "didEnter", void 0);
tslib_1.__decorate([
    Output()
], ModalControllerComponent.prototype, "didDismiss", void 0);
tslib_1.__decorate([
    Output()
], ModalControllerComponent.prototype, "willDismiss", void 0);
ModalControllerComponent = tslib_1.__decorate([
    Component({
        selector: "ionx-modal-controller",
        template: `
        <ng-template #modalContent>
            <ng-content></ng-content>
        </ng-template>
    `
    })
], ModalControllerComponent);
export { ModalControllerComponent };
let ModalControllerContentComponent = class ModalControllerContentComponent {
    constructor() {
        //this.template = params.get("template");
    }
    ngOnDestroy() {
        this.template = undefined;
    }
};
ModalControllerContentComponent = tslib_1.__decorate([
    Component({
        template: `
        <ng-container *ngTemplateOutlet="template"></ng-container>
    `
    })
], ModalControllerContentComponent);
export { ModalControllerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBZSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBVS9DLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBRWpDLFlBQW9CLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBZ0IvQixjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUduRCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBZ0M1RCxlQUFVLEdBQVksS0FBSyxDQUFDO0lBeERwQyxDQUFDO0lBNEJZLE9BQU87O1lBRWhCLDBEQUEwRDtZQUMxRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1osT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBQyxTQUFTLEVBQUUsK0JBQStCLEVBQUUsY0FBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUVyTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXRCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUUzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXJCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRXZCLElBQUksTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzNCO1lBRUQsSUFBSSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUMzQjtRQUNMLENBQUM7S0FBQTtJQUlELElBQVcsU0FBUztRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBVTtRQUVqQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QztRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSixDQUFBOztZQTFFbUMsZUFBZTs7QUFJL0M7SUFEQyxLQUFLLEVBQUU7MERBQ2lCO0FBR3pCO0lBREMsS0FBSyxFQUFFO2lFQUN5QjtBQUdqQztJQURDLEtBQUssRUFBRTs4REFDc0I7QUFHOUI7SUFEQyxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO3lEQUNSO0FBR2xDO0lBREMsTUFBTSxFQUFFOzJEQUN5RDtBQUdsRTtJQURDLE1BQU0sRUFBRTswREFDd0Q7QUFHakU7SUFEQyxNQUFNLEVBQUU7NERBQzBEO0FBR25FO0lBREMsTUFBTSxFQUFFOzZEQUMyRDtBQTNCM0Qsd0JBQXdCO0lBUnBDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsUUFBUSxFQUFFOzs7O0tBSVQ7S0FDSixDQUFDO0dBQ1csd0JBQXdCLENBNEVwQztTQTVFWSx3QkFBd0I7QUFtRnJDLElBQWEsK0JBQStCLEdBQTVDLE1BQWEsK0JBQStCO0lBRXhDO1FBQ0kseUNBQXlDO0lBQzdDLENBQUM7SUFJRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztDQUNKLENBQUE7QUFYWSwrQkFBK0I7SUFMM0MsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFOztLQUVUO0tBQ0osQ0FBQztHQUNXLCtCQUErQixDQVczQztTQVhZLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtbW9kYWwtY29udHJvbGxlclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjbW9kYWxDb250ZW50PlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb250cm9sbGVyQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGNzc0NsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgYmFja2Ryb3BEaXNtaXNzOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIHNob3dCYWNrZHJvcDogYm9vbGVhbjtcblxuICAgIEBWaWV3Q2hpbGQoXCJtb2RhbENvbnRlbnRcIiwge3N0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHdpbGxFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlkRW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpZERpc21pc3M6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHdpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgbW9kYWw6IEhUTUxJb25Nb2RhbEVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgYXN5bmMgcHJlc2VudCgpIHtcblxuICAgICAgICAvLyBhbHJlYWR5IG9wZW5lZCAtIHNob3VsZCB3ZSBjbG9zZSBleGlzdGluZyBhbmQgb3BlbiBuZXc/XG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMubW9kYWwgPSAoYXdhaXQgdGhpcy5jb250cm9sbGVyLmNyZWF0ZSh7Y29tcG9uZW50OiBNb2RhbENvbnRyb2xsZXJDb250ZW50Q29tcG9uZW50LCBjb21wb25lbnRQcm9wczoge3RlbXBsYXRlOiB0aGlzLmNvbnRlbnR9LCBiYWNrZHJvcERpc21pc3M6IHRoaXMuYmFja2Ryb3BEaXNtaXNzLCBzaG93QmFja2Ryb3A6IHRoaXMuc2hvd0JhY2tkcm9wLCBjc3NDbGFzczogdGhpcy5jc3NDbGFzc30pKTtcblxuICAgICAgICB0aGlzLndpbGxFbnRlci5uZXh0KCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5tb2RhbC5wcmVzZW50KCk7XG5cbiAgICAgICAgdGhpcy5kaWRFbnRlci5uZXh0KCk7XG5cbiAgICAgICAgdGhpcy5fcHJlc2VudGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoYXdhaXQgdGhpcy5tb2RhbC5vbldpbGxEaXNtaXNzKCkpIHtcbiAgICAgICAgICAgIHRoaXMud2lsbERpc21pc3MubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGF3YWl0IHRoaXMubW9kYWwub25EaWREaXNtaXNzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlkRGlzbWlzcy5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc2VudGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcmVzZW50ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBnZXQgcHJlc2VudGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJlc2VudGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNtaXNzKGRhdGE/OiBhbnksIHJvbGU/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RhbC5kaXNtaXNzKGRhdGEsIHJvbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb250cm9sbGVyQ29udGVudENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy90aGlzLnRlbXBsYXRlID0gcGFyYW1zLmdldChcInRlbXBsYXRlXCIpO1xuICAgIH1cblxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIl19