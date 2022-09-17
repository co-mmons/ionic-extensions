import { Directive, ElementRef, HostListener, Input, Optional } from "@angular/core";
import { Router } from "@angular/router";
import { IonRouterOutlet, NavController, IonBackButtonDelegate } from "@ionic/angular";
IonBackButtonDelegate.prototype.onClick = () => null;
export class IonicBackButtonFix {
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
}
IonicBackButtonFix.decorators = [
    { type: Directive, args: [{
                selector: "ion-back-button"
            },] }
];
IonicBackButtonFix.ctorParameters = () => [
    { type: Router },
    { type: IonRouterOutlet, decorators: [{ type: Optional }] },
    { type: NavController },
    { type: ElementRef }
];
IonicBackButtonFix.propDecorators = {
    defaultHref: [{ type: Input }],
    onClick: [{ type: HostListener, args: ["click", ["$event"],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24tZml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2lvbmljLWZpeC9iYWNrLWJ1dHRvbi1maXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckYscUJBQXFCLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFLckQsTUFBTSxPQUFPLGtCQUFrQjtJQUUzQixZQUFvQixNQUFjLEVBQXNCLFlBQTZCLEVBQVUsT0FBc0IsRUFBVSxVQUFzQjtRQUFqSSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQXNCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQ3JKLENBQUM7SUFFRCxJQUNJLFdBQVcsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDdEQsQ0FBQztJQUNELElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQ3JELENBQUM7SUFHRCxPQUFPLENBQUMsRUFBUztRQUViLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBRXZCO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDOzs7WUEzQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7YUFDOUI7OztZQVBPLE1BQU07WUFDTixlQUFlLHVCQVNrQixRQUFRO1lBVHhCLGFBQWE7WUFGbkIsVUFBVTs7OzBCQWN4QixLQUFLO3NCQVFMLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3B0aW9uYWx9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtJb25Sb3V0ZXJPdXRsZXQsIE5hdkNvbnRyb2xsZXIsIElvbkJhY2tCdXR0b25EZWxlZ2F0ZX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5cbklvbkJhY2tCdXR0b25EZWxlZ2F0ZS5wcm90b3R5cGUub25DbGljayA9ICgpID0+IG51bGw7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcImlvbi1iYWNrLWJ1dHRvblwiXG59KVxuZXhwb3J0IGNsYXNzIElvbmljQmFja0J1dHRvbkZpeCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlck91dGxldDogSW9uUm91dGVyT3V0bGV0LCBwcml2YXRlIG5hdkN0cmw6IE5hdkNvbnRyb2xsZXIsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRlZmF1bHRIcmVmKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZGVmYXVsdEhyZWYgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGRlZmF1bHRIcmVmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZGVmYXVsdEhyZWY7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIsIFtcIiRldmVudFwiXSlcbiAgICBvbkNsaWNrKGV2OiBFdmVudCkge1xuXG4gICAgICAgIGlmICh0aGlzLnJvdXRlck91dGxldCAmJiB0aGlzLnJvdXRlck91dGxldC5jYW5Hb0JhY2soKSkge1xuICAgICAgICAgICAgdGhpcy5uYXZDdHJsLmJhY2soe2FuaW1hdGVkOiB0cnVlfSk7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5yb3V0ZXIgJiYgdGhpcy5kZWZhdWx0SHJlZiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm5hdkN0cmwubmF2aWdhdGVCYWNrKHRoaXMuZGVmYXVsdEhyZWYpO1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==