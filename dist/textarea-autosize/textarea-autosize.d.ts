import { ElementRef, OnInit } from "@angular/core";
export declare class TextareaAutosize implements OnInit {
    element: ElementRef<HTMLIonTextareaElement>;
    constructor(element: ElementRef<HTMLIonTextareaElement>);
    protected onChange(): void;
    private readonly textarea;
    private adjust;
    ngOnInit(): Promise<void>;
}
