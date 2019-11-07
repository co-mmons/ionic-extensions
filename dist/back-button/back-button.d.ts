import { ElementRef, OnInit } from "@angular/core";
export declare class BackButton implements OnInit {
    private elementRef;
    constructor(elementRef: ElementRef<HTMLElement>);
    defaultHref: string;
    icon: string;
    modal: boolean;
    disabled: boolean;
    ngOnInit(): void;
}
