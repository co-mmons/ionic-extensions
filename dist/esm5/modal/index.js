import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ModalControllerComponent, ModalControllerContentComponent } from "./modal-controller";
export { ModalControllerComponent } from "./modal-controller";
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule = tslib_1.__decorate([
        NgModule({
            declarations: [ModalControllerComponent, ModalControllerContentComponent],
            exports: [ModalControllerComponent],
            imports: [CommonModule, IonicModule],
            entryComponents: [ModalControllerComponent, ModalControllerContentComponent]
        })
    ], ModalModule);
    return ModalModule;
}());
export { ModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbIm1vZGFsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFDLHdCQUF3QixFQUFFLCtCQUErQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFN0YsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFRNUQ7SUFBQTtJQUNBLENBQUM7SUFEWSxXQUFXO1FBTnZCLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRSxDQUFDLHdCQUF3QixFQUFFLCtCQUErQixDQUFDO1lBQ3pFLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ25DLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUM7WUFDcEMsZUFBZSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsK0JBQStCLENBQUM7U0FDL0UsQ0FBQztPQUNXLFdBQVcsQ0FDdkI7SUFBRCxrQkFBQztDQUFBLEFBREQsSUFDQztTQURZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SW9uaWNNb2R1bGV9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuXG5pbXBvcnQge01vZGFsQ29udHJvbGxlckNvbXBvbmVudCwgTW9kYWxDb250cm9sbGVyQ29udGVudENvbXBvbmVudH0gZnJvbSBcIi4vbW9kYWwtY29udHJvbGxlclwiO1xuXG5leHBvcnQge01vZGFsQ29udHJvbGxlckNvbXBvbmVudH0gZnJvbSBcIi4vbW9kYWwtY29udHJvbGxlclwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW01vZGFsQ29udHJvbGxlckNvbXBvbmVudCwgTW9kYWxDb250cm9sbGVyQ29udGVudENvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW01vZGFsQ29udHJvbGxlckNvbXBvbmVudF0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW9uaWNNb2R1bGVdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW01vZGFsQ29udHJvbGxlckNvbXBvbmVudCwgTW9kYWxDb250cm9sbGVyQ29udGVudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxNb2R1bGUge1xufVxuIl19