import { ElementRef, OnDestroy, OnInit } from "@angular/core";
import { LoaderOptions } from "./loader-options";
export declare class Loader implements OnInit, OnDestroy, LoaderOptions {
    private elementRef;
    constructor(elementRef: ElementRef<HTMLElement>);
    fill: boolean;
    instanceCallback: (loader: Loader) => void;
    header: string;
    message: string;
    mode: "spinner" | "progress";
    progressMessage: string;
    progressType: "determinate" | "indeterminate";
    progressValue: number;
    progressBuffer: number;
    progressPercent: number;
    get progressPercentVisible(): boolean;
    get spinnerMode(): boolean;
    get progressMode(): boolean;
    dismiss(): Promise<boolean>;
    private popover;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
