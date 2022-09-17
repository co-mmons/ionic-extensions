import { Component, ElementRef, HostBinding, Input } from "@angular/core";
export class Loader {
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
}
Loader.decorators = [
    { type: Component, args: [{
                selector: "ionx-loader",
                template: "<div>\n\n    <div style=\"display: flex; align-items: center\">\n\n        <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n            <ion-spinner></ion-spinner>\n        </div>\n\n        <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n            <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n            <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n        </div>\n\n    </div>\n\n    <ion-progress-bar style=\"margin: 8px 0px 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n\n    <div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n        <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n        <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n    </div>\n\n</div>\n",
                styles: [":host{display:flex}:host.ionx--filled{width:100%;height:100%;align-items:center;align-content:center;justify-items:center;justify-content:center}\n"]
            },] }
];
Loader.ctorParameters = () => [
    { type: ElementRef }
];
Loader.propDecorators = {
    fill: [{ type: Input }, { type: HostBinding, args: ["class.ionx--filled",] }],
    instanceCallback: [{ type: Input }],
    header: [{ type: Input }],
    message: [{ type: Input }],
    mode: [{ type: Input }],
    progressMessage: [{ type: Input }],
    progressType: [{ type: Input }],
    progressValue: [{ type: Input }],
    progressBuffer: [{ type: Input }],
    progressPercent: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xvYWRlci9sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFRM0YsTUFBTSxPQUFPLE1BQU07SUFFZixZQUFvQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQXVCdkQsaUJBQVksR0FBb0MsYUFBYSxDQUFDO1FBRzlELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRzFCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0lBNUIzQixDQUFDO0lBaUNELElBQUksc0JBQXNCO1FBQ3RCLE9BQU8sT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLFFBQVEsQ0FBQztJQUNwRCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBSUQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXBFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztJQUN0QyxDQUFDOzs7WUF0RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2Qix5akNBQTBCOzthQUU3Qjs7O1lBUGtCLFVBQVU7OzttQkFheEIsS0FBSyxZQUNMLFdBQVcsU0FBQyxvQkFBb0I7K0JBR2hDLEtBQUs7cUJBR0wsS0FBSztzQkFHTCxLQUFLO21CQUdMLEtBQUs7OEJBR0wsS0FBSzsyQkFHTCxLQUFLOzRCQUdMLEtBQUs7NkJBR0wsS0FBSzs4QkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0xvYWRlck9wdGlvbnN9IGZyb20gXCIuL2xvYWRlci1vcHRpb25zXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtbG9hZGVyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwibG9hZGVyLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImxvYWRlci5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIExvYWRlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBMb2FkZXJPcHRpb25zIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZyhcImNsYXNzLmlvbngtLWZpbGxlZFwiKVxuICAgIGZpbGw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGluc3RhbmNlQ2FsbGJhY2s6IChsb2FkZXI6IExvYWRlcikgPT4gdm9pZDtcblxuICAgIEBJbnB1dCgpXG4gICAgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIG1lc3NhZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbW9kZTogXCJzcGlubmVyXCIgfCBcInByb2dyZXNzXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc1R5cGU6IFwiZGV0ZXJtaW5hdGVcIiB8IFwiaW5kZXRlcm1pbmF0ZVwiID0gXCJkZXRlcm1pbmF0ZVwiO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc1ZhbHVlOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc0J1ZmZlcjogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NQZXJjZW50OiBudW1iZXI7XG5cbiAgICBnZXQgcHJvZ3Jlc3NQZXJjZW50VmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnByb2dyZXNzUGVyY2VudCA9PT0gXCJudW1iZXJcIjtcbiAgICB9XG5cbiAgICBnZXQgc3Bpbm5lck1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGUgPT09IFwic3Bpbm5lclwiO1xuICAgIH1cblxuICAgIGdldCBwcm9ncmVzc01vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGUgPT09IFwicHJvZ3Jlc3NcIjtcbiAgICB9XG5cbiAgICBkaXNtaXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3BvdmVyLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcG92ZXI6IEhUTUxJb25Qb3BvdmVyRWxlbWVudDtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBvcG92ZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLXBvcG92ZXJcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZUNhbGxiYWNrKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5pbnN0YW5jZUNhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==