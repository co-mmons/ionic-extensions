(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@co.mmons/angular-intl'), require('@co.mmons/ionic-extensions/buttons'), require('@ionic/angular'), require('@angular/platform-browser'), require('@ionic/core/')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/dialog', ['exports', '@angular/common', '@angular/core', '@co.mmons/angular-intl', '@co.mmons/ionic-extensions/buttons', '@ionic/angular', '@angular/platform-browser', '@ionic/core/'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"].dialog = {}), global.ng.common, global.ng.core, global.angularIntl, global.buttons, global.angular, global.ng.platformBrowser, global._));
})(this, (function (exports, common, core, angularIntl, buttons, angular, platformBrowser, _) { 'use strict';

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

    var Dialog = /** @class */ (function () {
        function Dialog(elementRef, resolver, injector) {
            this.elementRef = elementRef;
            this.resolver = resolver;
            this.injector = injector;
            this.didLoad = new core.EventEmitter();
        }
        Object.defineProperty(Dialog.prototype, "component", {
            set: function (component) {
                var e_1, _c;
                if (component) {
                    this.componentContainer.clear();
                    var type = void 0;
                    var params = void 0;
                    if (Array.isArray(component)) {
                        type = component.length >= 1 ? component[0] : undefined;
                        params = component.length >= 2 ? component[1] : undefined;
                    }
                    else {
                        type = component;
                    }
                    var componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);
                    if (params) {
                        try {
                            for (var _d = __values(Object.keys(params)), _e = _d.next(); !_e.done; _e = _d.next()) {
                                var param = _e.value;
                                componentRef.instance[param] = params[param];
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    this.componentRef = componentRef;
                    this.componentContainer.insert(this.componentRef.hostView);
                }
            },
            enumerable: false,
            configurable: true
        });
        Dialog.prototype.ngOnInit = function () {
            var modal = this.elementRef.nativeElement.closest("ion-modal");
            modal.style.setProperty("--width", this.width || "300px");
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
        Dialog.prototype.ngOnDestroy = function () {
            if (this.componentRef) {
                this.componentRef.destroy();
            }
            this.value = undefined;
        };
        Dialog.prototype.ionViewDidEnter = function () {
            var _a, _b;
            var input = this.elementRef.nativeElement.querySelector("input");
            if (input) {
                input.focus();
            }
            if (typeof ((_b = (_a = this.componentRef) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.ionViewDidEnter) === "function") {
                this.componentRef.instance.ionViewDidEnter();
            }
        };
        Dialog.prototype.ionViewDidLeave = function () {
            var _a, _b;
            if (typeof ((_b = (_a = this.componentRef) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.ionViewDidLeave) === "function") {
                this.componentRef.instance.ionViewDidLeave();
            }
        };
        Dialog.prototype.ionViewWillEnter = function () {
            var _a, _b;
            if (typeof ((_b = (_a = this.componentRef) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.ionViewWillEnter) === "function") {
                this.componentRef.instance.ionViewWillEnter();
            }
        };
        Dialog.prototype.ionViewWillLeave = function () {
            var _a, _b;
            if (typeof ((_b = (_a = this.componentRef) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.ionViewWillLeave) === "function") {
                this.componentRef.instance.ionViewWillLeave();
            }
        };
        return Dialog;
    }());
    Dialog.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-dialog",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    template: "<ng-container *ngIf=\"!componentRef\">\n\n    <ionx-dialog-content [header]=\"header\" [message]=\"message\"></ionx-dialog-content>\n\n    <ionx-dialog-buttons [buttons]=\"buttons\"></ionx-dialog-buttons>\n\n</ng-container>\n\n<ng-template #componentContainer></ng-template>\n",
                    styles: [":host{--dialog--background-color: var(--background-color, var(--ion-background-color, #ffffff));--dialog--foreground-color: var(--foreground-color, var(--ion-text-color));--dialog--border-color: var(--border-color, var(--ion-border-color));display:flex;contain:content;position:relative;color:var(--dialog--foreground-color)}:host-context(.md){--dialog--message-font-size: 16px;--dialog--header-font-size: 20px;--dialog--text-align: left}:host-context(.ios){--dialog--message-font-size: 15px;--dialog--header-font-size: 18px;--dialog--text-align: left;--dialog--buttons-align: center;--dialog--header-font-weight: 500}\n"]
                },] }
    ];
    Dialog.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ComponentFactoryResolver },
        { type: core.Injector }
    ]; };
    Dialog.propDecorators = {
        message: [{ type: core.Input }],
        header: [{ type: core.Input }],
        buttons: [{ type: core.Input }],
        width: [{ type: core.Input }],
        componentContainer: [{ type: core.ViewChild, args: ["componentContainer", { read: core.ViewContainerRef, static: true },] }],
        component: [{ type: core.Input }]
    };

    /**
     * Komponent, który strukturyzuje widok dialogu.
     */
    var DialogButtons = /** @class */ (function () {
        function DialogButtons(injector, modalController) {
            this.injector = injector;
            this.modalController = modalController;
        }
        /*private*/ DialogButtons.prototype.buttonClicked = function (button) {
            var dialog = this.injector.get(Dialog);
            var value = dialog && dialog.value && dialog.value();
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
        return DialogButtons;
    }());
    DialogButtons.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-dialog-buttons",
                    template: "<ion-footer *ngIf=\"buttons && buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [style.flex]=\"button.flex || 1\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of buttons\">\n                <span *ngIf=\"!!button.text\">{{button.text}}</span>\n                <ion-icon [icon]=\"button.icon\" [slot]=\"button.text ? 'start' : 'icon-only'\" *ngIf=\"button.icon\"></ion-icon>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
                    styles: [":host{display:block}:host ion-footer{--border-color: var(--dialog--border-color)}:host ion-footer ion-toolbar{--padding-start: 0px;--padding-end: 0px;--padding-top: 0px;--padding-bottom: 0px;--min-height: none;--ion-safe-area-bottom: 0px;--ion-safe-area-top: 0px;--ion-safe-area-start: 0px;--ion-safe-area-end: 0px;--ion-toolbar-background: var(--dialog--background-color, #ffffff);--ion-toolbar-background-color: var(--dialog--background-color, #000000);--ion-toolbar-color: var(--dialog--foreground-color, #000000)}:host ion-footer ionx-buttons{justify-content:var(--dialog--buttons-align, flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md) ion-footer ion-toolbar{--padding-bottom: 8px}:host-context(.md) ion-footer:before{display:none}:host-context(.md) ion-footer ion-button{flex:none!important}:host-context(.ios) ion-footer ion-button{flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--dialog--border-color)}\n"]
                },] }
    ];
    DialogButtons.ctorParameters = function () { return [
        { type: core.Injector },
        { type: angular.ModalController }
    ]; };
    DialogButtons.propDecorators = {
        buttons: [{ type: core.Input }]
    };

    /**
     * Komponent, który strukturyzuje widok dialogu.
     */
    var DialogContent = /** @class */ (function () {
        function DialogContent(sanitizer, resolver, injector) {
            this.sanitizer = sanitizer;
            this.resolver = resolver;
            this.injector = injector;
        }
        Object.defineProperty(DialogContent.prototype, "message", {
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
                    var type = void 0;
                    var params = void 0;
                    if (Array.isArray(message)) {
                        type = message.length >= 1 ? message[0] : undefined;
                        params = message.length >= 2 ? message[1] : undefined;
                    }
                    else {
                        type = message;
                    }
                    var componentRef = this.resolver.resolveComponentFactory(type).create(this.injector);
                    if (params) {
                        try {
                            for (var _b = __values(Object.keys(params)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var param = _c.value;
                                componentRef.instance[param] = params[param];
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
                    this.messageComponent = componentRef;
                    this.messageComponentContainer.insert(this.messageComponent.hostView);
                }
            },
            enumerable: false,
            configurable: true
        });
        DialogContent.prototype.ngOnDestroy = function () {
            if (this.messageComponent) {
                this.messageComponent.destroy();
            }
        };
        return DialogContent;
    }());
    DialogContent.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-dialog-content",
                    template: "<div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n<div ionx--message>\n\n    <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n    <ng-template #messageComponentContainer></ng-template>\n\n    <ng-content content=\"[ionx-dialog-message]\"></ng-content>\n\n</div>\n",
                    styles: [":host{background:var(--dialog--background-color, #ffffff);color:var(--dialog--foreground-color);display:block}:host [ionx--message]{font-size:var(--dialog--message-font-size);text-align:var(--dialog--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--dialog--header-font-size);font-weight:var(--dialog--header-font-weight, 500);margin:16px;text-align:var(--dialog--text-align)}\n"]
                },] }
    ];
    DialogContent.ctorParameters = function () { return [
        { type: platformBrowser.DomSanitizer },
        { type: core.ComponentFactoryResolver },
        { type: core.Injector }
    ]; };
    DialogContent.propDecorators = {
        header: [{ type: core.Input }],
        messageComponentContainer: [{ type: core.ViewChild, args: ["messageComponentContainer", { read: core.ViewContainerRef, static: true },] }],
        message: [{ type: core.Input }]
    };

    /**
     * Md Modal Leave Animation
     */
    function leaveAnimation(baseEl) {
        var baseAnimation = _.createAnimation();
        var backdropAnimation = _.createAnimation();
        var wrapperAnimation = _.createAnimation();
        var wrapperEl = baseEl.querySelector('.modal-wrapper');
        backdropAnimation
            .addElement(baseEl.querySelector('ion-backdrop'))
            .fromTo('opacity', 'var(--backdrop-opacity)', 0.0);
        wrapperAnimation
            .addElement(wrapperEl)
            .keyframes([
            { offset: 0, opacity: 0.99, transform: 'translateY(0px)' },
            { offset: 1, opacity: 0, transform: 'translateY(40px)' }
        ]);
        return baseAnimation
            .addElement(baseEl)
            .easing('cubic-bezier(0.47,0,0.745,0.715)')
            .duration(200)
            .addAnimation([backdropAnimation, wrapperAnimation]);
    }
    ;
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
                                component: options.component,
                                header: options.header,
                                message: options.message,
                                buttons: options.buttons,
                                width: options.width
                            },
                            leaveAnimation: leaveAnimation
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
        return DialogController;
    }());
    DialogController.decorators = [
        { type: core.Injectable }
    ];
    DialogController.ctorParameters = function () { return [
        { type: angular.ModalController }
    ]; };

    var DialogModule = /** @class */ (function () {
        function DialogModule() {
        }
        return DialogModule;
    }());
    DialogModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [Dialog, DialogContent, DialogButtons],
                    imports: [angularIntl.IntlModule, angular.IonicModule, common.CommonModule, buttons.ButtonsModule],
                    exports: [DialogContent, DialogButtons],
                    entryComponents: [Dialog],
                    providers: [DialogController]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Dialog = Dialog;
    exports.DialogButtons = DialogButtons;
    exports.DialogContent = DialogContent;
    exports.DialogController = DialogController;
    exports.DialogModule = DialogModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=dialog-module.umd.js.map
