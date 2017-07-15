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
import { Component, ViewEncapsulation, ElementRef, Renderer, Optional } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Select as IonSelect, Popover, App, Config, Item, Form, DeepLinker } from "ionic-angular";
import { SelectOverlay } from "./select-overlay";
var Select = (function (_super) {
    __extends(Select, _super);
    function Select(app, form, config, elementRef, renderer, item, deepLinker) {
        var _this = _super.call(this, app, form, config, elementRef, renderer, item, deepLinker) || this;
        _this.app = app;
        _this.interface = "popover";
        return _this;
    }
    Select.prototype._click = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.open(ev);
    };
    Select.prototype.open = function (ev) {
        var _this = this;
        var options = { cssClass: "ionx-select-overlay" };
        var data = {};
        data.multiple = this.multiple === true || this.multiple === "true" ? true : false;
        data.options = this._options.map(function (input) {
            return {
                label: input.text,
                value: input.value,
                checked: input.selected,
                disabled: input.disabled,
                handler: function (selectedOption) {
                    // Only emit the select event if it is being checked
                    // For multi selects this won't emit when unchecking
                    if (selectedOption.checked) {
                        input.ionSelect.emit(input.value);
                    }
                }
            };
        });
        var overlay = new Popover(this.app, SelectOverlay, data, options, this.config, this.deepLinker);
        overlay.onDidDismiss(function (values) {
            if (values) {
                _this.writeValue(values);
            }
        });
        if (ev) {
            Object.defineProperty(ev, 'target', { value: ev.currentTarget });
        }
        overlay.present({ ev: ev });
    };
    Select.decorators = [
        { type: Component, args: [{
                    selector: "ionx-select",
                    template: '<div *ngIf="!_text" class="select-placeholder select-text">{{placeholder}}</div>' +
                        '<div *ngIf="_text" class="select-text">{{selectedText || _text}}</div>' +
                        '<div class="select-icon">' +
                        '<div class="select-icon-inner"></div>' +
                        '</div>' +
                        '<button aria-haspopup="true" ' +
                        'type="button" ' +
                        '[id]="id" ' +
                        'ion-button="item-cover" ' +
                        '[attr.aria-labelledby]="_labelId" ' +
                        '[attr.aria-disabled]="_disabled" ' +
                        'class="item-cover">' +
                        '</button>',
                    host: {
                        '[class.select-disabled]': '_disabled'
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: Select, multi: true }],
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    Select.ctorParameters = function () { return [
        { type: App, },
        { type: Form, },
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: Item, decorators: [{ type: Optional },] },
        { type: DeepLinker, },
    ]; };
    return Select;
}(IonSelect));
export { Select };
//# sourceMappingURL=select.js.map