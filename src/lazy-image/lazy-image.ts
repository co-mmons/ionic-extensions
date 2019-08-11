import {ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, Optional, QueryList, Renderer} from "@angular/core";
import {sleep} from "@co.mmons/js-utils/core";
import {LazyLoad} from "./lazy-load";
import {LazyLoadOptions} from "./lazy-load-options";


@Directive({
	selector: "[ionx-lazy-image]"
})
export class LazyImage {

	constructor(public element: ElementRef, private renderer: Renderer, @Optional() @Inject(forwardRef(() => LazyImageContainer)) private container?: LazyImageContainer) {
	}

	@ContentChildren(LazyImage, {descendants: true})
	children: QueryList<LazyImage>;

	private _src: string;

	private _alternate: string;

	@Input("ionx-lazy-image")
	public set src(value: string) {
		this._src = value;
		this.reset();
	}

	@Input("ionx-lazy-image-alternate")
	public set alternate(value: string) {
		this._alternate = value;
		this.reset();
	}

	private reset() {

		if (this._src) {
			this.renderer.setElementClass(this.element.nativeElement, "ionx-lazy-image", true);
			this.renderer.setElementAttribute(this.element.nativeElement, "data-original", this._src);
		}

		if (this._alternate) {
			this.renderer.setElementAttribute(this.element.nativeElement, "data-alternate", this._alternate);
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

@Directive({
	selector: "ion-content[ionx-lazy-image], [ionx-lazy-image-container]"
})
export class LazyImageContainer {

	constructor(private element: ElementRef<HTMLElement>) {
	}

	private lazyLoad: LazyLoad;

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

	@ContentChildren(LazyImage, {descendants: true})
	children: QueryList<LazyImage>;

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

	private async initLazyLoad() {

		let options: LazyLoadOptions = {};
		options.selector = ".ionx-lazy-image";
		options.container = this.element.nativeElement;

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

		this.lazyLoad = new LazyLoad(options);
	}

}
