export declare class EventListenersHelper {
    private listeners;
    add(element: HTMLElement, type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    removeAll(): void;
}
