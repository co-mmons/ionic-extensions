import { Directive, Input, ContentChildren, QueryList, ElementRef, Renderer, Optional, Inject, forwardRef } from "@angular/core";
import { LazyLoad } from "./lazy-load";
var LazyImage = /** @class */ (function () {
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
    return LazyImage;
}());
export { LazyImage };
var LazyImageContainer = /** @class */ (function () {
    function LazyImageContainer(element) {
        this.element = element;
    }
    LazyImageContainer.prototype.revalidate = function () {
        this.lazyLoad.update();
        var rect = this.element.nativeElement.getBoundingClientRect();
        if (rect.width == 0 || rect.height == 0) {
            //setTimeout(() => this.revalidate(), 200);
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
        var scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content");
        if (scrollContent.length) {
            options.container = scrollContent.item(0);
        }
        else {
            options.container = this.element.nativeElement;
        }
        return new LazyLoad(options);
    };
    return LazyImageContainer;
}());
export { LazyImageContainer };
//# sourceMappingURL=lazy-image.js.map