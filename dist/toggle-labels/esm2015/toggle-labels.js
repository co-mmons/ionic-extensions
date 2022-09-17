import { Component, ContentChild, Input } from "@angular/core";
import { IonToggle } from "@ionic/angular";
export class ToggleLabels {
    constructor() {
    }
    switchOn() {
        this.toggle.checked = true;
    }
    switchOff() {
        this.toggle.checked = false;
    }
}
ToggleLabels.decorators = [
    { type: Component, args: [{
                selector: "ionx-toggle-labels",
                template: "<span ionx--off (click)=\"switchOff()\">\n    <ng-template [ngIf]=\"!!off\">{{off}}</ng-template>\n    <ng-content select=\"[slot=off]\"></ng-content>\n    </span>\n\n<ng-content select=\"ion-toggle\"></ng-content>\n\n<span ionx--on (click)=\"switchOn()\">\n    <ng-template [ngIf]=\"!!on\">{{on}}</ng-template>\n    <ng-content select=\"[slot=on]\"></ng-content>\n</span>\n",
                styles: [":host{display:flex;align-items:center}:host ::ng-deep ion-toggle{padding-inline-start:2px;padding-inline-end:2px}:host [ionx--on]{cursor:pointer;margin-left:4px}:host [ionx--off]{cursor:pointer;margin-right:4px}:host-context(.item-label-stacked){align-self:flex-start}:host-context(.ios .item-label-stacked){margin-top:2px;margin-bottom:2px}\n"]
            },] }
];
ToggleLabels.ctorParameters = () => [];
ToggleLabels.propDecorators = {
    on: [{ type: Input }],
    off: [{ type: Input }],
    toggle: [{ type: ContentChild, args: [IonToggle, { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWxhYmVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90b2dnbGUtbGFiZWxzL3RvZ2dsZS1sYWJlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU96QyxNQUFNLE9BQU8sWUFBWTtJQUVyQjtJQUNBLENBQUM7SUFXRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7OztZQXpCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsa1lBQWlDOzthQUVwQzs7OztpQkFNSSxLQUFLO2tCQUdMLEtBQUs7cUJBR0wsWUFBWSxTQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SW9uVG9nZ2xlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC10b2dnbGUtbGFiZWxzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwidG9nZ2xlLWxhYmVscy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJ0b2dnbGUtbGFiZWxzLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlTGFiZWxzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgb2ZmOiBzdHJpbmc7XG5cbiAgICBAQ29udGVudENoaWxkKElvblRvZ2dsZSwge3N0YXRpYzogZmFsc2V9KVxuICAgIHByaXZhdGUgdG9nZ2xlOiBJb25Ub2dnbGU7XG5cbiAgICBzd2l0Y2hPbigpIHtcbiAgICAgICAgdGhpcy50b2dnbGUuY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgc3dpdGNoT2ZmKCkge1xuICAgICAgICB0aGlzLnRvZ2dsZS5jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuXG59XG4iXX0=