import * as tslib_1 from "tslib";
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
    if (tagName === "IFRAME") {
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
        if (element["__ionxLazyImageTmpImg"]) {
            dataTarget = element["__ionxLazyImageTmpImg"];
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
var LazyLoad = /** @class */ (function () {
    function LazyLoad(options) {
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
    Object.defineProperty(LazyLoad.prototype, "container", {
        get: function () {
            return this._queryOriginNode;
        },
        enumerable: true,
        configurable: true
    });
    LazyLoad.prototype._showOnAppear = function (element) {
        var _this = this;
        var errorCallback = function () {
            var eventTarget = element;
            if (element["__ionxLazyImageTmpImg"]) {
                eventTarget = element["__ionxLazyImageTmpImg"];
            }
            var alternate = _this._options && _this._options.dataAlternate && element.getAttribute("data-" + _this._options.dataAlternate);
            if (alternate && eventTarget["src"] != alternate) {
                eventTarget["src"] = alternate;
                return;
            }
            delete element["__ionxLazyImageTmpImg"];
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
            if (element["__ionxLazyImageTmpImg"]) {
                eventTarget = element["__ionxLazyImageTmpImg"];
                element.style.backgroundImage = "url(" + eventTarget.src + ")";
                delete element["__ionxLazyImageTmpImg"];
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
        else {
            var tmpImg = new Image();
            tmpImg.addEventListener("load", loadCallback);
            tmpImg.addEventListener("error", errorCallback);
            element["__ionxLazyImageTmpImg"] = tmpImg;
        }
        if (this._options) {
            setSources(element, this._options.dataSrcSet, this._options.dataSrc);
            if (this._options.callbackSet) {
                this._options.callbackSet(element);
            }
        }
    };
    LazyLoad.prototype._loopThroughElements = function () {
        var elementsLength = (!this._elements) ? 0 : this._elements.length;
        var processedIndexes = [];
        for (var i = 0; i < elementsLength; i++) {
            var element = this._elements[i];
            // /* If must skip_invisible and element is invisible, skip it */
            // if (this._options.skipInvisible && (element.offsetParent === null)) {
            //     continue;
            // }
            if (_isInsideViewport(element, this._options.container, this._options.threshold)) {
                this._showOnAppear(element);
                /* Marking the element as processed. */
                processedIndexes.push(i);
                element.lazyLoadProcessed = true;
            }
        }
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
    };
    ;
    LazyLoad.prototype._purgeElements = function () {
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
    LazyLoad.prototype._startScrollHandler = function () {
        if (!this._isHandlingScroll) {
            this._isHandlingScroll = true;
            this._options.container.addEventListener("scroll", this._handleScrollFn);
            if (this._options.scroll) {
                this._options.scroll.addEventListener("scroll", this._handleScrollFn);
            }
        }
    };
    ;
    LazyLoad.prototype._stopScrollHandler = function () {
        if (this._isHandlingScroll) {
            this._isHandlingScroll = false;
            this._options.container.removeEventListener("scroll", this._handleScrollFn);
            if (this._options.scroll) {
                this._options.scroll.removeEventListener("scroll", this._handleScrollFn);
            }
        }
    };
    ;
    LazyLoad.prototype.handleScroll = function () {
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
    LazyLoad.prototype.update = function (options) {
        var e_1, _a;
        this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._options.selector));
        if (options && options.retryError) {
            try {
                for (var _b = tslib_1.__values(this._elements), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    LazyLoad.prototype.destroy = function () {
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
    return LazyLoad;
}());
export { LazyLoad };
export function ensureLazyImagesLoaded(root, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var instanceId, loader, container, parent_1;
        return tslib_1.__generator(this, function (_a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1pbWFnZS8iLCJzb3VyY2VzIjpbImxhenktbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBTSxjQUFjLEdBQW9CO0lBQ3BDLFFBQVEsRUFBRSxLQUFLO0lBQ2YsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLElBQUk7SUFDWixTQUFTLEVBQUUsR0FBRztJQUNkLFFBQVEsRUFBRSxHQUFHO0lBQ2IsT0FBTyxFQUFFLFVBQVU7SUFDbkIsVUFBVSxFQUFFLGNBQWM7SUFDMUIsYUFBYSxFQUFFLFdBQVc7SUFDMUIsWUFBWSxFQUFFLHlCQUF5QjtJQUN2QyxXQUFXLEVBQUUsd0JBQXdCO0lBQ3JDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLElBQUk7Q0FDMUIsQ0FBQztBQUVGLFNBQVMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTO0lBRXBELElBQUksYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7SUFFN0MsU0FBUyxpQkFBaUI7UUFDdEIsT0FBTyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsU0FBUyxrQkFBa0I7UUFDdkIsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsU0FBUyxhQUFhLENBQUMsT0FBTztRQUMxQixPQUFPLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxD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QUFJLENBQUM7UUFFckIsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTCxlQUFDO0FBQUQsQ0FBQyxBQTNRRCxJQTJRQzs7QUFFRCxNQUFNLFVBQWdCLHNCQUFzQixDQUFDLElBQWlCLEVBQUUsT0FBZ0M7Ozs7WUFFNUYsS0FBUyxVQUFVLElBQUksU0FBUyxFQUFFO2dCQUMxQixNQUFNLEdBQWEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN6QyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFFakMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO29CQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztpQkFDOUQ7cUJBQU07b0JBRUMsV0FBUyxTQUFTLENBQUMsYUFBYSxDQUFDO29CQUNyQyxPQUFPLFFBQU0sSUFBSSxRQUFNLEtBQUssSUFBSSxFQUFFO3dCQUM5QixRQUFNLEdBQUcsUUFBTSxDQUFDLGFBQWEsQ0FBQztxQkFDakM7b0JBRUQsSUFBSSxRQUFNLEVBQUU7d0JBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7cUJBQzlEO2lCQUNKO2FBQ0o7Ozs7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExhenlMb2FkT3B0aW9ucyB9IGZyb20gXCIuL2xhenktbG9hZC1vcHRpb25zXCI7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBMYXp5TG9hZE9wdGlvbnMgPSB7XG4gICAgc2VsZWN0b3I6IFwiaW1nXCIsXG4gICAgY29udGFpbmVyOiB3aW5kb3csXG4gICAgc2Nyb2xsOiBudWxsLFxuICAgIHRocmVzaG9sZDogMzAwLFxuICAgIHRocm90dGxlOiAxNTAsXG4gICAgZGF0YVNyYzogXCJvcmlnaW5hbFwiLFxuICAgIGRhdGFTcmNTZXQ6IFwib3JpZ2luYWwtc2V0XCIsXG4gICAgZGF0YUFsdGVybmF0ZTogXCJhbHRlcm5hdGVcIixcbiAgICBjbGFzc0xvYWRpbmc6IFwiaW9ueC1sYXp5LWltYWdlLWxvYWRpbmdcIixcbiAgICBjbGFzc0xvYWRlZDogXCJpb254LWxhenktaW1hZ2UtbG9hZGVkXCIsXG4gICAgc2tpcEludmlzaWJsZTogdHJ1ZSxcbiAgICBjYWxsYmFja0xvYWQ6IG51bGwsXG4gICAgY2FsbGJhY2tFcnJvcjogbnVsbCxcbiAgICBjYWxsYmFja1NldDogbnVsbCxcbiAgICBjYWxsYmFja1Byb2Nlc3NlZDogbnVsbFxufTtcblxuZnVuY3Rpb24gX2lzSW5zaWRlVmlld3BvcnQoZWxlbWVudCwgY29udGFpbmVyLCB0aHJlc2hvbGQpIHtcblxuICAgIHZhciBvd25lckRvY3VtZW50LCBkb2N1bWVudFRvcCwgZG9jdW1lbnRMZWZ0O1xuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCB8fCAob3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IHx8IChvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9nZXRUb3BPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudFRvcCAtIG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0TGVmdE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudExlZnQgLSBvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0JlbG93Vmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0RG9jdW1lbnRIZWlnaHQoKSArIGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKSArIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldFRvcE9mZnNldChlbGVtZW50KSAtIHRocmVzaG9sZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNBdFJpZ2h0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXREb2N1bWVudFdpZHRoKCkgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldExlZnRPZmZzZXQoY29udGFpbmVyKSArIF9nZXREb2N1bWVudFdpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldExlZnRPZmZzZXQoZWxlbWVudCkgLSB0aHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQWJvdmVWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA+PSBfZ2V0VG9wT2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50TGVmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0TGVmdE9mZnNldChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkID49IF9nZXRMZWZ0T2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB9XG5cbiAgICBvd25lckRvY3VtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgIGRvY3VtZW50VG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgZG9jdW1lbnRMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgcmV0dXJuICFfaXNCZWxvd1ZpZXdwb3J0KCkgJiYgIV9pc0Fib3ZlVmlld3BvcnQoKSAmJiAhX2lzQXRSaWdodE9mVmlld3BvcnQoKSAmJiAhX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpO1xufVxuXG5mdW5jdGlvbiBfbm93KCkge1xuICAgIHZhciBkID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gZC5nZXRUaW1lKCk7XG59XG5cblxuZnVuY3Rpb24gX2NvbnZlcnRUb0FycmF5KG5vZGVTZXQpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZVNldCk7XG59XG5cbmZ1bmN0aW9uIHNldFNvdXJjZXNGb3JQaWN0dXJlKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUpIHtcblxuICAgIGxldCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudC50YWdOYW1lICE9PSAnUElDVFVSRScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBwaWN0dXJlQ2hpbGQgPSBwYXJlbnQuY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChwaWN0dXJlQ2hpbGQudGFnTmFtZSA9PT0gJ1NPVVJDRScpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2VTcmNzZXQgPSBwaWN0dXJlQ2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VTcmNzZXQpIHtcbiAgICAgICAgICAgICAgICBwaWN0dXJlQ2hpbGQuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFNldHMgc291cmNlcyAoZS5nLiBzcmMpIGZvciBsYXp5IGxvYWQgZWxlbWVudC5cbiAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQsIHdob3NlIGltYWdlIHRvIGJlIGxvYWRlZC5cbiAqIEBwYXJhbSBzcmNzZXREYXRhQXR0cmlidXRlIFxuICogQHBhcmFtIHNyY0RhdGFBdHRyaWJ1dGUgXG4gKi9cbmZ1bmN0aW9uIHNldFNvdXJjZXMoZWxlbWVudCwgc3Jjc2V0RGF0YUF0dHJpYnV0ZSwgc3JjRGF0YUF0dHJpYnV0ZSkge1xuXG4gICAgbGV0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgICBsZXQgZWxlbWVudFNyYyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHNyY0RhdGFBdHRyaWJ1dGUpO1xuICAgIFxuICAgIGlmICh0YWdOYW1lID09PSBcIklGUkFNRVwiKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAoZWxlbWVudFNyYykge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudFNyYyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgICAgICAgIHNldFNvdXJjZXNGb3JQaWN0dXJlKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGFUYXJnZXQgPSBlbGVtZW50O1xuICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlJbWFnZVRtcEltZ1wiXSkge1xuICAgICAgICAgICAgZGF0YVRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW1nU3JjU2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgc3Jjc2V0RGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgIGlmIChpbWdTcmNTZXQpIHtcbiAgICAgICAgICAgIGRhdGFUYXJnZXQuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsIGltZ1NyY1NldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudFNyYykge1xuICAgICAgICAgICAgZGF0YVRhcmdldC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudFNyYyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vaWYgKGVsZW1lbnRTcmMpIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyBlbGVtZW50U3JjICsgXCIpXCI7XG59XG5cbmZ1bmN0aW9uIF9iaW5kKGZuLCBvYmopIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbnZhciBpbnN0YW5jZUNvdW50ZXIgPSAwO1xudmFyIGluc3RhbmNlczoge1tpbnN0YW5jZUlkOiBzdHJpbmddOiBMYXp5TG9hZH0gPSB7fTtcblxuXG5leHBvcnQgY2xhc3MgTGF6eUxvYWQge1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IExhenlMb2FkT3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuaWQgPSAoKytpbnN0YW5jZUNvdW50ZXIpICsgXCJcIjtcbiAgICAgICAgaW5zdGFuY2VzW3RoaXMuaWRdID0gdGhpcztcblxuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9xdWVyeU9yaWdpbk5vZGUgPSB0aGlzLl9vcHRpb25zLmNvbnRhaW5lciA9PT0gd2luZG93ID8gZG9jdW1lbnQgOiA8SFRNTEVsZW1lbnR8RG9jdW1lbnQ+dGhpcy5fb3B0aW9ucy5jb250YWluZXI7XG5cbiAgICAgICAgdGhpcy5fcHJldmlvdXNMb29wVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9oYW5kbGVTY3JvbGxGbiA9IF9iaW5kKHRoaXMuaGFuZGxlU2Nyb2xsLCB0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpZDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogTGF6eUxvYWRPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBfcXVlcnlPcmlnaW5Ob2RlOiBIVE1MRWxlbWVudCB8IERvY3VtZW50O1xuXG4gICAgcHJpdmF0ZSBfcHJldmlvdXNMb29wVGltZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfbG9vcFRpbWVvdXQ6IGFueTtcblxuICAgIHByaXZhdGUgX2hhbmRsZVNjcm9sbEZuOiBhbnk7XG5cbiAgICBwcml2YXRlIF9lbGVtZW50czogQXJyYXk8SFRNTEVsZW1lbnQgJiBFeHRlbmRlZEh0bWxFbGVtZW50PjtcblxuXG4gICAgZ2V0IGNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IERvY3VtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX3Nob3dPbkFwcGVhcihlbGVtZW50OiBIVE1MRWxlbWVudCAmIEV4dGVuZGVkSHRtbEVsZW1lbnQpIHtcblxuICAgICAgICBsZXQgZXJyb3JDYWxsYmFjayA9ICgpID0+IHtcblxuICAgICAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gZWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBhbHRlcm5hdGUgPSB0aGlzLl9vcHRpb25zICYmIHRoaXMuX29wdGlvbnMuZGF0YUFsdGVybmF0ZSAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyB0aGlzLl9vcHRpb25zLmRhdGFBbHRlcm5hdGUpO1xuICAgICAgICAgICAgaWYgKGFsdGVybmF0ZSAmJiBldmVudFRhcmdldFtcInNyY1wiXSAhPSBhbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldFtcInNyY1wiXSA9IGFsdGVybmF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W1wiX19pb254TGF6eUltYWdlVG1wSW1nXCJdO1xuXG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkRXJyb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGluZyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tFcnJvci5jYWxsYmFja19lcnJvcihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAvKiBBcyB0aGlzIG1ldGhvZCBpcyBhc3luY2hyb25vdXMsIGl0IG11c3QgYmUgcHJvdGVjdGVkIGFnYWluc3QgZXh0ZXJuYWwgZGVzdHJveSgpIGNhbGxzICovXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucyA9PT0gbnVsbCB8fCB0aGlzLl9vcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBldmVudFRhcmdldDogYW55ID0gZWxlbWVudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gaWYgdGFyZ2V0IGVsZW1lbnQgaXMgbm90IDxpbWc+LCB0aGUgcmVhbCB0YXJnZXQgb2Ygb25sb2FkIGNhbGxiYWNrIGlzIHRlbXBvcmFyeSBpbWFnZVxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl07XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZXZlbnRUYXJnZXQuc3JjfSlgO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W1wiX19pb254TGF6eUltYWdlVG1wSW1nXCJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja0xvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja0xvYWQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJTUdcIiB8fCBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJRlJBTUVcIikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG1wSW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0bXBJbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIHRtcEltZy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgICAgICBlbGVtZW50W1wiX19pb254TGF6eUltYWdlVG1wSW1nXCJdID0gdG1wSW1nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgIHNldFNvdXJjZXMoZWxlbWVudCwgdGhpcy5fb3B0aW9ucy5kYXRhU3JjU2V0LCB0aGlzLl9vcHRpb25zLmRhdGFTcmMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja1NldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tTZXQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb29wVGhyb3VnaEVsZW1lbnRzKCkge1xuXG4gICAgICAgIGxldCBlbGVtZW50c0xlbmd0aCA9ICghdGhpcy5fZWxlbWVudHMpID8gMCA6IHRoaXMuX2VsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgbGV0IHByb2Nlc3NlZEluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudHNbaV07XG5cbiAgICAgICAgICAgIC8vIC8qIElmIG11c3Qgc2tpcF9pbnZpc2libGUgYW5kIGVsZW1lbnQgaXMgaW52aXNpYmxlLCBza2lwIGl0ICovXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5fb3B0aW9ucy5za2lwSW52aXNpYmxlICYmIChlbGVtZW50Lm9mZnNldFBhcmVudCA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIC8vICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgaWYgKF9pc0luc2lkZVZpZXdwb3J0KGVsZW1lbnQsIHRoaXMuX29wdGlvbnMuY29udGFpbmVyLCB0aGlzLl9vcHRpb25zLnRocmVzaG9sZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93T25BcHBlYXIoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvKiBNYXJraW5nIHRoZSBlbGVtZW50IGFzIHByb2Nlc3NlZC4gKi9cbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRJbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmluZyBwcm9jZXNzZWQgZWxlbWVudHMgZnJvbSB0aGlzLl9lbGVtZW50cy4gKi9cbiAgICAgICAgd2hpbGUgKHByb2Nlc3NlZEluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudHMuc3BsaWNlKHByb2Nlc3NlZEluZGV4ZXMucG9wKCksIDEpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja1Byb2Nlc3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tQcm9jZXNzZWQodGhpcy5fZWxlbWVudHMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFN0b3AgbGlzdGVuaW5nIHRvIHNjcm9sbCBldmVudCB3aGVuIDAgZWxlbWVudHMgcmVtYWlucyAqL1xuICAgICAgICBpZiAoZWxlbWVudHNMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BTY3JvbGxIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfcHVyZ2VFbGVtZW50cygpIHtcbiAgICAgICAgbGV0IGVsZW1lbnRzVG9QdXJnZSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudHNbaV07XG5cbiAgICAgICAgICAgIC8qIElmIHRoZSBlbGVtZW50IGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkLCBza2lwIGl0ICovXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzVG9QdXJnZS5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogUmVtb3ZpbmcgZWxlbWVudHMgdG8gcHVyZ2UgZnJvbSB0aGlzLl9lbGVtZW50cy4gKi9cbiAgICAgICAgd2hpbGUgKGVsZW1lbnRzVG9QdXJnZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50cy5zcGxpY2UoZWxlbWVudHNUb1B1cmdlLnBvcCgpLCAxKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIF9pc0hhbmRsaW5nU2Nyb2xsOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfc3RhcnRTY3JvbGxIYW5kbGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzSGFuZGxpbmdTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzSGFuZGxpbmdTY3JvbGwgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5zY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNjcm9sbC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIF9zdG9wU2Nyb2xsSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzSGFuZGxpbmdTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzSGFuZGxpbmdTY3JvbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zY3JvbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBwdWJsaWMgaGFuZGxlU2Nyb2xsKCkge1xuICAgICAgICB2YXIgcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgIG5vdyxcbiAgICAgICAgICAgIHRocm90dGxlO1xuXG4gICAgICAgIC8vIElFOCBmaXggZm9yIGRlc3Ryb3koKSBtYWxmdW5jdGlvbmluZ1xuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vdyA9IF9ub3coKTtcbiAgICAgICAgdGhyb3R0bGUgPSB0aGlzLl9vcHRpb25zLnRocm90dGxlO1xuXG4gICAgICAgIGlmICh0aHJvdHRsZSAhPT0gMCkge1xuICAgICAgICAgICAgcmVtYWluaW5nVGltZSA9IHRocm90dGxlIC0gKG5vdyAtIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUpO1xuICAgICAgICAgICAgaWYgKHJlbWFpbmluZ1RpbWUgPD0gMCB8fCByZW1haW5pbmdUaW1lID4gdGhyb3R0bGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9vcFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2xvb3BUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9wcmV2aW91c0xvb3BUaW1lID0gbm93O1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2xvb3BUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBzZXRUaW1lb3V0KF9iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNMb29wVGltZSA9IF9ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyksIHJlbWFpbmluZ1RpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHB1YmxpYyB1cGRhdGUob3B0aW9ucz86IHtyZXRyeUVycm9yPzogYm9vbGVhbn0pIHtcblxuICAgICAgICB0aGlzLl9lbGVtZW50cyA9IF9jb252ZXJ0VG9BcnJheSh0aGlzLl9xdWVyeU9yaWdpbk5vZGUucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9vcHRpb25zLnNlbGVjdG9yKSk7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcikge1xuICAgICAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiB0aGlzLl9lbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkICYmIGVsZW1lbnQubGF6eUxvYWRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcHVyZ2VFbGVtZW50cygpO1xuICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuX3N0YXJ0U2Nyb2xsSGFuZGxlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgIGlmICh0aGlzLl9sb29wVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2xvb3BUaW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9wU2Nyb2xsSGFuZGxlcigpO1xuICAgICAgICB0aGlzLl9lbGVtZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgZGVsZXRlIGluc3RhbmNlc1t0aGlzLmlkXTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZUxhenlJbWFnZXNMb2FkZWQocm9vdDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW59KSB7XG5cbiAgICBmb3IgKGxldCBpbnN0YW5jZUlkIGluIGluc3RhbmNlcykge1xuICAgICAgICBsZXQgbG9hZGVyOiBMYXp5TG9hZCA9IGluc3RhbmNlc1tpbnN0YW5jZUlkXTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGxvYWRlci5jb250YWluZXI7XG5cbiAgICAgICAgaWYgKHJvb3QgPT09IGNvbnRhaW5lcikge1xuICAgICAgICAgICAgbG9hZGVyLnVwZGF0ZSh7cmV0cnlFcnJvcjogb3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3J9KTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IHJvb3QpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgIGxvYWRlci51cGRhdGUoe3JldHJ5RXJyb3I6IG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuaW50ZXJmYWNlIEV4dGVuZGVkSHRtbEVsZW1lbnQge1xuICAgIGxhenlMb2FkUHJvY2Vzc2VkPzogYm9vbGVhbjtcbiAgICBsYXp5TG9hZEVycm9yPzogYm9vbGVhbjtcbn1cbiJdfQ==