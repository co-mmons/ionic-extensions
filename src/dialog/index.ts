import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IntlModule} from "@co.mmons/angular-intl";
import {IonicModule} from "@ionic/angular";
import {Dialog} from "./dialog";
import {DialogController} from "./dialog-controller";

export {Dialog} from "./dialog";
export {DialogButton} from "./dialog-button";
export {DialogController} from "./dialog-controller";

@NgModule({
    declarations: [Dialog],
    imports: [IntlModule, IonicModule, CommonModule],
    entryComponents: [Dialog],
    providers: [DialogController]
})
export class DialogModule {
}
