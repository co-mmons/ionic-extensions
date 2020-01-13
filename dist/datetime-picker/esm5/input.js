import { __awaiter, __decorate, __generator, __param } from "tslib";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Optional, Output, SimpleChanges, ViewChild } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";
import { IntlService } from "@co.mmons/angular-intl";
import { DateTimezone } from "@co.mmons/js-utils/core";
import { ModalController } from "@ionic/angular";
import { defaultDateTimeFormat } from "./default-formats";
import { DateTimePickerOverlay } from "./overlay";
var DateTimePickerInput = /** @class */ (function () {
    function DateTimePickerInput(element, intl, modalController, control) {
        this.element = element;
        this.intl = intl;
        this.modalController = modalController;
        this.control = control;
        this._disabled = false;
        this._readonly = false;
        this.ionChange = new EventEmitter();
        if (control) {
            control.valueAccessor = this;
        }
    }
    DateTimePickerInput_1 = DateTimePickerInput;
    DateTimePickerInput.currentTimezone = function () {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    };
    Object.defineProperty(DateTimePickerInput.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (rdonly) {
            this._readonly = rdonly === "" || rdonly === "true" || rdonly === true ? true : false;
            this.setupCss();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = disabled === "" || disabled === "true" || disabled === true ? true : false;
            this.setupCss();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "listItem", {
        get: function () {
            if (this._listItem) {
                return this._listItem;
            }
            return this._listItem = this.element.nativeElement.closest("ion-item");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "displayFormat", {
        get: function () {
            return this._displayFormat;
        },
        /**
         * The display format of the date and time as text that shows
         * within the item. When the `pickerFormat` input is not used, then the
         * `displayFormat` is used for both display the formatted text, and determining
         * the datetime-picker picker's columns.
         */
        set: function (format) {
            if (typeof format === "string") {
                this._displayFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
            }
            else {
                this._displayFormat = format;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "pickerFormat", {
        get: function () {
            return this._pickerFormat;
        },
        set: function (format) {
            if (typeof format == "string") {
                this._pickerFormat = this.intl.findFormatterPredefinedOptions(Intl.DateTimeFormat, format);
            }
            else {
                this._pickerFormat = format;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerInput.prototype, "value", {
        get: function () {
            if (!this._value) {
                return undefined;
            }
            return new DateTimezone(new Date(this._value.date.getTime()), this._value.timezone);
        },
        set: function (value) {
            var changed = false;
            if ((value === undefined || value === null) != (this._value === undefined)) {
                changed = true;
            }
            else if (typeof value === "number" && (this._value === undefined || value !== this._value.date.getTime())) {
                changed = true;
            }
            else if (value instanceof Date && (this._value === undefined || value.getTime() !== this._value.date.getTime())) {
                changed = true;
            }
            else if (value instanceof DateTimezone && (this._value === undefined || value.date.getTime() !== this._value.date.getTime() || value.timezone !== this._value.timezone)) {
                changed = true;
            }
            if (typeof value === "number") {
                this._value = new DateTimezone(value);
            }
            else if (value instanceof Date) {
                this._value = new DateTimezone(value.getTime());
            }
            else if (value instanceof DateTimezone) {
                this._value = new DateTimezone(new Date(value.date.getTime()), value.timezone === "current" ? DateTimePickerInput_1.currentTimezone() : value.timezone);
            }
            else {
                this._value = undefined;
            }
            if (changed) {
                this.ionChange.emit(this.value);
                this.updateText();
                this.checkListItemHasValue();
                if (this.controlOnChange && !this.muteControlOnChange) {
                    this.controlOnChange(this.value);
                }
            }
            this.muteControlOnChange = false;
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerInput.prototype.clearValue = function () {
        this.value = undefined;
        if (this.controlOnTouched) {
            this.controlOnTouched();
        }
    };
    DateTimePickerInput.prototype.hasValue = function () {
        return !!this._value;
    };
    DateTimePickerInput.prototype.checkListItemHasValue = function () {
        if (this.listItem) {
            if (this.hasValue()) {
                this.listItem.classList.add("item-has-value");
            }
            else {
                this.listItem.classList.remove("item-has-value");
            }
        }
    };
    DateTimePickerInput.prototype.updateText = function () {
        if (this.hasValue()) {
            var options = Object.assign({}, this.displayFormat || defaultDateTimeFormat);
            if (this._value.timezone) {
                options.timeZone = this._value.timezone;
                if (!options.timeZoneName) {
                    options.timeZoneName = "short";
                }
            }
            if (!this._value.timezone) {
                options.timeZone = "UTC";
                options.timeZoneName = undefined;
            }
            this._text = this.intl.dateTimeFormat(this._value, options);
        }
        else {
            this._text = null;
        }
    };
    DateTimePickerInput.prototype.clicked = function (ev) {
        if (ev.detail === 0 || this.disabled || this.readonly) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open(ev);
    };
    /*protected*/ DateTimePickerInput.prototype.clearButtonClicked = function (event) {
        event.stopPropagation();
        this.clearValue();
    };
    DateTimePickerInput.prototype.open = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var formatOptions, timezone, value, overlayTitle, label, overlay, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.disabled || this.opened || this.readonly) {
                            return [2 /*return*/];
                        }
                        this.opened = true;
                        formatOptions = this.pickerFormat || this.displayFormat || defaultDateTimeFormat;
                        timezone = this._value ? this._value.timezone : this.defaultTimezone;
                        if (timezone === "current") {
                            timezone = DateTimePickerInput_1.currentTimezone();
                        }
                        value = this._value && this._value.date ? this._value.date : new Date();
                        {
                            if (!timezone || timezone === "UTC") {
                                value = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate(), value.getUTCHours(), value.getUTCMinutes(), 0, 0));
                            }
                            else {
                                value = new Date(value.getTime() + (DateTimezone.timezoneOffset(timezone, value) * 60 * 1000 * -1));
                            }
                        }
                        overlayTitle = this.overlayTitle;
                        if (this.listItem && !overlayTitle) {
                            label = this.listItem.querySelector("ion-label");
                            if (label) {
                                overlayTitle = label.innerText;
                            }
                        }
                        return [4 /*yield*/, this.modalController.create({
                                component: DateTimePickerOverlay,
                                componentProps: {
                                    formatOptions: formatOptions,
                                    value: value,
                                    timezone: this._value ? this._value.timezone : (this._value === undefined ? (this.defaultTimezone === "current" ? DateTimePickerInput_1.currentTimezone() : this.defaultTimezone) : undefined),
                                    timezoneDisabled: this.timezoneDisabled,
                                    title: overlayTitle
                                },
                                backdropDismiss: true,
                                showBackdrop: true
                            })];
                    case 1:
                        overlay = _b.sent();
                        overlay.present();
                        _a = this.overlayClosed;
                        return [4 /*yield*/, overlay.onDidDismiss()];
                    case 2:
                        _a.apply(this, [(_b.sent()).data]);
                        return [2 /*return*/];
                }
            });
        });
    };
    DateTimePickerInput.prototype.overlayClosed = function (newValue) {
        var _this = this;
        if (newValue) {
            this.value = newValue;
        }
        if (this.controlOnTouched) {
            this.controlOnTouched();
        }
        if (this.listItem) {
            this.nativeInput.nativeElement.focus();
            setTimeout(function () { return _this.nativeInput.nativeElement.focus(); });
        }
        this.opened = false;
    };
    DateTimePickerInput.prototype.writeValue = function (value) {
        this.muteControlOnChange = true;
        if (value instanceof Date || value instanceof DateTimezone || typeof value === "number") {
            this.value = value;
        }
        else {
            this.value = undefined;
        }
    };
    DateTimePickerInput.prototype.registerOnChange = function (fn) {
        this.controlOnChange = fn;
    };
    DateTimePickerInput.prototype.registerOnTouched = function (fn) {
        this.controlOnTouched = fn;
    };
    DateTimePickerInput.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    DateTimePickerInput.prototype.nativeInputFocused = function () {
        if (this.listItem) {
            if (!this._disabled && !this._readonly && !this.listItem.classList.contains("item-has-focus")) {
                this.listItem.classList.add("item-has-focus");
            }
        }
    };
    DateTimePickerInput.prototype.nativeInputBlured = function () {
        if (this.listItem) {
            this.listItem.classList.remove("item-has-focus");
        }
    };
    /*private*/ DateTimePickerInput.prototype.inputKeyUpDown = function (event) {
        if (event.key === "Tab" || event.key === "Shift" || event.key == "Alt" || event.key == "Ctrl" || event.key === "Meta") {
            return;
        }
        if (!event.metaKey) {
            event.preventDefault();
            this.open(event);
        }
    };
    DateTimePickerInput.prototype.ngOnChanges = function (changes) {
        if (changes["displayFormat"]) {
            this.updateText();
        }
    };
    DateTimePickerInput.prototype.ngOnInit = function () {
        this.updateText();
        this.setupCss();
    };
    DateTimePickerInput.prototype.setupCss = function () {
        if (this.listItem) {
            this.listItem.classList.add("item-input");
            if (this.readonly || this._disabled) {
                this.listItem.classList.remove("item-interactive");
            }
            else {
                this.listItem.classList.add("item-interactive");
            }
        }
    };
    var DateTimePickerInput_1;
    DateTimePickerInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IntlService },
        { type: ModalController },
        { type: NgControl, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        ViewChild("nativeInput", { read: ElementRef, static: true })
    ], DateTimePickerInput.prototype, "nativeInput", void 0);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "overlayTitle", void 0);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "placeholder", void 0);
    __decorate([
        Output()
    ], DateTimePickerInput.prototype, "ionChange", void 0);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "timezoneDisabled", void 0);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "defaultTimezone", void 0);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "clearButtonVisible", void 0);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "clearButtonIcon", void 0);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "clearButtonText", void 0);
    __decorate([
        Input(),
        HostBinding("class.ionx--readonly")
    ], DateTimePickerInput.prototype, "readonly", null);
    __decorate([
        HostBinding("class.ionx--disabled"),
        Input()
    ], DateTimePickerInput.prototype, "disabled", null);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "displayFormat", null);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "pickerFormat", null);
    __decorate([
        Input()
    ], DateTimePickerInput.prototype, "value", null);
    __decorate([
        HostListener("click", ["$event"])
    ], DateTimePickerInput.prototype, "clicked", null);
    DateTimePickerInput = DateTimePickerInput_1 = __decorate([
        Component({
            selector: "ionx-datetime",
            template: "<div #nativeInput\n     class=\"ionx--input\"\n     contenteditable=\"true\"\n     spellcheck=\"false\"\n     (focus)=\"nativeInputFocused()\"\n     (blur)=\"nativeInputBlured()\"\n     (cut)=\"$event.preventDefault()\"\n     (paste)=\"$event.preventDefault()\"\n     (keyup)=\"inputKeyUpDown($event)\"\n     (keydown)=\"inputKeyUpDown($event)\"\n>{{hasValue() ? text : placeholder}}</div>\n\n<ion-button fill=\"clear\" size=\"small\" (click)=\"clearButtonClicked($event)\" *ngIf=\"clearButtonVisible && !readonly && !disabled && hasValue()\">\n    <ion-icon name=\"close\" [slot]=\"clearButtonText ? 'start' : 'icon-only'\"></ion-icon>\n    <span *ngIf=\"!!clearButtonText\">{{clearButtonText}}</span>\n</ion-button>\n",
            host: {
                "[class.ionx--placeholder-visible]": "!hasValue()"
            },
            styles: [":host{position:relative;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-flex:1;flex:1;width:100%;--padding-top:10px;--padding-bottom:10px;--padding-start:0px;--padding-end:0px}:host .ionx--input{padding-top:var(--padding-top,10px);padding-bottom:var(--padding-bottom,9px);padding-left:var(--padding-start);padding-right:var(--padding-end);display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border:0;outline:0}:host.ionx--disabled .ionx--input,:host.ionx--placeholder-visible .ionx--input{opacity:var(--placeholder-opacity,var(--ionx-placeholder-opacity,.5))}:host-context(.md){--padding-bottom:11px}:host-context(.item-label-stacked){--padding-end:0px;--padding-start:0px;--padding-top:9px;--padding-bottom:9px}:host-context(.ios) .native-input{--padding-top:9px;--padding-bottom:8px}"]
        }),
        __param(3, Optional())
    ], DateTimePickerInput);
    return DateTimePickerInput;
}());
export { DateTimePickerInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9kYXRldGltZS1waWNrZXIvIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0osT0FBTyxFQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQVloRDtJQU1JLDZCQUNZLE9BQWdDLEVBQ2hDLElBQWlCLEVBQ2pCLGVBQWdDLEVBQ2xCLE9BQWtCO1FBSGhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFxQnBDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQWtCMUIsY0FBUyxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBdEN6RCxJQUFJLE9BQU8sRUFBRTtZQUNULE9BQU8sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQzs0QkFoQlEsbUJBQW1CO0lB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O0lBU3hCO1FBRkMsS0FBSyxFQUFFO1FBQ1AsV0FBVyxDQUFDLHNCQUFzQixDQUFDO3VEQUduQztJQVNEO1FBRkMsV0FBVyxDQUFDLHNCQUFzQixDQUFDO1FBQ25DLEtBQUssRUFBRTt1REFHUDtJQXVCRDtRQURDLEtBQUssRUFBRTs0REFRUDtJQU9EO1FBREMsS0FBSyxFQUFFOzJEQVFQO0lBT0Q7UUFEQyxLQUFLLEVBQUU7b0RBb0NQO0lBNEREO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3NEQVdqQztJQTNQUSxtQkFBbUI7UUFSL0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsMnRCQUF5QjtZQUV6QixJQUFJLEVBQUU7Z0JBQ0YsbUNBQW1DLEVBQUUsYUFBYTthQUNyRDs7U0FDSixDQUFDO1FBV08sV0FBQSxRQUFRLEVBQUUsQ0FBQTtPQVZOLG1CQUFtQixDQW9aL0I7SUFBRCwwQkFBQztDQUFBLEFBcFpELElBb1pDO1NBcFpZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9wdGlvbmFsLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQGNvLm1tb25zL2FuZ3VsYXItaW50bFwiO1xuaW1wb3J0IHtEYXRlVGltZXpvbmV9IGZyb20gXCJAY28ubW1vbnMvanMtdXRpbHMvY29yZVwiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtkZWZhdWx0RGF0ZVRpbWVGb3JtYXR9IGZyb20gXCIuL2RlZmF1bHQtZm9ybWF0c1wiO1xuaW1wb3J0IHtEYXRlVGltZVBpY2tlck92ZXJsYXl9IGZyb20gXCIuL292ZXJsYXlcIjtcblxudHlwZSBWYWx1ZSA9IERhdGUgfCBEYXRlVGltZXpvbmUgfCBudW1iZXI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZGF0ZXRpbWVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJpbnB1dC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJpbnB1dC5zY3NzXCJdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgXCJbY2xhc3MuaW9ueC0tcGxhY2Vob2xkZXItdmlzaWJsZV1cIjogXCIhaGFzVmFsdWUoKVwiXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlcklucHV0IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjdXJyZW50VGltZXpvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCgpLnJlc29sdmVkT3B0aW9ucygpLnRpbWVab25lO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIGludGw6IEludGxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgY29udHJvbDogTmdDb250cm9sXG4gICAgKSB7XG5cbiAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFwibmF0aXZlSW5wdXRcIiwge3JlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBuYXRpdmVJbnB1dDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgICBwcml2YXRlIG11dGVDb250cm9sT25DaGFuZ2U6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9saXN0SXRlbTogSFRNTElvbkl0ZW1FbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBfZGlzcGxheUZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnM7XG5cbiAgICBwcml2YXRlIF9waWNrZXJGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zO1xuXG4gICAgcHJpdmF0ZSBfdGV4dDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX3JlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF92YWx1ZTogRGF0ZVRpbWV6b25lO1xuXG4gICAgcHJpdmF0ZSBvcGVuZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPblRvdWNoZWQ6IEZ1bmN0aW9uO1xuXG5cbiAgICBASW5wdXQoKSBcbiAgICBvdmVybGF5VGl0bGU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFZhbHVlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGltZXpvbmUgY2Fubm90IGJlIGNoYW5nZWQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aW1lem9uZURpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVGltZXpvbmUsIHRoYXQgd2lsbCBiZSBzZXQsIHdoZW4gbmV3IHZhbHVlIGlzIHBpY2tlZCBmcm9tIHBpY2tlci5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRlZmF1bHRUaW1lem9uZTogc3RyaW5nO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIGNsZWFyQnV0dG9uVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgY2xlYXJCdXR0b25JY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIGNsZWFyQnV0dG9uVGV4dDogc3RyaW5nO1xuXG5cbiAgICBnZXQgdGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pb254LS1yZWFkb25seVwiKVxuICAgIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICAgIH1cblxuICAgIHNldCByZWFkb25seShyZG9ubHk6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcmVhZG9ubHkgPSAocmRvbmx5IGFzIGFueSkgPT09IFwiXCIgfHwgKHJkb25seSBhcyBhbnkpID09PSBcInRydWVcIiB8fCByZG9ubHkgPT09IHRydWUgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHRoaXMuc2V0dXBDc3MoKTtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pb254LS1kaXNhYmxlZFwiKVxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gKGRpc2FibGVkIGFzIGFueSkgPT09IFwiXCIgfHwgKGRpc2FibGVkIGFzIGFueSkgPT09IFwidHJ1ZVwiIHx8IGRpc2FibGVkID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB0aGlzLnNldHVwQ3NzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbGlzdEl0ZW0oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdEl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdEl0ZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLWl0ZW1cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGRpc3BsYXkgZm9ybWF0IG9mIHRoZSBkYXRlIGFuZCB0aW1lIGFzIHRleHQgdGhhdCBzaG93c1xuICAgICAqIHdpdGhpbiB0aGUgaXRlbS4gV2hlbiB0aGUgYHBpY2tlckZvcm1hdGAgaW5wdXQgaXMgbm90IHVzZWQsIHRoZW4gdGhlXG4gICAgICogYGRpc3BsYXlGb3JtYXRgIGlzIHVzZWQgZm9yIGJvdGggZGlzcGxheSB0aGUgZm9ybWF0dGVkIHRleHQsIGFuZCBkZXRlcm1pbmluZ1xuICAgICAqIHRoZSBkYXRldGltZS1waWNrZXIgcGlja2VyJ3MgY29sdW1ucy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBkaXNwbGF5Rm9ybWF0KGZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGxheUZvcm1hdCA9IHRoaXMuaW50bC5maW5kRm9ybWF0dGVyUHJlZGVmaW5lZE9wdGlvbnMoSW50bC5EYXRlVGltZUZvcm1hdCwgZm9ybWF0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlGb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZGlzcGxheUZvcm1hdCgpOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5Rm9ybWF0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHBpY2tlckZvcm1hdChmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5fcGlja2VyRm9ybWF0ID0gdGhpcy5pbnRsLmZpbmRGb3JtYXR0ZXJQcmVkZWZpbmVkT3B0aW9ucyhJbnRsLkRhdGVUaW1lRm9ybWF0LCBmb3JtYXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGlja2VyRm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHBpY2tlckZvcm1hdCgpOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJGb3JtYXQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWUodmFsdWU6IFZhbHVlKSB7XG5cbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpICE9ICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlICE9PSB0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5nZXRUaW1lKCkgIT09IHRoaXMuX3ZhbHVlLmRhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlVGltZXpvbmUgJiYgKHRoaXMuX3ZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUuZGF0ZS5nZXRUaW1lKCkgIT09IHRoaXMuX3ZhbHVlLmRhdGUuZ2V0VGltZSgpIHx8IHZhbHVlLnRpbWV6b25lICE9PSB0aGlzLl92YWx1ZS50aW1lem9uZSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXcgRGF0ZVRpbWV6b25lKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3IERhdGVUaW1lem9uZSh2YWx1ZS5nZXRUaW1lKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZVRpbWV6b25lKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ldyBEYXRlVGltZXpvbmUobmV3IERhdGUodmFsdWUuZGF0ZS5nZXRUaW1lKCkpLCB2YWx1ZS50aW1lem9uZSA9PT0gXCJjdXJyZW50XCIgPyBEYXRlVGltZVBpY2tlcklucHV0LmN1cnJlbnRUaW1lem9uZSgpIDogdmFsdWUudGltZXpvbmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5pb25DaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICAgICAgdGhpcy5jaGVja0xpc3RJdGVtSGFzVmFsdWUoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uQ2hhbmdlICYmICF0aGlzLm11dGVDb250cm9sT25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubXV0ZUNvbnRyb2xPbkNoYW5nZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBWYWx1ZSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWV6b25lKG5ldyBEYXRlKHRoaXMuX3ZhbHVlLmRhdGUuZ2V0VGltZSgpKSwgdGhpcy5fdmFsdWUudGltZXpvbmUpO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0xpc3RJdGVtSGFzVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1oYXMtdmFsdWVcIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaXRlbS1oYXMtdmFsdWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRleHQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGlzcGxheUZvcm1hdCB8fCBkZWZhdWx0RGF0ZVRpbWVGb3JtYXQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWUudGltZXpvbmUpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRpbWVab25lID0gdGhpcy5fdmFsdWUudGltZXpvbmU7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMudGltZVpvbmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGltZVpvbmVOYW1lID0gXCJzaG9ydFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLl92YWx1ZS50aW1lem9uZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudGltZVpvbmUgPSBcIlVUQ1wiO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudGltZVpvbmVOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gdGhpcy5pbnRsLmRhdGVUaW1lRm9ybWF0KHRoaXMuX3ZhbHVlLCBvcHRpb25zKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgY2xpY2tlZChldjogVUlFdmVudCkge1xuXG4gICAgICAgIGlmIChldi5kZXRhaWwgPT09IDAgfHwgdGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLm9wZW4oZXYpO1xuICAgIH1cblxuICAgIC8qcHJvdGVjdGVkKi8gY2xlYXJCdXR0b25DbGlja2VkKGV2ZW50OiBVSUV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuY2xlYXJWYWx1ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgb3BlbihldmVudD86IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5vcGVuZWQgfHwgdGhpcy5yZWFkb25seSApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBmb3JtYXRPcHRpb25zID0gdGhpcy5waWNrZXJGb3JtYXQgfHwgdGhpcy5kaXNwbGF5Rm9ybWF0IHx8IGRlZmF1bHREYXRlVGltZUZvcm1hdDtcblxuICAgICAgICBsZXQgdGltZXpvbmUgPSB0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLnRpbWV6b25lIDogdGhpcy5kZWZhdWx0VGltZXpvbmU7XG4gICAgICAgIGlmICh0aW1lem9uZSA9PT0gXCJjdXJyZW50XCIpIHtcbiAgICAgICAgICAgIHRpbWV6b25lID0gRGF0ZVRpbWVQaWNrZXJJbnB1dC5jdXJyZW50VGltZXpvbmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWx1ZTogRGF0ZSA9IHRoaXMuX3ZhbHVlICYmIHRoaXMuX3ZhbHVlLmRhdGUgPyB0aGlzLl92YWx1ZS5kYXRlIDogbmV3IERhdGUoKTsge1xuICAgICAgICAgICAgaWYgKCF0aW1lem9uZSB8fCB0aW1lem9uZSA9PT0gXCJVVENcIikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUoRGF0ZS5VVEModmFsdWUuZ2V0VVRDRnVsbFllYXIoKSwgdmFsdWUuZ2V0VVRDTW9udGgoKSwgdmFsdWUuZ2V0VVRDRGF0ZSgpLCB2YWx1ZS5nZXRVVENIb3VycygpLCB2YWx1ZS5nZXRVVENNaW51dGVzKCksIDAsIDApKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZS5nZXRUaW1lKCkgKyAoRGF0ZVRpbWV6b25lLnRpbWV6b25lT2Zmc2V0KHRpbWV6b25lLCB2YWx1ZSkgKiA2MCAqIDEwMDAgKiAtMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG92ZXJsYXlUaXRsZTogc3RyaW5nID0gdGhpcy5vdmVybGF5VGl0bGU7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtICYmICFvdmVybGF5VGl0bGUpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IHRoaXMubGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcImlvbi1sYWJlbFwiKTtcbiAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgIG92ZXJsYXlUaXRsZSA9IGxhYmVsLmlubmVyVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xuICAgICAgICAgICAgY29tcG9uZW50OiBEYXRlVGltZVBpY2tlck92ZXJsYXksXG4gICAgICAgICAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgICAgICAgICAgIGZvcm1hdE9wdGlvbnM6IGZvcm1hdE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHRpbWV6b25lOiB0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLnRpbWV6b25lIDogKHRoaXMuX3ZhbHVlID09PSB1bmRlZmluZWQgPyAodGhpcy5kZWZhdWx0VGltZXpvbmUgPT09IFwiY3VycmVudFwiID8gRGF0ZVRpbWVQaWNrZXJJbnB1dC5jdXJyZW50VGltZXpvbmUoKSA6IHRoaXMuZGVmYXVsdFRpbWV6b25lKSA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgdGltZXpvbmVEaXNhYmxlZDogdGhpcy50aW1lem9uZURpc2FibGVkLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBvdmVybGF5VGl0bGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWNrZHJvcERpc21pc3M6IHRydWUsIFxuICAgICAgICAgICAgc2hvd0JhY2tkcm9wOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG92ZXJsYXkucHJlc2VudCgpO1xuXG4gICAgICAgIHRoaXMub3ZlcmxheUNsb3NlZCgoYXdhaXQgb3ZlcmxheS5vbkRpZERpc21pc3MoKSkuZGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvdmVybGF5Q2xvc2VkKG5ld1ZhbHVlOiBEYXRlVGltZXpvbmUpIHtcblxuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xPblRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMubmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm5hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMubXV0ZUNvbnRyb2xPbkNoYW5nZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIERhdGVUaW1lem9uZSB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250cm9sT25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgbmF0aXZlSW5wdXRGb2N1c2VkKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVkICYmICF0aGlzLl9yZWFkb25seSAmJiAhdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJpdGVtLWhhcy1mb2N1c1wiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taGFzLWZvY3VzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF0aXZlSW5wdXRCbHVyZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtLWhhcy1mb2N1c1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qcHJpdmF0ZSovIGlucHV0S2V5VXBEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJUYWJcIiB8fCBldmVudC5rZXkgPT09IFwiU2hpZnRcIiB8fCBldmVudC5rZXkgPT0gXCJBbHRcIiB8fCBldmVudC5rZXkgPT0gXCJDdHJsXCIgfHwgZXZlbnQua2V5ID09PSBcIk1ldGFcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB0aGlzLm9wZW4oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgICAgIGlmIChjaGFuZ2VzW1wiZGlzcGxheUZvcm1hdFwiXSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgIHRoaXMuc2V0dXBDc3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwQ3NzKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWlucHV0XCIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taW50ZXJhY3RpdmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuIl19