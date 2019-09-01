import * as tslib_1 from "tslib";
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
    Object.defineProperty(ImageLoader.prototype, "cssClasses", {
        set: function (value) {
            this._cssClasses = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "cssClasses2", {
        set: function (value) {
            this._cssClasses = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "cssClassesTarget", {
        set: function (value) {
            this._cssClassesTarget = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoader.prototype, "cssClassesParent", {
        set: function (value) {
            this._cssClassesTarget = value;
        },
        enumerable: true,
        configurable: true
    });
    ImageLoader.prototype.reload = function () {
        if (!this.loading && this.initialized) {
            this.loaded = false;
            this.error = false;
            if (this._cssClasses) {
                var target = this._cssClassesTarget ? this.element.nativeElement.closest(this._cssClassesTarget) : this.element.nativeElement;
                if (this._cssClasses.loaded) {
                    target.classList.remove(this._cssClasses.loaded);
                }
                if (this._cssClasses.error) {
                    target.classList.remove(this._cssClasses.error);
                }
            }
            this.load();
        }
    };
    ImageLoader.prototype.load = function () {
        var _this = this;
        if (this.loaded || this.error || !this._src || this.loading) {
            return;
        }
        this.loading = true;
        if (this._cssClasses && this._cssClasses.loading) {
            this.element.nativeElement.classList.add(this._cssClasses.loading);
        }
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
            if (_this._cssClasses) {
                var target = _this._cssClassesTarget ? element.closest(_this._cssClassesTarget) : element;
                if (_this._cssClasses.loading) {
                    target.classList.remove(_this._cssClasses.loading);
                }
                if (_this._cssClasses.loaded) {
                    target.classList.add(_this._cssClasses.loaded);
                }
            }
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
            if (_this._cssClasses) {
                var target = _this._cssClassesTarget ? element.closest(_this._cssClassesTarget) : element;
                if (_this._cssClasses.loading) {
                    target.classList.remove(_this._cssClasses.loading);
                }
                if (_this._cssClasses.error) {
                    target.classList.add(_this._cssClasses.error);
                }
            }
        };
        img.src = this._src;
    };
    ImageLoader.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        this.element.nativeElement["ionxImageLoader"] = this;
        this.load();
    };
    ImageLoader.prototype.ngOnDestroy = function () {
        if (this.element.nativeElement) {
            delete this.element.nativeElement["ionxImageLoader"];
        }
    };
    tslib_1.__decorate([
        Input("src"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "src", null);
    tslib_1.__decorate([
        Input("ionx-image-loader"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "src2", null);
    tslib_1.__decorate([
        Input("alternate"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "alternate", null);
    tslib_1.__decorate([
        Input("ionx-image-loader-alternate"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "alternate2", null);
    tslib_1.__decorate([
        Input("css-classes"),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ImageLoader.prototype, "cssClasses", null);
    tslib_1.__decorate([
        Input("ionx-image-loader-css-classes"),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ImageLoader.prototype, "cssClasses2", null);
    tslib_1.__decorate([
        Input("css-classes-target"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "cssClassesTarget", null);
    tslib_1.__decorate([
        Input("ionx-image-loader-css-classes-target"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], ImageLoader.prototype, "cssClassesParent", null);
    ImageLoader = tslib_1.__decorate([
        Directive({
            selector: "[ionx-image-loader]",
            host: {
                "[attr.ionx-image-loader]": "true"
            }
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], ImageLoader);
    return ImageLoader;
}());
export { ImageLoader };
export function ensureImagesLoaded(root, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var images, i, image;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    images = root.querySelectorAll("[ionx-image-loader]");
                    for (i = 0; i < images.length; i++) {
                        image = images.item(i);
                        if (!image.ionxImageLoader || !image.ionxImageLoader.src || image.ionxImageLoader.loaded || (image.ionxImageLoader.error && (!options || !options.retryError))) {
                            continue;
                        }
                        image.ionxImageLoader.reload();
                    }
                    if (!(options && options.lazy)) return [3 /*break*/, 2];
                    return [4 /*yield*/, ensureLazyImagesLoaded(root, { retryError: options && options.retryError })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=image-loader.js.map