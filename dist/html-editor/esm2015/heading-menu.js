import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { schema } from "./prosemirror/schema";
import { setBlockType } from "prosemirror-commands";
import { findParentNodeOfType } from "prosemirror-utils";
export class HeadingMenu {
    constructor(popoverController) {
        this.popoverController = popoverController;
    }
    toggleHeading(heading) {
        if (heading > 0 && this.activeHeading !== heading) {
            const command = setBlockType(schema.nodes.heading, { level: heading });
            if (command(this.editor.state)) {
                command(this.editor.state, (tr) => {
                    this.editor.view.dispatch(tr);
                });
            }
        }
        else {
            setBlockType(schema.nodes.paragraph)(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    ngOnInit() {
        const active = findParentNodeOfType(schema.nodes.heading)(this.editor.state.selection);
        if (active) {
            this.activeHeading = active.node.attrs.level;
        }
    }
    ionViewWillLeave() {
        this.editor.focus();
    }
}
HeadingMenu.decorators = [
    { type: Component, args: [{
                template: `
        <ion-list lines="full">

            <ion-item button="true" detail="false" (click)="toggleHeading(0)" *ngIf="activeHeading > 0">
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#Plain text" | intlMessage}}</ion-label>
            </ion-item>
            
            <ion-item button="true" detail="false" (click)="toggleHeading(1)">
                <ion-label style="font-size: 130%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 1</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 1"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleHeading(2)">
                <ion-label style="font-size: 125%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 2</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 2"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleHeading(3)">
                <ion-label style="font-size: 120%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 3</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 3"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleHeading(4)">
                <ion-label style="font-size: 115%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 4</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 4"></ion-icon>
            </ion-item>
            
            <ion-item button="true" detail="false" (click)="toggleHeading(5)">
                <ion-label style="font-size: 110%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 5</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 5"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleHeading(6)">
                <ion-label style="font-size: 105%; font-weight: 500">{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}} 6</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeHeading == 6"></ion-icon>
            </ion-item>
            
        </ion-list>
    `,
                styles: [`:host ion-list { margin: 0px; padding: 0px }`,
                    `:host ion-item:last-child { --border-width: 0px; }`]
            },] }
];
HeadingMenu.ctorParameters = () => [
    { type: PopoverController }
];
HeadingMenu.propDecorators = {
    editor: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy1tZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2h0bWwtZWRpdG9yL2hlYWRpbmctbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBK0N2RCxNQUFNLE9BQU8sV0FBVztJQUVwQixZQUFvQixpQkFBb0M7UUFBcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUN4RCxDQUFDO0lBUUQsYUFBYSxDQUFDLE9BQWU7UUFFekIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssT0FBTyxFQUFFO1lBRS9DLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1lBQ3JFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO29CQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FFSjthQUFNO1lBQ0gsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xHO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFRO1FBRUosTUFBTSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RixJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7O1lBcEZKLFNBQVMsU0FBQztnQkFLUCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0NUO3lCQXpDRyw4Q0FBOEM7b0JBQzlDLG9EQUFvRDthQXlDM0Q7OztZQWxETyxpQkFBaUI7OztxQkEwRHBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7c2V0QmxvY2tUeXBlfSBmcm9tIFwicHJvc2VtaXJyb3ItY29tbWFuZHNcIjtcbmltcG9ydCB7ZmluZFBhcmVudE5vZGVPZlR5cGV9IGZyb20gXCJwcm9zZW1pcnJvci11dGlsc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYDpob3N0IGlvbi1saXN0IHsgbWFyZ2luOiAwcHg7IHBhZGRpbmc6IDBweCB9YCxcbiAgICAgICAgYDpob3N0IGlvbi1pdGVtOmxhc3QtY2hpbGQgeyAtLWJvcmRlci13aWR0aDogMHB4OyB9YCxcbiAgICBdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cblxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGVIZWFkaW5nKDApXCIgKm5nSWY9XCJhY3RpdmVIZWFkaW5nID4gMFwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI1BsYWluIHRleHRcIiB8IGludGxNZXNzYWdlfX08L2lvbi1sYWJlbD5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwidG9nZ2xlSGVhZGluZygxKVwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgc3R5bGU9XCJmb250LXNpemU6IDEzMCU7IGZvbnQtd2VpZ2h0OiA1MDBcIj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjSGVhZGluZ1wiIHwgaW50bE1lc3NhZ2V9fSAxPC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJhY3RpdmVIZWFkaW5nID09IDFcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGVIZWFkaW5nKDIpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBzdHlsZT1cImZvbnQtc2l6ZTogMTI1JTsgZm9udC13ZWlnaHQ6IDUwMFwiPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNIZWFkaW5nXCIgfCBpbnRsTWVzc2FnZX19IDI8L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImNoZWNrbWFya1wiIHNsb3Q9XCJlbmRcIiAqbmdJZj1cImFjdGl2ZUhlYWRpbmcgPT0gMlwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInRvZ2dsZUhlYWRpbmcoMylcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIHN0eWxlPVwiZm9udC1zaXplOiAxMjAlOyBmb250LXdlaWdodDogNTAwXCI+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI0hlYWRpbmdcIiB8IGludGxNZXNzYWdlfX0gMzwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwiYWN0aXZlSGVhZGluZyA9PSAzXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG5cbiAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwidG9nZ2xlSGVhZGluZyg0KVwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgc3R5bGU9XCJmb250LXNpemU6IDExNSU7IGZvbnQtd2VpZ2h0OiA1MDBcIj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjSGVhZGluZ1wiIHwgaW50bE1lc3NhZ2V9fSA0PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJhY3RpdmVIZWFkaW5nID09IDRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGVIZWFkaW5nKDUpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBzdHlsZT1cImZvbnQtc2l6ZTogMTEwJTsgZm9udC13ZWlnaHQ6IDUwMFwiPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNIZWFkaW5nXCIgfCBpbnRsTWVzc2FnZX19IDU8L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImNoZWNrbWFya1wiIHNsb3Q9XCJlbmRcIiAqbmdJZj1cImFjdGl2ZUhlYWRpbmcgPT0gNVwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInRvZ2dsZUhlYWRpbmcoNilcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIHN0eWxlPVwiZm9udC1zaXplOiAxMDUlOyBmb250LXdlaWdodDogNTAwXCI+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI0hlYWRpbmdcIiB8IGludGxNZXNzYWdlfX0gNjwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwiYWN0aXZlSGVhZGluZyA9PSA2XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG4gICAgICAgICAgICBcbiAgICAgICAgPC9pb24tbGlzdD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRpbmdNZW51IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgYWN0aXZlSGVhZGluZzogbnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cblxuICAgIHRvZ2dsZUhlYWRpbmcoaGVhZGluZzogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKGhlYWRpbmcgPiAwICYmIHRoaXMuYWN0aXZlSGVhZGluZyAhPT0gaGVhZGluZykge1xuXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kID0gc2V0QmxvY2tUeXBlKHNjaGVtYS5ub2Rlcy5oZWFkaW5nLCB7bGV2ZWw6IGhlYWRpbmd9KTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kKHRoaXMuZWRpdG9yLnN0YXRlKSkge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQodGhpcy5lZGl0b3Iuc3RhdGUsICh0cikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0QmxvY2tUeXBlKHNjaGVtYS5ub2Rlcy5wYXJhZ3JhcGgpKHRoaXMuZWRpdG9yLnN0YXRlLCAodHIpID0+IHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IGZpbmRQYXJlbnROb2RlT2ZUeXBlKHNjaGVtYS5ub2Rlcy5oZWFkaW5nKSh0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUhlYWRpbmcgPSBhY3RpdmUubm9kZS5hdHRycy5sZXZlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxufVxuIl19