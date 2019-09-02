import * as tslib_1 from "tslib";
import { Component, ComponentRef, Input, ViewChild, ViewContainerRef } from "@angular/core";
let FormItemHint = class FormItemHint {
    constructor() {
    }
    set label(label) {
        this.labelComponentContainer.clear();
        this.labelComponentContainer.insert(label.hostView);
    }
};
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
        template: `
        <ion-icon [name]="icon" *ngIf="icon"></ion-icon>
        <label>
            <template #labelComponentContainer></template>
            <ng-content></ng-content>
        </label>
    `,
        styles: [":host{display:flex;align-items:center;margin:8px 0 0}:host>label{flex:1;font-size:smaller}:host>ion-icon{margin-top:0!important;margin-right:8px;min-height:initial;width:16px}", ":host{color:var(--ion-color-medium)}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], FormItemHint);
export { FormItemHint };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1oaW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvZm9ybS1oZWxwZXIvIiwic291cmNlcyI6WyJpdGVtLWhpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFhMUYsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUVyQjtJQUNBLENBQUM7SUFTRCxJQUFJLEtBQUssQ0FBQyxLQUF3QjtRQUM5QixJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNKLENBQUE7QUFWRztJQURDLEtBQUssRUFBRTs7MENBQ0s7QUFHYjtJQURDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7c0NBQzVDLGdCQUFnQjs2REFBQztBQUdsRDtJQURDLEtBQUssRUFBRTtzQ0FDUyxZQUFZOzZDQUFaLFlBQVk7eUNBRzVCO0FBZlEsWUFBWTtJQVh4QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUscUJBQXFCO1FBRS9CLFFBQVEsRUFBRTs7Ozs7O0tBTVQ7O0tBQ0EsQ0FBQzs7R0FDTyxZQUFZLENBZ0J4QjtTQWhCWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIENvbXBvbmVudFJlZiwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1mb3JtLWl0ZW0taGludFwiLFxuICAgIHN0eWxlVXJsczogW1wiaXRlbS1lcnJvci1pdGVtLWhpbnQuc2Nzc1wiLCBcIml0ZW0taGludC5zY3NzXCJdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24taWNvbiBbbmFtZV09XCJpY29uXCIgKm5nSWY9XCJpY29uXCI+PC9pb24taWNvbj5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPHRlbXBsYXRlICNsYWJlbENvbXBvbmVudENvbnRhaW5lcj48L3RlbXBsYXRlPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2xhYmVsPlxuICAgIGBcbiAgICB9KVxuZXhwb3J0IGNsYXNzIEZvcm1JdGVtSGludCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGljb246IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoXCJsYWJlbENvbXBvbmVudENvbnRhaW5lclwiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlfSlcbiAgICBwcml2YXRlIGxhYmVsQ29tcG9uZW50Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgbGFiZWwobGFiZWw6IENvbXBvbmVudFJlZjxhbnk+KSB7XG4gICAgICAgIHRoaXMubGFiZWxDb21wb25lbnRDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5sYWJlbENvbXBvbmVudENvbnRhaW5lci5pbnNlcnQobGFiZWwuaG9zdFZpZXcpO1xuICAgIH1cbn1cbiJdfQ==