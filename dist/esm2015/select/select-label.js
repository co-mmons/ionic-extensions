import * as tslib_1 from "tslib";
import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
let SelectLabel = class SelectLabel {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.separator = ", ";
    }
};
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
export { SelectLabel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJzZWxlY3Qvc2VsZWN0LWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLOUUsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUVwQixZQUE0QixXQUE2QixFQUFrQixhQUErQjtRQUE5RSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFBa0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBSTFHLGNBQVMsR0FBVyxJQUFJLENBQUM7SUFIekIsQ0FBQztDQUlKLENBQUE7QUFERztJQURDLEtBQUssRUFBRTs7OENBQ2lCO0FBTmhCLFdBQVc7SUFIdkIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG1CQUFtQjtLQUNoQyxDQUFDOzZDQUcyQyxXQUFXLEVBQXNDLGdCQUFnQjtHQUZqRyxXQUFXLENBT3ZCO1NBUFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltpb254U2VsZWN0TGFiZWxdXCJcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TGFiZWwge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCBwdWJsaWMgcmVhZG9ubHkgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2VwYXJhdG9yOiBzdHJpbmcgPSBcIiwgXCI7XG59Il19