import { LazyLoadOptions } from "./lazy-load-options";

const defaultOptions: LazyLoadOptions = {
    selector: "img",
    container: window,
    threshold: 300,
    throttle: 150,
    dataSrc: "original",
    dataSrcSet: "original-set",
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
        } else {
            fold = _getTopOffset(container) + container.offsetHeight;
        }
        return fold <= _getTopOffset(element) - threshold;
    }

    function _isAtRightOfViewport() {
        var fold;
        if (container === window) {
            fold = _getDocumentWidth() + window.pageXOffset;
        } else {
            fold = _getLeftOffset(container) + _getDocumentWidth();
        }
        return fold <= _getLeftOffset(element) - threshold;
    }

    function _isAboveViewport() {
        var fold;
        if (container === window) {
            fold = documentTop;
        } else {
            fold = _getTopOffset(container);
        }
        return fold >= _getTopOffset(element) + threshold + element.offsetHeight;
    }

    function _isAtLeftOfViewport() {
        var fold;
        if (container === window) {
            fold = documentLeft;
        } else {
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

function _setSourcesForPicture(element, srcsetDataAttribute) {
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

function _setSources(element, srcsetDataAttribute, srcDataAttribute) {
    let tagName = element.tagName.toUpperCase();
    let elementSrc = element.getAttribute('data-' + srcDataAttribute);
    if (tagName === "IFRAME") {
        if (elementSrc) element.setAttribute("src", elementSrc);
        return;
    } else {
        
        if (tagName === "IMG") {
            _setSourcesForPicture(element, srcsetDataAttribute);
        }

        let dataTarget = element;
        if (element["__ionxLazyImageTmpImg"]) {
            dataTarget = element["__ionxLazyImageTmpImg"];
        }

        var imgSrcset = element.getAttribute('data-' + srcsetDataAttribute);
        if (imgSrcset) dataTarget.setAttribute("srcset", imgSrcset);
        if (elementSrc) dataTarget.setAttribute("src", elementSrc);

        return;
    }
    //if (elementSrc) element.style.backgroundImage = "url(" + elementSrc + ")";
}

function _bind(fn, obj) {
    return function () {
        return fn.apply(obj, arguments);
    };
}

export class LazyLoad {

    constructor(options?: LazyLoadOptions) {

        this._options = Object.assign({}, defaultOptions, options);
        this._queryOriginNode = this._options.container === window ? document : <HTMLElement|Document>this._options.container;

        this._previousLoopTime = 0;
        this._loopTimeout = null;

        this._handleScrollFn = _bind(this.handleScroll, this);

        window.addEventListener("resize", this._handleScrollFn);
        this.update();
    }

    private _options: LazyLoadOptions;

    private _queryOriginNode: HTMLElement | Document;

    private _previousLoopTime: number;

    private _loopTimeout: any;

    private _handleScrollFn: any;

    private _elements: any;


    private _showOnAppear(element: HTMLElement) {

        let errorCallback = () => {

            let eventTarget = element;

            if (element["__ionxLazyImageTmpImg"]) {
                eventTarget = element["__ionxLazyImageTmpImg"];
                delete element["__ionxLazyImageTmpImg"];
            }

            eventTarget.removeEventListener("load", loadCallback);
            eventTarget.removeEventListener("error", errorCallback);
            element.classList.remove(this._options.classLoading);

            if (this._options.callbackError) {
                this._options.callbackError.callback_error(element);
            }
        }

        let loadCallback = () => {

            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (this._options === null) {
                return;
            }
            
            let eventTarget: any = element;

            if (element["__ionxLazyImageTmpImg"]) {
                eventTarget = element["__ionxLazyImageTmpImg"];
                element.style.backgroundImage = `url(${eventTarget.src})`;
                delete element["__ionxLazyImageTmpImg"];
            }

            if (this._options.callbackLoad) {
                this._options.callbackLoad(element);
            }

            element.classList.remove(this._options.classLoading);
            element.classList.add(this._options.classLoaded);
            eventTarget.removeEventListener("load", loadCallback);
            eventTarget.removeEventListener("error", errorCallback);
        }

        element.classList.add(this._options.classLoading);

        if (element.tagName.toUpperCase() === "IMG" || element.tagName.toUpperCase() === "IFRAME") {
            element.addEventListener("load", loadCallback);
            element.addEventListener("error", errorCallback);
        } else {
            let tmpImg = new Image();
            tmpImg.addEventListener("load", loadCallback);
            tmpImg.addEventListener("error", errorCallback);
            element["__ionxLazyImageTmpImg"] = tmpImg;
        }

        _setSources(element, this._options.dataSrcSet, this._options.dataSrc);

        if (this._options.callbackSet) {
            this._options.callbackSet(element);
        }
    }

    private _loopThroughElements() {
        
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
                element.wasProcessed = true;
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

    private _purgeElements() {
        let elementsToPurge = [];

        for (let i = 0; i < this._elements.length; i++) {
            let element = this._elements[i];

            /* If the element has already been processed, skip it */
            if (element.wasProcessed) {
                elementsToPurge.push(i);
            }
        }

        /* Removing elements to purge from this._elements. */
        while (elementsToPurge.length > 0) {
            this._elements.splice(elementsToPurge.pop(), 1);
        }
    };

    private _isHandlingScroll: boolean;

    private _startScrollHandler() {
        if (!this._isHandlingScroll) {
            this._isHandlingScroll = true;
            this._options.container.addEventListener("scroll", this._handleScrollFn);
        }
    };

    private _stopScrollHandler() {
        if (this._isHandlingScroll) {
            this._isHandlingScroll = false;
            this._options.container.removeEventListener("scroll", this._handleScrollFn);
        }
    };


    public handleScroll() {
        var remainingTime,
            now,
            throttle;

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
            } else if (!this._loopTimeout) {
                this._loopTimeout = setTimeout(_bind(function () {
                    this._previousLoopTime = _now();
                    this._loopTimeout = null;
                    this._loopThroughElements();
                }, this), remainingTime);
            }
        } else {
            this._loopThroughElements();
        }
    };

    public update() {
        this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._options.selector));
        this._purgeElements();
        this._loopThroughElements();
        this._startScrollHandler();
    }

    public destroy() {
        window.removeEventListener("resize", this._handleScrollFn);
        if (this._loopTimeout) {
            clearTimeout(this._loopTimeout);
            this._loopTimeout = null;
        }
        this._stopScrollHandler();
        this._elements = null;
        this._queryOriginNode = null;
        this._options = null;
    }

}