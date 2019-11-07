import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { LazyImage, LazyImageContainer } from "./lazy-image";
export { LazyImage, LazyImageContainer } from "./lazy-image";
export { ensureLazyImagesLoaded } from "./lazy-load";
var LazyImageModule = /** @class */ (function () {
    function LazyImageModule() {
    }
    LazyImageModule = tslib_1.__decorate([
        NgModule({
            declarations: [LazyImage, LazyImageContainer],
            exports: [LazyImage, LazyImageContainer]
        })
    ], LazyImageModule);
    return LazyImageModule;
}());
export { LazyImageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9sYXp5LWltYWdlLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUUzRCxPQUFPLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzNELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQU1uRDtJQUFBO0lBQ0EsQ0FBQztJQURZLGVBQWU7UUFKM0IsUUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDO1lBQzdDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQztTQUMzQyxDQUFDO09BQ1csZUFBZSxDQUMzQjtJQUFELHNCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0xhenlJbWFnZSwgTGF6eUltYWdlQ29udGFpbmVyfSBmcm9tIFwiLi9sYXp5LWltYWdlXCI7XG5cbmV4cG9ydCB7TGF6eUltYWdlLCBMYXp5SW1hZ2VDb250YWluZXJ9IGZyb20gXCIuL2xhenktaW1hZ2VcIjtcbmV4cG9ydCB7ZW5zdXJlTGF6eUltYWdlc0xvYWRlZH0gZnJvbSBcIi4vbGF6eS1sb2FkXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbTGF6eUltYWdlLCBMYXp5SW1hZ2VDb250YWluZXJdLFxuICAgIGV4cG9ydHM6IFtMYXp5SW1hZ2UsIExhenlJbWFnZUNvbnRhaW5lcl1cbn0pXG5leHBvcnQgY2xhc3MgTGF6eUltYWdlTW9kdWxlIHtcbn1cbiJdfQ==