import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {Spinner} from "./spinner";

export {Spinner} from "./spinner";

@NgModule({
    declarations: [Spinner],
    exports: [Spinner],
    imports: [CommonModule, IonicModule]
})
export class SpinnerModule {
}