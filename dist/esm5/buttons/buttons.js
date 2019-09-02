import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
var Buttons = /** @class */ (function () {
    function Buttons() {
    }
    Buttons = tslib_1.__decorate([
        Component({
            selector: "ionx-buttons",
            template: "<ng-content></ng-content>",
            styles: ["\n        :host {\n            display: flex;\n            align-items: center;\n            transform: translateZ(0);\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button {\n            height: 32px;\n            --padding-top: 0;\n            --padding-bottom: 0;\n            margin: 0px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear {\n            --padding-start: 8px;\n            --padding-end: 8px;\n            margin: 0px 8px;\n        }\n        \n        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear + ion-button.button-clear {\n            margin-left: 0px;\n        }\n        \n        :host-context(.ios ion-toolbar) ::ng-deep ion-button {\n            font-weight: 400;\n        }\n    "]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], Buttons);
    return Buttons;
}());
export { Buttons };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsiYnV0dG9ucy9idXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBa0N4QztJQUVJO0lBQ0EsQ0FBQztJQUhRLE9BQU87UUFoQ25CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSwyQkFBMkI7cUJBQzVCLHd4QkEyQlI7U0FDSixDQUFDOztPQUNXLE9BQU8sQ0FLbkI7SUFBRCxjQUFDO0NBQUEsQUFMRCxJQUtDO1NBTFksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWJ1dHRvbnNcIixcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0LWNvbnRleHQoaW9uLXRvb2xiYXIpIDo6bmctZGVlcCBpb24tYnV0dG9uIHtcbiAgICAgICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgICAgIC0tcGFkZGluZy10b3A6IDA7XG4gICAgICAgICAgICAtLXBhZGRpbmctYm90dG9tOiAwO1xuICAgICAgICAgICAgbWFyZ2luOiAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0LWNvbnRleHQoaW9uLXRvb2xiYXIpIDo6bmctZGVlcCBpb24tYnV0dG9uLmJ1dHRvbi1jbGVhciB7XG4gICAgICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgICAgICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICAgICAgICAgIG1hcmdpbjogMHB4IDhweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgOmhvc3QtY29udGV4dChpb24tdG9vbGJhcikgOjpuZy1kZWVwIGlvbi1idXR0b24uYnV0dG9uLWNsZWFyICsgaW9uLWJ1dHRvbi5idXR0b24tY2xlYXIge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDBweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgOmhvc3QtY29udGV4dCguaW9zIGlvbi10b29sYmFyKSA6Om5nLWRlZXAgaW9uLWJ1dHRvbiB7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9ucyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbn1cbiJdfQ==