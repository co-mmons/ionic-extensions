import { __awaiter } from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
export class IonicItemTargetFix {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.target) {
                for (let i = 1; i < 20; i++) {
                    const a = (this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".item-native")) || undefined;
                    if (!a) {
                        yield sleep(i * 100);
                    }
                    else {
                        a.setAttribute("target", this.target);
                    }
                }
            }
        });
    }
}
IonicItemTargetFix.decorators = [
    { type: Directive, args: [{
                selector: "ion-item[target]"
            },] }
];
IonicItemTargetFix.ctorParameters = () => [
    { type: ElementRef }
];
IonicItemTargetFix.propDecorators = {
    target: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS10YXJnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW9uaWMtZml4L2l0ZW0tdGFyZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBSzlDLE1BQU0sT0FBTyxrQkFBa0I7SUFFM0IsWUFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQUtLLGVBQWU7O1lBRWpCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFFYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUV6QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDO29CQUV0SSxJQUFJLENBQUMsQ0FBQyxFQUFFO3dCQUNKLE1BQU0sS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztxQkFDeEI7eUJBQU07d0JBQ0gsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUN6QztpQkFDSjthQUNKO1FBQ0wsQ0FBQztLQUFBOzs7WUExQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7YUFDL0I7OztZQUxrQixVQUFVOzs7cUJBV3hCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLWl0ZW1bdGFyZ2V0XVwiXG59KVxuZXhwb3J0IGNsYXNzIElvbmljSXRlbVRhcmdldEZpeCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICB0YXJnZXQ6IHN0cmluZztcblxuICAgIGFzeW5jIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAyMDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLml0ZW0tbmF0aXZlXCIpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoaSAqIDEwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYS5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgdGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==