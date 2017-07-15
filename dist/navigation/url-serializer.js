var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { URLSearchParams } from "@angular/http";
import { UrlSerializer as IonicUrlSerializer, DeepLinkConfigToken } from "ionic-angular";
import { urlToNavGroupStrings, navGroupStringtoObjects } from "ionic-angular/navigation/url-serializer";
import { isPresent } from "ionic-angular/util/util";
import { serialize } from "@co.mmons/js-utils/json";
/**
 * Implementation of ionic's UrlSerializer, that add page params as query
 * params, instead of path, e.g. "/page/subpage?param1=value".
 *
 * Additionaly it allows to use subarrays in DeepLinkConfig links, which is
 * helpful when AoT compilation is used.
 */
var UrlSerializer = (function (_super) {
    __extends(UrlSerializer, _super);
    function UrlSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlSerializer.setupUrlSerializer = function (config) {
        if (config && config.links) {
            var links = [];
            for (var _i = 0, _a = config.links; _i < _a.length; _i++) {
                var link = _a[_i];
                if (Array.isArray(link)) {
                    for (var _b = 0, link_1 = link; _b < link_1.length; _b++) {
                        var link2 = link_1[_b];
                        links.push(link2);
                    }
                }
                else {
                    links.push(link);
                }
            }
            config.links = links;
        }
        return new UrlSerializer(config);
    };
    UrlSerializer.prototype._createSegment = function (navGroup, configLink, data) {
        var urlParts = configLink.segmentParts.slice();
        var query;
        if (isPresent(data)) {
            var json = serialize(data);
            for (var key in json) {
                var value = json[key];
                if (value === undefined || value === null) {
                    // we ommit null/undefined
                }
                else if (typeof value !== "function") {
                    if (!query) {
                        query = new URLSearchParams();
                    }
                    if (Array.isArray(value)) {
                        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                            var i = value_1[_i];
                            query.append(key, i);
                        }
                    }
                    else {
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
    };
    UrlSerializer.prototype.parseUrlParts = function (navGroups, configLinks) {
        var segments = [];
        for (var _i = 0, configLinks_1 = configLinks; _i < configLinks_1.length; _i++) {
            var link = configLinks_1[_i];
            var _loop_1 = function (navGroup) {
                if (link.segmentPartsLen === navGroup.segmentPieces.length) {
                    var linkQuery = void 0;
                    // check if the segment pieces are a match
                    var allSegmentsMatch = true;
                    for (var i = 0; i < navGroup.segmentPieces.length; i++) {
                        var partParts = navGroup.segmentPieces[i].split("?");
                        var part = partParts.length > 0 ? partParts[0] : undefined;
                        linkQuery = partParts.length > 1 ? partParts[1] : undefined;
                        if (part != link.segmentParts[i]) {
                            allSegmentsMatch = false;
                            break;
                        }
                    }
                    // sweet, we found a match!
                    if (allSegmentsMatch) {
                        var data_1 = undefined;
                        if (linkQuery) {
                            var params = new URLSearchParams(linkQuery);
                            params.paramsMap.forEach(function (value, index) {
                                if (value) {
                                    if (!data_1)
                                        data_1 = {};
                                    if (value.length == 1) {
                                        data_1[index] = value[0];
                                    }
                                    else {
                                        data_1[index] = value;
                                    }
                                }
                            });
                        }
                        segments.push({
                            id: link.segmentParts.join('/'),
                            name: link.name,
                            component: link.component,
                            loadChildren: link.loadChildren,
                            data: data_1,
                            defaultHistory: link.defaultHistory,
                            navId: navGroup.navId,
                            type: navGroup.type,
                            secondaryId: navGroup.secondaryId
                        });
                    }
                }
            };
            for (var _a = 0, navGroups_1 = navGroups; _a < navGroups_1.length; _a++) {
                var navGroup = navGroups_1[_a];
                _loop_1(navGroup);
            }
        }
        return segments;
    };
    UrlSerializer.prototype.parse = function (browserUrl) {
        if (browserUrl.charAt(0) === "/") {
            browserUrl = browserUrl.substr(1);
        }
        return this.parseUrlParts(navGroupStringtoObjects(urlToNavGroupStrings(browserUrl)), this.links);
    };
    return UrlSerializer;
}(IonicUrlSerializer));
export { UrlSerializer };
export var URL_SERIALIZER_PROVIDER = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [DeepLinkConfigToken]
};
export var urlSerializerProvider = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [DeepLinkConfigToken]
};
//# sourceMappingURL=url-serializer.js.map