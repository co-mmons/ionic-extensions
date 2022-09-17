import { __awaiter } from "tslib";
import { ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, Optional, Renderer2 } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
import { LazyLoad } from "./lazy-load";
export class LazyImageContainer {
    constructor(element) {
        this.element = element;
    }
    revalidate() {
        if (this.lazyLoad) {
            this.lazyLoad.update();
            let rect = this.element.nativeElement.getBoundingClientRect();
            if (rect.width == 0 || rect.height == 0) {
                //setTimeout(() => this.revalidate(), 200);
            }
            //console.log(this.children);
            //window.dispatchEvent(new Event("resize"));
        }
    }
    ngOnInit() {
        this.initLazyLoad();
    }
    ngAfterContentInit() {
        this.children.changes.subscribe(() => this.revalidate());
        if (this.children.length > 0) {
            this.revalidate();
        }
    }
    ngOnDestroy() {
        if (this.lazyLoad) {
            this.lazyLoad.destroy();
        }
    }
    initLazyLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {};
            options.selector = ".ionx-lazy-image";
            options.container = this.element.nativeElement;
            if (this.element.nativeElement.tagName.toLowerCase() === "ion-content") {
                for (let i = 0; i < 40; i++) {
                    options.scroll = this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".inner-scroll");
                    if (!options.scroll) {
                        yield sleep(50);
                    }
                    else {
                        break;
                    }
                }
            }
            this.lazyLoad = new LazyLoad(options);
        });
    }
}
LazyImageContainer.decorators = [
    { type: Directive, args: [{
                selector: "ion-content[ionx-lazy-image], [ionx-lazy-image-container]"
            },] }
];
LazyImageContainer.ctorParameters = () => [
    { type: ElementRef }
];
LazyImageContainer.propDecorators = {
    children: [{ type: ContentChildren, args: [forwardRef(() => LazyImage), { descendants: true },] }]
};
export class LazyImage {
    constructor(element, renderer, container) {
        this.element = element;
        this.renderer = renderer;
        this.container = container;
    }
    set src(value) {
        this._src = value;
        this.reset();
    }
    set alternate(value) {
        this._alternate = value;
        this.reset();
    }
    reset() {
        if (this._src) {
            this.renderer.addClass(this.element.nativeElement, "ionx-lazy-image");
            this.renderer.setAttribute(this.element.nativeElement, "data-original", this._src);
        }
        if (this._alternate) {
            this.renderer.setAttribute(this.element.nativeElement, "data-alternate", this._alternate);
        }
    }
    revalidate() {
        // children.length > 1 because this is also included in children query
        if (this.container && this.children.length > 1) {
            this.container.revalidate();
        }
    }
    ngAfterContentInit() {
        this.children.changes.subscribe(() => this.revalidate());
        this.revalidate();
    }
}
LazyImage.decorators = [
    { type: Directive, args: [{
                selector: "[ionx-lazy-image]"
            },] }
];
LazyImage.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: LazyImageContainer, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => LazyImageContainer),] }] }
];
LazyImage.propDecorators = {
    children: [{ type: ContentChildren, args: [LazyImage, { descendants: true },] }],
    src: [{ type: Input, args: ["ionx-lazy-image",] }],
    alternate: [{ type: Input, args: ["ionx-lazy-image-alternate",] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1pbWFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXp5LWltYWdlL2xhenktaW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQWEsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBTXJDLE1BQU0sT0FBTyxrQkFBa0I7SUFFOUIsWUFBb0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDcEQsQ0FBQztJQUlELFVBQVU7UUFFVCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFFbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzlELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3hDLDJDQUEyQzthQUMzQztZQUNELDZCQUE2QjtZQUU3Qiw0Q0FBNEM7U0FDNUM7SUFDRixDQUFDO0lBS0QsUUFBUTtRQUNQLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsa0JBQWtCO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3QixJQUFJLENB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QUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7O1lBbERELFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsbUJBQW1CO2FBQzdCOzs7WUE3RW1DLFVBQVU7WUFBa0QsU0FBUztZQWdGMkMsa0JBQWtCLHVCQUEvRixRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzs7O3VCQUc1SCxlQUFlLFNBQUMsU0FBUyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQztrQkFPOUMsS0FBSyxTQUFDLGlCQUFpQjt3QkFNdkIsS0FBSyxTQUFDLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBRdWVyeUxpc3QsIFJlbmRlcmVyMn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtMYXp5TG9hZH0gZnJvbSBcIi4vbGF6eS1sb2FkXCI7XG5pbXBvcnQge0xhenlMb2FkT3B0aW9uc30gZnJvbSBcIi4vbGF6eS1sb2FkLW9wdGlvbnNcIjtcblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiBcImlvbi1jb250ZW50W2lvbngtbGF6eS1pbWFnZV0sIFtpb254LWxhenktaW1hZ2UtY29udGFpbmVyXVwiXG59KVxuZXhwb3J0IGNsYXNzIExhenlJbWFnZUNvbnRhaW5lciB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuXHR9XG5cblx0cHJpdmF0ZSBsYXp5TG9hZDogTGF6eUxvYWQ7XG5cblx0cmV2YWxpZGF0ZSgpIHtcblxuXHRcdGlmICh0aGlzLmxhenlMb2FkKSB7XG5cblx0XHRcdHRoaXMubGF6eUxvYWQudXBkYXRlKCk7XG5cblx0XHRcdGxldCByZWN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRpZiAocmVjdC53aWR0aCA9PSAwIHx8IHJlY3QuaGVpZ2h0ID09IDApIHtcblx0XHRcdFx0Ly9zZXRUaW1lb3V0KCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpLCAyMDApO1xuXHRcdFx0fVxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLmNoaWxkcmVuKTtcblxuXHRcdFx0Ly93aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJyZXNpemVcIikpO1xuXHRcdH1cblx0fVxuXG5cdEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBMYXp5SW1hZ2UpLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PExhenlJbWFnZT47XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5pbml0TGF6eUxvYWQoKTtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpKTtcblx0XHRpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLnJldmFsaWRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5sYXp5TG9hZCkge1xuXHRcdFx0dGhpcy5sYXp5TG9hZC5kZXN0cm95KCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBpbml0TGF6eUxvYWQoKSB7XG5cblx0XHRsZXQgb3B0aW9uczogTGF6eUxvYWRPcHRpb25zID0ge307XG5cdFx0b3B0aW9ucy5zZWxlY3RvciA9IFwiLmlvbngtbGF6eS1pbWFnZVwiO1xuXHRcdG9wdGlvbnMuY29udGFpbmVyID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cblx0XHRpZiAodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlvbi1jb250ZW50XCIpIHtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG5cdFx0XHRcdG9wdGlvbnMuc2Nyb2xsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIuaW5uZXItc2Nyb2xsXCIpO1xuXG5cdFx0XHRcdGlmICghb3B0aW9ucy5zY3JvbGwpIHtcblx0XHRcdFx0XHRhd2FpdCBzbGVlcCg1MCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmxhenlMb2FkID0gbmV3IExhenlMb2FkKG9wdGlvbnMpO1xuXHR9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiBcIltpb254LWxhenktaW1hZ2VdXCJcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUltYWdlIHtcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBAT3B0aW9uYWwoKSBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTGF6eUltYWdlQ29udGFpbmVyKSkgcHJpdmF0ZSBjb250YWluZXI/OiBMYXp5SW1hZ2VDb250YWluZXIpIHtcblx0fVxuXG5cdEBDb250ZW50Q2hpbGRyZW4oTGF6eUltYWdlLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PExhenlJbWFnZT47XG5cblx0cHJpdmF0ZSBfc3JjOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfYWx0ZXJuYXRlOiBzdHJpbmc7XG5cblx0QElucHV0KFwiaW9ueC1sYXp5LWltYWdlXCIpXG5cdHB1YmxpYyBzZXQgc3JjKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9zcmMgPSB2YWx1ZTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWxhenktaW1hZ2UtYWx0ZXJuYXRlXCIpXG5cdHB1YmxpYyBzZXQgYWx0ZXJuYXRlKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9hbHRlcm5hdGUgPSB2YWx1ZTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRwcml2YXRlIHJlc2V0KCkge1xuXG5cdFx0aWYgKHRoaXMuX3NyYykge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJpb254LWxhenktaW1hZ2VcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJkYXRhLW9yaWdpbmFsXCIsIHRoaXMuX3NyYyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2FsdGVybmF0ZSkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiZGF0YS1hbHRlcm5hdGVcIiwgdGhpcy5fYWx0ZXJuYXRlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJldmFsaWRhdGUoKSB7XG5cblx0XHQvLyBjaGlsZHJlbi5sZW5ndGggPiAxIGJlY2F1c2UgdGhpcyBpcyBhbHNvIGluY2x1ZGVkIGluIGNoaWxkcmVuIHF1ZXJ5XG5cdFx0aWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuXHRcdFx0dGhpcy5jb250YWluZXIucmV2YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpKTtcblx0XHR0aGlzLnJldmFsaWRhdGUoKTtcblx0fVxuXG59XG4iXX0=