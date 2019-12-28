import { __decorate } from "tslib";
import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";
var FormItemHint = /** @class */ (function () {
    function FormItemHint() {
    }
    Object.defineProperty(FormItemHint.prototype, "label", {
        set: function (label) {
            this.labelComponentContainer.clear();
            this.labelComponentContainer.insert(label.hostView);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], FormItemHint.prototype, "icon", void 0);
    __decorate([
        ViewChild("labelComponentContainer", { read: ViewContainerRef, static: true })
    ], FormItemHint.prototype, "labelComponentContainer", void 0);
    __decorate([
        Input()
    ], FormItemHint.prototype, "label", null);
    FormItemHint = __decorate([
        Component({
            selector: "ionx-form-item-hint",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"icon\"></ion-icon>\n        <label>\n            <template #labelComponentContainer></template>\n            <ng-content></ng-content>\n        </label>\n    ",
            styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-medium)}"]
        })
    ], FormItemHint);
    return FormItemHint;
}());
export { FormItemHint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1oaW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXIvIiwic291cmNlcyI6WyJpdGVtLWhpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWdCLEtBQUssRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFhMUY7SUFFSTtJQUNBLENBQUM7SUFTRCxzQkFBSSwrQkFBSzthQUFULFVBQVUsS0FBd0I7WUFDOUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELENBQUM7OztPQUFBO0lBVEQ7UUFEQyxLQUFLLEVBQUU7OENBQ0s7SUFHYjtRQURDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7aUVBQzNCO0lBR2xEO1FBREMsS0FBSyxFQUFFOzZDQUlQO0lBZlEsWUFBWTtRQVh4QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUscUJBQXFCO1lBRS9CLFFBQVEsRUFBRSw0TUFNVDs7U0FDQSxDQUFDO09BQ08sWUFBWSxDQWdCeEI7SUFBRCxtQkFBQztDQUFBLEFBaEJELElBZ0JDO1NBaEJZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29tcG9uZW50UmVmLCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWZvcm0taXRlbS1oaW50XCIsXG4gICAgc3R5bGVVcmxzOiBbXCJpdGVtLWVycm9yLWl0ZW0taGludC5zY3NzXCIsIFwiaXRlbS1oaW50LnNjc3NcIl0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbi1pY29uIFtuYW1lXT1cImljb25cIiAqbmdJZj1cImljb25cIj48L2lvbi1pY29uPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8dGVtcGxhdGUgI2xhYmVsQ29tcG9uZW50Q29udGFpbmVyPjwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgYFxuICAgIH0pXG5leHBvcnQgY2xhc3MgRm9ybUl0ZW1IaW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgaWNvbjogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZChcImxhYmVsQ29tcG9uZW50Q29udGFpbmVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWV9KVxuICAgIHByaXZhdGUgbGFiZWxDb21wb25lbnRDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBsYWJlbChsYWJlbDogQ29tcG9uZW50UmVmPGFueT4pIHtcbiAgICAgICAgdGhpcy5sYWJlbENvbXBvbmVudENvbnRhaW5lci5jbGVhcigpO1xuICAgICAgICB0aGlzLmxhYmVsQ29tcG9uZW50Q29udGFpbmVyLmluc2VydChsYWJlbC5ob3N0Vmlldyk7XG4gICAgfVxufVxuIl19