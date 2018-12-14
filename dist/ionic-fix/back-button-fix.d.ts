import { ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { IonRouterOutlet, NavController } from "@ionic/angular";
export declare class IonicBackButtonFix {
    private router;
    private routerOutlet;
    private navCtrl;
    private elementRef;
    constructor(router: Router, routerOutlet: IonRouterOutlet, navCtrl: NavController, elementRef: ElementRef);
    defaultHref: string;
    onClick(ev: Event): void;
}
