import { Directive, Input, ContentChildren, QueryList, ElementRef, Renderer, Optional, Inject, forwardRef } from "@angular/core";
import { Content, Scroll } from "ionic-angular";
import { LazyLoad } from "./lazy-load";
import { LazyLoadOptions } from "./lazy-load-options";


@Directive({
    selector: "[ionx-lazy-image]"
})
export class LazyImage {

	constructor(public element: ElementRef, private renderer: Renderer, @Optional() @Inject(forwardRef(() => LazyImageContainer)) private container?: LazyImageContainer) {
	}

	@ContentChildren(LazyImage, { descendants: true })
	children: QueryList<LazyImage>;

    private _src: string;

    @Input("ionx-lazy-image")
    public set src(value: string) {
        this._src = value;
        this.reset();
    }

    private reset() {

        if (this._src) {
            this.renderer.setElementClass(this.element.nativeElement, "ionx-lazy-image", true);
            this.renderer.setElementAttribute(this.element.nativeElement, "data-original", this._src);
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
    selector: "ion-content[ionx-lazy-image], ion-scroll[ionx-lazy-image], [ionx-lazy-image-container]"
})
export class LazyImageContainer {
    
	constructor(private element: ElementRef, @Optional() private ionContent: Content, @Optional() private ionScroll: Scroll) {
	}

    private lazyLoad: LazyLoad;

	revalidate() {
		this.lazyLoad.update();
		
		let rect = this.element.nativeElement.getBoundingClientRect();
		if (rect.width == 0 || rect.height == 0) {
			//setTimeout(() => this.revalidate(), 200);
		}
			//console.log(this.children);

		//window.dispatchEvent(new Event("resize"));   
	}

	@ContentChildren(LazyImage, { descendants: true })
	children: QueryList<LazyImage>;

	ngOnInit() {
		this.lazyLoad = this.newLazyLoad();
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

    private newLazyLoad(): LazyLoad {

        let options: LazyLoadOptions = {};
        options.selector = ".ionx-lazy-image";

        if (this.ionContent) {
            options.container = this.ionContent.getScrollElement();
        }

        return new LazyLoad(options);
    }

}
