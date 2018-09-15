var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, Input, ContentChildren, QueryList, ElementRef, Renderer, Optional, Inject, forwardRef } from "@angular/core";
import { LazyLoad } from "./lazy-load";
var LazyImage = /** @class */ (function () {
    function LazyImage(element, renderer, container) {
        this.element = element;
        this.renderer = renderer;
        this.container = container;
    }
    LazyImage_1 = LazyImage;
    Object.defineProperty(LazyImage.prototype, "src", {
        set: function (value) {
            this._src = value;
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyImage.prototype, "alternate", {
        set: function (value) {
            this._alternate = value;
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
        if (this._alternate) {
            this.renderer.setElementAttribute(this.element.nativeElement, "data-alternate", this._alternate);
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
    var LazyImage_1;
    __decorate([
        ContentChildren(LazyImage_1, { descendants: true }),
        __metadata("design:type", QueryList)
    ], LazyImage.prototype, "children", void 0);
    __decorate([
        Input("ionx-lazy-image"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], LazyImage.prototype, "src", null);
    __decorate([
        Input("ionx-lazy-image-alternate"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], LazyImage.prototype, "alternate", null);
    LazyImage = LazyImage_1 = __decorate([
        Directive({
            selector: "[ionx-lazy-image]"
        }),
        __param(2, Optional()), __param(2, Inject(forwardRef(function () { return LazyImageContainer; }))),
        __metadata("design:paramtypes", [ElementRef, Renderer, LazyImageContainer])
    ], LazyImage);
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
    __decorate([
        ContentChildren(LazyImage, { descendants: true }),
        __metadata("design:type", QueryList)
    ], LazyImageContainer.prototype, "children", void 0);
    LazyImageContainer = __decorate([
        Directive({
            selector: "ion-content[ionx-lazy-image], ion-scroll[ionx-lazy-image], [ionx-lazy-image-container]"
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], LazyImageContainer);
    return LazyImageContainer;
}());
export { LazyImageContainer };
//# sourceMappingURL=lazy-image.js.map