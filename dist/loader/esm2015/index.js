import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IntlModule } from "@co.mmons/angular-intl";
import { IonicModule } from "@ionic/angular";
import { LoaderController } from "./loader-controller";
import { Loader } from "./loader";
export { Loader } from "./loader";
export { LoaderController } from "./loader-controller";
export class LoaderModule {
}
LoaderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [Loader],
                imports: [IntlModule, IonicModule, CommonModule],
                exports: [Loader],
                entryComponents: [Loader],
                providers: [LoaderController]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9hZGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUVoQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBVXJELE1BQU0sT0FBTyxZQUFZOzs7WUFQeEIsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDdEIsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7Z0JBQ2hELE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDakIsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUN6QixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHtJb25pY01vZHVsZX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0xvYWRlckNvbnRyb2xsZXJ9IGZyb20gXCIuL2xvYWRlci1jb250cm9sbGVyXCI7XG5pbXBvcnQge0xvYWRlcn0gZnJvbSBcIi4vbG9hZGVyXCI7XG5cbmV4cG9ydCB7TG9hZGVyfSBmcm9tIFwiLi9sb2FkZXJcIjtcbmV4cG9ydCB7TG9hZGVyQ29udHJvbGxlcn0gZnJvbSBcIi4vbG9hZGVyLWNvbnRyb2xsZXJcIjtcbmV4cG9ydCB7TG9hZGVyT3B0aW9uc30gZnJvbSBcIi4vbG9hZGVyLW9wdGlvbnNcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtMb2FkZXJdLFxuICAgIGltcG9ydHM6IFtJbnRsTW9kdWxlLCBJb25pY01vZHVsZSwgQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTG9hZGVyXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtMb2FkZXJdLFxuICAgIHByb3ZpZGVyczogW0xvYWRlckNvbnRyb2xsZXJdXG59KVxuZXhwb3J0IGNsYXNzIExvYWRlck1vZHVsZSB7XG59XG4iXX0=