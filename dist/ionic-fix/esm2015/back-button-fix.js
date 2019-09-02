import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Input } from "@angular/core";
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
    tslib_1.__metadata("design:paramtypes", [Router, IonRouterOutlet, NavController, ElementRef])
], IonicBackButtonFix);
export { IonicBackButtonFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24tZml4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW9uaWMtZml4LyIsInNvdXJjZXMiOlsiYmFjay1idXR0b24tZml4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXJGLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBS3JELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBRTNCLFlBQW9CLE1BQWMsRUFBVSxZQUE2QixFQUFVLE9BQXNCLEVBQVUsVUFBc0I7UUFBckgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQ3pJLENBQUM7SUFHRCxJQUFJLFdBQVcsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDdEQsQ0FBQztJQUNELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQ3JELENBQUM7SUFHRCxPQUFPLENBQUMsRUFBUztRQUViLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBRXZCO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQW5CRztJQURDLEtBQUssRUFBRTs7O3FEQUdQO0FBTUQ7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7OzZDQUN0QixLQUFLOztpREFVaEI7QUF4QlEsa0JBQWtCO0lBSDlCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxpQkFBaUI7S0FDOUIsQ0FBQzs2Q0FHOEIsTUFBTSxFQUF3QixlQUFlLEVBQW1CLGFBQWEsRUFBc0IsVUFBVTtHQUZoSSxrQkFBa0IsQ0F5QjlCO1NBekJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7SW9uUm91dGVyT3V0bGV0LCBOYXZDb250cm9sbGVyLCBJb25CYWNrQnV0dG9uRGVsZWdhdGV9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuXG5Jb25CYWNrQnV0dG9uRGVsZWdhdGUucHJvdG90eXBlLm9uQ2xpY2sgPSAoKSA9PiBudWxsO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24tYmFjay1idXR0b25cIlxufSlcbmV4cG9ydCBjbGFzcyBJb25pY0JhY2tCdXR0b25GaXgge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSByb3V0ZXJPdXRsZXQ6IElvblJvdXRlck91dGxldCwgcHJpdmF0ZSBuYXZDdHJsOiBOYXZDb250cm9sbGVyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkZWZhdWx0SHJlZih2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmRlZmF1bHRIcmVmID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBkZWZhdWx0SHJlZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmRlZmF1bHRIcmVmO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgb25DbGljayhldjogRXZlbnQpIHtcblxuICAgICAgICBpZiAodGhpcy5yb3V0ZXJPdXRsZXQgJiYgdGhpcy5yb3V0ZXJPdXRsZXQuY2FuR29CYWNrKCkpIHtcbiAgICAgICAgICAgIHRoaXMubmF2Q3RybC5iYWNrKHthbmltYXRlZDogdHJ1ZX0pO1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucm91dGVyICYmIHRoaXMuZGVmYXVsdEhyZWYgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5uYXZDdHJsLm5hdmlnYXRlQmFjayh0aGlzLmRlZmF1bHRIcmVmKTtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG59Il19