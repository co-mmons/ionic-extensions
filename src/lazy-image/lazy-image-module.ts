import {NgModule} from "@angular/core";
import {LazyImage, LazyImageContainer} from "./lazy-image";

@NgModule({
    declarations: [LazyImage, LazyImageContainer],
    imports: [],
    exports: [LazyImage, LazyImageContainer],
    providers: []
})
export class LazyImageModule {
}