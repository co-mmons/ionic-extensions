import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IonRouterOutlet, NavController, IonBackButtonDelegate } from "@ionic/angular";
IonBackButtonDelegate.prototype.onClick = function () { return null; };
var IonicBackButtonFix = /** @class */ (function () {
    function IonicBackButtonFix(router, routerOutlet, navCtrl, elementRef) {
        this.router = router;
        this.routerOutlet = routerOutlet;
        this.navCtrl = navCtrl;
        this.elementRef = elementRef;
    }
    Object.defineProperty(IonicBackButtonFix.prototype, "defaultHref", {
        get: function () {
            return this.elementRef.nativeElement.defaultHref;
        },
        set: function (value) {
            this.elementRef.nativeElement.defaultHref = value;
        },
        enumerable: true,
        configurable: true
    });
    IonicBackButtonFix.prototype.onClick = function (ev) {
        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            this.navCtrl.back({ animated: true });
            ev.preventDefault();
        }
        else if (this.router && this.defaultHref != null) {
            this.navCtrl.navigateBack(this.defaultHref);
            ev.preventDefault();
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
        tslib_1.__metadata("design:paramtypes", [Router, IonRouterOutlet, NavController, ElementRef])
    ], IonicBackButtonFix);
    return IonicBackButtonFix;
}());
export { IonicBackButtonFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24tZml4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJpb25pYy1maXgvYmFjay1idXR0b24tZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXJGLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7QUFLckQ7SUFFSSw0QkFBb0IsTUFBYyxFQUFVLFlBQTZCLEVBQVUsT0FBc0IsRUFBVSxVQUFzQjtRQUFySCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDekksQ0FBQztJQUdELHNCQUFJLDJDQUFXO2FBR2Y7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUNyRCxDQUFDO2FBTEQsVUFBZ0IsS0FBYTtZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBTUQsb0NBQU8sR0FBUCxVQUFRLEVBQVM7UUFFYixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUV2QjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksRUFBRTtZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQWxCRDtRQURDLEtBQUssRUFBRTs7O3lEQUdQO0lBTUQ7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O2lEQUN0QixLQUFLOztxREFVaEI7SUF4QlEsa0JBQWtCO1FBSDlCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7U0FDOUIsQ0FBQztpREFHOEIsTUFBTSxFQUF3QixlQUFlLEVBQW1CLGFBQWEsRUFBc0IsVUFBVTtPQUZoSSxrQkFBa0IsQ0F5QjlCO0lBQUQseUJBQUM7Q0FBQSxBQXpCRCxJQXlCQztTQXpCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0lvblJvdXRlck91dGxldCwgTmF2Q29udHJvbGxlciwgSW9uQmFja0J1dHRvbkRlbGVnYXRlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuSW9uQmFja0J1dHRvbkRlbGVnYXRlLnByb3RvdHlwZS5vbkNsaWNrID0gKCkgPT4gbnVsbDtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLWJhY2stYnV0dG9uXCJcbn0pXG5leHBvcnQgY2xhc3MgSW9uaWNCYWNrQnV0dG9uRml4IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGVyT3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQsIHByaXZhdGUgbmF2Q3RybDogTmF2Q29udHJvbGxlciwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGVmYXVsdEhyZWYodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5kZWZhdWx0SHJlZiA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgZGVmYXVsdEhyZWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5kZWZhdWx0SHJlZjtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIG9uQ2xpY2soZXY6IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMucm91dGVyT3V0bGV0ICYmIHRoaXMucm91dGVyT3V0bGV0LmNhbkdvQmFjaygpKSB7XG4gICAgICAgICAgICB0aGlzLm5hdkN0cmwuYmFjayh7YW5pbWF0ZWQ6IHRydWV9KTtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvdXRlciAmJiB0aGlzLmRlZmF1bHRIcmVmICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubmF2Q3RybC5uYXZpZ2F0ZUJhY2sodGhpcy5kZWZhdWx0SHJlZik7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==