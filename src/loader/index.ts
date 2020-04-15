import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IntlModule} from "@co.mmons/angular-intl";
import {IonicModule} from "@ionic/angular";
import {LoaderController} from "./loader-controller";
import {Loader} from "./loader";

export {Loader} from "./loader";
export {LoaderController} from "./loader-controller";
export {LoaderOptions} from "./loader-options";

@NgModule({
    declarations: [Loader],
    imports: [IntlModule, IonicModule, CommonModule],
    exports: [Loader],
    entryComponents: [Loader],
    providers: [LoaderController]
})
export class LoaderModule {
}
