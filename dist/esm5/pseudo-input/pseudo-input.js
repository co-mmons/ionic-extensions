import * as tslib_1 from "tslib";
import { Component, ElementRef } from "@angular/core";
var PseudoInput = /** @class */ (function () {
    function PseudoInput(element) {
        this.element = element;
    }
    PseudoInput = tslib_1.__decorate([
        Component({
            selector: "ionx-pseudo-input",
            exportAs: "ionxPseudoInput",
            template: "<ng-content></ng-content>",
            styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}:host-context(.item-label-stacked) ionx-pseudo-input{align-self:flex-start;--padding-start:0}:host-context(.md.item-label-stacked) ionx-pseudo-input{--padding-top:10px;--padding-bottom:9px}:host-context(.ios.item-label-stacked) ionx-pseudo-input{--padding-top:9px;--padding-bottom:8px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], PseudoInput);
    return PseudoInput;
}());
export { PseudoInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWlucHV0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJwc2V1ZG8taW5wdXQvcHNldWRvLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVFwRDtJQUVJLHFCQUFzQixPQUFnQztRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUN0RCxDQUFDO0lBSFEsV0FBVztRQU52QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBRTdCLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLDJCQUEyQjs7U0FDeEMsQ0FBQztpREFHaUMsVUFBVTtPQUZoQyxXQUFXLENBSXZCO0lBQUQsa0JBQUM7Q0FBQSxBQUpELElBSUM7U0FKWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtcHNldWRvLWlucHV0XCIsXG4gICAgc3R5bGVVcmxzOiBbXCJwc2V1ZG8taW5wdXQuc2Nzc1wiXSxcbiAgICBleHBvcnRBczogXCJpb254UHNldWRvSW5wdXRcIixcbiAgICB0ZW1wbGF0ZTogXCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XCJcbn0pXG5leHBvcnQgY2xhc3MgUHNldWRvSW5wdXQge1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgfVxufVxuIl19