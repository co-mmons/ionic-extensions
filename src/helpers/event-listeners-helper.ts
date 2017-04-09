export class EventListenersHelper {

    private listeners: {target: HTMLElement, listener: EventListenerOrEventListenerObject, type: string, useCapture: boolean}[] = [];

    public add(element: HTMLElement, type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean) {
        element.addEventListener(type, listener, useCapture);
        this.listeners.push({target: element, listener: listener, type: type, useCapture: useCapture});
    }

    public removeAll() {

        for (let e of this.listeners) {
            e.target.removeEventListener(e.type, e.listener, e.useCapture);
        }

        this.listeners = [];
    }
}