import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {IntlModule} from "@co.mmons/angular-intl";
import {ButtonsModule} from "@co.mmons/ionic-extensions/buttons";
import {IonicModule} from "@ionic/angular";
import {Dialog} from "./dialog";
import {DialogButtons} from "./dialog-buttons";
import {DialogContent} from "./dialog-content";
import {DialogController} from "./dialog-controller";

export {Dialog} from "./dialog";
export {DialogButton} from "./dialog-button";
export {DialogController} from "./dialog-controller";
export {DialogButtons} from "./dialog-buttons";
export {DialogContent} from "./dialog-content";

@NgModule({
    declarations: [Dialog, DialogContent, DialogButtons],
    imports: [IntlModule, IonicModule, CommonModule, ButtonsModule],
    exports: [DialogContent, DialogButtons],
    entryComponents: [Dialog],
    providers: [DialogController]
})
export class DialogModule {
}
