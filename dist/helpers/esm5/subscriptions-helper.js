import { __values } from "tslib";
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
export { SubscriptionsHelper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9ucy1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9oZWxwZXJzLyIsInNvdXJjZXMiOlsic3Vic2NyaXB0aW9ucy1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBO0lBQUE7UUFFWSxrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFnQi9DLENBQUM7SUFkVSxpQ0FBRyxHQUFWLFVBQVcsWUFBMEI7UUFDakMsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFTSw0Q0FBYyxHQUFyQjs7O1lBRUksS0FBYyxJQUFBLEtBQUEsU0FBQSxJQUFJLENBQUMsYUFBYSxDQUFBLGdCQUFBLDRCQUFFO2dCQUE3QixJQUFJLENBQUMsV0FBQTtnQkFDTixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDbkI7Ozs7Ozs7OztRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcblxuZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbnNIZWxwZXIge1xuXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgcHVibGljIGFkZChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikge1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVuc3Vic2NyaWJlQWxsKCkge1xuXG4gICAgICAgIGZvciAobGV0IGUgb2YgdGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICBlLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICB9XG59Il19