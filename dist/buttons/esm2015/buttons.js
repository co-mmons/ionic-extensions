import { __decorate } from "tslib";
import { Component } from "@angular/core";
let Buttons = class Buttons {
    constructor() {
    }
};
Buttons = __decorate([
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
    })
], Buttons);
export { Buttons };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2J1dHRvbnMvIiwic291cmNlcyI6WyJidXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBa0N4QyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBRWhCO0lBQ0EsQ0FBQztDQUVKLENBQUE7QUFMWSxPQUFPO0lBaENuQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUUsMkJBQTJCO2lCQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkJSO0tBQ0osQ0FBQztHQUNXLE9BQU8sQ0FLbkI7U0FMWSxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtYnV0dG9uc1wiLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgOmhvc3QtY29udGV4dChpb24tdG9vbGJhcikgOjpuZy1kZWVwIGlvbi1idXR0b24ge1xuICAgICAgICAgICAgaGVpZ2h0OiAzMnB4O1xuICAgICAgICAgICAgLS1wYWRkaW5nLXRvcDogMDtcbiAgICAgICAgICAgIC0tcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAgICAgICBtYXJnaW46IDBweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgOmhvc3QtY29udGV4dChpb24tdG9vbGJhcikgOjpuZy1kZWVwIGlvbi1idXR0b24uYnV0dG9uLWNsZWFyIHtcbiAgICAgICAgICAgIC0tcGFkZGluZy1zdGFydDogOHB4O1xuICAgICAgICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgICAgICAgbWFyZ2luOiAwcHggOHB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICA6aG9zdC1jb250ZXh0KGlvbi10b29sYmFyKSA6Om5nLWRlZXAgaW9uLWJ1dHRvbi5idXR0b24tY2xlYXIgKyBpb24tYnV0dG9uLmJ1dHRvbi1jbGVhciB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMHB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICA6aG9zdC1jb250ZXh0KC5pb3MgaW9uLXRvb2xiYXIpIDo6bmctZGVlcCBpb24tYnV0dG9uIHtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25zIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxufVxuIl19