import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {ExpandingSearchbar} from "./expanding-searchbar";
import {ExpandingSearchbarStyles} from "./expanding-searchbar-styles";

export {ExpandingSearchbar} from "./expanding-searchbar";

@NgModule({
    declarations: [ExpandingSearchbar, ExpandingSearchbarStyles],
    exports: [ExpandingSearchbar],
    entryComponents: [ExpandingSearchbarStyles],
    imports: [IonicModule]
})
export class ExpandingSearchbarModule {
}
