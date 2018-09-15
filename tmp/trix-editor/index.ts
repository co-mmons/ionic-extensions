import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TrixEditor } from "./editor";
export { TrixEditor } from "./editor";

@NgModule({
    declarations: [TrixEditor],
    exports: [TrixEditor],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrixEditorModule {
}