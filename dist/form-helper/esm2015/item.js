import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
let FormItem = class FormItem {
};
FormItem = tslib_1.__decorate([
    Component({
        selector: "ionx-form-item",
        template: `<ng-content select="ion-item"></ng-content><ng-content select="ionx-form-item-error"></ng-content><ng-content select="ionx-form-item-hint"></ng-content><ng-content></ng-content>`,
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}:host ::ng-deep ion-item{--padding-start:0px;--inner-padding-end:0px;--inner-padding-start:0px;--padding-end:0px;--inner-border-width:0px;--border-width:0px 0px 1px 0px}"]
    })
], FormItem);
export { FormItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2Zvcm0taGVscGVyLyIsInNvdXJjZXMiOlsiaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU94QyxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0NBRXBCLENBQUE7QUFGWSxRQUFRO0lBTHBCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFFMUIsUUFBUSxFQUFFLG1MQUFtTDs7S0FDaE0sQ0FBQztHQUNXLFFBQVEsQ0FFcEI7U0FGWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtZm9ybS1pdGVtXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJpdGVtLnNjc3NcIl0sXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudCBzZWxlY3Q9XCJpb24taXRlbVwiPjwvbmctY29udGVudD48bmctY29udGVudCBzZWxlY3Q9XCJpb254LWZvcm0taXRlbS1lcnJvclwiPjwvbmctY29udGVudD48bmctY29udGVudCBzZWxlY3Q9XCJpb254LWZvcm0taXRlbS1oaW50XCI+PC9uZy1jb250ZW50PjxuZy1jb250ZW50PjwvbmctY29udGVudD5gXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1JdGVtIHtcblxufVxuIl19