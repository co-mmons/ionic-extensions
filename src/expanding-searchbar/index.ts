import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";

import {ExpandingSearchbar} from "./expanding-searchbar";

@NgModule({
    declarations: [ExpandingSearchbar],
    exports: [ExpandingSearchbar],
    imports: [IonicModule]
})
export class ExpandingSearchbarModule {
}