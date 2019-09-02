import {Component} from "@angular/core";

@Component({
    selector: "ionx-form-item",
    styleUrls: ["item.scss"],
    template: `<ng-content select="ion-item"></ng-content><ng-content select="ionx-form-item-error"></ng-content><ng-content select="ionx-form-item-hint"></ng-content><ng-content></ng-content>`
})
export class FormItem {

}
