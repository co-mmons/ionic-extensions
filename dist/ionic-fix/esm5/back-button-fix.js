import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Input, Optional } from "@angular/core";
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
    IonicBackButtonFix.ctorParameters = function () { return [
        { type: Router },
        { type: IonRouterOutlet, decorators: [{ type: Optional }] },
        { type: NavController },
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        Input()
    ], IonicBackButtonFix.prototype, "defaultHref", null);
    tslib_1.__decorate([
        HostListener("click", ["$event"])
    ], IonicBackButtonFix.prototype, "onClick", null);
    IonicBackButtonFix = tslib_1.__decorate([
        Directive({
            selector: "ion-back-button"
        }),
        tslib_1.__param(1, Optional())
    ], IonicBackButtonFix);
    return IonicBackButtonFix;
}());
export { IonicBackButtonFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24tZml4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW9uaWMtZml4LyIsInNvdXJjZXMiOlsiYmFjay1idXR0b24tZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRixxQkFBcUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO0FBS3JEO0lBRUksNEJBQW9CLE1BQWMsRUFBc0IsWUFBNkIsRUFBVSxPQUFzQixFQUFVLFVBQXNCO1FBQWpJLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBc0IsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDckosQ0FBQztJQUdELHNCQUFJLDJDQUFXO2FBR2Y7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUNyRCxDQUFDO2FBTEQsVUFBZ0IsS0FBYTtZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBTUQsb0NBQU8sR0FBUCxVQUFRLEVBQVM7UUFFYixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUV2QjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksRUFBRTtZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQzs7Z0JBdEIyQixNQUFNO2dCQUFvQyxlQUFlLHVCQUFoRCxRQUFRO2dCQUEyRCxhQUFhO2dCQUFzQixVQUFVOztJQUlySjtRQURDLEtBQUssRUFBRTt5REFHUDtJQU1EO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FEQVdqQztJQXhCUSxrQkFBa0I7UUFIOUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtTQUM5QixDQUFDO1FBR3VDLG1CQUFBLFFBQVEsRUFBRSxDQUFBO09BRnRDLGtCQUFrQixDQXlCOUI7SUFBRCx5QkFBQztDQUFBLEFBekJELElBeUJDO1NBekJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPcHRpb25hbH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0lvblJvdXRlck91dGxldCwgTmF2Q29udHJvbGxlciwgSW9uQmFja0J1dHRvbkRlbGVnYXRlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuSW9uQmFja0J1dHRvbkRlbGVnYXRlLnByb3RvdHlwZS5vbkNsaWNrID0gKCkgPT4gbnVsbDtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLWJhY2stYnV0dG9uXCJcbn0pXG5leHBvcnQgY2xhc3MgSW9uaWNCYWNrQnV0dG9uRml4IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyT3V0bGV0OiBJb25Sb3V0ZXJPdXRsZXQsIHByaXZhdGUgbmF2Q3RybDogTmF2Q29udHJvbGxlciwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGVmYXVsdEhyZWYodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5kZWZhdWx0SHJlZiA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgZGVmYXVsdEhyZWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5kZWZhdWx0SHJlZjtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIG9uQ2xpY2soZXY6IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMucm91dGVyT3V0bGV0ICYmIHRoaXMucm91dGVyT3V0bGV0LmNhbkdvQmFjaygpKSB7XG4gICAgICAgICAgICB0aGlzLm5hdkN0cmwuYmFjayh7YW5pbWF0ZWQ6IHRydWV9KTtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJvdXRlciAmJiB0aGlzLmRlZmF1bHRIcmVmICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubmF2Q3RybC5uYXZpZ2F0ZUJhY2sodGhpcy5kZWZhdWx0SHJlZik7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19