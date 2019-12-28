import { __decorate } from "tslib";
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { IonInput, Platform } from "@ionic/angular";
export var tagsValueAccessor = {
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
export { TagsInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3RhZ3MtaW5wdXQvIiwic291cmNlcyI6WyJ0YWdzLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxSSxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRCxNQUFNLENBQUMsSUFBTSxpQkFBaUIsR0FBRztJQUM3QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLFNBQVMsRUFBVCxDQUFTLENBQUM7SUFDeEMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBUUY7SUFFSSxtQkFBbUIsR0FBYSxFQUFTLEdBQXNCO1FBQTVDLFFBQUcsR0FBSCxHQUFHLENBQVU7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUsvRCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRzFCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFHNUIsWUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBR3JCLGdCQUFXLEdBQVcsTUFBTSxDQUFDO1FBRzdCLFNBQUksR0FBVyxNQUFNLENBQUM7UUFHdEIsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFHM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBWXBDLFVBQUssR0FBWSxLQUFLLENBQUM7UUFpQnZCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUcvQyxhQUFRLEdBQXNCLElBQUks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Q0FBQzs0Q0FDckI7SUEySmhCO1FBREMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzJDQVFqQztJQXBPUSxTQUFTO1FBTnJCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDOUIsMHdCQUE4Qjs7U0FFakMsQ0FBQztPQUNXLFNBQVMsQ0E4UXJCO0lBQUQsZ0JBQUM7Q0FBQSxBQTlRRCxJQThRQztTQTlRWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7SW9uSW5wdXQsIFBsYXRmb3JtfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcblxuZXhwb3J0IGNvbnN0IHRhZ3NWYWx1ZUFjY2Vzc29yID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRhZ3NJbnB1dCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtdGFncy1pbnB1dFwiLFxuICAgIHByb3ZpZGVyczogW3RhZ3NWYWx1ZUFjY2Vzc29yXSxcbiAgICB0ZW1wbGF0ZVVybDogXCJ0YWdzLWlucHV0Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInRhZ3MtaW5wdXQuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBUYWdzSW5wdXQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGx0OiBQbGF0Zm9ybSwgcHVibGljIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5yZWFkb25seVwiKVxuICAgIEBJbnB1dCgpXG4gICAgcmVhZG9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgaGlkZVJlbW92ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBtYXhUYWdzOiBudW1iZXIgPSAtMTtcblxuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiK1RhZ1wiO1xuXG4gICAgQElucHV0KClcbiAgICB0eXBlOiBzdHJpbmcgPSBcInRleHRcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgc2VwYXJhdG9yU3RyOiBzdHJpbmcgPSBcIixcIjtcblxuICAgIEBJbnB1dCgpXG4gICAgY2FuRW50ZXJBZGQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KClcbiAgICBjYW5CYWNrc3BhY2VSZW1vdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgdmVyaWZ5Rm46ICh0YWdTcnQ6IHN0cmluZykgPT4gYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgc29ydEZuOiAoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IG51bWJlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgc29ydGFibGU6IGJvb2xlYW47XG5cblxuICAgIF9vbmNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBvbmNlKHZhbHVlOiBib29sZWFuIHwgc3RyaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX29uY2UgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fb25jZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG9uY2UoKTogYm9vbGVhbiB8IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbmNlO1xuICAgIH1cblxuXG4gICAgQE91dHB1dCgpXG4gICAgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIGlvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIGlvbkJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZChJb25JbnB1dCwge3N0YXRpYzogZmFsc2V9KVxuICAgIGlucHV0OiBJb25JbnB1dDtcblxuICAgIF9lZGl0VGFnOiBzdHJpbmcgPSBcIlwiO1xuICAgIF90YWdzOiBzdHJpbmdbXSA9IFtdO1xuICAgIF9pc0ZvY3VzOiBib29sZWFuID0gZmFsc2U7XG4gICAgX29uQ2hhbmdlZDogRnVuY3Rpb247XG4gICAgX29uVG91Y2hlZDogRnVuY3Rpb247XG5cbiAgICBrZXlBZGRUYWcoKTogYW55IHtcbiAgICAgICAgY29uc3QgdGFnU3RyID0gdGhpcy5fZWRpdFRhZy50cmltKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNhbkVudGVyQWRkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudmVyaWZ5VGFnKHRhZ1N0cikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uY2UgJiYgIXRoaXMuaXNPbmNlKHRhZ1N0cikpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRUYWcgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wdXNoVGFnKHRhZ1N0cik7XG4gICAgfVxuXG4gICAgc2VwYXJhdG9yU3RyQWRkVGFnKCk6IGFueSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlcGFyYXRvclN0cikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2VkaXRUYWcuaW5kZXhPZih0aGlzLnNlcGFyYXRvclN0cikgPiAtMSkge1xuXG4gICAgICAgICAgICBjb25zdCB0YWdzID0gdGhpcy5fZWRpdFRhZy5zcGxpdCh0aGlzLnNlcGFyYXRvclN0cik7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRhZ3NbaV0udHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGkgPCB0YWdzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmVyaWZ5VGFnKHRhZykgJiYgdGhpcy5pc09uY2UodGFnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoVGFnKHRhZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRUYWcgPSB0YWc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAga2V5UmVtb3ZlVGFnKGV2OiBFdmVudCk6IGFueSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNhbkJhY2tzcGFjZVJlbW92ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2VkaXRUYWcgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFnKC0xKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRUYWcgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnRuUmVtb3ZlVGFnKCRpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICAgICAgdGhpcy5yZW1vdmVUYWcoJGluZGV4KTtcbiAgICAgICAgdGhpcy5pbnB1dC5zZXRGb2N1cygpO1xuICAgIH1cblxuICAgIHZlcmlmeVRhZyh0YWdTdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy52ZXJpZnlGbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmVyaWZ5Rm4odGFnU3RyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRUYWcgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRhZ1N0ci50cmltKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRUYWcgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoVGFnKHRhZ1N0cjogc3RyaW5nKTogYW55IHtcblxuICAgICAgICBpZiAoIXRoaXMuX3RhZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhZ3MgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl90YWdzLmluZGV4T2YodGFnU3RyKSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXhUYWdzICE9PSAtMSAmJiB0aGlzLl90YWdzLmxlbmd0aCA+PSB0aGlzLm1heFRhZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRUYWcgPSBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLl90YWdzLnB1c2godGFnU3RyLnRyaW0oKSk7XG4gICAgICAgIHRoaXMuc29ydFRhZ3MoKTtcblxuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5fdGFncy5zbGljZSgpKTtcbiAgICAgICAgdGhpcy5fZWRpdFRhZyA9IFwiXCI7XG5cbiAgICAgICAgaWYgKHRoaXMuX29uQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2VkKHRoaXMuX3RhZ3Muc2xpY2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRUYWdzKCkge1xuICAgICAgICBpZiAodGhpcy5zb3J0YWJsZSAmJiB0aGlzLl90YWdzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0Rm4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWdzLnNvcnQoKGEsIGIpID0+IHRoaXMuc29ydEZuKGEsIGIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFncy5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlVGFnKCRpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMuX3RhZ3MgJiYgdGhpcy5fdGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoJGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhZ3MucG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLl90YWdzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YWdzLnNwbGljZSgkaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5fdGFncyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9vbkNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZWQodGhpcy5fdGFncy5zbGljZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzT25jZSh0YWdTdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB0YWdzOiBzdHJpbmdbXSA9IHRoaXMuX3RhZ3M7XG5cbiAgICAgICAgaWYgKCF0YWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YWdzLmV2ZXJ5KChlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlICE9PSB0YWdTdHI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgX2NsaWNrKGV2OiBVSUV2ZW50KTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0ZvY3VzKSB7XG5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBibHVyKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9lZGl0VGFnKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2hUYWcodGhpcy5fZWRpdFRhZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5faXNGb2N1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pb25CbHVyLmVtaXQodGhpcy5fdGFncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZm9jdXMoKTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0ZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0ZvY3VzID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldEZvY3VzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW9uRm9jdXMuZW1pdCh0aGlzLl90YWdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFncyA9IHZhbDtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VkID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZSh2YWw6IGFueSk6IGFueSB7XG4gICAgICAgIHRoaXMuX3RhZ3MgPSB2YWw7XG4gICAgICAgIHRoaXMuc29ydFRhZ3MoKTtcbiAgICB9XG59XG4iXX0=