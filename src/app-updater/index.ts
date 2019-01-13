import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IntlModule} from "@co.mmons/angular-intl";
import {IonicModule} from "@ionic/angular";
import {AppUpdater} from "./app-updater";

export {AppIdentifiers, AppPlatform, AppUpdate, AppUpdater} from "./app-updater";

@NgModule({
    imports: [BrowserModule, IntlModule, IonicModule],
    providers: [AppUpdater]
})
export class AppUpdaterModule {
}