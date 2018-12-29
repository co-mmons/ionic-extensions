import {Component} from "@angular/core";

@Component({
    selector: "ionx-form-item",
    template: `<ng-content selector="ion-item"></ng-content><ng-content selector="ionx-form-item-error"></ng-content><ng-content selector="ionx-form-item-hint"></ng-content><ng-content></ng-content>`
})
export class FormItem {

}