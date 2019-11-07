import {Component, Input, OnInit} from "@angular/core";
import {PopoverController} from "@ionic/angular";
import {HtmlEditor} from "./editor";
import {Command} from "./prosemirror/command";
import {indentList, outdentList, toggleList} from "./prosemirror/list-commands";
import {schema} from "./prosemirror/schema";
import {findParentNode} from "prosemirror-utils";

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
    `
})
export class ListMenu implements OnInit {

    constructor(private popoverController: PopoverController) {
    }

    @Input()
    private editor: HtmlEditor;

    activeUnnumberedList: boolean;
    activeNumberedList: boolean;

    level(level: number) {

        const command: Command = level < 0 ? outdentList() : indentList();
        if (command(this.editor.state)) {
            command(this.editor.state, (tr) => this.editor.view.dispatch(tr));
        }

        this.popoverController.dismiss();
    }

    toggleList(type: "bulletList" | "orderedList") {
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
