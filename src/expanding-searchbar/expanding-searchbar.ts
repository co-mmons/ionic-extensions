import {Directive, ElementRef, Input, Optional} from "@angular/core";
import {Searchbar, Navbar, Toolbar} from "ionic-angular";
import {Subscription} from "rxjs";

const expandedCssClass = "ionx-expanding-searchbar-expanded";
const parentCssClass = "ionx-expanding-searchbar-parent";

@Directive({
    selector: "ion-searchbar[ionx-expanding-searchbar], ionx-searchbar[ionx-expanding-searchbar]",
    exportAs: "ionxExpandingSearchbar"
})
export class ExpandingSearchbar {

    constructor(private element: ElementRef, private searchbar: Searchbar, @Optional() private navbar: Navbar, @Optional() private toolbar: Toolbar) {
        this.subscriptions.push(this.searchbar.ionBlur.subscribe(() => this.collapseIfPossible()));
        this.subscriptions.push(this.searchbar.ionClear.subscribe(() => this.collapseIfPossible(true)));

        this.nativeElement.classList.add("ionx-expanding-searchbar");
    }

    private subscriptions: Subscription[] = [];

    private get nativeElement() {
        return this.element.nativeElement as HTMLElement;
    }

    private get parentNativeElement() {
        return this.navbar ? this.navbar.getNativeElement() : this.toolbar.getNativeElement();
    }

    @Input("ionx-expanded")
    public get expanded(): boolean {
        return this.nativeElement.classList.contains(expandedCssClass);
    }

    public set expanded(expanded: boolean) {

        if (expanded) {
            this.nativeElement.classList.add(expandedCssClass);
            this.parentNativeElement.classList.add(parentCssClass);
            this.searchbar.setFocus();


        } else {
            this.nativeElement.classList.remove(expandedCssClass);
            this.parentNativeElement.classList.remove(parentCssClass);
        }
    }

    public expand() {
        this.expanded = true;
    }

    private collapseIfPossible(cleared?: boolean) {

        if (cleared || !this.searchbar.hasValue()) {
            setTimeout(() => {
                this.expanded = false;
            }, cleared ? 250 : 0);
        }
    }

    ngOnDestroy() {

        for (let s of this.subscriptions) {
            s.unsubscribe();
        }
    }
}