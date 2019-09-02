import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from "@angular/core";
import { ensureLazyImagesLoaded } from "../lazy-image/lazy-load";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJpbWFnZS1sb2FkZXIvaW1hZ2UtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFjL0QsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUV2QixZQUFvQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUNwRCxDQUFDO0lBa0JELElBQVcsR0FBRyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVsQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNkO0lBQ0YsQ0FBQztJQUVELElBQVcsR0FBRztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBR0QsSUFBYyxJQUFJLENBQUMsS0FBYTtRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBR0QsSUFBVyxTQUFTLENBQUMsS0FBYTtRQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Q7SUFDRixDQUFDO0lBR0QsSUFBYyxVQUFVLENBQUMsS0FBYTtRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBS0QsSUFBVyxVQUFVLENBQUMsS0FBaUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUdELElBQWMsV0FBVyxDQUFDLEtBQWlDO1FBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFLRCxJQUFXLGdCQUFnQixDQUFDLEtBQWE7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBR0QsSUFBYyxnQkFBZ0IsQ0FBQyxLQUFhO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVELE1BQU07UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRW5CLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFFckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO2dCQUU5SCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO29CQUM1QixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNqRDtnQkFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO29CQUMzQixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoRDthQUNEO1lBRUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ1o7SUFDRixDQUFDO0lBRU8sSUFBSTtRQUVYLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVELE9BQU87U0FDUDtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFJLE9BQU8sR0FBZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFdEQsSUFBSSxHQUFxQixDQUFDO1FBRTFCLHVEQUF1RDtRQUN2RCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxFQUFFO1lBQzNDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7U0FDaEM7YUFBTTtZQUNOLEdBQUcsR0FBUSxPQUFPLENBQUM7U0FDbkI7UUFFRCxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUVqQixJQUFJLEdBQUcsS0FBSyxPQUFPLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2xEO1lBRUQsR0FBRyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDeEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFFdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFFbkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFFeEYsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtvQkFDN0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbEQ7Z0JBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtvQkFDNUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDOUM7YUFDRDtRQUNGLENBQUMsQ0FBQztRQUVGLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBRWxCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xELEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDMUIsT0FBTzthQUNQO1lBRUQsR0FBRyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDeEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFFdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFFbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFFeEYsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtvQkFDN0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbEQ7Z0JBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtvQkFDM0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0M7YUFDRDtRQUNGLENBQUMsQ0FBQztRQUVGLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsZUFBZTtRQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCxXQUFXO1FBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDckQ7SUFDRixDQUFDO0NBRUQsQ0FBQTtBQTNLQTtJQURDLEtBQUssQ0FBQyxLQUFLLENBQUM7OztzQ0FRWjtBQU9EO0lBREMsS0FBSyxDQUFDLG1CQUFtQixDQUFDOzs7dUNBRzFCO0FBR0Q7SUFEQyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7NENBUWxCO0FBR0Q7SUFEQyxLQUFLLENBQUMsNkJBQTZCLENBQUM7Ozs2Q0FHcEM7QUFLRDtJQURDLEtBQUssQ0FBQyxhQUFhLENBQUM7Ozs2Q0FHcEI7QUFHRDtJQURDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQzs7OzhDQUd0QztBQUtEO0lBREMsS0FBSyxDQUFDLG9CQUFvQixDQUFDOzs7bURBRzNCO0FBR0Q7SUFEQyxLQUFLLENBQUMsc0NBQXNDLENBQUM7OzttREFHN0M7QUE1RVcsV0FBVztJQU52QixTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUscUJBQXFCO1FBQy9CLElBQUksRUFBRTtZQUNMLDBCQUEwQixFQUFFLE1BQU07U0FDbEM7S0FDRCxDQUFDOzZDQUc0QixVQUFVO0dBRjNCLFdBQVcsQ0FnTXZCO1NBaE1ZLFdBQVc7QUFrTXhCLE1BQU0sVUFBZ0Isa0JBQWtCLENBQUMsSUFBaUIsRUFBRSxPQUFnRDs7UUFFM0csSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxLQUFLLEdBQWlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtnQkFDL0osU0FBUzthQUNUO1lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMvQjtRQUVELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDNUIsTUFBTSxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsRUFBQyxVQUFVLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1NBQ2hGO0lBQ0YsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtlbnN1cmVMYXp5SW1hZ2VzTG9hZGVkfSBmcm9tIFwiLi4vbGF6eS1pbWFnZS9sYXp5LWxvYWRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3NlcyB7XG5cdGxvYWRlZD86IHN0cmluZztcblx0bG9hZGluZz86IHN0cmluZztcblx0ZXJyb3I/OiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJbaW9ueC1pbWFnZS1sb2FkZXJdXCIsXG5cdGhvc3Q6IHtcblx0XHRcIlthdHRyLmlvbngtaW1hZ2UtbG9hZGVyXVwiOiBcInRydWVcIlxuXHR9XG59KVxuZXhwb3J0IGNsYXNzIEltYWdlTG9hZGVyIHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG5cdH1cblxuXHRwcml2YXRlIF9zcmM6IHN0cmluZztcblxuXHRwcml2YXRlIF9hbHRlcm5hdGU6IHN0cmluZztcblxuXHRsb2FkZWQ6IGJvb2xlYW47XG5cblx0bG9hZGluZzogYm9vbGVhbjtcblxuXHRlcnJvcjogYm9vbGVhbjtcblxuXHQvL0B0cy1pZ25vcmVcblx0cHJpdmF0ZSB0bXBJbWc6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cblx0cHJpdmF0ZSBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuXHRASW5wdXQoXCJzcmNcIilcblx0cHVibGljIHNldCBzcmModmFsdWU6IHN0cmluZykge1xuXHRcdGxldCBvbGQgPSB0aGlzLl9zcmM7XG5cdFx0dGhpcy5fc3JjID0gdmFsdWU7XG5cblx0XHRpZiAob2xkICE9IHRoaXMuX3NyYykge1xuXHRcdFx0dGhpcy5yZWxvYWQoKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHNyYygpIHtcblx0XHRyZXR1cm4gdGhpcy5fc3JjO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXJcIilcblx0cHJvdGVjdGVkIHNldCBzcmMyKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLnNyYyA9IHZhbHVlO1xuXHR9XG5cblx0QElucHV0KFwiYWx0ZXJuYXRlXCIpXG5cdHB1YmxpYyBzZXQgYWx0ZXJuYXRlKHZhbHVlOiBzdHJpbmcpIHtcblx0XHRsZXQgb2xkID0gdGhpcy5fYWx0ZXJuYXRlO1xuXHRcdHRoaXMuX2FsdGVybmF0ZSA9IHZhbHVlO1xuXG5cdFx0aWYgKG9sZCAhPSB0aGlzLl9hbHRlcm5hdGUpIHtcblx0XHRcdHRoaXMucmVsb2FkKCk7XG5cdFx0fVxuXHR9XG5cblx0QElucHV0KFwiaW9ueC1pbWFnZS1sb2FkZXItYWx0ZXJuYXRlXCIpXG5cdHByb3RlY3RlZCBzZXQgYWx0ZXJuYXRlMih2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5hbHRlcm5hdGUgPSB2YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgX2Nzc0NsYXNzZXM6IEltYWdlTG9hZGVyU3RhdGVDc3NDbGFzc2VzO1xuXG5cdEBJbnB1dChcImNzcy1jbGFzc2VzXCIpXG5cdHB1YmxpYyBzZXQgY3NzQ2xhc3Nlcyh2YWx1ZTogSW1hZ2VMb2FkZXJTdGF0ZUNzc0NsYXNzZXMpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlci1jc3MtY2xhc3Nlc1wiKVxuXHRwcm90ZWN0ZWQgc2V0IGNzc0NsYXNzZXMyKHZhbHVlOiBJbWFnZUxvYWRlclN0YXRlQ3NzQ2xhc3Nlcykge1xuXHRcdHRoaXMuX2Nzc0NsYXNzZXMgPSB2YWx1ZTtcblx0fVxuXG5cdHByaXZhdGUgX2Nzc0NsYXNzZXNUYXJnZXQ6IHN0cmluZztcblxuXHRASW5wdXQoXCJjc3MtY2xhc3Nlcy10YXJnZXRcIilcblx0cHVibGljIHNldCBjc3NDbGFzc2VzVGFyZ2V0KHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID0gdmFsdWU7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWltYWdlLWxvYWRlci1jc3MtY2xhc3Nlcy10YXJnZXRcIilcblx0cHJvdGVjdGVkIHNldCBjc3NDbGFzc2VzUGFyZW50KHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID0gdmFsdWU7XG5cdH1cblxuXHRyZWxvYWQoKSB7XG5cdFx0aWYgKCF0aGlzLmxvYWRpbmcgJiYgdGhpcy5pbml0aWFsaXplZCkge1xuXHRcdFx0dGhpcy5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZXJyb3IgPSBmYWxzZTtcblxuXHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcblxuXHRcdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCA/IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QodGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCkgOiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkZWQpIHtcblx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5lcnJvcikge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Nzc0NsYXNzZXMuZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMubG9hZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgbG9hZCgpIHtcblxuXHRcdGlmICh0aGlzLmxvYWRlZCB8fCB0aGlzLmVycm9yIHx8ICF0aGlzLl9zcmMgfHwgdGhpcy5sb2FkaW5nKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5fY3NzQ2xhc3NlcyAmJiB0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpIHtcblx0XHRcdHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKTtcblx0XHR9XG5cblx0XHRsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblx0XHRcblx0XHRsZXQgaW1nOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG5cdFx0Ly8gaWYgaG9zdCBlbGVtZW50IGlzIG5vdCA8aW1nPiwgd2UgbmVlZCB0byBjcmVhdGUgdG1wIFxuXHRcdGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPSBcImltZ1wiKSB7XG5cdFx0XHRpbWcgPSB0aGlzLnRtcEltZyA9IG5ldyBJbWFnZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbWcgPSA8YW55PmVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0aW1nLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFxuXHRcdFx0aWYgKGltZyAhPT0gZWxlbWVudCkge1xuXHRcdFx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWcuc3JjfSlgO1xuXHRcdFx0fVxuXG5cdFx0XHRpbWcub25lcnJvciA9IHVuZGVmaW5lZDtcblx0XHRcdGltZy5vbmxvYWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHRoaXMudG1wSW1nID0gdW5kZWZpbmVkO1xuXHRcdFx0dGhpcy5sb2FkZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVycm9yID0gZmFsc2U7XG5cblx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG5cdFx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLl9jc3NDbGFzc2VzVGFyZ2V0ID8gZWxlbWVudC5jbG9zZXN0KHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQpIDogZWxlbWVudDtcblxuXHRcdFx0XHRpZiAodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKSB7XG5cdFx0XHRcdFx0dGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fY3NzQ2xhc3Nlcy5sb2FkaW5nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRlZCkge1xuXHRcdFx0XHRcdHRhcmdldC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Nzc0NsYXNzZXMubG9hZGVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpbWcub25lcnJvciA9ICgpID0+IHtcblxuXHRcdFx0aWYgKHRoaXMuX2FsdGVybmF0ZSAmJiB0aGlzLl9hbHRlcm5hdGUgIT0gaW1nLnNyYykge1xuXHRcdFx0XHRpbWcuc3JjID0gdGhpcy5fYWx0ZXJuYXRlO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGltZy5vbmVycm9yID0gdW5kZWZpbmVkO1xuXHRcdFx0aW1nLm9ubG9hZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dGhpcy50bXBJbWcgPSB1bmRlZmluZWQ7XG5cdFx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdHRoaXMubG9hZGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmVycm9yID0gdHJ1ZTtcblxuXHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcblx0XHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuX2Nzc0NsYXNzZXNUYXJnZXQgPyBlbGVtZW50LmNsb3Nlc3QodGhpcy5fY3NzQ2xhc3Nlc1RhcmdldCkgOiBlbGVtZW50O1xuXG5cdFx0XHRcdGlmICh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpIHtcblx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9jc3NDbGFzc2VzLmxvYWRpbmcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX2Nzc0NsYXNzZXMuZXJyb3IpIHtcblx0XHRcdFx0XHR0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLl9jc3NDbGFzc2VzLmVycm9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpbWcuc3JjID0gdGhpcy5fc3JjO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50W1wiaW9ueEltYWdlTG9hZGVyXCJdID0gdGhpcztcblx0XHR0aGlzLmxvYWQoKTtcblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50W1wiaW9ueEltYWdlTG9hZGVyXCJdO1xuXHRcdH1cblx0fVxuXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbnN1cmVJbWFnZXNMb2FkZWQocm9vdDogSFRNTEVsZW1lbnQsIG9wdGlvbnM/OiB7cmV0cnlFcnJvcj86IGJvb2xlYW4sIGxhenk/OiBib29sZWFufSkge1xuXG5cdGxldCBpbWFnZXMgPSByb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbaW9ueC1pbWFnZS1sb2FkZXJdXCIpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBpbWFnZTogRWxlbWVudCAmIEltYWdlTG9hZGVyRWxlbWVudCA9IGltYWdlcy5pdGVtKGkpO1xuXG5cdFx0aWYgKCFpbWFnZS5pb254SW1hZ2VMb2FkZXIgfHwgIWltYWdlLmlvbnhJbWFnZUxvYWRlci5zcmMgfHwgaW1hZ2UuaW9ueEltYWdlTG9hZGVyLmxvYWRlZCB8fCAoaW1hZ2UuaW9ueEltYWdlTG9hZGVyLmVycm9yICYmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5yZXRyeUVycm9yKSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGltYWdlLmlvbnhJbWFnZUxvYWRlci5yZWxvYWQoKTtcblx0fVxuXG5cdGlmIChvcHRpb25zICYmIG9wdGlvbnMubGF6eSkge1xuXHRcdGF3YWl0IGVuc3VyZUxhenlJbWFnZXNMb2FkZWQocm9vdCwge3JldHJ5RXJyb3I6IG9wdGlvbnMgJiYgb3B0aW9ucy5yZXRyeUVycm9yfSk7XG5cdH1cbn1cblxuaW50ZXJmYWNlIEltYWdlTG9hZGVyRWxlbWVudCB7XG5cdGlvbnhJbWFnZUxvYWRlcj86IEltYWdlTG9hZGVyO1xufSJdfQ==