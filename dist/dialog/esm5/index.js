import { __decorate } from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IntlModule } from "@co.mmons/angular-intl";
import { ButtonsModule } from "@co.mmons/ionic-extensions/buttons";
import { IonicModule } from "@ionic/angular";
import { Dialog } from "./dialog";
import { DialogButtons } from "./dialog-buttons";
import { DialogContent } from "./dialog-content";
import { DialogController } from "./dialog-controller";
export { Dialog } from "./dialog";
export { DialogController } from "./dialog-controller";
export { DialogButtons } from "./dialog-buttons";
export { DialogContent } from "./dialog-content";
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule = __decorate([
        NgModule({
            declarations: [Dialog, DialogContent, DialogButtons],
            imports: [IntlModule, IonicModule, CommonModule, ButtonsModule],
            exports: [DialogContent, DialogButtons],
            entryComponents: [Dialog],
            providers: [DialogController]
        })
    ], DialogModule);
    return DialogModule;
}());
export { DialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kaWFsb2cvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXJELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFaEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQVMvQztJQUFBO0lBQ0EsQ0FBQztJQURZLFlBQVk7UUFQeEIsUUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO1lBQy9ELE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUM7WUFDdkMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1NBQ2hDLENBQUM7T0FDVyxZQUFZLENBQ3hCO0lBQUQsbUJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge0J1dHRvbnNNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9idXR0b25zXCI7XG5pbXBvcnQge0lvbmljTW9kdWxlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7RGlhbG9nfSBmcm9tIFwiLi9kaWFsb2dcIjtcbmltcG9ydCB7RGlhbG9nQnV0dG9uc30gZnJvbSBcIi4vZGlhbG9nLWJ1dHRvbnNcIjtcbmltcG9ydCB7RGlhbG9nQ29udGVudH0gZnJvbSBcIi4vZGlhbG9nLWNvbnRlbnRcIjtcbmltcG9ydCB7RGlhbG9nQ29udHJvbGxlcn0gZnJvbSBcIi4vZGlhbG9nLWNvbnRyb2xsZXJcIjtcblxuZXhwb3J0IHtEaWFsb2d9IGZyb20gXCIuL2RpYWxvZ1wiO1xuZXhwb3J0IHtEaWFsb2dCdXR0b259IGZyb20gXCIuL2RpYWxvZy1idXR0b25cIjtcbmV4cG9ydCB7RGlhbG9nQ29udHJvbGxlcn0gZnJvbSBcIi4vZGlhbG9nLWNvbnRyb2xsZXJcIjtcbmV4cG9ydCB7RGlhbG9nQnV0dG9uc30gZnJvbSBcIi4vZGlhbG9nLWJ1dHRvbnNcIjtcbmV4cG9ydCB7RGlhbG9nQ29udGVudH0gZnJvbSBcIi4vZGlhbG9nLWNvbnRlbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtEaWFsb2csIERpYWxvZ0NvbnRlbnQsIERpYWxvZ0J1dHRvbnNdLFxuICAgIGltcG9ydHM6IFtJbnRsTW9kdWxlLCBJb25pY01vZHVsZSwgQ29tbW9uTW9kdWxlLCBCdXR0b25zTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbRGlhbG9nQ29udGVudCwgRGlhbG9nQnV0dG9uc10sXG4gICAgZW50cnlDb21wb25lbnRzOiBbRGlhbG9nXSxcbiAgICBwcm92aWRlcnM6IFtEaWFsb2dDb250cm9sbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dNb2R1bGUge1xufVxuIl19