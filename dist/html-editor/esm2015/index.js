import { __decorate } from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatchMediaModule } from "@co.mmons/angular-extensions/browser/match-media";
import { IntlModule } from "@co.mmons/angular-intl";
import { FormHelperModule } from "@co.mmons/ionic-extensions/form-helper";
import { SelectModule } from "@co.mmons/ionic-extensions/select";
import { SpinnerModule } from "@co.mmons/ionic-extensions/spinner";
import { IonicModule } from "@ionic/angular";
import { ButtonsModule } from "@co.mmons/ionic-extensions/buttons";
import { AlignmentMenu } from "./alignment-menu";
import { HtmlEditor } from "./editor";
import { HeadingMenu } from "./heading-menu";
import { InsertMenu } from "./insert-menu";
import { LinkModal } from "./link-modal";
import { ListMenu } from "./list-menu";
import { TextFormatMenu } from "./text-format-menu";
import { Toolbar } from "./toolbar";
export { HtmlEditor } from "./editor";
let HtmlEditorModule = class HtmlEditorModule {
};
HtmlEditorModule = __decorate([
    NgModule({
        imports: [CommonModule, IonicModule, IntlModule, SelectModule, FormsModule, ReactiveFormsModule, FormHelperModule, ButtonsModule, MatchMediaModule, SpinnerModule],
        declarations: [HtmlEditor, AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu, Toolbar],
        exports: [HtmlEditor, IntlModule],
        entryComponents: [AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu]
    })
], HtmlEditorModule);
export { HtmlEditorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDbEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMvRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFbEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQVNwQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtDQUM1QixDQUFBO0FBRFksZ0JBQWdCO0lBTjVCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsQ0FBQztRQUNsSyxZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDO1FBQ2hILE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7UUFDakMsZUFBZSxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUM7S0FDakcsQ0FBQztHQUNXLGdCQUFnQixDQUM1QjtTQURZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge01hdGNoTWVkaWFNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1leHRlbnNpb25zL2Jyb3dzZXIvbWF0Y2gtbWVkaWFcIjtcbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7Rm9ybUhlbHBlck1vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyXCI7XG5pbXBvcnQge1NlbGVjdE1vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3NlbGVjdFwiO1xuaW1wb3J0IHtTcGlubmVyTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc3Bpbm5lclwiO1xuaW1wb3J0IHtJb25pY01vZHVsZX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0J1dHRvbnNNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9idXR0b25zXCI7XG5pbXBvcnQge0FsaWdubWVudE1lbnV9IGZyb20gXCIuL2FsaWdubWVudC1tZW51XCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtIZWFkaW5nTWVudX0gZnJvbSBcIi4vaGVhZGluZy1tZW51XCI7XG5pbXBvcnQge0luc2VydE1lbnV9IGZyb20gXCIuL2luc2VydC1tZW51XCI7XG5pbXBvcnQge0xpbmtNb2RhbH0gZnJvbSBcIi4vbGluay1tb2RhbFwiO1xuaW1wb3J0IHtMaXN0TWVudX0gZnJvbSBcIi4vbGlzdC1tZW51XCI7XG5pbXBvcnQge1RleHRGb3JtYXRNZW51fSBmcm9tIFwiLi90ZXh0LWZvcm1hdC1tZW51XCI7XG5pbXBvcnQge1Rvb2xiYXJ9IGZyb20gXCIuL3Rvb2xiYXJcIjtcblxuZXhwb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmV4cG9ydCB7SHRtbEVkaXRvckZlYXR1cmVzfSBmcm9tIFwiLi9lZGl0b3ItZmVhdHVyZXNcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJb25pY01vZHVsZSwgSW50bE1vZHVsZSwgU2VsZWN0TW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybUhlbHBlck1vZHVsZSwgQnV0dG9uc01vZHVsZSwgTWF0Y2hNZWRpYU1vZHVsZSwgU3Bpbm5lck1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSHRtbEVkaXRvciwgQWxpZ25tZW50TWVudSwgSGVhZGluZ01lbnUsIEluc2VydE1lbnUsIExpbmtNb2RhbCwgTGlzdE1lbnUsIFRleHRGb3JtYXRNZW51LCBUb29sYmFyXSxcbiAgICBleHBvcnRzOiBbSHRtbEVkaXRvciwgSW50bE1vZHVsZV0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbQWxpZ25tZW50TWVudSwgSGVhZGluZ01lbnUsIEluc2VydE1lbnUsIExpbmtNb2RhbCwgTGlzdE1lbnUsIFRleHRGb3JtYXRNZW51XVxufSlcbmV4cG9ydCBjbGFzcyBIdG1sRWRpdG9yTW9kdWxlIHtcbn1cbiJdfQ==