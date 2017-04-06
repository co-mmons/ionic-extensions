import { NgModule } from "@angular/core";
import { QuillEditor } from "./quill-editor";
var QuillModule = (function () {
    function QuillModule() {
    }
    return QuillModule;
}());
export { QuillModule };
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
//# sourceMappingURL=quill-module.js.map