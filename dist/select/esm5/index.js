import * as tslib_1 from "tslib";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatchMediaModule } from "@co.mmons/angular-extensions/browser/match-media";
import { IntlModule } from "@co.mmons/angular-intl";
import { ButtonsModule } from "@co.mmons/ionic-extensions/buttons";
import { IonicModule } from "@ionic/angular";
import { Select } from "./select";
import { SelectLabel } from "./select-label";
import { SelectOption } from "./select-option";
import { SelectOverlayContent } from "./select-overlay";
export * from "./select";
export * from "./select-option";
export * from "./select-options";
var SelectModule = /** @class */ (function () {
    function SelectModule() {
    }
    SelectModule = tslib_1.__decorate([
        NgModule({
            declarations: [Select, SelectOption, SelectOverlayContent, SelectLabel],
            entryComponents: [Select, SelectOption, SelectOverlayContent],
            exports: [Select, SelectOption, SelectOverlayContent, SelectLabel],
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, ScrollingModule, ButtonsModule, MatchMediaModule]
        })
    ], SelectModule);
    return SelectModule;
}());
export { SelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9zZWxlY3QvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUNsRixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFdEQsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxpQkFBaUIsQ0FBQztBQUNoQyxjQUFjLGtCQUFrQixDQUFDO0FBUWpDO0lBQUE7SUFDQSxDQUFDO0lBRFksWUFBWTtRQU54QixRQUFRLENBQUM7WUFDTixZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFdBQVcsQ0FBQztZQUN2RSxlQUFlLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixDQUFDO1lBQzdELE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxDQUFDO1lBQ2xFLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO1NBQ2xILENBQUM7T0FDVyxZQUFZLENBQ3hCO0lBQUQsbUJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTY3JvbGxpbmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jZGsvc2Nyb2xsaW5nXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtNYXRjaE1lZGlhTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItZXh0ZW5zaW9ucy9icm93c2VyL21hdGNoLW1lZGlhXCI7XG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge0J1dHRvbnNNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9idXR0b25zXCI7XG5pbXBvcnQge0lvbmljTW9kdWxlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7U2VsZWN0fSBmcm9tIFwiLi9zZWxlY3RcIjtcbmltcG9ydCB7U2VsZWN0TGFiZWx9IGZyb20gXCIuL3NlbGVjdC1sYWJlbFwiO1xuaW1wb3J0IHtTZWxlY3RPcHRpb259IGZyb20gXCIuL3NlbGVjdC1vcHRpb25cIjtcbmltcG9ydCB7U2VsZWN0T3ZlcmxheUNvbnRlbnR9IGZyb20gXCIuL3NlbGVjdC1vdmVybGF5XCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL3NlbGVjdFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc2VsZWN0LW9wdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc2VsZWN0LW9wdGlvbnNcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtTZWxlY3QsIFNlbGVjdE9wdGlvbiwgU2VsZWN0T3ZlcmxheUNvbnRlbnQsIFNlbGVjdExhYmVsXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtTZWxlY3QsIFNlbGVjdE9wdGlvbiwgU2VsZWN0T3ZlcmxheUNvbnRlbnRdLFxuICAgIGV4cG9ydHM6IFtTZWxlY3QsIFNlbGVjdE9wdGlvbiwgU2VsZWN0T3ZlcmxheUNvbnRlbnQsIFNlbGVjdExhYmVsXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgSW9uaWNNb2R1bGUsIEludGxNb2R1bGUsIFNjcm9sbGluZ01vZHVsZSwgQnV0dG9uc01vZHVsZSwgTWF0Y2hNZWRpYU1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TW9kdWxlIHtcbn1cbiJdfQ==