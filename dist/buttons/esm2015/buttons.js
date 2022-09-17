import { Component } from "@angular/core";
export class Buttons {
    constructor() {
    }
}
Buttons.decorators = [
    { type: Component, args: [{
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
            },] }
];
Buttons.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idXR0b25zL2J1dHRvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQWtDeEMsTUFBTSxPQUFPLE9BQU87SUFFaEI7SUFDQSxDQUFDOzs7WUFuQ0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsMkJBQTJCO3lCQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkJSO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1idXR0b25zXCIsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICA6aG9zdC1jb250ZXh0KGlvbi10b29sYmFyKSA6Om5nLWRlZXAgaW9uLWJ1dHRvbiB7XG4gICAgICAgICAgICBoZWlnaHQ6IDMycHg7XG4gICAgICAgICAgICAtLXBhZGRpbmctdG9wOiAwO1xuICAgICAgICAgICAgLS1wYWRkaW5nLWJvdHRvbTogMDtcbiAgICAgICAgICAgIG1hcmdpbjogMHB4O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICA6aG9zdC1jb250ZXh0KGlvbi10b29sYmFyKSA6Om5nLWRlZXAgaW9uLWJ1dHRvbi5idXR0b24tY2xlYXIge1xuICAgICAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgICAgICAgICAtLXBhZGRpbmctZW5kOiA4cHg7XG4gICAgICAgICAgICBtYXJnaW46IDBweCA4cHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0LWNvbnRleHQoaW9uLXRvb2xiYXIpIDo6bmctZGVlcCBpb24tYnV0dG9uLmJ1dHRvbi1jbGVhciArIGlvbi1idXR0b24uYnV0dG9uLWNsZWFyIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIDpob3N0LWNvbnRleHQoLmlvcyBpb24tdG9vbGJhcikgOjpuZy1kZWVwIGlvbi1idXR0b24ge1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbnMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG59XG4iXX0=