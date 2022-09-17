import { Component, HostBinding, Input } from "@angular/core";
export class Spinner {
    constructor() {
        this.backdropVisible = false;
        this.fill = false;
    }
}
Spinner.decorators = [
    { type: Component, args: [{
                selector: "ionx-spinner",
                template: `<ion-backdrop *ngIf="backdropVisible"></ion-backdrop><ion-spinner [name]="name" [color]="color"></ion-spinner>`,
                styles: [":host{position:relative;display:flex;align-items:center;justify-content:center;--spinner--backdrop-background-color: var(--backdrop-background-color, #000);--spinner--backdrop-opacity: var(--backdrop-opacity, .1)}:host ion-backdrop{opacity:var(--spinner--backdrop-opacity);background-color:var(--spinner--backdrop-background-color)}:host[fill]{position:absolute;width:100%;height:100%;left:0px;top:0px}:host[always-on-top]{z-index:100000}:host.ionx--backdrop-visible ion-backdrop{z-index:1}:host.ionx--backdrop-visible ion-spinner{z-index:2}\n"]
            },] }
];
Spinner.propDecorators = {
    backdropVisible: [{ type: Input }, { type: HostBinding, args: ["class.ionx--backdrop-visible",] }],
    fill: [{ type: Input }],
    color: [{ type: Input }],
    name: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zcGlubmVyL3NwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTzVELE1BQU0sT0FBTyxPQUFPO0lBTHBCO1FBU0ksb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHakMsU0FBSSxHQUFZLEtBQUssQ0FBQztJQVExQixDQUFDOzs7WUFwQkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUV4QixRQUFRLEVBQUUsZ0hBQWdIOzthQUM3SDs7OzhCQUdJLEtBQUssWUFDTCxXQUFXLFNBQUMsOEJBQThCO21CQUcxQyxLQUFLO29CQUdMLEtBQUs7bUJBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc3Bpbm5lclwiLFxuICAgIHN0eWxlVXJsczogW1wic3Bpbm5lci5zY3NzXCJdLFxuICAgIHRlbXBsYXRlOiBgPGlvbi1iYWNrZHJvcCAqbmdJZj1cImJhY2tkcm9wVmlzaWJsZVwiPjwvaW9uLWJhY2tkcm9wPjxpb24tc3Bpbm5lciBbbmFtZV09XCJuYW1lXCIgW2NvbG9yXT1cImNvbG9yXCI+PC9pb24tc3Bpbm5lcj5gXG59KVxuZXhwb3J0IGNsYXNzIFNwaW5uZXIge1xuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5pb254LS1iYWNrZHJvcC12aXNpYmxlXCIpXG4gICAgYmFja2Ryb3BWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGZpbGw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgY29sb3I6IHN0cmluZztcblxuICAgIEBJbnB1dCgpXG4gICAgbmFtZTogc3RyaW5nO1xuXG59XG4iXX0=