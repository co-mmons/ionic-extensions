import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ExpandingSearchbar } from "./expanding-searchbar";
import { ExpandingSearchbarStyles } from "./expanding-searchbar-styles";
export { ExpandingSearchbar } from "./expanding-searchbar";
var ExpandingSearchbarModule = /** @class */ (function () {
    function ExpandingSearchbarModule() {
    }
    ExpandingSearchbarModule = tslib_1.__decorate([
        NgModule({
            declarations: [ExpandingSearchbar, ExpandingSearchbarStyles],
            exports: [ExpandingSearchbar],
            entryComponents: [ExpandingSearchbarStyles],
            imports: [IonicModule]
        })
    ], ExpandingSearchbarModule);
    return ExpandingSearchbarModule;
}());
export { ExpandingSearchbarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9leHBhbmRpbmctc2VhcmNoYmFyLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXRFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBUXpEO0lBQUE7SUFDQSxDQUFDO0lBRFksd0JBQXdCO1FBTnBDLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLHdCQUF3QixDQUFDO1lBQzVELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO1lBQzdCLGVBQWUsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQzNDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN6QixDQUFDO09BQ1csd0JBQXdCLENBQ3BDO0lBQUQsK0JBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJb25pY01vZHVsZX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0V4cGFuZGluZ1NlYXJjaGJhcn0gZnJvbSBcIi4vZXhwYW5kaW5nLXNlYXJjaGJhclwiO1xuaW1wb3J0IHtFeHBhbmRpbmdTZWFyY2hiYXJTdHlsZXN9IGZyb20gXCIuL2V4cGFuZGluZy1zZWFyY2hiYXItc3R5bGVzXCI7XG5cbmV4cG9ydCB7RXhwYW5kaW5nU2VhcmNoYmFyfSBmcm9tIFwiLi9leHBhbmRpbmctc2VhcmNoYmFyXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbRXhwYW5kaW5nU2VhcmNoYmFyLCBFeHBhbmRpbmdTZWFyY2hiYXJTdHlsZXNdLFxuICAgIGV4cG9ydHM6IFtFeHBhbmRpbmdTZWFyY2hiYXJdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW0V4cGFuZGluZ1NlYXJjaGJhclN0eWxlc10sXG4gICAgaW1wb3J0czogW0lvbmljTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBFeHBhbmRpbmdTZWFyY2hiYXJNb2R1bGUge1xufVxuIl19