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
                        return [4 /*yield*/, sleep(100)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1sb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFHOUMsSUFBTSxjQUFjLEdBQW9CO0lBQ3BDLFFBQVEsRUFBRSxLQUFLO0lBQ2YsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLElBQUk7SUFDWixTQUFTLEVBQUUsR0FBRztJQUNkLFFBQVEsRUFBRSxHQUFHO0lBQ2IsT0FBTyxFQUFFLFVBQVU7SUFDbkIsVUFBVSxFQUFFLGNBQWM7SUFDMUIsYUFBYSxFQUFFLFdBQVc7SUFDMUIsWUFBWSxFQUFFLHlCQUF5QjtJQUN2QyxXQUFXLEVBQUUsd0JBQXdCO0lBQ3JDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLElBQUk7Q0FDMUIsQ0FBQztBQUVGLFNBQVMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTO0lBRXBELElBQUksYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7SUFFN0MsU0FBUyxpQkFBaUI7UUFDdEIsT0FBTyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsU0FBUyxrQkFBa0I7UUFDdkIsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsU0FBUyxhQUFhLENB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Z0JBQ3ZDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUVqQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7b0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxVQUFVLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO2lCQUM5RDtxQkFBTTtvQkFFQyxXQUFTLFNBQVMsQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLE9BQU8sUUFBTSxJQUFJLFFBQU0sS0FBSyxJQUFJLEVBQUU7d0JBQzlCLFFBQU0sR0FBRyxRQUFNLENBQUMsYUFBYSxDQUFDO3FCQUNqQztvQkFFRCxJQUFJLFFBQU0sRUFBRTt3QkFDUixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztxQkFDOUQ7aUJBQ0o7YUFDSjs7OztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtzbGVlcH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge0xhenlMb2FkT3B0aW9uc30gZnJvbSBcIi4vbGF6eS1sb2FkLW9wdGlvbnNcIjtcblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IExhenlMb2FkT3B0aW9ucyA9IHtcbiAgICBzZWxlY3RvcjogXCJpbWdcIixcbiAgICBjb250YWluZXI6IHdpbmRvdyxcbiAgICBzY3JvbGw6IG51bGwsXG4gICAgdGhyZXNob2xkOiAzMDAsXG4gICAgdGhyb3R0bGU6IDE1MCxcbiAgICBkYXRhU3JjOiBcIm9yaWdpbmFsXCIsXG4gICAgZGF0YVNyY1NldDogXCJvcmlnaW5hbC1zZXRcIixcbiAgICBkYXRhQWx0ZXJuYXRlOiBcImFsdGVybmF0ZVwiLFxuICAgIGNsYXNzTG9hZGluZzogXCJpb254LWxhenktaW1hZ2UtbG9hZGluZ1wiLFxuICAgIGNsYXNzTG9hZGVkOiBcImlvbngtbGF6eS1pbWFnZS1sb2FkZWRcIixcbiAgICBza2lwSW52aXNpYmxlOiB0cnVlLFxuICAgIGNhbGxiYWNrTG9hZDogbnVsbCxcbiAgICBjYWxsYmFja0Vycm9yOiBudWxsLFxuICAgIGNhbGxiYWNrU2V0OiBudWxsLFxuICAgIGNhbGxiYWNrUHJvY2Vzc2VkOiBudWxsXG59O1xuXG5mdW5jdGlvbiBfaXNJbnNpZGVWaWV3cG9ydChlbGVtZW50LCBjb250YWluZXIsIHRocmVzaG9sZCkge1xuXG4gICAgbGV0IG93bmVyRG9jdW1lbnQsIGRvY3VtZW50VG9wLCBkb2N1bWVudExlZnQ7XG5cbiAgICBmdW5jdGlvbiBfZ2V0RG9jdW1lbnRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIHx8IChvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0RG9jdW1lbnRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgKG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldFRvcE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGRvY3VtZW50VG9wIC0gb3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9nZXRMZWZ0T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIGRvY3VtZW50TGVmdCAtIG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudExlZnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQmVsb3dWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXREb2N1bWVudEhlaWdodCgpICsgZG9jdW1lbnRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldFRvcE9mZnNldChjb250YWluZXIpICsgY29udGFpbmVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA8PSBfZ2V0VG9wT2Zmc2V0KGVsZW1lbnQpIC0gdGhyZXNob2xkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0F0UmlnaHRPZlZpZXdwb3J0KCkge1xuICAgICAgICB2YXIgZm9sZDtcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldERvY3VtZW50V2lkdGgoKSArIHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0TGVmdE9mZnNldChjb250YWluZXIpICsgX2dldERvY3VtZW50V2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA8PSBfZ2V0TGVmdE9mZnNldChlbGVtZW50KSAtIHRocmVzaG9sZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNBYm92ZVZpZXdwb3J0KCkge1xuICAgICAgICB2YXIgZm9sZDtcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gZG9jdW1lbnRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldFRvcE9mZnNldChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkID49IF9nZXRUb3BPZmZzZXQoZWxlbWVudCkgKyB0aHJlc2hvbGQgKyBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNBdExlZnRPZlZpZXdwb3J0KCkge1xuICAgICAgICB2YXIgZm9sZDtcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gZG9jdW1lbnRMZWZ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRMZWZ0T2Zmc2V0KGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPj0gX2dldExlZnRPZmZzZXQoZWxlbWVudCkgKyB0aHJlc2hvbGQgKyBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIG93bmVyRG9jdW1lbnQgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgZG9jdW1lbnRUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgb3duZXJEb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICBkb2N1bWVudExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgb3duZXJEb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICByZXR1cm4gIV9pc0JlbG93Vmlld3BvcnQoKSAmJiAhX2lzQWJvdmVWaWV3cG9ydCgpICYmICFfaXNBdFJpZ2h0T2ZWaWV3cG9ydCgpICYmICFfaXNBdExlZnRPZlZpZXdwb3J0KCk7XG59XG5cbmZ1bmN0aW9uIF9ub3coKSB7XG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBkLmdldFRpbWUoKTtcbn1cblxuXG5mdW5jdGlvbiBfY29udmVydFRvQXJyYXkobm9kZVNldCkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlU2V0KTtcbn1cblxuZnVuY3Rpb24gc2V0U291cmNlc0ZvclBpY3R1cmUoZWxlbWVudCwgc3Jjc2V0RGF0YUF0dHJpYnV0ZSkge1xuXG4gICAgbGV0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBpZiAocGFyZW50LnRhZ05hbWUgIT09ICdQSUNUVVJFJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHBpY3R1cmVDaGlsZCA9IHBhcmVudC5jaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKHBpY3R1cmVDaGlsZC50YWdOYW1lID09PSAnU09VUkNFJykge1xuICAgICAgICAgICAgbGV0IHNvdXJjZVNyY3NldCA9IHBpY3R1cmVDaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIHNyY3NldERhdGFBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZVNyY3NldCkge1xuICAgICAgICAgICAgICAgIHBpY3R1cmVDaGlsZC5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNvdXJjZVNyY3NldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogU2V0cyBzb3VyY2VzIChlLmcuIHNyYykgZm9yIGxhenkgbG9hZCBlbGVtZW50LlxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCwgd2hvc2UgaW1hZ2UgdG8gYmUgbG9hZGVkLlxuICogQHBhcmFtIHNyY3NldERhdGFBdHRyaWJ1dGVcbiAqIEBwYXJhbSBzcmNEYXRhQXR0cmlidXRlXG4gKi9cbmZ1bmN0aW9uIHNldFNvdXJjZXMoZWxlbWVudCwgc3Jjc2V0RGF0YUF0dHJpYnV0ZSwgc3JjRGF0YUF0dHJpYnV0ZSkge1xuXG4gICAgbGV0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgICBsZXQgZWxlbWVudFNyYyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHNyY0RhdGFBdHRyaWJ1dGUpO1xuXG4gICAgaWYgKHRhZ05hbWUgPT09IFwiSUZSQU1FXCIgfHwgdGFnTmFtZSA9PT0gXCJWSURFT1wiKSB7XG5cbiAgICAgICAgaWYgKGVsZW1lbnRTcmMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIGVsZW1lbnRTcmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBpZiAodGFnTmFtZSA9PT0gXCJJTUdcIikge1xuICAgICAgICAgICAgc2V0U291cmNlc0ZvclBpY3R1cmUoZWxlbWVudCwgc3Jjc2V0RGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YVRhcmdldCA9IGVsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgIGRhdGFUYXJnZXQgPSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW1nU3JjU2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgc3Jjc2V0RGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgIGlmIChpbWdTcmNTZXQpIHtcbiAgICAgICAgICAgIGRhdGFUYXJnZXQuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsIGltZ1NyY1NldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudFNyYykge1xuICAgICAgICAgICAgZGF0YVRhcmdldC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudFNyYyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vaWYgKGVsZW1lbnRTcmMpIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyBlbGVtZW50U3JjICsgXCIpXCI7XG59XG5cbmZ1bmN0aW9uIF9iaW5kKGZuLCBvYmopIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbnZhciBpbnN0YW5jZUNvdW50ZXIgPSAwO1xudmFyIGluc3RhbmNlczoge1tpbnN0YW5jZUlkOiBzdHJpbmddOiBMb2FkZXJ9ID0ge307XG5cblxuZXhwb3J0IGNsYXNzIExvYWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTGF6eUxvYWRPcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5pZCA9ICgrK2luc3RhbmNlQ291bnRlcikgKyBcIlwiO1xuICAgICAgICBpbnN0YW5jZXNbdGhpcy5pZF0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZSA9IHRoaXMuX29wdGlvbnMuY29udGFpbmVyID09PSB3aW5kb3cgPyBkb2N1bWVudCA6IDxIVE1MRWxlbWVudHxEb2N1bWVudD50aGlzLl9vcHRpb25zLmNvbnRhaW5lcjtcblxuICAgICAgICB0aGlzLl9wcmV2aW91c0xvb3BUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVNjcm9sbEZuID0gX2JpbmQodGhpcy5oYW5kbGVTY3JvbGwsIHRoaXMpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlkOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9vcHRpb25zOiBMYXp5TG9hZE9wdGlvbnM7XG5cbiAgICBwcml2YXRlIF9xdWVyeU9yaWdpbk5vZGU6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnQ7XG5cbiAgICBwcml2YXRlIF9wcmV2aW91c0xvb3BUaW1lOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIF9sb29wVGltZW91dDogYW55O1xuXG4gICAgcHJpdmF0ZSBfaGFuZGxlU2Nyb2xsRm46IGFueTtcblxuICAgIHByaXZhdGUgX2VsZW1lbnRzOiBBcnJheTxIVE1MRWxlbWVudCAmIEV4dGVuZGVkSHRtbEVsZW1lbnQ+O1xuXG5cbiAgICBnZXQgY29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnlPcmlnaW5Ob2RlO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfc2hvd09uQXBwZWFyKGVsZW1lbnQ6IEhUTUxFbGVtZW50ICYgRXh0ZW5kZWRIdG1sRWxlbWVudCkge1xuXG4gICAgICAgIGxldCBlcnJvckNhbGxiYWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXQgPSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBhbHRlcm5hdGUgPSB0aGlzLl9vcHRpb25zICYmIHRoaXMuX29wdGlvbnMuZGF0YUFsdGVybmF0ZSAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyB0aGlzLl9vcHRpb25zLmRhdGFBbHRlcm5hdGUpO1xuICAgICAgICAgICAgaWYgKGFsdGVybmF0ZSAmJiBldmVudFRhcmdldFtcInNyY1wiXSAhPSBhbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldFtcInNyY1wiXSA9IGFsdGVybmF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG5cbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRFcnJvciA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja0Vycm9yLmNhbGxiYWNrX2Vycm9yKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2FkQ2FsbGJhY2sgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8qIEFzIHRoaXMgbWV0aG9kIGlzIGFzeW5jaHJvbm91cywgaXQgbXVzdCBiZSBwcm90ZWN0ZWQgYWdhaW5zdCBleHRlcm5hbCBkZXN0cm95KCkgY2FsbHMgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zID09PSBudWxsIHx8IHRoaXMuX29wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGV2ZW50VGFyZ2V0OiBhbnkgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICAvLyBpZiB0YXJnZXQgZWxlbWVudCBpcyBub3QgPGltZz4sIHRoZSByZWFsIHRhcmdldCBvZiBvbmxvYWQgY2FsbGJhY2sgaXMgdGVtcG9yYXJ5IGltYWdlXG4gICAgICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXQgPSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZXZlbnRUYXJnZXQuc3JjfSlgO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrTG9hZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrTG9hZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRpbmcpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIklNR1wiIHx8IGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIklGUkFNRVwiKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJWSURFT1wiKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG1wSW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0bXBJbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIHRtcEltZy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgICAgICBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl0gPSB0bXBJbWc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgc2V0U291cmNlcyhlbGVtZW50LCB0aGlzLl9vcHRpb25zLmRhdGFTcmNTZXQsIHRoaXMuX29wdGlvbnMuZGF0YVNyYyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrU2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja1NldChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX2xvb3BUaHJvdWdoRWxlbWVudHMoKSB7XG5cbiAgICAgICAgbGV0IGVsZW1lbnRzID0gKHRoaXMuX2VsZW1lbnRzIHx8IFtdKS5zbGljZSgpO1xuICAgICAgICBsZXQgc2hvd25Db3VudCA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKGVsZW1lbnQub2Zmc2V0UGFyZW50ID09PSBudWxsICYmIHRoaXMuX29wdGlvbnMud2FpdEludmlzaWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzbGVlcCgxMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5za2lwSW52aXNpYmxlICE9PSBmYWxzZSAmJiAoZWxlbWVudC5vZmZzZXRQYXJlbnQgPT09IG51bGwgfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQgPT09IDAgfHwgZWxlbWVudC5vZmZzZXRXaWR0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF9pc0luc2lkZVZpZXdwb3J0KGVsZW1lbnQsIHRoaXMuX29wdGlvbnMuY29udGFpbmVyLCB0aGlzLl9vcHRpb25zLnRocmVzaG9sZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93T25BcHBlYXIoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgc2hvd25Db3VudCsrO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9ICh0aGlzLl9lbGVtZW50cyB8fCBbXSkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbGVtZW50c1tpXS5sYXp5TG9hZFByb2Nlc3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrUHJvY2Vzc2VkICYmIHNob3duQ291bnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrUHJvY2Vzc2VkKHNob3duQ291bnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU3RvcCBsaXN0ZW5pbmcgdG8gc2Nyb2xsIGV2ZW50IHdoZW4gMCBlbGVtZW50cyByZW1haW5zICovXG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudHMgfHwgdGhpcy5fZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9wU2Nyb2xsSGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX3B1cmdlRWxlbWVudHMoKSB7XG4gICAgICAgIGxldCBlbGVtZW50c1RvUHVyZ2UgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRzW2ldO1xuXG4gICAgICAgICAgICAvKiBJZiB0aGUgZWxlbWVudCBoYXMgYWxyZWFkeSBiZWVuIHByb2Nlc3NlZCwgc2tpcCBpdCAqL1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1RvUHVyZ2UucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFJlbW92aW5nIGVsZW1lbnRzIHRvIHB1cmdlIGZyb20gdGhpcy5fZWxlbWVudHMuICovXG4gICAgICAgIHdoaWxlIChlbGVtZW50c1RvUHVyZ2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudHMuc3BsaWNlKGVsZW1lbnRzVG9QdXJnZS5wb3AoKSwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfaXNIYW5kbGluZ1Njcm9sbDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgX3N0YXJ0U2Nyb2xsSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zY3JvbGwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfc3RvcFNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2Nyb2xsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgcHVibGljIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAgICAgdmFyIHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICBub3csXG4gICAgICAgICAgICB0aHJvdHRsZTtcblxuICAgICAgICAvLyBJRTggZml4IGZvciBkZXN0cm95KCkgbWFsZnVuY3Rpb25pbmdcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBub3cgPSBfbm93KCk7XG4gICAgICAgIHRocm90dGxlID0gdGhpcy5fb3B0aW9ucy50aHJvdHRsZTtcblxuICAgICAgICBpZiAodGhyb3R0bGUgIT09IDApIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1RpbWUgPSB0aHJvdHRsZSAtIChub3cgLSB0aGlzLl9wcmV2aW91c0xvb3BUaW1lKTtcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmdUaW1lIDw9IDAgfHwgcmVtYWluaW5nVGltZSA+IHRocm90dGxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvb3BUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNMb29wVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9sb29wVGltZW91dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gc2V0VGltZW91dChfYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUgPSBfbm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpLCByZW1haW5pbmdUaW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwdWJsaWMgdXBkYXRlKG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW59KSB7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudHMgPSBfY29udmVydFRvQXJyYXkodGhpcy5fcXVlcnlPcmlnaW5Ob2RlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fb3B0aW9ucy5zZWxlY3RvcikpO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3IpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdGhpcy5fZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCAmJiBlbGVtZW50LmxhenlMb2FkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3B1cmdlRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICB0aGlzLl9zdGFydFNjcm9sbEhhbmRsZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICBpZiAodGhpcy5fbG9vcFRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9xdWVyeU9yaWdpbk5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gbnVsbDtcblxuICAgICAgICBkZWxldGUgaW5zdGFuY2VzW3RoaXMuaWRdO1xuICAgIH1cblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlTGF6eUxvYWQocm9vdDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW59KSB7XG5cbiAgICBmb3IgKGxldCBpbnN0YW5jZUlkIGluIGluc3RhbmNlcykge1xuICAgICAgICBsZXQgbG9hZGVyOiBMb2FkZXIgPSBpbnN0YW5jZXNbaW5zdGFuY2VJZF07XG4gICAgICAgIGxldCBjb250YWluZXIgPSBsb2FkZXIuY29udGFpbmVyO1xuXG4gICAgICAgIGlmIChyb290ID09PSBjb250YWluZXIpIHtcbiAgICAgICAgICAgIGxvYWRlci51cGRhdGUoe3JldHJ5RXJyb3I6IG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSBjb250YWluZXIucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50ICE9PSByb290KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBsb2FkZXIudXBkYXRlKHtyZXRyeUVycm9yOiBvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmludGVyZmFjZSBFeHRlbmRlZEh0bWxFbGVtZW50IHtcbiAgICBsYXp5TG9hZFByb2Nlc3NlZD86IGJvb2xlYW47XG4gICAgbGF6eUxvYWRFcnJvcj86IGJvb2xlYW47XG59XG4iXX0=