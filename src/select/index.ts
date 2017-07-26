import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {IntlModule} from "@co.mmons/angular-intl";

import {SpinnerModule} from "../spinner";
import {Select} from "./select";
import {SelectModal} from "./select-modal";

@NgModule({
    declarations: [Select, SelectModal],
    exports: [Select],
    imports: [IonicModule, IntlModule, SpinnerModule],
    entryComponents: [SelectModal]
})
export class SelectModule {
}