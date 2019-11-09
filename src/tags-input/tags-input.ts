import {ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IonInput, Platform} from "@ionic/angular";

export const tagsValueAccessor = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagsInput),
    multi: true
};

@Component({
    selector: "ionx-tags-input",
    providers: [tagsValueAccessor],
    templateUrl: "tags-input.html",
    styleUrls: ["tags-input.scss"]
})
export class TagsInput implements ControlValueAccessor {

    constructor(public plt: Platform, public ref: ChangeDetectorRef) {
    }

    @HostBinding("class.readonly")
    @Input()
    readonly: boolean = false;

    @Input()
    hideRemove: boolean = false;

    @Input()
    maxTags: number = -1;

    @Input()
    placeholder: string = "+Tag";

    @Input()
    type: string = "text";

    @Input()
    separatorStr: string = ",";

    @Input()
    canEnterAdd: boolean = true;

    @Input()
    canBackspaceRemove: boolean = false;

    @Input()
    verifyFn: (tagSrt: string) => boolean;

    @Input()
    sortFn: (a: string, b: string) => number;

    @Input()
    sortable: boolean;


    _once: boolean = false;

    @Input()
    set once(value: boolean | string) {
        if (typeof value === "string") {
            this._once = true;
        } else {
            this._once = value;
        }
    }

    get once(): boolean | string {
        return this._once;
    }


    @Output()
    change: EventEmitter<any> = new EventEmitter();

    @Output()
    ionFocus: EventEmitter<any> = new EventEmitter();

    @Output()
    ionBlur: EventEmitter<any> = new EventEmitter();

    @ViewChild(IonInput, {static: false})
    input: IonInput;

    _editTag: string = "";
    _tags: string[] = [];
    _isFocus: boolean = false;
    _onChanged: Function;
    _onTouched: Function;

    keyAddTag(): any {
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

    separatorStrAddTag(): any {

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

                } else {
                    this._editTag = tag;
                }
            }
        }
    }

    keyRemoveTag(ev: Event): any {

        if (!this.canBackspaceRemove) {
            return;
        }

        if (this._editTag === "") {
            this.removeTag(-1);
            this._editTag = "";
        }
    }

    btnRemoveTag($index: number): any {
        this.removeTag($index);
        this.input.setFocus();
    }

    verifyTag(tagStr: string): boolean {

        if (typeof this.verifyFn === "function") {
            if (!this.verifyFn(tagStr)) {
                this._editTag = "";
                return false;
            } else {
                return true;
            }
        }

        if (!tagStr.trim()) {
            this._editTag = "";
            return false;
        } else {
            return true;
        }
    }

    pushTag(tagStr: string): any {

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

    private sortTags() {
        if (this.sortable && this._tags) {
            if (this.sortFn) {
                this._tags.sort((a, b) => this.sortFn(a, b));
            } else {
                this._tags.sort((a, b) => a.localeCompare(b));
            }
        }
    }

    removeTag($index: number): any {
        if (this._tags && this._tags.length > 0) {
            if ($index === -1) {
                this._tags.pop();
                this.change.emit(this._tags);
            } else if ($index > -1) {
                this._tags.splice($index, 1);
                this.change.emit(this._tags);
            }

            if (this._onChanged) {
                this._onChanged(this._tags.slice());
            }
        }
    }

    isOnce(tagStr: string): boolean {
        const tags: string[] = this._tags;

        if (!tags) {
            return true;
        }

        return tags.every((e: string): boolean => {
            return e !== tagStr;
        });
    }

    @HostListener("click", ["$event"])
    _click(ev: UIEvent): any {
        if (!this._isFocus) {

        }
        this.focus();
        ev.preventDefault();
        ev.stopPropagation();
    }

    public blur() {

        if (this._editTag) {
            this.pushTag(this._editTag);
        }

        if (this._isFocus) {
            this._isFocus = false;
            this.ionBlur.emit(this._tags);
        }
    }

    public focus(): any {
        if (!this._isFocus) {
            this._isFocus = true;

            if (this.input) {
                this.input.setFocus();
            }

            this.ionFocus.emit(this._tags);
        }
    }

    writeValue(val: any): void {
        this._tags = val;
    }

    registerOnChange(fn: any): void {
        this._onChanged = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setValue(val: any): any {
        this._tags = val;
        this.sortTags();
    }
}
