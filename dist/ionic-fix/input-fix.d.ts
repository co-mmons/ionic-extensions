import { ElementRef } from "@angular/core";
export declare class IonicInputFix {
    private element;
    constructor(element: ElementRef<HTMLIonInputElement>);
    tabIndex: string;
    ngAfterViewInit(): Promise<void>;
}
