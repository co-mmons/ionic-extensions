import { __decorate } from "tslib";
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from "@angular/core";
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
    __decorate([
        Input(),
        HostBinding("class.ionx--filled")
    ], Loader.prototype, "fill", void 0);
    __decorate([
        Input()
    ], Loader.prototype, "instanceCallback", void 0);
    __decorate([
        Input()
    ], Loader.prototype, "header", void 0);
    __decorate([
        Input()
    ], Loader.prototype, "message", void 0);
    __decorate([
        Input()
    ], Loader.prototype, "mode", void 0);
    __decorate([
        Input()
    ], Loader.prototype, "progressMessage", void 0);
    __decorate([
        Input()
    ], Loader.prototype, "progressType", void 0);
    __decorate([
        Input()
    ], Loader.prototype, "progressValue", void 0);
    __decorate([
        Input()
    ], Loader.prototype, "progressBuffer", void 0);
    __decorate([
        Input()
    ], Loader.prototype, "progressPercent", void 0);
    Loader = __decorate([
        Component({
            selector: "ionx-loader",
            template: "<div>\n\n    <div style=\"display: flex; align-items: center\">\n\n        <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n            <ion-spinner></ion-spinner>\n        </div>\n\n        <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n            <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n            <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n        </div>\n\n    </div>\n\n    <ion-progress-bar style=\"margin: 8px 0px 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n\n    <div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n        <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n        <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n    </div>\n\n</div>\n",
            styles: [":host{display:-webkit-box;display:flex}:host.ionx--filled{width:100%;height:100%;-webkit-box-align:center;align-items:center;align-content:center;justify-items:center;-webkit-box-pack:center;justify-content:center}"]
        })
    ], Loader);
    return Loader;
}());
export { Loader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbG9hZGVyLyIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRM0Y7SUFFSSxnQkFBb0IsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUF1QnZELGlCQUFZLEdBQW9DLGFBQWEsQ0FBQztRQUc5RCxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUcxQixtQkFBYyxHQUFXLENBQUMsQ0FBQztJQTVCM0IsQ0FBQztJQWlDRCxzQkFBSSwwQ0FBc0I7YUFBMUI7WUFDSSxPQUFPLE9BQU8sSUFBSSxDQUFDLGVBQWUsS0FBSyxRQUFRLENBQUM7UUFDcEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwrQkFBVzthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGdDQUFZO2FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUVELHdCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUlELHlCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVwRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsNEJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7SUFDdEMsQ0FBQzs7Z0JBL0QrQixVQUFVOztJQUsxQztRQUZDLEtBQUssRUFBRTtRQUNQLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzt3Q0FDcEI7SUFHZDtRQURDLEtBQUssRUFBRTtvREFDbUM7SUFHM0M7UUFEQyxLQUFLLEVBQUU7MENBQ087SUFHZjtRQURDLEtBQUssRUFBRTsyQ0FDUTtJQUdoQjtRQURDLEtBQUssRUFBRTt3Q0FDcUI7SUFHN0I7UUFEQyxLQUFLLEVBQUU7bURBQ2dCO0lBR3hCO1FBREMsS0FBSyxFQUFFO2dEQUNzRDtJQUc5RDtRQURDLEtBQUssRUFBRTtpREFDa0I7SUFHMUI7UUFEQyxLQUFLLEVBQUU7a0RBQ21CO0lBRzNCO1FBREMsS0FBSyxFQUFFO21EQUNnQjtJQWxDZixNQUFNO1FBTGxCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLHlqQ0FBMEI7O1NBRTdCLENBQUM7T0FDVyxNQUFNLENBa0VsQjtJQUFELGFBQUM7Q0FBQSxBQWxFRCxJQWtFQztTQWxFWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0xvYWRlck9wdGlvbnN9IGZyb20gXCIuL2xvYWRlci1vcHRpb25zXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtbG9hZGVyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwibG9hZGVyLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImxvYWRlci5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIExvYWRlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBMb2FkZXJPcHRpb25zIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmlvbngtLWZpbGxlZFwiKVxuICAgIGZpbGw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGluc3RhbmNlQ2FsbGJhY2s6IChsb2FkZXI6IExvYWRlcikgPT4gdm9pZDtcblxuICAgIEBJbnB1dCgpXG4gICAgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIG1lc3NhZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbW9kZTogXCJzcGlubmVyXCIgfCBcInByb2dyZXNzXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc1R5cGU6IFwiZGV0ZXJtaW5hdGVcIiB8IFwiaW5kZXRlcm1pbmF0ZVwiID0gXCJkZXRlcm1pbmF0ZVwiO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc1ZhbHVlOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc0J1ZmZlcjogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NQZXJjZW50OiBudW1iZXI7XG5cbiAgICBnZXQgcHJvZ3Jlc3NQZXJjZW50VmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnByb2dyZXNzUGVyY2VudCA9PT0gXCJudW1iZXJcIjtcbiAgICB9XG5cbiAgICBnZXQgc3Bpbm5lck1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGUgPT09IFwic3Bpbm5lclwiO1xuICAgIH1cblxuICAgIGdldCBwcm9ncmVzc01vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGUgPT09IFwicHJvZ3Jlc3NcIjtcbiAgICB9XG5cbiAgICBkaXNtaXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcG92ZXI6IEhUTUxJb25Qb3BvdmVyRWxlbWVudDtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBvcG92ZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLXBvcG92ZXJcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZUNhbGxiYWNrKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5pbnN0YW5jZUNhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==