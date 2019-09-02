import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core";
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
            template: "\n        <ng-template #modalContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController])
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
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ModalControllerContentComponent);
    return ModalControllerContentComponent;
}());
export { ModalControllerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsibW9kYWwvbW9kYWwtY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQVUvQztJQUVJLGtDQUFvQixVQUEyQjtRQUEzQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQWdCL0IsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2xELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdqRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbkQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWdDNUQsZUFBVSxHQUFZLEtBQUssQ0FBQztJQXhEcEMsQ0FBQztJQTRCWSwwQ0FBTyxHQUFwQjs7Ozs7O3dCQUVJLDBEQUEwRDt3QkFDMUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNaLHNCQUFPO3lCQUNWO3dCQUVELEtBQUEsSUFBSSxDQUFBO3dCQUFVLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUMsU0FBUyxFQUFFLCtCQUErQixFQUFFLGNBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxFQUFBOzt3QkFBbk8sR0FBSyxLQUFLLEdBQUcsQ0FBQyxTQUFxTixDQUFDLENBQUM7d0JBRXJPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBRXRCLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUE7O3dCQUExQixTQUEwQixDQUFDO3dCQUUzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUVyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzt3QkFFbkIscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQXBDLElBQUksU0FBZ0MsRUFBRTs0QkFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDM0I7d0JBRUcscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBQTs7d0JBQW5DLElBQUksU0FBK0IsRUFBRTs0QkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7NEJBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO3lCQUMzQjs7Ozs7S0FDSjtJQUlELHNCQUFXLCtDQUFTO2FBQXBCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRU0sMENBQU8sR0FBZCxVQUFlLElBQVUsRUFBRSxJQUFVO1FBRWpDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBcEVEO1FBREMsS0FBSyxFQUFFOzs4REFDaUI7SUFHekI7UUFEQyxLQUFLLEVBQUU7O3FFQUN5QjtJQUdqQztRQURDLEtBQUssRUFBRTs7a0VBQ3NCO0lBRzlCO1FBREMsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzswQ0FDekIsV0FBVzs2REFBTTtJQUdsQztRQURDLE1BQU0sRUFBRTswQ0FDa0IsWUFBWTsrREFBMkI7SUFHbEU7UUFEQyxNQUFNLEVBQUU7MENBQ2lCLFlBQVk7OERBQTJCO0lBR2pFO1FBREMsTUFBTSxFQUFFOzBDQUNtQixZQUFZO2dFQUEyQjtJQUduRTtRQURDLE1BQU0sRUFBRTswQ0FDb0IsWUFBWTtpRUFBMkI7SUEzQjNELHdCQUF3QjtRQVJwQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFFBQVEsRUFBRSw0R0FJVDtTQUNKLENBQUM7aURBR2tDLGVBQWU7T0FGdEMsd0JBQXdCLENBNEVwQztJQUFELCtCQUFDO0NBQUEsQUE1RUQsSUE0RUM7U0E1RVksd0JBQXdCO0FBbUZyQztJQUVJO1FBQ0kseUNBQXlDO0lBQzdDLENBQUM7SUFJRCxxREFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztJQVZRLCtCQUErQjtRQUwzQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsOEVBRVQ7U0FDSixDQUFDOztPQUNXLCtCQUErQixDQVczQztJQUFELHNDQUFDO0NBQUEsQUFYRCxJQVdDO1NBWFksK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1tb2RhbC1jb250cm9sbGVyXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlICNtb2RhbENvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRyb2xsZXJDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgY3NzQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBiYWNrZHJvcERpc21pc3M6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgc2hvd0JhY2tkcm9wOiBib29sZWFuO1xuXG4gICAgQFZpZXdDaGlsZChcIm1vZGFsQ29udGVudFwiLCB7c3RhdGljOiB0cnVlfSlcbiAgICBwcml2YXRlIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2lsbEVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaWRFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlkRGlzbWlzczogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2lsbERpc21pc3M6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBtb2RhbDogSFRNTElvbk1vZGFsRWxlbWVudDtcblxuICAgIHB1YmxpYyBhc3luYyBwcmVzZW50KCkge1xuXG4gICAgICAgIC8vIGFscmVhZHkgb3BlbmVkIC0gc2hvdWxkIHdlIGNsb3NlIGV4aXN0aW5nIGFuZCBvcGVuIG5ldz9cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tb2RhbCA9IChhd2FpdCB0aGlzLmNvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IE1vZGFsQ29udHJvbGxlckNvbnRlbnRDb21wb25lbnQsIGNvbXBvbmVudFByb3BzOiB7dGVtcGxhdGU6IHRoaXMuY29udGVudH0sIGJhY2tkcm9wRGlzbWlzczogdGhpcy5iYWNrZHJvcERpc21pc3MsIHNob3dCYWNrZHJvcDogdGhpcy5zaG93QmFja2Ryb3AsIGNzc0NsYXNzOiB0aGlzLmNzc0NsYXNzfSkpO1xuXG4gICAgICAgIHRoaXMud2lsbEVudGVyLm5leHQoKTtcblxuICAgICAgICBhd2FpdCB0aGlzLm1vZGFsLnByZXNlbnQoKTtcblxuICAgICAgICB0aGlzLmRpZEVudGVyLm5leHQoKTtcblxuICAgICAgICB0aGlzLl9wcmVzZW50ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChhd2FpdCB0aGlzLm1vZGFsLm9uV2lsbERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy53aWxsRGlzbWlzcy5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXdhaXQgdGhpcy5tb2RhbC5vbkRpZERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy5kaWREaXNtaXNzLm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLl9wcmVzZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3ByZXNlbnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGdldCBwcmVzZW50ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVzZW50ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc21pc3MoZGF0YT86IGFueSwgcm9sZT86IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsLmRpc21pc3MoZGF0YSwgcm9sZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRyb2xsZXJDb250ZW50Q29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvL3RoaXMudGVtcGxhdGUgPSBwYXJhbXMuZ2V0KFwidGVtcGxhdGVcIik7XG4gICAgfVxuXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=