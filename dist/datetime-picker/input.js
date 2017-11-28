var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Input, ElementRef, Renderer, Optional, ViewEncapsulation, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
import { Ion, Config, Item, PopoverController } from "ionic-angular";
import { IntlService } from "@co.mmons/angular-intl";
import { defaultDateTimeFormat } from "./default-formats";
import { DateTimeOverlay } from "./overlay";
var DateTime = /** @class */ (function (_super) {
    __extends(DateTime, _super);
    function DateTime(config, elementRef, renderer, intl, popoverController, item, control) {
        var _this = _super.call(this, config, elementRef, renderer, "datetime") || this;
        _this.intl = intl;
        _this.popoverController = popoverController;
        _this.item = item;
        _this.control = control;
        if (control) {
            control.valueAccessor = _this;
        }
        return _this;
    }
    Object.defineProperty(DateTime.prototype, "disabled", {
        /**
         * Whether or not the datetime-picker component is disabled. Default `false`.
         */
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = disabled || disabled == "true" ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "value", {
        get: function () {
            if (!this._value) {
                return undefined;
            }
            if (this.valueType && this.valueType == "number") {
                return this._value.getTime();
            }
            return new Date(this._value);
        },
        set: function (value) {
            var changed = false;
            if ((value === undefined || value === null) != (this._value === undefined)) {
                changed = true;
            }
            else if (typeof value === "number" && value != this._value.getTime()) {
                changed = true;
            }
            else if (value instanceof Date && value.getTime() != this._value.getTime()) {
                changed = true;
            }
            this._value = typeof value == "number" ? new Date(value) : value;
            if (changed) {
                this.updateText();
                this.checkHasValue();
            }
        },
        enumerable: true,
        configurable: true
    });
    DateTime.prototype.checkHasValue = function () {
        if (this.item) {
            this.item.setElementClass("input-has-value", this._value ? true : false);
        }
    };
    DateTime.prototype.updateText = function () {
        if (this._value) {
            var options = this.displayFormat || defaultDateTimeFormat;
            this._text = this.intl.dateTimeFormat(this._value, options);
        }
        else {
            this._text = null;
        }
    };
    DateTime.prototype.clicked = function (ev) {
        // do not continue if the click event came from a form submit
        if (ev.detail === 0) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open(ev);
    };
    DateTime.prototype.keyuped = function () {
        this.open(undefined);
    };
    DateTime.prototype.open = function (event) {
        var _this = this;
        if (this.disabled || this.opened) {
            return;
        }
        var formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
        var value;
        if (formatOptions.timeZone == "UTC") {
            if (this._value) {
                value = new Date(this._value.getTime());
            }
            else {
                var v = new Date();
                value = new Date(Date.UTC(v.getFullYear(), v.getMonth(), v.getDate(), v.getHours(), v.getMinutes(), v.getSeconds()));
            }
        }
        else {
            if (this._value) {
                value = new Date(Date.UTC(this._value.getFullYear(), this._value.getMonth(), this._value.getDate(), this._value.getHours(), this._value.getMinutes(), this._value.getSeconds()));
            }
            else {
                value = new Date();
            }
        }
        var view = this.popoverController.create(DateTimeOverlay, {
            formatOptions: formatOptions,
            value: value
        }, { enableBackdropDismiss: true, showBackdrop: true });
        view.onDidDismiss(function (newValue) { return _this.overlayClosed(newValue); });
        view.present({});
    };
    DateTime.prototype.overlayClosed = function (newValue) {
        if (newValue) {
            var formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
            var value = void 0;
            if (formatOptions.timeZone == "UTC") {
                value = new Date(newValue.getTime());
            }
            else {
                value = new Date(newValue.getUTCFullYear(), newValue.getUTCMonth(), newValue.getUTCDate(), newValue.getUTCHours(), newValue.getUTCMinutes(), newValue.getUTCSeconds());
            }
            this.value = value;
            if (this.controlOnChange) {
                this.controlOnChange(this.value);
            }
        }
        if (this.controlOnTouched) {
            this.controlOnTouched();
        }
    };
    DateTime.prototype.writeValue = function (value) {
        if (value instanceof Date) {
            this.value = value;
        }
        else if (typeof value == "number") {
            this.value = value;
        }
        else {
            this.value = undefined;
        }
    };
    DateTime.prototype.registerOnChange = function (fn) {
        this.controlOnChange = fn;
    };
    DateTime.prototype.registerOnTouched = function (fn) {
        this.controlOnTouched = fn;
    };
    DateTime.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    DateTime.prototype.ngOnChanges = function (changes) {
        if (changes["displayFormat"]) {
            this.updateText();
        }
    };
    DateTime.prototype.ngOnInit = function () {
        this.updateText();
    };
    DateTime.prototype.ngAfterContentChecked = function () {
        this.setItemInputControlCss();
    };
    DateTime.prototype.setItemInputControlCss = function () {
        var item = this.item;
        if (item && this.control) {
            this.setControlCss(item, this.control);
        }
    };
    DateTime.prototype.setControlCss = function (element, control) {
        element.setElementClass("ng-untouched", control.untouched);
        element.setElementClass("ng-touched", control.touched);
        element.setElementClass("ng-pristine", control.pristine);
        element.setElementClass("ng-dirty", control.dirty);
        element.setElementClass("ng-valid", control.valid);
        element.setElementClass("ng-invalid", !control.valid && control.enabled);
    };
    DateTime.decorators = [
        { type: Component, args: [{
                    selector: "ionx-datetime",
                    template: "\n        <div *ngIf=\"!_text\" class=\"datetime-text datetime-placeholder\">{{placeholder}}</div>\n        <div *ngIf=\"_text\" class=\"datetime-text\">{{_text}}</div>\n        <button aria-haspopup=\"true\" type=\"button\" ion-button=\"item-cover\" [attr.aria-disabled]=\"_disabled\" class=\"item-cover\"></button>\n    ",
                    host: {
                        "[class.datetime-disabled]": "_disabled"
                    },
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    DateTime.ctorParameters = function () { return [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: IntlService, },
        { type: PopoverController, },
        { type: Item, decorators: [{ type: Optional },] },
        { type: NgControl, decorators: [{ type: Optional },] },
    ]; };
    DateTime.propDecorators = {
        'displayFormat': [{ type: Input },],
        'pickerFormat': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'disabled': [{ type: Input },],
        'valueType': [{ type: Input },],
        'clicked': [{ type: HostListener, args: ["click", ["$event"],] },],
        'keyuped': [{ type: HostListener, args: ["keyup.space",] },],
    };
    return DateTime;
}(Ion));
export { DateTime };
//# sourceMappingURL=input.js.map