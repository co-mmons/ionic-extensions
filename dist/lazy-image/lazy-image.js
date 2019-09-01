import * as tslib_1 from "tslib";
import { ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, Optional, QueryList, Renderer } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
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
    tslib_1.__decorate([
        ContentChildren(LazyImage_1, { descendants: true }),
        tslib_1.__metadata("design:type", QueryList)
    ], LazyImage.prototype, "children", void 0);
    tslib_1.__decorate([
        Input("ionx-lazy-image"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], LazyImage.prototype, "src", null);
    tslib_1.__decorate([
        Input("ionx-lazy-image-alternate"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], LazyImage.prototype, "alternate", null);
    LazyImage = LazyImage_1 = tslib_1.__decorate([
        Directive({
            selector: "[ionx-lazy-image]"
        }),
        tslib_1.__param(2, Optional()), tslib_1.__param(2, Inject(forwardRef(function () { return LazyImageContainer; }))),
        tslib_1.__metadata("design:paramtypes", [ElementRef, Renderer, LazyImageContainer])
    ], LazyImage);
    return LazyImage;
}());
export { LazyImage };
var LazyImageContainer = /** @class */ (function () {
    function LazyImageContainer(element) {
        this.element = element;
    }
    LazyImageContainer.prototype.revalidate = function () {
        if (this.lazyLoad) {
            this.lazyLoad.update();
            var rect = this.element.nativeElement.getBoundingClientRect();
            if (rect.width == 0 || rect.height == 0) {
                //setTimeout(() => this.revalidate(), 200);
            }
            //console.log(this.children);
            //window.dispatchEvent(new Event("resize"));
        }
    };
    LazyImageContainer.prototype.ngOnInit = function () {
        this.initLazyLoad();
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
    LazyImageContainer.prototype.initLazyLoad = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {};
                        options.selector = ".ionx-lazy-image";
                        options.container = this.element.nativeElement;
                        if (!(this.element.nativeElement.tagName.toLowerCase() === "ion-content")) return [3 /*break*/, 5];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 40)) return [3 /*break*/, 5];
                        options.scroll = this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".inner-scroll");
                        if (!!options.scroll) return [3 /*break*/, 3];
                        return [4 /*yield*/, sleep(50)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        this.lazyLoad = new LazyLoad(options);
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ContentChildren(LazyImage, { descendants: true }),
        tslib_1.__metadata("design:type", QueryList)
    ], LazyImageContainer.prototype, "children", void 0);
    LazyImageContainer = tslib_1.__decorate([
        Directive({
            selector: "ion-content[ionx-lazy-image], [ionx-lazy-image-container]"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], LazyImageContainer);
    return LazyImageContainer;
}());
export { LazyImageContainer };
//# sourceMappingURL=lazy-image.js.map