import * as tslib_1 from "tslib";
import { EventEmitter } from "@angular/core";
var ViewObserver = /** @class */ (function () {
    function ViewObserver(content, platform) {
        var _this = this;
        this.content = content;
        this.platform = platform;
        this.activated = new EventEmitter();
        this.content.parentElement.addEventListener("ionViewDidEnter", this.didEnterListener = function () { return _this.viewDidEnter(); });
        this.content.parentElement.addEventListener("ionViewDidLeave", this.didLeaveListener = function () { return _this.viewDidLeave(); });
        this.resumeSubscription = this.platform.resume.subscribe(function () { return _this.whenResumed(); });
        this.pauseSubscription = this.platform.pause.subscribe(function () { return _this.whenPaused(); });
        this.visible = !this.content.parentElement.classList.contains("ion-page-hidden");
    }
    ViewObserver.prototype.viewDidEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.visible = true;
                if (!this.paused) {
                    this.activated.next();
                }
                return [2 /*return*/];
            });
        });
    };
    ViewObserver.prototype.viewDidLeave = function () {
        this.visible = false;
    };
    ViewObserver.prototype.whenPaused = function () {
        this.paused = true;
    };
    ViewObserver.prototype.whenResumed = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.paused = false;
                if (this.visible) {
                    this.activated.next();
                }
                return [2 /*return*/];
            });
        });
    };
    ViewObserver.prototype.isActive = function () {
        return this.visible && !this.paused;
    };
    ViewObserver.prototype.destroy = function () {
        this.content.removeEventListener("ionViewDidEnter", this.didEnterListener);
        this.content.removeEventListener("ionViewDidLeave", this.didLeaveListener);
        this.resumeSubscription.unsubscribe();
        this.pauseSubscription.unsubscribe();
        this.activated.unsubscribe();
        this.content = undefined;
    };
    return ViewObserver;
}());
export { ViewObserver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1vYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3ZpZXctb2JzZXJ2ZXIvIiwic291cmNlcyI6WyJ2aWV3LW9ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSTNDO0lBRUksc0JBQW9CLE9BQThCLEVBQW1CLFFBQWtCO1FBQXZGLGlCQVNDO1FBVG1CLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQW1CLGFBQVEsR0FBUixRQUFRLENBQVU7UUF1QjlFLGNBQVMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXJCeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxFQUFFLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUNsSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBRWxILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBRWhGLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckYsQ0FBQztJQWdCYSxtQ0FBWSxHQUExQjs7O2dCQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUN6Qjs7OztLQUNKO0lBRU8sbUNBQVksR0FBcEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRU8saUNBQVUsR0FBbEI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRWEsa0NBQVcsR0FBekI7OztnQkFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFFcEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ3pCOzs7O0tBQ0o7SUFFRCwrQkFBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN4QyxDQUFDO0lBRUQsOEJBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsaUJBQXdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBd0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVsRixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXJDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FBQyxBQW5FRCxJQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFZpZXdPYnNlcnZlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRlbnQ6IEhUTUxJb25Db250ZW50RWxlbWVudCwgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcblxuICAgICAgICB0aGlzLmNvbnRlbnQucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW9uVmlld0RpZEVudGVyXCIsIHRoaXMuZGlkRW50ZXJMaXN0ZW5lciA9ICgpID0+IHRoaXMudmlld0RpZEVudGVyKCkpO1xuICAgICAgICB0aGlzLmNvbnRlbnQucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW9uVmlld0RpZExlYXZlXCIsIHRoaXMuZGlkTGVhdmVMaXN0ZW5lciA9ICgpID0+IHRoaXMudmlld0RpZExlYXZlKCkpO1xuXG4gICAgICAgIHRoaXMucmVzdW1lU3Vic2NyaXB0aW9uID0gdGhpcy5wbGF0Zm9ybS5yZXN1bWUuc3Vic2NyaWJlKCgpID0+IHRoaXMud2hlblJlc3VtZWQoKSk7XG4gICAgICAgIHRoaXMucGF1c2VTdWJzY3JpcHRpb24gPSB0aGlzLnBsYXRmb3JtLnBhdXNlLnN1YnNjcmliZSgoKSA9PiB0aGlzLndoZW5QYXVzZWQoKSk7XG5cbiAgICAgICAgdGhpcy52aXNpYmxlID0gIXRoaXMuY29udGVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImlvbi1wYWdlLWhpZGRlblwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpc2libGU6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGRpZEVudGVyTGlzdGVuZXI6IChldjogRXZlbnQpID0+IHZvaWQ7XG5cbiAgICBwcml2YXRlIGRpZExlYXZlTGlzdGVuZXI6IChldjogRXZlbnQpID0+IHZvaWQ7XG5cbiAgICBwcml2YXRlIHBhdXNlZDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgcGF1c2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHByaXZhdGUgcmVzdW1lU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICByZWFkb25seSBhY3RpdmF0ZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHByaXZhdGUgYXN5bmMgdmlld0RpZEVudGVyKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuXG4gICAgICAgIGlmICghdGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVkLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdmlld0RpZExlYXZlKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdoZW5QYXVzZWQoKSB7XG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIHdoZW5SZXN1bWVkKCkge1xuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVkLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlICYmICF0aGlzLnBhdXNlZDtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlvblZpZXdEaWRFbnRlclwiIGFzIGFueSwgdGhpcy5kaWRFbnRlckxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJpb25WaWV3RGlkTGVhdmVcIiBhcyBhbnksIHRoaXMuZGlkTGVhdmVMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5yZXN1bWVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5wYXVzZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVkLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgdGhpcy5jb250ZW50ID0gdW5kZWZpbmVkO1xuICAgIH1cblxufVxuIl19