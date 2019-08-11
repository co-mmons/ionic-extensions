import {NgModule} from "@angular/core";
import {IonicBackButtonFix} from "./back-button-fix";
import {IonicInputFix} from "./input-fix";
import {IonicItemTargetFix} from "./item-target";

@NgModule({
    declarations: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix],
    exports: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix]
})
export class IonicFixModule {
}
