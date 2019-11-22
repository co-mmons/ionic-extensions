import * as tslib_1 from "tslib";
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
Toolbar = tslib_1.__decorate([
    Component({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yLyIsInNvdXJjZXMiOlsidG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsY0FBYyxFQUFFLG9CQUFvQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFdkUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQXVE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QUFVO1lBQ1YsWUFBWTtZQUNYLGVBQWU7O0FBUG5DLE9BQU87SUFyRG5CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSwwQkFBMEI7UUFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F1Q1Q7aUJBQ1E7Ozs7Ozs7OztLQVNSO0tBQ0osQ0FBQztHQUNXLE9BQU8sQ0F3Rm5CO1NBeEZZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIjtcbmltcG9ydCB7dW5zdWJzY3JpYmV9IGZyb20gXCJAY28ubW1vbnMvcnhqcy11dGlsc1wiO1xuaW1wb3J0IHtNb2RhbENvbnRyb2xsZXIsIFBsYXRmb3JtLCBQb3BvdmVyQ29udHJvbGxlcn0gZnJvbSBcIkBpb25pYy9hbmd1bGFyXCI7XG5pbXBvcnQge3JlZG8sIHJlZG9EZXB0aCwgdW5kbywgdW5kb0RlcHRofSBmcm9tIFwicHJvc2VtaXJyb3ItaGlzdG9yeVwiO1xuaW1wb3J0IHtmaW5kUGFyZW50Tm9kZSwgZmluZFBhcmVudE5vZGVPZlR5cGV9IGZyb20gXCJwcm9zZW1pcnJvci11dGlsc1wiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0FsaWdubWVudE1lbnV9IGZyb20gXCIuL2FsaWdubWVudC1tZW51XCI7XG5pbXBvcnQge0h0bWxFZGl0b3J9IGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHtIZWFkaW5nTWVudX0gZnJvbSBcIi4vaGVhZGluZy1tZW51XCI7XG5pbXBvcnQge0luc2VydE1lbnV9IGZyb20gXCIuL2luc2VydC1tZW51XCI7XG5pbXBvcnQge0xpbmtNb2RhbH0gZnJvbSBcIi4vbGluay1tb2RhbFwiO1xuaW1wb3J0IHtMaXN0TWVudX0gZnJvbSBcIi4vbGlzdC1tZW51XCI7XG5pbXBvcnQge2FueU1hcmtBY3RpdmUsIGlzTWFya0FjdGl2ZX0gZnJvbSBcIi4vcHJvc2VtaXJyb3IvaXMtYWN0aXZlXCI7XG5pbXBvcnQge3NjaGVtYX0gZnJvbSBcIi4vcHJvc2VtaXJyb3Ivc2NoZW1hXCI7XG5pbXBvcnQge2lzQmxvY2tNYXJrQWN0aXZlfSBmcm9tIFwiLi9wcm9zZW1pcnJvci91dGlscy9zZWxlY3Rpb24vaXMtYmxvY2stbWFyay1hY3RpdmVcIjtcbmltcG9ydCB7VGV4dEZvcm1hdE1lbnV9IGZyb20gXCIuL3RleHQtZm9ybWF0LW1lbnVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiaW9ueC1odG1sLWVkaXRvci10b29sYmFyXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlvbi1idXR0b24gc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCIgW2NsYXNzLmFjdGl2ZS1mZWF0dXJlXT1cImFjdGl2ZUZlYXR1cmVzLnRleHRcIiAoY2xpY2spPVwic2hvd01lbnUoJGV2ZW50LCAndGV4dCcpXCI+XG4gICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cIm1kLWFycm93LWRyb3Bkb3duXCIgc2xvdD1cImVuZFwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8c3Bhbj57e1wiQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjVGV4dFwiIHwgaW50bE1lc3NhZ2V9fTwvc3Bhbj5cbiAgICAgICAgPC9pb24tYnV0dG9uPlxuXG4gICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIFtjbGFzcy5hY3RpdmUtZmVhdHVyZV09XCJhY3RpdmVGZWF0dXJlcy5hbGlnbm1lbnRcIiAoY2xpY2spPVwic2hvd01lbnUoJGV2ZW50LCAnYWxpZ25tZW50JylcIiAqbmdJZj1cIiFlZGl0b3IuZmVhdHVyZXMgfHwgZWRpdG9yLmZlYXR1cmVzLmFsaWdubWVudFwiPlxuICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJtZC1hcnJvdy1kcm9wZG93blwiIHNsb3Q9XCJlbmRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPHNwYW4+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI0FsaWdubWVudFwiIHwgaW50bE1lc3NhZ2V9fTwvc3Bhbj5cbiAgICAgICAgPC9pb24tYnV0dG9uPlxuXG4gICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIFtjbGFzcy5hY3RpdmUtZmVhdHVyZV09XCJhY3RpdmVGZWF0dXJlcy5oZWFkaW5nXCIgKGNsaWNrKT1cInNob3dNZW51KCRldmVudCwgJ2hlYWRpbmcnKVwiICpuZ0lmPVwiIWVkaXRvci5mZWF0dXJlcyB8fCBlZGl0b3IuZmVhdHVyZXMuaGVhZGluZ1wiPlxuICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJtZC1hcnJvdy1kcm9wZG93blwiIHNsb3Q9XCJlbmRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPHNwYW4+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI0hlYWRpbmdcIiB8IGludGxNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgXG4gICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIFtjbGFzcy5hY3RpdmUtZmVhdHVyZV09XCJhY3RpdmVGZWF0dXJlcy5saXN0XCIgKGNsaWNrKT1cInNob3dNZW51KCRldmVudCwgJ2xpc3QnKVwiICpuZ0lmPVwiIWVkaXRvci5mZWF0dXJlcyB8fCBlZGl0b3IuZmVhdHVyZXMubGlzdFwiPlxuICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJtZC1hcnJvdy1kcm9wZG93blwiIHNsb3Q9XCJlbmRcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPHNwYW4+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpc3RNZW51L0xpc3RcIiB8IGludGxNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cblxuICAgICAgICA8aW9uLWJ1dHRvbiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiAoY2xpY2spPVwic2hvd01lbnUoJGV2ZW50LCAnaW5zZXJ0JylcIiAqbmdJZj1cIiFlZGl0b3IuZmVhdHVyZXMgfHwgZWRpdG9yLmZlYXR1cmVzLmxpbmsgfHwgZWRpdG9yLmZlYXR1cmVzLm11bHRpbWVkaWFcIj5cbiAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwibWQtYXJyb3ctZHJvcGRvd25cIiBzbG90PVwiZW5kXCI+PC9pb24taWNvbj5cbiAgICAgICAgICAgIDxzcGFuPnt7XCJAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNJbnNlcnRcIiB8IGludGxNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cbiAgICAgICAgXG4gICAgICAgIDxpb24tYnV0dG9uIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIGNsYXNzPVwiYWN0aXZlLWZlYXR1cmVcIiAoY2xpY2spPVwiZWRpdExpbmsoKVwiICpuZ0lmPVwiYWN0aXZlRmVhdHVyZXMubGlua1wiPlxuICAgICAgICAgICAgPHNwYW4+e3tcIkBjby5tbW9ucy9pb25pYy1leHRlbnNpb25zL2h0bWwtZWRpdG9yI2xpbmsvTGlua1wiIHwgaW50bE1lc3NhZ2V9fTwvc3Bhbj5cbiAgICAgICAgPC9pb24tYnV0dG9uPlxuICAgICAgICBcbiAgICAgICAgPGRpdiBpb254LS1idXR0b25zLWdyb3VwPlxuICAgICAgICAgICAgPGlvbi1idXR0b24gc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCIgdGFiaW5kZXg9XCItMVwiIHRpdGxlPVwie3snQGNvLm1tb25zL2lvbmljLWV4dGVuc2lvbnMvaHRtbC1lZGl0b3IjVW5kbycgfCBpbnRsTWVzc2FnZX19XCIgW2Rpc2FibGVkXT1cIiFjYW5VbmRvXCIgKGNsaWNrKT1cInVuZG8oKVwiPlxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwidW5kb1wiIHNsb3Q9XCJpY29uLW9ubHlcIj48L2lvbi1pY29uPlxuICAgICAgICAgICAgPC9pb24tYnV0dG9uPlxuICAgIFxuICAgICAgICAgICAgPGlvbi1idXR0b24gc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCIgdGl0bGU9XCJ7eydAY28ubW1vbnMvaW9uaWMtZXh0ZW5zaW9ucy9odG1sLWVkaXRvciNSZWRvJyB8IGludGxNZXNzYWdlfX1cIiBbZGlzYWJsZWRdPVwiIWNhblJlZG9cIiAoY2xpY2spPVwicmVkbygpXCI+XG4gICAgICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJyZWRvXCIgc2xvdD1cImljb24tb25seVwiPjwvaW9uLWljb24+XG4gICAgICAgICAgICA8L2lvbi1idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7IG91dGxpbmU6IG5vbmU7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBmbGV4LXdyYXA6IHdyYXA7IHBvc2l0aW9uOiBzdGlja3k7IHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTsgdG9wOiAwcHg7IGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQpOyB6LWluZGV4OiAxOyB9XG4gICAgICAgIDpob3N0LWNvbnRleHQoLmlvbi1mb2N1c2VkKSB7IGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmQtZm9jdXNlZCk7IH1cbiAgICAgICAgOmhvc3QgaW9uLWJ1dHRvbiB7IG1hcmdpbjogMHB4IDRweDsgLS1wYWRkaW5nLWVuZDogMnB4OyAtLXBhZGRpbmctc3RhcnQ6IDRweDsgfVxuICAgICAgICA6aG9zdCBpb24tYnV0dG9uLmFjdGl2ZS1mZWF0dXJlIHNwYW4geyBmb250LXdlaWdodDogODAwOyB9XG4gICAgICAgIDpob3N0IGlvbi1pY29uW3Nsb3Q9XCJlbmRcIl0geyBtYXJnaW46IDBweDsgfVxuICAgICAgICA6aG9zdCBpb24tYnV0dG9uW2Rpc2FibGVkXSB7IG9wYWNpdHk6IDAuNTsgfVxuICAgICAgICA6aG9zdCBbaW9ueC0tYnV0dG9ucy1ncm91cF0geyBkaXNwbGF5OiBmbGV4OyB9XG4gICAgICAgIDpob3N0IFtpb254LS1idXR0b25zLWdyb3VwXSBpb24tYnV0dG9uOm5vdCg6bGFzdC1jaGlsZCkgeyBtYXJnaW4tcmlnaHQ6IDBweDsgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwb3BvdmVyQ29udHJvbGxlcjogUG9wb3ZlckNvbnRyb2xsZXIsXG4gICAgICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZWRpdG9yOiBIdG1sRWRpdG9yLFxuICAgICAgICBwcm90ZWN0ZWQgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXIsXG4gICAgICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXJcbiAgICApIHtcblxuICAgIH1cblxuICAgIGFzeW5jIHNob3dNZW51KGV2ZW50OiBFdmVudCwgbWVudTogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IHtcbiAgICAgICAgICAgIHRleHQ6IFRleHRGb3JtYXRNZW51LFxuICAgICAgICAgICAgbGlzdDogTGlzdE1lbnUsXG4gICAgICAgICAgICBhbGlnbm1lbnQ6IEFsaWdubWVudE1lbnUsXG4gICAgICAgICAgICBpbnNlcnQ6IEluc2VydE1lbnUsXG4gICAgICAgICAgICBoZWFkaW5nOiBIZWFkaW5nTWVudVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHBvcG92ZXIgPSBhd2FpdCB0aGlzLnBvcG92ZXJDb250cm9sbGVyLmNyZWF0ZSh7XG4gICAgICAgICAgICBjb21wb25lbnQ6IGNvbXBvbmVudHNbbWVudV0sXG4gICAgICAgICAgICBjb21wb25lbnRQcm9wczoge1xuICAgICAgICAgICAgICAgIGVkaXRvcjogdGhpcy5lZGl0b3JcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICBzaG93QmFja2Ryb3A6IHRoaXMucGxhdGZvcm0uaXMoXCJpb3NcIilcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcG9wb3Zlci5wcmVzZW50KCk7XG4gICAgfVxuXG4gICAgYWN0aXZlRmVhdHVyZXM6IHtcbiAgICAgICAgbGluaz86IGJvb2xlYW4sXG4gICAgICAgIHRleHQ/OiBib29sZWFuLFxuICAgICAgICBhbGlnbm1lbnQ/OiBib29sZWFuLFxuICAgICAgICBoZWFkaW5nPzogYm9vbGVhbjtcbiAgICAgICAgbGlzdD86IGJvb2xlYW5cbiAgICB9ID0ge307XG5cbiAgICBhc3luYyBlZGl0TGluaygpIHtcbiAgICAgICAgTGlua01vZGFsLnByZXNlbnQodGhpcy5tb2RhbENvbnRyb2xsZXIsIHRoaXMuZWRpdG9yKTtcbiAgICB9XG5cbiAgICBjYW5VbmRvOiBib29sZWFuO1xuXG4gICAgY2FuUmVkbzogYm9vbGVhbjtcblxuICAgIHVuZG8oKSB7XG4gICAgICAgIHVuZG8odGhpcy5lZGl0b3Iudmlldy5zdGF0ZSwgKHRyYW5zYWN0aW9uKSA9PiB0aGlzLmVkaXRvci52aWV3LnVwZGF0ZVN0YXRlKHRoaXMuZWRpdG9yLnZpZXcuc3RhdGUuYXBwbHkodHJhbnNhY3Rpb24pKSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmVkbygpIHtcbiAgICAgICAgcmVkbyh0aGlzLmVkaXRvci52aWV3LnN0YXRlLCAodHJhbnNhY3Rpb24pID0+IHRoaXMuZWRpdG9yLnZpZXcudXBkYXRlU3RhdGUodGhpcy5lZGl0b3Iudmlldy5zdGF0ZS5hcHBseSh0cmFuc2FjdGlvbikpKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgZWRpdG9yU2VsZWN0aW9uQ2hhbmdlZCgpIHtcblxuICAgICAgICB0aGlzLmNhblVuZG8gPSB1bmRvRGVwdGgodGhpcy5lZGl0b3Iudmlldy5zdGF0ZSkgPiAwO1xuICAgICAgICB0aGlzLmNhblJlZG8gPSByZWRvRGVwdGgodGhpcy5lZGl0b3Iudmlldy5zdGF0ZSkgPiAwO1xuXG4gICAgICAgIHRoaXMuYWN0aXZlRmVhdHVyZXMgPSB7fTtcblxuICAgICAgICB0aGlzLmFjdGl2ZUZlYXR1cmVzLnRleHQgPSBhbnlNYXJrQWN0aXZlKHRoaXMuZWRpdG9yLnZpZXcuc3RhdGUsIFtzY2hlbWEubWFya3Muc3Ryb25nLCBzY2hlbWEubWFya3MuZW0sIHNjaGVtYS5tYXJrcy51bmRlcmxpbmUsIHNjaGVtYS5tYXJrcy5mb250U2l6ZV0pO1xuICAgICAgICB0aGlzLmFjdGl2ZUZlYXR1cmVzLmxpc3QgPSAhIWZpbmRQYXJlbnROb2RlKHByZWRpY2F0ZSA9PiBwcmVkaWNhdGUuaGFzTWFya3VwKHNjaGVtYS5ub2Rlcy5vcmRlcmVkTGlzdCkgfHwgcHJlZGljYXRlLmhhc01hcmt1cChzY2hlbWEubm9kZXMuYnVsbGV0TGlzdCkpKHRoaXMuZWRpdG9yLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgICAgIHRoaXMuYWN0aXZlRmVhdHVyZXMuYWxpZ25tZW50ID0gaXNCbG9ja01hcmtBY3RpdmUodGhpcy5lZGl0b3Iudmlldy5zdGF0ZSwgc2NoZW1hLm1hcmtzLmFsaWdubWVudCk7XG4gICAgICAgIHRoaXMuYWN0aXZlRmVhdHVyZXMuaGVhZGluZyA9ICEhZmluZFBhcmVudE5vZGVPZlR5cGUoc2NoZW1hLm5vZGVzLmhlYWRpbmcpKHRoaXMuZWRpdG9yLnN0YXRlLnNlbGVjdGlvbik7XG4gICAgICAgIHRoaXMuYWN0aXZlRmVhdHVyZXMubGluayA9IGlzTWFya0FjdGl2ZSh0aGlzLmVkaXRvci52aWV3LnN0YXRlLCBzY2hlbWEubWFya3MubGluayk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3Rpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGFzeW5jIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5lZGl0b3Iuc2VsZWN0aW9uQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB0aGlzLmVkaXRvclNlbGVjdGlvbkNoYW5nZWQoKSk7XG5cbiAgICAgICAgdGhpcy5lZGl0b3JTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlKHRoaXMuc2VsZWN0aW9uU3Vic2NyaXB0aW9uKTtcbiAgICB9XG5cbn1cbiJdfQ==