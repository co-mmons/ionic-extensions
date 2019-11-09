import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, OnInit } from "@angular/core";
let BackButton = class BackButton {
    // template: `<ion-back-button [style.display]="modal ? 'inline-block' : null" [disabled]="disabled" [defaultHref]="defaultHref" [icon]="icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')"></ion-back-button>`
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (!!this.elementRef.nativeElement.closest("ion-modal")) {
            this.elementRef.nativeElement.style.setProperty("display", "inline-block");
        }
    }
};
BackButton.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    Input()
], BackButton.prototype, "icon", void 0);
BackButton = tslib_1.__decorate([
    Directive({
        selector: "ion-back-button[ionx-back-button]",
    })
], BackButton);
export { BackButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9iYWNrLWJ1dHRvbi8iLCJzb3VyY2VzIjpbImJhY2stYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBS25FLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFDbkIsOE9BQThPO0lBRTlPLFlBQW9CLFVBQWdEO1FBQWhELGVBQVUsR0FBVixVQUFVLENBQXNDO0lBQ3BFLENBQUM7SUFLRCxRQUFRO1FBRUosSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzlFO0lBQ0wsQ0FBQztDQUVKLENBQUE7O1lBYm1DLFVBQVU7O0FBSTFDO0lBREMsS0FBSyxFQUFFO3dDQUNLO0FBUEosVUFBVTtJQUh0QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsbUNBQW1DO0tBQ2hELENBQUM7R0FDVyxVQUFVLENBZ0J0QjtTQWhCWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcImlvbi1iYWNrLWJ1dHRvbltpb254LWJhY2stYnV0dG9uXVwiLFxufSlcbmV4cG9ydCBjbGFzcyBCYWNrQnV0dG9uIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICAvLyB0ZW1wbGF0ZTogYDxpb24tYmFjay1idXR0b24gW3N0eWxlLmRpc3BsYXldPVwibW9kYWwgPyAnaW5saW5lLWJsb2NrJyA6IG51bGxcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbZGVmYXVsdEhyZWZdPVwiZGVmYXVsdEhyZWZcIiBbaWNvbl09XCJpY29uID8gaWNvbiA6IChtb2RhbCAmJiAoJ3RhYmxldCcgfCBtYXRjaEdyZWF0ZXJXaWR0aCkgPyAnY2xvc2UnIDogJ2Fycm93LWJhY2snKVwiPjwvaW9uLWJhY2stYnV0dG9uPmBcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW9uQmFja0J1dHRvbkVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBpY29uOiBzdHJpbmc7XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBpZiAoISF0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLW1vZGFsXCIpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==