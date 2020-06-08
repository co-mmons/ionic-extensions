import { __awaiter, __generator, __values } from "tslib";
import { sleep } from "@co.mmons/js-utils/core";
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
        enumerable: true,
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
            var elementsLength, processedIndexes, i, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elementsLength = (!this._elements) ? 0 : this._elements.length;
                        processedIndexes = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < elementsLength)) return [3 /*break*/, 6];
                        element = this._elements[i];
                        _a.label = 2;
                    case 2:
                        if (!(element.offsetParent === null && this._options.waitInvisible !== false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, sleep(100)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4:
                        if (this._options.skipInvisible !== false && (element.offsetParent === null || element.offsetHeight === 0 || element.offsetWidth === 0)) {
                            return [3 /*break*/, 5];
                        }
                        if (_isInsideViewport(element, this._options.container, this._options.threshold)) {
                            this._showOnAppear(element);
                            /* Marking the element as processed. */
                            processedIndexes.push(i);
                            element.lazyLoadProcessed = true;
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
                        /* Removing processed elements from this._elements. */
                        while (processedIndexes.length > 0) {
                            this._elements.splice(processedIndexes.pop(), 1);
                            if (this._options.callbackProcessed) {
                                this._options.callbackProcessed(this._elements.length);
                            }
                        }
                        /* Stop listening to scroll event when 0 elements remains */
                        if (elementsLength === 0) {
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
export { Loader };
export function ensureLazyLoad(root, options) {
    return __awaiter(this, void 0, void 0, function () {
        var instanceId, loader, container, parent_1;
        return __generator(this, function (_a) {
            for (instanceId in instances) {
                loader = instances[instanceId];
                container = loader.container;
                if (root === container) {
                    loader.update({ retryError: options && options.retryError });
                }
                else {
                    parent_1 = container.parentElement;
                    while (parent_1 && parent_1 !== root) {
                        parent_1 = parent_1.parentElement;
                    }
                    if (parent_1) {
                        loader.update({ retryError: options && options.retryError });
                    }
                }
            }
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1sb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFHOUMsSUFBTSxjQUFjLEdBQW9CO0lBQ3BDLFFBQVEsRUFBRSxLQUFLO0lBQ2YsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLElBQUk7SUFDWixTQUFTLEVBQUUsR0FBRztJQUNkLFFBQVEsRUFBRSxHQUFHO0lBQ2IsT0FBTyxFQUFFLFVBQVU7SUFDbkIsVUFBVSxFQUFFLGNBQWM7SUFDMUIsYUFBYSxFQUFFLFdBQVc7SUFDMUIsWUFBWSxFQUFFLHlCQUF5QjtJQUN2QyxXQUFXLEVBQUUsd0JBQXdCO0lBQ3JDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLElBQUk7Q0FDMUIsQ0FBQztBQUVGLFNBQVMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTO0lBRXBELElBQUksYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7SUFFN0MsU0FBUyxpQkFBaUI7UUFDdEIsT0FBTyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsU0FBUyxrQkFBa0I7UUFDdkIsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsU0FBUyxhQUFhLENB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QUFTLENBQUMsYUFBYSxDQUFDO29CQUNyQyxPQUFPLFFBQU0sSUFBSSxRQUFNLEtBQUssSUFBSSxFQUFFO3dCQUM5QixRQUFNLEdBQUcsUUFBTSxDQUFDLGFBQWEsQ0FBQztxQkFDakM7b0JBRUQsSUFBSSxRQUFNLEVBQUU7d0JBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7cUJBQzlEO2lCQUNKO2FBQ0o7Ozs7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtMYXp5TG9hZE9wdGlvbnN9IGZyb20gXCIuL2xhenktbG9hZC1vcHRpb25zXCI7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBMYXp5TG9hZE9wdGlvbnMgPSB7XG4gICAgc2VsZWN0b3I6IFwiaW1nXCIsXG4gICAgY29udGFpbmVyOiB3aW5kb3csXG4gICAgc2Nyb2xsOiBudWxsLFxuICAgIHRocmVzaG9sZDogMzAwLFxuICAgIHRocm90dGxlOiAxNTAsXG4gICAgZGF0YVNyYzogXCJvcmlnaW5hbFwiLFxuICAgIGRhdGFTcmNTZXQ6IFwib3JpZ2luYWwtc2V0XCIsXG4gICAgZGF0YUFsdGVybmF0ZTogXCJhbHRlcm5hdGVcIixcbiAgICBjbGFzc0xvYWRpbmc6IFwiaW9ueC1sYXp5LWltYWdlLWxvYWRpbmdcIixcbiAgICBjbGFzc0xvYWRlZDogXCJpb254LWxhenktaW1hZ2UtbG9hZGVkXCIsXG4gICAgc2tpcEludmlzaWJsZTogdHJ1ZSxcbiAgICBjYWxsYmFja0xvYWQ6IG51bGwsXG4gICAgY2FsbGJhY2tFcnJvcjogbnVsbCxcbiAgICBjYWxsYmFja1NldDogbnVsbCxcbiAgICBjYWxsYmFja1Byb2Nlc3NlZDogbnVsbFxufTtcblxuZnVuY3Rpb24gX2lzSW5zaWRlVmlld3BvcnQoZWxlbWVudCwgY29udGFpbmVyLCB0aHJlc2hvbGQpIHtcblxuICAgIGxldCBvd25lckRvY3VtZW50LCBkb2N1bWVudFRvcCwgZG9jdW1lbnRMZWZ0O1xuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCB8fCAob3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IHx8IChvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9nZXRUb3BPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudFRvcCAtIG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0TGVmdE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudExlZnQgLSBvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0JlbG93Vmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0RG9jdW1lbnRIZWlnaHQoKSArIGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKSArIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldFRvcE9mZnNldChlbGVtZW50KSAtIHRocmVzaG9sZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNBdFJpZ2h0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXREb2N1bWVudFdpZHRoKCkgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldExlZnRPZmZzZXQoY29udGFpbmVyKSArIF9nZXREb2N1bWVudFdpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldExlZnRPZmZzZXQoZWxlbWVudCkgLSB0aHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQWJvdmVWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA+PSBfZ2V0VG9wT2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50TGVmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0TGVmdE9mZnNldChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkID49IF9nZXRMZWZ0T2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB9XG5cbiAgICBvd25lckRvY3VtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgIGRvY3VtZW50VG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgZG9jdW1lbnRMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgcmV0dXJuICFfaXNCZWxvd1ZpZXdwb3J0KCkgJiYgIV9pc0Fib3ZlVmlld3BvcnQoKSAmJiAhX2lzQXRSaWdodE9mVmlld3BvcnQoKSAmJiAhX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpO1xufVxuXG5mdW5jdGlvbiBfbm93KCkge1xuICAgIHZhciBkID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gZC5nZXRUaW1lKCk7XG59XG5cblxuZnVuY3Rpb24gX2NvbnZlcnRUb0FycmF5KG5vZGVTZXQpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZVNldCk7XG59XG5cbmZ1bmN0aW9uIHNldFNvdXJjZXNGb3JQaWN0dXJlKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUpIHtcblxuICAgIGxldCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudC50YWdOYW1lICE9PSAnUElDVFVSRScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBwaWN0dXJlQ2hpbGQgPSBwYXJlbnQuY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChwaWN0dXJlQ2hpbGQudGFnTmFtZSA9PT0gJ1NPVVJDRScpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2VTcmNzZXQgPSBwaWN0dXJlQ2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VTcmNzZXQpIHtcbiAgICAgICAgICAgICAgICBwaWN0dXJlQ2hpbGQuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFNldHMgc291cmNlcyAoZS5nLiBzcmMpIGZvciBsYXp5IGxvYWQgZWxlbWVudC5cbiAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQsIHdob3NlIGltYWdlIHRvIGJlIGxvYWRlZC5cbiAqIEBwYXJhbSBzcmNzZXREYXRhQXR0cmlidXRlXG4gKiBAcGFyYW0gc3JjRGF0YUF0dHJpYnV0ZVxuICovXG5mdW5jdGlvbiBzZXRTb3VyY2VzKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUsIHNyY0RhdGFBdHRyaWJ1dGUpIHtcblxuICAgIGxldCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgbGV0IGVsZW1lbnRTcmMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBzcmNEYXRhQXR0cmlidXRlKTtcblxuICAgIGlmICh0YWdOYW1lID09PSBcIklGUkFNRVwiIHx8IHRhZ05hbWUgPT09IFwiVklERU9cIikge1xuXG4gICAgICAgIGlmIChlbGVtZW50U3JjKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBlbGVtZW50U3JjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWYgKHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgICAgICAgIHNldFNvdXJjZXNGb3JQaWN0dXJlKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGFUYXJnZXQgPSBlbGVtZW50O1xuICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdKSB7XG4gICAgICAgICAgICBkYXRhVGFyZ2V0ID0gZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGltZ1NyY1NldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHNyY3NldERhdGFBdHRyaWJ1dGUpO1xuICAgICAgICBpZiAoaW1nU3JjU2V0KSB7XG4gICAgICAgICAgICBkYXRhVGFyZ2V0LnNldEF0dHJpYnV0ZShcInNyY3NldFwiLCBpbWdTcmNTZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnRTcmMpIHtcbiAgICAgICAgICAgIGRhdGFUYXJnZXQuc2V0QXR0cmlidXRlKFwic3JjXCIsIGVsZW1lbnRTcmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL2lmIChlbGVtZW50U3JjKSBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiICsgZWxlbWVudFNyYyArIFwiKVwiO1xufVxuXG5mdW5jdGlvbiBfYmluZChmbiwgb2JqKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG9iaiwgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG52YXIgaW5zdGFuY2VDb3VudGVyID0gMDtcbnZhciBpbnN0YW5jZXM6IHtbaW5zdGFuY2VJZDogc3RyaW5nXTogTG9hZGVyfSA9IHt9O1xuXG5cbmV4cG9ydCBjbGFzcyBMb2FkZXIge1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IExhenlMb2FkT3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuaWQgPSAoKytpbnN0YW5jZUNvdW50ZXIpICsgXCJcIjtcbiAgICAgICAgaW5zdGFuY2VzW3RoaXMuaWRdID0gdGhpcztcblxuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9xdWVyeU9yaWdpbk5vZGUgPSB0aGlzLl9vcHRpb25zLmNvbnRhaW5lciA9PT0gd2luZG93ID8gZG9jdW1lbnQgOiA8SFRNTEVsZW1lbnR8RG9jdW1lbnQ+dGhpcy5fb3B0aW9ucy5jb250YWluZXI7XG5cbiAgICAgICAgdGhpcy5fcHJldmlvdXNMb29wVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9oYW5kbGVTY3JvbGxGbiA9IF9iaW5kKHRoaXMuaGFuZGxlU2Nyb2xsLCB0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpZDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogTGF6eUxvYWRPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBfcXVlcnlPcmlnaW5Ob2RlOiBIVE1MRWxlbWVudCB8IERvY3VtZW50O1xuXG4gICAgcHJpdmF0ZSBfcHJldmlvdXNMb29wVGltZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfbG9vcFRpbWVvdXQ6IGFueTtcblxuICAgIHByaXZhdGUgX2hhbmRsZVNjcm9sbEZuOiBhbnk7XG5cbiAgICBwcml2YXRlIF9lbGVtZW50czogQXJyYXk8SFRNTEVsZW1lbnQgJiBFeHRlbmRlZEh0bWxFbGVtZW50PjtcblxuXG4gICAgZ2V0IGNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IERvY3VtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX3Nob3dPbkFwcGVhcihlbGVtZW50OiBIVE1MRWxlbWVudCAmIEV4dGVuZGVkSHRtbEVsZW1lbnQpIHtcblxuICAgICAgICBsZXQgZXJyb3JDYWxsYmFjayA9ICgpID0+IHtcblxuICAgICAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gZWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgYWx0ZXJuYXRlID0gdGhpcy5fb3B0aW9ucyAmJiB0aGlzLl9vcHRpb25zLmRhdGFBbHRlcm5hdGUgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgdGhpcy5fb3B0aW9ucy5kYXRhQWx0ZXJuYXRlKTtcbiAgICAgICAgICAgIGlmIChhbHRlcm5hdGUgJiYgZXZlbnRUYXJnZXRbXCJzcmNcIl0gIT0gYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXRbXCJzcmNcIl0gPSBhbHRlcm5hdGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuXG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkRXJyb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGluZyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tFcnJvci5jYWxsYmFja19lcnJvcihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAvKiBBcyB0aGlzIG1ldGhvZCBpcyBhc3luY2hyb25vdXMsIGl0IG11c3QgYmUgcHJvdGVjdGVkIGFnYWluc3QgZXh0ZXJuYWwgZGVzdHJveSgpIGNhbGxzICovXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucyA9PT0gbnVsbCB8fCB0aGlzLl9vcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBldmVudFRhcmdldDogYW55ID0gZWxlbWVudDtcblxuICAgICAgICAgICAgLy8gaWYgdGFyZ2V0IGVsZW1lbnQgaXMgbm90IDxpbWc+LCB0aGUgcmVhbCB0YXJnZXQgb2Ygb25sb2FkIGNhbGxiYWNrIGlzIHRlbXBvcmFyeSBpbWFnZVxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2V2ZW50VGFyZ2V0LnNyY30pYDtcbiAgICAgICAgICAgICAgICBkZWxldGUgZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja0xvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja0xvYWQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJTUdcIiB8fCBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJRlJBTUVcIikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiVklERU9cIikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRtcEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdG1wSW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICB0bXBJbWcuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdID0gdG1wSW1nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgIHNldFNvdXJjZXMoZWxlbWVudCwgdGhpcy5fb3B0aW9ucy5kYXRhU3JjU2V0LCB0aGlzLl9vcHRpb25zLmRhdGFTcmMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja1NldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tTZXQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9sb29wVGhyb3VnaEVsZW1lbnRzKCkge1xuXG4gICAgICAgIGxldCBlbGVtZW50c0xlbmd0aCA9ICghdGhpcy5fZWxlbWVudHMpID8gMCA6IHRoaXMuX2VsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgbGV0IHByb2Nlc3NlZEluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudHNbaV07XG5cbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50Lm9mZnNldFBhcmVudCA9PT0gbnVsbCAmJiB0aGlzLl9vcHRpb25zLndhaXRJbnZpc2libGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc2tpcEludmlzaWJsZSAhPT0gZmFsc2UgJiYgKGVsZW1lbnQub2Zmc2V0UGFyZW50ID09PSBudWxsIHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ID09PSAwIHx8IGVsZW1lbnQub2Zmc2V0V2lkdGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfaXNJbnNpZGVWaWV3cG9ydChlbGVtZW50LCB0aGlzLl9vcHRpb25zLmNvbnRhaW5lciwgdGhpcy5fb3B0aW9ucy50aHJlc2hvbGQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd09uQXBwZWFyKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgLyogTWFya2luZyB0aGUgZWxlbWVudCBhcyBwcm9jZXNzZWQuICovXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogUmVtb3ZpbmcgcHJvY2Vzc2VkIGVsZW1lbnRzIGZyb20gdGhpcy5fZWxlbWVudHMuICovXG4gICAgICAgIHdoaWxlIChwcm9jZXNzZWRJbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRzLnNwbGljZShwcm9jZXNzZWRJbmRleGVzLnBvcCgpLCAxKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2FsbGJhY2tQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrUHJvY2Vzc2VkKHRoaXMuX2VsZW1lbnRzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTdG9wIGxpc3RlbmluZyB0byBzY3JvbGwgZXZlbnQgd2hlbiAwIGVsZW1lbnRzIHJlbWFpbnMgKi9cbiAgICAgICAgaWYgKGVsZW1lbnRzTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9wU2Nyb2xsSGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX3B1cmdlRWxlbWVudHMoKSB7XG4gICAgICAgIGxldCBlbGVtZW50c1RvUHVyZ2UgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRzW2ldO1xuXG4gICAgICAgICAgICAvKiBJZiB0aGUgZWxlbWVudCBoYXMgYWxyZWFkeSBiZWVuIHByb2Nlc3NlZCwgc2tpcCBpdCAqL1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1RvUHVyZ2UucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFJlbW92aW5nIGVsZW1lbnRzIHRvIHB1cmdlIGZyb20gdGhpcy5fZWxlbWVudHMuICovXG4gICAgICAgIHdoaWxlIChlbGVtZW50c1RvUHVyZ2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudHMuc3BsaWNlKGVsZW1lbnRzVG9QdXJnZS5wb3AoKSwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfaXNIYW5kbGluZ1Njcm9sbDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgX3N0YXJ0U2Nyb2xsSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zY3JvbGwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfc3RvcFNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2Nyb2xsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgcHVibGljIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAgICAgdmFyIHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICBub3csXG4gICAgICAgICAgICB0aHJvdHRsZTtcblxuICAgICAgICAvLyBJRTggZml4IGZvciBkZXN0cm95KCkgbWFsZnVuY3Rpb25pbmdcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBub3cgPSBfbm93KCk7XG4gICAgICAgIHRocm90dGxlID0gdGhpcy5fb3B0aW9ucy50aHJvdHRsZTtcblxuICAgICAgICBpZiAodGhyb3R0bGUgIT09IDApIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1RpbWUgPSB0aHJvdHRsZSAtIChub3cgLSB0aGlzLl9wcmV2aW91c0xvb3BUaW1lKTtcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmdUaW1lIDw9IDAgfHwgcmVtYWluaW5nVGltZSA+IHRocm90dGxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvb3BUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNMb29wVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9sb29wVGltZW91dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gc2V0VGltZW91dChfYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUgPSBfbm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpLCByZW1haW5pbmdUaW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwdWJsaWMgdXBkYXRlKG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW59KSB7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudHMgPSBfY29udmVydFRvQXJyYXkodGhpcy5fcXVlcnlPcmlnaW5Ob2RlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fb3B0aW9ucy5zZWxlY3RvcikpO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3IpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdGhpcy5fZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCAmJiBlbGVtZW50LmxhenlMb2FkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3B1cmdlRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICB0aGlzLl9zdGFydFNjcm9sbEhhbmRsZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICBpZiAodGhpcy5fbG9vcFRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9xdWVyeU9yaWdpbk5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gbnVsbDtcblxuICAgICAgICBkZWxldGUgaW5zdGFuY2VzW3RoaXMuaWRdO1xuICAgIH1cblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlTGF6eUxvYWQocm9vdDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW59KSB7XG5cbiAgICBmb3IgKGxldCBpbnN0YW5jZUlkIGluIGluc3RhbmNlcykge1xuICAgICAgICBsZXQgbG9hZGVyOiBMb2FkZXIgPSBpbnN0YW5jZXNbaW5zdGFuY2VJZF07XG4gICAgICAgIGxldCBjb250YWluZXIgPSBsb2FkZXIuY29udGFpbmVyO1xuXG4gICAgICAgIGlmIChyb290ID09PSBjb250YWluZXIpIHtcbiAgICAgICAgICAgIGxvYWRlci51cGRhdGUoe3JldHJ5RXJyb3I6IG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSBjb250YWluZXIucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50ICE9PSByb290KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBsb2FkZXIudXBkYXRlKHtyZXRyeUVycm9yOiBvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmludGVyZmFjZSBFeHRlbmRlZEh0bWxFbGVtZW50IHtcbiAgICBsYXp5TG9hZFByb2Nlc3NlZD86IGJvb2xlYW47XG4gICAgbGF6eUxvYWRFcnJvcj86IGJvb2xlYW47XG59XG4iXX0=