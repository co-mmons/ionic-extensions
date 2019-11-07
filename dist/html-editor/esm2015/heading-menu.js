import * as tslib_1 from "tslib";
import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { schema } from "./prosemirror/schema";
import { setBlockType } from "prosemirror-commands";
import { findParentNodeOfType } from "prosemirror-utils";
let HeadingMenu = class HeadingMenu {
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
};
HeadingMenu.ctorParameters = () => [
    { type: PopoverController }
];
tslib_1.__decorate([
    Input()
], HeadingMenu.prototype, "editor", void 0);
HeadingMenu = tslib_1.__decorate([
    Component({
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
    })
], HeadingMenu);
export { HeadingMenu };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy1tZW51LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IvIiwic291cmNlcyI6WyJoZWFkaW5nLW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUErQ3ZELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFFcEIsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDeEQsQ0FBQztJQVFELGFBQWEsQ0FBQyxPQUFlO1FBRXpCLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLE9BQU8sRUFBRTtZQUUvQyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsQ0FBQzthQUNOO1NBRUo7YUFBTTtZQUNILFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsRztRQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUTtRQUVKLE1BQU0sTUFBTSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkYsSUFBSSxNQUFNLEVBQUU7WUFDUixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDSixDQUFBOztZQXRDMEMsaUJBQWlCOztBQU14RDtJQURDLEtBQUssRUFBRTsyQ0FDVztBQVJWLFdBQVc7SUE3Q3ZCLFNBQVMsQ0FBQztRQUtQLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzQ1Q7aUJBekNHLDhDQUE4QztZQUM5QyxvREFBb0Q7S0F5QzNELENBQUM7R0FDVyxXQUFXLENBd0N2QjtTQXhDWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1BvcG92ZXJDb250cm9sbGVyfSBmcm9tIFwiQGlvbmljL2FuZ3VsYXJcIjtcbmltcG9ydCB7SHRtbEVkaXRvcn0gZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQge3NjaGVtYX0gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivc2NoZW1hXCI7XG5pbXBvcnQge3NldEJsb2NrVHlwZX0gZnJvbSBcInByb3NlbWlycm9yLWNvbW1hbmRzXCI7XG5pbXBvcnQge2ZpbmRQYXJlbnROb2RlT2ZUeXBlfSBmcm9tIFwicHJvc2VtaXJyb3ItdXRpbHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGA6aG9zdCBpb24tbGlzdCB7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHggfWAsXG4gICAgICAgIGA6aG9zdCBpb24taXRlbTpsYXN0LWNoaWxkIHsgLS1ib3JkZXItd2lkdGg6IDBweDsgfWAsXG4gICAgXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XG5cbiAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwidG9nZ2xlSGVhZGluZygwKVwiICpuZ0lmPVwiYWN0aXZlSGVhZGluZyA+IDBcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNQbGFpbiB0ZXh0XCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInRvZ2dsZUhlYWRpbmcoMSlcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIHN0eWxlPVwiZm9udC1zaXplOiAxMzAlOyBmb250LXdlaWdodDogNTAwXCI+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI0hlYWRpbmdcIiB8IGludGxNZXNzYWdlfX0gMTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwiYWN0aXZlSGVhZGluZyA9PSAxXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG5cbiAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwidG9nZ2xlSGVhZGluZygyKVwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgc3R5bGU9XCJmb250LXNpemU6IDEyNSU7IGZvbnQtd2VpZ2h0OiA1MDBcIj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjSGVhZGluZ1wiIHwgaW50bE1lc3NhZ2V9fSAyPC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJhY3RpdmVIZWFkaW5nID09IDJcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGVIZWFkaW5nKDMpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBzdHlsZT1cImZvbnQtc2l6ZTogMTIwJTsgZm9udC13ZWlnaHQ6IDUwMFwiPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNIZWFkaW5nXCIgfCBpbnRsTWVzc2FnZX19IDM8L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImNoZWNrbWFya1wiIHNsb3Q9XCJlbmRcIiAqbmdJZj1cImFjdGl2ZUhlYWRpbmcgPT0gM1wiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInRvZ2dsZUhlYWRpbmcoNClcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsIHN0eWxlPVwiZm9udC1zaXplOiAxMTUlOyBmb250LXdlaWdodDogNTAwXCI+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI0hlYWRpbmdcIiB8IGludGxNZXNzYWdlfX0gNDwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwiYWN0aXZlSGVhZGluZyA9PSA0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwidG9nZ2xlSGVhZGluZyg1KVwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgc3R5bGU9XCJmb250LXNpemU6IDExMCU7IGZvbnQtd2VpZ2h0OiA1MDBcIj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjSGVhZGluZ1wiIHwgaW50bE1lc3NhZ2V9fSA1PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJhY3RpdmVIZWFkaW5nID09IDVcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGVIZWFkaW5nKDYpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBzdHlsZT1cImZvbnQtc2l6ZTogMTA1JTsgZm9udC13ZWlnaHQ6IDUwMFwiPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNIZWFkaW5nXCIgfCBpbnRsTWVzc2FnZX19IDY8L2lvbi1sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImNoZWNrbWFya1wiIHNsb3Q9XCJlbmRcIiAqbmdJZj1cImFjdGl2ZUhlYWRpbmcgPT0gNlwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuICAgICAgICAgICAgXG4gICAgICAgIDwvaW9uLWxpc3Q+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBIZWFkaW5nTWVudSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcikge1xuICAgIH1cblxuICAgIGFjdGl2ZUhlYWRpbmc6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgZWRpdG9yOiBIdG1sRWRpdG9yO1xuXG5cbiAgICB0b2dnbGVIZWFkaW5nKGhlYWRpbmc6IG51bWJlcikge1xuXG4gICAgICAgIGlmIChoZWFkaW5nID4gMCAmJiB0aGlzLmFjdGl2ZUhlYWRpbmcgIT09IGhlYWRpbmcpIHtcblxuICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IHNldEJsb2NrVHlwZShzY2hlbWEubm9kZXMuaGVhZGluZywge2xldmVsOiBoZWFkaW5nfSk7XG4gICAgICAgICAgICBpZiAoY29tbWFuZCh0aGlzLmVkaXRvci5zdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kKHRoaXMuZWRpdG9yLnN0YXRlLCAodHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldEJsb2NrVHlwZShzY2hlbWEubm9kZXMucGFyYWdyYXBoKSh0aGlzLmVkaXRvci5zdGF0ZSwgKHRyKSA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmRpc21pc3MoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBjb25zdCBhY3RpdmUgPSBmaW5kUGFyZW50Tm9kZU9mVHlwZShzY2hlbWEubm9kZXMuaGVhZGluZykodGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVIZWFkaW5nID0gYWN0aXZlLm5vZGUuYXR0cnMubGV2ZWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpb25WaWV3V2lsbExlYXZlKCkge1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==