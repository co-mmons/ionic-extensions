import { __decorate } from 'tslib';
import { Component, Injector, ComponentFactoryResolver, ApplicationRef, ElementRef, Input, Directive, NgModule } from '@angular/core';
import { IonSearchbar, IonicModule } from '@ionic/angular';
import { unsubscribe } from '@co.mmons/rxjs-utils';

let ExpandingSearchbarStyles = class ExpandingSearchbarStyles {
};
ExpandingSearchbarStyles = __decorate([
    Component({
        template: "",
        styles: [":host{display:none}::ng-deep ion-searchbar.ionx-expanding-searchbar{position:absolute;top:0;left:0;width:0;overflow:hidden;padding:0;margin:0;display:none}::ng-deep ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{display:-webkit-box;display:flex;width:100%}::ng-deep ion-searchbar.ionx-expanding-searchbar:not(.searchbar-show-cancel) .searchbar-clear-button{display:block!important}::ng-deep ion-toolbar ion-searchbar.ionx-expanding-searchbar-expanded{padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end)}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:8px;padding-right:8px}::ng-deep .ios ion-searchbar.ionx-expanding-searchbar{height:36px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:0;padding-right:0}::ng-deep .ionx-expanding-searchbar-parent>:not(.ionx-expanding-searchbar){visibility:hidden!important;-webkit-transition:none;transition:none}"]
    })
], ExpandingSearchbarStyles);

const expandedCssClass = "ionx-expanding-searchbar-expanded";
const parentCssClass = "ionx-expanding-searchbar-parent";
let stylesInjected = false;
let ExpandingSearchbar = class ExpandingSearchbar {
    constructor(injector, resolver, appRef, element, searchbar) {
        this.appRef = appRef;
        this.element = element;
        this.searchbar = searchbar;
        this.subscriptions = [];
        if (!stylesInjected) {
            let styles = resolver.resolveComponentFactory(ExpandingSearchbarStyles).create(injector);
            this.appRef.attachView(styles.hostView);
        }
    }
    get parentElement() {
        let parent = this.element.nativeElement.parentElement;
        if (parent) {
            return parent;
        }
    }
    get expanded() {
        return this.element.nativeElement.classList.contains(expandedCssClass);
    }
    set expanded(expanded) {
        this.parentElement;
        if (expanded) {
            this.element.nativeElement.classList.add(expandedCssClass);
            this.parentElement.classList.add(parentCssClass);
            this.searchbar.setFocus();
        }
        else {
            this.element.nativeElement.classList.remove(expandedCssClass);
            this.parentElement.classList.remove(parentCssClass);
            //this.searchbar.value = "";
            setTimeout(() => this.element.nativeElement.querySelector(".searchbar-input").blur(), 50);
        }
    }
    expand() {
        this.expanded = true;
    }
    collapseIfPossible(cleared) {
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
};
ExpandingSearchbar.ctorParameters = () => [
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: ElementRef },
    { type: IonSearchbar }
];
__decorate([
    Input("ionx-expanded")
], ExpandingSearchbar.prototype, "expanded", null);
ExpandingSearchbar = __decorate([
    Directive({
        selector: "ion-searchbar[ionx-expanding-searchbar]",
        exportAs: "ionxExpandingSearchbar"
    })
], ExpandingSearchbar);

let ExpandingSearchbarModule = class ExpandingSearchbarModule {
};
ExpandingSearchbarModule = __decorate([
    NgModule({
        declarations: [ExpandingSearchbar, ExpandingSearchbarStyles],
        exports: [ExpandingSearchbar],
        entryComponents: [ExpandingSearchbarStyles],
        imports: [IonicModule]
    })
], ExpandingSearchbarModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ExpandingSearchbar, ExpandingSearchbarModule, ExpandingSearchbarStyles as ɵa };
//# sourceMappingURL=expanding-searchbar-module.js.map
