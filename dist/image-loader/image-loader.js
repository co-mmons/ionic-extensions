var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef } from "@angular/core";
import { ensureLazyImagesLoaded } from "../lazy-image/lazy-load";
var ImageLoader = /** @class */ (function () {
    function ImageLoader(element) {
        this.element = element;
    }
    Object.defineProperty(ImageLoader.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (value) {
            var old = this._src;
            this._src = value;
            if (old != this._src) {
                this.reload();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "src2", {
        set: function (value) {
            this.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "alternate", {
        set: function (value) {
            var old = this._alternate;
            this._alternate = value;
            if (old != this._alternate) {
                this.reload();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "alternate2", {
        set: function (value) {
            this.alternate = value;
        },
        enumerable: true,
        configurable: true
    });
    ImageLoader.prototype.reload = function () {
        if (!this.loading && this.initialized) {
            this.loaded = false;
            this.error = false;
            this.load();
        }
    };
    ImageLoader.prototype.load = function () {
        var _this = this;
        if (this.loaded || this.error || !this._src || this.loading) {
            return;
        }
        this.loading = true;
        var element = this.element.nativeElement;
        var img;
        // if host element is not <img>, we need to create tmp 
        if (element.tagName.toLowerCase() != "img") {
            img = this.tmpImg = new Image();
        }
        else {
            img = element;
        }
        img.onload = function () {
            if (img !== element) {
                element.style.backgroundImage = "url(" + img.src + ")";
            }
            img.onerror = undefined;
            img.onload = undefined;
            _this.tmpImg = undefined;
            _this.loaded = true;
            _this.loading = false;
            _this.error = false;
        };
        img.onerror = function () {
            if (_this._alternate && _this._alternate != img.src) {
                img.src = _this._alternate;
                return;
            }
            img.onerror = undefined;
            img.onload = undefined;
            _this.tmpImg = undefined;
            _this.loading = false;
            _this.loaded = false;
            _this.error = true;
        };
        img.src = this._src;
    };
    ImageLoader.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        this.element.nativeElement.ionxImageLoader = this;
        this.load();
    };
    ImageLoader.prototype.ngOnDestroy = function () {
        if (this.element.nativeElement) {
            delete this.element.nativeElement.ionxImageLoader;
        }
    };
    __decorate([
        Input("src"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "src", null);
    __decorate([
        Input("ionx-image-loader"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "src2", null);
    __decorate([
        Input("alternate"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "alternate", null);
    __decorate([
        Input("ionx-image-loader-alternate"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "alternate2", null);
    ImageLoader = __decorate([
        Directive({
            selector: "[ionx-image-loader]",
            host: {
                "[attr.ionx-image-loader]": "true"
            }
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], ImageLoader);
    return ImageLoader;
}());
export { ImageLoader };
export function ensureImagesLoaded(root, options) {
    var images = root.querySelectorAll("[ionx-image-loader]");
    for (var i = 0; i < images.length; i++) {
        var image = images.item(i);
        if (!image.ionxImageLoader || !image.ionxImageLoader.src || image.ionxImageLoader.loaded || (image.ionxImageLoader.error && (!options || !options.retryError))) {
            continue;
        }
        image.ionxImageLoader.reload();
    }
    if (options && options.lazy) {
        ensureLazyImagesLoaded(root, { retryError: options && options.retryError });
    }
}
//# sourceMappingURL=image-loader.js.map