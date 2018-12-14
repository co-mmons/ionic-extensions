import { ElementRef } from "@angular/core";
import { IonSearchbar } from "@ionic/angular";
export declare class ExpandingSearchbar {
    private element;
    private searchbar;
    constructor(element: ElementRef<HTMLIonSearchbarElement>, searchbar: IonSearchbar);
    private subscriptions;
    readonly parentElement: HTMLElement;
    expanded: boolean;
    expand(): void;
    collapseIfPossible(cleared?: boolean): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
