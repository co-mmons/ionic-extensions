import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
var Spinner = /** @class */ (function () {
    function Spinner() {
        this.backdropVisible = false;
        this.fill = false;
    }
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], Spinner.prototype, "backdropVisible", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], Spinner.prototype, "fill", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Spinner.prototype, "color", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], Spinner.prototype, "name", void 0);
    Spinner = tslib_1.__decorate([
        Component({
            selector: "ionx-spinner",
            template: "<ion-backdrop *ngIf=\"backdropVisible\"></ion-backdrop><ion-spinner [name]=\"name\" [color]=\"color\"></ion-spinner>"
        })
    ], Spinner);
    return Spinner;
}());
export { Spinner };
//# sourceMappingURL=spinner.js.map