import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
let Buttons = class Buttons {
    constructor() {
    }
};
Buttons = tslib_1.__decorate([
    Component({
        selector: "ionx-buttons",
        template: `<ng-content></ng-content>`,
        styles: [`
        :host {
            display: flex;
            align-items: center;
            transform: translateZ(0);
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button {
            height: 32px;
            --padding-top: 0;
            --padding-bottom: 0;
            margin: 0px;
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear {
            --padding-start: 8px;
            --padding-end: 8px;
            margin: 0px 8px;
        }
        
        :host-context(ion-toolbar) ::ng-deep ion-button.button-clear + ion-button.button-clear {
            margin-left: 0px;
        }
        
        :host-context(.ios ion-toolbar) ::ng-deep ion-button {
            font-weight: 400;
        }
    `]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], Buttons);
export { Buttons };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zLyIsInNvdXJjZXMiOlsiYnV0dG9ucy9idXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBa0N4QyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBRWhCO0lBQ0EsQ0FBQztDQUVKLENBQUE7QUFMWSxPQUFPO0lBaENuQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUUsMkJBQTJCO2lCQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkJSO0tBQ0osQ0FBQzs7R0FDVyxPQUFPLENBS25CO1NBTFksT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJpb254LWJ1dHRvbnNcIixcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0LWNvbnRleHQoaW9uLXRvb2xiYXIpIDo6bmctZGVlcCBpb24tYnV0dG9uIHtcbiAgICAgICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgICAgIC0tcGFkZGluZy10b3A6IDA7XG4gICAgICAgICAgICAtLXBhZGRpbmctYm90dG9tOiAwO1xuICAgICAgICAgICAgbWFyZ2luOiAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0LWNvbnRleHQoaW9uLXRvb2xiYXIpIDo6bmctZGVlcCBpb24tYnV0dG9uLmJ1dHRvbi1jbGVhciB7XG4gICAgICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAgICAgICAgIC0tcGFkZGluZy1lbmQ6IDhweDtcbiAgICAgICAgICAgIG1hcmdpbjogMHB4IDhweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgOmhvc3QtY29udGV4dChpb24tdG9vbGJhcikgOjpuZy1kZWVwIGlvbi1idXR0b24uYnV0dG9uLWNsZWFyICsgaW9uLWJ1dHRvbi5idXR0b24tY2xlYXIge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDBweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgOmhvc3QtY29udGV4dCguaW9zIGlvbi10b29sYmFyKSA6Om5nLWRlZXAgaW9uLWJ1dHRvbiB7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9ucyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbn1cbiJdfQ==