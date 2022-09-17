(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ionic/angular'), require('@co.mmons/rxjs-utils')) :
    typeof define === 'function' && define.amd ? define('@co.mmons/ionic-extensions/expanding-searchbar', ['exports', '@angular/core', '@ionic/angular', '@co.mmons/rxjs-utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.co = global.co || {}, global.co.mmons = global.co.mmons || {}, global.co.mmons["ionic-extensions"] = global.co.mmons["ionic-extensions"] || {}, global.co.mmons["ionic-extensions"]["expanding-searchbar"] = {}), global.ng.core, global.angular, global.rxjsUtils));
})(this, (function (exports, core, angular, rxjsUtils) { 'use strict';

    var ExpandingSearchbarStyles = /** @class */ (function () {
        function ExpandingSearchbarStyles() {
        }
        return ExpandingSearchbarStyles;
    }());
    ExpandingSearchbarStyles.decorators = [
        { type: core.Component, args: [{
                    template: "",
                    styles: [":host{display:none}::ng-deep ion-searchbar.ionx-expanding-searchbar{position:absolute;top:0px;left:0px;width:0px;overflow:hidden;padding:0;margin:0;display:none}::ng-deep ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{display:flex;width:100%}::ng-deep ion-searchbar.ionx-expanding-searchbar:not(.searchbar-show-cancel) .searchbar-clear-button{display:block!important}::ng-deep ion-toolbar ion-searchbar.ionx-expanding-searchbar-expanded{padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);padding-left:var(--padding-start);padding-right:var(--padding-end)}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .ios ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:8px;padding-right:8px}::ng-deep .ios ion-searchbar.ionx-expanding-searchbar{height:36px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar{height:100%}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded{padding-left:16px;padding-right:16px}::ng-deep .md ion-toolbar ion-searchbar.ionx-expanding-searchbar.ionx-expanding-searchbar-expanded[ionx-flat]{padding-left:0;padding-right:0}::ng-deep .ionx-expanding-searchbar-parent>*:not(.ionx-expanding-searchbar){visibility:hidden!important;transition:none}\n"]
                },] }
    ];

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
            enumerable: false,
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
            enumerable: false,
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
            rxjsUtils.unsubscribe(this.subscriptions);
        };
        return ExpandingSearchbar;
    }());
    ExpandingSearchbar.decorators = [
        { type: core.Directive, args: [{
                    selector: "ion-searchbar[ionx-expanding-searchbar]",
                    exportAs: "ionxExpandingSearchbar"
                },] }
    ];
    ExpandingSearchbar.ctorParameters = function () { return [
        { type: core.Injector },
        { type: core.ComponentFactoryResolver },
        { type: core.ApplicationRef },
        { type: core.ElementRef },
        { type: angular.IonSearchbar }
    ]; };
    ExpandingSearchbar.propDecorators = {
        expanded: [{ type: core.Input, args: ["ionx-expanded",] }]
    };

    var ExpandingSearchbarModule = /** @class */ (function () {
        function ExpandingSearchbarModule() {
        }
        return ExpandingSearchbarModule;
    }());
    ExpandingSearchbarModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [ExpandingSearchbar, ExpandingSearchbarStyles],
                    exports: [ExpandingSearchbar],
                    entryComponents: [ExpandingSearchbarStyles],
                    imports: [angular.IonicModule]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ExpandingSearchbar = ExpandingSearchbar;
    exports.ExpandingSearchbarModule = ExpandingSearchbarModule;
    exports["ɵa"] = ExpandingSearchbarStyles;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=expanding-searchbar-module.umd.js.map
