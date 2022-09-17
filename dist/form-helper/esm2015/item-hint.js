import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";
export class FormItemHint {
    constructor() {
    }
    set label(label) {
        this.labelComponentContainer.clear();
        this.labelComponentContainer.insert(label.hostView);
    }
}
FormItemHint.decorators = [
    { type: Component, args: [{
                selector: "ionx-form-item-hint",
                template: `
        <ion-icon [name]="icon" *ngIf="icon"></ion-icon>
        <label>
            <template #labelComponentContainer></template>
            <ng-content></ng-content>
        </label>
    `,
                styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}\n", ":host{color:var(--ion-color-medium)}\n"]
            },] }
];
FormItemHint.ctorParameters = () => [];
FormItemHint.propDecorators = {
    icon: [{ type: Input }],
    labelComponentContainer: [{ type: ViewChild, args: ["labelComponentContainer", { read: ViewContainerRef, static: true },] }],
    label: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1oaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Zvcm0taGVscGVyL2l0ZW0taGludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFnQixLQUFLLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBYTFGLE1BQU0sT0FBTyxZQUFZO0lBRXJCO0lBQ0EsQ0FBQztJQVFELElBQ0ksS0FBSyxDQUFDLEtBQXdCO1FBQzlCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7WUExQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBRS9CLFFBQVEsRUFBRTs7Ozs7O0tBTVQ7O2FBQ0E7Ozs7bUJBTUEsS0FBSztzQ0FHTCxTQUFTLFNBQUMseUJBQXlCLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQztvQkFHM0UsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnRSZWYsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZm9ybS1pdGVtLWhpbnRcIixcbiAgICBzdHlsZVVybHM6IFtcIml0ZW0tZXJyb3ItaXRlbS1oaW50LnNjc3NcIiwgXCJpdGVtLWhpbnQuc2Nzc1wiXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9uLWljb24gW25hbWVdPVwiaWNvblwiICpuZ0lmPVwiaWNvblwiPjwvaW9uLWljb24+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSAjbGFiZWxDb21wb25lbnRDb250YWluZXI+PC90ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICBgXG4gICAgfSlcbmV4cG9ydCBjbGFzcyBGb3JtSXRlbUhpbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBpY29uOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKFwibGFiZWxDb21wb25lbnRDb250YWluZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZX0pXG4gICAgcHJpdmF0ZSBsYWJlbENvbXBvbmVudENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGxhYmVsKGxhYmVsOiBDb21wb25lbnRSZWY8YW55Pikge1xuICAgICAgICB0aGlzLmxhYmVsQ29tcG9uZW50Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubGFiZWxDb21wb25lbnRDb250YWluZXIuaW5zZXJ0KGxhYmVsLmhvc3RWaWV3KTtcbiAgICB9XG59XG4iXX0=