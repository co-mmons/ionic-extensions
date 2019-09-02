import * as tslib_1 from "tslib";
import { Component, ElementRef } from "@angular/core";
let PseudoInput = class PseudoInput {
    constructor(element) {
        this.element = element;
    }
};
PseudoInput = tslib_1.__decorate([
    Component({
        selector: "ionx-pseudo-input",
        exportAs: "ionxPseudoInput",
        template: "<ng-content></ng-content>",
        styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}:host-context(.item-label-stacked) ionx-pseudo-input{align-self:flex-start;--padding-start:0}:host-context(.md.item-label-stacked) ionx-pseudo-input{--padding-top:10px;--padding-bottom:9px}:host-context(.ios.item-label-stacked) ionx-pseudo-input{--padding-top:9px;--padding-bottom:8px}"]
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], PseudoInput);
export { PseudoInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWlucHV0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJwc2V1ZG8taW5wdXQvcHNldWRvLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVFwRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBRXBCLFlBQXNCLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQ3RELENBQUM7Q0FDSixDQUFBO0FBSlksV0FBVztJQU52QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO1FBRTdCLFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsUUFBUSxFQUFFLDJCQUEyQjs7S0FDeEMsQ0FBQzs2Q0FHaUMsVUFBVTtHQUZoQyxXQUFXLENBSXZCO1NBSlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXBzZXVkby1pbnB1dFwiLFxuICAgIHN0eWxlVXJsczogW1wicHNldWRvLWlucHV0LnNjc3NcIl0sXG4gICAgZXhwb3J0QXM6IFwiaW9ueFBzZXVkb0lucHV0XCIsXG4gICAgdGVtcGxhdGU6IFwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlwiXG59KVxuZXhwb3J0IGNsYXNzIFBzZXVkb0lucHV0IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIH1cbn1cbiJdfQ==