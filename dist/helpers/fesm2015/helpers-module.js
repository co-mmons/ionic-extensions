class EventListenersHelper {
    constructor() {
        this.listeners = [];
    }
    add(element, type, listener, useCapture) {
        element.addEventListener(type, listener, useCapture);
        this.listeners.push({ target: element, listener: listener, type: type, useCapture: useCapture });
    }
    removeAll() {
        for (let e of this.listeners) {
            e.target.removeEventListener(e.type, e.listener, e.useCapture);
        }
        this.listeners = [];
    }
}

class SubscriptionsHelper {
    constructor() {
        this.subscriptions = [];
    }
    add(subscription) {
        if (subscription) {
            this.subscriptions.push(subscription);
        }
    }
    unsubscribeAll() {
        for (let e of this.subscriptions) {
            e.unsubscribe();
        }
        this.subscriptions = [];
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { EventListenersHelper, SubscriptionsHelper };
//# sourceMappingURL=helpers-module.js.map
