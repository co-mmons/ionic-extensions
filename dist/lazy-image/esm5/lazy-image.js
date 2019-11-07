import * as tslib_1 from "tslib";
import { ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, Optional, QueryList, Renderer } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
import { LazyLoad } from "./lazy-load";
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
    LazyImageContainer.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        ContentChildren(forwardRef(function () { return LazyImage; }), { descendants: true })
    ], LazyImageContainer.prototype, "children", void 0);
    LazyImageContainer = tslib_1.__decorate([
        Directive({
            selector: "ion-content[ionx-lazy-image], [ionx-lazy-image-container]"
        })
    ], LazyImageContainer);
    return LazyImageContainer;
}());
export { LazyImageContainer };
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
    LazyImage.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer },
        { type: LazyImageContainer, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(function () { return LazyImageContainer; }),] }] }
    ]; };
    tslib_1.__decorate([
        ContentChildren(LazyImage_1, { descendants: true })
    ], LazyImage.prototype, "children", void 0);
    tslib_1.__decorate([
        Input("ionx-lazy-image")
    ], LazyImage.prototype, "src", null);
    tslib_1.__decorate([
        Input("ionx-lazy-image-alternate")
    ], LazyImage.prototype, "alternate", null);
    LazyImage = LazyImage_1 = tslib_1.__decorate([
        Directive({
            selector: "[ionx-lazy-image]"
        }),
        tslib_1.__param(2, Optional()), tslib_1.__param(2, Inject(forwardRef(function () { return LazyImageContainer; })))
    ], LazyImage);
    return LazyImage;
}());
export { LazyImage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1pbWFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2xhenktaW1hZ2UvIiwic291cmNlcyI6WyJsYXp5LWltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0gsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFNckM7SUFFQyw0QkFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQUlELHVDQUFVLEdBQVY7UUFFQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFFbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzlELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3hDLDJDQUEyQzthQUMzQztZQUNELDZCQUE2QjtZQUU3Qiw0Q0FBNEM7U0FDNUM7SUFDRixDQUFDO0lBS0QscUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0NBQWtCLEdBQWxCO1FBQUEsaUJBS0M7UUFKQSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQ3pELElBQUksSUFBSSxD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Zm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFF1ZXJ5TGlzdCwgUmVuZGVyZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TGF6eUxvYWR9IGZyb20gXCIuL2xhenktbG9hZFwiO1xuaW1wb3J0IHtMYXp5TG9hZE9wdGlvbnN9IGZyb20gXCIuL2xhenktbG9hZC1vcHRpb25zXCI7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJpb24tY29udGVudFtpb254LWxhenktaW1hZ2VdLCBbaW9ueC1sYXp5LWltYWdlLWNvbnRhaW5lcl1cIlxufSlcbmV4cG9ydCBjbGFzcyBMYXp5SW1hZ2VDb250YWluZXIge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcblx0fVxuXG5cdHByaXZhdGUgbGF6eUxvYWQ6IExhenlMb2FkO1xuXG5cdHJldmFsaWRhdGUoKSB7XG5cblx0XHRpZiAodGhpcy5sYXp5TG9hZCkge1xuXG5cdFx0XHR0aGlzLmxhenlMb2FkLnVwZGF0ZSgpO1xuXG5cdFx0XHRsZXQgcmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0aWYgKHJlY3Qud2lkdGggPT0gMCB8fCByZWN0LmhlaWdodCA9PSAwKSB7XG5cdFx0XHRcdC8vc2V0VGltZW91dCgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSwgMjAwKTtcblx0XHRcdH1cblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5jaGlsZHJlbik7XG5cblx0XHRcdC8vd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicmVzaXplXCIpKTtcblx0XHR9XG5cdH1cblxuXHRAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTGF6eUltYWdlKSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxMYXp5SW1hZ2U+O1xuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuaW5pdExhenlMb2FkKCk7XG5cdH1cblxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cdFx0dGhpcy5jaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSk7XG5cdFx0aWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5yZXZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMubGF6eUxvYWQpIHtcblx0XHRcdHRoaXMubGF6eUxvYWQuZGVzdHJveSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgaW5pdExhenlMb2FkKCkge1xuXG5cdFx0bGV0IG9wdGlvbnM6IExhenlMb2FkT3B0aW9ucyA9IHt9O1xuXHRcdG9wdGlvbnMuc2VsZWN0b3IgPSBcIi5pb254LWxhenktaW1hZ2VcIjtcblx0XHRvcHRpb25zLmNvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0aWYgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpb24tY29udGVudFwiKSB7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuXHRcdFx0XHRvcHRpb25zLnNjcm9sbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLmlubmVyLXNjcm9sbFwiKTtcblxuXHRcdFx0XHRpZiAoIW9wdGlvbnMuc2Nyb2xsKSB7XG5cdFx0XHRcdFx0YXdhaXQgc2xlZXAoNTApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5sYXp5TG9hZCA9IG5ldyBMYXp5TG9hZChvcHRpb25zKTtcblx0fVxuXG59XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJbaW9ueC1sYXp5LWltYWdlXVwiXG59KVxuZXhwb3J0IGNsYXNzIExhenlJbWFnZSB7XG5cblx0Y29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyLCBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTGF6eUltYWdlQ29udGFpbmVyKSkgcHJpdmF0ZSBjb250YWluZXI/OiBMYXp5SW1hZ2VDb250YWluZXIpIHtcblx0fVxuXG5cdEBDb250ZW50Q2hpbGRyZW4oTGF6eUltYWdlLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PExhenlJbWFnZT47XG5cblx0cHJpdmF0ZSBfc3JjOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfYWx0ZXJuYXRlOiBzdHJpbmc7XG5cblx0QElucHV0KFwiaW9ueC1sYXp5LWltYWdlXCIpXG5cdHB1YmxpYyBzZXQgc3JjKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9zcmMgPSB2YWx1ZTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWxhenktaW1hZ2UtYWx0ZXJuYXRlXCIpXG5cdHB1YmxpYyBzZXQgYWx0ZXJuYXRlKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9hbHRlcm5hdGUgPSB2YWx1ZTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRwcml2YXRlIHJlc2V0KCkge1xuXG5cdFx0aWYgKHRoaXMuX3NyYykge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiaW9ueC1sYXp5LWltYWdlXCIsIHRydWUpO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImRhdGEtb3JpZ2luYWxcIiwgdGhpcy5fc3JjKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYWx0ZXJuYXRlKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRBdHRyaWJ1dGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiZGF0YS1hbHRlcm5hdGVcIiwgdGhpcy5fYWx0ZXJuYXRlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJldmFsaWRhdGUoKSB7XG5cblx0XHQvLyBjaGlsZHJlbi5sZW5ndGggPiAxIGJlY2F1c2UgdGhpcyBpcyBhbHNvIGluY2x1ZGVkIGluIGNoaWxkcmVuIHF1ZXJ5XG5cdFx0aWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuXHRcdFx0dGhpcy5jb250YWluZXIucmV2YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpKTtcblx0XHR0aGlzLnJldmFsaWRhdGUoKTtcblx0fVxuXG59XG4iXX0=