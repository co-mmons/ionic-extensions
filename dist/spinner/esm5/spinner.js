import { __decorate } from "tslib";
import { Component, HostBinding, Input } from "@angular/core";
var Spinner = /** @class */ (function () {
    function Spinner() {
        this.backdropVisible = false;
        this.fill = false;
    }
    __decorate([
        Input(),
        HostBinding("class.ionx--backdrop-visible")
    ], Spinner.prototype, "backdropVisible", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "fill", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "color", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "name", void 0);
    Spinner = __decorate([
        Component({
            selector: "ionx-spinner",
            template: "<ion-backdrop *ngIf=\"backdropVisible\"></ion-backdrop><ion-spinner [name]=\"name\" [color]=\"color\"></ion-spinner>",
            styles: [":host{position:relative;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;--spinner--backdrop-background-color:var(--backdrop-background-color, #000);--spinner--backdrop-opacity:var(--backdrop-opacity, .1)}:host ion-backdrop{opacity:var(--spinner--backdrop-opacity);background-color:var(--spinner--backdrop-background-color)}:host[fill]{position:absolute;width:100%;height:100%;left:0;top:0}:host[always-on-top]{z-index:100000}:host.ionx--backdrop-visible ion-backdrop{z-index:1}:host.ionx--backdrop-visible ion-spinner{z-index:2}"]
        })
    ], Spinner);
    return Spinner;
}());
export { Spinner };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3NwaW5uZXIvIiwic291cmNlcyI6WyJzcGlubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFPNUQ7SUFBQTtRQUlJLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBR2pDLFNBQUksR0FBWSxLQUFLLENBQUM7SUFRMUIsQ0FBQztJQVhHO1FBRkMsS0FBSyxFQUFFO1FBQ1AsV0FBVyxDQUFDLDhCQUE4QixDQUFDO29EQUNYO0lBR2pDO1FBREMsS0FBSyxFQUFFO3lDQUNjO0lBR3RCO1FBREMsS0FBSyxFQUFFOzBDQUNNO0lBR2Q7UUFEQyxLQUFLLEVBQUU7eUNBQ0s7SUFiSixPQUFPO1FBTG5CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBRXhCLFFBQVEsRUFBRSxzSEFBZ0g7O1NBQzdILENBQUM7T0FDVyxPQUFPLENBZW5CO0lBQUQsY0FBQztDQUFBLEFBZkQsSUFlQztTQWZZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXNwaW5uZXJcIixcbiAgICBzdHlsZVVybHM6IFtcInNwaW5uZXIuc2Nzc1wiXSxcbiAgICB0ZW1wbGF0ZTogYDxpb24tYmFja2Ryb3AgKm5nSWY9XCJiYWNrZHJvcFZpc2libGVcIj48L2lvbi1iYWNrZHJvcD48aW9uLXNwaW5uZXIgW25hbWVdPVwibmFtZVwiIFtjb2xvcl09XCJjb2xvclwiPjwvaW9uLXNwaW5uZXI+YFxufSlcbmV4cG9ydCBjbGFzcyBTcGlubmVyIHtcblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MuaW9ueC0tYmFja2Ryb3AtdmlzaWJsZVwiKVxuICAgIGJhY2tkcm9wVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBmaWxsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGNvbG9yOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIG5hbWU6IHN0cmluZztcblxufVxuIl19