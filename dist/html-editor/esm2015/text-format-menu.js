import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { toggleMark } from "prosemirror-commands";
import { FontSize } from "./font-sizes";
import { toggleInlineMark } from "./prosemirror/commands/toogle-inline-mark";
import { isMarkActive } from "./prosemirror/is-active";
import { schema } from "./prosemirror/schema";
import { findMarksInSelection } from "./prosemirror/utils/find-marks-in-selection";
export class TextFormatMenu {
    constructor(popoverController) {
        this.popoverController = popoverController;
        this.FontSize = FontSize;
    }
    toggle(name) {
        let command;
        if (name === "bold") {
            command = toggleMark(schema.marks.strong);
        }
        else if (name === "italic") {
            command = toggleMark(schema.marks.em);
        }
        else if (name === "underline") {
            command = toggleMark(schema.marks.underline);
        }
        if (command(this.editor.state)) {
            command(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    resetFontSize() {
        toggleMark(schema.marks.fontSize)(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        this.popoverController.dismiss();
    }
    toggleFontSize(size) {
        const command = toggleInlineMark(schema.marks.fontSize, { fontSize: size.size });
        if (command(this.editor.state)) {
            command(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }
        this.popoverController.dismiss();
    }
    ngOnInit() {
        this.boldActivated = isMarkActive(this.editor.state, schema.marks.strong);
        this.italicActivated = isMarkActive(this.editor.state, schema.marks.em);
        this.underlineActivated = isMarkActive(this.editor.state, schema.marks.underline);
        this.activeFontSize = undefined;
        MARKS: for (const mark of findMarksInSelection(this.editor.state, schema.marks.fontSize)) {
            for (const size of FontSize.sizes()) {
                if (size.size === mark.attrs.fontSize) {
                    // ups, mamy różne rozmiary w zaznaczeniu
                    if (this.activeFontSize && size !== this.activeFontSize) {
                        this.activeFontSize = undefined;
                        break MARKS;
                    }
                    this.activeFontSize = size;
                }
            }
        }
    }
    ionViewWillLeave() {
        this.editor.focus();
    }
}
TextFormatMenu.decorators = [
    { type: Component, args: [{
                template: `
        <ion-list lines="full">
            
            <ion-item button="true" detail="false" (click)="toggle('bold')">
                <ion-label style="font-weight: bold">{{"@co.mmons/ionic-extensions/html-editor#textMenu/Bold" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="boldActivated"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggle('italic')">
                <ion-label style="font-style: italic">{{"@co.mmons/ionic-extensions/html-editor#textMenu/Italic" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="italicActivated"></ion-icon>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggle('underline')">
                <ion-label style="text-decoration: underline">{{"@co.mmons/ionic-extensions/html-editor#textMenu/Underline" | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="underlineActivated"></ion-icon>
            </ion-item>
            
            <ion-item-divider>
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#textMenu/fontSize/Text size" | intlMessage}}</ion-label>
            </ion-item-divider>

            <ion-item button="true" detail="false" (click)="resetFontSize()" *ngIf="activeFontSize">
                <ion-label>{{"@co.mmons/ionic-extensions/html-editor#textMenu/fontSize/Default" | intlMessage}}</ion-label>
            </ion-item>

            <ion-item button="true" detail="false" (click)="toggleFontSize(fontSize)" *ngFor="let fontSize of FontSize.sizes()">
                <ion-label [style.fontSize]="fontSize.size">{{fontSize.label | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="activeFontSize === fontSize"></ion-icon>
            </ion-item>

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
TextFormatMenu.ctorParameters = () => [
    { type: PopoverController }
];
TextFormatMenu.propDecorators = {
    editor: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1mb3JtYXQtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odG1sLWVkaXRvci90ZXh0LWZvcm1hdC1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVoRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUE0Q2pGLE1BQU0sT0FBTyxjQUFjO0lBSXZCLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBRi9DLGFBQVEsR0FBRyxRQUFRLENBQUM7SUFHN0IsQ0FBQztJQWNELE1BQU0sQ0FBQyxJQUFZO1FBRWYsSUFBSSxPQUFnQixDQUFDO1FBRXJCLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNqQixPQUFPLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7YUFBTSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDMUIsT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzdCLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFB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eUJBdkNROzs7Ozs7S0FNUjthQWtDSjs7O1lBbkRPLGlCQUFpQjs7O3FCQTJEcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3RvZ2dsZU1hcmt9IGZyb20gXCJwcm9zZW1pcnJvci1jb21tYW5kc1wiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7Rm9udFNpemV9IGZyb20gXCIuL2ZvbnQtc2l6ZXNcIjtcbmltcG9ydCB7Q29tbWFuZH0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvY29tbWFuZFwiO1xuaW1wb3J0IHt0b2dnbGVJbmxpbmVNYXJrfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9jb21tYW5kcy90b29nbGUtaW5saW5lLW1hcmtcIjtcbmltcG9ydCB7aXNNYXJrQWN0aXZlfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9pcy1hY3RpdmVcIjtcbmltcG9ydCB7c2NoZW1hfSBmcm9tIFwiLi9wcm9zZW1pcnJvci9zY2hlbWFcIjtcbmltcG9ydCB7ZmluZE1hcmtzSW5TZWxlY3Rpb259IGZyb20gXCIuL3Byb3NlbWlycm9yL3V0aWxzL2ZpbmQtbWFya3MtaW4tc2VsZWN0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3QgeyB1c2VyLXNlbGVjdDogbm9uZTsgfVxuICAgICAgICA6aG9zdCBpb24tbGlzdCB7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7IH1cbiAgICAgICAgOmhvc3QgaW9uLWl0ZW06bGFzdC1jaGlsZCB7IC0tYm9yZGVyLXdpZHRoOiAwcHg7IH1cbiAgICAgICAgOmhvc3QgaW9uLWl0ZW0tZGl2aWRlciB7IC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGZvbnQtc2l6ZTogc21hbGwgfVxuICAgICAgICA6aG9zdCBpb24taXRlbS1kaXZpZGVyIGlvbi1sYWJlbCB7IG1hcmdpbi10b3A6IDIwcHg7IG9wYWNpdHk6IDAuODsgfVxuICAgIGBdLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGUoJ2JvbGQnKVwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZFwiPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciN0ZXh0TWVudS9Cb2xkXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJib2xkQWN0aXZhdGVkXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG5cbiAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwidG9nZ2xlKCdpdGFsaWMnKVwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgc3R5bGU9XCJmb250LXN0eWxlOiBpdGFsaWNcIj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjdGV4dE1lbnUvSXRhbGljXCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJpdGFsaWNBY3RpdmF0ZWRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICAgICAgPGlvbi1pdGVtIGJ1dHRvbj1cInRydWVcIiBkZXRhaWw9XCJmYWxzZVwiIChjbGljayk9XCJ0b2dnbGUoJ3VuZGVybGluZScpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBzdHlsZT1cInRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lXCI+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI3RleHRNZW51L1VuZGVybGluZVwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiY2hlY2ttYXJrXCIgc2xvdD1cImVuZFwiICpuZ0lmPVwidW5kZXJsaW5lQWN0aXZhdGVkXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxpb24taXRlbS1kaXZpZGVyPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI3RleHRNZW51L2ZvbnRTaXplL1RleHQgc2l6ZVwiIHwgaW50bE1lc3NhZ2V9fTwvaW9uLWxhYmVsPlxuICAgICAgICAgICAgPC9pb24taXRlbS1kaXZpZGVyPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInJlc2V0Rm9udFNpemUoKVwiICpuZ0lmPVwiYWN0aXZlRm9udFNpemVcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWxhYmVsPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciN0ZXh0TWVudS9mb250U2l6ZS9EZWZhdWx0XCIgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICA8L2lvbi1pdGVtPlxuXG4gICAgICAgICAgICA8aW9uLWl0ZW0gYnV0dG9uPVwidHJ1ZVwiIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInRvZ2dsZUZvbnRTaXplKGZvbnRTaXplKVwiICpuZ0Zvcj1cImxldCBmb250U2l6ZSBvZiBGb250U2l6ZS5zaXplcygpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBbc3R5bGUuZm9udFNpemVdPVwiZm9udFNpemUuc2l6ZVwiPnt7Zm9udFNpemUubGFiZWwgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJhY3RpdmVGb250U2l6ZSA9PT0gZm9udFNpemVcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24taXRlbT5cblxuICAgICAgICA8L2lvbi1saXN0PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVGV4dEZvcm1hdE1lbnUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcmVhZG9ubHkgRm9udFNpemUgPSBGb250U2l6ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyKSB7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBlZGl0b3I6IEh0bWxFZGl0b3I7XG5cbiAgICBib2xkQWN0aXZhdGVkOiBib29sZWFuO1xuXG4gICAgaXRhbGljQWN0aXZhdGVkOiBib29sZWFuO1xuXG4gICAgdW5kZXJsaW5lQWN0aXZhdGVkOiBib29sZWFuO1xuXG4gICAgYWN0aXZlRm9udFNpemU6IEZvbnRTaXplO1xuXG5cbiAgICB0b2dnbGUobmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgbGV0IGNvbW1hbmQ6IENvbW1hbmQ7XG5cbiAgICAgICAgaWYgKG5hbWUgPT09IFwiYm9sZFwiKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gdG9nZ2xlTWFyayhzY2hlbWEubWFya3Muc3Ryb25nKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSBcIml0YWxpY1wiKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gdG9nZ2xlTWFyayhzY2hlbWEubWFya3MuZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09IFwidW5kZXJsaW5lXCIpIHtcbiAgICAgICAgICAgIGNvbW1hbmQgPSB0b2dnbGVNYXJrKHNjaGVtYS5tYXJrcy51bmRlcmxpbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1hbmQodGhpcy5lZGl0b3Iuc3RhdGUpKSB7XG4gICAgICAgICAgICBjb21tYW5kKHRoaXMuZWRpdG9yLnN0YXRlLCAodHIpID0+IHRoaXMuZWRpdG9yLnZpZXcuZGlzcGF0Y2godHIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHJlc2V0Rm9udFNpemUoKSB7XG4gICAgICAgIHRvZ2dsZU1hcmsoc2NoZW1hLm1hcmtzLmZvbnRTaXplKSh0aGlzLmVkaXRvci5zdGF0ZSwgKHRyKSA9PiB0aGlzLmVkaXRvci52aWV3LmRpc3BhdGNoKHRyKSk7XG4gICAgICAgIHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuZGlzbWlzcygpO1xuICAgIH1cblxuICAgIHRvZ2dsZUZvbnRTaXplKHNpemU6IEZvbnRTaXplKSB7XG5cbiAgICAgICAgY29uc3QgY29tbWFuZCA9IHRvZ2dsZUlubGluZU1hcmsoc2NoZW1hLm1hcmtzLmZvbnRTaXplLCB7Zm9udFNpemU6IHNpemUuc2l6ZX0pO1xuICAgICAgICBpZiAoY29tbWFuZCh0aGlzLmVkaXRvci5zdGF0ZSkpIHtcbiAgICAgICAgICAgIGNvbW1hbmQodGhpcy5lZGl0b3Iuc3RhdGUsICh0cikgPT4gdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYm9sZEFjdGl2YXRlZCA9IGlzTWFya0FjdGl2ZSh0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLnN0cm9uZyk7XG4gICAgICAgIHRoaXMuaXRhbGljQWN0aXZhdGVkID0gaXNNYXJrQWN0aXZlKHRoaXMuZWRpdG9yLnN0YXRlLCBzY2hlbWEubWFya3MuZW0pO1xuICAgICAgICB0aGlzLnVuZGVybGluZUFjdGl2YXRlZCA9IGlzTWFya0FjdGl2ZSh0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLnVuZGVybGluZSk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGb250U2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgTUFSS1M6IGZvciAoY29uc3QgbWFyayBvZiBmaW5kTWFya3NJblNlbGVjdGlvbih0aGlzLmVkaXRvci5zdGF0ZSwgc2NoZW1hLm1hcmtzLmZvbnRTaXplKSkge1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNpemUgb2YgRm9udFNpemUuc2l6ZXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChzaXplLnNpemUgPT09IG1hcmsuYXR0cnMuZm9udFNpemUpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB1cHMsIG1hbXkgcsOzxbxuZSByb3ptaWFyeSB3IHphem5hY3plbml1XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUZvbnRTaXplICYmIHNpemUgIT09IHRoaXMuYWN0aXZlRm9udFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRm9udFNpemUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBNQVJLUztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRm9udFNpemUgPSBzaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlvblZpZXdXaWxsTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxufVxuIl19