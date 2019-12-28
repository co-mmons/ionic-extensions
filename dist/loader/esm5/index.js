import { __decorate } from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { LoaderController } from "./loader-controller";
import { Loader } from "./loader";
export { Loader } from "./loader";
export { LoaderController } from "./loader-controller";
var LoaderModule = /** @class */ (function () {
    function LoaderModule() {
    }
    LoaderModule = __decorate([
        NgModule({
            declarations: [Loader],
            imports: [IntlModule, IonicModule, CommonModule],
            entryComponents: [Loader],
            providers: [LoaderController]
        })
    ], LoaderModule);
    return LoaderModule;
}());
export { LoaderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9sb2FkZXIvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRWhDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFTckQ7SUFBQTtJQUNBLENBQUM7SUFEWSxZQUFZO1FBTnhCLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQztZQUNoRCxlQUFlLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDekIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDaEMsQ0FBQztPQUNXLFlBQVksQ0FDeEI7SUFBRCxtQkFBQztDQUFBLEFBREQsSUFDQztTQURZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7SW9uaWNNb2R1bGV9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtMb2FkZXJDb250cm9sbGVyfSBmcm9tIFwiLi9sb2FkZXItY29udHJvbGxlclwiO1xuaW1wb3J0IHtMb2FkZXJ9IGZyb20gXCIuL2xvYWRlclwiO1xuXG5leHBvcnQge0xvYWRlcn0gZnJvbSBcIi4vbG9hZGVyXCI7XG5leHBvcnQge0xvYWRlckNvbnRyb2xsZXJ9IGZyb20gXCIuL2xvYWRlci1jb250cm9sbGVyXCI7XG5leHBvcnQge0xvYWRlck9wdGlvbnN9IGZyb20gXCIuL2xvYWRlci1vcHRpb25zXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbTG9hZGVyXSxcbiAgICBpbXBvcnRzOiBbSW50bE1vZHVsZSwgSW9uaWNNb2R1bGUsIENvbW1vbk1vZHVsZV0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbTG9hZGVyXSxcbiAgICBwcm92aWRlcnM6IFtMb2FkZXJDb250cm9sbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBMb2FkZXJNb2R1bGUge1xufVxuIl19