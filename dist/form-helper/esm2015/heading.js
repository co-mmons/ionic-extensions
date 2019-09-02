import * as tslib_1 from "tslib";
import { Component, HostBinding, Input } from "@angular/core";
let FormHeading = class FormHeading {
    constructor() {
    }
};
tslib_1.__decorate([
    HostBinding("attr.sticky"),
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], FormHeading.prototype, "sticky", void 0);
FormHeading = tslib_1.__decorate([
    Component({
        selector: "ionx-form-heading",
        template: `
        <ng-content select="ion-item"></ng-content>
        <div ionx--under>
            <ng-content></ng-content>
        </div>
    `,
        styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start:0px;--padding-end:0px;--inner-padding-end:16px;--inner-padding-start:16px}:host ::ng-deep ion-item>ion-label{font-size:.9rem;font-weight:500}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:-webkit-sticky;position:sticky;top:0;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start:8px;--padding-end:8px;--inner-padding-end:0px;--inner-padding-start:0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}:host-context(.ios) ::ng-deep ion-item.item-label>ion-label{font-size:.8rem;letter-spacing:1px;text-transform:uppercase}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], FormHeading);
export { FormHeading };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyLyIsInNvdXJjZXMiOlsiaGVhZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBWTVELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFFcEI7SUFDQSxDQUFDO0NBS0osQ0FBQTtBQURHO0lBRkMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUMxQixLQUFLLEVBQUU7OzJDQUNRO0FBUFAsV0FBVztJQVZ2QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRTs7Ozs7S0FLVDs7S0FFSixDQUFDOztHQUNXLFdBQVcsQ0FRdkI7U0FSWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1mb3JtLWhlYWRpbmdcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJpb24taXRlbVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPGRpdiBpb254LS11bmRlcj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZVVybHM6IFtcImhlYWRpbmcuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtSGVhZGluZyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLnN0aWNreVwiKVxuICAgIEBJbnB1dCgpXG4gICAgc3RpY2t5OiBib29sZWFuO1xufVxuIl19