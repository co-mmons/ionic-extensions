import { ElementRef, QueryList, Renderer2 } from "@angular/core";
export declare class LazyImageContainer {
    private element;
    constructor(element: ElementRef<HTMLElement>);
    private lazyLoad;
    revalidate(): void;
    children: QueryList<LazyImage>;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private initLazyLoad;
}
export declare class LazyImage {
    element: ElementRef;
    private renderer;
    private container?;
    constructor(element: ElementRef, renderer: Renderer2, container?: LazyImageContainer);
    children: QueryList<LazyImage>;
    private _src;
    private _alternate;
    src: string;
    alternate: string;
    private reset;
    private revalidate;
    ngAfterContentInit(): void;
}
