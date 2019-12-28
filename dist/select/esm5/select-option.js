import { __decorate } from "tslib";
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
    SelectOption.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], SelectOption.prototype, "value", void 0);
    __decorate([
        Input()
    ], SelectOption.prototype, "divider", void 0);
    SelectOption = __decorate([
        Component({
            selector: "ionx-select-option",
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "<ng-content></ng-content>"
        })
    ], SelectOption);
    return SelectOption;
}());
export { SelectOption };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3NlbGVjdC8iLCJzb3VyY2VzIjpbInNlbGVjdC1vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU9wRjtJQUVJLHNCQUFvQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUNwRCxDQUFDO0lBUUQsc0JBQUksK0JBQUs7YUFBVDtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQ2hELENBQUM7OztPQUFBOztnQkFYNEIsVUFBVTs7SUFJdkM7UUFEQyxLQUFLLEVBQUU7K0NBQ0c7SUFHWDtRQURDLEtBQUssRUFBRTtpREFDUztJQVRSLFlBQVk7UUFMeEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQUUsMkJBQTJCO1NBQ3hDLENBQUM7T0FDVyxZQUFZLENBY3hCO0lBQUQsbUJBQUM7Q0FBQSxBQWRELElBY0M7U0FkWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1zZWxlY3Qtb3B0aW9uXCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgdGVtcGxhdGU6IFwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlwiXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdE9wdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBkaXZpZGVyOiBib29sZWFuO1xuXG4gICAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5pbm5lclRleHQ7XG4gICAgfVxufSJdfQ==