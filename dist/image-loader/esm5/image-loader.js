import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from "@angular/core";
import { ensureLazyImagesLoaded } from "@co.mmons/ionic-extensions/lazy-image";
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
                if (target) {
                    if (_this._cssClasses.loading) {
                        target.classList.remove(_this._cssClasses.loading);
                    }
                    if (_this._cssClasses.loaded) {
                        target.classList.add(_this._cssClasses.loaded);
                    }
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
                if (target) {
                    if (_this._cssClasses.loading) {
                        target.classList.remove(_this._cssClasses.loading);
                    }
                    if (_this._cssClasses.error) {
                        target.classList.add(_this._cssClasses.error);
                    }
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
    ImageLoader.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        Input("src")
    ], ImageLoader.prototype, "src", null);
    tslib_1.__decorate([
        Input("ionx-image-loader")
    ], ImageLoader.prototype, "src2", null);
    tslib_1.__decorate([
        Input("alternate")
    ], ImageLoader.prototype, "alternate", null);
    tslib_1.__decorate([
        Input("ionx-image-loader-alternate")
    ], ImageLoader.prototype, "alternate2", null);
    tslib_1.__decorate([
        Input("css-classes")
    ], ImageLoader.prototype, "cssClasses", null);
    tslib_1.__decorate([
        Input("ionx-image-loader-css-classes")
    ], ImageLoader.prototype, "cssClasses2", null);
    tslib_1.__decorate([
        Input("css-classes-target")
    ], ImageLoader.prototype, "cssClassesTarget", null);
    tslib_1.__decorate([
        Input("ionx-image-loader-css-classes-target")
    ], ImageLoader.prototype, "cssClassesParent", null);
    ImageLoader = tslib_1.__decorate([
        Directive({
            selector: "[ionx-image-loader]",
            host: {
                "[attr.ionx-image-loader]": "true"
            }
        })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW1hZ2UtbG9hZGVyLyIsInNvdXJjZXMiOlsiaW1hZ2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFjN0U7SUFFQyxxQkFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQWtCRCxzQkFBVyw0QkFBRzthQVNkO1lBQ0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2xCLENBQUM7YUFYRCxVQUFlLEtBQWE7WUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUVsQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNyQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZDtRQUNGLENBQUM7OztPQUFBO0lBT0Qsc0JBQWMsNkJBQUk7YUFBbEIsVUFBbUIsS0FBYTtZQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUdELHNCQUFXLGtDQUFTO2FBQXBCLFVBQXFCLEtBQWE7WUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUV4QixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZDtRQUNGLENBQUM7OztPQUFBO0lBR0Qsc0JBQWMsbUNBQVU7YUFBeEIsVUFBeUIsS0FBYTtZ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LENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQy9CO3lCQUVHLENBQUEsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUEsRUFBdkIsd0JBQXVCO29CQUMxQixxQkFBTSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsRUFBQyxVQUFVLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxFQUFBOztvQkFBL0UsU0FBK0UsQ0FBQzs7Ozs7O0NBRWpGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtlbnN1cmVMYXp5SW1hZ2VzTG9hZGVkfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1pbWFnZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzIHtcblx0bG9hZGVkPzogc3RyaW5nO1xuXHRsb2FkaW5nPzogc3RyaW5nO1xuXHRlcnJvcj86IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiBcIltpb254LWltYWdlLWxvYWRlcl1cIixcblx0aG9zdDoge1xuXHRcdFwiW2F0dHIuaW9ueC1pbWFnZS1sb2FkZXJdXCI6IFwidHJ1ZVwiXG5cdH1cbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VMb2FkZXIge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcblx0fVxuXG5cdHByaXZhdGUgX3NyYzogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2FsdGVybmF0ZTogc3RyaW5nO1xuXG5cdGxvYWRlZDogYm9vbGVhbjtcblxuXHRsb2FkaW5nOiBib29sZWFuO1xuXG5cdGVycm9yOiBib29sZWFuO1xuXG5cdC8vQHRzLWlnbm9yZVxuXHRwcml2YXRlIHRtcEltZzogSFRNTEltYWdlRWxlbWVudDtcblxuXHRwcml2YXRlIGluaXRpYWxpemVkOiBib29sZWFuO1xuXG5cdEBJbnB1dChcInNyY1wiKVxuXHRwdWJsaWMgc2V0IHNyYyh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0bGV0IG9sZCA9IHRoaXMuX3NyYztcblx0XHR0aGlzLl9zcmMgPSB2YWx1ZTtcblxuXHRcdGlmIChvbGQgIT0gdGhpcy5fc3JjKSB7XG5cdFx0XHR0aGlzLnJlbG9hZCgpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgc3JjKCkge1xuXHRcdHJldHVybiB0aGlzLl9zcmM7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlclwiKVxuXHRwcm90ZWN0ZWQgc2V0IHNyYzIodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuc3JjID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoXCJhbHRlcm5hdGVcIilcblx0cHVibGljIHNldCBhbHRlcm5hdGUodmFsdWU6IHN0cmluZykge1xuXHRcdGxldCBvbGQgPSB0aGlzLl9hbHRlcm5hdGU7XG5cdFx0dGhpcy5fYWx0ZXJuYXRlID0gdmFsdWU7XG5cblx0XHRpZiAob2xkICE9IHRoaXMuX2FsdGVybmF0ZSkge1xuXHRcdFx0dGhpcy5yZWxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlci1hbHRlcm5hdGVcIilcblx0cHJvdGVjdGVkIHNldCBhbHRlcm5hdGUyKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLmFsdGVybmF0ZSA9IHZhbHVlO1xuXHR9XG5cblx0cHJpdmF0ZSBfY3NzQ2xhc3NlczogSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXM7XG5cblx0QElucHV0KFwiY3NzLWNsYXNzZXNcIilcblx0cHVibGljIHNldCBjc3NDbGFzc2VzKHZhbHVlOiBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3Nlcykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXMgPSB2YWx1ZTtcblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyLWNzcy1jbGFzc2VzXCIpXG5cdHByb3RlY3RlZCBzZXQgY3NzQ2xhc3NlczIodmFsdWU6IEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzKSB7XG5cdFx0dGhpcy5fY3NzQ2xhc3NlcyA9IHZhbHVlO1xuXHR9XG5cblx0cHJpdmF0ZSBfY3NzQ2xhc3Nlc1RhcmdldDogc3RyaW5nO1xuXG5cdEBJbnB1dChcImNzcy1jbGFzc2VzLXRhcmdldFwiKVxuXHRwdWJsaWMgc2V0IGNzc0NsYXNzZXNUYXJnZXQodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPSB2YWx1ZTtcblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyLWNzcy1jbGFzc2VzLXRhcmdldFwiKVxuXHRwcm90ZWN0ZWQgc2V0IGNzc0NsYXNzZXNQYXJlbnQodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPSB2YWx1ZTtcblx0fVxuXG5cdHJlbG9hZCgpIHtcblx0XHRpZiAoIXRoaXMubG9hZGluZyAmJiB0aGlzLmluaXRpYWxpemVkKSB7XG5cdFx0XHR0aGlzLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lcnJvciA9IGZhbHNlO1xuXG5cdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcykge1xuXG5cdFx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID8gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdCh0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0KSA6IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCkge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dGhpcy5sb2FkKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBsb2FkKCkge1xuXG5cdFx0aWYgKHRoaXMubG9hZGVkIHx8IHRoaXMuZXJyb3IgfHwgIXRoaXMuX3NyYyB8fCB0aGlzLmxvYWRpbmcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzICYmIHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZykge1xuXHRcdFx0dGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpO1xuXHRcdH1cblxuXHRcdGxldCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXHRcdFxuXHRcdGxldCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cblx0XHQvLyBpZiBob3N0IGVsZW1lbnQgaXMgbm90IDxpbWc+LCB3ZSBuZWVkIHRvIGNyZWF0ZSB0bXAgXG5cdFx0aWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9IFwiaW1nXCIpIHtcblx0XHRcdGltZyA9IHRoaXMudG1wSW1nID0gbmV3IEltYWdlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGltZyA9IDxhbnk+ZWxlbWVudDtcblx0XHR9XG5cblx0XHRpbWcub25sb2FkID0gKCkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoaW1nICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltZy5zcmN9KWA7XG5cdFx0XHR9XG5cblx0XHRcdGltZy5vbmVycm9yID0gdW5kZWZpbmVkO1xuXHRcdFx0aW1nLm9ubG9hZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dGhpcy50bXBJbWcgPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLmxvYWRlZCA9IHRydWU7XG5cdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdHRoaXMuZXJyb3IgPSBmYWxzZTtcblxuXHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcblx0XHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPyBlbGVtZW50LmNsb3Nlc3QodGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCkgOiBlbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCkge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpbWcub25lcnJvciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKHRoaXMuX2FsdGVybmF0ZSAmJiB0aGlzLl9hbHRlcm5hdGUgIT0gaW1nLnNyYykge1xuXHRcdFx0XHRpbWcuc3JjID0gdGhpcy5fYWx0ZXJuYXRlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGltZy5vbmVycm9yID0gdW5kZWZpbmVkO1xuXHRcdFx0aW1nLm9ubG9hZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dGhpcy50bXBJbWcgPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdHRoaXMubG9hZGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVycm9yID0gdHJ1ZTtcblxuXHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcblx0XHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPyBlbGVtZW50LmNsb3Nlc3QodGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCkgOiBlbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aW1nLnNyYyA9IHRoaXMuX3NyYztcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFtcImlvbnhJbWFnZUxvYWRlclwiXSA9IHRoaXM7XG5cdFx0dGhpcy5sb2FkKCk7XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFtcImlvbnhJbWFnZUxvYWRlclwiXTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlSW1hZ2VzTG9hZGVkKHJvb3Q6IEhUTUxFbGVtZW50LCBvcHRpb25zPzoge3JldHJ5RXJyb3I/OiBib29sZWFuLCBsYXp5PzogYm9vbGVhbn0pIHtcblxuXHRsZXQgaW1hZ2VzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiW2lvbngtaW1hZ2UtbG9hZGVyXVwiKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgaW1hZ2U6IEVsZW1lbnQgJiBJbWFnZUxvYWRlckVsZW1lbnQgPSBpbWFnZXMuaXRlbShpKTtcblxuXHRcdGlmICghaW1hZ2UuaW9ueEltYWdlTG9hZGVyIHx8ICFpbWFnZS5pb254SW1hZ2VMb2FkZXIuc3JjIHx8IGltYWdlLmlvbnhJbWFnZUxvYWRlci5sb2FkZWQgfHwgKGltYWdlLmlvbnhJbWFnZUxvYWRlci5lcnJvciAmJiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucmV0cnlFcnJvcikpKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpbWFnZS5pb254SW1hZ2VMb2FkZXIucmVsb2FkKCk7XG5cdH1cblxuXHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxhenkpIHtcblx0XHRhd2FpdCBlbnN1cmVMYXp5SW1hZ2VzTG9hZGVkKHJvb3QsIHtyZXRyeUVycm9yOiBvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcn0pO1xuXHR9XG59XG5cbmludGVyZmFjZSBJbWFnZUxvYWRlckVsZW1lbnQge1xuXHRpb254SW1hZ2VMb2FkZXI/OiBJbWFnZUxvYWRlcjtcbn1cbiJdfQ==