import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {SelectModule} from "../select";
import {DateTimePickerInput} from "./input";
import {DateTimePickerOverlay} from "./overlay";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IntlModule} from "@co.mmons/angular-intl";

export {DateTimePickerInput} from "./input";

@NgModule({
    declarations: [DateTimePickerInput, DateTimePickerOverlay],
    entryComponents: [DateTimePickerOverlay],
    exports: [DateTimePickerInput],
    imports: [CommonModule, FormsModule, IonicModule, IntlModule, SelectModule]
})
export class DateTimePickerModule {
}
