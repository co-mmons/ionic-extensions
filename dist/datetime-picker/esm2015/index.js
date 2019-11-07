import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatchMediaModule } from "@co.mmons/angular-extensions/browser/match-media";
import { IntlModule } from "@co.mmons/angular-intl";
import { ButtonsModule } from "@co.mmons/ionic-extensions/buttons";
import { SelectModule } from "@co.mmons/ionic-extensions/select";
import { IonicModule } from "@ionic/angular";
import { DateTimePickerInput } from "./input";
import { DateTimePickerOverlay } from "./overlay";
export { DateTimePickerInput } from "./input";
let DateTimePickerModule = class DateTimePickerModule {
};
DateTimePickerModule = tslib_1.__decorate([
    NgModule({
        declarations: [DateTimePickerInput, DateTimePickerOverlay],
        entryComponents: [DateTimePickerOverlay],
        exports: [DateTimePickerInput],
        imports: [CommonModule, FormsModule, IonicModule, IntlModule, SelectModule, ButtonsModule, MatchMediaModule]
    })
], DateTimePickerModule);
export { DateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kYXRldGltZS1waWNrZXIvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQy9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDNUMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRWhELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQVE1QyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtDQUNoQyxDQUFBO0FBRFksb0JBQW9CO0lBTmhDLFFBQVEsQ0FBQztRQUNOLFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLHFCQUFxQixDQUFDO1FBQzFELGVBQWUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO1FBQzlCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO0tBQy9HLENBQUM7R0FDVyxvQkFBb0IsQ0FDaEM7U0FEWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtNYXRjaE1lZGlhTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItZXh0ZW5zaW9ucy9icm93c2VyL21hdGNoLW1lZGlhXCI7XG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge0J1dHRvbnNNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9idXR0b25zXCI7XG5pbXBvcnQge1NlbGVjdE1vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3NlbGVjdFwiO1xuaW1wb3J0IHtJb25pY01vZHVsZX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0RhdGVUaW1lUGlja2VySW5wdXR9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQge0RhdGVUaW1lUGlja2VyT3ZlcmxheX0gZnJvbSBcIi4vb3ZlcmxheVwiO1xuXG5leHBvcnQge0RhdGVUaW1lUGlja2VySW5wdXR9IGZyb20gXCIuL2lucHV0XCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbRGF0ZVRpbWVQaWNrZXJJbnB1dCwgRGF0ZVRpbWVQaWNrZXJPdmVybGF5XSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtEYXRlVGltZVBpY2tlck92ZXJsYXldLFxuICAgIGV4cG9ydHM6IFtEYXRlVGltZVBpY2tlcklucHV0XSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgSW9uaWNNb2R1bGUsIEludGxNb2R1bGUsIFNlbGVjdE1vZHVsZSwgQnV0dG9uc01vZHVsZSwgTWF0Y2hNZWRpYU1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJNb2R1bGUge1xufVxuIl19