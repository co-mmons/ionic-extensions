(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@co.mmons/angular-intl'), require('@ionic/angular'), require('@co.mmons/js-utils/core')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/loader', ['exports', '@angular/common', '@angular/core', '@co.mmons/angular-intl', '@ionic/angular', '@co.mmons/js-utils/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"].loader = {}), global.ng.common, global.ng.core, global.angularIntl, global.angular, global.core$1));
})(this, (function (exports, common, core, angularIntl, angular, core$1) { 'use strict';

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
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Loader.prototype, "spinnerMode", {
            get: function () {
                return this.mode === "spinner";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Loader.prototype, "progressMode", {
            get: function () {
                return this.mode === "progress";
            },
            enumerable: false,
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
        return Loader;
    }());
    Loader.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-loader",
                    template: "<div>\n\n    <div style=\"display: flex; align-items: center\">\n\n        <div *ngIf=\"spinnerMode\" style=\"padding: 16px; padding-right: 0px;\">\n            <ion-spinner></ion-spinner>\n        </div>\n\n        <div style=\"padding: 16px; flex: 1; display: flex; flex-direction: column; justify-items: center;\">\n            <h5 style=\"margin: 0px\" *ngIf=\"header\">{{header}}</h5>\n            <ion-text [innerHTML]=\"message\" *ngIf=\"!!message\"></ion-text>\n        </div>\n\n    </div>\n\n    <ion-progress-bar style=\"margin: 8px 0px 16px 0px\" [value]=\"progressValue\" [type]=\"progressType\" [buffer]=\"progressBuffer\" *ngIf=\"progressMode\"></ion-progress-bar>\n\n    <div style=\"display: flex; margin: 0px 16px 16px 16px\" *ngIf=\"!!progressMessage || progressPercentVisible\">\n        <ion-text [innerHTML]=\"progressMessage\" style=\"flex: 1\"></ion-text>\n        <span style=\"width: 60px; text-align: right\" *ngIf=\"progressPercentVisible\">{{(progressPercent | intlPercentFormat: {maximumFractionDigits: 0})}}</span>\n    </div>\n\n</div>\n",
                    styles: [":host{display:flex}:host.ionx--filled{width:100%;height:100%;align-items:center;align-content:center;justify-items:center;justify-content:center}\n"]
                },] }
    ];
    Loader.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    Loader.propDecorators = {
        fill: [{ type: core.Input }, { type: core.HostBinding, args: ["class.ionx--filled",] }],
        instanceCallback: [{ type: core.Input }],
        header: [{ type: core.Input }],
        message: [{ type: core.Input }],
        mode: [{ type: core.Input }],
        progressMessage: [{ type: core.Input }],
        progressType: [{ type: core.Input }],
        progressValue: [{ type: core.Input }],
        progressBuffer: [{ type: core.Input }],
        progressPercent: [{ type: core.Input }]
    };

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
                                    componentProps: Object.assign({ mode: "spinner" }, options, {
                                        instanceCallback: function (loader) { return loaderInstance(loader); }
                                    })
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
        return LoaderController;
    }());
    LoaderController.decorators = [
        { type: core.Injectable }
    ];
    LoaderController.ctorParameters = function () { return [
        { type: angular.PopoverController }
    ]; };

    var LoaderModule = /** @class */ (function () {
        function LoaderModule() {
        }
        return LoaderModule;
    }());
    LoaderModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [Loader],
                    imports: [angularIntl.IntlModule, angular.IonicModule, common.CommonModule],
                    exports: [Loader],
                    entryComponents: [Loader],
                    providers: [LoaderController]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Loader = Loader;
    exports.LoaderController = LoaderController;
    exports.LoaderModule = LoaderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=loader-module.umd.js.map
