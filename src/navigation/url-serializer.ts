import { OpaqueToken } from "@angular/core";
import { URLSearchParams } from "@angular/http";

import { UrlSerializer as IonicUrlSerializer, DeepLinkConfigToken } from "ionic-angular";
import { NavLink, NavSegment } from "ionic-angular/navigation/nav-util";
import { isPresent } from "ionic-angular/util/util";
import { serialize } from "co.mmons.typescript-utils/json";

/**
 * Implementation of ionic's UrlSerializer, that add page params as query 
 * params, instead of path, e.g. "/page/subpage?param1=value".
 * 
 * Additionaly it allows to use subarrays in DeepLinkConfig links, which is
 * helpful when AoT compilation is used.
 */
export class UrlSerializer extends IonicUrlSerializer {

    static setupUrlSerializer(userDeepLinkConfig: any): IonicUrlSerializer {

        if (userDeepLinkConfig && userDeepLinkConfig.links) {

            let links = [];

            for (let link of userDeepLinkConfig.links) {
                if (Array.isArray(link)) {
                    for (let link2 of link) {
                        links.push(link2);
                    }
                }
            }

            userDeepLinkConfig.links = links;
        }

        return new UrlSerializer(userDeepLinkConfig);
    }

    createSegment(configLink: NavLink, data: any): NavSegment {
        let urlParts = configLink.parts.slice();
        let query: URLSearchParams;

        if (isPresent(data)) {
            let json = serialize(data);
            for (let i in json) {
                let v = json[i];
                if (v === undefined || v === null) {
                } else if (typeof v !== "function") {
                    if (!query) query = new URLSearchParams();
                    query.append(i, v);
                }
            }
        }

        return {
            id: urlParts.join('/') + (query ? "?" + query.toString() : ""),
            name: configLink.name,
            component: configLink.component,
            data: data,
            defaultHistory: configLink.defaultHistory
        };
    }

    parseUrlParts(urlParts: string[]): NavSegment[] {

        const configLinks = this.links;
        const configLinkLen = configLinks.length;
        const urlPartsLen = urlParts.length;
        const segments: NavSegment[] = new Array(urlPartsLen);

        for (var i = 0; i < configLinkLen; i++) {
            // compare url parts to config link parts to create nav segments
            var configLink = configLinks[i];
            if (configLink.partsLen <= urlPartsLen) {
                this.fillMatchedUrlParts(segments, urlParts, configLink);
            }
        }

        // remove all the undefined segments
        for (var i = urlPartsLen - 1; i >= 0; i--) {
            if (segments[i] === undefined) {
                if (urlParts[i] === undefined) {
                    // not a used part, so remove it
                    segments.splice(i, 1);

                } else {
                    // create an empty part
                    segments[i] = {
                        id: urlParts[i],
                        name: urlParts[i],
                        component: null,
                        data: null
                    };
                }
            }
        }

        return segments;
    }

    fillMatchedUrlParts(segments: NavSegment[], urlParts: string[], configLink: NavLink) {

        for (let i = 0; i < urlParts.length; i++) {
            let urlI = i;

            let partParts = urlParts[i] ? urlParts[i].split("?") : [];
            let part = partParts.length > 0 ? partParts[0] : undefined;
            let query = partParts.length > 1 ? partParts[1] : undefined;

            for (let j = 0; j < configLink.partsLen; j++) {
                if (part === configLink.parts[j]) {
                    urlI++;
                } else {
                    break;
                }
            }

            if ((urlI - i) === configLink.partsLen) {
                let matchedUrlParts = urlParts.slice(i, urlI);
                for (let j = i; j < urlI; j++) {
                    urlParts[j] = undefined;
                }

                let data = undefined;
                if (query) {
                    let params = new URLSearchParams(query);

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
                }

                segments[i] = {
                    id: matchedUrlParts.join('/'),
                    name: configLink.name,
                    component: configLink.component,
                    data: data,
                    defaultHistory: configLink.defaultHistory
                };
            }
        }
    }

    parse(browserUrl: string): NavSegment[] {

        if (browserUrl.charAt(0) === '/') {
            browserUrl = browserUrl.substr(1);
        }

        return this.parseUrlParts(browserUrl.split('/'));
    }


}

export const URL_SERIALIZER_PROVIDER = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [DeepLinkConfigToken]
};
