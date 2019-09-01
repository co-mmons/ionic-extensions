import * as tslib_1 from "tslib";
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, ViewChild } from "@angular/core";
import { NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController, PopoverController } from "@ionic/angular";
import * as dragula from "dragula";
import { SelectLabel } from "./select-label";
import { SelectOption } from "./select-option";
import { SelectOptions } from "./select-options";
import { SelectOverlayContent } from "./select-overlay";
var Select = /** @class */ (function () {
    function Select(element, intl, popoverController, modalController, control) {
        var _this = this;
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.control = control;
        this.overlayWhiteSpace = "nowrap";
        this.empty = true;
        this.ionChange = new EventEmitter();
        this.change = this.ionChange;
        /*private*/ this.values = [];
        this.valueComparator = function (a, b) {
            if (_this.compareAsString) {
                if (a !== undefined && a !== null && b !== undefined && b !== null) {
                    return a.toString() == b.toString();
                }
                else {
                    return a == b;
                }
            }
            else if (_this.comparator) {
                var r = _this.comparator(a, b);
                return r === 0 || r === true;
            }
            return a === b;
        };
        if (control) {
            control.valueAccessor = this;
        }
    }
    Object.defineProperty(Select.prototype, "listItem", {
        get: function () {
            if (this._listItem) {
                return this._listItem;
            }
            return this._listItem = this.element.nativeElement.closest("ion-item");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "readonly", {
        get: function () {
            return !!this._readonly;
        },
        set: function (readonly) {
            if (typeof readonly === "string") {
                this.readonly = readonly === "true";
            }
            else {
                this._readonly = readonly;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "disabled", {
        /**
         * Whether or not the select component is disabled.
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
    Object.defineProperty(Select.prototype, "value", {
        get: function () {
            return this.multiple || this.alwaysArray ? this.values.slice(0) : (this.values.length > 0 ? this.values[0] : undefined);
        },
        set: function (value) {
            var changed = false;
            var newValue = Array.isArray(value) ? value : (value !== undefined && value !== null ? [value] : []);
            if (newValue.length != this.values.length) {
                changed = true;
            }
            else {
                for (var i = 0; i < this.values.length; i++) {
                    if (!this.valueComparator(this.values[i], newValue[i])) {
                        changed = true;
                        break;
                    }
                }
            }
            this.values = newValue;
            if (changed) {
                this.checkListItemHasValue();
                var value_1 = this.value;
                if (this.fireOnChange) {
                    if (this.controlOnChange) {
                        this.controlOnChange(value_1);
                    }
                    this.ionChange.emit(value_1);
                }
            }
            this.fireOnChange = false;
        },
        enumerable: true,
        configurable: true
    });
    /*private*/ Select.prototype.labelImpl$ = function (value) {
        if (this.options instanceof SelectOptions) {
            if (!this.cachedLabels) {
                this.cachedLabels = new Array(this.options.length);
            }
            for (var i = 0; i < this.options.length; i++) {
                if (this.valueComparator(value, this.options[i].value)) {
                    if (this.cachedLabels[i]) {
                        return this.cachedLabels[i];
                    }
                    return this.cachedLabels[i] = this.options[i].label ? this.options[i].label : (this.label ? this.label(value) : value + "");
                }
            }
        }
        else if (this.options) {
            if (!this.cachedLabels) {
                this.cachedLabels = new Array(this.options.length);
            }
            for (var i = 0; i < this.options.length; i++) {
                if (this.valueComparator(value, this.options[i])) {
                    if (this.cachedLabels[i]) {
                        return this.cachedLabels[i];
                    }
                    return this.cachedLabels[i] = this.label ? this.label(value) : value + "";
                }
            }
        }
        else if (this.optionsComponents) {
            for (var options = this.optionsComponents.toArray(), i = 0; i < options.length; i++) {
                if (this.valueComparator(value, options[i].value)) {
                    return options[i].label;
                }
            }
        }
        return value;
    };
    Select.prototype.writeValue = function (value) {
        this.value = value;
    };
    Select.prototype.hasValue = function () {
        return this.values.length > 0;
    };
    Select.prototype.checkListItemHasValue = function () {
        if (this.listItem) {
            if (this.hasValue()) {
                this.listItem.classList.add("has-value");
            }
            else {
                this.listItem.classList.remove("has-value");
            }
        }
    };
    Object.defineProperty(Select.prototype, "_optionsComponents", {
        set: function (val) {
            this.optionsComponents = val;
            //this.optionsComponents.changes.subscribe(() => this.updateText());
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.indexOfValue = function (value) {
        if (!this.values) {
            return -1;
        }
        for (var i = 0; i < this.values.length; i++) {
            if (this.valueComparator(value, this.values[i])) {
                return i;
            }
        }
        return -1;
    };
    Select.prototype.registerOnChange = function (fn) {
        this.controlOnChange = fn;
    };
    Select.prototype.registerOnTouched = function (fn) {
        this.controlOnTouched = fn;
    };
    Select.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Select.prototype.open = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var overlay, options, _i, _a, option, valueIndex, _b, _c, option, valueIndex, _d, _e, option, valueIndex, overlayTitle, title, label, overlayData, popover, modal;
            var _this = this;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        overlay = this.overlay;
                        if (!overlay) {
                            overlay = "popover";
                        }
                        options = [];
                        if (this.options instanceof SelectOptions) {
                            for (_i = 0, _a = this.options; _i < _a.length; _i++) {
                                option = _a[_i];
                                valueIndex = option.value ? this.indexOfValue(option.value) : -1;
                                options.push({ value: option.value, checked: option.value ? valueIndex > -1 : false, checkedTimestamp: this.orderable && valueIndex, label: option.label ? option.label : ((!this.searchTest || !this.labelTemplate) ? this.labelImpl$(option.value) : undefined), disabled: option.disabled, divider: option.divider });
                            }
                        }
                        else if (this.options) {
                            for (_b = 0, _c = this.options; _b < _c.length; _b++) {
                                option = _c[_b];
                                valueIndex = this.indexOfValue(option);
                                options.push({ value: option, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: !this.labelTemplate || !this.searchTest ? this.labelImpl$(option) : undefined });
                            }
                        }
                        else if (this.optionsComponents) {
                            for (_d = 0, _e = this.optionsComponents.toArray(); _d < _e.length; _d++) {
                                option = _e[_d];
                                valueIndex = this.indexOfValue(option.value);
                                options.push({ value: option.value, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: option.label, divider: !!option.divider });
                            }
                        }
                        if (this.title) {
                            overlayTitle = this.title;
                        }
                        if (!overlayTitle && this.listItem) {
                            title = this.listItem.querySelector("[ionx-select-overlay-title]");
                            if (title) {
                                overlayTitle = title.innerText;
                            }
                            else {
                                label = this.listItem.querySelector("ion-label");
                                if (label) {
                                    overlayTitle = label.innerText;
                                }
                            }
                        }
                        if (!overlayTitle && this.element.nativeElement.title) {
                            overlayTitle = this.element.nativeElement.title;
                        }
                        if (!overlayTitle && this.placeholder) {
                            overlayTitle = this.placeholder;
                        }
                        overlayData = {
                            overlay: overlay,
                            options: options,
                            multiple: !!this.multiple,
                            title: overlayTitle,
                            label: this.labelTemplate,
                            orderable: !!this.orderable,
                            empty: !!this.empty,
                            whiteSpace: this.overlayWhiteSpace,
                            valueValidator: this.checkValidator,
                            valueComparator: this.valueComparator,
                            width: this.element.nativeElement.getBoundingClientRect().width,
                            updateValues: function (value) {
                                _this.fireOnChange = true;
                                _this.value = value;
                                if (_this.controlOnTouched) {
                                    _this.controlOnTouched();
                                }
                            }
                        };
                        if (!(overlay == "popover")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.popoverController.create({ component: SelectOverlayContent, componentProps: overlayData, cssClass: "ionx-select-overlay-width", event: event })];
                    case 1:
                        popover = _f.sent();
                        popover.present();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.modalController.create({ component: SelectOverlayContent, componentProps: overlayData })];
                    case 3:
                        modal = _f.sent();
                        modal.present();
                        _f.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Select.prototype.initDragula = function () {
        var _this = this;
        if (this.orderable && !this.disabled && !this.readonly) {
            if (this.dragula) {
                return;
            }
            this.dragula = dragula({
                containers: [this.textContainer.nativeElement],
                direction: "horizontal",
                moves: function (el, container, handle) {
                    return _this.values && _this.values.length > 1;
                }
            });
            this.dragula.on("drop", function (el, target, source, sibling) {
                var startIndex = parseInt(el.getAttribute("ionx--index"), 0);
                var endIndex = sibling ? parseInt(sibling.getAttribute("ionx--index"), 0) : _this.values.length;
                if (endIndex > startIndex) {
                    endIndex -= 1;
                }
                var element = _this.values[startIndex];
                _this.values.splice(startIndex, 1);
                _this.values.splice(endIndex, 0, element);
                if (_this.controlOnChange) {
                    _this.controlOnChange(_this.values.slice());
                }
                _this.ionChange.emit(_this.values.slice());
            });
        }
        else if (this.dragula) {
            this.dragula.destroy();
            this.dragula = undefined;
        }
    };
    Select.prototype.updateCssClasses = function () {
        if (this.listItem) {
            this.listItem.classList.add("item-select");
            if (!this.readonly && !this.disabled) {
                this.listItem.classList.add("item-interactive");
            }
            else {
                this.listItem.classList.remove("item-interactive");
            }
            this.element.nativeElement.classList.add("in-item");
        }
        else {
            this.element.nativeElement.classList.remove("in-item");
        }
    };
    Select.prototype.ngOnChanges = function (changes) {
        if (changes.options) {
            this.cachedLabels = undefined;
        }
        if (changes["orderable"] || changes["readonly"] || changes["disabled"]) {
            this.initDragula();
            this.updateCssClasses();
        }
    };
    Select.prototype.ngOnInit = function () {
        //this.updateText();
        this.updateCssClasses();
        if (this.orderable) {
            this.initDragula();
        }
    };
    tslib_1.__decorate([
        ViewChild("textContainer", { static: true }),
        tslib_1.__metadata("design:type", ElementRef)
    ], Select.prototype, "textContainer", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Select.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Select.prototype, "overlay", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Select.prototype, "overlayWhiteSpace", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], Select.prototype, "alwaysArray", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], Select.prototype, "compareAsString", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], Select.prototype, "comparator", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], Select.prototype, "multiple", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Select.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], Select.prototype, "orderable", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], Select.prototype, "empty", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], Select.prototype, "readonly", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], Select.prototype, "searchTest", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], Select.prototype, "checkValidator", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Select.prototype, "ionChange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], Select.prototype, "change", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], Select.prototype, "disabled", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], Select.prototype, "value", null);
    tslib_1.__decorate([
        ContentChild(SelectLabel, { static: false }),
        tslib_1.__metadata("design:type", SelectLabel)
    ], Select.prototype, "labelTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], Select.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], Select.prototype, "options", void 0);
    tslib_1.__decorate([
        ContentChildren(SelectOption),
        tslib_1.__metadata("design:type", QueryList),
        tslib_1.__metadata("design:paramtypes", [QueryList])
    ], Select.prototype, "_optionsComponents", null);
    Select = tslib_1.__decorate([
        Component({
            selector: "ionx-select",
            host: {
                "[attr.ionx--chips-layout]": "!!orderable || null",
                "[attr.ionx--readonly]": "(!!readonly || !!disabled) || null",
                "[attr.ionx--orderable]": "(!!orderable && !readonly && !disabled && values && values.length > 1) || null",
            },
            styles: ["\n        :host ion-chip { max-width: calc(50% - 4px); margin-inline-start: 0px; margin-bottom: 0px; cursor: default; }\n        :host[ionx--orderable] ion-chip { cursor: move; }\n        :host ion-chip > span { text-overflow: ellipsis; overflow: hidden; white-space: nowrap; line-height: 1.1; }\n        :host[ionx--chips-layout] .select-text { white-space: normal; width: 100%; }\n    "],
            template: "\n        \n        <ng-template #optionTemplate let-value=\"value\" let-index=\"index\">\n            <span *ngIf=\"!labelTemplate; else hasLabelTemplate\">{{labelImpl$(value)}}</span>\n            <ng-template #hasLabelTemplate>\n                <ng-container *ngTemplateOutlet=\"labelTemplate.templateRef; context: {$implicit: value, index: index}\"></ng-container>\n            </ng-template>\n        </ng-template>\n        \n        <div class=\"select-inner\">\n            <div class=\"select-text\" #textContainer [class.select-placeholder]=\"values.length == 0\">\n                <span *ngIf=\"values.length == 0; else showValues\">{{placeholder}}</span>\n                <ng-template #showValues>\n                    <ng-template ngFor [ngForOf]=\"values\" let-value let-index=\"index\">\n                        <span *ngIf=\"index > 0 && (!labelTemplate || labelTemplate.separator) && !orderable\">{{!labelTemplate ? \", \" : labelTemplate.separator}}</span>\n                        \n                        <ion-chip *ngIf=\"orderable else simpleText\" outline=\"true\" [attr.ionx--index]=\"index\">\n                            <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                        </ion-chip>\n                        \n                        <ng-template #simpleText>\n                            <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                        </ng-template>\n                        \n                    </ng-template>\n                </ng-template>\n            </div>\n            \n            <ng-container  *ngIf=\"!_readonly && !_disabled\">\n                <div class=\"select-icon\" role=\"presentation\" *ngIf=\"!orderable\">\n                    <div class=\"select-icon-inner\"></div>\n                </div>\n                <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\" *ngIf=\"!orderable || !values || values.length === 0\"></button>\n            </ng-container>\n            \n        </div>\n    "
        }),
        tslib_1.__param(4, Optional()),
        tslib_1.__metadata("design:paramtypes", [ElementRef, IntlService, PopoverController, ModalController, NgControl])
    ], Select);
    return Select;
}());
export { Select };
//# sourceMappingURL=select.js.map