import { InjectionToken } from "@angular/core";
import { UrlSerializer as IonicUrlSerializer, DeepLinkConfig, App } from "ionic-angular";
import { NavLink, NavSegment } from "ionic-angular/navigation/nav-util";
import { NavigationContainer } from "ionic-angular/navigation/navigation-container";
/**
 * Implementation of ionic's UrlSerializer, that add page params as query
 * params, instead of path, e.g. "/page/subpage?param1=value".
 *
 * Additionaly it allows to use subarrays in DeepLinkConfig links, which is
 * helpful when AoT compilation is used.
 */
export declare class UrlSerializer extends IonicUrlSerializer {
    static setupUrlSerializer(app: App, config: DeepLinkConfig): IonicUrlSerializer;
    _createSegment(app: App, navContainer: NavigationContainer, configLink: NavLink, data: any): NavSegment;
    parse(browserUrl: string): NavSegment[];
    private findDataInUrl(url);
}
export declare const URL_SERIALIZER_PROVIDER: {
    provide: typeof IonicUrlSerializer;
    useFactory: (app: App, config: DeepLinkConfig) => IonicUrlSerializer;
    deps: (InjectionToken<any> | typeof App)[];
};
export declare const urlSerializerProvider: {
    provide: typeof IonicUrlSerializer;
    useFactory: (app: App, config: DeepLinkConfig) => IonicUrlSerializer;
    deps: (InjectionToken<any> | typeof App)[];
};
