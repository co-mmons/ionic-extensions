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
import { Component, ViewEncapsulation, ElementRef, Renderer, Optional, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Select as IonSelect, ModalController, App, Config, Item, Form, DeepLinker } from "ionic-angular";
import { SelectModal } from "./select-modal";
var Select = (function (_super) {
    __extends(Select, _super);
    function Select(app, form, config, elementRef, renderer, item, deepLinker, modalController) {
        var _this = _super.call(this, app, form, config, elementRef, renderer, item, deepLinker) || this;
        _this.app = app;
        _this.modalController = modalController;
        return _this;
    }
    Select.prototype.open = function (ev) {
        var _this = this;
        if (this.interface == "modal") {
            var options = { cssClass: "ionx-select-modal" };
            var data = {};
            data.multiple = this.multiple === true || this.multiple === "true" ? true : false;
            data.title = this.selectOptions ? this.selectOptions.title : undefined;
            data.options = this._options.map(function (input) {
                return {
                    label: input.text,
                    value: input.value,
                    checked: input.selected,
                    disabled: input.disabled
                };
            });
            var overlay = this.modalController.create(SelectModal, data, options);
            overlay.onDidDismiss(function (values) {
                if (values) {
                    _this.writeValue(values);
                }
            });
            if (ev) {
                Object.defineProperty(ev, 'target', { value: ev.currentTarget });
            }
            overlay.present({ updateUrl: false });
        }
        else {
            _super.prototype.open.call(this, ev);
        }
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
                        '[class.select-disabled]': '_disabled || readonly',
                        '[class.select-readonly]': 'readonly'
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
        { type: ModalController, },
    ]; };
    Select.propDecorators = {
        'readonly': [{ type: Input },],
    };
    return Select;
}(IonSelect));
export { Select };
//# sourceMappingURL=select.js.map