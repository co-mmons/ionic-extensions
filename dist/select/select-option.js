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
//# sourceMappingURL=select-option.js.map