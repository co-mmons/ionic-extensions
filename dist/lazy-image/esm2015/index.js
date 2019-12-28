import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { LazyImage, LazyImageContainer } from "./lazy-image";
export { LazyImage, LazyImageContainer } from "./lazy-image";
export { ensureLazyImagesLoaded } from "./lazy-load";
let LazyImageModule = class LazyImageModule {
};
LazyImageModule = __decorate([
    NgModule({
        declarations: [LazyImage, LazyImageContainer],
        exports: [LazyImage, LazyImageContainer]
    })
], LazyImageModule);
export { LazyImageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9sYXp5LWltYWdlLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUUzRCxPQUFPLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzNELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQU1uRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0NBQzNCLENBQUE7QUFEWSxlQUFlO0lBSjNCLFFBQVEsQ0FBQztRQUNOLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUM7S0FDM0MsQ0FBQztHQUNXLGVBQWUsQ0FDM0I7U0FEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7TGF6eUltYWdlLCBMYXp5SW1hZ2VDb250YWluZXJ9IGZyb20gXCIuL2xhenktaW1hZ2VcIjtcblxuZXhwb3J0IHtMYXp5SW1hZ2UsIExhenlJbWFnZUNvbnRhaW5lcn0gZnJvbSBcIi4vbGF6eS1pbWFnZVwiO1xuZXhwb3J0IHtlbnN1cmVMYXp5SW1hZ2VzTG9hZGVkfSBmcm9tIFwiLi9sYXp5LWxvYWRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtMYXp5SW1hZ2UsIExhenlJbWFnZUNvbnRhaW5lcl0sXG4gICAgZXhwb3J0czogW0xhenlJbWFnZSwgTGF6eUltYWdlQ29udGFpbmVyXVxufSlcbmV4cG9ydCBjbGFzcyBMYXp5SW1hZ2VNb2R1bGUge1xufVxuIl19