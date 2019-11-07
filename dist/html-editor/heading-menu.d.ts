import { OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { HtmlEditor } from "./editor";
export declare class HeadingMenu implements OnInit {
    private popoverController;
    constructor(popoverController: PopoverController);
    activeHeading: number;
    editor: HtmlEditor;
    toggleHeading(heading: number): void;
    ngOnInit(): void;
    ionViewWillLeave(): void;
}
