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
//# sourceMappingURL=select-label.js.map