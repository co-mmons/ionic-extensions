import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
let Spinner = class Spinner {
    constructor() {
        this.backdropVisible = false;
        this.fill = false;
    }
};
__decorate([
    Input()
], Spinner.prototype, "backdropVisible", void 0);
__decorate([
    Input()
], Spinner.prototype, "fill", void 0);
__decorate([
    Input()
], Spinner.prototype, "color", void 0);
__decorate([
    Input()
], Spinner.prototype, "name", void 0);
Spinner = __decorate([
    Component({
        selector: "ionx-spinner",
        template: `<ion-backdrop *ngIf="backdropVisible"></ion-backdrop><ion-spinner [name]="name" [color]="color"></ion-spinner>`,
        styles: [":host{position:relative;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}:host ion-backdrop{opacity:.1}:host[fill]{position:absolute;width:100%;height:100%;left:0;top:0}:host[always-on-top]{z-index:100000}"]
    })
], Spinner);
export { Spinner };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL3NwaW5uZXIvIiwic291cmNlcyI6WyJzcGlubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU8vQyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBQXBCO1FBR0ksb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFHakMsU0FBSSxHQUFZLEtBQUssQ0FBQztJQVExQixDQUFDO0NBQUEsQ0FBQTtBQVhHO0lBREMsS0FBSyxFQUFFO2dEQUN5QjtBQUdqQztJQURDLEtBQUssRUFBRTtxQ0FDYztBQUd0QjtJQURDLEtBQUssRUFBRTtzQ0FDTTtBQUdkO0lBREMsS0FBSyxFQUFFO3FDQUNLO0FBWkosT0FBTztJQUxuQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsY0FBYztRQUV4QixRQUFRLEVBQUUsZ0hBQWdIOztLQUM3SCxDQUFDO0dBQ1csT0FBTyxDQWNuQjtTQWRZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtc3Bpbm5lclwiLFxuICAgIHN0eWxlVXJsczogW1wic3Bpbm5lci5zY3NzXCJdLFxuICAgIHRlbXBsYXRlOiBgPGlvbi1iYWNrZHJvcCAqbmdJZj1cImJhY2tkcm9wVmlzaWJsZVwiPjwvaW9uLWJhY2tkcm9wPjxpb24tc3Bpbm5lciBbbmFtZV09XCJuYW1lXCIgW2NvbG9yXT1cImNvbG9yXCI+PC9pb24tc3Bpbm5lcj5gXG59KVxuZXhwb3J0IGNsYXNzIFNwaW5uZXIge1xuXG4gICAgQElucHV0KClcbiAgICBiYWNrZHJvcFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZmlsbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBjb2xvcjogc3RyaW5nO1xuXG4gICAgQElucHV0KClcbiAgICBuYW1lOiBzdHJpbmc7XG5cbn1cbiJdfQ==