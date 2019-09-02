import {Directive, Input, ElementRef} from "@angular/core";
import {ensureLazyImagesLoaded} from "@co.mmons/ionic-extensions/lazy-image";

export interface ImageLoaderStateCssClasses {
	loaded?: string;
	loading?: string;
	error?: string;
}

@Directive({
	selector: "[ionx-image-loader]",
	host: {
		"[attr.ionx-image-loader]": "true"
	}
})
export class ImageLoader {

	constructor(private element: ElementRef<HTMLElement>) {
	}

	private _src: string;

	private _alternate: string;

	loaded: boolean;

	loading: boolean;

	error: boolean;

	//@ts-ignore
	private tmpImg: HTMLImageElement;

	private initialized: boolean;

	@Input("src")
	public set src(value: string) {
		let old = this._src;
		this._src = value;

		if (old != this._src) {
			this.reload();
		}
	}

	public get src() {
		return this._src;
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
			this.reload();
		}
	}

	@Input("ionx-image-loader-alternate")
	protected set alternate2(value: string) {
		this.alternate = value;
	}

	private _cssClasses: ImageLoaderStateCssClasses;

	@Input("css-classes")
	public set cssClasses(value: ImageLoaderStateCssClasses) {
		this._cssClasses = value;
	}

	@Input("ionx-image-loader-css-classes")
	protected set cssClasses2(value: ImageLoaderStateCssClasses) {
		this._cssClasses = value;
	}

	private _cssClassesTarget: string;

	@Input("css-classes-target")
	public set cssClassesTarget(value: string) {
		this._cssClassesTarget = value;
	}

	@Input("ionx-image-loader-css-classes-target")
	protected set cssClassesParent(value: string) {
		this._cssClassesTarget = value;
	}

	reload() {
		if (!this.loading && this.initialized) {
			this.loaded = false;
			this.error = false;

			if (this._cssClasses) {

				let target = this._cssClassesTarget ? this.element.nativeElement.closest(this._cssClassesTarget) : this.element.nativeElement;

				if (this._cssClasses.loaded) {
					target.classList.remove(this._cssClasses.loaded);
				}

				if (this._cssClasses.error) {
					target.classList.remove(this._cssClasses.error);
				}
			}
			
			this.load();
		}
	}

	private load() {

		if (this.loaded || this.error || !this._src || this.loading) {
			return;
		}

		this.loading = true;
		if (this._cssClasses && this._cssClasses.loading) {
			this.element.nativeElement.classList.add(this._cssClasses.loading);
		}

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
			this.error = false;

			if (this._cssClasses) {
				let target = this._cssClassesTarget ? element.closest(this._cssClassesTarget) : element;

				if (this._cssClasses.loading) {
					target.classList.remove(this._cssClasses.loading);
				}

				if (this._cssClasses.loaded) {
					target.classList.add(this._cssClasses.loaded);
				}
			}
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
			this.loaded = false;
			this.error = true;

			if (this._cssClasses) {
				let target = this._cssClassesTarget ? element.closest(this._cssClassesTarget) : element;

				if (this._cssClasses.loading) {
					target.classList.remove(this._cssClasses.loading);
				}

				if (this._cssClasses.error) {
					target.classList.add(this._cssClasses.error);
				}
			}
		};

		img.src = this._src;
	}

	ngAfterViewInit() {
		this.initialized = true;
		this.element.nativeElement["ionxImageLoader"] = this;
		this.load();
	}

	ngOnDestroy() {
		if (this.element.nativeElement) {
			delete this.element.nativeElement["ionxImageLoader"];
		}
	}

}

export async function ensureImagesLoaded(root: HTMLElement, options?: {retryError?: boolean, lazy?: boolean}) {

	let images = root.querySelectorAll("[ionx-image-loader]");
	for (let i = 0; i < images.length; i++) {
		let image: Element & ImageLoaderElement = images.item(i);

		if (!image.ionxImageLoader || !image.ionxImageLoader.src || image.ionxImageLoader.loaded || (image.ionxImageLoader.error && (!options || !options.retryError))) {
			continue;
		}

		image.ionxImageLoader.reload();
	}

	if (options && options.lazy) {
		await ensureLazyImagesLoaded(root, {retryError: options && options.retryError});
	}
}

interface ImageLoaderElement {
	ionxImageLoader?: ImageLoader;
}
