import * as tslib_1 from "tslib";
import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
var SelectLabel = /** @class */ (function () {
    function SelectLabel(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.separator = ", ";
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SelectLabel.prototype, "separator", void 0);
    SelectLabel = tslib_1.__decorate([
        Directive({
            selector: "[ionxSelectLabel]"
        }),
        tslib_1.__metadata("design:paramtypes", [TemplateRef, ViewContainerRef])
    ], SelectLabel);
    return SelectLabel;
}());
export { SelectLabel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJzZWxlY3Qvc2VsZWN0LWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLOUU7SUFFSSxxQkFBNEIsV0FBNkIsRUFBa0IsYUFBK0I7UUFBOUUsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQWtCLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUkxRyxjQUFTLEdBQVcsSUFBSSxDQUFDO0lBSHpCLENBQUM7SUFHRDtRQURDLEtBQUssRUFBRTs7a0RBQ2lCO0lBTmhCLFdBQVc7UUFIdkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtTQUNoQyxDQUFDO2lEQUcyQyxXQUFXLEVBQXNDLGdCQUFnQjtPQUZqRyxXQUFXLENBT3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQVBELElBT0M7U0FQWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW2lvbnhTZWxlY3RMYWJlbF1cIlxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RMYWJlbCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sIHB1YmxpYyByZWFkb25seSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXBhcmF0b3I6IHN0cmluZyA9IFwiLCBcIjtcbn0iXX0=