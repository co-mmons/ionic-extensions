import {Component, Input, OnInit} from "@angular/core";
import {PopoverController} from "@ionic/angular";
import {Alignment} from "./alignment";
import {HtmlEditor} from "./editor";
import {changeAlignment} from "./prosemirror/alignment/commands";
import {schema} from "./prosemirror/schema";
import {findBlockMarks} from "./prosemirror/utils/selection/find-block-marks";

@Component({
    styles: [`
        :host ion-list { margin: 0px; padding: 0px; }
        :host ion-item:last-child { --border-width: 0px; }
    `],
    template: `
        <ion-list lines="full">

            <ion-item button="true" detail="false" (click)="toggleAligment(alignment)" *ngFor="let alignment of Alignment.alignments()">
                <ion-label>{{alignment.label | intlMessage}}</ion-label>
                <ion-icon name="checkmark" slot="end" *ngIf="active === alignment.alignment"></ion-icon>
                <ion-icon src="assets/html-editor/align-{{alignment.alignment}}.svg" slot="start"></ion-icon>
            </ion-item>

        </ion-list>
    `
})
export class AlignmentMenu implements OnInit {

    Alignment = Alignment;

    constructor(private popoverController: PopoverController) {
    }

    @Input()
    private editor: HtmlEditor;

    active: string;

    toggleAligment(alignment: Alignment) {

        const command = changeAlignment(<any>alignment.alignment);

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
