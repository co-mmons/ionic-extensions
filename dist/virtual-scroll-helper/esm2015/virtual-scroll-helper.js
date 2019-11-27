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
    activated() {
        if (this.scheduleRerender) {
            this.rerender();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUU1QixZQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6RyxDQUFDO0lBY2EsZUFBZTs7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDM0U7UUFDTCxDQUFDO0tBQUE7SUFHRCx1QkFBdUI7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFTyxTQUFTO1FBQ2IsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVLLFFBQVE7O1lBRVYsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFckQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekIsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUV2QyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ3ZGLE1BQU07aUJBQ1Q7Z0JBRUQsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDO0tBQUE7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUU1RyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLGNBQXFCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNKLENBQUE7O1lBakV5QyxVQUFVO1lBQWlELFFBQVE7O0FBc0J6RztJQURDLFlBQVksQ0FBQyxlQUFlLENBQUM7a0VBSzdCO0FBNUJRLG1CQUFtQjtJQUgvQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsb0JBQW9CO0tBQ2pDLENBQUM7R0FDVyxtQkFBbUIsQ0FtRS9CO1NBbkVZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtWaWV3T2JzZXJ2ZXJ9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy92aWV3LW9ic2VydmVyXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcImlvbi12aXJ0dWFsLXNjcm9sbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsSGVscGVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJb25WaXJ0dWFsU2Nyb2xsRWxlbWVudD4sIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aWV3T2JzZXJ2ZXI6IFZpZXdPYnNlcnZlcjtcblxuICAgIHByaXZhdGUgc2NoZWR1bGVSZXJlbmRlcjogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgc2Nyb2xsUG9zaXRpb246IG51bWJlcjtcblxuICAgIHByaXZhdGUgY29udGVudDogSFRNTElvbkNvbnRlbnRFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBjb250ZW50U2Nyb2xsRW5kTGlzdGVuZXI6IChldjogRXZlbnQpID0+IHZvaWQ7XG5cbiAgICBwcml2YXRlIGFjdGl2YXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHByaXZhdGUgYXN5bmMgY29udGVudFNjcm9sbGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2NoZWR1bGVSZXJlbmRlciAmJiB0aGlzLnZpZXdPYnNlcnZlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFBvc2l0aW9uID0gKGF3YWl0IHRoaXMuY29udGVudC5nZXRTY3JvbGxFbGVtZW50KCkpLnNjcm9sbFRvcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIpXG4gICAgbWFya0FzRGlydHlXaGVuSW5hY3RpdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy52aWV3T2JzZXJ2ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWN0aXZhdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZXJlbmRlcigpIHtcblxuICAgICAgICBhd2FpdCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGVja1JhbmdlKDApO1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IGF3YWl0IHRoaXMuY29udGVudC5nZXRTY3JvbGxFbGVtZW50KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgICAgICBzY3JvbGwuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxQb3NpdGlvbjtcblxuICAgICAgICAgICAgaWYgKHNjcm9sbC5zY3JvbGxUb3AgPT09IHRoaXMuc2Nyb2xsUG9zaXRpb24gfHwgc2Nyb2xsLnNjcm9sbEhlaWdodCA8IHRoaXMuc2Nyb2xsUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLWNvbnRlbnRcIik7XG4gICAgICAgIHRoaXMuY29udGVudC5zY3JvbGxFdmVudHMgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlvblNjcm9sbEVuZFwiLCB0aGlzLmNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lciA9ICgpID0+IHRoaXMuY29udGVudFNjcm9sbGVkKCkpO1xuXG4gICAgICAgIHRoaXMudmlld09ic2VydmVyID0gbmV3IFZpZXdPYnNlcnZlcih0aGlzLmNvbnRlbnQsIHRoaXMucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLnZpZXdPYnNlcnZlci5hY3RpdmF0ZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuYWN0aXZhdGVkKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlvblNjcm9sbEVuZFwiIGFzIGFueSwgdGhpcy5jb250ZW50U2Nyb2xsRW5kTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52aWV3T2JzZXJ2ZXIuZGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==