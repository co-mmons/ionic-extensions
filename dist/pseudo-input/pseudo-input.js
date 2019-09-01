import * as tslib_1 from "tslib";
import { Component, ElementRef } from "@angular/core";
var PseudoInput = /** @class */ (function () {
    function PseudoInput(element) {
        this.element = element;
    }
    PseudoInput = tslib_1.__decorate([
        Component({
            selector: "ionx-pseudo-input",
            exportAs: "ionxPseudoInput",
            template: "<ng-content></ng-content>"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], PseudoInput);
    return PseudoInput;
}());
export { PseudoInput };
//# sourceMappingURL=pseudo-input.js.map