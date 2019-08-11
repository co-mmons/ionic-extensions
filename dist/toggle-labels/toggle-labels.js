var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ContentChild, Input } from "@angular/core";
import { IonToggle } from "@ionic/angular";
var ToggleLabels = /** @class */ (function () {
    function ToggleLabels() {
    }
    ToggleLabels.prototype.switchOn = function () {
        this.toggle.checked = true;
    };
    ToggleLabels.prototype.switchOff = function () {
        this.toggle.checked = false;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ToggleLabels.prototype, "on", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ToggleLabels.prototype, "off", void 0);
    __decorate([
        ContentChild(IonToggle, { static: false }),
        __metadata("design:type", IonToggle)
    ], ToggleLabels.prototype, "toggle", void 0);
    ToggleLabels = __decorate([
        Component({
            selector: "ionx-toggle-labels",
            template: "\n        <span ionx--off (click)=\"switchOff()\">\n            <ng-template [ngIf]=\"!!off\">{{off}}</ng-template>\n            <ng-content select=\"[slot=off]\"></ng-content>\n        </span>\n        \n        <ng-content select=\"ion-toggle\"></ng-content>\n\n        <span ionx--on (click)=\"switchOn()\">\n            <ng-template [ngIf]=\"!!on\">{{on}}</ng-template>\n            <ng-content select=\"[slot=on]\"></ng-content>\n        </span>\n    ",
            styles: [
                ":host { display: flex; align-items: center; }",
                ":host ::ng-deep ion-toggle { padding-inline-start: 2px; padding-inline-end: 2px; }",
                ":host [ionx--on] { cursor: pointer; margin-left: 4px; }",
                ":host [ionx--off] { cursor: pointer; margin-right: 4px; }",
                ":host-context(.item-label-stacked) { align-self: flex-start }",
                ":host-context(.ios .item-label-stacked) { margin-top: 2px; margin-bottom: 2px; }"
            ]
        }),
        __metadata("design:paramtypes", [])
    ], ToggleLabels);
    return ToggleLabels;
}());
export { ToggleLabels };
//# sourceMappingURL=toggle-labels.js.map