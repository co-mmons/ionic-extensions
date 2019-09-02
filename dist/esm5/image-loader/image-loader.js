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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJpbWFnZS1sb2FkZXIvaW1hZ2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFjL0Q7SUFFQyxxQkFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQWtCRCxzQkFBVyw0QkFBRzthQVNkO1lBQ0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2xCLENBQUM7YUFYRCxVQUFlLEtBQWE7WUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUVsQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNyQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZDtRQUNGLENBQUM7OztPQUFBO0lBT0Qsc0JBQWMsNkJBQUk7YUFBbEIsVUFBbUIsS0FBYTtZQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUNsQixDQUFDOzs7T0FBQTtJQUdELHNCQUFXLGtDQUFTO2FBQXBCLFVBQXFCLEtBQWE7WUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUV4QixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZDtRQUNGLENBQUM7OztPQUFBO0lBR0Qsc0JBQWMsbUNBQVU7YUFBeEIsVUFBeUIsS0FBYTtZ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QU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFBLEVBQXZCLHdCQUF1QjtvQkFDMUIscUJBQU0sc0JBQXNCLENBQUMsSUFBSSxFQUFFLEVBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsRUFBQTs7b0JBQS9FLFNBQStFLENBQUM7Ozs7OztDQUVqRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7ZW5zdXJlTGF6eUltYWdlc0xvYWRlZH0gZnJvbSBcIi4uL2xhenktaW1hZ2UvbGF6eS1sb2FkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXMge1xuXHRsb2FkZWQ/OiBzdHJpbmc7XG5cdGxvYWRpbmc/OiBzdHJpbmc7XG5cdGVycm9yPzogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6IFwiW2lvbngtaW1hZ2UtbG9hZGVyXVwiLFxuXHRob3N0OiB7XG5cdFx0XCJbYXR0ci5pb254LWltYWdlLWxvYWRlcl1cIjogXCJ0cnVlXCJcblx0fVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZUxvYWRlciB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuXHR9XG5cblx0cHJpdmF0ZSBfc3JjOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfYWx0ZXJuYXRlOiBzdHJpbmc7XG5cblx0bG9hZGVkOiBib29sZWFuO1xuXG5cdGxvYWRpbmc6IGJvb2xlYW47XG5cblx0ZXJyb3I6IGJvb2xlYW47XG5cblx0Ly9AdHMtaWdub3JlXG5cdHByaXZhdGUgdG1wSW1nOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG5cdHByaXZhdGUgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cblx0QElucHV0KFwic3JjXCIpXG5cdHB1YmxpYyBzZXQgc3JjKHZhbHVlOiBzdHJpbmcpIHtcblx0XHRsZXQgb2xkID0gdGhpcy5fc3JjO1xuXHRcdHRoaXMuX3NyYyA9IHZhbHVlO1xuXG5cdFx0aWYgKG9sZCAhPSB0aGlzLl9zcmMpIHtcblx0XHRcdHRoaXMucmVsb2FkKCk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGdldCBzcmMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3NyYztcblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyXCIpXG5cdHByb3RlY3RlZCBzZXQgc3JjMih2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5zcmMgPSB2YWx1ZTtcblx0fVxuXG5cdEBJbnB1dChcImFsdGVybmF0ZVwiKVxuXHRwdWJsaWMgc2V0IGFsdGVybmF0ZSh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0bGV0IG9sZCA9IHRoaXMuX2FsdGVybmF0ZTtcblx0XHR0aGlzLl9hbHRlcm5hdGUgPSB2YWx1ZTtcblxuXHRcdGlmIChvbGQgIT0gdGhpcy5fYWx0ZXJuYXRlKSB7XG5cdFx0XHR0aGlzLnJlbG9hZCgpO1xuXHRcdH1cblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyLWFsdGVybmF0ZVwiKVxuXHRwcm90ZWN0ZWQgc2V0IGFsdGVybmF0ZTIodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuYWx0ZXJuYXRlID0gdmFsdWU7XG5cdH1cblxuXHRwcml2YXRlIF9jc3NDbGFzc2VzOiBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3NlcztcblxuXHRASW5wdXQoXCJjc3MtY2xhc3Nlc1wiKVxuXHRwdWJsaWMgc2V0IGNzc0NsYXNzZXModmFsdWU6IEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzKSB7XG5cdFx0dGhpcy5fY3NzQ2xhc3NlcyA9IHZhbHVlO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXItY3NzLWNsYXNzZXNcIilcblx0cHJvdGVjdGVkIHNldCBjc3NDbGFzc2VzMih2YWx1ZTogSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXMpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzID0gdmFsdWU7XG5cdH1cblxuXHRwcml2YXRlIF9jc3NDbGFzc2VzVGFyZ2V0OiBzdHJpbmc7XG5cblx0QElucHV0KFwiY3NzLWNsYXNzZXMtdGFyZ2V0XCIpXG5cdHB1YmxpYyBzZXQgY3NzQ2xhc3Nlc1RhcmdldCh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA9IHZhbHVlO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXItY3NzLWNsYXNzZXMtdGFyZ2V0XCIpXG5cdHByb3RlY3RlZCBzZXQgY3NzQ2xhc3Nlc1BhcmVudCh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA9IHZhbHVlO1xuXHR9XG5cblx0cmVsb2FkKCkge1xuXHRcdGlmICghdGhpcy5sb2FkaW5nICYmIHRoaXMuaW5pdGlhbGl6ZWQpIHtcblx0XHRcdHRoaXMubG9hZGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVycm9yID0gZmFsc2U7XG5cblx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG5cblx0XHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPyB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQpIDogdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMuZXJyb3IpIHtcblx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR0aGlzLmxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGxvYWQoKSB7XG5cblx0XHRpZiAodGhpcy5sb2FkZWQgfHwgdGhpcy5lcnJvciB8fCAhdGhpcy5fc3JjIHx8IHRoaXMubG9hZGluZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMubG9hZGluZyA9IHRydWU7XG5cdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMgJiYgdGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKSB7XG5cdFx0XHR0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZyk7XG5cdFx0fVxuXG5cdFx0bGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cdFx0XG5cdFx0bGV0IGltZzogSFRNTEltYWdlRWxlbWVudDtcblxuXHRcdC8vIGlmIGhvc3QgZWxlbWVudCBpcyBub3QgPGltZz4sIHdlIG5lZWQgdG8gY3JlYXRlIHRtcCBcblx0XHRpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT0gXCJpbWdcIikge1xuXHRcdFx0aW1nID0gdGhpcy50bXBJbWcgPSBuZXcgSW1hZ2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW1nID0gPGFueT5lbGVtZW50O1xuXHRcdH1cblxuXHRcdGltZy5vbmxvYWQgPSAoKSA9PiB7XG5cdFx0XHRcblx0XHRcdGlmIChpbWcgIT09IGVsZW1lbnQpIHtcblx0XHRcdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aW1nLnNyY30pYDtcblx0XHRcdH1cblxuXHRcdFx0aW1nLm9uZXJyb3IgPSB1bmRlZmluZWQ7XG5cdFx0XHRpbWcub25sb2FkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR0aGlzLnRtcEltZyA9IHVuZGVmaW5lZDtcblx0XHRcdHRoaXMubG9hZGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lcnJvciA9IGZhbHNlO1xuXG5cdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcykge1xuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA/IGVsZW1lbnQuY2xvc2VzdCh0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0KSA6IGVsZW1lbnQ7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZykge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpIHtcblx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aW1nLm9uZXJyb3IgPSAoKSA9PiB7XG5cblx0XHRcdGlmICh0aGlzLl9hbHRlcm5hdGUgJiYgdGhpcy5fYWx0ZXJuYXRlICE9IGltZy5zcmMpIHtcblx0XHRcdFx0aW1nLnNyYyA9IHRoaXMuX2FsdGVybmF0ZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpbWcub25lcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdGltZy5vbmxvYWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHRoaXMudG1wSW1nID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lcnJvciA9IHRydWU7XG5cblx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG5cdFx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID8gZWxlbWVudC5jbG9zZXN0KHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQpIDogZWxlbWVudDtcblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aW1nLnNyYyA9IHRoaXMuX3NyYztcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFtcImlvbnhJbWFnZUxvYWRlclwiXSA9IHRoaXM7XG5cdFx0dGhpcy5sb2FkKCk7XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFtcImlvbnhJbWFnZUxvYWRlclwiXTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlSW1hZ2VzTG9hZGVkKHJvb3Q6IEhUTUxFbGVtZW50LCBvcHRpb25zPzoge3JldHJ5RXJyb3I/OiBib29sZWFuLCBsYXp5PzogYm9vbGVhbn0pIHtcblxuXHRsZXQgaW1hZ2VzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiW2lvbngtaW1hZ2UtbG9hZGVyXVwiKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgaW1hZ2U6IEVsZW1lbnQgJiBJbWFnZUxvYWRlckVsZW1lbnQgPSBpbWFnZXMuaXRlbShpKTtcblxuXHRcdGlmICghaW1hZ2UuaW9ueEltYWdlTG9hZGVyIHx8ICFpbWFnZS5pb254SW1hZ2VMb2FkZXIuc3JjIHx8IGltYWdlLmlvbnhJbWFnZUxvYWRlci5sb2FkZWQgfHwgKGltYWdlLmlvbnhJbWFnZUxvYWRlci5lcnJvciAmJiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucmV0cnlFcnJvcikpKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpbWFnZS5pb254SW1hZ2VMb2FkZXIucmVsb2FkKCk7XG5cdH1cblxuXHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxhenkpIHtcblx0XHRhd2FpdCBlbnN1cmVMYXp5SW1hZ2VzTG9hZGVkKHJvb3QsIHtyZXRyeUVycm9yOiBvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcn0pO1xuXHR9XG59XG5cbmludGVyZmFjZSBJbWFnZUxvYWRlckVsZW1lbnQge1xuXHRpb254SW1hZ2VMb2FkZXI/OiBJbWFnZUxvYWRlcjtcbn0iXX0=