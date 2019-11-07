import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
import { PopoverController } from "@ionic/angular";
var PopoverControllerComponent = /** @class */ (function () {
    function PopoverControllerComponent(controller) {
        this.controller = controller;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.didDismiss = new EventEmitter();
        this.willDismiss = new EventEmitter();
        this._dismissing = false;
        this._presented = false;
    }
    PopoverControllerComponent.prototype.present = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // already opened - should we close existing and open new?
                        if (this.popover) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.controller.create({ component: PopoverControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.enableBackdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass, event: event })];
                    case 1:
                        _a.popover = (_b.sent());
                        this.willEnter.next();
                        return [4 /*yield*/, this.popover.present()];
                    case 2:
                        _b.sent();
                        this.didEnter.next();
                        this._presented = true;
                        return [4 /*yield*/, this.popover.onWillDismiss()];
                    case 3:
                        if (_b.sent()) {
                            this.willDismiss.next();
                        }
                        this._dismissing = true;
                        return [4 /*yield*/, this.popover.onDidDismiss()];
                    case 4:
                        if (_b.sent()) {
                            this.didDismiss.next();
                            this.popover = undefined;
                            this._presented = false;
                            this._dismissing = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(PopoverControllerComponent.prototype, "dismissing", {
        get: function () {
            return this._dismissing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopoverControllerComponent.prototype, "presented", {
        get: function () {
            return this._presented;
        },
        enumerable: true,
        configurable: true
    });
    PopoverControllerComponent.prototype.dismiss = function (data, role) {
        if (this.popover) {
            return this.popover.dismiss(data, role);
        }
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    PopoverControllerComponent.ctorParameters = function () { return [
        { type: PopoverController }
    ]; };
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
            template: "\n        <ng-template #popoverContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        })
    ], PopoverControllerComponent);
    return PopoverControllerComponent;
}());
export { PopoverControllerComponent };
var PopoverControllerContentComponent = /** @class */ (function () {
    function PopoverControllerContentComponent() {
        //this.template = params.get("template");
    }
    PopoverControllerContentComponent.prototype.ngOnDestroy = function () {
        this.template = undefined;
    };
    tslib_1.__decorate([
        Input()
    ], PopoverControllerContentComponent.prototype, "template", void 0);
    PopoverControllerContentComponent = tslib_1.__decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            template: "\n        <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n    "
        })
    ], PopoverControllerContentComponent);
    return PopoverControllerContentComponent;
}());
export { PopoverControllerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvcG9wb3Zlci8iLCJzb3VyY2VzIjpbInBvcG92ZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBZSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEgsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFXakQ7SUFFSSxvQ0FBb0IsVUFBNkI7UUFBN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFnQmpDLGNBQVMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdsRCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHakQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR25ELGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFrQzVELGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBTTdCLGVBQVUsR0FBWSxLQUFLLENBQUM7SUFoRXBDLENBQUM7SUE0QlksNENBQU8sR0FBcEIsVUFBcUIsS0FBYTs7Ozs7O3dCQUU5QiwwREFBMEQ7d0JBQzFELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTs0QkFDZCxzQkFBTzt5QkFDVjt3QkFFRCxLQUFBLElBQUksQ0FBQTt3QkFBWSxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFNBQVMsRUFBRSxpQ0FBaUMsRUFBRSxjQUFjLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxF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IFRlbXBsYXRlUmVmLCBJbnB1dCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1wb3BvdmVyLWNvbnRyb2xsZXJcIixcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjcG9wb3ZlckNvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udHJvbGxlckNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGNzc0NsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgZW5hYmxlQmFja2Ryb3BEaXNtaXNzOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIHNob3dCYWNrZHJvcDogYm9vbGVhbjtcblxuICAgIEBWaWV3Q2hpbGQoXCJwb3BvdmVyQ29udGVudFwiLCB7c3RhdGljOiB0cnVlfSlcbiAgICBwcml2YXRlIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2lsbEVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBkaWRFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlkRGlzbWlzczogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgd2lsbERpc21pc3M6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBwb3BvdmVyOiBIVE1MSW9uUG9wb3ZlckVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgYXN5bmMgcHJlc2VudChldmVudD86IEV2ZW50KSB7XG5cbiAgICAgICAgLy8gYWxyZWFkeSBvcGVuZWQgLSBzaG91bGQgd2UgY2xvc2UgZXhpc3RpbmcgYW5kIG9wZW4gbmV3P1xuICAgICAgICBpZiAodGhpcy5wb3BvdmVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMucG9wb3ZlciA9IChhd2FpdCB0aGlzLmNvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IFBvcG92ZXJDb250cm9sbGVyQ29udGVudENvbXBvbmVudCwgY29tcG9uZW50UHJvcHM6IHt0ZW1wbGF0ZTogdGhpcy5jb250ZW50fSwgYmFja2Ryb3BEaXNtaXNzOiB0aGlzLmVuYWJsZUJhY2tkcm9wRGlzbWlzcywgc2hvd0JhY2tkcm9wOiB0aGlzLnNob3dCYWNrZHJvcCwgY3NzQ2xhc3M6IHRoaXMuY3NzQ2xhc3MsIGV2ZW50OiBldmVudH0pKTtcblxuICAgICAgICB0aGlzLndpbGxFbnRlci5uZXh0KCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5wb3BvdmVyLnByZXNlbnQoKTtcblxuICAgICAgICB0aGlzLmRpZEVudGVyLm5leHQoKTtcblxuICAgICAgICB0aGlzLl9wcmVzZW50ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChhd2FpdCB0aGlzLnBvcG92ZXIub25XaWxsRGlzbWlzcygpKSB7XG4gICAgICAgICAgICB0aGlzLndpbGxEaXNtaXNzLm5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Rpc21pc3NpbmcgPSB0cnVlO1xuICAgICAgICBpZiAoYXdhaXQgdGhpcy5wb3BvdmVyLm9uRGlkRGlzbWlzcygpKSB7XG4gICAgICAgICAgICB0aGlzLmRpZERpc21pc3MubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5wb3BvdmVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5fcHJlc2VudGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9kaXNtaXNzaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kaXNtaXNzaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgZ2V0IGRpc21pc3NpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNtaXNzaW5nO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ByZXNlbnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGdldCBwcmVzZW50ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVzZW50ZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc21pc3MoZGF0YT86IGFueSwgcm9sZT86IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9wb3Zlci5kaXNtaXNzKGRhdGEsIHJvbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDb250cm9sbGVyQ29udGVudENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy90aGlzLnRlbXBsYXRlID0gcGFyYW1zLmdldChcInRlbXBsYXRlXCIpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=