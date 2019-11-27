import { ElementRef, OnDestroy, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
export declare class VirtualScrollHelper implements OnInit, OnDestroy {
    private readonly element;
    private platform;
    constructor(element: ElementRef<HTMLIonVirtualScrollElement>, platform: Platform);
    private viewObserver;
    private scheduleRerender;
    private scrollPosition;
    private content;
    private contentScrollEndListener;
    private contentScrolled;
    markAsDirtyWhenInactive(): void;
    rerender(): Promise<void>;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
