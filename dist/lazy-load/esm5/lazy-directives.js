import { __awaiter, __decorate, __generator, __param } from "tslib";
import { ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, Optional, QueryList, Renderer2 } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
import { Loader } from "./lazy-load";
var LazyLoadContainer = /** @class */ (function () {
    function LazyLoadContainer(element) {
        this.element = element;
    }
    LazyLoadContainer.prototype.revalidate = function () {
        if (this.loader) {
            this.loader.update();
            var rect = this.element.nativeElement.getBoundingClientRect();
            if (rect.width == 0 || rect.height == 0) {
                //setTimeout(() => this.revalidate(), 200);
            }
            //console.log(this.children);
            //window.dispatchEvent(new Event("resize"));
        }
    };
    LazyLoadContainer.prototype.ngOnInit = function () {
        this.init();
    };
    LazyLoadContainer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.children.changes.subscribe(function () { return _this.revalidate(); });
        if (this.children.length > 0) {
            this.revalidate();
        }
    };
    LazyLoadContainer.prototype.ngOnDestroy = function () {
        if (this.loader) {
            this.loader.destroy();
        }
    };
    LazyLoadContainer.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = Object.assign({
                            selector: ".ionx-lazy-load",
                            container: this.element.nativeElement
                        }, this.options);
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
                        this.loader = new Loader(options);
                        return [2 /*return*/];
                }
            });
        });
    };
    LazyLoadContainer.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input("ionx-lazy-load-container")
    ], LazyLoadContainer.prototype, "options", void 0);
    __decorate([
        ContentChildren(forwardRef(function () { return LazyDirectives; }), { descendants: true })
    ], LazyLoadContainer.prototype, "children", void 0);
    LazyLoadContainer = __decorate([
        Directive({
            selector: "[ionx-lazy-load-container]"
        })
    ], LazyLoadContainer);
    return LazyLoadContainer;
}());
export { LazyLoadContainer };
var LazyDirectives = /** @class */ (function () {
    function LazyDirectives(element, renderer, container) {
        this.element = element;
        this.renderer = renderer;
        this.container = container;
    }
    LazyDirectives_1 = LazyDirectives;
    Object.defineProperty(LazyDirectives.prototype, "src", {
        set: function (value) {
            this._src = value;
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyDirectives.prototype, "alternate", {
        set: function (value) {
            this._alternate = value;
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    LazyDirectives.prototype.reset = function () {
        if (this._src) {
            this.renderer.addClass(this.element.nativeElement, "ionx-lazy-load");
            this.renderer.setAttribute(this.element.nativeElement, "data-original", this._src);
        }
        if (this._alternate) {
            this.renderer.setAttribute(this.element.nativeElement, "data-alternate", this._alternate);
        }
    };
    LazyDirectives.prototype.revalidate = function () {
        if (this.container && this.children.length > 0) {
            this.container.revalidate();
        }
    };
    LazyDirectives.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.children.changes.subscribe(function () { return _this.revalidate(); });
        this.revalidate();
    };
    var LazyDirectives_1;
    LazyDirectives.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: LazyLoadContainer, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(function () { return LazyLoadContainer; }),] }] }
    ]; };
    __decorate([
        ContentChildren(LazyDirectives_1, { descendants: true })
    ], LazyDirectives.prototype, "children", void 0);
    __decorate([
        Input("ionx-lazy-load")
    ], LazyDirectives.prototype, "src", null);
    __decorate([
        Input("ionx-lazy-load-alternate")
    ], LazyDirectives.prototype, "alternate", null);
    LazyDirectives = LazyDirectives_1 = __decorate([
        Directive({
            selector: "[ionx-lazy-load]"
        }),
        __param(2, Optional()), __param(2, Inject(forwardRef(function () { return LazyLoadContainer; })))
    ], LazyDirectives);
    return LazyDirectives;
}());
export { LazyDirectives };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFNbkM7SUFFQywyQkFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQU9ELHNDQUFVLEdBQVY7UUFFQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVyQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzlELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3hDLDJDQUEyQzthQUMzQztZQUNELDZCQUE2QjtZQUU3Qiw0Q0FBNEM7U0FDNUM7SUFDRixDQUFDO0lBS0Qsb0NBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCw4Q0FBa0IsR0FBbEI7UUFBQSxpQkFLQztRQUpBLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDekQsSUFB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bnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUXVlcnlMaXN0LCBSZW5kZXJlcjJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TG9hZGVyfSBmcm9tIFwiLi9sYXp5LWxvYWRcIjtcbmltcG9ydCB7TGF6eUxvYWRPcHRpb25zfSBmcm9tIFwiLi9sYXp5LWxvYWQtb3B0aW9uc1wiO1xuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6IFwiW2lvbngtbGF6eS1sb2FkLWNvbnRhaW5lcl1cIlxufSlcbmV4cG9ydCBjbGFzcyBMYXp5TG9hZENvbnRhaW5lciB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1sYXp5LWxvYWQtY29udGFpbmVyXCIpXG5cdG9wdGlvbnM/OiBMYXp5TG9hZE9wdGlvbnM7XG5cblx0cHJpdmF0ZSBsb2FkZXI6IExvYWRlcjtcblxuXHRyZXZhbGlkYXRlKCkge1xuXG5cdFx0aWYgKHRoaXMubG9hZGVyKSB7XG5cblx0XHRcdHRoaXMubG9hZGVyLnVwZGF0ZSgpO1xuXG5cdFx0XHRsZXQgcmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0aWYgKHJlY3Qud2lkdGggPT0gMCB8fCByZWN0LmhlaWdodCA9PSAwKSB7XG5cdFx0XHRcdC8vc2V0VGltZW91dCgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSwgMjAwKTtcblx0XHRcdH1cblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5jaGlsZHJlbik7XG5cblx0XHRcdC8vd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicmVzaXplXCIpKTtcblx0XHR9XG5cdH1cblxuXHRAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTGF6eURpcmVjdGl2ZXMpLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PExhenlEaXJlY3RpdmVzPjtcblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpKTtcblx0XHRpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLnJldmFsaWRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5sb2FkZXIpIHtcblx0XHRcdHRoaXMubG9hZGVyLmRlc3Ryb3koKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGluaXQoKSB7XG5cblx0XHRjb25zdCBvcHRpb25zOiBMYXp5TG9hZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdHNlbGVjdG9yOiBcIi5pb254LWxhenktbG9hZFwiLFxuXHRcdFx0Y29udGFpbmVyOiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudFxuXHRcdH0sIHRoaXMub3B0aW9ucyk7XG5cblx0XHRpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlvbi1jb250ZW50XCIpIHtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG5cdFx0XHRcdG9wdGlvbnMuc2Nyb2xsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIuaW5uZXItc2Nyb2xsXCIpO1xuXG5cdFx0XHRcdGlmICghb3B0aW9ucy5zY3JvbGwpIHtcblx0XHRcdFx0XHRhd2FpdCBzbGVlcCg1MCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmxvYWRlciA9IG5ldyBMb2FkZXIob3B0aW9ucyk7XG5cdH1cblxufVxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6IFwiW2lvbngtbGF6eS1sb2FkXVwiXG59KVxuZXhwb3J0IGNsYXNzIExhenlEaXJlY3RpdmVzIHtcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTGF6eUxvYWRDb250YWluZXIpKSBwcml2YXRlIGNvbnRhaW5lcj86IExhenlMb2FkQ29udGFpbmVyKSB7XG5cdH1cblxuXHRAQ29udGVudENoaWxkcmVuKExhenlEaXJlY3RpdmVzLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PExhenlEaXJlY3RpdmVzPjtcblxuXHRwcml2YXRlIF9zcmM6IHN0cmluZztcblxuXHRwcml2YXRlIF9hbHRlcm5hdGU6IHN0cmluZztcblxuXHRASW5wdXQoXCJpb254LWxhenktbG9hZFwiKVxuXHRwdWJsaWMgc2V0IHNyYyh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fc3JjID0gdmFsdWU7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1sYXp5LWxvYWQtYWx0ZXJuYXRlXCIpXG5cdHB1YmxpYyBzZXQgYWx0ZXJuYXRlKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9hbHRlcm5hdGUgPSB2YWx1ZTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRwcml2YXRlIHJlc2V0KCkge1xuXG5cdFx0aWYgKHRoaXMuX3NyYykge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJpb254LWxhenktbG9hZFwiKTtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImRhdGEtb3JpZ2luYWxcIiwgdGhpcy5fc3JjKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYWx0ZXJuYXRlKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJkYXRhLWFsdGVybmF0ZVwiLCB0aGlzLl9hbHRlcm5hdGUpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcmV2YWxpZGF0ZSgpIHtcblx0XHRpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLmNvbnRhaW5lci5yZXZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xuXHRcdHRoaXMuY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXZhbGlkYXRlKCkpO1xuXHRcdHRoaXMucmV2YWxpZGF0ZSgpO1xuXHR9XG5cbn1cbiJdfQ==