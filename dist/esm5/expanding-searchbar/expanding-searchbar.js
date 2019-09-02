import * as tslib_1 from "tslib";
import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, Injector, Input } from "@angular/core";
import { unsubscribe } from "@co.mmons/rxjs-utils";
import { IonSearchbar } from "@ionic/angular";
import { ExpandingSearchbarStyles } from "./expanding-searchbar-styles";
var expandedCssClass = "ionx-expanding-searchbar-expanded";
var parentCssClass = "ionx-expanding-searchbar-parent";
var stylesInjected = false;
var ExpandingSearchbar = /** @class */ (function () {
    function ExpandingSearchbar(injector, resolver, appRef, element, searchbar) {
        this.appRef = appRef;
        this.element = element;
        this.searchbar = searchbar;
        this.subscriptions = [];
        if (!stylesInjected) {
            var styles = resolver.resolveComponentFactory(ExpandingSearchbarStyles).create(injector);
            this.appRef.attachView(styles.hostView);
        }
    }
    Object.defineProperty(ExpandingSearchbar.prototype, "parentElement", {
        get: function () {
            var parent = this.element.nativeElement.parentElement;
            if (parent) {
                return parent;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandingSearchbar.prototype, "expanded", {
        get: function () {
            return this.element.nativeElement.classList.contains(expandedCssClass);
        },
        set: function (expanded) {
            var _this = this;
            this.parentElement;
            if (expanded) {
                this.element.nativeElement.classList.add(expandedCssClass);
                this.parentElement.classList.add(parentCssClass);
                this.searchbar.setFocus();
            }
            else {
                this.element.nativeElement.classList.remove(expandedCssClass);
                this.parentElement.classList.remove(parentCssClass);
                //this.searchbar.value = "";
                setTimeout(function () { return _this.element.nativeElement.querySelector(".searchbar-input").blur(); }, 50);
            }
        },
        enumerable: true,
        configurable: true
    });
    ExpandingSearchbar.prototype.expand = function () {
        this.expanded = true;
    };
    ExpandingSearchbar.prototype.collapseIfPossible = function (cleared) {
        var _this = this;
        if (this.expanded && (cleared || !this.searchbar.value)) {
            setTimeout(function () {
                _this.expanded = false;
            }, cleared ? 250 : 0);
        }
    };
    ExpandingSearchbar.prototype.ngOnInit = function () {
        var _this = this;
        //this.subscriptions.push(this.searchbar.ionBlur.subscribe(() => this.collapseIfPossible()));
        this.subscriptions.push(this.searchbar.ionClear.subscribe(function () { return _this.collapseIfPossible(true); }));
        this.element.nativeElement.classList.add("ionx-expanding-searchbar");
    };
    ExpandingSearchbar.prototype.ngOnDestroy = function () {
        unsubscribe(this.subscriptions);
    };
    tslib_1.__decorate([
        Input("ionx-expanded"),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], ExpandingSearchbar.prototype, "expanded", null);
    ExpandingSearchbar = tslib_1.__decorate([
        Directive({
            selector: "ion-searchbar[ionx-expanding-searchbar]",
            exportAs: "ionxExpandingSearchbar"
        }),
        tslib_1.__metadata("design:paramtypes", [Injector,
            ComponentFactoryResolver,
            ApplicationRef,
            ElementRef,
            IonSearchbar])
    ], ExpandingSearchbar);
    return ExpandingSearchbar;
}());
export { ExpandingSearchbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kaW5nLXNlYXJjaGJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsiZXhwYW5kaW5nLXNlYXJjaGJhci9leHBhbmRpbmctc2VhcmNoYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFFLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXRFLElBQU0sZ0JBQWdCLEdBQUcsbUNBQW1DLENBQUM7QUFDN0QsSUFBTSxjQUFjLEdBQUcsaUNBQWlDLENBQUM7QUFFekQsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBTTNCO0lBRUksNEJBQ0ksUUFBa0IsRUFDbEIsUUFBa0MsRUFDMUIsTUFBc0IsRUFDdEIsT0FBNEMsRUFDNUMsU0FBdUI7UUFGdkIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBcUM7UUFDNUMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQVEzQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFOdkMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNqQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsdUJBQXVCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUlELHNCQUFJLDZDQUFhO2FBQWpCO1lBRUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQ3RELElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyx3Q0FBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNFLENBQUM7YUFFRCxVQUFvQixRQUFpQjtZQUFyQyxpQkFjQztZQWJHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFFbkIsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7YUFFN0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3BELDRCQUE0QjtnQkFDNUIsVUFBVSxDQUFDLGNBQU0sT0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQWlCLENBQUMsSUFBSSxFQUFFLEVBQXBGLENBQW9GLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUc7UUFDTCxDQUFDOzs7T0FoQkE7SUFrQk0sbUNBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEIsVUFBbUIsT0FBaUI7UUFBcEMsaUJBT0M7UUFMRyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JELFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUMxQixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhHLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0ksV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBekNEO1FBREMsS0FBSyxDQUFDLGVBQWUsQ0FBQzs7O3NEQUd0QjtJQTVCUSxrQkFBa0I7UUFKOUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHlDQUF5QztZQUNuRCxRQUFRLEVBQUUsd0JBQXdCO1NBQ3JDLENBQUM7aURBSWdCLFFBQVE7WUFDUix3QkFBd0I7WUFDbEIsY0FBYztZQUNiLFVBQVU7WUFDUixZQUFZO09BUDFCLGtCQUFrQixDQW9FOUI7SUFBRCx5QkFBQztDQUFBLEFBcEVELElBb0VDO1NBcEVZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwbGljYXRpb25SZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RvciwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3Vuc3Vic2NyaWJlfSBmcm9tIFwiQGNvLm1tb25zL3J4anMtdXRpbHNcIjtcbmltcG9ydCB7SW9uU2VhcmNoYmFyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtFeHBhbmRpbmdTZWFyY2hiYXJTdHlsZXN9IGZyb20gXCIuL2V4cGFuZGluZy1zZWFyY2hiYXItc3R5bGVzXCI7XG5cbmNvbnN0IGV4cGFuZGVkQ3NzQ2xhc3MgPSBcImlvbngtZXhwYW5kaW5nLXNlYXJjaGJhci1leHBhbmRlZFwiO1xuY29uc3QgcGFyZW50Q3NzQ2xhc3MgPSBcImlvbngtZXhwYW5kaW5nLXNlYXJjaGJhci1wYXJlbnRcIjtcblxubGV0IHN0eWxlc0luamVjdGVkID0gZmFsc2U7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcImlvbi1zZWFyY2hiYXJbaW9ueC1leHBhbmRpbmctc2VhcmNoYmFyXVwiLFxuICAgIGV4cG9ydEFzOiBcImlvbnhFeHBhbmRpbmdTZWFyY2hiYXJcIlxufSlcbmV4cG9ydCBjbGFzcyBFeHBhbmRpbmdTZWFyY2hiYXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElvblNlYXJjaGJhckVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIHNlYXJjaGJhcjogSW9uU2VhcmNoYmFyKSB7XG5cbiAgICAgICAgaWYgKCFzdHlsZXNJbmplY3RlZCkge1xuICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEV4cGFuZGluZ1NlYXJjaGJhclN0eWxlcykuY3JlYXRlKGluamVjdG9yKTtcbiAgICAgICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoc3R5bGVzLmhvc3RWaWV3KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIGdldCBwYXJlbnRFbGVtZW50KCkge1xuXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KFwiaW9ueC1leHBhbmRlZFwiKVxuICAgIHB1YmxpYyBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoZXhwYW5kZWRDc3NDbGFzcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBleHBhbmRlZChleHBhbmRlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGV4cGFuZGVkQ3NzQ2xhc3MpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQocGFyZW50Q3NzQ2xhc3MpO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hiYXIuc2V0Rm9jdXMoKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShleHBhbmRlZENzc0NsYXNzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHBhcmVudENzc0NsYXNzKTtcbiAgICAgICAgICAgIC8vdGhpcy5zZWFyY2hiYXIudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hiYXItaW5wdXRcIikgYXMgSFRNTEVsZW1lbnQpLmJsdXIoKSwgNTApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGV4cGFuZCgpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgY29sbGFwc2VJZlBvc3NpYmxlKGNsZWFyZWQ/OiBib29sZWFuKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQgJiYgKGNsZWFyZWQgfHwgIXRoaXMuc2VhcmNoYmFyLnZhbHVlKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgY2xlYXJlZCA/IDI1MCA6IDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5zZWFyY2hiYXIuaW9uQmx1ci5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb2xsYXBzZUlmUG9zc2libGUoKSkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnNlYXJjaGJhci5pb25DbGVhci5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb2xsYXBzZUlmUG9zc2libGUodHJ1ZSkpKTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImlvbngtZXhwYW5kaW5nLXNlYXJjaGJhclwiKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUodGhpcy5zdWJzY3JpcHRpb25zKTtcbiAgICB9XG59XG4iXX0=