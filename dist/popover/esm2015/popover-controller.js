import { __awaiter } from "tslib";
import { Component, Input, ViewChild, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import { PopoverController } from "@ionic/angular";
export class PopoverControllerComponent {
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
export class PopoverControllerContentComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BvcG92ZXIvcG9wb3Zlci1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFlLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQVdqRCxNQUFNLE9BQU8sMEJBQTBCO0lBRW5DLFlBQW9CLFVBQTZCO1FBQTdCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBZ0JqQyxjQUFTLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbkQsYUFBUSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2xELGVBQVUsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdwRCxnQkFBVyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBa0M3RCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU03QixlQUFVLEdBQVksS0FBSyxDQUFDO0lBaEVwQyxDQUFDO0lBNEJZLE9BQU8sQ0FBQyxLQUFhOztZQUU5QiwwREFBMEQ7WUFDMUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLGlDQUFpQyxFQUFFLGNBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdQLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFdEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRTdCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdkIsSUFBSSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDM0I7WUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzthQUM1QjtRQUNMLENBQUM7S0FBQTtJQUlELElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUlELElBQVcsU0FBUztRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUFVLEVBQUUsSUFBVTtRQUVqQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQztRQUVELE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQTNGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7OztLQUlUO2FBQ0o7OztZQVZPLGlCQUFpQjs7O3VCQWdCcEIsS0FBSztvQ0FHTCxLQUFLOzJCQUdMLEtBQUs7c0JBR0wsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt3QkFHMUMsTUFBTTt1QkFHTixNQUFNO3lCQUdOLE1BQU07MEJBR04sTUFBTTs7QUFrRVgsTUFBTSxPQUFPLGlDQUFpQztJQUUxQztRQUNJLHlDQUF5QztJQUM3QyxDQUFDO0lBS0QsV0FBVztRQUNQLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7OztZQWpCSixTQUFTLFNBQUM7Z0JBQ1AsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7S0FFVDthQUNKOzs7O3VCQU9JLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgVGVtcGxhdGVSZWYsIElucHV0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXBvcG92ZXItY29udHJvbGxlclwiLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlICNwb3BvdmVyQ29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb250cm9sbGVyQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgY3NzQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlbmFibGVCYWNrZHJvcERpc21pc3M6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgc2hvd0JhY2tkcm9wOiBib29sZWFuO1xuXG4gICAgQFZpZXdDaGlsZChcInBvcG92ZXJDb250ZW50XCIsIHtzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB3aWxsRW50ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaWRFbnRlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpZERpc21pc3M6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSB3aWxsRGlzbWlzczogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBwb3BvdmVyOiBIVE1MSW9uUG9wb3ZlckVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgYXN5bmMgcHJlc2VudChldmVudD86IEV2ZW50KSB7XG5cbiAgICAgICAgLy8gYWxyZWFkeSBvcGVuZWQgLSBzaG91bGQgd2UgY2xvc2UgZXhpc3RpbmcgYW5kIG9wZW4gbmV3P1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMucG9wb3ZlciA9IChhd2FpdCB0aGlzLmNvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IFBvcG92ZXJDb250cm9sbGVyQ29udGVudENvbXBvbmVudCwgY29tcG9uZW50UHJvcHM6IHt0ZW1wbGF0ZTogdGhpcy5jb250ZW50fSwgYmFja2Ryb3BEaXNtaXNzOiB0aGlzLmVuYWJsZUJhY2tkcm9wRGlzbWlzcywgc2hvd0JhY2tkcm9wOiB0aGlzLnNob3dCYWNrZHJvcCwgY3NzQ2xhc3M6IHRoaXMuY3NzQ2xhc3MsIGV2ZW50OiBldmVudH0pKTtcblxuICAgICAgICB0aGlzLndpbGxFbnRlci5uZXh0KCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5wb3BvdmVyLnByZXNlbnQoKTtcblxuICAgICAgICB0aGlzLmRpZEVudGVyLm5leHQoKTtcblxuICAgICAgICB0aGlzLl9wcmVzZW50ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChhd2FpdCB0aGlzLnBvcG92ZXIub25XaWxsRGlzbWlzcygpKSB7XG4gICAgICAgICAgICB0aGlzLndpbGxEaXNtaXNzLm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Rpc21pc3NpbmcgPSB0cnVlO1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5wb3BvdmVyLm9uRGlkRGlzbWlzcygpKSB7XG4gICAgICAgICAgICB0aGlzLmRpZERpc21pc3MubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc2VudGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9kaXNtaXNzaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNtaXNzaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgZ2V0IGRpc21pc3NpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNtaXNzaW5nO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ByZXNlbnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGdldCBwcmVzZW50ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVzZW50ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc21pc3MoZGF0YT86IGFueSwgcm9sZT86IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9wb3Zlci5kaXNtaXNzKGRhdGEsIHJvbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb250cm9sbGVyQ29udGVudENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy90aGlzLnRlbXBsYXRlID0gcGFyYW1zLmdldChcInRlbXBsYXRlXCIpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=