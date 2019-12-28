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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFNbkM7SUFFQywyQkFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQUlELHNDQUFVLEdBQVY7UUFFQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVyQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzlELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3hDLDJDQUEyQzthQUMzQztZQUNELDZCQUE2QjtZQUU3Qiw0Q0FBNEM7U0FDNUM7SUFDRixDQUFDO0lBS0Qsb0NBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCw4Q0FBa0IsR0FBbEI7UUFBQSxpQkFLQztRQUpBLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDekQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ2xCO0lBQ0YsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN0QjtJQUNGLENBQUM7SUFFYSxnQ0FBSSxHQUFsQjs7Ozs7O3dCQUVPLE9BQU8sR0FBb0IsRUFBRSxDQUFDO3dCQUNwQyxPQUFPLENBQUMsUUFBUSxHQUFHLGlCQUFpQixDQUFDO3dCQUNyQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDOzZCQUUzQyxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxhQUFhLENBQUEsRUFBbEUsd0JBQWtFO3dCQUU1RCxDQUFDLEdBQUcsQ0FBQzs7OzZCQUFFLENBQUEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTt3QkFDckIsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQzs2QkFFM0gsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFmLHdCQUFlO3dCQUNsQixxQkFBTSxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUE7O3dCQUFmLFNBQWUsQ0FBQzs7NEJBRWhCLHdCQUFNOzt3QkFOZ0IsQ0FBQyxFQUFFLENBQUE7Ozt3QkFXNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7S0FDbEM7O2dCQTdENEIsVUFBVTs7SUFzQnZDO1FBREMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsY0FBYyxFQUFkLENBQWMsQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDO3VEQUNuQztJQXhCeEIsaUJBQWlCO1FBSDdCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSw0QkFBNEI7U0FDdEMsQ0FBQztPQUNXLGlCQUFpQixDQWlFN0I7SUFBRCx3QkFBQztDQUFBLEFBakVELElBaUVDO1NBakVZLGlCQUFpQjtBQXNFOUI7SUFFQyx3QkFBbUIsT0FBbUIsRUFBVSxRQUFtQixFQUFtRSxTQUE2QjtRQUFoSixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFtRSxjQUFTLEdBQVQsU0FBUyxDQUFvQjtJQUNuSyxDQUFDO3VCQUhXLGNBQWM7SUFhMUIsc0JBQVcsK0JBQUc7YUFBZCxVQUFlLEtBQWE7WUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxxQ0FBUzthQUFwQixVQUFxQixLQUFhO1lBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBRU8sOEJBQUssR0FBYjtRQUVDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuRjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUY7SUFDRixDQUFDO0lBRU8sbUNBQVUsR0FBbEI7UUFFQyxzRUFBc0U7UUFDdEUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzVCO0lBQ0YsQ0FBQztJQUVELDJDQUFrQixHQUFsQjtRQUFBLGlCQUdDO1FBRkEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7O2dCQTdDMkIsVUFBVTtnQkFBb0IsU0FBUztnQkFBK0UsaUJBQWlCLHVCQUE3RixRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUM7O0lBSTVIO1FBREMsZUFBZSxDQUFDLGdCQUFjLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUM7b0RBQ2pCO0lBT3BDO1FBREMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzZDQUl2QjtJQUdEO1FBREMsS0FBSyxDQUFDLDBCQUEwQixDQUFDO21EQUlqQztJQXRCVyxjQUFjO1FBSDFCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxrQkFBa0I7U0FDNUIsQ0FBQztRQUdxRSxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDLENBQUE7T0FGakgsY0FBYyxDQWlEMUI7SUFBRCxxQkFBQztDQUFBLEFBakRELElBaURDO1NBakRZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUXVlcnlMaXN0LCBSZW5kZXJlcjJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TG9hZGVyfSBmcm9tIFwiLi9sYXp5LWxvYWRcIjtcbmltcG9ydCB7TGF6eUxvYWRPcHRpb25zfSBmcm9tIFwiLi9sYXp5LWxvYWQtb3B0aW9uc1wiO1xuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6IFwiW2lvbngtbGF6eS1sb2FkLWNvbnRhaW5lcl1cIlxufSlcbmV4cG9ydCBjbGFzcyBMYXp5TG9hZENvbnRhaW5lciB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuXHR9XG5cblx0cHJpdmF0ZSBsb2FkZXI6IExvYWRlcjtcblxuXHRyZXZhbGlkYXRlKCkge1xuXG5cdFx0aWYgKHRoaXMubG9hZGVyKSB7XG5cblx0XHRcdHRoaXMubG9hZGVyLnVwZGF0ZSgpO1xuXG5cdFx0XHRsZXQgcmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0aWYgKHJlY3Qud2lkdGggPT0gMCB8fCByZWN0LmhlaWdodCA9PSAwKSB7XG5cdFx0XHRcdC8vc2V0VGltZW91dCgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSwgMjAwKTtcblx0XHRcdH1cblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5jaGlsZHJlbik7XG5cblx0XHRcdC8vd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicmVzaXplXCIpKTtcblx0XHR9XG5cdH1cblxuXHRAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTGF6eURpcmVjdGl2ZXMpLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PExhenlEaXJlY3RpdmVzPjtcblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpKTtcblx0XHRpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLnJldmFsaWRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5sb2FkZXIpIHtcblx0XHRcdHRoaXMubG9hZGVyLmRlc3Ryb3koKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGluaXQoKSB7XG5cblx0XHRjb25zdCBvcHRpb25zOiBMYXp5TG9hZE9wdGlvbnMgPSB7fTtcblx0XHRvcHRpb25zLnNlbGVjdG9yID0gXCIuaW9ueC1sYXp5LWxvYWRcIjtcblx0XHRvcHRpb25zLmNvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0aWYgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpb24tY29udGVudFwiKSB7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuXHRcdFx0XHRvcHRpb25zLnNjcm9sbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLmlubmVyLXNjcm9sbFwiKTtcblxuXHRcdFx0XHRpZiAoIW9wdGlvbnMuc2Nyb2xsKSB7XG5cdFx0XHRcdFx0YXdhaXQgc2xlZXAoNTApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkZXIgPSBuZXcgTG9hZGVyKG9wdGlvbnMpO1xuXHR9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiBcIltpb254LWxhenktbG9hZF1cIlxufSlcbmV4cG9ydCBjbGFzcyBMYXp5RGlyZWN0aXZlcyB7XG5cblx0Y29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IExhenlMb2FkQ29udGFpbmVyKSkgcHJpdmF0ZSBjb250YWluZXI/OiBMYXp5TG9hZENvbnRhaW5lcikge1xuXHR9XG5cblx0QENvbnRlbnRDaGlsZHJlbihMYXp5RGlyZWN0aXZlcywge2Rlc2NlbmRhbnRzOiB0cnVlfSlcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxMYXp5RGlyZWN0aXZlcz47XG5cblx0cHJpdmF0ZSBfc3JjOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfYWx0ZXJuYXRlOiBzdHJpbmc7XG5cblx0QElucHV0KFwiaW9ueC1sYXp5LWxvYWRcIilcblx0cHVibGljIHNldCBzcmModmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX3NyYyA9IHZhbHVlO1xuXHRcdHRoaXMucmVzZXQoKTtcblx0fVxuXG5cdEBJbnB1dChcImlvbngtbGF6eS1sb2FkLWFsdGVybmF0ZVwiKVxuXHRwdWJsaWMgc2V0IGFsdGVybmF0ZSh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fYWx0ZXJuYXRlID0gdmFsdWU7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XG5cblx0cHJpdmF0ZSByZXNldCgpIHtcblxuXHRcdGlmICh0aGlzLl9zcmMpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiaW9ueC1sYXp5LWxvYWRcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJkYXRhLW9yaWdpbmFsXCIsIHRoaXMuX3NyYyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2FsdGVybmF0ZSkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiZGF0YS1hbHRlcm5hdGVcIiwgdGhpcy5fYWx0ZXJuYXRlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJldmFsaWRhdGUoKSB7XG5cblx0XHQvLyBjaGlsZHJlbi5sZW5ndGggPiAxIGJlY2F1c2UgdGhpcyBpcyBhbHNvIGluY2x1ZGVkIGluIGNoaWxkcmVuIHF1ZXJ5XG5cdFx0aWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuXHRcdFx0dGhpcy5jb250YWluZXIucmV2YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpKTtcblx0XHR0aGlzLnJldmFsaWRhdGUoKTtcblx0fVxuXG59XG4iXX0=