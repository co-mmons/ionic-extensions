import { ElementRef } from "@angular/core";
import { Searchbar, Navbar, Toolbar } from "ionic-angular";
export declare class ExpandingSearchbar {
    private element;
    private searchbar;
    private navbar;
    private toolbar;
    constructor(element: ElementRef, searchbar: Searchbar, navbar: Navbar, toolbar: Toolbar);
    private subscriptions;
    private readonly nativeElement;
    private readonly parentNativeElement;
    expanded: boolean;
    expand(): void;
    private collapseIfPossible(cleared?);
    ngOnDestroy(): void;
}
