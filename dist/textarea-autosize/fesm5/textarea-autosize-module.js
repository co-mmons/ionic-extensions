import { __awaiter, __generator, __decorate } from 'tslib';
import { ElementRef, HostListener, Directive, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { waitTill } from '@co.mmons/js-utils/core';

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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
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
    TextareaAutosize.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        HostListener("ionChange")
    ], TextareaAutosize.prototype, "onChange", null);
    TextareaAutosize = __decorate([
        Directive({
            selector: "ion-textarea[ionx-autosize]"
        })
    ], TextareaAutosize);
    return TextareaAutosize;
}());

var TextareaAutosizeModule = /** @class */ (function () {
    function TextareaAutosizeModule() {
    }
    TextareaAutosizeModule = __decorate([
        NgModule({
            declarations: [TextareaAutosize],
            exports: [TextareaAutosize],
            imports: [IonicModule]
        })
    ], TextareaAutosizeModule);
    return TextareaAutosizeModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { TextareaAutosizeModule, TextareaAutosize as ɵa };
//# sourceMappingURL=textarea-autosize-module.js.map
