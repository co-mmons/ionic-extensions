import { __decorate } from "tslib";
import { Component, HostBinding, Input } from "@angular/core";
var FormHeading = /** @class */ (function () {
    function FormHeading() {
    }
    __decorate([
        HostBinding("attr.sticky"),
        Input()
    ], FormHeading.prototype, "sticky", void 0);
    FormHeading = __decorate([
        Component({
            selector: "ionx-form-heading",
            template: "\n        <ng-content select=\"ion-item\"></ng-content>\n        <div ionx--under>\n            <ng-content></ng-content>\n        </div>\n    ",
            styles: [":host{display:block;margin-top:16px}:host ::ng-deep ion-item{--padding-start:0px;--padding-end:0px;--inner-padding-end:16px;--inner-padding-start:16px}:host ::ng-deep ion-item>ion-label{font-weight:500}:host ::ng-deep ion-item>ion-label[size=large]{font-size:large}:host ::ng-deep ion-item>ion-label[size=small]{font-size:small}:host ::ng-deep ion-button{height:auto}:host [ionx--under]:not(:empty){padding:8px 16px}:host[sticky]:not([sticky=false]){position:-webkit-sticky;position:sticky;top:0;z-index:3}:host-context(ion-grid) ::ng-deep ion-item{--padding-start:8px;--padding-end:8px;--inner-padding-end:0px;--inner-padding-start:0px}:host-context(ion-grid) [ionx--under]:not(:empty){padding:8px}"]
        })
    ], FormHeading);
    return FormHeading;
}());
export { FormHeading };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyLyIsInNvdXJjZXMiOlsiaGVhZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBWTVEO0lBRUk7SUFDQSxDQUFDO0lBSUQ7UUFGQyxXQUFXLENBQUMsYUFBYSxDQUFDO1FBQzFCLEtBQUssRUFBRTsrQ0FDUTtJQVBQLFdBQVc7UUFWdkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsaUpBS1Q7O1NBRUosQ0FBQztPQUNXLFdBQVcsQ0FRdkI7SUFBRCxrQkFBQztDQUFBLEFBUkQsSUFRQztTQVJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWZvcm0taGVhZGluZ1wiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cImlvbi1pdGVtXCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8ZGl2IGlvbngtLXVuZGVyPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlVXJsczogW1wiaGVhZGluZy5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1IZWFkaW5nIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIuc3RpY2t5XCIpXG4gICAgQElucHV0KClcbiAgICBzdGlja3k6IGJvb2xlYW47XG59XG4iXX0=