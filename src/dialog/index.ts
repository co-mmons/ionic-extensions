import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IntlModule} from "@co.mmons/angular-intl";
import {IonicModule} from "@ionic/angular";
import {ButtonsModule} from "../buttons";
import {Dialog} from "./dialog";
import {DialogController} from "./dialog-controller";

export {Dialog} from "./dialog";
export {DialogButton} from "./dialog-button";
export {DialogController} from "./dialog-controller";
export {dialogData} from "./dialog-data-symbol";
export {dialogInstance} from "./dialog-instance-symbol";

@NgModule({
    declarations: [Dialog],
    imports: [IntlModule, IonicModule, CommonModule, ButtonsModule],
    entryComponents: [Dialog],
    providers: [DialogController]
})
export class DialogModule {
}
