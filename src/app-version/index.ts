import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {IonicModule} from "ionic-angular";
import {AppVersion as InstalledAppVersion} from "@ionic-native/app-version";
import {IntlModule} from "@co.mmons/angular-intl";

import {AppVersion} from "./app-version";
export {AppVersion} from "./app-version";

@NgModule({
    imports: [BrowserModule, HttpClientModule, IntlModule, IonicModule],
    providers: [InstalledAppVersion, AppVersion]
})
export class AppVersionModule {
}