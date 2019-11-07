import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, OnInit } from "@angular/core";
var BackButton = /** @class */ (function () {
    function BackButton(elementRef) {
        this.elementRef = elementRef;
    }
    BackButton.prototype.ngOnInit = function () {
        this.modal = !!this.elementRef.nativeElement.closest("ion-modal");
    };
    BackButton.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
            template: "<ion-back-button [style.display]=\"modal ? 'inline-block' : null\" [disabled]=\"disabled\" [defaultHref]=\"defaultHref\" [icon]=\"icon ? icon : (modal && ('tablet' | matchGreaterWidth) ? 'close' : 'arrow-back')\"></ion-back-button>",
            styles: [":host{display:inline-block}"]
        })
    ], BackButton);
    return BackButton;
}());
export { BackButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9iYWNrLWJ1dHRvbi8iLCJzb3VyY2VzIjpbImJhY2stYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBT25FO0lBRUksb0JBQW9CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQ3ZELENBQUM7SUFhRCw2QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7O2dCQWhCK0IsVUFBVTs7SUFJMUM7UUFEQyxLQUFLLEVBQUU7bURBQ1k7SUFHcEI7UUFEQyxLQUFLLEVBQUU7NENBQ0s7SUFLYjtRQURDLEtBQUssRUFBRTtnREFDVTtJQWRULFVBQVU7UUFMdEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtZQUU1QixRQUFRLEVBQUUseU9BQWlPOztTQUM5TyxDQUFDO09BQ1csVUFBVSxDQW9CdEI7SUFBRCxpQkFBQztDQUFBLEFBcEJELElBb0JDO1NBcEJZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1iYWNrLWJ1dHRvblwiLFxuICAgIHN0eWxlVXJsczogW1wiYmFjay1idXR0b24uc2Nzc1wiXSxcbiAgICB0ZW1wbGF0ZTogYDxpb24tYmFjay1idXR0b24gW3N0eWxlLmRpc3BsYXldPVwibW9kYWwgPyAnaW5saW5lLWJsb2NrJyA6IG51bGxcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbZGVmYXVsdEhyZWZdPVwiZGVmYXVsdEhyZWZcIiBbaWNvbl09XCJpY29uID8gaWNvbiA6IChtb2RhbCAmJiAoJ3RhYmxldCcgfCBtYXRjaEdyZWF0ZXJXaWR0aCkgPyAnY2xvc2UnIDogJ2Fycm93LWJhY2snKVwiPjwvaW9uLWJhY2stYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgQmFja0J1dHRvbiBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBkZWZhdWx0SHJlZjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBpY29uOiBzdHJpbmc7XG5cbiAgICBtb2RhbDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbCA9ICEhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1tb2RhbFwiKTtcbiAgICB9XG5cbn1cbiJdfQ==