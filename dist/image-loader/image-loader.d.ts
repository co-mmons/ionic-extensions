import { ElementRef } from "@angular/core";
export declare class ImageLoader {
    private element;
    constructor(element: ElementRef);
    private _src;
    private _alternate;
    private loaded;
    private loading;
    private tmpImg;
    private initialized;
    src: string;
    protected src2: string;
    alternate: string;
    protected alternate2: string;
    private reset();
    private load();
    ngAfterViewInit(): void;
}
