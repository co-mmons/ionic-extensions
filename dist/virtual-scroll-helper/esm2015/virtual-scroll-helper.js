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
                const scroll = yield this.content.getScrollElement();
                this.scrollPosition = scroll.scrollTop;
                this.scrollHeight = scroll.scrollHeight;
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
            let lastScrollHeight = this.scrollHeight ? this.scrollHeight : scroll.scrollHeight;
            for (let i = 0; i < 20; i++) {
                scroll.scrollTop = this.scrollPosition;
                yield sleep(100);
                if (scroll.scrollTop === this.scrollPosition) {
                    break;
                }
                if (lastScrollHeight === scroll.scrollHeight) {
                    break;
                }
                else {
                    lastScrollHeight = scroll.scrollHeight;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvdmlydHVhbC1zY3JvbGwtaGVscGVyLyIsInNvdXJjZXMiOlsidmlydHVhbC1zY3JvbGwtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU14QyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUU1QixZQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6RyxDQUFDO0lBZ0JhLGVBQWU7O1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDeEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2FBQzNDO1FBQ0wsQ0FBQztLQUFBO0lBR0QsdUJBQXVCO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7SUFDTCxDQUFDO0lBRU8sU0FBUztRQUNiLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFSyxRQUFROztZQUVWLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUVuRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QixNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBRXZDLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVqQixJQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDMUMsTUFBTTtpQkFDVDtnQkFFRCxJQUFJLGdCQUFnQixLQUFLLE1BQU0sQ0FBQyxZQUFZLEVBQUU7b0JBQzFDLE1BQU07aUJBQ1Q7cUJBQU07b0JBQ0gsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztpQkFDMUM7YUFDSjtRQUNMLENBQUM7S0FBQTtJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBRTVHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsY0FBcUIsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQ0osQ0FBQTs7WUE1RXlDLFVBQVU7WUFBaUQsUUFBUTs7QUEwQnpHO0lBREMsWUFBWSxDQUFDLGVBQWUsQ0FBQztrRUFLN0I7QUFoQ1EsbUJBQW1CO0lBSC9CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxvQkFBb0I7S0FDakMsQ0FBQztHQUNXLG1CQUFtQixDQThFL0I7U0E5RVksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZpZXdPYnNlcnZlcn0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3ZpZXctb2JzZXJ2ZXJcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLXZpcnR1YWwtc2Nyb2xsXCIsXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxIZWxwZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElvblZpcnR1YWxTY3JvbGxFbGVtZW50PiwgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpZXdPYnNlcnZlcjogVmlld09ic2VydmVyO1xuXG4gICAgcHJpdmF0ZSBzY2hlZHVsZVJlcmVuZGVyOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgY29udGVudDogSFRNTElvbkNvbnRlbnRFbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBjb250ZW50U2Nyb2xsRW5kTGlzdGVuZXI6IChldjogRXZlbnQpID0+IHZvaWQ7XG5cbiAgICBwcml2YXRlIGFjdGl2YXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHByaXZhdGUgYXN5bmMgY29udGVudFNjcm9sbGVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2NoZWR1bGVSZXJlbmRlciAmJiB0aGlzLnZpZXdPYnNlcnZlci5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGwgPSBhd2FpdCB0aGlzLmNvbnRlbnQuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxQb3NpdGlvbiA9IHNjcm9sbC5zY3JvbGxUb3A7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IHNjcm9sbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiKVxuICAgIG1hcmtBc0RpcnR5V2hlbkluYWN0aXZlKCkge1xuICAgICAgICBpZiAoIXRoaXMudmlld09ic2VydmVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlciA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFjdGl2YXRlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NoZWR1bGVSZXJlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5yZXJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVyZW5kZXIoKSB7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hlY2tSYW5nZSgwKTtcblxuICAgICAgICBjb25zdCBzY3JvbGwgPSBhd2FpdCB0aGlzLmNvbnRlbnQuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuICAgICAgICBsZXQgbGFzdFNjcm9sbEhlaWdodCA9IHRoaXMuc2Nyb2xsSGVpZ2h0ID8gdGhpcy5zY3JvbGxIZWlnaHQgOiBzY3JvbGwuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgICAgICAgc2Nyb2xsLnNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsUG9zaXRpb247XG5cbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKDEwMCk7XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGwuc2Nyb2xsVG9wID09PSB0aGlzLnNjcm9sbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsYXN0U2Nyb2xsSGVpZ2h0ID09PSBzY3JvbGwuc2Nyb2xsSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhc3RTY3JvbGxIZWlnaHQgPSBzY3JvbGwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoXCJpb24tY29udGVudFwiKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNjcm9sbEV2ZW50cyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIsIHRoaXMuY29udGVudFNjcm9sbEVuZExpc3RlbmVyID0gKCkgPT4gdGhpcy5jb250ZW50U2Nyb2xsZWQoKSk7XG5cbiAgICAgICAgdGhpcy52aWV3T2JzZXJ2ZXIgPSBuZXcgVmlld09ic2VydmVyKHRoaXMuY29udGVudCwgdGhpcy5wbGF0Zm9ybSk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMudmlld09ic2VydmVyLmFjdGl2YXRlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5hY3RpdmF0ZWQoKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiaW9uU2Nyb2xsRW5kXCIgYXMgYW55LCB0aGlzLmNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnZpZXdPYnNlcnZlci5kZXN0cm95KCk7XG4gICAgfVxufVxuIl19