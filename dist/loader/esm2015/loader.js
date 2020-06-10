import { __decorate } from "tslib";
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
export { Loader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbG9hZGVyLyIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVE5RSxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBRWYsWUFBb0IsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFzQnZELGlCQUFZLEdBQW9DLGFBQWEsQ0FBQztRQUc5RCxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUcxQixtQkFBYyxHQUFXLENBQUMsQ0FBQztJQTNCM0IsQ0FBQztJQWdDRCxJQUFJLHNCQUFzQjtRQUN0QixPQUFPLE9BQU8sSUFBSSxDQUFDLGVBQWUsS0FBSyxRQUFRLENBQUM7SUFDcEQsQ0FBQztJQUVELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUlELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVwRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7SUFDdEMsQ0FBQztDQUNKLENBQUE7O1lBL0RtQyxVQUFVOztBQUkxQztJQURDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztvQ0FDZDtBQUdkO0lBREMsS0FBSyxFQUFFO2dEQUNtQztBQUczQztJQURDLEtBQUssRUFBRTtzQ0FDTztBQUdmO0lBREMsS0FBSyxFQUFFO3VDQUNRO0FBR2hCO0lBREMsS0FBSyxFQUFFO29DQUNxQjtBQUc3QjtJQURDLEtBQUssRUFBRTsrQ0FDZ0I7QUFHeEI7SUFEQyxLQUFLLEVBQUU7NENBQ3NEO0FBRzlEO0lBREMsS0FBSyxFQUFFOzZDQUNrQjtBQUcxQjtJQURDLEtBQUssRUFBRTs4Q0FDbUI7QUFHM0I7SUFEQyxLQUFLLEVBQUU7K0NBQ2dCO0FBakNmLE1BQU07SUFMbEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGFBQWE7UUFDdkIseWpDQUEwQjs7S0FFN0IsQ0FBQztHQUNXLE1BQU0sQ0FpRWxCO1NBakVZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtMb2FkZXJPcHRpb25zfSBmcm9tIFwiLi9sb2FkZXItb3B0aW9uc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWxvYWRlclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImxvYWRlci5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJsb2FkZXIuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBMb2FkZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgTG9hZGVyT3B0aW9ucyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KFwiY2xhc3MuaW9ueC0tZmlsbGVkXCIpXG4gICAgZmlsbDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgaW5zdGFuY2VDYWxsYmFjazogKGxvYWRlcjogTG9hZGVyKSA9PiB2b2lkO1xuXG4gICAgQElucHV0KClcbiAgICBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBtb2RlOiBcInNwaW5uZXJcIiB8IFwicHJvZ3Jlc3NcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NNZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzVHlwZTogXCJkZXRlcm1pbmF0ZVwiIHwgXCJpbmRldGVybWluYXRlXCIgPSBcImRldGVybWluYXRlXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzVmFsdWU6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzQnVmZmVyOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc1BlcmNlbnQ6IG51bWJlcjtcblxuICAgIGdldCBwcm9ncmVzc1BlcmNlbnRWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMucHJvZ3Jlc3NQZXJjZW50ID09PSBcIm51bWJlclwiO1xuICAgIH1cblxuICAgIGdldCBzcGlubmVyTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gXCJzcGlubmVyXCI7XG4gICAgfVxuXG4gICAgZ2V0IHByb2dyZXNzTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gXCJwcm9ncmVzc1wiO1xuICAgIH1cblxuICAgIGRpc21pc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcG92ZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9wb3ZlcjogSFRNTElvblBvcG92ZXJFbGVtZW50O1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tcG9wb3ZlclwiKTtcblxuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlQ2FsbGJhY2sodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmluc3RhbmNlQ2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIl19