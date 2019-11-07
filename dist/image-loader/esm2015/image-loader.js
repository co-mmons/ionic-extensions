import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from "@angular/core";
import { ensureLazyImagesLoaded } from "@co.mmons/ionic-extensions/lazy-image";
let ImageLoader = class ImageLoader {
    constructor(element) {
        this.element = element;
    }
    set src(value) {
        let old = this._src;
        this._src = value;
        if (old != this._src) {
            this.reload();
        }
    }
    get src() {
        return this._src;
    }
    set src2(value) {
        this.src = value;
    }
    set alternate(value) {
        let old = this._alternate;
        this._alternate = value;
        if (old != this._alternate) {
            this.reload();
        }
    }
    set alternate2(value) {
        this.alternate = value;
    }
    set cssClasses(value) {
        this._cssClasses = value;
    }
    set cssClasses2(value) {
        this._cssClasses = value;
    }
    set cssClassesTarget(value) {
        this._cssClassesTarget = value;
    }
    set cssClassesParent(value) {
        this._cssClassesTarget = value;
    }
    reload() {
        if (!this.loading && this.initialized) {
            this.loaded = false;
            this.error = false;
            if (this._cssClasses) {
                let target = this._cssClassesTarget ? this.element.nativeElement.closest(this._cssClassesTarget) : this.element.nativeElement;
                if (this._cssClasses.loaded) {
                    target.classList.remove(this._cssClasses.loaded);
                }
                if (this._cssClasses.error) {
                    target.classList.remove(this._cssClasses.error);
                }
            }
            this.load();
        }
    }
    load() {
        if (this.loaded || this.error || !this._src || this.loading) {
            return;
        }
        this.loading = true;
        if (this._cssClasses && this._cssClasses.loading) {
            this.element.nativeElement.classList.add(this._cssClasses.loading);
        }
        let element = this.element.nativeElement;
        let img;
        // if host element is not <img>, we need to create tmp 
        if (element.tagName.toLowerCase() != "img") {
            img = this.tmpImg = new Image();
        }
        else {
            img = element;
        }
        img.onload = () => {
            if (img !== element) {
                element.style.backgroundImage = `url(${img.src})`;
            }
            img.onerror = undefined;
            img.onload = undefined;
            this.tmpImg = undefined;
            this.loaded = true;
            this.loading = false;
            this.error = false;
            if (this._cssClasses) {
                let target = this._cssClassesTarget ? element.closest(this._cssClassesTarget) : element;
                if (target) {
                    if (this._cssClasses.loading) {
                        target.classList.remove(this._cssClasses.loading);
                    }
                    if (this._cssClasses.loaded) {
                        target.classList.add(this._cssClasses.loaded);
                    }
                }
            }
        };
        img.onerror = () => {
            if (this._alternate && this._alternate != img.src) {
                img.src = this._alternate;
                return;
            }
            img.onerror = undefined;
            img.onload = undefined;
            this.tmpImg = undefined;
            this.loading = false;
            this.loaded = false;
            this.error = true;
            if (this._cssClasses) {
                let target = this._cssClassesTarget ? element.closest(this._cssClassesTarget) : element;
                if (target) {
                    if (this._cssClasses.loading) {
                        target.classList.remove(this._cssClasses.loading);
                    }
                    if (this._cssClasses.error) {
                        target.classList.add(this._cssClasses.error);
                    }
                }
            }
        };
        img.src = this._src;
    }
    ngAfterViewInit() {
        this.initialized = true;
        this.element.nativeElement["ionxImageLoader"] = this;
        this.load();
    }
    ngOnDestroy() {
        if (this.element.nativeElement) {
            delete this.element.nativeElement["ionxImageLoader"];
        }
    }
};
ImageLoader.ctorParameters = () => [
    { type: ElementRef }
];
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
export { ImageLoader };
export function ensureImagesLoaded(root, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let images = root.querySelectorAll("[ionx-image-loader]");
        for (let i = 0; i < images.length; i++) {
            let image = images.item(i);
            if (!image.ionxImageLoader || !image.ionxImageLoader.src || image.ionxImageLoader.loaded || (image.ionxImageLoader.error && (!options || !options.retryError))) {
                continue;
            }
            image.ionxImageLoader.reload();
        }
        if (options && options.lazy) {
            yield ensureLazyImagesLoaded(root, { retryError: options && options.retryError });
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW1hZ2UtbG9hZGVyLyIsInNvdXJjZXMiOlsiaW1hZ2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFjN0UsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUV2QixZQUFvQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUNwRCxDQUFDO0lBa0JELElBQVcsR0FBRyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVsQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNkO0lBQ0YsQ0FBQztJQUVELElBQVcsR0FBRztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBR0QsSUFBYyxJQUFJLENBQUMsS0FBYTtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBR0QsSUFBVyxTQUFTLENBQUMsS0FBYTtRQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Q7SUFDRixDQUFDO0lBR0QsSUFBYyxVQUFVLENBQUMsS0FBYTtRQUNyQyxJQUFJLENBQUMsU0FBUyxH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SUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztTQUNoRjtJQUNGLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7ZW5zdXJlTGF6eUltYWdlc0xvYWRlZH0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2xhenktaW1hZ2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3NlcyB7XG5cdGxvYWRlZD86IHN0cmluZztcblx0bG9hZGluZz86IHN0cmluZztcblx0ZXJyb3I/OiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJbaW9ueC1pbWFnZS1sb2FkZXJdXCIsXG5cdGhvc3Q6IHtcblx0XHRcIlthdHRyLmlvbngtaW1hZ2UtbG9hZGVyXVwiOiBcInRydWVcIlxuXHR9XG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyIHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG5cdH1cblxuXHRwcml2YXRlIF9zcmM6IHN0cmluZztcblxuXHRwcml2YXRlIF9hbHRlcm5hdGU6IHN0cmluZztcblxuXHRsb2FkZWQ6IGJvb2xlYW47XG5cblx0bG9hZGluZzogYm9vbGVhbjtcblxuXHRlcnJvcjogYm9vbGVhbjtcblxuXHQvL0B0cy1pZ25vcmVcblx0cHJpdmF0ZSB0bXBJbWc6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cblx0cHJpdmF0ZSBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuXHRASW5wdXQoXCJzcmNcIilcblx0cHVibGljIHNldCBzcmModmFsdWU6IHN0cmluZykge1xuXHRcdGxldCBvbGQgPSB0aGlzLl9zcmM7XG5cdFx0dGhpcy5fc3JjID0gdmFsdWU7XG5cblx0XHRpZiAob2xkICE9IHRoaXMuX3NyYykge1xuXHRcdFx0dGhpcy5yZWxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHNyYygpIHtcblx0XHRyZXR1cm4gdGhpcy5fc3JjO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXJcIilcblx0cHJvdGVjdGVkIHNldCBzcmMyKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLnNyYyA9IHZhbHVlO1xuXHR9XG5cblx0QElucHV0KFwiYWx0ZXJuYXRlXCIpXG5cdHB1YmxpYyBzZXQgYWx0ZXJuYXRlKHZhbHVlOiBzdHJpbmcpIHtcblx0XHRsZXQgb2xkID0gdGhpcy5fYWx0ZXJuYXRlO1xuXHRcdHRoaXMuX2FsdGVybmF0ZSA9IHZhbHVlO1xuXG5cdFx0aWYgKG9sZCAhPSB0aGlzLl9hbHRlcm5hdGUpIHtcblx0XHRcdHRoaXMucmVsb2FkKCk7XG5cdFx0fVxuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXItYWx0ZXJuYXRlXCIpXG5cdHByb3RlY3RlZCBzZXQgYWx0ZXJuYXRlMih2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5hbHRlcm5hdGUgPSB2YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgX2Nzc0NsYXNzZXM6IEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzO1xuXG5cdEBJbnB1dChcImNzcy1jbGFzc2VzXCIpXG5cdHB1YmxpYyBzZXQgY3NzQ2xhc3Nlcyh2YWx1ZTogSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXMpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlci1jc3MtY2xhc3Nlc1wiKVxuXHRwcm90ZWN0ZWQgc2V0IGNzc0NsYXNzZXMyKHZhbHVlOiBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3Nlcykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXMgPSB2YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgX2Nzc0NsYXNzZXNUYXJnZXQ6IHN0cmluZztcblxuXHRASW5wdXQoXCJjc3MtY2xhc3Nlcy10YXJnZXRcIilcblx0cHVibGljIHNldCBjc3NDbGFzc2VzVGFyZ2V0KHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlci1jc3MtY2xhc3Nlcy10YXJnZXRcIilcblx0cHJvdGVjdGVkIHNldCBjc3NDbGFzc2VzUGFyZW50KHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID0gdmFsdWU7XG5cdH1cblxuXHRyZWxvYWQoKSB7XG5cdFx0aWYgKCF0aGlzLmxvYWRpbmcgJiYgdGhpcy5pbml0aWFsaXplZCkge1xuXHRcdFx0dGhpcy5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZXJyb3IgPSBmYWxzZTtcblxuXHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcblxuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA/IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QodGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCkgOiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpIHtcblx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcikge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMuZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMubG9hZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgbG9hZCgpIHtcblxuXHRcdGlmICh0aGlzLmxvYWRlZCB8fCB0aGlzLmVycm9yIHx8ICF0aGlzLl9zcmMgfHwgdGhpcy5sb2FkaW5nKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5fY3NzQ2xhc3NlcyAmJiB0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpIHtcblx0XHRcdHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKTtcblx0XHR9XG5cblx0XHRsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblx0XHRcblx0XHRsZXQgaW1nOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG5cdFx0Ly8gaWYgaG9zdCBlbGVtZW50IGlzIG5vdCA8aW1nPiwgd2UgbmVlZCB0byBjcmVhdGUgdG1wIFxuXHRcdGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPSBcImltZ1wiKSB7XG5cdFx0XHRpbWcgPSB0aGlzLnRtcEltZyA9IG5ldyBJbWFnZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbWcgPSA8YW55PmVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0aW1nLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFxuXHRcdFx0aWYgKGltZyAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWcuc3JjfSlgO1xuXHRcdFx0fVxuXG5cdFx0XHRpbWcub25lcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdGltZy5vbmxvYWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHRoaXMudG1wSW1nID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5sb2FkZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVycm9yID0gZmFsc2U7XG5cblx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG5cdFx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID8gZWxlbWVudC5jbG9zZXN0KHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQpIDogZWxlbWVudDtcblxuXHRcdFx0XHRpZiAodGFyZ2V0KSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpIHtcblx0XHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aW1nLm9uZXJyb3IgPSAoKSA9PiB7XG5cblx0XHRcdGlmICh0aGlzLl9hbHRlcm5hdGUgJiYgdGhpcy5fYWx0ZXJuYXRlICE9IGltZy5zcmMpIHtcblx0XHRcdFx0aW1nLnNyYyA9IHRoaXMuX2FsdGVybmF0ZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpbWcub25lcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdGltZy5vbmxvYWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHRoaXMudG1wSW1nID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lcnJvciA9IHRydWU7XG5cblx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG5cdFx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID8gZWxlbWVudC5jbG9zZXN0KHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQpIDogZWxlbWVudDtcblxuXHRcdFx0XHRpZiAodGFyZ2V0KSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcikge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGltZy5zcmMgPSB0aGlzLl9zcmM7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0dGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cdFx0dGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRbXCJpb254SW1hZ2VMb2FkZXJcIl0gPSB0aGlzO1xuXHRcdHRoaXMubG9hZCgpO1xuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRbXCJpb254SW1hZ2VMb2FkZXJcIl07XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZUltYWdlc0xvYWRlZChyb290OiBIVE1MRWxlbWVudCwgb3B0aW9ucz86IHtyZXRyeUVycm9yPzogYm9vbGVhbiwgbGF6eT86IGJvb2xlYW59KSB7XG5cblx0bGV0IGltYWdlcyA9IHJvb3QucXVlcnlTZWxlY3RvckFsbChcIltpb254LWltYWdlLWxvYWRlcl1cIik7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGltYWdlOiBFbGVtZW50ICYgSW1hZ2VMb2FkZXJFbGVtZW50ID0gaW1hZ2VzLml0ZW0oaSk7XG5cblx0XHRpZiAoIWltYWdlLmlvbnhJbWFnZUxvYWRlciB8fCAhaW1hZ2UuaW9ueEltYWdlTG9hZGVyLnNyYyB8fCBpbWFnZS5pb254SW1hZ2VMb2FkZXIubG9hZGVkIHx8IChpbWFnZS5pb254SW1hZ2VMb2FkZXIuZXJyb3IgJiYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnJldHJ5RXJyb3IpKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aW1hZ2UuaW9ueEltYWdlTG9hZGVyLnJlbG9hZCgpO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sYXp5KSB7XG5cdFx0YXdhaXQgZW5zdXJlTGF6eUltYWdlc0xvYWRlZChyb290LCB7cmV0cnlFcnJvcjogb3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3J9KTtcblx0fVxufVxuXG5pbnRlcmZhY2UgSW1hZ2VMb2FkZXJFbGVtZW50IHtcblx0aW9ueEltYWdlTG9hZGVyPzogSW1hZ2VMb2FkZXI7XG59XG4iXX0=