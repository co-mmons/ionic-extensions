import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
let IonicItemTargetFix = class IonicItemTargetFix {
    constructor(element) {
        this.element = element;
    }
    ngAfterViewInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
};
IonicItemTargetFix.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    Input()
], IonicItemTargetFix.prototype, "target", void 0);
IonicItemTargetFix = tslib_1.__decorate([
    Directive({
        selector: "ion-item[target]"
    })
], IonicItemTargetFix);
export { IonicItemTargetFix };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS10YXJnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9pb25pYy1maXgvIiwic291cmNlcyI6WyJpdGVtLXRhcmdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUs5QyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUUzQixZQUFvQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUNwRCxDQUFDO0lBS0ssZUFBZTs7WUFFakIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUViLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBRXpCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7b0JBRXRJLElBQUksQ0FBQyxDQUFDLEVBQUU7d0JBQ0osTUFBTSxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3FCQUN4Qjt5QkFBTTt3QkFDSCxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3pDO2lCQUNKO2FBQ0o7UUFDTCxDQUFDO0tBQUE7Q0FDSixDQUFBOztZQXRCZ0MsVUFBVTs7QUFJdkM7SUFEQyxLQUFLLEVBQUU7a0RBQ087QUFOTixrQkFBa0I7SUFIOUIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGtCQUFrQjtLQUMvQixDQUFDO0dBQ1csa0JBQWtCLENBd0I5QjtTQXhCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiaW9uLWl0ZW1bdGFyZ2V0XVwiXG59KVxuZXhwb3J0IGNsYXNzIElvbmljSXRlbVRhcmdldEZpeCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICB0YXJnZXQ6IHN0cmluZztcblxuICAgIGFzeW5jIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAyMDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhID0gKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLml0ZW0tbmF0aXZlXCIpKSB8fCB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoaSAqIDEwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYS5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgdGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==