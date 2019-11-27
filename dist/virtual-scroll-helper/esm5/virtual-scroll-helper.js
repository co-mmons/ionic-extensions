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
                        scroll_2.scrollTop = this.scrollHeight * (this.scrollPosition / this.scrollHeight);
                        return [4 /*yield*/, sleep(100)];
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
                        scroll_2.scrollTop = this.scrollHeight * (this.scrollPosition / this.scrollHeight);
                        _a.label = 7;
                    case 7:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QztJQUVJLDZCQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUtqRyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7SUFKckMsQ0FBQztJQW1CYSw2Q0FBZSxHQUE3Qjs7Ozs7OzZCQUNRLENBQUEsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFBLEVBQTFELHdCQUEwRDt3QkFDM0MscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFBOzt3QkFBOUMsV0FBUyxTQUFxQzt3QkFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFNLENBQUMsU0FBUyxDQUFDO3dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQU0sQ0FBQyxZQUFZLENBQUM7Ozs7OztLQUUvQztJQUdELHFEQUF1QixHQUF2QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxD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QkFBbUIsQ0FBQyxjQUFxQixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7O2dCQWpHcUMsVUFBVTtnQkFBaUQsUUFBUTs7SUE2QnpHO1FBREMsWUFBWSxDQUFDLGVBQWUsQ0FBQztzRUFLN0I7SUFuQ1EsbUJBQW1CO1FBSC9CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxvQkFBb0I7U0FDakMsQ0FBQztPQUNXLG1CQUFtQixDQW9HL0I7SUFBRCwwQkFBQztDQUFBLEFBcEdELElBb0dDO1NBcEdZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtWaWV3T2JzZXJ2ZXJ9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy92aWV3LW9ic2VydmVyXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcImlvbi12aXJ0dWFsLXNjcm9sbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsSGVscGVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJb25WaXJ0dWFsU2Nyb2xsRWxlbWVudD4sIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aWV3T2JzZXJ2ZXI6IFZpZXdPYnNlcnZlcjtcblxuICAgIHByaXZhdGUgc2NoZWR1bGVSZXJlbmRlcjogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgcmVuZGVyaW5nOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgY29udGVudDogSFRNTElvbkNvbnRlbnRFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBjb250ZW50U2Nyb2xsRW5kTGlzdGVuZXI6IChldjogRXZlbnQpID0+IHZvaWQ7XG5cbiAgICBwcml2YXRlIGFjdGl2YXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuXG4gICAgcHJpdmF0ZSBhc3luYyBjb250ZW50U2Nyb2xsZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPD0gMCAmJiB0aGlzLnZpZXdPYnNlcnZlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGwgPSBhd2FpdCB0aGlzLmNvbnRlbnQuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxQb3NpdGlvbiA9IHNjcm9sbC5zY3JvbGxUb3A7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiKVxuICAgIG1hcmtBc0RpcnR5V2hlbkluYWN0aXZlKCkge1xuICAgICAgICBpZiAoIXRoaXMudmlld09ic2VydmVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlcisrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZXJlbmRlcigpIHtcblxuICAgICAgICBpZiAodGhpcy5yZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlcisrO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGlucHV0U2Nyb2xsUG9zaXRpb24gPSB0aGlzLnNjcm9sbFBvc2l0aW9uO1xuICAgICAgICBjb25zdCBpbnB1dFNjcm9sbEhlaWdodCA9IHRoaXMuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGF3YWl0IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrUmFuZ2UoMCk7XG5cbiAgICAgICAgaWYgKGlucHV0U2Nyb2xsUG9zaXRpb24gPiAwICYmIGlucHV0U2Nyb2xsSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsID0gYXdhaXQgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgbGV0IHNjcm9sbEhlaWdodCA9IHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgICAgICAgICAgIHNjcm9sbC5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbEhlaWdodCAqICh0aGlzLnNjcm9sbFBvc2l0aW9uIC8gdGhpcy5zY3JvbGxIZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGwuc2Nyb2xsSGVpZ2h0ID09PSBzY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcm9sbC5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbEhlaWdodCAqICh0aGlzLnNjcm9sbFBvc2l0aW9uIC8gdGhpcy5zY3JvbGxIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyLS07XG5cbiAgICAgICAgaWYgKHRoaXMuc2NoZWR1bGVSZXJlbmRlciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVyZW5kZXIoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tY29udGVudFwiKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNjcm9sbEV2ZW50cyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIsIHRoaXMuY29udGVudFNjcm9sbEVuZExpc3RlbmVyID0gKCkgPT4gdGhpcy5jb250ZW50U2Nyb2xsZWQoKSk7XG5cbiAgICAgICAgdGhpcy52aWV3T2JzZXJ2ZXIgPSBuZXcgVmlld09ic2VydmVyKHRoaXMuY29udGVudCwgdGhpcy5wbGF0Zm9ybSk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMudmlld09ic2VydmVyLmFjdGl2YXRlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hY3RpdmF0ZWQoKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIgYXMgYW55LCB0aGlzLmNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnZpZXdPYnNlcnZlci5kZXN0cm95KCk7XG4gICAgfVxufVxuIl19