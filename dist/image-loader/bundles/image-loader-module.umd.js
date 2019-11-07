(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@co.mmons/ionic-extensions/lazy-image')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/image-loader', ['exports', '@angular/core', '@co.mmons/ionic-extensions/lazy-image'], factory) :
    (global = global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons['ionic-extensions'] = global.co.mmons['ionic-extensions'] || {}, global.co.mmons['ionic-extensions']['image-loader'] = {}), global.ng.core, global.lazyImage));
}(this, (function (exports, core, lazyImage) { 'use strict';

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
                    if (target) {
                        if (_this._cssClasses.loading) {
                            target.classList.remove(_this._cssClasses.loading);
                        }
                        if (_this._cssClasses.loaded) {
                            target.classList.add(_this._cssClasses.loaded);
                        }
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
                    if (target) {
                        if (_this._cssClasses.loading) {
                            target.classList.remove(_this._cssClasses.loading);
                        }
                        if (_this._cssClasses.error) {
                            target.classList.add(_this._cssClasses.error);
                        }
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
        ImageLoader.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input("src")
        ], ImageLoader.prototype, "src", null);
        __decorate([
            core.Input("ionx-image-loader")
        ], ImageLoader.prototype, "src2", null);
        __decorate([
            core.Input("alternate")
        ], ImageLoader.prototype, "alternate", null);
        __decorate([
            core.Input("ionx-image-loader-alternate")
        ], ImageLoader.prototype, "alternate2", null);
        __decorate([
            core.Input("css-classes")
        ], ImageLoader.prototype, "cssClasses", null);
        __decorate([
            core.Input("ionx-image-loader-css-classes")
        ], ImageLoader.prototype, "cssClasses2", null);
        __decorate([
            core.Input("css-classes-target")
        ], ImageLoader.prototype, "cssClassesTarget", null);
        __decorate([
            core.Input("ionx-image-loader-css-classes-target")
        ], ImageLoader.prototype, "cssClassesParent", null);
        ImageLoader = __decorate([
            core.Directive({
                selector: "[ionx-image-loader]",
                host: {
                    "[attr.ionx-image-loader]": "true"
                }
            })
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
                        return [4 /*yield*/, lazyImage.ensureLazyImagesLoaded(root, { retryError: options && options.retryError })];
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

    exports.ImageLoader = ImageLoader;
    exports.ImageLoaderModule = ImageLoaderModule;
    exports.ensureImagesLoaded = ensureImagesLoaded;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=image-loader-module.umd.js.map
