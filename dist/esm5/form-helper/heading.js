import * as tslib_1 from "tslib";
import { Component, HostBinding, Input } from "@angular/core";
var FormHeading = /** @class */ (function () {
    function FormHeading() {
    }
    tslib_1.__decorate([
        HostBinding("attr.sticky"),
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], FormHeading.prototype, "sticky", void 0);
    FormHeading = tslib_1.__decorate([
        Component({
            selector: "ionx-form-heading",
            template: "\n        <ng-content select=\"ion-item\"></ng-content>\n        <div ionx--under>\n            <ng-content></ng-content>\n        </div>\n    ",
            styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start:0px;--padding-end:0px;--inner-padding-end:16px;--inner-padding-start:16px}:host ::ng-deep ion-item>ion-label{font-size:.9rem;font-weight:500}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:-webkit-sticky;position:sticky;top:0;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start:8px;--padding-end:8px;--inner-padding-end:0px;--inner-padding-start:0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}:host-context(.ios) ::ng-deep ion-item.item-label>ion-label{font-size:.8rem;letter-spacing:1px;text-transform:uppercase}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FormHeading);
    return FormHeading;
}());
export { FormHeading };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsiZm9ybS1oZWxwZXIvaGVhZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBWTVEO0lBRUk7SUFDQSxDQUFDO0lBSUQ7UUFGQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQzFCLEtBQUssRUFBRTs7K0NBQ1E7SUFQUCxXQUFXO1FBVnZCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsUUFBUSxFQUFFLGlKQUtUOztTQUVKLENBQUM7O09BQ1csV0FBVyxDQVF2QjtJQUFELGtCQUFDO0NBQUEsQUFSRCxJQVFDO1NBUlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZm9ybS1oZWFkaW5nXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiaW9uLWl0ZW1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDxkaXYgaW9ueC0tdW5kZXI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVVcmxzOiBbXCJoZWFkaW5nLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUhlYWRpbmcge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiYXR0ci5zdGlja3lcIilcbiAgICBASW5wdXQoKVxuICAgIHN0aWNreTogYm9vbGVhbjtcbn1cbiJdfQ==