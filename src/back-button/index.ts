import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MatchMediaModule} from "@co.mmons/angular-extensions/browser/match-media";
import {IonicFixModule} from "@co.mmons/ionic-extensions/ionic-fix";
import {IonicModule} from "@ionic/angular";
import {BackButton} from "./back-button";

export {BackButton} from "./back-button";

@NgModule({
    declarations: [BackButton],
    exports: [BackButton],
    imports: [CommonModule, IonicModule, MatchMediaModule, IonicFixModule]
})
export class BackButtonModule {
}
