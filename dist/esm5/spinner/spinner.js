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
            template: "<ion-backdrop *ngIf=\"backdropVisible\"></ion-backdrop><ion-spinner [name]=\"name\" [color]=\"color\"></ion-spinner>",
            styles: [":host{position:relative;display:flex;align-items:center;justify-content:center}:host ion-backdrop{opacity:.1}:host[fill]{position:absolute;width:100%;height:100%;left:0;top:0}:host[always-on-top]{z-index:100000}"]
        })
    ], Spinner);
    return Spinner;
}());
export { Spinner };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsic3Bpbm5lci9zcGlubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU8vQztJQUxBO1FBUUksb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHakMsU0FBSSxHQUFZLEtBQUssQ0FBQztJQVExQixDQUFDO0lBWEc7UUFEQyxLQUFLLEVBQUU7O29EQUN5QjtJQUdqQztRQURDLEtBQUssRUFBRTs7eUNBQ2M7SUFHdEI7UUFEQyxLQUFLLEVBQUU7OzBDQUNNO0lBR2Q7UUFEQyxLQUFLLEVBQUU7O3lDQUNLO0lBWkosT0FBTztRQUxuQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUV4QixRQUFRLEVBQUUsc0hBQWdIOztTQUM3SCxDQUFDO09BQ1csT0FBTyxDQWNuQjtJQUFELGNBQUM7Q0FBQSxBQWRELElBY0M7U0FkWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXNwaW5uZXJcIixcbiAgICBzdHlsZVVybHM6IFtcInNwaW5uZXIuc2Nzc1wiXSxcbiAgICB0ZW1wbGF0ZTogYDxpb24tYmFja2Ryb3AgKm5nSWY9XCJiYWNrZHJvcFZpc2libGVcIj48L2lvbi1iYWNrZHJvcD48aW9uLXNwaW5uZXIgW25hbWVdPVwibmFtZVwiIFtjb2xvcl09XCJjb2xvclwiPjwvaW9uLXNwaW5uZXI+YFxufSlcbmV4cG9ydCBjbGFzcyBTcGlubmVyIHtcblxuICAgIEBJbnB1dCgpXG4gICAgYmFja2Ryb3BWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGZpbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgY29sb3I6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbmFtZTogc3RyaW5nO1xuXG59XG4iXX0=