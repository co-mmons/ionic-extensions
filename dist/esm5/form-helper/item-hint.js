import * as tslib_1 from "tslib";
import { Component, ComponentRef, Input, ViewChild, ViewContainerRef } from "@angular/core";
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], FormItemHint.prototype, "icon", void 0);
    tslib_1.__decorate([
        ViewChild("labelComponentContainer", { read: ViewContainerRef, static: true }),
        tslib_1.__metadata("design:type", ViewContainerRef)
    ], FormItemHint.prototype, "labelComponentContainer", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", ComponentRef),
        tslib_1.__metadata("design:paramtypes", [ComponentRef])
    ], FormItemHint.prototype, "label", null);
    FormItemHint = tslib_1.__decorate([
        Component({
            selector: "ionx-form-item-hint",
            template: "\n        <ion-icon [name]=\"icon\" *ngIf=\"icon\"></ion-icon>\n        <label>\n            <template #labelComponentContainer></template>\n            <ng-content></ng-content>\n        </label>\n    ",
            styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-medium)}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormItemHint);
    return FormItemHint;
}());
export { FormItemHint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1oaW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvIiwic291cmNlcyI6WyJmb3JtLWhlbHBlci9pdGVtLWhpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFhMUY7SUFFSTtJQUNBLENBQUM7SUFTRCxzQkFBSSwrQkFBSzthQUFULFVBQVUsS0FBd0I7WUFDOUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELENBQUM7OztPQUFBO0lBVEQ7UUFEQyxLQUFLLEVBQUU7OzhDQUNLO0lBR2I7UUFEQyxTQUFTLENBQUMseUJBQXlCLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDOzBDQUM1QyxnQkFBZ0I7aUVBQUM7SUFHbEQ7UUFEQyxLQUFLLEVBQUU7MENBQ1MsWUFBWTtpREFBWixZQUFZOzZDQUc1QjtJQWZRLFlBQVk7UUFYeEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHFCQUFxQjtZQUUvQixRQUFRLEVBQUUsNE1BTVQ7O1NBQ0EsQ0FBQzs7T0FDTyxZQUFZLENBZ0J4QjtJQUFELG1CQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FoQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRSZWYsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZm9ybS1pdGVtLWhpbnRcIixcbiAgICBzdHlsZVVybHM6IFtcIml0ZW0tZXJyb3ItaXRlbS1oaW50LnNjc3NcIiwgXCJpdGVtLWhpbnQuc2Nzc1wiXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9uLWljb24gW25hbWVdPVwiaWNvblwiICpuZ0lmPVwiaWNvblwiPjwvaW9uLWljb24+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSAjbGFiZWxDb21wb25lbnRDb250YWluZXI+PC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICBgXG4gICAgfSlcbmV4cG9ydCBjbGFzcyBGb3JtSXRlbUhpbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBpY29uOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKFwibGFiZWxDb21wb25lbnRDb250YWluZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBsYWJlbENvbXBvbmVudENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGxhYmVsKGxhYmVsOiBDb21wb25lbnRSZWY8YW55Pikge1xuICAgICAgICB0aGlzLmxhYmVsQ29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubGFiZWxDb21wb25lbnRDb250YWluZXIuaW5zZXJ0KGxhYmVsLmhvc3RWaWV3KTtcbiAgICB9XG59XG4iXX0=