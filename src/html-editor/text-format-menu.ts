import {Component, Input, OnInit} from "@angular/core";
import {PopoverController} from "@ionic/angular";
import {toggleMark} from "prosemirror-commands";
import {HtmlEditor} from "./editor";
import {FontSize} from "./font-sizes";
import {Command} from "./prosemirror/command";
import {toggleInlineMark} from "./prosemirror/commands/toogle-inline-mark";
import {isMarkActive} from "./prosemirror/is-active";
import {schema} from "./prosemirror/schema";
import {findMarksInSelection} from "./prosemirror/utils/find-marks-in-selection";

@Component({
    styles: [`
        :host { user-select: none; }
        :host ion-list { margin: 0px; padding: 0px; }
        :host ion-item:last-child { --border-width: 0px; }
        :host ion-item-divider { --background: transparent; font-size: small }
        :host ion-item-divider ion-label { margin-top: 20px; opacity: 0.8; }
    `],
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
    `
})
export class TextFormatMenu implements OnInit {

    readonly FontSize = FontSize;

    constructor(private popoverController: PopoverController) {
    }

    @Input()
    editor: HtmlEditor;

    boldActivated: boolean;

    italicActivated: boolean;

    underlineActivated: boolean;

    activeFontSize: FontSize;


    toggle(name: string) {

        let command: Command;

        if (name === "bold") {
            command = toggleMark(schema.marks.strong);
        } else if (name === "italic") {
            command = toggleMark(schema.marks.em);
        } else if (name === "underline") {
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

    toggleFontSize(size: FontSize) {

        const command = toggleInlineMark(schema.marks.fontSize, {fontSize: size.size});
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
