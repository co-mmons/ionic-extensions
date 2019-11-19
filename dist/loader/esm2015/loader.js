import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
let Loader = class Loader {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.progressType = "determinate";
        this.progressValue = 0;
        this.progressBuffer = 0;
    }
    get progressPercentVisible() {
        return typeof this.progressPercent === "number";
    }
    get spinnerMode() {
        return this.mode === "spinner";
    }
    get progressMode() {
        return this.mode === "progress";
    }
    dismiss() {
        return this.popover.dismiss();
    }
    ngOnInit() {
        this.popover = this.elementRef.nativeElement.closest("ion-popover");
        if (this.instanceCallback) {
            this.instanceCallback(this);
        }
    }
    ngOnDestroy() {
        this.popover = undefined;
        this.instanceCallback = undefined;
    }
};
Loader.ctorParameters = () => [
    { type: ElementRef }
];
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
        template: "<div style=\"display: flex; align-items: center\">\n\n    <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n        <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n        <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n    </div>\n\n</div>\n\n<ion-progress-bar style=\"margin: 8px 0px 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n\n<div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n    <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n    <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n</div>\n",
        styles: [`:host { display: block }`]
    })
], Loader);
export { Loader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbG9hZGVyLyIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVU5RSxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBRWYsWUFBb0IsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFtQnZELGlCQUFZLEdBQW9DLGFBQWEsQ0FBQztRQUc5RCxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUcxQixtQkFBYyxHQUFXLENBQUMsQ0FBQztJQXhCM0IsQ0FBQztJQTZCRCxJQUFJLHNCQUFzQjtRQUN0QixPQUFPLE9BQU8sSUFBSSxDQUFDLGVBQWUsS0FBSyxRQUFRLENBQUM7SUFDcEQsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUlELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVwRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7SUFDdEMsQ0FBQztDQUNKLENBQUE7O1lBNURtQyxVQUFVOztBQUkxQztJQURDLEtBQUssRUFBRTtnREFDbUM7QUFHM0M7SUFEQyxLQUFLLEVBQUU7c0NBQ087QUFHZjtJQURDLEtBQUssRUFBRTt1Q0FDUTtBQUdoQjtJQURDLEtBQUssRUFBRTtvQ0FDcUI7QUFHN0I7SUFEQyxLQUFLLEVBQUU7K0NBQ2dCO0FBR3hCO0lBREMsS0FBSyxFQUFFOzRDQUNzRDtBQUc5RDtJQURDLEtBQUssRUFBRTs2Q0FDa0I7QUFHMUI7SUFEQyxLQUFLLEVBQUU7OENBQ21CO0FBRzNCO0lBREMsS0FBSyxFQUFFOytDQUNnQjtBQTlCZixNQUFNO0lBUGxCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLDgrQkFBMEI7aUJBRXRCLDBCQUEwQjtLQUVqQyxDQUFDO0dBQ1csTUFBTSxDQThEbEI7U0E5RFksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0xvYWRlck9wdGlvbnN9IGZyb20gXCIuL2xvYWRlci1vcHRpb25zXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtbG9hZGVyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwibG9hZGVyLmh0bWxcIixcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYDpob3N0IHsgZGlzcGxheTogYmxvY2sgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExvYWRlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBMb2FkZXJPcHRpb25zIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGluc3RhbmNlQ2FsbGJhY2s6IChsb2FkZXI6IExvYWRlcikgPT4gdm9pZDtcblxuICAgIEBJbnB1dCgpXG4gICAgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIG1lc3NhZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbW9kZTogXCJzcGlubmVyXCIgfCBcInByb2dyZXNzXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc1R5cGU6IFwiZGV0ZXJtaW5hdGVcIiB8IFwiaW5kZXRlcm1pbmF0ZVwiID0gXCJkZXRlcm1pbmF0ZVwiO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc1ZhbHVlOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc0J1ZmZlcjogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NQZXJjZW50OiBudW1iZXI7XG5cbiAgICBnZXQgcHJvZ3Jlc3NQZXJjZW50VmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnByb2dyZXNzUGVyY2VudCA9PT0gXCJudW1iZXJcIjtcbiAgICB9XG5cbiAgICBnZXQgc3Bpbm5lck1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGUgPT09IFwic3Bpbm5lclwiO1xuICAgIH1cblxuICAgIGdldCBwcm9ncmVzc01vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGUgPT09IFwicHJvZ3Jlc3NcIjtcbiAgICB9XG5cbiAgICBkaXNtaXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcG92ZXI6IEhUTUxJb25Qb3BvdmVyRWxlbWVudDtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBvcG92ZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLXBvcG92ZXJcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZUNhbGxiYWNrKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5pbnN0YW5jZUNhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==