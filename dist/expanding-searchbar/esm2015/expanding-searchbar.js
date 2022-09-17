import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, Injector, Input } from "@angular/core";
import { unsubscribe } from "@co.mmons/rxjs-utils";
import { IonSearchbar } from "@ionic/angular";
import { ExpandingSearchbarStyles } from "./expanding-searchbar-styles";
const expandedCssClass = "ionx-expanding-searchbar-expanded";
const parentCssClass = "ionx-expanding-searchbar-parent";
let stylesInjected = false;
export class ExpandingSearchbar {
    constructor(injector, resolver, appRef, element, searchbar) {
        this.appRef = appRef;
        this.element = element;
        this.searchbar = searchbar;
        this.subscriptions = [];
        if (!stylesInjected) {
            let styles = resolver.resolveComponentFactory(ExpandingSearchbarStyles).create(injector);
            this.appRef.attachView(styles.hostView);
        }
    }
    get parentElement() {
        let parent = this.element.nativeElement.parentElement;
        if (parent) {
            return parent;
        }
    }
    get expanded() {
        return this.element.nativeElement.classList.contains(expandedCssClass);
    }
    set expanded(expanded) {
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
            setTimeout(() => this.element.nativeElement.querySelector(".searchbar-input").blur(), 50);
        }
    }
    expand() {
        this.expanded = true;
    }
    collapseIfPossible(cleared) {
        if (this.expanded && (cleared || !this.searchbar.value)) {
            setTimeout(() => {
                this.expanded = false;
            }, cleared ? 250 : 0);
        }
    }
    ngOnInit() {
        //this.subscriptions.push(this.searchbar.ionBlur.subscribe(() => this.collapseIfPossible()));
        this.subscriptions.push(this.searchbar.ionClear.subscribe(() => this.collapseIfPossible(true)));
        this.element.nativeElement.classList.add("ionx-expanding-searchbar");
    }
    ngOnDestroy() {
        unsubscribe(this.subscriptions);
    }
}
ExpandingSearchbar.decorators = [
    { type: Directive, args: [{
                selector: "ion-searchbar[ionx-expanding-searchbar]",
                exportAs: "ionxExpandingSearchbar"
            },] }
];
ExpandingSearchbar.ctorParameters = () => [
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: ElementRef },
    { type: IonSearchbar }
];
ExpandingSearchbar.propDecorators = {
    expanded: [{ type: Input, args: ["ionx-expanded",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kaW5nLXNlYXJjaGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leHBhbmRpbmctc2VhcmNoYmFyL2V4cGFuZGluZy1zZWFyY2hiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLGNBQWMsRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0csT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RSxNQUFNLGdCQUFnQixHQUFHLG1DQUFtQyxDQUFDO0FBQzdELE1BQU0sY0FBYyxHQUFHLGlDQUFpQyxDQUFDO0FBRXpELElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztBQU0zQixNQUFNLE9BQU8sa0JBQWtCO0lBRTNCLFlBQ0ksUUFBa0IsRUFDbEIsUUFBa0MsRUFDMUIsTUFBc0IsRUFDdEIsT0FBNEMsRUFDNUMsU0FBdUI7UUFGdkIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBcUM7UUFDNUMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQVEzQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFOdkMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNqQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsdUJBQXVCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUlELElBQUksYUFBYTtRQUViLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUN0RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE9BQU8sTUFBTSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVELElBQ1csUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxJQUFXLFFBQVEsQ0FBQyxRQUFpQjtRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBRW5CLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBRTdCO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3BELDRCQUE0QjtZQUM1QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzlHO0lBQ0wsQ0FBQztJQUVNLE1BQU07UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQsa0JBQWtCLENBQUMsT0FBaUI7UUFFaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyRCxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzFCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNKLDZGQUE2RjtRQUM3RixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELFdBQVc7UUFDUCxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQXZFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlDQUF5QztnQkFDbkQsUUFBUSxFQUFFLHdCQUF3QjthQUNyQzs7O1lBZHdFLFFBQVE7WUFBekQsd0JBQXdCO1lBQXhDLGNBQWM7WUFBdUMsVUFBVTtZQUUvRCxZQUFZOzs7dUJBc0NmLEtBQUssU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7dW5zdWJzY3JpYmV9IGZyb20gXCJAY28ubW1vbnMvcnhqcy11dGlsc1wiO1xuaW1wb3J0IHtJb25TZWFyY2hiYXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0V4cGFuZGluZ1NlYXJjaGJhclN0eWxlc30gZnJvbSBcIi4vZXhwYW5kaW5nLXNlYXJjaGJhci1zdHlsZXNcIjtcblxuY29uc3QgZXhwYW5kZWRDc3NDbGFzcyA9IFwiaW9ueC1leHBhbmRpbmctc2VhcmNoYmFyLWV4cGFuZGVkXCI7XG5jb25zdCBwYXJlbnRDc3NDbGFzcyA9IFwiaW9ueC1leHBhbmRpbmctc2VhcmNoYmFyLXBhcmVudFwiO1xuXG5sZXQgc3R5bGVzSW5qZWN0ZWQgPSBmYWxzZTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLXNlYXJjaGJhcltpb254LWV4cGFuZGluZy1zZWFyY2hiYXJdXCIsXG4gICAgZXhwb3J0QXM6IFwiaW9ueEV4cGFuZGluZ1NlYXJjaGJhclwiXG59KVxuZXhwb3J0IGNsYXNzIEV4cGFuZGluZ1NlYXJjaGJhciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MSW9uU2VhcmNoYmFyRWxlbWVudD4sXG4gICAgICAgIHByaXZhdGUgc2VhcmNoYmFyOiBJb25TZWFyY2hiYXIpIHtcblxuICAgICAgICBpZiAoIXN0eWxlc0luamVjdGVkKSB7XG4gICAgICAgICAgICBsZXQgc3R5bGVzID0gcmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRXhwYW5kaW5nU2VhcmNoYmFyU3R5bGVzKS5jcmVhdGUoaW5qZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhzdHlsZXMuaG9zdFZpZXcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgZ2V0IHBhcmVudEVsZW1lbnQoKSB7XG5cbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoXCJpb254LWV4cGFuZGVkXCIpXG4gICAgcHVibGljIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhleHBhbmRlZENzc0NsYXNzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGV4cGFuZGVkKGV4cGFuZGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudDtcblxuICAgICAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoZXhwYW5kZWRDc3NDbGFzcyk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChwYXJlbnRDc3NDbGFzcyk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaGJhci5zZXRGb2N1cygpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGV4cGFuZGVkQ3NzQ2xhc3MpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUocGFyZW50Q3NzQ2xhc3MpO1xuICAgICAgICAgICAgLy90aGlzLnNlYXJjaGJhci52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaGJhci1pbnB1dFwiKSBhcyBIVE1MRWxlbWVudCkuYmx1cigpLCA1MCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZXhwYW5kKCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUlmUG9zc2libGUoY2xlYXJlZD86IGJvb2xlYW4pIHtcblxuICAgICAgICBpZiAodGhpcy5leHBhbmRlZCAmJiAoY2xlYXJlZCB8fCAhdGhpcy5zZWFyY2hiYXIudmFsdWUpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCBjbGVhcmVkID8gMjUwIDogMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy90aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnNlYXJjaGJhci5pb25CbHVyLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbGxhcHNlSWZQb3NzaWJsZSgpKSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuc2VhcmNoYmFyLmlvbkNsZWFyLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbGxhcHNlSWZQb3NzaWJsZSh0cnVlKSkpO1xuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW9ueC1leHBhbmRpbmctc2VhcmNoYmFyXCIpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB1bnN1YnNjcmliZSh0aGlzLnN1YnNjcmlwdGlvbnMpO1xuICAgIH1cbn1cbiJdfQ==