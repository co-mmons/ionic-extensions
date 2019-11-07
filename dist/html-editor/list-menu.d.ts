import { OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
export declare class ListMenu implements OnInit {
    private popoverController;
    constructor(popoverController: PopoverController);
    private editor;
    activeUnnumberedList: boolean;
    activeNumberedList: boolean;
    level(level: number): void;
    toggleList(type: "bulletList" | "orderedList"): void;
    ngOnInit(): void;
    ionViewWillLeave(): void;
}
