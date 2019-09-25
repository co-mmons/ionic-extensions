import {ScrollingModule} from "@angular/cdk/scrolling";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {IntlModule} from "@co.mmons/angular-intl";
import {ButtonsModule} from "@co.mmons/ionic-extensions/buttons";
import {IonicModule} from "@ionic/angular";
import {Select} from "./select";
import {SelectLabel} from "./select-label";
import {SelectOption} from "./select-option";
import {SelectOverlayContent} from "./select-overlay";

export * from "./select";
export * from "./select-option";
export * from "./select-options";

@NgModule({
    declarations: [Select, SelectOption, SelectOverlayContent, SelectLabel],
    entryComponents: [Select, SelectOption, SelectOverlayContent],
    exports: [Select, SelectOption, SelectOverlayContent, SelectLabel],
    imports: [CommonModule, FormsModule, IonicModule, IntlModule, ScrollingModule, ButtonsModule]
})
export class SelectModule {
}
