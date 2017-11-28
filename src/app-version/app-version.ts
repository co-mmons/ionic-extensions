import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppVersion as InstalledAppVersion} from "@ionic-native/app-version";
import {Platform, AlertController} from "ionic-angular";
import {IntlService} from "@co.mmons/angular-intl";

@Injectable()
export class AppVersion {

    constructor(private platform: Platform, private http: HttpClient, private appVersion: InstalledAppVersion, private intl: IntlService, private alertController: AlertController) {        
    }

    async newVersionAvailable(id: string | AppIdentifiers): Promise<AppNewVersion> {
        try {
            let installed = await this.installedVersionNumber();
            let published = await this.publishedVersion(id);

            if (this.compareVersionNumbers(published ? published.version : undefined, installed) > 0) {
                return published;
            }

        } catch (e) {
            console.error(e);
        }

        return undefined;
    }

    installedVersionNumber() {
        return this.appVersion.getVersionNumber();
    }

    async publishedVersionNumber(id: string | AppIdentifiers): Promise<string> {
        try {
            let version = await this.publishedVersion(id);
            if (version && version.version) {
                return version.version;
            }

        } catch (e) {
            console.error(e);
        }

        return undefined;
    }

    private async publishedVersion(id: string | AppIdentifiers): Promise<AppNewVersion> {
        let app = this.appPlatform(id);
        if (app) {
            
            let httpOptions: any = {};
            if (app.platform == "android") {
                httpOptions.responseType = "text";
            }

            let content = (await this.http.get(app.url, httpOptions).toPromise());

            return this.parseVersion(app, content);
        } else {
            return undefined;
        }
    }

    private appPlatform(id: string | AppIdentifiers): AppPlatform {

        let app: AppPlatform = {};

        if (this.platform.is("cordova") && window.cordova.platformId != "browser") {
            if (this.platform.is("ios")) {
                app.platform = "ios";
            } else if (this.platform.is("android")) {
                app.platform = "android";
            }
        }

        if (!app.platform) {
            //console.debug("Platform " + this.platform.platforms().join(", ") + " not supported");
            return undefined;
        }

        if (typeof id == "string") {
            app.id = id;
            app.appleIdType = "bundleId";
        } else if (id && app.platform == "ios") {
            if (id.iosBundleId) {
                app.id = id.iosBundleId;
                app.appleIdType = "bundleId";
            } else {
                app.id = id.iosId;
                app.appleIdType = "id";
            }
        } else if (id && app.platform == "android" && id.androidPackageId) {
            app.id = id.androidPackageId;
        }

        if (!app.id) {
            console.error(new Error("Missing app identifier for package"));
            return undefined;
        }

        if (app.platform == "ios") {

            if (app.appleIdType == "bundleId") {
                app.url = `http://itunes.apple.com/lookup?bundleId=${app.id}`;
            } else {
                app.url = `http://itunes.apple.com/lookup?id=${app.id}`;
            }

        } else {
            app.url = `https://play.google.com/store/apps/details?id=${app.id}&hl=en`;
        }

        return app;
    }

    private compareVersionNumbers(a: string, b: string): number {
        
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

    private parseVersion(app: AppPlatform, content: any): AppNewVersion {

        if (app.platform == "ios") {
            
            if (content.results && content.results[0]) {
                return new AppNewVersion(
                    app,
                    this.alertController,
                    this.intl,
                    content.results[0].version,
                    content.results[0].trackViewUrl,
                    content.results[0].releaseNotes ? this.parseTags(content.results[0].releaseNotes) : undefined
                );
            }

        } else if (app.platform == "android" && typeof content == "string") {

            let versionNumber: string;
            let match: RegExpExecArray;

            match = (/itemprop="softwareVersion"[^>]*?>(.*?)<\//ig).exec(content);
            if (match.length > 1 && match[1]) {
                let versionMatch = match[1].trim().match(/^(\d+\.)?(\d+\.)?(\*|\d+)$/);
                if (versionMatch && versionMatch.length) {
                    versionNumber = versionMatch[0];
                }
            }

            if (!versionNumber) {
                match = (/(?:whatsnew|recent-change)(.+?)#((\d+\.)?(\d+\.)?(\*|\d+))/ig).exec(content);
                if (match && match.length > 2) {
                    versionNumber = match[2];
                }
            }

            if (versionNumber) {
                return new AppNewVersion(app, this.alertController, this.intl, versionNumber, `https://play.google.com/store/apps/details?id=${app.id}`);
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

export class AppNewVersion {
    constructor(private app: AppPlatform, private alertController: AlertController, private intl: IntlService, public readonly version?: string, public readonly url?: string, private tags?: string[]) {

    }

    hasTag(tag: string): boolean {
        if (this.tags) {
            return this.tags.indexOf(tag) > -1;
        }

        return false;
    }

    showUpdateMessage(): Promise<boolean> {

        return new Promise((resolve, reject) => {

            let linkId = "commons-ionic-extensions-app-version-" + this.app.id;

            let storeLink = document.getElementById(linkId);
            if (!storeLink) {
                storeLink = document.createElement("a");
                storeLink.id = "app-version-" + this.app.id
                storeLink.style.display = "none";
                storeLink.setAttribute("href", this.url);
                storeLink.setAttribute("target", "_blank");
                storeLink.innerHTML = "store";
                document.body.appendChild(storeLink);
            }

            let alert = this.alertController.create({
                title: this.intl.message("@co.mmons/ionic-extensions#appVersion/applicationUpdate"),
                message: this.intl.message("@co.mmons/ionic-extensions#appVersion/newVersionAvailableMessage/" + this.app.platform),
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: this.intl.message("@co.mmons/ionic-extensions#appVersion/notNow"),
                        role: "cancel"
                    },
                    {
                        text: this.intl.message("@co.mmons/ionic-extensions#appVersion/update"),
                        handler: () => {
                            alert.dismiss(true);
                            storeLink.click();
                            return false;
                        }
                    }
                ]
            });
            
            alert.onDidDismiss((data) => {
                storeLink.remove();
                resolve(data ? true : false);
            });

            alert.present();
        });
    }
}
