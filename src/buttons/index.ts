import {NgModule} from "@angular/core";
import {Buttons} from "./buttons";

export {Buttons} from "./buttons";

@NgModule({
    declarations: [Buttons],
    exports: [Buttons]
})
export class ButtonsModule {
}
