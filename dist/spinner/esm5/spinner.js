import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
var Spinner = /** @class */ (function () {
    function Spinner() {
        this.backdropVisible = false;
        this.fill = false;
    }
    tslib_1.__decorate([
        Input()
    ], Spinner.prototype, "backdropVisible", void 0);
    tslib_1.__decorate([
        Input()
    ], Spinner.prototype, "fill", void 0);
    tslib_1.__decorate([
        Input()
    ], Spinner.prototype, "color", void 0);
    tslib_1.__decorate([
        Input()
    ], Spinner.prototype, "name", void 0);
    Spinner = tslib_1.__decorate([
        Component({
            selector: "ionx-spinner",
            template: "<ion-backdrop *ngIf=\"backdropVisible\"></ion-backdrop><ion-spinner [name]=\"name\" [color]=\"color\"></ion-spinner>",
            styles: [":host{position:relative;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host ion-backdrop{opacity:.1}:host[fill]{position:absolute;width:100%;height:100%;left:0;top:0}:host[always-on-top]{z-index:100000}"]
        })
    ], Spinner);
    return Spinner;
}());
export { Spinner };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3NwaW5uZXIvIiwic291cmNlcyI6WyJzcGlubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU8vQztJQUxBO1FBUUksb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHakMsU0FBSSxHQUFZLEtBQUssQ0FBQztJQVExQixDQUFDO0lBWEc7UUFEQyxLQUFLLEVBQUU7b0RBQ3lCO0lBR2pDO1FBREMsS0FBSyxFQUFFO3lDQUNjO0lBR3RCO1FBREMsS0FBSyxFQUFFOzBDQUNNO0lBR2Q7UUFEQyxLQUFLLEVBQUU7eUNBQ0s7SUFaSixPQUFPO1FBTG5CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBRXhCLFFBQVEsRUFBRSxzSEFBZ0g7O1NBQzdILENBQUM7T0FDVyxPQUFPLENBY25CO0lBQUQsY0FBQztDQUFBLEFBZEQsSUFjQztTQWRZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc3Bpbm5lclwiLFxuICAgIHN0eWxlVXJsczogW1wic3Bpbm5lci5zY3NzXCJdLFxuICAgIHRlbXBsYXRlOiBgPGlvbi1iYWNrZHJvcCAqbmdJZj1cImJhY2tkcm9wVmlzaWJsZVwiPjwvaW9uLWJhY2tkcm9wPjxpb24tc3Bpbm5lciBbbmFtZV09XCJuYW1lXCIgW2NvbG9yXT1cImNvbG9yXCI+PC9pb24tc3Bpbm5lcj5gXG59KVxuZXhwb3J0IGNsYXNzIFNwaW5uZXIge1xuXG4gICAgQElucHV0KClcbiAgICBiYWNrZHJvcFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZmlsbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBjb2xvcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBuYW1lOiBzdHJpbmc7XG5cbn1cbiJdfQ==