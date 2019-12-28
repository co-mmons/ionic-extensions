import { __decorate } from "tslib";
import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";
let FormItemHint = class FormItemHint {
    constructor() {
    }
    set label(label) {
        this.labelComponentContainer.clear();
        this.labelComponentContainer.insert(label.hostView);
    }
};
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
        template: `
        <ion-icon [name]="icon" *ngIf="icon"></ion-icon>
        <label>
            <template #labelComponentContainer></template>
            <ng-content></ng-content>
        </label>
    `,
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;margin:8px 0 0}:host>label{-webkit-box-flex:1;flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-medium)}"]
    })
], FormItemHint);
export { FormItemHint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1oaW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXIvIiwic291cmNlcyI6WyJpdGVtLWhpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWdCLEtBQUssRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFhMUYsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUVyQjtJQUNBLENBQUM7SUFTRCxJQUFJLEtBQUssQ0FBQyxLQUF3QjtRQUM5QixJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNKLENBQUE7QUFWRztJQURDLEtBQUssRUFBRTswQ0FDSztBQUdiO0lBREMsU0FBUyxDQUFDLHlCQUF5QixFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs2REFDM0I7QUFHbEQ7SUFEQyxLQUFLLEVBQUU7eUNBSVA7QUFmUSxZQUFZO0lBWHhCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxxQkFBcUI7UUFFL0IsUUFBUSxFQUFFOzs7Ozs7S0FNVDs7S0FDQSxDQUFDO0dBQ08sWUFBWSxDQWdCeEI7U0FoQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRSZWYsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZm9ybS1pdGVtLWhpbnRcIixcbiAgICBzdHlsZVVybHM6IFtcIml0ZW0tZXJyb3ItaXRlbS1oaW50LnNjc3NcIiwgXCJpdGVtLWhpbnQuc2Nzc1wiXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9uLWljb24gW25hbWVdPVwiaWNvblwiICpuZ0lmPVwiaWNvblwiPjwvaW9uLWljb24+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSAjbGFiZWxDb21wb25lbnRDb250YWluZXI+PC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICBgXG4gICAgfSlcbmV4cG9ydCBjbGFzcyBGb3JtSXRlbUhpbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBpY29uOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKFwibGFiZWxDb21wb25lbnRDb250YWluZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBsYWJlbENvbXBvbmVudENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGxhYmVsKGxhYmVsOiBDb21wb25lbnRSZWY8YW55Pikge1xuICAgICAgICB0aGlzLmxhYmVsQ29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubGFiZWxDb21wb25lbnRDb250YWluZXIuaW5zZXJ0KGxhYmVsLmhvc3RWaWV3KTtcbiAgICB9XG59XG4iXX0=