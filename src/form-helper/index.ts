import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {MatchMediaModule} from "@co.mmons/angular-extensions/browser/match-media";
import {IntlModule} from "@co.mmons/angular-intl";
import {IonicModule} from "@ionic/angular";
import {FormHeading} from "./heading";
import {FormHelper} from "./helper";
import {FormItem} from "./item";
import {ItemError} from "./item-error";
import {ItemHint} from "./item-hint";

@NgModule({
    declarations: [FormItem, FormHeading, ItemError, ItemHint, FormHelper],
    imports: [CommonModule, FormsModule, IonicModule, IntlModule, MatchMediaModule],
    exports: [FormItem, ItemError, ItemHint, FormHeading, FormHelper]
})
export class FormHelperModule {
}