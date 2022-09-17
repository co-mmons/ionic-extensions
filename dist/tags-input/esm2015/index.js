import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { TagsInput } from "./tags-input";
export { TagsInput } from "./tags-input";
export class TagsInputModule {
}
TagsInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TagsInput],
                exports: [TagsInput],
                imports: [CommonModule, IonicModule, IntlModule, FormsModule, ReactiveFormsModule],
                entryComponents: [TagsInput]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGFncy1pbnB1dC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFRdkMsTUFBTSxPQUFPLGVBQWU7OztZQU4zQixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQztnQkFDbEYsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7SW9uaWNNb2R1bGV9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtUYWdzSW5wdXR9IGZyb20gXCIuL3RhZ3MtaW5wdXRcIjtcblxuZXhwb3J0IHtUYWdzSW5wdXR9IGZyb20gXCIuL3RhZ3MtaW5wdXRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtUYWdzSW5wdXRdLFxuICAgIGV4cG9ydHM6IFtUYWdzSW5wdXRdLFxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElvbmljTW9kdWxlLCBJbnRsTW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbVGFnc0lucHV0XVxufSlcbmV4cG9ydCBjbGFzcyBUYWdzSW5wdXRNb2R1bGUge1xufVxuIl19