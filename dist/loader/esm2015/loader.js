import { __decorate } from "tslib";
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from "@angular/core";
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
export { Loader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbG9hZGVyLyIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRM0YsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTTtJQUVmLFlBQW9CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBdUJ2RCxpQkFBWSxHQUFvQyxhQUFhLENBQUM7UUFHOUQsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFHMUIsbUJBQWMsR0FBVyxDQUFDLENBQUM7SUE1QjNCLENBQUM7SUFpQ0QsSUFBSSxzQkFBc0I7UUFDdEIsT0FBTyxPQUFPLElBQUksQ0FBQyxlQUFlLEtBQUssUUFBUSxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO0lBQ25DLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFJRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFcEUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO0lBQ3RDLENBQUM7Q0FDSixDQUFBOztZQWhFbUMsVUFBVTs7QUFLMUM7SUFGQyxLQUFLLEVBQUU7SUFDUCxXQUFXLENBQUMsb0JBQW9CLENBQUM7b0NBQ3BCO0FBR2Q7SUFEQyxLQUFLLEVBQUU7Z0RBQ21DO0FBRzNDO0lBREMsS0FBSyxFQUFFO3NDQUNPO0FBR2Y7SUFEQyxLQUFLLEVBQUU7dUNBQ1E7QUFHaEI7SUFEQyxLQUFLLEVBQUU7b0NBQ3FCO0FBRzdCO0lBREMsS0FBSyxFQUFFOytDQUNnQjtBQUd4QjtJQURDLEtBQUssRUFBRTs0Q0FDc0Q7QUFHOUQ7SUFEQyxLQUFLLEVBQUU7NkNBQ2tCO0FBRzFCO0lBREMsS0FBSyxFQUFFOzhDQUNtQjtBQUczQjtJQURDLEtBQUssRUFBRTsrQ0FDZ0I7QUFsQ2YsTUFBTTtJQUxsQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2Qix5akNBQTBCOztLQUU3QixDQUFDO0dBQ1csTUFBTSxDQWtFbEI7U0FsRVksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtMb2FkZXJPcHRpb25zfSBmcm9tIFwiLi9sb2FkZXItb3B0aW9uc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWxvYWRlclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImxvYWRlci5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJsb2FkZXIuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBMb2FkZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgTG9hZGVyT3B0aW9ucyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pb254LS1maWxsZWRcIilcbiAgICBmaWxsOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBpbnN0YW5jZUNhbGxiYWNrOiAobG9hZGVyOiBMb2FkZXIpID0+IHZvaWQ7XG5cbiAgICBASW5wdXQoKVxuICAgIGhlYWRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIG1vZGU6IFwic3Bpbm5lclwiIHwgXCJwcm9ncmVzc1wiO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc01lc3NhZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NUeXBlOiBcImRldGVybWluYXRlXCIgfCBcImluZGV0ZXJtaW5hdGVcIiA9IFwiZGV0ZXJtaW5hdGVcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NWYWx1ZTogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NCdWZmZXI6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzUGVyY2VudDogbnVtYmVyO1xuXG4gICAgZ2V0IHByb2dyZXNzUGVyY2VudFZpc2libGUoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5wcm9ncmVzc1BlcmNlbnQgPT09IFwibnVtYmVyXCI7XG4gICAgfVxuXG4gICAgZ2V0IHNwaW5uZXJNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSBcInNwaW5uZXJcIjtcbiAgICB9XG5cbiAgICBnZXQgcHJvZ3Jlc3NNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSBcInByb2dyZXNzXCI7XG4gICAgfVxuXG4gICAgZGlzbWlzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3Zlci5kaXNtaXNzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3BvdmVyOiBIVE1MSW9uUG9wb3ZlckVsZW1lbnQ7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1wb3BvdmVyXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VDYWxsYmFjayh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnBvcG92ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VDYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=