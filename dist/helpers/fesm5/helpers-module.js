import { __values } from 'tslib';

var EventListenersHelper = /** @class */ (function () {
    function EventListenersHelper() {
        this.listeners = [];
    }
    EventListenersHelper.prototype.add = function (element, type, listener, useCapture) {
        element.addEventListener(type, listener, useCapture);
        this.listeners.push({ target: element, listener: listener, type: type, useCapture: useCapture });
    };
    EventListenersHelper.prototype.removeAll = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var e = _c.value;
                e.target.removeEventListener(e.type, e.listener, e.useCapture);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.listeners = [];
    };
    return EventListenersHelper;
}());

var SubscriptionsHelper = /** @class */ (function () {
    function SubscriptionsHelper() {
        this.subscriptions = [];
    }
    SubscriptionsHelper.prototype.add = function (subscription) {
        if (subscription) {
            this.subscriptions.push(subscription);
        }
    };
    SubscriptionsHelper.prototype.unsubscribeAll = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var e = _c.value;
                e.unsubscribe();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.subscriptions = [];
    };
    return SubscriptionsHelper;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { EventListenersHelper, SubscriptionsHelper };
//# sourceMappingURL=helpers-module.js.map
