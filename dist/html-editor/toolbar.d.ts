import { OnDestroy, OnInit } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { ModalController, Platform, PopoverController } from "@ionic/angular";
import { HtmlEditor } from "./editor";
export declare class Toolbar implements OnInit, OnDestroy {
    private popoverController;
    private platform;
    readonly editor: HtmlEditor;
    protected eventManager: EventManager;
    private modalController;
    constructor(popoverController: PopoverController, platform: Platform, editor: HtmlEditor, eventManager: EventManager, modalController: ModalController);
    showMenu(event: Event, menu: string): Promise<void>;
    activeFeatures: {
        link?: boolean;
        text?: boolean;
        alignment?: boolean;
        heading?: boolean;
        list?: boolean;
    };
    editLink(): Promise<void>;
    canUndo: boolean;
    canRedo: boolean;
    undo(): void;
    redo(): void;
    private editorSelectionChanged;
    private selectionSubscription;
    ngOnInit(): Promise<void>;
    ngOnDestroy(): void;
}
