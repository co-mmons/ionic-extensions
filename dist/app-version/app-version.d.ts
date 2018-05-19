import { HttpClient } from "@angular/common/http";
import { AppVersion as InstalledAppVersion } from "@ionic-native/app-version";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Platform, AlertController } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
export declare class AppVersion {
    private platform;
    private http;
    private appVersion;
    private intl;
    private alertController;
    private inAppBrowser;
    constructor(platform: Platform, http: HttpClient, appVersion: InstalledAppVersion, intl: IntlService, alertController: AlertController, inAppBrowser: InAppBrowser);
    newVersionAvailable(id: string | AppIdentifiers, publishedVersions?: {
        android?: string;
        ios?: string;
    } | string): Promise<AppNewVersion>;
    installedVersionNumber(): Promise<string>;
    publishedVersionNumber(id: string | AppIdentifiers): Promise<string>;
    private publishedVersion(id, app?);
    private appPlatform(id);
    private compareVersionNumbers(a, b);
    private parseVersion(app, content);
    private parseTags(text);
    private updateMessageAlert;
    showUpdateMessage(version: AppNewVersion): Promise<boolean>;
}
export interface AppIdentifiers {
    androidPackageId?: string;
    iosBundleId?: string;
    iosId?: string;
}
export interface AppPlatform {
    platform?: "android" | "ios";
    url?: string;
    id?: string;
    appleIdType?: "id" | "bundleId";
}
export declare class AppNewVersion {
    private appVersion;
    readonly app: AppPlatform;
    readonly version: string;
    readonly url: string;
    private tags;
    constructor(appVersion: AppVersion, app: AppPlatform, version?: string, url?: string, tags?: string[]);
    hasTag(tag: string): boolean;
    showUpdateMessage(): Promise<boolean>;
}
