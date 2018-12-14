import {NgModule} from "@angular/core";
import {ItemHint} from "./item-hint";
import {IonicModule} from "@ionic/angular";
import {IntlModule} from "@co.mmons/angular-intl";

export {ItemHint} from "./item-hint";

@NgModule({
    imports: [IonicModule, IntlModule],
    declarations: [ItemHint],
    exports: [ItemHint]
})
export class ItemHintModule {
}