import { Directive, ElementRef, Input, Optional } from "@angular/core";
import { Searchbar, Navbar, Toolbar } from "ionic-angular";
import { Subscription } from "rxjs";
var expandedCssClass = "ionx-expanding-searchbar-expanded";
var parentCssClass = "ionx-expanding-searchbar-parent";
var ExpandingSearchbar = /** @class */ (function () {
    function ExpandingSearchbar(element, searchbar, navbar, toolbar) {
        var _this = this;
        this.element = element;
        this.searchbar = searchbar;
        this.navbar = navbar;
        this.toolbar = toolbar;
        this.subscriptions.push(this.searchbar.ionBlur.subscribe(function () { return _this.collapseIfPossible(); }));
        this.subscriptions.push(this.searchbar.ionClear.subscribe(function () { return _this.collapseIfPossible(true); }));
        this.nativeElement.classList.add("ionx-expanding-searchbar");
    }
    Object.defineProperty(ExpandingSearchbar.prototype, "nativeElement", {
        get: function () {
            return this.element.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandingSearchbar.prototype, "parentNativeElement", {
        get: function () {
            return this.navbar ? this.navbar.getNativeElement() : this.toolbar.getNativeElement();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandingSearchbar.prototype, "expanded", {
        get: function () {
            return this.nativeElement.classList.contains(expandedCssClass);
        },
        set: function (expanded) {
            if (expanded) {
                this.nativeElement.classList.add(expandedCssClass);
                this.parentNativeElement.classList.add(parentCssClass);
                this.searchbar.setFocus();
            }
            else {
                this.nativeElement.classList.remove(expandedCssClass);
                this.parentNativeElement.classList.remove(parentCssClass);
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
        if (cleared || !this.searchbar.hasValue()) {
            setTimeout(function () {
                _this.expanded = false;
            }, cleared ? 250 : 0);
        }
    };
    ExpandingSearchbar.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var s = _a[_i];
            s.unsubscribe();
        }
    };
    return ExpandingSearchbar;
}());
export { ExpandingSearchbar };
//# sourceMappingURL=expanding-searchbar.js.map