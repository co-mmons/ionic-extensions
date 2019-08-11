var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input } from "@angular/core";
import { unsubscribe } from "@co.mmons/rxjs-utils";
import { IonSearchbar } from "@ionic/angular";
var expandedCssClass = "ionx-expanding-searchbar-expanded";
var parentCssClass = "ionx-expanding-searchbar-parent";
var ExpandingSearchbar = /** @class */ (function () {
    function ExpandingSearchbar(element, searchbar) {
        this.element = element;
        this.searchbar = searchbar;
        this.subscriptions = [];
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
    __decorate([
        Input("ionx-expanded"),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ExpandingSearchbar.prototype, "expanded", null);
    ExpandingSearchbar = __decorate([
        Directive({
            selector: "ion-searchbar[ionx-expanding-searchbar]",
            exportAs: "ionxExpandingSearchbar"
        }),
        __metadata("design:paramtypes", [ElementRef, IonSearchbar])
    ], ExpandingSearchbar);
    return ExpandingSearchbar;
}());
export { ExpandingSearchbar };
//# sourceMappingURL=expanding-searchbar.js.map