import * as tslib_1 from "tslib";
var SelectOptions = /** @class */ (function (_super) {
    tslib_1.__extends(SelectOptions, _super);
    function SelectOptions() {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, SelectOptions.prototype);
        return _this;
    }
    SelectOptions.prototype.pushOption = function (value, label, disabled) {
        this.push({ value: value, label: label, disabled: disabled });
    };
    SelectOptions.prototype.pushDivider = function (label) {
        this.push({ divider: true, label: label });
    };
    return SelectOptions;
}(Array));
export { SelectOptions };
//# sourceMappingURL=select-options.js.map