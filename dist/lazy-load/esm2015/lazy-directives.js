import * as tslib_1 from "tslib";
var LazyDirectives_1;
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
tslib_1.__decorate([
    ContentChildren(forwardRef(() => LazyDirectives), { descendants: true }),
    tslib_1.__metadata("design:type", QueryList)
], LazyLoadContainer.prototype, "children", void 0);
LazyLoadContainer = tslib_1.__decorate([
    Directive({
        selector: "[ionx-lazy-load-container]"
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
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
tslib_1.__decorate([
    ContentChildren(LazyDirectives_1, { descendants: true }),
    tslib_1.__metadata("design:type", QueryList)
], LazyDirectives.prototype, "children", void 0);
tslib_1.__decorate([
    Input("ionx-lazy-load"),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], LazyDirectives.prototype, "src", null);
tslib_1.__decorate([
    Input("ionx-lazy-load-alternate"),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], LazyDirectives.prototype, "alternate", null);
LazyDirectives = LazyDirectives_1 = tslib_1.__decorate([
    Directive({
        selector: "[ionx-lazy-load]"
    }),
    tslib_1.__param(2, Optional()), tslib_1.__param(2, Inject(forwardRef(() => LazyLoadContainer))),
    tslib_1.__metadata("design:paramtypes", [ElementRef, Renderer2, LazyLoadContainer])
], LazyDirectives);
export { LazyDirectives };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvbGF6eS1sb2FkLyIsInNvdXJjZXMiOlsibGF6eS1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBTW5DLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRTdCLFlBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQ3BELENBQUM7SUFJRCxVQUFVO1FBRVQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFckIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM5RCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUN4QywyQ0FBMkM7YUFDM0M7WUFDRCw2QkFBNkI7WUFFN0IsNENBQTRDO1NBQzVDO0lBQ0YsQ0FBQztJQUtELFFBQVE7UUFDUCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsa0JBQWtCO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLElB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QUMsU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzVCO0lBQ0YsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FFRCxDQUFBO0FBM0NBO0lBREMsZUFBZSxDQUFDLGdCQUFjLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUM7c0NBQzNDLFNBQVM7Z0RBQWlCO0FBT3BDO0lBREMsS0FBSyxDQUFDLGdCQUFnQixDQUFDOzs7eUNBSXZCO0FBR0Q7SUFEQyxLQUFLLENBQUMsMEJBQTBCLENBQUM7OzsrQ0FJakM7QUF0QlcsY0FBYztJQUgxQixTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsa0JBQWtCO0tBQzVCLENBQUM7SUFHcUUsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTs2Q0FBakcsVUFBVSxFQUFvQixTQUFTLEVBQStFLGlCQUFpQjtHQUZ2SixjQUFjLENBaUQxQjtTQWpEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtzbGVlcH0gZnJvbSBcIkBjby5tbW9ucy9qcy11dGlscy9jb3JlXCI7XG5pbXBvcnQge0xvYWRlcn0gZnJvbSBcIi4vbGF6eS1sb2FkXCI7XG5pbXBvcnQge0xhenlMb2FkT3B0aW9uc30gZnJvbSBcIi4vbGF6eS1sb2FkLW9wdGlvbnNcIjtcblxuQERpcmVjdGl2ZSh7XG5cdHNlbGVjdG9yOiBcIltpb254LWxhenktbG9hZC1jb250YWluZXJdXCJcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWRDb250YWluZXIge1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcblx0fVxuXG5cdHByaXZhdGUgbG9hZGVyOiBMb2FkZXI7XG5cblx0cmV2YWxpZGF0ZSgpIHtcblxuXHRcdGlmICh0aGlzLmxvYWRlcikge1xuXG5cdFx0XHR0aGlzLmxvYWRlci51cGRhdGUoKTtcblxuXHRcdFx0bGV0IHJlY3QgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGlmIChyZWN0LndpZHRoID09IDAgfHwgcmVjdC5oZWlnaHQgPT0gMCkge1xuXHRcdFx0XHQvL3NldFRpbWVvdXQoKCkgPT4gdGhpcy5yZXZhbGlkYXRlKCksIDIwMCk7XG5cdFx0XHR9XG5cdFx0XHQvL2NvbnNvbGUubG9nKHRoaXMuY2hpbGRyZW4pO1xuXG5cdFx0XHQvL3dpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInJlc2l6ZVwiKSk7XG5cdFx0fVxuXHR9XG5cblx0QENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IExhenlEaXJlY3RpdmVzKSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxMYXp5RGlyZWN0aXZlcz47XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5pbml0KCk7XG5cdH1cblxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cdFx0dGhpcy5jaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSk7XG5cdFx0aWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5yZXZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMubG9hZGVyKSB7XG5cdFx0XHR0aGlzLmxvYWRlci5kZXN0cm95KCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBpbml0KCkge1xuXG5cdFx0Y29uc3Qgb3B0aW9uczogTGF6eUxvYWRPcHRpb25zID0ge307XG5cdFx0b3B0aW9ucy5zZWxlY3RvciA9IFwiLmlvbngtbGF6eS1sb2FkXCI7XG5cdFx0b3B0aW9ucy5jb250YWluZXIgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdGlmICh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW9uLWNvbnRlbnRcIikge1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcblx0XHRcdFx0b3B0aW9ucy5zY3JvbGwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zaGFkb3dSb290ICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5pbm5lci1zY3JvbGxcIik7XG5cblx0XHRcdFx0aWYgKCFvcHRpb25zLnNjcm9sbCkge1xuXHRcdFx0XHRcdGF3YWl0IHNsZWVwKDUwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMubG9hZGVyID0gbmV3IExvYWRlcihvcHRpb25zKTtcblx0fVxuXG59XG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogXCJbaW9ueC1sYXp5LWxvYWRdXCJcbn0pXG5leHBvcnQgY2xhc3MgTGF6eURpcmVjdGl2ZXMge1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIEBPcHRpb25hbCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBMYXp5TG9hZENvbnRhaW5lcikpIHByaXZhdGUgY29udGFpbmVyPzogTGF6eUxvYWRDb250YWluZXIpIHtcblx0fVxuXG5cdEBDb250ZW50Q2hpbGRyZW4oTGF6eURpcmVjdGl2ZXMsIHtkZXNjZW5kYW50czogdHJ1ZX0pXG5cdGNoaWxkcmVuOiBRdWVyeUxpc3Q8TGF6eURpcmVjdGl2ZXM+O1xuXG5cdHByaXZhdGUgX3NyYzogc3RyaW5nO1xuXG5cdHByaXZhdGUgX2FsdGVybmF0ZTogc3RyaW5nO1xuXG5cdEBJbnB1dChcImlvbngtbGF6eS1sb2FkXCIpXG5cdHB1YmxpYyBzZXQgc3JjKHZhbHVlOiBzdHJpbmcpIHtcblx0XHR0aGlzLl9zcmMgPSB2YWx1ZTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdH1cblxuXHRASW5wdXQoXCJpb254LWxhenktbG9hZC1hbHRlcm5hdGVcIilcblx0cHVibGljIHNldCBhbHRlcm5hdGUodmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuX2FsdGVybmF0ZSA9IHZhbHVlO1xuXHRcdHRoaXMucmVzZXQoKTtcblx0fVxuXG5cdHByaXZhdGUgcmVzZXQoKSB7XG5cblx0XHRpZiAodGhpcy5fc3JjKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImlvbngtbGF6eS1sb2FkXCIpO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwiZGF0YS1vcmlnaW5hbFwiLCB0aGlzLl9zcmMpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hbHRlcm5hdGUpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcImRhdGEtYWx0ZXJuYXRlXCIsIHRoaXMuX2FsdGVybmF0ZSk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSByZXZhbGlkYXRlKCkge1xuXG5cdFx0Ly8gY2hpbGRyZW4ubGVuZ3RoID4gMSBiZWNhdXNlIHRoaXMgaXMgYWxzbyBpbmNsdWRlZCBpbiBjaGlsZHJlbiBxdWVyeVxuXHRcdGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcblx0XHRcdHRoaXMuY29udGFpbmVyLnJldmFsaWRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cdFx0dGhpcy5jaGlsZHJlbi5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJldmFsaWRhdGUoKSk7XG5cdFx0dGhpcy5yZXZhbGlkYXRlKCk7XG5cdH1cblxufVxuIl19