import { ApplicationRef, ComponentFactoryResolver, ElementRef, Injector } from "@angular/core";
import { IonSearchbar } from "@ionic/angular";
export declare class ExpandingSearchbar {
    private appRef;
    private element;
    private searchbar;
    constructor(injector: Injector, resolver: ComponentFactoryResolver, appRef: ApplicationRef, element: ElementRef<HTMLIonSearchbarElement>, searchbar: IonSearchbar);
    private subscriptions;
    get parentElement(): HTMLElement;
    get expanded(): boolean;
    set expanded(expanded: boolean);
    expand(): void;
    collapseIfPossible(cleared?: boolean): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
