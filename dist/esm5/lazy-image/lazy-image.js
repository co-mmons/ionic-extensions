import * as tslib_1 from "tslib";
import { ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, Optional, QueryList, Renderer } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
import { LazyLoad } from "./lazy-load";
var LazyImage = /** @class */ (function () {
    function LazyImage(element, renderer, container) {
        this.element = element;
        this.renderer = renderer;
        this.container = container;
    }
    LazyImage_1 = LazyImage;
    Object.defineProperty(LazyImage.prototype, "src", {
        set: function (value) {
            this._src = value;
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyImage.prototype, "alternate", {
        set: function (value) {
            this._alternate = value;
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    LazyImage.prototype.reset = function () {
        if (this._src) {
            this.renderer.setElementClass(this.element.nativeElement, "ionx-lazy-image", true);
            this.renderer.setElementAttribute(this.element.nativeElement, "data-original", this._src);
        }
        if (this._alternate) {
            this.renderer.setElementAttribute(this.element.nativeElement, "data-alternate", this._alternate);
        }
    };
    LazyImage.prototype.revalidate = function () {
        // children.length > 1 because this is also included in children query
        if (this.container && this.children.length > 1) {
            this.container.revalidate();
        }
    };
    LazyImage.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.children.changes.subscribe(function () { return _this.revalidate(); });
        this.revalidate();
    };
    var LazyImage_1;
    tslib_1.__decorate([
        ContentChildren(LazyImage_1, { descendants: true }),
        tslib_1.__metadata("design:type", QueryList)
    ], LazyImage.prototype, "children", void 0);
    tslib_1.__decorate([
        Input("ionx-lazy-image"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], LazyImage.prototype, "src", null);
    tslib_1.__decorate([
        Input("ionx-lazy-image-alternate"),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], LazyImage.prototype, "alternate", null);
    LazyImage = LazyImage_1 = tslib_1.__decorate([
        Directive({
            selector: "[ionx-lazy-image]"
        }),
        tslib_1.__param(2, Optional()), tslib_1.__param(2, Inject(forwardRef(function () { return LazyImageContainer; }))),
        tslib_1.__metadata("design:paramtypes", [ElementRef, Renderer, LazyImageContainer])
    ], LazyImage);
    return LazyImage;
}());
export { LazyImage };
var LazyImageContainer = /** @class */ (function () {
    function LazyImageContainer(element) {
        this.element = element;
    }
    LazyImageContainer.prototype.revalidate = function () {
        if (this.lazyLoad) {
            this.lazyLoad.update();
            var rect = this.element.nativeElement.getBoundingClientRect();
            if (rect.width == 0 || rect.height == 0) {
                //setTimeout(() => this.revalidate(), 200);
            }
            //console.log(this.children);
            //window.dispatchEvent(new Event("resize"));
        }
    };
    LazyImageContainer.prototype.ngOnInit = function () {
        this.initLazyLoad();
    };
    LazyImageContainer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.children.changes.subscribe(function () { return _this.revalidate(); });
        if (this.children.length > 0) {
            this.revalidate();
        }
    };
    LazyImageContainer.prototype.ngOnDestroy = function () {
        if (this.lazyLoad) {
            this.lazyLoad.destroy();
        }
    };
    LazyImageContainer.prototype.initLazyLoad = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {};
                        options.selector = ".ionx-lazy-image";
                        options.container = this.element.nativeElement;
                        if (!(this.element.nativeElement.tagName.toLowerCase() === "ion-content")) return [3 /*break*/, 5];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 40)) return [3 /*break*/, 5];
                        options.scroll = this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".inner-scroll");
                        if (!!options.scroll) return [3 /*break*/, 3];
                        return [4 /*yield*/, sleep(50)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        this.lazyLoad = new LazyLoad(options);
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ContentChildren(LazyImage, { descendants: true }),
        tslib_1.__metadata("design:type", QueryList)
    ], LazyImageContainer.prototype, "children", void 0);
    LazyImageContainer = tslib_1.__decorate([
        Directive({
            selector: "ion-content[ionx-lazy-image], [ionx-lazy-image-container]"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], LazyImageContainer);
    return LazyImageContainer;
}());
export { LazyImageContainer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1pbWFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsibGF6eS1pbWFnZS9sYXp5LWltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0gsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFPckM7SUFFQyxtQkFBbUIsT0FBbUIsRUFBVSxRQUFrQixFQUFvRSxTQUE4QjtRQUFqSixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFvRSxjQUFTLEdBQVQsU0FBUyxDQUFxQjtJQUNwSyxDQUFDO2tCQUhXLFNBQVM7SUFhckIsc0JBQVcsMEJBQUc7YUFBZCxVQUFlLEtBQWE7WUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxnQ0FBUzthQUFwQixVQUFxQixLQUFhO1lBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBRU8seUJBQUssR0FBYjtRQUVDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxRQUFRLENBQUMsbUJB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dEMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQzs2QkFFM0MsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssYUFBYSxDQUFBLEVBQWxFLHdCQUFrRTt3QkFFNUQsQ0FBQyxHQUFHLENBQUM7Ozs2QkFBRSxDQUFBLENBQUMsR0FBRyxFQUFFLENBQUE7d0JBQ3JCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7NkJBRTNILENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBZix3QkFBZTt3QkFDbEIscUJBQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFBOzt3QkFBZixTQUFlLENBQUM7OzRCQUVoQix3QkFBTTs7d0JBTmdCLENBQUMsRUFBRSxDQUFBOzs7d0JBVzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7O0tBQ3RDO0lBdkNEO1FBREMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQzswQ0FDdEMsU0FBUzt3REFBWTtJQXhCbkIsa0JBQWtCO1FBSDlCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSwyREFBMkQ7U0FDckUsQ0FBQztpREFHNEIsVUFBVTtPQUYzQixrQkFBa0IsQ0FpRTlCO0lBQUQseUJBQUM7Q0FBQSxBQWpFRCxJQWlFQztTQWpFWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUXVlcnlMaXN0LCBSZW5kZXJlcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtMYXp5TG9hZH0gZnJvbSBcIi4vbGF6eS1sb2FkXCI7XG5pbXBvcnQge0xhenlMb2FkT3B0aW9uc30gZnJvbSBcIi4vbGF6eS1sb2FkLW9wdGlvbnNcIjtcblxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6IFwiW2lvbngtbGF6eS1pbWFnZV1cIlxufSlcbmV4cG9ydCBjbGFzcyBMYXp5SW1hZ2Uge1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlciwgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IExhenlJbWFnZUNvbnRhaW5lcikpIHByaXZhdGUgY29udGFpbmVyPzogTGF6eUltYWdlQ29udGFpbmVyKSB7XG5cdH1cblxuXHRAQ29udGVudENoaWxkcmVuKExhenlJbWFnZSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxMYXp5SW1hZ2U+O1xuXG5cdHByaXZhdGUgX3NyYzogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2FsdGVybmF0ZTogc3RyaW5nO1xuXG5cdEBJbnB1dChcImlvbngtbGF6eS1pbWFnZVwiKVxuXHRwdWJsaWMgc2V0IHNyYyh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fc3JjID0gdmFsdWU7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1sYXp5LWltYWdlLWFsdGVybmF0ZVwiKVxuXHRwdWJsaWMgc2V0IGFsdGVybmF0ZSh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fYWx0ZXJuYXRlID0gdmFsdWU7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XG5cblx0cHJpdmF0ZSByZXNldCgpIHtcblxuXHRcdGlmICh0aGlzLl9zcmMpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImlvbngtbGF6eS1pbWFnZVwiLCB0cnVlKTtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJkYXRhLW9yaWdpbmFsXCIsIHRoaXMuX3NyYyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2FsdGVybmF0ZSkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImRhdGEtYWx0ZXJuYXRlXCIsIHRoaXMuX2FsdGVybmF0ZSk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSByZXZhbGlkYXRlKCkge1xuXG5cdFx0Ly8gY2hpbGRyZW4ubGVuZ3RoID4gMSBiZWNhdXNlIHRoaXMgaXMgYWxzbyBpbmNsdWRlZCBpbiBjaGlsZHJlbiBxdWVyeVxuXHRcdGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcblx0XHRcdHRoaXMuY29udGFpbmVyLnJldmFsaWRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cdFx0dGhpcy5jaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSk7XG5cdFx0dGhpcy5yZXZhbGlkYXRlKCk7XG5cdH1cblxufVxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6IFwiaW9uLWNvbnRlbnRbaW9ueC1sYXp5LWltYWdlXSwgW2lvbngtbGF6eS1pbWFnZS1jb250YWluZXJdXCJcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUltYWdlQ29udGFpbmVyIHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG5cdH1cblxuXHRwcml2YXRlIGxhenlMb2FkOiBMYXp5TG9hZDtcblxuXHRyZXZhbGlkYXRlKCkge1xuXG5cdFx0aWYgKHRoaXMubGF6eUxvYWQpIHtcblxuXHRcdFx0dGhpcy5sYXp5TG9hZC51cGRhdGUoKTtcblxuXHRcdFx0bGV0IHJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmIChyZWN0LndpZHRoID09IDAgfHwgcmVjdC5oZWlnaHQgPT0gMCkge1xuXHRcdFx0XHQvL3NldFRpbWVvdXQoKCkgPT4gdGhpcy5yZXZhbGlkYXRlKCksIDIwMCk7XG5cdFx0XHR9XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuY2hpbGRyZW4pO1xuXG5cdFx0XHQvL3dpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInJlc2l6ZVwiKSk7XG5cdFx0fVxuXHR9XG5cblx0QENvbnRlbnRDaGlsZHJlbihMYXp5SW1hZ2UsIHtkZXNjZW5kYW50czogdHJ1ZX0pXG5cdGNoaWxkcmVuOiBRdWVyeUxpc3Q8TGF6eUltYWdlPjtcblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmluaXRMYXp5TG9hZCgpO1xuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xuXHRcdHRoaXMuY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXZhbGlkYXRlKCkpO1xuXHRcdGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMucmV2YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmxhenlMb2FkKSB7XG5cdFx0XHR0aGlzLmxhenlMb2FkLmRlc3Ryb3koKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGluaXRMYXp5TG9hZCgpIHtcblxuXHRcdGxldCBvcHRpb25zOiBMYXp5TG9hZE9wdGlvbnMgPSB7fTtcblx0XHRvcHRpb25zLnNlbGVjdG9yID0gXCIuaW9ueC1sYXp5LWltYWdlXCI7XG5cdFx0b3B0aW9ucy5jb250YWluZXIgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW9uLWNvbnRlbnRcIikge1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcblx0XHRcdFx0b3B0aW9ucy5zY3JvbGwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290ICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5pbm5lci1zY3JvbGxcIik7XG5cblx0XHRcdFx0aWYgKCFvcHRpb25zLnNjcm9sbCkge1xuXHRcdFx0XHRcdGF3YWl0IHNsZWVwKDUwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMubGF6eUxvYWQgPSBuZXcgTGF6eUxvYWQob3B0aW9ucyk7XG5cdH1cblxufVxuIl19