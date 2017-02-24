import { LazyLoadOptions } from "./lazy-load-options";
export declare class LazyLoad {
    constructor(options?: LazyLoadOptions);
    private _options;
    private _queryOriginNode;
    private _previousLoopTime;
    private _loopTimeout;
    private _handleScrollFn;
    private _elements;
    private _showOnAppear(element);
    private _loopThroughElements();
    private _purgeElements();
    private _isHandlingScroll;
    private _startScrollHandler();
    private _stopScrollHandler();
    handleScroll(): void;
    update(): void;
    destroy(): void;
}
