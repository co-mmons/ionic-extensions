import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { Alignment } from "./alignment";
import { changeAlignment } from "./prosemirror/alignment/commands";
import { schema } from "./prosemirror/schema";
import { findBlockMarks } from "./prosemirror/utils/selection/find-block-marks";
export class AlignmentMenu {
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
}
AlignmentMenu.decorators = [
    { type: Component, args: [{
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
            },] }
];
AlignmentMenu.ctorParameters = () => [
    { type: PopoverController }
];
AlignmentMenu.propDecorators = {
    editor: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ25tZW50LW1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaHRtbC1lZGl0b3IvYWxpZ25tZW50LW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQW1COUUsTUFBTSxPQUFPLGFBQWE7SUFJdEIsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFGeEQsY0FBUyxHQUFHLFNBQVMsQ0FBQztJQUd0QixDQUFDO0lBT0QsY0FBYyxDQUFDLFNBQW9CO1FBRS9CLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBTSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFMUQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFRO1FBRUosSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFFeEIsS0FBSyxNQUFNLElBQUksSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUUxRSxrREFBa0Q7WUFDbEQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUN4QixNQUFNO2FBQ1Q7WUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7O1lBMURKLFNBQVMsU0FBQztnQkFLUCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7S0FVVDt5QkFkUTs7O0tBR1I7YUFZSjs7O1lBdkJPLGlCQUFpQjs7O3FCQStCcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge0FsaWdubWVudH0gZnJvbSBcIi4vYWxpZ25tZW50XCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtjaGFuZ2VBbGlnbm1lbnR9IGZyb20gXCIuL3Byb3NlbWlycm9yL2FsaWdubWVudC9jb21tYW5kc1wiO1xuaW1wb3J0IHtzY2hlbWF9IGZyb20gXCIuL3Byb3NlbWlycm9yL3NjaGVtYVwiO1xuaW1wb3J0IHtmaW5kQmxvY2tNYXJrc30gZnJvbSBcIi4vcHJvc2VtaXJyb3IvdXRpbHMvc2VsZWN0aW9uL2ZpbmQtYmxvY2stbWFya3NcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCBpb24tbGlzdCB7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7IH1cbiAgICAgICAgOmhvc3QgaW9uLWl0ZW06bGFzdC1jaGlsZCB7IC0tYm9yZGVyLXdpZHRoOiAwcHg7IH1cbiAgICBgXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XG5cbiAgICAgICAgICAgIDxpb24taXRlbSBidXR0b249XCJ0cnVlXCIgZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwidG9nZ2xlQWxpZ21lbnQoYWxpZ25tZW50KVwiICpuZ0Zvcj1cImxldCBhbGlnbm1lbnQgb2YgQWxpZ25tZW50LmFsaWdubWVudHMoKVwiPlxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWw+e3thbGlnbm1lbnQubGFiZWwgfCBpbnRsTWVzc2FnZX19PC9pb24tbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJjaGVja21hcmtcIiBzbG90PVwiZW5kXCIgKm5nSWY9XCJhY3RpdmUgPT09IGFsaWdubWVudC5hbGlnbm1lbnRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBzcmM9XCJhc3NldHMvaHRtbC1lZGl0b3IvYWxpZ24te3thbGlnbm1lbnQuYWxpZ25tZW50fX0uc3ZnXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWl0ZW0+XG5cbiAgICAgICAgPC9pb24tbGlzdD5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEFsaWdubWVudE1lbnUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQWxpZ25tZW50ID0gQWxpZ25tZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwb3BvdmVyQ29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIpIHtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHByaXZhdGUgZWRpdG9yOiBIdG1sRWRpdG9yO1xuXG4gICAgYWN0aXZlOiBzdHJpbmc7XG5cbiAgICB0b2dnbGVBbGlnbWVudChhbGlnbm1lbnQ6IEFsaWdubWVudCkge1xuXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjaGFuZ2VBbGlnbm1lbnQoPGFueT5hbGlnbm1lbnQuYWxpZ25tZW50KTtcblxuICAgICAgICBpZiAoY29tbWFuZCh0aGlzLmVkaXRvci5zdGF0ZSkpIHtcbiAgICAgICAgICAgIGNvbW1hbmQodGhpcy5lZGl0b3Iuc3RhdGUsICh0cikgPT4gdGhpcy5lZGl0b3Iudmlldy5kaXNwYXRjaCh0cikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5kaXNtaXNzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5hY3RpdmUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgZm9yIChjb25zdCBtYXJrIG9mIGZpbmRCbG9ja01hcmtzKHRoaXMuZWRpdG9yLnN0YXRlLCBzY2hlbWEubWFya3MuYWxpZ25tZW50KSkge1xuXG4gICAgICAgICAgICAvLyB6YXpuYWN6b255Y2ggd2llbGUgYmxvY2vDs3cgeiByw7PFvG55bSB3eXLDs3duYW5pZW1cbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZSAmJiB0aGlzLmFjdGl2ZSAhPT0gbWFyay5hdHRycy5hbGlnbikge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IG1hcmsuYXR0cnMuYWxpZ247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpb25WaWV3V2lsbExlYXZlKCkge1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==