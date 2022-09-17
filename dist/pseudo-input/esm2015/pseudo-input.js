import { Component, ElementRef } from "@angular/core";
export class PseudoInput {
    constructor(element) {
        this.element = element;
    }
}
PseudoInput.decorators = [
    { type: Component, args: [{
                selector: "ionx-pseudo-input",
                exportAs: "ionxPseudoInput",
                template: "<ng-content></ng-content>",
                styles: [":host{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;overflow:hidden;-webkit-user-select:text;user-select:text}:host-context(.item-label-stacked){align-self:flex-start;--padding-start: 0}:host-context(.md .item-label-stacked){--padding-top: 10px;--padding-bottom: 9px}:host-context(.ios .item-label-stacked){--padding-top: 9px;--padding-bottom: 8px}\n"]
            },] }
];
PseudoInput.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHNldWRvLWlucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BzZXVkby1pbnB1dC9wc2V1ZG8taW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFRcEQsTUFBTSxPQUFPLFdBQVc7SUFFcEIsWUFBc0IsT0FBZ0M7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFDdEQsQ0FBQzs7O1lBVEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBRTdCLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSwyQkFBMkI7O2FBQ3hDOzs7WUFQa0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LXBzZXVkby1pbnB1dFwiLFxuICAgIHN0eWxlVXJsczogW1wicHNldWRvLWlucHV0LnNjc3NcIl0sXG4gICAgZXhwb3J0QXM6IFwiaW9ueFBzZXVkb0lucHV0XCIsXG4gICAgdGVtcGxhdGU6IFwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlwiXG59KVxuZXhwb3J0IGNsYXNzIFBzZXVkb0lucHV0IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIH1cbn1cbiJdfQ==