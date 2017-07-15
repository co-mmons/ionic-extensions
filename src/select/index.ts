import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {IntlModule} from "@co.mmons/angular-intl";

import {Select} from "./select";
import {SelectOverlay} from "./select-overlay"

@NgModule({
    declarations: [Select, SelectOverlay],
    exports: [Select],
    imports: [IonicModule, IntlModule],
    entryComponents: [SelectOverlay]
})
export class SelectModule {
}