import * as tslib_1 from "tslib";
import { ElementRef, HostListener, Directive } from "@angular/core";
import { waitTill } from "@co.mmons/js-utils/core";
var TextareaAutosize = /** @class */ (function () {
    function TextareaAutosize(element) {
        this.element = element;
    }
    TextareaAutosize.prototype.onChange = function () {
        this.adjust();
    };
    Object.defineProperty(TextareaAutosize.prototype, "textarea", {
        get: function () {
            return this.element.nativeElement.querySelector("textarea");
        },
        enumerable: true,
        configurable: true
    });
    TextareaAutosize.prototype.adjust = function () {
        var input = this.textarea;
        if (input) {
            input.style.overflow = "hidden";
            input.style.height = "auto";
            input.style.height = input.scrollHeight + "px";
        }
    };
    TextareaAutosize.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitTill(function () { return !!_this.textarea; })];
                    case 1:
                        _a.sent();
                        this.adjust();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        HostListener("ionChange"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TextareaAutosize.prototype, "onChange", null);
    TextareaAutosize = tslib_1.__decorate([
        Directive({
            selector: "ion-textarea[ionx-autosize]"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], TextareaAutosize);
    return TextareaAutosize;
}());
export { TextareaAutosize };
//# sourceMappingURL=textarea-autosize.js.map