import { __awaiter } from "tslib";
import { EventEmitter } from "@angular/core";
export class ViewObserver {
    constructor(content, platform) {
        this.content = content;
        this.platform = platform;
        this.activated = new EventEmitter();
        this.content.parentElement.addEventListener("ionViewDidEnter", this.didEnterListener = () => this.viewDidEnter());
        this.content.parentElement.addEventListener("ionViewDidLeave", this.didLeaveListener = () => this.viewDidLeave());
        this.resumeSubscription = this.platform.resume.subscribe(() => this.whenResumed());
        this.pauseSubscription = this.platform.pause.subscribe(() => this.whenPaused());
        this.visible = !this.content.parentElement.classList.contains("ion-page-hidden");
    }
    viewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.visible = true;
            if (!this.paused) {
                this.activated.next();
            }
        });
    }
    viewDidLeave() {
        this.visible = false;
    }
    whenPaused() {
        this.paused = true;
    }
    whenResumed() {
        return __awaiter(this, void 0, void 0, function* () {
            this.paused = false;
            if (this.visible) {
                this.activated.next();
            }
        });
    }
    isActive() {
        return this.visible && !this.paused;
    }
    destroy() {
        this.content.removeEventListener("ionViewDidEnter", this.didEnterListener);
        this.content.removeEventListener("ionViewDidLeave", this.didLeaveListener);
        this.resumeSubscription.unsubscribe();
        this.pauseSubscription.unsubscribe();
        this.activated.unsubscribe();
        this.content = undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1vYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92aWV3LW9ic2VydmVyL3ZpZXctb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJM0MsTUFBTSxPQUFPLFlBQVk7SUFFckIsWUFBb0IsT0FBOEIsRUFBbUIsUUFBa0I7UUFBbkUsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7UUFBbUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXVCOUUsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBckJ4RCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDbEgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRWxILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUVoRixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFnQmEsWUFBWTs7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFFcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QjtRQUNMLENBQUM7S0FBQTtJQUVPLFlBQVk7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRWEsV0FBVzs7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFcEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDekI7UUFDTCxDQUFDO0tBQUE7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN4QyxDQUFDO0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsaUJBQXdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBd0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVsRixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuXG5leHBvcnQgY2xhc3MgVmlld09ic2VydmVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29udGVudDogSFRNTElvbkNvbnRlbnRFbGVtZW50LCBwcml2YXRlIHJlYWRvbmx5IHBsYXRmb3JtOiBQbGF0Zm9ybSkge1xuXG4gICAgICAgIHRoaXMuY29udGVudC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpb25WaWV3RGlkRW50ZXJcIiwgdGhpcy5kaWRFbnRlckxpc3RlbmVyID0gKCkgPT4gdGhpcy52aWV3RGlkRW50ZXIoKSk7XG4gICAgICAgIHRoaXMuY29udGVudC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJpb25WaWV3RGlkTGVhdmVcIiwgdGhpcy5kaWRMZWF2ZUxpc3RlbmVyID0gKCkgPT4gdGhpcy52aWV3RGlkTGVhdmUoKSk7XG5cbiAgICAgICAgdGhpcy5yZXN1bWVTdWJzY3JpcHRpb24gPSB0aGlzLnBsYXRmb3JtLnJlc3VtZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy53aGVuUmVzdW1lZCgpKTtcbiAgICAgICAgdGhpcy5wYXVzZVN1YnNjcmlwdGlvbiA9IHRoaXMucGxhdGZvcm0ucGF1c2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMud2hlblBhdXNlZCgpKTtcblxuICAgICAgICB0aGlzLnZpc2libGUgPSAhdGhpcy5jb250ZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW9uLXBhZ2UtaGlkZGVuXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmlzaWJsZTogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgZGlkRW50ZXJMaXN0ZW5lcjogKGV2OiBFdmVudCkgPT4gdm9pZDtcblxuICAgIHByaXZhdGUgZGlkTGVhdmVMaXN0ZW5lcjogKGV2OiBFdmVudCkgPT4gdm9pZDtcblxuICAgIHByaXZhdGUgcGF1c2VkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBwYXVzZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJpdmF0ZSByZXN1bWVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHJlYWRvbmx5IGFjdGl2YXRlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHJpdmF0ZSBhc3luYyB2aWV3RGlkRW50ZXIoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZWQubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2aWV3RGlkTGVhdmUoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgd2hlblBhdXNlZCgpIHtcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgd2hlblJlc3VtZWQoKSB7XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZWQubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNBY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGUgJiYgIXRoaXMucGF1c2VkO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiaW9uVmlld0RpZEVudGVyXCIgYXMgYW55LCB0aGlzLmRpZEVudGVyTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlvblZpZXdEaWRMZWF2ZVwiIGFzIGFueSwgdGhpcy5kaWRMZWF2ZUxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLnJlc3VtZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnBhdXNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQudW5zdWJzY3JpYmUoKTtcblxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG59XG4iXX0=