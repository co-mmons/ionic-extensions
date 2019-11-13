import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from "@angular/core";
import { ensureLazyLoad } from "@co.mmons/ionic-extensions/lazy-load";
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
            yield ensureLazyLoad(root, { retryError: options && options.retryError });
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaW1hZ2UtbG9hZGVyLyIsInNvdXJjZXMiOlsiaW1hZ2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBY3BFLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFFdkIsWUFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQWtCRCxJQUFXLEdBQUcsQ0FBQyxLQUFhO1FBQzNCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFbEIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZDtJQUNGLENBQUM7SUFFRCxJQUFXLEdBQUc7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUdELElBQWMsSUFBSSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDbEIsQ0FBQztJQUdELElBQVcsU0FBUyxDQUFDLEtBQWE7UUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNkO0lBQ0YsQ0FBQztJQUdELElBQWMsVUFBVSxDQUFDLEtBQWE7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUtELElBQVcsVUFBVSxDQUFDLEtBQWlDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFHRCxJQUFjLFdBQVcsQ0FBQyxLQUFpQztRQUMxRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBS0QsSUFBVyxnQkFBZ0IsQ0FBQyxLQUFhO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUdELElBQWMsZ0JBQWdCLENBQUMsS0FBYTtRQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxNQUFNO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUVuQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBRXJCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztnQkFFOUgsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtvQkFDNUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtvQkFDM0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEQ7YUFDRDtZQUVELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNaO0lBQ0YsQ0FBQztJQUVPLElBQUk7UUFFWCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUM1RCxPQUFPO1NBQ1A7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25FO1FBRUQsSUFBSSxPQUFPLEdBQWdCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBRXRELElBQUksR0FBcUIsQ0FBQztRQUUxQix1REFBdUQ7UUFDdkQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssRUFBRTtZQUMzQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1NBQ2hDO2FBQU07WUFDTixHQUFHLEdBQVEsT0FBTyxDQUFDO1NBQ25CO1FBRUQsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFFakIsSUFBSSxHQUFHLEtBQUssT0FBTyxFQUFFO2dCQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUNsRDtZQUVELEdBQUcsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBRXZCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRW5CLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBRXhGLElBQUksTUFBTSxFQUFFO29CQUNYLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7d0JBQzdCLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2xEO29CQUVELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7d0JBQzVCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzlDO2lCQUNEO2FBQ0Q7UUFDRixDQUFDLENBQUM7UUFFRixHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtZQUVsQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNsRCxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzFCLE9BQU87YUFDUDtZQUVELEdBQUcsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBRXZCLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBRXhGLElBQUksTUFBTSxFQUFFO29CQUNYLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7d0JBQzdCLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2xEO29CQUVELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7d0JBQzNCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzdDO2lCQUNEO2FBQ0Q7UUFDRixDQUFDLENBQUM7UUFFRixHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELGVBQWU7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsV0FBVztRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0YsQ0FBQztDQUVELENBQUE7O1lBbE02QixVQUFVOztBQW1CdkM7SUFEQyxLQUFLLENBQUMsS0FBSyxDQUFDO3NDQVFaO0FBT0Q7SUFEQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7dUNBRzFCO0FBR0Q7SUFEQyxLQUFLLENBQUMsV0FBVyxDQUFDOzRDQVFsQjtBQUdEO0lBREMsS0FBSyxDQUFDLDZCQUE2QixDQUFDOzZDQUdwQztBQUtEO0lBREMsS0FBSyxDQUFDLGFBQWEsQ0FBQzs2Q0FHcEI7QUFHRDtJQURDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQzs4Q0FHdEM7QUFLRDtJQURDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQzttREFHM0I7QUFHRDtJQURDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQzttREFHN0M7QUE1RVcsV0FBVztJQU52QixTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUscUJBQXFCO1FBQy9CLElBQUksRUFBRTtZQUNMLDBCQUEwQixFQUFFLE1BQU07U0FDbEM7S0FDRCxDQUFDO0dBQ1csV0FBVyxDQW9NdkI7U0FwTVksV0FBVztBQXNNeEIsTUFBTSxVQUFnQixrQkFBa0IsQ0FBQyxJQUFpQixFQUFFLE9BQWdEOztRQUUzRyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMxRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFJLEtBQUssR0FBaUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO2dCQUMvSixTQUFTO2FBQ1Q7WUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUM1QixNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBQyxVQUFVLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0YsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtlbnN1cmVMYXp5TG9hZH0gZnJvbSBcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2xhenktbG9hZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzIHtcblx0bG9hZGVkPzogc3RyaW5nO1xuXHRsb2FkaW5nPzogc3RyaW5nO1xuXHRlcnJvcj86IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiBcIltpb254LWltYWdlLWxvYWRlcl1cIixcblx0aG9zdDoge1xuXHRcdFwiW2F0dHIuaW9ueC1pbWFnZS1sb2FkZXJdXCI6IFwidHJ1ZVwiXG5cdH1cbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VMb2FkZXIge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcblx0fVxuXG5cdHByaXZhdGUgX3NyYzogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2FsdGVybmF0ZTogc3RyaW5nO1xuXG5cdGxvYWRlZDogYm9vbGVhbjtcblxuXHRsb2FkaW5nOiBib29sZWFuO1xuXG5cdGVycm9yOiBib29sZWFuO1xuXG5cdC8vQHRzLWlnbm9yZVxuXHRwcml2YXRlIHRtcEltZzogSFRNTEltYWdlRWxlbWVudDtcblxuXHRwcml2YXRlIGluaXRpYWxpemVkOiBib29sZWFuO1xuXG5cdEBJbnB1dChcInNyY1wiKVxuXHRwdWJsaWMgc2V0IHNyYyh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0bGV0IG9sZCA9IHRoaXMuX3NyYztcblx0XHR0aGlzLl9zcmMgPSB2YWx1ZTtcblxuXHRcdGlmIChvbGQgIT0gdGhpcy5fc3JjKSB7XG5cdFx0XHR0aGlzLnJlbG9hZCgpO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgc3JjKCkge1xuXHRcdHJldHVybiB0aGlzLl9zcmM7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlclwiKVxuXHRwcm90ZWN0ZWQgc2V0IHNyYzIodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuc3JjID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoXCJhbHRlcm5hdGVcIilcblx0cHVibGljIHNldCBhbHRlcm5hdGUodmFsdWU6IHN0cmluZykge1xuXHRcdGxldCBvbGQgPSB0aGlzLl9hbHRlcm5hdGU7XG5cdFx0dGhpcy5fYWx0ZXJuYXRlID0gdmFsdWU7XG5cblx0XHRpZiAob2xkICE9IHRoaXMuX2FsdGVybmF0ZSkge1xuXHRcdFx0dGhpcy5yZWxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlci1hbHRlcm5hdGVcIilcblx0cHJvdGVjdGVkIHNldCBhbHRlcm5hdGUyKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLmFsdGVybmF0ZSA9IHZhbHVlO1xuXHR9XG5cblx0cHJpdmF0ZSBfY3NzQ2xhc3NlczogSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXM7XG5cblx0QElucHV0KFwiY3NzLWNsYXNzZXNcIilcblx0cHVibGljIHNldCBjc3NDbGFzc2VzKHZhbHVlOiBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3Nlcykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXMgPSB2YWx1ZTtcblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyLWNzcy1jbGFzc2VzXCIpXG5cdHByb3RlY3RlZCBzZXQgY3NzQ2xhc3NlczIodmFsdWU6IEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzKSB7XG5cdFx0dGhpcy5fY3NzQ2xhc3NlcyA9IHZhbHVlO1xuXHR9XG5cblx0cHJpdmF0ZSBfY3NzQ2xhc3Nlc1RhcmdldDogc3RyaW5nO1xuXG5cdEBJbnB1dChcImNzcy1jbGFzc2VzLXRhcmdldFwiKVxuXHRwdWJsaWMgc2V0IGNzc0NsYXNzZXNUYXJnZXQodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPSB2YWx1ZTtcblx0fVxuXG5cdEBJbnB1dChcImlvbngtaW1hZ2UtbG9hZGVyLWNzcy1jbGFzc2VzLXRhcmdldFwiKVxuXHRwcm90ZWN0ZWQgc2V0IGNzc0NsYXNzZXNQYXJlbnQodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPSB2YWx1ZTtcblx0fVxuXG5cdHJlbG9hZCgpIHtcblx0XHRpZiAoIXRoaXMubG9hZGluZyAmJiB0aGlzLmluaXRpYWxpemVkKSB7XG5cdFx0XHR0aGlzLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5lcnJvciA9IGZhbHNlO1xuXG5cdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcykge1xuXG5cdFx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID8gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdCh0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0KSA6IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCkge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dGhpcy5sb2FkKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBsb2FkKCkge1xuXG5cdFx0aWYgKHRoaXMubG9hZGVkIHx8IHRoaXMuZXJyb3IgfHwgIXRoaXMuX3NyYyB8fCB0aGlzLmxvYWRpbmcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzICYmIHRoaXMuX2Nzc0NsYXNzZXMubG9hZGluZykge1xuXHRcdFx0dGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpO1xuXHRcdH1cblxuXHRcdGxldCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXHRcdFxuXHRcdGxldCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cblx0XHQvLyBpZiBob3N0IGVsZW1lbnQgaXMgbm90IDxpbWc+LCB3ZSBuZWVkIHRvIGNyZWF0ZSB0bXAgXG5cdFx0aWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9IFwiaW1nXCIpIHtcblx0XHRcdGltZyA9IHRoaXMudG1wSW1nID0gbmV3IEltYWdlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGltZyA9IDxhbnk+ZWxlbWVudDtcblx0XHR9XG5cblx0XHRpbWcub25sb2FkID0gKCkgPT4ge1xuXHRcdFx0XG5cdFx0XHRpZiAoaW1nICE9PSBlbGVtZW50KSB7XG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltZy5zcmN9KWA7XG5cdFx0XHR9XG5cblx0XHRcdGltZy5vbmVycm9yID0gdW5kZWZpbmVkO1xuXHRcdFx0aW1nLm9ubG9hZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dGhpcy50bXBJbWcgPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLmxvYWRlZCA9IHRydWU7XG5cdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdHRoaXMuZXJyb3IgPSBmYWxzZTtcblxuXHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcblx0XHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPyBlbGVtZW50LmNsb3Nlc3QodGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCkgOiBlbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCkge1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpbWcub25lcnJvciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKHRoaXMuX2FsdGVybmF0ZSAmJiB0aGlzLl9hbHRlcm5hdGUgIT0gaW1nLnNyYykge1xuXHRcdFx0XHRpbWcuc3JjID0gdGhpcy5fYWx0ZXJuYXRlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGltZy5vbmVycm9yID0gdW5kZWZpbmVkO1xuXHRcdFx0aW1nLm9ubG9hZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dGhpcy50bXBJbWcgPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdHRoaXMubG9hZGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVycm9yID0gdHJ1ZTtcblxuXHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcblx0XHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPyBlbGVtZW50LmNsb3Nlc3QodGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCkgOiBlbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aW1nLnNyYyA9IHRoaXMuX3NyYztcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHR0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFtcImlvbnhJbWFnZUxvYWRlclwiXSA9IHRoaXM7XG5cdFx0dGhpcy5sb2FkKCk7XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFtcImlvbnhJbWFnZUxvYWRlclwiXTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlSW1hZ2VzTG9hZGVkKHJvb3Q6IEhUTUxFbGVtZW50LCBvcHRpb25zPzoge3JldHJ5RXJyb3I/OiBib29sZWFuLCBsYXp5PzogYm9vbGVhbn0pIHtcblxuXHRsZXQgaW1hZ2VzID0gcm9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiW2lvbngtaW1hZ2UtbG9hZGVyXVwiKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgaW1hZ2U6IEVsZW1lbnQgJiBJbWFnZUxvYWRlckVsZW1lbnQgPSBpbWFnZXMuaXRlbShpKTtcblxuXHRcdGlmICghaW1hZ2UuaW9ueEltYWdlTG9hZGVyIHx8ICFpbWFnZS5pb254SW1hZ2VMb2FkZXIuc3JjIHx8IGltYWdlLmlvbnhJbWFnZUxvYWRlci5sb2FkZWQgfHwgKGltYWdlLmlvbnhJbWFnZUxvYWRlci5lcnJvciAmJiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucmV0cnlFcnJvcikpKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpbWFnZS5pb254SW1hZ2VMb2FkZXIucmVsb2FkKCk7XG5cdH1cblxuXHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxhenkpIHtcblx0XHRhd2FpdCBlbnN1cmVMYXp5TG9hZChyb290LCB7cmV0cnlFcnJvcjogb3B0aW9ucyAmJiBvcHRpb25zLnJldHJ5RXJyb3J9KTtcblx0fVxufVxuXG5pbnRlcmZhY2UgSW1hZ2VMb2FkZXJFbGVtZW50IHtcblx0aW9ueEltYWdlTG9hZGVyPzogSW1hZ2VMb2FkZXI7XG59XG4iXX0=