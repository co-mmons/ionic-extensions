(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@co.mmons/angular-intl'), require('@ionic/angular')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/tags-input', ['exports', '@angular/common', '@angular/core', '@angular/forms', '@co.mmons/angular-intl', '@ionic/angular'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"]["tags-input"] = {}), global.ng.common, global.ng.core, global.ng.forms, global.angularIntl, global.angular));
})(this, (function (exports, common, core, forms, angularIntl, angular) { 'use strict';

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
            enumerable: false,
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
        return TagsInput;
    }());
    TagsInput.decorators = [
        { type: core.Component, args: [{
                    selector: "ionx-tags-input",
                    providers: [tagsValueAccessor],
                    template: "<div class=\"ionx-tags-input-wrapper\">\n    <ion-chip *ngFor=\"let tag of _tags; let $index = index;\" outline=\"true\" [class.ion-activatable]=\"false\">\n        <div>{{tag}}</div>\n        <ion-icon name=\"close\" *ngIf=\"!hideRemove && !readonly\" (click)=\"btnRemoveTag($index)\" [class.ion-activatable]=\"!readonly\"></ion-icon>\n    </ion-chip>\n</div>\n\n<ion-input *ngIf=\"!readonly\"\n           [disabled]=\"readonly\"\n           class=\"ionx-tags-input-input\"\n           [type]=\"type\"\n           [placeholder]=\"placeholder\"\n           [(ngModel)]=\"_editTag\"\n           (ionBlur)=\"blur()\"\n           (keyup.backspace)=\"keyRemoveTag($event); false\"\n           (keyup)=\"separatorStrAddTag()\" (keyup.enter)=\"keyAddTag()\"></ion-input>\n",
                    styles: [":host{display:block}:host ion-chip{margin-left:0}:host-context(.item-label-stacked){width:100%}\n"]
                },] }
    ];
    TagsInput.ctorParameters = function () { return [
        { type: angular.Platform },
        { type: core.ChangeDetectorRef }
    ]; };
    TagsInput.propDecorators = {
        readonly: [{ type: core.HostBinding, args: ["class.readonly",] }, { type: core.Input }],
        hideRemove: [{ type: core.Input }],
        maxTags: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        type: [{ type: core.Input }],
        separatorStr: [{ type: core.Input }],
        canEnterAdd: [{ type: core.Input }],
        canBackspaceRemove: [{ type: core.Input }],
        verifyFn: [{ type: core.Input }],
        sortFn: [{ type: core.Input }],
        sortable: [{ type: core.Input }],
        once: [{ type: core.Input }],
        change: [{ type: core.Output }],
        ionFocus: [{ type: core.Output }],
        ionBlur: [{ type: core.Output }],
        input: [{ type: core.ViewChild, args: [angular.IonInput, { static: false },] }],
        _click: [{ type: core.HostListener, args: ["click", ["$event"],] }]
    };

    var TagsInputModule = /** @class */ (function () {
        function TagsInputModule() {
        }
        return TagsInputModule;
    }());
    TagsInputModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [TagsInput],
                    exports: [TagsInput],
                    imports: [common.CommonModule, angular.IonicModule, angularIntl.IntlModule, forms.FormsModule, forms.ReactiveFormsModule],
                    entryComponents: [TagsInput]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TagsInput = TagsInput;
    exports.TagsInputModule = TagsInputModule;
    exports["ɵa"] = tagsValueAccessor;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tags-input-module.umd.js.map
