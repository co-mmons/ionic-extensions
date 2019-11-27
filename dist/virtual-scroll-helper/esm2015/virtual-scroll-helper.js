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
            const scrollPosition = this.scrollPosition;
            const scrollHeight = this.scrollHeight;
            const scrollPoint = Math.round((this.scrollPosition / this.scrollHeight) * 100);
            yield this.element.nativeElement.checkRange(0);
            if (scrollPosition > 0 && scrollHeight > 0) {
                const scroll = yield this.content.getScrollElement();
                for (let i = 0; i < 20; i++) {
                    scroll.scrollTop = this.scrollPosition;
                    yield sleep(100);
                    const point = Math.round((this.scrollPosition / scroll.scrollTop) * 100);
                    console.log(point, scrollPoint);
                    if (point === scrollPoint) {
                        break;
                    }
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUU1QixZQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUtqRyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7SUFKckMsQ0FBQztJQW1CYSxlQUFlOztZQUN6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDNUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2FBQzNDO1FBQ0wsQ0FBQztLQUFBO0lBR0QsdUJBQXVCO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0Is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QztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDSixDQUFBOztZQS9GeUMsVUFBVTtZQUFpRCxRQUFROztBQTZCekc7SUFEQyxZQUFZLENBQUMsZUFBZSxDQUFDO2tFQUs3QjtBQW5DUSxtQkFBbUI7SUFIL0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLG9CQUFvQjtLQUNqQyxDQUFDO0dBQ1csbUJBQW1CLENBaUcvQjtTQWpHWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Vmlld09ic2VydmVyfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlldy1vYnNlcnZlclwiO1xuaW1wb3J0IHtzbGVlcH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24tdmlydHVhbC1zY3JvbGxcIixcbn0pXG5leHBvcnQgY2xhc3MgVmlydHVhbFNjcm9sbEhlbHBlciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW9uVmlydHVhbFNjcm9sbEVsZW1lbnQ+LCBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuICAgIH1cblxuICAgIHByaXZhdGUgdmlld09ic2VydmVyOiBWaWV3T2JzZXJ2ZXI7XG5cbiAgICBwcml2YXRlIHNjaGVkdWxlUmVyZW5kZXI6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHJlbmRlcmluZzogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgc2Nyb2xsUG9zaXRpb246IG51bWJlcjtcblxuICAgIHByaXZhdGUgc2Nyb2xsSGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcml2YXRlIGNvbnRlbnQ6IEhUTUxJb25Db250ZW50RWxlbWVudDtcblxuICAgIHByaXZhdGUgY29udGVudFNjcm9sbEVuZExpc3RlbmVyOiAoZXY6IEV2ZW50KSA9PiB2b2lkO1xuXG4gICAgcHJpdmF0ZSBhY3RpdmF0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cblxuICAgIHByaXZhdGUgYXN5bmMgY29udGVudFNjcm9sbGVkKCkge1xuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyIDw9IDAgJiYgdGhpcy52aWV3T2JzZXJ2ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsID0gYXdhaXQgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsUG9zaXRpb24gPSBzY3JvbGwuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSBzY3JvbGwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIilcbiAgICBtYXJrQXNEaXJ0eVdoZW5JbmFjdGl2ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdPYnNlcnZlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXIrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWN0aXZhdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVyZW5kZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMucmVuZGVyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXIrKztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyaW5nID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHRoaXMuc2Nyb2xsUG9zaXRpb247XG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHRoaXMuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICBjb25zdCBzY3JvbGxQb2ludCA9IE1hdGgucm91bmQoKHRoaXMuc2Nyb2xsUG9zaXRpb24gLyB0aGlzLnNjcm9sbEhlaWdodCkgKiAxMDApO1xuXG4gICAgICAgIGF3YWl0IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrUmFuZ2UoMCk7XG5cbiAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uID4gMCAmJiBzY3JvbGxIZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGwgPSBhd2FpdCB0aGlzLmNvbnRlbnQuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzY3JvbGwuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxQb3NpdGlvbjtcblxuICAgICAgICAgICAgICAgIGF3YWl0IHNsZWVwKDEwMCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwb2ludCA9IE1hdGgucm91bmQoKHRoaXMuc2Nyb2xsUG9zaXRpb24gLyBzY3JvbGwuc2Nyb2xsVG9wKSAqIDEwMCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocG9pbnQsIHNjcm9sbFBvaW50KTtcbiAgICAgICAgICAgICAgICBpZiAocG9pbnQgPT09IHNjcm9sbFBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlci0tO1xuXG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLWNvbnRlbnRcIik7XG4gICAgICAgIHRoaXMuY29udGVudC5zY3JvbGxFdmVudHMgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlvblNjcm9sbEVuZFwiLCB0aGlzLmNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lciA9ICgpID0+IHRoaXMuY29udGVudFNjcm9sbGVkKCkpO1xuXG4gICAgICAgIHRoaXMudmlld09ic2VydmVyID0gbmV3IFZpZXdPYnNlcnZlcih0aGlzLmNvbnRlbnQsIHRoaXMucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLnZpZXdPYnNlcnZlci5hY3RpdmF0ZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuYWN0aXZhdGVkKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlvblNjcm9sbEVuZFwiIGFzIGFueSwgdGhpcy5jb250ZW50U2Nyb2xsRW5kTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52aWV3T2JzZXJ2ZXIuZGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==