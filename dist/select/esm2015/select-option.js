import { __decorate } from "tslib";
import { Component, Input, ElementRef, ChangeDetectionStrategy } from "@angular/core";
let SelectOption = class SelectOption {
    constructor(element) {
        this.element = element;
    }
    get label() {
        return this.element.nativeElement.innerText;
    }
};
SelectOption.ctorParameters = () => [
    { type: ElementRef }
];
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
export { SelectOption };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3NlbGVjdC8iLCJzb3VyY2VzIjpbInNlbGVjdC1vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU9wRixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBRXJCLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQ3BELENBQUM7SUFRRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUNoRCxDQUFDO0NBQ0osQ0FBQTs7WUFaZ0MsVUFBVTs7QUFJdkM7SUFEQyxLQUFLLEVBQUU7MkNBQ0c7QUFHWDtJQURDLEtBQUssRUFBRTs2Q0FDUztBQVRSLFlBQVk7SUFMeEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxRQUFRLEVBQUUsMkJBQTJCO0tBQ3hDLENBQUM7R0FDVyxZQUFZLENBY3hCO1NBZFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc2VsZWN0LW9wdGlvblwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHRlbXBsYXRlOiBcIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cIlxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RPcHRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZGl2aWRlcjogYm9vbGVhbjtcblxuICAgIGdldCBsYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIH1cbn0iXX0=