import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ViewObserver } from "@co.mmons/ionic-extensions/view-observer";
import { sleep } from "@co.mmons/js-utils/core";
import { Platform } from "@ionic/angular";
let VirtualScrollHelper = class VirtualScrollHelper {
    constructor(element, platform) {
        this.element = element;
        this.platform = platform;
    }
    contentScrolled() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.scheduleRerender && this.viewObserver.isActive()) {
                this.scrollPosition = (yield this.content.getScrollElement()).scrollTop;
            }
        });
    }
    markAsDirtyWhenInactive() {
        if (!this.viewObserver.isActive()) {
            this.scheduleRerender = true;
        }
    }
    rerender() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.element.nativeElement.checkRange(0);
            const scroll = yield this.content.getScrollElement();
            for (let i = 0; i < 20; i++) {
                scroll.scrollTop = this.scrollPosition;
                if (scroll.scrollTop === this.scrollPosition || scroll.scrollHeight < this.scrollPosition) {
                    break;
                }
                yield sleep(100);
            }
        });
    }
    ngOnInit() {
        this.content = this.element.nativeElement.closest("ion-content");
        this.content.scrollEvents = true;
        this.content.addEventListener("ionScrollEnd", this.contentScrollEndListener = () => this.contentScrolled());
        this.viewObserver = new ViewObserver(this.content, this.platform);
    }
    ngOnDestroy() {
        this.content.removeEventListener("ionScrollEnd", this.contentScrollEndListener);
        this.viewObserver.destroy();
    }
};
VirtualScrollHelper.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform }
];
tslib_1.__decorate([
    HostListener("window:resize")
], VirtualScrollHelper.prototype, "markAsDirtyWhenInactive", null);
VirtualScrollHelper = tslib_1.__decorate([
    Directive({
        selector: "ion-virtual-scroll",
    })
], VirtualScrollHelper);
export { VirtualScrollHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUt4QyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUU1QixZQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6RyxDQUFDO0lBWWEsZUFBZTs7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDM0U7UUFDTCxDQUFDO0tBQUE7SUFHRCx1QkFBdUI7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFSyxRQUFROztZQUVWLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBRXJELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pCLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFFdkMsSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFO29CQUN2RixNQUFNO2lCQUNUO2dCQUVELE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQztLQUFBO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFFNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsY0FBcUIsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDSixDQUFBOztZQXZEeUMsVUFBVTtZQUFpRCxRQUFROztBQW9Cekc7SUFEQyxZQUFZLENBQUMsZUFBZSxDQUFDO2tFQUs3QjtBQTFCUSxtQkFBbUI7SUFIL0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtLQUNqQyxDQUFDO0dBQ1csbUJBQW1CLENBeUQvQjtTQXpEWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Vmlld09ic2VydmVyfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlldy1vYnNlcnZlclwiO1xuaW1wb3J0IHtzbGVlcH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLXZpcnR1YWwtc2Nyb2xsXCIsXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxIZWxwZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElvblZpcnR1YWxTY3JvbGxFbGVtZW50PiwgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpZXdPYnNlcnZlcjogVmlld09ic2VydmVyO1xuXG4gICAgcHJpdmF0ZSBzY2hlZHVsZVJlcmVuZGVyOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBjb250ZW50OiBIVE1MSW9uQ29udGVudEVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIGNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcjogKGV2OiBFdmVudCkgPT4gdm9pZDtcblxuICAgIHByaXZhdGUgYXN5bmMgY29udGVudFNjcm9sbGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2NoZWR1bGVSZXJlbmRlciAmJiB0aGlzLnZpZXdPYnNlcnZlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFBvc2l0aW9uID0gKGF3YWl0IHRoaXMuY29udGVudC5nZXRTY3JvbGxFbGVtZW50KCkpLnNjcm9sbFRvcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIpXG4gICAgbWFya0FzRGlydHlXaGVuSW5hY3RpdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy52aWV3T2JzZXJ2ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHJlcmVuZGVyKCkge1xuXG4gICAgICAgIGF3YWl0IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrUmFuZ2UoMCk7XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsID0gYXdhaXQgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgIHNjcm9sbC5zY3JvbGxUb3AgPSB0aGlzLnNjcm9sbFBvc2l0aW9uO1xuXG4gICAgICAgICAgICBpZiAoc2Nyb2xsLnNjcm9sbFRvcCA9PT0gdGhpcy5zY3JvbGxQb3NpdGlvbiB8fCBzY3JvbGwuc2Nyb2xsSGVpZ2h0IDwgdGhpcy5zY3JvbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCBzbGVlcCgxMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tY29udGVudFwiKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNjcm9sbEV2ZW50cyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIsIHRoaXMuY29udGVudFNjcm9sbEVuZExpc3RlbmVyID0gKCkgPT4gdGhpcy5jb250ZW50U2Nyb2xsZWQoKSk7XG5cbiAgICAgICAgdGhpcy52aWV3T2JzZXJ2ZXIgPSBuZXcgVmlld09ic2VydmVyKHRoaXMuY29udGVudCwgdGhpcy5wbGF0Zm9ybSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIgYXMgYW55LCB0aGlzLmNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMudmlld09ic2VydmVyLmRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=