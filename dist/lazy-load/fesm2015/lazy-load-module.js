import { Directive, ElementRef, Input, ContentChildren, forwardRef, Renderer2, Optional, Inject, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
import { sleep } from '@co.mmons/js-utils/core';

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
class Loader {
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
function ensureLazyLoad(root, options) {
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

class LazyLoadContainer {
    constructor(element) {
        this.element = element;
    }
    revalidate() {
        if (this.loader) {
            this.loader.update();
            let rect = this.element.nativeElement.getBoundingClientRect();
            if (rect.width == 0 || rect.height == 0) {
                //setTimeout(() => this.revalidate(), 200);
            }
            //console.log(this.children);
            //window.dispatchEvent(new Event("resize"));
        }
    }
    ngOnInit() {
        this.init();
    }
    ngAfterContentInit() {
        this.children.changes.subscribe(() => this.revalidate());
        if (this.children.length > 0) {
            this.revalidate();
        }
    }
    ngOnDestroy() {
        if (this.loader) {
            this.loader.destroy();
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = Object.assign({
                selector: ".ionx-lazy-load",
                container: this.element.nativeElement
            }, this.options);
            if (this.element.nativeElement.tagName.toLowerCase() === "ion-content") {
                for (let i = 0; i < 40; i++) {
                    options.scroll = this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".inner-scroll");
                    if (!options.scroll) {
                        yield sleep(50);
                    }
                    else {
                        break;
                    }
                }
            }
            this.loader = new Loader(options);
        });
    }
}
LazyLoadContainer.decorators = [
    { type: Directive, args: [{
                selector: "[ionx-lazy-load-container]"
            },] }
];
LazyLoadContainer.ctorParameters = () => [
    { type: ElementRef }
];
LazyLoadContainer.propDecorators = {
    options: [{ type: Input, args: ["ionx-lazy-load-container",] }],
    children: [{ type: ContentChildren, args: [forwardRef(() => LazyDirectives), { descendants: true },] }]
};
class LazyDirectives {
    constructor(element, renderer, container) {
        this.element = element;
        this.renderer = renderer;
        this.container = container;
    }
    set src(value) {
        this._src = value;
        this.reset();
    }
    set alternate(value) {
        this._alternate = value;
        this.reset();
    }
    reset() {
        if (this._src) {
            this.renderer.addClass(this.element.nativeElement, "ionx-lazy-load");
            this.renderer.setAttribute(this.element.nativeElement, "data-original", this._src);
        }
        if (this._alternate) {
            this.renderer.setAttribute(this.element.nativeElement, "data-alternate", this._alternate);
        }
    }
    revalidate() {
        if (this.container && this.children.length > 0) {
            this.container.revalidate();
        }
    }
    ngAfterContentInit() {
        this.children.changes.subscribe(() => this.revalidate());
        this.revalidate();
    }
}
LazyDirectives.decorators = [
    { type: Directive, args: [{
                selector: "[ionx-lazy-load]"
            },] }
];
LazyDirectives.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: LazyLoadContainer, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => LazyLoadContainer),] }] }
];
LazyDirectives.propDecorators = {
    children: [{ type: ContentChildren, args: [LazyDirectives, { descendants: true },] }],
    src: [{ type: Input, args: ["ionx-lazy-load",] }],
    alternate: [{ type: Input, args: ["ionx-lazy-load-alternate",] }]
};

class LazyLoadModule {
}
LazyLoadModule.decorators = [
    { type: NgModule, args: [{
                declarations: [LazyDirectives, LazyLoadContainer],
                exports: [LazyDirectives, LazyLoadContainer]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { LazyDirectives, LazyLoadContainer, LazyLoadModule, ensureLazyLoad };
//# sourceMappingURL=lazy-load-module.js.map
