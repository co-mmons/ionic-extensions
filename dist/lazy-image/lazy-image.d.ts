import { QueryList, ElementRef, Renderer } from "@angular/core";
import { Content, Scroll } from "ionic-angular";
export declare class LazyImage {
    element: ElementRef;
    private renderer;
    private container;
    constructor(element: ElementRef, renderer: Renderer, container?: LazyImageContainer);
    children: QueryList<LazyImage>;
    private _src;
    src: string;
    private reset();
    private revalidate();
    ngAfterContentInit(): void;
}
export declare class LazyImageContainer {
    private element;
    private ionContent;
    private ionScroll;
    constructor(element: ElementRef, ionContent: Content, ionScroll: Scroll);
    private lazyLoad;
    revalidate(): void;
    children: QueryList<LazyImage>;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private newLazyLoad();
}
