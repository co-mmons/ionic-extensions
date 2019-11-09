import { __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { forwardRef, EventEmitter, ChangeDetectorRef, HostBinding, Input, Output, ViewChild, HostListener, Component, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntlModule } from '@co.mmons/angular-intl';
import { Platform, IonInput, IonicModule } from '@ionic/angular';

var tagsValueAccessor = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TagsInput; }),
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
        this.change = new EventEmitter();
        this.ionFocus = new EventEmitter();
        this.ionBlur = new EventEmitter();
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
        { type: Platform },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        HostBinding("class.readonly"),
        Input()
    ], TagsInput.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "hideRemove", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "maxTags", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "type", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "separatorStr", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "canEnterAdd", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "canBackspaceRemove", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "verifyFn", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "sortFn", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "sortable", void 0);
    __decorate([
        Input()
    ], TagsInput.prototype, "once", null);
    __decorate([
        Output()
    ], TagsInput.prototype, "change", void 0);
    __decorate([
        Output()
    ], TagsInput.prototype, "ionFocus", void 0);
    __decorate([
        Output()
    ], TagsInput.prototype, "ionBlur", void 0);
    __decorate([
        ViewChild(IonInput, { static: false })
    ], TagsInput.prototype, "input", void 0);
    __decorate([
        HostListener("click", ["$event"])
    ], TagsInput.prototype, "_click", null);
    TagsInput = __decorate([
        Component({
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
        NgModule({
            declarations: [TagsInput],
            exports: [TagsInput],
            imports: [CommonModule, IonicModule, IntlModule, FormsModule, ReactiveFormsModule],
            entryComponents: [TagsInput]
        })
    ], TagsInputModule);
    return TagsInputModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { TagsInput, TagsInputModule, tagsValueAccessor as ɵa };
//# sourceMappingURL=tags-input-module.js.map
