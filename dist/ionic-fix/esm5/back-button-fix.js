import { __decorate, __param } from "tslib";
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
    __decorate([
        Input()
    ], IonicBackButtonFix.prototype, "defaultHref", null);
    __decorate([
        HostListener("click", ["$event"])
    ], IonicBackButtonFix.prototype, "onClick", null);
    IonicBackButtonFix = __decorate([
        Directive({
            selector: "ion-back-button"
        }),
        __param(1, Optional())
    ], IonicBackButtonFix);
    return IonicBackButtonFix;
}());
export { IonicBackButtonFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24tZml4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW9uaWMtZml4LyIsInNvdXJjZXMiOlsiYmFjay1idXR0b24tZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRixxQkFBcUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO0FBS3JEO0lBRUksNEJBQW9CLE1BQWMsRUFBc0IsWUFBNkIsRUFBVSxPQUFzQixFQUFVLFVBQXNCO1FBQWpJLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBc0IsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDckosQ0FBQztJQUdELHNCQUFJLDJDQUFXO2FBR2Y7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUNyRCxDQUFDO2FBTEQsVUFBZ0IsS0FBYTtZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBTUQsb0NBQU8sR0FBUCxVQUFRLEVBQVM7UUFFYixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUV2QjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksRUFBRTtZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQzs7Z0JBdEIyQixNQUFNO2dCQUFvQyxlQUFlLHVCQUFoRCxRQUFRO2dCQUEyRCxhQUFhO2dCQUFzQixVQUFVOztJQUlySjtRQURDLEtBQUssRUFBRTt5REFHUDtJQU1EO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FEQVdqQztJQXhCUSxrQkFBa0I7UUFIOUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtTQUM5QixDQUFDO1FBR3VDLFdBQUEsUUFBUSxFQUFFLENBQUE7T0FGdEMsa0JBQWtCLENBeUI5QjtJQUFELHlCQUFDO0NBQUEsQUF6QkQsSUF5QkM7U0F6Qlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9wdGlvbmFsfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7SW9uUm91dGVyT3V0bGV0LCBOYXZDb250cm9sbGVyLCBJb25CYWNrQnV0dG9uRGVsZWdhdGV9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuXG5Jb25CYWNrQnV0dG9uRGVsZWdhdGUucHJvdG90eXBlLm9uQ2xpY2sgPSAoKSA9PiBudWxsO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24tYmFjay1idXR0b25cIlxufSlcbmV4cG9ydCBjbGFzcyBJb25pY0JhY2tCdXR0b25GaXgge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXJPdXRsZXQ6IElvblJvdXRlck91dGxldCwgcHJpdmF0ZSBuYXZDdHJsOiBOYXZDb250cm9sbGVyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkZWZhdWx0SHJlZih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmRlZmF1bHRIcmVmID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBkZWZhdWx0SHJlZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmRlZmF1bHRIcmVmO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgb25DbGljayhldjogRXZlbnQpIHtcblxuICAgICAgICBpZiAodGhpcy5yb3V0ZXJPdXRsZXQgJiYgdGhpcy5yb3V0ZXJPdXRsZXQuY2FuR29CYWNrKCkpIHtcbiAgICAgICAgICAgIHRoaXMubmF2Q3RybC5iYWNrKHthbmltYXRlZDogdHJ1ZX0pO1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucm91dGVyICYmIHRoaXMuZGVmYXVsdEhyZWYgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5uYXZDdHJsLm5hdmlnYXRlQmFjayh0aGlzLmRlZmF1bHRIcmVmKTtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=