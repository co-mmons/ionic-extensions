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
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this.scheduleRerender && this.viewObserver.isActive())) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.content.getScrollElement()];
                    case 1:
                        _a.scrollPosition = (_b.sent()).scrollTop;
                        _b.label = 2;
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
            var scroll, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.element.nativeElement.checkRange(0)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.content.getScrollElement()];
                    case 2:
                        scroll = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < 20)) return [3 /*break*/, 6];
                        scroll.scrollTop = this.scrollPosition;
                        if (scroll.scrollTop === this.scrollPosition || scroll.scrollHeight < this.scrollPosition) {
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, sleep(100)];
                    case 4:
                        _a.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QztJQUVJLDZCQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6RyxDQUFDO0lBY2EsNkNBQWUsR0FBN0I7Ozs7Ozs2QkFDUSxDQUFBLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUEsRUFBdEQsd0JBQXNEO3dCQUN0RCxLQUFBLElBQUksQ0FBQTt3QkFBbUIscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzt3QkFBNUQsR0FBSyxjQUFjLEdBQUcsQ0FBQyxTQUFxQyxDQUFDLENBQUMsU0FBUyxDQUFDOzs7Ozs7S0FFL0U7SUFHRCxxREFBdUIsR0FBdkI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVPLHVDQUFTLEdBQWpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVLLHNDQUFRLEdBQWQ7Ozs7OzRCQUVJLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBQTs7d0JBQTlDLFNBQThDLENBQUM7d0JBRWhDLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBQTs7d0JBQTlDLE1BQU0sR0FBRyxTQUFxQzt3QkFFM0MsQ0FBQyxHQUFHLENBQUM7Ozs2QkFBRSxDQUFBLENBQUMsR0FBRyxFQUFFLENBQUE7d0JBQ2xCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzt3QkFFdkMsSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFOzRCQUN2Rix3QkFBTTt5QkFDVDt3QkFFRCxxQkFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUE7O3dCQUFoQixTQUFnQixDQUFDOzs7d0JBUEcsQ0FBQyxFQUFFLENBQUE7Ozs7OztLQVM5QjtJQUVELHNDQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1FBRTVHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLGNBQXFCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Z0JBaEVxQyxVQUFVO2dCQUFpRCxRQUFROztJQXNCekc7UUFEQyxZQUFZLENBQUMsZUFBZSxDQUFDO3NFQUs3QjtJQTVCUSxtQkFBbUI7UUFIL0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG9CQUFvQjtTQUNqQyxDQUFDO09BQ1csbUJBQW1CLENBbUUvQjtJQUFELDBCQUFDO0NBQUEsQUFuRUQsSUFtRUM7U0FuRVksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZpZXdPYnNlcnZlcn0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3ZpZXctb2JzZXJ2ZXJcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLXZpcnR1YWwtc2Nyb2xsXCIsXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxIZWxwZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElvblZpcnR1YWxTY3JvbGxFbGVtZW50PiwgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpZXdPYnNlcnZlcjogVmlld09ic2VydmVyO1xuXG4gICAgcHJpdmF0ZSBzY2hlZHVsZVJlcmVuZGVyOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBjb250ZW50OiBIVE1MSW9uQ29udGVudEVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIGNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcjogKGV2OiBFdmVudCkgPT4gdm9pZDtcblxuICAgIHByaXZhdGUgYWN0aXZhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJpdmF0ZSBhc3luYyBjb250ZW50U2Nyb2xsZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zY2hlZHVsZVJlcmVuZGVyICYmIHRoaXMudmlld09ic2VydmVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsUG9zaXRpb24gPSAoYXdhaXQgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKSkuc2Nyb2xsVG9wO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIilcbiAgICBtYXJrQXNEaXJ0eVdoZW5JbmFjdGl2ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdPYnNlcnZlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVyZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHJlcmVuZGVyKCkge1xuXG4gICAgICAgIGF3YWl0IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrUmFuZ2UoMCk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsID0gYXdhaXQgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgIHNjcm9sbC5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbFBvc2l0aW9uO1xuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsLnNjcm9sbFRvcCA9PT0gdGhpcy5zY3JvbGxQb3NpdGlvbiB8fCBzY3JvbGwuc2Nyb2xsSGVpZ2h0IDwgdGhpcy5zY3JvbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCBzbGVlcCgxMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tY29udGVudFwiKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNjcm9sbEV2ZW50cyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIsIHRoaXMuY29udGVudFNjcm9sbEVuZExpc3RlbmVyID0gKCkgPT4gdGhpcy5jb250ZW50U2Nyb2xsZWQoKSk7XG5cbiAgICAgICAgdGhpcy52aWV3T2JzZXJ2ZXIgPSBuZXcgVmlld09ic2VydmVyKHRoaXMuY29udGVudCwgdGhpcy5wbGF0Zm9ybSk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMudmlld09ic2VydmVyLmFjdGl2YXRlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hY3RpdmF0ZWQoKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIgYXMgYW55LCB0aGlzLmNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnZpZXdPYnNlcnZlci5kZXN0cm95KCk7XG4gICAgfVxufVxuIl19