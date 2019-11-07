import {Component, OnDestroy, OnInit} from "@angular/core";
import {EventManager} from "@angular/platform-browser";
import {unsubscribe} from "@co.mmons/rxjs-utils";
import {ModalController, Platform, PopoverController} from "@ionic/angular";
import {redo, redoDepth, undo, undoDepth} from "prosemirror-history";
import {findParentNode, findParentNodeOfType} from "prosemirror-utils";
import {Subscription} from "rxjs";
import {AlignmentMenu} from "./alignment-menu";
import {HtmlEditor} from "./editor";
import {HeadingMenu} from "./heading-menu";
import {InsertMenu} from "./insert-menu";
import {LinkModal} from "./link-modal";
import {ListMenu} from "./list-menu";
import {anyMarkActive, isMarkActive} from "./prosemirror/is-active";
import {schema} from "./prosemirror/schema";
import {isBlockMarkActive} from "./prosemirror/utils/selection/is-block-mark-active";
import {TextFormatMenu} from "./text-format-menu";

@Component({
    selector: "ionx-html-editor-toolbar",
    template: `
        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.text" (click)="showMenu($event, 'text')">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Text" | intlMessage}}</span>
        </ion-button>

        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.alignment" (click)="showMenu($event, 'alignment')" *ngIf="!editor.features || editor.features.alignment">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Alignment" | intlMessage}}</span>
        </ion-button>

        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.heading" (click)="showMenu($event, 'heading')" *ngIf="!editor.features || editor.features.heading">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}}</span>
        </ion-button>
        
        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.list" (click)="showMenu($event, 'list')" *ngIf="!editor.features || editor.features.list">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#listMenu/List" | intlMessage}}</span>
        </ion-button>

        <ion-button size="small" fill="clear" (click)="showMenu($event, 'insert')" *ngIf="!editor.features || editor.features.link || editor.features.multimedia">
            <ion-icon name="md-arrow-dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Insert" | intlMessage}}</span>
        </ion-button>
        
        <ion-button size="small" fill="clear" class="active-feature" (click)="editLink()" *ngIf="activeFeatures.link">
            <span>{{"@co.mmons/ionic-extensions/html-editor#link/Link" | intlMessage}}</span>
        </ion-button>
        
        <div ionx--buttons-group>
            <ion-button size="small" fill="clear" tabindex="-1" title="{{'@co.mmons/ionic-extensions/html-editor#Undo' | intlMessage}}" [disabled]="!canUndo" (click)="undo()">
                <ion-icon name="undo" slot="icon-only"></ion-icon>
            </ion-button>
    
            <ion-button size="small" fill="clear" title="{{'@co.mmons/ionic-extensions/html-editor#Redo' | intlMessage}}" [disabled]="!canRedo" (click)="redo()">
                <ion-icon name="redo" slot="icon-only"></ion-icon>
            </ion-button>
        </div>
    `,
    styles: [`
        :host { outline: none; display: flex; justify-content: center; flex-wrap: wrap; position: sticky; position: -webkit-sticky; top: 0px; background-color: var(--background); }
        :host-context(.ion-focused) { background-color: var(--background-focused); }
        :host ion-button { margin: 0px 4px; --padding-end: 2px; --padding-start: 4px; }
        :host ion-button.active-feature span { font-weight: 800; }
        :host ion-icon[slot="end"] { margin: 0px; }
        :host ion-button[disabled] { opacity: 0.5; }
        :host [ionx--buttons-group] { display: flex; }
        :host [ionx--buttons-group] ion-button:not(:last-child) { margin-right: 0px; }
    `]
})
export class Toolbar implements OnInit, OnDestroy {

    constructor(
        private popoverController: PopoverController,
        private platform: Platform,
        public readonly editor: HtmlEditor,
        protected eventManager: EventManager,
        private modalController: ModalController
    ) {

    }

    async showMenu(event: Event, menu: string) {

        const components = {
            text: TextFormatMenu,
            list: ListMenu,
            alignment: AlignmentMenu,
            insert: InsertMenu,
            heading: HeadingMenu
        };

        const popover = await this.popoverController.create({
            component: components[menu],
            componentProps: {
                editor: this.editor
            },
            event: event,
            showBackdrop: this.platform.is("ios")
        });

        popover.present();
    }

    activeFeatures: {
        link?: boolean,
        text?: boolean,
        alignment?: boolean,
        heading?: boolean;
        list?: boolean
    } = {};

    async editLink() {
        LinkModal.present(this.modalController, this.editor);
    }

    canUndo: boolean;

    canRedo: boolean;

    undo() {
        undo(this.editor.view.state, (transaction) => this.editor.view.updateState(this.editor.view.state.apply(transaction)));
        this.editor.focus();
    }

    redo() {
        redo(this.editor.view.state, (transaction) => this.editor.view.updateState(this.editor.view.state.apply(transaction)));
        this.editor.focus();

    }

    private editorSelectionChanged() {

        this.canUndo = undoDepth(this.editor.view.state) > 0;
        this.canRedo = redoDepth(this.editor.view.state) > 0;

        this.activeFeatures = {};

        this.activeFeatures.text = anyMarkActive(this.editor.view.state, [schema.marks.strong, schema.marks.em, schema.marks.underline, schema.marks.fontSize]);
        this.activeFeatures.list = !!findParentNode(predicate => predicate.hasMarkup(schema.nodes.orderedList) || predicate.hasMarkup(schema.nodes.bulletList))(this.editor.state.selection);
        this.activeFeatures.alignment = isBlockMarkActive(this.editor.view.state, schema.marks.alignment);
        this.activeFeatures.heading = !!findParentNodeOfType(schema.nodes.heading)(this.editor.state.selection);
        this.activeFeatures.link = isMarkActive(this.editor.view.state, schema.marks.link);
    }

    private selectionSubscription: Subscription;

    async ngOnInit() {

        this.selectionSubscription = this.editor.selectionChange.subscribe(() => this.editorSelectionChanged());

        this.editorSelectionChanged();
    }

    ngOnDestroy() {
        unsubscribe(this.selectionSubscription);
    }

}
