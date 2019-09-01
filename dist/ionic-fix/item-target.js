import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
var IonicItemTargetFix = /** @class */ (function () {
    function IonicItemTargetFix(element) {
        this.element = element;
    }
    IonicItemTargetFix.prototype.ngAfterViewInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var i, a;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.target) return [3 /*break*/, 5];
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i < 20)) return [3 /*break*/, 5];
                        a = (this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".item-native")) || undefined;
                        if (!!a) return [3 /*break*/, 3];
                        return [4 /*yield*/, sleep(i * 100)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        a.setAttribute("target", this.target);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], IonicItemTargetFix.prototype, "target", void 0);
    IonicItemTargetFix = tslib_1.__decorate([
        Directive({
            selector: "ion-item[target]"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], IonicItemTargetFix);
    return IonicItemTargetFix;
}());
export { IonicItemTargetFix };
//# sourceMappingURL=item-target.js.map