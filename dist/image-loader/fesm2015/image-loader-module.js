import { Directive, ElementRef, Input, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
import { ensureLazyLoad } from '@co.mmons/ionic-extensions/lazy-load';

class ImageLoader {
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
function ensureImagesLoaded(root, options) {
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

class ImageLoaderModule {
}
ImageLoaderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ImageLoader],
                exports: [ImageLoader]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { ImageLoader, ImageLoaderModule, ensureImagesLoaded };
//# sourceMappingURL=image-loader-module.js.map
