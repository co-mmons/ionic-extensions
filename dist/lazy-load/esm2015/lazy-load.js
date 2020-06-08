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
            let elements = (this._elements || []).slice();
            let shownCount = 0;
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                if (element.lazyLoadProcessed) {
                    continue;
                }
                while (element.offsetParent === null && this._options.waitInvisible !== false) {
                    yield sleep(100);
                }
                if (element.lazyLoadProcessed) {
                    continue;
                }
                if (this._options.skipInvisible !== false && (element.offsetParent === null || element.offsetHeight === 0 || element.offsetWidth === 0)) {
                    continue;
                }
                if (_isInsideViewport(element, this._options.container, this._options.threshold)) {
                    this._showOnAppear(element);
                    shownCount++;
                    element.lazyLoadProcessed = true;
                }
            }
            for (let i = (this._elements || []).length - 1; i >= 0; i--) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1sb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFHOUMsTUFBTSxjQUFjLEdBQW9CO0lBQ3BDLFFBQVEsRUFBRSxLQUFLO0lBQ2YsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLElBQUk7SUFDWixTQUFTLEVBQUUsR0FBRztJQUNkLFFBQVEsRUFBRSxHQUFHO0lBQ2IsT0FBTyxFQUFFLFVBQVU7SUFDbkIsVUFBVSxFQUFFLGNBQWM7SUFDMUIsYUFBYSxFQUFFLFdBQVc7SUFDMUIsWUFBWSxFQUFFLHlCQUF5QjtJQUN2QyxXQUFXLEVBQUUsd0JBQXdCO0lBQ3JDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLElBQUk7Q0FDMUIsQ0FBQztBQUVGLFNBQVMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTO0lBRXBELElBQUksYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7SUFFN0MsU0FBUyxpQkFBaUI7UUFDdEIsT0FBTyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsU0FBUyxrQkFBa0I7UUFDdkIsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsU0FBUyxhQUFhLENB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SSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQzthQUM5RDtpQkFBTTtnQkFFSCxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDO2dCQUNyQyxPQUFPLE1BQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUM5QixNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztpQkFDakM7Z0JBRUQsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7aUJBQzlEO2FBQ0o7U0FDSjtJQUNMLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtMYXp5TG9hZE9wdGlvbnN9IGZyb20gXCIuL2xhenktbG9hZC1vcHRpb25zXCI7XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBMYXp5TG9hZE9wdGlvbnMgPSB7XG4gICAgc2VsZWN0b3I6IFwiaW1nXCIsXG4gICAgY29udGFpbmVyOiB3aW5kb3csXG4gICAgc2Nyb2xsOiBudWxsLFxuICAgIHRocmVzaG9sZDogMzAwLFxuICAgIHRocm90dGxlOiAxNTAsXG4gICAgZGF0YVNyYzogXCJvcmlnaW5hbFwiLFxuICAgIGRhdGFTcmNTZXQ6IFwib3JpZ2luYWwtc2V0XCIsXG4gICAgZGF0YUFsdGVybmF0ZTogXCJhbHRlcm5hdGVcIixcbiAgICBjbGFzc0xvYWRpbmc6IFwiaW9ueC1sYXp5LWltYWdlLWxvYWRpbmdcIixcbiAgICBjbGFzc0xvYWRlZDogXCJpb254LWxhenktaW1hZ2UtbG9hZGVkXCIsXG4gICAgc2tpcEludmlzaWJsZTogdHJ1ZSxcbiAgICBjYWxsYmFja0xvYWQ6IG51bGwsXG4gICAgY2FsbGJhY2tFcnJvcjogbnVsbCxcbiAgICBjYWxsYmFja1NldDogbnVsbCxcbiAgICBjYWxsYmFja1Byb2Nlc3NlZDogbnVsbFxufTtcblxuZnVuY3Rpb24gX2lzSW5zaWRlVmlld3BvcnQoZWxlbWVudCwgY29udGFpbmVyLCB0aHJlc2hvbGQpIHtcblxuICAgIGxldCBvd25lckRvY3VtZW50LCBkb2N1bWVudFRvcCwgZG9jdW1lbnRMZWZ0O1xuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCB8fCAob3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2dldERvY3VtZW50SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IHx8IChvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9nZXRUb3BPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBkb2N1bWVudFRvcCAtIG93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfZ2V0TGVmdE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBkb2N1bWVudExlZnQgLSBvd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9pc0JlbG93Vmlld3BvcnQoKSB7XG4gICAgICAgIHZhciBmb2xkO1xuICAgICAgICBpZiAoY29udGFpbmVyID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0RG9jdW1lbnRIZWlnaHQoKSArIGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKSArIGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldFRvcE9mZnNldChlbGVtZW50KSAtIHRocmVzaG9sZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfaXNBdFJpZ2h0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXREb2N1bWVudFdpZHRoKCkgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb2xkID0gX2dldExlZnRPZmZzZXQoY29udGFpbmVyKSArIF9nZXREb2N1bWVudFdpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvbGQgPD0gX2dldExlZnRPZmZzZXQoZWxlbWVudCkgLSB0aHJlc2hvbGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQWJvdmVWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9sZCA9IF9nZXRUb3BPZmZzZXQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9sZCA+PSBfZ2V0VG9wT2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpIHtcbiAgICAgICAgdmFyIGZvbGQ7XG4gICAgICAgIGlmIChjb250YWluZXIgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgZm9sZCA9IGRvY3VtZW50TGVmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvbGQgPSBfZ2V0TGVmdE9mZnNldChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkID49IF9nZXRMZWZ0T2Zmc2V0KGVsZW1lbnQpICsgdGhyZXNob2xkICsgZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB9XG5cbiAgICBvd25lckRvY3VtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgIGRvY3VtZW50VG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgZG9jdW1lbnRMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IG93bmVyRG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXG4gICAgcmV0dXJuICFfaXNCZWxvd1ZpZXdwb3J0KCkgJiYgIV9pc0Fib3ZlVmlld3BvcnQoKSAmJiAhX2lzQXRSaWdodE9mVmlld3BvcnQoKSAmJiAhX2lzQXRMZWZ0T2ZWaWV3cG9ydCgpO1xufVxuXG5mdW5jdGlvbiBfbm93KCkge1xuICAgIHZhciBkID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gZC5nZXRUaW1lKCk7XG59XG5cblxuZnVuY3Rpb24gX2NvbnZlcnRUb0FycmF5KG5vZGVTZXQpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZVNldCk7XG59XG5cbmZ1bmN0aW9uIHNldFNvdXJjZXNGb3JQaWN0dXJlKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUpIHtcblxuICAgIGxldCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudC50YWdOYW1lICE9PSAnUElDVFVSRScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBwaWN0dXJlQ2hpbGQgPSBwYXJlbnQuY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChwaWN0dXJlQ2hpbGQudGFnTmFtZSA9PT0gJ1NPVVJDRScpIHtcbiAgICAgICAgICAgIGxldCBzb3VyY2VTcmNzZXQgPSBwaWN0dXJlQ2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBzcmNzZXREYXRhQXR0cmlidXRlKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VTcmNzZXQpIHtcbiAgICAgICAgICAgICAgICBwaWN0dXJlQ2hpbGQuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFNldHMgc291cmNlcyAoZS5nLiBzcmMpIGZvciBsYXp5IGxvYWQgZWxlbWVudC5cbiAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQsIHdob3NlIGltYWdlIHRvIGJlIGxvYWRlZC5cbiAqIEBwYXJhbSBzcmNzZXREYXRhQXR0cmlidXRlXG4gKiBAcGFyYW0gc3JjRGF0YUF0dHJpYnV0ZVxuICovXG5mdW5jdGlvbiBzZXRTb3VyY2VzKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUsIHNyY0RhdGFBdHRyaWJ1dGUpIHtcblxuICAgIGxldCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgbGV0IGVsZW1lbnRTcmMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBzcmNEYXRhQXR0cmlidXRlKTtcblxuICAgIGlmICh0YWdOYW1lID09PSBcIklGUkFNRVwiIHx8IHRhZ05hbWUgPT09IFwiVklERU9cIikge1xuXG4gICAgICAgIGlmIChlbGVtZW50U3JjKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBlbGVtZW50U3JjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWYgKHRhZ05hbWUgPT09IFwiSU1HXCIpIHtcbiAgICAgICAgICAgIHNldFNvdXJjZXNGb3JQaWN0dXJlKGVsZW1lbnQsIHNyY3NldERhdGFBdHRyaWJ1dGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGFUYXJnZXQgPSBlbGVtZW50O1xuICAgICAgICBpZiAoZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdKSB7XG4gICAgICAgICAgICBkYXRhVGFyZ2V0ID0gZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGltZ1NyY1NldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHNyY3NldERhdGFBdHRyaWJ1dGUpO1xuICAgICAgICBpZiAoaW1nU3JjU2V0KSB7XG4gICAgICAgICAgICBkYXRhVGFyZ2V0LnNldEF0dHJpYnV0ZShcInNyY3NldFwiLCBpbWdTcmNTZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnRTcmMpIHtcbiAgICAgICAgICAgIGRhdGFUYXJnZXQuc2V0QXR0cmlidXRlKFwic3JjXCIsIGVsZW1lbnRTcmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvL2lmIChlbGVtZW50U3JjKSBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiICsgZWxlbWVudFNyYyArIFwiKVwiO1xufVxuXG5mdW5jdGlvbiBfYmluZChmbiwgb2JqKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG9iaiwgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG52YXIgaW5zdGFuY2VDb3VudGVyID0gMDtcbnZhciBpbnN0YW5jZXM6IHtbaW5zdGFuY2VJZDogc3RyaW5nXTogTG9hZGVyfSA9IHt9O1xuXG5cbmV4cG9ydCBjbGFzcyBMb2FkZXIge1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IExhenlMb2FkT3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuaWQgPSAoKytpbnN0YW5jZUNvdW50ZXIpICsgXCJcIjtcbiAgICAgICAgaW5zdGFuY2VzW3RoaXMuaWRdID0gdGhpcztcblxuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9xdWVyeU9yaWdpbk5vZGUgPSB0aGlzLl9vcHRpb25zLmNvbnRhaW5lciA9PT0gd2luZG93ID8gZG9jdW1lbnQgOiA8SFRNTEVsZW1lbnR8RG9jdW1lbnQ+dGhpcy5fb3B0aW9ucy5jb250YWluZXI7XG5cbiAgICAgICAgdGhpcy5fcHJldmlvdXNMb29wVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2xvb3BUaW1lb3V0ID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9oYW5kbGVTY3JvbGxGbiA9IF9iaW5kKHRoaXMuaGFuZGxlU2Nyb2xsLCB0aGlzKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpZDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogTGF6eUxvYWRPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBfcXVlcnlPcmlnaW5Ob2RlOiBIVE1MRWxlbWVudCB8IERvY3VtZW50O1xuXG4gICAgcHJpdmF0ZSBfcHJldmlvdXNMb29wVGltZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBfbG9vcFRpbWVvdXQ6IGFueTtcblxuICAgIHByaXZhdGUgX2hhbmRsZVNjcm9sbEZuOiBhbnk7XG5cbiAgICBwcml2YXRlIF9lbGVtZW50czogQXJyYXk8SFRNTEVsZW1lbnQgJiBFeHRlbmRlZEh0bWxFbGVtZW50PjtcblxuXG4gICAgZ2V0IGNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IERvY3VtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX3Nob3dPbkFwcGVhcihlbGVtZW50OiBIVE1MRWxlbWVudCAmIEV4dGVuZGVkSHRtbEVsZW1lbnQpIHtcblxuICAgICAgICBsZXQgZXJyb3JDYWxsYmFjayA9ICgpID0+IHtcblxuICAgICAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gZWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgYWx0ZXJuYXRlID0gdGhpcy5fb3B0aW9ucyAmJiB0aGlzLl9vcHRpb25zLmRhdGFBbHRlcm5hdGUgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsgdGhpcy5fb3B0aW9ucy5kYXRhQWx0ZXJuYXRlKTtcbiAgICAgICAgICAgIGlmIChhbHRlcm5hdGUgJiYgZXZlbnRUYXJnZXRbXCJzcmNcIl0gIT0gYWx0ZXJuYXRlKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRUYXJnZXRbXCJzcmNcIl0gPSBhbHRlcm5hdGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuXG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkRXJyb3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9vcHRpb25zLmNsYXNzTG9hZGluZyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tFcnJvci5jYWxsYmFja19lcnJvcihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAvKiBBcyB0aGlzIG1ldGhvZCBpcyBhc3luY2hyb25vdXMsIGl0IG11c3QgYmUgcHJvdGVjdGVkIGFnYWluc3QgZXh0ZXJuYWwgZGVzdHJveSgpIGNhbGxzICovXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucyA9PT0gbnVsbCB8fCB0aGlzLl9vcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBldmVudFRhcmdldDogYW55ID0gZWxlbWVudDtcblxuICAgICAgICAgICAgLy8gaWYgdGFyZ2V0IGVsZW1lbnQgaXMgbm90IDxpbWc+LCB0aGUgcmVhbCB0YXJnZXQgb2Ygb25sb2FkIGNhbGxiYWNrIGlzIHRlbXBvcmFyeSBpbWFnZVxuICAgICAgICAgICAgaWYgKGVsZW1lbnRbXCJfX2lvbnhMYXp5TG9hZFRtcEltZ1wiXSkge1xuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0ID0gZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2V2ZW50VGFyZ2V0LnNyY30pYDtcbiAgICAgICAgICAgICAgICBkZWxldGUgZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkRXJyb3IgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja0xvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja0xvYWQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fb3B0aW9ucy5jbGFzc0xvYWRlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX29wdGlvbnMuY2xhc3NMb2FkaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJTUdcIiB8fCBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJRlJBTUVcIikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBsb2FkQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiVklERU9cIikge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwgbG9hZENhbGxiYWNrKTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRtcEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdG1wSW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGxvYWRDYWxsYmFjayk7XG4gICAgICAgICAgICB0bXBJbWcuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICAgICAgZWxlbWVudFtcIl9faW9ueExhenlMb2FkVG1wSW1nXCJdID0gdG1wSW1nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgIHNldFNvdXJjZXMoZWxlbWVudCwgdGhpcy5fb3B0aW9ucy5kYXRhU3JjU2V0LCB0aGlzLl9vcHRpb25zLmRhdGFTcmMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja1NldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuY2FsbGJhY2tTZXQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9sb29wVGhyb3VnaEVsZW1lbnRzKCkge1xuXG4gICAgICAgIGxldCBlbGVtZW50cyA9ICh0aGlzLl9lbGVtZW50cyB8fCBbXSkuc2xpY2UoKTtcbiAgICAgICAgbGV0IHNob3duQ291bnQgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50Lm9mZnNldFBhcmVudCA9PT0gbnVsbCAmJiB0aGlzLl9vcHRpb25zLndhaXRJbnZpc2libGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoMTAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuc2tpcEludmlzaWJsZSAhPT0gZmFsc2UgJiYgKGVsZW1lbnQub2Zmc2V0UGFyZW50ID09PSBudWxsIHx8IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ID09PSAwIHx8IGVsZW1lbnQub2Zmc2V0V2lkdGggPT09IDApKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfaXNJbnNpZGVWaWV3cG9ydChlbGVtZW50LCB0aGlzLl9vcHRpb25zLmNvbnRhaW5lciwgdGhpcy5fb3B0aW9ucy50aHJlc2hvbGQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd09uQXBwZWFyKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHNob3duQ291bnQrKztcbiAgICAgICAgICAgICAgICBlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAodGhpcy5fZWxlbWVudHMgfHwgW10pLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZWxlbWVudHNbaV0ubGF6eUxvYWRQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5jYWxsYmFja1Byb2Nlc3NlZCAmJiBzaG93bkNvdW50ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jYWxsYmFja1Byb2Nlc3NlZChzaG93bkNvdW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFN0b3AgbGlzdGVuaW5nIHRvIHNjcm9sbCBldmVudCB3aGVuIDAgZWxlbWVudHMgcmVtYWlucyAqL1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRzIHx8IHRoaXMuX2VsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RvcFNjcm9sbEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIF9wdXJnZUVsZW1lbnRzKCkge1xuICAgICAgICBsZXQgZWxlbWVudHNUb1B1cmdlID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50c1tpXTtcblxuICAgICAgICAgICAgLyogSWYgdGhlIGVsZW1lbnQgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQsIHNraXAgaXQgKi9cbiAgICAgICAgICAgIGlmIChlbGVtZW50LmxhenlMb2FkUHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNUb1B1cmdlLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmluZyBlbGVtZW50cyB0byBwdXJnZSBmcm9tIHRoaXMuX2VsZW1lbnRzLiAqL1xuICAgICAgICB3aGlsZSAoZWxlbWVudHNUb1B1cmdlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRzLnNwbGljZShlbGVtZW50c1RvUHVyZ2UucG9wKCksIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX2lzSGFuZGxpbmdTY3JvbGw6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9zdGFydFNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNIYW5kbGluZ1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5faXNIYW5kbGluZ1Njcm9sbCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2Nyb2xsLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5faGFuZGxlU2Nyb2xsRm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgX3N0b3BTY3JvbGxIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5faXNIYW5kbGluZ1Njcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5faXNIYW5kbGluZ1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLl9oYW5kbGVTY3JvbGxGbik7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5zY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNjcm9sbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHB1YmxpYyBoYW5kbGVTY3JvbGwoKSB7XG4gICAgICAgIHZhciByZW1haW5pbmdUaW1lLFxuICAgICAgICAgICAgbm93LFxuICAgICAgICAgICAgdGhyb3R0bGU7XG5cbiAgICAgICAgLy8gSUU4IGZpeCBmb3IgZGVzdHJveSgpIG1hbGZ1bmN0aW9uaW5nXG4gICAgICAgIGlmICghdGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbm93ID0gX25vdygpO1xuICAgICAgICB0aHJvdHRsZSA9IHRoaXMuX29wdGlvbnMudGhyb3R0bGU7XG5cbiAgICAgICAgaWYgKHRocm90dGxlICE9PSAwKSB7XG4gICAgICAgICAgICByZW1haW5pbmdUaW1lID0gdGhyb3R0bGUgLSAobm93IC0gdGhpcy5fcHJldmlvdXNMb29wVGltZSk7XG4gICAgICAgICAgICBpZiAocmVtYWluaW5nVGltZSA8PSAwIHx8IHJlbWFpbmluZ1RpbWUgPiB0aHJvdHRsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb29wVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTG9vcFRpbWUgPSBub3c7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9vcFRocm91Z2hFbGVtZW50cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fbG9vcFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IHNldFRpbWVvdXQoX2JpbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcmV2aW91c0xvb3BUaW1lID0gX25vdygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29wVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSwgcmVtYWluaW5nVGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sb29wVGhyb3VnaEVsZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHVibGljIHVwZGF0ZShvcHRpb25zPzoge3JldHJ5RXJyb3I/OiBib29sZWFufSkge1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzID0gX2NvbnZlcnRUb0FycmF5KHRoaXMuX3F1ZXJ5T3JpZ2luTm9kZS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX29wdGlvbnMuc2VsZWN0b3IpKTtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuX2VsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgJiYgZWxlbWVudC5sYXp5TG9hZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubGF6eUxvYWRQcm9jZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wdXJnZUVsZW1lbnRzKCk7XG4gICAgICAgIHRoaXMuX2xvb3BUaHJvdWdoRWxlbWVudHMoKTtcbiAgICAgICAgdGhpcy5fc3RhcnRTY3JvbGxIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuX2hhbmRsZVNjcm9sbEZuKTtcbiAgICAgICAgaWYgKHRoaXMuX2xvb3BUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fbG9vcFRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5fbG9vcFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3BTY3JvbGxIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMuX2VsZW1lbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcXVlcnlPcmlnaW5Ob2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgZGVsZXRlIGluc3RhbmNlc1t0aGlzLmlkXTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZUxhenlMb2FkKHJvb3Q6IEhUTUxFbGVtZW50LCBvcHRpb25zPzoge3JldHJ5RXJyb3I/OiBib29sZWFufSkge1xuXG4gICAgZm9yIChsZXQgaW5zdGFuY2VJZCBpbiBpbnN0YW5jZXMpIHtcbiAgICAgICAgbGV0IGxvYWRlcjogTG9hZGVyID0gaW5zdGFuY2VzW2luc3RhbmNlSWRdO1xuICAgICAgICBsZXQgY29udGFpbmVyID0gbG9hZGVyLmNvbnRhaW5lcjtcblxuICAgICAgICBpZiAocm9vdCA9PT0gY29udGFpbmVyKSB7XG4gICAgICAgICAgICBsb2FkZXIudXBkYXRlKHtyZXRyeUVycm9yOiBvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcn0pO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gcm9vdCkge1xuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgbG9hZGVyLnVwZGF0ZSh7cmV0cnlFcnJvcjogb3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3J9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5pbnRlcmZhY2UgRXh0ZW5kZWRIdG1sRWxlbWVudCB7XG4gICAgbGF6eUxvYWRQcm9jZXNzZWQ/OiBib29sZWFuO1xuICAgIGxhenlMb2FkRXJyb3I/OiBib29sZWFuO1xufVxuIl19