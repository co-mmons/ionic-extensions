import { __awaiter, __decorate } from "tslib";
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
let Toolbar = class Toolbar {
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
};
Toolbar.ctorParameters = () => [
    { type: PopoverController },
    { type: Platform },
    { type: HtmlEditor },
    { type: EventManager },
    { type: ModalController }
];
Toolbar = __decorate([
    Component({
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
    })
], Toolbar);
export { Toolbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsidG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsY0FBYyxFQUFFLG9CQUFvQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFdkUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQXVE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QUFVO1lBQ1YsWUFBWTtZQUNYLGVBQWU7O0FBUG5DLE9BQU87SUFyRG5CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F1Q1Q7aUJBQ1E7Ozs7Ozs7OztLQVNSO0tBQ0osQ0FBQztHQUNXLE9BQU8sQ0F3Rm5CO1NBeEZZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7dW5zdWJzY3JpYmV9IGZyb20gXCJAY28ubW1vbnMvcnhqcy11dGlsc1wiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXIsIFBsYXRmb3JtLCBQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3JlZG8sIHJlZG9EZXB0aCwgdW5kbywgdW5kb0RlcHRofSBmcm9tIFwicHJvc2VtaXJyb3ItaGlzdG9yeVwiO1xuaW1wb3J0IHtmaW5kUGFyZW50Tm9kZSwgZmluZFBhcmVudE5vZGVPZlR5cGV9IGZyb20gXCJwcm9zZW1pcnJvci11dGlsc1wiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0FsaWdubWVudE1lbnV9IGZyb20gXCIuL2FsaWdubWVudC1tZW51XCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtIZWFkaW5nTWVudX0gZnJvbSBcIi4vaGVhZGluZy1tZW51XCI7XG5pbXBvcnQge0luc2VydE1lbnV9IGZyb20gXCIuL2luc2VydC1tZW51XCI7XG5pbXBvcnQge0xpbmtNb2RhbH0gZnJvbSBcIi4vbGluay1tb2RhbFwiO1xuaW1wb3J0IHtMaXN0TWVudX0gZnJvbSBcIi4vbGlzdC1tZW51XCI7XG5pbXBvcnQge2FueU1hcmtBY3RpdmUsIGlzTWFya0FjdGl2ZX0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvaXMtYWN0aXZlXCI7XG5pbXBvcnQge3NjaGVtYX0gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivc2NoZW1hXCI7XG5pbXBvcnQge2lzQmxvY2tNYXJrQWN0aXZlfSBmcm9tIFwiLi9wcm9zZW1pcnJvci91dGlscy9zZWxlY3Rpb24vaXMtYmxvY2stbWFyay1hY3RpdmVcIjtcbmltcG9ydCB7VGV4dEZvcm1hdE1lbnV9IGZyb20gXCIuL3RleHQtZm9ybWF0LW1lbnVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1odG1sLWVkaXRvci10b29sYmFyXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbi1idXR0b24gc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCIgW2NsYXNzLmFjdGl2ZS1mZWF0dXJlXT1cImFjdGl2ZUZlYXR1cmVzLnRleHRcIiAoY2xpY2spPVwic2hvd01lbnUoJGV2ZW50LCAndGV4dCcpXCI+XG4gICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImRyb3Bkb3duXCIgc2xvdD1cImVuZFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8c3Bhbj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjVGV4dFwiIHwgaW50bE1lc3NhZ2V9fTwvc3Bhbj5cbiAgICAgICAgPC9pb24tYnV0dG9uPlxuXG4gICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIFtjbGFzcy5hY3RpdmUtZmVhdHVyZV09XCJhY3RpdmVGZWF0dXJlcy5hbGlnbm1lbnRcIiAoY2xpY2spPVwic2hvd01lbnUoJGV2ZW50LCAnYWxpZ25tZW50JylcIiAqbmdJZj1cIiFlZGl0b3IuZmVhdHVyZXMgfHwgZWRpdG9yLmZlYXR1cmVzLmFsaWdubWVudFwiPlxuICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJkcm9wZG93blwiIHNsb3Q9XCJlbmRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPHNwYW4+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI0FsaWdubWVudFwiIHwgaW50bE1lc3NhZ2V9fTwvc3Bhbj5cbiAgICAgICAgPC9pb24tYnV0dG9uPlxuXG4gICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIFtjbGFzcy5hY3RpdmUtZmVhdHVyZV09XCJhY3RpdmVGZWF0dXJlcy5oZWFkaW5nXCIgKGNsaWNrKT1cInNob3dNZW51KCRldmVudCwgJ2hlYWRpbmcnKVwiICpuZ0lmPVwiIWVkaXRvci5mZWF0dXJlcyB8fCBlZGl0b3IuZmVhdHVyZXMuaGVhZGluZ1wiPlxuICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJkcm9wZG93blwiIHNsb3Q9XCJlbmRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPHNwYW4+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI0hlYWRpbmdcIiB8IGludGxNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgXG4gICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIFtjbGFzcy5hY3RpdmUtZmVhdHVyZV09XCJhY3RpdmVGZWF0dXJlcy5saXN0XCIgKGNsaWNrKT1cInNob3dNZW51KCRldmVudCwgJ2xpc3QnKVwiICpuZ0lmPVwiIWVkaXRvci5mZWF0dXJlcyB8fCBlZGl0b3IuZmVhdHVyZXMubGlzdFwiPlxuICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJkcm9wZG93blwiIHNsb3Q9XCJlbmRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPHNwYW4+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpc3RNZW51L0xpc3RcIiB8IGludGxNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cblxuICAgICAgICA8aW9uLWJ1dHRvbiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiAoY2xpY2spPVwic2hvd01lbnUoJGV2ZW50LCAnaW5zZXJ0JylcIiAqbmdJZj1cIiFlZGl0b3IuZmVhdHVyZXMgfHwgZWRpdG9yLmZlYXR1cmVzLmxpbmsgfHwgZWRpdG9yLmZlYXR1cmVzLm11bHRpbWVkaWFcIj5cbiAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiZHJvcGRvd25cIiBzbG90PVwiZW5kXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDxzcGFuPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNJbnNlcnRcIiB8IGludGxNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgXG4gICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIGNsYXNzPVwiYWN0aXZlLWZlYXR1cmVcIiAoY2xpY2spPVwiZWRpdExpbmsoKVwiICpuZ0lmPVwiYWN0aXZlRmVhdHVyZXMubGlua1wiPlxuICAgICAgICAgICAgPHNwYW4+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpbmsvTGlua1wiIHwgaW50bE1lc3NhZ2V9fTwvc3Bhbj5cbiAgICAgICAgPC9pb24tYnV0dG9uPlxuICAgICAgICBcbiAgICAgICAgPGRpdiBpb254LS1idXR0b25zLWdyb3VwPlxuICAgICAgICAgICAgPGlvbi1idXR0b24gc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCIgdGFiaW5kZXg9XCItMVwiIHRpdGxlPVwie3snQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjVW5kbycgfCBpbnRsTWVzc2FnZX19XCIgW2Rpc2FibGVkXT1cIiFjYW5VbmRvXCIgKGNsaWNrKT1cInVuZG8oKVwiPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwiYXNzZXRzL2h0bWwtZWRpdG9yL3VuZG8uc3ZnXCIgc2xvdD1cImljb24tb25seVwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8L2lvbi1idXR0b24+XG4gICAgXG4gICAgICAgICAgICA8aW9uLWJ1dHRvbiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiB0aXRsZT1cInt7J0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI1JlZG8nIHwgaW50bE1lc3NhZ2V9fVwiIFtkaXNhYmxlZF09XCIhY2FuUmVkb1wiIChjbGljayk9XCJyZWRvKClcIj5cbiAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cImFzc2V0cy9odG1sLWVkaXRvci9yZWRvLnN2Z1wiIHNsb3Q9XCJpY29uLW9ubHlcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24tYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgOmhvc3QgeyBvdXRsaW5lOiBub25lOyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgZmxleC13cmFwOiB3cmFwOyBwb3NpdGlvbjogc3RpY2t5OyBwb3NpdGlvbjogLXdlYmtpdC1zdGlja3k7IHRvcDogMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kKTsgei1pbmRleDogMTsgfVxuICAgICAgICA6aG9zdC1jb250ZXh0KC5pb24tZm9jdXNlZCkgeyBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWZvY3VzZWQpOyB9XG4gICAgICAgIDpob3N0IGlvbi1idXR0b24geyBtYXJnaW46IDBweCA0cHg7IC0tcGFkZGluZy1lbmQ6IDJweDsgLS1wYWRkaW5nLXN0YXJ0OiA0cHg7IH1cbiAgICAgICAgOmhvc3QgaW9uLWJ1dHRvbi5hY3RpdmUtZmVhdHVyZSBzcGFuIHsgZm9udC13ZWlnaHQ6IDgwMDsgfVxuICAgICAgICA6aG9zdCBpb24taWNvbltzbG90PVwiZW5kXCJdIHsgbWFyZ2luOiAwcHg7IH1cbiAgICAgICAgOmhvc3QgaW9uLWJ1dHRvbltkaXNhYmxlZF0geyBvcGFjaXR5OiAwLjU7IH1cbiAgICAgICAgOmhvc3QgW2lvbngtLWJ1dHRvbnMtZ3JvdXBdIHsgZGlzcGxheTogZmxleDsgfVxuICAgICAgICA6aG9zdCBbaW9ueC0tYnV0dG9ucy1ncm91cF0gaW9uLWJ1dHRvbjpub3QoOmxhc3QtY2hpbGQpIHsgbWFyZ2luLXJpZ2h0OiAwcHg7IH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBUb29sYmFyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcG9wb3ZlckNvbnRyb2xsZXI6IFBvcG92ZXJDb250cm9sbGVyLFxuICAgICAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGVkaXRvcjogSHRtbEVkaXRvcixcbiAgICAgICAgcHJvdGVjdGVkIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyLFxuICAgICAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBhc3luYyBzaG93TWVudShldmVudDogRXZlbnQsIG1lbnU6IHN0cmluZykge1xuXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSB7XG4gICAgICAgICAgICB0ZXh0OiBUZXh0Rm9ybWF0TWVudSxcbiAgICAgICAgICAgIGxpc3Q6IExpc3RNZW51LFxuICAgICAgICAgICAgYWxpZ25tZW50OiBBbGlnbm1lbnRNZW51LFxuICAgICAgICAgICAgaW5zZXJ0OiBJbnNlcnRNZW51LFxuICAgICAgICAgICAgaGVhZGluZzogSGVhZGluZ01lbnVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBwb3BvdmVyID0gYXdhaXQgdGhpcy5wb3BvdmVyQ29udHJvbGxlci5jcmVhdGUoe1xuICAgICAgICAgICAgY29tcG9uZW50OiBjb21wb25lbnRzW21lbnVdLFxuICAgICAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcbiAgICAgICAgICAgICAgICBlZGl0b3I6IHRoaXMuZWRpdG9yXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgc2hvd0JhY2tkcm9wOiB0aGlzLnBsYXRmb3JtLmlzKFwiaW9zXCIpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBvcG92ZXIucHJlc2VudCgpO1xuICAgIH1cblxuICAgIGFjdGl2ZUZlYXR1cmVzOiB7XG4gICAgICAgIGxpbms/OiBib29sZWFuLFxuICAgICAgICB0ZXh0PzogYm9vbGVhbixcbiAgICAgICAgYWxpZ25tZW50PzogYm9vbGVhbixcbiAgICAgICAgaGVhZGluZz86IGJvb2xlYW47XG4gICAgICAgIGxpc3Q/OiBib29sZWFuXG4gICAgfSA9IHt9O1xuXG4gICAgYXN5bmMgZWRpdExpbmsoKSB7XG4gICAgICAgIExpbmtNb2RhbC5wcmVzZW50KHRoaXMubW9kYWxDb250cm9sbGVyLCB0aGlzLmVkaXRvcik7XG4gICAgfVxuXG4gICAgY2FuVW5kbzogYm9vbGVhbjtcblxuICAgIGNhblJlZG86IGJvb2xlYW47XG5cbiAgICB1bmRvKCkge1xuICAgICAgICB1bmRvKHRoaXMuZWRpdG9yLnZpZXcuc3RhdGUsICh0cmFuc2FjdGlvbikgPT4gdGhpcy5lZGl0b3Iudmlldy51cGRhdGVTdGF0ZSh0aGlzLmVkaXRvci52aWV3LnN0YXRlLmFwcGx5KHRyYW5zYWN0aW9uKSkpO1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cblxuICAgIHJlZG8oKSB7XG4gICAgICAgIHJlZG8odGhpcy5lZGl0b3Iudmlldy5zdGF0ZSwgKHRyYW5zYWN0aW9uKSA9PiB0aGlzLmVkaXRvci52aWV3LnVwZGF0ZVN0YXRlKHRoaXMuZWRpdG9yLnZpZXcuc3RhdGUuYXBwbHkodHJhbnNhY3Rpb24pKSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGVkaXRvclNlbGVjdGlvbkNoYW5nZWQoKSB7XG5cbiAgICAgICAgdGhpcy5jYW5VbmRvID0gdW5kb0RlcHRoKHRoaXMuZWRpdG9yLnZpZXcuc3RhdGUpID4gMDtcbiAgICAgICAgdGhpcy5jYW5SZWRvID0gcmVkb0RlcHRoKHRoaXMuZWRpdG9yLnZpZXcuc3RhdGUpID4gMDtcblxuICAgICAgICB0aGlzLmFjdGl2ZUZlYXR1cmVzID0ge307XG5cbiAgICAgICAgdGhpcy5hY3RpdmVGZWF0dXJlcy50ZXh0ID0gYW55TWFya0FjdGl2ZSh0aGlzLmVkaXRvci52aWV3LnN0YXRlLCBbc2NoZW1hLm1hcmtzLnN0cm9uZywgc2NoZW1hLm1hcmtzLmVtLCBzY2hlbWEubWFya3MudW5kZXJsaW5lLCBzY2hlbWEubWFya3MuZm9udFNpemVdKTtcbiAgICAgICAgdGhpcy5hY3RpdmVGZWF0dXJlcy5saXN0ID0gISFmaW5kUGFyZW50Tm9kZShwcmVkaWNhdGUgPT4gcHJlZGljYXRlLmhhc01hcmt1cChzY2hlbWEubm9kZXMub3JkZXJlZExpc3QpIHx8IHByZWRpY2F0ZS5oYXNNYXJrdXAoc2NoZW1hLm5vZGVzLmJ1bGxldExpc3QpKSh0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLmFjdGl2ZUZlYXR1cmVzLmFsaWdubWVudCA9IGlzQmxvY2tNYXJrQWN0aXZlKHRoaXMuZWRpdG9yLnZpZXcuc3RhdGUsIHNjaGVtYS5tYXJrcy5hbGlnbm1lbnQpO1xuICAgICAgICB0aGlzLmFjdGl2ZUZlYXR1cmVzLmhlYWRpbmcgPSAhIWZpbmRQYXJlbnROb2RlT2ZUeXBlKHNjaGVtYS5ub2Rlcy5oZWFkaW5nKSh0aGlzLmVkaXRvci5zdGF0ZS5zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLmFjdGl2ZUZlYXR1cmVzLmxpbmsgPSBpc01hcmtBY3RpdmUodGhpcy5lZGl0b3Iudmlldy5zdGF0ZSwgc2NoZW1hLm1hcmtzLmxpbmspO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VsZWN0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBhc3luYyBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuZWRpdG9yLnNlbGVjdGlvbkNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5lZGl0b3JTZWxlY3Rpb25DaGFuZ2VkKCkpO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yU2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB1bnN1YnNjcmliZSh0aGlzLnNlbGVjdGlvblN1YnNjcmlwdGlvbik7XG4gICAgfVxuXG59XG4iXX0=