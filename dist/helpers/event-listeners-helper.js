var EventListenersHelper = (function () {
    function EventListenersHelper() {
        this.listeners = [];
    }
    EventListenersHelper.prototype.add = function (element, type, listener, useCapture) {
        element.addEventListener(type, listener, useCapture);
        this.listeners.push({ target: element, listener: listener, type: type, useCapture: useCapture });
    };
    EventListenersHelper.prototype.removeAll = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var e = _a[_i];
            e.target.removeEventListener(e.type, e.listener, e.useCapture);
        }
        this.listeners = [];
    };
    return EventListenersHelper;
}());
export { EventListenersHelper };
//# sourceMappingURL=event-listeners-helper.js.map