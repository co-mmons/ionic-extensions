import {OpaqueToken} from "@angular/core";
import {URLSearchParams} from "@angular/http";

import {UrlSerializer as IonicUrlSerializer, DeepLinkConfigToken, DeepLinkConfig} from "ionic-angular";
import {urlToNavGroupStrings, navGroupStringtoObjects, isPartMatch} from "ionic-angular/navigation/url-serializer";
import {NavLink, NavSegment, NavGroup} from "ionic-angular/navigation/nav-util";
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

    static setupUrlSerializer(config: DeepLinkConfig): IonicUrlSerializer {

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

        return new UrlSerializer(config);
    }

    _createSegment(navGroup: NavGroup, configLink: NavLink, data: any): NavSegment {
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

        return {
            id: urlParts.join('/') + (query ? "?" + query.toString() : ""),
            name: configLink.name,
            component: configLink.component,
            loadChildren: configLink.loadChildren,
            data: data,
            navId: navGroup.navId,
            type: navGroup.type,
            defaultHistory: configLink.defaultHistory,
            secondaryId: navGroup.secondaryId
        };
    }

    parseUrlParts(navGroups: NavGroup[], configLinks: NavLink[]): NavSegment[] {

        const segments: NavSegment[] = [];
        for (const link of configLinks) {
            for (const navGroup of navGroups) {
                if (link.segmentPartsLen === navGroup.segmentPieces.length) {

                    let linkQuery: string;

                    // check if the segment pieces are a match
                    let allSegmentsMatch = true;
                    for (let i = 0; i < navGroup.segmentPieces.length; i++) {

                        let partParts = navGroup.segmentPieces[i].split("?");
                        let part = partParts.length > 0 ? partParts[0] : undefined;
                        linkQuery = partParts.length > 1 ? partParts[1] : undefined;

                        if (part != link.segmentParts[i]) {
                            allSegmentsMatch = false;
                            break;
                        }
                    }
                    // sweet, we found a match!
                    if (allSegmentsMatch) {

                        let data = undefined;
                        if (linkQuery) {
                            let params = new URLSearchParams(linkQuery);

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

                        segments.push({
                            id: link.segmentParts.join('/'),
                            name: link.name,
                            component: link.component,
                            loadChildren: link.loadChildren,
                            data: data,
                            defaultHistory: link.defaultHistory,
                            navId: navGroup.navId,
                            type: navGroup.type,
                            secondaryId: navGroup.secondaryId
                        });
                    }
                }
            }
        }

        return segments;
    }

    parse(browserUrl: string): NavSegment[] {

        if (browserUrl.charAt(0) === "/") {
            browserUrl = browserUrl.substr(1);
        }

        return this.parseUrlParts(navGroupStringtoObjects(urlToNavGroupStrings(browserUrl)), this.links);
    }


}

export const URL_SERIALIZER_PROVIDER = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [DeepLinkConfigToken]
};

export const urlSerializerProvider = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [DeepLinkConfigToken]
};