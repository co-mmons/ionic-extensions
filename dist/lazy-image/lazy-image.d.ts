import { QueryList, ElementRef, Renderer } from "@angular/core";
export declare class LazyImage {
    element: ElementRef;
    private renderer;
    private container?;
    constructor(element: ElementRef, renderer: Renderer, container?: LazyImageContainer);
    children: QueryList<LazyImage>;
    private _src;
    private _alternate;
    src: string;
    alternate: string;
    private reset;
    private revalidate;
    ngAfterContentInit(): void;
}
export declare class LazyImageContainer {
    private element;
    constructor(element: ElementRef<HTMLElement>);
    private lazyLoad;
    revalidate(): void;
    children: QueryList<LazyImage>;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private newLazyLoad;
}
