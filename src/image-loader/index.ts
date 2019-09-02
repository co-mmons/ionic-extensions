import {NgModule} from "@angular/core";
import {ImageLoader} from "./image-loader";

export {ImageLoader, ensureImagesLoaded} from "./image-loader";

@NgModule({
    declarations: [ImageLoader],
    exports: [ImageLoader]
})
export class ImageLoaderModule {
}
