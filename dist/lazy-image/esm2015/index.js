import { NgModule } from "@angular/core";
import { LazyImage, LazyImageContainer } from "./lazy-image";
export { LazyImage, LazyImageContainer } from "./lazy-image";
export { ensureLazyImagesLoaded } from "./lazy-load";
export class LazyImageModule {
}
LazyImageModule.decorators = [
    { type: NgModule, args: [{
                declarations: [LazyImage, LazyImageContainer],
                exports: [LazyImage, LazyImageContainer]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGF6eS1pbWFnZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFM0QsT0FBTyxFQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMzRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFNbkQsTUFBTSxPQUFPLGVBQWU7OztZQUozQixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDO2dCQUM3QyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUM7YUFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtMYXp5SW1hZ2UsIExhenlJbWFnZUNvbnRhaW5lcn0gZnJvbSBcIi4vbGF6eS1pbWFnZVwiO1xuXG5leHBvcnQge0xhenlJbWFnZSwgTGF6eUltYWdlQ29udGFpbmVyfSBmcm9tIFwiLi9sYXp5LWltYWdlXCI7XG5leHBvcnQge2Vuc3VyZUxhenlJbWFnZXNMb2FkZWR9IGZyb20gXCIuL2xhenktbG9hZFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW0xhenlJbWFnZSwgTGF6eUltYWdlQ29udGFpbmVyXSxcbiAgICBleHBvcnRzOiBbTGF6eUltYWdlLCBMYXp5SW1hZ2VDb250YWluZXJdXG59KVxuZXhwb3J0IGNsYXNzIExhenlJbWFnZU1vZHVsZSB7XG59XG4iXX0=