import {NgModule} from "@angular/core";
import {LazyDirectives, LazyLoadContainer} from "./lazy-directives";

export {LazyDirectives, LazyLoadContainer} from "./lazy-directives";
export {ensureLazyLoad} from "./lazy-load";

@NgModule({
    declarations: [LazyDirectives, LazyLoadContainer],
    exports: [LazyDirectives, LazyLoadContainer]
})
export class LazyLoaderModule {
}
