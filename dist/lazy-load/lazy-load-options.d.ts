export interface LazyLoadOptions {
    selector?: string;
    scroll?: HTMLElement | null;
    container?: HTMLElement | Window;
    threshold?: number;
    throttle?: number;
    dataSrc?: string;
    dataSrcSet?: string;
    dataAlternate?: string;
    classLoading?: string;
    classLoaded?: string;
    skipInvisible?: boolean;
    waitInvisible?: boolean;
    callbackLoad?: any;
    callbackError?: any;
    callbackSet?: any;
    callbackProcessed?: any;
}
