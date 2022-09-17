import { __awaiter } from "tslib";
import { Component } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { unsubscribe } from "@co.mmons/rxjs-utils";
import { ModalController, Platform, PopoverController } from "@ionic/angular";
import { redo, redoDepth, undo, undoDepth } from "prosemirror-history";
import { findParentNode, findParentNodeOfType } from "prosemirror-utils";
import { AlignmentMenu } from "./alignment-menu";
import { HtmlEditor } from "./editor";
import { HeadingMenu } from "./heading-menu";
import { InsertMenu } from "./insert-menu";
import { LinkModal } from "./link-modal";
import { ListMenu } from "./list-menu";
import { anyMarkActive, isMarkActive } from "./prosemirror/is-active";
import { schema } from "./prosemirror/schema";
import { isBlockMarkActive } from "./prosemirror/utils/selection/is-block-mark-active";
import { TextFormatMenu } from "./text-format-menu";
export class Toolbar {
    constructor(popoverController, platform, editor, eventManager, modalController) {
        this.popoverController = popoverController;
        this.platform = platform;
        this.editor = editor;
        this.eventManager = eventManager;
        this.modalController = modalController;
        this.activeFeatures = {};
    }
    showMenu(event, menu) {
        return __awaiter(this, void 0, void 0, function* () {
            const components = {
                text: TextFormatMenu,
                list: ListMenu,
                alignment: AlignmentMenu,
                insert: InsertMenu,
                heading: HeadingMenu
            };
            const popover = yield this.popoverController.create({
                component: components[menu],
                componentProps: {
                    editor: this.editor
                },
                event: event,
                showBackdrop: this.platform.is("ios")
            });
            popover.present();
        });
    }
    editLink() {
        return __awaiter(this, void 0, void 0, function* () {
            LinkModal.present(this.modalController, this.editor);
        });
    }
    undo() {
        undo(this.editor.view.state, (transaction) => this.editor.view.updateState(this.editor.view.state.apply(transaction)));
        this.editor.focus();
    }
    redo() {
        redo(this.editor.view.state, (transaction) => this.editor.view.updateState(this.editor.view.state.apply(transaction)));
        this.editor.focus();
    }
    editorSelectionChanged() {
        this.canUndo = undoDepth(this.editor.view.state) > 0;
        this.canRedo = redoDepth(this.editor.view.state) > 0;
        this.activeFeatures = {};
        this.activeFeatures.text = anyMarkActive(this.editor.view.state, [schema.marks.strong, schema.marks.em, schema.marks.underline, schema.marks.fontSize]);
        this.activeFeatures.list = !!findParentNode(predicate => predicate.hasMarkup(schema.nodes.orderedList) || predicate.hasMarkup(schema.nodes.bulletList))(this.editor.state.selection);
        this.activeFeatures.alignment = isBlockMarkActive(this.editor.view.state, schema.marks.alignment);
        this.activeFeatures.heading = !!findParentNodeOfType(schema.nodes.heading)(this.editor.state.selection);
        this.activeFeatures.link = isMarkActive(this.editor.view.state, schema.marks.link);
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectionSubscription = this.editor.selectionChange.subscribe(() => this.editorSelectionChanged());
            this.editorSelectionChanged();
        });
    }
    ngOnDestroy() {
        unsubscribe(this.selectionSubscription);
    }
}
Toolbar.decorators = [
    { type: Component, args: [{
                selector: "ionx-html-editor-toolbar",
                template: `
        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.text" (click)="showMenu($event, 'text')">
            <ion-icon name="dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Text" | intlMessage}}</span>
        </ion-button>

        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.alignment" (click)="showMenu($event, 'alignment')" *ngIf="!editor.features || editor.features.alignment">
            <ion-icon name="dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Alignment" | intlMessage}}</span>
        </ion-button>

        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.heading" (click)="showMenu($event, 'heading')" *ngIf="!editor.features || editor.features.heading">
            <ion-icon name="dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Heading" | intlMessage}}</span>
        </ion-button>
        
        <ion-button size="small" fill="clear" [class.active-feature]="activeFeatures.list" (click)="showMenu($event, 'list')" *ngIf="!editor.features || editor.features.list">
            <ion-icon name="dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#listMenu/List" | intlMessage}}</span>
        </ion-button>

        <ion-button size="small" fill="clear" (click)="showMenu($event, 'insert')" *ngIf="!editor.features || editor.features.link || editor.features.multimedia">
            <ion-icon name="dropdown" slot="end"></ion-icon>
            <span>{{"@co.mmons/ionic-extensions/html-editor#Insert" | intlMessage}}</span>
        </ion-button>
        
        <ion-button size="small" fill="clear" class="active-feature" (click)="editLink()" *ngIf="activeFeatures.link">
            <span>{{"@co.mmons/ionic-extensions/html-editor#link/Link" | intlMessage}}</span>
        </ion-button>
        
        <div ionx--buttons-group>
            <ion-button size="small" fill="clear" tabindex="-1" title="{{'@co.mmons/ionic-extensions/html-editor#Undo' | intlMessage}}" [disabled]="!canUndo" (click)="undo()">
                <ion-icon name="assets/html-editor/undo.svg" slot="icon-only"></ion-icon>
            </ion-button>
    
            <ion-button size="small" fill="clear" title="{{'@co.mmons/ionic-extensions/html-editor#Redo' | intlMessage}}" [disabled]="!canRedo" (click)="redo()">
                <ion-icon name="assets/html-editor/redo.svg" slot="icon-only"></ion-icon>
            </ion-button>
        </div>
    `,
                styles: [`
        :host { outline: none; display: flex; justify-content: center; flex-wrap: wrap; position: sticky; position: -webkit-sticky; top: 0px; background-color: var(--background); z-index: 1; }
        :host-context(.ion-focused) { background-color: var(--background-focused); }
        :host ion-button { margin: 0px 4px; --padding-end: 2px; --padding-start: 4px; }
        :host ion-button.active-feature span { font-weight: 800; }
        :host ion-icon[slot="end"] { margin: 0px; }
        :host ion-button[disabled] { opacity: 0.5; }
        :host [ionx--buttons-group] { display: flex; }
        :host [ionx--buttons-group] ion-button:not(:last-child) { margin-right: 0px; }
    `]
            },] }
];
Toolbar.ctorParameters = () => [
    { type: PopoverController },
    { type: Platform },
    { type: HtmlEditor },
    { type: EventManager },
    { type: ModalController }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9odG1sLWVkaXRvci90b29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUUsT0FBTyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxjQUFjLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUV2RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDckYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBdURsRCxNQUFNLE9BQU8sT0FBTztJ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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F1Q1Q7eUJBQ1E7Ozs7Ozs7OztLQVNSO2FBQ0o7OztZQW5Fa0MsaUJBQWlCO1lBQTNCLFFBQVE7WUFLekIsVUFBVTtZQVBWLFlBQVk7WUFFWixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtFdmVudE1hbmFnZXJ9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQge3Vuc3Vic2NyaWJlfSBmcm9tIFwiQGNvLm1tb25zL3J4anMtdXRpbHNcIjtcbmltcG9ydCB7TW9kYWxDb250cm9sbGVyLCBQbGF0Zm9ybSwgUG9wb3ZlckNvbnRyb2xsZXJ9IGZyb20gXCJAaW9uaWMvYW5ndWxhclwiO1xuaW1wb3J0IHtyZWRvLCByZWRvRGVwdGgsIHVuZG8sIHVuZG9EZXB0aH0gZnJvbSBcInByb3NlbWlycm9yLWhpc3RvcnlcIjtcbmltcG9ydCB7ZmluZFBhcmVudE5vZGUsIGZpbmRQYXJlbnROb2RlT2ZUeXBlfSBmcm9tIFwicHJvc2VtaXJyb3ItdXRpbHNcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtBbGlnbm1lbnRNZW51fSBmcm9tIFwiLi9hbGlnbm1lbnQtbWVudVwiO1xuaW1wb3J0IHtIdG1sRWRpdG9yfSBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCB7SGVhZGluZ01lbnV9IGZyb20gXCIuL2hlYWRpbmctbWVudVwiO1xuaW1wb3J0IHtJbnNlcnRNZW51fSBmcm9tIFwiLi9pbnNlcnQtbWVudVwiO1xuaW1wb3J0IHtMaW5rTW9kYWx9IGZyb20gXCIuL2xpbmstbW9kYWxcIjtcbmltcG9ydCB7TGlzdE1lbnV9IGZyb20gXCIuL2xpc3QtbWVudVwiO1xuaW1wb3J0IHthbnlNYXJrQWN0aXZlLCBpc01hcmtBY3RpdmV9IGZyb20gXCIuL3Byb3NlbWlycm9yL2lzLWFjdGl2ZVwiO1xuaW1wb3J0IHtzY2hlbWF9IGZyb20gXCIuL3Byb3NlbWlycm9yL3NjaGVtYVwiO1xuaW1wb3J0IHtpc0Jsb2NrTWFya0FjdGl2ZX0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvdXRpbHMvc2VsZWN0aW9uL2lzLWJsb2NrLW1hcmstYWN0aXZlXCI7XG5pbXBvcnQge1RleHRGb3JtYXRNZW51fSBmcm9tIFwiLi90ZXh0LWZvcm1hdC1tZW51XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImlvbngtaHRtbC1lZGl0b3ItdG9vbGJhclwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIFtjbGFzcy5hY3RpdmUtZmVhdHVyZV09XCJhY3RpdmVGZWF0dXJlcy50ZXh0XCIgKGNsaWNrKT1cInNob3dNZW51KCRldmVudCwgJ3RleHQnKVwiPlxuICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJkcm9wZG93blwiIHNsb3Q9XCJlbmRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPHNwYW4+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI1RleHRcIiB8IGludGxNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cblxuICAgICAgICA8aW9uLWJ1dHRvbiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiBbY2xhc3MuYWN0aXZlLWZlYXR1cmVdPVwiYWN0aXZlRmVhdHVyZXMuYWxpZ25tZW50XCIgKGNsaWNrKT1cInNob3dNZW51KCRldmVudCwgJ2FsaWdubWVudCcpXCIgKm5nSWY9XCIhZWRpdG9yLmZlYXR1cmVzIHx8IGVkaXRvci5mZWF0dXJlcy5hbGlnbm1lbnRcIj5cbiAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiZHJvcGRvd25cIiBzbG90PVwiZW5kXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDxzcGFuPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNBbGlnbm1lbnRcIiB8IGludGxNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cblxuICAgICAgICA8aW9uLWJ1dHRvbiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiBbY2xhc3MuYWN0aXZlLWZlYXR1cmVdPVwiYWN0aXZlRmVhdHVyZXMuaGVhZGluZ1wiIChjbGljayk9XCJzaG93TWVudSgkZXZlbnQsICdoZWFkaW5nJylcIiAqbmdJZj1cIiFlZGl0b3IuZmVhdHVyZXMgfHwgZWRpdG9yLmZlYXR1cmVzLmhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiZHJvcGRvd25cIiBzbG90PVwiZW5kXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDxzcGFuPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNIZWFkaW5nXCIgfCBpbnRsTWVzc2FnZX19PC9zcGFuPlxuICAgICAgICA8L2lvbi1idXR0b24+XG4gICAgICAgIFxuICAgICAgICA8aW9uLWJ1dHRvbiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiBbY2xhc3MuYWN0aXZlLWZlYXR1cmVdPVwiYWN0aXZlRmVhdHVyZXMubGlzdFwiIChjbGljayk9XCJzaG93TWVudSgkZXZlbnQsICdsaXN0JylcIiAqbmdJZj1cIiFlZGl0b3IuZmVhdHVyZXMgfHwgZWRpdG9yLmZlYXR1cmVzLmxpc3RcIj5cbiAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiZHJvcGRvd25cIiBzbG90PVwiZW5kXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDxzcGFuPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaXN0TWVudS9MaXN0XCIgfCBpbnRsTWVzc2FnZX19PC9zcGFuPlxuICAgICAgICA8L2lvbi1idXR0b24+XG5cbiAgICAgICAgPGlvbi1idXR0b24gc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCIgKGNsaWNrKT1cInNob3dNZW51KCRldmVudCwgJ2luc2VydCcpXCIgKm5nSWY9XCIhZWRpdG9yLmZlYXR1cmVzIHx8IGVkaXRvci5mZWF0dXJlcy5saW5rIHx8IGVkaXRvci5mZWF0dXJlcy5tdWx0aW1lZGlhXCI+XG4gICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImRyb3Bkb3duXCIgc2xvdD1cImVuZFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8c3Bhbj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjSW5zZXJ0XCIgfCBpbnRsTWVzc2FnZX19PC9zcGFuPlxuICAgICAgICA8L2lvbi1idXR0b24+XG4gICAgICAgIFxuICAgICAgICA8aW9uLWJ1dHRvbiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiBjbGFzcz1cImFjdGl2ZS1mZWF0dXJlXCIgKGNsaWNrKT1cImVkaXRMaW5rKClcIiAqbmdJZj1cImFjdGl2ZUZlYXR1cmVzLmxpbmtcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNsaW5rL0xpbmtcIiB8IGludGxNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgaW9ueC0tYnV0dG9ucy1ncm91cD5cbiAgICAgICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIHRhYmluZGV4PVwiLTFcIiB0aXRsZT1cInt7J0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI1VuZG8nIHwgaW50bE1lc3NhZ2V9fVwiIFtkaXNhYmxlZF09XCIhY2FuVW5kb1wiIChjbGljayk9XCJ1bmRvKClcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImFzc2V0cy9odG1sLWVkaXRvci91bmRvLnN2Z1wiIHNsb3Q9XCJpY29uLW9ubHlcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24tYnV0dG9uPlxuICAgIFxuICAgICAgICAgICAgPGlvbi1idXR0b24gc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCIgdGl0bGU9XCJ7eydAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNSZWRvJyB8IGludGxNZXNzYWdlfX1cIiBbZGlzYWJsZWRdPVwiIWNhblJlZG9cIiAoY2xpY2spPVwicmVkbygpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJhc3NldHMvaHRtbC1lZGl0b3IvcmVkby5zdmdcIiBzbG90PVwiaWNvbi1vbmx5XCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHsgb3V0bGluZTogbm9uZTsgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGZsZXgtd3JhcDogd3JhcDsgcG9zaXRpb246IHN0aWNreTsgcG9zaXRpb246IC13ZWJraXQtc3RpY2t5OyB0b3A6IDBweDsgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZCk7IHotaW5kZXg6IDE7IH1cbiAgICAgICAgOmhvc3QtY29udGV4dCguaW9uLWZvY3VzZWQpIHsgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1mb2N1c2VkKTsgfVxuICAgICAgICA6aG9zdCBpb24tYnV0dG9uIHsgbWFyZ2luOiAwcHggNHB4OyAtLXBhZGRpbmctZW5kOiAycHg7IC0tcGFkZGluZy1zdGFydDogNHB4OyB9XG4gICAgICAgIDpob3N0IGlvbi1idXR0b24uYWN0aXZlLWZlYXR1cmUgc3BhbiB7IGZvbnQtd2VpZ2h0OiA4MDA7IH1cbiAgICAgICAgOmhvc3QgaW9uLWljb25bc2xvdD1cImVuZFwiXSB7IG1hcmdpbjogMHB4OyB9XG4gICAgICAgIDpob3N0IGlvbi1idXR0b25bZGlzYWJsZWRdIHsgb3BhY2l0eTogMC41OyB9XG4gICAgICAgIDpob3N0IFtpb254LS1idXR0b25zLWdyb3VwXSB7IGRpc3BsYXk6IGZsZXg7IH1cbiAgICAgICAgOmhvc3QgW2lvbngtLWJ1dHRvbnMtZ3JvdXBdIGlvbi1idXR0b246bm90KDpsYXN0LWNoaWxkKSB7IG1hcmdpbi1yaWdodDogMHB4OyB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBvcG92ZXJDb250cm9sbGVyOiBQb3BvdmVyQ29udHJvbGxlcixcbiAgICAgICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBlZGl0b3I6IEh0bWxFZGl0b3IsXG4gICAgICAgIHByb3RlY3RlZCBldmVudE1hbmFnZXI6IEV2ZW50TWFuYWdlcixcbiAgICAgICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlclxuICAgICkge1xuXG4gICAgfVxuXG4gICAgYXN5bmMgc2hvd01lbnUoZXZlbnQ6IEV2ZW50LCBtZW51OiBzdHJpbmcpIHtcblxuICAgICAgICBjb25zdCBjb21wb25lbnRzID0ge1xuICAgICAgICAgICAgdGV4dDogVGV4dEZvcm1hdE1lbnUsXG4gICAgICAgICAgICBsaXN0OiBMaXN0TWVudSxcbiAgICAgICAgICAgIGFsaWdubWVudDogQWxpZ25tZW50TWVudSxcbiAgICAgICAgICAgIGluc2VydDogSW5zZXJ0TWVudSxcbiAgICAgICAgICAgIGhlYWRpbmc6IEhlYWRpbmdNZW51XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcG9wb3ZlciA9IGF3YWl0IHRoaXMucG9wb3ZlckNvbnRyb2xsZXIuY3JlYXRlKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogY29tcG9uZW50c1ttZW51XSxcbiAgICAgICAgICAgIGNvbXBvbmVudFByb3BzOiB7XG4gICAgICAgICAgICAgICAgZWRpdG9yOiB0aGlzLmVkaXRvclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHNob3dCYWNrZHJvcDogdGhpcy5wbGF0Zm9ybS5pcyhcImlvc1wiKVxuICAgICAgICB9KTtcblxuICAgICAgICBwb3BvdmVyLnByZXNlbnQoKTtcbiAgICB9XG5cbiAgICBhY3RpdmVGZWF0dXJlczoge1xuICAgICAgICBsaW5rPzogYm9vbGVhbixcbiAgICAgICAgdGV4dD86IGJvb2xlYW4sXG4gICAgICAgIGFsaWdubWVudD86IGJvb2xlYW4sXG4gICAgICAgIGhlYWRpbmc/OiBib29sZWFuO1xuICAgICAgICBsaXN0PzogYm9vbGVhblxuICAgIH0gPSB7fTtcblxuICAgIGFzeW5jIGVkaXRMaW5rKCkge1xuICAgICAgICBMaW5rTW9kYWwucHJlc2VudCh0aGlzLm1vZGFsQ29udHJvbGxlciwgdGhpcy5lZGl0b3IpO1xuICAgIH1cblxuICAgIGNhblVuZG86IGJvb2xlYW47XG5cbiAgICBjYW5SZWRvOiBib29sZWFuO1xuXG4gICAgdW5kbygpIHtcbiAgICAgICAgdW5kbyh0aGlzLmVkaXRvci52aWV3LnN0YXRlLCAodHJhbnNhY3Rpb24pID0+IHRoaXMuZWRpdG9yLnZpZXcudXBkYXRlU3RhdGUodGhpcy5lZGl0b3Iudmlldy5zdGF0ZS5hcHBseSh0cmFuc2FjdGlvbikpKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZWRvKCkge1xuICAgICAgICByZWRvKHRoaXMuZWRpdG9yLnZpZXcuc3RhdGUsICh0cmFuc2FjdGlvbikgPT4gdGhpcy5lZGl0b3Iudmlldy51cGRhdGVTdGF0ZSh0aGlzLmVkaXRvci52aWV3LnN0YXRlLmFwcGx5KHRyYW5zYWN0aW9uKSkpO1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlZGl0b3JTZWxlY3Rpb25DaGFuZ2VkKCkge1xuXG4gICAgICAgIHRoaXMuY2FuVW5kbyA9IHVuZG9EZXB0aCh0aGlzLmVkaXRvci52aWV3LnN0YXRlKSA+IDA7XG4gICAgICAgIHRoaXMuY2FuUmVkbyA9IHJlZG9EZXB0aCh0aGlzLmVkaXRvci52aWV3LnN0YXRlKSA+IDA7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGZWF0dXJlcyA9IHt9O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlRmVhdHVyZXMudGV4dCA9IGFueU1hcmtBY3RpdmUodGhpcy5lZGl0b3Iudmlldy5zdGF0ZSwgW3NjaGVtYS5tYXJrcy5zdHJvbmcsIHNjaGVtYS5tYXJrcy5lbSwgc2NoZW1hLm1hcmtzLnVuZGVybGluZSwgc2NoZW1hLm1hcmtzLmZvbnRTaXplXSk7XG4gICAgICAgIHRoaXMuYWN0aXZlRmVhdHVyZXMubGlzdCA9ICEhZmluZFBhcmVudE5vZGUocHJlZGljYXRlID0+IHByZWRpY2F0ZS5oYXNNYXJrdXAoc2NoZW1hLm5vZGVzLm9yZGVyZWRMaXN0KSB8fCBwcmVkaWNhdGUuaGFzTWFya3VwKHNjaGVtYS5ub2Rlcy5idWxsZXRMaXN0KSkodGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy5hY3RpdmVGZWF0dXJlcy5hbGlnbm1lbnQgPSBpc0Jsb2NrTWFya0FjdGl2ZSh0aGlzLmVkaXRvci52aWV3LnN0YXRlLCBzY2hlbWEubWFya3MuYWxpZ25tZW50KTtcbiAgICAgICAgdGhpcy5hY3RpdmVGZWF0dXJlcy5oZWFkaW5nID0gISFmaW5kUGFyZW50Tm9kZU9mVHlwZShzY2hlbWEubm9kZXMuaGVhZGluZykodGhpcy5lZGl0b3Iuc3RhdGUuc2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy5hY3RpdmVGZWF0dXJlcy5saW5rID0gaXNNYXJrQWN0aXZlKHRoaXMuZWRpdG9yLnZpZXcuc3RhdGUsIHNjaGVtYS5tYXJrcy5saW5rKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgYXN5bmMgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25TdWJzY3JpcHRpb24gPSB0aGlzLmVkaXRvci5zZWxlY3Rpb25DaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuZWRpdG9yU2VsZWN0aW9uQ2hhbmdlZCgpKTtcblxuICAgICAgICB0aGlzLmVkaXRvclNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdW5zdWJzY3JpYmUodGhpcy5zZWxlY3Rpb25TdWJzY3JpcHRpb24pO1xuICAgIH1cblxufVxuIl19