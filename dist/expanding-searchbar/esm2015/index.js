import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ExpandingSearchbar } from "./expanding-searchbar";
import { ExpandingSearchbarStyles } from "./expanding-searchbar-styles";
export { ExpandingSearchbar } from "./expanding-searchbar";
export class ExpandingSearchbarModule {
}
ExpandingSearchbarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ExpandingSearchbar, ExpandingSearchbarStyles],
                exports: [ExpandingSearchbar],
                entryComponents: [ExpandingSearchbarStyles],
                imports: [IonicModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXhwYW5kaW5nLXNlYXJjaGJhci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQVF6RCxNQUFNLE9BQU8sd0JBQXdCOzs7WUFOcEMsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLHdCQUF3QixDQUFDO2dCQUM1RCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDN0IsZUFBZSxFQUFFLENBQUMsd0JBQXdCLENBQUM7Z0JBQzNDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQzthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0lvbmljTW9kdWxlfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7RXhwYW5kaW5nU2VhcmNoYmFyfSBmcm9tIFwiLi9leHBhbmRpbmctc2VhcmNoYmFyXCI7XG5pbXBvcnQge0V4cGFuZGluZ1NlYXJjaGJhclN0eWxlc30gZnJvbSBcIi4vZXhwYW5kaW5nLXNlYXJjaGJhci1zdHlsZXNcIjtcblxuZXhwb3J0IHtFeHBhbmRpbmdTZWFyY2hiYXJ9IGZyb20gXCIuL2V4cGFuZGluZy1zZWFyY2hiYXJcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtFeHBhbmRpbmdTZWFyY2hiYXIsIEV4cGFuZGluZ1NlYXJjaGJhclN0eWxlc10sXG4gICAgZXhwb3J0czogW0V4cGFuZGluZ1NlYXJjaGJhcl0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbRXhwYW5kaW5nU2VhcmNoYmFyU3R5bGVzXSxcbiAgICBpbXBvcnRzOiBbSW9uaWNNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEV4cGFuZGluZ1NlYXJjaGJhck1vZHVsZSB7XG59XG4iXX0=