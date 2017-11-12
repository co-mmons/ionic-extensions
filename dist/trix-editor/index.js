import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TrixEditor } from "./editor";
export { TrixEditor } from "./editor";
var TrixEditorModule = /** @class */ (function () {
    function TrixEditorModule() {
    }
    TrixEditorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [TrixEditor],
                    exports: [TrixEditor],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
                },] },
    ];
    /** @nocollapse */
    TrixEditorModule.ctorParameters = function () { return []; };
    return TrixEditorModule;
}());
export { TrixEditorModule };
//# sourceMappingURL=index.js.map