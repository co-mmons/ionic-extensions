import { __extends } from "tslib";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW9wdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9zZWxlY3QvIiwic291cmNlcyI6WyJzZWxlY3Qtb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBT0E7SUFBNEMsaUNBQStCO0lBRXZFO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBREcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUN6RCxDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLEtBQVEsRUFBRSxLQUFjLEVBQUUsUUFBa0I7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLEtBQWE7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQWRELENBQTRDLEtBQUssR0FjaEQiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFNlbGVjdE9wdGlvbk9yRGl2aWRlcjxWID0gYW55PiB7XG4gICAgdmFsdWU/OiBWO1xuICAgIGxhYmVsPzogc3RyaW5nO1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgICBkaXZpZGVyPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNlbGVjdE9wdGlvbnM8ViA9IGFueT4gZXh0ZW5kcyBBcnJheTxTZWxlY3RPcHRpb25PckRpdmlkZXI8Vj4+IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgU2VsZWN0T3B0aW9ucy5wcm90b3R5cGUpO1xuICAgIH1cblxuICAgIHB1c2hPcHRpb24odmFsdWU6IFYsIGxhYmVsPzogc3RyaW5nLCBkaXNhYmxlZD86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5wdXNoKHt2YWx1ZTogdmFsdWUsIGxhYmVsOiBsYWJlbCwgZGlzYWJsZWQ6IGRpc2FibGVkfSk7XG4gICAgfVxuXG4gICAgcHVzaERpdmlkZXIobGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnB1c2goe2RpdmlkZXI6IHRydWUsIGxhYmVsOiBsYWJlbH0pO1xuICAgIH1cbn0iXX0=