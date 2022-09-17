import { __awaiter } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
export class ModalControllerComponent {
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
export class ModalControllerContentComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RhbC9tb2RhbC1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFlLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFVL0MsTUFBTSxPQUFPLHdCQUF3QjtJQUVqQyxZQUFvQixVQUEyQjtRQUEzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQWdCL0IsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR25ELGFBQVEsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdsRCxlQUFVLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHcEQsZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWdDN0QsZUFBVSxHQUFZLEtBQUssQ0FBQztJQXhEcEMsQ0FBQztJQTRCWSxPQUFPOztZQUVoQiwwREFBMEQ7WUFDMUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNaLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLCtCQUErQixFQUFFLGNBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFck8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV0QixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUV2QixJQUFJLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMzQjtZQUVELElBQUksTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDM0I7UUFDTCxDQUFDO0tBQUE7SUFJRCxJQUFXLFNBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBVSxFQUFFLElBQVU7UUFFakMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekM7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFsRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7OztLQUlUO2FBQ0o7OztZQVRPLGVBQWU7Ozt1QkFlbEIsS0FBSzs4QkFHTCxLQUFLOzJCQUdMLEtBQUs7c0JBR0wsU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7d0JBR3hDLE1BQU07dUJBR04sTUFBTTt5QkFHTixNQUFNOzBCQUdOLE1BQU07O0FBeURYLE1BQU0sT0FBTywrQkFBK0I7SUFFeEM7UUFDSSx5Q0FBeUM7SUFDN0MsQ0FBQztJQUlELFdBQVc7UUFDUCxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDOzs7WUFmSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFOztLQUVUO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LW1vZGFsLWNvbnRyb2xsZXJcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGUgI21vZGFsQ29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udHJvbGxlckNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBjc3NDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGJhY2tkcm9wRGlzbWlzczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBzaG93QmFja2Ryb3A6IGJvb2xlYW47XG5cbiAgICBAVmlld0NoaWxkKFwibW9kYWxDb250ZW50XCIsIHtzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB3aWxsRW50ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaWRFbnRlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpZERpc21pc3M6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB3aWxsRGlzbWlzczogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBtb2RhbDogSFRNTElvbk1vZGFsRWxlbWVudDtcblxuICAgIHB1YmxpYyBhc3luYyBwcmVzZW50KCkge1xuXG4gICAgICAgIC8vIGFscmVhZHkgb3BlbmVkIC0gc2hvdWxkIHdlIGNsb3NlIGV4aXN0aW5nIGFuZCBvcGVuIG5ldz9cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tb2RhbCA9IChhd2FpdCB0aGlzLmNvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IE1vZGFsQ29udHJvbGxlckNvbnRlbnRDb21wb25lbnQsIGNvbXBvbmVudFByb3BzOiB7dGVtcGxhdGU6IHRoaXMuY29udGVudH0sIGJhY2tkcm9wRGlzbWlzczogdGhpcy5iYWNrZHJvcERpc21pc3MsIHNob3dCYWNrZHJvcDogdGhpcy5zaG93QmFja2Ryb3AsIGNzc0NsYXNzOiB0aGlzLmNzc0NsYXNzfSkpO1xuXG4gICAgICAgIHRoaXMud2lsbEVudGVyLm5leHQoKTtcblxuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsLnByZXNlbnQoKTtcblxuICAgICAgICB0aGlzLmRpZEVudGVyLm5leHQoKTtcblxuICAgICAgICB0aGlzLl9wcmVzZW50ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChhd2FpdCB0aGlzLm1vZGFsLm9uV2lsbERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy53aWxsRGlzbWlzcy5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXdhaXQgdGhpcy5tb2RhbC5vbkRpZERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy5kaWREaXNtaXNzLm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLl9wcmVzZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3ByZXNlbnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGdldCBwcmVzZW50ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVzZW50ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc21pc3MoZGF0YT86IGFueSwgcm9sZT86IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsLmRpc21pc3MoZGF0YSwgcm9sZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRyb2xsZXJDb250ZW50Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvL3RoaXMudGVtcGxhdGUgPSBwYXJhbXMuZ2V0KFwidGVtcGxhdGVcIik7XG4gICAgfVxuXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=