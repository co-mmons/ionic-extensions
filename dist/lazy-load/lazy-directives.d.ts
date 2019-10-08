import { ElementRef, QueryList, Renderer2 } from "@angular/core";
export declare class LazyLoadContainer {
    private element;
    constructor(element: ElementRef<HTMLElement>);
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
    src: string;
    alternate: string;
    private reset;
    private revalidate;
    ngAfterContentInit(): void;
}
