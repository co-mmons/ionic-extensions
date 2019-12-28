import { __values } from "tslib";
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
export { EventListenersHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtbGlzdGVuZXJzLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2hlbHBlcnMvIiwic291cmNlcyI6WyJldmVudC1saXN0ZW5lcnMtaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUFBO1FBRVksY0FBUyxHQUE2RyxFQUFFLENBQUM7SUFlckksQ0FBQztJQWJVLGtDQUFHLEdBQVYsVUFBVyxPQUFvQixFQUFFLElBQVksRUFBRSxRQUE0QyxFQUFFLFVBQW9CO1FBQzdHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVNLHdDQUFTLEdBQWhCOzs7WUFFSSxLQUFjLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxTQUFTLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQXpCLElBQUksQ0FBQyxXQUFBO2dCQUNOLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNsRTs7Ozs7Ozs7O1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBFdmVudExpc3RlbmVyc0hlbHBlciB7XG5cbiAgICBwcml2YXRlIGxpc3RlbmVyczoge3RhcmdldDogSFRNTEVsZW1lbnQsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0LCB0eXBlOiBzdHJpbmcsIHVzZUNhcHR1cmU6IGJvb2xlYW59W10gPSBbXTtcblxuICAgIHB1YmxpYyBhZGQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QsIHVzZUNhcHR1cmU/OiBib29sZWFuKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2goe3RhcmdldDogZWxlbWVudCwgbGlzdGVuZXI6IGxpc3RlbmVyLCB0eXBlOiB0eXBlLCB1c2VDYXB0dXJlOiB1c2VDYXB0dXJlfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZUFsbCgpIHtcblxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGUudHlwZSwgZS5saXN0ZW5lciwgZS51c2VDYXB0dXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgfVxufSJdfQ==