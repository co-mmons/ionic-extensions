import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
export class SelectLabel {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.separator = ", ";
    }
}
SelectLabel.decorators = [
    { type: Directive, args: [{
                selector: "[ionxSelectLabel]"
            },] }
];
SelectLabel.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
SelectLabel.propDecorators = {
    separator: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxhYmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlbGVjdC9zZWxlY3QtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSzlFLE1BQU0sT0FBTyxXQUFXO0lBRXBCLFlBQTRCLFdBQTZCLEVBQWtCLGFBQStCO1FBQTlFLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUFrQixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFJMUcsY0FBUyxHQUFXLElBQUksQ0FBQztJQUh6QixDQUFDOzs7WUFOSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjthQUNoQzs7O1lBSmtCLFdBQVc7WUFBRSxnQkFBZ0I7Ozt3QkFVM0MsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltpb254U2VsZWN0TGFiZWxdXCJcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TGFiZWwge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCBwdWJsaWMgcmVhZG9ubHkgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2VwYXJhdG9yOiBzdHJpbmcgPSBcIiwgXCI7XG59Il19