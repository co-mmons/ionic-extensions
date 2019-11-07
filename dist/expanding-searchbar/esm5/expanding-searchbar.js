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
    ExpandingSearchbar.ctorParameters = function () { return [
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: ElementRef },
        { type: IonSearchbar }
    ]; };
    tslib_1.__decorate([
        Input("ionx-expanded")
    ], ExpandingSearchbar.prototype, "expanded", null);
    ExpandingSearchbar = tslib_1.__decorate([
        Directive({
            selector: "ion-searchbar[ionx-expanding-searchbar]",
            exportAs: "ionxExpandingSearchbar"
        })
    ], ExpandingSearchbar);
    return ExpandingSearchbar;
}());
export { ExpandingSearchbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kaW5nLXNlYXJjaGJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2V4cGFuZGluZy1zZWFyY2hiYXIvIiwic291cmNlcyI6WyJleHBhbmRpbmctc2VhcmNoYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFFLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXRFLElBQU0sZ0JBQWdCLEdBQUcsbUNBQW1DLENBQUM7QUFDN0QsSUFBTSxjQUFjLEdBQUcsaUNBQWlDLENBQUM7QUFFekQsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBTTNCO0lBRUksNEJBQ0ksUUFBa0IsRUFDbEIsUUFBa0MsRUFDMUIsTUFBc0IsRUFDdEIsT0FBNEMsRUFDNUMsU0FBdUI7UUFGdkIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBcUM7UUFDNUMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQVEzQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFOdkMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNqQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsdUJBQXVCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUlELHNCQUFJLDZDQUFhO2FBQWpCO1lBRUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQ3RELElBQUksTUFBTSxFQUFFO2dCQUNSLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyx3Q0FBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNFLENBQUM7YUFFRCxVQUFvQixRQUFpQjtZQUFyQyxpQkFjQztZQWJHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFFbkIsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7YUFFN0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3BELDRCQUE0QjtnQkFDNUIsVUFBVSxDQUFDLGNBQU0sT0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQWlCLENBQUMsSUFBSSxFQUFFLEVBQXBGLENBQW9GLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUc7UUFDTCxDQUFDOzs7T0FoQkE7SUFrQk0sbUNBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEIsVUFBbUIsT0FBaUI7UUFBcEMsaUJBT0M7UUFMRyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JELFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUMxQixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhHLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCx3Q0FBVyxHQUFYO1FBQ0ksV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkFoRWEsUUFBUTtnQkFDUix3QkFBd0I7Z0JBQ2xCLGNBQWM7Z0JBQ2IsVUFBVTtnQkFDUixZQUFZOztJQW1CbkM7UUFEQyxLQUFLLENBQUMsZUFBZSxDQUFDO3NEQUd0QjtJQTVCUSxrQkFBa0I7UUFKOUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHlDQUF5QztZQUNuRCxRQUFRLEVBQUUsd0JBQXdCO1NBQ3JDLENBQUM7T0FDVyxrQkFBa0IsQ0FvRTlCO0lBQUQseUJBQUM7Q0FBQSxBQXBFRCxJQW9FQztTQXBFWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHt1bnN1YnNjcmliZX0gZnJvbSBcIkBjby5tbW9ucy9yeGpzLXV0aWxzXCI7XG5pbXBvcnQge0lvblNlYXJjaGJhcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7RXhwYW5kaW5nU2VhcmNoYmFyU3R5bGVzfSBmcm9tIFwiLi9leHBhbmRpbmctc2VhcmNoYmFyLXN0eWxlc1wiO1xuXG5jb25zdCBleHBhbmRlZENzc0NsYXNzID0gXCJpb254LWV4cGFuZGluZy1zZWFyY2hiYXItZXhwYW5kZWRcIjtcbmNvbnN0IHBhcmVudENzc0NsYXNzID0gXCJpb254LWV4cGFuZGluZy1zZWFyY2hiYXItcGFyZW50XCI7XG5cbmxldCBzdHlsZXNJbmplY3RlZCA9IGZhbHNlO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpb24tc2VhcmNoYmFyW2lvbngtZXhwYW5kaW5nLXNlYXJjaGJhcl1cIixcbiAgICBleHBvcnRBczogXCJpb254RXhwYW5kaW5nU2VhcmNoYmFyXCJcbn0pXG5leHBvcnQgY2xhc3MgRXhwYW5kaW5nU2VhcmNoYmFyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJb25TZWFyY2hiYXJFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2hiYXI6IElvblNlYXJjaGJhcikge1xuXG4gICAgICAgIGlmICghc3R5bGVzSW5qZWN0ZWQpIHtcbiAgICAgICAgICAgIGxldCBzdHlsZXMgPSByZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShFeHBhbmRpbmdTZWFyY2hiYXJTdHlsZXMpLmNyZWF0ZShpbmplY3Rvcik7XG4gICAgICAgICAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHN0eWxlcy5ob3N0Vmlldyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBnZXQgcGFyZW50RWxlbWVudCgpIHtcblxuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dChcImlvbngtZXhwYW5kZWRcIilcbiAgICBwdWJsaWMgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGV4cGFuZGVkQ3NzQ2xhc3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZXhwYW5kZWQoZXhwYW5kZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChleHBhbmRlZENzc0NsYXNzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHBhcmVudENzc0NsYXNzKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoYmFyLnNldEZvY3VzKCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoZXhwYW5kZWRDc3NDbGFzcyk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShwYXJlbnRDc3NDbGFzcyk7XG4gICAgICAgICAgICAvL3RoaXMuc2VhcmNoYmFyLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoYmFyLWlucHV0XCIpIGFzIEhUTUxFbGVtZW50KS5ibHVyKCksIDUwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBleHBhbmQoKSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbGxhcHNlSWZQb3NzaWJsZShjbGVhcmVkPzogYm9vbGVhbikge1xuXG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkICYmIChjbGVhcmVkIHx8ICF0aGlzLnNlYXJjaGJhci52YWx1ZSkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIGNsZWFyZWQgPyAyNTAgOiAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvL3RoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuc2VhcmNoYmFyLmlvbkJsdXIuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29sbGFwc2VJZlBvc3NpYmxlKCkpKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5zZWFyY2hiYXIuaW9uQ2xlYXIuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29sbGFwc2VJZlBvc3NpYmxlKHRydWUpKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpb254LWV4cGFuZGluZy1zZWFyY2hiYXJcIik7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlKHRoaXMuc3Vic2NyaXB0aW9ucyk7XG4gICAgfVxufVxuIl19