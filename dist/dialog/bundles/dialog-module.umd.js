(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@co.mmons/angular-intl'), require('@co.mmons/ionic-extensions/buttons'), require('@ionic/angular'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/dialog', ['exports', '@angular/common', '@angular/core', '@co.mmons/angular-intl', '@co.mmons/ionic-extensions/buttons', '@ionic/angular', '@angular/platform-browser'], factory) :
    (global = global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons['ionic-extensions'] = global.co.mmons['ionic-extensions'] || {}, global.co.mmons['ionic-extensions'].dialog = {}), global.ng.common, global.ng.core, global.angularIntl, global.buttons, global.angular, global.ng.platformBrowser));
}(this, (function (exports, common, core, angularIntl, buttons, angular, platformBrowser) { 'use strict';

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

    var Dialog = /** @class */ (function () {
        function Dialog(elementRef, resolver, injector) {
            this.elementRef = elementRef;
            this.resolver = resolver;
            this.injector = injector;
            this.didLoad = new core.EventEmitter();
        }
        Object.defineProperty(Dialog.prototype, "body", {
            set: function (body) {
                var e_1, _a;
                if (body) {
                    this.bodyContainer.clear();
                    var type = void 0;
                    var params = void 0;
                    if (Array.isArray(body)) {
                        type = body.length >= 1 ? body[0] : undefined;
                        params = body.length >= 2 ? body[1] : undefined;
                    }
                    else {
                        type = body;
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
                    this.bodyComponent = componentRef;
                    this.bodyContainer.insert(this.bodyComponent.hostView);
                }
            },
            enumerable: true,
            configurable: true
        });
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
        Dialog.prototype.ngOnDestroy = function () {
            if (this.bodyComponent) {
                // this.bodyComponent.instance[dialogInstance] = undefined;
                this.bodyComponent.destroy();
            }
            this.value = undefined;
        };
        Dialog.prototype.ionViewDidEnter = function () {
            var input = this.elementRef.nativeElement.querySelector("input");
            if (input) {
                input.focus();
            }
        };
        Dialog.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ComponentFactoryResolver },
            { type: core.Injector }
        ]; };
        __decorate([
            core.Input()
        ], Dialog.prototype, "message", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "header", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "buttons", void 0);
        __decorate([
            core.ViewChild("bodyContainer", { read: core.ViewContainerRef, static: true })
        ], Dialog.prototype, "bodyContainer", void 0);
        __decorate([
            core.Input()
        ], Dialog.prototype, "body", null);
        Dialog = __decorate([
            core.Component({
                selector: "ionx-dialog",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                template: "<ng-container *ngIf=\"!bodyComponent\">\n\n    <ionx-dialog-content [header]=\"header\" [message]=\"message\"></ionx-dialog-content>\n\n    <ionx-dialog-buttons [buttons]=\"buttons\"></ionx-dialog-buttons>\n\n</ng-container>\n\n<ng-template #bodyContainer></ng-template>\n",
                styles: [":host{--dialog--background-color:var(--background-color, var(--ion-background-color, #ffffff));--dialog--foreground-color:var(--foreground-color, var(--ion-text-color));--dialog--border-color:var(--border-color, var(--ion-border-color));display:-webkit-box;display:flex;contain:content;position:relative;color:var(--dialog--foreground-color)}:host-context(.md){--dialog--message-font-size:16px;--dialog--header-font-size:20px;--dialog--text-align:left}:host-context(.ios){--dialog--message-font-size:15px;--dialog--header-font-size:18px;--dialog--text-align:center;--dialog--buttons-align:center;--dialog--header-font-weight:500}"]
            })
        ], Dialog);
        return Dialog;
    }());

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
        DialogButtons.ctorParameters = function () { return [
            { type: core.Injector },
            { type: angular.ModalController }
        ]; };
        __decorate([
            core.Input()
        ], DialogButtons.prototype, "buttons", void 0);
        DialogButtons = __decorate([
            core.Component({
                selector: "ionx-dialog-buttons",
                template: "<ion-footer *ngIf=\"buttons && buttons.length > 0\">\n    <ion-toolbar>\n        <ionx-buttons>\n\n            <ion-button fill=\"clear\" [color]=\"button.color || 'primary'\" [size]=\"button.size\" (click)=\"buttonClicked(button)\" *ngFor=\"let button of buttons\">\n                <span>{{button.text}}</span>\n            </ion-button>\n\n        </ionx-buttons>\n    </ion-toolbar>\n</ion-footer>\n",
                styles: [":host{display:block}:host ion-footer{--border-color:var(--dialog--border-color)}:host ion-footer ion-toolbar{--padding-start:0px;--padding-end:0px;--padding-top:0px;--padding-bottom:0px;--min-height:none;--ion-safe-area-bottom:0px;--ion-safe-area-top:0px;--ion-safe-area-start:0px;--ion-safe-area-end:0px;--ion-toolbar-background:var(--dialog--background-color, #ffffff);--ion-toolbar-background-color:var(--dialog--background-color, #000000);--ion-toolbar-color:var(--dialog--foreground-color, #000000)}:host ion-footer ionx-buttons{-webkit-box-pack:var(--dialog--buttons-align,flex-end);justify-content:var(--dialog--buttons-align,flex-end)}:host ion-footer ion-button{min-height:44px}:host ion-footer ion-button:not(:last-child){font-weight:400}:host ion-footer ion-button:last-child{font-weight:500}:host-context(.md) ion-footer ion-toolbar{--padding-bottom:8px}:host-context(.md) ion-footer::before{display:none}:host-context(.ios) ion-footer ion-button{-webkit-box-flex:1;flex:1}:host-context(.ios) ion-footer ion-button:not(:first-child){border-left:.55px solid var(--dialog--border-color)}"]
            })
        ], DialogButtons);
        return DialogButtons;
    }());

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
            enumerable: true,
            configurable: true
        });
        DialogContent.prototype.ngOnDestroy = function () {
            if (this.messageComponent) {
                this.messageComponent.destroy();
            }
        };
        DialogContent.ctorParameters = function () { return [
            { type: platformBrowser.DomSanitizer },
            { type: core.ComponentFactoryResolver },
            { type: core.Injector }
        ]; };
        __decorate([
            core.Input()
        ], DialogContent.prototype, "header", void 0);
        __decorate([
            core.ViewChild("messageComponentContainer", { read: core.ViewContainerRef, static: true })
        ], DialogContent.prototype, "messageComponentContainer", void 0);
        __decorate([
            core.Input()
        ], DialogContent.prototype, "message", null);
        DialogContent = __decorate([
            core.Component({
                selector: "ionx-dialog-content",
                template: "<div ionx--header *ngIf=\"!!header\">{{header}}</div>\n\n<div ionx--message>\n\n    <div [innerHTML]=\"messageText\" *ngIf=\"!!messageText\"></div>\n\n    <ng-template #messageComponentContainer></ng-template>\n\n    <ng-content content=\"[ionx-dialog-message]\"></ng-content>\n\n</div>\n",
                styles: [":host{background:var(--dialog--background-color,#fff);color:var(--dialog--foreground-color);display:block}:host [ionx--message]{font-size:var(--dialog--message-font-size);text-align:var(--dialog--text-align);margin:16px 16px 24px}:host [ionx--header]{font-size:var(--dialog--header-font-size);font-weight:var(--dialog--header-font-weight,500);margin:16px;text-align:var(--dialog--text-align)}"]
            })
        ], DialogContent);
        return DialogContent;
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
                                body: options.body,
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
        DialogController.ctorParameters = function () { return [
            { type: angular.ModalController }
        ]; };
        DialogController = __decorate([
            core.Injectable()
        ], DialogController);
        return DialogController;
    }());

    var DialogModule = /** @class */ (function () {
        function DialogModule() {
        }
        DialogModule = __decorate([
            core.NgModule({
                declarations: [Dialog, DialogContent, DialogButtons],
                imports: [angularIntl.IntlModule, angular.IonicModule, common.CommonModule, buttons.ButtonsModule],
                exports: [DialogContent, DialogButtons],
                entryComponents: [Dialog],
                providers: [DialogController]
            })
        ], DialogModule);
        return DialogModule;
    }());

    exports.Dialog = Dialog;
    exports.DialogButtons = DialogButtons;
    exports.DialogContent = DialogContent;
    exports.DialogController = DialogController;
    exports.DialogModule = DialogModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dialog-module.umd.js.map
