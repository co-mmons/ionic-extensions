import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core";
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
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], ModalControllerComponent.prototype, "cssClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], ModalControllerComponent.prototype, "backdropDismiss", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], ModalControllerComponent.prototype, "showBackdrop", void 0);
tslib_1.__decorate([
    ViewChild("modalContent", { static: true }),
    tslib_1.__metadata("design:type", TemplateRef)
], ModalControllerComponent.prototype, "content", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ModalControllerComponent.prototype, "willEnter", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ModalControllerComponent.prototype, "didEnter", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ModalControllerComponent.prototype, "didDismiss", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ModalControllerComponent.prototype, "willDismiss", void 0);
ModalControllerComponent = tslib_1.__decorate([
    Component({
        selector: "ionx-modal-controller",
        template: `
        <ng-template #modalContent>
            <ng-content></ng-content>
        </ng-template>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [ModalController])
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
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ModalControllerContentComponent);
export { ModalControllerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQVUvQyxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQUVqQyxZQUFvQixVQUEyQjtRQUEzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQWdCL0IsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2xELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbkQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWdDNUQsZUFBVSxHQUFZLEtBQUssQ0FBQztJQXhEcEMsQ0FBQztJQTRCWSxPQUFPOztZQUVoQiwwREFBMEQ7WUFDMUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNaLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLCtCQUErQixFQUFFLGNBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFck8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV0QixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUV2QixJQUFJLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMzQjtZQUVELElBQUksTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDM0I7UUFDTCxDQUFDO0tBQUE7SUFJRCxJQUFXLFNBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBVSxFQUFFLElBQVU7UUFFakMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekM7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBRUosQ0FBQTtBQXRFRztJQURDLEtBQUssRUFBRTs7MERBQ2lCO0FBR3pCO0lBREMsS0FBSyxFQUFFOztpRUFDeUI7QUFHakM7SUFEQyxLQUFLLEVBQUU7OzhEQUNzQjtBQUc5QjtJQURDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7c0NBQ3pCLFdBQVc7eURBQU07QUFHbEM7SUFEQyxNQUFNLEVBQUU7c0NBQ2tCLFlBQVk7MkRBQTJCO0FBR2xFO0lBREMsTUFBTSxFQUFFO3NDQUNpQixZQUFZOzBEQUEyQjtBQUdqRTtJQURDLE1BQU0sRUFBRTtzQ0FDbUIsWUFBWTs0REFBMkI7QUFHbkU7SUFEQyxNQUFNLEVBQUU7c0NBQ29CLFlBQVk7NkRBQTJCO0FBM0IzRCx3QkFBd0I7SUFScEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxRQUFRLEVBQUU7Ozs7S0FJVDtLQUNKLENBQUM7NkNBR2tDLGVBQWU7R0FGdEMsd0JBQXdCLENBNEVwQztTQTVFWSx3QkFBd0I7QUFtRnJDLElBQWEsK0JBQStCLEdBQTVDLE1BQWEsK0JBQStCO0lBRXhDO1FBQ0kseUNBQXlDO0lBQzdDLENBQUM7SUFJRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztDQUNKLENBQUE7QUFYWSwrQkFBK0I7SUFMM0MsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFOztLQUVUO0tBQ0osQ0FBQzs7R0FDVywrQkFBK0IsQ0FXM0M7U0FYWSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LW1vZGFsLWNvbnRyb2xsZXJcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGUgI21vZGFsQ29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udHJvbGxlckNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBjc3NDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGJhY2tkcm9wRGlzbWlzczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBzaG93QmFja2Ryb3A6IGJvb2xlYW47XG5cbiAgICBAVmlld0NoaWxkKFwibW9kYWxDb250ZW50XCIsIHtzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB3aWxsRW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpZEVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaWREaXNtaXNzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB3aWxsRGlzbWlzczogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwcml2YXRlIG1vZGFsOiBIVE1MSW9uTW9kYWxFbGVtZW50O1xuXG4gICAgcHVibGljIGFzeW5jIHByZXNlbnQoKSB7XG5cbiAgICAgICAgLy8gYWxyZWFkeSBvcGVuZWQgLSBzaG91bGQgd2UgY2xvc2UgZXhpc3RpbmcgYW5kIG9wZW4gbmV3P1xuICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vZGFsID0gKGF3YWl0IHRoaXMuY29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogTW9kYWxDb250cm9sbGVyQ29udGVudENvbXBvbmVudCwgY29tcG9uZW50UHJvcHM6IHt0ZW1wbGF0ZTogdGhpcy5jb250ZW50fSwgYmFja2Ryb3BEaXNtaXNzOiB0aGlzLmJhY2tkcm9wRGlzbWlzcywgc2hvd0JhY2tkcm9wOiB0aGlzLnNob3dCYWNrZHJvcCwgY3NzQ2xhc3M6IHRoaXMuY3NzQ2xhc3N9KSk7XG5cbiAgICAgICAgdGhpcy53aWxsRW50ZXIubmV4dCgpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMubW9kYWwucHJlc2VudCgpO1xuXG4gICAgICAgIHRoaXMuZGlkRW50ZXIubmV4dCgpO1xuXG4gICAgICAgIHRoaXMuX3ByZXNlbnRlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKGF3YWl0IHRoaXMubW9kYWwub25XaWxsRGlzbWlzcygpKSB7XG4gICAgICAgICAgICB0aGlzLndpbGxEaXNtaXNzLm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhd2FpdCB0aGlzLm1vZGFsLm9uRGlkRGlzbWlzcygpKSB7XG4gICAgICAgICAgICB0aGlzLmRpZERpc21pc3MubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuX3ByZXNlbnRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcHJlc2VudGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgZ2V0IHByZXNlbnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZXNlbnRlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzbWlzcyhkYXRhPzogYW55LCByb2xlPzogYW55KTogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWwuZGlzbWlzcyhkYXRhLCByb2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udHJvbGxlckNvbnRlbnRDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vdGhpcy50ZW1wbGF0ZSA9IHBhcmFtcy5nZXQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICB9XG5cbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==