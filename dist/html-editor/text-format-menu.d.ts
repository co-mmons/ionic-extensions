import { OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { HtmlEditor } from "./editor";
import { FontSize } from "./font-sizes";
export declare class TextFormatMenu implements OnInit {
    private popoverController;
    readonly FontSize: typeof FontSize;
    constructor(popoverController: PopoverController);
    editor: HtmlEditor;
    boldActivated: boolean;
    italicActivated: boolean;
    underlineActivated: boolean;
    activeFontSize: FontSize;
    toggle(name: string): void;
    resetFontSize(): void;
    toggleFontSize(size: FontSize): void;
    ngOnInit(): void;
    ionViewWillLeave(): void;
}
