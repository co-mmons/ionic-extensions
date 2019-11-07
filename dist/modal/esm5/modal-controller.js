import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
var ModalControllerComponent = /** @class */ (function () {
    function ModalControllerComponent(controller) {
        this.controller = controller;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.didDismiss = new EventEmitter();
        this.willDismiss = new EventEmitter();
        this._presented = false;
    }
    ModalControllerComponent.prototype.present = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // already opened - should we close existing and open new?
                        if (this.modal) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.controller.create({ component: ModalControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.backdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass })];
                    case 1:
                        _a.modal = (_b.sent());
                        this.willEnter.next();
                        return [4 /*yield*/, this.modal.present()];
                    case 2:
                        _b.sent();
                        this.didEnter.next();
                        this._presented = true;
                        return [4 /*yield*/, this.modal.onWillDismiss()];
                    case 3:
                        if (_b.sent()) {
                            this.willDismiss.next();
                        }
                        return [4 /*yield*/, this.modal.onDidDismiss()];
                    case 4:
                        if (_b.sent()) {
                            this.didDismiss.next();
                            this.modal = undefined;
                            this._presented = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ModalControllerComponent.prototype, "presented", {
        get: function () {
            return this._presented;
        },
        enumerable: true,
        configurable: true
    });
    ModalControllerComponent.prototype.dismiss = function (data, role) {
        if (this.modal) {
            return this.modal.dismiss(data, role);
        }
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    ModalControllerComponent.ctorParameters = function () { return [
        { type: ModalController }
    ]; };
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
            template: "\n        <ng-template #modalContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], ModalControllerComponent);
    return ModalControllerComponent;
}());
export { ModalControllerComponent };
var ModalControllerContentComponent = /** @class */ (function () {
    function ModalControllerContentComponent() {
        //this.template = params.get("template");
    }
    ModalControllerContentComponent.prototype.ngOnDestroy = function () {
        this.template = undefined;
    };
    ModalControllerContentComponent = tslib_1.__decorate([
        Component({
            template: "\n        <ng-container *ngTemplateOutlet=\"template\"></ng-container>\n    "
        })
    ], ModalControllerContentComponent);
    return ModalControllerContentComponent;
}());
export { ModalControllerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBZSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBVS9DO0lBRUksa0NBQW9CLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBZ0IvQixjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUduRCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBZ0M1RCxlQUFVLEdBQVksS0FBSyxDQUFDO0lBeERwQyxDQUFDO0lBNEJZLDBDQUFPLEdBQXBCOzs7Ozs7d0JBRUksMERBQTBEO3dCQUMxRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1osc0JBQU87eUJBQ1Y7d0JBRUQsS0FBQSxJQUFJLENBQUE7d0JBQVUscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBQyxTQUFTLEVBQUUsK0JBQStCLEVBQUUsY0FBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUE7O3dCQUFuTyxHQUFLLEtBQUssR0FBRyxDQUFDLFNBQXFOLENBQUMsQ0FBQzt3QkFFck8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFFdEIscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQTFCLFNBQTBCLENBQUM7d0JBRTNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBRXJCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO3dCQUVuQixxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBcEMsSUFBSSxTQUFnQyxFQUFFOzRCQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO3lCQUMzQjt3QkFFRyxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFBOzt3QkFBbkMsSUFBSSxTQUErQixFQUFFOzRCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQzs0QkFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7eUJBQzNCOzs7OztLQUNKO0lBSUQsc0JBQVcsK0NBQVM7YUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFTSwwQ0FBTyxHQUFkLFVBQWUsSUFBVSxFQUFFLElBQVU7UUFFakMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekM7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXhFK0IsZUFBZTs7SUFJL0M7UUFEQyxLQUFLLEVBQUU7OERBQ2lCO0lBR3pCO1FBREMsS0FBSyxFQUFFO3FFQUN5QjtJQUdqQztRQURDLEtBQUssRUFBRTtrRUFDc0I7SUFHOUI7UUFEQyxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDOzZEQUNSO0lBR2xDO1FBREMsTUFBTSxFQUFFOytEQUN5RDtJQUdsRTtRQURDLE1BQU0sRUFBRTs4REFDd0Q7SUFHakU7UUFEQyxNQUFNLEVBQUU7Z0VBQzBEO0lBR25FO1FBREMsTUFBTSxFQUFFO2lFQUMyRDtJQTNCM0Qsd0JBQXdCO1FBUnBDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsUUFBUSxFQUFFLDRHQUlUO1NBQ0osQ0FBQztPQUNXLHdCQUF3QixDQTRFcEM7SUFBRCwrQkFBQztDQUFBLEFBNUVELElBNEVDO1NBNUVZLHdCQUF3QjtBQW1GckM7SUFFSTtRQUNJLHlDQUF5QztJQUM3QyxDQUFDO0lBSUQscURBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7SUFWUSwrQkFBK0I7UUFMM0MsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLDhFQUVUO1NBQ0osQ0FBQztPQUNXLCtCQUErQixDQVczQztJQUFELHNDQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFksK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1tb2RhbC1jb250cm9sbGVyXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlICNtb2RhbENvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRyb2xsZXJDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgY3NzQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBiYWNrZHJvcERpc21pc3M6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgc2hvd0JhY2tkcm9wOiBib29sZWFuO1xuXG4gICAgQFZpZXdDaGlsZChcIm1vZGFsQ29udGVudFwiLCB7c3RhdGljOiB0cnVlfSlcbiAgICBwcml2YXRlIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2lsbEVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaWRFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlkRGlzbWlzczogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2lsbERpc21pc3M6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBtb2RhbDogSFRNTElvbk1vZGFsRWxlbWVudDtcblxuICAgIHB1YmxpYyBhc3luYyBwcmVzZW50KCkge1xuXG4gICAgICAgIC8vIGFscmVhZHkgb3BlbmVkIC0gc2hvdWxkIHdlIGNsb3NlIGV4aXN0aW5nIGFuZCBvcGVuIG5ldz9cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tb2RhbCA9IChhd2FpdCB0aGlzLmNvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IE1vZGFsQ29udHJvbGxlckNvbnRlbnRDb21wb25lbnQsIGNvbXBvbmVudFByb3BzOiB7dGVtcGxhdGU6IHRoaXMuY29udGVudH0sIGJhY2tkcm9wRGlzbWlzczogdGhpcy5iYWNrZHJvcERpc21pc3MsIHNob3dCYWNrZHJvcDogdGhpcy5zaG93QmFja2Ryb3AsIGNzc0NsYXNzOiB0aGlzLmNzc0NsYXNzfSkpO1xuXG4gICAgICAgIHRoaXMud2lsbEVudGVyLm5leHQoKTtcblxuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsLnByZXNlbnQoKTtcblxuICAgICAgICB0aGlzLmRpZEVudGVyLm5leHQoKTtcblxuICAgICAgICB0aGlzLl9wcmVzZW50ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChhd2FpdCB0aGlzLm1vZGFsLm9uV2lsbERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy53aWxsRGlzbWlzcy5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXdhaXQgdGhpcy5tb2RhbC5vbkRpZERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy5kaWREaXNtaXNzLm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLl9wcmVzZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3ByZXNlbnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGdldCBwcmVzZW50ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVzZW50ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc21pc3MoZGF0YT86IGFueSwgcm9sZT86IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsLmRpc21pc3MoZGF0YSwgcm9sZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRyb2xsZXJDb250ZW50Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvL3RoaXMudGVtcGxhdGUgPSBwYXJhbXMuZ2V0KFwidGVtcGxhdGVcIik7XG4gICAgfVxuXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=