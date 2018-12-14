import {NgModule} from "@angular/core";
import {IonicBackButtonFix} from "./back-button-fix";
import {IonicInputFix} from "./input-fix";

@NgModule({
    declarations: [IonicInputFix, IonicBackButtonFix],
    exports: [IonicInputFix, IonicBackButtonFix]
})
export class IonicFixModule {
}