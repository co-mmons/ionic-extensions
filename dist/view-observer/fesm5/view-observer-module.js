import { __awaiter, __generator } from 'tslib';
import { EventEmitter } from '@angular/core';

var ViewObserver = /** @class */ (function () {
    function ViewObserver(content, platform) {
        var _this = this;
        this.content = content;
        this.platform = platform;
        this.activated = new EventEmitter();
        this.content.parentElement.addEventListener("ionViewDidEnter", this.didEnterListener = function () { return _this.viewDidEnter(); });
        this.content.parentElement.addEventListener("ionViewDidLeave", this.didLeaveListener = function () { return _this.viewDidLeave(); });
        this.resumeSubscription = this.platform.resume.subscribe(function () { return _this.whenResumed(); });
        this.pauseSubscription = this.platform.pause.subscribe(function () { return _this.whenPaused(); });
        this.visible = !this.content.parentElement.classList.contains("ion-page-hidden");
    }
    ViewObserver.prototype.viewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.visible = true;
                if (!this.paused) {
                    this.activated.next();
                }
                return [2 /*return*/];
            });
        });
    };
    ViewObserver.prototype.viewDidLeave = function () {
        this.visible = false;
    };
    ViewObserver.prototype.whenPaused = function () {
        this.paused = true;
    };
    ViewObserver.prototype.whenResumed = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.paused = false;
                if (this.visible) {
                    this.activated.next();
                }
                return [2 /*return*/];
            });
        });
    };
    ViewObserver.prototype.isActive = function () {
        return this.visible && !this.paused;
    };
    ViewObserver.prototype.destroy = function () {
        this.content.removeEventListener("ionViewDidEnter", this.didEnterListener);
        this.content.removeEventListener("ionViewDidLeave", this.didLeaveListener);
        this.resumeSubscription.unsubscribe();
        this.pauseSubscription.unsubscribe();
        this.activated.unsubscribe();
        this.content = undefined;
    };
    return ViewObserver;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ViewObserver };
//# sourceMappingURL=view-observer-module.js.map
