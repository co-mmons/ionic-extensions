import { ElementRef } from "@angular/core";
export declare class SelectOption {
    private element;
    constructor(element: ElementRef<HTMLElement>);
    value: any;
    divider: boolean;
    readonly label: string;
}
