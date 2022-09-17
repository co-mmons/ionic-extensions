(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/scrolling'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@co.mmons/angular-extensions/browser/match-media'), require('@co.mmons/angular-intl'), require('@co.mmons/ionic-extensions/buttons'), require('@ionic/angular'), require('dragula'), require('@co.mmons/js-utils/core')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/select', ['exports', '@angular/cdk/scrolling', '@angular/common', '@angular/core', '@angular/forms', '@co.mmons/angular-extensions/browser/match-media', '@co.mmons/angular-intl', '@co.mmons/ionic-extensions/buttons', '@ionic/angular', 'dragula', '@co.mmons/js-utils/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"].select = {}), global.ng.cdk.scrolling, global.ng.common, global.ng.core, global.ng.forms, global.matchMedia, global.angularIntl, global.buttons, global.angular, global.dragula, global.core$1));
})(this, (function (exports, scrolling, common, core, forms, matchMedia, angularIntl, buttons, angular, dragula, core$1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var dragula__namespace = /*#__PURE__*/_interopNamespace(dragula);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }

    var SelectLabel = /** @class */ (function () {
        function SelectLabel(templateRef, viewContainer) {
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
            this.separator = ", ";
        }
        return SelectLabel;
    }());
    SelectLabel.decorators = [
        { type: core.Directive, args: [{
                    selector: "[ionxSelectLabel]"
                },] }
    ];
    SelectLabel.ctorParameters = function () { return [
        { type: core.TemplateRef },
        { type: core.ViewContainerRef }
    ]; };
    SelectLabel.propDecorators = {
        separator: [{ type: core.Input }]
    };

    var SelectOption = /** @class */ (function () {
        function SelectOption(element) {
            this.element = element;
        }
        Object.defineProperty(SelectOption.prototype, "label", {
            get: function () {
                return this.element.nativeElement.innerText;
            },
            enumerable: false,
            configurable: true
        });
        return SelectOption;
    }());
    SelectOption.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-select-option",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    template: "<ng-content></ng-content>"
                },] }
    ];
    SelectOption.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    SelectOption.propDecorators = {
        value: [{ type: core.Input }],
        divider: [{ type: core.Input }]
    };

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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SelectOverlayContent.prototype, "modalOverlay", {
            get: function () {
                return this.overlay == "modal";
            },
            enumerable: false,
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
            var e_1, _b, e_2, _c, e_3, _d, e_4, _e, e_5, _f;
            if (!this.lastClickedOption || option !== this.lastClickedOption) {
                return;
            }
            if (this.multiple && this.valueValidator) {
                var values = [];
                try {
                    for (var _g = __values(this.checkedOptions), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var o = _h.value;
                        if (o !== option) {
                            values.push(o.value);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var optionWasChecked = option.checked;
                try {
                    for (var _j = __values(this.options), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var o = _k.value;
                        o.checked = false;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                this.checkedOptions = [];
                try {
                    VALUES: for (var _l = __values(this.valueValidator(option.value, optionWasChecked, values) || []), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var v = _m.value;
                        try {
                            for (var _o = (e_4 = void 0, __values(this.options)), _p = _o.next(); !_p.done; _p = _o.next()) {
                                var o = _p.value;
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
                                if (_p && !_p.done && (_e = _o.return)) _e.call(_o);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
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
                            for (var _q = __values(this.options), _r = _q.next(); !_r.done; _r = _q.next()) {
                                var o = _r.value;
                                if (o.checked && o !== option) {
                                    o.checked = false;
                                }
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_r && !_r.done && (_f = _q.return)) _f.call(_q);
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
            var e_6, _b;
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
                for (var _c = __values(this.options), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var option = _d.value;
                    if (!option.hidden) {
                        this.visibleOptions.push(option);
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_6) throw e_6.error; }
            }
        };
        SelectOverlayContent.prototype.initOptions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _b, _c, option, indexToScroll, i;
                var e_7, _d;
                var _this = this;
                return __generator(this, function (_e) {
                    switch (_e.label) {
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
                                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
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
                            _e.sent();
                            indexToScroll = -1;
                            for (i = 0; i < this.visibleOptions.length; i++) {
                                if (this.visibleOptions[i].checked) {
                                    indexToScroll = i;
                                    break;
                                }
                            }
                            this.scroll.scrollToIndex(indexToScroll);
                            _e.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        SelectOverlayContent.prototype.okClicked = function () {
            var e_8, _b, e_9, _c, e_10, _d;
            var values = [];
            if (this.orderable) {
                try {
                    for (var _e = __values(this.checkedOptions), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var o = _f.value;
                        values.push(o.value);
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
            else {
                try {
                    OPTIONS: for (var _g = __values(this.options), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var option = _h.value;
                        try {
                            for (var _j = (e_10 = void 0, __values(this.checkedOptions)), _k = _j.next(); !_k.done; _k = _j.next()) {
                                var checked = _k.value;
                                if (option === checked) {
                                    values.push(checked.value);
                                    continue OPTIONS;
                                }
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
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
            var e_11, _b;
            var query = this.searchbar.nativeElement.value ? this.searchbar.nativeElement.value.toString() : undefined;
            if (query) {
                query = query.trim().toLowerCase();
            }
            try {
                for (var _c = __values(this.options), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var o = _d.value;
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
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_11) throw e_11.error; }
            }
            this.buildVisibleOptions();
        };
        SelectOverlayContent.prototype.fixIosContentInPopover = function () {
            return __awaiter(this, void 0, void 0, function () {
                var style, _a_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.content.nativeElement.getScrollElement()];
                        case 1:
                            _b.sent();
                            style = this.content.nativeElement.shadowRoot.appendChild(document.createElement("style"));
                            style.innerText = ".transition-effect { display: none !important }";
                            return [3 /*break*/, 3];
                        case 2:
                            _a_1 = _b.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
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
        SelectOverlayContent.prototype.ngAfterViewInit = function () {
            if (this.popoverOverlay) {
                this.fixIosContentInPopover();
            }
        };
        SelectOverlayContent.prototype.resetScrollHeight = function () {
            return __awaiter(this, void 0, void 0, function () {
                var oldHeight, newHeight;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            oldHeight = this.scrollHeight;
                            newHeight = this.content.nativeElement.offsetHeight;
                            if (!(newHeight == oldHeight)) return [3 /*break*/, 2];
                            return [4 /*yield*/, core$1.waitTill(function () {
                                    newHeight = _this.content.nativeElement.offsetHeight;
                                    return newHeight !== oldHeight;
                                }, undefined, 2000)];
                        case 1:
                            _b.sent();
                            _b.label = 2;
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
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.modalOverlay) return [3 /*break*/, 3];
                            this.resetScrollHeight();
                            if (!(!window["cordova"] || window["cordova"].platformId === "browser")) return [3 /*break*/, 2];
                            return [4 /*yield*/, core$1.waitTill(function () { return !!_this.searchbar && !!_this.searchbar.nativeElement.querySelector("input"); })];
                        case 1:
                            _b.sent();
                            this.searchbar.nativeElement.setFocus();
                            _b.label = 2;
                        case 2:
                            this.initOptions();
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return SelectOverlayContent;
    }());
    SelectOverlayContent.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-select-overlay",
                    template: "<ion-header *ngIf=\"modalOverlay\">\n    <ion-toolbar>\n        <ion-title style=\"padding: 0px\">{{title}}</ion-title>\n\n        <ionx-buttons slot=\"start\">\n            <ion-back-button style=\"display: inline-block\" [icon]=\"('tablet' | matchGreaterWidth) ? 'close' : null\" (click)=\"$event.preventDefault(); cancelClicked()\"></ion-back-button>\n        </ionx-buttons>\n\n        <ionx-buttons slot=\"end\">\n            <ion-button fill=\"clear\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Done\" | intlMessage}}</ion-button>\n        </ionx-buttons>\n\n    </ion-toolbar>\n    <ion-toolbar>\n        <ion-searchbar #searchbar cancelButtonText=\"{{'@co.mmons/js-intl#Cancel' | intlMessage}}\" placeholder=\"{{'@co.mmons/js-intl#Search' | intlMessage}}\"\n                       (ionInput)=\"search($event)\"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n<ion-content [scrollY]=\"false\" [scrollX]=\"false\" #content>\n\n    <div class=\"ionx-select-overlay-spinner\" slot=\"fixed\" *ngIf=\"!checkedOptions\">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ng-template [ngIf]=\"!!visibleOptions\">\n        <div>\n\n            <cdk-virtual-scroll-viewport [itemSize]=\"itemHeight\" [style.height.px]=\"scrollHeight\" *ngIf=\"modalOverlay\">\n\n                <ion-list lines=\"full\">\n\n                    <ion-item detail=\"false\" button=\"false\" [style.fontWeight]=\"option.divider ? 500 : null\" #listItem *cdkVirtualFor=\"let option of visibleOptions\">\n                        <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"\n                                      *ngIf=\"!option.divider\"></ion-checkbox>\n                        <ion-label>\n                            <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                            <ng-template #customLabel>\n                                <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                            </ng-template>\n                        </ion-label>\n                    </ion-item>\n                </ion-list>\n\n            </cdk-virtual-scroll-viewport>\n\n            <ion-list lines=\"full\" *ngIf=\"popoverOverlay\">\n\n                <ng-template ngFor [ngForOf]=\"visibleOptions\" let-option>\n\n                    <ion-item-divider *ngIf=\"option.divider; else basicOption\">\n                        <ion-label>{{option.label}}</ion-label>\n                    </ion-item-divider>\n\n                    <ng-template #basicOption>\n\n                        <ion-item detail=\"false\" button=\"false\" #listItem>\n                            <ion-checkbox [(ngModel)]=\"option.checked\" (ngModelChange)=\"optionBeforeChange(option)\" (ionChange)=\"optionChanged(option)\" (click)=\"optionClicked(option, $event)\" slot=\"start\"></ion-checkbox>\n                            <ion-label [style.whiteSpace]=\"whiteSpace\">\n                                <span *ngIf=\"!label; else customLabel\">{{option.label}}</span>\n                                <ng-template #customLabel>\n                                    <ng-container *ngTemplateOutlet=\"label.templateRef; context: {$implicit: option.value}\"></ng-container>\n                                </ng-template>\n                            </ion-label>\n                        </ion-item>\n\n                    </ng-template>\n\n                </ng-template>\n            </ion-list>\n        </div>\n    </ng-template>\n\n</ion-content>\n\n<ion-footer *ngIf=\"multiple && popoverOverlay\" style=\"position: sticky; bottom: 0px\">\n    <ion-toolbar>\n        <ion-buttons slot=\"end\">\n\n            <ion-button size=\"small\" (click)=\"cancelClicked()\">{{\"@co.mmons/js-intl#Cancel\" | intlMessage}}</ion-button>\n\n            <ion-button size=\"small\" (click)=\"okClicked()\">{{\"@co.mmons/js-intl#Ok\" | intlMessage}}</ion-button>\n\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
                    styles: ["@media (min-width: 768px){::ng-deep .ionx-select-overlay-width .popover-content{--width: 300px;--max-width: 90%}}@media (max-width: 767px){::ng-deep .ionx-select-overlay-width .popover-content{left:calc(16px + var(--ion-safe-area-left, 0px))!important;width:calc(100% - (32px + var(--ion-safe-area-right, 0px) + var(--ion-safe-area-left, 0px)))}}:host .ionx-select-overlay-spinner{position:absolute;width:100%;height:100%;left:0px;top:0px}:host .ionx-select-overlay-spinner ion-spinner{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}:host ion-checkbox{margin-right:16px;margin-top:8px;margin-bottom:8px;align-self:center}:host ion-list{margin:4px 0;padding:0}:host ::ng-deep .cdk-virtual-scroll-content-wrapper{max-width:100%}:host ::ng-deep .hydrated{visibility:visible}:host-context(ion-popover) ion-content{--overflow: initial !important}:host-context(ion-popover) ion-content ion-item ion-label{white-space:normal}:host-context(ion-popover) ion-content ion-item.item:last-child{--border-width: 0px}:host-context(.ios) ion-item-divider{--background: transparent;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:500}\n"]
                },] }
    ];
    SelectOverlayContent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: angularIntl.IntlService },
        { type: angular.PopoverController, decorators: [{ type: core.Optional }] },
        { type: angular.ModalController, decorators: [{ type: core.Optional }] }
    ]; };
    SelectOverlayContent.propDecorators = {
        overlay: [{ type: core.Input }],
        scroll: [{ type: core.ViewChild, args: [scrolling.CdkVirtualScrollViewport, { static: false },] }],
        content: [{ type: core.ViewChild, args: ["content", { read: core.ElementRef, static: true },] }],
        multiple: [{ type: core.Input }],
        orderable: [{ type: core.Input }],
        updateValues: [{ type: core.Input }],
        title: [{ type: core.Input }],
        searchHandler: [{ type: core.Input }],
        valueValidator: [{ type: core.Input }],
        valueComparator: [{ type: core.Input }],
        label: [{ type: core.Input }],
        options: [{ type: core.Input }],
        empty: [{ type: core.Input }],
        whiteSpace: [{ type: core.Input }],
        searchbar: [{ type: core.ViewChild, args: ["searchbar", { read: core.ElementRef, static: false },] }],
        resetScrollHeight: [{ type: core.HostListener, args: ["window:resize",] }]
    };

    var createDragula = dragula__namespace;
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
            enumerable: false,
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
        return Select;
    }());
    Select.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-select",
                    host: {
                        "[class.ionx--chips-layout]": "!!orderable",
                        "[class.ionx--readonly]": "!!readonly || !!disabled",
                        "[class.ionx--orderable]": "!!orderable && !readonly && !disabled && values && values.length > 1",
                    },
                    template: "<ng-template #optionTemplate let-value=\"value\" let-index=\"index\">\n    <span *ngIf=\"!labelTemplate; else hasLabelTemplate\">{{labelImpl$(value)}}</span>\n    <ng-template #hasLabelTemplate>\n        <ng-container *ngTemplateOutlet=\"labelTemplate.templateRef; context: {$implicit: value, index: index}\"></ng-container>\n    </ng-template>\n</ng-template>\n\n<div class=\"select-inner\">\n    <div class=\"select-text\" #textContainer [class.select-placeholder]=\"values.length == 0\">\n        <span *ngIf=\"values.length == 0; else showValues\">{{placeholder}}</span>\n\n        <ng-template #showValues>\n            <ng-template ngFor [ngForOf]=\"values\" let-value let-index=\"index\">\n                <span *ngIf=\"index > 0 && (!labelTemplate || labelTemplate.separator) && !orderable\">{{!labelTemplate ? \", \" : labelTemplate.separator}}</span>\n\n                <ion-chip *ngIf=\"orderable else simpleText\" outline=\"true\" [attr.ionx--index]=\"index\">\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ion-chip>\n\n                <ng-template #simpleText>\n                    <ng-template *ngTemplateOutlet=\"optionTemplate; context: {value: value, index: index}\"></ng-template>\n                </ng-template>\n\n            </ng-template>\n        </ng-template>\n    </div>\n\n    <ng-container  *ngIf=\"!_readonly && !_disabled\">\n        <div class=\"select-icon\" role=\"presentation\" *ngIf=\"!orderable\">\n            <div class=\"select-icon-inner\"></div>\n        </div>\n        <button type=\"button\" role=\"combobox\" aria-haspopup=\"dialog\" class=\"select-cover\" (click)=\"open($event)\" *ngIf=\"!orderable || !values || values.length === 0\"></button>\n    </ng-container>\n\n</div>\n",
                    styles: [":host{--placeholder-opacity: .5;--dropdown-icon-opacity: .5;--disabled-opacity: .5;padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:inline-block;overflow:hidden;color:var(--color);font-family:var(--ion-font-family, inherit);max-width:100%}:host .select-inner{display:flex;position:relative}:host .select-icon{position:relative;width:16px;height:20px}:host .select-icon .select-icon-inner{top:50%;right:0px;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:var(--dropdown-icon-opacity, .5);pointer-events:none}:host .select-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .select-text.select-placeholder{opacity:var(--placeholder-opacity, .5)}:host.select-disabled{opacity:var(--disabled-opacity, .5);pointer-events:none}:host.select-readonly{opacity:1;pointer-events:none}:host.select-readonly .select-icon{display:none}:host[white-space-normal] .select-text,:host[ionx--white-space=normal] .select-text{white-space:normal!important;overflow:auto}:host button{left:0px;top:0px;margin:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;appearance:none;outline:none}:host button::-moz-focus-inner{border:0}:host.in-item{position:static}:host ion-chip{max-width:calc(50% - 4px);margin-inline-start:0px;margin-bottom:0;cursor:default}:host ion-chip>span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:1.1}:host.ionx--orderable ion-chip{cursor:move}:host.ionx--chips-layout .select-text{white-space:normal;overflow:auto;width:100%}:host-context(ion-toolbar){color:var(--ion-toolbar-color);--icon-color: var(--ion-toolbar-color);--padding-start: 16px;--padding-end: 16px}:host-context(.item-label-stacked){align-self:flex-start;--padding-top: 8px;--padding-bottom: 8px;--padding-start: 0;width:100%}:host-context(.item-label-stacked) .select-text{max-width:calc(100% - 16px);flex:initial}:host-context(.item-label-stacked).ionx--chips-layout .select-text{flex:1}\n"]
                },] }
    ];
    Select.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: angularIntl.IntlService },
        { type: angular.PopoverController },
        { type: angular.ModalController },
        { type: forms.NgControl, decorators: [{ type: core.Optional }] }
    ]; };
    Select.propDecorators = {
        textContainer: [{ type: core.ViewChild, args: ["textContainer", { static: true },] }],
        placeholder: [{ type: core.Input }],
        overlay: [{ type: core.Input }],
        overlayWhiteSpace: [{ type: core.Input }],
        whiteSpace: [{ type: core.Input }, { type: core.HostBinding, args: ["attr.ionx--white-space",] }],
        alwaysArray: [{ type: core.Input }],
        compareAsString: [{ type: core.Input }],
        comparator: [{ type: core.Input }],
        multiple: [{ type: core.Input }],
        title: [{ type: core.Input }],
        orderable: [{ type: core.Input }],
        empty: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        searchTest: [{ type: core.Input }],
        checkValidator: [{ type: core.Input }],
        ionChange: [{ type: core.Output }],
        change: [{ type: core.Output }],
        disabled: [{ type: core.Input }],
        value: [{ type: core.Input }],
        labelTemplate: [{ type: core.ContentChild, args: [SelectLabel, { static: false },] }],
        label: [{ type: core.Input }],
        options: [{ type: core.Input }],
        _optionsComponents: [{ type: core.ContentChildren, args: [SelectOption, { descendants: true },] }]
    };

    var SelectModule = /** @class */ (function () {
        function SelectModule() {
        }
        return SelectModule;
    }());
    SelectModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [Select, SelectOption, SelectOverlayContent, SelectLabel],
                    entryComponents: [Select, SelectOption, SelectOverlayContent],
                    exports: [Select, SelectOption, SelectOverlayContent, SelectLabel],
                    imports: [common.CommonModule, forms.FormsModule, angular.IonicModule, angularIntl.IntlModule, scrolling.ScrollingModule, buttons.ButtonsModule, matchMedia.MatchMediaModule]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Select = Select;
    exports.SelectModule = SelectModule;
    exports.SelectOption = SelectOption;
    exports.SelectOptions = SelectOptions;
    exports["ɵa"] = SelectLabel;
    exports["ɵb"] = SelectOverlayContent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=select-module.umd.js.map
