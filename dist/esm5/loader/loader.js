import * as tslib_1 from "tslib";
import { Component, ElementRef, Input } from "@angular/core";
var Loader = /** @class */ (function () {
    function Loader(elementRef) {
        this.elementRef = elementRef;
        this.progressType = "determinate";
        this.progressValue = 0;
        this.progressBuffer = 0;
    }
    Object.defineProperty(Loader.prototype, "progressPercentVisible", {
        get: function () {
            return typeof this.progressPercent === "number";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loader.prototype, "spinnerMode", {
        get: function () {
            return this.mode === "spinner";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loader.prototype, "progressMode", {
        get: function () {
            return this.mode === "progress";
        },
        enumerable: true,
        configurable: true
    });
    Loader.prototype.dismiss = function () {
        return this.popover.dismiss();
    };
    Loader.prototype.ngOnInit = function () {
        this.popover = this.elementRef.nativeElement.closest("ion-popover");
        if (this.instanceCallback) {
            this.instanceCallback(this);
        }
    };
    Loader.prototype.ngOnDestroy = function () {
        this.popover = undefined;
        this.instanceCallback = undefined;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], Loader.prototype, "instanceCallback", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "header", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "message", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "mode", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "progressMessage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Loader.prototype, "progressType", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], Loader.prototype, "progressValue", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], Loader.prototype, "progressBuffer", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], Loader.prototype, "progressPercent", void 0);
    Loader = tslib_1.__decorate([
        Component({
            selector: "ionx-loader",
            template: "<div style=\"display: flex; align-items: center\">\n\n    <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n        <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n        <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n    </div>\n\n</div>\n\n<ion-progress-bar style=\"margin: 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n\n<div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n    <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n    <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n</div>\n",
            styles: [":host { display: block }"]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], Loader);
    return Loader;
}());
export { Loader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJsb2FkZXIvbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBVTlFO0lBRUksZ0JBQW9CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBbUJ2RCxpQkFBWSxHQUFvQyxhQUFhLENBQUM7UUFHOUQsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFHMUIsbUJBQWMsR0FBVyxDQUFDLENBQUM7SUF4QjNCLENBQUM7SUE2QkQsc0JBQUksMENBQXNCO2FBQTFCO1lBQ0ksT0FBTyxPQUFPLElBQUksQ0FBQyxlQUFlLEtBQUssUUFBUSxDQUFDO1FBQ3BELENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0JBQVc7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxnQ0FBWTthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCx3QkFBTyxHQUFQO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFJRCx5QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFcEUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVELDRCQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO0lBQ3RDLENBQUM7SUF2REQ7UUFEQyxLQUFLLEVBQUU7O29EQUNtQztJQUczQztRQURDLEtBQUssRUFBRTs7MENBQ087SUFHZjtRQURDLEtBQUssRUFBRTs7MkNBQ1E7SUFHaEI7UUFEQyxLQUFLLEVBQUU7O3dDQUNxQjtJQUc3QjtRQURDLEtBQUssRUFBRTs7bURBQ2dCO0lBR3hCO1FBREMsS0FBSyxFQUFFOztnREFDc0Q7SUFHOUQ7UUFEQyxLQUFLLEVBQUU7O2lEQUNrQjtJQUcxQjtRQURDLEtBQUssRUFBRTs7a0RBQ21CO0lBRzNCO1FBREMsS0FBSyxFQUFFOzttREFDZ0I7SUE5QmYsTUFBTTtRQVBsQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2QixzK0JBQTBCO3FCQUV0QiwwQkFBMEI7U0FFakMsQ0FBQztpREFHa0MsVUFBVTtPQUZqQyxNQUFNLENBOERsQjtJQUFELGFBQUM7Q0FBQSxBQTlERCxJQThEQztTQTlEWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TG9hZGVyT3B0aW9uc30gZnJvbSBcIi4vbG9hZGVyLW9wdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1sb2FkZXJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJsb2FkZXIuaHRtbFwiLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgOmhvc3QgeyBkaXNwbGF5OiBibG9jayB9YFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTG9hZGVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIExvYWRlck9wdGlvbnMge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaW5zdGFuY2VDYWxsYmFjazogKGxvYWRlcjogTG9hZGVyKSA9PiB2b2lkO1xuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBtb2RlOiBcInNwaW5uZXJcIiB8IFwicHJvZ3Jlc3NcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NNZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzVHlwZTogXCJkZXRlcm1pbmF0ZVwiIHwgXCJpbmRldGVybWluYXRlXCIgPSBcImRldGVybWluYXRlXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzVmFsdWU6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzQnVmZmVyOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc1BlcmNlbnQ6IG51bWJlcjtcblxuICAgIGdldCBwcm9ncmVzc1BlcmNlbnRWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMucHJvZ3Jlc3NQZXJjZW50ID09PSBcIm51bWJlclwiO1xuICAgIH1cblxuICAgIGdldCBzcGlubmVyTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gXCJzcGlubmVyXCI7XG4gICAgfVxuXG4gICAgZ2V0IHByb2dyZXNzTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gXCJwcm9ncmVzc1wiO1xuICAgIH1cblxuICAgIGRpc21pc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9wb3ZlcjogSFRNTElvblBvcG92ZXJFbGVtZW50O1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tcG9wb3ZlclwiKTtcblxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlQ2FsbGJhY2sodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmluc3RhbmNlQ2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIl19