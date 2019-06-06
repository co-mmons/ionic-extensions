import { ElementRef } from "@angular/core";
export declare class IonicItemTargetFix {
    private element;
    constructor(element: ElementRef<HTMLElement>);
    target: string;
    ngAfterViewInit(): Promise<void>;
}
