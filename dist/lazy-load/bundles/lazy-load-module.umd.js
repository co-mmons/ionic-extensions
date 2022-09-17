(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@co.mmons/js-utils/core')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/lazy-load', ['exports', '@angular/core', '@co.mmons/js-utils/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"]["lazy-load"] = {}), global.ng.core, global.core));
})(this, (function (exports, core$1, core) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }

    var defaultOptions = {
        selector: "img",
        container: window,
        scroll: null,
        threshold: 300,
        throttle: 150,
        dataSrc: "original",
        dataSrcSet: "original-set",
        dataAlternate: "alternate",
        classLoading: "ionx-lazy-image-loading",
        classLoaded: "ionx-lazy-image-loaded",
        skipInvisible: true,
        callbackLoad: null,
        callbackError: null,
        callbackSet: null,
        callbackProcessed: null
    };
    function _isInsideViewport(element, container, threshold) {
        var ownerDocument, documentTop, documentLeft;
        function _getDocumentWidth() {
            return window.innerWidth || (ownerDocument.documentElement.clientWidth || document.body.clientWidth);
        }
        function _getDocumentHeight() {
            return window.innerHeight || (ownerDocument.documentElement.clientHeight || document.body.clientHeight);
        }
        function _getTopOffset(element) {
            return element.getBoundingClientRect().top + documentTop - ownerDocument.documentElement.clientTop;
        }
        function _getLeftOffset(element) {
            return element.getBoundingClientRect().left + documentLeft - ownerDocument.documentElement.clientLeft;
        }
        function _isBelowViewport() {
            var fold;
            if (container === window) {
                fold = _getDocumentHeight() + documentTop;
            }
            else {
                fold = _getTopOffset(container) + container.offsetHeight;
            }
            return fold <= _getTopOffset(element) - threshold;
        }
        function _isAtRightOfViewport() {
            var fold;
            if (container === window) {
                fold = _getDocumentWidth() + window.pageXOffset;
            }
            else {
                fold = _getLeftOffset(container) + _getDocumentWidth();
            }
            return fold <= _getLeftOffset(element) - threshold;
        }
        function _isAboveViewport() {
            var fold;
            if (container === window) {
                fold = documentTop;
            }
            else {
                fold = _getTopOffset(container);
            }
            return fold >= _getTopOffset(element) + threshold + element.offsetHeight;
        }
        function _isAtLeftOfViewport() {
            var fold;
            if (container === window) {
                fold = documentLeft;
            }
            else {
                fold = _getLeftOffset(container);
            }
            return fold >= _getLeftOffset(element) + threshold + element.offsetWidth;
        }
        ownerDocument = element.ownerDocument;
        documentTop = window.pageYOffset || ownerDocument.body.scrollTop;
        documentLeft = window.pageXOffset || ownerDocument.body.scrollLeft;
        return !_isBelowViewport() && !_isAboveViewport() && !_isAtRightOfViewport() && !_isAtLeftOfViewport();
    }
    function _now() {
        var d = new Date();
        return d.getTime();
    }
    function _convertToArray(nodeSet) {
        return Array.prototype.slice.call(nodeSet);
    }
    function setSourcesForPicture(element, srcsetDataAttribute) {
        var parent = element.parentElement;
        if (parent.tagName !== 'PICTURE') {
            return;
        }
        for (var i = 0; i < parent.children.length; i++) {
            var pictureChild = parent.children[i];
            if (pictureChild.tagName === 'SOURCE') {
                var sourceSrcset = pictureChild.getAttribute('data-' + srcsetDataAttribute);
                if (sourceSrcset) {
                    pictureChild.setAttribute('srcset', sourceSrcset);
                }
            }
        }
    }
    /**
     * Sets sources (e.g. src) for lazy load element.
     * @param element Element, whose image to be loaded.
     * @param srcsetDataAttribute
     * @param srcDataAttribute
     */
    function setSources(element, srcsetDataAttribute, srcDataAttribute) {
        var tagName = element.tagName.toUpperCase();
        var elementSrc = element.getAttribute("data-" + srcDataAttribute);
        if (tagName === "IFRAME" || tagName === "VIDEO") {
            if (elementSrc) {
                element.setAttribute("src", elementSrc);
            }
            return;
        }
        else {
            if (tagName === "IMG") {
                setSourcesForPicture(element, srcsetDataAttribute);
            }
            var dataTarget = element;
            if (element["__ionxLazyLoadTmpImg"]) {
                dataTarget = element["__ionxLazyLoadTmpImg"];
            }
            var imgSrcSet = element.getAttribute("data-" + srcsetDataAttribute);
            if (imgSrcSet) {
                dataTarget.setAttribute("srcset", imgSrcSet);
            }
            if (elementSrc) {
                dataTarget.setAttribute("src", elementSrc);
            }
            return;
        }
        //if (elementSrc) element.style.backgroundImage = "url(" + elementSrc + ")";
    }
    function _bind(fn, obj) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }
    var instanceCounter = 0;
    var instances = {};
    var Loader = /** @class */ (function () {
        function Loader(options) {
            this.id = (++instanceCounter) + "";
            instances[this.id] = this;
            this._options = Object.assign({}, defaultOptions, options);
            this._queryOriginNode = this._options.container === window ? document : this._options.container;
            this._previousLoopTime = 0;
            this._loopTimeout = null;
            this._handleScrollFn = _bind(this.handleScroll, this);
            window.addEventListener("resize", this._handleScrollFn);
            this.update();
        }
        Object.defineProperty(Loader.prototype, "container", {
            get: function () {
                return this._queryOriginNode;
            },
            enumerable: false,
            configurable: true
        });
        Loader.prototype._showOnAppear = function (element) {
            var _this = this;
            var errorCallback = function () {
                var eventTarget = element;
                if (element["__ionxLazyLoadTmpImg"]) {
                    eventTarget = element["__ionxLazyLoadTmpImg"];
                }
                var alternate = _this._options && _this._options.dataAlternate && element.getAttribute("data-" + _this._options.dataAlternate);
                if (alternate && eventTarget["src"] != alternate) {
                    eventTarget["src"] = alternate;
                    return;
                }
                delete element["__ionxLazyLoadTmpImg"];
                eventTarget.removeEventListener("load", loadCallback);
                eventTarget.removeEventListener("error", errorCallback);
                element.lazyLoadError = true;
                if (_this._options) {
                    element.classList.remove(_this._options.classLoading);
                    if (_this._options.callbackError) {
                        _this._options.callbackError.callback_error(element);
                    }
                }
            };
            var loadCallback = function () {
                /* As this method is asynchronous, it must be protected against external destroy() calls */
                if (_this._options === null || _this._options === undefined) {
                    return;
                }
                var eventTarget = element;
                // if target element is not <img>, the real target of onload callback is temporary image
                if (element["__ionxLazyLoadTmpImg"]) {
                    eventTarget = element["__ionxLazyLoadTmpImg"];
                    element.style.backgroundImage = "url(" + eventTarget.src + ")";
                    delete element["__ionxLazyLoadTmpImg"];
                }
                element.lazyLoadError = false;
                if (_this._options) {
                    if (_this._options.callbackLoad) {
                        _this._options.callbackLoad(element);
                    }
                    element.classList.remove(_this._options.classLoading);
                    element.classList.add(_this._options.classLoaded);
                }
                eventTarget.removeEventListener("load", loadCallback);
                eventTarget.removeEventListener("error", errorCallback);
            };
            if (this._options) {
                element.classList.add(this._options.classLoading);
            }
            if (element.tagName.toUpperCase() === "IMG" || element.tagName.toUpperCase() === "IFRAME") {
                element.addEventListener("load", loadCallback);
                element.addEventListener("error", errorCallback);
            }
            else if (element.tagName.toUpperCase() === "VIDEO") {
                element.addEventListener("loadedmetadata", loadCallback);
                element.addEventListener("error", errorCallback);
            }
            else {
                var tmpImg = new Image();
                tmpImg.addEventListener("load", loadCallback);
                tmpImg.addEventListener("error", errorCallback);
                element["__ionxLazyLoadTmpImg"] = tmpImg;
            }
            if (this._options) {
                setSources(element, this._options.dataSrcSet, this._options.dataSrc);
                if (this._options.callbackSet) {
                    this._options.callbackSet(element);
                }
            }
        };
        Loader.prototype._loopThroughElements = function () {
            return __awaiter(this, void 0, void 0, function () {
                var elements, shownCount, i, element, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            elements = (this._elements || []).slice();
                            shownCount = 0;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < elements.length)) return [3 /*break*/, 6];
                            element = elements[i];
                            if (element.lazyLoadProcessed) {
                                return [3 /*break*/, 5];
                            }
                            _a.label = 2;
                        case 2:
                            if (!(element.offsetParent === null && this._options.waitInvisible !== false)) return [3 /*break*/, 4];
                            return [4 /*yield*/, core.sleep(100)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 2];
                        case 4:
                            if (element.lazyLoadProcessed) {
                                return [3 /*break*/, 5];
                            }
                            if (this._options.skipInvisible !== false && (element.offsetParent === null || element.offsetHeight === 0 || element.offsetWidth === 0)) {
                                return [3 /*break*/, 5];
                            }
                            if (_isInsideViewport(element, this._options.container, this._options.threshold)) {
                                this._showOnAppear(element);
                                shownCount++;
                                element.lazyLoadProcessed = true;
                            }
                            _a.label = 5;
                        case 5:
                            i++;
                            return [3 /*break*/, 1];
                        case 6:
                            for (i = (this._elements || []).length - 1; i >= 0; i--) {
                                if (this._elements[i].lazyLoadProcessed) {
                                    this._elements.splice(i, 1);
                                }
                            }
                            if (this._options.callbackProcessed && shownCount > 0) {
                                this._options.callbackProcessed(shownCount);
                            }
                            /* Stop listening to scroll event when 0 elements remains */
                            if (!this._elements || this._elements.length === 0) {
                                this._stopScrollHandler();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        ;
        Loader.prototype._purgeElements = function () {
            var elementsToPurge = [];
            for (var i = 0; i < this._elements.length; i++) {
                var element = this._elements[i];
                /* If the element has already been processed, skip it */
                if (element.lazyLoadProcessed) {
                    elementsToPurge.push(i);
                }
            }
            /* Removing elements to purge from this._elements. */
            while (elementsToPurge.length > 0) {
                this._elements.splice(elementsToPurge.pop(), 1);
            }
        };
        ;
        Loader.prototype._startScrollHandler = function () {
            if (!this._isHandlingScroll) {
                this._isHandlingScroll = true;
                this._options.container.addEventListener("scroll", this._handleScrollFn);
                if (this._options.scroll) {
                    this._options.scroll.addEventListener("scroll", this._handleScrollFn);
                }
            }
        };
        ;
        Loader.prototype._stopScrollHandler = function () {
            if (this._isHandlingScroll) {
                this._isHandlingScroll = false;
                this._options.container.removeEventListener("scroll", this._handleScrollFn);
                if (this._options.scroll) {
                    this._options.scroll.removeEventListener("scroll", this._handleScrollFn);
                }
            }
        };
        ;
        Loader.prototype.handleScroll = function () {
            var remainingTime, now, throttle;
            // IE8 fix for destroy() malfunctioning
            if (!this._options) {
                return;
            }
            now = _now();
            throttle = this._options.throttle;
            if (throttle !== 0) {
                remainingTime = throttle - (now - this._previousLoopTime);
                if (remainingTime <= 0 || remainingTime > throttle) {
                    if (this._loopTimeout) {
                        clearTimeout(this._loopTimeout);
                        this._loopTimeout = null;
                    }
                    this._previousLoopTime = now;
                    this._loopThroughElements();
                }
                else if (!this._loopTimeout) {
                    this._loopTimeout = setTimeout(_bind(function () {
                        this._previousLoopTime = _now();
                        this._loopTimeout = null;
                        this._loopThroughElements();
                    }, this), remainingTime);
                }
            }
            else {
                this._loopThroughElements();
            }
        };
        ;
        Loader.prototype.update = function (options) {
            var e_1, _a;
            this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._options.selector));
            if (options && options.retryError) {
                try {
                    for (var _b = __values(this._elements), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var element = _c.value;
                        if (element.lazyLoadProcessed && element.lazyLoadError) {
                            element.lazyLoadProcessed = false;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            this._purgeElements();
            this._loopThroughElements();
            this._startScrollHandler();
        };
        Loader.prototype.destroy = function () {
            window.removeEventListener("resize", this._handleScrollFn);
            if (this._loopTimeout) {
                clearTimeout(this._loopTimeout);
                this._loopTimeout = null;
            }
            this._stopScrollHandler();
            this._elements = null;
            this._queryOriginNode = null;
            this._options = null;
            delete instances[this.id];
        };
        return Loader;
    }());
    function ensureLazyLoad(root, options) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceId, loader, container, parent;
            return __generator(this, function (_a) {
                for (instanceId in instances) {
                    loader = instances[instanceId];
                    container = loader.container;
                    if (root === container) {
                        loader.update({ retryError: options && options.retryError });
                    }
                    else {
                        parent = container.parentElement;
                        while (parent && parent !== root) {
                            parent = parent.parentElement;
                        }
                        if (parent) {
                            loader.update({ retryError: options && options.retryError });
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    }

    var LazyLoadContainer = /** @class */ (function () {
        function LazyLoadContainer(element) {
            this.element = element;
        }
        LazyLoadContainer.prototype.revalidate = function () {
            if (this.loader) {
                this.loader.update();
                var rect = this.element.nativeElement.getBoundingClientRect();
                if (rect.width == 0 || rect.height == 0) {
                    //setTimeout(() => this.revalidate(), 200);
                }
                //console.log(this.children);
                //window.dispatchEvent(new Event("resize"));
            }
        };
        LazyLoadContainer.prototype.ngOnInit = function () {
            this.init();
        };
        LazyLoadContainer.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.children.changes.subscribe(function () { return _this.revalidate(); });
            if (this.children.length > 0) {
                this.revalidate();
            }
        };
        LazyLoadContainer.prototype.ngOnDestroy = function () {
            if (this.loader) {
                this.loader.destroy();
            }
        };
        LazyLoadContainer.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var options, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = Object.assign({
                                selector: ".ionx-lazy-load",
                                container: this.element.nativeElement
                            }, this.options);
                            if (!(this.element.nativeElement.tagName.toLowerCase() === "ion-content")) return [3 /*break*/, 5];
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 40)) return [3 /*break*/, 5];
                            options.scroll = this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".inner-scroll");
                            if (!!options.scroll) return [3 /*break*/, 3];
                            return [4 /*yield*/, core.sleep(50)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5:
                            this.loader = new Loader(options);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return LazyLoadContainer;
    }());
    LazyLoadContainer.decorators = [
        { type: core$1.Directive, args: [{
                    selector: "[ionx-lazy-load-container]"
                },] }
    ];
    LazyLoadContainer.ctorParameters = function () { return [
        { type: core$1.ElementRef }
    ]; };
    LazyLoadContainer.propDecorators = {
        options: [{ type: core$1.Input, args: ["ionx-lazy-load-container",] }],
        children: [{ type: core$1.ContentChildren, args: [core$1.forwardRef(function () { return LazyDirectives; }), { descendants: true },] }]
    };
    var LazyDirectives = /** @class */ (function () {
        function LazyDirectives(element, renderer, container) {
            this.element = element;
            this.renderer = renderer;
            this.container = container;
        }
        Object.defineProperty(LazyDirectives.prototype, "src", {
            set: function (value) {
                this._src = value;
                this.reset();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LazyDirectives.prototype, "alternate", {
            set: function (value) {
                this._alternate = value;
                this.reset();
            },
            enumerable: false,
            configurable: true
        });
        LazyDirectives.prototype.reset = function () {
            if (this._src) {
                this.renderer.addClass(this.element.nativeElement, "ionx-lazy-load");
                this.renderer.setAttribute(this.element.nativeElement, "data-original", this._src);
            }
            if (this._alternate) {
                this.renderer.setAttribute(this.element.nativeElement, "data-alternate", this._alternate);
            }
        };
        LazyDirectives.prototype.revalidate = function () {
            if (this.container && this.children.length > 0) {
                this.container.revalidate();
            }
        };
        LazyDirectives.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.children.changes.subscribe(function () { return _this.revalidate(); });
            this.revalidate();
        };
        return LazyDirectives;
    }());
    LazyDirectives.decorators = [
        { type: core$1.Directive, args: [{
                    selector: "[ionx-lazy-load]"
                },] }
    ];
    LazyDirectives.ctorParameters = function () { return [
        { type: core$1.ElementRef },
        { type: core$1.Renderer2 },
        { type: LazyLoadContainer, decorators: [{ type: core$1.Optional }, { type: core$1.Inject, args: [core$1.forwardRef(function () { return LazyLoadContainer; }),] }] }
    ]; };
    LazyDirectives.propDecorators = {
        children: [{ type: core$1.ContentChildren, args: [LazyDirectives, { descendants: true },] }],
        src: [{ type: core$1.Input, args: ["ionx-lazy-load",] }],
        alternate: [{ type: core$1.Input, args: ["ionx-lazy-load-alternate",] }]
    };

    var LazyLoadModule = /** @class */ (function () {
        function LazyLoadModule() {
        }
        return LazyLoadModule;
    }());
    LazyLoadModule.decorators = [
        { type: core$1.NgModule, args: [{
                    declarations: [LazyDirectives, LazyLoadContainer],
                    exports: [LazyDirectives, LazyLoadContainer]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.LazyDirectives = LazyDirectives;
    exports.LazyLoadContainer = LazyLoadContainer;
    exports.LazyLoadModule = LazyLoadModule;
    exports.ensureLazyLoad = ensureLazyLoad;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=lazy-load-module.umd.js.map
