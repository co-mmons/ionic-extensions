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
    set src(value: string);
    get src(): string;
    protected set src2(value: string);
    set alternate(value: string);
    protected set alternate2(value: string);
    private _cssClasses;
    set cssClasses(value: ImageLoaderStateCssClasses);
    protected set cssClasses2(value: ImageLoaderStateCssClasses);
    private _cssClassesTarget;
    set cssClassesTarget(value: string);
    protected set cssClassesParent(value: string);
    reload(): void;
    private load;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
export declare function ensureImagesLoaded(root: HTMLElement, options?: {
    retryError?: boolean;
    lazy?: boolean;
}): Promise<void>;
