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
                if (this._cssClasses.loading) {
                    target.classList.remove(this._cssClasses.loading);
                }
                if (this._cssClasses.loaded) {
                    target.classList.add(this._cssClasses.loaded);
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
                if (this._cssClasses.loading) {
                    target.classList.remove(this._cssClasses.loading);
                }
                if (this._cssClasses.error) {
                    target.classList.add(this._cssClasses.error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW1hZ2UtbG9hZGVyLyIsInNvdXJjZXMiOlsiaW1hZ2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFjN0UsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUV2QixZQUFvQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUNwRCxDQUFDO0lBa0JELElBQVcsR0FBRyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVsQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNkO0lBQ0YsQ0FBQztJQUVELElBQVcsR0FBRztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBR0QsSUFBYyxJQUFJLENBQUMsS0FBYTtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBR0QsSUFBVyxTQUFTLENBQUMsS0FBYTtRQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Q7SUFDRixDQUFDO0lBR0QsSUFBYyxVQUFVLENBQUMsS0FBYTtRQUNyQyxJQUFJLENBQUMsU0FBUyxH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O0lBQ0YsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtlbnN1cmVMYXp5SW1hZ2VzTG9hZGVkfSBmcm9tIFwiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1pbWFnZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzIHtcblx0bG9hZGVkPzogc3RyaW5nO1xuXHRsb2FkaW5nPzogc3RyaW5nO1xuXHRlcnJvcj86IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiBcIltpb254LWltYWdlLWxvYWRlcl1cIixcblx0aG9zdDoge1xuXHRcdFwiW2F0dHIuaW9ueC1pbWFnZS1sb2FkZXJdXCI6IFwidHJ1ZVwiXG5cdH1cbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VMb2FkZXIge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcblx0fVxuXG5cdHByaXZhdGUgX3NyYzogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2FsdGVybmF0ZTogc3RyaW5nO1xuXG5cdGxvYWRlZDogYm9vbGVhbjtcblxuXHRsb2FkaW5nOiBib29sZWFuO1xuXG5cdGVycm9yOiBib29sZWFuO1xuXG5cdC8vQHRzLWlnbm9yZVxuXHRwcml2YXRlIHRtcEltZzogSFRNTEltYWdlRWxlbWVudDtcblxuXHRwcml2YXRlIGluaXRpYWxpemVkOiBib29sZWFuO1xuXG5cdEBJbnB1dChcInNyY1wiKVxuXHRwdWJsaWMgc2V0IHNyYyh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0bGV0IG9sZCA9IHRoaXMuX3NyYztcblx0XHR0aGlzLl9zcmMgPSB2YWx1ZTtcblxuXHRcdGlmIChvbGQgIT0gdGhpcy5fc3JjKSB7XG5cdFx0XHR0aGlzLnJlbG9hZCgpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgc3JjKCkge1xuXHRcdHJldHVybiB0aGlzLl9zcmM7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlclwiKVxuXHRwcm90ZWN0ZWQgc2V0IHNyYzIodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuc3JjID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoXCJhbHRlcm5hdGVcIilcblx0cHVibGljIHNldCBhbHRlcm5hdGUodmFsdWU6IHN0cmluZykge1xuXHRcdGxldCBvbGQgPSB0aGlzLl9hbHRlcm5hdGU7XG5cdFx0dGhpcy5fYWx0ZXJuYXRlID0gdmFsdWU7XG5cblx0XHRpZiAob2xkICE9IHRoaXMuX2FsdGVybmF0ZSkge1xuXHRcdFx0dGhpcy5yZWxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlci1hbHRlcm5hdGVcIilcblx0cHJvdGVjdGVkIHNldCBhbHRlcm5hdGUyKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLmFsdGVybmF0ZSA9IHZhbHVlO1xuXHR9XG5cblx0cHJpdmF0ZSBfY3NzQ2xhc3NlczogSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXM7XG5cblx0QElucHV0KFwiY3NzLWNsYXNzZXNcIilcblx0cHVibGljIHNldCBjc3NDbGFzc2VzKHZhbHVlOiBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3Nlcykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXMgPSB2YWx1ZTtcblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyLWNzcy1jbGFzc2VzXCIpXG5cdHByb3RlY3RlZCBzZXQgY3NzQ2xhc3NlczIodmFsdWU6IEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzKSB7XG5cdFx0dGhpcy5fY3NzQ2xhc3NlcyA9IHZhbHVlO1xuXHR9XG5cblx0cHJpdmF0ZSBfY3NzQ2xhc3Nlc1RhcmdldDogc3RyaW5nO1xuXG5cdEBJbnB1dChcImNzcy1jbGFzc2VzLXRhcmdldFwiKVxuXHRwdWJsaWMgc2V0IGNzc0NsYXNzZXNUYXJnZXQodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPSB2YWx1ZTtcblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyLWNzcy1jbGFzc2VzLXRhcmdldFwiKVxuXHRwcm90ZWN0ZWQgc2V0IGNzc0NsYXNzZXNQYXJlbnQodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPSB2YWx1ZTtcblx0fVxuXG5cdHJlbG9hZCgpIHtcblx0XHRpZiAoIXRoaXMubG9hZGluZyAmJiB0aGlzLmluaXRpYWxpemVkKSB7XG5cdFx0XHR0aGlzLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lcnJvciA9IGZhbHNlO1xuXG5cdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcykge1xuXG5cdFx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID8gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdCh0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0KSA6IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCkge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dGhpcy5sb2FkKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBsb2FkKCkge1xuXG5cdFx0aWYgKHRoaXMubG9hZGVkIHx8IHRoaXMuZXJyb3IgfHwgIXRoaXMuX3NyYyB8fCB0aGlzLmxvYWRpbmcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzICYmIHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZykge1xuXHRcdFx0dGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpO1xuXHRcdH1cblxuXHRcdGxldCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXHRcdFxuXHRcdGxldCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cblx0XHQvLyBpZiBob3N0IGVsZW1lbnQgaXMgbm90IDxpbWc+LCB3ZSBuZWVkIHRvIGNyZWF0ZSB0bXAgXG5cdFx0aWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9IFwiaW1nXCIpIHtcblx0XHRcdGltZyA9IHRoaXMudG1wSW1nID0gbmV3IEltYWdlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGltZyA9IDxhbnk+ZWxlbWVudDtcblx0XHR9XG5cblx0XHRpbWcub25sb2FkID0gKCkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoaW1nICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltZy5zcmN9KWA7XG5cdFx0XHR9XG5cblx0XHRcdGltZy5vbmVycm9yID0gdW5kZWZpbmVkO1xuXHRcdFx0aW1nLm9ubG9hZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dGhpcy50bXBJbWcgPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLmxvYWRlZCA9IHRydWU7XG5cdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdHRoaXMuZXJyb3IgPSBmYWxzZTtcblxuXHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcblx0XHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPyBlbGVtZW50LmNsb3Nlc3QodGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCkgOiBlbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpIHtcblx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGltZy5vbmVycm9yID0gKCkgPT4ge1xuXG5cdFx0XHRpZiAodGhpcy5fYWx0ZXJuYXRlICYmIHRoaXMuX2FsdGVybmF0ZSAhPSBpbWcuc3JjKSB7XG5cdFx0XHRcdGltZy5zcmMgPSB0aGlzLl9hbHRlcm5hdGU7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aW1nLm9uZXJyb3IgPSB1bmRlZmluZWQ7XG5cdFx0XHRpbWcub25sb2FkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR0aGlzLnRtcEltZyA9IHVuZGVmaW5lZDtcblx0XHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZXJyb3IgPSB0cnVlO1xuXG5cdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcykge1xuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA/IGVsZW1lbnQuY2xvc2VzdCh0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0KSA6IGVsZW1lbnQ7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZykge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcikge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Nzc0NsYXNzZXMuZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGltZy5zcmMgPSB0aGlzLl9zcmM7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0dGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cdFx0dGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRbXCJpb254SW1hZ2VMb2FkZXJcIl0gPSB0aGlzO1xuXHRcdHRoaXMubG9hZCgpO1xuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRbXCJpb254SW1hZ2VMb2FkZXJcIl07XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZUltYWdlc0xvYWRlZChyb290OiBIVE1MRWxlbWVudCwgb3B0aW9ucz86IHtyZXRyeUVycm9yPzogYm9vbGVhbiwgbGF6eT86IGJvb2xlYW59KSB7XG5cblx0bGV0IGltYWdlcyA9IHJvb3QucXVlcnlTZWxlY3RvckFsbChcIltpb254LWltYWdlLWxvYWRlcl1cIik7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGltYWdlOiBFbGVtZW50ICYgSW1hZ2VMb2FkZXJFbGVtZW50ID0gaW1hZ2VzLml0ZW0oaSk7XG5cblx0XHRpZiAoIWltYWdlLmlvbnhJbWFnZUxvYWRlciB8fCAhaW1hZ2UuaW9ueEltYWdlTG9hZGVyLnNyYyB8fCBpbWFnZS5pb254SW1hZ2VMb2FkZXIubG9hZGVkIHx8IChpbWFnZS5pb254SW1hZ2VMb2FkZXIuZXJyb3IgJiYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnJldHJ5RXJyb3IpKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aW1hZ2UuaW9ueEltYWdlTG9hZGVyLnJlbG9hZCgpO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sYXp5KSB7XG5cdFx0YXdhaXQgZW5zdXJlTGF6eUltYWdlc0xvYWRlZChyb290LCB7cmV0cnlFcnJvcjogb3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3J9KTtcblx0fVxufVxuXG5pbnRlcmZhY2UgSW1hZ2VMb2FkZXJFbGVtZW50IHtcblx0aW9ueEltYWdlTG9hZGVyPzogSW1hZ2VMb2FkZXI7XG59XG4iXX0=