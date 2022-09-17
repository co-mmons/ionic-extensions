import { __awaiter } from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { ensureLazyLoad } from "@co.mmons/ionic-extensions/lazy-load";
export class ImageLoader {
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
}
ImageLoader.decorators = [
    { type: Directive, args: [{
                selector: "[ionx-image-loader]",
                host: {
                    "[attr.ionx-image-loader]": "true"
                }
            },] }
];
ImageLoader.ctorParameters = () => [
    { type: ElementRef }
];
ImageLoader.propDecorators = {
    src: [{ type: Input, args: ["src",] }],
    src2: [{ type: Input, args: ["ionx-image-loader",] }],
    alternate: [{ type: Input, args: ["alternate",] }],
    alternate2: [{ type: Input, args: ["ionx-image-loader-alternate",] }],
    cssClasses: [{ type: Input, args: ["css-classes",] }],
    cssClasses2: [{ type: Input, args: ["ionx-image-loader-css-classes",] }],
    cssClassesTarget: [{ type: Input, args: ["css-classes-target",] }],
    cssClassesParent: [{ type: Input, args: ["ionx-image-loader-css-classes-target",] }]
};
export function ensureImagesLoaded(root, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let images = root.querySelectorAll("[ionx-image-loader]");
        for (let i = 0; i < images.length; i++) {
            let image = images.item(i);
            if (!image.ionxImageLoader || !image.ionxImageLoader.src || image.ionxImageLoader.loaded || (image.ionxImageLoader.error && (!options || !options.retryError))) {
                continue;
            }
            image.ionxImageLoader.reload();
        }
        if (options && options.lazy) {
            yield ensureLazyLoad(root, { retryError: options && options.retryError });
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ltYWdlLWxvYWRlci9pbWFnZS1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFjcEUsTUFBTSxPQUFPLFdBQVc7SUFFdkIsWUFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQWlCRCxJQUNXLEdBQUcsQ0FBQyxLQUFhO1FBQzNCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFbEIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZDtJQUNGLENBQUM7SUFFRCxJQUFXLEdBQUc7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQ2MsSUFBSSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQ1csU0FBUyxDQUFDLEtBQWE7UUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNkO0lBQ0YsQ0FBQztJQUVELElBQ2MsVUFBVSxDQUFDLEtBQWE7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUlELElB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LFNBQUMsNkJBQTZCO3lCQU9uQyxLQUFLLFNBQUMsYUFBYTswQkFLbkIsS0FBSyxTQUFDLCtCQUErQjsrQkFPckMsS0FBSyxTQUFDLG9CQUFvQjsrQkFLMUIsS0FBSyxTQUFDLHNDQUFzQzs7QUE2SDlDLE1BQU0sVUFBZ0Isa0JBQWtCLENBQUMsSUFBaUIsRUFBRSxPQUFnRDs7UUFFM0csSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxLQUFLLEdBQWlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtnQkFDL0osU0FBUzthQUNUO1lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMvQjtRQUVELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDNUIsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUMsVUFBVSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztTQUN4RTtJQUNGLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7ZW5zdXJlTGF6eUxvYWR9IGZyb20gXCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9sYXp5LWxvYWRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3NlcyB7XG5cdGxvYWRlZD86IHN0cmluZztcblx0bG9hZGluZz86IHN0cmluZztcblx0ZXJyb3I/OiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJbaW9ueC1pbWFnZS1sb2FkZXJdXCIsXG5cdGhvc3Q6IHtcblx0XHRcIlthdHRyLmlvbngtaW1hZ2UtbG9hZGVyXVwiOiBcInRydWVcIlxuXHR9XG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyIHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG5cdH1cblxuXHRwcml2YXRlIF9zcmM6IHN0cmluZztcblxuXHRwcml2YXRlIF9hbHRlcm5hdGU6IHN0cmluZztcblxuXHRsb2FkZWQ6IGJvb2xlYW47XG5cblx0bG9hZGluZzogYm9vbGVhbjtcblxuXHRlcnJvcjogYm9vbGVhbjtcblxuXHQvL0B0cy1pZ25vcmVcblx0cHJpdmF0ZSB0bXBJbWc6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cblx0cHJpdmF0ZSBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuXHRASW5wdXQoXCJzcmNcIilcblx0cHVibGljIHNldCBzcmModmFsdWU6IHN0cmluZykge1xuXHRcdGxldCBvbGQgPSB0aGlzLl9zcmM7XG5cdFx0dGhpcy5fc3JjID0gdmFsdWU7XG5cblx0XHRpZiAob2xkICE9IHRoaXMuX3NyYykge1xuXHRcdFx0dGhpcy5yZWxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHNyYygpIHtcblx0XHRyZXR1cm4gdGhpcy5fc3JjO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXJcIilcblx0cHJvdGVjdGVkIHNldCBzcmMyKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLnNyYyA9IHZhbHVlO1xuXHR9XG5cblx0QElucHV0KFwiYWx0ZXJuYXRlXCIpXG5cdHB1YmxpYyBzZXQgYWx0ZXJuYXRlKHZhbHVlOiBzdHJpbmcpIHtcblx0XHRsZXQgb2xkID0gdGhpcy5fYWx0ZXJuYXRlO1xuXHRcdHRoaXMuX2FsdGVybmF0ZSA9IHZhbHVlO1xuXG5cdFx0aWYgKG9sZCAhPSB0aGlzLl9hbHRlcm5hdGUpIHtcblx0XHRcdHRoaXMucmVsb2FkKCk7XG5cdFx0fVxuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXItYWx0ZXJuYXRlXCIpXG5cdHByb3RlY3RlZCBzZXQgYWx0ZXJuYXRlMih2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5hbHRlcm5hdGUgPSB2YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgX2Nzc0NsYXNzZXM6IEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzO1xuXG5cdEBJbnB1dChcImNzcy1jbGFzc2VzXCIpXG5cdHB1YmxpYyBzZXQgY3NzQ2xhc3Nlcyh2YWx1ZTogSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXMpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlci1jc3MtY2xhc3Nlc1wiKVxuXHRwcm90ZWN0ZWQgc2V0IGNzc0NsYXNzZXMyKHZhbHVlOiBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3Nlcykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXMgPSB2YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgX2Nzc0NsYXNzZXNUYXJnZXQ6IHN0cmluZztcblxuXHRASW5wdXQoXCJjc3MtY2xhc3Nlcy10YXJnZXRcIilcblx0cHVibGljIHNldCBjc3NDbGFzc2VzVGFyZ2V0KHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlci1jc3MtY2xhc3Nlcy10YXJnZXRcIilcblx0cHJvdGVjdGVkIHNldCBjc3NDbGFzc2VzUGFyZW50KHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID0gdmFsdWU7XG5cdH1cblxuXHRyZWxvYWQoKSB7XG5cdFx0aWYgKCF0aGlzLmxvYWRpbmcgJiYgdGhpcy5pbml0aWFsaXplZCkge1xuXHRcdFx0dGhpcy5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZXJyb3IgPSBmYWxzZTtcblxuXHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcblxuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA/IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QodGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCkgOiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpIHtcblx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcikge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMuZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMubG9hZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgbG9hZCgpIHtcblxuXHRcdGlmICh0aGlzLmxvYWRlZCB8fCB0aGlzLmVycm9yIHx8ICF0aGlzLl9zcmMgfHwgdGhpcy5sb2FkaW5nKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5fY3NzQ2xhc3NlcyAmJiB0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpIHtcblx0XHRcdHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKTtcblx0XHR9XG5cblx0XHRsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblx0XHRcblx0XHRsZXQgaW1nOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG5cdFx0Ly8gaWYgaG9zdCBlbGVtZW50IGlzIG5vdCA8aW1nPiwgd2UgbmVlZCB0byBjcmVhdGUgdG1wIFxuXHRcdGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPSBcImltZ1wiKSB7XG5cdFx0XHRpbWcgPSB0aGlzLnRtcEltZyA9IG5ldyBJbWFnZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbWcgPSA8YW55PmVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0aW1nLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFxuXHRcdFx0aWYgKGltZyAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWcuc3JjfSlgO1xuXHRcdFx0fVxuXG5cdFx0XHRpbWcub25lcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdGltZy5vbmxvYWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHRoaXMudG1wSW1nID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5sb2FkZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVycm9yID0gZmFsc2U7XG5cblx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG5cdFx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID8gZWxlbWVudC5jbG9zZXN0KHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQpIDogZWxlbWVudDtcblxuXHRcdFx0XHRpZiAodGFyZ2V0KSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpIHtcblx0XHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aW1nLm9uZXJyb3IgPSAoKSA9PiB7XG5cblx0XHRcdGlmICh0aGlzLl9hbHRlcm5hdGUgJiYgdGhpcy5fYWx0ZXJuYXRlICE9IGltZy5zcmMpIHtcblx0XHRcdFx0aW1nLnNyYyA9IHRoaXMuX2FsdGVybmF0ZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpbWcub25lcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdGltZy5vbmxvYWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHRoaXMudG1wSW1nID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lcnJvciA9IHRydWU7XG5cblx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG5cdFx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID8gZWxlbWVudC5jbG9zZXN0KHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQpIDogZWxlbWVudDtcblxuXHRcdFx0XHRpZiAodGFyZ2V0KSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZykge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcikge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGltZy5zcmMgPSB0aGlzLl9zcmM7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0dGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cdFx0dGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRbXCJpb254SW1hZ2VMb2FkZXJcIl0gPSB0aGlzO1xuXHRcdHRoaXMubG9hZCgpO1xuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRkZWxldGUgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRbXCJpb254SW1hZ2VMb2FkZXJcIl07XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVuc3VyZUltYWdlc0xvYWRlZChyb290OiBIVE1MRWxlbWVudCwgb3B0aW9ucz86IHtyZXRyeUVycm9yPzogYm9vbGVhbiwgbGF6eT86IGJvb2xlYW59KSB7XG5cblx0bGV0IGltYWdlcyA9IHJvb3QucXVlcnlTZWxlY3RvckFsbChcIltpb254LWltYWdlLWxvYWRlcl1cIik7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IGltYWdlOiBFbGVtZW50ICYgSW1hZ2VMb2FkZXJFbGVtZW50ID0gaW1hZ2VzLml0ZW0oaSk7XG5cblx0XHRpZiAoIWltYWdlLmlvbnhJbWFnZUxvYWRlciB8fCAhaW1hZ2UuaW9ueEltYWdlTG9hZGVyLnNyYyB8fCBpbWFnZS5pb254SW1hZ2VMb2FkZXIubG9hZGVkIHx8IChpbWFnZS5pb254SW1hZ2VMb2FkZXIuZXJyb3IgJiYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnJldHJ5RXJyb3IpKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aW1hZ2UuaW9ueEltYWdlTG9hZGVyLnJlbG9hZCgpO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sYXp5KSB7XG5cdFx0YXdhaXQgZW5zdXJlTGF6eUxvYWQocm9vdCwge3JldHJ5RXJyb3I6IG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yfSk7XG5cdH1cbn1cblxuaW50ZXJmYWNlIEltYWdlTG9hZGVyRWxlbWVudCB7XG5cdGlvbnhJbWFnZUxvYWRlcj86IEltYWdlTG9hZGVyO1xufVxuIl19