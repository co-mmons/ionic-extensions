var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppVersion as InstalledAppVersion } from "@ionic-native/app-version";
import { Platform, AlertController } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
var AppVersion = /** @class */ (function () {
    function AppVersion(platform, http, appVersion, intl, alertController) {
        this.platform = platform;
        this.http = http;
        this.appVersion = appVersion;
        this.intl = intl;
        this.alertController = alertController;
    }
    AppVersion.prototype.newVersionAvailable = function (id, publishedVersions) {
        return __awaiter(this, void 0, void 0, function () {
            var platform, installedVersion, publishedVersion, verifiedPublishedVersion, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        platform = this.appPlatform(id);
                        if (!platform) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.installedVersionNumber()];
                    case 1:
                        installedVersion = _a.sent();
                        publishedVersion = typeof publishedVersions == "string" ? publishedVersions : (publishedVersions && publishedVersions[platform.platform]);
                        if (publishedVersion && this.compareVersionNumbers(publishedVersion, installedVersion) <= 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.publishedVersion(id, platform)];
                    case 2:
                        verifiedPublishedVersion = _a.sent();
                        if (verifiedPublishedVersion) {
                            if (publishedVersion && this.compareVersionNumbers(verifiedPublishedVersion.version, publishedVersion) == 0) {
                                return [2 /*return*/, verifiedPublishedVersion];
                            }
                            else if (!publishedVersion && this.compareVersionNumbers(verifiedPublishedVersion.version, installedVersion) > 0) {
                                return [2 /*return*/, verifiedPublishedVersion];
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, undefined];
                }
            });
        });
    };
    AppVersion.prototype.installedVersionNumber = function () {
        return this.appVersion.getVersionNumber();
    };
    AppVersion.prototype.publishedVersionNumber = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var version, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.publishedVersion(id)];
                    case 1:
                        version = _a.sent();
                        if (version && version.version) {
                            return [2 /*return*/, version.version];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, undefined];
                }
            });
        });
    };
    AppVersion.prototype.publishedVersion = function (id, app) {
        return __awaiter(this, void 0, void 0, function () {
            var httpOptions, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!app) {
                            app = this.appPlatform(id);
                        }
                        if (!app) return [3 /*break*/, 2];
                        httpOptions = {};
                        if (app.platform == "android") {
                            httpOptions.responseType = "text";
                        }
                        return [4 /*yield*/, this.http.get(app.url, httpOptions).toPromise()];
                    case 1:
                        content = (_a.sent());
                        return [2 /*return*/, this.parseVersion(app, content)];
                    case 2: return [2 /*return*/, undefined];
                }
            });
        });
    };
    AppVersion.prototype.appPlatform = function (id) {
        var app = {};
        if (this.platform.is("cordova") && window.cordova.platformId != "browser") {
            if (this.platform.is("ios")) {
                app.platform = "ios";
            }
            else if (this.platform.is("android")) {
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
        }
        else if (id && app.platform == "ios") {
            if (id.iosBundleId) {
                app.id = id.iosBundleId;
                app.appleIdType = "bundleId";
            }
            else {
                app.id = id.iosId;
                app.appleIdType = "id";
            }
        }
        else if (id && app.platform == "android" && id.androidPackageId) {
            app.id = id.androidPackageId;
        }
        if (!app.id) {
            console.error(new Error("Missing app identifier for package"));
            return undefined;
        }
        if (app.platform == "ios") {
            if (app.appleIdType == "bundleId") {
                app.url = "http://itunes.apple.com/lookup?bundleId=" + app.id;
            }
            else {
                app.url = "http://itunes.apple.com/lookup?id=" + app.id;
            }
        }
        else {
            app.url = "https://play.google.com/store/apps/details?id=" + app.id + "&hl=en";
        }
        return app;
    };
    AppVersion.prototype.compareVersionNumbers = function (a, b) {
        if (a && !b) {
            return 1;
        }
        else if (!a && b) {
            return -1;
        }
        var va = a.split(".");
        var vb = b.split(".");
        for (var i = 0; i < (vb.length > va.length ? vb.length : va.length); i++) {
            var na = va.length <= i ? 0 : parseInt(va[i]);
            var nb = vb.length <= i ? 0 : parseInt(vb[i]);
            if (na > nb) {
                return 1;
            }
            else if (nb > na) {
                return -1;
            }
        }
        return 0;
    };
    AppVersion.prototype.parseVersion = function (app, content) {
        if (app.platform == "ios") {
            if (content.results && content.results[0]) {
                return new AppNewVersion(this, app, content.results[0].version, content.results[0].trackViewUrl, content.results[0].releaseNotes ? this.parseTags(content.results[0].releaseNotes) : undefined);
            }
        }
        else if (app.platform == "android" && typeof content == "string") {
            var versionNumber = void 0;
            var match = void 0;
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
                return new AppNewVersion(this, app, versionNumber, "https://play.google.com/store/apps/details?id=" + app.id);
            }
        }
        return undefined;
    };
    AppVersion.prototype.parseTags = function (text) {
        var tags = [];
        var match = text.match(/#[^\s]+/ig);
        if (match) {
            for (var _i = 0, match_1 = match; _i < match_1.length; _i++) {
                var t = match_1[_i];
                tags.push(t.substr(1));
            }
        }
        return tags;
    };
    AppVersion.prototype.showUpdateMessage = function (version) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var linkId = "commons-ionic-extensions-app-version-" + version.app.id;
            var storeLink = document.getElementById(linkId);
            if (!storeLink) {
                storeLink = document.createElement("a");
                storeLink.id = "app-version-" + version.app.id;
                storeLink.style.display = "none";
                storeLink.setAttribute("href", version.url);
                storeLink.setAttribute("target", "_blank");
                storeLink.innerHTML = "store";
                document.body.appendChild(storeLink);
            }
            if (_this.updateMessageAlert) {
                _this.updateMessageAlert.dismiss();
            }
            _this.updateMessageAlert = _this.alertController.create({
                title: _this.intl.message("@co.mmons/ionic-extensions#appVersion/applicationUpdate"),
                message: _this.intl.message("@co.mmons/ionic-extensions#appVersion/newVersionAvailableMessage/" + version.app.platform),
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: _this.intl.message("@co.mmons/ionic-extensions#appVersion/notNow"),
                        role: "cancel"
                    },
                    {
                        text: _this.intl.message("@co.mmons/ionic-extensions#appVersion/update"),
                        handler: function () {
                            _this.updateMessageAlert.dismiss(true);
                            storeLink.click();
                            return false;
                        }
                    }
                ]
            });
            _this.updateMessageAlert.onDidDismiss(function (data) {
                storeLink.remove();
                resolve(data ? true : false);
            });
            _this.updateMessageAlert.present();
        });
    };
    AppVersion = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Platform, HttpClient, InstalledAppVersion, IntlService, AlertController])
    ], AppVersion);
    return AppVersion;
}());
export { AppVersion };
var AppNewVersion = /** @class */ (function () {
    function AppNewVersion(appVersion, app, version, url, tags) {
        this.appVersion = appVersion;
        this.app = app;
        this.version = version;
        this.url = url;
        this.tags = tags;
    }
    AppNewVersion.prototype.hasTag = function (tag) {
        if (this.tags) {
            return this.tags.indexOf(tag) > -1;
        }
        return false;
    };
    AppNewVersion.prototype.showUpdateMessage = function () {
        return this.appVersion.showUpdateMessage(this);
    };
    return AppNewVersion;
}());
export { AppNewVersion };
//# sourceMappingURL=app-version.js.map