import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IntlModule} from "@co.mmons/angular-intl";
import {AppVersion as InstalledAppVersion} from "@ionic-native/app-version/ngx";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {IonicModule} from "@ionic/angular";
import {AppVersion} from "./app-version";

export {AppIdentifiers, AppNewVersion, AppPlatform, AppVersion} from "./app-version";

@NgModule({
    imports: [BrowserModule, HttpClientModule, IntlModule, IonicModule],
    providers: [InstalledAppVersion, AppVersion, InAppBrowser]
})
export class AppVersionModule {
}