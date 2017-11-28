import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { IonicModule } from "ionic-angular";
import { AppVersion as InstalledAppVersion } from "@ionic-native/app-version";
import { IntlModule } from "@co.mmons/angular-intl";
import { AppVersion } from "./app-version";
export { AppVersion } from "./app-version";
var AppVersionModule = /** @class */ (function () {
    function AppVersionModule() {
    }
    AppVersionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BrowserModule, HttpClientModule, IntlModule, IonicModule],
                    providers: [InstalledAppVersion, AppVersion]
                },] },
    ];
    /** @nocollapse */
    AppVersionModule.ctorParameters = function () { return []; };
    return AppVersionModule;
}());
export { AppVersionModule };
//# sourceMappingURL=index.js.map