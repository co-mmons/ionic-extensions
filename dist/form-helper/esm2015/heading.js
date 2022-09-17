import { Component, HostBinding, Input } from "@angular/core";
export class FormHeading {
    constructor() {
    }
}
FormHeading.decorators = [
    { type: Component, args: [{
                selector: "ionx-form-heading",
                template: `
        <ng-content select="ion-item"></ng-content>
        <div ionx--under>
            <ng-content></ng-content>
        </div>
    `,
                styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start: 0px;--padding-end: 0px;--inner-padding-end: 16px;--inner-padding-start: 16px}:host ::ng-deep ion-item>ion-label{font-weight:500}:host ::ng-deep ion-item>ion-label[size=large]{font-size:large}:host ::ng-deep ion-item>ion-label[size=small]{font-size:small}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:sticky;top:0px;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start: 8px;--padding-end: 8px;--inner-padding-end: 0px;--inner-padding-start: 0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}:host-context(.ios) ::ng-deep ion-button{height:auto}\n"]
            },] }
];
FormHeading.ctorParameters = () => [];
FormHeading.propDecorators = {
    sticky: [{ type: HostBinding, args: ["attr.sticky",] }, { type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mb3JtLWhlbHBlci9oZWFkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVk1RCxNQUFNLE9BQU8sV0FBVztJQUVwQjtJQUNBLENBQUM7OztZQWJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7O0tBS1Q7O2FBRUo7Ozs7cUJBTUksV0FBVyxTQUFDLGFBQWEsY0FDekIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZm9ybS1oZWFkaW5nXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaW9uLWl0ZW1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxkaXYgaW9ueC0tdW5kZXI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbXCJoZWFkaW5nLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUhlYWRpbmcge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci5zdGlja3lcIilcbiAgICBASW5wdXQoKVxuICAgIHN0aWNreTogYm9vbGVhbjtcbn1cbiJdfQ==