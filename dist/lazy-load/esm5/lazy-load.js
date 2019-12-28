import { __awaiter, __generator, __values } from "tslib";
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
        var elementsLength = (!this._elements) ? 0 : this._elements.length;
        var processedIndexes = [];
        for (var i = 0; i < elementsLength; i++) {
            var element = this._elements[i];
            /* If must skip_invisible and element is invisible, skip it */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1sb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxJQUFNLGNBQWMsR0FBb0I7SUFDcEMsUUFBUSxFQUFFLEtBQUs7SUFDZixTQUFTLEVBQUUsTUFBTTtJQUNqQixNQUFNLEVBQUUsSUFBSTtJQUNaLFNBQVMsRUFBRSxHQUFHO0lBQ2QsUUFBUSxFQUFFLEdBQUc7SUFDYixPQUFPLEVBQUUsVUFBVTtJQUNuQixVQUFVLEVBQUUsY0FBYztJQUMxQixhQUFhLEVBQUUsV0FBVztJQUMxQixZQUFZLEVBQUUseUJBQXlCO0lBQ3ZDLFdBQVcsRUFBRSx3QkFBd0I7SUFDckMsYUFBYSxFQUFFLElBQUk7SUFDbkIsWUFBWSxFQUFFLElBQUk7SUFDbEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsV0FBVyxFQUFFLElBQUk7SUFDakIsaUJBQWlCLEVBQUUsSUFBSTtDQUMxQixDQUFDO0FBRUYsU0FBUyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVM7SUFFcEQsSUFBSSxhQUFhLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQztJQUU3QyxTQUFTLGlCQUFpQjtRQUN0QixPQUFPLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFRCxTQUFTLGtCQUFrQjtRQUN2QixPQUFPLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCxTQUFTLGFBQWEsQ0FBQyxPQUFPO1FBQzFCLE9BQU8sT0FBTyxDQUFDLHFCQUFxQixFQUFFLENB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WSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUwsYUFBQztBQUFELENBQUMsQUE5UUQsSUE4UUM7O0FBRUQsTUFBTSxVQUFnQixjQUFjLENBQUMsSUFBaUIsRUFBRSxPQUFnQzs7OztZQUVwRixLQUFTLFVBQVUsSUFBSSxTQUFTLEVBQUU7Z0JBQzFCLE1BQU0sR0FBVyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUVqQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7b0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxVQUFVLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO2lCQUM5RDtxQkFBTTtvQkFFQyxXQUFTLFNBQVMsQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLE9BQU8sUUFBTSxJQUFJLFFBQU0sS0FBSyxJQUFJLEVBQUU7d0JBQzlCLFFBQU0sR0FBRyxRQUFNLENBQUMsYUFBYSxDQUFDO3FCQUNqQztvQkFFRCxJQUFJLFFBQU0sRUFBRTt3QkFDUixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztxQkFDOUQ7aUJBQ0o7YUFDSjs7OztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMYXp5TG9hZE9wdGlvbnN9IGZyb20gXCIuL2xhenktbG9hZC1vcHRpb25zXCI7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBMYXp5TG9hZE9wdGlvbnMgPSB7XG4gICAgc2VsZWN0b3I6IFwiaW1nXCIsXG4gICAgY29udGFpbmVyOiB3aW5kb3csXG4gICAgc2Nyb2xsOiBudWxsLFxuICAgIHRocmVzaG9sZDogMzAwLFxuICAgIHRocm90dGxlOiAxNTAsXG4gICAgZGF0YVNyYzogXCJvcmlnaW5hbFwiLFxuICAgIGRhdGFTcmNTZXQ6IFwib3JpZ2luYWwtc2V0XCIsXG4gICAgZGF0YUFsdGVybmF0ZTogXCJhbHRlcm5hdGVcIixcbiAgICBjbGFzc0xvYWRpbmc6IFwiaW9ueC1sYXp5LWltYWdlLWxvYWRpbmdcIixcbiAgICBjbGFzc0xvYWRlZDogXCJpb254LWxhenktaW1hZ2UtbG9hZGVkXCIsXG4gICAgc2tpcEludmlzaWJsZTogdHJ1ZSxcbiAgICBjYWxsYmFja0xvYWQ6IG51bGwsXG4gICAgY2FsbGJhY2tFcnJvcjogbnVsbCxcbiAgICBjYWxsYmFja1NldDogbnVsbCxcbiAgICBjYWxsYmFja1Byb2Nlc3NlZDogbnVsbFxufTtcblxuZnVuY3Rpb24gX2lzSW5zaWRlVmlld3BvcnQoZWxlbWVudCwgY29udGFpbmVyLCB0aHJlc2hvbGQpIHtcblxuICAgIHZhciBvd25lckRvY3VtZW50LCBkb2N1bWVudFRvcCwgZG9jdW1lbnRMZWZ0O1xuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCB8fCAob3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IHx8IChvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9nZXRUb3BPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudFRvcCAtIG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0TGVmdE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudExlZnQgLSBvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0JlbG93Vmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0RG9jdW1lbnRIZWlnaHQoKSArIGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKSArIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldFRvcE9mZnNldChlbGVtZW50KSAtIHRocmVzaG9sZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNBdFJpZ2h0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXREb2N1bWVudFdpZHRoKCkgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldExlZnRPZmZzZXQoY29udGFpbmVyKSArIF9nZXREb2N1bWVudFdpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldExlZnRPZmZzZXQoZWxlbWVudCkgLSB0aHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQWJvdmVWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA+PSBfZ2V0VG9wT2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50TGVmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0TGVmdE9mZnNldChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkID49IF9nZXRMZWZ0T2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB9XG5cbiAgICBvd25lckRvY3VtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgIGRvY3VtZW50VG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgZG9jdW1lbnRMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgcmV0dXJuICFfaXNCZWxvd1ZpZXdwb3J0KCkgJiYgIV9pc0Fib3ZlVmlld3BvcnQoKSAmJiAhX2lzQXRSaWdodE9mVmlld3BvcnQoKSAmJiAhX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpO1xufVxuXG5mdW5jdGlvbiBfbm93KCkge1xuICAgIHZhciBkID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gZC5nZXRUaW1lKCk7XG59XG5cblxuZnVuY3Rpb24gX2NvbnZlcnRUb0FycmF5KG5vZGVTZXQpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZVNldCk7XG59XG5cbmZ1bmN0aW9uIHNldFNvdXJjZXNGb3JQaWN0dXJlKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUpIHtcblxuICAgIGxldCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudC50YWdOYW1lICE9PSAnUElDVFVSRScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBwaWN0dXJlQ2hpbGQgPSBwYXJlbnQuY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChwaWN0dXJlQ2hpbGQudGFnTmFtZSA9PT0gJ1NPVVJDRScpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2VTcmNzZXQgPSBwaWN0dXJlQ2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VTcmNzZXQpIHtcbiAgICAgICAgICAgICAgICBwaWN0dXJlQ2hpbGQuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFNldHMgc291cmNlcyAoZS5nLiBzcmMpIGZvciBsYXp5IGxvYWQgZWxlbWVudC5cbiAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQsIHdob3NlIGltYWdlIHRvIGJlIGxvYWRlZC5cbiAqIEBwYXJhbSBzcmNzZXREYXRhQXR0cmlidXRlIFxuICogQHBhcmFtIHNyY0RhdGFBdHRyaWJ1dGUgXG4gKi9cbmZ1bmN0aW9uIHNldFNvdXJjZXMoZWxlbWVudCwgc3Jjc2V0RGF0YUF0dHJpYnV0ZSwgc3JjRGF0YUF0dHJpYnV0ZSkge1xuXG4gICAgbGV0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgICBsZXQgZWxlbWVudFNyYyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHNyY0RhdGFBdHRyaWJ1dGUpO1xuICAgIFxuICAgIGlmICh0YWdOYW1lID09PSBcIklGUkFNRVwiIHx8IHRhZ05hbWUgPT09IFwiVklERU9cIikge1xuICAgICAgICBcbiAgICAgICAgaWYgKGVsZW1lbnRTcmMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIGVsZW1lbnRTcmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgIGlmICh0YWdOYW1lID09PSBcIklNR1wiKSB7XG4gICAgICAgICAgICBzZXRTb3VyY2VzRm9yUGljdHVyZShlbGVtZW50LCBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhVGFyZ2V0ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXSkge1xuICAgICAgICAgICAgZGF0YVRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbWdTcmNTZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgaWYgKGltZ1NyY1NldCkge1xuICAgICAgICAgICAgZGF0YVRhcmdldC5zZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIiwgaW1nU3JjU2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50U3JjKSB7XG4gICAgICAgICAgICBkYXRhVGFyZ2V0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBlbGVtZW50U3JjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9pZiAoZWxlbWVudFNyYykgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGVsZW1lbnRTcmMgKyBcIilcIjtcbn1cblxuZnVuY3Rpb24gX2JpbmQoZm4sIG9iaikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxudmFyIGluc3RhbmNlQ291bnRlciA9IDA7XG52YXIgaW5zdGFuY2VzOiB7W2luc3RhbmNlSWQ6IHN0cmluZ106IExvYWRlcn0gPSB7fTtcblxuXG5leHBvcnQgY2xhc3MgTG9hZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBMYXp5TG9hZE9wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLmlkID0gKCsraW5zdGFuY2VDb3VudGVyKSArIFwiXCI7XG4gICAgICAgIGluc3RhbmNlc1t0aGlzLmlkXSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcXVlcnlPcmlnaW5Ob2RlID0gdGhpcy5fb3B0aW9ucy5jb250YWluZXIgPT09IHdpbmRvdyA/IGRvY3VtZW50IDogPEhUTUxFbGVtZW50fERvY3VtZW50PnRoaXMuX29wdGlvbnMuY29udGFpbmVyO1xuXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlU2Nyb2xsRm4gPSBfYmluZCh0aGlzLmhhbmRsZVNjcm9sbCwgdGhpcyk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaWQ6IHN0cmluZztcblxuICAgIHByaXZhdGUgX29wdGlvbnM6IExhenlMb2FkT3B0aW9ucztcblxuICAgIHByaXZhdGUgX3F1ZXJ5T3JpZ2luTm9kZTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudDtcblxuICAgIHByaXZhdGUgX3ByZXZpb3VzTG9vcFRpbWU6IG51bWJlcjtcblxuICAgIHByaXZhdGUgX2xvb3BUaW1lb3V0OiBhbnk7XG5cbiAgICBwcml2YXRlIF9oYW5kbGVTY3JvbGxGbjogYW55O1xuXG4gICAgcHJpdmF0ZSBfZWxlbWVudHM6IEFycmF5PEhUTUxFbGVtZW50ICYgRXh0ZW5kZWRIdG1sRWxlbWVudD47XG5cblxuICAgIGdldCBjb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeU9yaWdpbk5vZGU7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF9zaG93T25BcHBlYXIoZWxlbWVudDogSFRNTEVsZW1lbnQgJiBFeHRlbmRlZEh0bWxFbGVtZW50KSB7XG5cbiAgICAgICAgbGV0IGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBldmVudFRhcmdldCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGFsdGVybmF0ZSA9IHRoaXMuX29wdGlvbnMgJiYgdGhpcy5fb3B0aW9ucy5kYXRhQWx0ZXJuYXRlICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHRoaXMuX29wdGlvbnMuZGF0YUFsdGVybmF0ZSk7XG4gICAgICAgICAgICBpZiAoYWx0ZXJuYXRlICYmIGV2ZW50VGFyZ2V0W1wic3JjXCJdICE9IGFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0W1wic3JjXCJdID0gYWx0ZXJuYXRlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcblxuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcblxuICAgICAgICAgICAgZWxlbWVudC5sYXp5TG9hZEVycm9yID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRpbmcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2FsbGJhY2tFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrRXJyb3IuY2FsbGJhY2tfZXJyb3IoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvYWRDYWxsYmFjayA9ICgpID0+IHtcblxuICAgICAgICAgICAgLyogQXMgdGhpcyBtZXRob2QgaXMgYXN5bmNocm9ub3VzLCBpdCBtdXN0IGJlIHByb3RlY3RlZCBhZ2FpbnN0IGV4dGVybmFsIGRlc3Ryb3koKSBjYWxscyAqL1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMgPT09IG51bGwgfHwgdGhpcy5fb3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgZXZlbnRUYXJnZXQ6IGFueSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGlmIHRhcmdldCBlbGVtZW50IGlzIG5vdCA8aW1nPiwgdGhlIHJlYWwgdGFyZ2V0IG9mIG9ubG9hZCBjYWxsYmFjayBpcyB0ZW1wb3JhcnkgaW1hZ2VcbiAgICAgICAgICAgIGlmIChlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtldmVudFRhcmdldC5zcmN9KWA7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudC5sYXp5TG9hZEVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2FsbGJhY2tMb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tMb2FkKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGluZyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiSU1HXCIgfHwgZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiSUZSQU1FXCIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIlZJREVPXCIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0bXBJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRtcEltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgdG1wSW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgICAgIGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXSA9IHRtcEltZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICBzZXRTb3VyY2VzKGVsZW1lbnQsIHRoaXMuX29wdGlvbnMuZGF0YVNyY1NldCwgdGhpcy5fb3B0aW9ucy5kYXRhU3JjKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2FsbGJhY2tTZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrU2V0KGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9vcFRocm91Z2hFbGVtZW50cygpIHtcblxuICAgICAgICBsZXQgZWxlbWVudHNMZW5ndGggPSAoIXRoaXMuX2VsZW1lbnRzKSA/IDAgOiB0aGlzLl9lbGVtZW50cy5sZW5ndGg7XG4gICAgICAgIGxldCBwcm9jZXNzZWRJbmRleGVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50c0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRzW2ldO1xuXG4gICAgICAgICAgICAvKiBJZiBtdXN0IHNraXBfaW52aXNpYmxlIGFuZCBlbGVtZW50IGlzIGludmlzaWJsZSwgc2tpcCBpdCAqL1xuICAgICAgICAgICAgLy8gaWYgKHRoaXMuX29wdGlvbnMuc2tpcEludmlzaWJsZSAmJiAoZWxlbWVudC5vZmZzZXRQYXJlbnQgPT09IG51bGwpKSB7XG4gICAgICAgICAgICAvLyAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIGlmIChfaXNJbnNpZGVWaWV3cG9ydChlbGVtZW50LCB0aGlzLl9vcHRpb25zLmNvbnRhaW5lciwgdGhpcy5fb3B0aW9ucy50aHJlc2hvbGQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd09uQXBwZWFyKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgLyogTWFya2luZyB0aGUgZWxlbWVudCBhcyBwcm9jZXNzZWQuICovXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogUmVtb3ZpbmcgcHJvY2Vzc2VkIGVsZW1lbnRzIGZyb20gdGhpcy5fZWxlbWVudHMuICovXG4gICAgICAgIHdoaWxlIChwcm9jZXNzZWRJbmRleGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRzLnNwbGljZShwcm9jZXNzZWRJbmRleGVzLnBvcCgpLCAxKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2FsbGJhY2tQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrUHJvY2Vzc2VkKHRoaXMuX2VsZW1lbnRzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTdG9wIGxpc3RlbmluZyB0byBzY3JvbGwgZXZlbnQgd2hlbiAwIGVsZW1lbnRzIHJlbWFpbnMgKi9cbiAgICAgICAgaWYgKGVsZW1lbnRzTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9wU2Nyb2xsSGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX3B1cmdlRWxlbWVudHMoKSB7XG4gICAgICAgIGxldCBlbGVtZW50c1RvUHVyZ2UgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2VsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRzW2ldO1xuXG4gICAgICAgICAgICAvKiBJZiB0aGUgZWxlbWVudCBoYXMgYWxyZWFkeSBiZWVuIHByb2Nlc3NlZCwgc2tpcCBpdCAqL1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1RvUHVyZ2UucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFJlbW92aW5nIGVsZW1lbnRzIHRvIHB1cmdlIGZyb20gdGhpcy5fZWxlbWVudHMuICovXG4gICAgICAgIHdoaWxlIChlbGVtZW50c1RvUHVyZ2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudHMuc3BsaWNlKGVsZW1lbnRzVG9QdXJnZS5wb3AoKSwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfaXNIYW5kbGluZ1Njcm9sbDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgX3N0YXJ0U2Nyb2xsSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zY3JvbGwuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfc3RvcFNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0hhbmRsaW5nU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2Nyb2xsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgcHVibGljIGhhbmRsZVNjcm9sbCgpIHtcbiAgICAgICAgdmFyIHJlbWFpbmluZ1RpbWUsXG4gICAgICAgICAgICBub3csXG4gICAgICAgICAgICB0aHJvdHRsZTtcblxuICAgICAgICAvLyBJRTggZml4IGZvciBkZXN0cm95KCkgbWFsZnVuY3Rpb25pbmdcbiAgICAgICAgaWYgKCF0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBub3cgPSBfbm93KCk7XG4gICAgICAgIHRocm90dGxlID0gdGhpcy5fb3B0aW9ucy50aHJvdHRsZTtcblxuICAgICAgICBpZiAodGhyb3R0bGUgIT09IDApIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1RpbWUgPSB0aHJvdHRsZSAtIChub3cgLSB0aGlzLl9wcmV2aW91c0xvb3BUaW1lKTtcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmdUaW1lIDw9IDAgfHwgcmVtYWluaW5nVGltZSA+IHRocm90dGxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvb3BUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNMb29wVGltZSA9IG5vdztcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9sb29wVGltZW91dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gc2V0VGltZW91dChfYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUgPSBfbm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpLCByZW1haW5pbmdUaW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwdWJsaWMgdXBkYXRlKG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW59KSB7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudHMgPSBfY29udmVydFRvQXJyYXkodGhpcy5fcXVlcnlPcmlnaW5Ob2RlLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fb3B0aW9ucy5zZWxlY3RvcikpO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3IpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdGhpcy5fZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCAmJiBlbGVtZW50LmxhenlMb2FkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3B1cmdlRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICB0aGlzLl9zdGFydFNjcm9sbEhhbmRsZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICBpZiAodGhpcy5fbG9vcFRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9sb29wVGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLl9xdWVyeU9yaWdpbk5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGRlbGV0ZSBpbnN0YW5jZXNbdGhpcy5pZF07XG4gICAgfVxuXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbnN1cmVMYXp5TG9hZChyb290OiBIVE1MRWxlbWVudCwgb3B0aW9ucz86IHtyZXRyeUVycm9yPzogYm9vbGVhbn0pIHtcblxuICAgIGZvciAobGV0IGluc3RhbmNlSWQgaW4gaW5zdGFuY2VzKSB7XG4gICAgICAgIGxldCBsb2FkZXI6IExvYWRlciA9IGluc3RhbmNlc1tpbnN0YW5jZUlkXTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGxvYWRlci5jb250YWluZXI7XG5cbiAgICAgICAgaWYgKHJvb3QgPT09IGNvbnRhaW5lcikge1xuICAgICAgICAgICAgbG9hZGVyLnVwZGF0ZSh7cmV0cnlFcnJvcjogb3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3J9KTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IHJvb3QpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgIGxvYWRlci51cGRhdGUoe3JldHJ5RXJyb3I6IG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuaW50ZXJmYWNlIEV4dGVuZGVkSHRtbEVsZW1lbnQge1xuICAgIGxhenlMb2FkUHJvY2Vzc2VkPzogYm9vbGVhbjtcbiAgICBsYXp5TG9hZEVycm9yPzogYm9vbGVhbjtcbn1cbiJdfQ==