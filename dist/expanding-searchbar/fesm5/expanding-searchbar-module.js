import { __decorate } from 'tslib';
import { Component, Injector, ComponentFactoryResolver, ApplicationRef, ElementRef, Input, Directive, NgModule } from '@angular/core';
import { IonSearchbar, IonicModule } from '@ionic/angular';
import { unsubscribe } from '@co.mmons/rxjs-utils';

var ExpandingSearchbarStyles = /** @class */ (function () {
    function ExpandingSearchbarStyles() {
    }
    ExpandingSearchbarStyles = __decorate([
        Component({
            template: "",
            styles: [":host{display:none}::ng-deep ion-searchbar.ionx-expanding-searchbar{position:absolute;top:0;left:0;width:0;overflow:hidden;padding:0;margin:0;display:none}::ng-deep ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{display:-webkit-box;display:flex;width:100%}::ng-deep ion-searchbar.ionx-expanding-searchbar:not(.searchbar-show-cancel) .searchbar-clear-button{display:block!important}::ng-deep ion-toolbar ion-searchbar.ionx-expanding-searchbar-expanded{padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end)}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:8px;padding-right:8px}::ng-deep .ios ion-searchbar.ionx-expanding-searchbar{height:36px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:0;padding-right:0}::ng-deep .ionx-expanding-searchbar-parent>:not(.ionx-expanding-searchbar){visibility:hidden!important;-webkit-transition:none;transition:none}"]
        })
    ], ExpandingSearchbarStyles);
    return ExpandingSearchbarStyles;
}());

var expandedCssClass = "ionx-expanding-searchbar-expanded";
var parentCssClass = "ionx-expanding-searchbar-parent";
var stylesInjected = false;
var ExpandingSearchbar = /** @class */ (function () {
    function ExpandingSearchbar(injector, resolver, appRef, element, searchbar) {
        this.appRef = appRef;
        this.element = element;
        this.searchbar = searchbar;
        this.subscriptions = [];
        if (!stylesInjected) {
            var styles = resolver.resolveComponentFactory(ExpandingSearchbarStyles).create(injector);
            this.appRef.attachView(styles.hostView);
        }
    }
    Object.defineProperty(ExpandingSearchbar.prototype, "parentElement", {
        get: function () {
            var parent = this.element.nativeElement.parentElement;
            if (parent) {
                return parent;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandingSearchbar.prototype, "expanded", {
        get: function () {
            return this.element.nativeElement.classList.contains(expandedCssClass);
        },
        set: function (expanded) {
            var _this = this;
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
                setTimeout(function () { return _this.element.nativeElement.querySelector(".searchbar-input").blur(); }, 50);
            }
        },
        enumerable: true,
        configurable: true
    });
    ExpandingSearchbar.prototype.expand = function () {
        this.expanded = true;
    };
    ExpandingSearchbar.prototype.collapseIfPossible = function (cleared) {
        var _this = this;
        if (this.expanded && (cleared || !this.searchbar.value)) {
            setTimeout(function () {
                _this.expanded = false;
            }, cleared ? 250 : 0);
        }
    };
    ExpandingSearchbar.prototype.ngOnInit = function () {
        var _this = this;
        //this.subscriptions.push(this.searchbar.ionBlur.subscribe(() => this.collapseIfPossible()));
        this.subscriptions.push(this.searchbar.ionClear.subscribe(function () { return _this.collapseIfPossible(true); }));
        this.element.nativeElement.classList.add("ionx-expanding-searchbar");
    };
    ExpandingSearchbar.prototype.ngOnDestroy = function () {
        unsubscribe(this.subscriptions);
    };
    ExpandingSearchbar.ctorParameters = function () { return [
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: ElementRef },
        { type: IonSearchbar }
    ]; };
    __decorate([
        Input("ionx-expanded")
    ], ExpandingSearchbar.prototype, "expanded", null);
    ExpandingSearchbar = __decorate([
        Directive({
            selector: "ion-searchbar[ionx-expanding-searchbar]",
            exportAs: "ionxExpandingSearchbar"
        })
    ], ExpandingSearchbar);
    return ExpandingSearchbar;
}());

var ExpandingSearchbarModule = /** @class */ (function () {
    function ExpandingSearchbarModule() {
    }
    ExpandingSearchbarModule = __decorate([
        NgModule({
            declarations: [ExpandingSearchbar, ExpandingSearchbarStyles],
            exports: [ExpandingSearchbar],
            entryComponents: [ExpandingSearchbarStyles],
            imports: [IonicModule]
        })
    ], ExpandingSearchbarModule);
    return ExpandingSearchbarModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ExpandingSearchbar, ExpandingSearchbarModule, ExpandingSearchbarStyles as ɵa };
//# sourceMappingURL=expanding-searchbar-module.js.map
