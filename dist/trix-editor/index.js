import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TrixEditor } from "./editor";
import { IonicModule } from "ionic-angular";
export { TrixEditor } from "./editor";
var TrixEditorModule = (function () {
    function TrixEditorModule() {
    }
    return TrixEditorModule;
}());
export { TrixEditorModule };
TrixEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TrixEditor],
                exports: [TrixEditor],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [IonicModule]
            },] },
];
/** @nocollapse */
TrixEditorModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map