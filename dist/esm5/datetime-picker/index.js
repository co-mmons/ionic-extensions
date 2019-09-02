import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SelectModule } from "../select/index";
import { DateTimePickerInput } from "./input";
import { DateTimePickerOverlay } from "./overlay";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IntlModule } from "@co.mmons/angular-intl";
export { DateTimePickerInput } from "./input";
var DateTimePickerModule = /** @class */ (function () {
    function DateTimePickerModule() {
    }
    DateTimePickerModule = tslib_1.__decorate([
        NgModule({
            declarations: [DateTimePickerInput, DateTimePickerOverlay],
            entryComponents: [DateTimePickerOverlay],
            exports: [DateTimePickerInput],
            imports: [CommonModule, FormsModule, IonicModule, IntlModule, SelectModule]
        })
    ], DateTimePickerModule);
    return DateTimePickerModule;
}());
export { DateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbImRhdGV0aW1lLXBpY2tlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUM1QyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDaEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFbEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBUTVDO0lBQUE7SUFDQSxDQUFDO0lBRFksb0JBQW9CO1FBTmhDLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLHFCQUFxQixDQUFDO1lBQzFELGVBQWUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1lBQ3hDLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO1lBQzlCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUM7U0FDOUUsQ0FBQztPQUNXLG9CQUFvQixDQUNoQztJQUFELDJCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SW9uaWNNb2R1bGV9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtTZWxlY3RNb2R1bGV9IGZyb20gXCIuLi9zZWxlY3QvaW5kZXhcIjtcbmltcG9ydCB7RGF0ZVRpbWVQaWNrZXJJbnB1dH0gZnJvbSBcIi4vaW5wdXRcIjtcbmltcG9ydCB7RGF0ZVRpbWVQaWNrZXJPdmVybGF5fSBmcm9tIFwiLi9vdmVybGF5XCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5cbmV4cG9ydCB7RGF0ZVRpbWVQaWNrZXJJbnB1dH0gZnJvbSBcIi4vaW5wdXRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtEYXRlVGltZVBpY2tlcklucHV0LCBEYXRlVGltZVBpY2tlck92ZXJsYXldLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0RhdGVUaW1lUGlja2VyT3ZlcmxheV0sXG4gICAgZXhwb3J0czogW0RhdGVUaW1lUGlja2VySW5wdXRdLFxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBJb25pY01vZHVsZSwgSW50bE1vZHVsZSwgU2VsZWN0TW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlck1vZHVsZSB7XG59XG4iXX0=