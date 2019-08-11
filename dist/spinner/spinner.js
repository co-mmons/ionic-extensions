var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
var Spinner = /** @class */ (function () {
    function Spinner() {
        this.backdropVisible = false;
        this.fill = false;
    }
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Spinner.prototype, "backdropVisible", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Spinner.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Spinner.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Spinner.prototype, "name", void 0);
    Spinner = __decorate([
        Component({
            selector: "ionx-spinner",
            template: "<ion-backdrop *ngIf=\"backdropVisible\"></ion-backdrop><ion-spinner [name]=\"name\" [color]=\"color\"></ion-spinner>"
        })
    ], Spinner);
    return Spinner;
}());
export { Spinner };
//# sourceMappingURL=spinner.js.map