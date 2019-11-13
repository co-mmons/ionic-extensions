import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { ensureLazyLoad } from "@co.mmons/ionic-extensions/lazy-load";
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
                    return [4 /*yield*/, ensureLazyLoad(root, { retryError: options && options.retryError })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW1hZ2UtbG9hZGVyLyIsInNvdXJjZXMiOlsiaW1hZ2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBY3BFO0lBRUMscUJBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQ3BELENBQUM7SUFrQkQsc0JBQVcsNEJBQUc7YUFTZDtZQUNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNsQixDQUFDO2FBWEQsVUFBZSxLQUFhO1lBQzNCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFFbEIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Q7UUFDRixDQUFDOzs7T0FBQTtJQU9ELHNCQUFjLDZCQUFJO2FBQWxCLFVBQW1CLEtBQWE7WUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxrQ0FBUzthQUFwQixVQUFxQixLQUFhO1lBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFeEIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Q7UUFDRixDQUFDOzs7T0FBQTtJQUdELHNCQUFjLG1DQUFVO2FBQXhCLFVBQXlCLEtBQWE7WUFD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QUFDLE1BQU0sRUFBRSxDQUFDO3FCQUMvQjt5QkFFRyxDQUFBLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFBLEVBQXZCLHdCQUF1QjtvQkFDMUIscUJBQU0sY0FBYyxDQUFDLElBQUksRUFBRSxFQUFDLFVBQVUsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUE7O29CQUF2RSxTQUF1RSxDQUFDOzs7Ozs7Q0FFekUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge2Vuc3VyZUxhenlMb2FkfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXMge1xuXHRsb2FkZWQ/OiBzdHJpbmc7XG5cdGxvYWRpbmc/OiBzdHJpbmc7XG5cdGVycm9yPzogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6IFwiW2lvbngtaW1hZ2UtbG9hZGVyXVwiLFxuXHRob3N0OiB7XG5cdFx0XCJbYXR0ci5pb254LWltYWdlLWxvYWRlcl1cIjogXCJ0cnVlXCJcblx0fVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZUxvYWRlciB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuXHR9XG5cblx0cHJpdmF0ZSBfc3JjOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfYWx0ZXJuYXRlOiBzdHJpbmc7XG5cblx0bG9hZGVkOiBib29sZWFuO1xuXG5cdGxvYWRpbmc6IGJvb2xlYW47XG5cblx0ZXJyb3I6IGJvb2xlYW47XG5cblx0Ly9AdHMtaWdub3JlXG5cdHByaXZhdGUgdG1wSW1nOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG5cdHByaXZhdGUgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cblx0QElucHV0KFwic3JjXCIpXG5cdHB1YmxpYyBzZXQgc3JjKHZhbHVlOiBzdHJpbmcpIHtcblx0XHRsZXQgb2xkID0gdGhpcy5fc3JjO1xuXHRcdHRoaXMuX3NyYyA9IHZhbHVlO1xuXG5cdFx0aWYgKG9sZCAhPSB0aGlzLl9zcmMpIHtcblx0XHRcdHRoaXMucmVsb2FkKCk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGdldCBzcmMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3NyYztcblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyXCIpXG5cdHByb3RlY3RlZCBzZXQgc3JjMih2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5zcmMgPSB2YWx1ZTtcblx0fVxuXG5cdEBJbnB1dChcImFsdGVybmF0ZVwiKVxuXHRwdWJsaWMgc2V0IGFsdGVybmF0ZSh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0bGV0IG9sZCA9IHRoaXMuX2FsdGVybmF0ZTtcblx0XHR0aGlzLl9hbHRlcm5hdGUgPSB2YWx1ZTtcblxuXHRcdGlmIChvbGQgIT0gdGhpcy5fYWx0ZXJuYXRlKSB7XG5cdFx0XHR0aGlzLnJlbG9hZCgpO1xuXHRcdH1cblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyLWFsdGVybmF0ZVwiKVxuXHRwcm90ZWN0ZWQgc2V0IGFsdGVybmF0ZTIodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuYWx0ZXJuYXRlID0gdmFsdWU7XG5cdH1cblxuXHRwcml2YXRlIF9jc3NDbGFzc2VzOiBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3NlcztcblxuXHRASW5wdXQoXCJjc3MtY2xhc3Nlc1wiKVxuXHRwdWJsaWMgc2V0IGNzc0NsYXNzZXModmFsdWU6IEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzKSB7XG5cdFx0dGhpcy5fY3NzQ2xhc3NlcyA9IHZhbHVlO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXItY3NzLWNsYXNzZXNcIilcblx0cHJvdGVjdGVkIHNldCBjc3NDbGFzc2VzMih2YWx1ZTogSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXMpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzID0gdmFsdWU7XG5cdH1cblxuXHRwcml2YXRlIF9jc3NDbGFzc2VzVGFyZ2V0OiBzdHJpbmc7XG5cblx0QElucHV0KFwiY3NzLWNsYXNzZXMtdGFyZ2V0XCIpXG5cdHB1YmxpYyBzZXQgY3NzQ2xhc3Nlc1RhcmdldCh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA9IHZhbHVlO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXItY3NzLWNsYXNzZXMtdGFyZ2V0XCIpXG5cdHByb3RlY3RlZCBzZXQgY3NzQ2xhc3Nlc1BhcmVudCh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA9IHZhbHVlO1xuXHR9XG5cblx0cmVsb2FkKCkge1xuXHRcdGlmICghdGhpcy5sb2FkaW5nICYmIHRoaXMuaW5pdGlhbGl6ZWQpIHtcblx0XHRcdHRoaXMubG9hZGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVycm9yID0gZmFsc2U7XG5cblx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG5cblx0XHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPyB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQpIDogdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMuZXJyb3IpIHtcblx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR0aGlzLmxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGxvYWQoKSB7XG5cblx0XHRpZiAodGhpcy5sb2FkZWQgfHwgdGhpcy5lcnJvciB8fCAhdGhpcy5fc3JjIHx8IHRoaXMubG9hZGluZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMubG9hZGluZyA9IHRydWU7XG5cdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMgJiYgdGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKSB7XG5cdFx0XHR0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZyk7XG5cdFx0fVxuXG5cdFx0bGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cdFx0XG5cdFx0bGV0IGltZzogSFRNTEltYWdlRWxlbWVudDtcblxuXHRcdC8vIGlmIGhvc3QgZWxlbWVudCBpcyBub3QgPGltZz4sIHdlIG5lZWQgdG8gY3JlYXRlIHRtcCBcblx0XHRpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT0gXCJpbWdcIikge1xuXHRcdFx0aW1nID0gdGhpcy50bXBJbWcgPSBuZXcgSW1hZ2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aW1nID0gPGFueT5lbGVtZW50O1xuXHRcdH1cblxuXHRcdGltZy5vbmxvYWQgPSAoKSA9PiB7XG5cdFx0XHRcblx0XHRcdGlmIChpbWcgIT09IGVsZW1lbnQpIHtcblx0XHRcdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aW1nLnNyY30pYDtcblx0XHRcdH1cblxuXHRcdFx0aW1nLm9uZXJyb3IgPSB1bmRlZmluZWQ7XG5cdFx0XHRpbWcub25sb2FkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR0aGlzLnRtcEltZyA9IHVuZGVmaW5lZDtcblx0XHRcdHRoaXMubG9hZGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lcnJvciA9IGZhbHNlO1xuXG5cdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcykge1xuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA/IGVsZW1lbnQuY2xvc2VzdCh0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0KSA6IGVsZW1lbnQ7XG5cblx0XHRcdFx0aWYgKHRhcmdldCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpIHtcblx0XHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGltZy5vbmVycm9yID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAodGhpcy5fYWx0ZXJuYXRlICYmIHRoaXMuX2FsdGVybmF0ZSAhPSBpbWcuc3JjKSB7XG5cdFx0XHRcdGltZy5zcmMgPSB0aGlzLl9hbHRlcm5hdGU7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aW1nLm9uZXJyb3IgPSB1bmRlZmluZWQ7XG5cdFx0XHRpbWcub25sb2FkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR0aGlzLnRtcEltZyA9IHVuZGVmaW5lZDtcblx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZXJyb3IgPSB0cnVlO1xuXG5cdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcykge1xuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA/IGVsZW1lbnQuY2xvc2VzdCh0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0KSA6IGVsZW1lbnQ7XG5cblx0XHRcdFx0aWYgKHRhcmdldCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpIHtcblx0XHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMuZXJyb3IpIHtcblx0XHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Nzc0NsYXNzZXMuZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpbWcuc3JjID0gdGhpcy5fc3JjO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50W1wiaW9ueEltYWdlTG9hZGVyXCJdID0gdGhpcztcblx0XHR0aGlzLmxvYWQoKTtcblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50W1wiaW9ueEltYWdlTG9hZGVyXCJdO1xuXHRcdH1cblx0fVxuXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbnN1cmVJbWFnZXNMb2FkZWQocm9vdDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW4sIGxhenk/OiBib29sZWFufSkge1xuXG5cdGxldCBpbWFnZXMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbaW9ueC1pbWFnZS1sb2FkZXJdXCIpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBpbWFnZTogRWxlbWVudCAmIEltYWdlTG9hZGVyRWxlbWVudCA9IGltYWdlcy5pdGVtKGkpO1xuXG5cdFx0aWYgKCFpbWFnZS5pb254SW1hZ2VMb2FkZXIgfHwgIWltYWdlLmlvbnhJbWFnZUxvYWRlci5zcmMgfHwgaW1hZ2UuaW9ueEltYWdlTG9hZGVyLmxvYWRlZCB8fCAoaW1hZ2UuaW9ueEltYWdlTG9hZGVyLmVycm9yICYmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5yZXRyeUVycm9yKSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGltYWdlLmlvbnhJbWFnZUxvYWRlci5yZWxvYWQoKTtcblx0fVxuXG5cdGlmIChvcHRpb25zICYmIG9wdGlvbnMubGF6eSkge1xuXHRcdGF3YWl0IGVuc3VyZUxhenlMb2FkKHJvb3QsIHtyZXRyeUVycm9yOiBvcHRpb25zICYmIG9wdGlvbnMucmV0cnlFcnJvcn0pO1xuXHR9XG59XG5cbmludGVyZmFjZSBJbWFnZUxvYWRlckVsZW1lbnQge1xuXHRpb254SW1hZ2VMb2FkZXI/OiBJbWFnZUxvYWRlcjtcbn1cbiJdfQ==