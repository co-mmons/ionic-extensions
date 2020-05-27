import { ElementRef, QueryList, Renderer2 } from "@angular/core";
import { LazyLoadOptions } from "./lazy-load-options";
export declare class LazyLoadContainer {
    private element;
    constructor(element: ElementRef<HTMLElement>);
    options?: LazyLoadOptions;
    private loader;
    revalidate(): void;
    children: QueryList<LazyDirectives>;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private init;
}
export declare class LazyDirectives {
    element: ElementRef;
    private renderer;
    private container?;
    constructor(element: ElementRef, renderer: Renderer2, container?: LazyLoadContainer);
    children: QueryList<LazyDirectives>;
    private _src;
    private _alternate;
    set src(value: string);
    set alternate(value: string);
    private reset;
    private revalidate;
    ngAfterContentInit(): void;
}
