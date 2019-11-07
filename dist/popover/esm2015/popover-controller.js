import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import { PopoverController } from "@ionic/angular";
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
tslib_1.__decorate([
    Input()
], PopoverControllerComponent.prototype, "cssClass", void 0);
tslib_1.__decorate([
    Input()
], PopoverControllerComponent.prototype, "enableBackdropDismiss", void 0);
tslib_1.__decorate([
    Input()
], PopoverControllerComponent.prototype, "showBackdrop", void 0);
tslib_1.__decorate([
    ViewChild("popoverContent", { static: true })
], PopoverControllerComponent.prototype, "content", void 0);
tslib_1.__decorate([
    Output()
], PopoverControllerComponent.prototype, "willEnter", void 0);
tslib_1.__decorate([
    Output()
], PopoverControllerComponent.prototype, "didEnter", void 0);
tslib_1.__decorate([
    Output()
], PopoverControllerComponent.prototype, "didDismiss", void 0);
tslib_1.__decorate([
    Output()
], PopoverControllerComponent.prototype, "willDismiss", void 0);
PopoverControllerComponent = tslib_1.__decorate([
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
export { PopoverControllerComponent };
let PopoverControllerContentComponent = class PopoverControllerContentComponent {
    constructor() {
        //this.template = params.get("template");
    }
    ngOnDestroy() {
        this.template = undefined;
    }
};
tslib_1.__decorate([
    Input()
], PopoverControllerContentComponent.prototype, "template", void 0);
PopoverControllerContentComponent = tslib_1.__decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        template: `
        <ng-template [ngTemplateOutlet]="template"></ng-template>
    `
    })
], PopoverControllerContentComponent);
export { PopoverControllerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvcG9wb3Zlci8iLCJzb3VyY2VzIjpbInBvcG92ZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBZSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEgsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFXakQsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFFbkMsWUFBb0IsVUFBNkI7UUFBN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFnQmpDLGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdsRCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR25ELGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFrQzVELGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBTTdCLGVBQVUsR0FBWSxLQUFLLENBQUM7SUFoRXBDLENBQUM7SUE0QlksT0FBTyxDQUFDLEtBQWE7O1lBRTlCLDBEQUEwRDtZQUMxRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBQyxTQUFTLEVBQUUsaUNBQWlDLEVBQUUsY0FBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV0QixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUV2QixJQUFJLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMzQjtZQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQztLQUFBO0lBSUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBSUQsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRU0sT0FBTyxDQUFDLElBQVUsRUFBRSxJQUFVO1FBRWpDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNDO1FBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUVKLENBQUE7O1lBbEZtQyxpQkFBaUI7O0FBSWpEO0lBREMsS0FBSyxFQUFFOzREQUNpQjtBQUd6QjtJQURDLEtBQUssRUFBRTt5RUFDK0I7QUFHdkM7SUFEQyxLQUFLLEVBQUU7Z0VBQ3NCO0FBRzlCO0lBREMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDOzJEQUNWO0FBR2xDO0lBREMsTUFBTSxFQUFFOzZEQUN5RDtBQUdsRTtJQURDLE1BQU0sRUFBRTs0REFDd0Q7QUFHakU7SUFEQyxNQUFNLEVBQUU7OERBQzBEO0FBR25FO0lBREMsTUFBTSxFQUFFOytEQUMyRDtBQTNCM0QsMEJBQTBCO0lBVHRDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx5QkFBeUI7UUFDbkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsUUFBUSxFQUFFOzs7O0tBSVQ7S0FDSixDQUFDO0dBQ1csMEJBQTBCLENBb0Z0QztTQXBGWSwwQkFBMEI7QUE0RnZDLElBQWEsaUNBQWlDLEdBQTlDLE1BQWEsaUNBQWlDO0lBRTFDO1FBQ0kseUNBQXlDO0lBQzdDLENBQUM7SUFLRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztDQUNKLENBQUE7QUFMRztJQURDLEtBQUssRUFBRTttRUFDbUI7QUFQbEIsaUNBQWlDO0lBTjdDLFNBQVMsQ0FBQztRQUNQLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLFFBQVEsRUFBRTs7S0FFVDtLQUNKLENBQUM7R0FDVyxpQ0FBaUMsQ0FZN0M7U0FaWSxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVGVtcGxhdGVSZWYsIElucHV0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXBvcG92ZXItY29udHJvbGxlclwiLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlICNwb3BvdmVyQ29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb250cm9sbGVyQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgY3NzQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlbmFibGVCYWNrZHJvcERpc21pc3M6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgc2hvd0JhY2tkcm9wOiBib29sZWFuO1xuXG4gICAgQFZpZXdDaGlsZChcInBvcG92ZXJDb250ZW50XCIsIHtzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB3aWxsRW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpZEVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaWREaXNtaXNzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB3aWxsRGlzbWlzczogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwcml2YXRlIHBvcG92ZXI6IEhUTUxJb25Qb3BvdmVyRWxlbWVudDtcblxuICAgIHB1YmxpYyBhc3luYyBwcmVzZW50KGV2ZW50PzogRXZlbnQpIHtcblxuICAgICAgICAvLyBhbHJlYWR5IG9wZW5lZCAtIHNob3VsZCB3ZSBjbG9zZSBleGlzdGluZyBhbmQgb3BlbiBuZXc/XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5wb3BvdmVyID0gKGF3YWl0IHRoaXMuY29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogUG9wb3ZlckNvbnRyb2xsZXJDb250ZW50Q29tcG9uZW50LCBjb21wb25lbnRQcm9wczoge3RlbXBsYXRlOiB0aGlzLmNvbnRlbnR9LCBiYWNrZHJvcERpc21pc3M6IHRoaXMuZW5hYmxlQmFja2Ryb3BEaXNtaXNzLCBzaG93QmFja2Ryb3A6IHRoaXMuc2hvd0JhY2tkcm9wLCBjc3NDbGFzczogdGhpcy5jc3NDbGFzcywgZXZlbnQ6IGV2ZW50fSkpO1xuXG4gICAgICAgIHRoaXMud2lsbEVudGVyLm5leHQoKTtcblxuICAgICAgICBhd2FpdCB0aGlzLnBvcG92ZXIucHJlc2VudCgpO1xuXG4gICAgICAgIHRoaXMuZGlkRW50ZXIubmV4dCgpO1xuXG4gICAgICAgIHRoaXMuX3ByZXNlbnRlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKGF3YWl0IHRoaXMucG9wb3Zlci5vbldpbGxEaXNtaXNzKCkpIHtcbiAgICAgICAgICAgIHRoaXMud2lsbERpc21pc3MubmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGlzbWlzc2luZyA9IHRydWU7XG4gICAgICAgIGlmIChhd2FpdCB0aGlzLnBvcG92ZXIub25EaWREaXNtaXNzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlkRGlzbWlzcy5uZXh0KCk7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLl9wcmVzZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc21pc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2Rpc21pc3Npbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBnZXQgZGlzbWlzc2luZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc21pc3Npbmc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcHJlc2VudGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgZ2V0IHByZXNlbnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZXNlbnRlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzbWlzcyhkYXRhPzogYW55LCByb2xlPzogYW55KTogUHJvbWlzZTxhbnk+IHtcblxuICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyLmRpc21pc3MoZGF0YSwgcm9sZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbnRyb2xsZXJDb250ZW50Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvL3RoaXMudGVtcGxhdGUgPSBwYXJhbXMuZ2V0KFwidGVtcGxhdGVcIik7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==