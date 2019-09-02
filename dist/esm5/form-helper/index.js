import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatchMediaModule } from "@co.mmons/angular-extensions/browser/match-media";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { FormHeading } from "./heading";
import { FormHelper } from "./helper";
import { FormItem } from "./item";
import { FormItemError } from "./item-error";
import { FormItemHint } from "./item-hint";
export * from "./heading";
export * from "./helper";
export * from "./item";
export * from "./item-error";
export * from "./item-hint";
var FormHelperModule = /** @class */ (function () {
    function FormHelperModule() {
    }
    FormHelperModule = tslib_1.__decorate([
        NgModule({
            declarations: [FormItem, FormHeading, FormItemError, FormItemHint, FormHelper],
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, MatchMediaModule],
            exports: [FormItem, FormItemError, FormItemHint, FormHeading, FormHelper]
        })
    ], FormHelperModule);
    return FormHelperModule;
}());
export { FormHelperModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbImZvcm0taGVscGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDbEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFekMsY0FBYyxXQUFXLENBQUM7QUFDMUIsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxRQUFRLENBQUM7QUFDdkIsY0FBYyxjQUFjLENBQUM7QUFDN0IsY0FBYyxhQUFhLENBQUM7QUFPNUI7SUFBQTtJQUNBLENBQUM7SUFEWSxnQkFBZ0I7UUFMNUIsUUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztZQUM5RSxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLENBQUM7WUFDL0UsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQztTQUM1RSxDQUFDO09BQ1csZ0JBQWdCLENBQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtNYXRjaE1lZGlhTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItZXh0ZW5zaW9ucy9icm93c2VyL21hdGNoLW1lZGlhXCI7XG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge0lvbmljTW9kdWxlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7Rm9ybUhlYWRpbmd9IGZyb20gXCIuL2hlYWRpbmdcIjtcbmltcG9ydCB7Rm9ybUhlbHBlcn0gZnJvbSBcIi4vaGVscGVyXCI7XG5pbXBvcnQge0Zvcm1JdGVtfSBmcm9tIFwiLi9pdGVtXCI7XG5pbXBvcnQge0Zvcm1JdGVtRXJyb3J9IGZyb20gXCIuL2l0ZW0tZXJyb3JcIjtcbmltcG9ydCB7Rm9ybUl0ZW1IaW50fSBmcm9tIFwiLi9pdGVtLWhpbnRcIjtcblxuZXhwb3J0ICogZnJvbSBcIi4vaGVhZGluZ1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vaGVscGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9pdGVtXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9pdGVtLWVycm9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9pdGVtLWhpbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtGb3JtSXRlbSwgRm9ybUhlYWRpbmcsIEZvcm1JdGVtRXJyb3IsIEZvcm1JdGVtSGludCwgRm9ybUhlbHBlcl0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIElvbmljTW9kdWxlLCBJbnRsTW9kdWxlLCBNYXRjaE1lZGlhTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbRm9ybUl0ZW0sIEZvcm1JdGVtRXJyb3IsIEZvcm1JdGVtSGludCwgRm9ybUhlYWRpbmcsIEZvcm1IZWxwZXJdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1IZWxwZXJNb2R1bGUge1xufSJdfQ==