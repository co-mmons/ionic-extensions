var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "@angular/core";
var FormItem = /** @class */ (function () {
    function FormItem() {
    }
    FormItem = __decorate([
        Component({
            selector: "ionx-form-item",
            template: "<ng-content selector=\"ion-item\"></ng-content><ng-content selector=\"ionx-form-item-error\"></ng-content><ng-content selector=\"ionx-form-item-hint\"></ng-content><ng-content></ng-content>"
        })
    ], FormItem);
    return FormItem;
}());
export { FormItem };
//# sourceMappingURL=item.js.map