import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from "@angular/forms";
import Quill from "quill";
export var QuillEditor = (function () {
    function QuillEditor(elementRef) {
        this.elementRef = elementRef;
        this.emptyArray = [];
        this.defaultModules = {
            toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ "header": 1 }, { "header": 2 }],
                [{ "list": "ordered" }, { "list": "bullet" }],
                [{ "script": "sub" }, { "script": "super" }],
                [{ "indent": "-1" }, { "indent": "+1" }],
                [{ "direction": "rtl" }],
                [{ "size": ["small", false, "large", "huge"] }],
                [{ "header": [1, 2, 3, 4, 5, 6, false] }],
                [{ "color": this.emptyArray.slice() }, { "background": this.emptyArray.slice() }],
                [{ "font": this.emptyArray.slice() }],
                [{ "align": this.emptyArray.slice() }],
                ["clean"],
                ["link", "image", "video"] // link and image, video
            ]
        };
        this.onEditorCreated = new EventEmitter();
        this.onContentChanged = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    QuillEditor.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.editorElem = this.elementRef.nativeElement.children[0];
        this.quillEditor = new Quill(this.editorElem, {
            modules: this.modules || this.defaultModules,
            placeholder: this.placeholder || "Insert text here ...",
            readOnly: this.readOnly || false,
            theme: this.theme || "snow",
            formats: this.formats
        });
        if (this.content) {
            this.quillEditor.pasteHTML(this.content);
        }
        this.onEditorCreated.emit(this.quillEditor);
        // mark model as touched if editor lost focus
        this.quillEditor.on("selection-change", function (range) {
            if (!range) {
                _this.onModelTouched();
            }
        });
        // update model if text changes
        this.quillEditor.on("text-change", function (delta, oldDelta) {
            var html = _this.editorElem.children[0].innerHTML;
            var text = _this.quillEditor.getText();
            if (html === "<p><br></p>") {
                html = null;
            }
            _this.onModelChange(html);
            _this.onContentChanged.emit({
                editor: _this.quillEditor,
                html: html,
                text: text
            });
        });
    };
    QuillEditor.prototype.ngOnChanges = function (changes) {
        var min;
        var max;
        if (changes["readOnly"] && this.quillEditor) {
            this.quillEditor.enable(!changes["readOnly"].currentValue);
        }
        if (this.quillEditor) {
            if (changes["minLength"]) {
                min = changes["minLength"].currentValue;
            }
            if (changes["maxLength"]) {
                max = changes["maxLength"].currentValue;
            }
        }
    };
    QuillEditor.prototype.writeValue = function (currentValue) {
        this.content = currentValue;
        if (this.quillEditor) {
            if (currentValue) {
                this.quillEditor.pasteHTML(currentValue);
                return;
            }
            this.quillEditor.setText("");
        }
    };
    QuillEditor.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    QuillEditor.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    QuillEditor.prototype.validate = function (c) {
        if (!this.quillEditor) {
            return null;
        }
        var err = {}, valid = true;
        var textLength = this.quillEditor.getText().trim().length;
        if (this.minLength) {
            err.minLengthError = {
                given: textLength,
                minLength: this.minLength
            };
            valid = textLength >= this.minLength;
        }
        if (this.maxLength) {
            err.maxLengthError = {
                given: textLength,
                maxLength: this.maxLength
            };
            valid = textLength <= this.maxLength && valid;
        }
        return valid ? null : err;
    };
    QuillEditor.decorators = [
        { type: Component, args: [{
                    selector: "ionx-quill-editor",
                    template: "<div></div>",
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return QuillEditor; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return QuillEditor; }), multi: true }
                    ],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    QuillEditor.ctorParameters = [
        { type: ElementRef, },
    ];
    QuillEditor.propDecorators = {
        'theme': [{ type: Input },],
        'modules': [{ type: Input },],
        'readOnly': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'maxLength': [{ type: Input },],
        'minLength': [{ type: Input },],
        'formats': [{ type: Input },],
        'onEditorCreated': [{ type: Output },],
        'onContentChanged': [{ type: Output },],
    };
    return QuillEditor;
}());
//# sourceMappingURL=quill-editor.js.map