import {NgModule} from "@angular/core";
import {LazyImage, LazyImageContainer} from "./lazy-image";

export {LazyImage, LazyImageContainer} from "./lazy-image";
export {ensureLazyImagesLoaded} from "./lazy-load";

@NgModule({
    declarations: [LazyImage, LazyImageContainer],
    exports: [LazyImage, LazyImageContainer]
})
export class LazyImageModule {
}
