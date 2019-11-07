import { OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { Alignment } from "./alignment";
export declare class AlignmentMenu implements OnInit {
    private popoverController;
    Alignment: typeof Alignment;
    constructor(popoverController: PopoverController);
    private editor;
    active: string;
    toggleAligment(alignment: Alignment): void;
    ngOnInit(): void;
    ionViewWillLeave(): void;
}
