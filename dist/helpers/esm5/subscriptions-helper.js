import * as tslib_1 from "tslib";
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
            for (var _b = tslib_1.__values(this.subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
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
export { SubscriptionsHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9ucy1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9oZWxwZXJzLyIsInNvdXJjZXMiOlsic3Vic2NyaXB0aW9ucy1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBO0lBQUE7UUFFWSxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFnQi9DLENBQUM7SUFkVSxpQ0FBRyxHQUFWLFVBQVcsWUFBMEI7UUFDakMsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFTSw0Q0FBYyxHQUFyQjs7O1lBRUksS0FBYyxJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBN0IsSUFBSSxDQUFDLFdBQUE7Z0JBQ04sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ25COzs7Ozs7Ozs7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBbEJELElBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJzY3JpcHRpb25zSGVscGVyIHtcblxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIHB1YmxpYyBhZGQoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bnN1YnNjcmliZUFsbCgpIHtcblxuICAgICAgICBmb3IgKGxldCBlIG9mIHRoaXMuc3Vic2NyaXB0aW9ucykge1xuICAgICAgICAgICAgZS51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgfVxufSJdfQ==