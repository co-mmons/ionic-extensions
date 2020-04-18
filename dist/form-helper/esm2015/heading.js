import { __decorate } from "tslib";
import { Component, HostBinding, Input } from "@angular/core";
let FormHeading = class FormHeading {
    constructor() {
    }
};
__decorate([
    HostBinding("attr.sticky"),
    Input()
], FormHeading.prototype, "sticky", void 0);
FormHeading = __decorate([
    Component({
        selector: "ionx-form-heading",
        template: `
        <ng-content select="ion-item"></ng-content>
        <div ionx--under>
            <ng-content></ng-content>
        </div>
    `,
        styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start:0px;--padding-end:0px;--inner-padding-end:16px;--inner-padding-start:16px}:host ::ng-deep ion-item>ion-label{font-weight:500}:host ::ng-deep ion-item>ion-label[size=large]{font-size:large}:host ::ng-deep ion-item>ion-label[size=small]{font-size:small}:host ::ng-deep ion-button{height:auto}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:-webkit-sticky;position:sticky;top:0;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start:8px;--padding-end:8px;--inner-padding-end:0px;--inner-padding-start:0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}"]
    })
], FormHeading);
export { FormHeading };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyLyIsInNvdXJjZXMiOlsiaGVhZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBWTVELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFFcEI7SUFDQSxDQUFDO0NBS0osQ0FBQTtBQURHO0lBRkMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUMxQixLQUFLLEVBQUU7MkNBQ1E7QUFQUCxXQUFXO0lBVnZCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFOzs7OztLQUtUOztLQUVKLENBQUM7R0FDVyxXQUFXLENBUXZCO1NBUlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZm9ybS1oZWFkaW5nXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaW9uLWl0ZW1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxkaXYgaW9ueC0tdW5kZXI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbXCJoZWFkaW5nLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUhlYWRpbmcge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci5zdGlja3lcIilcbiAgICBASW5wdXQoKVxuICAgIHN0aWNreTogYm9vbGVhbjtcbn1cbiJdfQ==