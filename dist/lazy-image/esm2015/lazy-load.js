import * as tslib_1 from "tslib";
const defaultOptions = {
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
    let parent = element.parentElement;
    if (parent.tagName !== 'PICTURE') {
        return;
    }
    for (let i = 0; i < parent.children.length; i++) {
        let pictureChild = parent.children[i];
        if (pictureChild.tagName === 'SOURCE') {
            let sourceSrcset = pictureChild.getAttribute('data-' + srcsetDataAttribute);
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
    let tagName = element.tagName.toUpperCase();
    let elementSrc = element.getAttribute("data-" + srcDataAttribute);
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
        let dataTarget = element;
        if (element["__ionxLazyImageTmpImg"]) {
            dataTarget = element["__ionxLazyImageTmpImg"];
        }
        let imgSrcSet = element.getAttribute("data-" + srcsetDataAttribute);
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
export class LazyLoad {
    constructor(options) {
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
    get container() {
        return this._queryOriginNode;
    }
    _showOnAppear(element) {
        let errorCallback = () => {
            let eventTarget = element;
            if (element["__ionxLazyImageTmpImg"]) {
                eventTarget = element["__ionxLazyImageTmpImg"];
            }
            let alternate = this._options.dataAlternate && element.getAttribute("data-" + this._options.dataAlternate);
            if (alternate && eventTarget["src"] != alternate) {
                eventTarget["src"] = alternate;
                return;
            }
            delete element["__ionxLazyImageTmpImg"];
            eventTarget.removeEventListener("load", loadCallback);
            eventTarget.removeEventListener("error", errorCallback);
            element.classList.remove(this._options.classLoading);
            element.lazyLoadError = true;
            if (this._options.callbackError) {
                this._options.callbackError.callback_error(element);
            }
        };
        let loadCallback = () => {
            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (this._options === null) {
                return;
            }
            let eventTarget = element;
            // if target element is not <img>, the real target of onload callback is temporary image
            if (element["__ionxLazyImageTmpImg"]) {
                eventTarget = element["__ionxLazyImageTmpImg"];
                element.style.backgroundImage = `url(${eventTarget.src})`;
                delete element["__ionxLazyImageTmpImg"];
            }
            element.lazyLoadError = false;
            if (this._options.callbackLoad) {
                this._options.callbackLoad(element);
            }
            element.classList.remove(this._options.classLoading);
            element.classList.add(this._options.classLoaded);
            eventTarget.removeEventListener("load", loadCallback);
            eventTarget.removeEventListener("error", errorCallback);
        };
        element.classList.add(this._options.classLoading);
        if (element.tagName.toUpperCase() === "IMG" || element.tagName.toUpperCase() === "IFRAME") {
            element.addEventListener("load", loadCallback);
            element.addEventListener("error", errorCallback);
        }
        else {
            let tmpImg = new Image();
            tmpImg.addEventListener("load", loadCallback);
            tmpImg.addEventListener("error", errorCallback);
            element["__ionxLazyImageTmpImg"] = tmpImg;
        }
        setSources(element, this._options.dataSrcSet, this._options.dataSrc);
        if (this._options.callbackSet) {
            this._options.callbackSet(element);
        }
    }
    _loopThroughElements() {
        let elementsLength = (!this._elements) ? 0 : this._elements.length;
        let processedIndexes = [];
        for (let i = 0; i < elementsLength; i++) {
            let element = this._elements[i];
            /* If must skip_invisible and element is invisible, skip it */
            if (this._options.skipInvisible && (element.offsetParent === null)) {
                continue;
            }
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
    }
    ;
    _purgeElements() {
        let elementsToPurge = [];
        for (let i = 0; i < this._elements.length; i++) {
            let element = this._elements[i];
            /* If the element has already been processed, skip it */
            if (element.lazyLoadProcessed) {
                elementsToPurge.push(i);
            }
        }
        /* Removing elements to purge from this._elements. */
        while (elementsToPurge.length > 0) {
            this._elements.splice(elementsToPurge.pop(), 1);
        }
    }
    ;
    _startScrollHandler() {
        if (!this._isHandlingScroll) {
            this._isHandlingScroll = true;
            this._options.container.addEventListener("scroll", this._handleScrollFn);
            if (this._options.scroll) {
                this._options.scroll.addEventListener("scroll", this._handleScrollFn);
            }
        }
    }
    ;
    _stopScrollHandler() {
        if (this._isHandlingScroll) {
            this._isHandlingScroll = false;
            this._options.container.removeEventListener("scroll", this._handleScrollFn);
            if (this._options.scroll) {
                this._options.scroll.removeEventListener("scroll", this._handleScrollFn);
            }
        }
    }
    ;
    handleScroll() {
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
    }
    ;
    update(options) {
        this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._options.selector));
        if (options && options.retryError) {
            for (let element of this._elements) {
                if (element.lazyLoadProcessed && element.lazyLoadError) {
                    element.lazyLoadProcessed = false;
                }
            }
        }
        this._purgeElements();
        this._loopThroughElements();
        this._startScrollHandler();
    }
    destroy() {
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
    }
}
export function ensureLazyImagesLoaded(root, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        for (let instanceId in instances) {
            let loader = instances[instanceId];
            let container = loader.container;
            if (root === container) {
                loader.update({ retryError: options && options.retryError });
            }
            else {
                let parent = container.parentElement;
                while (parent && parent !== root) {
                    parent = parent.parentElement;
                }
                if (parent) {
                    loader.update({ retryError: options && options.retryError });
                }
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1pbWFnZS8iLCJzb3VyY2VzIjpbImxhenktbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxjQUFjLEdBQW9CO0lBQ3BDLFFBQVEsRUFBRSxLQUFLO0lBQ2YsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLElBQUk7SUFDWixTQUFTLEVBQUUsR0FBRztJQUNkLFFBQVEsRUFBRSxHQUFHO0lBQ2IsT0FBTyxFQUFFLFVBQVU7SUFDbkIsVUFBVSxFQUFFLGNBQWM7SUFDMUIsYUFBYSxFQUFFLFdBQVc7SUFDMUIsWUFBWSxFQUFFLHlCQUF5QjtJQUN2QyxXQUFXLEVBQUUsd0JBQXdCO0lBQ3JDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLElBQUk7Q0FDMUIsQ0FBQztBQUVGLFNBQVMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTO0lBRXBELElBQUksYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7SUFFN0MsU0FBUyxpQkFBaUI7UUFDdEIsT0FBTyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsU0FBUyxrQkFBa0I7UUFDdkIsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsU0FBUyxhQUFhLENBQUMsT0FBTztRQUMxQixPQUFPLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxD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TSxDQUFDLFNBQVMsQ0FBQztZQUVqQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxVQUFVLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO2FBQzlEO2lCQUFNO2dCQUVILElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUM7Z0JBQ3JDLE9BQU8sTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7b0JBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO2lCQUNqQztnQkFFRCxJQUFJLE1BQU0sRUFBRTtvQkFDUixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztpQkFDOUQ7YUFDSjtTQUNKO0lBQ0wsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGF6eUxvYWRPcHRpb25zIH0gZnJvbSBcIi4vbGF6eS1sb2FkLW9wdGlvbnNcIjtcblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IExhenlMb2FkT3B0aW9ucyA9IHtcbiAgICBzZWxlY3RvcjogXCJpbWdcIixcbiAgICBjb250YWluZXI6IHdpbmRvdyxcbiAgICBzY3JvbGw6IG51bGwsXG4gICAgdGhyZXNob2xkOiAzMDAsXG4gICAgdGhyb3R0bGU6IDE1MCxcbiAgICBkYXRhU3JjOiBcIm9yaWdpbmFsXCIsXG4gICAgZGF0YVNyY1NldDogXCJvcmlnaW5hbC1zZXRcIixcbiAgICBkYXRhQWx0ZXJuYXRlOiBcImFsdGVybmF0ZVwiLFxuICAgIGNsYXNzTG9hZGluZzogXCJpb254LWxhenktaW1hZ2UtbG9hZGluZ1wiLFxuICAgIGNsYXNzTG9hZGVkOiBcImlvbngtbGF6eS1pbWFnZS1sb2FkZWRcIixcbiAgICBza2lwSW52aXNpYmxlOiB0cnVlLFxuICAgIGNhbGxiYWNrTG9hZDogbnVsbCxcbiAgICBjYWxsYmFja0Vycm9yOiBudWxsLFxuICAgIGNhbGxiYWNrU2V0OiBudWxsLFxuICAgIGNhbGxiYWNrUHJvY2Vzc2VkOiBudWxsXG59O1xuXG5mdW5jdGlvbiBfaXNJbnNpZGVWaWV3cG9ydChlbGVtZW50LCBjb250YWluZXIsIHRocmVzaG9sZCkge1xuXG4gICAgdmFyIG93bmVyRG9jdW1lbnQsIGRvY3VtZW50VG9wLCBkb2N1bWVudExlZnQ7XG5cbiAgICBmdW5jdGlvbiBfZ2V0RG9jdW1lbnRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIHx8IChvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0RG9jdW1lbnRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgKG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldFRvcE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGRvY3VtZW50VG9wIC0gb3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9nZXRMZWZ0T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIGRvY3VtZW50TGVmdCAtIG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudExlZnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQmVsb3dWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXREb2N1bWVudEhlaWdodCgpICsgZG9jdW1lbnRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldFRvcE9mZnNldChjb250YWluZXIpICsgY29udGFpbmVyLm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA8PSBfZ2V0VG9wT2Zmc2V0KGVsZW1lbnQpIC0gdGhyZXNob2xkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0F0UmlnaHRPZlZpZXdwb3J0KCkge1xuICAgICAgICB2YXIgZm9sZDtcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldERvY3VtZW50V2lkdGgoKSArIHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0TGVmdE9mZnNldChjb250YWluZXIpICsgX2dldERvY3VtZW50V2lkdGgoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA8PSBfZ2V0TGVmdE9mZnNldChlbGVtZW50KSAtIHRocmVzaG9sZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNBYm92ZVZpZXdwb3J0KCkge1xuICAgICAgICB2YXIgZm9sZDtcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gZG9jdW1lbnRUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldFRvcE9mZnNldChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkID49IF9nZXRUb3BPZmZzZXQoZWxlbWVudCkgKyB0aHJlc2hvbGQgKyBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNBdExlZnRPZlZpZXdwb3J0KCkge1xuICAgICAgICB2YXIgZm9sZDtcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gZG9jdW1lbnRMZWZ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRMZWZ0T2Zmc2V0KGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPj0gX2dldExlZnRPZmZzZXQoZWxlbWVudCkgKyB0aHJlc2hvbGQgKyBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIG93bmVyRG9jdW1lbnQgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgZG9jdW1lbnRUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgb3duZXJEb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICBkb2N1bWVudExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgb3duZXJEb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG5cbiAgICByZXR1cm4gIV9pc0JlbG93Vmlld3BvcnQoKSAmJiAhX2lzQWJvdmVWaWV3cG9ydCgpICYmICFfaXNBdFJpZ2h0T2ZWaWV3cG9ydCgpICYmICFfaXNBdExlZnRPZlZpZXdwb3J0KCk7XG59XG5cbmZ1bmN0aW9uIF9ub3coKSB7XG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBkLmdldFRpbWUoKTtcbn1cblxuXG5mdW5jdGlvbiBfY29udmVydFRvQXJyYXkobm9kZVNldCkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlU2V0KTtcbn1cblxuZnVuY3Rpb24gc2V0U291cmNlc0ZvclBpY3R1cmUoZWxlbWVudCwgc3Jjc2V0RGF0YUF0dHJpYnV0ZSkge1xuXG4gICAgbGV0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBpZiAocGFyZW50LnRhZ05hbWUgIT09ICdQSUNUVVJFJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHBpY3R1cmVDaGlsZCA9IHBhcmVudC5jaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKHBpY3R1cmVDaGlsZC50YWdOYW1lID09PSAnU09VUkNFJykge1xuICAgICAgICAgICAgbGV0IHNvdXJjZVNyY3NldCA9IHBpY3R1cmVDaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIHNyY3NldERhdGFBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZVNyY3NldCkge1xuICAgICAgICAgICAgICAgIHBpY3R1cmVDaGlsZC5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNvdXJjZVNyY3NldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogU2V0cyBzb3VyY2VzIChlLmcuIHNyYykgZm9yIGxhenkgbG9hZCBlbGVtZW50LlxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCwgd2hvc2UgaW1hZ2UgdG8gYmUgbG9hZGVkLlxuICogQHBhcmFtIHNyY3NldERhdGFBdHRyaWJ1dGUgXG4gKiBAcGFyYW0gc3JjRGF0YUF0dHJpYnV0ZSBcbiAqL1xuZnVuY3Rpb24gc2V0U291cmNlcyhlbGVtZW50LCBzcmNzZXREYXRhQXR0cmlidXRlLCBzcmNEYXRhQXR0cmlidXRlKSB7XG5cbiAgICBsZXQgdGFnTmFtZSA9IGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIGxldCBlbGVtZW50U3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgc3JjRGF0YUF0dHJpYnV0ZSk7XG4gICAgXG4gICAgaWYgKHRhZ05hbWUgPT09IFwiSUZSQU1FXCIpIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbGVtZW50U3JjKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBlbGVtZW50U3JjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodGFnTmFtZSA9PT0gXCJJTUdcIikge1xuICAgICAgICAgICAgc2V0U291cmNlc0ZvclBpY3R1cmUoZWxlbWVudCwgc3Jjc2V0RGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YVRhcmdldCA9IGVsZW1lbnQ7XG4gICAgICAgIGlmIChlbGVtZW50W1wiX19pb254TGF6eUltYWdlVG1wSW1nXCJdKSB7XG4gICAgICAgICAgICBkYXRhVGFyZ2V0ID0gZWxlbWVudFtcIl9faW9ueExhenlJbWFnZVRtcEltZ1wiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbWdTcmNTZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgaWYgKGltZ1NyY1NldCkge1xuICAgICAgICAgICAgZGF0YVRhcmdldC5zZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIiwgaW1nU3JjU2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50U3JjKSB7XG4gICAgICAgICAgICBkYXRhVGFyZ2V0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBlbGVtZW50U3JjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9pZiAoZWxlbWVudFNyYykgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGVsZW1lbnRTcmMgKyBcIilcIjtcbn1cblxuZnVuY3Rpb24gX2JpbmQoZm4sIG9iaikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxudmFyIGluc3RhbmNlQ291bnRlciA9IDA7XG52YXIgaW5zdGFuY2VzOiB7W2luc3RhbmNlSWQ6IHN0cmluZ106IExhenlMb2FkfSA9IHt9O1xuXG5cbmV4cG9ydCBjbGFzcyBMYXp5TG9hZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzogTGF6eUxvYWRPcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5pZCA9ICgrK2luc3RhbmNlQ291bnRlcikgKyBcIlwiO1xuICAgICAgICBpbnN0YW5jZXNbdGhpcy5pZF0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZSA9IHRoaXMuX29wdGlvbnMuY29udGFpbmVyID09PSB3aW5kb3cgPyBkb2N1bWVudCA6IDxIVE1MRWxlbWVudHxEb2N1bWVudD50aGlzLl9vcHRpb25zLmNvbnRhaW5lcjtcblxuICAgICAgICB0aGlzLl9wcmV2aW91c0xvb3BUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZVNjcm9sbEZuID0gX2JpbmQodGhpcy5oYW5kbGVTY3JvbGwsIHRoaXMpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlkOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIF9vcHRpb25zOiBMYXp5TG9hZE9wdGlvbnM7XG5cbiAgICBwcml2YXRlIF9xdWVyeU9yaWdpbk5vZGU6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnQ7XG5cbiAgICBwcml2YXRlIF9wcmV2aW91c0xvb3BUaW1lOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIF9sb29wVGltZW91dDogYW55O1xuXG4gICAgcHJpdmF0ZSBfaGFuZGxlU2Nyb2xsRm46IGFueTtcblxuICAgIHByaXZhdGUgX2VsZW1lbnRzOiBBcnJheTxIVE1MRWxlbWVudCAmIEV4dGVuZGVkSHRtbEVsZW1lbnQ+O1xuXG5cbiAgICBnZXQgY29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnlPcmlnaW5Ob2RlO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfc2hvd09uQXBwZWFyKGVsZW1lbnQ6IEhUTUxFbGVtZW50ICYgRXh0ZW5kZWRIdG1sRWxlbWVudCkge1xuXG4gICAgICAgIGxldCBlcnJvckNhbGxiYWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlJbWFnZVRtcEltZ1wiXSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gZWxlbWVudFtcIl9faW9ueExhenlJbWFnZVRtcEltZ1wiXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGFsdGVybmF0ZSA9IHRoaXMuX29wdGlvbnMuZGF0YUFsdGVybmF0ZSAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyB0aGlzLl9vcHRpb25zLmRhdGFBbHRlcm5hdGUpO1xuICAgICAgICAgICAgaWYgKGFsdGVybmF0ZSAmJiBldmVudFRhcmdldFtcInNyY1wiXSAhPSBhbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldFtcInNyY1wiXSA9IGFsdGVybmF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W1wiX19pb254TGF6eUltYWdlVG1wSW1nXCJdO1xuXG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRFcnJvciA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrRXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrRXJyb3IuY2FsbGJhY2tfZXJyb3IoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAvKiBBcyB0aGlzIG1ldGhvZCBpcyBhc3luY2hyb25vdXMsIGl0IG11c3QgYmUgcHJvdGVjdGVkIGFnYWluc3QgZXh0ZXJuYWwgZGVzdHJveSgpIGNhbGxzICovXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGV2ZW50VGFyZ2V0OiBhbnkgPSBlbGVtZW50O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBpZiB0YXJnZXQgZWxlbWVudCBpcyBub3QgPGltZz4sIHRoZSByZWFsIHRhcmdldCBvZiBvbmxvYWQgY2FsbGJhY2sgaXMgdGVtcG9yYXJ5IGltYWdlXG4gICAgICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlJbWFnZVRtcEltZ1wiXSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gZWxlbWVudFtcIl9faW9ueExhenlJbWFnZVRtcEltZ1wiXTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtldmVudFRhcmdldC5zcmN9KWA7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja0xvYWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrTG9hZChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGVkKTtcbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRpbmcpO1xuXG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJTUdcIiB8fCBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJRlJBTUVcIikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG1wSW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0bXBJbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIHRtcEltZy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgICAgICBlbGVtZW50W1wiX19pb254TGF6eUltYWdlVG1wSW1nXCJdID0gdG1wSW1nO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U291cmNlcyhlbGVtZW50LCB0aGlzLl9vcHRpb25zLmRhdGFTcmNTZXQsIHRoaXMuX29wdGlvbnMuZGF0YVNyYyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2FsbGJhY2tTZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tTZXQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb29wVGhyb3VnaEVsZW1lbnRzKCkge1xuICAgICAgICBcbiAgICAgICAgbGV0IGVsZW1lbnRzTGVuZ3RoID0gKCF0aGlzLl9lbGVtZW50cykgPyAwIDogdGhpcy5fZWxlbWVudHMubGVuZ3RoO1xuICAgICAgICBsZXQgcHJvY2Vzc2VkSW5kZXhlcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50c1tpXTtcblxuICAgICAgICAgICAgLyogSWYgbXVzdCBza2lwX2ludmlzaWJsZSBhbmQgZWxlbWVudCBpcyBpbnZpc2libGUsIHNraXAgaXQgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNraXBJbnZpc2libGUgJiYgKGVsZW1lbnQub2Zmc2V0UGFyZW50ID09PSBudWxsKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX2lzSW5zaWRlVmlld3BvcnQoZWxlbWVudCwgdGhpcy5fb3B0aW9ucy5jb250YWluZXIsIHRoaXMuX29wdGlvbnMudGhyZXNob2xkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dPbkFwcGVhcihlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIC8qIE1hcmtpbmcgdGhlIGVsZW1lbnQgYXMgcHJvY2Vzc2VkLiAqL1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEluZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFJlbW92aW5nIHByb2Nlc3NlZCBlbGVtZW50cyBmcm9tIHRoaXMuX2VsZW1lbnRzLiAqL1xuICAgICAgICB3aGlsZSAocHJvY2Vzc2VkSW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50cy5zcGxpY2UocHJvY2Vzc2VkSW5kZXhlcy5wb3AoKSwgMSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja1Byb2Nlc3NlZCh0aGlzLl9lbGVtZW50cy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogU3RvcCBsaXN0ZW5pbmcgdG8gc2Nyb2xsIGV2ZW50IHdoZW4gMCBlbGVtZW50cyByZW1haW5zICovXG4gICAgICAgIGlmIChlbGVtZW50c0xlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIF9wdXJnZUVsZW1lbnRzKCkge1xuICAgICAgICBsZXQgZWxlbWVudHNUb1B1cmdlID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50c1tpXTtcblxuICAgICAgICAgICAgLyogSWYgdGhlIGVsZW1lbnQgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQsIHNraXAgaXQgKi9cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNUb1B1cmdlLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmluZyBlbGVtZW50cyB0byBwdXJnZSBmcm9tIHRoaXMuX2VsZW1lbnRzLiAqL1xuICAgICAgICB3aGlsZSAoZWxlbWVudHNUb1B1cmdlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRzLnNwbGljZShlbGVtZW50c1RvUHVyZ2UucG9wKCksIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX2lzSGFuZGxpbmdTY3JvbGw6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9zdGFydFNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNIYW5kbGluZ1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5faXNIYW5kbGluZ1Njcm9sbCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2Nyb2xsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX3N0b3BTY3JvbGxIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5faXNIYW5kbGluZ1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5faXNIYW5kbGluZ1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5zY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNjcm9sbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHB1YmxpYyBoYW5kbGVTY3JvbGwoKSB7XG4gICAgICAgIHZhciByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgbm93LFxuICAgICAgICAgICAgdGhyb3R0bGU7XG5cbiAgICAgICAgLy8gSUU4IGZpeCBmb3IgZGVzdHJveSgpIG1hbGZ1bmN0aW9uaW5nXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbm93ID0gX25vdygpO1xuICAgICAgICB0aHJvdHRsZSA9IHRoaXMuX29wdGlvbnMudGhyb3R0bGU7XG5cbiAgICAgICAgaWYgKHRocm90dGxlICE9PSAwKSB7XG4gICAgICAgICAgICByZW1haW5pbmdUaW1lID0gdGhyb3R0bGUgLSAobm93IC0gdGhpcy5fcHJldmlvdXNMb29wVGltZSk7XG4gICAgICAgICAgICBpZiAocmVtYWluaW5nVGltZSA8PSAwIHx8IHJlbWFpbmluZ1RpbWUgPiB0aHJvdHRsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb29wVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fbG9vcFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IHNldFRpbWVvdXQoX2JpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmV2aW91c0xvb3BUaW1lID0gX25vdygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSwgcmVtYWluaW5nVGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHVibGljIHVwZGF0ZShvcHRpb25zPzoge3JldHJ5RXJyb3I/OiBib29sZWFufSkge1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzID0gX2NvbnZlcnRUb0FycmF5KHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX29wdGlvbnMuc2VsZWN0b3IpKTtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuX2VsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgJiYgZWxlbWVudC5sYXp5TG9hZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wdXJnZUVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5fc3RhcnRTY3JvbGxIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgaWYgKHRoaXMuX2xvb3BUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3BTY3JvbGxIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcXVlcnlPcmlnaW5Ob2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBkZWxldGUgaW5zdGFuY2VzW3RoaXMuaWRdO1xuICAgIH1cblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlTGF6eUltYWdlc0xvYWRlZChyb290OiBIVE1MRWxlbWVudCwgb3B0aW9ucz86IHtyZXRyeUVycm9yPzogYm9vbGVhbn0pIHtcblxuICAgIGZvciAobGV0IGluc3RhbmNlSWQgaW4gaW5zdGFuY2VzKSB7XG4gICAgICAgIGxldCBsb2FkZXI6IExhenlMb2FkID0gaW5zdGFuY2VzW2luc3RhbmNlSWRdO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gbG9hZGVyLmNvbnRhaW5lcjtcblxuICAgICAgICBpZiAocm9vdCA9PT0gY29udGFpbmVyKSB7XG4gICAgICAgICAgICBsb2FkZXIudXBkYXRlKHtyZXRyeUVycm9yOiBvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcn0pO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gcm9vdCkge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLnVwZGF0ZSh7cmV0cnlFcnJvcjogb3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3J9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5pbnRlcmZhY2UgRXh0ZW5kZWRIdG1sRWxlbWVudCB7XG4gICAgbGF6eUxvYWRQcm9jZXNzZWQ/OiBib29sZWFuO1xuICAgIGxhenlMb2FkRXJyb3I/OiBib29sZWFuO1xufSJdfQ==