import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {IntlModule} from "@co.mmons/angular-intl";
import {IonicModule} from "@ionic/angular";
import {Select} from "./select";
import {SelectOption} from "./select-option";
import {SelectOverlayContent} from "./select-overlay";

@NgModule({
    declarations: [Select, SelectOption, SelectOverlayContent],
    entryComponents: [Select, SelectOption, SelectOverlayContent],
    exports: [Select, SelectOption, SelectOverlayContent],
    imports: [CommonModule, FormsModule, IonicModule, IntlModule]
})
export class SelectModule {
}