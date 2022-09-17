import { __awaiter } from "tslib";
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
            let alternate = this._options && this._options.dataAlternate && element.getAttribute("data-" + this._options.dataAlternate);
            if (alternate && eventTarget["src"] != alternate) {
                eventTarget["src"] = alternate;
                return;
            }
            delete element["__ionxLazyImageTmpImg"];
            eventTarget.removeEventListener("load", loadCallback);
            eventTarget.removeEventListener("error", errorCallback);
            element.lazyLoadError = true;
            if (this._options) {
                element.classList.remove(this._options.classLoading);
                if (this._options.callbackError) {
                    this._options.callbackError.callback_error(element);
                }
            }
        };
        let loadCallback = () => {
            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (this._options === null || this._options === undefined) {
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
            if (this._options) {
                if (this._options.callbackLoad) {
                    this._options.callbackLoad(element);
                }
                element.classList.remove(this._options.classLoading);
                element.classList.add(this._options.classLoaded);
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
            let tmpImg = new Image();
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
    }
    _loopThroughElements() {
        let elementsLength = (!this._elements) ? 0 : this._elements.length;
        let processedIndexes = [];
        for (let i = 0; i < elementsLength; i++) {
            let element = this._elements[i];
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
    return __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xhenktaW1hZ2UvbGF6eS1sb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLGNBQWMsR0FBb0I7SUFDcEMsUUFBUSxFQUFFLEtBQUs7SUFDZixTQUFTLEVBQUUsTUFBTTtJQUNqQixNQUFNLEVBQUUsSUFBSTtJQUNaLFNBQVMsRUFBRSxHQUFHO0lBQ2QsUUFBUSxFQUFFLEdBQUc7SUFDYixPQUFPLEVBQUUsVUFBVTtJQUNuQixVQUFVLEVBQUUsY0FBYztJQUMxQixhQUFhLEVBQUUsV0FBVztJQUMxQixZQUFZLEVBQUUseUJBQXlCO0lBQ3ZDLFdBQVcsRUFBRSx3QkFBd0I7SUFDckMsYUFBYSxFQUFFLElBQUk7SUFDbkIsWUFBWSxFQUFFLElBQUk7SUFDbEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsV0FBVyxFQUFFLElBQUk7SUFDakIsaUJBQWlCLEVBQUUsSUFBSTtDQUMxQixDQUFDO0FBRUYsU0FBUyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVM7SUFFcEQsSUFBSSxhQUFhLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQztJQUU3QyxTQUFTLGlCQUFpQjtRQUN0QixPQUFPLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFRCxTQUFTLGtCQUFrQjtRQUN2QixPQUFPLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCxTQUFTLGFBQWEsQ0FBQyxPQUFPO1FBQzFCLE9BQU8sT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxHQUFHLFdBQVcs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RUFBRSxPQUFnQzs7UUFFNUYsS0FBSyxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBQUU7WUFDOUIsSUFBSSxNQUFNLEdBQWEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFFakMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQzthQUM5RDtpQkFBTTtnQkFFSCxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO2dCQUNyQyxPQUFPLE1BQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUM5QixNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztpQkFDakM7Z0JBRUQsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7aUJBQzlEO2FBQ0o7U0FDSjtJQUNMLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExhenlMb2FkT3B0aW9ucyB9IGZyb20gXCIuL2xhenktbG9hZC1vcHRpb25zXCI7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBMYXp5TG9hZE9wdGlvbnMgPSB7XG4gICAgc2VsZWN0b3I6IFwiaW1nXCIsXG4gICAgY29udGFpbmVyOiB3aW5kb3csXG4gICAgc2Nyb2xsOiBudWxsLFxuICAgIHRocmVzaG9sZDogMzAwLFxuICAgIHRocm90dGxlOiAxNTAsXG4gICAgZGF0YVNyYzogXCJvcmlnaW5hbFwiLFxuICAgIGRhdGFTcmNTZXQ6IFwib3JpZ2luYWwtc2V0XCIsXG4gICAgZGF0YUFsdGVybmF0ZTogXCJhbHRlcm5hdGVcIixcbiAgICBjbGFzc0xvYWRpbmc6IFwiaW9ueC1sYXp5LWltYWdlLWxvYWRpbmdcIixcbiAgICBjbGFzc0xvYWRlZDogXCJpb254LWxhenktaW1hZ2UtbG9hZGVkXCIsXG4gICAgc2tpcEludmlzaWJsZTogdHJ1ZSxcbiAgICBjYWxsYmFja0xvYWQ6IG51bGwsXG4gICAgY2FsbGJhY2tFcnJvcjogbnVsbCxcbiAgICBjYWxsYmFja1NldDogbnVsbCxcbiAgICBjYWxsYmFja1Byb2Nlc3NlZDogbnVsbFxufTtcblxuZnVuY3Rpb24gX2lzSW5zaWRlVmlld3BvcnQoZWxlbWVudCwgY29udGFpbmVyLCB0aHJlc2hvbGQpIHtcblxuICAgIHZhciBvd25lckRvY3VtZW50LCBkb2N1bWVudFRvcCwgZG9jdW1lbnRMZWZ0O1xuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCB8fCAob3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IHx8IChvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9nZXRUb3BPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudFRvcCAtIG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0TGVmdE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudExlZnQgLSBvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0JlbG93Vmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0RG9jdW1lbnRIZWlnaHQoKSArIGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKSArIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldFRvcE9mZnNldChlbGVtZW50KSAtIHRocmVzaG9sZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNBdFJpZ2h0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXREb2N1bWVudFdpZHRoKCkgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldExlZnRPZmZzZXQoY29udGFpbmVyKSArIF9nZXREb2N1bWVudFdpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldExlZnRPZmZzZXQoZWxlbWVudCkgLSB0aHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQWJvdmVWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA+PSBfZ2V0VG9wT2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50TGVmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0TGVmdE9mZnNldChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkID49IF9nZXRMZWZ0T2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB9XG5cbiAgICBvd25lckRvY3VtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgIGRvY3VtZW50VG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgZG9jdW1lbnRMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgcmV0dXJuICFfaXNCZWxvd1ZpZXdwb3J0KCkgJiYgIV9pc0Fib3ZlVmlld3BvcnQoKSAmJiAhX2lzQXRSaWdodE9mVmlld3BvcnQoKSAmJiAhX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpO1xufVxuXG5mdW5jdGlvbiBfbm93KCkge1xuICAgIHZhciBkID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gZC5nZXRUaW1lKCk7XG59XG5cblxuZnVuY3Rpb24gX2NvbnZlcnRUb0FycmF5KG5vZGVTZXQpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZVNldCk7XG59XG5cbmZ1bmN0aW9uIHNldFNvdXJjZXNGb3JQaWN0dXJlKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUpIHtcblxuICAgIGxldCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudC50YWdOYW1lICE9PSAnUElDVFVSRScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBwaWN0dXJlQ2hpbGQgPSBwYXJlbnQuY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChwaWN0dXJlQ2hpbGQudGFnTmFtZSA9PT0gJ1NPVVJDRScpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2VTcmNzZXQgPSBwaWN0dXJlQ2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VTcmNzZXQpIHtcbiAgICAgICAgICAgICAgICBwaWN0dXJlQ2hpbGQuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFNldHMgc291cmNlcyAoZS5nLiBzcmMpIGZvciBsYXp5IGxvYWQgZWxlbWVudC5cbiAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQsIHdob3NlIGltYWdlIHRvIGJlIGxvYWRlZC5cbiAqIEBwYXJhbSBzcmNzZXREYXRhQXR0cmlidXRlIFxuICogQHBhcmFtIHNyY0RhdGFBdHRyaWJ1dGUgXG4gKi9cbmZ1bmN0aW9uIHNldFNvdXJjZXMoZWxlbWVudCwgc3Jjc2V0RGF0YUF0dHJpYnV0ZSwgc3JjRGF0YUF0dHJpYnV0ZSkge1xuXG4gICAgbGV0IHRhZ05hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgICBsZXQgZWxlbWVudFNyYyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHNyY0RhdGFBdHRyaWJ1dGUpO1xuICAgIFxuICAgIGlmICh0YWdOYW1lID09PSBcIklGUkFNRVwiKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAoZWxlbWVudFNyYykge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudFNyYyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgICAgICAgIHNldFNvdXJjZXNGb3JQaWN0dXJlKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGFUYXJnZXQgPSBlbGVtZW50O1xuICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlJbWFnZVRtcEltZ1wiXSkge1xuICAgICAgICAgICAgZGF0YVRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW1nU3JjU2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgc3Jjc2V0RGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgIGlmIChpbWdTcmNTZXQpIHtcbiAgICAgICAgICAgIGRhdGFUYXJnZXQuc2V0QXR0cmlidXRlKFwic3Jjc2V0XCIsIGltZ1NyY1NldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudFNyYykge1xuICAgICAgICAgICAgZGF0YVRhcmdldC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudFNyYyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vaWYgKGVsZW1lbnRTcmMpIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyBlbGVtZW50U3JjICsgXCIpXCI7XG59XG5cbmZ1bmN0aW9uIF9iaW5kKGZuLCBvYmopIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbnZhciBpbnN0YW5jZUNvdW50ZXIgPSAwO1xudmFyIGluc3RhbmNlczoge1tpbnN0YW5jZUlkOiBzdHJpbmddOiBMYXp5TG9hZH0gPSB7fTtcblxuXG5leHBvcnQgY2xhc3MgTGF6eUxvYWQge1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IExhenlMb2FkT3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuaWQgPSAoKytpbnN0YW5jZUNvdW50ZXIpICsgXCJcIjtcbiAgICAgICAgaW5zdGFuY2VzW3RoaXMuaWRdID0gdGhpcztcblxuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9xdWVyeU9yaWdpbk5vZGUgPSB0aGlzLl9vcHRpb25zLmNvbnRhaW5lciA9PT0gd2luZG93ID8gZG9jdW1lbnQgOiA8SFRNTEVsZW1lbnR8RG9jdW1lbnQ+dGhpcy5fb3B0aW9ucy5jb250YWluZXI7XG5cbiAgICAgICAgdGhpcy5fcHJldmlvdXNMb29wVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9oYW5kbGVTY3JvbGxGbiA9IF9iaW5kKHRoaXMuaGFuZGxlU2Nyb2xsLCB0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpZDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogTGF6eUxvYWRPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBfcXVlcnlPcmlnaW5Ob2RlOiBIVE1MRWxlbWVudCB8IERvY3VtZW50O1xuXG4gICAgcHJpdmF0ZSBfcHJldmlvdXNMb29wVGltZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfbG9vcFRpbWVvdXQ6IGFueTtcblxuICAgIHByaXZhdGUgX2hhbmRsZVNjcm9sbEZuOiBhbnk7XG5cbiAgICBwcml2YXRlIF9lbGVtZW50czogQXJyYXk8SFRNTEVsZW1lbnQgJiBFeHRlbmRlZEh0bWxFbGVtZW50PjtcblxuXG4gICAgZ2V0IGNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IERvY3VtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX3Nob3dPbkFwcGVhcihlbGVtZW50OiBIVE1MRWxlbWVudCAmIEV4dGVuZGVkSHRtbEVsZW1lbnQpIHtcblxuICAgICAgICBsZXQgZXJyb3JDYWxsYmFjayA9ICgpID0+IHtcblxuICAgICAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gZWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBhbHRlcm5hdGUgPSB0aGlzLl9vcHRpb25zICYmIHRoaXMuX29wdGlvbnMuZGF0YUFsdGVybmF0ZSAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyB0aGlzLl9vcHRpb25zLmRhdGFBbHRlcm5hdGUpO1xuICAgICAgICAgICAgaWYgKGFsdGVybmF0ZSAmJiBldmVudFRhcmdldFtcInNyY1wiXSAhPSBhbHRlcm5hdGUpIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldFtcInNyY1wiXSA9IGFsdGVybmF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W1wiX19pb254TGF6eUltYWdlVG1wSW1nXCJdO1xuXG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkRXJyb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGluZyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tFcnJvci5jYWxsYmFja19lcnJvcihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAvKiBBcyB0aGlzIG1ldGhvZCBpcyBhc3luY2hyb25vdXMsIGl0IG11c3QgYmUgcHJvdGVjdGVkIGFnYWluc3QgZXh0ZXJuYWwgZGVzdHJveSgpIGNhbGxzICovXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucyA9PT0gbnVsbCB8fCB0aGlzLl9vcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBldmVudFRhcmdldDogYW55ID0gZWxlbWVudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gaWYgdGFyZ2V0IGVsZW1lbnQgaXMgbm90IDxpbWc+LCB0aGUgcmVhbCB0YXJnZXQgb2Ygb25sb2FkIGNhbGxiYWNrIGlzIHRlbXBvcmFyeSBpbWFnZVxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5SW1hZ2VUbXBJbWdcIl07XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7ZXZlbnRUYXJnZXQuc3JjfSlgO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W1wiX19pb254TGF6eUltYWdlVG1wSW1nXCJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja0xvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja0xvYWQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJTUdcIiB8fCBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJRlJBTUVcIikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG1wSW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0bXBJbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIHRtcEltZy5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgICAgICBlbGVtZW50W1wiX19pb254TGF6eUltYWdlVG1wSW1nXCJdID0gdG1wSW1nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgIHNldFNvdXJjZXMoZWxlbWVudCwgdGhpcy5fb3B0aW9ucy5kYXRhU3JjU2V0LCB0aGlzLl9vcHRpb25zLmRhdGFTcmMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja1NldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tTZXQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb29wVGhyb3VnaEVsZW1lbnRzKCkge1xuXG4gICAgICAgIGxldCBlbGVtZW50c0xlbmd0aCA9ICghdGhpcy5fZWxlbWVudHMpID8gMCA6IHRoaXMuX2VsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgbGV0IHByb2Nlc3NlZEluZGV4ZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudHNbaV07XG5cbiAgICAgICAgICAgIC8vIC8qIElmIG11c3Qgc2tpcF9pbnZpc2libGUgYW5kIGVsZW1lbnQgaXMgaW52aXNpYmxlLCBza2lwIGl0ICovXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5fb3B0aW9ucy5za2lwSW52aXNpYmxlICYmIChlbGVtZW50Lm9mZnNldFBhcmVudCA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIC8vICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgaWYgKF9pc0luc2lkZVZpZXdwb3J0KGVsZW1lbnQsIHRoaXMuX29wdGlvbnMuY29udGFpbmVyLCB0aGlzLl9vcHRpb25zLnRocmVzaG9sZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93T25BcHBlYXIoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAvKiBNYXJraW5nIHRoZSBlbGVtZW50IGFzIHByb2Nlc3NlZC4gKi9cbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRJbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmluZyBwcm9jZXNzZWQgZWxlbWVudHMgZnJvbSB0aGlzLl9lbGVtZW50cy4gKi9cbiAgICAgICAgd2hpbGUgKHByb2Nlc3NlZEluZGV4ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudHMuc3BsaWNlKHByb2Nlc3NlZEluZGV4ZXMucG9wKCksIDEpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja1Byb2Nlc3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tQcm9jZXNzZWQodGhpcy5fZWxlbWVudHMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFN0b3AgbGlzdGVuaW5nIHRvIHNjcm9sbCBldmVudCB3aGVuIDAgZWxlbWVudHMgcmVtYWlucyAqL1xuICAgICAgICBpZiAoZWxlbWVudHNMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BTY3JvbGxIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfcHVyZ2VFbGVtZW50cygpIHtcbiAgICAgICAgbGV0IGVsZW1lbnRzVG9QdXJnZSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudHNbaV07XG5cbiAgICAgICAgICAgIC8qIElmIHRoZSBlbGVtZW50IGhhcyBhbHJlYWR5IGJlZW4gcHJvY2Vzc2VkLCBza2lwIGl0ICovXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5sYXp5TG9hZFByb2Nlc3NlZCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzVG9QdXJnZS5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogUmVtb3ZpbmcgZWxlbWVudHMgdG8gcHVyZ2UgZnJvbSB0aGlzLl9lbGVtZW50cy4gKi9cbiAgICAgICAgd2hpbGUgKGVsZW1lbnRzVG9QdXJnZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50cy5zcGxpY2UoZWxlbWVudHNUb1B1cmdlLnBvcCgpLCAxKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIF9pc0hhbmRsaW5nU2Nyb2xsOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSBfc3RhcnRTY3JvbGxIYW5kbGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzSGFuZGxpbmdTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzSGFuZGxpbmdTY3JvbGwgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5zY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNjcm9sbC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIF9zdG9wU2Nyb2xsSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzSGFuZGxpbmdTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzSGFuZGxpbmdTY3JvbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zY3JvbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBwdWJsaWMgaGFuZGxlU2Nyb2xsKCkge1xuICAgICAgICB2YXIgcmVtYWluaW5nVGltZSxcbiAgICAgICAgICAgIG5vdyxcbiAgICAgICAgICAgIHRocm90dGxlO1xuXG4gICAgICAgIC8vIElFOCBmaXggZm9yIGRlc3Ryb3koKSBtYWxmdW5jdGlvbmluZ1xuICAgICAgICBpZiAoIXRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vdyA9IF9ub3coKTtcbiAgICAgICAgdGhyb3R0bGUgPSB0aGlzLl9vcHRpb25zLnRocm90dGxlO1xuXG4gICAgICAgIGlmICh0aHJvdHRsZSAhPT0gMCkge1xuICAgICAgICAgICAgcmVtYWluaW5nVGltZSA9IHRocm90dGxlIC0gKG5vdyAtIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUpO1xuICAgICAgICAgICAgaWYgKHJlbWFpbmluZ1RpbWUgPD0gMCB8fCByZW1haW5pbmdUaW1lID4gdGhyb3R0bGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9vcFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2xvb3BUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9wcmV2aW91c0xvb3BUaW1lID0gbm93O1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2xvb3BUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBzZXRUaW1lb3V0KF9iaW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNMb29wVGltZSA9IF9ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcyksIHJlbWFpbmluZ1RpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHB1YmxpYyB1cGRhdGUob3B0aW9ucz86IHtyZXRyeUVycm9yPzogYm9vbGVhbn0pIHtcblxuICAgICAgICB0aGlzLl9lbGVtZW50cyA9IF9jb252ZXJ0VG9BcnJheSh0aGlzLl9xdWVyeU9yaWdpbk5vZGUucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9vcHRpb25zLnNlbGVjdG9yKSk7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcikge1xuICAgICAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiB0aGlzLl9lbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkICYmIGVsZW1lbnQubGF6eUxvYWRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcHVyZ2VFbGVtZW50cygpO1xuICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuX3N0YXJ0U2Nyb2xsSGFuZGxlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgIGlmICh0aGlzLl9sb29wVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2xvb3BUaW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9wU2Nyb2xsSGFuZGxlcigpO1xuICAgICAgICB0aGlzLl9lbGVtZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgZGVsZXRlIGluc3RhbmNlc1t0aGlzLmlkXTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZUxhenlJbWFnZXNMb2FkZWQocm9vdDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW59KSB7XG5cbiAgICBmb3IgKGxldCBpbnN0YW5jZUlkIGluIGluc3RhbmNlcykge1xuICAgICAgICBsZXQgbG9hZGVyOiBMYXp5TG9hZCA9IGluc3RhbmNlc1tpbnN0YW5jZUlkXTtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGxvYWRlci5jb250YWluZXI7XG5cbiAgICAgICAgaWYgKHJvb3QgPT09IGNvbnRhaW5lcikge1xuICAgICAgICAgICAgbG9hZGVyLnVwZGF0ZSh7cmV0cnlFcnJvcjogb3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3J9KTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IHJvb3QpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgIGxvYWRlci51cGRhdGUoe3JldHJ5RXJyb3I6IG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuaW50ZXJmYWNlIEV4dGVuZGVkSHRtbEVsZW1lbnQge1xuICAgIGxhenlMb2FkUHJvY2Vzc2VkPzogYm9vbGVhbjtcbiAgICBsYXp5TG9hZEVycm9yPzogYm9vbGVhbjtcbn1cbiJdfQ==