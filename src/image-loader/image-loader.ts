import {Directive, Input, ElementRef} from "@angular/core";

@Directive({
	selector: "[ionx-image-loader]"
})
export class ImageLoader {

	constructor(private element: ElementRef) {
	}

	private _src: string;

	private _alternate: string;

	private loaded: boolean;

	private loading: boolean;

	private tmpImg: HTMLImageElement;

	private initialized: boolean;

	@Input("src")
	public set src(value: string) {
		let old = this._src;
		this._src = value;

		if (old != this._src) {
			this.reset();
		}
	}

	@Input("ionx-image-loader")
	protected set src2(value: string) {
		this.src = value;
	}

	@Input("alternate")
	public set alternate(value: string) {
		let old = this._alternate;
		this._alternate = value;

		if (old != this._alternate) {
			this.reset();
		}
	}

	@Input("ionx-image-loader-alternate")
	protected set alternate2(value: string) {
		this.alternate = value;
	}

	private reset() {
		if (!this.loading && this.initialized) {
			this.loaded = false;
		}
	}

	private load() {

		if (this.loaded || !this._src || this.loading) {
			return;
		}

		this.loading = true;

		let element: HTMLElement = this.element.nativeElement;
		
		let img: HTMLImageElement;

		// if host element is not <img>, we need to create tmp 
		if (element.tagName.toLowerCase() != "img") {
			img = this.tmpImg = new Image();
		} else {
			img = <any>element;
		}

		img.onload = () => {
			
			if (img !== element) {
				element.style.backgroundImage = `url(${img.src})`;
			}

			img.onerror = undefined;
			img.onload = undefined;

			this.tmpImg = undefined;
			this.loaded = true;
			this.loading = false;
		};

		img.onerror = () => {

			if (this._alternate && this._alternate != img.src) {
				img.src = this._alternate;
				return;
			}

			img.onerror = undefined;
			img.onload = undefined;

			this.tmpImg = undefined;
			this.loading = false;
		};

		img.src = this._src;
	}

	ngAfterViewInit() {
		this.initialized = true;
		this.load();
	}

}
