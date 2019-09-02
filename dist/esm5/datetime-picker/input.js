import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewChild } from "@angular/core";
import { NgControl } from "@angular/forms";
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
    Object.defineProperty(DateTimePickerInput.prototype, "disabled", {
        /**
         * Whether or not the datetime-picker component is disabled.
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
                this.listItem.classList.add("has-value");
            }
            else {
                this.listItem.classList.remove("has-value");
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
    /*protected*/ DateTimePickerInput.prototype.clicked = function (ev) {
        if (ev.detail === 0 || this.disabled || this.readonly) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open(ev);
    };
    /*protected*/ DateTimePickerInput.prototype.keyuped = function () {
        this.open(undefined);
    };
    DateTimePickerInput.prototype.open = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var formatOptions, timezone, value, overlayTitle, label, overlay, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.disabled || this.opened || this.readonly) {
                            return [2 /*return*/];
                        }
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
        if (newValue) {
            this.value = newValue;
        }
        if (this.controlOnTouched) {
            this.controlOnTouched();
        }
        if (this.listItem) {
            this.listItem.classList.add("item-has-focus");
            this.nativeInput.nativeElement.focus();
        }
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
            if (!this.listItem.classList.contains("item-has-focus")) {
                this.listItem.classList.add("item-has-focus");
                // if (!this.hasValue()) {
                //     this.open();
                // }
            }
        }
    };
    DateTimePickerInput.prototype.nativeInputBlured = function () {
        if (this.listItem) {
            this.listItem.classList.remove("item-has-focus");
        }
    };
    DateTimePickerInput.prototype.ngOnChanges = function (changes) {
        if (changes["displayFormat"]) {
            this.updateText();
        }
        if (changes["readonly"] || changes["disabled"]) {
            this.setupCss();
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
    DateTimePickerInput.prototype.ngAfterContentChecked = function () {
        //this.setItemInputControlCss();
    };
    var DateTimePickerInput_1;
    tslib_1.__decorate([
        ViewChild("nativeInput", { read: ElementRef, static: true }),
        tslib_1.__metadata("design:type", ElementRef)
    ], DateTimePickerInput.prototype, "nativeInput", void 0);
    tslib_1.__decorate([
        HostBinding("class.datetime-disabled"),
        tslib_1.__metadata("design:type", Boolean)
    ], DateTimePickerInput.prototype, "_disabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], DateTimePickerInput.prototype, "readonly", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DateTimePickerInput.prototype, "overlayTitle", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DateTimePickerInput.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], DateTimePickerInput.prototype, "ionChange", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], DateTimePickerInput.prototype, "timezoneDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DateTimePickerInput.prototype, "defaultTimezone", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DateTimePickerInput.prototype, "disabled", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DateTimePickerInput.prototype, "displayFormat", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DateTimePickerInput.prototype, "pickerFormat", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DateTimePickerInput.prototype, "value", null);
    tslib_1.__decorate([
        HostListener("click", ["$event"]),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [UIEvent]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DateTimePickerInput.prototype, "clicked", null);
    tslib_1.__decorate([
        HostListener("keyup.space"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], DateTimePickerInput.prototype, "keyuped", null);
    DateTimePickerInput = DateTimePickerInput_1 = tslib_1.__decorate([
        Component({
            selector: "ionx-datetime",
            template: "\n        <input #nativeInput\n               type=\"text\" \n               class=\"native-input\" \n               readonly [attr.disabled]=\"disabled || null\"\n               [attr.placeholder]=\"placeholder || null\"\n               [attr.value]=\"text || null\"\n               (focus)=\"nativeInputFocused()\" \n               (blur)=\"nativeInputBlured()\"/>\n    ",
            styles: [":host{position:relative;display:block;flex:1;width:100%;--padding-end:16px;--padding-start:16px;--padding-top:10px;--padding-bottom:10px}:host .native-input{padding-top:var(--padding-top,10px);padding-bottom:var(--padding-bottom,9px);padding-left:var(--padding-start,0);padding-right:var(--padding-end,0);display:inline-block;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:0;background:0 0;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host .native-input::-webkit-input-placeholder{opacity:.5}:host .native-input::-moz-placeholder{opacity:.5}:host .native-input:-ms-input-placeholder{opacity:.5}:host .native-input::-ms-input-placeholder{opacity:.5}:host .native-input::placeholder{opacity:.5}:host .native-input:-webkit-autofill{background-color:transparent}:host-context(.md){--padding-bottom:11px}:host-context(.item-label-stacked){--padding-end:0px;--padding-start:0px;--padding-top:9px;--padding-bottom:9px}:host-context(.ios) .native-input{--padding-top:9px;--padding-bottom:8px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            IntlService,
            ModalController,
            NgControl])
    ], DateTimePickerInput);
    return DateTimePickerInput;
}());
export { DateTimePickerInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy8iLCJzb3VyY2VzIjpbImRhdGV0aW1lLXBpY2tlci9pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pKLE9BQU8sRUFBdUIsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBa0JoRDtJQU1JLDZCQUNZLE9BQWdDLEVBQ2hDLElBQWlCLEVBQ2pCLGVBQWdDLEVBQzlCLE9BQWtCO1FBSHBCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQzlCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUEyQ3ZCLGNBQVMsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXhDekQsSUFBSSxPQUFPLEVBQUU7WUFDVCxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUNoQztJQUNMLENBQUM7NEJBaEJRLG1CQUFtQjtJQUViLG1DQUFlLEdBQTlCO1FBQ0ksT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDaEUsQ0FBQztJ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QUFFOzs0REFDWTtJQUdwQjtRQURDLE1BQU0sRUFBRTswQ0FDVyxZQUFZOzBEQUE2QjtJQU03RDtRQURDLEtBQUssRUFBRTs7aUVBQ2tCO0lBTTFCO1FBREMsS0FBSyxFQUFFOztnRUFDZ0I7SUFXeEI7UUFEQyxLQUFLLEVBQUU7Ozt1REFHUDtJQXNCRDtRQURDLEtBQUssRUFBRTs7OzREQVFQO0lBT0Q7UUFEQyxLQUFLLEVBQUU7OzsyREFRUDtJQU9EO1FBREMsS0FBSyxFQUFFOzs7b0RBb0NQO0lBNERhO1FBRGIsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztpREFDUixPQUFPOztzREFVaEM7SUFHYTtRQURiLFlBQVksQ0FBQyxhQUFhLENBQUM7Ozs7c0RBRzNCO0lBOU9RLG1CQUFtQjtRQWQvQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsc1hBU1Q7O1NBRUosQ0FBQztpREFRdUIsVUFBVTtZQUNiLFdBQVc7WUFDQSxlQUFlO1lBQ3JCLFNBQVM7T0FWdkIsbUJBQW1CLENBMlkvQjtJQUFELDBCQUFDO0NBQUEsQUEzWUQsSUEyWUM7U0EzWVksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0NvbnRyb2x9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBjby5tbW9ucy9hbmd1bGFyLWludGxcIjtcbmltcG9ydCB7RGF0ZVRpbWV6b25lfSBmcm9tIFwiQGNvLm1tb25zL2pzLXV0aWxzL2NvcmVcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7ZGVmYXVsdERhdGVUaW1lRm9ybWF0fSBmcm9tIFwiLi9kZWZhdWx0LWZvcm1hdHNcIjtcbmltcG9ydCB7RGF0ZVRpbWVQaWNrZXJPdmVybGF5fSBmcm9tIFwiLi9vdmVybGF5XCI7XG5cbnR5cGUgVmFsdWUgPSBEYXRlIHwgRGF0ZVRpbWV6b25lIHwgbnVtYmVyO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWRhdGV0aW1lXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlucHV0ICNuYXRpdmVJbnB1dFxuICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgIGNsYXNzPVwibmF0aXZlLWlucHV0XCIgXG4gICAgICAgICAgICAgICByZWFkb25seSBbYXR0ci5kaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBudWxsXCJcbiAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyIHx8IG51bGxcIlxuICAgICAgICAgICAgICAgW2F0dHIudmFsdWVdPVwidGV4dCB8fCBudWxsXCJcbiAgICAgICAgICAgICAgIChmb2N1cyk9XCJuYXRpdmVJbnB1dEZvY3VzZWQoKVwiIFxuICAgICAgICAgICAgICAgKGJsdXIpPVwibmF0aXZlSW5wdXRCbHVyZWQoKVwiLz5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogW1wiaW5wdXQuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlcklucHV0IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjdXJyZW50VGltZXpvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCgpLnJlc29sdmVkT3B0aW9ucygpLnRpbWVab25lO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICBwcml2YXRlIGludGw6IEludGxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxuICAgICAgICBwcm90ZWN0ZWQgY29udHJvbDogTmdDb250cm9sXG4gICAgKSB7XG5cbiAgICAgICAgaWYgKGNvbnRyb2wpIHtcbiAgICAgICAgICAgIGNvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG11dGVDb250cm9sT25DaGFuZ2U6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9saXN0SXRlbTogSFRNTElvbkl0ZW1FbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBfZGlzcGxheUZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnM7XG5cbiAgICBwcml2YXRlIF9waWNrZXJGb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zO1xuXG4gICAgQFZpZXdDaGlsZChcIm5hdGl2ZUlucHV0XCIsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgbmF0aXZlSW5wdXQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gICAgcHJpdmF0ZSBfdGV4dDogc3RyaW5nO1xuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuZGF0ZXRpbWUtZGlzYWJsZWRcIilcbiAgICAvKnByaXZhdGUqLyBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF92YWx1ZTogRGF0ZVRpbWV6b25lO1xuXG4gICAgcHJpdmF0ZSBvcGVuZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgICBwcml2YXRlIGNvbnRyb2xPblRvdWNoZWQ6IEZ1bmN0aW9uO1xuXG5cbiAgICBASW5wdXQoKVxuICAgIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgXG4gICAgb3ZlcmxheVRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxWYWx1ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRpbWV6b25lIGNhbm5vdCBiZSBjaGFuZ2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGltZXpvbmVEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRpbWV6b25lLCB0aGF0IHdpbGwgYmUgc2V0LCB3aGVuIG5ldyB2YWx1ZSBpcyBwaWNrZWQgZnJvbSBwaWNrZXIuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkZWZhdWx0VGltZXpvbmU6IHN0cmluZztcblxuXG4gICAgZ2V0IHRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSBkYXRldGltZS1waWNrZXIgY29tcG9uZW50IGlzIGRpc2FibGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQgfHwgZGlzYWJsZWQgPT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgbGlzdEl0ZW0oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdEl0ZW07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdEl0ZW0gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5jbG9zZXN0KFwiaW9uLWl0ZW1cIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGRpc3BsYXkgZm9ybWF0IG9mIHRoZSBkYXRlIGFuZCB0aW1lIGFzIHRleHQgdGhhdCBzaG93c1xuICAgICAqIHdpdGhpbiB0aGUgaXRlbS4gV2hlbiB0aGUgYHBpY2tlckZvcm1hdGAgaW5wdXQgaXMgbm90IHVzZWQsIHRoZW4gdGhlXG4gICAgICogYGRpc3BsYXlGb3JtYXRgIGlzIHVzZWQgZm9yIGJvdGggZGlzcGxheSB0aGUgZm9ybWF0dGVkIHRleHQsIGFuZCBkZXRlcm1pbmluZ1xuICAgICAqIHRoZSBkYXRldGltZS1waWNrZXIgcGlja2VyJ3MgY29sdW1ucy5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBkaXNwbGF5Rm9ybWF0KGZvcm1hdDogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMpIHtcblxuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5fZGlzcGxheUZvcm1hdCA9IHRoaXMuaW50bC5maW5kRm9ybWF0dGVyUHJlZGVmaW5lZE9wdGlvbnMoSW50bC5EYXRlVGltZUZvcm1hdCwgZm9ybWF0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlGb3JtYXQgPSBmb3JtYXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZGlzcGxheUZvcm1hdCgpOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5Rm9ybWF0O1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHBpY2tlckZvcm1hdChmb3JtYXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXQgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5fcGlja2VyRm9ybWF0ID0gdGhpcy5pbnRsLmZpbmRGb3JtYXR0ZXJQcmVkZWZpbmVkT3B0aW9ucyhJbnRsLkRhdGVUaW1lRm9ybWF0LCBmb3JtYXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGlja2VyRm9ybWF0ID0gZm9ybWF0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHBpY2tlckZvcm1hdCgpOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJGb3JtYXQ7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgdmFsdWUodmFsdWU6IFZhbHVlKSB7XG5cbiAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpICE9ICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmICh0aGlzLl92YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlICE9PSB0aGlzLl92YWx1ZS5kYXRlLmdldFRpbWUoKSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSAmJiAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5nZXRUaW1lKCkgIT09IHRoaXMuX3ZhbHVlLmRhdGUuZ2V0VGltZSgpKSkge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlVGltZXpvbmUgJiYgKHRoaXMuX3ZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUuZGF0ZS5nZXRUaW1lKCkgIT09IHRoaXMuX3ZhbHVlLmRhdGUuZ2V0VGltZSgpIHx8IHZhbHVlLnRpbWV6b25lICE9PSB0aGlzLl92YWx1ZS50aW1lem9uZSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXcgRGF0ZVRpbWV6b25lKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3IERhdGVUaW1lem9uZSh2YWx1ZS5nZXRUaW1lKCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZVRpbWV6b25lKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IG5ldyBEYXRlVGltZXpvbmUobmV3IERhdGUodmFsdWUuZGF0ZS5nZXRUaW1lKCkpLCB2YWx1ZS50aW1lem9uZSA9PT0gXCJjdXJyZW50XCIgPyBEYXRlVGltZVBpY2tlcklucHV0LmN1cnJlbnRUaW1lem9uZSgpIDogdmFsdWUudGltZXpvbmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5pb25DaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICAgICAgdGhpcy5jaGVja0xpc3RJdGVtSGFzVmFsdWUoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uQ2hhbmdlICYmICF0aGlzLm11dGVDb250cm9sT25DaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xPbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubXV0ZUNvbnRyb2xPbkNoYW5nZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBWYWx1ZSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZVRpbWV6b25lKG5ldyBEYXRlKHRoaXMuX3ZhbHVlLmRhdGUuZ2V0VGltZSgpKSwgdGhpcy5fdmFsdWUudGltZXpvbmUpO1xuICAgIH1cblxuICAgIGNsZWFyVmFsdWUoKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbE9uVG91Y2hlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sT25Ub3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0xpc3RJdGVtSGFzVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaGFzLXZhbHVlXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImhhcy12YWx1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVGV4dCgpIHtcblxuICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kaXNwbGF5Rm9ybWF0IHx8IGRlZmF1bHREYXRlVGltZUZvcm1hdCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZS50aW1lem9uZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMudGltZVpvbmUgPSB0aGlzLl92YWx1ZS50aW1lem9uZTtcblxuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy50aW1lWm9uZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50aW1lWm9uZU5hbWUgPSBcInNob3J0XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3ZhbHVlLnRpbWV6b25lKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50aW1lWm9uZSA9IFwiVVRDXCI7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy50aW1lWm9uZU5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSB0aGlzLmludGwuZGF0ZVRpbWVGb3JtYXQodGhpcy5fdmFsdWUsIG9wdGlvbnMpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIsIFtcIiRldmVudFwiXSlcbiAgICAvKnByb3RlY3RlZCovIGNsaWNrZWQoZXY6IFVJRXZlbnQpIHtcblxuICAgICAgICBpZiAoZXYuZGV0YWlsID09PSAwIHx8IHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5vcGVuKGV2KTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwia2V5dXAuc3BhY2VcIilcbiAgICAvKnByb3RlY3RlZCovIGtleXVwZWQoKSB7XG4gICAgICAgIHRoaXMub3Blbih1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgb3BlbihldmVudD86IEV2ZW50KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5vcGVuZWQgfHwgdGhpcy5yZWFkb25seSApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvcm1hdE9wdGlvbnMgPSB0aGlzLnBpY2tlckZvcm1hdCB8fCB0aGlzLmRpc3BsYXlGb3JtYXQgfHwgZGVmYXVsdERhdGVUaW1lRm9ybWF0O1xuXG4gICAgICAgIGxldCB0aW1lem9uZSA9IHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUudGltZXpvbmUgOiB0aGlzLmRlZmF1bHRUaW1lem9uZTtcbiAgICAgICAgaWYgKHRpbWV6b25lID09PSBcImN1cnJlbnRcIikge1xuICAgICAgICAgICAgdGltZXpvbmUgPSBEYXRlVGltZVBpY2tlcklucHV0LmN1cnJlbnRUaW1lem9uZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbHVlOiBEYXRlID0gdGhpcy5fdmFsdWUgJiYgdGhpcy5fdmFsdWUuZGF0ZSA/IHRoaXMuX3ZhbHVlLmRhdGUgOiBuZXcgRGF0ZSgpOyB7XG4gICAgICAgICAgICBpZiAoIXRpbWV6b25lIHx8IHRpbWV6b25lID09PSBcIlVUQ1wiKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShEYXRlLlVUQyh2YWx1ZS5nZXRVVENGdWxsWWVhcigpLCB2YWx1ZS5nZXRVVENNb250aCgpLCB2YWx1ZS5nZXRVVENEYXRlKCksIHZhbHVlLmdldFVUQ0hvdXJzKCksIHZhbHVlLmdldFVUQ01pbnV0ZXMoKSwgMCwgMCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlLmdldFRpbWUoKSArIChEYXRlVGltZXpvbmUudGltZXpvbmVPZmZzZXQodGltZXpvbmUsIHZhbHVlKSAqIDYwICogMTAwMCAqIC0xKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3ZlcmxheVRpdGxlOiBzdHJpbmcgPSB0aGlzLm92ZXJsYXlUaXRsZTtcbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0gJiYgIW92ZXJsYXlUaXRsZSkge1xuICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5saXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiaW9uLWxhYmVsXCIpO1xuICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgb3ZlcmxheVRpdGxlID0gbGFiZWwuaW5uZXJUZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XG4gICAgICAgICAgICBjb21wb25lbnQ6IERhdGVUaW1lUGlja2VyT3ZlcmxheSxcbiAgICAgICAgICAgIGNvbXBvbmVudFByb3BzOiB7XG4gICAgICAgICAgICAgICAgZm9ybWF0T3B0aW9uczogZm9ybWF0T3B0aW9ucyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgdGltZXpvbmU6IHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUudGltZXpvbmUgOiAodGhpcy5fdmFsdWUgPT09IHVuZGVmaW5lZCA/ICh0aGlzLmRlZmF1bHRUaW1lem9uZSA9PT0gXCJjdXJyZW50XCIgPyBEYXRlVGltZVBpY2tlcklucHV0LmN1cnJlbnRUaW1lem9uZSgpIDogdGhpcy5kZWZhdWx0VGltZXpvbmUpIDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICB0aW1lem9uZURpc2FibGVkOiB0aGlzLnRpbWV6b25lRGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgdGl0bGU6IG92ZXJsYXlUaXRsZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhY2tkcm9wRGlzbWlzczogdHJ1ZSwgXG4gICAgICAgICAgICBzaG93QmFja2Ryb3A6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3ZlcmxheS5wcmVzZW50KCk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5Q2xvc2VkKChhd2FpdCBvdmVybGF5Lm9uRGlkRGlzbWlzcygpKS5kYXRhKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG92ZXJsYXlDbG9zZWQobmV3VmFsdWU6IERhdGVUaW1lem9uZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xPblRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbE9uVG91Y2hlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW0taGFzLWZvY3VzXCIpO1xuICAgICAgICAgICAgdGhpcy5uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLm11dGVDb250cm9sT25DaGFuZ2UgPSB0cnVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUgfHwgdmFsdWUgaW5zdGFuY2VvZiBEYXRlVGltZXpvbmUgfHwgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udHJvbE9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRyb2xPblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIG5hdGl2ZUlucHV0Rm9jdXNlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5jb250YWlucyhcIml0ZW0taGFzLWZvY3VzXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1oYXMtZm9jdXNcIik7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiAoIXRoaXMuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXRpdmVJbnB1dEJsdXJlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIml0ZW0taGFzLWZvY3VzXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgICAgIGlmIChjaGFuZ2VzW1wiZGlzcGxheUZvcm1hdFwiXSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlc1tcInJlYWRvbmx5XCJdIHx8IGNoYW5nZXNbXCJkaXNhYmxlZFwiXSkge1xuICAgICAgICAgICAgdGhpcy5zZXR1cENzcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuICAgICAgICB0aGlzLnNldHVwQ3NzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cENzcygpIHtcblxuICAgICAgICBpZiAodGhpcy5saXN0SXRlbSkge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pbnB1dFwiKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWludGVyYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICAvL3RoaXMuc2V0SXRlbUlucHV0Q29udHJvbENzcygpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgc2V0SXRlbUlucHV0Q29udHJvbENzcygpIHtcbiAgICAvLyAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW07XG4gICAgLy8gICAgIGlmIChpdGVtICYmIHRoaXMuY29udHJvbCkge1xuICAgIC8vICAgICAgICAgdGhpcy5zZXRDb250cm9sQ3NzKGl0ZW0sIHRoaXMuY29udHJvbCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyBwcml2YXRlIHNldENvbnRyb2xDc3MoZWxlbWVudDogYW55LCBjb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICAvLyAgICAgZWxlbWVudC5zZXRFbGVtZW50Q2xhc3MoXCJuZy11bnRvdWNoZWRcIiwgY29udHJvbC51bnRvdWNoZWQpO1xuICAgIC8vICAgICBlbGVtZW50LnNldEVsZW1lbnRDbGFzcyhcIm5nLXRvdWNoZWRcIiwgY29udHJvbC50b3VjaGVkKTtcbiAgICAvLyAgICAgZWxlbWVudC5zZXRFbGVtZW50Q2xhc3MoXCJuZy1wcmlzdGluZVwiLCBjb250cm9sLnByaXN0aW5lKTtcbiAgICAvLyAgICAgZWxlbWVudC5zZXRFbGVtZW50Q2xhc3MoXCJuZy1kaXJ0eVwiLCBjb250cm9sLmRpcnR5KTtcbiAgICAvLyAgICAgZWxlbWVudC5zZXRFbGVtZW50Q2xhc3MoXCJuZy12YWxpZFwiLCBjb250cm9sLnZhbGlkKTtcbiAgICAvLyAgICAgZWxlbWVudC5zZXRFbGVtZW50Q2xhc3MoXCJuZy1pbnZhbGlkXCIsICFjb250cm9sLnZhbGlkICYmIGNvbnRyb2wuZW5hYmxlZCk7XG4gICAgLy8gfVxuXG5cbn1cbiJdfQ==