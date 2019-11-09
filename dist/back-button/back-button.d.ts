import { ElementRef, OnInit } from "@angular/core";
export declare class BackButton implements OnInit {
    private elementRef;
    constructor(elementRef: ElementRef<HTMLIonBackButtonElement>);
    icon: string;
    ngOnInit(): void;
}
