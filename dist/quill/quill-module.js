import { NgModule } from "@angular/core";
import { QuillEditor } from "./quill-editor";
export var QuillModule = (function () {
    function QuillModule() {
    }
    QuillModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        QuillEditor
                    ],
                    imports: [],
                    exports: [QuillEditor],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    QuillModule.ctorParameters = function () { return []; };
    return QuillModule;
}());
//# sourceMappingURL=quill-module.js.map