import { EventEmitter } from "@angular/core";
import { Platform } from "@ionic/angular";
export declare class ViewObserver {
    private content;
    private readonly platform;
    constructor(content: HTMLIonContentElement, platform: Platform);
    private visible;
    private didEnterListener;
    private didLeaveListener;
    private paused;
    private pauseSubscription;
    private resumeSubscription;
    readonly activated: EventEmitter<void>;
    private viewDidEnter;
    private viewDidLeave;
    private whenPaused;
    private whenResumed;
    isActive(): boolean;
    destroy(): void;
}
