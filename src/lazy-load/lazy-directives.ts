import {ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, Optional, QueryList, Renderer2} from "@angular/core";
import {sleep} from "@co.mmons/js-utils/core";
import {Loader} from "./lazy-load";
import {LazyLoadOptions} from "./lazy-load-options";

@Directive({
	selector: "[ionx-lazy-load-container]"
})
export class LazyLoadContainer {

	constructor(private element: ElementRef<HTMLElement>) {
	}

	@Input()
	options?: LazyLoadOptions;

	private loader: Loader;

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

	@ContentChildren(forwardRef(() => LazyDirectives), {descendants: true})
	children: QueryList<LazyDirectives>;

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

	private async init() {

		const options: LazyLoadOptions = Object.assign({
			selector: ".ionx-lazy-load",
			container: this.element.nativeElement
		}, this.options);

		if (this.element.nativeElement.tagName.toLowerCase() === "ion-content") {

			for (let i = 0; i < 40; i++) {
				options.scroll = this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".inner-scroll");

				if (!options.scroll) {
					await sleep(50);
				} else {
					break;
				}
			}
		}

		this.loader = new Loader(options);
	}

}

@Directive({
	selector: "[ionx-lazy-load]"
})
export class LazyDirectives {

	constructor(public element: ElementRef, private renderer: Renderer2, @Optional() @Inject(forwardRef(() => LazyLoadContainer)) private container?: LazyLoadContainer) {
	}

	@ContentChildren(LazyDirectives, {descendants: true})
	children: QueryList<LazyDirectives>;

	private _src: string;

	private _alternate: string;

	@Input("ionx-lazy-load")
	public set src(value: string) {
		this._src = value;
		this.reset();
	}

	@Input("ionx-lazy-load-alternate")
	public set alternate(value: string) {
		this._alternate = value;
		this.reset();
	}

	private reset() {

		if (this._src) {
			this.renderer.addClass(this.element.nativeElement, "ionx-lazy-load");
			this.renderer.setAttribute(this.element.nativeElement, "data-original", this._src);
		}

		if (this._alternate) {
			this.renderer.setAttribute(this.element.nativeElement, "data-alternate", this._alternate);
		}
	}

	private revalidate() {

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
