import * as tslib_1 from "tslib";
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, i;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {};
                        options.selector = ".ionx-lazy-load";
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
                        this.loader = new Loader(options);
                        return [2 /*return*/];
                }
            });
        });
    };
    LazyLoadContainer.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        ContentChildren(forwardRef(function () { return LazyDirectives; }), { descendants: true })
    ], LazyLoadContainer.prototype, "children", void 0);
    LazyLoadContainer = tslib_1.__decorate([
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
        // children.length > 1 because this is also included in children query
        if (this.container && this.children.length > 1) {
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
    tslib_1.__decorate([
        ContentChildren(LazyDirectives_1, { descendants: true })
    ], LazyDirectives.prototype, "children", void 0);
    tslib_1.__decorate([
        Input("ionx-lazy-load")
    ], LazyDirectives.prototype, "src", null);
    tslib_1.__decorate([
        Input("ionx-lazy-load-alternate")
    ], LazyDirectives.prototype, "alternate", null);
    LazyDirectives = LazyDirectives_1 = tslib_1.__decorate([
        Directive({
            selector: "[ionx-lazy-load]"
        }),
        tslib_1.__param(2, Optional()), tslib_1.__param(2, Inject(forwardRef(function () { return LazyLoadContainer; })))
    ], LazyDirectives);
    return LazyDirectives;
}());
export { LazyDirectives };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFNbkM7SUFFQywyQkFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQUlELHNDQUFVLEdBQVY7UUFFQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVyQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzlELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3hDLDJDQUEyQzthQUMzQztZQUNELDZCQUE2QjtZQUU3Qiw0Q0FBNEM7U0FDNUM7SUFDRixDQUFDO0lBS0Qsb0NBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCw4Q0FBa0IsR0FBbEI7UUFBQSxpQkFLQztRQUpBLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDekQsSUFB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cmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBRdWVyeUxpc3QsIFJlbmRlcmVyMn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtMb2FkZXJ9IGZyb20gXCIuL2xhenktbG9hZFwiO1xuaW1wb3J0IHtMYXp5TG9hZE9wdGlvbnN9IGZyb20gXCIuL2xhenktbG9hZC1vcHRpb25zXCI7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJbaW9ueC1sYXp5LWxvYWQtY29udGFpbmVyXVwiXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkQ29udGFpbmVyIHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG5cdH1cblxuXHRwcml2YXRlIGxvYWRlcjogTG9hZGVyO1xuXG5cdHJldmFsaWRhdGUoKSB7XG5cblx0XHRpZiAodGhpcy5sb2FkZXIpIHtcblxuXHRcdFx0dGhpcy5sb2FkZXIudXBkYXRlKCk7XG5cblx0XHRcdGxldCByZWN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRpZiAocmVjdC53aWR0aCA9PSAwIHx8IHJlY3QuaGVpZ2h0ID09IDApIHtcblx0XHRcdFx0Ly9zZXRUaW1lb3V0KCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpLCAyMDApO1xuXHRcdFx0fVxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLmNoaWxkcmVuKTtcblxuXHRcdFx0Ly93aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJyZXNpemVcIikpO1xuXHRcdH1cblx0fVxuXG5cdEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBMYXp5RGlyZWN0aXZlcyksIHtkZXNjZW5kYW50czogdHJ1ZX0pXG5cdGNoaWxkcmVuOiBRdWVyeUxpc3Q8TGF6eURpcmVjdGl2ZXM+O1xuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xuXHRcdHRoaXMuY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXZhbGlkYXRlKCkpO1xuXHRcdGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMucmV2YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmxvYWRlcikge1xuXHRcdFx0dGhpcy5sb2FkZXIuZGVzdHJveSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgaW5pdCgpIHtcblxuXHRcdGNvbnN0IG9wdGlvbnM6IExhenlMb2FkT3B0aW9ucyA9IHt9O1xuXHRcdG9wdGlvbnMuc2VsZWN0b3IgPSBcIi5pb254LWxhenktbG9hZFwiO1xuXHRcdG9wdGlvbnMuY29udGFpbmVyID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cblx0XHRpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlvbi1jb250ZW50XCIpIHtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG5cdFx0XHRcdG9wdGlvbnMuc2Nyb2xsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIuaW5uZXItc2Nyb2xsXCIpO1xuXG5cdFx0XHRcdGlmICghb3B0aW9ucy5zY3JvbGwpIHtcblx0XHRcdFx0XHRhd2FpdCBzbGVlcCg1MCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmxvYWRlciA9IG5ldyBMb2FkZXIob3B0aW9ucyk7XG5cdH1cblxufVxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6IFwiW2lvbngtbGF6eS1sb2FkXVwiXG59KVxuZXhwb3J0IGNsYXNzIExhenlEaXJlY3RpdmVzIHtcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTGF6eUxvYWRDb250YWluZXIpKSBwcml2YXRlIGNvbnRhaW5lcj86IExhenlMb2FkQ29udGFpbmVyKSB7XG5cdH1cblxuXHRAQ29udGVudENoaWxkcmVuKExhenlEaXJlY3RpdmVzLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PExhenlEaXJlY3RpdmVzPjtcblxuXHRwcml2YXRlIF9zcmM6IHN0cmluZztcblxuXHRwcml2YXRlIF9hbHRlcm5hdGU6IHN0cmluZztcblxuXHRASW5wdXQoXCJpb254LWxhenktbG9hZFwiKVxuXHRwdWJsaWMgc2V0IHNyYyh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fc3JjID0gdmFsdWU7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XG5cblx0QElucHV0KFwiaW9ueC1sYXp5LWxvYWQtYWx0ZXJuYXRlXCIpXG5cdHB1YmxpYyBzZXQgYWx0ZXJuYXRlKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9hbHRlcm5hdGUgPSB2YWx1ZTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRwcml2YXRlIHJlc2V0KCkge1xuXG5cdFx0aWYgKHRoaXMuX3NyYykge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJpb254LWxhenktbG9hZFwiKTtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImRhdGEtb3JpZ2luYWxcIiwgdGhpcy5fc3JjKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYWx0ZXJuYXRlKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJkYXRhLWFsdGVybmF0ZVwiLCB0aGlzLl9hbHRlcm5hdGUpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcmV2YWxpZGF0ZSgpIHtcblxuXHRcdC8vIGNoaWxkcmVuLmxlbmd0aCA+IDEgYmVjYXVzZSB0aGlzIGlzIGFsc28gaW5jbHVkZWQgaW4gY2hpbGRyZW4gcXVlcnlcblx0XHRpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG5cdFx0XHR0aGlzLmNvbnRhaW5lci5yZXZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xuXHRcdHRoaXMuY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXZhbGlkYXRlKCkpO1xuXHRcdHRoaXMucmV2YWxpZGF0ZSgpO1xuXHR9XG5cbn1cbiJdfQ==