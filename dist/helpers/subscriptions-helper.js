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
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var e = _a[_i];
            e.unsubscribe();
        }
        this.subscriptions = [];
    };
    return SubscriptionsHelper;
}());
export { SubscriptionsHelper };
//# sourceMappingURL=subscriptions-helper.js.map