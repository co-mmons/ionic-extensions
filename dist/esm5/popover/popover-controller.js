import * as tslib_1 from "tslib";
import { Component, TemplateRef, Input, ViewChild, EventEmitter, Output, ViewEncapsulation } from "@angular/core";
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
            template: "\n        <ng-template #popoverContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController])
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
        Input(),
        tslib_1.__metadata("design:type", TemplateRef)
    ], PopoverControllerContentComponent.prototype, "template", void 0);
    PopoverControllerContentComponent = tslib_1.__decorate([
        Component({
            encapsulation: ViewEncapsulation.None,
            template: "\n        <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n    "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PopoverControllerContentComponent);
    return PopoverControllerContentComponent;
}());
export { PopoverControllerContentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJwb3BvdmVyL3BvcG92ZXItY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBV2pEO0lBRUksb0NBQW9CLFVBQTZCO1FBQTdCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBZ0JqQyxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbEQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2pELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUduRCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBa0M1RCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU03QixlQUFVLEdBQVksS0FBSyxDQUFDO0lBaEVwQyxDQUFDO0lBNEJZLDRDQUFPLEdBQXBCLFVBQXFCLEtBQWE7Ozs7Ozt3QkFFOUIsMERBQTBEO3dCQUMxRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBQ2Qsc0JBQU87eUJBQ1Y7d0JBRUQsS0FBQSxJQUFJLENBQUE7d0JBQVkscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBQyxTQUFTLEVBQUUsaUNBQWlDLEVBQUUsY0FBYyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxF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Q0FZN0M7SUFBRCx3Q0FBQztDQUFBLEFBWkQsSUFZQztTQVpZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBUZW1wbGF0ZVJlZiwgSW5wdXQsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtcG9wb3Zlci1jb250cm9sbGVyXCIsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGUgI3BvcG92ZXJDb250ZW50PlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbnRyb2xsZXJDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBjc3NDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGVuYWJsZUJhY2tkcm9wRGlzbWlzczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBzaG93QmFja2Ryb3A6IGJvb2xlYW47XG5cbiAgICBAVmlld0NoaWxkKFwicG9wb3ZlckNvbnRlbnRcIiwge3N0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHdpbGxFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlkRW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGRpZERpc21pc3M6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHdpbGxEaXNtaXNzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgcG9wb3ZlcjogSFRNTElvblBvcG92ZXJFbGVtZW50O1xuXG4gICAgcHVibGljIGFzeW5jIHByZXNlbnQoZXZlbnQ/OiBFdmVudCkge1xuXG4gICAgICAgIC8vIGFscmVhZHkgb3BlbmVkIC0gc2hvdWxkIHdlIGNsb3NlIGV4aXN0aW5nIGFuZCBvcGVuIG5ldz9cbiAgICAgICAgaWYgKHRoaXMucG9wb3Zlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBvcG92ZXIgPSAoYXdhaXQgdGhpcy5jb250cm9sbGVyLmNyZWF0ZSh7Y29tcG9uZW50OiBQb3BvdmVyQ29udHJvbGxlckNvbnRlbnRDb21wb25lbnQsIGNvbXBvbmVudFByb3BzOiB7dGVtcGxhdGU6IHRoaXMuY29udGVudH0sIGJhY2tkcm9wRGlzbWlzczogdGhpcy5lbmFibGVCYWNrZHJvcERpc21pc3MsIHNob3dCYWNrZHJvcDogdGhpcy5zaG93QmFja2Ryb3AsIGNzc0NsYXNzOiB0aGlzLmNzc0NsYXNzLCBldmVudDogZXZlbnR9KSk7XG5cbiAgICAgICAgdGhpcy53aWxsRW50ZXIubmV4dCgpO1xuXG4gICAgICAgIGF3YWl0IHRoaXMucG9wb3Zlci5wcmVzZW50KCk7XG5cbiAgICAgICAgdGhpcy5kaWRFbnRlci5uZXh0KCk7XG5cbiAgICAgICAgdGhpcy5fcHJlc2VudGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoYXdhaXQgdGhpcy5wb3BvdmVyLm9uV2lsbERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy53aWxsRGlzbWlzcy5uZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXNtaXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKGF3YWl0IHRoaXMucG9wb3Zlci5vbkRpZERpc21pc3MoKSkge1xuICAgICAgICAgICAgdGhpcy5kaWREaXNtaXNzLm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuX3ByZXNlbnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZGlzbWlzc2luZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGlzbWlzc2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGdldCBkaXNtaXNzaW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzbWlzc2luZztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcmVzZW50ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBnZXQgcHJlc2VudGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJlc2VudGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNtaXNzKGRhdGE/OiBhbnksIHJvbGU/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuXG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXIuZGlzbWlzcyhkYXRhLCByb2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udHJvbGxlckNvbnRlbnRDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vdGhpcy50ZW1wbGF0ZSA9IHBhcmFtcy5nZXQoXCJ0ZW1wbGF0ZVwiKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIl19