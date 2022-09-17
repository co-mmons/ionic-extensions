import { Component, Input, ElementRef, ChangeDetectionStrategy } from "@angular/core";
export class SelectOption {
    constructor(element) {
        this.element = element;
    }
    get label() {
        return this.element.nativeElement.innerText;
    }
}
SelectOption.decorators = [
    { type: Component, args: [{
                selector: "ionx-select-option",
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "<ng-content></ng-content>"
            },] }
];
SelectOption.ctorParameters = () => [
    { type: ElementRef }
];
SelectOption.propDecorators = {
    value: [{ type: Input }],
    divider: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZWxlY3Qvc2VsZWN0LW9wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFPcEYsTUFBTSxPQUFPLFlBQVk7SUFFckIsWUFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQVFELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO0lBQ2hELENBQUM7OztZQWxCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSwyQkFBMkI7YUFDeEM7OztZQU55QixVQUFVOzs7b0JBWS9CLEtBQUs7c0JBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc2VsZWN0LW9wdGlvblwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHRlbXBsYXRlOiBcIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cIlxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RPcHRpb24ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgZGl2aWRlcjogYm9vbGVhbjtcblxuICAgIGdldCBsYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIH1cbn0iXX0=