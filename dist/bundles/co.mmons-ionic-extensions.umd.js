(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ionic/angular'), require('@co.mmons/rxjs-utils'), require('@angular/common'), require('@angular/forms'), require('@co.mmons/angular-extensions/browser/match-media'), require('@co.mmons/angular-intl'), require('@angular/router'), require('@co.mmons/js-utils/core'), require('@angular/cdk/scrolling'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions', ['exports', '@angular/core', '@ionic/angular', '@co.mmons/rxjs-utils', '@angular/common', '@angular/forms', '@co.mmons/angular-extensions/browser/match-media', '@co.mmons/angular-intl', '@angular/router', '@co.mmons/js-utils/core', '@angular/cdk/scrolling', '@angular/platform-browser'], factory) :
    (global = global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons['ionic-extensions'] = {}), global.ng.core, global.angular, global.rxjsUtils, global.ng.common, global.ng.forms, global.matchMedia, global.angularIntl, global.ng.router, global.core$1, global.ng.cdk.scrolling, global.ng.platformBrowser));
}(this, function (exports, core, angular, rxjsUtils, common, forms, matchMedia, angularIntl, router, core$1, scrolling, platformBrowser) { 'use strict';

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

    var Buttons = /** @class */ (function () {
        function Buttons() {
        }
        Buttons = __decorate([
            core.Component({
                selector: "ionx-buttons",
                template: "<ng-content></ng-content>",
                styles: ["\n        :host {\n            display: flex;\n            align-items: center;\n            transform: translateZ(0);\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button {\n            height: 32px;\n            --padding-top: 0;\n            --padding-bottom: 0;\n            margin: 0px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear {\n            --padding-start: 8px;\n            --padding-end: 8px;\n            margin: 0px 8px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear + ion-button.button-clear {\n            margin-left: 0px;\n        }\n        \n        :host-context(.ios ion-toolbar) ::ng-deep ion-button {\n            font-weight: 400;\n        }\n    "]
            }),
            __metadata("design:paramtypes", [])
        ], Buttons);
        return Buttons;
    }());

    var ButtonsModule = /** @class */ (function () {
        function ButtonsModule() {
        }
        ButtonsModule = __decorate([
            core.NgModule({
                declarations: [Buttons],
                exports: [Buttons]
            })
        ], ButtonsModule);
        return ButtonsModule;
    }());

    var ExpandingSearchbarStyles = /** @class */ (function () {
        function ExpandingSearchbarStyles() {
        }
        ExpandingSearchbarStyles = __decorate([
            core.Component({
                template: "",
                styles: [":host{display:none}::ng-deep ion-searchbar.ionx-expanding-searchbar{position:absolute;top:0;left:0;width:0;overflow:hidden;padding:0;margin:0}::ng-deep ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{opacity:1;width:100%}::ng-deep ion-searchbar.ionx-expanding-searchbar:not(.searchbar-show-cancel) .searchbar-clear-button{display:block!important}::ng-deep ion-toolbar ion-searchbar.ionx-expanding-searchbar-expanded{padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end)}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:8px;padding-right:8px}::ng-deep .ios ion-searchbar.ionx-expanding-searchbar{height:36px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:0;padding-right:0}::ng-deep .ionx-expanding-searchbar-parent>:not(.ionx-expanding-searchbar){visibility:hidden!important}"]
            })
        ], ExpandingSearchbarStyles);
        return ExpandingSearchbarStyles;
    }());

    var expandedCssClass = "ionx-expanding-searchbar-expanded";
    var parentCssClass = "ionx-expanding-searchbar-parent";
    var stylesInjected = false;
    var ExpandingSearchbar = /** @class */ (function () {
        function ExpandingSearchbar(injector, resolver, appRef, element, searchbar) {
            this.appRef = appRef;
            this.element = element;
            this.searchbar = searchbar;
            this.subscriptions = [];
            if (!stylesInjected) {
                var styles = resolver.resolveComponentFactory(ExpandingSearchbarStyles).create(injector);
                this.appRef.attachView(styles.hostView);
            }
        }
        Object.defineProperty(ExpandingSearchbar.prototype, "parentElement", {
            get: function () {
                var parent = this.element.nativeElement.parentElement;
                if (parent) {
                    return parent;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExpandingSearchbar.prototype, "expanded", {
            get: function () {
                return this.element.nativeElement.classList.contains(expandedCssClass);
            },
            set: function (expanded) {
                var _this = this;
                this.parentElement;
                if (expanded) {
                    this.element.nativeElement.classList.add(expandedCssClass);
                    this.parentElement.classList.add(parentCssClass);
                    this.searchbar.setFocus();
                }
                else {
                    this.element.nativeElement.classList.remove(expandedCssClass);
                    this.parentElement.classList.remove(parentCssClass);
                    //this.searchbar.value = "";
                    setTimeout(function () { return _this.element.nativeElement.querySelector(".searchbar-input").blur(); }, 50);
                }
            },
            enumerable: true,
            configurable: true
        });
        ExpandingSearchbar.prototype.expand = function () {
            this.expanded = true;
        };
        ExpandingSearchbar.prototype.collapseIfPossible = function (cleared) {
            var _this = this;
            if (this.expanded && (cleared || !this.searchbar.value)) {
                setTimeout(function () {
                    _this.expanded = false;
                }, cleared ? 250 : 0);
            }
        };
        ExpandingSearchbar.prototype.ngOnInit = function () {
            var _this = this;
            //this.subscriptions.push(this.searchbar.ionBlur.subscribe(() => this.collapseIfPossible()));
            this.subscriptions.push(this.searchbar.ionClear.subscribe(function () { return _this.collapseIfPossible(true); }));
            this.element.nativeElement.classList.add("ionx-expanding-searchbar");
        };
        ExpandingSearchbar.prototype.ngOnDestroy = function () {
            rxjsUtils.unsubscribe(this.subscriptions);
        };
        __decorate([
            core.Input("ionx-expanded"),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], ExpandingSearchbar.prototype, "expanded", null);
        ExpandingSearchbar = __decorate([
            core.Directive({
                selector: "ion-searchbar[ionx-expanding-searchbar]",
                exportAs: "ionxExpandingSearchbar"
            }),
            __metadata("design:paramtypes", [core.Injector,
                core.ComponentFactoryResolver,
                core.ApplicationRef,
                core.ElementRef,
                angular.IonSearchbar])
        ], ExpandingSearchbar);
        return ExpandingSearchbar;
    }());

    var ExpandingSearchbarModule = /** @class */ (function () {
        function ExpandingSearchbarModule() {
        }
        ExpandingSearchbarModule = __decorate([
            core.NgModule({
                declarations: [ExpandingSearchbar, ExpandingSearchbarStyles],
                exports: [ExpandingSearchbar],
                imports: [angular.IonicModule]
            })
        ], ExpandingSearchbarModule);
        return ExpandingSearchbarModule;
    }());

    var FormHeading = /** @class */ (function () {
        function FormHeading() {
        }
        __decorate([
            core.HostBinding("attr.sticky"),
            core.Input(),
            __metadata("design:type", Boolean)
        ], FormHeading.prototype, "sticky", void 0);
        FormHeading = __decorate([
            core.Component({
                selector: "ionx-form-heading",
                template: "\n        <ng-content select=\"ion-item\"></ng-content>\n        <div ionx--under>\n            <ng-content></ng-content>\n        </div>\n    ",
                styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start:0px;--padding-end:0px;--inner-padding-end:16px;--inner-padding-start:16px}:host ::ng-deep ion-item>ion-label{font-size:.9rem;font-weight:500}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:-webkit-sticky;position:sticky;top:0;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start:8px;--padding-end:8px;--inner-padding-end:0px;--inner-padding-start:0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}:host-context(.ios) ::ng-deep ion-item.item-label>ion-label{font-size:.8rem;letter-spacing:1px;text-transform:uppercase}"]
            }),
            __metadata("design:paramtypes", [])
        ], FormHeading);
        return FormHeading;
    }());

    function findParentImpl(element) {
        if (!element) {
            return;
        }
        if (element.scrollHeight >= element.clientHeight) {
            var overflowY = window.getComputedStyle(element).overflowY;
            if (overflowY !== "visible" && overflowY !== "hidden") {
                return element;
            }
        }
        if (element.assignedSlot) {
            var p = findParentImpl(element.assignedSlot.parentElement);
            if (p) {
                return p;
            }
        }
        return findParentImpl(element.parentElement);
    }
    function scrollIntoView(element, scrollBehavior) {
        var parent = findParentImpl(element);
        if (parent) {
            var top_1 = element.offsetTop;
            if (element.offsetParent) {
                var offsetParent = element.offsetParent;
                while (offsetParent !== parent && !!offsetParent) {
                    top_1 += offsetParent.offsetTop;
                    offsetParent = offsetParent.offsetParent;
                }
            }
            parent.scrollTo({ top: top_1, behavior: scrollBehavior });
            return;
        }
        element.scrollIntoView();
    }

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
        FormHelper.prototype.focusImpl = function (control, scroll) {
            var e_3, _a;
            if (scroll === void 0) { scroll = true; }
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
            if (scroll && element) {
                scrollIntoView(element.closest("ion-item") || element);
            }
        };
        FormHelper.prototype.focus = function (formControlName, scrollIntoView) {
            if (scrollIntoView === void 0) { scrollIntoView = true; }
            this.focusImpl(formControlName, scrollIntoView);
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], FormHelper.prototype, "readonly", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], FormHelper.prototype, "busy", null);
        __decorate([
            core.ContentChildren(forms.FormControlName, { descendants: true }),
            __metadata("design:type", core.QueryList)
        ], FormHelper.prototype, "contentControls", void 0);
        FormHelper = __decorate([
            core.Directive({
                selector: "[ionx-form-helper], [ionxFormHelper]",
                exportAs: "ionxFormHelper"
            }),
            __param(1, core.Optional()), __param(2, core.Optional()),
            __metadata("design:paramtypes", [core.ElementRef, forms.NgForm, forms.FormGroupDirective])
        ], FormHelper);
        return FormHelper;
    }());

    var FormItem = /** @class */ (function () {
        function FormItem() {
        }
        FormItem = __decorate([
            core.Component({
                selector: "ionx-form-item",
                template: "<ng-content select=\"ion-item\"></ng-content><ng-content select=\"ionx-form-item-error\"></ng-content><ng-content select=\"ionx-form-item-hint\"></ng-content><ng-content></ng-content>"
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
            set: function (control) {
                if (control instanceof forms.AbstractControl) {
                    this._control = control;
                }
                else if (control) {
                    this._control = this.formGroup.form.controls[control];
                }
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], FormItemError.prototype, "icon", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], FormItemError.prototype, "markedAs", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], FormItemError.prototype, "control", null);
        FormItemError = __decorate([
            core.Component({
                selector: "ionx-form-item-error",
                template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"!!icon\"></ion-icon>\n        <label>\n            <ng-template [ngIf]=\"_control\">{{_control | intlValidationErrorMessage}}</ng-template>\n            <ng-content></ng-content>\n        </label>\n    ",
                host: {
                    "[class.ionx--visible]": "!_control || !!(_control.invalid && _control[markedAs])"
                },
                styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-danger);display:none}:host.ionx--visible{display:flex}"]
            }),
            __metadata("design:paramtypes", [forms.FormGroupDirective])
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
            core.Input(),
            __metadata("design:type", String)
        ], FormItemHint.prototype, "icon", void 0);
        __decorate([
            core.ViewChild("labelComponentContainer", { read: core.ViewContainerRef, static: true }),
            __metadata("design:type", core.ViewContainerRef)
        ], FormItemHint.prototype, "labelComponentContainer", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", core.ComponentRef),
            __metadata("design:paramtypes", [core.ComponentRef])
        ], FormItemHint.prototype, "label", null);
        FormItemHint = __decorate([
            core.Component({
                selector: "ionx-form-item-hint",
                template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"icon\"></ion-icon>\n        <label>\n            <template #labelComponentContainer></template>\n            <ng-content></ng-content>\n        </label>\n    ",
                styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-medium)}"]
            }),
            __metadata("design:paramtypes", [])
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

    var defaultOptions = {
        selector: "img",
        container: window,
        scroll: null,
        threshold: 300,
        throttle: 150,
        dataSrc: "original",
        dataSrcSet: "original-set",
        dataAlternate: "alternate",
        classLoading: "ionx-lazy-image-loading",
        classLoaded: "ionx-lazy-image-loaded",
        skipInvisible: true,
        callbackLoad: null,
        callbackError: null,
        callbackSet: null,
        callbackProcessed: null
    };
    function _isInsideViewport(element, container, threshold) {
        var ownerDocument, documentTop, documentLeft;
        function _getDocumentWidth() {
            return window.innerWidth || (ownerDocument.documentElement.clientWidth || document.body.clientWidth);
        }
        function _getDocumentHeight() {
            return window.innerHeight || (ownerDocument.documentElement.clientHeight || document.body.clientHeight);
        }
        function _getTopOffset(element) {
            return element.getBoundingClientRect().top + documentTop - ownerDocument.documentElement.clientTop;
        }
        function _getLeftOffset(element) {
            return element.getBoundingClientRect().left + documentLeft - ownerDocument.documentElement.clientLeft;
        }
        function _isBelowViewport() {
            var fold;
            if (container === window) {
                fold = _getDocumentHeight() + documentTop;
            }
            else {
                fold = _getTopOffset(container) + container.offsetHeight;
            }
            return fold <= _getTopOffset(element) - threshold;
        }
        function _isAtRightOfViewport() {
            var fold;
            if (container === window) {
                fold = _getDocumentWidth() + window.pageXOffset;
            }
            else {
                fold = _getLeftOffset(container) + _getDocumentWidth();
            }
            return fold <= _getLeftOffset(element) - threshold;
        }
        function _isAboveViewport() {
            var fold;
            if (container === window) {
                fold = documentTop;
            }
            else {
                fold = _getTopOffset(container);
            }
            return fold >= _getTopOffset(element) + threshold + element.offsetHeight;
        }
        function _isAtLeftOfViewport() {
            var fold;
            if (container === window) {
                fold = documentLeft;
            }
            else {
                fold = _getLeftOffset(container);
            }
            return fold >= _getLeftOffset(element) + threshold + element.offsetWidth;
        }
        ownerDocument = element.ownerDocument;
        documentTop = window.pageYOffset || ownerDocument.body.scrollTop;
        documentLeft = window.pageXOffset || ownerDocument.body.scrollLeft;
        return !_isBelowViewport() && !_isAboveViewport() && !_isAtRightOfViewport() && !_isAtLeftOfViewport();
    }
    function _now() {
        var d = new Date();
        return d.getTime();
    }
    function _convertToArray(nodeSet) {
        return Array.prototype.slice.call(nodeSet);
    }
    function setSourcesForPicture(element, srcsetDataAttribute) {
        var parent = element.parentElement;
        if (parent.tagName !== 'PICTURE') {
            return;
        }
        for (var i = 0; i < parent.children.length; i++) {
            var pictureChild = parent.children[i];
            if (pictureChild.tagName === 'SOURCE') {
                var sourceSrcset = pictureChild.getAttribute('data-' + srcsetDataAttribute);
                if (sourceSrcset) {
                    pictureChild.setAttribute('srcset', sourceSrcset);
                }
            }
        }
    }
    /**
     * Sets sources (e.g. src) for lazy load element.
     * @param element Element, whose image to be loaded.
     * @param srcsetDataAttribute
     * @param srcDataAttribute
     */
    function setSources(element, srcsetDataAttribute, srcDataAttribute) {
        var tagName = element.tagName.toUpperCase();
        var elementSrc = element.getAttribute("data-" + srcDataAttribute);
        if (tagName === "IFRAME") {
            if (elementSrc) {
                element.setAttribute("src", elementSrc);
            }
            return;
        }
        else {
            if (tagName === "IMG") {
                setSourcesForPicture(element, srcsetDataAttribute);
            }
            var dataTarget = element;
            if (element["__ionxLazyImageTmpImg"]) {
                dataTarget = element["__ionxLazyImageTmpImg"];
            }
            var imgSrcSet = element.getAttribute("data-" + srcsetDataAttribute);
            if (imgSrcSet) {
                dataTarget.setAttribute("srcset", imgSrcSet);
            }
            if (elementSrc) {
                dataTarget.setAttribute("src", elementSrc);
            }
            return;
        }
        //if (elementSrc) element.style.backgroundImage = "url(" + elementSrc + ")";
    }
    function _bind(fn, obj) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }
    var instanceCounter = 0;
    var instances = {};
    var LazyLoad = /** @class */ (function () {
        function LazyLoad(options) {
            this.id = (++instanceCounter) + "";
            instances[this.id] = this;
            this._options = Object.assign({}, defaultOptions, options);
            this._queryOriginNode = this._options.container === window ? document : this._options.container;
            this._previousLoopTime = 0;
            this._loopTimeout = null;
            this._handleScrollFn = _bind(this.handleScroll, this);
            window.addEventListener("resize", this._handleScrollFn);
            this.update();
        }
        Object.defineProperty(LazyLoad.prototype, "container", {
            get: function () {
                return this._queryOriginNode;
            },
            enumerable: true,
            configurable: true
        });
        LazyLoad.prototype._showOnAppear = function (element) {
            var _this = this;
            var errorCallback = function () {
                var eventTarget = element;
                if (element["__ionxLazyImageTmpImg"]) {
                    eventTarget = element["__ionxLazyImageTmpImg"];
                }
                var alternate = _this._options.dataAlternate && element.getAttribute("data-" + _this._options.dataAlternate);
                if (alternate && eventTarget["src"] != alternate) {
                    eventTarget["src"] = alternate;
                    return;
                }
                delete element["__ionxLazyImageTmpImg"];
                eventTarget.removeEventListener("load", loadCallback);
                eventTarget.removeEventListener("error", errorCallback);
                element.classList.remove(_this._options.classLoading);
                element.lazyLoadError = true;
                if (_this._options.callbackError) {
                    _this._options.callbackError.callback_error(element);
                }
            };
            var loadCallback = function () {
                /* As this method is asynchronous, it must be protected against external destroy() calls */
                if (_this._options === null) {
                    return;
                }
                var eventTarget = element;
                // if target element is not <img>, the real target of onload callback is temporary image
                if (element["__ionxLazyImageTmpImg"]) {
                    eventTarget = element["__ionxLazyImageTmpImg"];
                    element.style.backgroundImage = "url(" + eventTarget.src + ")";
                    delete element["__ionxLazyImageTmpImg"];
                }
                element.lazyLoadError = false;
                if (_this._options.callbackLoad) {
                    _this._options.callbackLoad(element);
                }
                element.classList.remove(_this._options.classLoading);
                element.classList.add(_this._options.classLoaded);
                eventTarget.removeEventListener("load", loadCallback);
                eventTarget.removeEventListener("error", errorCallback);
            };
            element.classList.add(this._options.classLoading);
            if (element.tagName.toUpperCase() === "IMG" || element.tagName.toUpperCase() === "IFRAME") {
                element.addEventListener("load", loadCallback);
                element.addEventListener("error", errorCallback);
            }
            else {
                var tmpImg = new Image();
                tmpImg.addEventListener("load", loadCallback);
                tmpImg.addEventListener("error", errorCallback);
                element["__ionxLazyImageTmpImg"] = tmpImg;
            }
            setSources(element, this._options.dataSrcSet, this._options.dataSrc);
            if (this._options.callbackSet) {
                this._options.callbackSet(element);
            }
        };
        LazyLoad.prototype._loopThroughElements = function () {
            var elementsLength = (!this._elements) ? 0 : this._elements.length;
            var processedIndexes = [];
            for (var i = 0; i < elementsLength; i++) {
                var element = this._elements[i];
                /* If must skip_invisible and element is invisible, skip it */
                if (this._options.skipInvisible && (element.offsetParent === null)) {
                    continue;
                }
                if (_isInsideViewport(element, this._options.container, this._options.threshold)) {
                    this._showOnAppear(element);
                    /* Marking the element as processed. */
                    processedIndexes.push(i);
                    element.lazyLoadProcessed = true;
                }
            }
            /* Removing processed elements from this._elements. */
            while (processedIndexes.length > 0) {
                this._elements.splice(processedIndexes.pop(), 1);
                if (this._options.callbackProcessed) {
                    this._options.callbackProcessed(this._elements.length);
                }
            }
            /* Stop listening to scroll event when 0 elements remains */
            if (elementsLength === 0) {
                this._stopScrollHandler();
            }
        };
        ;
        LazyLoad.prototype._purgeElements = function () {
            var elementsToPurge = [];
            for (var i = 0; i < this._elements.length; i++) {
                var element = this._elements[i];
                /* If the element has already been processed, skip it */
                if (element.lazyLoadProcessed) {
                    elementsToPurge.push(i);
                }
            }
            /* Removing elements to purge from this._elements. */
            while (elementsToPurge.length > 0) {
                this._elements.splice(elementsToPurge.pop(), 1);
            }
        };
        ;
        LazyLoad.prototype._startScrollHandler = function () {
            if (!this._isHandlingScroll) {
                this._isHandlingScroll = true;
                this._options.container.addEventListener("scroll", this._handleScrollFn);
                if (this._options.scroll) {
                    this._options.scroll.addEventListener("scroll", this._handleScrollFn);
                }
            }
        };
        ;
        LazyLoad.prototype._stopScrollHandler = function () {
            if (this._isHandlingScroll) {
                this._isHandlingScroll = false;
                this._options.container.removeEventListener("scroll", this._handleScrollFn);
                if (this._options.scroll) {
                    this._options.scroll.removeEventListener("scroll", this._handleScrollFn);
                }
            }
        };
        ;
        LazyLoad.prototype.handleScroll = function () {
            var remainingTime, now, throttle;
            // IE8 fix for destroy() malfunctioning
            if (!this._options) {
                return;
            }
            now = _now();
            throttle = this._options.throttle;
            if (throttle !== 0) {
                remainingTime = throttle - (now - this._previousLoopTime);
                if (remainingTime <= 0 || remainingTime > throttle) {
                    if (this._loopTimeout) {
                        clearTimeout(this._loopTimeout);
                        this._loopTimeout = null;
                    }
                    this._previousLoopTime = now;
                    this._loopThroughElements();
                }
                else if (!this._loopTimeout) {
                    this._loopTimeout = setTimeout(_bind(function () {
                        this._previousLoopTime = _now();
                        this._loopTimeout = null;
                        this._loopThroughElements();
                    }, this), remainingTime);
                }
            }
            else {
                this._loopThroughElements();
            }
        };
        ;
        LazyLoad.prototype.update = function (options) {
            var e_1, _a;
            this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._options.selector));
            if (options && options.retryError) {
                try {
                    for (var _b = __values(this._elements), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var element = _c.value;
                        if (element.lazyLoadProcessed && element.lazyLoadError) {
                            element.lazyLoadProcessed = false;
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
            }
            this._purgeElements();
            this._loopThroughElements();
            this._startScrollHandler();
        };
        LazyLoad.prototype.destroy = function () {
            window.removeEventListener("resize", this._handleScrollFn);
            if (this._loopTimeout) {
                clearTimeout(this._loopTimeout);
                this._loopTimeout = null;
            }
            this._stopScrollHandler();
            this._elements = null;
            this._queryOriginNode = null;
            this._options = null;
            delete instances[this.id];
        };
        return LazyLoad;
    }());
    function ensureLazyImagesLoaded(root, options) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceId, loader, container, parent_1;
            return __generator(this, function (_a) {
                for (instanceId in instances) {
                    loader = instances[instanceId];
                    container = loader.container;
                    if (root === container) {
                        loader.update({ retryError: options && options.retryError });
                    }
                    else {
                        parent_1 = container.parentElement;
                        while (parent_1 && parent_1 !== root) {
                            parent_1 = parent_1.parentElement;
                        }
                        if (parent_1) {
                            loader.update({ retryError: options && options.retryError });
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    }

    var ImageLoader = /** @class */ (function () {
        function ImageLoader(element) {
            this.element = element;
        }
        Object.defineProperty(ImageLoader.prototype, "src", {
            get: function () {
                return this._src;
            },
            set: function (value) {
                var old = this._src;
                this._src = value;
                if (old != this._src) {
                    this.reload();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageLoader.prototype, "src2", {
            set: function (value) {
                this.src = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageLoader.prototype, "alternate", {
            set: function (value) {
                var old = this._alternate;
                this._alternate = value;
                if (old != this._alternate) {
                    this.reload();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageLoader.prototype, "alternate2", {
            set: function (value) {
                this.alternate = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageLoader.prototype, "cssClasses", {
            set: function (value) {
                this._cssClasses = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageLoader.prototype, "cssClasses2", {
            set: function (value) {
                this._cssClasses = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageLoader.prototype, "cssClassesTarget", {
            set: function (value) {
                this._cssClassesTarget = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageLoader.prototype, "cssClassesParent", {
            set: function (value) {
                this._cssClassesTarget = value;
            },
            enumerable: true,
            configurable: true
        });
        ImageLoader.prototype.reload = function () {
            if (!this.loading && this.initialized) {
                this.loaded = false;
                this.error = false;
                if (this._cssClasses) {
                    var target = this._cssClassesTarget ? this.element.nativeElement.closest(this._cssClassesTarget) : this.element.nativeElement;
                    if (this._cssClasses.loaded) {
                        target.classList.remove(this._cssClasses.loaded);
                    }
                    if (this._cssClasses.error) {
                        target.classList.remove(this._cssClasses.error);
                    }
                }
                this.load();
            }
        };
        ImageLoader.prototype.load = function () {
            var _this = this;
            if (this.loaded || this.error || !this._src || this.loading) {
                return;
            }
            this.loading = true;
            if (this._cssClasses && this._cssClasses.loading) {
                this.element.nativeElement.classList.add(this._cssClasses.loading);
            }
            var element = this.element.nativeElement;
            var img;
            // if host element is not <img>, we need to create tmp 
            if (element.tagName.toLowerCase() != "img") {
                img = this.tmpImg = new Image();
            }
            else {
                img = element;
            }
            img.onload = function () {
                if (img !== element) {
                    element.style.backgroundImage = "url(" + img.src + ")";
                }
                img.onerror = undefined;
                img.onload = undefined;
                _this.tmpImg = undefined;
                _this.loaded = true;
                _this.loading = false;
                _this.error = false;
                if (_this._cssClasses) {
                    var target = _this._cssClassesTarget ? element.closest(_this._cssClassesTarget) : element;
                    if (_this._cssClasses.loading) {
                        target.classList.remove(_this._cssClasses.loading);
                    }
                    if (_this._cssClasses.loaded) {
                        target.classList.add(_this._cssClasses.loaded);
                    }
                }
            };
            img.onerror = function () {
                if (_this._alternate && _this._alternate != img.src) {
                    img.src = _this._alternate;
                    return;
                }
                img.onerror = undefined;
                img.onload = undefined;
                _this.tmpImg = undefined;
                _this.loading = false;
                _this.loaded = false;
                _this.error = true;
                if (_this._cssClasses) {
                    var target = _this._cssClassesTarget ? element.closest(_this._cssClassesTarget) : element;
                    if (_this._cssClasses.loading) {
                        target.classList.remove(_this._cssClasses.loading);
                    }
                    if (_this._cssClasses.error) {
                        target.classList.add(_this._cssClasses.error);
                    }
                }
            };
            img.src = this._src;
        };
        ImageLoader.prototype.ngAfterViewInit = function () {
            this.initialized = true;
            this.element.nativeElement["ionxImageLoader"] = this;
            this.load();
        };
        ImageLoader.prototype.ngOnDestroy = function () {
            if (this.element.nativeElement) {
                delete this.element.nativeElement["ionxImageLoader"];
            }
        };
        __decorate([
            core.Input("src"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], ImageLoader.prototype, "src", null);
        __decorate([
            core.Input("ionx-image-loader"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], ImageLoader.prototype, "src2", null);
        __decorate([
            core.Input("alternate"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], ImageLoader.prototype, "alternate", null);
        __decorate([
            core.Input("ionx-image-loader-alternate"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], ImageLoader.prototype, "alternate2", null);
        __decorate([
            core.Input("css-classes"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], ImageLoader.prototype, "cssClasses", null);
        __decorate([
            core.Input("ionx-image-loader-css-classes"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], ImageLoader.prototype, "cssClasses2", null);
        __decorate([
            core.Input("css-classes-target"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], ImageLoader.prototype, "cssClassesTarget", null);
        __decorate([
            core.Input("ionx-image-loader-css-classes-target"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], ImageLoader.prototype, "cssClassesParent", null);
        ImageLoader = __decorate([
            core.Directive({
                selector: "[ionx-image-loader]",
                host: {
                    "[attr.ionx-image-loader]": "true"
                }
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], ImageLoader);
        return ImageLoader;
    }());
    function ensureImagesLoaded(root, options) {
        return __awaiter(this, void 0, void 0, function () {
            var images, i, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        images = root.querySelectorAll("[ionx-image-loader]");
                        for (i = 0; i < images.length; i++) {
                            image = images.item(i);
                            if (!image.ionxImageLoader || !image.ionxImageLoader.src || image.ionxImageLoader.loaded || (image.ionxImageLoader.error && (!options || !options.retryError))) {
                                continue;
                            }
                            image.ionxImageLoader.reload();
                        }
                        if (!(options && options.lazy)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ensureLazyImagesLoaded(root, { retryError: options && options.retryError })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }

    var ImageLoaderModule = /** @class */ (function () {
        function ImageLoaderModule() {
        }
        ImageLoaderModule = __decorate([
            core.NgModule({
                declarations: [ImageLoader],
                exports: [ImageLoader]
            })
        ], ImageLoaderModule);
        return ImageLoaderModule;
    }());

    angular.IonBackButtonDelegate.prototype.onClick = function () { return null; };
    var IonicBackButtonFix = /** @class */ (function () {
        function IonicBackButtonFix(router, routerOutlet, navCtrl, elementRef) {
            this.router = router;
            this.routerOutlet = routerOutlet;
            this.navCtrl = navCtrl;
            this.elementRef = elementRef;
        }
        Object.defineProperty(IonicBackButtonFix.prototype, "defaultHref", {
            get: function () {
                return this.elementRef.nativeElement.defaultHref;
            },
            set: function (value) {
                this.elementRef.nativeElement.defaultHref = value;
            },
            enumerable: true,
            configurable: true
        });
        IonicBackButtonFix.prototype.onClick = function (ev) {
            if (this.routerOutlet && this.routerOutlet.canGoBack()) {
                this.navCtrl.back({ animated: true });
                ev.preventDefault();
            }
            else if (this.router && this.defaultHref != null) {
                this.navCtrl.navigateBack(this.defaultHref);
                ev.preventDefault();
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], IonicBackButtonFix.prototype, "defaultHref", null);
        __decorate([
            core.HostListener("click", ["$event"]),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Event]),
            __metadata("design:returntype", void 0)
        ], IonicBackButtonFix.prototype, "onClick", null);
        IonicBackButtonFix = __decorate([
            core.Directive({
                selector: "ion-back-button"
            }),
            __metadata("design:paramtypes", [router.Router, angular.IonRouterOutlet, angular.NavController, core.ElementRef])
        ], IonicBackButtonFix);
        return IonicBackButtonFix;
    }());

    var IonicInputFix = /** @class */ (function () {
        function IonicInputFix(element) {
            this.element = element;
        }
        IonicInputFix.prototype.ngAfterViewInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var realInput;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.tabIndex) return [3 /*break*/, 2];
                            this.element.nativeElement.removeAttribute("tabIndex");
                            return [4 /*yield*/, core$1.waitTill(function () { return !!_this.element.nativeElement.shadowRoot && !!_this.element.nativeElement.shadowRoot.querySelector(".native-input"); })];
                        case 1:
                            _a.sent();
                            realInput = this.element.nativeElement.shadowRoot.querySelector(".native-input");
                            realInput.setAttribute("tabIndex", this.tabIndex);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            core.Input("tabIndex"),
            __metadata("design:type", String)
        ], IonicInputFix.prototype, "tabIndex", void 0);
        IonicInputFix = __decorate([
            core.Directive({
                selector: "ion-input[ionfix-input]"
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], IonicInputFix);
        return IonicInputFix;
    }());

    var IonicItemTargetFix = /** @class */ (function () {
        function IonicItemTargetFix(element) {
            this.element = element;
        }
        IonicItemTargetFix.prototype.ngAfterViewInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, a;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.target) return [3 /*break*/, 5];
                            i = 1;
                            _a.label = 1;
                        case 1:
                            if (!(i < 20)) return [3 /*break*/, 5];
                            a = (this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".item-native")) || undefined;
                            if (!!a) return [3 /*break*/, 3];
                            return [4 /*yield*/, core$1.sleep(i * 100)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            a.setAttribute("target", this.target);
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], IonicItemTargetFix.prototype, "target", void 0);
        IonicItemTargetFix = __decorate([
            core.Directive({
                selector: "ion-item[target]"
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], IonicItemTargetFix);
        return IonicItemTargetFix;
    }());

    var IonicFixModule = /** @class */ (function () {
        function IonicFixModule() {
        }
        IonicFixModule = __decorate([
            core.NgModule({
                declarations: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix],
                exports: [IonicInputFix, IonicBackButtonFix, IonicItemTargetFix]
            })
        ], IonicFixModule);
        return IonicFixModule;
    }());

    var LazyImage = /** @class */ (function () {
        function LazyImage(element, renderer, container) {
            this.element = element;
            this.renderer = renderer;
            this.container = container;
        }
        LazyImage_1 = LazyImage;
        Object.defineProperty(LazyImage.prototype, "src", {
            set: function (value) {
                this._src = value;
                this.reset();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LazyImage.prototype, "alternate", {
            set: function (value) {
                this._alternate = value;
                this.reset();
            },
            enumerable: true,
            configurable: true
        });
        LazyImage.prototype.reset = function () {
            if (this._src) {
                this.renderer.setElementClass(this.element.nativeElement, "ionx-lazy-image", true);
                this.renderer.setElementAttribute(this.element.nativeElement, "data-original", this._src);
            }
            if (this._alternate) {
                this.renderer.setElementAttribute(this.element.nativeElement, "data-alternate", this._alternate);
            }
        };
        LazyImage.prototype.revalidate = function () {
            // children.length > 1 because this is also included in children query
            if (this.container && this.children.length > 1) {
                this.container.revalidate();
            }
        };
        LazyImage.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.children.changes.subscribe(function () { return _this.revalidate(); });
            this.revalidate();
        };
        var LazyImage_1;
        __decorate([
            core.ContentChildren(LazyImage_1, { descendants: true }),
            __metadata("design:type", core.QueryList)
        ], LazyImage.prototype, "children", void 0);
        __decorate([
            core.Input("ionx-lazy-image"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], LazyImage.prototype, "src", null);
        __decorate([
            core.Input("ionx-lazy-image-alternate"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], LazyImage.prototype, "alternate", null);
        LazyImage = LazyImage_1 = __decorate([
            core.Directive({
                selector: "[ionx-lazy-image]"
            }),
            __param(2, core.Optional()), __param(2, core.Inject(core.forwardRef(function () { return LazyImageContainer; }))),
            __metadata("design:paramtypes", [core.ElementRef, core.Renderer, LazyImageContainer])
        ], LazyImage);
        return LazyImage;
    }());
    var LazyImageContainer = /** @class */ (function () {
        function LazyImageContainer(element) {
            this.element = element;
        }
        LazyImageContainer.prototype.revalidate = function () {
            if (this.lazyLoad) {
                this.lazyLoad.update();
                var rect = this.element.nativeElement.getBoundingClientRect();
                if (rect.width == 0 || rect.height == 0) {
                    //setTimeout(() => this.revalidate(), 200);
                }
                //console.log(this.children);
                //window.dispatchEvent(new Event("resize"));
            }
        };
        LazyImageContainer.prototype.ngOnInit = function () {
            this.initLazyLoad();
        };
        LazyImageContainer.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.children.changes.subscribe(function () { return _this.revalidate(); });
            if (this.children.length > 0) {
                this.revalidate();
            }
        };
        LazyImageContainer.prototype.ngOnDestroy = function () {
            if (this.lazyLoad) {
                this.lazyLoad.destroy();
            }
        };
        LazyImageContainer.prototype.initLazyLoad = function () {
            return __awaiter(this, void 0, void 0, function () {
                var options, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = {};
                            options.selector = ".ionx-lazy-image";
                            options.container = this.element.nativeElement;
                            if (!(this.element.nativeElement.tagName.toLowerCase() === "ion-content")) return [3 /*break*/, 5];
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 40)) return [3 /*break*/, 5];
                            options.scroll = this.element.nativeElement.shadowRoot && this.element.nativeElement.shadowRoot.querySelector(".inner-scroll");
                            if (!!options.scroll) return [3 /*break*/, 3];
                            return [4 /*yield*/, core$1.sleep(50)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5:
                            this.lazyLoad = new LazyLoad(options);
                            return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            core.ContentChildren(LazyImage, { descendants: true }),
            __metadata("design:type", core.QueryList)
        ], LazyImageContainer.prototype, "children", void 0);
        LazyImageContainer = __decorate([
            core.Directive({
                selector: "ion-content[ionx-lazy-image], [ionx-lazy-image-container]"
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], LazyImageContainer);
        return LazyImageContainer;
    }());

    var LazyImageModule = /** @class */ (function () {
        function LazyImageModule() {
        }
        LazyImageModule = __decorate([
            core.NgModule({
                declarations: [LazyImage, LazyImageContainer],
                exports: [LazyImage, LazyImageContainer]
            })
        ], LazyImageModule);
        return LazyImageModule;
    }());

    var Loader = /** @class */ (function () {
        function Loader(elementRef) {
            this.elementRef = elementRef;
            this.progressType = "determinate";
            this.progressValue = 0;
            this.progressBuffer = 0;
        }
        Object.defineProperty(Loader.prototype, "progressPercentVisible", {
            get: function () {
                return typeof this.progressPercent === "number";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Loader.prototype, "spinnerMode", {
            get: function () {
                return this.mode === "spinner";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Loader.prototype, "progressMode", {
            get: function () {
                return this.mode === "progress";
            },
            enumerable: true,
            configurable: true
        });
        Loader.prototype.dismiss = function () {
            return this.popover.dismiss();
        };
        Loader.prototype.ngOnInit = function () {
            this.popover = this.elementRef.nativeElement.closest("ion-popover");
            if (this.instanceCallback) {
                this.instanceCallback(this);
            }
        };
        Loader.prototype.ngOnDestroy = function () {
            this.popover = undefined;
            this.instanceCallback = undefined;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], Loader.prototype, "instanceCallback", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Loader.prototype, "header", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Loader.prototype, "message", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Loader.prototype, "mode", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Loader.prototype, "progressMessage", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Loader.prototype, "progressType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], Loader.prototype, "progressValue", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], Loader.prototype, "progressBuffer", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], Loader.prototype, "progressPercent", void 0);
        Loader = __decorate([
            core.Component({
                selector: "ionx-loader",
                template: "<div style=\"display: flex; align-items: center\">\n\n    <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n        <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n        <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n    </div>\n\n</div>\n\n<ion-progress-bar style=\"margin: 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n\n<div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n    <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n    <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n</div>\n",
                styles: [":host { display: block }"]
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], Loader);
        return Loader;
    }());

    var LoaderController = /** @class */ (function () {
        function LoaderController(popoverController) {
            this.popoverController = popoverController;
        }
        LoaderController.prototype.present = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var loader, loaderInstance, popover;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            loaderInstance = function (instance) { return loader = instance; };
                            return [4 /*yield*/, this.popoverController.create({
                                    animated: false,
                                    cssClass: "ionx-popover-flex",
                                    backdropDismiss: false,
                                    keyboardClose: false,
                                    component: Loader,
                                    componentProps: {
                                        instanceCallback: function (loader) { return loaderInstance(loader); },
                                        header: options.header,
                                        message: options.message,
                                        mode: options.mode || "spinner"
                                    }
                                })];
                        case 1:
                            popover = _a.sent();
                            // popover.style.setProperty("--width", "100%");
                            // popover.style.setProperty("--maxHeight", "100%");
                            // const content = popover.querySelector(".popover-content") as HTMLElement;
                            // content.style.background = "transparent";
                            // content.style.borderRadius = "0px";
                            // content.style.left = "0px !important";
                            // content.style.top = "0px !important";
                            // content.style.height = "100%";
                            // content.style.width = "100%";
                            // content.style.maxWidth = "none";
                            // content.style.maxHeight = "none";
                            // content.style.boxShadow = "none";
                            popover.present();
                            return [4 /*yield*/, core$1.waitTill(function () { return !!loader; })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, loader];
                    }
                });
            });
        };
        LoaderController = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [angular.PopoverController])
        ], LoaderController);
        return LoaderController;
    }());

    var LoaderModule = /** @class */ (function () {
        function LoaderModule() {
        }
        LoaderModule = __decorate([
            core.NgModule({
                declarations: [Loader],
                imports: [angularIntl.IntlModule, angular.IonicModule, common.CommonModule],
                entryComponents: [Loader],
                providers: [LoaderController]
            })
        ], LoaderModule);
        return LoaderModule;
    }());

    var ModalControllerComponent = /** @class */ (function () {
        function ModalControllerComponent(controller) {
            this.controller = controller;
            this.willEnter = new core.EventEmitter();
            this.didEnter = new core.EventEmitter();
            this.didDismiss = new core.EventEmitter();
            this.willDismiss = new core.EventEmitter();
            this._presented = false;
        }
        ModalControllerComponent.prototype.present = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // already opened - should we close existing and open new?
                            if (this.modal) {
                                return [2 /*return*/];
                            }
                            _a = this;
                            return [4 /*yield*/, this.controller.create({ component: ModalControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.backdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass })];
                        case 1:
                            _a.modal = (_b.sent());
                            this.willEnter.next();
                            return [4 /*yield*/, this.modal.present()];
                        case 2:
                            _b.sent();
                            this.didEnter.next();
                            this._presented = true;
                            return [4 /*yield*/, this.modal.onWillDismiss()];
                        case 3:
                            if (_b.sent()) {
                                this.willDismiss.next();
                            }
                            return [4 /*yield*/, this.modal.onDidDismiss()];
                        case 4:
                            if (_b.sent()) {
                                this.didDismiss.next();
                                this.modal = undefined;
                                this._presented = false;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(ModalControllerComponent.prototype, "presented", {
            get: function () {
                return this._presented;
            },
            enumerable: true,
            configurable: true
        });
        ModalControllerComponent.prototype.dismiss = function (data, role) {
            if (this.modal) {
                return this.modal.dismiss(data, role);
            }
            return new Promise(function (resolve, reject) {
                resolve();
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], ModalControllerComponent.prototype, "cssClass", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], ModalControllerComponent.prototype, "backdropDismiss", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], ModalControllerComponent.prototype, "showBackdrop", void 0);
        __decorate([
            core.ViewChild("modalContent", { static: true }),
            __metadata("design:type", core.TemplateRef)
        ], ModalControllerComponent.prototype, "content", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], ModalControllerComponent.prototype, "willEnter", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], ModalControllerComponent.prototype, "didEnter", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], ModalControllerComponent.prototype, "didDismiss", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], ModalControllerComponent.prototype, "willDismiss", void 0);
        ModalControllerComponent = __decorate([
            core.Component({
                selector: "ionx-modal-controller",
                template: "\n        <ng-template #modalContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
            }),
            __metadata("design:paramtypes", [angular.ModalController])
        ], ModalControllerComponent);
        return ModalControllerComponent;
    }());
    var ModalControllerContentComponent = /** @class */ (function () {
        function ModalControllerContentComponent() {
            //this.template = params.get("template");
        }
        ModalControllerContentComponent.prototype.ngOnDestroy = function () {
            this.template = undefined;
        };
        ModalControllerContentComponent = __decorate([
            core.Component({
                template: "\n        <ng-container *ngTemplateOutlet=\"template\"></ng-container>\n    "
            }),
            __metadata("design:paramtypes", [])
        ], ModalControllerContentComponent);
        return ModalControllerContentComponent;
    }());

    var ModalModule = /** @class */ (function () {
        function ModalModule() {
        }
        ModalModule = __decorate([
            core.NgModule({
                declarations: [ModalControllerComponent, ModalControllerContentComponent],
                exports: [ModalControllerComponent],
                imports: [common.CommonModule, angular.IonicModule],
                entryComponents: [ModalControllerComponent, ModalControllerContentComponent]
            })
        ], ModalModule);
        return ModalModule;
    }());

    var PopoverControllerComponent = /** @class */ (function () {
        function PopoverControllerComponent(controller) {
            this.controller = controller;
            this.willEnter = new core.EventEmitter();
            this.didEnter = new core.EventEmitter();
            this.didDismiss = new core.EventEmitter();
            this.willDismiss = new core.EventEmitter();
            this._dismissing = false;
            this._presented = false;
        }
        PopoverControllerComponent.prototype.present = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // already opened - should we close existing and open new?
                            if (this.popover) {
                                return [2 /*return*/];
                            }
                            _a = this;
                            return [4 /*yield*/, this.controller.create({ component: PopoverControllerContentComponent, componentProps: { template: this.content }, backdropDismiss: this.enableBackdropDismiss, showBackdrop: this.showBackdrop, cssClass: this.cssClass, event: event })];
                        case 1:
                            _a.popover = (_b.sent());
                            this.willEnter.next();
                            return [4 /*yield*/, this.popover.present()];
                        case 2:
                            _b.sent();
                            this.didEnter.next();
                            this._presented = true;
                            return [4 /*yield*/, this.popover.onWillDismiss()];
                        case 3:
                            if (_b.sent()) {
                                this.willDismiss.next();
                            }
                            this._dismissing = true;
                            return [4 /*yield*/, this.popover.onDidDismiss()];
                        case 4:
                            if (_b.sent()) {
                                this.didDismiss.next();
                                this.popover = undefined;
                                this._presented = false;
                                this._dismissing = false;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(PopoverControllerComponent.prototype, "dismissing", {
            get: function () {
                return this._dismissing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PopoverControllerComponent.prototype, "presented", {
            get: function () {
                return this._presented;
            },
            enumerable: true,
            configurable: true
        });
        PopoverControllerComponent.prototype.dismiss = function (data, role) {
            if (this.popover) {
                return this.popover.dismiss(data, role);
            }
            return new Promise(function (resolve, reject) {
                resolve();
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], PopoverControllerComponent.prototype, "cssClass", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], PopoverControllerComponent.prototype, "enableBackdropDismiss", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], PopoverControllerComponent.prototype, "showBackdrop", void 0);
        __decorate([
            core.ViewChild("popoverContent", { static: true }),
            __metadata("design:type", core.TemplateRef)
        ], PopoverControllerComponent.prototype, "content", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], PopoverControllerComponent.prototype, "willEnter", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], PopoverControllerComponent.prototype, "didEnter", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], PopoverControllerComponent.prototype, "didDismiss", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], PopoverControllerComponent.prototype, "willDismiss", void 0);
        PopoverControllerComponent = __decorate([
            core.Component({
                selector: "ionx-popover-controller",
                encapsulation: core.ViewEncapsulation.None,
                template: "\n        <ng-template #popoverContent>\n            <ng-content></ng-content>\n        </ng-template>\n    "
            }),
            __metadata("design:paramtypes", [angular.PopoverController])
        ], PopoverControllerComponent);
        return PopoverControllerComponent;
    }());
    var PopoverControllerContentComponent = /** @class */ (function () {
        function PopoverControllerContentComponent() {
            //this.template = params.get("template");
        }
        PopoverControllerContentComponent.prototype.ngOnDestroy = function () {
            this.template = undefined;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", core.TemplateRef)
        ], PopoverControllerContentComponent.prototype, "template", void 0);
        PopoverControllerContentComponent = __decorate([
            core.Component({
                encapsulation: core.ViewEncapsulation.None,
                template: "\n        <ng-template [ngTemplateOutlet]=\"template\"></ng-template>\n    "
            }),
            __metadata("design:paramtypes", [])
        ], PopoverControllerContentComponent);
        return PopoverControllerContentComponent;
    }());

    var PopoverModule = /** @class */ (function () {
        function PopoverModule() {
        }
        PopoverModule = __decorate([
            core.NgModule({
                declarations: [PopoverControllerComponent, PopoverControllerContentComponent],
                exports: [PopoverControllerComponent],
                imports: [angular.IonicModule, common.CommonModule],
                entryComponents: [PopoverControllerComponent, PopoverControllerContentComponent]
            })
        ], PopoverModule);
        return PopoverModule;
    }());

    var PseudoInput = /** @class */ (function () {
        function PseudoInput(element) {
            this.element = element;
        }
        PseudoInput = __decorate([
            core.Component({
                selector: "ionx-pseudo-input",
                exportAs: "ionxPseudoInput",
                template: "<ng-content></ng-content>",
                styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}:host-context(.item-label-stacked) ionx-pseudo-input{align-self:flex-start;--padding-start:0}:host-context(.md.item-label-stacked) ionx-pseudo-input{--padding-top:10px;--padding-bottom:9px}:host-context(.ios.item-label-stacked) ionx-pseudo-input{--padding-top:9px;--padding-bottom:8px}"]
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], PseudoInput);
        return PseudoInput;
    }());

    var PseudoInputModule = /** @class */ (function () {
        function PseudoInputModule() {
        }
        PseudoInputModule = __decorate([
            core.NgModule({
                declarations: [PseudoInput],
                exports: [PseudoInput]
            })
        ], PseudoInputModule);
        return PseudoInputModule;
    }());

    var Spinner = /** @class */ (function () {
        function Spinner() {
            this.backdropVisible = false;
            this.fill = false;
        }
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], Spinner.prototype, "backdropVisible", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], Spinner.prototype, "fill", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Spinner.prototype, "color", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Spinner.prototype, "name", void 0);
        Spinner = __decorate([
            core.Component({
                selector: "ionx-spinner",
                template: "<ion-backdrop *ngIf=\"backdropVisible\"></ion-backdrop><ion-spinner [name]=\"name\" [color]=\"color\"></ion-spinner>",
                styles: [":host{position:relative;display:flex;align-items:center;justify-content:center}:host ion-backdrop{opacity:.1}:host[fill]{position:absolute;width:100%;height:100%;left:0;top:0}:host[always-on-top]{z-index:100000}"]
            })
        ], Spinner);
        return Spinner;
    }());

    var SpinnerModule = /** @class */ (function () {
        function SpinnerModule() {
        }
        SpinnerModule = __decorate([
            core.NgModule({
                declarations: [Spinner],
                exports: [Spinner],
                imports: [common.CommonModule, angular.IonicModule]
            })
        ], SpinnerModule);
        return SpinnerModule;
    }());

    var TextareaAutosize = /** @class */ (function () {
        function TextareaAutosize(element) {
            this.element = element;
        }
        TextareaAutosize.prototype.onChange = function () {
            this.adjust();
        };
        Object.defineProperty(TextareaAutosize.prototype, "textarea", {
            get: function () {
                return this.element.nativeElement.querySelector("textarea");
            },
            enumerable: true,
            configurable: true
        });
        TextareaAutosize.prototype.adjust = function () {
            var input = this.textarea;
            if (input) {
                input.style.overflow = "hidden";
                input.style.height = "auto";
                input.style.height = input.scrollHeight + "px";
            }
        };
        TextareaAutosize.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, core$1.waitTill(function () { return !!_this.textarea; })];
                        case 1:
                            _a.sent();
                            this.adjust();
                            return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            core.HostListener("ionChange"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TextareaAutosize.prototype, "onChange", null);
        TextareaAutosize = __decorate([
            core.Directive({
                selector: "ion-textarea[ionx-autosize]"
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], TextareaAutosize);
        return TextareaAutosize;
    }());

    var TextareaAutosizeModule = /** @class */ (function () {
        function TextareaAutosizeModule() {
        }
        TextareaAutosizeModule = __decorate([
            core.NgModule({
                declarations: [TextareaAutosize],
                exports: [TextareaAutosize],
                imports: [angular.IonicModule]
            })
        ], TextareaAutosizeModule);
        return TextareaAutosizeModule;
    }());

    var ToggleLabels = /** @class */ (function () {
        function ToggleLabels() {
        }
        ToggleLabels.prototype.switchOn = function () {
            this.toggle.checked = true;
        };
        ToggleLabels.prototype.switchOff = function () {
            this.toggle.checked = false;
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], ToggleLabels.prototype, "on", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], ToggleLabels.prototype, "off", void 0);
        __decorate([
            core.ContentChild(angular.IonToggle, { static: false }),
            __metadata("design:type", angular.IonToggle)
        ], ToggleLabels.prototype, "toggle", void 0);
        ToggleLabels = __decorate([
            core.Component({
                selector: "ionx-toggle-labels",
                template: "<span ionx--off (click)=\"switchOff()\">\n    <ng-template [ngIf]=\"!!off\">{{off}}</ng-template>\n    <ng-content select=\"[slot=off]\"></ng-content>\n    </span>\n\n<ng-content select=\"ion-toggle\"></ng-content>\n\n<span ionx--on (click)=\"switchOn()\">\n    <ng-template [ngIf]=\"!!on\">{{on}}</ng-template>\n    <ng-content select=\"[slot=on]\"></ng-content>\n</span>\n",
                styles: [":host{display:flex;align-items:center}:host ::ng-deep ion-toggle{-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:2px;padding-inline-end:2px}:host [ionx--on]{cursor:pointer;margin-left:4px}:host [ionx--off]{cursor:pointer;margin-right:4px}:host-context(.item-label-stacked){align-self:flex-start}:host-context(.ios.item-label-stacked){margin-top:2px;margin-bottom:2px}"]
            }),
            __metadata("design:paramtypes", [])
        ], ToggleLabels);
        return ToggleLabels;
    }());

    var ToggleLabelsModule = /** @class */ (function () {
        function ToggleLabelsModule() {
        }
        ToggleLabelsModule = __decorate([
            core.NgModule({
                declarations: [ToggleLabels],
                exports: [ToggleLabels],
                imports: [common.CommonModule, angular.IonicModule]
            })
        ], ToggleLabelsModule);
        return ToggleLabelsModule;
    }());

    var SelectLabel = /** @class */ (function () {
        function SelectLabel(templateRef, viewContainer) {
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
            this.separator = ", ";
        }
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SelectLabel.prototype, "separator", void 0);
        SelectLabel = __decorate([
            core.Directive({
                selector: "[ionxSelectLabel]"
            }),
            __metadata("design:paramtypes", [core.TemplateRef, core.ViewContainerRef])
        ], SelectLabel);
        return SelectLabel;
    }());

    var SelectOption = /** @class */ (function () {
        function SelectOption(element) {
            this.element = element;
        }
        Object.defineProperty(SelectOption.prototype, "label", {
            get: function () {
                return this.element.nativeElement.innerText;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SelectOption.prototype, "value", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SelectOption.prototype, "divider", void 0);
        SelectOption = __decorate([
            core.Component({
                selector: "ionx-select-option",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                template: "<ng-content></ng-content>"
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], SelectOption);
        return SelectOption;
    }());

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

    var SelectOverlayContent = /** @class */ (function () {
        function SelectOverlayContent(element, intl, popoverController, modalController) {
            this.element = element;
            this.intl = intl;
            this.popoverController = popoverController;
            this.modalController = modalController;
            this.multiple = false;
            this.whiteSpace = "nowrap";
        }
        Object.defineProperty(SelectOverlayContent.prototype, "popoverOverlay", {
            get: function () {
                return this.overlay == "popover";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectOverlayContent.prototype, "modalOverlay", {
            get: function () {
                return this.overlay == "modal";
            },
            enumerable: true,
            configurable: true
        });
        SelectOverlayContent.prototype.optionDivider = function (option, index, options) {
            for (var i = 0; i < this.options.length; i++) {
                if (this.options[i] === option && i > 0 && this.options[i - 1].divider) {
                    return this.options[i - 1];
                }
            }
        };
        SelectOverlayContent.prototype.optionClicked = function (option, ev) {
            if (option.checked && !this.empty && this.checkedOptions.length === 1 && this.checkedOptions[0] === option) {
                ev.preventDefault();
                ev.stopPropagation();
                ev.stopImmediatePropagation();
            }
        };
        SelectOverlayContent.prototype.optionBeforeChange = function (option) {
            this.lastClickedOption = option;
            option.checkedTimestamp = Date.now();
        };
        SelectOverlayContent.prototype.optionChanged = function (option) {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e;
            if (!this.lastClickedOption || option !== this.lastClickedOption) {
                return;
            }
            if (this.multiple && this.valueValidator) {
                var values = [];
                try {
                    for (var _f = __values(this.checkedOptions), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var o = _g.value;
                        if (o !== option) {
                            values.push(o.value);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var optionWasChecked = option.checked;
                try {
                    for (var _h = __values(this.options), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var o = _j.value;
                        o.checked = false;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                this.checkedOptions = [];
                try {
                    VALUES: for (var _k = __values(this.valueValidator(option.value, optionWasChecked, values) || []), _l = _k.next(); !_l.done; _l = _k.next()) {
                        var v = _l.value;
                        try {
                            for (var _m = __values(this.options), _o = _m.next(); !_o.done; _o = _m.next()) {
                                var o = _o.value;
                                if (this.valueComparator(o.value, v)) {
                                    o.checked = true;
                                    this.checkedOptions.push(o);
                                    continue VALUES;
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            else {
                if (!option.checked) {
                    for (var i = 0; i < this.checkedOptions.length; i++) {
                        if (this.checkedOptions[i] === option) {
                            this.checkedOptions.splice(i, 1);
                            break;
                        }
                    }
                }
                else {
                    if (!this.multiple) {
                        try {
                            for (var _p = __values(this.options), _q = _p.next(); !_q.done; _q = _p.next()) {
                                var o = _q.value;
                                if (o.checked && o !== option) {
                                    o.checked = false;
                                }
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        this.checkedOptions = [option];
                    }
                    else {
                        this.checkedOptions.push(option);
                    }
                }
            }
            if (!this.multiple) {
                this.okClicked();
            }
            this.lastClickedOption = undefined;
        };
        SelectOverlayContent.prototype.buildVisibleOptions = function () {
            var e_6, _a;
            for (var i = 0; i < this.options.length; i++) {
                if (this.options[i].divider) {
                    this.options[i].hidden = true;
                    if (this.options.length - 1 > i) {
                        for (var ii = i + 1; ii < this.options.length; ii++) {
                            if (this.options[ii].divider) {
                                break;
                            }
                            if (!this.options[ii].hidden) {
                                this.options[i].hidden = false;
                                break;
                            }
                        }
                    }
                }
            }
            this.visibleOptions = [];
            try {
                for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var option = _c.value;
                    if (!option.hidden) {
                        this.visibleOptions.push(option);
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        };
        SelectOverlayContent.prototype.initOptions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var e_7, _a, _b, _c, option, indexToScroll, i;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            this.checkedOptions = [];
                            try {
                                for (_b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    option = _c.value;
                                    if (option.checked) {
                                        this.checkedOptions.push(option);
                                    }
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                            if (this.orderable) {
                                this.checkedOptions.sort(function (a, b) { return a.checkedTimestamp - b.checkedTimestamp; });
                            }
                            this.buildVisibleOptions();
                            if (!(this.checkedOptions.length > 0)) return [3 /*break*/, 2];
                            if (!this.modalOverlay) return [3 /*break*/, 2];
                            return [4 /*yield*/, core$1.waitTill(function () { return !!_this.scroll; })];
                        case 1:
                            _d.sent();
                            indexToScroll = -1;
                            for (i = 0; i < this.visibleOptions.length; i++) {
                                if (this.visibleOptions[i].checked) {
                                    indexToScroll = i;
                                    break;
                                }
                            }
                            this.scroll.scrollToIndex(indexToScroll);
                            _d.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        SelectOverlayContent.prototype.okClicked = function () {
            var e_8, _a, e_9, _b, e_10, _c;
            var values = [];
            if (this.orderable) {
                try {
                    for (var _d = __values(this.checkedOptions), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var o = _e.value;
                        values.push(o.value);
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
            else {
                try {
                    OPTIONS: for (var _f = __values(this.options), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var option = _g.value;
                        try {
                            for (var _h = __values(this.checkedOptions), _j = _h.next(); !_j.done; _j = _h.next()) {
                                var checked = _j.value;
                                if (option === checked) {
                                    values.push(checked.value);
                                    continue OPTIONS;
                                }
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
            this.updateValues(values);
            if (this.popoverController && this.popoverOverlay) {
                this.popoverController.dismiss();
            }
            else if (this.modalController && this.modalOverlay) {
                this.modalController.dismiss();
            }
        };
        SelectOverlayContent.prototype.cancelClicked = function () {
            if (this.popoverController && this.popoverOverlay) {
                this.popoverController.dismiss();
            }
            else if (this.modalController && this.modalOverlay) {
                this.modalController.dismiss();
            }
        };
        SelectOverlayContent.prototype.search = function (ev) {
            var e_11, _a;
            var query = this.searchbar.nativeElement.value ? this.searchbar.nativeElement.value.toString() : undefined;
            if (query) {
                query = query.trim().toLowerCase();
            }
            try {
                for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var o = _c.value;
                    if (!query) {
                        o.hidden = false;
                    }
                    else {
                        o.hidden = this.searchHandler ? !this.searchHandler(query, o.value, o.label) : (o.label || "").toLowerCase().indexOf(query) < 0;
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
            this.buildVisibleOptions();
        };
        SelectOverlayContent.prototype.ngOnInit = function () {
            if (this.popoverOverlay) {
                this.initOptions();
            }
            else {
                var modal = this.element.nativeElement.closest("ion-modal");
                if (modal.classList.contains("modal-ios")) {
                    this.itemHeight = 44.55;
                }
                else {
                    this.itemHeight = 49;
                }
            }
        };
        SelectOverlayContent.prototype.resetScrollHeight = function () {
            return __awaiter(this, void 0, void 0, function () {
                var oldHeight, newHeight;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            oldHeight = this.scrollHeight;
                            newHeight = this.content.nativeElement.offsetHeight;
                            if (!(newHeight == oldHeight)) return [3 /*break*/, 2];
                            return [4 /*yield*/, core$1.waitTill(function () {
                                    newHeight = _this.content.nativeElement.offsetHeight;
                                    return newHeight !== oldHeight;
                                }, undefined, 2000)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.scrollHeight = newHeight;
                            if (typeof oldHeight !== "number" && this.scroll) {
                                this.scroll.checkViewportSize();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        SelectOverlayContent.prototype.ionViewDidEnter = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.modalOverlay) return [3 /*break*/, 3];
                            this.resetScrollHeight();
                            if (!(!window["cordova"] || window["cordova"].platformId === "browser")) return [3 /*break*/, 2];
                            return [4 /*yield*/, core$1.waitTill(function () { return !!_this.searchbar && !!_this.searchbar.nativeElement.querySelector("input"); })];
                        case 1:
                            _a.sent();
                            this.searchbar.nativeElement.setFocus();
                            _a.label = 2;
                        case 2:
                            this.initOptions();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SelectOverlayContent.prototype, "overlay", void 0);
        __decorate([
            core.ViewChild(scrolling.CdkVirtualScrollViewport, { static: false }),
            __metadata("design:type", scrolling.CdkVirtualScrollViewport)
        ], SelectOverlayContent.prototype, "scroll", void 0);
        __decorate([
            core.ViewChild("content", { read: core.ElementRef, static: false }),
            __metadata("design:type", core.ElementRef)
        ], SelectOverlayContent.prototype, "content", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SelectOverlayContent.prototype, "multiple", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SelectOverlayContent.prototype, "orderable", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], SelectOverlayContent.prototype, "updateValues", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SelectOverlayContent.prototype, "title", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], SelectOverlayContent.prototype, "searchHandler", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], SelectOverlayContent.prototype, "valueValidator", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], SelectOverlayContent.prototype, "valueComparator", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", SelectLabel)
        ], SelectOverlayContent.prototype, "label", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], SelectOverlayContent.prototype, "options", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], SelectOverlayContent.prototype, "empty", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], SelectOverlayContent.prototype, "whiteSpace", void 0);
        __decorate([
            core.ViewChild("searchbar", { read: core.ElementRef, static: false }),
            __metadata("design:type", core.ElementRef)
        ], SelectOverlayContent.prototype, "searchbar", void 0);
        __decorate([
            core.HostListener("window:resize"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", Promise)
        ], SelectOverlayContent.prototype, "resetScrollHeight", null);
        SelectOverlayContent = __decorate([
            core.Component({
                selector: "ionx-select-overlay",
                template: "<ion-header *ngIf=\"modalOverlay\">\n    <ion-toolbar>\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"start\">\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"cancelClicked()\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ionx-buttons>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" color=\"primary\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\"\n                       (ionInput)=\"search($event)\"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n<ion-content [scrollY]=\"false\" [scrollX]=\"false\" #content>\n\n    <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ng-template [ngIf]=\"!!visibleOptions\">\n        <div>\n\n            <cdk-virtual-scroll-viewport [itemSize]=\"itemHeight\" [style.height.px]=\"scrollHeight\" *ngIf=\"modalOverlay\">\n\n                <ion-list lines=\"full\">\n\n                    <ion-item detail=\"false\" [button]=\"!option.divider\" [style.fontWeight]=\"option.divider ? 500 : null\" #listItem *cdkVirtualFor=\"let option of visibleOptions\">\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"\n                                      *ngIf=\"!option.divider\"></ion-checkbox>\n                        <ion-label>\n                            <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                            <ng-template #customLabel>\n                                <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                            </ng-template>\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n            </cdk-virtual-scroll-viewport>\n\n            <ion-list lines=\"full\" *ngIf=\"popoverOverlay\">\n\n                <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n\n                    <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                        <ion-label>{{option.label}}</ion-label>\n                    </ion-item-divider>\n\n                    <ng-template #basicOption>\n\n                        <ion-item detail=\"false\" button=\"true\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\"></ion-checkbox>\n                            <ion-label [style.whiteSpace]=\"whiteSpace\">\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n\n                    </ng-template>\n\n                </ng-template>\n            </ion-list>\n        </div>\n    </ng-template>\n\n</ion-content>\n\n<ion-footer *ngIf=\"multiple && popoverOverlay\" style=\"position: sticky; bottom: 0px\">\n    <ion-toolbar>\n        <ion-buttons slot=\"end\">\n\n            <ion-button size=\"small\" (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-button>\n\n            <ion-button size=\"small\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-button>\n\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
                styles: ["@media (min-width:768px){::ng-deep .ionx-select-overlay-width .popover-content{--width:300px;--max-width:90%}}@media (max-width:767px){::ng-deep .ionx-select-overlay-width .popover-content{left:calc(16px + var(--ion-safe-area-left,0px))!important;width:calc(100% - (32px + var(--ion-safe-area-right,0px) + var(--ion-safe-area-left,0px)))}}:host .ionx-select-overlay-spinner{position:absolute;width:100%;height:100%;left:0;top:0}:host .ionx-select-overlay-spinner ion-spinner{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}:host ion-checkbox{margin-right:16px;margin-top:8px;margin-bottom:8px}:host ion-list{margin:4px 0;padding:0}:host ::ng-deep .cdk-virtual-scroll-content-wrapper{max-width:100%}:host ::ng-deep .hydrated{visibility:visible}:host-context(ion-popover) ion-content{--overflow:initial!important}:host-context(ion-popover) ion-content ion-item ion-label{white-space:normal}:host-context(ion-popover) ion-content ion-item.item:last-child{--border-width:0px}:host-context(.ios) ion-item-divider{--background:transparent;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500}"]
            }),
            __param(2, core.Optional()),
            __param(3, core.Optional()),
            __metadata("design:paramtypes", [core.ElementRef,
                angularIntl.IntlService,
                angular.PopoverController,
                angular.ModalController])
        ], SelectOverlayContent);
        return SelectOverlayContent;
    }());

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
            this.ionChange = new core.EventEmitter();
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
                var e_1, _a, e_2, _b, e_3, _c, overlay, options, _d, _e, option, valueIndex, _f, _g, option, valueIndex, _h, _j, option, valueIndex, overlayTitle, title, label, overlayData, popover, modal;
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
                                    for (_d = __values(this.options), _e = _d.next(); !_e.done; _e = _d.next()) {
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
                                    for (_f = __values(this.options), _g = _f.next(); !_g.done; _g = _f.next()) {
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
                                    for (_h = __values(this.optionsComponents.toArray()), _j = _h.next(); !_j.done; _j = _h.next()) {
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
        // private initDragula() {
        //
        //     if (this.orderable && !this.disabled && !this.readonly) {
        //
        //         if (this.dragula) {
        //             return;
        //         }
        //
        //         this.dragula = (dragula as any)({
        //             containers: [this.textContainer.nativeElement],
        //             direction: "horizontal",
        //
        //             moves: (el, container, handle) => {
        //                 return this.values && this.values.length > 1;
        //             }
        //         });
        //
        //         this.dragula.on("drop", (el, target, source, sibling) => {
        //
        //             const startIndex = parseInt(el.getAttribute("ionx--index"), 0);
        //             let endIndex = sibling ? parseInt(sibling.getAttribute("ionx--index"), 0) : this.values.length;
        //
        //             if (endIndex > startIndex) {
        //                 endIndex -= 1;
        //             }
        //
        //             const element = this.values[startIndex];
        //             this.values.splice(startIndex, 1);
        //             this.values.splice(endIndex, 0, element);
        //
        //             if (this.controlOnChange) {
        //                 this.controlOnChange(this.values.slice());
        //             }
        //
        //             this.ionChange.emit(this.values.slice());
        //         });
        //
        //     } else if (this.dragula) {
        //         this.dragula.destroy();
        //         this.dragula = undefined;
        //     }
        // }
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
                // this.initDragula();
                this.updateCssClasses();
            }
        };
        Select.prototype.ngOnInit = function () {
            //this.updateText();
            this.updateCssClasses();
            if (this.orderable) {
                // this.initDragula();
            }
        };
        __decorate([
            core.ViewChild("textContainer", { static: true }),
            __metadata("design:type", core.ElementRef)
        ], Select.prototype, "textContainer", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Select.prototype, "placeholder", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Select.prototype, "overlay", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Select.prototype, "overlayWhiteSpace", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], Select.prototype, "alwaysArray", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], Select.prototype, "compareAsString", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], Select.prototype, "comparator", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], Select.prototype, "multiple", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Select.prototype, "title", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], Select.prototype, "orderable", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], Select.prototype, "empty", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], Select.prototype, "readonly", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], Select.prototype, "searchTest", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], Select.prototype, "checkValidator", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Select.prototype, "ionChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], Select.prototype, "change", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], Select.prototype, "disabled", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], Select.prototype, "value", null);
        __decorate([
            core.ContentChild(SelectLabel, { static: false }),
            __metadata("design:type", SelectLabel)
        ], Select.prototype, "labelTemplate", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Function)
        ], Select.prototype, "label", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], Select.prototype, "options", void 0);
        __decorate([
            core.ContentChildren(SelectOption),
            __metadata("design:type", core.QueryList),
            __metadata("design:paramtypes", [core.QueryList])
        ], Select.prototype, "_optionsComponents", null);
        Select = __decorate([
            core.Component({
                selector: "ionx-select",
                host: {
                    "[attr.ionx--chips-layout]": "!!orderable || null",
                    "[attr.ionx--readonly]": "(!!readonly || !!disabled) || null",
                    "[attr.ionx--orderable]": "(!!orderable && !readonly && !disabled && values && values.length > 1) || null",
                },
                template: "<ng-template #optionTemplate let-value=\"value\" let-index=\"index\">\n    <span *ngIf=\"!labelTemplate; else hasLabelTemplate\">{{labelImpl$(value)}}</span>\n    <ng-template #hasLabelTemplate>\n        <ng-container *ngTemplateOutlet=\"labelTemplate.templateRef; context: {$implicit: value, index: index}\"></ng-container>\n    </ng-template>\n</ng-template>\n\n<div class=\"select-inner\">\n    <div class=\"select-text\" #textContainer [class.select-placeholder]=\"values.length == 0\">\n        <span *ngIf=\"values.length == 0; else showValues\">{{placeholder}}</span>\n        <ng-template #showValues>\n            <ng-template ngFor [ngForOf]=\"values\" let-value let-index=\"index\">\n                <span *ngIf=\"index > 0 && (!labelTemplate || labelTemplate.separator) && !orderable\">{{!labelTemplate ? \", \" : labelTemplate.separator}}</span>\n\n                <ion-chip *ngIf=\"orderable else simpleText\" outline=\"true\" [attr.ionx--index]=\"index\">\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ion-chip>\n\n                <ng-template #simpleText>\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ng-template>\n\n            </ng-template>\n        </ng-template>\n    </div>\n\n    <ng-container  *ngIf=\"!_readonly && !_disabled\">\n        <div class=\"select-icon\" role=\"presentation\" *ngIf=\"!orderable\">\n            <div class=\"select-icon-inner\"></div>\n        </div>\n        <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\" *ngIf=\"!orderable || !values || values.length === 0\"></button>\n    </ng-container>\n\n</div>\n",
                styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:inline-block;overflow:hidden;color:var(--color);font-family:var(--ion-font-family,inherit);max-width:100%}:host .select-inner{display:flex;position:relative}:host .select-icon{position:relative;width:16px;height:20px}:host .select-icon .select-icon-inner{top:50%;right:0;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:.33;pointer-events:none}:host .select-text.select-placeholder{opacity:.5}:host.select-disabled{opacity:.4;pointer-events:none}:host.select-readonly{opacity:1;pointer-events:none}:host.select-readonly .select-icon{display:none}:host[white-space-normal] .select-text{white-space:normal!important}:host button{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0}:host button::-moz-focus-inner{border:0}:host.in-item{position:static}:host ion-chip{max-width:calc(50% - 4px);-webkit-margin-start:0;margin-inline-start:0;margin-bottom:0;cursor:default}:host ion-chip>span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:1.1}:host [ionx--orderable] ion-chip{cursor:move}:host [ionx--chips-layout] .select-text{white-space:normal;width:100%}:host-context(ion-toolbar){color:var(--ion-toolbar-color);--icon-color:var(--ion-toolbar-color);--padding-start:16px;--padding-end:16px}:host-context(.item-label-stacked){align-self:flex-start;--padding-top:8px;--padding-bottom:8px;--padding-start:0;width:100%}:host-context(.item-label-stacked) .select-text{max-width:calc(100% - 16px);flex:initial}"]
            }),
            __param(4, core.Optional()),
            __metadata("design:paramtypes", [core.ElementRef, angularIntl.IntlService, angular.PopoverController, angular.ModalController, forms.NgControl])
        ], Select);
        return Select;
    }());

    var SelectModule = /** @class */ (function () {
        function SelectModule() {
        }
        SelectModule = __decorate([
            core.NgModule({
                declarations: [Select, SelectOption, SelectOverlayContent, SelectLabel],
                entryComponents: [Select, SelectOption, SelectOverlayContent],
                exports: [Select, SelectOption, SelectOverlayContent, SelectLabel],
                imports: [common.CommonModule, forms.FormsModule, angular.IonicModule, angularIntl.IntlModule, scrolling.ScrollingModule, ButtonsModule]
            })
        ], SelectModule);
        return SelectModule;
    }());

    var defaultDateTimeFormat = {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "2-digit", minute: "2-digit"
    };
    var defaultDateFormat = {
        year: "numeric", month: "numeric", day: "numeric"
    };

    var currentLocale;
    function timezoneInfo(tz, date) {
        if (!date) {
            date = new Date();
        }
        var format1 = { hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZone: tz };
        var format2 = { hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", timeZoneName: "short", timeZone: tz };
        if (!currentLocale) {
            currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
        }
        try {
            var d = new Intl.DateTimeFormat(currentLocale, format1).format(date);
            var o = new Intl.DateTimeFormat(currentLocale, format2).format(date).replace(d, "").trim();
            return { id: tz, label: tz.replace("_", " ") + " (" + o + ")", date: d };
        }
        catch (error) {
            throw new Error("Invalid timezone. " + error);
            // console.log(error);
        }
    }

    var rawTimezones = [
        "Europe/Andorra",
        "Asia/Dubai",
        "Asia/Kabul",
        "Europe/Tirane",
        "Asia/Yerevan",
        "Antarctica/Casey",
        "Antarctica/Davis",
        "Antarctica/DumontDUrville",
        "Antarctica/Mawson",
        "Antarctica/Palmer",
        "Antarctica/Rothera",
        "Antarctica/Syowa",
        "Antarctica/Troll",
        "Antarctica/Vostok",
        "America/Argentina/Buenos_Aires",
        "America/Argentina/Cordoba",
        "America/Argentina/Salta",
        "America/Argentina/Jujuy",
        "America/Argentina/Tucuman",
        "America/Argentina/Catamarca",
        "America/Argentina/La_Rioja",
        "America/Argentina/San_Juan",
        "America/Argentina/Mendoza",
        "America/Argentina/San_Luis",
        "America/Argentina/Rio_Gallegos",
        "America/Argentina/Ushuaia",
        "Pacific/Pago_Pago",
        "Europe/Vienna",
        "Australia/Lord_Howe",
        "Antarctica/Macquarie",
        "Australia/Hobart",
        "Australia/Currie",
        "Australia/Melbourne",
        "Australia/Sydney",
        "Australia/Broken_Hill",
        "Australia/Brisbane",
        "Australia/Lindeman",
        "Australia/Adelaide",
        "Australia/Darwin",
        "Australia/Perth",
        "Australia/Eucla",
        "Asia/Baku",
        "America/Barbados",
        "Asia/Dhaka",
        "Europe/Brussels",
        "Europe/Sofia",
        "Atlantic/Bermuda",
        "Asia/Brunei",
        "America/La_Paz",
        "America/Noronha",
        "America/Belem",
        "America/Fortaleza",
        "America/Recife",
        "America/Araguaina",
        "America/Maceio",
        "America/Bahia",
        "America/Sao_Paulo",
        "America/Campo_Grande",
        "America/Cuiaba",
        "America/Santarem",
        "America/Porto_Velho",
        "America/Boa_Vista",
        "America/Manaus",
        "America/Eirunepe",
        "America/Rio_Branco",
        "America/Nassau",
        "Asia/Thimphu",
        "Europe/Minsk",
        "America/Belize",
        "America/St_Johns",
        "America/Halifax",
        "America/Glace_Bay",
        "America/Moncton",
        "America/Goose_Bay",
        "America/Blanc-Sablon",
        "America/Toronto",
        "America/Nipigon",
        "America/Thunder_Bay",
        "America/Iqaluit",
        "America/Pangnirtung",
        "America/Atikokan",
        "America/Winnipeg",
        "America/Rainy_River",
        "America/Resolute",
        "America/Rankin_Inlet",
        "America/Regina",
        "America/Swift_Current",
        "America/Edmonton",
        "America/Cambridge_Bay",
        "America/Yellowknife",
        "America/Inuvik",
        "America/Creston",
        "America/Dawson_Creek",
        "America/Fort_Nelson",
        "America/Vancouver",
        "America/Whitehorse",
        "America/Dawson",
        "Indian/Cocos",
        "Europe/Zurich",
        "Africa/Abidjan",
        "Pacific/Rarotonga",
        "America/Santiago",
        "America/Punta_Arenas",
        "Pacific/Easter",
        "Asia/Shanghai",
        "Asia/Urumqi",
        "America/Bogota",
        "America/Costa_Rica",
        "America/Havana",
        "Atlantic/Cape_Verde",
        "America/Curacao",
        "Indian/Christmas",
        "Asia/Nicosia",
        "Asia/Famagusta",
        "Europe/Prague",
        "Europe/Berlin",
        "Europe/Copenhagen",
        "America/Santo_Domingo",
        "Africa/Algiers",
        "America/Guayaquil",
        "Pacific/Galapagos",
        "Europe/Tallinn",
        "Africa/Cairo",
        "Africa/El_Aaiun",
        "Europe/Madrid",
        "Africa/Ceuta",
        "Atlantic/Canary",
        "Europe/Helsinki",
        "Pacific/Fiji",
        "Atlantic/Stanley",
        "Pacific/Chuuk",
        "Pacific/Pohnpei",
        "Pacific/Kosrae",
        "Atlantic/Faroe",
        "Europe/Paris",
        "Europe/London",
        "Asia/Tbilisi",
        "America/Cayenne",
        "Africa/Accra",
        "Europe/Gibraltar",
        "America/Godthab",
        "America/Danmarkshavn",
        "America/Scoresbysund",
        "America/Thule",
        "Europe/Athens",
        "Atlantic/South_Georgia",
        "America/Guatemala",
        "Pacific/Guam",
        "Africa/Bissau",
        "America/Guyana",
        "Asia/Hong_Kong",
        "America/Tegucigalpa",
        "America/Port-au-Prince",
        "Europe/Budapest",
        "Asia/Jakarta",
        "Asia/Pontianak",
        "Asia/Makassar",
        "Asia/Jayapura",
        "Europe/Dublin",
        "Asia/Jerusalem",
        "Asia/Kolkata",
        "Indian/Chagos",
        "Asia/Baghdad",
        "Asia/Tehran",
        "Atlantic/Reykjavik",
        "Europe/Rome",
        "America/Jamaica",
        "Asia/Amman",
        "Asia/Tokyo",
        "Africa/Nairobi",
        "Asia/Bishkek",
        "Pacific/Tarawa",
        "Pacific/Enderbury",
        "Pacific/Kiritimati",
        "Asia/Pyongyang",
        "Asia/Seoul",
        "Asia/Almaty",
        "Asia/Qyzylorda",
        "Asia/Qostanay",
        "Asia/Aqtobe",
        "Asia/Aqtau",
        "Asia/Atyrau",
        "Asia/Oral",
        "Asia/Beirut",
        "Asia/Colombo",
        "Africa/Monrovia",
        "Europe/Vilnius",
        "Europe/Luxembourg",
        "Europe/Riga",
        "Africa/Tripoli",
        "Africa/Casablanca",
        "Europe/Monaco",
        "Europe/Chisinau",
        "Pacific/Majuro",
        "Pacific/Kwajalein",
        "Asia/Yangon",
        "Asia/Ulaanbaatar",
        "Asia/Hovd",
        "Asia/Choibalsan",
        "Asia/Macau",
        "America/Martinique",
        "Europe/Malta",
        "Indian/Mauritius",
        "Indian/Maldives",
        "America/Mexico_City",
        "America/Cancun",
        "America/Merida",
        "America/Monterrey",
        "America/Matamoros",
        "America/Mazatlan",
        "America/Chihuahua",
        "America/Ojinaga",
        "America/Hermosillo",
        "America/Tijuana",
        "America/Bahia_Banderas",
        "Asia/Kuala_Lumpur",
        "Asia/Kuching",
        "Africa/Maputo",
        "Africa/Windhoek",
        "Pacific/Noumea",
        "Pacific/Norfolk",
        "Africa/Lagos",
        "America/Managua",
        "Europe/Amsterdam",
        "Europe/Oslo",
        "Asia/Kathmandu",
        "Pacific/Nauru",
        "Pacific/Niue",
        "Pacific/Auckland",
        "Pacific/Chatham",
        "America/Panama",
        "America/Lima",
        "Pacific/Tahiti",
        "Pacific/Marquesas",
        "Pacific/Gambier",
        "Pacific/Port_Moresby",
        "Pacific/Bougainville",
        "Asia/Manila",
        "Asia/Karachi",
        "Europe/Warsaw",
        "America/Miquelon",
        "Pacific/Pitcairn",
        "America/Puerto_Rico",
        "Asia/Gaza",
        "Asia/Hebron",
        "Europe/Lisbon",
        "Atlantic/Madeira",
        "Atlantic/Azores",
        "Pacific/Palau",
        "America/Asuncion",
        "Asia/Qatar",
        "Indian/Reunion",
        "Europe/Bucharest",
        "Europe/Belgrade",
        "Europe/Kaliningrad",
        "Europe/Moscow",
        "Europe/Simferopol",
        "Europe/Kirov",
        "Europe/Astrakhan",
        "Europe/Volgograd",
        "Europe/Saratov",
        "Europe/Ulyanovsk",
        "Europe/Samara",
        "Asia/Yekaterinburg",
        "Asia/Omsk",
        "Asia/Novosibirsk",
        "Asia/Barnaul",
        "Asia/Tomsk",
        "Asia/Novokuznetsk",
        "Asia/Krasnoyarsk",
        "Asia/Irkutsk",
        "Asia/Chita",
        "Asia/Yakutsk",
        "Asia/Khandyga",
        "Asia/Vladivostok",
        "Asia/Ust-Nera",
        "Asia/Magadan",
        "Asia/Sakhalin",
        "Asia/Srednekolymsk",
        "Asia/Kamchatka",
        "Asia/Anadyr",
        "Asia/Riyadh",
        "Pacific/Guadalcanal",
        "Indian/Mahe",
        "Africa/Khartoum",
        "Europe/Stockholm",
        "Asia/Singapore",
        "America/Paramaribo",
        "Africa/Juba",
        "Africa/Sao_Tome",
        "America/El_Salvador",
        "Asia/Damascus",
        "America/Grand_Turk",
        "Africa/Ndjamena",
        "Indian/Kerguelen",
        "Asia/Bangkok",
        "Asia/Dushanbe",
        "Pacific/Fakaofo",
        "Asia/Dili",
        "Asia/Ashgabat",
        "Africa/Tunis",
        "Pacific/Tongatapu",
        "Europe/Istanbul",
        "America/Port_of_Spain",
        "Pacific/Funafuti",
        "Asia/Taipei",
        "Europe/Kiev",
        "Europe/Uzhgorod",
        "Europe/Zaporozhye",
        "Pacific/Wake",
        "America/New_York",
        "America/Detroit",
        "America/Kentucky/Louisville",
        "America/Kentucky/Monticello",
        "America/Indiana/Indianapolis",
        "America/Indiana/Vincennes",
        "America/Indiana/Winamac",
        "America/Indiana/Marengo",
        "America/Indiana/Petersburg",
        "America/Indiana/Vevay",
        "America/Chicago",
        "America/Indiana/Tell_City",
        "America/Indiana/Knox",
        "America/Menominee",
        "America/North_Dakota/Center",
        "America/North_Dakota/New_Salem",
        "America/North_Dakota/Beulah",
        "America/Denver",
        "America/Boise",
        "America/Phoenix",
        "America/Los_Angeles",
        "America/Anchorage",
        "America/Juneau",
        "America/Sitka",
        "America/Metlakatla",
        "America/Yakutat",
        "America/Nome",
        "America/Adak",
        "Pacific/Honolulu",
        "America/Montevideo",
        "Asia/Samarkand",
        "Asia/Tashkent",
        "America/Caracas",
        "Asia/Ho_Chi_Minh",
        "Pacific/Efate",
        "Pacific/Wallis",
        "Pacific/Apia",
        "Africa/Johannesburg"
    ];
    function timezones(date) {
        var e_1, _a;
        if (!date) {
            date = new Date();
        }
        var unsorted = [];
        try {
            for (var rawTimezones_1 = __values(rawTimezones), rawTimezones_1_1 = rawTimezones_1.next(); !rawTimezones_1_1.done; rawTimezones_1_1 = rawTimezones_1.next()) {
                var tz = rawTimezones_1_1.value;
                try {
                    unsorted.push(timezoneInfo(tz, date));
                }
                catch (error) {
                    // console.warn(error);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (rawTimezones_1_1 && !rawTimezones_1_1.done && (_a = rawTimezones_1.return)) _a.call(rawTimezones_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return unsorted.sort(function (a, b) { return a.date.localeCompare(b.date); });
    }

    var weekdayNarrowFormat = {
        weekday: "short"
    };
    var monthYearFormat = {
        month: "long",
        year: "numeric"
    };
    var monthFormat = {
        month: "long"
    };
    var DateTimePickerOverlay = /** @class */ (function () {
        function DateTimePickerOverlay(viewController, intl, changeDetector) {
            this.viewController = viewController;
            this.intl = intl;
            this.changeDetector = changeDetector;
            this.dateView = "days";
            this.dateViews = [{ id: "days", label: this.intl.message("@co.mmons/ionic-extensions#Day") }, { id: "months", label: this.intl.message("@co.mmons/ionic-extensions#Month") }, { id: "years", label: this.intl.message("@co.mmons/ionic-extensions#Year") }];
        }
        DateTimePickerOverlay.prototype.dateViewChanged = function () {
            this.dateViewValue = new Date(this.value);
            this.generateDateValues();
            this.generateDateHeader();
        };
        DateTimePickerOverlay.prototype.dateViewMove = function (step) {
            if (this.dateView == "days") {
                this.dateViewValue.setUTCMonth(this.dateViewValue.getUTCMonth() + step);
            }
            else if (this.dateView == "months") {
                this.dateViewValue.setUTCFullYear(this.dateViewValue.getUTCFullYear() + step);
            }
            else if (this.dateView == "years") {
                var yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
                var yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
                var yearStart = 0;
                if (yearTens >= 80) {
                    yearStart = 80;
                }
                else if (yearTens >= 60) {
                    yearStart = 60;
                }
                else if (yearTens >= 40) {
                    yearStart = 40;
                }
                else if (yearTens >= 20) {
                    yearStart = 20;
                }
                this.dateViewValue.setUTCFullYear(yearHundret + yearStart + (20 * step));
            }
            this.generateDateValues();
            this.generateDateHeader();
        };
        DateTimePickerOverlay.prototype.dateValueClicked = function (value) {
            var e_1, _a;
            var tmpDate = new Date(this.dateViewValue);
            if (this.dateView == "days") {
                tmpDate.setUTCDate(value);
            }
            else if (this.dateView == "months") {
                tmpDate.setUTCMonth(value);
                for (var i = 1; i < 5; i++) {
                    if (tmpDate.getUTCMonth() != value) {
                        tmpDate = new Date(this.dateViewValue);
                        tmpDate.setUTCDate(tmpDate.getUTCDate() - i);
                        tmpDate.setUTCMonth(value);
                    }
                    else {
                        break;
                    }
                }
            }
            else if (this.dateView == "years") {
                tmpDate.setUTCFullYear(value);
                for (var i = 1; i < 5; i++) {
                    if (tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()) {
                        tmpDate = new Date(this.dateViewValue);
                        tmpDate.setUTCMonth(this.dateViewValue.getUTCMonth(), tmpDate.getUTCDate() - i);
                        tmpDate.setUTCFullYear(value);
                    }
                    else {
                        break;
                    }
                }
            }
            try {
                for (var _b = __values(this.dateValues), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var v = _c.value;
                    v.checked = v.id == value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.value = new Date(tmpDate);
            this.dateViewValue = new Date(tmpDate);
        };
        DateTimePickerOverlay.prototype.generateDateValues = function () {
            this.dateValues = [];
            var tmpDate = new Date(this.dateViewValue);
            if (this.dateView == "days") {
                for (var d = 1; d <= 33; d++) {
                    tmpDate.setUTCDate(d);
                    tmpDate.setUTCHours(0, 0, 0, 0);
                    this.dateValues.push({
                        id: d,
                        label: d,
                        sublabel: this.intl.dateFormat(tmpDate, weekdayNarrowFormat),
                        checked: (this.value.getUTCFullYear() == tmpDate.getUTCFullYear() && this.value.getUTCMonth() == tmpDate.getUTCMonth() && this.value.getUTCDate() == d),
                        hidden: tmpDate.getUTCMonth() != this.dateViewValue.getUTCMonth()
                    });
                }
            }
            else if (this.dateView == "months") {
                var tmpDate_1 = new Date(Date.UTC(1999, this.dateViewValue.getUTCMonth()));
                for (var m = 0; m < 12; m++) {
                    tmpDate_1.setUTCMonth(m);
                    this.dateValues.push({
                        id: m,
                        label: this.intl.dateFormat(tmpDate_1, monthFormat),
                        checked: this.value.getUTCFullYear() == this.dateViewValue.getUTCFullYear() && this.value.getUTCMonth() == m
                    });
                }
            }
            else if (this.dateView == "years") {
                var tmpDate_2 = new Date(this.dateViewValue);
                var yearHundret = Math.floor(tmpDate_2.getUTCFullYear() / 100) * 100;
                var yearTens = tmpDate_2.getUTCFullYear() - yearHundret;
                var yearStart = 0;
                if (yearTens >= 80) {
                    yearStart = 80;
                }
                else if (yearTens >= 60) {
                    yearStart = 60;
                }
                else if (yearTens >= 40) {
                    yearStart = 40;
                }
                else if (yearTens >= 20) {
                    yearStart = 20;
                }
                tmpDate_2.setUTCFullYear(yearHundret + yearStart - 1);
                for (var y = 0; y < 20; y++) {
                    tmpDate_2.setUTCFullYear(tmpDate_2.getUTCFullYear() + 1);
                    this.dateValues.push({
                        id: tmpDate_2.getUTCFullYear(),
                        label: tmpDate_2.getUTCFullYear(),
                        checked: this.value.getUTCFullYear() == tmpDate_2.getUTCFullYear()
                    });
                }
            }
        };
        DateTimePickerOverlay.prototype.generateDateHeader = function () {
            if (this.dateView == "days") {
                this.dateHeader = this.intl.dateFormat(this.dateViewValue, monthYearFormat);
            }
            else if (this.dateView == "months") {
                this.dateHeader = this.dateViewValue.getUTCFullYear() + "";
            }
            else if (this.dateView == "years") {
                var yearHundret = Math.floor(this.dateViewValue.getUTCFullYear() / 100) * 100;
                var yearTens = this.dateViewValue.getUTCFullYear() - yearHundret;
                var yearStart = 0;
                if (yearTens >= 80) {
                    yearStart = 80;
                }
                else if (yearTens >= 60) {
                    yearStart = 60;
                }
                else if (yearTens >= 40) {
                    yearStart = 40;
                }
                else if (yearTens >= 20) {
                    yearStart = 20;
                }
                this.dateHeader = yearHundret + yearStart + " - " + (yearHundret + yearStart + 19);
            }
        };
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeVisible", {
            get: function () {
                return !!this.formatOptions.hour || !!this.formatOptions.hour12 || !!this.formatOptions.minute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeHoursFormatted", {
            get: function () {
                return this.formatTime(this.value.getUTCHours());
            },
            set: function (hours) {
                try {
                    var h = parseInt(hours);
                    if (!isNaN(h)) {
                        this.timeHours = h;
                    }
                    else {
                        this.timeHours = 0;
                    }
                }
                catch (_a) {
                    this.timeHours = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeHours", {
            get: function () {
                return this.value.getUTCHours();
            },
            set: function (hours) {
                if (hours < 0 || hours > 23) {
                    hours = 0;
                }
                this.value.setUTCHours(hours);
                this.dateViewValue.setUTCHours(hours);
                this.changeDetector.detectChanges();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeMinutesFormatted", {
            get: function () {
                return this.formatTime(this.value.getUTCMinutes());
            },
            set: function (minutes) {
                try {
                    var h = parseInt(minutes);
                    if (!isNaN(h)) {
                        this.timeMinutes = h;
                    }
                    else {
                        this.timeMinutes = 0;
                    }
                }
                catch (_a) {
                    this.timeMinutes = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateTimePickerOverlay.prototype, "timeMinutes", {
            get: function () {
                return this.value.getUTCMinutes();
            },
            set: function (minutes) {
                if (minutes < 0 || minutes > 59) {
                    minutes = 0;
                }
                this.value.setUTCMinutes(minutes);
                this.dateViewValue.setUTCMinutes(minutes);
                this.changeDetector.detectChanges();
            },
            enumerable: true,
            configurable: true
        });
        DateTimePickerOverlay.prototype.formatTime = function (value) {
            if (value < 10) {
                return "0" + value;
            }
            else {
                return value + "";
            }
        };
        DateTimePickerOverlay.prototype.todayClicked = function () {
            var now = new Date();
            this.value.setUTCFullYear(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
            this.dateViewValue = new Date(this.value);
            this.generateDateValues();
            this.generateDateHeader();
        };
        DateTimePickerOverlay.prototype.cancelClicked = function () {
            this.viewController.dismiss();
        };
        DateTimePickerOverlay.prototype.doneClicked = function () {
            var value = this.value;
            if (this.timezone && this.timezone !== "UTC") {
                value = new Date(value.getTime() - (core$1.DateTimezone.timezoneOffset(this.timezone, this.value) * 60 * 1000 * -1));
            }
            this.viewController.dismiss(new core$1.DateTimezone(value, this.timezone), null);
        };
        DateTimePickerOverlay.prototype.loadTimezones = function () {
            return __awaiter(this, void 0, void 0, function () {
                var e_2, _a, _b, _c, t;
                return __generator(this, function (_d) {
                    this.timezones = new SelectOptions();
                    try {
                        for (_b = __values(timezones(this.value)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            t = _c.value;
                            this.timezones.pushOption(t.id, t.label);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [2 /*return*/];
                });
            });
        };
        DateTimePickerOverlay.prototype.ngOnInit = function () {
            this.dateViewValue = new Date(this.value);
            this.generateDateValues();
            this.generateDateHeader();
            if (!this.timezoneDisabled) {
                if (this.timezone) {
                    try {
                        var info = timezoneInfo(this.timezone);
                        this.timezones = new SelectOptions();
                        this.timezones.pushOption(info.id, info.label);
                    }
                    catch (error) {
                        // console.warn(error);
                    }
                }
                this.loadTimezones();
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Date)
        ], DateTimePickerOverlay.prototype, "value", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], DateTimePickerOverlay.prototype, "formatOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateTimePickerOverlay.prototype, "title", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateTimePickerOverlay.prototype, "timezone", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], DateTimePickerOverlay.prototype, "timezoneDisabled", void 0);
        DateTimePickerOverlay = __decorate([
            core.Component({
                selector: "ionx-datetime-overlay",
                template: "<ion-header>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-button (click)=\"cancelClicked()\" fill=\"clear\">\n                <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n            </ion-button>\n        </ion-buttons>\n\n        <ion-title>{{title}}</ion-title>\n\n        <ion-buttons slot=\"end\">\n            <ion-button (click)=\"doneClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"dateView\" (ionChange)=\"dateViewChanged()\">\n            <ion-segment-button *ngFor=\"let view of dateViews\" [value]=\"view.id\">{{view.label}}</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n\n    <div>\n\n        <ion-row ionx--values-header>\n            <ion-col size=\"3\">\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(-1)\">\n                    <ion-icon name=\"arrow-dropleft\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" text-center>{{dateHeader}}</ion-col>\n            <ion-col size=\"3\" text-right>\n                <ion-button fill=\"clear\" (click)=\"dateViewMove(1)\">\n                    <ion-icon name=\"arrow-dropright\" slot=\"icon-only\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n\n        <ion-row ionx--values-grid style=\"margin: 0px 14px\">\n            <ion-col *ngFor=\"let value of dateValues\" [size]=\"dateView == 'years' ? 3 : (dateView == 'months' ? 6 : 2)\" [style.visibility]=\"value.hidden ? 'hidden' : 'visible'\">\n                <ion-button [fill]=\"!value.checked ? 'outline' : 'solid'\" (click)=\"dateValueClicked(value.id)\">\n                    <div>\n                        <div>{{value.label}}</div>\n                        <small *ngIf=\"value.sublabel\">{{value.sublabel}}</small>\n                    </div>\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" *ngIf=\"dateView == 'days'\">\n                <ion-button (click)=\"todayClicked()\">{{\"@co.mmons/ionic-extensions#Today\" | intlMessage}}</ion-button>\n            </ion-col>\n        </ion-row>\n\n    </div>\n\n</ion-content>\n\n<ion-footer *ngIf=\"timeVisible\">\n    <ion-toolbar>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeHoursFormatted\" [min]=\"0\" [max]=\"23\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeHours\" min=\"0\" max=\"23\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"3\">\n                <ion-input type=\"number\" [(ngModel)]=\"timeMinutesFormatted\" [min]=\"0\" [max]=\"59\" inputmode=\"numeric\"></ion-input>\n            </ion-col>\n            <ion-col>\n                <ion-range [(ngModel)]=\"timeMinutes\" min=\"0\" max=\"59\" step=\"1\"></ion-range>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf=\"!timezoneDisabled\">\n            <ion-col size=\"3\"></ion-col>\n            <ion-col size=\"9\">\n                <ionx-select [options]=\"timezones\" [(ngModel)]=\"timezone\" overlay=\"modal\" [title]=\"'@co.mmons/ionic-extensions#Time zone' | intlMessage\" [placeholder]=\"'@co.mmons/ionic-extensions#No time zone' | intlMessage\"></ionx-select>\n            </ion-col>\n        </ion-row>\n    </ion-toolbar>\n</ion-footer>\n",
                styles: [":host{display:flex}:host [ionx--values-header]{margin:16px 16px 8px}:host [ionx--values-header] ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host [ionx--values-header] ion-button{max-height:36px}:host [ionx--values-grid] ion-col{display:flex;padding:4px;align-items:center;justify-content:center}:host [ionx--values-grid] ion-button{--box-shadow:none;padding:0;margin:0;flex:1;display:flex;--width:100%;--padding-start:2px;--padding-end:2px;--padding-top:2px;--padding-bottom:2px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host [ionx--values-grid] ion-button div{min-width:40px;line-height:.8}:host ion-footer ion-toolbar{--padding-start:16px;--padding-end:16px;--padding-top:0px;--padding-bottom:0px}:host ion-footer ion-range{padding:0 8px 0 0}:host ion-footer ion-input{--padding-end:8px;--padding-start:0px;text-align:center}:host ion-footer ion-col{padding:0;-ms-grid-row-align:center;align-self:center}:host ion-footer ionx-select{padding-left:0}:host-context(.ios) ion-segment{margin-bottom:4px}:host-context(.ios) [ionx--values-header]{margin-top:0;margin-bottom:0}:host-context(.ios) [ionx--values-grid] ion-button{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--margin-start:0px;--margin-end:0px;--margin-top:0px;--margin-bottom:0px}:host-context(.md) [ionx--values-grid] ion-button.button-outline{--border-width:1px}"]
            }),
            __metadata("design:paramtypes", [angular.ModalController, angularIntl.IntlService, core.ChangeDetectorRef])
        ], DateTimePickerOverlay);
        return DateTimePickerOverlay;
    }());

    var DateTimePickerInput = /** @class */ (function () {
        function DateTimePickerInput(element, intl, modalController, control) {
            this.element = element;
            this.intl = intl;
            this.modalController = modalController;
            this.control = control;
            this.ionChange = new core.EventEmitter();
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
                return new core$1.DateTimezone(new Date(this._value.date.getTime()), this._value.timezone);
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
                else if (value instanceof core$1.DateTimezone && (this._value === undefined || value.date.getTime() !== this._value.date.getTime() || value.timezone !== this._value.timezone)) {
                    changed = true;
                }
                if (typeof value === "number") {
                    this._value = new core$1.DateTimezone(value);
                }
                else if (value instanceof Date) {
                    this._value = new core$1.DateTimezone(value.getTime());
                }
                else if (value instanceof core$1.DateTimezone) {
                    this._value = new core$1.DateTimezone(new Date(value.date.getTime()), value.timezone === "current" ? DateTimePickerInput_1.currentTimezone() : value.timezone);
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
            return __awaiter(this, void 0, void 0, function () {
                var formatOptions, timezone, value, overlayTitle, label, overlay, _a;
                return __generator(this, function (_b) {
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
                                    value = new Date(value.getTime() + (core$1.DateTimezone.timezoneOffset(timezone, value) * 60 * 1000 * -1));
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
            if (value instanceof Date || value instanceof core$1.DateTimezone || typeof value === "number") {
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
        __decorate([
            core.ViewChild("nativeInput", { read: core.ElementRef, static: true }),
            __metadata("design:type", core.ElementRef)
        ], DateTimePickerInput.prototype, "nativeInput", void 0);
        __decorate([
            core.HostBinding("class.datetime-disabled"),
            __metadata("design:type", Boolean)
        ], DateTimePickerInput.prototype, "_disabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], DateTimePickerInput.prototype, "readonly", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateTimePickerInput.prototype, "overlayTitle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateTimePickerInput.prototype, "placeholder", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], DateTimePickerInput.prototype, "ionChange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], DateTimePickerInput.prototype, "timezoneDisabled", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], DateTimePickerInput.prototype, "defaultTimezone", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], DateTimePickerInput.prototype, "disabled", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], DateTimePickerInput.prototype, "displayFormat", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], DateTimePickerInput.prototype, "pickerFormat", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], DateTimePickerInput.prototype, "value", null);
        __decorate([
            core.HostListener("click", ["$event"]),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [UIEvent]),
            __metadata("design:returntype", void 0)
        ], DateTimePickerInput.prototype, "clicked", null);
        __decorate([
            core.HostListener("keyup.space"),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], DateTimePickerInput.prototype, "keyuped", null);
        DateTimePickerInput = DateTimePickerInput_1 = __decorate([
            core.Component({
                selector: "ionx-datetime",
                template: "\n        <input #nativeInput\n               type=\"text\" \n               class=\"native-input\" \n               readonly [attr.disabled]=\"disabled || null\"\n               [attr.placeholder]=\"placeholder || null\"\n               [attr.value]=\"text || null\"\n               (focus)=\"nativeInputFocused()\" \n               (blur)=\"nativeInputBlured()\"/>\n    ",
                styles: [":host{position:relative;display:block;flex:1;width:100%;--padding-end:16px;--padding-start:16px;--padding-top:10px;--padding-bottom:10px}:host .native-input{padding-top:var(--padding-top,10px);padding-bottom:var(--padding-bottom,9px);padding-left:var(--padding-start,0);padding-right:var(--padding-end,0);display:inline-block;flex:1;width:100%;max-width:100%;max-height:100%;border:0;outline:0;background:0 0;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}:host .native-input::-webkit-input-placeholder{opacity:.5}:host .native-input::-moz-placeholder{opacity:.5}:host .native-input:-ms-input-placeholder{opacity:.5}:host .native-input::-ms-input-placeholder{opacity:.5}:host .native-input::placeholder{opacity:.5}:host .native-input:-webkit-autofill{background-color:transparent}:host-context(.md){--padding-bottom:11px}:host-context(.item-label-stacked){--padding-end:0px;--padding-start:0px;--padding-top:9px;--padding-bottom:9px}:host-context(.ios) .native-input{--padding-top:9px;--padding-bottom:8px}"]
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                angularIntl.IntlService,
                angular.ModalController,
                forms.NgControl])
        ], DateTimePickerInput);
        return DateTimePickerInput;
    }());

    var DateTimePickerModule = /** @class */ (function () {
        function DateTimePickerModule() {
        }
        DateTimePickerModule = __decorate([
            core.NgModule({
                declarations: [DateTimePickerInput, DateTimePickerOverlay],
                entryComponents: [DateTimePickerOverlay],
                exports: [DateTimePickerInput],
                imports: [common.CommonModule, forms.FormsModule, angular.IonicModule, angularIntl.IntlModule, SelectModule]
            })
        ], DateTimePickerModule);
        return DateTimePickerModule;
    }());

    var dialogData = Symbol();

    var dialogInstance = Symbol();

    var Dialog = /** @class */ (function () {
        function Dialog(injector, sanitizer, elementRef, modalController, resolver, changeDetectorRef) {
            this.injector = injector;
            this.sanitizer = sanitizer;
            this.elementRef = elementRef;
            this.modalController = modalController;
            this.resolver = resolver;
            this.changeDetectorRef = changeDetectorRef;
            this.didLoad = new core.EventEmitter();
        }
        Object.defineProperty(Dialog.prototype, "buttons", {
            get: function () {
                return this._buttons;
            },
            set: function (buttons) {
                this._buttons = buttons;
                this.changeDetectorRef.detectChanges();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dialog.prototype, "message", {
            set: function (message) {
                var e_1, _a;
                if (typeof message === "string") {
                    this.messageText = this.sanitizer.bypassSecurityTrustHtml(message);
                    if (this.messageComponent) {
                        this.messageComponent.destroy();
                    }
                    this.messageComponent = undefined;
                }
                else if (message) {
                    this.messageText = undefined;
                    this.messageComponentContainer.clear();
                    if (!(message instanceof core.ComponentRef)) {
                        var type = void 0;
                        var params = void 0;
                        if (Array.isArray(message)) {
                            type = message.length >= 1 ? message[0] : undefined;
                            params = message.length >= 2 ? message[1] : undefined;
                        }
                        else {
                            type = message;
                        }
                        message = this.resolver.resolveComponentFactory(type).create(this.injector);
                        if (params) {
                            try {
                                for (var _b = __values(Object.keys(params)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var param = _c.value;
                                    message.instance[param] = params[param];
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                    }
                    this.messageComponent = message;
                    this.messageComponent.instance[dialogInstance] = this;
                    this.messageComponentContainer.insert(this.messageComponent.hostView);
                }
            },
            enumerable: true,
            configurable: true
        });
        /*private*/ Dialog.prototype.buttonClicked = function (button) {
            var value = this.messageComponent && this.messageComponent.instance[dialogData] ? this.messageComponent.instance[dialogData]() : undefined;
            if (button.handler) {
                var res = button.handler(value);
                if ((typeof res === "boolean" && res) || typeof res !== "boolean") {
                    this.modalController.dismiss(value, button.role);
                }
                return;
            }
            else {
                this.modalController.dismiss(button.role !== "cancel" ? value : undefined, button.role);
            }
        };
        Dialog.prototype.ngOnDestroy = function () {
            if (this.messageComponent) {
                this.messageComponent.instance[dialogInstance] = undefined;
                this.messageComponent.destroy();
            }
        };
        Dialog.prototype.ngOnInit = function () {
            var modal = this.elementRef.nativeElement.closest("ion-modal");
            modal.style.setProperty("--width", "300px");
            modal.style.setProperty("--height", "auto");
            modal.style.setProperty("--max-width", "90%");
            modal.style.setProperty("--max-height", "90%");
            if (document.querySelector("html.ios")) {
                modal.style.setProperty("--border-radius", "10px");
            }
            else {
                modal.style.setProperty("--border-radius", "4px");
                modal.style.setProperty("--box-shadow", "0 28px 48px rgba(0,0,0,0.4)");
            }
        };
        Dialog.prototype.ionViewDidEnter = function () {
            var input = this.elementRef.nativeElement.querySelector("input");
            if (input) {
                input.focus();
            }
        };
        __decorate([
            core.ViewChild("messageComponentContainer", { read: core.ViewContainerRef, static: true }),
            __metadata("design:type", core.ViewContainerRef)
        ], Dialog.prototype, "messageComponentContainer", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], Dialog.prototype, "header", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array),
            __metadata("design:paramtypes", [Array])
        ], Dialog.prototype, "buttons", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], Dialog.prototype, "message", null);
        Dialog = __decorate([
            core.Component({
                selector: "ionx-dialog",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                template: "<div ionx--content>\n\n    <div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n    <div ionx--message>\n\n        <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n        <ng-template #messageComponentContainer></ng-template>\n\n    </div>\n\n</div>\n\n<ion-footer *ngIf=\"_buttons && _buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of _buttons\">\n                <span>{{button.text}}</span>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
                styles: [":host-context(.md){--ionx--message-font-size:16px;--ionx--header-font-size:20px;--ionx--text-align:left}:host-context(.ios){--ionx--message-font-size:15px;--ionx--header-font-size:18px;--ionx--text-align:center;--ionx--buttons-align:center;--ionx--header-font-weight:600}:host{display:flex;contain:content;position:relative}:host [ionx--message]{font-size:var(--ionx--message-font-size);text-align:var(--ionx--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--ionx--header-font-size);font-weight:var(--ionx--header-font-weight,500);margin:16px;text-align:var(--ionx--text-align)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none}:host ion-footer ionx-buttons{justify-content:var(--ionx--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:600}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios) ion-footer ion-button{flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--ion-toolbar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,.2))))}"]
            }),
            __metadata("design:paramtypes", [core.Injector,
                platformBrowser.DomSanitizer,
                core.ElementRef,
                angular.ModalController,
                core.ComponentFactoryResolver,
                core.ChangeDetectorRef])
        ], Dialog);
        return Dialog;
    }());

    var DialogController = /** @class */ (function () {
        function DialogController(modalController) {
            this.modalController = modalController;
        }
        DialogController.prototype.create = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.modalController.create(Object.assign({}, options, {
                            component: Dialog,
                            componentProps: {
                                header: options.header,
                                message: options.message,
                                buttons: options.buttons
                            }
                        }))];
                });
            });
        };
        /**
         * When `id` is not provided, it dismisses the top overlay.
         */
        DialogController.prototype.dismiss = function (data, role, id) {
            return this.modalController.dismiss(data, role, id);
        };
        DialogController = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [angular.ModalController])
        ], DialogController);
        return DialogController;
    }());

    var DialogModule = /** @class */ (function () {
        function DialogModule() {
        }
        DialogModule = __decorate([
            core.NgModule({
                declarations: [Dialog],
                imports: [angularIntl.IntlModule, angular.IonicModule, common.CommonModule, ButtonsModule],
                entryComponents: [Dialog],
                providers: [DialogController]
            })
        ], DialogModule);
        return DialogModule;
    }());

    exports.Buttons = Buttons;
    exports.ButtonsModule = ButtonsModule;
    exports.DateTimePickerInput = DateTimePickerInput;
    exports.DateTimePickerModule = DateTimePickerModule;
    exports.Dialog = Dialog;
    exports.DialogController = DialogController;
    exports.DialogModule = DialogModule;
    exports.ExpandingSearchbar = ExpandingSearchbar;
    exports.ExpandingSearchbarModule = ExpandingSearchbarModule;
    exports.FormHeading = FormHeading;
    exports.FormHelper = FormHelper;
    exports.FormHelperModule = FormHelperModule;
    exports.FormItem = FormItem;
    exports.FormItemError = FormItemError;
    exports.FormItemHint = FormItemHint;
    exports.ImageLoader = ImageLoader;
    exports.ImageLoaderModule = ImageLoaderModule;
    exports.IonicFixModule = IonicFixModule;
    exports.LazyImage = LazyImage;
    exports.LazyImageContainer = LazyImageContainer;
    exports.LazyImageModule = LazyImageModule;
    exports.Loader = Loader;
    exports.LoaderModule = LoaderModule;
    exports.ModalControllerComponent = ModalControllerComponent;
    exports.ModalModule = ModalModule;
    exports.PopoverControllerComponent = PopoverControllerComponent;
    exports.PopoverModule = PopoverModule;
    exports.PseudoInput = PseudoInput;
    exports.PseudoInputModule = PseudoInputModule;
    exports.Select = Select;
    exports.SelectModule = SelectModule;
    exports.SelectOption = SelectOption;
    exports.SelectOptions = SelectOptions;
    exports.Spinner = Spinner;
    exports.SpinnerModule = SpinnerModule;
    exports.TextareaAutosizeModule = TextareaAutosizeModule;
    exports.ToggleLabels = ToggleLabels;
    exports.ToggleLabelsModule = ToggleLabelsModule;
    exports.dialogData = dialogData;
    exports.dialogInstance = dialogInstance;
    exports.ensureImagesLoaded = ensureImagesLoaded;
    exports.ensureLazyImagesLoaded = ensureLazyImagesLoaded;
    exports.ɵa = ModalControllerContentComponent;
    exports.ɵb = PopoverControllerContentComponent;
    exports.ɵc = ExpandingSearchbarStyles;
    exports.ɵd = IonicInputFix;
    exports.ɵe = IonicBackButtonFix;
    exports.ɵf = IonicItemTargetFix;
    exports.ɵg = LoaderController;
    exports.ɵh = TextareaAutosize;
    exports.ɵi = DateTimePickerOverlay;
    exports.ɵj = SelectLabel;
    exports.ɵk = SelectOverlayContent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=co.mmons-ionic-extensions.umd.js.map
