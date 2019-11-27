import { __awaiter, __generator, __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { ElementRef, HostListener, Directive, NgModule } from '@angular/core';
import { Platform, IonicModule } from '@ionic/angular';
import { ViewObserver } from '@co.mmons/ionic-extensions/view-observer';
import { sleep } from '@co.mmons/js-utils/core';

var VirtualScrollHelper = /** @class */ (function () {
    function VirtualScrollHelper(element, platform) {
        this.element = element;
        this.platform = platform;
    }
    VirtualScrollHelper.prototype.contentScrolled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scroll_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.scheduleRerender && this.viewObserver.isActive())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.content.getScrollElement()];
                    case 1:
                        scroll_1 = _a.sent();
                        this.scrollPosition = scroll_1.scrollTop;
                        this.scrollHeight = scroll_1.scrollHeight;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    VirtualScrollHelper.prototype.markAsDirtyWhenInactive = function () {
        if (!this.viewObserver.isActive()) {
            this.scheduleRerender = true;
        }
    };
    VirtualScrollHelper.prototype.activated = function () {
        if (this.scheduleRerender) {
            this.rerender();
        }
    };
    VirtualScrollHelper.prototype.rerender = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scroll, lastScrollHeight, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.element.nativeElement.checkRange(0)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.content.getScrollElement()];
                    case 2:
                        scroll = _a.sent();
                        lastScrollHeight = this.scrollHeight ? this.scrollHeight : scroll.scrollHeight;
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < 20)) return [3 /*break*/, 6];
                        scroll.scrollTop = this.scrollPosition;
                        return [4 /*yield*/, sleep(100)];
                    case 4:
                        _a.sent();
                        if (scroll.scrollTop === this.scrollPosition) {
                            return [3 /*break*/, 6];
                        }
                        if (lastScrollHeight === scroll.scrollHeight) {
                            return [3 /*break*/, 6];
                        }
                        else {
                            lastScrollHeight = scroll.scrollHeight;
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VirtualScrollHelper.prototype.ngOnInit = function () {
        var _this = this;
        this.content = this.element.nativeElement.closest("ion-content");
        this.content.scrollEvents = true;
        this.content.addEventListener("ionScrollEnd", this.contentScrollEndListener = function () { return _this.contentScrolled(); });
        this.viewObserver = new ViewObserver(this.content, this.platform);
        this.activationSubscription = this.viewObserver.activated.subscribe(function () { return _this.activated(); });
    };
    VirtualScrollHelper.prototype.ngOnDestroy = function () {
        this.content.removeEventListener("ionScrollEnd", this.contentScrollEndListener);
        this.activationSubscription.unsubscribe();
        this.viewObserver.destroy();
    };
    VirtualScrollHelper.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Platform }
    ]; };
    __decorate([
        HostListener("window:resize")
    ], VirtualScrollHelper.prototype, "markAsDirtyWhenInactive", null);
    VirtualScrollHelper = __decorate([
        Directive({
            selector: "ion-virtual-scroll",
        })
    ], VirtualScrollHelper);
    return VirtualScrollHelper;
}());

var VirtualScrollHelperModule = /** @class */ (function () {
    function VirtualScrollHelperModule() {
    }
    VirtualScrollHelperModule = __decorate([
        NgModule({
            declarations: [VirtualScrollHelper],
            exports: [VirtualScrollHelper],
            imports: [CommonModule, IonicModule],
        })
    ], VirtualScrollHelperModule);
    return VirtualScrollHelperModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { VirtualScrollHelper, VirtualScrollHelperModule };
//# sourceMappingURL=virtual-scroll-helper-module.js.map
