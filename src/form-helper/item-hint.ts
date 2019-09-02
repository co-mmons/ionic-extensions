import {Component, ComponentRef, Input, ViewChild, ViewContainerRef} from "@angular/core";

@Component({
    selector: "ionx-form-item-hint",
    styleUrls: ["item-error-item-hint.scss", "item-hint.scss"],
    template: `
        <ion-icon [name]="icon" *ngIf="icon"></ion-icon>
        <label>
            <template #labelComponentContainer></template>
            <ng-content></ng-content>
        </label>
    `
    })
export class FormItemHint {

    constructor() {
    }

    @Input()
    icon: string;

    @ViewChild("labelComponentContainer", {read: ViewContainerRef, static: true})
    private labelComponentContainer: ViewContainerRef;

    @Input()
    set label(label: ComponentRef<any>) {
        this.labelComponentContainer.clear();
        this.labelComponentContainer.insert(label.hostView);
    }
}
