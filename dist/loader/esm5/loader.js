import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
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
    Loader.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        Input()
    ], Loader.prototype, "instanceCallback", void 0);
    tslib_1.__decorate([
        Input()
    ], Loader.prototype, "header", void 0);
    tslib_1.__decorate([
        Input()
    ], Loader.prototype, "message", void 0);
    tslib_1.__decorate([
        Input()
    ], Loader.prototype, "mode", void 0);
    tslib_1.__decorate([
        Input()
    ], Loader.prototype, "progressMessage", void 0);
    tslib_1.__decorate([
        Input()
    ], Loader.prototype, "progressType", void 0);
    tslib_1.__decorate([
        Input()
    ], Loader.prototype, "progressValue", void 0);
    tslib_1.__decorate([
        Input()
    ], Loader.prototype, "progressBuffer", void 0);
    tslib_1.__decorate([
        Input()
    ], Loader.prototype, "progressPercent", void 0);
    Loader = tslib_1.__decorate([
        Component({
            selector: "ionx-loader",
            template: "<div style=\"display: flex; align-items: center\">\n\n    <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n        <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n        <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n    </div>\n\n</div>\n\n<ion-progress-bar style=\"margin: 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n\n<div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n    <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n    <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n</div>\n",
            styles: [":host { display: block }"]
        })
    ], Loader);
    return Loader;
}());
export { Loader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbG9hZGVyLyIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVU5RTtJQUVJLGdCQUFvQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQW1CdkQsaUJBQVksR0FBb0MsYUFBYSxDQUFDO1FBRzlELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRzFCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0lBeEIzQixDQUFDO0lBNkJELHNCQUFJLDBDQUFzQjthQUExQjtZQUNJLE9BQU8sT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLFFBQVEsQ0FBQztRQUNwRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtCQUFXO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0NBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsd0JBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBSUQseUJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXBFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztJQUN0QyxDQUFDOztnQkEzRCtCLFVBQVU7O0lBSTFDO1FBREMsS0FBSyxFQUFFO29EQUNtQztJQUczQztRQURDLEtBQUssRUFBRTswQ0FDTztJQUdmO1FBREMsS0FBSyxFQUFFOzJDQUNRO0lBR2hCO1FBREMsS0FBSyxFQUFFO3dDQUNxQjtJQUc3QjtRQURDLEtBQUssRUFBRTttREFDZ0I7SUFHeEI7UUFEQyxLQUFLLEVBQUU7Z0RBQ3NEO0lBRzlEO1FBREMsS0FBSyxFQUFFO2lEQUNrQjtJQUcxQjtRQURDLEtBQUssRUFBRTtrREFDbUI7SUFHM0I7UUFEQyxLQUFLLEVBQUU7bURBQ2dCO0lBOUJmLE1BQU07UUFQbEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIscytCQUEwQjtxQkFFdEIsMEJBQTBCO1NBRWpDLENBQUM7T0FDVyxNQUFNLENBOERsQjtJQUFELGFBQUM7Q0FBQSxBQTlERCxJQThEQztTQTlEWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TG9hZGVyT3B0aW9uc30gZnJvbSBcIi4vbG9hZGVyLW9wdGlvbnNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1sb2FkZXJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJsb2FkZXIuaHRtbFwiLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgOmhvc3QgeyBkaXNwbGF5OiBibG9jayB9YFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTG9hZGVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIExvYWRlck9wdGlvbnMge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaW5zdGFuY2VDYWxsYmFjazogKGxvYWRlcjogTG9hZGVyKSA9PiB2b2lkO1xuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBtb2RlOiBcInNwaW5uZXJcIiB8IFwicHJvZ3Jlc3NcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NNZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzVHlwZTogXCJkZXRlcm1pbmF0ZVwiIHwgXCJpbmRldGVybWluYXRlXCIgPSBcImRldGVybWluYXRlXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzVmFsdWU6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzQnVmZmVyOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc1BlcmNlbnQ6IG51bWJlcjtcblxuICAgIGdldCBwcm9ncmVzc1BlcmNlbnRWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMucHJvZ3Jlc3NQZXJjZW50ID09PSBcIm51bWJlclwiO1xuICAgIH1cblxuICAgIGdldCBzcGlubmVyTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gXCJzcGlubmVyXCI7XG4gICAgfVxuXG4gICAgZ2V0IHByb2dyZXNzTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gXCJwcm9ncmVzc1wiO1xuICAgIH1cblxuICAgIGRpc21pc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9wb3ZlcjogSFRNTElvblBvcG92ZXJFbGVtZW50O1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tcG9wb3ZlclwiKTtcblxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlQ2FsbGJhY2sodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmluc3RhbmNlQ2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIl19