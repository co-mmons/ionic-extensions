import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { indentList, outdentList, toggleList } from "./prosemirror/list-commands";
import { schema } from "./prosemirror/schema";
import { findParentNode } from "prosemirror-utils";
export class ListMenu {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    level(level) {
        const command = level < 0 ? outdentList() : indentList();
        if (command(this.editor.state)) {
            command(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    toggleList(type) {
        toggleList(this.editor.state, (tr) => this.editor.view.dispatch(tr), this.editor.view, type);
        this.popoverController.dismiss();
    }
    ngOnInit() {
        this.activeUnnumberedList = !!findParentNode(predicate => predicate.hasMarkup(schema.nodes.bulletList))(this.editor.state.selection);
        this.activeNumberedList = !!findParentNode(predicate => predicate.hasMarkup(schema.nodes.orderedList))(this.editor.state.selection);
    }
    ionViewWillLeave() {
        this.editor.focus();
    }
}
ListMenu.decorators = [
    { type: Component, args: [{
                template: `
        <ion-list lines="full">

            <ion-item button="true" detail="false" (click)="toggleList('bulletList')">
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Bulleted list" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeUnnumberedList"></ion-icon>
                <ion-icon src="assets/html-editor/list-bulleted.svg" slot="start"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleList('orderedList')">
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Numbered list" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeNumberedList"></ion-icon>
                <ion-icon src="assets/html-editor/list-numbered.svg" slot="start"></ion-icon>
            </ion-item>

            <ng-template [ngIf]="activeUnnumberedList || activeNumberedList">

                <ion-item-divider>
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Indent" | intlMessage}}</ion-label>
                </ion-item-divider>

                <ion-item button="true" detail="false" (click)="level(-1)">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Decrease indent" | intlMessage}}</ion-label>
                    <ion-icon src="assets/html-editor/indent-decrease.svg" slot="start"></ion-icon>
                </ion-item>

                <ion-item button="true" detail="false" (click)="level(1)">
                    <ion-label>{{"@co.mmons/ionic-extensions/html-editor#listMenu/Increase indent" | intlMessage}}</ion-label>
                    <ion-icon src="assets/html-editor/indent-increase.svg" slot="start"></ion-icon>
                </ion-item>

            </ng-template>

        </ion-list>
    `,
                styles: [`
        :host { user-select: none; }
        :host ion-list { margin: 0px; padding: 0px; }
        :host ion-item:last-child { --border-width: 0px; }
        :host ion-item-divider { --background: transparent; font-size: small }
        :host ion-item-divider ion-label { margin-top: 20px; opacity: 0.8; }
    `]
            },] }
];
ListMenu.ctorParameters = () => [
    { type: PopoverController }
];
ListMenu.propDecorators = {
    editor: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1tZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2h0bWwtZWRpdG9yL2xpc3QtbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUdqRCxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBOENqRCxNQUFNLE9BQU8sUUFBUTtJQUVqQixZQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUN4RCxDQUFDO0lBUUQsS0FBSyxDQUFDLEtBQWE7UUFFZixNQUFNLE9BQU8sR0FBWSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBa0M7UUFDekMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNySSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hJLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7OztZQTdFSixTQUFTLFNBQUM7Z0JBUVAsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBa0NUO3lCQXpDUTs7Ozs7O0tBTVI7YUFvQ0o7OztZQWxETyxpQkFBaUI7OztxQkF3RHBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7Q29tbWFuZH0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvY29tbWFuZFwiO1xuaW1wb3J0IHtpbmRlbnRMaXN0LCBvdXRkZW50TGlzdCwgdG9nZ2xlTGlzdH0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvbGlzdC1jb21tYW5kc1wiO1xuaW1wb3J0IHtzY2hlbWF9IGZyb20gXCIuL3Byb3NlbWlycm9yL3NjaGVtYVwiO1xuaW1wb3J0IHtmaW5kUGFyZW50Tm9kZX0gZnJvbSBcInByb3NlbWlycm9yLXV0aWxzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3QgeyB1c2VyLXNlbGVjdDogbm9uZTsgfVxuICAgICAgICA6aG9zdCBpb24tbGlzdCB7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7IH1cbiAgICAgICAgOmhvc3QgaW9uLWl0ZW06bGFzdC1jaGlsZCB7IC0tYm9yZGVyLXdpZHRoOiAwcHg7IH1cbiAgICAgICAgOmhvc3QgaW9uLWl0ZW0tZGl2aWRlciB7IC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGZvbnQtc2l6ZTogc21hbGwgfVxuICAgICAgICA6aG9zdCBpb24taXRlbS1kaXZpZGVyIGlvbi1sYWJlbCB7IG1hcmdpbi10b3A6IDIwcHg7IG9wYWNpdHk6IDAuODsgfVxuICAgIGBdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cblxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGVMaXN0KCdidWxsZXRMaXN0JylcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaXN0TWVudS9CdWxsZXRlZCBsaXN0XCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJhY3RpdmVVbm51bWJlcmVkTGlzdFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIHNyYz1cImFzc2V0cy9odG1sLWVkaXRvci9saXN0LWJ1bGxldGVkLnN2Z1wiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInRvZ2dsZUxpc3QoJ29yZGVyZWRMaXN0JylcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaXN0TWVudS9OdW1iZXJlZCBsaXN0XCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJhY3RpdmVOdW1iZXJlZExpc3RcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBzcmM9XCJhc3NldHMvaHRtbC1lZGl0b3IvbGlzdC1udW1iZXJlZC5zdmdcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImFjdGl2ZVVubnVtYmVyZWRMaXN0IHx8IGFjdGl2ZU51bWJlcmVkTGlzdFwiPlxuXG4gICAgICAgICAgICAgICAgPGlvbi1pdGVtLWRpdmlkZXI+XG4gICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpc3RNZW51L0luZGVudFwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDwvaW9uLWl0ZW0tZGl2aWRlcj5cblxuICAgICAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwibGV2ZWwoLTEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpc3RNZW51L0RlY3JlYXNlIGluZGVudFwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWljb24gc3JjPVwiYXNzZXRzL2h0bWwtZWRpdG9yL2luZGVudC1kZWNyZWFzZS5zdmdcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG5cbiAgICAgICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cImxldmVsKDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpc3RNZW51L0luY3JlYXNlIGluZGVudFwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWljb24gc3JjPVwiYXNzZXRzL2h0bWwtZWRpdG9yL2luZGVudC1pbmNyZWFzZS5zdmdcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgPC9pb24tbGlzdD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIExpc3RNZW51IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwcml2YXRlIGVkaXRvcjogSHRtbEVkaXRvcjtcblxuICAgIGFjdGl2ZVVubnVtYmVyZWRMaXN0OiBib29sZWFuO1xuICAgIGFjdGl2ZU51bWJlcmVkTGlzdDogYm9vbGVhbjtcblxuICAgIGxldmVsKGxldmVsOiBudW1iZXIpIHtcblxuICAgICAgICBjb25zdCBjb21tYW5kOiBDb21tYW5kID0gbGV2ZWwgPCAwID8gb3V0ZGVudExpc3QoKSA6IGluZGVudExpc3QoKTtcbiAgICAgICAgaWYgKGNvbW1hbmQodGhpcy5lZGl0b3Iuc3RhdGUpKSB7XG4gICAgICAgICAgICBjb21tYW5kKHRoaXMuZWRpdG9yLnN0YXRlLCAodHIpID0+IHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHRvZ2dsZUxpc3QodHlwZTogXCJidWxsZXRMaXN0XCIgfCBcIm9yZGVyZWRMaXN0XCIpIHtcbiAgICAgICAgdG9nZ2xlTGlzdCh0aGlzLmVkaXRvci5zdGF0ZSwgKHRyKSA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSwgdGhpcy5lZGl0b3IudmlldywgdHlwZSk7XG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmFjdGl2ZVVubnVtYmVyZWRMaXN0ID0gISFmaW5kUGFyZW50Tm9kZShwcmVkaWNhdGUgPT4gcHJlZGljYXRlLmhhc01hcmt1cChzY2hlbWEubm9kZXMuYnVsbGV0TGlzdCkpKHRoaXMuZWRpdG9yLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgICAgIHRoaXMuYWN0aXZlTnVtYmVyZWRMaXN0ID0gISFmaW5kUGFyZW50Tm9kZShwcmVkaWNhdGUgPT4gcHJlZGljYXRlLmhhc01hcmt1cChzY2hlbWEubm9kZXMub3JkZXJlZExpc3QpKSh0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgIH1cblxuICAgIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxufVxuIl19