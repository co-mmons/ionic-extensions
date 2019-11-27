import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ViewObserver } from "@co.mmons/ionic-extensions/view-observer";
import { sleep } from "@co.mmons/js-utils/core";
import { Platform } from "@ionic/angular";
let VirtualScrollHelper = class VirtualScrollHelper {
    constructor(element, platform) {
        this.element = element;
        this.platform = platform;
        this.scheduleRerender = 0;
    }
    contentScrolled() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.scheduleRerender <= 0 && this.viewObserver.isActive()) {
                const scroll = yield this.content.getScrollElement();
                this.scrollPosition = scroll.scrollTop;
                this.scrollHeight = scroll.scrollHeight;
            }
        });
    }
    markAsDirtyWhenInactive() {
        if (!this.viewObserver.isActive()) {
            this.scheduleRerender++;
        }
    }
    activated() {
        if (this.scheduleRerender > 0) {
            this.rerender();
        }
    }
    rerender() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.rendering) {
                this.scheduleRerender++;
                return;
            }
            this.rendering = true;
            const inputScrollPosition = this.scrollPosition;
            const inputScrollHeight = this.scrollHeight;
            yield this.element.nativeElement.checkRange(0);
            if (inputScrollPosition > 0 && inputScrollHeight > 0) {
                const scroll = yield this.content.getScrollElement();
                let scrollHeight = scroll.scrollHeight;
                for (let i = 0; i < 20; i++) {
                    scroll.scrollTop = this.scrollHeight * (this.scrollPosition / this.scrollHeight);
                    yield sleep(100);
                    if (scroll.scrollHeight === scrollHeight) {
                        break;
                    }
                    else {
                        scrollHeight = scroll.scrollHeight;
                    }
                }
                scroll.scrollTop = this.scrollHeight * (this.scrollPosition / this.scrollHeight);
            }
            this.scheduleRerender--;
            if (this.scheduleRerender > 0) {
                this.rerender();
            }
            else if (this.scheduleRerender < 0) {
                this.scheduleRerender = 0;
            }
        });
    }
    ngOnInit() {
        this.content = this.element.nativeElement.closest("ion-content");
        this.content.scrollEvents = true;
        this.content.addEventListener("ionScrollEnd", this.contentScrollEndListener = () => this.contentScrolled());
        this.viewObserver = new ViewObserver(this.content, this.platform);
        this.activationSubscription = this.viewObserver.activated.subscribe(() => this.activated());
    }
    ngOnDestroy() {
        this.content.removeEventListener("ionScrollEnd", this.contentScrollEndListener);
        this.activationSubscription.unsubscribe();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUU1QixZQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUtqRyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7SUFKckMsQ0FBQztJQW1CYSxlQUFlOztZQUN6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDNUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2FBQzNDO1FBQ0wsQ0FBQztLQUFBO0lBR0QsdUJBQXVCO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0Is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QUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDSixDQUFBOztZQWxHeUMsVUFBVTtZQUFpRCxRQUFROztBQTZCekc7SUFEQyxZQUFZLENBQUMsZUFBZSxDQUFDO2tFQUs3QjtBQW5DUSxtQkFBbUI7SUFIL0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtLQUNqQyxDQUFDO0dBQ1csbUJBQW1CLENBb0cvQjtTQXBHWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Vmlld09ic2VydmVyfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlldy1vYnNlcnZlclwiO1xuaW1wb3J0IHtzbGVlcH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24tdmlydHVhbC1zY3JvbGxcIixcbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbEhlbHBlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW9uVmlydHVhbFNjcm9sbEVsZW1lbnQ+LCBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgIH1cblxuICAgIHByaXZhdGUgdmlld09ic2VydmVyOiBWaWV3T2JzZXJ2ZXI7XG5cbiAgICBwcml2YXRlIHNjaGVkdWxlUmVyZW5kZXI6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHJlbmRlcmluZzogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgc2Nyb2xsUG9zaXRpb246IG51bWJlcjtcblxuICAgIHByaXZhdGUgc2Nyb2xsSGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGNvbnRlbnQ6IEhUTUxJb25Db250ZW50RWxlbWVudDtcblxuICAgIHByaXZhdGUgY29udGVudFNjcm9sbEVuZExpc3RlbmVyOiAoZXY6IEV2ZW50KSA9PiB2b2lkO1xuXG4gICAgcHJpdmF0ZSBhY3RpdmF0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cblxuICAgIHByaXZhdGUgYXN5bmMgY29udGVudFNjcm9sbGVkKCkge1xuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyIDw9IDAgJiYgdGhpcy52aWV3T2JzZXJ2ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsID0gYXdhaXQgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsUG9zaXRpb24gPSBzY3JvbGwuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSBzY3JvbGwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIilcbiAgICBtYXJrQXNEaXJ0eVdoZW5JbmFjdGl2ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdPYnNlcnZlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXIrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWN0aXZhdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVyZW5kZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucmVuZGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXIrKztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyaW5nID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBpbnB1dFNjcm9sbFBvc2l0aW9uID0gdGhpcy5zY3JvbGxQb3NpdGlvbjtcbiAgICAgICAgY29uc3QgaW5wdXRTY3JvbGxIZWlnaHQgPSB0aGlzLnNjcm9sbEhlaWdodDtcblxuICAgICAgICBhd2FpdCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja1JhbmdlKDApO1xuXG4gICAgICAgIGlmIChpbnB1dFNjcm9sbFBvc2l0aW9uID4gMCAmJiBpbnB1dFNjcm9sbEhlaWdodCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbCA9IGF3YWl0IHRoaXMuY29udGVudC5nZXRTY3JvbGxFbGVtZW50KCk7XG5cbiAgICAgICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSBzY3JvbGwuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzY3JvbGwuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxIZWlnaHQgKiAodGhpcy5zY3JvbGxQb3NpdGlvbiAvIHRoaXMuc2Nyb2xsSGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHNsZWVwKDEwMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsLnNjcm9sbEhlaWdodCA9PT0gc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEhlaWdodCA9IHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY3JvbGwuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxIZWlnaHQgKiAodGhpcy5zY3JvbGxQb3NpdGlvbiAvIHRoaXMuc2Nyb2xsSGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlci0tO1xuXG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLWNvbnRlbnRcIik7XG4gICAgICAgIHRoaXMuY29udGVudC5zY3JvbGxFdmVudHMgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlvblNjcm9sbEVuZFwiLCB0aGlzLmNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lciA9ICgpID0+IHRoaXMuY29udGVudFNjcm9sbGVkKCkpO1xuXG4gICAgICAgIHRoaXMudmlld09ic2VydmVyID0gbmV3IFZpZXdPYnNlcnZlcih0aGlzLmNvbnRlbnQsIHRoaXMucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLnZpZXdPYnNlcnZlci5hY3RpdmF0ZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuYWN0aXZhdGVkKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlvblNjcm9sbEVuZFwiIGFzIGFueSwgdGhpcy5jb250ZW50U2Nyb2xsRW5kTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52aWV3T2JzZXJ2ZXIuZGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==