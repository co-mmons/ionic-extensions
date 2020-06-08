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
            const options = Object.assign({
                selector: ".ionx-lazy-load",
                container: this.element.nativeElement
            }, this.options);
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
    Input("ionx-lazy-load-container")
], LazyLoadContainer.prototype, "options", void 0);
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
        if (this.container && this.children.length > 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBTW5DLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRTdCLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQ3BELENBQUM7SUFPRCxVQUFVO1FBRVQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM5RCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUN4QywyQ0FBMkM7YUFDM0M7WUFDRCw2QkFBNkI7WUFFN0IsNENBQTRDO1NBQzVDO0lBQ0YsQ0FBQztJQUtELFFBQVE7UUFDUCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsa0JBQWtCO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLElB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LENBQUM7SUFFTyxVQUFVO1FBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM1QjtJQUNGLENBQUM7SUFFRCxrQkFBa0I7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBRUQsQ0FBQTs7WUE3QzRCLFVBQVU7WUFBb0IsU0FBUztZQUErRSxpQkFBaUIsdUJBQTdGLFFBQVEsWUFBSSxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDOztBQUk1SDtJQURDLGVBQWUsQ0FBQyxnQkFBYyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDO2dEQUNqQjtBQU9wQztJQURDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzt5Q0FJdkI7QUFHRDtJQURDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQzsrQ0FJakM7QUF0QlcsY0FBYztJQUgxQixTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsa0JBQWtCO0tBQzVCLENBQUM7SUFHcUUsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7R0FGakgsY0FBYyxDQStDMUI7U0EvQ1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsLCBRdWVyeUxpc3QsIFJlbmRlcmVyMn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7c2xlZXB9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtMb2FkZXJ9IGZyb20gXCIuL2xhenktbG9hZFwiO1xuaW1wb3J0IHtMYXp5TG9hZE9wdGlvbnN9IGZyb20gXCIuL2xhenktbG9hZC1vcHRpb25zXCI7XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJbaW9ueC1sYXp5LWxvYWQtY29udGFpbmVyXVwiXG59KVxuZXhwb3J0IGNsYXNzIExhenlMb2FkQ29udGFpbmVyIHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWxhenktbG9hZC1jb250YWluZXJcIilcblx0b3B0aW9ucz86IExhenlMb2FkT3B0aW9ucztcblxuXHRwcml2YXRlIGxvYWRlcjogTG9hZGVyO1xuXG5cdHJldmFsaWRhdGUoKSB7XG5cblx0XHRpZiAodGhpcy5sb2FkZXIpIHtcblxuXHRcdFx0dGhpcy5sb2FkZXIudXBkYXRlKCk7XG5cblx0XHRcdGxldCByZWN0ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRpZiAocmVjdC53aWR0aCA9PSAwIHx8IHJlY3QuaGVpZ2h0ID09IDApIHtcblx0XHRcdFx0Ly9zZXRUaW1lb3V0KCgpID0+IHRoaXMucmV2YWxpZGF0ZSgpLCAyMDApO1xuXHRcdFx0fVxuXHRcdFx0Ly9jb25zb2xlLmxvZyh0aGlzLmNoaWxkcmVuKTtcblxuXHRcdFx0Ly93aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJyZXNpemVcIikpO1xuXHRcdH1cblx0fVxuXG5cdEBDb250ZW50Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBMYXp5RGlyZWN0aXZlcyksIHtkZXNjZW5kYW50czogdHJ1ZX0pXG5cdGNoaWxkcmVuOiBRdWVyeUxpc3Q8TGF6eURpcmVjdGl2ZXM+O1xuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuaW5pdCgpO1xuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xuXHRcdHRoaXMuY2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXZhbGlkYXRlKCkpO1xuXHRcdGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMucmV2YWxpZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmxvYWRlcikge1xuXHRcdFx0dGhpcy5sb2FkZXIuZGVzdHJveSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgaW5pdCgpIHtcblxuXHRcdGNvbnN0IG9wdGlvbnM6IExhenlMb2FkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0c2VsZWN0b3I6IFwiLmlvbngtbGF6eS1sb2FkXCIsXG5cdFx0XHRjb250YWluZXI6IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50XG5cdFx0fSwgdGhpcy5vcHRpb25zKTtcblxuXHRcdGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW9uLWNvbnRlbnRcIikge1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcblx0XHRcdFx0b3B0aW9ucy5zY3JvbGwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290ICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5pbm5lci1zY3JvbGxcIik7XG5cblx0XHRcdFx0aWYgKCFvcHRpb25zLnNjcm9sbCkge1xuXHRcdFx0XHRcdGF3YWl0IHNsZWVwKDUwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMubG9hZGVyID0gbmV3IExvYWRlcihvcHRpb25zKTtcblx0fVxuXG59XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJbaW9ueC1sYXp5LWxvYWRdXCJcbn0pXG5leHBvcnQgY2xhc3MgTGF6eURpcmVjdGl2ZXMge1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBMYXp5TG9hZENvbnRhaW5lcikpIHByaXZhdGUgY29udGFpbmVyPzogTGF6eUxvYWRDb250YWluZXIpIHtcblx0fVxuXG5cdEBDb250ZW50Q2hpbGRyZW4oTGF6eURpcmVjdGl2ZXMsIHtkZXNjZW5kYW50czogdHJ1ZX0pXG5cdGNoaWxkcmVuOiBRdWVyeUxpc3Q8TGF6eURpcmVjdGl2ZXM+O1xuXG5cdHByaXZhdGUgX3NyYzogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2FsdGVybmF0ZTogc3RyaW5nO1xuXG5cdEBJbnB1dChcImlvbngtbGF6eS1sb2FkXCIpXG5cdHB1YmxpYyBzZXQgc3JjKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9zcmMgPSB2YWx1ZTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWxhenktbG9hZC1hbHRlcm5hdGVcIilcblx0cHVibGljIHNldCBhbHRlcm5hdGUodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX2FsdGVybmF0ZSA9IHZhbHVlO1xuXHRcdHRoaXMucmVzZXQoKTtcblx0fVxuXG5cdHByaXZhdGUgcmVzZXQoKSB7XG5cblx0XHRpZiAodGhpcy5fc3JjKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImlvbngtbGF6eS1sb2FkXCIpO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiZGF0YS1vcmlnaW5hbFwiLCB0aGlzLl9zcmMpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hbHRlcm5hdGUpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImRhdGEtYWx0ZXJuYXRlXCIsIHRoaXMuX2FsdGVybmF0ZSk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSByZXZhbGlkYXRlKCkge1xuXHRcdGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuY29udGFpbmVyLnJldmFsaWRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cdFx0dGhpcy5jaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSk7XG5cdFx0dGhpcy5yZXZhbGlkYXRlKCk7XG5cdH1cblxufVxuIl19