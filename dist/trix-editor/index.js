var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TrixEditor } from "./editor";
import { IonicModule } from "ionic-angular";
export { TrixEditor } from "./editor";
var TrixEditorModule = (function () {
    function TrixEditorModule() {
    }
    TrixEditorModule = __decorate([
        NgModule({
            declarations: [TrixEditor],
            exports: [TrixEditor],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [IonicModule]
        })
    ], TrixEditorModule);
    return TrixEditorModule;
}());
export { TrixEditorModule };
//# sourceMappingURL=index.js.map