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
        Input()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFNbkM7SUFFQywyQkFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQU9ELHNDQUFVLEdBQVY7UUFFQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVyQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzlELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3hDLDJDQUEyQzthQUMzQztZQUNELDZCQUE2QjtZQUU3Qiw0Q0FBNEM7U0FDNUM7SUFDRixDQUFDO0lBS0Qsb0NBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCw4Q0FBa0IsR0FBbEI7UUFBQSxpQkFLQztRQUpBLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDekQsSUFB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dGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBRdWVyeUxpc3QsIFJlbmRlcmVyMn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtMb2FkZXJ9IGZyb20gXCIuL2xhenktbG9hZFwiO1xuaW1wb3J0IHtMYXp5TG9hZE9wdGlvbnN9IGZyb20gXCIuL2xhenktbG9hZC1vcHRpb25zXCI7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJbaW9ueC1sYXp5LWxvYWQtY29udGFpbmVyXVwiXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkQ29udGFpbmVyIHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG5cdH1cblxuXHRASW5wdXQoKVxuXHRvcHRpb25zPzogTGF6eUxvYWRPcHRpb25zO1xuXG5cdHByaXZhdGUgbG9hZGVyOiBMb2FkZXI7XG5cblx0cmV2YWxpZGF0ZSgpIHtcblxuXHRcdGlmICh0aGlzLmxvYWRlcikge1xuXG5cdFx0XHR0aGlzLmxvYWRlci51cGRhdGUoKTtcblxuXHRcdFx0bGV0IHJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmIChyZWN0LndpZHRoID09IDAgfHwgcmVjdC5oZWlnaHQgPT0gMCkge1xuXHRcdFx0XHQvL3NldFRpbWVvdXQoKCkgPT4gdGhpcy5yZXZhbGlkYXRlKCksIDIwMCk7XG5cdFx0XHR9XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuY2hpbGRyZW4pO1xuXG5cdFx0XHQvL3dpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInJlc2l6ZVwiKSk7XG5cdFx0fVxuXHR9XG5cblx0QENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IExhenlEaXJlY3RpdmVzKSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxMYXp5RGlyZWN0aXZlcz47XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cdFx0dGhpcy5jaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSk7XG5cdFx0aWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5yZXZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMubG9hZGVyKSB7XG5cdFx0XHR0aGlzLmxvYWRlci5kZXN0cm95KCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBpbml0KCkge1xuXG5cdFx0Y29uc3Qgb3B0aW9uczogTGF6eUxvYWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0XHRzZWxlY3RvcjogXCIuaW9ueC1sYXp5LWxvYWRcIixcblx0XHRcdGNvbnRhaW5lcjogdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcblx0XHR9LCB0aGlzLm9wdGlvbnMpO1xuXG5cdFx0aWYgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpb24tY29udGVudFwiKSB7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuXHRcdFx0XHRvcHRpb25zLnNjcm9sbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLmlubmVyLXNjcm9sbFwiKTtcblxuXHRcdFx0XHRpZiAoIW9wdGlvbnMuc2Nyb2xsKSB7XG5cdFx0XHRcdFx0YXdhaXQgc2xlZXAoNTApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkZXIgPSBuZXcgTG9hZGVyKG9wdGlvbnMpO1xuXHR9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiBcIltpb254LWxhenktbG9hZF1cIlxufSlcbmV4cG9ydCBjbGFzcyBMYXp5RGlyZWN0aXZlcyB7XG5cblx0Y29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IExhenlMb2FkQ29udGFpbmVyKSkgcHJpdmF0ZSBjb250YWluZXI/OiBMYXp5TG9hZENvbnRhaW5lcikge1xuXHR9XG5cblx0QENvbnRlbnRDaGlsZHJlbihMYXp5RGlyZWN0aXZlcywge2Rlc2NlbmRhbnRzOiB0cnVlfSlcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxMYXp5RGlyZWN0aXZlcz47XG5cblx0cHJpdmF0ZSBfc3JjOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfYWx0ZXJuYXRlOiBzdHJpbmc7XG5cblx0QElucHV0KFwiaW9ueC1sYXp5LWxvYWRcIilcblx0cHVibGljIHNldCBzcmModmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX3NyYyA9IHZhbHVlO1xuXHRcdHRoaXMucmVzZXQoKTtcblx0fVxuXG5cdEBJbnB1dChcImlvbngtbGF6eS1sb2FkLWFsdGVybmF0ZVwiKVxuXHRwdWJsaWMgc2V0IGFsdGVybmF0ZSh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fYWx0ZXJuYXRlID0gdmFsdWU7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XG5cblx0cHJpdmF0ZSByZXNldCgpIHtcblxuXHRcdGlmICh0aGlzLl9zcmMpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiaW9ueC1sYXp5LWxvYWRcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJkYXRhLW9yaWdpbmFsXCIsIHRoaXMuX3NyYyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2FsdGVybmF0ZSkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiZGF0YS1hbHRlcm5hdGVcIiwgdGhpcy5fYWx0ZXJuYXRlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJldmFsaWRhdGUoKSB7XG5cblx0XHQvLyBjaGlsZHJlbi5sZW5ndGggPiAxIGJlY2F1c2UgdGhpcyBpcyBhbHNvIGluY2x1ZGVkIGluIGNoaWxkcmVuIHF1ZXJ5XG5cdFx0aWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuXHRcdFx0dGhpcy5jb250YWluZXIucmV2YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpKTtcblx0XHR0aGlzLnJldmFsaWRhdGUoKTtcblx0fVxuXG59XG4iXX0=