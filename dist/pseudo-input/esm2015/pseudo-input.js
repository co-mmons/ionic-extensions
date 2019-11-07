import * as tslib_1 from "tslib";
import { Component, ElementRef } from "@angular/core";
let PseudoInput = class PseudoInput {
    constructor(element) {
        this.element = element;
    }
};
PseudoInput.ctorParameters = () => [
    { type: ElementRef }
];
PseudoInput = tslib_1.__decorate([
    Component({
        selector: "ionx-pseudo-input",
        exportAs: "ionxPseudoInput",
        template: "<ng-content></ng-content>",
        styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}:host-context(.item-label-stacked){align-self:flex-start;--padding-start:0}:host-context(.md.item-label-stacked){--padding-top:10px;--padding-bottom:9px}:host-context(.ios.item-label-stacked){--padding-top:9px;--padding-bottom:8px}"]
    })
], PseudoInput);
export { PseudoInput };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWlucHV0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvcHNldWRvLWlucHV0LyIsInNvdXJjZXMiOlsicHNldWRvLWlucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVFwRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBRXBCLFlBQXNCLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO0lBQ3RELENBQUM7Q0FDSixDQUFBOztZQUZrQyxVQUFVOztBQUZoQyxXQUFXO0lBTnZCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFFN0IsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixRQUFRLEVBQUUsMkJBQTJCOztLQUN4QyxDQUFDO0dBQ1csV0FBVyxDQUl2QjtTQUpZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1wc2V1ZG8taW5wdXRcIixcbiAgICBzdHlsZVVybHM6IFtcInBzZXVkby1pbnB1dC5zY3NzXCJdLFxuICAgIGV4cG9ydEFzOiBcImlvbnhQc2V1ZG9JbnB1dFwiLFxuICAgIHRlbXBsYXRlOiBcIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cIlxufSlcbmV4cG9ydCBjbGFzcyBQc2V1ZG9JbnB1dCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB9XG59XG4iXX0=