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
            var inputScrollPosition, inputScrollHeight, scroll_2, scrollHeight, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.rendering) {
                            this.scheduleRerender++;
                            return [2 /*return*/];
                        }
                        this.rendering = true;
                        inputScrollPosition = this.scrollPosition;
                        inputScrollHeight = this.scrollHeight;
                        return [4 /*yield*/, this.element.nativeElement.checkRange(0)];
                    case 1:
                        _a.sent();
                        if (!(inputScrollPosition > 0 && inputScrollHeight > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.content.getScrollElement()];
                    case 2:
                        scroll_2 = _a.sent();
                        scrollHeight = scroll_2.scrollHeight;
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < 20)) return [3 /*break*/, 6];
                        return [4 /*yield*/, sleep(50)];
                    case 4:
                        _a.sent();
                        if (scroll_2.scrollHeight === scrollHeight) {
                            return [3 /*break*/, 6];
                        }
                        else {
                            scrollHeight = scroll_2.scrollHeight;
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        scroll_2.scrollTop = scroll_2.scrollHeight * (this.scrollPosition / this.scrollHeight);
                        _a.label = 7;
                    case 7:
                        this.rendering = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QztJQUVJLDZCQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUtqRyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7SUFKckMsQ0FBQztJQW1CYSw2Q0FBZSxHQUE3Qjs7Ozs7OzZCQUNRLENBQUEsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFBLEVBQTFELHdCQUEwRDt3QkFDM0MscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzt3QkFBOUMsV0FBUyxTQUFxQzt3QkFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFNLENBQUMsU0FBUyxDQUFDO3dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQU0sQ0FBQyxZQUFZLENBQUM7Ozs7OztLQUUvQztJQUdELHFEQUF1QixHQUF2QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxD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QUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDOztnQkFoR3FDLFVBQVU7Z0JBQWlELFFBQVE7O0lBNkJ6RztRQURDLFlBQVksQ0FBQyxlQUFlLENBQUM7c0VBSzdCO0lBbkNRLG1CQUFtQjtRQUgvQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1NBQ2pDLENBQUM7T0FDVyxtQkFBbUIsQ0FtRy9CO0lBQUQsMEJBQUM7Q0FBQSxBQW5HRCxJQW1HQztTQW5HWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Vmlld09ic2VydmVyfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlldy1vYnNlcnZlclwiO1xuaW1wb3J0IHtzbGVlcH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24tdmlydHVhbC1zY3JvbGxcIixcbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbEhlbHBlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW9uVmlydHVhbFNjcm9sbEVsZW1lbnQ+LCBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgIH1cblxuICAgIHByaXZhdGUgdmlld09ic2VydmVyOiBWaWV3T2JzZXJ2ZXI7XG5cbiAgICBwcml2YXRlIHNjaGVkdWxlUmVyZW5kZXI6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHJlbmRlcmluZzogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgc2Nyb2xsUG9zaXRpb246IG51bWJlcjtcblxuICAgIHByaXZhdGUgc2Nyb2xsSGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGNvbnRlbnQ6IEhUTUxJb25Db250ZW50RWxlbWVudDtcblxuICAgIHByaXZhdGUgY29udGVudFNjcm9sbEVuZExpc3RlbmVyOiAoZXY6IEV2ZW50KSA9PiB2b2lkO1xuXG4gICAgcHJpdmF0ZSBhY3RpdmF0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cblxuICAgIHByaXZhdGUgYXN5bmMgY29udGVudFNjcm9sbGVkKCkge1xuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyIDw9IDAgJiYgdGhpcy52aWV3T2JzZXJ2ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsID0gYXdhaXQgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsUG9zaXRpb24gPSBzY3JvbGwuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSBzY3JvbGwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIilcbiAgICBtYXJrQXNEaXJ0eVdoZW5JbmFjdGl2ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdPYnNlcnZlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXIrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWN0aXZhdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVyZW5kZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucmVuZGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXIrKztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyaW5nID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBpbnB1dFNjcm9sbFBvc2l0aW9uID0gdGhpcy5zY3JvbGxQb3NpdGlvbjtcbiAgICAgICAgY29uc3QgaW5wdXRTY3JvbGxIZWlnaHQgPSB0aGlzLnNjcm9sbEhlaWdodDtcblxuICAgICAgICBhd2FpdCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja1JhbmdlKDApO1xuXG4gICAgICAgIGlmIChpbnB1dFNjcm9sbFBvc2l0aW9uID4gMCAmJiBpbnB1dFNjcm9sbEhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbCA9IGF3YWl0IHRoaXMuY29udGVudC5nZXRTY3JvbGxFbGVtZW50KCk7XG5cbiAgICAgICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSBzY3JvbGwuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzbGVlcCg1MCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsLnNjcm9sbEhlaWdodCA9PT0gc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEhlaWdodCA9IHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY3JvbGwuc2Nyb2xsVG9wID0gc2Nyb2xsLnNjcm9sbEhlaWdodCAqICh0aGlzLnNjcm9sbFBvc2l0aW9uIC8gdGhpcy5zY3JvbGxIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyLS07XG5cbiAgICAgICAgaWYgKHRoaXMuc2NoZWR1bGVSZXJlbmRlciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVyZW5kZXIoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tY29udGVudFwiKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNjcm9sbEV2ZW50cyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIsIHRoaXMuY29udGVudFNjcm9sbEVuZExpc3RlbmVyID0gKCkgPT4gdGhpcy5jb250ZW50U2Nyb2xsZWQoKSk7XG5cbiAgICAgICAgdGhpcy52aWV3T2JzZXJ2ZXIgPSBuZXcgVmlld09ic2VydmVyKHRoaXMuY29udGVudCwgdGhpcy5wbGF0Zm9ybSk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMudmlld09ic2VydmVyLmFjdGl2YXRlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hY3RpdmF0ZWQoKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIgYXMgYW55LCB0aGlzLmNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnZpZXdPYnNlcnZlci5kZXN0cm95KCk7XG4gICAgfVxufVxuIl19