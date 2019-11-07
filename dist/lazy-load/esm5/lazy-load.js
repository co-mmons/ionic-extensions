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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1sb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxJQUFNLGNBQWMsR0FBb0I7SUFDcEMsUUFBUSxFQUFFLEtBQUs7SUFDZixTQUFTLEVBQUUsTUFBTTtJQUNqQixNQUFNLEVBQUUsSUFBSTtJQUNaLFNBQVMsRUFBRSxHQUFHO0lBQ2QsUUFBUSxFQUFFLEdBQUc7SUFDYixPQUFPLEVBQUUsVUFBVTtJQUNuQixVQUFVLEVBQUUsY0FBYztJQUMxQixhQUFhLEVBQUUsV0FBVztJQUMxQixZQUFZLEVBQUUseUJBQXlCO0lBQ3ZDLFdBQVcsRUFBRSx3QkFBd0I7SUFDckMsYUFBYSxFQUFFLElBQUk7SUFDbkIsWUFBWSxFQUFFLElBQUk7SUFDbEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsV0FBVyxFQUFFLElBQUk7SUFDakIsaUJBQWlCLEVBQUUsSUFBSTtDQUMxQixDQUFDO0FBRUYsU0FBUyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVM7SUFFcEQsSUFBSSxhQUFhLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQztJQUU3QyxTQUFTLGlCQUFpQjtRQUN0QixPQUFPLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFRCxTQUFTLGtCQUFrQjtRQUN2QixPQUFPLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCxTQUFTLGFBQWEsQ0FBQyxPQUFPO1FBQzFCLE9BQU8sT0FBTyxDQUFDLHFCQUFxQixFQUFFLENB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QVksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQUFDLEFBOVFELElBOFFDOztBQUVELE1BQU0sVUFBZ0IsY0FBYyxDQUFDLElBQWlCLEVBQUUsT0FBZ0M7Ozs7WUFFcEYsS0FBUyxVQUFVLElBQUksU0FBUyxFQUFFO2dCQUMxQixNQUFNLEdBQVcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2QyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFFakMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO29CQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztpQkFDOUQ7cUJBQU07b0JBRUMsV0FBUyxTQUFTLENBQUMsYUFBYSxDQUFDO29CQUNyQyxPQUFPLFFBQU0sSUFBSSxRQUFNLEtBQUssSUFBSSxFQUFFO3dCQUM5QixRQUFNLEdBQUcsUUFBTSxDQUFDLGFBQWEsQ0FBQztxQkFDakM7b0JBRUQsSUFBSSxRQUFNLEVBQUU7d0JBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7cUJBQzlEO2lCQUNKO2FBQ0o7Ozs7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGF6eUxvYWRPcHRpb25zfSBmcm9tIFwiLi9sYXp5LWxvYWQtb3B0aW9uc1wiO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogTGF6eUxvYWRPcHRpb25zID0ge1xuICAgIHNlbGVjdG9yOiBcImltZ1wiLFxuICAgIGNvbnRhaW5lcjogd2luZG93LFxuICAgIHNjcm9sbDogbnVsbCxcbiAgICB0aHJlc2hvbGQ6IDMwMCxcbiAgICB0aHJvdHRsZTogMTUwLFxuICAgIGRhdGFTcmM6IFwib3JpZ2luYWxcIixcbiAgICBkYXRhU3JjU2V0OiBcIm9yaWdpbmFsLXNldFwiLFxuICAgIGRhdGFBbHRlcm5hdGU6IFwiYWx0ZXJuYXRlXCIsXG4gICAgY2xhc3NMb2FkaW5nOiBcImlvbngtbGF6eS1pbWFnZS1sb2FkaW5nXCIsXG4gICAgY2xhc3NMb2FkZWQ6IFwiaW9ueC1sYXp5LWltYWdlLWxvYWRlZFwiLFxuICAgIHNraXBJbnZpc2libGU6IHRydWUsXG4gICAgY2FsbGJhY2tMb2FkOiBudWxsLFxuICAgIGNhbGxiYWNrRXJyb3I6IG51bGwsXG4gICAgY2FsbGJhY2tTZXQ6IG51bGwsXG4gICAgY2FsbGJhY2tQcm9jZXNzZWQ6IG51bGxcbn07XG5cbmZ1bmN0aW9uIF9pc0luc2lkZVZpZXdwb3J0KGVsZW1lbnQsIGNvbnRhaW5lciwgdGhyZXNob2xkKSB7XG5cbiAgICB2YXIgb3duZXJEb2N1bWVudCwgZG9jdW1lbnRUb3AsIGRvY3VtZW50TGVmdDtcblxuICAgIGZ1bmN0aW9uIF9nZXREb2N1bWVudFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggfHwgKG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9nZXREb2N1bWVudEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCAob3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0VG9wT2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZG9jdW1lbnRUb3AgLSBvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRUb3A7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldExlZnRPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZG9jdW1lbnRMZWZ0IC0gb3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNCZWxvd1ZpZXdwb3J0KCkge1xuICAgICAgICB2YXIgZm9sZDtcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldERvY3VtZW50SGVpZ2h0KCkgKyBkb2N1bWVudFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0VG9wT2Zmc2V0KGNvbnRhaW5lcikgKyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkIDw9IF9nZXRUb3BPZmZzZXQoZWxlbWVudCkgLSB0aHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQXRSaWdodE9mVmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0RG9jdW1lbnRXaWR0aCgpICsgd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRMZWZ0T2Zmc2V0KGNvbnRhaW5lcikgKyBfZ2V0RG9jdW1lbnRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkIDw9IF9nZXRMZWZ0T2Zmc2V0KGVsZW1lbnQpIC0gdGhyZXNob2xkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0Fib3ZlVmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBkb2N1bWVudFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0VG9wT2Zmc2V0KGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPj0gX2dldFRvcE9mZnNldChlbGVtZW50KSArIHRocmVzaG9sZCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0F0TGVmdE9mVmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBkb2N1bWVudExlZnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldExlZnRPZmZzZXQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA+PSBfZ2V0TGVmdE9mZnNldChlbGVtZW50KSArIHRocmVzaG9sZCArIGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgfVxuXG4gICAgb3duZXJEb2N1bWVudCA9IGVsZW1lbnQub3duZXJEb2N1bWVudDtcbiAgICBkb2N1bWVudFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBvd25lckRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIGRvY3VtZW50TGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBvd25lckRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcblxuICAgIHJldHVybiAhX2lzQmVsb3dWaWV3cG9ydCgpICYmICFfaXNBYm92ZVZpZXdwb3J0KCkgJiYgIV9pc0F0UmlnaHRPZlZpZXdwb3J0KCkgJiYgIV9pc0F0TGVmdE9mVmlld3BvcnQoKTtcbn1cblxuZnVuY3Rpb24gX25vdygpIHtcbiAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIGQuZ2V0VGltZSgpO1xufVxuXG5cbmZ1bmN0aW9uIF9jb252ZXJ0VG9BcnJheShub2RlU2V0KSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVTZXQpO1xufVxuXG5mdW5jdGlvbiBzZXRTb3VyY2VzRm9yUGljdHVyZShlbGVtZW50LCBzcmNzZXREYXRhQXR0cmlidXRlKSB7XG5cbiAgICBsZXQgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGlmIChwYXJlbnQudGFnTmFtZSAhPT0gJ1BJQ1RVUkUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgcGljdHVyZUNoaWxkID0gcGFyZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAocGljdHVyZUNoaWxkLnRhZ05hbWUgPT09ICdTT1VSQ0UnKSB7XG4gICAgICAgICAgICBsZXQgc291cmNlU3Jjc2V0ID0gcGljdHVyZUNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgc3Jjc2V0RGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgICAgICBpZiAoc291cmNlU3Jjc2V0KSB7XG4gICAgICAgICAgICAgICAgcGljdHVyZUNoaWxkLnNldEF0dHJpYnV0ZSgnc3Jjc2V0Jywgc291cmNlU3Jjc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBTZXRzIHNvdXJjZXMgKGUuZy4gc3JjKSBmb3IgbGF6eSBsb2FkIGVsZW1lbnQuXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50LCB3aG9zZSBpbWFnZSB0byBiZSBsb2FkZWQuXG4gKiBAcGFyYW0gc3Jjc2V0RGF0YUF0dHJpYnV0ZSBcbiAqIEBwYXJhbSBzcmNEYXRhQXR0cmlidXRlIFxuICovXG5mdW5jdGlvbiBzZXRTb3VyY2VzKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUsIHNyY0RhdGFBdHRyaWJ1dGUpIHtcblxuICAgIGxldCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgbGV0IGVsZW1lbnRTcmMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBzcmNEYXRhQXR0cmlidXRlKTtcbiAgICBcbiAgICBpZiAodGFnTmFtZSA9PT0gXCJJRlJBTUVcIiB8fCB0YWdOYW1lID09PSBcIlZJREVPXCIpIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbGVtZW50U3JjKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBlbGVtZW50U3JjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodGFnTmFtZSA9PT0gXCJJTUdcIikge1xuICAgICAgICAgICAgc2V0U291cmNlc0ZvclBpY3R1cmUoZWxlbWVudCwgc3Jjc2V0RGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YVRhcmdldCA9IGVsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgIGRhdGFUYXJnZXQgPSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW1nU3JjU2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgc3Jjc2V0RGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgIGlmIChpbWdTcmNTZXQpIHtcbiAgICAgICAgICAgIGRhdGFUYXJnZXQuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsIGltZ1NyY1NldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudFNyYykge1xuICAgICAgICAgICAgZGF0YVRhcmdldC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudFNyYyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vaWYgKGVsZW1lbnRTcmMpIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyBlbGVtZW50U3JjICsgXCIpXCI7XG59XG5cbmZ1bmN0aW9uIF9iaW5kKGZuLCBvYmopIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbnZhciBpbnN0YW5jZUNvdW50ZXIgPSAwO1xudmFyIGluc3RhbmNlczoge1tpbnN0YW5jZUlkOiBzdHJpbmddOiBMb2FkZXJ9ID0ge307XG5cblxuZXhwb3J0IGNsYXNzIExvYWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTGF6eUxvYWRPcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5pZCA9ICgrK2luc3RhbmNlQ291bnRlcikgKyBcIlwiO1xuICAgICAgICBpbnN0YW5jZXNbdGhpcy5pZF0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZSA9IHRoaXMuX29wdGlvbnMuY29udGFpbmVyID09PSB3aW5kb3cgPyBkb2N1bWVudCA6IDxIVE1MRWxlbWVudHxEb2N1bWVudD50aGlzLl9vcHRpb25zLmNvbnRhaW5lcjtcblxuICAgICAgICB0aGlzLl9wcmV2aW91c0xvb3BUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVNjcm9sbEZuID0gX2JpbmQodGhpcy5oYW5kbGVTY3JvbGwsIHRoaXMpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlkOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9vcHRpb25zOiBMYXp5TG9hZE9wdGlvbnM7XG5cbiAgICBwcml2YXRlIF9xdWVyeU9yaWdpbk5vZGU6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnQ7XG5cbiAgICBwcml2YXRlIF9wcmV2aW91c0xvb3BUaW1lOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIF9sb29wVGltZW91dDogYW55O1xuXG4gICAgcHJpdmF0ZSBfaGFuZGxlU2Nyb2xsRm46IGFueTtcblxuICAgIHByaXZhdGUgX2VsZW1lbnRzOiBBcnJheTxIVE1MRWxlbWVudCAmIEV4dGVuZGVkSHRtbEVsZW1lbnQ+O1xuXG5cbiAgICBnZXQgY29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnlPcmlnaW5Ob2RlO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfc2hvd09uQXBwZWFyKGVsZW1lbnQ6IEhUTUxFbGVtZW50ICYgRXh0ZW5kZWRIdG1sRWxlbWVudCkge1xuXG4gICAgICAgIGxldCBlcnJvckNhbGxiYWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXQgPSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBhbHRlcm5hdGUgPSB0aGlzLl9vcHRpb25zICYmIHRoaXMuX29wdGlvbnMuZGF0YUFsdGVybmF0ZSAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyB0aGlzLl9vcHRpb25zLmRhdGFBbHRlcm5hdGUpO1xuICAgICAgICAgICAgaWYgKGFsdGVybmF0ZSAmJiBldmVudFRhcmdldFtcInNyY1wiXSAhPSBhbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldFtcInNyY1wiXSA9IGFsdGVybmF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG5cbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRFcnJvciA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja0Vycm9yLmNhbGxiYWNrX2Vycm9yKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2FkQ2FsbGJhY2sgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8qIEFzIHRoaXMgbWV0aG9kIGlzIGFzeW5jaHJvbm91cywgaXQgbXVzdCBiZSBwcm90ZWN0ZWQgYWdhaW5zdCBleHRlcm5hbCBkZXN0cm95KCkgY2FsbHMgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zID09PSBudWxsIHx8IHRoaXMuX29wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGV2ZW50VGFyZ2V0OiBhbnkgPSBlbGVtZW50O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBpZiB0YXJnZXQgZWxlbWVudCBpcyBub3QgPGltZz4sIHRoZSByZWFsIHRhcmdldCBvZiBvbmxvYWQgY2FsbGJhY2sgaXMgdGVtcG9yYXJ5IGltYWdlXG4gICAgICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXQgPSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZXZlbnRUYXJnZXQuc3JjfSlgO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrTG9hZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrTG9hZChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRpbmcpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIklNR1wiIHx8IGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIklGUkFNRVwiKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJWSURFT1wiKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG1wSW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0bXBJbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIHRtcEltZy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgICAgICBlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl0gPSB0bXBJbWc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgc2V0U291cmNlcyhlbGVtZW50LCB0aGlzLl9vcHRpb25zLmRhdGFTcmNTZXQsIHRoaXMuX29wdGlvbnMuZGF0YVNyYyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrU2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja1NldChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2xvb3BUaHJvdWdoRWxlbWVudHMoKSB7XG5cbiAgICAgICAgbGV0IGVsZW1lbnRzTGVuZ3RoID0gKCF0aGlzLl9lbGVtZW50cykgPyAwIDogdGhpcy5fZWxlbWVudHMubGVuZ3RoO1xuICAgICAgICBsZXQgcHJvY2Vzc2VkSW5kZXhlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50c1tpXTtcblxuICAgICAgICAgICAgLyogSWYgbXVzdCBza2lwX2ludmlzaWJsZSBhbmQgZWxlbWVudCBpcyBpbnZpc2libGUsIHNraXAgaXQgKi9cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLl9vcHRpb25zLnNraXBJbnZpc2libGUgJiYgKGVsZW1lbnQub2Zmc2V0UGFyZW50ID09PSBudWxsKSkge1xuICAgICAgICAgICAgLy8gICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICBpZiAoX2lzSW5zaWRlVmlld3BvcnQoZWxlbWVudCwgdGhpcy5fb3B0aW9ucy5jb250YWluZXIsIHRoaXMuX29wdGlvbnMudGhyZXNob2xkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dPbkFwcGVhcihlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIC8qIE1hcmtpbmcgdGhlIGVsZW1lbnQgYXMgcHJvY2Vzc2VkLiAqL1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEluZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFJlbW92aW5nIHByb2Nlc3NlZCBlbGVtZW50cyBmcm9tIHRoaXMuX2VsZW1lbnRzLiAqL1xuICAgICAgICB3aGlsZSAocHJvY2Vzc2VkSW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50cy5zcGxpY2UocHJvY2Vzc2VkSW5kZXhlcy5wb3AoKSwgMSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja1Byb2Nlc3NlZCh0aGlzLl9lbGVtZW50cy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogU3RvcCBsaXN0ZW5pbmcgdG8gc2Nyb2xsIGV2ZW50IHdoZW4gMCBlbGVtZW50cyByZW1haW5zICovXG4gICAgICAgIGlmIChlbGVtZW50c0xlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIF9wdXJnZUVsZW1lbnRzKCkge1xuICAgICAgICBsZXQgZWxlbWVudHNUb1B1cmdlID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50c1tpXTtcblxuICAgICAgICAgICAgLyogSWYgdGhlIGVsZW1lbnQgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQsIHNraXAgaXQgKi9cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNUb1B1cmdlLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmluZyBlbGVtZW50cyB0byBwdXJnZSBmcm9tIHRoaXMuX2VsZW1lbnRzLiAqL1xuICAgICAgICB3aGlsZSAoZWxlbWVudHNUb1B1cmdlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRzLnNwbGljZShlbGVtZW50c1RvUHVyZ2UucG9wKCksIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX2lzSGFuZGxpbmdTY3JvbGw6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9zdGFydFNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNIYW5kbGluZ1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5faXNIYW5kbGluZ1Njcm9sbCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2Nyb2xsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX3N0b3BTY3JvbGxIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5faXNIYW5kbGluZ1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5faXNIYW5kbGluZ1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5zY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNjcm9sbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHB1YmxpYyBoYW5kbGVTY3JvbGwoKSB7XG4gICAgICAgIHZhciByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgbm93LFxuICAgICAgICAgICAgdGhyb3R0bGU7XG5cbiAgICAgICAgLy8gSUU4IGZpeCBmb3IgZGVzdHJveSgpIG1hbGZ1bmN0aW9uaW5nXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbm93ID0gX25vdygpO1xuICAgICAgICB0aHJvdHRsZSA9IHRoaXMuX29wdGlvbnMudGhyb3R0bGU7XG5cbiAgICAgICAgaWYgKHRocm90dGxlICE9PSAwKSB7XG4gICAgICAgICAgICByZW1haW5pbmdUaW1lID0gdGhyb3R0bGUgLSAobm93IC0gdGhpcy5fcHJldmlvdXNMb29wVGltZSk7XG4gICAgICAgICAgICBpZiAocmVtYWluaW5nVGltZSA8PSAwIHx8IHJlbWFpbmluZ1RpbWUgPiB0aHJvdHRsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb29wVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fbG9vcFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IHNldFRpbWVvdXQoX2JpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmV2aW91c0xvb3BUaW1lID0gX25vdygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSwgcmVtYWluaW5nVGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHVibGljIHVwZGF0ZShvcHRpb25zPzoge3JldHJ5RXJyb3I/OiBib29sZWFufSkge1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzID0gX2NvbnZlcnRUb0FycmF5KHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX29wdGlvbnMuc2VsZWN0b3IpKTtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuX2VsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgJiYgZWxlbWVudC5sYXp5TG9hZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wdXJnZUVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5fc3RhcnRTY3JvbGxIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgaWYgKHRoaXMuX2xvb3BUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3BTY3JvbGxIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcXVlcnlPcmlnaW5Ob2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBkZWxldGUgaW5zdGFuY2VzW3RoaXMuaWRdO1xuICAgIH1cblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlTGF6eUxvYWQocm9vdDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW59KSB7XG5cbiAgICBmb3IgKGxldCBpbnN0YW5jZUlkIGluIGluc3RhbmNlcykge1xuICAgICAgICBsZXQgbG9hZGVyOiBMb2FkZXIgPSBpbnN0YW5jZXNbaW5zdGFuY2VJZF07XG4gICAgICAgIGxldCBjb250YWluZXIgPSBsb2FkZXIuY29udGFpbmVyO1xuXG4gICAgICAgIGlmIChyb290ID09PSBjb250YWluZXIpIHtcbiAgICAgICAgICAgIGxvYWRlci51cGRhdGUoe3JldHJ5RXJyb3I6IG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSBjb250YWluZXIucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50ICE9PSByb290KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBsb2FkZXIudXBkYXRlKHtyZXRyeUVycm9yOiBvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcn0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmludGVyZmFjZSBFeHRlbmRlZEh0bWxFbGVtZW50IHtcbiAgICBsYXp5TG9hZFByb2Nlc3NlZD86IGJvb2xlYW47XG4gICAgbGF6eUxvYWRFcnJvcj86IGJvb2xlYW47XG59XG4iXX0=