import { __awaiter } from "tslib";
import { Directive, ElementRef, HostListener } from "@angular/core";
import { ViewObserver } from "@co.mmons/ionic-extensions/view-observer";
import { sleep } from "@co.mmons/js-utils/core";
import { Platform } from "@ionic/angular";
export class VirtualScrollHelper {
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
}
VirtualScrollHelper.decorators = [
    { type: Directive, args: [{
                selector: "ion-virtual-scroll",
            },] }
];
VirtualScrollHelper.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform }
];
VirtualScrollHelper.propDecorators = {
    markAsDirtyWhenInactive: [{ type: HostListener, args: ["window:resize",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZpcnR1YWwtc2Nyb2xsLWhlbHBlci92aXJ0dWFsLXNjcm9sbC1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFNeEMsTUFBTSxPQUFPLG1CQUFtQjtJQUU1QixZQUE2QixPQUFnRCxFQUFVLFFBQWtCO1FBQTVFLFlBQU8sR0FBUCxPQUFPLENBQXlDO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUtqRyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7SUFKckMsQ0FBQztJQW1CYSxlQUFlOztZQUN6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDNUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO2FBQzNDO1FBQ0wsQ0FBQztLQUFBO0lBR0QsdUJBQXVCO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVPLFNBQVM7UUFDYixJQUFJLElBQUks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QUFROzs7c0NBb0NYLFlBQVksU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZpZXdPYnNlcnZlcn0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3ZpZXctb2JzZXJ2ZXJcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLXZpcnR1YWwtc2Nyb2xsXCIsXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxIZWxwZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElvblZpcnR1YWxTY3JvbGxFbGVtZW50PiwgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpZXdPYnNlcnZlcjogVmlld09ic2VydmVyO1xuXG4gICAgcHJpdmF0ZSBzY2hlZHVsZVJlcmVuZGVyOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSByZW5kZXJpbmc6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIHNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHNjcm9sbEhlaWdodDogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBjb250ZW50OiBIVE1MSW9uQ29udGVudEVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIGNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lcjogKGV2OiBFdmVudCkgPT4gdm9pZDtcblxuICAgIHByaXZhdGUgYWN0aXZhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG5cbiAgICBwcml2YXRlIGFzeW5jIGNvbnRlbnRTY3JvbGxlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NoZWR1bGVSZXJlbmRlciA8PSAwICYmIHRoaXMudmlld09ic2VydmVyLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbCA9IGF3YWl0IHRoaXMuY29udGVudC5nZXRTY3JvbGxFbGVtZW50KCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFBvc2l0aW9uID0gc2Nyb2xsLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIpXG4gICAgbWFya0FzRGlydHlXaGVuSW5hY3RpdmUoKSB7XG4gICAgICAgIGlmICghdGhpcy52aWV3T2JzZXJ2ZXIuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFjdGl2YXRlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NoZWR1bGVSZXJlbmRlciA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVyZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHJlcmVuZGVyKCkge1xuXG4gICAgICAgIGlmICh0aGlzLnJlbmRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyKys7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcmluZyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgaW5wdXRTY3JvbGxQb3NpdGlvbiA9IHRoaXMuc2Nyb2xsUG9zaXRpb247XG4gICAgICAgIGNvbnN0IGlucHV0U2Nyb2xsSGVpZ2h0ID0gdGhpcy5zY3JvbGxIZWlnaHQ7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hlY2tSYW5nZSgwKTtcblxuICAgICAgICBpZiAoaW5wdXRTY3JvbGxQb3NpdGlvbiA+IDAgJiYgaW5wdXRTY3JvbGxIZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGwgPSBhd2FpdCB0aGlzLmNvbnRlbnQuZ2V0U2Nyb2xsRWxlbWVudCgpO1xuXG4gICAgICAgICAgICBsZXQgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsLnNjcm9sbEhlaWdodDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoNTApO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbC5zY3JvbGxIZWlnaHQgPT09IHNjcm9sbEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxIZWlnaHQgPSBzY3JvbGwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2Nyb2xsLnNjcm9sbFRvcCA9IHNjcm9sbC5zY3JvbGxIZWlnaHQgKiAodGhpcy5zY3JvbGxQb3NpdGlvbiAvIHRoaXMuc2Nyb2xsSGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVSZXJlbmRlci0tO1xuXG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlUmVyZW5kZXIgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlcmVuZGVyKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2hlZHVsZVJlcmVuZGVyIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlcmVuZGVyID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLWNvbnRlbnRcIik7XG4gICAgICAgIHRoaXMuY29udGVudC5zY3JvbGxFdmVudHMgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlvblNjcm9sbEVuZFwiLCB0aGlzLmNvbnRlbnRTY3JvbGxFbmRMaXN0ZW5lciA9ICgpID0+IHRoaXMuY29udGVudFNjcm9sbGVkKCkpO1xuXG4gICAgICAgIHRoaXMudmlld09ic2VydmVyID0gbmV3IFZpZXdPYnNlcnZlcih0aGlzLmNvbnRlbnQsIHRoaXMucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLnZpZXdPYnNlcnZlci5hY3RpdmF0ZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuYWN0aXZhdGVkKCkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlvblNjcm9sbEVuZFwiIGFzIGFueSwgdGhpcy5jb250ZW50U2Nyb2xsRW5kTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy52aWV3T2JzZXJ2ZXIuZGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==