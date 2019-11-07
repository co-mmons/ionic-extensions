import * as tslib_1 from "tslib";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatchMediaModule } from "@co.mmons/angular-extensions/browser/match-media";
import { IntlModule } from "@co.mmons/angular-intl";
import { FormHelperModule } from "@co.mmons/ionic-extensions/form-helper";
import { SelectModule } from "@co.mmons/ionic-extensions/select";
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
var HtmlEditorModule = /** @class */ (function () {
    function HtmlEditorModule() {
    }
    HtmlEditorModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule, IonicModule, IntlModule, SelectModule, FormsModule, ReactiveFormsModule, FormHelperModule, ButtonsModule, MatchMediaModule],
            declarations: [HtmlEditor, AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu, Toolbar],
            exports: [HtmlEditor, IntlModule],
            entryComponents: [AlignmentMenu, HeadingMenu, InsertMenu, LinkModal, ListMenu, TextFormatMenu]
        })
    ], HtmlEditorModule);
    return HtmlEditorModule;
}());
export { HtmlEditorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDbEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMvRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVsQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBU3BDO0lBQUE7SUFDQSxDQUFDO0lBRFksZ0JBQWdCO1FBTjVCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO1lBQ25KLFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUM7WUFDaEgsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUNqQyxlQUFlLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQztTQUNqRyxDQUFDO09BQ1csZ0JBQWdCLENBQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtNYXRjaE1lZGlhTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItZXh0ZW5zaW9ucy9icm93c2VyL21hdGNoLW1lZGlhXCI7XG5pbXBvcnQge0ludGxNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge0Zvcm1IZWxwZXJNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9mb3JtLWhlbHBlclwiO1xuaW1wb3J0IHtTZWxlY3RNb2R1bGV9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9zZWxlY3RcIjtcbmltcG9ydCB7SW9uaWNNb2R1bGV9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtCdXR0b25zTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvYnV0dG9uc1wiO1xuaW1wb3J0IHtBbGlnbm1lbnRNZW51fSBmcm9tIFwiLi9hbGlnbm1lbnQtbWVudVwiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7SGVhZGluZ01lbnV9IGZyb20gXCIuL2hlYWRpbmctbWVudVwiO1xuaW1wb3J0IHtJbnNlcnRNZW51fSBmcm9tIFwiLi9pbnNlcnQtbWVudVwiO1xuaW1wb3J0IHtMaW5rTW9kYWx9IGZyb20gXCIuL2xpbmstbW9kYWxcIjtcbmltcG9ydCB7TGlzdE1lbnV9IGZyb20gXCIuL2xpc3QtbWVudVwiO1xuaW1wb3J0IHtUZXh0Rm9ybWF0TWVudX0gZnJvbSBcIi4vdGV4dC1mb3JtYXQtbWVudVwiO1xuaW1wb3J0IHtUb29sYmFyfSBmcm9tIFwiLi90b29sYmFyXCI7XG5cbmV4cG9ydCB7SHRtbEVkaXRvcn0gZnJvbSBcIi4vZWRpdG9yXCI7XG5leHBvcnQge0h0bWxFZGl0b3JGZWF0dXJlc30gZnJvbSBcIi4vZWRpdG9yLWZlYXR1cmVzXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW9uaWNNb2R1bGUsIEludGxNb2R1bGUsIFNlbGVjdE1vZHVsZSwgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1IZWxwZXJNb2R1bGUsIEJ1dHRvbnNNb2R1bGUsIE1hdGNoTWVkaWFNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0h0bWxFZGl0b3IsIEFsaWdubWVudE1lbnUsIEhlYWRpbmdNZW51LCBJbnNlcnRNZW51LCBMaW5rTW9kYWwsIExpc3RNZW51LCBUZXh0Rm9ybWF0TWVudSwgVG9vbGJhcl0sXG4gICAgZXhwb3J0czogW0h0bWxFZGl0b3IsIEludGxNb2R1bGVdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0FsaWdubWVudE1lbnUsIEhlYWRpbmdNZW51LCBJbnNlcnRNZW51LCBMaW5rTW9kYWwsIExpc3RNZW51LCBUZXh0Rm9ybWF0TWVudV1cbn0pXG5leHBvcnQgY2xhc3MgSHRtbEVkaXRvck1vZHVsZSB7XG59XG4iXX0=