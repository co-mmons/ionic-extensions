import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { VirtualScrollHelper } from "./virtual-scroll-helper";
export { VirtualScrollHelper } from "./virtual-scroll-helper";
export class VirtualScrollHelperModule {
}
VirtualScrollHelperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [VirtualScrollHelper],
                exports: [VirtualScrollHelper],
                imports: [CommonModule, IonicModule],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlydHVhbC1zY3JvbGwtaGVscGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQU81RCxNQUFNLE9BQU8seUJBQXlCOzs7WUFMckMsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDOUIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQzthQUN2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJb25pY01vZHVsZX0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge1ZpcnR1YWxTY3JvbGxIZWxwZXJ9IGZyb20gXCIuL3ZpcnR1YWwtc2Nyb2xsLWhlbHBlclwiO1xuXG5leHBvcnQge1ZpcnR1YWxTY3JvbGxIZWxwZXJ9IGZyb20gXCIuL3ZpcnR1YWwtc2Nyb2xsLWhlbHBlclwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1ZpcnR1YWxTY3JvbGxIZWxwZXJdLFxuICAgIGV4cG9ydHM6IFtWaXJ0dWFsU2Nyb2xsSGVscGVyXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJb25pY01vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxIZWxwZXJNb2R1bGUge1xufVxuIl19