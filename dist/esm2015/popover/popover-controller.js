import * as tslib_1 from "tslib";
import { Component, TemplateRef, Input, ViewChild, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
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
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], PopoverControllerComponent.prototype, "cssClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], PopoverControllerComponent.prototype, "enableBackdropDismiss", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], PopoverControllerComponent.prototype, "showBackdrop", void 0);
tslib_1.__decorate([
    ViewChild("popoverContent", { static: true }),
    tslib_1.__metadata("design:type", TemplateRef)
], PopoverControllerComponent.prototype, "content", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], PopoverControllerComponent.prototype, "willEnter", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], PopoverControllerComponent.prototype, "didEnter", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], PopoverControllerComponent.prototype, "didDismiss", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
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
    }),
    tslib_1.__metadata("design:paramtypes", [PopoverController])
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
    Input(),
    tslib_1.__metadata("design:type", TemplateRef)
], PopoverControllerContentComponent.prototype, "template", void 0);
PopoverControllerContentComponent = tslib_1.__decorate([
    Component({
        encapsulation: ViewEncapsulation.None,
        template: `
        <ng-template [ngTemplateOutlet]="template"></ng-template>
    `
    }),
    tslib_1.__metadata("design:paramtypes", [])
], PopoverControllerContentComponent);
export { PopoverControllerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJwb3BvdmVyL3BvcG92ZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBV2pELElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBRW5DLFlBQW9CLFVBQTZCO1FBQTdCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBZ0JqQyxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUduRCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBa0M1RCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU03QixlQUFVLEdBQVksS0FBSyxDQUFDO0lBaEVwQyxDQUFDO0lBNEJZLE9BQU8sQ0FBQyxLQUFhOztZQUU5QiwwREFBMEQ7WUFDMUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLGlDQUFpQyxFQUFFLGNBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdQLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFdEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRTdCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdkIsSUFBSSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDM0I7WUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzthQUM1QjtRQUNMLENBQUM7S0FBQTtJQUlELElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUlELElBQVcsU0FBUztRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBVTtRQUVqQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQztRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSixDQUFBO0FBOUVHO0lBREMsS0FBSyxFQUFFOzs0REFDaUI7QUFHekI7SUFEQyxLQUFLLEVBQUU7O3lFQUMrQjtBQUd2QztJQURDLEtBQUssRUFBRTs7Z0VBQ3NCO0FBRzlCO0lBREMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO3NDQUMzQixXQUFXOzJEQUFNO0FBR2xDO0lBREMsTUFBTSxFQUFFO3NDQUNrQixZQUFZOzZEQUEyQjtBQUdsRTtJQURDLE1BQU0sRUFBRTtzQ0FDaUIsWUFBWTs0REFBMkI7QUFHakU7SUFEQyxNQUFNLEVBQUU7c0NBQ21CLFlBQVk7OERBQTJCO0FBR25FO0lBREMsTUFBTSxFQUFFO3NDQUNvQixZQUFZOytEQUEyQjtBQTNCM0QsMEJBQTBCO0lBVHRDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx5QkFBeUI7UUFDbkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsUUFBUSxFQUFFOzs7O0tBSVQ7S0FDSixDQUFDOzZDQUdrQyxpQkFBaUI7R0FGeEMsMEJBQTBCLENBb0Z0QztTQXBGWSwwQkFBMEI7QUE0RnZDLElBQWEsaUNBQWlDLEdBQTlDLE1BQWEsaUNBQWlDO0lBRTFDO1FBQ0kseUNBQXlDO0lBQzdDLENBQUM7SUFLRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztDQUNKLENBQUE7QUFMRztJQURDLEtBQUssRUFBRTtzQ0FDRSxXQUFXO21FQUFNO0FBUGxCLGlDQUFpQztJQU43QyxTQUFTLENBQUM7UUFDUCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxRQUFRLEVBQUU7O0tBRVQ7S0FDSixDQUFDOztHQUNXLGlDQUFpQyxDQVk3QztTQVpZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBUZW1wbGF0ZVJlZiwgSW5wdXQsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtcG9wb3Zlci1jb250cm9sbGVyXCIsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGUgI3BvcG92ZXJDb250ZW50PlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbnRyb2xsZXJDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBjc3NDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGVuYWJsZUJhY2tkcm9wRGlzbWlzczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBzaG93QmFja2Ryb3A6IGJvb2xlYW47XG5cbiAgICBAVmlld0NoaWxkKFwicG9wb3ZlckNvbnRlbnRcIiwge3N0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHdpbGxFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlkRW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpZERpc21pc3M6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHdpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgcG9wb3ZlcjogSFRNTElvblBvcG92ZXJFbGVtZW50O1xuXG4gICAgcHVibGljIGFzeW5jIHByZXNlbnQoZXZlbnQ/OiBFdmVudCkge1xuXG4gICAgICAgIC8vIGFscmVhZHkgb3BlbmVkIC0gc2hvdWxkIHdlIGNsb3NlIGV4aXN0aW5nIGFuZCBvcGVuIG5ldz9cbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBvcG92ZXIgPSAoYXdhaXQgdGhpcy5jb250cm9sbGVyLmNyZWF0ZSh7Y29tcG9uZW50OiBQb3BvdmVyQ29udHJvbGxlckNvbnRlbnRDb21wb25lbnQsIGNvbXBvbmVudFByb3BzOiB7dGVtcGxhdGU6IHRoaXMuY29udGVudH0sIGJhY2tkcm9wRGlzbWlzczogdGhpcy5lbmFibGVCYWNrZHJvcERpc21pc3MsIHNob3dCYWNrZHJvcDogdGhpcy5zaG93QmFja2Ryb3AsIGNzc0NsYXNzOiB0aGlzLmNzc0NsYXNzLCBldmVudDogZXZlbnR9KSk7XG5cbiAgICAgICAgdGhpcy53aWxsRW50ZXIubmV4dCgpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMucG9wb3Zlci5wcmVzZW50KCk7XG5cbiAgICAgICAgdGhpcy5kaWRFbnRlci5uZXh0KCk7XG5cbiAgICAgICAgdGhpcy5fcHJlc2VudGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoYXdhaXQgdGhpcy5wb3BvdmVyLm9uV2lsbERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy53aWxsRGlzbWlzcy5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXNtaXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMucG9wb3Zlci5vbkRpZERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy5kaWREaXNtaXNzLm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuX3ByZXNlbnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZGlzbWlzc2luZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzbWlzc2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGdldCBkaXNtaXNzaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzbWlzc2luZztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcmVzZW50ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBnZXQgcHJlc2VudGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJlc2VudGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNtaXNzKGRhdGE/OiBhbnksIHJvbGU/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXIuZGlzbWlzcyhkYXRhLCByb2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udHJvbGxlckNvbnRlbnRDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vdGhpcy50ZW1wbGF0ZSA9IHBhcmFtcy5nZXQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIl19