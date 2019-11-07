import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, OnInit } from "@angular/core";
let BackButton = class BackButton {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        this.modal = !!this.elementRef.nativeElement.closest("ion-modal");
    }
};
BackButton.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    Input()
], BackButton.prototype, "defaultHref", void 0);
tslib_1.__decorate([
    Input()
], BackButton.prototype, "icon", void 0);
tslib_1.__decorate([
    Input()
], BackButton.prototype, "disabled", void 0);
BackButton = tslib_1.__decorate([
    Component({
        selector: "ionx-back-button",
        template: `<ion-back-button [style.display]="modal ? 'inline-block' : null" [disabled]="disabled" [defaultHref]="defaultHref" [icon]="icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')"></ion-back-button>`,
        styles: [":host{display:inline-block}"]
    })
], BackButton);
export { BackButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9iYWNrLWJ1dHRvbi8iLCJzb3VyY2VzIjpbImJhY2stYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBT25FLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFFbkIsWUFBb0IsVUFBbUM7UUFBbkMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7SUFDdkQsQ0FBQztJQWFELFFBQVE7UUFDSixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUVKLENBQUE7O1lBbEJtQyxVQUFVOztBQUkxQztJQURDLEtBQUssRUFBRTsrQ0FDWTtBQUdwQjtJQURDLEtBQUssRUFBRTt3Q0FDSztBQUtiO0lBREMsS0FBSyxFQUFFOzRDQUNVO0FBZFQsVUFBVTtJQUx0QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBRTVCLFFBQVEsRUFBRSxpT0FBaU87O0tBQzlPLENBQUM7R0FDVyxVQUFVLENBb0J0QjtTQXBCWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtYmFjay1idXR0b25cIixcbiAgICBzdHlsZVVybHM6IFtcImJhY2stYnV0dG9uLnNjc3NcIl0sXG4gICAgdGVtcGxhdGU6IGA8aW9uLWJhY2stYnV0dG9uIFtzdHlsZS5kaXNwbGF5XT1cIm1vZGFsID8gJ2lubGluZS1ibG9jaycgOiBudWxsXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2RlZmF1bHRIcmVmXT1cImRlZmF1bHRIcmVmXCIgW2ljb25dPVwiaWNvbiA/IGljb24gOiAobW9kYWwgJiYgKCd0YWJsZXQnIHwgbWF0Y2hHcmVhdGVyV2lkdGgpID8gJ2Nsb3NlJyA6ICdhcnJvdy1iYWNrJylcIj48L2lvbi1iYWNrLWJ1dHRvbj5gXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tCdXR0b24gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZGVmYXVsdEhyZWY6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgaWNvbjogc3RyaW5nO1xuXG4gICAgbW9kYWw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubW9kYWwgPSAhIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tbW9kYWxcIik7XG4gICAgfVxuXG59XG4iXX0=