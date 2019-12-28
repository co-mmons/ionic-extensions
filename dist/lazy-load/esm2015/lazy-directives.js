var LazyDirectives_1;
import { __awaiter, __decorate, __param } from "tslib";
import { ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, Optional, QueryList, Renderer2 } from "@angular/core";
import { sleep } from "@co.mmons/js-utils/core";
import { Loader } from "./lazy-load";
let LazyLoadContainer = class LazyLoadContainer {
    constructor(element) {
        this.element = element;
    }
    revalidate() {
        if (this.loader) {
            this.loader.update();
            let rect = this.element.nativeElement.getBoundingClientRect();
            if (rect.width == 0 || rect.height == 0) {
                //setTimeout(() => this.revalidate(), 200);
            }
            //console.log(this.children);
            //window.dispatchEvent(new Event("resize"));
        }
    }
    ngOnInit() {
        this.init();
    }
    ngAfterContentInit() {
        this.children.changes.subscribe(() => this.revalidate());
        if (this.children.length > 0) {
            this.revalidate();
        }
    }
    ngOnDestroy() {
        if (this.loader) {
            this.loader.destroy();
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {};
            options.selector = ".ionx-lazy-load";
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
            this.loader = new Loader(options);
        });
    }
};
LazyLoadContainer.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    ContentChildren(forwardRef(() => LazyDirectives), { descendants: true })
], LazyLoadContainer.prototype, "children", void 0);
LazyLoadContainer = __decorate([
    Directive({
        selector: "[ionx-lazy-load-container]"
    })
], LazyLoadContainer);
export { LazyLoadContainer };
let LazyDirectives = LazyDirectives_1 = class LazyDirectives {
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
            this.renderer.addClass(this.element.nativeElement, "ionx-lazy-load");
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
};
LazyDirectives.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: LazyLoadContainer, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => LazyLoadContainer),] }] }
];
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
    __param(2, Optional()), __param(2, Inject(forwardRef(() => LazyLoadContainer)))
], LazyDirectives);
export { LazyDirectives };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBTW5DLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRTdCLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQ3BELENBQUM7SUFJRCxVQUFVO1FBRVQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM5RCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUN4QywyQ0FBMkM7YUFDM0M7WUFDRCw2QkFBNkI7WUFFN0IsNENBQTRDO1NBQzVDO0lBQ0YsQ0FBQztJQUtELFFBQVE7UUFDUCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsa0JBQWtCO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLElB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QUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDNUI7SUFDRixDQUFDO0lBRUQsa0JBQWtCO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUVELENBQUE7O1lBL0M0QixVQUFVO1lBQW9CLFNBQVM7WUFBK0UsaUJBQWlCLHVCQUE3RixRQUFRLFlBQUksTUFBTSxTQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzs7QUFJNUg7SUFEQyxlQUFlLENBQUMsZ0JBQWMsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQztnREFDakI7QUFPcEM7SUFEQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7eUNBSXZCO0FBR0Q7SUFEQyxLQUFLLENBQUMsMEJBQTBCLENBQUM7K0NBSWpDO0FBdEJXLGNBQWM7SUFIMUIsU0FBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLGtCQUFrQjtLQUM1QixDQUFDO0lBR3FFLFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxXQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0dBRmpILGNBQWMsQ0FpRDFCO1NBakRZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgUXVlcnlMaXN0LCBSZW5kZXJlcjJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3NsZWVwfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TG9hZGVyfSBmcm9tIFwiLi9sYXp5LWxvYWRcIjtcbmltcG9ydCB7TGF6eUxvYWRPcHRpb25zfSBmcm9tIFwiLi9sYXp5LWxvYWQtb3B0aW9uc1wiO1xuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6IFwiW2lvbngtbGF6eS1sb2FkLWNvbnRhaW5lcl1cIlxufSlcbmV4cG9ydCBjbGFzcyBMYXp5TG9hZENvbnRhaW5lciB7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuXHR9XG5cblx0cHJpdmF0ZSBsb2FkZXI6IExvYWRlcjtcblxuXHRyZXZhbGlkYXRlKCkge1xuXG5cdFx0aWYgKHRoaXMubG9hZGVyKSB7XG5cblx0XHRcdHRoaXMubG9hZGVyLnVwZGF0ZSgpO1xuXG5cdFx0XHRsZXQgcmVjdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0aWYgKHJlY3Qud2lkdGggPT0gMCB8fCByZWN0LmhlaWdodCA9PSAwKSB7XG5cdFx0XHRcdC8vc2V0VGltZW91dCgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSwgMjAwKTtcblx0XHRcdH1cblx0XHRcdC8vY29uc29sZS5sb2codGhpcy5jaGlsZHJlbik7XG5cblx0XHRcdC8vd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicmVzaXplXCIpKTtcblx0XHR9XG5cdH1cblxuXHRAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gTGF6eURpcmVjdGl2ZXMpLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PExhenlEaXJlY3RpdmVzPjtcblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmluaXQoKTtcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpKTtcblx0XHRpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLnJldmFsaWRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5sb2FkZXIpIHtcblx0XHRcdHRoaXMubG9hZGVyLmRlc3Ryb3koKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGluaXQoKSB7XG5cblx0XHRjb25zdCBvcHRpb25zOiBMYXp5TG9hZE9wdGlvbnMgPSB7fTtcblx0XHRvcHRpb25zLnNlbGVjdG9yID0gXCIuaW9ueC1sYXp5LWxvYWRcIjtcblx0XHRvcHRpb25zLmNvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0aWYgKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpb24tY29udGVudFwiKSB7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuXHRcdFx0XHRvcHRpb25zLnNjcm9sbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiLmlubmVyLXNjcm9sbFwiKTtcblxuXHRcdFx0XHRpZiAoIW9wdGlvbnMuc2Nyb2xsKSB7XG5cdFx0XHRcdFx0YXdhaXQgc2xlZXAoNTApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkZXIgPSBuZXcgTG9hZGVyKG9wdGlvbnMpO1xuXHR9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiBcIltpb254LWxhenktbG9hZF1cIlxufSlcbmV4cG9ydCBjbGFzcyBMYXp5RGlyZWN0aXZlcyB7XG5cblx0Y29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgQE9wdGlvbmFsKCkgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IExhenlMb2FkQ29udGFpbmVyKSkgcHJpdmF0ZSBjb250YWluZXI/OiBMYXp5TG9hZENvbnRhaW5lcikge1xuXHR9XG5cblx0QENvbnRlbnRDaGlsZHJlbihMYXp5RGlyZWN0aXZlcywge2Rlc2NlbmRhbnRzOiB0cnVlfSlcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxMYXp5RGlyZWN0aXZlcz47XG5cblx0cHJpdmF0ZSBfc3JjOiBzdHJpbmc7XG5cblx0cHJpdmF0ZSBfYWx0ZXJuYXRlOiBzdHJpbmc7XG5cblx0QElucHV0KFwiaW9ueC1sYXp5LWxvYWRcIilcblx0cHVibGljIHNldCBzcmModmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX3NyYyA9IHZhbHVlO1xuXHRcdHRoaXMucmVzZXQoKTtcblx0fVxuXG5cdEBJbnB1dChcImlvbngtbGF6eS1sb2FkLWFsdGVybmF0ZVwiKVxuXHRwdWJsaWMgc2V0IGFsdGVybmF0ZSh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fYWx0ZXJuYXRlID0gdmFsdWU7XG5cdFx0dGhpcy5yZXNldCgpO1xuXHR9XG5cblx0cHJpdmF0ZSByZXNldCgpIHtcblxuXHRcdGlmICh0aGlzLl9zcmMpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiaW9ueC1sYXp5LWxvYWRcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXCJkYXRhLW9yaWdpbmFsXCIsIHRoaXMuX3NyYyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2FsdGVybmF0ZSkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiZGF0YS1hbHRlcm5hdGVcIiwgdGhpcy5fYWx0ZXJuYXRlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHJldmFsaWRhdGUoKSB7XG5cblx0XHQvLyBjaGlsZHJlbi5sZW5ndGggPiAxIGJlY2F1c2UgdGhpcyBpcyBhbHNvIGluY2x1ZGVkIGluIGNoaWxkcmVuIHF1ZXJ5XG5cdFx0aWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuXHRcdFx0dGhpcy5jb250YWluZXIucmV2YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmNoaWxkcmVuLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpKTtcblx0XHR0aGlzLnJldmFsaWRhdGUoKTtcblx0fVxuXG59XG4iXX0=