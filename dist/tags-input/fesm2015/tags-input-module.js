import { CommonModule } from '@angular/common';
import { forwardRef, EventEmitter, Component, ChangeDetectorRef, HostBinding, Input, Output, ViewChild, HostListener, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntlModule } from '@co.mmons/angular-intl';
import { Platform, IonInput, IonicModule } from '@ionic/angular';

const tagsValueAccessor = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagsInput),
    multi: true
};
class TagsInput {
    constructor(plt, ref) {
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
    set once(value) {
        if (typeof value === "string") {
            this._once = true;
        }
        else {
            this._once = value;
        }
    }
    get once() {
        return this._once;
    }
    keyAddTag() {
        const tagStr = this._editTag.trim();
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
    }
    separatorStrAddTag() {
        if (!this.separatorStr) {
            return;
        }
        if (this._editTag.indexOf(this.separatorStr) > -1) {
            const tags = this._editTag.split(this.separatorStr);
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i].trim();
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
    }
    keyRemoveTag(ev) {
        if (!this.canBackspaceRemove) {
            return;
        }
        if (this._editTag === "") {
            this.removeTag(-1);
            this._editTag = "";
        }
    }
    btnRemoveTag($index) {
        this.removeTag($index);
        this.input.setFocus();
    }
    verifyTag(tagStr) {
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
    }
    pushTag(tagStr) {
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
    }
    sortTags() {
        if (this.sortable && this._tags) {
            if (this.sortFn) {
                this._tags.sort((a, b) => this.sortFn(a, b));
            }
            else {
                this._tags.sort((a, b) => a.localeCompare(b));
            }
        }
    }
    removeTag($index) {
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
    }
    isOnce(tagStr) {
        const tags = this._tags;
        if (!tags) {
            return true;
        }
        return tags.every((e) => {
            return e !== tagStr;
        });
    }
    _click(ev) {
        if (!this._isFocus) {
        }
        this.focus();
        ev.preventDefault();
        ev.stopPropagation();
    }
    blur() {
        if (this._editTag) {
            this.pushTag(this._editTag);
        }
        if (this._isFocus) {
            this._isFocus = false;
            this.ionBlur.emit(this._tags);
        }
    }
    focus() {
        if (!this._isFocus) {
            this._isFocus = true;
            if (this.input) {
                this.input.setFocus();
            }
            this.ionFocus.emit(this._tags);
        }
    }
    writeValue(val) {
        this._tags = val;
    }
    registerOnChange(fn) {
        this._onChanged = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setValue(val) {
        this._tags = val;
        this.sortTags();
    }
}
TagsInput.decorators = [
    { type: Component, args: [{
                selector: "ionx-tags-input",
                providers: [tagsValueAccessor],
                template: "<div class=\"ionx-tags-input-wrapper\">\n    <ion-chip *ngFor=\"let tag of _tags; let $index = index;\" outline=\"true\" [class.ion-activatable]=\"false\">\n        <div>{{tag}}</div>\n        <ion-icon name=\"close\" *ngIf=\"!hideRemove && !readonly\" (click)=\"btnRemoveTag($index)\" [class.ion-activatable]=\"!readonly\"></ion-icon>\n    </ion-chip>\n</div>\n\n<ion-input *ngIf=\"!readonly\"\n           [disabled]=\"readonly\"\n           class=\"ionx-tags-input-input\"\n           [type]=\"type\"\n           [placeholder]=\"placeholder\"\n           [(ngModel)]=\"_editTag\"\n           (ionBlur)=\"blur()\"\n           (keyup.backspace)=\"keyRemoveTag($event); false\"\n           (keyup)=\"separatorStrAddTag()\" (keyup.enter)=\"keyAddTag()\"></ion-input>\n",
                styles: [":host{display:block}:host ion-chip{margin-left:0}:host-context(.item-label-stacked){width:100%}\n"]
            },] }
];
TagsInput.ctorParameters = () => [
    { type: Platform },
    { type: ChangeDetectorRef }
];
TagsInput.propDecorators = {
    readonly: [{ type: HostBinding, args: ["class.readonly",] }, { type: Input }],
    hideRemove: [{ type: Input }],
    maxTags: [{ type: Input }],
    placeholder: [{ type: Input }],
    type: [{ type: Input }],
    separatorStr: [{ type: Input }],
    canEnterAdd: [{ type: Input }],
    canBackspaceRemove: [{ type: Input }],
    verifyFn: [{ type: Input }],
    sortFn: [{ type: Input }],
    sortable: [{ type: Input }],
    once: [{ type: Input }],
    change: [{ type: Output }],
    ionFocus: [{ type: Output }],
    ionBlur: [{ type: Output }],
    input: [{ type: ViewChild, args: [IonInput, { static: false },] }],
    _click: [{ type: HostListener, args: ["click", ["$event"],] }]
};

class TagsInputModule {
}
TagsInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TagsInput],
                exports: [TagsInput],
                imports: [CommonModule, IonicModule, IntlModule, FormsModule, ReactiveFormsModule],
                entryComponents: [TagsInput]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { TagsInput, TagsInputModule, tagsValueAccessor as ɵa };
//# sourceMappingURL=tags-input-module.js.map
