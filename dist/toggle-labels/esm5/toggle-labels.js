import { __decorate } from "tslib";
import { Component, ContentChild, Input } from "@angular/core";
import { IonToggle } from "@ionic/angular";
var ToggleLabels = /** @class */ (function () {
    function ToggleLabels() {
    }
    ToggleLabels.prototype.switchOn = function () {
        this.toggle.checked = true;
    };
    ToggleLabels.prototype.switchOff = function () {
        this.toggle.checked = false;
    };
    __decorate([
        Input()
    ], ToggleLabels.prototype, "on", void 0);
    __decorate([
        Input()
    ], ToggleLabels.prototype, "off", void 0);
    __decorate([
        ContentChild(IonToggle, { static: false })
    ], ToggleLabels.prototype, "toggle", void 0);
    ToggleLabels = __decorate([
        Component({
            selector: "ionx-toggle-labels",
            template: "<span ionx--off (click)=\"switchOff()\">\n    <ng-template [ngIf]=\"!!off\">{{off}}</ng-template>\n    <ng-content select=\"[slot=off]\"></ng-content>\n    </span>\n\n<ng-content select=\"ion-toggle\"></ng-content>\n\n<span ionx--on (click)=\"switchOn()\">\n    <ng-template [ngIf]=\"!!on\">{{on}}</ng-template>\n    <ng-content select=\"[slot=on]\"></ng-content>\n</span>\n",
            styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}:host ::ng-deep ion-toggle{-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:2px;padding-inline-end:2px}:host [ionx--on]{cursor:pointer;margin-left:4px}:host [ionx--off]{cursor:pointer;margin-right:4px}:host-context(.item-label-stacked){align-self:flex-start}:host-context(.ios.item-label-stacked){margin-top:2px;margin-bottom:2px}"]
        })
    ], ToggleLabels);
    return ToggleLabels;
}());
export { ToggleLabels };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLWxhYmVscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3RvZ2dsZS1sYWJlbHMvIiwic291cmNlcyI6WyJ0b2dnbGUtbGFiZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBT3pDO0lBRUk7SUFDQSxDQUFDO0lBV0QsK0JBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBZEQ7UUFEQyxLQUFLLEVBQUU7NENBQ0c7SUFHWDtRQURDLEtBQUssRUFBRTs2Q0FDSTtJQUdaO1FBREMsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQztnREFDZjtJQVpqQixZQUFZO1FBTHhCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsa1lBQWlDOztTQUVwQyxDQUFDO09BQ1csWUFBWSxDQXNCeEI7SUFBRCxtQkFBQztDQUFBLEFBdEJELElBc0JDO1NBdEJZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SW9uVG9nZ2xlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC10b2dnbGUtbGFiZWxzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwidG9nZ2xlLWxhYmVscy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJ0b2dnbGUtbGFiZWxzLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlTGFiZWxzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgb246IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgb2ZmOiBzdHJpbmc7XG5cbiAgICBAQ29udGVudENoaWxkKElvblRvZ2dsZSwge3N0YXRpYzogZmFsc2V9KVxuICAgIHByaXZhdGUgdG9nZ2xlOiBJb25Ub2dnbGU7XG5cbiAgICBzd2l0Y2hPbigpIHtcbiAgICAgICAgdGhpcy50b2dnbGUuY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgc3dpdGNoT2ZmKCkge1xuICAgICAgICB0aGlzLnRvZ2dsZS5jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuXG59XG4iXX0=