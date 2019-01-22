import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {Router} from "@angular/router";
import {IonRouterOutlet, NavController, IonBackButtonDelegate} from "@ionic/angular";

IonBackButtonDelegate.prototype.onClick = () => null;

@Directive({
    selector: "ion-back-button"
})
export class IonicBackButtonFix {

    constructor(private router: Router, private routerOutlet: IonRouterOutlet, private navCtrl: NavController, private elementRef: ElementRef) {
    }

    @Input()
    set defaultHref(value: string) {
        this.elementRef.nativeElement.defaultHref = value;
    }
    get defaultHref() {
        return this.elementRef.nativeElement.defaultHref;
    }

    @HostListener("click", ["$event"])
    onClick(ev: Event) {

        if (this.routerOutlet && this.routerOutlet.canGoBack()) {
            this.navCtrl.back({animated: true});
            ev.preventDefault();
            
        } else if (this.router && this.defaultHref != null) {
            this.navCtrl.navigateBack(this.defaultHref);
            ev.preventDefault();
        }
    }
}