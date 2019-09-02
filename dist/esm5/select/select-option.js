import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ChangeDetectionStrategy } from "@angular/core";
var SelectOption = /** @class */ (function () {
    function SelectOption(element) {
        this.element = element;
    }
    Object.defineProperty(SelectOption.prototype, "label", {
        get: function () {
            return this.element.nativeElement.innerText;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SelectOption.prototype, "value", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], SelectOption.prototype, "divider", void 0);
    SelectOption = tslib_1.__decorate([
        Component({
            selector: "ionx-select-option",
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "<ng-content></ng-content>"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], SelectOption);
    return SelectOption;
}());
export { SelectOption };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsic2VsZWN0L3NlbGVjdC1vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU9wRjtJQUVJLHNCQUFvQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUNwRCxDQUFDO0lBUUQsc0JBQUksK0JBQUs7YUFBVDtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBUEQ7UUFEQyxLQUFLLEVBQUU7OytDQUNHO0lBR1g7UUFEQyxLQUFLLEVBQUU7O2lEQUNTO0lBVFIsWUFBWTtRQUx4QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQztpREFHK0IsVUFBVTtPQUY5QixZQUFZLENBY3hCO0lBQUQsbUJBQUM7Q0FBQSxBQWRELElBY0M7U0FkWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1zZWxlY3Qtb3B0aW9uXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgdGVtcGxhdGU6IFwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlwiXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdE9wdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBkaXZpZGVyOiBib29sZWFuO1xuXG4gICAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG4gICAgfVxufSJdfQ==