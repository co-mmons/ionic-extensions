import * as tslib_1 from "tslib";
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ToggleLabels.prototype, "on", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], ToggleLabels.prototype, "off", void 0);
    tslib_1.__decorate([
        ContentChild(IonToggle, { static: false }),
        tslib_1.__metadata("design:type", IonToggle)
    ], ToggleLabels.prototype, "toggle", void 0);
    ToggleLabels = tslib_1.__decorate([
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
        tslib_1.__metadata("design:paramtypes", [])
    ], ToggleLabels);
    return ToggleLabels;
}());
export { ToggleLabels };
//# sourceMappingURL=toggle-labels.js.map