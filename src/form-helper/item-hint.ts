import {Component, ComponentRef, Input, ViewChild, ViewContainerRef} from "@angular/core";

@Component({
    selector: "ionx-form-item-hint",
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

    @ViewChild("labelComponentContainer", {read: ViewContainerRef})
    private labelComponentContainer: ViewContainerRef;

    @Input()
    set label(label: ComponentRef<any>) {
        this.labelComponentContainer.clear();
        this.labelComponentContainer.insert(label.hostView);
    }
}