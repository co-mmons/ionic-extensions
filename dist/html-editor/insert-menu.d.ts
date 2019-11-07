import { OnInit } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { OverlayEventDetail } from "@ionic/core";
export declare class InsertMenu implements OnInit {
    private popoverController;
    private modalController;
    constructor(popoverController: PopoverController, modalController: ModalController);
    private editor;
    inputView: "youtube";
    private editorLastSelection;
    insertLink(): Promise<void>;
    private youtubeInput;
    insertYoutube(): Promise<void>;
    private parseYoutube;
    applyYoutube(): void;
    cancel(): void;
    ngOnInit(): void;
    ionViewWillLeave(event: OverlayEventDetail<any>): Promise<void>;
    ionViewDidLeave(event: OverlayEventDetail<any>): Promise<void>;
}
