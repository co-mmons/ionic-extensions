import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
var FormItem = /** @class */ (function () {
    function FormItem() {
    }
    FormItem = tslib_1.__decorate([
        Component({
            selector: "ionx-form-item",
            template: "<ng-content select=\"ion-item\"></ng-content><ng-content select=\"ionx-form-item-error\"></ng-content><ng-content select=\"ionx-form-item-hint\"></ng-content><ng-content></ng-content>"
        })
    ], FormItem);
    return FormItem;
}());
export { FormItem };
//# sourceMappingURL=item.js.map