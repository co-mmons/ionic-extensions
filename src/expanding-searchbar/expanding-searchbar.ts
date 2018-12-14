import {Directive, ElementRef, Input} from "@angular/core";
import {unsubscribe} from "@co.mmons/rjxs-utils";
import {IonSearchbar} from "@ionic/angular";
import {Subscription} from "rxjs";

const expandedCssClass = "ionx-expanding-searchbar-expanded";
const parentCssClass = "ionx-expanding-searchbar-parent";

@Directive({
    selector: "ion-searchbar[ionx-expanding-searchbar]",
    exportAs: "ionxExpandingSearchbar"
})
export class ExpandingSearchbar {

    constructor(private element: ElementRef<HTMLIonSearchbarElement>, private searchbar: IonSearchbar) {
    }

    private subscriptions: Subscription[] = [];

    get parentElement() {

        let parent = this.element.nativeElement.parentElement;
        if (parent) {
            return parent;
        }
    }

    @Input("ionx-expanded")
    public get expanded(): boolean {
        return this.element.nativeElement.classList.contains(expandedCssClass);
    }

    public set expanded(expanded: boolean) {
        this.parentElement;

        if (expanded) {
            this.element.nativeElement.classList.add(expandedCssClass);
            this.parentElement.classList.add(parentCssClass);
            this.searchbar.setFocus();

        } else {
            this.element.nativeElement.classList.remove(expandedCssClass);
            this.parentElement.classList.remove(parentCssClass);
            //this.searchbar.value = "";
            setTimeout(() => (this.element.nativeElement.querySelector(".searchbar-input") as HTMLElement).blur(), 50);
        }
    }

    public expand() {
        this.expanded = true;
    }

    collapseIfPossible(cleared?: boolean) {

        if (this.expanded && (cleared || !this.searchbar.value)) {
            setTimeout(() => {
                this.expanded = false;
            }, cleared ? 250 : 0);
        }
    }

    ngOnInit() {
        //this.subscriptions.push(this.searchbar.ionBlur.subscribe(() => this.collapseIfPossible()));
        this.subscriptions.push(this.searchbar.ionClear.subscribe(() => this.collapseIfPossible(true)));
        this.element.nativeElement.classList.add("ionx-expanding-searchbar");
    }

    ngOnDestroy() {
        unsubscribe(this.subscriptions);
    }
}