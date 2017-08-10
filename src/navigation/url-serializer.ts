import {OpaqueToken} from "@angular/core";
import {URLSearchParams} from "@angular/http";

import {UrlSerializer as IonicUrlSerializer, DeepLinkConfigToken, DeepLinkConfig, App} from "ionic-angular";
import {urlToNavGroupStrings, navGroupStringtoObjects, isPartMatch} from "ionic-angular/navigation/url-serializer";
import {NavLink, NavSegment, NavGroup} from "ionic-angular/navigation/nav-util";
import {NavigationContainer} from "ionic-angular/navigation/navigation-container";
import {isPresent} from "ionic-angular/util/util";
import {serialize} from "@co.mmons/js-utils/json";

/**
 * Implementation of ionic's UrlSerializer, that add page params as query 
 * params, instead of path, e.g. "/page/subpage?param1=value".
 * 
 * Additionaly it allows to use subarrays in DeepLinkConfig links, which is
 * helpful when AoT compilation is used.
 */
export class UrlSerializer extends IonicUrlSerializer {

    static setupUrlSerializer(app: App, config: DeepLinkConfig): IonicUrlSerializer {

        if (config && config.links) {

            let links = [];

            for (let link of config.links) {
                if (Array.isArray(link)) {
                    for (let link2 of link) {
                        links.push(link2);
                    }
                } else {
                    links.push(link);
                }
            }

            config.links = links;
        }

        return new UrlSerializer(app, config);
    }

    _createSegment(app: App, navContainer: NavigationContainer, configLink: NavLink, data: any): NavSegment {
        let urlParts = configLink.segmentParts.slice();
        let query: URLSearchParams;

        if (isPresent(data)) {

            let json = serialize(data);

            for (let key in json) {
                let value = json[key];

                if (value === undefined || value === null) {
                    // we ommit null/undefined

                } else if (typeof value !== "function") {

                    if (!query) {
                        query = new URLSearchParams();
                    }

                    if (Array.isArray(value)) {
                        for (let i of value) {
                            query.append(key, i);
                        }
                    } else {
                        query.append(key, value);
                    }
                }
            }
        }

        let requiresExplicitPrefix = true;
        if (navContainer.parent) {
            requiresExplicitPrefix = navContainer.parent && navContainer.parent.getAllChildNavs().length > 1;
        } else {
            // if it's a root nav, and there are multiple root navs, we need an explicit prefix
            requiresExplicitPrefix = app.getRootNavById(navContainer.id) && app.getRootNavs().length > 1;
        }

        return {
            id: urlParts.join('/') + (query ? "?" + query.toString() : ""),
            name: configLink.name,
            component: configLink.component,
            loadChildren: configLink.loadChildren,
            data: data,
            defaultHistory: configLink.defaultHistory,
            navId: navContainer.name || navContainer.id,
            type: navContainer.getType(),
            secondaryId: navContainer.getSecondaryIdentifier(),
            requiresExplicitNavPrefix: requiresExplicitPrefix
        };
    }

    parse(browserUrl: string): NavSegment[] {

        let segments = super.parse(browserUrl);
        let data = this.findDataInUrl(browserUrl);

        for (let segment of segments) {
            segment.data = data[segment.id];
        }

        return segments;
    }

    private findDataInUrl(url: string) {

        if (url.charAt(0) === "/") {
            url = url.substr(1);
        }

        let urlData = {};
        let segments = url.split("/");

        for (let segment of segments) {

            let parts = segment.split("?");
            if (parts.length > 1) {
                let params = new URLSearchParams(parts[1]);
                let data = {};

                params.paramsMap.forEach((value, index) => {

                    if (value) {
                        if (!data) data = {};
                        if (value.length == 1) {
                            data[index] = value[0];
                        } else {
                            data[index] = value;
                        }
                    }
                });

                urlData[parts[0]] = data;
            }
        }

        return urlData;
    }
}

export const URL_SERIALIZER_PROVIDER = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [App, DeepLinkConfigToken]
};

export const urlSerializerProvider = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [App, DeepLinkConfigToken]
};