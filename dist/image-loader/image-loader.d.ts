import { ElementRef } from "@angular/core";
export declare class ImageLoader {
    private element;
    constructor(element: ElementRef);
    private _src;
    private _alternate;
    loaded: boolean;
    loading: boolean;
    error: boolean;
    private tmpImg;
    private initialized;
    src: string;
    protected src2: string;
    alternate: string;
    protected alternate2: string;
    reload(): void;
    private load();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare function ensureImagesLoaded(root: HTMLElement, options?: {
    retryError?: boolean;
    lazy?: boolean;
}): void;
