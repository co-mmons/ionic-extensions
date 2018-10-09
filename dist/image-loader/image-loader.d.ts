import { ElementRef } from "@angular/core";
export interface ImageLoaderStateCssClasses {
    loaded?: string;
    loading?: string;
    error?: string;
}
export declare class ImageLoader {
    private element;
    constructor(element: ElementRef<HTMLElement>);
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
    private _cssClasses;
    cssClasses: ImageLoaderStateCssClasses;
    protected cssClasses2: ImageLoaderStateCssClasses;
    reload(): void;
    private load;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare function ensureImagesLoaded(root: HTMLElement, options?: {
    retryError?: boolean;
    lazy?: boolean;
}): Promise<void>;
