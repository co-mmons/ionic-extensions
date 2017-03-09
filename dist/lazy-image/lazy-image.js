import { Directive, Input, ContentChildren, ElementRef, Renderer, Optional, Inject, forwardRef } from "@angular/core";
import { Content, Scroll } from "ionic-angular";
import { LazyLoad } from "./lazy-load";
export var LazyImage = (function () {
    function LazyImage(element, renderer, container) {
        this.element = element;
        this.renderer = renderer;
        this.container = container;
    }
    Object.defineProperty(LazyImage.prototype, "src", {
        set: function (value) {
            this._src = value;
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    LazyImage.prototype.reset = function () {
        if (this._src) {
            this.renderer.setElementClass(this.element.nativeElement, "ionx-lazy-image", true);
            this.renderer.setElementAttribute(this.element.nativeElement, "data-original", this._src);
        }
    };
    LazyImage.prototype.revalidate = function () {
        // children.length > 1 because this is also included in children query
        if (this.container && this.children.length > 1) {
            this.container.revalidate();
        }
    };
    LazyImage.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.children.changes.subscribe(function () { return _this.revalidate(); });
        this.revalidate();
    };
    LazyImage.decorators = [
        { type: Directive, args: [{
                    selector: "[ionx-lazy-image]"
                },] },
    ];
    /** @nocollapse */
    LazyImage.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
        { type: LazyImageContainer, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(function () { return LazyImageContainer; }),] },] },
    ]; };
    LazyImage.propDecorators = {
        'children': [{ type: ContentChildren, args: [LazyImage, { descendants: true },] },],
        'src': [{ type: Input, args: ["ionx-lazy-image",] },],
    };
    return LazyImage;
}());
export var LazyImageContainer = (function () {
    function LazyImageContainer(element, ionContent, ionScroll) {
        this.element = element;
        this.ionContent = ionContent;
        this.ionScroll = ionScroll;
    }
    LazyImageContainer.prototype.revalidate = function () {
        this.lazyLoad.update();
        var rect = this.element.nativeElement.getBoundingClientRect();
        if (rect.width == 0 || rect.height == 0) {
        }
        //console.log(this.children);
        //window.dispatchEvent(new Event("resize"));   
    };
    LazyImageContainer.prototype.ngOnInit = function () {
        this.lazyLoad = this.newLazyLoad();
    };
    LazyImageContainer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.children.changes.subscribe(function () { return _this.revalidate(); });
        if (this.children.length > 0) {
            this.revalidate();
        }
    };
    LazyImageContainer.prototype.ngOnDestroy = function () {
        if (this.lazyLoad) {
            this.lazyLoad.destroy();
        }
    };
    LazyImageContainer.prototype.newLazyLoad = function () {
        var options = {};
        options.selector = ".ionx-lazy-image";
        if (this.ionContent) {
            options.container = this.ionContent.getScrollElement();
        }
        return new LazyLoad(options);
    };
    LazyImageContainer.decorators = [
        { type: Directive, args: [{
                    selector: "ion-content[ionx-lazy-image], ion-scroll[ionx-lazy-image], [ionx-lazy-image-container]"
                },] },
    ];
    /** @nocollapse */
    LazyImageContainer.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Content, decorators: [{ type: Optional },] },
        { type: Scroll, decorators: [{ type: Optional },] },
    ]; };
    LazyImageContainer.propDecorators = {
        'children': [{ type: ContentChildren, args: [LazyImage, { descendants: true },] },],
    };
    return LazyImageContainer;
}());
//# sourceMappingURL=lazy-image.js.map