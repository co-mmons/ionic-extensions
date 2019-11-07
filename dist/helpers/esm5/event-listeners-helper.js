import * as tslib_1 from "tslib";
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
            for (var _b = tslib_1.__values(this.listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
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
export { EventListenersHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtbGlzdGVuZXJzLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2hlbHBlcnMvIiwic291cmNlcyI6WyJldmVudC1saXN0ZW5lcnMtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUFBO1FBRVksY0FBUyxHQUE2RyxFQUFFLENBQUM7SUFlckksQ0FBQztJQWJVLGtDQUFHLEdBQVYsVUFBVyxPQUFvQixFQUFFLElBQVksRUFBRSxRQUE0QyxFQUFFLFVBQW9CO1FBQzdHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVNLHdDQUFTLEdBQWhCOzs7WUFFSSxLQUFjLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsU0FBUyxDQUFBLGdCQUFBLDRCQUFFO2dCQUF6QixJQUFJLENBQUMsV0FBQTtnQkFDTixDQUFDLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbEU7Ozs7Ozs7OztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDTCwyQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRXZlbnRMaXN0ZW5lcnNIZWxwZXIge1xuXG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnM6IHt0YXJnZXQ6IEhUTUxFbGVtZW50LCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdCwgdHlwZTogc3RyaW5nLCB1c2VDYXB0dXJlOiBib29sZWFufVtdID0gW107XG5cbiAgICBwdWJsaWMgYWRkKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LCB1c2VDYXB0dXJlPzogYm9vbGVhbikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKHt0YXJnZXQ6IGVsZW1lbnQsIGxpc3RlbmVyOiBsaXN0ZW5lciwgdHlwZTogdHlwZSwgdXNlQ2FwdHVyZTogdXNlQ2FwdHVyZX0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVBbGwoKSB7XG5cbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgICAgICAgZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLnR5cGUsIGUubGlzdGVuZXIsIGUudXNlQ2FwdHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgIH1cbn0iXX0=