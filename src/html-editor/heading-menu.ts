import {Component, Input, OnInit} from "@angular/core";
import {PopoverController} from "@ionic/angular";
import {HtmlEditor} from "./editor";
import {schema} from "./prosemirror/schema";
import {setBlockType} from "prosemirror-commands";
import {findParentNodeOfType} from "prosemirror-utils";

@Component({
    styles: [
        `:host ion-list { margin: 0px; padding: 0px }`,
        `:host ion-item:last-child { --border-width: 0px; }`,
    ],
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
    `
})
export class HeadingMenu implements OnInit {

    constructor(private popoverController: PopoverController) {
    }

    activeHeading: number;

    @Input()
    editor: HtmlEditor;


    toggleHeading(heading: number) {

        if (heading > 0 && this.activeHeading !== heading) {

            const command = setBlockType(schema.nodes.heading, {level: heading});
            if (command(this.editor.state)) {
                command(this.editor.state, (tr) => {
                    this.editor.view.dispatch(tr);
                });
            }

        } else {
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
