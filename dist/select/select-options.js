var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SelectOptions = /** @class */ (function (_super) {
    __extends(SelectOptions, _super);
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