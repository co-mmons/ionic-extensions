import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ViewObserver } from "@co.mmons/ionic-extensions/view-observer";
import { sleep } from "@co.mmons/js-utils/core";
import { Platform } from "@ionic/angular";
var VirtualScrollHelper = /** @class */ (function () {
    function VirtualScrollHelper(element, platform) {
        this.element = element;
        this.platform = platform;
        this.scheduleRerender = 0;
    }
    VirtualScrollHelper.prototype.contentScrolled = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scroll_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.scheduleRerender <= 0 && this.viewObserver.isActive())) return [3 /*break*/, 2];
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
            this.scheduleRerender++;
        }
    };
    VirtualScrollHelper.prototype.activated = function () {
        if (this.scheduleRerender > 0) {
            this.rerender();
        }
    };
    VirtualScrollHelper.prototype.rerender = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scrollPosition, scrollHeight, scrollPoint, scroll_2, i, point;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.rendering) {
                            this.scheduleRerender++;
                            return [2 /*return*/];
                        }
                        this.rendering = true;
                        scrollPosition = this.scrollPosition;
                        scrollHeight = this.scrollHeight;
                        scrollPoint = Math.round((this.scrollPosition / this.scrollHeight) * 100);
                        return [4 /*yield*/, this.element.nativeElement.checkRange(0)];
                    case 1:
                        _a.sent();
                        if (!(scrollPosition > 0 && scrollHeight > 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.content.getScrollElement()];
                    case 2:
                        scroll_2 = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < 20)) return [3 /*break*/, 6];
                        scroll_2.scrollTop = this.scrollPosition;
                        return [4 /*yield*/, sleep(100)];
                    case 4:
                        _a.sent();
                        point = Math.round((this.scrollPosition / scroll_2.scrollTop) * 100);
                        console.log(point, scrollPoint);
                        if (point === scrollPoint) {
                            return [3 /*break*/, 6];
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        this.scheduleRerender--;
                        if (this.scheduleRerender > 0) {
                            this.rerender();
                        }
                        else if (this.scheduleRerender < 0) {
                            this.scheduleRerender = 0;
                        }
                        return [2 /*return*/];
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
    tslib_1.__decorate([
        HostListener("window:resize")
    ], VirtualScrollHelper.prototype, "markAsDirtyWhenInactive", null);
    VirtualScrollHelper = tslib_1.__decorate([
        Directive({
            selector: "ion-virtual-scroll",
        })
    ], VirtualScrollHelper);
    return VirtualScrollHelper;
}());
export { VirtualScrollHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QztJQUVJLDZCQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUtqRyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7SUFKckMsQ0FBQztJQW1CYSw2Q0FBZSxHQUE3Qjs7Ozs7OzZCQUNRLENBQUEsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFBLEVBQTFELHdCQUEwRDt3QkFDM0MscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzt3QkFBOUMsV0FBUyxTQUFxQzt3QkFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFNLENBQUMsU0FBUyxDQUFDO3dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQU0sQ0FBQyxZQUFZLENBQUM7Ozs7OztLQUUvQztJQUdELHFEQUF1QixHQUF2QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxD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LG1CQUFtQixDQUFDLGNBQXFCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Z0JBOUZxQyxVQUFVO2dCQUFpRCxRQUFROztJQTZCekc7UUFEQyxZQUFZLENBQUMsZUFBZSxDQUFDO3NFQUs3QjtJQW5DUSxtQkFBbUI7UUFIL0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG9CQUFvQjtTQUNqQyxDQUFDO09BQ1csbUJBQW1CLENBaUcvQjtJQUFELDBCQUFDO0NBQUEsQUFqR0QsSUFpR0M7U0FqR1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZpZXdPYnNlcnZlcn0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3ZpZXctb2JzZXJ2ZXJcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLXZpcnR1YWwtc2Nyb2xsXCIsXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxIZWxwZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElvblZpcnR1YWxTY3JvbGxFbGVtZW50PiwgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpZXdPYnNlcnZlcjogVmlld09ic2VydmVyO1xuXG4gICAgcHJpdmF0ZSBzY2hlZHVsZVJlcmVuZGVyOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSByZW5kZXJpbmc6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIHNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHNjcm9sbEhlaWdodDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBjb250ZW50OiBIVE1MSW9uQ29udGVudEVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIGNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcjogKGV2OiBFdmVudCkgPT4gdm9pZDtcblxuICAgIHByaXZhdGUgYWN0aXZhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG5cbiAgICBwcml2YXRlIGFzeW5jIGNvbnRlbnRTY3JvbGxlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NoZWR1bGVSZXJlbmRlciA8PSAwICYmIHRoaXMudmlld09ic2VydmVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbCA9IGF3YWl0IHRoaXMuY29udGVudC5nZXRTY3JvbGxFbGVtZW50KCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFBvc2l0aW9uID0gc2Nyb2xsLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIpXG4gICAgbWFya0FzRGlydHlXaGVuSW5hY3RpdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy52aWV3T2JzZXJ2ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFjdGl2YXRlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NoZWR1bGVSZXJlbmRlciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVyZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHJlcmVuZGVyKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnJlbmRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyKys7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcmluZyA9IHRydWU7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLnNjcm9sbFBvc2l0aW9uO1xuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSB0aGlzLnNjcm9sbEhlaWdodDtcbiAgICAgICAgY29uc3Qgc2Nyb2xsUG9pbnQgPSBNYXRoLnJvdW5kKCh0aGlzLnNjcm9sbFBvc2l0aW9uIC8gdGhpcy5zY3JvbGxIZWlnaHQpICogMTAwKTtcblxuICAgICAgICBhd2FpdCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja1JhbmdlKDApO1xuXG4gICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+IDAgJiYgc2Nyb2xsSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsID0gYXdhaXQgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsLnNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsUG9zaXRpb247XG5cbiAgICAgICAgICAgICAgICBhd2FpdCBzbGVlcCgxMDApO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBNYXRoLnJvdW5kKCh0aGlzLnNjcm9sbFBvc2l0aW9uIC8gc2Nyb2xsLnNjcm9sbFRvcCkgKiAxMDApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvaW50LCBzY3JvbGxQb2ludCk7XG4gICAgICAgICAgICAgICAgaWYgKHBvaW50ID09PSBzY3JvbGxQb2ludCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXItLTtcblxuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NoZWR1bGVSZXJlbmRlciA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlciA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1jb250ZW50XCIpO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2Nyb2xsRXZlbnRzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpb25TY3JvbGxFbmRcIiwgdGhpcy5jb250ZW50U2Nyb2xsRW5kTGlzdGVuZXIgPSAoKSA9PiB0aGlzLmNvbnRlbnRTY3JvbGxlZCgpKTtcblxuICAgICAgICB0aGlzLnZpZXdPYnNlcnZlciA9IG5ldyBWaWV3T2JzZXJ2ZXIodGhpcy5jb250ZW50LCB0aGlzLnBsYXRmb3JtKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy52aWV3T2JzZXJ2ZXIuYWN0aXZhdGVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmFjdGl2YXRlZCgpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJpb25TY3JvbGxFbmRcIiBhcyBhbnksIHRoaXMuY29udGVudFNjcm9sbEVuZExpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudmlld09ic2VydmVyLmRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=