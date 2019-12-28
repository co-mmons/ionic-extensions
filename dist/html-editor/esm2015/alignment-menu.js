import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { Alignment } from "./alignment";
import { changeAlignment } from "./prosemirror/alignment/commands";
import { schema } from "./prosemirror/schema";
import { findBlockMarks } from "./prosemirror/utils/selection/find-block-marks";
let AlignmentMenu = class AlignmentMenu {
    constructor(popoverController) {
        this.popoverController = popoverController;
        this.Alignment = Alignment;
    }
    toggleAligment(alignment) {
        const command = changeAlignment(alignment.alignment);
        if (command(this.editor.state)) {
            command(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    ngOnInit() {
        this.active = undefined;
        for (const mark of findBlockMarks(this.editor.state, schema.marks.alignment)) {
            // zaznaczonych wiele blocków z różnym wyrównaniem
            if (this.active && this.active !== mark.attrs.align) {
                this.active = undefined;
                break;
            }
            this.active = mark.attrs.align;
        }
    }
    ionViewWillLeave() {
        this.editor.focus();
    }
};
AlignmentMenu.ctorParameters = () => [
    { type: PopoverController }
];
__decorate([
    Input()
], AlignmentMenu.prototype, "editor", void 0);
AlignmentMenu = __decorate([
    Component({
        template: `
        <ion-list lines="full">

            <ion-item button="true" detail="false" (click)="toggleAligment(alignment)" *ngFor="let alignment of Alignment.alignments()">
                <ion-label>{{alignment.label | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="active === alignment.alignment"></ion-icon>
                <ion-icon src="assets/html-editor/align-{{alignment.alignment}}.svg" slot="start"></ion-icon>
            </ion-item>

        </ion-list>
    `,
        styles: [`
        :host ion-list { margin: 0px; padding: 0px; }
        :host ion-item:last-child { --border-width: 0px; }
    `]
    })
], AlignmentMenu);
export { AlignmentMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ25tZW50LW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvci8iLCJzb3VyY2VzIjpbImFsaWdubWVudC1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXRDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBbUI5RSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBSXRCLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRnhELGNBQVMsR0FBRyxTQUFTLENBQUM7SUFHdEIsQ0FBQztJQU9ELGNBQWMsQ0FBQyxTQUFvQjtRQUUvQixNQUFNLE9BQU8sR0FBRyxlQUFlLENBQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTFELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNyRTtRQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUTtRQUVKLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBRXhCLEtBQUssTUFBTSxJQUFJLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFFMUUsa0RBQWtEO1lBQ2xELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDeEIsTUFBTTthQUNUO1lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDSixDQUFBOztZQXRDMEMsaUJBQWlCOztBQUl4RDtJQURDLEtBQUssRUFBRTs2Q0FDbUI7QUFSbEIsYUFBYTtJQWpCekIsU0FBUyxDQUFDO1FBS1AsUUFBUSxFQUFFOzs7Ozs7Ozs7O0tBVVQ7aUJBZFE7OztLQUdSO0tBWUosQ0FBQztHQUNXLGFBQWEsQ0EwQ3pCO1NBMUNZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtBbGlnbm1lbnR9IGZyb20gXCIuL2FsaWdubWVudFwiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7Y2hhbmdlQWxpZ25tZW50fSBmcm9tIFwiLi9wcm9zZW1pcnJvci9hbGlnbm1lbnQvY29tbWFuZHNcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZEJsb2NrTWFya3N9IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL3NlbGVjdGlvbi9maW5kLWJsb2NrLW1hcmtzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3QgaW9uLWxpc3QgeyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4OyB9XG4gICAgICAgIDpob3N0IGlvbi1pdGVtOmxhc3QtY2hpbGQgeyAtLWJvcmRlci13aWR0aDogMHB4OyB9XG4gICAgYF0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInRvZ2dsZUFsaWdtZW50KGFsaWdubWVudClcIiAqbmdGb3I9XCJsZXQgYWxpZ25tZW50IG9mIEFsaWdubWVudC5hbGlnbm1lbnRzKClcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7YWxpZ25tZW50LmxhYmVsIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwiYWN0aXZlID09PSBhbGlnbm1lbnQuYWxpZ25tZW50XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gc3JjPVwiYXNzZXRzL2h0bWwtZWRpdG9yL2FsaWduLXt7YWxpZ25tZW50LmFsaWdubWVudH19LnN2Z1wiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgIDwvaW9uLWxpc3Q+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBBbGlnbm1lbnRNZW51IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEFsaWdubWVudCA9IEFsaWdubWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGVkaXRvcjogSHRtbEVkaXRvcjtcblxuICAgIGFjdGl2ZTogc3RyaW5nO1xuXG4gICAgdG9nZ2xlQWxpZ21lbnQoYWxpZ25tZW50OiBBbGlnbm1lbnQpIHtcblxuICAgICAgICBjb25zdCBjb21tYW5kID0gY2hhbmdlQWxpZ25tZW50KDxhbnk+YWxpZ25tZW50LmFsaWdubWVudCk7XG5cbiAgICAgICAgaWYgKGNvbW1hbmQodGhpcy5lZGl0b3Iuc3RhdGUpKSB7XG4gICAgICAgICAgICBjb21tYW5kKHRoaXMuZWRpdG9yLnN0YXRlLCAodHIpID0+IHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGZvciAoY29uc3QgbWFyayBvZiBmaW5kQmxvY2tNYXJrcyh0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLmFsaWdubWVudCkpIHtcblxuICAgICAgICAgICAgLy8gemF6bmFjem9ueWNoIHdpZWxlIGJsb2Nrw7N3IHogcsOzxbxueW0gd3lyw7N3bmFuaWVtXG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmUgJiYgdGhpcy5hY3RpdmUgIT09IG1hcmsuYXR0cnMuYWxpZ24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBtYXJrLmF0dHJzLmFsaWduO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW9uVmlld1dpbGxMZWF2ZSgpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG59XG4iXX0=