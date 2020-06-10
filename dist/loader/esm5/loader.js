import { __decorate } from "tslib";
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
    __decorate([
        Input("class.ionx--filled")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbG9hZGVyLyIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVE5RTtJQUVJLGdCQUFvQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQXNCdkQsaUJBQVksR0FBb0MsYUFBYSxDQUFDO1FBRzlELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRzFCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0lBM0IzQixDQUFDO0lBZ0NELHNCQUFJLDBDQUFzQjthQUExQjtZQUNJLE9BQU8sT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLFFBQVEsQ0FBQztRQUNwRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtCQUFXO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0NBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsd0JBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBSUQseUJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXBFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztJQUN0QyxDQUFDOztnQkE5RCtCLFVBQVU7O0lBSTFDO1FBREMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO3dDQUNkO0lBR2Q7UUFEQyxLQUFLLEVBQUU7b0RBQ21DO0lBRzNDO1FBREMsS0FBSyxFQUFFOzBDQUNPO0lBR2Y7UUFEQyxLQUFLLEVBQUU7MkNBQ1E7SUFHaEI7UUFEQyxLQUFLLEVBQUU7d0NBQ3FCO0lBRzdCO1FBREMsS0FBSyxFQUFFO21EQUNnQjtJQUd4QjtRQURDLEtBQUssRUFBRTtnREFDc0Q7SUFHOUQ7UUFEQyxLQUFLLEVBQUU7aURBQ2tCO0lBRzFCO1FBREMsS0FBSyxFQUFFO2tEQUNtQjtJQUczQjtRQURDLEtBQUssRUFBRTttREFDZ0I7SUFqQ2YsTUFBTTtRQUxsQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsYUFBYTtZQUN2Qix5akNBQTBCOztTQUU3QixDQUFDO09BQ1csTUFBTSxDQWlFbEI7SUFBRCxhQUFDO0NBQUEsQUFqRUQsSUFpRUM7U0FqRVksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0xvYWRlck9wdGlvbnN9IGZyb20gXCIuL2xvYWRlci1vcHRpb25zXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtbG9hZGVyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwibG9hZGVyLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImxvYWRlci5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIExvYWRlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBMb2FkZXJPcHRpb25zIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB9XG5cbiAgICBASW5wdXQoXCJjbGFzcy5pb254LS1maWxsZWRcIilcbiAgICBmaWxsOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBpbnN0YW5jZUNhbGxiYWNrOiAobG9hZGVyOiBMb2FkZXIpID0+IHZvaWQ7XG5cbiAgICBASW5wdXQoKVxuICAgIGhlYWRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIG1vZGU6IFwic3Bpbm5lclwiIHwgXCJwcm9ncmVzc1wiO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc01lc3NhZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NUeXBlOiBcImRldGVybWluYXRlXCIgfCBcImluZGV0ZXJtaW5hdGVcIiA9IFwiZGV0ZXJtaW5hdGVcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NWYWx1ZTogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NCdWZmZXI6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzUGVyY2VudDogbnVtYmVyO1xuXG4gICAgZ2V0IHByb2dyZXNzUGVyY2VudFZpc2libGUoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5wcm9ncmVzc1BlcmNlbnQgPT09IFwibnVtYmVyXCI7XG4gICAgfVxuXG4gICAgZ2V0IHNwaW5uZXJNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSBcInNwaW5uZXJcIjtcbiAgICB9XG5cbiAgICBnZXQgcHJvZ3Jlc3NNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSBcInByb2dyZXNzXCI7XG4gICAgfVxuXG4gICAgZGlzbWlzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3Zlci5kaXNtaXNzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3BvdmVyOiBIVE1MSW9uUG9wb3ZlckVsZW1lbnQ7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1wb3BvdmVyXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VDYWxsYmFjayh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnBvcG92ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VDYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=