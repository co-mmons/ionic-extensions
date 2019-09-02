import * as tslib_1 from "tslib";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { ButtonsModule } from "../buttons/index";
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
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, ScrollingModule, ButtonsModule]
        })
    ], SelectModule);
    return SelectModule;
}());
export { SelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbInNlbGVjdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFdEQsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxpQkFBaUIsQ0FBQztBQUNoQyxjQUFjLGtCQUFrQixDQUFDO0FBUWpDO0lBQUE7SUFDQSxDQUFDO0lBRFksWUFBWTtRQU54QixRQUFRLENBQUM7WUFDTixZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFdBQVcsQ0FBQztZQUN2RSxlQUFlLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixDQUFDO1lBQzdELE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxDQUFDO1lBQ2xFLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsYUFBYSxDQUFDO1NBQ2hHLENBQUM7T0FDVyxZQUFZLENBQ3hCO0lBQUQsbUJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTY3JvbGxpbmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jZGsvc2Nyb2xsaW5nXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHtJb25pY01vZHVsZX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0J1dHRvbnNNb2R1bGV9IGZyb20gXCIuLi9idXR0b25zL2luZGV4XCI7XG5pbXBvcnQge1NlbGVjdH0gZnJvbSBcIi4vc2VsZWN0XCI7XG5pbXBvcnQge1NlbGVjdExhYmVsfSBmcm9tIFwiLi9zZWxlY3QtbGFiZWxcIjtcbmltcG9ydCB7U2VsZWN0T3B0aW9ufSBmcm9tIFwiLi9zZWxlY3Qtb3B0aW9uXCI7XG5pbXBvcnQge1NlbGVjdE92ZXJsYXlDb250ZW50fSBmcm9tIFwiLi9zZWxlY3Qtb3ZlcmxheVwiO1xuXG5leHBvcnQgKiBmcm9tIFwiLi9zZWxlY3RcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3NlbGVjdC1vcHRpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL3NlbGVjdC1vcHRpb25zXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbU2VsZWN0LCBTZWxlY3RPcHRpb24sIFNlbGVjdE92ZXJsYXlDb250ZW50LCBTZWxlY3RMYWJlbF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbU2VsZWN0LCBTZWxlY3RPcHRpb24sIFNlbGVjdE92ZXJsYXlDb250ZW50XSxcbiAgICBleHBvcnRzOiBbU2VsZWN0LCBTZWxlY3RPcHRpb24sIFNlbGVjdE92ZXJsYXlDb250ZW50LCBTZWxlY3RMYWJlbF0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIElvbmljTW9kdWxlLCBJbnRsTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGUsIEJ1dHRvbnNNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdE1vZHVsZSB7XG59XG4iXX0=