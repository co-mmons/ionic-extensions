(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@co.mmons/angular-extensions/browser/match-media'), require('@co.mmons/angular-intl'), require('@ionic/angular'), require('@co.mmons/ionic-extensions/scroll')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/form-helper', ['exports', '@angular/common', '@angular/core', '@angular/forms', '@co.mmons/angular-extensions/browser/match-media', '@co.mmons/angular-intl', '@ionic/angular', '@co.mmons/ionic-extensions/scroll'], factory) :
    (global = global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons['ionic-extensions'] = global.co.mmons['ionic-extensions'] || {}, global.co.mmons['ionic-extensions']['form-helper'] = {}), global.ng.common, global.ng.core, global.ng.forms, global.matchMedia, global.angularIntl, global.angular, global.scroll));
}(this, (function (exports, common, core, forms, matchMedia, angularIntl, angular, scroll) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var FormHeading = /** @class */ (function () {
        function FormHeading() {
        }
        __decorate([
            core.HostBinding("attr.sticky"),
            core.Input()
        ], FormHeading.prototype, "sticky", void 0);
        FormHeading = __decorate([
            core.Component({
                selector: "ionx-form-heading",
                template: "\n        <ng-content select=\"ion-item\"></ng-content>\n        <div ionx--under>\n            <ng-content></ng-content>\n        </div>\n    ",
                styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start:0px;--padding-end:0px;--inner-padding-end:16px;--inner-padding-start:16px}:host ::ng-deep ion-item>ion-label{font-size:.9rem;font-weight:500}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:-webkit-sticky;position:sticky;top:0;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start:8px;--padding-end:8px;--inner-padding-end:0px;--inner-padding-start:0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}:host-context(.ios) ::ng-deep ion-item.item-label>ion-label{font-size:.8rem;letter-spacing:1px;text-transform:uppercase}"]
            })
        ], FormHeading);
        return FormHeading;
    }());

    var FormHelper = /** @class */ (function () {
        function FormHelper(element, ngForm, formGroupDirective) {
            this.element = element;
            this.ngForm = ngForm;
            this.formGroupDirective = formGroupDirective;
        }
        Object.defineProperty(FormHelper.prototype, "readonly", {
            get: function () {
                return this.element.nativeElement.hasAttribute("readonly");
            },
            set: function (readonly) {
                if (readonly) {
                    this.element.nativeElement.setAttribute("readonly", "");
                }
                else {
                    this.element.nativeElement.removeAttribute("readonly");
                }
            },
            enumerable: true,
            configurable: true
        });
        FormHelper.prototype.markAsReadonly = function () {
            this.readonly = true;
        };
        Object.defineProperty(FormHelper.prototype, "busy", {
            get: function () {
                return this.element.nativeElement.hasAttribute("busy");
            },
            set: function (busy) {
                if (busy) {
                    this.element.nativeElement.setAttribute("busy", "");
                }
                else {
                    this.element.nativeElement.removeAttribute("busy");
                }
            },
            enumerable: true,
            configurable: true
        });
        FormHelper.prototype.markAsBusy = function () {
            this.busy = true;
        };
        FormHelper.prototype.formControlName = function (name) {
            var e_1, _a;
            try {
                for (var _b = __values(this.contentControls.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var a = _c.value;
                    if (a.name == name) {
                        return a;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        Object.defineProperty(FormHelper.prototype, "formGroup", {
            get: function () {
                return this.formGroupDirective ? this.formGroupDirective.form : undefined;
            },
            enumerable: true,
            configurable: true
        });
        FormHelper.prototype.validateAll = function (markAs) {
            var e_2, _a;
            if (markAs === void 0) { markAs = "touched"; }
            if (!this.formGroupDirective) {
                return;
            }
            for (var controlName in this.formGroup.controls) {
                var control = this.formGroup.controls[controlName];
                if (markAs == "touched") {
                    control.markAsTouched();
                }
                if (markAs == "dirty") {
                    control.markAsDirty();
                }
                control.updateValueAndValidity();
            }
            try {
                for (var _b = __values(this.contentControls.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var control = _c.value;
                    if (!control.valid) {
                        this.focusImpl(control);
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        FormHelper.prototype.focusImpl = function (control, scroll$1) {
            var e_3, _a;
            if (scroll$1 === void 0) { scroll$1 = true; }
            if (typeof control == "string" && this.formGroupDirective) {
                try {
                    for (var _b = __values(this.formGroupDirective.directives), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        if (c.name == control) {
                            control = c;
                            break;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            var element;
            if (control instanceof forms.FormControlName) {
                control = control.valueAccessor;
            }
            if (control["el"] instanceof core.ElementRef) {
                element = control["el"].nativeElement;
            }
            if (control["_elementRef"] instanceof core.ElementRef) {
                element = control["_elementRef"].nativeElement;
            }
            // element to focus
            if (element) {
                if (element["setFocus"]) {
                    element["setFocus"]();
                }
                else {
                    var focusable = element;
                    var realInput = (element.shadowRoot && element.shadowRoot.querySelector(".native-input")) || element.querySelector(".native-input");
                    if (realInput) {
                        focusable = realInput;
                    }
                    focusable.focus();
                }
            }
            if (scroll$1 && element) {
                scroll.scrollIntoView(element.closest("ion-item") || element);
            }
        };
        FormHelper.prototype.focus = function (formControlName, scrollIntoView) {
            if (scrollIntoView === void 0) { scrollIntoView = true; }
            this.focusImpl(formControlName, scrollIntoView);
        };
        FormHelper.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: forms.NgForm, decorators: [{ type: core.Optional }] },
            { type: forms.FormGroupDirective, decorators: [{ type: core.Optional }] }
        ]; };
        __decorate([
            core.Input()
        ], FormHelper.prototype, "readonly", null);
        __decorate([
            core.Input()
        ], FormHelper.prototype, "busy", null);
        __decorate([
            core.ContentChildren(forms.FormControlName, { descendants: true })
        ], FormHelper.prototype, "contentControls", void 0);
        FormHelper = __decorate([
            core.Directive({
                selector: "[ionx-form-helper], [ionxFormHelper]",
                exportAs: "ionxFormHelper"
            }),
            __param(1, core.Optional()), __param(2, core.Optional())
        ], FormHelper);
        return FormHelper;
    }());

    var FormItem = /** @class */ (function () {
        function FormItem() {
        }
        FormItem = __decorate([
            core.Component({
                selector: "ionx-form-item",
                template: "<ng-content select=\"ion-item\"></ng-content><ng-content select=\"ionx-form-item-error\"></ng-content><ng-content select=\"ionx-form-item-hint\"></ng-content><ng-content></ng-content>",
                styles: [":host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host ::ng-deep ion-item{--padding-start:0px;--inner-padding-end:0px;--inner-padding-start:0px;--padding-end:0px;--inner-border-width:0px;--border-width:0px 0px 1px 0px}"]
            })
        ], FormItem);
        return FormItem;
    }());

    var FormItemError = /** @class */ (function () {
        function FormItemError(formGroup) {
            this.formGroup = formGroup;
            this.markedAs = "touched";
        }
        Object.defineProperty(FormItemError.prototype, "control", {
            get: function () {
                if (typeof this._control === "string") {
                    return this.formGroup.form && this.formGroup.form.controls[this._control];
                }
                else {
                    return this._control;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormItemError.prototype, "controlOrName", {
            set: function (control) {
                this._control = control;
            },
            enumerable: true,
            configurable: true
        });
        FormItemError.ctorParameters = function () { return [
            { type: forms.FormGroupDirective }
        ]; };
        __decorate([
            core.Input()
        ], FormItemError.prototype, "icon", void 0);
        __decorate([
            core.Input()
        ], FormItemError.prototype, "markedAs", void 0);
        __decorate([
            core.Input("control")
        ], FormItemError.prototype, "controlOrName", null);
        FormItemError = __decorate([
            core.Component({
                selector: "ionx-form-item-error",
                template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"!!icon\"></ion-icon>\n        <label>\n            <ng-template [ngIf]=\"control\">{{control | intlValidationErrorMessage}}</ng-template>\n            <ng-content></ng-content>\n        </label>\n    ",
                host: {
                    "[class.ionx--visible]": "!control || !!(control.invalid && control[markedAs])"
                },
                styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:-webkit-box;display:flex}"]
            })
        ], FormItemError);
        return FormItemError;
    }());

    var FormItemHint = /** @class */ (function () {
        function FormItemHint() {
        }
        Object.defineProperty(FormItemHint.prototype, "label", {
            set: function (label) {
                this.labelComponentContainer.clear();
                this.labelComponentContainer.insert(label.hostView);
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input()
        ], FormItemHint.prototype, "icon", void 0);
        __decorate([
            core.ViewChild("labelComponentContainer", { read: core.ViewContainerRef, static: true })
        ], FormItemHint.prototype, "labelComponentContainer", void 0);
        __decorate([
            core.Input()
        ], FormItemHint.prototype, "label", null);
        FormItemHint = __decorate([
            core.Component({
                selector: "ionx-form-item-hint",
                template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"icon\"></ion-icon>\n        <label>\n            <template #labelComponentContainer></template>\n            <ng-content></ng-content>\n        </label>\n    ",
                styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-medium)}"]
            })
        ], FormItemHint);
        return FormItemHint;
    }());

    var FormHelperModule = /** @class */ (function () {
        function FormHelperModule() {
        }
        FormHelperModule = __decorate([
            core.NgModule({
                declarations: [FormItem, FormHeading, FormItemError, FormItemHint, FormHelper],
                imports: [common.CommonModule, forms.FormsModule, angular.IonicModule, angularIntl.IntlModule, matchMedia.MatchMediaModule],
                exports: [FormItem, FormItemError, FormItemHint, FormHeading, FormHelper]
            })
        ], FormHelperModule);
        return FormHelperModule;
    }());

    exports.FormHeading = FormHeading;
    exports.FormHelper = FormHelper;
    exports.FormHelperModule = FormHelperModule;
    exports.FormItem = FormItem;
    exports.FormItemError = FormItemError;
    exports.FormItemHint = FormItemHint;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=form-helper-module.umd.js.map
