import { __awaiter, __decorate } from "tslib";
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
                    yield sleep(50);
                    if (scroll.scrollHeight === scrollHeight) {
                        break;
                    }
                    else {
                        scrollHeight = scroll.scrollHeight;
                    }
                }
                scroll.scrollTop = scroll.scrollHeight * (this.scrollPosition / this.scrollHeight);
            }
            this.rendering = false;
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
__decorate([
    HostListener("window:resize")
], VirtualScrollHelper.prototype, "markAsDirtyWhenInactive", null);
VirtualScrollHelper = __decorate([
    Directive({
        selector: "ion-virtual-scroll",
    })
], VirtualScrollHelper);
export { VirtualScrollHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUU1QixZQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUtqRyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7SUFKckMsQ0FBQztJQW1CYSxlQUFlOztZQUN6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDNUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2FBQzNDO1FBQ0wsQ0FBQztLQUFBO0lBR0QsdUJBQXVCO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0Is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QyxVQUFVO1lBQWlELFFBQVE7O0FBNkJ6RztJQURDLFlBQVksQ0FBQyxlQUFlLENBQUM7a0VBSzdCO0FBbkNRLG1CQUFtQjtJQUgvQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsb0JBQW9CO0tBQ2pDLENBQUM7R0FDVyxtQkFBbUIsQ0FtRy9CO1NBbkdZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtWaWV3T2JzZXJ2ZXJ9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy92aWV3LW9ic2VydmVyXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcImlvbi12aXJ0dWFsLXNjcm9sbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsSGVscGVyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJb25WaXJ0dWFsU2Nyb2xsRWxlbWVudD4sIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aWV3T2JzZXJ2ZXI6IFZpZXdPYnNlcnZlcjtcblxuICAgIHByaXZhdGUgc2NoZWR1bGVSZXJlbmRlcjogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgcmVuZGVyaW5nOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgY29udGVudDogSFRNTElvbkNvbnRlbnRFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBjb250ZW50U2Nyb2xsRW5kTGlzdGVuZXI6IChldjogRXZlbnQpID0+IHZvaWQ7XG5cbiAgICBwcml2YXRlIGFjdGl2YXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuXG4gICAgcHJpdmF0ZSBhc3luYyBjb250ZW50U2Nyb2xsZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPD0gMCAmJiB0aGlzLnZpZXdPYnNlcnZlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGwgPSBhd2FpdCB0aGlzLmNvbnRlbnQuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxQb3NpdGlvbiA9IHNjcm9sbC5zY3JvbGxUb3A7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiKVxuICAgIG1hcmtBc0RpcnR5V2hlbkluYWN0aXZlKCkge1xuICAgICAgICBpZiAoIXRoaXMudmlld09ic2VydmVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlcisrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZXJlbmRlcigpIHtcblxuICAgICAgICBpZiAodGhpcy5yZW5kZXJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlcisrO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXJpbmcgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGlucHV0U2Nyb2xsUG9zaXRpb24gPSB0aGlzLnNjcm9sbFBvc2l0aW9uO1xuICAgICAgICBjb25zdCBpbnB1dFNjcm9sbEhlaWdodCA9IHRoaXMuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGF3YWl0IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNoZWNrUmFuZ2UoMCk7XG5cbiAgICAgICAgaWYgKGlucHV0U2Nyb2xsUG9zaXRpb24gPiAwICYmIGlucHV0U2Nyb2xsSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsID0gYXdhaXQgdGhpcy5jb250ZW50LmdldFNjcm9sbEVsZW1lbnQoKTtcblxuICAgICAgICAgICAgbGV0IHNjcm9sbEhlaWdodCA9IHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNsZWVwKDUwKTtcblxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGwuc2Nyb2xsSGVpZ2h0ID09PSBzY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcm9sbC5zY3JvbGxUb3AgPSBzY3JvbGwuc2Nyb2xsSGVpZ2h0ICogKHRoaXMuc2Nyb2xsUG9zaXRpb24gLyB0aGlzLnNjcm9sbEhlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlUmVyZW5kZXItLTtcblxuICAgICAgICBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyID4gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NoZWR1bGVSZXJlbmRlciA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlciA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1jb250ZW50XCIpO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2Nyb2xsRXZlbnRzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpb25TY3JvbGxFbmRcIiwgdGhpcy5jb250ZW50U2Nyb2xsRW5kTGlzdGVuZXIgPSAoKSA9PiB0aGlzLmNvbnRlbnRTY3JvbGxlZCgpKTtcblxuICAgICAgICB0aGlzLnZpZXdPYnNlcnZlciA9IG5ldyBWaWV3T2JzZXJ2ZXIodGhpcy5jb250ZW50LCB0aGlzLnBsYXRmb3JtKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy52aWV3T2JzZXJ2ZXIuYWN0aXZhdGVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmFjdGl2YXRlZCgpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJpb25TY3JvbGxFbmRcIiBhcyBhbnksIHRoaXMuY29udGVudFNjcm9sbEVuZExpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudmlld09ic2VydmVyLmRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=