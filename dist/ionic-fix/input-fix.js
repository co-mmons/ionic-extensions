import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
var IonicInputFix = /** @class */ (function () {
    function IonicInputFix(element) {
        this.element = element;
    }
    IonicInputFix.prototype.ngAfterViewInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var realInput;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.tabIndex) return [3 /*break*/, 2];
                        this.element.nativeElement.removeAttribute("tabIndex");
                        return [4 /*yield*/, waitTill(function () { return !!_this.element.nativeElement.shadowRoot && !!_this.element.nativeElement.shadowRoot.querySelector(".native-input"); })];
                    case 1:
                        _a.sent();
                        realInput = this.element.nativeElement.shadowRoot.querySelector(".native-input");
                        realInput.setAttribute("tabIndex", this.tabIndex);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Input("tabIndex"),
        tslib_1.__metadata("design:type", String)
    ], IonicInputFix.prototype, "tabIndex", void 0);
    IonicInputFix = tslib_1.__decorate([
        Directive({
            selector: "ion-input[ionfix-input]"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], IonicInputFix);
    return IonicInputFix;
}());
export { IonicInputFix };
//# sourceMappingURL=input-fix.js.map