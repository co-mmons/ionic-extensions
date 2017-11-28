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
import { InjectionToken } from "@angular/core";
import { UrlSerializer as IonicUrlSerializer, DeepLinkConfigToken, App } from "ionic-angular";
import { isPresent } from "ionic-angular/util/util";
import { serialize } from "@co.mmons/js-utils/json";
/**
 * Implementation of ionic's UrlSerializer, that add page params as query
 * params, instead of path, e.g. "/page/subpage?param1=value".
 *
 * Additionaly it allows to use subarrays in DeepLinkConfig links, which is
 * helpful when AoT compilation is used.
 */
var UrlSerializer = /** @class */ (function (_super) {
    __extends(UrlSerializer, _super);
    function UrlSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlSerializer.setupUrlSerializer = function (app, config) {
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
        return new UrlSerializer(app, config);
    };
    UrlSerializer.prototype._createSegment = function (app, navContainer, configLink, data) {
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
        var requiresExplicitPrefix = true;
        if (navContainer.parent) {
            requiresExplicitPrefix = navContainer.parent && navContainer.parent.getAllChildNavs().length > 1;
        }
        else {
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
    };
    UrlSerializer.prototype.parse = function (browserUrl) {
        var segments = _super.prototype.parse.call(this, browserUrl);
        var data = this.findDataInUrl(browserUrl);
        for (var _i = 0, segments_1 = segments; _i < segments_1.length; _i++) {
            var segment = segments_1[_i];
            segment.data = data[segment.id];
        }
        return segments;
    };
    UrlSerializer.prototype.findDataInUrl = function (url) {
        if (url.charAt(0) === "/") {
            url = url.substr(1);
        }
        var urlData = {};
        var segments = url.split("/");
        var _loop_1 = function (segment) {
            var parts = segment.split("?");
            if (parts.length > 1) {
                var params = new URLSearchParams(parts[1]);
                var data_1 = {};
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
                urlData[parts[0]] = data_1;
            }
        };
        for (var _i = 0, segments_2 = segments; _i < segments_2.length; _i++) {
            var segment = segments_2[_i];
            _loop_1(segment);
        }
        return urlData;
    };
    return UrlSerializer;
}(IonicUrlSerializer));
export { UrlSerializer };
// fix declared but never used
InjectionToken;
export var URL_SERIALIZER_PROVIDER = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [App, DeepLinkConfigToken]
};
export var urlSerializerProvider = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [App, DeepLinkConfigToken]
};
//# sourceMappingURL=url-serializer.js.map