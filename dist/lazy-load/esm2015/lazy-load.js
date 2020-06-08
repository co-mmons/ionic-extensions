import { __awaiter } from "tslib";
import { sleep } from "@co.mmons/js-utils/core";
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
    let ownerDocument, documentTop, documentLeft;
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
        let dataTarget = element;
        if (element["__ionxLazyLoadTmpImg"]) {
            dataTarget = element["__ionxLazyLoadTmpImg"];
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
export class Loader {
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
            if (element["__ionxLazyLoadTmpImg"]) {
                eventTarget = element["__ionxLazyLoadTmpImg"];
            }
            let alternate = this._options && this._options.dataAlternate && element.getAttribute("data-" + this._options.dataAlternate);
            if (alternate && eventTarget["src"] != alternate) {
                eventTarget["src"] = alternate;
                return;
            }
            delete element["__ionxLazyLoadTmpImg"];
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
            if (element["__ionxLazyLoadTmpImg"]) {
                eventTarget = element["__ionxLazyLoadTmpImg"];
                element.style.backgroundImage = `url(${eventTarget.src})`;
                delete element["__ionxLazyLoadTmpImg"];
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
        else if (element.tagName.toUpperCase() === "VIDEO") {
            element.addEventListener("loadedmetadata", loadCallback);
            element.addEventListener("error", errorCallback);
        }
        else {
            let tmpImg = new Image();
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
    }
    _loopThroughElements() {
        return __awaiter(this, void 0, void 0, function* () {
            let elementsLength = (!this._elements) ? 0 : this._elements.length;
            let processedIndexes = [];
            for (let i = 0; i < elementsLength; i++) {
                let element = this._elements[i];
                while (element.offsetParent === null && this._options.waitInvisible !== false) {
                    yield sleep(100);
                }
                if (this._options.skipInvisible !== false && (element.offsetParent === null || element.offsetHeight === 0 || element.offsetWidth === 0)) {
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
        });
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
export function ensureLazyLoad(root, options) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1sb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFHOUMsTUFBTSxjQUFjLEdBQW9CO0lBQ3BDLFFBQVEsRUFBRSxLQUFLO0lBQ2YsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLElBQUk7SUFDWixTQUFTLEVBQUUsR0FBRztJQUNkLFFBQVEsRUFBRSxHQUFHO0lBQ2IsT0FBTyxFQUFFLFVBQVU7SUFDbkIsVUFBVSxFQUFFLGNBQWM7SUFDMUIsYUFBYSxFQUFFLFdBQVc7SUFDMUIsWUFBWSxFQUFFLHlCQUF5QjtJQUN2QyxXQUFXLEVBQUUsd0JBQXdCO0lBQ3JDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLElBQUk7Q0FDMUIsQ0FBQztBQUVGLFNBQVMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTO0lBRXBELElBQUksYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7SUFFN0MsU0FBUyxpQkFBaUI7UUFDdEIsT0FBTyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsU0FBUyxrQkFBa0I7UUFDdkIsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsU0FBUyxhQUFhLENB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QUksTUFBTSxFQUFFO29CQUNSLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxVQUFVLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO2lCQUM5RDthQUNKO1NBQ0o7SUFDTCxDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TGF6eUxvYWRPcHRpb25zfSBmcm9tIFwiLi9sYXp5LWxvYWQtb3B0aW9uc1wiO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogTGF6eUxvYWRPcHRpb25zID0ge1xuICAgIHNlbGVjdG9yOiBcImltZ1wiLFxuICAgIGNvbnRhaW5lcjogd2luZG93LFxuICAgIHNjcm9sbDogbnVsbCxcbiAgICB0aHJlc2hvbGQ6IDMwMCxcbiAgICB0aHJvdHRsZTogMTUwLFxuICAgIGRhdGFTcmM6IFwib3JpZ2luYWxcIixcbiAgICBkYXRhU3JjU2V0OiBcIm9yaWdpbmFsLXNldFwiLFxuICAgIGRhdGFBbHRlcm5hdGU6IFwiYWx0ZXJuYXRlXCIsXG4gICAgY2xhc3NMb2FkaW5nOiBcImlvbngtbGF6eS1pbWFnZS1sb2FkaW5nXCIsXG4gICAgY2xhc3NMb2FkZWQ6IFwiaW9ueC1sYXp5LWltYWdlLWxvYWRlZFwiLFxuICAgIHNraXBJbnZpc2libGU6IHRydWUsXG4gICAgY2FsbGJhY2tMb2FkOiBudWxsLFxuICAgIGNhbGxiYWNrRXJyb3I6IG51bGwsXG4gICAgY2FsbGJhY2tTZXQ6IG51bGwsXG4gICAgY2FsbGJhY2tQcm9jZXNzZWQ6IG51bGxcbn07XG5cbmZ1bmN0aW9uIF9pc0luc2lkZVZpZXdwb3J0KGVsZW1lbnQsIGNvbnRhaW5lciwgdGhyZXNob2xkKSB7XG5cbiAgICBsZXQgb3duZXJEb2N1bWVudCwgZG9jdW1lbnRUb3AsIGRvY3VtZW50TGVmdDtcblxuICAgIGZ1bmN0aW9uIF9nZXREb2N1bWVudFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggfHwgKG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9nZXREb2N1bWVudEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCAob3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0VG9wT2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZG9jdW1lbnRUb3AgLSBvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRUb3A7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldExlZnRPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgZG9jdW1lbnRMZWZ0IC0gb3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50TGVmdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNCZWxvd1ZpZXdwb3J0KCkge1xuICAgICAgICB2YXIgZm9sZDtcbiAgICAgICAgaWYgKGNvbnRhaW5lciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldERvY3VtZW50SGVpZ2h0KCkgKyBkb2N1bWVudFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0VG9wT2Zmc2V0KGNvbnRhaW5lcikgKyBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkIDw9IF9nZXRUb3BPZmZzZXQoZWxlbWVudCkgLSB0aHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQXRSaWdodE9mVmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0RG9jdW1lbnRXaWR0aCgpICsgd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRMZWZ0T2Zmc2V0KGNvbnRhaW5lcikgKyBfZ2V0RG9jdW1lbnRXaWR0aCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkIDw9IF9nZXRMZWZ0T2Zmc2V0KGVsZW1lbnQpIC0gdGhyZXNob2xkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0Fib3ZlVmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBkb2N1bWVudFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0VG9wT2Zmc2V0KGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPj0gX2dldFRvcE9mZnNldChlbGVtZW50KSArIHRocmVzaG9sZCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0F0TGVmdE9mVmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBkb2N1bWVudExlZnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldExlZnRPZmZzZXQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA+PSBfZ2V0TGVmdE9mZnNldChlbGVtZW50KSArIHRocmVzaG9sZCArIGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgfVxuXG4gICAgb3duZXJEb2N1bWVudCA9IGVsZW1lbnQub3duZXJEb2N1bWVudDtcbiAgICBkb2N1bWVudFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBvd25lckRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIGRvY3VtZW50TGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBvd25lckRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcblxuICAgIHJldHVybiAhX2lzQmVsb3dWaWV3cG9ydCgpICYmICFfaXNBYm92ZVZpZXdwb3J0KCkgJiYgIV9pc0F0UmlnaHRPZlZpZXdwb3J0KCkgJiYgIV9pc0F0TGVmdE9mVmlld3BvcnQoKTtcbn1cblxuZnVuY3Rpb24gX25vdygpIHtcbiAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIGQuZ2V0VGltZSgpO1xufVxuXG5cbmZ1bmN0aW9uIF9jb252ZXJ0VG9BcnJheShub2RlU2V0KSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVTZXQpO1xufVxuXG5mdW5jdGlvbiBzZXRTb3VyY2VzRm9yUGljdHVyZShlbGVtZW50LCBzcmNzZXREYXRhQXR0cmlidXRlKSB7XG5cbiAgICBsZXQgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGlmIChwYXJlbnQudGFnTmFtZSAhPT0gJ1BJQ1RVUkUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgcGljdHVyZUNoaWxkID0gcGFyZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAocGljdHVyZUNoaWxkLnRhZ05hbWUgPT09ICdTT1VSQ0UnKSB7XG4gICAgICAgICAgICBsZXQgc291cmNlU3Jjc2V0ID0gcGljdHVyZUNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgc3Jjc2V0RGF0YUF0dHJpYnV0ZSk7XG4gICAgICAgICAgICBpZiAoc291cmNlU3Jjc2V0KSB7XG4gICAgICAgICAgICAgICAgcGljdHVyZUNoaWxkLnNldEF0dHJpYnV0ZSgnc3Jjc2V0Jywgc291cmNlU3Jjc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBTZXRzIHNvdXJjZXMgKGUuZy4gc3JjKSBmb3IgbGF6eSBsb2FkIGVsZW1lbnQuXG4gKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50LCB3aG9zZSBpbWFnZSB0byBiZSBsb2FkZWQuXG4gKiBAcGFyYW0gc3Jjc2V0RGF0YUF0dHJpYnV0ZVxuICogQHBhcmFtIHNyY0RhdGFBdHRyaWJ1dGVcbiAqL1xuZnVuY3Rpb24gc2V0U291cmNlcyhlbGVtZW50LCBzcmNzZXREYXRhQXR0cmlidXRlLCBzcmNEYXRhQXR0cmlidXRlKSB7XG5cbiAgICBsZXQgdGFnTmFtZSA9IGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIGxldCBlbGVtZW50U3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgc3JjRGF0YUF0dHJpYnV0ZSk7XG5cbiAgICBpZiAodGFnTmFtZSA9PT0gXCJJRlJBTUVcIiB8fCB0YWdOYW1lID09PSBcIlZJREVPXCIpIHtcblxuICAgICAgICBpZiAoZWxlbWVudFNyYykge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZWxlbWVudFNyYyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlmICh0YWdOYW1lID09PSBcIklNR1wiKSB7XG4gICAgICAgICAgICBzZXRTb3VyY2VzRm9yUGljdHVyZShlbGVtZW50LCBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhVGFyZ2V0ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXSkge1xuICAgICAgICAgICAgZGF0YVRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbWdTcmNTZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgaWYgKGltZ1NyY1NldCkge1xuICAgICAgICAgICAgZGF0YVRhcmdldC5zZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIiwgaW1nU3JjU2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50U3JjKSB7XG4gICAgICAgICAgICBkYXRhVGFyZ2V0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBlbGVtZW50U3JjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9pZiAoZWxlbWVudFNyYykgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGVsZW1lbnRTcmMgKyBcIilcIjtcbn1cblxuZnVuY3Rpb24gX2JpbmQoZm4sIG9iaikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cblxudmFyIGluc3RhbmNlQ291bnRlciA9IDA7XG52YXIgaW5zdGFuY2VzOiB7W2luc3RhbmNlSWQ6IHN0cmluZ106IExvYWRlcn0gPSB7fTtcblxuXG5leHBvcnQgY2xhc3MgTG9hZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBMYXp5TG9hZE9wdGlvbnMpIHtcblxuICAgICAgICB0aGlzLmlkID0gKCsraW5zdGFuY2VDb3VudGVyKSArIFwiXCI7XG4gICAgICAgIGluc3RhbmNlc1t0aGlzLmlkXSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcXVlcnlPcmlnaW5Ob2RlID0gdGhpcy5fb3B0aW9ucy5jb250YWluZXIgPT09IHdpbmRvdyA/IGRvY3VtZW50IDogPEhUTUxFbGVtZW50fERvY3VtZW50PnRoaXMuX29wdGlvbnMuY29udGFpbmVyO1xuXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5faGFuZGxlU2Nyb2xsRm4gPSBfYmluZCh0aGlzLmhhbmRsZVNjcm9sbCwgdGhpcyk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaWQ6IHN0cmluZztcblxuICAgIHByaXZhdGUgX29wdGlvbnM6IExhenlMb2FkT3B0aW9ucztcblxuICAgIHByaXZhdGUgX3F1ZXJ5T3JpZ2luTm9kZTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudDtcblxuICAgIHByaXZhdGUgX3ByZXZpb3VzTG9vcFRpbWU6IG51bWJlcjtcblxuICAgIHByaXZhdGUgX2xvb3BUaW1lb3V0OiBhbnk7XG5cbiAgICBwcml2YXRlIF9oYW5kbGVTY3JvbGxGbjogYW55O1xuXG4gICAgcHJpdmF0ZSBfZWxlbWVudHM6IEFycmF5PEhUTUxFbGVtZW50ICYgRXh0ZW5kZWRIdG1sRWxlbWVudD47XG5cblxuICAgIGdldCBjb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWVyeU9yaWdpbk5vZGU7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF9zaG93T25BcHBlYXIoZWxlbWVudDogSFRNTEVsZW1lbnQgJiBFeHRlbmRlZEh0bWxFbGVtZW50KSB7XG5cbiAgICAgICAgbGV0IGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBldmVudFRhcmdldCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGFsdGVybmF0ZSA9IHRoaXMuX29wdGlvbnMgJiYgdGhpcy5fb3B0aW9ucy5kYXRhQWx0ZXJuYXRlICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHRoaXMuX29wdGlvbnMuZGF0YUFsdGVybmF0ZSk7XG4gICAgICAgICAgICBpZiAoYWx0ZXJuYXRlICYmIGV2ZW50VGFyZ2V0W1wic3JjXCJdICE9IGFsdGVybmF0ZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0W1wic3JjXCJdID0gYWx0ZXJuYXRlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcblxuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcblxuICAgICAgICAgICAgZWxlbWVudC5sYXp5TG9hZEVycm9yID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRpbmcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2FsbGJhY2tFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrRXJyb3IuY2FsbGJhY2tfZXJyb3IoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvYWRDYWxsYmFjayA9ICgpID0+IHtcblxuICAgICAgICAgICAgLyogQXMgdGhpcyBtZXRob2QgaXMgYXN5bmNocm9ub3VzLCBpdCBtdXN0IGJlIHByb3RlY3RlZCBhZ2FpbnN0IGV4dGVybmFsIGRlc3Ryb3koKSBjYWxscyAqL1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMgPT09IG51bGwgfHwgdGhpcy5fb3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgZXZlbnRUYXJnZXQ6IGFueSA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIC8vIGlmIHRhcmdldCBlbGVtZW50IGlzIG5vdCA8aW1nPiwgdGhlIHJlYWwgdGFyZ2V0IG9mIG9ubG9hZCBjYWxsYmFjayBpcyB0ZW1wb3JhcnkgaW1hZ2VcbiAgICAgICAgICAgIGlmIChlbGVtZW50W1wiX19pb254TGF6eUxvYWRUbXBJbWdcIl0pIHtcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9IGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtldmVudFRhcmdldC5zcmN9KWA7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudC5sYXp5TG9hZEVycm9yID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2FsbGJhY2tMb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tMb2FkKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGluZyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiSU1HXCIgfHwgZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiSUZSQU1FXCIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIlZJREVPXCIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZG1ldGFkYXRhXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0bXBJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRtcEltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgdG1wSW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgICAgIGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXSA9IHRtcEltZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zKSB7XG4gICAgICAgICAgICBzZXRTb3VyY2VzKGVsZW1lbnQsIHRoaXMuX29wdGlvbnMuZGF0YVNyY1NldCwgdGhpcy5fb3B0aW9ucy5kYXRhU3JjKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuY2FsbGJhY2tTZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNhbGxiYWNrU2V0KGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfbG9vcFRocm91Z2hFbGVtZW50cygpIHtcblxuICAgICAgICBsZXQgZWxlbWVudHNMZW5ndGggPSAoIXRoaXMuX2VsZW1lbnRzKSA/IDAgOiB0aGlzLl9lbGVtZW50cy5sZW5ndGg7XG4gICAgICAgIGxldCBwcm9jZXNzZWRJbmRleGVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50c0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRzW2ldO1xuXG4gICAgICAgICAgICB3aGlsZSAoZWxlbWVudC5vZmZzZXRQYXJlbnQgPT09IG51bGwgJiYgdGhpcy5fb3B0aW9ucy53YWl0SW52aXNpYmxlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNsZWVwKDEwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNraXBJbnZpc2libGUgIT09IGZhbHNlICYmIChlbGVtZW50Lm9mZnNldFBhcmVudCA9PT0gbnVsbCB8fCBlbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gMCB8fCBlbGVtZW50Lm9mZnNldFdpZHRoID09PSAwKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoX2lzSW5zaWRlVmlld3BvcnQoZWxlbWVudCwgdGhpcy5fb3B0aW9ucy5jb250YWluZXIsIHRoaXMuX29wdGlvbnMudGhyZXNob2xkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dPbkFwcGVhcihlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIC8qIE1hcmtpbmcgdGhlIGVsZW1lbnQgYXMgcHJvY2Vzc2VkLiAqL1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEluZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFJlbW92aW5nIHByb2Nlc3NlZCBlbGVtZW50cyBmcm9tIHRoaXMuX2VsZW1lbnRzLiAqL1xuICAgICAgICB3aGlsZSAocHJvY2Vzc2VkSW5kZXhlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50cy5zcGxpY2UocHJvY2Vzc2VkSW5kZXhlcy5wb3AoKSwgMSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmNhbGxiYWNrUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja1Byb2Nlc3NlZCh0aGlzLl9lbGVtZW50cy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogU3RvcCBsaXN0ZW5pbmcgdG8gc2Nyb2xsIGV2ZW50IHdoZW4gMCBlbGVtZW50cyByZW1haW5zICovXG4gICAgICAgIGlmIChlbGVtZW50c0xlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIF9wdXJnZUVsZW1lbnRzKCkge1xuICAgICAgICBsZXQgZWxlbWVudHNUb1B1cmdlID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50c1tpXTtcblxuICAgICAgICAgICAgLyogSWYgdGhlIGVsZW1lbnQgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQsIHNraXAgaXQgKi9cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNUb1B1cmdlLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmluZyBlbGVtZW50cyB0byBwdXJnZSBmcm9tIHRoaXMuX2VsZW1lbnRzLiAqL1xuICAgICAgICB3aGlsZSAoZWxlbWVudHNUb1B1cmdlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRzLnNwbGljZShlbGVtZW50c1RvUHVyZ2UucG9wKCksIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX2lzSGFuZGxpbmdTY3JvbGw6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9zdGFydFNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNIYW5kbGluZ1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5faXNIYW5kbGluZ1Njcm9sbCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2Nyb2xsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX3N0b3BTY3JvbGxIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5faXNIYW5kbGluZ1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5faXNIYW5kbGluZ1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5zY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNjcm9sbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHB1YmxpYyBoYW5kbGVTY3JvbGwoKSB7XG4gICAgICAgIHZhciByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgbm93LFxuICAgICAgICAgICAgdGhyb3R0bGU7XG5cbiAgICAgICAgLy8gSUU4IGZpeCBmb3IgZGVzdHJveSgpIG1hbGZ1bmN0aW9uaW5nXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbm93ID0gX25vdygpO1xuICAgICAgICB0aHJvdHRsZSA9IHRoaXMuX29wdGlvbnMudGhyb3R0bGU7XG5cbiAgICAgICAgaWYgKHRocm90dGxlICE9PSAwKSB7XG4gICAgICAgICAgICByZW1haW5pbmdUaW1lID0gdGhyb3R0bGUgLSAobm93IC0gdGhpcy5fcHJldmlvdXNMb29wVGltZSk7XG4gICAgICAgICAgICBpZiAocmVtYWluaW5nVGltZSA8PSAwIHx8IHJlbWFpbmluZ1RpbWUgPiB0aHJvdHRsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb29wVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fbG9vcFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IHNldFRpbWVvdXQoX2JpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmV2aW91c0xvb3BUaW1lID0gX25vdygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSwgcmVtYWluaW5nVGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHVibGljIHVwZGF0ZShvcHRpb25zPzoge3JldHJ5RXJyb3I/OiBib29sZWFufSkge1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzID0gX2NvbnZlcnRUb0FycmF5KHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX29wdGlvbnMuc2VsZWN0b3IpKTtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuX2VsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgJiYgZWxlbWVudC5sYXp5TG9hZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wdXJnZUVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5fc3RhcnRTY3JvbGxIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgaWYgKHRoaXMuX2xvb3BUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3BTY3JvbGxIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcXVlcnlPcmlnaW5Ob2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgZGVsZXRlIGluc3RhbmNlc1t0aGlzLmlkXTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZUxhenlMb2FkKHJvb3Q6IEhUTUxFbGVtZW50LCBvcHRpb25zPzoge3JldHJ5RXJyb3I/OiBib29sZWFufSkge1xuXG4gICAgZm9yIChsZXQgaW5zdGFuY2VJZCBpbiBpbnN0YW5jZXMpIHtcbiAgICAgICAgbGV0IGxvYWRlcjogTG9hZGVyID0gaW5zdGFuY2VzW2luc3RhbmNlSWRdO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gbG9hZGVyLmNvbnRhaW5lcjtcblxuICAgICAgICBpZiAocm9vdCA9PT0gY29udGFpbmVyKSB7XG4gICAgICAgICAgICBsb2FkZXIudXBkYXRlKHtyZXRyeUVycm9yOiBvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcn0pO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gcm9vdCkge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLnVwZGF0ZSh7cmV0cnlFcnJvcjogb3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3J9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5pbnRlcmZhY2UgRXh0ZW5kZWRIdG1sRWxlbWVudCB7XG4gICAgbGF6eUxvYWRQcm9jZXNzZWQ/OiBib29sZWFuO1xuICAgIGxhenlMb2FkRXJyb3I/OiBib29sZWFuO1xufVxuIl19