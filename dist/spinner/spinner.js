import { Component, Input } from "@angular/core";
var Spinner = (function () {
    function Spinner() {
        this.backdropVisible = false;
        this.fill = false;
    }
    Spinner.decorators = [
        { type: Component, args: [{
                    selector: "ionx-spinner",
                    template: "<ion-backdrop *ngIf=\"backdropVisible\"></ion-backdrop><ion-spinner></ion-spinner>"
                },] },
    ];
    /** @nocollapse */
    Spinner.ctorParameters = function () { return []; };
    Spinner.propDecorators = {
        'backdropVisible': [{ type: Input },],
        'fill': [{ type: Input },],
    };
    return Spinner;
}());
export { Spinner };
//# sourceMappingURL=spinner.js.map