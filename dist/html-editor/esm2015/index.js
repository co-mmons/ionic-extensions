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
export class HtmlEditorModule {
}
HtmlEditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, IonicModule, IntlModule, SelectModule, FormsModule, ReactiveFormsModule, FormHelperModule, ButtonsModule, MatchMediaModule, SpinnerModule],
                declarations: [HtmlEditor, AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu, Toolbar],
                exports: [HtmlEditor, IntlModule],
                entryComponents: [AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaHRtbC1lZGl0b3IvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRWxDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFTcEMsTUFBTSxPQUFPLGdCQUFnQjs7O1lBTjVCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLENBQUM7Z0JBQ2xLLFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUM7Z0JBQ2hILE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7Z0JBQ2pDLGVBQWUsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDO2FBQ2pHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7TWF0Y2hNZWRpYU1vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWV4dGVuc2lvbnMvYnJvd3Nlci9tYXRjaC1tZWRpYVwiO1xuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHtGb3JtSGVscGVyTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXJcIjtcbmltcG9ydCB7U2VsZWN0TW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc2VsZWN0XCI7XG5pbXBvcnQge1NwaW5uZXJNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9zcGlubmVyXCI7XG5pbXBvcnQge0lvbmljTW9kdWxlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7QnV0dG9uc01vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2J1dHRvbnNcIjtcbmltcG9ydCB7QWxpZ25tZW50TWVudX0gZnJvbSBcIi4vYWxpZ25tZW50LW1lbnVcIjtcbmltcG9ydCB7SHRtbEVkaXRvcn0gZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQge0hlYWRpbmdNZW51fSBmcm9tIFwiLi9oZWFkaW5nLW1lbnVcIjtcbmltcG9ydCB7SW5zZXJ0TWVudX0gZnJvbSBcIi4vaW5zZXJ0LW1lbnVcIjtcbmltcG9ydCB7TGlua01vZGFsfSBmcm9tIFwiLi9saW5rLW1vZGFsXCI7XG5pbXBvcnQge0xpc3RNZW51fSBmcm9tIFwiLi9saXN0LW1lbnVcIjtcbmltcG9ydCB7VGV4dEZvcm1hdE1lbnV9IGZyb20gXCIuL3RleHQtZm9ybWF0LW1lbnVcIjtcbmltcG9ydCB7VG9vbGJhcn0gZnJvbSBcIi4vdG9vbGJhclwiO1xuXG5leHBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuZXhwb3J0IHtIdG1sRWRpdG9yRmVhdHVyZXN9IGZyb20gXCIuL2VkaXRvci1mZWF0dXJlc1wiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElvbmljTW9kdWxlLCBJbnRsTW9kdWxlLCBTZWxlY3RNb2R1bGUsIEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3JtSGVscGVyTW9kdWxlLCBCdXR0b25zTW9kdWxlLCBNYXRjaE1lZGlhTW9kdWxlLCBTcGlubmVyTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtIdG1sRWRpdG9yLCBBbGlnbm1lbnRNZW51LCBIZWFkaW5nTWVudSwgSW5zZXJ0TWVudSwgTGlua01vZGFsLCBMaXN0TWVudSwgVGV4dEZvcm1hdE1lbnUsIFRvb2xiYXJdLFxuICAgIGV4cG9ydHM6IFtIdG1sRWRpdG9yLCBJbnRsTW9kdWxlXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtBbGlnbm1lbnRNZW51LCBIZWFkaW5nTWVudSwgSW5zZXJ0TWVudSwgTGlua01vZGFsLCBMaXN0TWVudSwgVGV4dEZvcm1hdE1lbnVdXG59KVxuZXhwb3J0IGNsYXNzIEh0bWxFZGl0b3JNb2R1bGUge1xufVxuIl19