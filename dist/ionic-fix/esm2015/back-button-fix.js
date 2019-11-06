import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Input, Optional } from "@angular/core";
import { Router } from "@angular/router";
import { IonRouterOutlet, NavController, IonBackButtonDelegate } from "@ionic/angular";
IonBackButtonDelegate.prototype.onClick = () => null;
let IonicBackButtonFix = class IonicBackButtonFix {
    constructor(router, routerOutlet, navCtrl, elementRef) {
        this.router = router;
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
    }
    set defaultHref(value) {
        this.elementRef.nativeElement.defaultHref = value;
    }
    get defaultHref() {
        return this.elementRef.nativeElement.defaultHref;
    }
    onClick(ev) {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            this.navCtrl.back({ animated: true });
            ev.preventDefault();
        }
        else if (this.router && this.defaultHref != null) {
            this.navCtrl.navigateBack(this.defaultHref);
            ev.preventDefault();
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], IonicBackButtonFix.prototype, "defaultHref", null);
tslib_1.__decorate([
    HostListener("click", ["$event"]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Event]),
    tslib_1.__metadata("design:returntype", void 0)
], IonicBackButtonFix.prototype, "onClick", null);
IonicBackButtonFix = tslib_1.__decorate([
    Directive({
        selector: "ion-back-button"
    }),
    tslib_1.__param(1, Optional()),
    tslib_1.__metadata("design:paramtypes", [Router, IonRouterOutlet, NavController, ElementRef])
], IonicBackButtonFix);
export { IonicBackButtonFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24tZml4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW9uaWMtZml4LyIsInNvdXJjZXMiOlsiYmFjay1idXR0b24tZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRixxQkFBcUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztBQUtyRCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUUzQixZQUFvQixNQUFjLEVBQXNCLFlBQTZCLEVBQVUsT0FBc0IsRUFBVSxVQUFzQjtRQUFqSSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQXNCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQ3JKLENBQUM7SUFHRCxJQUFJLFdBQVcsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDdEQsQ0FBQztJQUNELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQ3JELENBQUM7SUFHRCxPQUFPLENBQUMsRUFBUztRQUViLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBRXZCO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQW5CRztJQURDLEtBQUssRUFBRTs7O3FEQUdQO0FBTUQ7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUN0QixLQUFLOztpREFVaEI7QUF4QlEsa0JBQWtCO0lBSDlCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxpQkFBaUI7S0FDOUIsQ0FBQztJQUd1QyxtQkFBQSxRQUFRLEVBQUUsQ0FBQTs2Q0FBbkIsTUFBTSxFQUFvQyxlQUFlLEVBQW1CLGFBQWEsRUFBc0IsVUFBVTtHQUY1SSxrQkFBa0IsQ0F5QjlCO1NBekJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPcHRpb25hbH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0lvblJvdXRlck91dGxldCwgTmF2Q29udHJvbGxlciwgSW9uQmFja0J1dHRvbkRlbGVnYXRlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuSW9uQmFja0J1dHRvbkRlbGVnYXRlLnByb3RvdHlwZS5vbkNsaWNrID0gKCkgPT4gbnVsbDtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLWJhY2stYnV0dG9uXCJcbn0pXG5leHBvcnQgY2xhc3MgSW9uaWNCYWNrQnV0dG9uRml4IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyT3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQsIHByaXZhdGUgbmF2Q3RybDogTmF2Q29udHJvbGxlciwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGVmYXVsdEhyZWYodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5kZWZhdWx0SHJlZiA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgZGVmYXVsdEhyZWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5kZWZhdWx0SHJlZjtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIG9uQ2xpY2soZXY6IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMucm91dGVyT3V0bGV0ICYmIHRoaXMucm91dGVyT3V0bGV0LmNhbkdvQmFjaygpKSB7XG4gICAgICAgICAgICB0aGlzLm5hdkN0cmwuYmFjayh7YW5pbWF0ZWQ6IHRydWV9KTtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvdXRlciAmJiB0aGlzLmRlZmF1bHRIcmVmICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubmF2Q3RybC5uYXZpZ2F0ZUJhY2sodGhpcy5kZWZhdWx0SHJlZik7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19