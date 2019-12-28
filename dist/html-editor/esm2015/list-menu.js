import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { indentList, outdentList, toggleList } from "./prosemirror/list-commands";
import { schema } from "./prosemirror/schema";
import { findParentNode } from "prosemirror-utils";
let ListMenu = class ListMenu {
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
};
ListMenu.ctorParameters = () => [
    { type: PopoverController }
];
__decorate([
    Input()
], ListMenu.prototype, "editor", void 0);
ListMenu = __decorate([
    Component({
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
    })
], ListMenu);
export { ListMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1tZW51LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJsaXN0LW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR2pELE9BQU8sRUFBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUE4Q2pELElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFFakIsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDeEQsQ0FBQztJQVFELEtBQUssQ0FBQyxLQUFhO1FBRWYsTUFBTSxPQUFPLEdBQVksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNyRTtRQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWtDO1FBQ3pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckksSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4SSxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0NBQ0osQ0FBQTs7WUFoQzBDLGlCQUFpQjs7QUFJeEQ7SUFEQyxLQUFLLEVBQUU7d0NBQ21CO0FBTmxCLFFBQVE7SUE1Q3BCLFNBQVMsQ0FBQztRQVFQLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWtDVDtpQkF6Q1E7Ozs7OztLQU1SO0tBb0NKLENBQUM7R0FDVyxRQUFRLENBa0NwQjtTQWxDWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7SHRtbEVkaXRvcn0gZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQge0NvbW1hbmR9IGZyb20gXCIuL3Byb3NlbWlycm9yL2NvbW1hbmRcIjtcbmltcG9ydCB7aW5kZW50TGlzdCwgb3V0ZGVudExpc3QsIHRvZ2dsZUxpc3R9IGZyb20gXCIuL3Byb3NlbWlycm9yL2xpc3QtY29tbWFuZHNcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZFBhcmVudE5vZGV9IGZyb20gXCJwcm9zZW1pcnJvci11dGlsc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHsgdXNlci1zZWxlY3Q6IG5vbmU7IH1cbiAgICAgICAgOmhvc3QgaW9uLWxpc3QgeyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4OyB9XG4gICAgICAgIDpob3N0IGlvbi1pdGVtOmxhc3QtY2hpbGQgeyAtLWJvcmRlci13aWR0aDogMHB4OyB9XG4gICAgICAgIDpob3N0IGlvbi1pdGVtLWRpdmlkZXIgeyAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBmb250LXNpemU6IHNtYWxsIH1cbiAgICAgICAgOmhvc3QgaW9uLWl0ZW0tZGl2aWRlciBpb24tbGFiZWwgeyBtYXJnaW4tdG9wOiAyMHB4OyBvcGFjaXR5OiAwLjg7IH1cbiAgICBgXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XG5cbiAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwidG9nZ2xlTGlzdCgnYnVsbGV0TGlzdCcpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbD57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjbGlzdE1lbnUvQnVsbGV0ZWQgbGlzdFwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwiYWN0aXZlVW5udW1iZXJlZExpc3RcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBzcmM9XCJhc3NldHMvaHRtbC1lZGl0b3IvbGlzdC1idWxsZXRlZC5zdmdcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGVMaXN0KCdvcmRlcmVkTGlzdCcpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbD57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjbGlzdE1lbnUvTnVtYmVyZWQgbGlzdFwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwiYWN0aXZlTnVtYmVyZWRMaXN0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gc3JjPVwiYXNzZXRzL2h0bWwtZWRpdG9yL2xpc3QtbnVtYmVyZWQuc3ZnXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJhY3RpdmVVbm51bWJlcmVkTGlzdCB8fCBhY3RpdmVOdW1iZXJlZExpc3RcIj5cblxuICAgICAgICAgICAgICAgIDxpb24taXRlbS1kaXZpZGVyPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaXN0TWVudS9JbmRlbnRcIiB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2lvbi1pdGVtLWRpdmlkZXI+XG5cbiAgICAgICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cImxldmVsKC0xKVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaXN0TWVudS9EZWNyZWFzZSBpbmRlbnRcIiB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlvbi1pY29uIHNyYz1cImFzc2V0cy9odG1sLWVkaXRvci9pbmRlbnQtZGVjcmVhc2Uuc3ZnXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJsZXZlbCgxKVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaXN0TWVudS9JbmNyZWFzZSBpbmRlbnRcIiB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlvbi1pY29uIHNyYz1cImFzc2V0cy9odG1sLWVkaXRvci9pbmRlbnQtaW5jcmVhc2Uuc3ZnXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgIDwvaW9uLWxpc3Q+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBMaXN0TWVudSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHJpdmF0ZSBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBhY3RpdmVVbm51bWJlcmVkTGlzdDogYm9vbGVhbjtcbiAgICBhY3RpdmVOdW1iZXJlZExpc3Q6IGJvb2xlYW47XG5cbiAgICBsZXZlbChsZXZlbDogbnVtYmVyKSB7XG5cbiAgICAgICAgY29uc3QgY29tbWFuZDogQ29tbWFuZCA9IGxldmVsIDwgMCA/IG91dGRlbnRMaXN0KCkgOiBpbmRlbnRMaXN0KCk7XG4gICAgICAgIGlmIChjb21tYW5kKHRoaXMuZWRpdG9yLnN0YXRlKSkge1xuICAgICAgICAgICAgY29tbWFuZCh0aGlzLmVkaXRvci5zdGF0ZSwgKHRyKSA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVMaXN0KHR5cGU6IFwiYnVsbGV0TGlzdFwiIHwgXCJvcmRlcmVkTGlzdFwiKSB7XG4gICAgICAgIHRvZ2dsZUxpc3QodGhpcy5lZGl0b3Iuc3RhdGUsICh0cikgPT4gdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0ciksIHRoaXMuZWRpdG9yLnZpZXcsIHR5cGUpO1xuICAgICAgICB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVVbm51bWJlcmVkTGlzdCA9ICEhZmluZFBhcmVudE5vZGUocHJlZGljYXRlID0+IHByZWRpY2F0ZS5oYXNNYXJrdXAoc2NoZW1hLm5vZGVzLmJ1bGxldExpc3QpKSh0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLmFjdGl2ZU51bWJlcmVkTGlzdCA9ICEhZmluZFBhcmVudE5vZGUocHJlZGljYXRlID0+IHByZWRpY2F0ZS5oYXNNYXJrdXAoc2NoZW1hLm5vZGVzLm9yZGVyZWRMaXN0KSkodGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICB9XG5cbiAgICBpb25WaWV3V2lsbExlYXZlKCkge1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==