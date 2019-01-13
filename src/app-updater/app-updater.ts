import {Injectable} from "@angular/core";
import {Capacitor, Plugins} from "@capacitor/core";
import {IntlService} from "@co.mmons/angular-intl";
import {HTTP} from "@ionic-native/http";
import {AlertController} from "@ionic/angular";

@Injectable()
export class AppUpdater {

    constructor(private intl: IntlService, private alertController: AlertController) {
    }

    async checkUpdateAvailable(id: string | AppIdentifiers, publishedVersions?: {android?: string, ios?: string} | string): Promise<AppUpdate> {
        try {

            let platform = this.appPlatform(id);
            if (!platform) {
                return;
            }

            let installedVersion = await this.installedVersion();
            let publishedVersion = typeof publishedVersions == "string" ? publishedVersions : (publishedVersions && publishedVersions[platform.platform]);

            if (publishedVersion && this.compareVersions(publishedVersion, installedVersion) <= 0) {
                return;
            }

            let verifiedPublishedVersion = await this.fetchStore(id, platform);

            if (verifiedPublishedVersion) {
                if (publishedVersion && this.compareVersions(verifiedPublishedVersion.version, publishedVersion) >= 0) {
                    return verifiedPublishedVersion;
                } else if (!publishedVersion && this.compareVersions(verifiedPublishedVersion.version, installedVersion) > 0) {
                    return verifiedPublishedVersion;
                }
            }

        } catch (e) {
            console.error(e);
        }

        return undefined;
    }

    async installedVersion(): Promise<string> {
        return (await Plugins.Device.getInfo()).appVersion;
    }

    async storeVersion(id: string | AppIdentifiers): Promise<string> {
        try {
            let version = await this.fetchStore(id);
            if (version && version.version) {
                return version.version;
            }

        } catch (e) {
            console.error(e);
        }

        return undefined;
    }

    public appPlatform(id: string | AppIdentifiers): AppPlatform {

        let app: AppPlatform = {};

        if (Capacitor.platform == "ios") {
            app.platform = "ios";
        } else if (Capacitor.platform == "android") {
            app.platform = "android";
        } else {
            //console.debug("Platform " + this.platform.platforms().join(", ") + " not supported");
            return undefined;
        }

        if (typeof id == "string") {
            app.packageOrBundleId = id;
        } else if (id && app.platform == "ios" && (id.iosBundleId || id.iosId)) {
            app.packageOrBundleId = id.iosBundleId;
            app.appleId = id.iosId;
        } else if (id && app.platform == "android" && id.androidPackageId) {
            app.packageOrBundleId = id.androidPackageId;
        }

        if (!app.packageOrBundleId) {
            console.error(new Error("Missing app identifier for package"));
            return undefined;
        }

        if (app.platform == "ios") {

            if (app.appleId) {
                app.url = `http://itunes.apple.com/lookup?id=${app.appleId}&${Date.now()}`;
            } else {
                app.url = `http://itunes.apple.com/lookup?bundleId=${app.packageOrBundleId}&${Date.now()}`;
            }

        } else {
            app.url = `https://play.google.com/store/apps/details?id=${app.packageOrBundleId}&hl=en&${Date.now()}`;
        }

        return app;
    }

    compareVersions(a: string, b: string): number {

        if (a && !b) {
            return 1;
        } else if (!a && b) {
            return -1;
        }

        let va = a.split(".");
        let vb = b.split(".");

        for (let i = 0; i < (vb.length > va.length ? vb.length : va.length); i++) {

            let na = va.length <= i ? 0 : parseInt(va[i]);
            let nb = vb.length <= i ? 0 : parseInt(vb[i]);

            if (na > nb) {
                return 1;
            } else if (nb > na) {
                return -1;
            }
        }

        return 0;
    }

    private async fetchStore(id: string | AppIdentifiers, app?: AppPlatform): Promise<AppUpdate> {

        if (!app) {
            app = this.appPlatform(id);
        }

        if (app) {

            // let httpOptions: any = {};
            // if (app.platform == "android") {
            //     httpOptions.responseType = "text";
            // }

            let content = (await HTTP.get(app.url, {}, {})).data;
            if (app.platform == "ios" && content) {
                console.log(content);
                content = JSON.parse(content);
            }

            return this.readStore(app, content);
        } else {
            return undefined;
        }
    }

    private readStore(app: AppPlatform, content: any): AppUpdate {

        if (app.platform == "ios") {

            if (content.results && content.results[0]) {
                return new AppUpdate(
                    this,
                    app,
                    content.results[0].version,
                    content.results[0].releaseNotes ? this.parseTags(content.results[0].releaseNotes) : undefined,
                    content.results[0].trackViewUrl
                );
            }

        } else if (app.platform == "android" && typeof content == "string") {

            let versionNumber: string;
            let match: RegExpExecArray;

            if (!versionNumber) {
                match = (/#((\d+\.)?(\d+\.)?(\*|\d+))#/ig).exec(content);
                if (match && match.length > 1) {
                    versionNumber = match[1];
                }
            }

            if (!versionNumber) {
                match = (/###((\d+\.)?(\d+\.)?(\*|\d+))###/ig).exec(content);
                if (match && match.length > 1) {
                    versionNumber = match[1];
                }
            }

            if (versionNumber) {
                return new AppUpdate(this, app, versionNumber);
            }
        }

        return undefined;
    }

    private parseTags(text: string) {
        let tags: string[] = [];
        let match = text.match(/#[^\s]+/ig);
        if (match) {
            for (let t of match) {
                tags.push(t.substr(1));
            }
        }

        return tags;
    }


    private updateMessageAlert: HTMLIonAlertElement;

    showUpdateMessage(version: AppUpdate): Promise<boolean> {

        return new Promise(async (resolve, reject) => {

            if (this.updateMessageAlert) {
                reject(new Error("Already showing update message"));
                return;
            }

            this.updateMessageAlert = (await this.alertController.create({
                header: this.intl.message("@co.mmons/ionic-extensions#AppUpdater/applicationUpdate"),
                message: this.intl.message("@co.mmons/ionic-extensions#AppUpdater/newVersionAvailableMessage/" + version.app.platform),
                backdropDismiss: false,
                buttons: [
                    {role: "cancel", text: this.intl.message("@co.mmons/ionic-extensions#AppUpdater/notNow")},
                    {
                        role: "update",
                        text: this.intl.message("@co.mmons/ionic-extensions#AppUpdater/update"),
                        handler: () => {
                            this.updateMessageAlert.dismiss(true);
                            window.open(version.url, "_system");
                            return false;
                        }
                    }
                ]
            }));

            this.updateMessageAlert.present();

            let result = await this.updateMessageAlert.onDidDismiss();
            resolve(result.role == "update");

            this.updateMessageAlert = undefined;
        });
    }
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

export class AppUpdate {

    constructor(private updateCheck: AppUpdater, public readonly app: AppPlatform, public readonly version: string, private tags?: string[], url?: string) {

        if (!url) {
            if (app.platform == "ios" && app.appleId) {
                this.url = `https://itunes.apple.com/us/app/id${app.appleId}?mt=8&uo=4`;
            } else if (app.platform == "android" && app.packageOrBundleId) {
                this.url = `https://play.google.com/store/apps/details?id=${app.packageOrBundleId}`;
            }
        } else {
            this.url = url;
        }

    }

    public readonly url: string;

    hasTag(tag: string): boolean {
        if (this.tags) {
            return this.tags.indexOf(tag) > -1;
        }

        return false;
    }

    showUpdateMessage(): Promise<boolean> {
        return this.updateCheck.showUpdateMessage(this);
    }
}
