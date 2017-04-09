import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { DateTime } from "./input";
import { DateTimeOverlay } from "./overlay"

export { DateTime } from "./input";

@NgModule({
    declarations: [DateTime, DateTimeOverlay],
    exports: [DateTime],
    imports: [IonicModule],
    entryComponents: [DateTimeOverlay]
})
export class DateTimePickerModule {
}