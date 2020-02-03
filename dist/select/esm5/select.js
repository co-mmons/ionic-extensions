import { __awaiter, __decorate, __generator, __param, __values } from "tslib";
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Optional, Output, QueryList, SimpleChanges, ViewChild } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { ModalController, PopoverController } from "@ionic/angular";
import * as dragula from "dragula";
import { SelectLabel } from "./select-label";
import { SelectOption } from "./select-option";
import { SelectOptions } from "./select-options";
import { SelectOverlayContent } from "./select-overlay";
var createDragula = dragula;
var Select = /** @class */ (function () {
    function Select(element, intl, popoverController, modalController, control) {
        var _this = this;
        this.element = element;
        this.intl = intl;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.control = control;
        this.overlayWhiteSpace = "nowrap";
        this.whiteSpace = "nowrap";
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
        return __awaiter(this, void 0, void 0, function () {
            var overlay, options, _a, _b, option, valueIndex, _c, _d, option, valueIndex, _e, _f, option, valueIndex, overlayTitle, title, label, overlayData, popover, modal;
            var e_1, _g, e_2, _h, e_3, _j;
            var _this = this;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        overlay = this.overlay;
                        if (!overlay) {
                            overlay = "popover";
                        }
                        options = [];
                        if (this.options instanceof SelectOptions) {
                            try {
                                for (_a = __values(this.options), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    option = _b.value;
                                    valueIndex = option.value ? this.indexOfValue(option.value) : -1;
                                    options.push({ value: option.value, checked: option.value ? valueIndex > -1 : false, checkedTimestamp: this.orderable && valueIndex, label: option.label ? option.label : ((!this.searchTest || !this.labelTemplate) ? this.labelImpl$(option.value) : undefined), disabled: option.disabled, divider: option.divider });
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_g = _a.return)) _g.call(_a);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        else if (this.options) {
                            try {
                                for (_c = __values(this.options), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    option = _d.value;
                                    valueIndex = this.indexOfValue(option);
                                    options.push({ value: option, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: !this.labelTemplate || !this.searchTest ? this.labelImpl$(option) : undefined });
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        else if (this.optionsComponents) {
                            try {
                                for (_e = __values(this.optionsComponents.toArray()), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    option = _f.value;
                                    valueIndex = this.indexOfValue(option.value);
                                    options.push({ value: option.value, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: option.label, divider: !!option.divider });
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_j = _e.return)) _j.call(_e);
                                }
                                finally { if (e_3) throw e_3.error; }
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
                        popover = _k.sent();
                        popover.present();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.modalController.create({ component: SelectOverlayContent, componentProps: overlayData })];
                    case 3:
                        modal = _k.sent();
                        modal.present();
                        _k.label = 4;
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
            this.dragula = createDragula({
                containers: [this.textContainer.nativeElement],
                // mirrorContainer: document.querySelector("ion-app"),
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
    Select.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IntlService },
        { type: PopoverController },
        { type: ModalController },
        { type: NgControl, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        ViewChild("textContainer", { static: true })
    ], Select.prototype, "textContainer", void 0);
    __decorate([
        Input()
    ], Select.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], Select.prototype, "overlay", void 0);
    __decorate([
        Input()
    ], Select.prototype, "overlayWhiteSpace", void 0);
    __decorate([
        Input(),
        HostBinding("attr.ionx--white-space")
    ], Select.prototype, "whiteSpace", void 0);
    __decorate([
        Input()
    ], Select.prototype, "alwaysArray", void 0);
    __decorate([
        Input()
    ], Select.prototype, "compareAsString", void 0);
    __decorate([
        Input()
    ], Select.prototype, "comparator", void 0);
    __decorate([
        Input()
    ], Select.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], Select.prototype, "title", void 0);
    __decorate([
        Input()
    ], Select.prototype, "orderable", void 0);
    __decorate([
        Input()
    ], Select.prototype, "empty", void 0);
    __decorate([
        Input()
    ], Select.prototype, "readonly", null);
    __decorate([
        Input()
    ], Select.prototype, "searchTest", void 0);
    __decorate([
        Input()
    ], Select.prototype, "checkValidator", void 0);
    __decorate([
        Output()
    ], Select.prototype, "ionChange", void 0);
    __decorate([
        Output()
    ], Select.prototype, "change", void 0);
    __decorate([
        Input()
    ], Select.prototype, "disabled", null);
    __decorate([
        Input()
    ], Select.prototype, "value", null);
    __decorate([
        ContentChild(SelectLabel, { static: false })
    ], Select.prototype, "labelTemplate", void 0);
    __decorate([
        Input()
    ], Select.prototype, "label", void 0);
    __decorate([
        Input()
    ], Select.prototype, "options", void 0);
    __decorate([
        ContentChildren(SelectOption, { descendants: true })
    ], Select.prototype, "_optionsComponents", null);
    Select = __decorate([
        Component({
            selector: "ionx-select",
            host: {
                "[class.ionx--chips-layout]": "!!orderable",
                "[class.ionx--readonly]": "!!readonly || !!disabled",
                "[class.ionx--orderable]": "!!orderable && !readonly && !disabled && values && values.length > 1",
            },
            template: "<ng-template #optionTemplate let-value=\"value\" let-index=\"index\">\n    <span *ngIf=\"!labelTemplate; else hasLabelTemplate\">{{labelImpl$(value)}}</span>\n    <ng-template #hasLabelTemplate>\n        <ng-container *ngTemplateOutlet=\"labelTemplate.templateRef; context: {$implicit: value, index: index}\"></ng-container>\n    </ng-template>\n</ng-template>\n\n<div class=\"select-inner\">\n    <div class=\"select-text\" #textContainer [class.select-placeholder]=\"values.length == 0\">\n        <span *ngIf=\"values.length == 0; else showValues\">{{placeholder}}</span>\n\n        <ng-template #showValues>\n            <ng-template ngFor [ngForOf]=\"values\" let-value let-index=\"index\">\n                <span *ngIf=\"index > 0 && (!labelTemplate || labelTemplate.separator) && !orderable\">{{!labelTemplate ? \", \" : labelTemplate.separator}}</span>\n\n                <ion-chip *ngIf=\"orderable else simpleText\" outline=\"true\" [attr.ionx--index]=\"index\">\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ion-chip>\n\n                <ng-template #simpleText>\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ng-template>\n\n            </ng-template>\n        </ng-template>\n    </div>\n\n    <ng-container  *ngIf=\"!_readonly && !_disabled\">\n        <div class=\"select-icon\" role=\"presentation\" *ngIf=\"!orderable\">\n            <div class=\"select-icon-inner\"></div>\n        </div>\n        <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\" *ngIf=\"!orderable || !values || values.length === 0\"></button>\n    </ng-container>\n\n</div>\n",
            styles: [":host{--placeholder-opacity:.5;--dropdown-icon-opacity:.5;--disabled-opacity:.5;padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:inline-block;overflow:hidden;color:var(--color);font-family:var(--ion-font-family,inherit);max-width:100%}:host .select-inner{display:-webkit-box;display:flex;position:relative}:host .select-icon{position:relative;width:16px;height:20px}:host .select-icon .select-icon-inner{top:50%;right:0;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:var(--dropdown-icon-opacity,.5);pointer-events:none}:host .select-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .select-text.select-placeholder{opacity:var(--placeholder-opacity,.5)}:host.select-disabled{opacity:var(--disabled-opacity,.5);pointer-events:none}:host.select-readonly{opacity:1;pointer-events:none}:host.select-readonly .select-icon{display:none}:host[ionx--white-space=normal] .select-text,:host[white-space-normal] .select-text{white-space:normal!important;overflow:auto}:host button{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0}:host button::-moz-focus-inner{border:0}:host.in-item{position:static}:host ion-chip{max-width:calc(50% - 4px);-webkit-margin-start:0;margin-inline-start:0;margin-bottom:0;cursor:default}:host ion-chip>span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:1.1}:host.ionx--orderable ion-chip{cursor:move}:host.ionx--chips-layout .select-text{white-space:normal;overflow:auto;width:100%}:host-context(ion-toolbar){color:var(--ion-toolbar-color);--icon-color:var(--ion-toolbar-color);--padding-start:16px;--padding-end:16px}:host-context(.item-label-stacked){align-self:flex-start;--padding-top:8px;--padding-bottom:8px;--padding-start:0;width:100%}:host-context(.item-label-stacked) .select-text{max-width:calc(100% - 16px);-webkit-box-flex:initial;flex:initial}:host-context(.item-label-stacked).ionx--chips-layout .select-text{-webkit-box-flex:1;flex:1}"]
        }),
        __param(4, Optional())
    ], Select);
    return Select;
}());
export { Select };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc2VsZWN0LyIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvTCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUd0RCxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFZOUI7SUFHSSxnQkFBNEIsT0FBZ0MsRUFBWSxJQUFpQixFQUFVLGlCQUFvQyxFQUFZLGVBQWdDLEVBQXdCLE9BQWtCO1FBQTdOLGlCQUtDO1FBTDJCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBWSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBd0IsWUFB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L0I7UUFEQyxlQUFlLENBQUMsWUFBWSxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDO29EQUlsRDtJQXJSUSxNQUFNO1FBVmxCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLElBQUksRUFBRTtnQkFDRiw0QkFBNEIsRUFBRSxhQUFhO2dCQUMzQyx3QkFBd0IsRUFBRSwwQkFBMEI7Z0JBQ3BELHlCQUF5QixFQUFFLHNFQUFzRTthQUNwRztZQUVELDJ5REFBMEI7O1NBQzdCLENBQUM7UUFJd0wsV0FBQSxRQUFRLEVBQUUsQ0FBQTtPQUh2TCxNQUFNLENBc2VsQjtJQUFELGFBQUM7Q0FBQSxBQXRlRCxJQXNlQztTQXRlWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE9wdGlvbmFsLCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAY28ubW1vbnMvYW5ndWxhci1pbnRsXCI7XG5pbXBvcnQge01vZGFsQ29udHJvbGxlciwgUG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0ICogYXMgZHJhZ3VsYSBmcm9tIFwiZHJhZ3VsYVwiO1xuaW1wb3J0IHtTZWxlY3RMYWJlbH0gZnJvbSBcIi4vc2VsZWN0LWxhYmVsXCI7XG5pbXBvcnQge1NlbGVjdE9wdGlvbn0gZnJvbSBcIi4vc2VsZWN0LW9wdGlvblwiO1xuaW1wb3J0IHtTZWxlY3RPcHRpb25zfSBmcm9tIFwiLi9zZWxlY3Qtb3B0aW9uc1wiO1xuaW1wb3J0IHtTZWxlY3RPdmVybGF5Q29udGVudH0gZnJvbSBcIi4vc2VsZWN0LW92ZXJsYXlcIjtcbmltcG9ydCB7U2VsZWN0T3ZlcmxheU9wdGlvbn0gZnJvbSBcIi4vc2VsZWN0LW92ZXJsYXktb3B0aW9uXCI7XG5cbmNvbnN0IGNyZWF0ZURyYWd1bGEgPSBkcmFndWxhO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXNlbGVjdFwiLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCJbY2xhc3MuaW9ueC0tY2hpcHMtbGF5b3V0XVwiOiBcIiEhb3JkZXJhYmxlXCIsXG4gICAgICAgIFwiW2NsYXNzLmlvbngtLXJlYWRvbmx5XVwiOiBcIiEhcmVhZG9ubHkgfHwgISFkaXNhYmxlZFwiLFxuICAgICAgICBcIltjbGFzcy5pb254LS1vcmRlcmFibGVdXCI6IFwiISFvcmRlcmFibGUgJiYgIXJlYWRvbmx5ICYmICFkaXNhYmxlZCAmJiB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCA+IDFcIixcbiAgICB9LFxuICAgIHN0eWxlVXJsczogW1wic2VsZWN0LnNjc3NcIl0sXG4gICAgdGVtcGxhdGVVcmw6IFwic2VsZWN0Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3QgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkluaXQge1xuXG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByb3RlY3RlZCBpbnRsOiBJbnRsU2VydmljZSwgcHJpdmF0ZSBwb3BvdmVyQ29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIsIHByb3RlY3RlZCBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlciwgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGNvbnRyb2w6IE5nQ29udHJvbCkge1xuXG4gICAgICAgIGlmIChjb250cm9sKSB7XG4gICAgICAgICAgICBjb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF9saXN0SXRlbTogSFRNTElvbkl0ZW1FbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBnZXQgbGlzdEl0ZW0oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdEl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdEl0ZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLWl0ZW1cIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmFndWxhOiBkcmFndWxhLkRyYWtlO1xuXG4gICAgQFZpZXdDaGlsZChcInRleHRDb250YWluZXJcIiwge3N0YXRpYzogdHJ1ZX0pXG4gICAgdGV4dENvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgb3ZlcmxheTogXCJwb3BvdmVyXCIgfCBcIm1vZGFsXCI7XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBvdmVybGF5V2hpdGVTcGFjZTogXCJub3dyYXBcIiB8IFwibm9ybWFsXCIgPSBcIm5vd3JhcFwiO1xuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLmlvbngtLXdoaXRlLXNwYWNlXCIpXG4gICAgcHVibGljIHdoaXRlU3BhY2U6IFwibm93cmFwXCIgfCBcIm5vcm1hbFwiID0gXCJub3dyYXBcIjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdmFsdWUgc2hvdWxkIGJlIGFsd2F5cyByZXR1cm5lZCBhcyBhcnJheSwgbm8gbWF0dGVyIGlmIG11bHRpcGxlIGlzIHNldCB0byB0cnVlLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGFsd2F5c0FycmF5OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQ29tcGFyZSB2YWx1ZXMgYXMgc3RyaW5nLCB0aGF0IGlzIHdoZXRoZXIgdG9TdHJpbmcoKSBvZiBib3RoIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY29tcGFyZUFzU3RyaW5nOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY29tcGFyYXRvcjogKGE6IGFueSwgYjogYW55KSA9PiBib29sZWFuIHwgbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogSWYgbXVsdGlwbGUgdmFsdWUgc2VsZWN0aW9uIGlzIGFsbG93ZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGl0bGUgb2YgdGhlIHNlbGVjdCBvdmVybGF5IChvbmx5IGluIGNhc2Ugb2YgbW9kYWxzKS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogSWYgbXVsdGlwbGUgdmFsdWVzIHNlbGVjdGlvbiBjYW4gYmUgb3JkZXJlZCBhZnRlciBzZWxlY3Rpb24uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgb3JkZXJhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZW1wdHk6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbiAgICBfcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcblxuICAgICAgICBpZiAodHlwZW9mIHJlYWRvbmx5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRvbmx5ID0gcmVhZG9ubHkgPT09IFwidHJ1ZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVhZG9ubHkgPSByZWFkb25seTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3JlYWRvbmx5O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiwgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRlc3RpbmcgaWYgdmFsdWUgcGFzc2VzIHNlYXJjaCBjcml0aWVyaWEuXG4gICAgICogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBjaGVja3MgbG93ZXJjYXNlZCBsYWJlbCBvZiB2YWx1ZSBhZ2FpbnN0IFxuICAgICAqIGxvd2VyY2FzZWQgc2VhcmNoZWQgdGV4dC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZWFyY2hUZXN0OiAocXVlcnk6IHN0cmluZywgdmFsdWU6IGFueSwgbGFiZWw6IHN0cmluZykgPT4gYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNoZWNrVmFsaWRhdG9yOiAodmFsdWU6IGFueSwgY2hlY2tlZDogYm9vbGVhbiwgb3RoZXJDaGVja2VkVmFsdWVzOiBhbnlbXSkgPT4gYW55W107XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgaW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gdGhpcy5pb25DaGFuZ2U7XG5cblxuICAgIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSBzZWxlY3QgY29tcG9uZW50IGlzIGRpc2FibGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZCB8fCBkaXNhYmxlZCA9PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKnByaXZhdGUqL3ZhbHVlczogYW55W10gPSBbXTtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55IHwgYW55W10pIHtcblxuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCA/IFt2YWx1ZV0gOiBbXSk7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlLmxlbmd0aCAhPSB0aGlzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZhbHVlQ29tcGFyYXRvcih0aGlzLnZhbHVlc1tpXSwgbmV3VmFsdWVbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbHVlcyA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTGlzdEl0ZW1IYXNWYWx1ZSgpO1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5maXJlT25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250cm9sT25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuaW9uQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlT25DaGFuZ2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGFueSB8IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgfHwgdGhpcy5hbHdheXNBcnJheSA/IHRoaXMudmFsdWVzLnNsaWNlKDApIDogKHRoaXMudmFsdWVzLmxlbmd0aCA+IDAgPyB0aGlzLnZhbHVlc1swXSA6IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWNoZWRMYWJlbHM6IHN0cmluZ1tdO1xuXG4gICAgLypwcml2YXRlKi8gbGFiZWxJbXBsJCh2YWx1ZTogYW55KTogc3RyaW5nIHtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zIGluc3RhbmNlb2YgU2VsZWN0T3B0aW9ucykge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FjaGVkTGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRMYWJlbHMgPSBuZXcgQXJyYXkodGhpcy5vcHRpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVDb21wYXJhdG9yKHZhbHVlLCB0aGlzLm9wdGlvbnNbaV0udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZWRMYWJlbHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZExhYmVsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZExhYmVsc1tpXSA9IHRoaXMub3B0aW9uc1tpXS5sYWJlbCA/IHRoaXMub3B0aW9uc1tpXS5sYWJlbCA6ICh0aGlzLmxhYmVsID8gdGhpcy5sYWJlbCh2YWx1ZSkgOiB2YWx1ZSArIFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlZExhYmVscykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZExhYmVscyA9IG5ldyBBcnJheSh0aGlzLm9wdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ29tcGFyYXRvcih2YWx1ZSwgdGhpcy5vcHRpb25zW2ldKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZWRMYWJlbHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRMYWJlbHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZExhYmVsc1tpXSA9IHRoaXMubGFiZWwgPyB0aGlzLmxhYmVsKHZhbHVlKSA6IHZhbHVlICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uc0NvbXBvbmVudHMpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgb3B0aW9ucyA9IHRoaXMub3B0aW9uc0NvbXBvbmVudHMudG9BcnJheSgpLCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZUNvbXBhcmF0b3IodmFsdWUsIG9wdGlvbnNbaV0udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zW2ldLmxhYmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpcmVPbkNoYW5nZTogYm9vbGVhbjtcblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGhhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrTGlzdEl0ZW1IYXNWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJoYXMtdmFsdWVcIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaGFzLXZhbHVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHZhbHVlQ29tcGFyYXRvciA9IChhOiBhbnksIGI6IGFueSkgPT4ge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbXBhcmVBc1N0cmluZykge1xuICAgICAgICAgICAgaWYgKGEgIT09IHVuZGVmaW5lZCAmJiBhICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhID09IGI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbXBhcmF0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSB0aGlzLmNvbXBhcmF0b3IoYSwgYik7XG4gICAgICAgICAgICByZXR1cm4gciA9PT0gMCB8fCByID09PSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICB9XG5cblxuICAgIEBDb250ZW50Q2hpbGQoU2VsZWN0TGFiZWwsIHtzdGF0aWM6IGZhbHNlfSlcbiAgICAvKnByaXZhdGUqLyBsYWJlbFRlbXBsYXRlOiBTZWxlY3RMYWJlbDtcblxuICAgIEBJbnB1dCgpXG4gICAgbGFiZWw6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cblxuICAgIEBJbnB1dCgpXG4gICAgb3B0aW9uczogYW55W10gfCBTZWxlY3RPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBvcHRpb25zQ29tcG9uZW50czogUXVlcnlMaXN0PFNlbGVjdE9wdGlvbj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFNlbGVjdE9wdGlvbiwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgICBwcm90ZWN0ZWQgc2V0IF9vcHRpb25zQ29tcG9uZW50cyh2YWw6IFF1ZXJ5TGlzdDxTZWxlY3RPcHRpb24+KSB7XG4gICAgICAgIHRoaXMub3B0aW9uc0NvbXBvbmVudHMgPSB2YWw7XG4gICAgICAgIC8vdGhpcy5vcHRpb25zQ29tcG9uZW50cy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVRleHQoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbmRleE9mVmFsdWUodmFsdWU6IGFueSk6IG51bWJlciB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVDb21wYXJhdG9yKHZhbHVlLCB0aGlzLnZhbHVlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgY29udHJvbE9uQ2hhbmdlOiBGdW5jdGlvbjtcblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29udHJvbE9uVG91Y2hlZDogRnVuY3Rpb247XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgYXN5bmMgb3BlbihldmVudDogRXZlbnQpIHtcblxuICAgICAgICBsZXQgb3ZlcmxheTogXCJwb3BvdmVyXCIgfCBcIm1vZGFsXCIgPSB0aGlzLm92ZXJsYXk7XG5cbiAgICAgICAgaWYgKCFvdmVybGF5KSB7XG4gICAgICAgICAgICBvdmVybGF5ID0gXCJwb3BvdmVyXCI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3B0aW9uczogU2VsZWN0T3ZlcmxheU9wdGlvbltdID0gW107XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMgaW5zdGFuY2VvZiBTZWxlY3RPcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUluZGV4ID0gb3B0aW9uLnZhbHVlID8gdGhpcy5pbmRleE9mVmFsdWUob3B0aW9uLnZhbHVlKSA6IC0xO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IG9wdGlvbi52YWx1ZSwgY2hlY2tlZDogb3B0aW9uLnZhbHVlID8gdmFsdWVJbmRleCA+IC0xIDogZmFsc2UsIGNoZWNrZWRUaW1lc3RhbXA6IHRoaXMub3JkZXJhYmxlICYmIHZhbHVlSW5kZXgsIGxhYmVsOiBvcHRpb24ubGFiZWwgPyBvcHRpb24ubGFiZWwgOiAoKCF0aGlzLnNlYXJjaFRlc3QgfHwgIXRoaXMubGFiZWxUZW1wbGF0ZSkgPyB0aGlzLmxhYmVsSW1wbCQob3B0aW9uLnZhbHVlKSA6IHVuZGVmaW5lZCksIGRpc2FibGVkOiBvcHRpb24uZGlzYWJsZWQsIGRpdmlkZXI6IG9wdGlvbi5kaXZpZGVyfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlSW5kZXggPSB0aGlzLmluZGV4T2ZWYWx1ZShvcHRpb24pO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IG9wdGlvbiwgY2hlY2tlZDogdmFsdWVJbmRleCA+IC0xLCBjaGVja2VkVGltZXN0YW1wOiB0aGlzLm9yZGVyYWJsZSAmJiB2YWx1ZUluZGV4LCBsYWJlbDogIXRoaXMubGFiZWxUZW1wbGF0ZSB8fCAhdGhpcy5zZWFyY2hUZXN0ID8gdGhpcy5sYWJlbEltcGwkKG9wdGlvbikgOiB1bmRlZmluZWR9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uc0NvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHRoaXMub3B0aW9uc0NvbXBvbmVudHMudG9BcnJheSgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVJbmRleCA9IHRoaXMuaW5kZXhPZlZhbHVlKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogb3B0aW9uLnZhbHVlLCBjaGVja2VkOiB2YWx1ZUluZGV4ID4gLTEsIGNoZWNrZWRUaW1lc3RhbXA6IHRoaXMub3JkZXJhYmxlICYmIHZhbHVlSW5kZXgsIGxhYmVsOiBvcHRpb24ubGFiZWwsIGRpdmlkZXI6ICEhb3B0aW9uLmRpdmlkZXJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdmVybGF5VGl0bGU6IHN0cmluZztcbiAgICAgICAgaWYgKHRoaXMudGl0bGUpIHtcbiAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IHRoaXMudGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW92ZXJsYXlUaXRsZSAmJiB0aGlzLmxpc3RJdGVtKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5saXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiW2lvbngtc2VsZWN0LW92ZXJsYXktdGl0bGVdXCIpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheVRpdGxlID0gdGl0bGUuaW5uZXJUZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMubGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcImlvbi1sYWJlbFwiKTtcbiAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVRpdGxlID0gbGFiZWwuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3ZlcmxheVRpdGxlICYmIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlKSB7XG4gICAgICAgICAgICBvdmVybGF5VGl0bGUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3ZlcmxheVRpdGxlICYmIHRoaXMucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IHRoaXMucGxhY2Vob2xkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3ZlcmxheURhdGEgPSB7XG4gICAgICAgICAgICBvdmVybGF5OiBvdmVybGF5LFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICAgIG11bHRpcGxlOiAhIXRoaXMubXVsdGlwbGUsXG4gICAgICAgICAgICB0aXRsZTogb3ZlcmxheVRpdGxlLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMubGFiZWxUZW1wbGF0ZSxcbiAgICAgICAgICAgIG9yZGVyYWJsZTogISF0aGlzLm9yZGVyYWJsZSxcbiAgICAgICAgICAgIGVtcHR5OiAhIXRoaXMuZW1wdHksXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiB0aGlzLm92ZXJsYXlXaGl0ZVNwYWNlLFxuICAgICAgICAgICAgdmFsdWVWYWxpZGF0b3I6IHRoaXMuY2hlY2tWYWxpZGF0b3IsXG4gICAgICAgICAgICB2YWx1ZUNvbXBhcmF0b3I6IHRoaXMudmFsdWVDb21wYXJhdG9yLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLFxuXG4gICAgICAgICAgICB1cGRhdGVWYWx1ZXM6ICh2YWx1ZTogYW55W10pID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250cm9sT25Ub3VjaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob3ZlcmxheSA9PSBcInBvcG92ZXJcIikge1xuICAgICAgICAgICAgbGV0IHBvcG92ZXIgPSBhd2FpdCB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmNyZWF0ZSh7Y29tcG9uZW50OiBTZWxlY3RPdmVybGF5Q29udGVudCwgY29tcG9uZW50UHJvcHM6IG92ZXJsYXlEYXRhLCBjc3NDbGFzczogXCJpb254LXNlbGVjdC1vdmVybGF5LXdpZHRoXCIsIGV2ZW50OiBldmVudH0pO1xuICAgICAgICAgICAgcG9wb3Zlci5wcmVzZW50KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogU2VsZWN0T3ZlcmxheUNvbnRlbnQsIGNvbXBvbmVudFByb3BzOiBvdmVybGF5RGF0YX0pO1xuICAgICAgICAgICAgbW9kYWwucHJlc2VudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGluaXREcmFndWxhKCkge1xuXG4gICAgICAgIGlmICh0aGlzLm9yZGVyYWJsZSAmJiAhdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFndWxhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmRyYWd1bGEgPSBjcmVhdGVEcmFndWxhKHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJzOiBbdGhpcy50ZXh0Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnRdLFxuICAgICAgICAgICAgICAgIC8vIG1pcnJvckNvbnRhaW5lcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlvbi1hcHBcIiksXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcblxuICAgICAgICAgICAgICAgIG1vdmVzOiAoZWwsIGNvbnRhaW5lciwgaGFuZGxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlcyAmJiB0aGlzLnZhbHVlcy5sZW5ndGggPiAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWd1bGEub24oXCJkcm9wXCIsIChlbCwgdGFyZ2V0LCBzb3VyY2UsIHNpYmxpbmcpID0+IHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoXCJpb254LS1pbmRleFwiKSwgMCk7XG4gICAgICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gc2libGluZyA/IHBhcnNlSW50KHNpYmxpbmcuZ2V0QXR0cmlidXRlKFwiaW9ueC0taW5kZXhcIiksIDApIDogdGhpcy52YWx1ZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVuZEluZGV4ID4gc3RhcnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBlbmRJbmRleCAtPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnZhbHVlc1tzdGFydEluZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcy5zcGxpY2Uoc3RhcnRJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMuc3BsaWNlKGVuZEluZGV4LCAwLCBlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xPbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSh0aGlzLnZhbHVlcy5zbGljZSgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlvbkNoYW5nZS5lbWl0KHRoaXMudmFsdWVzLnNsaWNlKCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRyYWd1bGEpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ3VsYS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmRyYWd1bGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUNzc0NsYXNzZXMoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0tc2VsZWN0XCIpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbi1pdGVtXCIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaW4taXRlbVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgICAgIGlmIChjaGFuZ2VzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FjaGVkTGFiZWxzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbXCJvcmRlcmFibGVcIl0gfHwgY2hhbmdlc1tcInJlYWRvbmx5XCJdIHx8IGNoYW5nZXNbXCJkaXNhYmxlZFwiXSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RHJhZ3VsYSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDc3NDbGFzc2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy90aGlzLnVwZGF0ZVRleHQoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNzc0NsYXNzZXMoKTtcblxuICAgICAgICBpZiAodGhpcy5vcmRlcmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERyYWd1bGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19