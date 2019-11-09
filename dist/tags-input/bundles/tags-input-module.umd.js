(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@co.mmons/angular-intl'), require('@ionic/angular')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/tags-input', ['exports', '@angular/common', '@angular/core', '@angular/forms', '@co.mmons/angular-intl', '@ionic/angular'], factory) :
    (global = global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons['ionic-extensions'] = global.co.mmons['ionic-extensions'] || {}, global.co.mmons['ionic-extensions']['tags-input'] = {}), global.ng.common, global.ng.core, global.ng.forms, global.angularIntl, global.angular));
}(this, (function (exports, common, core, forms, angularIntl, angular) { 'use strict';

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

    var tagsValueAccessor = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return TagsInput; }),
        multi: true
    };
    var TagsInput = /** @class */ (function () {
        function TagsInput(plt, ref) {
            this.plt = plt;
            this.ref = ref;
            this.readonly = false;
            this.hideRemove = false;
            this.maxTags = -1;
            this.placeholder = "+Tag";
            this.type = "text";
            this.separatorStr = ",";
            this.canEnterAdd = true;
            this.canBackspaceRemove = false;
            this._once = false;
            this.change = new core.EventEmitter();
            this.ionFocus = new core.EventEmitter();
            this.ionBlur = new core.EventEmitter();
            this._editTag = "";
            this._tags = [];
            this._isFocus = false;
        }
        Object.defineProperty(TagsInput.prototype, "once", {
            get: function () {
                return this._once;
            },
            set: function (value) {
                if (typeof value === "string") {
                    this._once = true;
                }
                else {
                    this._once = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        TagsInput.prototype.keyAddTag = function () {
            var tagStr = this._editTag.trim();
            if (!this.canEnterAdd) {
                return;
            }
            if (!this.verifyTag(tagStr)) {
                return;
            }
            if (this.once && !this.isOnce(tagStr)) {
                this._editTag = "";
                return;
            }
            this.pushTag(tagStr);
        };
        TagsInput.prototype.separatorStrAddTag = function () {
            if (!this.separatorStr) {
                return;
            }
            if (this._editTag.indexOf(this.separatorStr) > -1) {
                var tags = this._editTag.split(this.separatorStr);
                for (var i = 0; i < tags.length; i++) {
                    var tag = tags[i].trim();
                    if (i < tags.length - 1) {
                        if (this.verifyTag(tag) && this.isOnce(tag)) {
                            this.pushTag(tag);
                        }
                    }
                    else {
                        this._editTag = tag;
                    }
                }
            }
        };
        TagsInput.prototype.keyRemoveTag = function (ev) {
            if (!this.canBackspaceRemove) {
                return;
            }
            if (this._editTag === "") {
                this.removeTag(-1);
                this._editTag = "";
            }
        };
        TagsInput.prototype.btnRemoveTag = function ($index) {
            this.removeTag($index);
            this.input.setFocus();
        };
        TagsInput.prototype.verifyTag = function (tagStr) {
            if (typeof this.verifyFn === "function") {
                if (!this.verifyFn(tagStr)) {
                    this._editTag = "";
                    return false;
                }
                else {
                    return true;
                }
            }
            if (!tagStr.trim()) {
                this._editTag = "";
                return false;
            }
            else {
                return true;
            }
        };
        TagsInput.prototype.pushTag = function (tagStr) {
            if (!this._tags) {
                this._tags = [];
            }
            if (this._tags.indexOf(tagStr) > -1) {
                return;
            }
            if (this.maxTags !== -1 && this._tags.length >= this.maxTags) {
                this._editTag = "";
                return;
            }
            this._tags.push(tagStr.trim());
            this.sortTags();
            this.ref.detectChanges();
            this.change.emit(this._tags.slice());
            this._editTag = "";
            if (this._onChanged) {
                this._onChanged(this._tags.slice());
            }
        };
        TagsInput.prototype.sortTags = function () {
            var _this = this;
            if (this.sortable && this._tags) {
                if (this.sortFn) {
                    this._tags.sort(function (a, b) { return _this.sortFn(a, b); });
                }
                else {
                    this._tags.sort(function (a, b) { return a.localeCompare(b); });
                }
            }
        };
        TagsInput.prototype.removeTag = function ($index) {
            if (this._tags && this._tags.length > 0) {
                if ($index === -1) {
                    this._tags.pop();
                    this.change.emit(this._tags);
                }
                else if ($index > -1) {
                    this._tags.splice($index, 1);
                    this.change.emit(this._tags);
                }
                if (this._onChanged) {
                    this._onChanged(this._tags.slice());
                }
            }
        };
        TagsInput.prototype.isOnce = function (tagStr) {
            var tags = this._tags;
            if (!tags) {
                return true;
            }
            return tags.every(function (e) {
                return e !== tagStr;
            });
        };
        TagsInput.prototype._click = function (ev) {
            if (!this._isFocus) {
            }
            this.focus();
            ev.preventDefault();
            ev.stopPropagation();
        };
        TagsInput.prototype.blur = function () {
            if (this._editTag) {
                this.pushTag(this._editTag);
            }
            if (this._isFocus) {
                this._isFocus = false;
                this.ionBlur.emit(this._tags);
            }
        };
        TagsInput.prototype.focus = function () {
            if (!this._isFocus) {
                this._isFocus = true;
                if (this.input) {
                    this.input.setFocus();
                }
                this.ionFocus.emit(this._tags);
            }
        };
        TagsInput.prototype.writeValue = function (val) {
            this._tags = val;
        };
        TagsInput.prototype.registerOnChange = function (fn) {
            this._onChanged = fn;
        };
        TagsInput.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        TagsInput.prototype.setValue = function (val) {
            this._tags = val;
            this.sortTags();
        };
        TagsInput.ctorParameters = function () { return [
            { type: angular.Platform },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.HostBinding("class.readonly"),
            core.Input()
        ], TagsInput.prototype, "readonly", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "hideRemove", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "maxTags", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "placeholder", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "type", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "separatorStr", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "canEnterAdd", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "canBackspaceRemove", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "verifyFn", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "sortFn", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "sortable", void 0);
        __decorate([
            core.Input()
        ], TagsInput.prototype, "once", null);
        __decorate([
            core.Output()
        ], TagsInput.prototype, "change", void 0);
        __decorate([
            core.Output()
        ], TagsInput.prototype, "ionFocus", void 0);
        __decorate([
            core.Output()
        ], TagsInput.prototype, "ionBlur", void 0);
        __decorate([
            core.ViewChild(angular.IonInput, { static: false })
        ], TagsInput.prototype, "input", void 0);
        __decorate([
            core.HostListener("click", ["$event"])
        ], TagsInput.prototype, "_click", null);
        TagsInput = __decorate([
            core.Component({
                selector: "ionx-tags-input",
                providers: [tagsValueAccessor],
                template: "<div class=\"ionx-tags-input-wrapper\">\n    <ion-chip *ngFor=\"let tag of _tags; let $index = index;\" outline=\"true\" [class.ion-activatable]=\"false\">\n        <div>{{tag}}</div>\n        <ion-icon name=\"close\" *ngIf=\"!hideRemove && !readonly\" (click)=\"btnRemoveTag($index)\" [class.ion-activatable]=\"!readonly\"></ion-icon>\n    </ion-chip>\n</div>\n\n<ion-input *ngIf=\"!readonly\"\n           [disabled]=\"readonly\"\n           class=\"ionx-tags-input-input\"\n           [type]=\"type\"\n           [placeholder]=\"placeholder\"\n           [(ngModel)]=\"_editTag\"\n           (ionBlur)=\"blur()\"\n           (keyup.backspace)=\"keyRemoveTag($event); false\"\n           (keyup)=\"separatorStrAddTag()\" (keyup.enter)=\"keyAddTag()\"></ion-input>\n",
                styles: [":host{display:block}:host ion-chip{margin-left:0}:host-context(.item-label-stacked){width:100%}"]
            })
        ], TagsInput);
        return TagsInput;
    }());

    var TagsInputModule = /** @class */ (function () {
        function TagsInputModule() {
        }
        TagsInputModule = __decorate([
            core.NgModule({
                declarations: [TagsInput],
                exports: [TagsInput],
                imports: [common.CommonModule, angular.IonicModule, angularIntl.IntlModule, forms.FormsModule, forms.ReactiveFormsModule],
                entryComponents: [TagsInput]
            })
        ], TagsInputModule);
        return TagsInputModule;
    }());

    exports.TagsInput = TagsInput;
    exports.TagsInputModule = TagsInputModule;
    exports.ɵa = tagsValueAccessor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tags-input-module.umd.js.map
