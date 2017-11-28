import { HttpClient } from "@angular/common/http";
import { AppVersion as InstalledAppVersion } from "@ionic-native/app-version";
import { Platform, AlertController } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
export declare class AppVersion {
    private platform;
    private http;
    private appVersion;
    private intl;
    private alertController;
    constructor(platform: Platform, http: HttpClient, appVersion: InstalledAppVersion, intl: IntlService, alertController: AlertController);
    newVersionAvailable(id: string | AppIdentifiers): Promise<AppNewVersion>;
    installedVersionNumber(): Promise<any>;
    publishedVersionNumber(id: string | AppIdentifiers): Promise<string>;
    private publishedVersion(id);
    private appPlatform(id);
    private compareVersionNumbers(a, b);
    private parseVersion(app, content);
    private parseTags(text);
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
    private app;
    private alertController;
    private intl;
    readonly version: string;
    readonly url: string;
    private tags;
    constructor(app: AppPlatform, alertController: AlertController, intl: IntlService, version?: string, url?: string, tags?: string[]);
    hasTag(tag: string): boolean;
    showUpdateMessage(): Promise<boolean>;
}
