var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Directive } from "@angular/core";
import { Ion } from "ionic-angular";
var ToolbarSubtitle = (function (_super) {
    __extends(ToolbarSubtitle, _super);
    function ToolbarSubtitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarSubtitle.decorators = [
        { type: Directive, args: [{
                    selector: "ion-title[ionx-with-subtitle]"
                },] },
    ];
    /** @nocollapse */
    ToolbarSubtitle.ctorParameters = function () { return []; };
    return ToolbarSubtitle;
}(Ion));
export { ToolbarSubtitle };
//# sourceMappingURL=subtitle.js.map