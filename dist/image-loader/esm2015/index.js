import { NgModule } from "@angular/core";
import { ImageLoader } from "./image-loader";
export { ImageLoader, ensureImagesLoaded } from "./image-loader";
export class ImageLoaderModule {
}
ImageLoaderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ImageLoader],
                exports: [ImageLoader]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW1hZ2UtbG9hZGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU0vRCxNQUFNLE9BQU8saUJBQWlCOzs7WUFKN0IsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDM0IsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SW1hZ2VMb2FkZXJ9IGZyb20gXCIuL2ltYWdlLWxvYWRlclwiO1xuXG5leHBvcnQge0ltYWdlTG9hZGVyLCBlbnN1cmVJbWFnZXNMb2FkZWR9IGZyb20gXCIuL2ltYWdlLWxvYWRlclwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW0ltYWdlTG9hZGVyXSxcbiAgICBleHBvcnRzOiBbSW1hZ2VMb2FkZXJdXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyTW9kdWxlIHtcbn1cbiJdfQ==