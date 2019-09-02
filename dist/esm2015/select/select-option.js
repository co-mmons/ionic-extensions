import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, ChangeDetectionStrategy } from "@angular/core";
let SelectOption = class SelectOption {
    constructor(element) {
        this.element = element;
    }
    get label() {
        return this.element.nativeElement.innerText;
    }
};
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
export { SelectOption };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsic2VsZWN0L3NlbGVjdC1vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU9wRixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBRXJCLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQ3BELENBQUM7SUFRRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUNoRCxDQUFDO0NBQ0osQ0FBQTtBQVJHO0lBREMsS0FBSyxFQUFFOzsyQ0FDRztBQUdYO0lBREMsS0FBSyxFQUFFOzs2Q0FDUztBQVRSLFlBQVk7SUFMeEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxRQUFRLEVBQUUsMkJBQTJCO0tBQ3hDLENBQUM7NkNBRytCLFVBQVU7R0FGOUIsWUFBWSxDQWN4QjtTQWRZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXNlbGVjdC1vcHRpb25cIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZTogXCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XCJcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0T3B0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIGRpdmlkZXI6IGJvb2xlYW47XG5cbiAgICBnZXQgbGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVyVGV4dDtcbiAgICB9XG59Il19