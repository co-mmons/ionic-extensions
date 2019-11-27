import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ViewObserver } from "@co.mmons/ionic-extensions/view-observer";
import { sleep } from "@co.mmons/js-utils/core";
import { Platform } from "@ionic/angular";
var VirtualScrollHelper = /** @class */ (function () {
    function VirtualScrollHelper(element, platform) {
        this.element = element;
        this.platform = platform;
    }
    VirtualScrollHelper.prototype.contentScrolled = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scroll_1;
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scroll, lastScrollHeight, i;
            return tslib_1.__generator(this, function (_a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QztJQUVJLDZCQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6RyxDQUFDO0lBZ0JhLDZDQUFlLEdBQTdCOzs7Ozs7NkJBQ1EsQ0FBQSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFBLEVBQXRELHdCQUFzRDt3QkFDdkMscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzt3QkFBOUMsV0FBUyxTQUFxQzt3QkFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFNLENBQUMsU0FBUyxDQUFDO3dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQU0sQ0FBQyxZQUFZLENBQUM7Ozs7OztLQUUvQztJQUdELHFEQUF1QixHQUF2QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7SUFDTCxDQUFDO0lBRU8sdUNBQVMsR0FBakI7UUFDSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUssc0NBQVEsR0FBZDs7Ozs7NEJBRUkscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFBOzt3QkFBOUMsU0FBOEMsQ0FBQzt3QkFFaEMscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzt3QkFBOUMsTUFBTSxHQUFHLFNBQXFDO3dCQUNoRCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO3dCQUUxRSxDQUFDLEdBQUcsQ0FBQzs7OzZCQUFFLENBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDbEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO3dCQUV2QyxxQkFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUE7O3dCQUFoQixTQUFnQixDQUFDO3dCQUVqQixJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLGNBQWMsRUFBRTs0QkFDMUMsd0JBQU07eUJBQ1Q7d0JBRUQsSUFBSSxnQkFBZ0IsS0FBSyxNQUFNLENBQUMsWUFBWSxFQUFFOzRCQUMxQyx3QkFBTTt5QkFDVDs2QkFBTTs0QkFDSCxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO3lCQUMxQzs7O3dCQWJtQixDQUFDLEVBQUUsQ0FBQTs7Ozs7O0tBZTlCO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLGVBQWUsRUFBRSxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFFNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxFQUFFLEVBQWhCLENBQWdCLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsY0FBcUIsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDOztnQkEzRXFDLFVBQVU7Z0JBQWlELFFBQVE7O0lBMEJ6RztRQURDLFlBQVksQ0FBQyxlQUFlLENBQUM7c0VBSzdCO0lBaENRLG1CQUFtQjtRQUgvQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1NBQ2pDLENBQUM7T0FDVyxtQkFBbUIsQ0E4RS9CO0lBQUQsMEJBQUM7Q0FBQSxBQTlFRCxJQThFQztTQTlFWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Vmlld09ic2VydmVyfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlldy1vYnNlcnZlclwiO1xuaW1wb3J0IHtzbGVlcH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24tdmlydHVhbC1zY3JvbGxcIixcbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbEhlbHBlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW9uVmlydHVhbFNjcm9sbEVsZW1lbnQ+LCBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgIH1cblxuICAgIHByaXZhdGUgdmlld09ic2VydmVyOiBWaWV3T2JzZXJ2ZXI7XG5cbiAgICBwcml2YXRlIHNjaGVkdWxlUmVyZW5kZXI6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIHNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHNjcm9sbEhlaWdodDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBjb250ZW50OiBIVE1MSW9uQ29udGVudEVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIGNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcjogKGV2OiBFdmVudCkgPT4gdm9pZDtcblxuICAgIHByaXZhdGUgYWN0aXZhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJpdmF0ZSBhc3luYyBjb250ZW50U2Nyb2xsZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zY2hlZHVsZVJlcmVuZGVyICYmIHRoaXMudmlld09ic2VydmVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbCA9IGF3YWl0IHRoaXMuY29udGVudC5nZXRTY3JvbGxFbGVtZW50KCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFBvc2l0aW9uID0gc2Nyb2xsLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIpXG4gICAgbWFya0FzRGlydHlXaGVuSW5hY3RpdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy52aWV3T2JzZXJ2ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWN0aXZhdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZXJlbmRlcigpIHtcblxuICAgICAgICBhd2FpdCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja1JhbmdlKDApO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IGF3YWl0IHRoaXMuY29udGVudC5nZXRTY3JvbGxFbGVtZW50KCk7XG4gICAgICAgIGxldCBsYXN0U2Nyb2xsSGVpZ2h0ID0gdGhpcy5zY3JvbGxIZWlnaHQgPyB0aGlzLnNjcm9sbEhlaWdodCA6IHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgICAgICBzY3JvbGwuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxQb3NpdGlvbjtcblxuICAgICAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcblxuICAgICAgICAgICAgaWYgKHNjcm9sbC5zY3JvbGxUb3AgPT09IHRoaXMuc2Nyb2xsUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxhc3RTY3JvbGxIZWlnaHQgPT09IHNjcm9sbC5zY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGFzdFNjcm9sbEhlaWdodCA9IHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1jb250ZW50XCIpO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2Nyb2xsRXZlbnRzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpb25TY3JvbGxFbmRcIiwgdGhpcy5jb250ZW50U2Nyb2xsRW5kTGlzdGVuZXIgPSAoKSA9PiB0aGlzLmNvbnRlbnRTY3JvbGxlZCgpKTtcblxuICAgICAgICB0aGlzLnZpZXdPYnNlcnZlciA9IG5ldyBWaWV3T2JzZXJ2ZXIodGhpcy5jb250ZW50LCB0aGlzLnBsYXRmb3JtKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy52aWV3T2JzZXJ2ZXIuYWN0aXZhdGVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmFjdGl2YXRlZCgpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJpb25TY3JvbGxFbmRcIiBhcyBhbnksIHRoaXMuY29udGVudFNjcm9sbEVuZExpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudmlld09ic2VydmVyLmRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=