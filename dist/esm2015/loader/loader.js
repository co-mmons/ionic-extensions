import * as tslib_1 from "tslib";
import { Component, ElementRef, Input } from "@angular/core";
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
        styles: [`:host { display: block }`]
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], Loader);
export { Loader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJsb2FkZXIvbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBVTlFLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07SUFFZixZQUFvQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQW1CdkQsaUJBQVksR0FBb0MsYUFBYSxDQUFDO1FBRzlELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRzFCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO0lBeEIzQixDQUFDO0lBNkJELElBQUksc0JBQXNCO1FBQ3RCLE9BQU8sT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLFFBQVEsQ0FBQztJQUNwRCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBSUQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXBFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztJQUN0QyxDQUFDO0NBQ0osQ0FBQTtBQXhERztJQURDLEtBQUssRUFBRTs7Z0RBQ21DO0FBRzNDO0lBREMsS0FBSyxFQUFFOztzQ0FDTztBQUdmO0lBREMsS0FBSyxFQUFFOzt1Q0FDUTtBQUdoQjtJQURDLEtBQUssRUFBRTs7b0NBQ3FCO0FBRzdCO0lBREMsS0FBSyxFQUFFOzsrQ0FDZ0I7QUFHeEI7SUFEQyxLQUFLLEVBQUU7OzRDQUNzRDtBQUc5RDtJQURDLEtBQUssRUFBRTs7NkNBQ2tCO0FBRzFCO0lBREMsS0FBSyxFQUFFOzs4Q0FDbUI7QUFHM0I7SUFEQyxLQUFLLEVBQUU7OytDQUNnQjtBQTlCZixNQUFNO0lBUGxCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLHMrQkFBMEI7aUJBRXRCLDBCQUEwQjtLQUVqQyxDQUFDOzZDQUdrQyxVQUFVO0dBRmpDLE1BQU0sQ0E4RGxCO1NBOURZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtMb2FkZXJPcHRpb25zfSBmcm9tIFwiLi9sb2FkZXItb3B0aW9uc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWxvYWRlclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImxvYWRlci5odG1sXCIsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGA6aG9zdCB7IGRpc3BsYXk6IGJsb2NrIH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMb2FkZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgTG9hZGVyT3B0aW9ucyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBpbnN0YW5jZUNhbGxiYWNrOiAobG9hZGVyOiBMb2FkZXIpID0+IHZvaWQ7XG5cbiAgICBASW5wdXQoKVxuICAgIGhlYWRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIG1vZGU6IFwic3Bpbm5lclwiIHwgXCJwcm9ncmVzc1wiO1xuXG4gICAgQElucHV0KClcbiAgICBwcm9ncmVzc01lc3NhZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NUeXBlOiBcImRldGVybWluYXRlXCIgfCBcImluZGV0ZXJtaW5hdGVcIiA9IFwiZGV0ZXJtaW5hdGVcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NWYWx1ZTogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpXG4gICAgcHJvZ3Jlc3NCdWZmZXI6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKVxuICAgIHByb2dyZXNzUGVyY2VudDogbnVtYmVyO1xuXG4gICAgZ2V0IHByb2dyZXNzUGVyY2VudFZpc2libGUoKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5wcm9ncmVzc1BlcmNlbnQgPT09IFwibnVtYmVyXCI7XG4gICAgfVxuXG4gICAgZ2V0IHNwaW5uZXJNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSBcInNwaW5uZXJcIjtcbiAgICB9XG5cbiAgICBnZXQgcHJvZ3Jlc3NNb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSBcInByb2dyZXNzXCI7XG4gICAgfVxuXG4gICAgZGlzbWlzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3Zlci5kaXNtaXNzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3BvdmVyOiBIVE1MSW9uUG9wb3ZlckVsZW1lbnQ7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1wb3BvdmVyXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VDYWxsYmFjayh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnBvcG92ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VDYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG4iXX0=