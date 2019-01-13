import { IntlService } from "@co.mmons/angular-intl";
import { AlertController } from "@ionic/angular";
export declare class AppUpdater {
    private intl;
    private alertController;
    constructor(intl: IntlService, alertController: AlertController);
    checkUpdateAvailable(id: string | AppIdentifiers, publishedVersions?: {
        android?: string;
        ios?: string;
    } | string): Promise<AppUpdate>;
    installedVersion(): Promise<string>;
    storeVersion(id: string | AppIdentifiers): Promise<string>;
    appPlatform(id: string | AppIdentifiers): AppPlatform;
    compareVersions(a: string, b: string): number;
    private fetchStore;
    private readStore;
    private parseTags;
    private updateMessageAlert;
    showUpdateMessage(version: AppUpdate): Promise<boolean>;
}
export interface AppIdentifiers {
    androidPackageId?: string;
    iosBundleId?: string;
    iosId?: string | number;
}
export interface AppPlatform {
    platform?: "android" | "ios";
    url?: string;
    packageOrBundleId?: string | number;
    appleId?: string | number;
}
export declare class AppUpdate {
    private updateCheck;
    readonly app: AppPlatform;
    readonly version: string;
    private tags?;
    constructor(updateCheck: AppUpdater, app: AppPlatform, version: string, tags?: string[], url?: string);
    readonly url: string;
    hasTag(tag: string): boolean;
    showUpdateMessage(): Promise<boolean>;
}
