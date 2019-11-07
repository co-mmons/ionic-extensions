import * as tslib_1 from "tslib";
import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
var SelectLabel = /** @class */ (function () {
    function SelectLabel(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.separator = ", ";
    }
    SelectLabel.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    tslib_1.__decorate([
        Input()
    ], SelectLabel.prototype, "separator", void 0);
    SelectLabel = tslib_1.__decorate([
        Directive({
            selector: "[ionxSelectLabel]"
        })
    ], SelectLabel);
    return SelectLabel;
}());
export { SelectLabel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxhYmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc2VsZWN0LyIsInNvdXJjZXMiOlsic2VsZWN0LWxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLOUU7SUFFSSxxQkFBNEIsV0FBNkIsRUFBa0IsYUFBK0I7UUFBOUUsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQWtCLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUkxRyxjQUFTLEdBQVcsSUFBSSxDQUFDO0lBSHpCLENBQUM7O2dCQUR3QyxXQUFXO2dCQUFzQyxnQkFBZ0I7O0lBSTFHO1FBREMsS0FBSyxFQUFFO2tEQUNpQjtJQU5oQixXQUFXO1FBSHZCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7U0FDaEMsQ0FBQztPQUNXLFdBQVcsQ0FPdkI7SUFBRCxrQkFBQztDQUFBLEFBUEQsSUFPQztTQVBZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbaW9ueFNlbGVjdExhYmVsXVwiXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdExhYmVsIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PiwgcHVibGljIHJlYWRvbmx5IHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNlcGFyYXRvcjogc3RyaW5nID0gXCIsIFwiO1xufSJdfQ==