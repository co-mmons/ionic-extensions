import * as tslib_1 from "tslib";
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, e_3, _c, overlay, options, _d, _e, option, valueIndex, _f, _g, option, valueIndex, _h, _j, option, valueIndex, overlayTitle, title, label, overlayData, popover, modal;
            var _this = this;
            return tslib_1.__generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        overlay = this.overlay;
                        if (!overlay) {
                            overlay = "popover";
                        }
                        options = [];
                        if (this.options instanceof SelectOptions) {
                            try {
                                for (_d = tslib_1.__values(this.options), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    option = _e.value;
                                    valueIndex = option.value ? this.indexOfValue(option.value) : -1;
                                    options.push({ value: option.value, checked: option.value ? valueIndex > -1 : false, checkedTimestamp: this.orderable && valueIndex, label: option.label ? option.label : ((!this.searchTest || !this.labelTemplate) ? this.labelImpl$(option.value) : undefined), disabled: option.disabled, divider: option.divider });
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        else if (this.options) {
                            try {
                                for (_f = tslib_1.__values(this.options), _g = _f.next(); !_g.done; _g = _f.next()) {
                                    option = _g.value;
                                    valueIndex = this.indexOfValue(option);
                                    options.push({ value: option, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: !this.labelTemplate || !this.searchTest ? this.labelImpl$(option) : undefined });
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                        else if (this.optionsComponents) {
                            try {
                                for (_h = tslib_1.__values(this.optionsComponents.toArray()), _j = _h.next(); !_j.done; _j = _h.next()) {
                                    option = _j.value;
                                    valueIndex = this.indexOfValue(option.value);
                                    options.push({ value: option.value, checked: valueIndex > -1, checkedTimestamp: this.orderable && valueIndex, label: option.label, divider: !!option.divider });
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
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
                mirrorContainer: document.querySelector("ion-app"),
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
    tslib_1.__decorate([
        ViewChild("textContainer", { static: true })
    ], Select.prototype, "textContainer", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "overlay", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "overlayWhiteSpace", void 0);
    tslib_1.__decorate([
        Input(),
        HostBinding("attr.ionx--white-space")
    ], Select.prototype, "whiteSpace", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "alwaysArray", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "compareAsString", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "comparator", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "multiple", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "title", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "orderable", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "empty", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "readonly", null);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "searchTest", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "checkValidator", void 0);
    tslib_1.__decorate([
        Output()
    ], Select.prototype, "ionChange", void 0);
    tslib_1.__decorate([
        Output()
    ], Select.prototype, "change", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "disabled", null);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "value", null);
    tslib_1.__decorate([
        ContentChild(SelectLabel, { static: false })
    ], Select.prototype, "labelTemplate", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "label", void 0);
    tslib_1.__decorate([
        Input()
    ], Select.prototype, "options", void 0);
    tslib_1.__decorate([
        ContentChildren(SelectOption, { descendants: true })
    ], Select.prototype, "_optionsComponents", null);
    Select = tslib_1.__decorate([
        Component({
            selector: "ionx-select",
            host: {
                "[attr.ionx--chips-layout]": "!!orderable || null",
                "[attr.ionx--readonly]": "(!!readonly || !!disabled) || null",
                "[attr.ionx--orderable]": "(!!orderable && !readonly && !disabled && values && values.length > 1) || null",
            },
            template: "<ng-template #optionTemplate let-value=\"value\" let-index=\"index\">\n    <span *ngIf=\"!labelTemplate; else hasLabelTemplate\">{{labelImpl$(value)}}</span>\n    <ng-template #hasLabelTemplate>\n        <ng-container *ngTemplateOutlet=\"labelTemplate.templateRef; context: {$implicit: value, index: index}\"></ng-container>\n    </ng-template>\n</ng-template>\n\n<div class=\"select-inner\">\n    <div class=\"select-text\" #textContainer [class.select-placeholder]=\"values.length == 0\">\n        <span *ngIf=\"values.length == 0; else showValues\">{{placeholder}}</span>\n\n        <ng-template #showValues>\n            <ng-template ngFor [ngForOf]=\"values\" let-value let-index=\"index\">\n                <span *ngIf=\"index > 0 && (!labelTemplate || labelTemplate.separator) && !orderable\">{{!labelTemplate ? \", \" : labelTemplate.separator}}</span>\n\n                <ion-chip *ngIf=\"orderable else simpleText\" outline=\"true\" [attr.ionx--index]=\"index\">\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ion-chip>\n\n                <ng-template #simpleText>\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ng-template>\n\n            </ng-template>\n        </ng-template>\n    </div>\n\n    <ng-container  *ngIf=\"!_readonly && !_disabled\">\n        <div class=\"select-icon\" role=\"presentation\" *ngIf=\"!orderable\">\n            <div class=\"select-icon-inner\"></div>\n        </div>\n        <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\" *ngIf=\"!orderable || !values || values.length === 0\"></button>\n    </ng-container>\n\n</div>\n",
            styles: [":host{--placeholder-opacity:.5;--dropdown-icon-opacity:.5;--disabled-opacity:.5;padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:inline-block;overflow:hidden;color:var(--color);font-family:var(--ion-font-family,inherit);max-width:100%}:host .select-inner{display:-webkit-box;display:flex;position:relative}:host .select-icon{position:relative;width:16px;height:20px}:host .select-icon .select-icon-inner{top:50%;right:0;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:var(--dropdown-icon-opacity,.5);pointer-events:none}:host .select-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .select-text.select-placeholder{opacity:var(--placeholder-opacity,.5)}:host.select-disabled{opacity:var(--disabled-opacity,.5);pointer-events:none}:host.select-readonly{opacity:1;pointer-events:none}:host.select-readonly .select-icon{display:none}:host[ionx--white-space=normal] .select-text,:host[white-space-normal] .select-text{white-space:normal!important;overflow:auto}:host button{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0}:host button::-moz-focus-inner{border:0}:host.in-item{position:static}:host ion-chip{max-width:calc(50% - 4px);-webkit-margin-start:0;margin-inline-start:0;margin-bottom:0;cursor:default}:host ion-chip>span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:1.1}:host [ionx--orderable] ion-chip{cursor:move}:host [ionx--chips-layout] .select-text{white-space:normal;width:100%}:host-context(ion-toolbar){color:var(--ion-toolbar-color);--icon-color:var(--ion-toolbar-color);--padding-start:16px;--padding-end:16px}:host-context(.item-label-stacked){align-self:flex-start;--padding-top:8px;--padding-bottom:8px;--padding-start:0;width:100%}:host-context(.item-label-stacked) .select-text{max-width:calc(100% - 16px);-webkit-box-flex:initial;flex:initial}:host-context(.item-label-stacked)[ionx--chips-layout] .select-text{-webkit-box-flex:1;flex:1}"]
        }),
        tslib_1.__param(4, Optional())
    ], Select);
    return Select;
}());
export { Select };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvc2VsZWN0LyIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvTCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUd0RCxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFZOUI7SUFHSSxnQkFBb0IsT0FBZ0MsRUFBWSxJQUFpQixFQUFVLGlCQUFvQyxFQUFZLGVBQWdDLEVBQXdCLE9BQWtCO1FBQXJOLGlCQUtDO1FBTG1CLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQVksU0FBSSxHQUFKLElBQUksQ0FBYTtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBWSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBd0IsWUFB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Q3NCO0lBSTlCO1FBREMsS0FBSyxFQUFFOzJDQUN1QjtJQUsvQjtRQURDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUM7b0RBSWxEO0lBclJRLE1BQU07UUFWbEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsSUFBSSxFQUFFO2dCQUNGLDJCQUEyQixFQUFFLHFCQUFxQjtnQkFDbEQsdUJBQXVCLEVBQUUsb0NBQW9DO2dCQUM3RCx3QkFBd0IsRUFBRSxnRkFBZ0Y7YUFDN0c7WUFFRCwyeURBQTBCOztTQUM3QixDQUFDO1FBSWdMLG1CQUFBLFFBQVEsRUFBRSxDQUFBO09BSC9LLE1BQU0sQ0FzZWxCO0lBQUQsYUFBQztDQUFBLEFBdGVELElBc2VDO1NBdGVZLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3B0aW9uYWwsIE91dHB1dCwgUXVlcnlMaXN0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0NvbnRyb2x9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyLCBQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQgKiBhcyBkcmFndWxhIGZyb20gXCJkcmFndWxhXCI7XG5pbXBvcnQge1NlbGVjdExhYmVsfSBmcm9tIFwiLi9zZWxlY3QtbGFiZWxcIjtcbmltcG9ydCB7U2VsZWN0T3B0aW9ufSBmcm9tIFwiLi9zZWxlY3Qtb3B0aW9uXCI7XG5pbXBvcnQge1NlbGVjdE9wdGlvbnN9IGZyb20gXCIuL3NlbGVjdC1vcHRpb25zXCI7XG5pbXBvcnQge1NlbGVjdE92ZXJsYXlDb250ZW50fSBmcm9tIFwiLi9zZWxlY3Qtb3ZlcmxheVwiO1xuaW1wb3J0IHtTZWxlY3RPdmVybGF5T3B0aW9ufSBmcm9tIFwiLi9zZWxlY3Qtb3ZlcmxheS1vcHRpb25cIjtcblxuY29uc3QgY3JlYXRlRHJhZ3VsYSA9IGRyYWd1bGE7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc2VsZWN0XCIsXG4gICAgaG9zdDoge1xuICAgICAgICBcIlthdHRyLmlvbngtLWNoaXBzLWxheW91dF1cIjogXCIhIW9yZGVyYWJsZSB8fCBudWxsXCIsXG4gICAgICAgIFwiW2F0dHIuaW9ueC0tcmVhZG9ubHldXCI6IFwiKCEhcmVhZG9ubHkgfHwgISFkaXNhYmxlZCkgfHwgbnVsbFwiLFxuICAgICAgICBcIlthdHRyLmlvbngtLW9yZGVyYWJsZV1cIjogXCIoISFvcmRlcmFibGUgJiYgIXJlYWRvbmx5ICYmICFkaXNhYmxlZCAmJiB2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCA+IDEpIHx8IG51bGxcIixcbiAgICB9LFxuICAgIHN0eWxlVXJsczogW1wic2VsZWN0LnNjc3NcIl0sXG4gICAgdGVtcGxhdGVVcmw6IFwic2VsZWN0Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3QgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkluaXQge1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcm90ZWN0ZWQgaW50bDogSW50bFNlcnZpY2UsIHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyLCBwcm90ZWN0ZWQgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsIEBPcHRpb25hbCgpIHByb3RlY3RlZCBjb250cm9sOiBOZ0NvbnRyb2wpIHtcblxuICAgICAgICBpZiAoY29udHJvbCkge1xuICAgICAgICAgICAgY29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfbGlzdEl0ZW06IEhUTUxJb25JdGVtRWxlbWVudDtcblxuICAgIHByaXZhdGUgZ2V0IGxpc3RJdGVtKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RJdGVtID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xvc2VzdChcImlvbi1pdGVtXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhZ3VsYTogZHJhZ3VsYS5EcmFrZTtcblxuICAgIEBWaWV3Q2hpbGQoXCJ0ZXh0Q29udGFpbmVyXCIsIHtzdGF0aWM6IHRydWV9KVxuICAgIHRleHRDb250YWluZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG92ZXJsYXk6IFwicG9wb3ZlclwiIHwgXCJtb2RhbFwiO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgb3ZlcmxheVdoaXRlU3BhY2U6IFwibm93cmFwXCIgfCBcIm5vcm1hbFwiID0gXCJub3dyYXBcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci5pb254LS13aGl0ZS1zcGFjZVwiKVxuICAgIHB1YmxpYyB3aGl0ZVNwYWNlOiBcIm5vd3JhcFwiIHwgXCJub3JtYWxcIiA9IFwibm93cmFwXCI7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHZhbHVlIHNob3VsZCBiZSBhbHdheXMgcmV0dXJuZWQgYXMgYXJyYXksIG5vIG1hdHRlciBpZiBtdWx0aXBsZSBpcyBzZXQgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBhbHdheXNBcnJheTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdmFsdWVzIGFzIHN0cmluZywgdGhhdCBpcyB3aGV0aGVyIHRvU3RyaW5nKCkgb2YgYm90aCB2YWx1ZXMgYXJlIGVxdWFsLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNvbXBhcmVBc1N0cmluZzogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGNvbXBhcmF0b3I6IChhOiBhbnksIGI6IGFueSkgPT4gYm9vbGVhbiB8IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIElmIG11bHRpcGxlIHZhbHVlIHNlbGVjdGlvbiBpcyBhbGxvd2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG11bHRpcGxlOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHRpdGxlIG9mIHRoZSBzZWxlY3Qgb3ZlcmxheSAob25seSBpbiBjYXNlIG9mIG1vZGFscykuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIElmIG11bHRpcGxlIHZhbHVlcyBzZWxlY3Rpb24gY2FuIGJlIG9yZGVyZWQgYWZ0ZXIgc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIG9yZGVyYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGVtcHR5OiBib29sZWFuID0gdHJ1ZTtcblxuXG4gICAgX3JlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZWFkb25seSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5yZWFkb25seSA9IHJlYWRvbmx5ID09PSBcInRydWVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlYWRvbmx5ID0gcmVhZG9ubHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9yZWFkb25seTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24sIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0ZXN0aW5nIGlmIHZhbHVlIHBhc3NlcyBzZWFyY2ggY3JpdGllcmlhLlxuICAgICAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gY2hlY2tzIGxvd2VyY2FzZWQgbGFiZWwgb2YgdmFsdWUgYWdhaW5zdCBcbiAgICAgKiBsb3dlcmNhc2VkIHNlYXJjaGVkIHRleHQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgc2VhcmNoVGVzdDogKHF1ZXJ5OiBzdHJpbmcsIHZhbHVlOiBhbnksIGxhYmVsOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBjaGVja1ZhbGlkYXRvcjogKHZhbHVlOiBhbnksIGNoZWNrZWQ6IGJvb2xlYW4sIG90aGVyQ2hlY2tlZFZhbHVlczogYW55W10pID0+IGFueVtdO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgcmVhZG9ubHkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IHRoaXMuaW9uQ2hhbmdlO1xuXG5cbiAgICBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgc2VsZWN0IGNvbXBvbmVudCBpcyBkaXNhYmxlZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQgfHwgZGlzYWJsZWQgPT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLypwcml2YXRlKi92YWx1ZXM6IGFueVtdID0gW107XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgdmFsdWUodmFsdWU6IGFueSB8IGFueVtdKSB7XG5cbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgbmV3VmFsdWUgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgPyBbdmFsdWVdIDogW10pO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZS5sZW5ndGggIT0gdGhpcy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy52YWx1ZUNvbXBhcmF0b3IodGhpcy52YWx1ZXNbaV0sIG5ld1ZhbHVlW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZXMgPSBuZXdWYWx1ZTtcblxuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja0xpc3RJdGVtSGFzVmFsdWUoKTtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlyZU9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlvbkNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZU9uQ2hhbmdlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkgfCBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxlIHx8IHRoaXMuYWx3YXlzQXJyYXkgPyB0aGlzLnZhbHVlcy5zbGljZSgwKSA6ICh0aGlzLnZhbHVlcy5sZW5ndGggPiAwID8gdGhpcy52YWx1ZXNbMF0gOiB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FjaGVkTGFiZWxzOiBzdHJpbmdbXTtcblxuICAgIC8qcHJpdmF0ZSovIGxhYmVsSW1wbCQodmFsdWU6IGFueSk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyBpbnN0YW5jZW9mIFNlbGVjdE9wdGlvbnMpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlZExhYmVscykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkTGFiZWxzID0gbmV3IEFycmF5KHRoaXMub3B0aW9ucy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ29tcGFyYXRvcih2YWx1ZSwgdGhpcy5vcHRpb25zW2ldLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkTGFiZWxzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRMYWJlbHNbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRMYWJlbHNbaV0gPSB0aGlzLm9wdGlvbnNbaV0ubGFiZWwgPyB0aGlzLm9wdGlvbnNbaV0ubGFiZWwgOiAodGhpcy5sYWJlbCA/IHRoaXMubGFiZWwodmFsdWUpIDogdmFsdWUgKyBcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZWRMYWJlbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRMYWJlbHMgPSBuZXcgQXJyYXkodGhpcy5vcHRpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZUNvbXBhcmF0b3IodmFsdWUsIHRoaXMub3B0aW9uc1tpXSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkTGFiZWxzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkTGFiZWxzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRMYWJlbHNbaV0gPSB0aGlzLmxhYmVsID8gdGhpcy5sYWJlbCh2YWx1ZSkgOiB2YWx1ZSArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnNDb21wb25lbnRzKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNDb21wb25lbnRzLnRvQXJyYXkoKSwgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVDb21wYXJhdG9yKHZhbHVlLCBvcHRpb25zW2ldLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uc1tpXS5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXJlT25DaGFuZ2U6IGJvb2xlYW47XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0xpc3RJdGVtSGFzVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaGFzLXZhbHVlXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImhhcy12YWx1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSB2YWx1ZUNvbXBhcmF0b3IgPSAoYTogYW55LCBiOiBhbnkpID0+IHtcblxuICAgICAgICBpZiAodGhpcy5jb21wYXJlQXNTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmIChhICE9PSB1bmRlZmluZWQgJiYgYSAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYSA9PSBiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb21wYXJhdG9yKSB7XG4gICAgICAgICAgICBjb25zdCByID0gdGhpcy5jb21wYXJhdG9yKGEsIGIpO1xuICAgICAgICAgICAgcmV0dXJuIHIgPT09IDAgfHwgciA9PT0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgfVxuXG5cbiAgICBAQ29udGVudENoaWxkKFNlbGVjdExhYmVsLCB7c3RhdGljOiBmYWxzZX0pXG4gICAgLypwcml2YXRlKi8gbGFiZWxUZW1wbGF0ZTogU2VsZWN0TGFiZWw7XG5cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIG9wdGlvbnM6IGFueVtdIHwgU2VsZWN0T3B0aW9ucztcblxuICAgIHByaXZhdGUgb3B0aW9uc0NvbXBvbmVudHM6IFF1ZXJ5TGlzdDxTZWxlY3RPcHRpb24+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTZWxlY3RPcHRpb24sIHtkZXNjZW5kYW50czogdHJ1ZX0pXG4gICAgcHJvdGVjdGVkIHNldCBfb3B0aW9uc0NvbXBvbmVudHModmFsOiBRdWVyeUxpc3Q8U2VsZWN0T3B0aW9uPikge1xuICAgICAgICB0aGlzLm9wdGlvbnNDb21wb25lbnRzID0gdmFsO1xuICAgICAgICAvL3RoaXMub3B0aW9uc0NvbXBvbmVudHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVUZXh0KCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5kZXhPZlZhbHVlKHZhbHVlOiBhbnkpOiBudW1iZXIge1xuXG4gICAgICAgIGlmICghdGhpcy52YWx1ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlQ29tcGFyYXRvcih2YWx1ZSwgdGhpcy52YWx1ZXNbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGNvbnRyb2xPbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPblRvdWNoZWQ6IEZ1bmN0aW9uO1xuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuXG4gICAgcHVibGljIGFzeW5jIG9wZW4oZXZlbnQ6IEV2ZW50KSB7XG5cbiAgICAgICAgbGV0IG92ZXJsYXk6IFwicG9wb3ZlclwiIHwgXCJtb2RhbFwiID0gdGhpcy5vdmVybGF5O1xuXG4gICAgICAgIGlmICghb3ZlcmxheSkge1xuICAgICAgICAgICAgb3ZlcmxheSA9IFwicG9wb3ZlclwiO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdGlvbnM6IFNlbGVjdE92ZXJsYXlPcHRpb25bXSA9IFtdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zIGluc3RhbmNlb2YgU2VsZWN0T3B0aW9ucykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVJbmRleCA9IG9wdGlvbi52YWx1ZSA/IHRoaXMuaW5kZXhPZlZhbHVlKG9wdGlvbi52YWx1ZSkgOiAtMTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBvcHRpb24udmFsdWUsIGNoZWNrZWQ6IG9wdGlvbi52YWx1ZSA/IHZhbHVlSW5kZXggPiAtMSA6IGZhbHNlLCBjaGVja2VkVGltZXN0YW1wOiB0aGlzLm9yZGVyYWJsZSAmJiB2YWx1ZUluZGV4LCBsYWJlbDogb3B0aW9uLmxhYmVsID8gb3B0aW9uLmxhYmVsIDogKCghdGhpcy5zZWFyY2hUZXN0IHx8ICF0aGlzLmxhYmVsVGVtcGxhdGUpID8gdGhpcy5sYWJlbEltcGwkKG9wdGlvbi52YWx1ZSkgOiB1bmRlZmluZWQpLCBkaXNhYmxlZDogb3B0aW9uLmRpc2FibGVkLCBkaXZpZGVyOiBvcHRpb24uZGl2aWRlcn0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZUluZGV4ID0gdGhpcy5pbmRleE9mVmFsdWUob3B0aW9uKTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBvcHRpb24sIGNoZWNrZWQ6IHZhbHVlSW5kZXggPiAtMSwgY2hlY2tlZFRpbWVzdGFtcDogdGhpcy5vcmRlcmFibGUgJiYgdmFsdWVJbmRleCwgbGFiZWw6ICF0aGlzLmxhYmVsVGVtcGxhdGUgfHwgIXRoaXMuc2VhcmNoVGVzdCA/IHRoaXMubGFiZWxJbXBsJChvcHRpb24pIDogdW5kZWZpbmVkfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnNDb21wb25lbnRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLm9wdGlvbnNDb21wb25lbnRzLnRvQXJyYXkoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlSW5kZXggPSB0aGlzLmluZGV4T2ZWYWx1ZShvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IG9wdGlvbi52YWx1ZSwgY2hlY2tlZDogdmFsdWVJbmRleCA+IC0xLCBjaGVja2VkVGltZXN0YW1wOiB0aGlzLm9yZGVyYWJsZSAmJiB2YWx1ZUluZGV4LCBsYWJlbDogb3B0aW9uLmxhYmVsLCBkaXZpZGVyOiAhIW9wdGlvbi5kaXZpZGVyfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3ZlcmxheVRpdGxlOiBzdHJpbmc7XG4gICAgICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICAgICAgICBvdmVybGF5VGl0bGUgPSB0aGlzLnRpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvdmVybGF5VGl0bGUgJiYgdGhpcy5saXN0SXRlbSkge1xuXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMubGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcIltpb254LXNlbGVjdC1vdmVybGF5LXRpdGxlXVwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IHRpdGxlLmlubmVyVGV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoXCJpb24tbGFiZWxcIik7XG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IGxhYmVsLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW92ZXJsYXlUaXRsZSAmJiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSkge1xuICAgICAgICAgICAgb3ZlcmxheVRpdGxlID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW92ZXJsYXlUaXRsZSAmJiB0aGlzLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICBvdmVybGF5VGl0bGUgPSB0aGlzLnBsYWNlaG9sZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG92ZXJsYXlEYXRhID0ge1xuICAgICAgICAgICAgb3ZlcmxheTogb3ZlcmxheSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICBtdWx0aXBsZTogISF0aGlzLm11bHRpcGxlLFxuICAgICAgICAgICAgdGl0bGU6IG92ZXJsYXlUaXRsZSxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmxhYmVsVGVtcGxhdGUsXG4gICAgICAgICAgICBvcmRlcmFibGU6ICEhdGhpcy5vcmRlcmFibGUsXG4gICAgICAgICAgICBlbXB0eTogISF0aGlzLmVtcHR5LFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogdGhpcy5vdmVybGF5V2hpdGVTcGFjZSxcbiAgICAgICAgICAgIHZhbHVlVmFsaWRhdG9yOiB0aGlzLmNoZWNrVmFsaWRhdG9yLFxuICAgICAgICAgICAgdmFsdWVDb21wYXJhdG9yOiB0aGlzLnZhbHVlQ29tcGFyYXRvcixcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCxcblxuICAgICAgICAgICAgdXBkYXRlVmFsdWVzOiAodmFsdWU6IGFueVtdKSA9PiB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZpcmVPbkNoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uVG91Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG92ZXJsYXkgPT0gXCJwb3BvdmVyXCIpIHtcbiAgICAgICAgICAgIGxldCBwb3BvdmVyID0gYXdhaXQgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5jcmVhdGUoe2NvbXBvbmVudDogU2VsZWN0T3ZlcmxheUNvbnRlbnQsIGNvbXBvbmVudFByb3BzOiBvdmVybGF5RGF0YSwgY3NzQ2xhc3M6IFwiaW9ueC1zZWxlY3Qtb3ZlcmxheS13aWR0aFwiLCBldmVudDogZXZlbnR9KTtcbiAgICAgICAgICAgIHBvcG92ZXIucHJlc2VudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtjb21wb25lbnQ6IFNlbGVjdE92ZXJsYXlDb250ZW50LCBjb21wb25lbnRQcm9wczogb3ZlcmxheURhdGF9KTtcbiAgICAgICAgICAgIG1vZGFsLnByZXNlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBpbml0RHJhZ3VsYSgpIHtcblxuICAgICAgICBpZiAodGhpcy5vcmRlcmFibGUgJiYgIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ3VsYSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5kcmFndWxhID0gY3JlYXRlRHJhZ3VsYSh7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyczogW3RoaXMudGV4dENvbnRhaW5lci5uYXRpdmVFbGVtZW50XSxcbiAgICAgICAgICAgICAgICBtaXJyb3JDb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpb24tYXBwXCIpLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG5cbiAgICAgICAgICAgICAgICBtb3ZlczogKGVsLCBjb250YWluZXIsIGhhbmRsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMgJiYgdGhpcy52YWx1ZXMubGVuZ3RoID4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5kcmFndWxhLm9uKFwiZHJvcFwiLCAoZWwsIHRhcmdldCwgc291cmNlLCBzaWJsaW5nKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gcGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKFwiaW9ueC0taW5kZXhcIiksIDApO1xuICAgICAgICAgICAgICAgIGxldCBlbmRJbmRleCA9IHNpYmxpbmcgPyBwYXJzZUludChzaWJsaW5nLmdldEF0dHJpYnV0ZShcImlvbngtLWluZGV4XCIpLCAwKSA6IHRoaXMudmFsdWVzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGlmIChlbmRJbmRleCA+IHN0YXJ0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kSW5kZXggLT0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy52YWx1ZXNbc3RhcnRJbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMuc3BsaWNlKHN0YXJ0SW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzLnNwbGljZShlbmRJbmRleCwgMCwgZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250cm9sT25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UodGhpcy52YWx1ZXMuc2xpY2UoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pb25DaGFuZ2UuZW1pdCh0aGlzLnZhbHVlcy5zbGljZSgpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kcmFndWxhKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWd1bGEuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5kcmFndWxhID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVDc3NDbGFzc2VzKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLXNlbGVjdFwiKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlYWRvbmx5ICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pbnRlcmFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1pbnRlcmFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW4taXRlbVwiKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImluLWl0ZW1cIik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgICAgICBpZiAoY2hhbmdlcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlZExhYmVscyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzW1wib3JkZXJhYmxlXCJdIHx8IGNoYW5nZXNbXCJyZWFkb25seVwiXSB8fCBjaGFuZ2VzW1wiZGlzYWJsZWRcIl0pIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERyYWd1bGEoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3NzQ2xhc3NlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vdGhpcy51cGRhdGVUZXh0KCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDc3NDbGFzc2VzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3JkZXJhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmluaXREcmFndWxhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==