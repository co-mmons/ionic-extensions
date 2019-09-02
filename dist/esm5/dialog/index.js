import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { ButtonsModule } from "../buttons/index";
import { Dialog } from "./dialog";
import { DialogController } from "./dialog-controller";
export { Dialog } from "./dialog";
export { DialogController } from "./dialog-controller";
export { dialogData } from "./dialog-data-symbol";
export { dialogInstance } from "./dialog-instance-symbol";
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule = tslib_1.__decorate([
        NgModule({
            declarations: [Dialog],
            imports: [IntlModule, IonicModule, CommonModule, ButtonsModule],
            entryComponents: [Dialog],
            providers: [DialogController]
        })
    ], DialogModule);
    return DialogModule;
}());
export { DialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbImRpYWxvZy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRWhDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFReEQ7SUFBQTtJQUNBLENBQUM7SUFEWSxZQUFZO1FBTnhCLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7WUFDL0QsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1NBQ2hDLENBQUM7T0FDVyxZQUFZLENBQ3hCO0lBQUQsbUJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge0lvbmljTW9kdWxlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7QnV0dG9uc01vZHVsZX0gZnJvbSBcIi4uL2J1dHRvbnMvaW5kZXhcIjtcbmltcG9ydCB7RGlhbG9nfSBmcm9tIFwiLi9kaWFsb2dcIjtcbmltcG9ydCB7RGlhbG9nQ29udHJvbGxlcn0gZnJvbSBcIi4vZGlhbG9nLWNvbnRyb2xsZXJcIjtcblxuZXhwb3J0IHtEaWFsb2d9IGZyb20gXCIuL2RpYWxvZ1wiO1xuZXhwb3J0IHtEaWFsb2dCdXR0b259IGZyb20gXCIuL2RpYWxvZy1idXR0b25cIjtcbmV4cG9ydCB7RGlhbG9nQ29udHJvbGxlcn0gZnJvbSBcIi4vZGlhbG9nLWNvbnRyb2xsZXJcIjtcbmV4cG9ydCB7ZGlhbG9nRGF0YX0gZnJvbSBcIi4vZGlhbG9nLWRhdGEtc3ltYm9sXCI7XG5leHBvcnQge2RpYWxvZ0luc3RhbmNlfSBmcm9tIFwiLi9kaWFsb2ctaW5zdGFuY2Utc3ltYm9sXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbRGlhbG9nXSxcbiAgICBpbXBvcnRzOiBbSW50bE1vZHVsZSwgSW9uaWNNb2R1bGUsIENvbW1vbk1vZHVsZSwgQnV0dG9uc01vZHVsZV0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbRGlhbG9nXSxcbiAgICBwcm92aWRlcnM6IFtEaWFsb2dDb250cm9sbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dNb2R1bGUge1xufVxuIl19