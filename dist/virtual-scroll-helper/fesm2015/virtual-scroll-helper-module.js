import { __awaiter, __decorate } from 'tslib';
import { CommonModule } from '@angular/common';
import { ElementRef, HostListener, Directive, NgModule } from '@angular/core';
import { Platform, IonicModule } from '@ionic/angular';
import { ViewObserver } from '@co.mmons/ionic-extensions/view-observer';
import { sleep } from '@co.mmons/js-utils/core';

let VirtualScrollHelper = class VirtualScrollHelper {
    constructor(element, platform) {
        this.element = element;
        this.platform = platform;
    }
    contentScrolled() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.scheduleRerender && this.viewObserver.isActive()) {
                this.scrollPosition = (yield this.content.getScrollElement()).scrollTop;
            }
        });
    }
    markAsDirtyWhenInactive() {
        if (!this.viewObserver.isActive()) {
            this.scheduleRerender = true;
        }
    }
    rerender() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.element.nativeElement.checkRange(0);
            const scroll = yield this.content.getScrollElement();
            for (let i = 0; i < 20; i++) {
                scroll.scrollTop = this.scrollPosition;
                if (scroll.scrollTop === this.scrollPosition || scroll.scrollHeight < this.scrollPosition) {
                    break;
                }
                yield sleep(100);
            }
        });
    }
    ngOnInit() {
        this.content = this.element.nativeElement.closest("ion-content");
        this.content.scrollEvents = true;
        this.content.addEventListener("ionScrollEnd", this.contentScrollEndListener = () => this.contentScrolled());
        this.viewObserver = new ViewObserver(this.content, this.platform);
    }
    ngOnDestroy() {
        this.content.removeEventListener("ionScrollEnd", this.contentScrollEndListener);
        this.viewObserver.destroy();
    }
};
VirtualScrollHelper.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform }
];
__decorate([
    HostListener("window:resize")
], VirtualScrollHelper.prototype, "markAsDirtyWhenInactive", null);
VirtualScrollHelper = __decorate([
    Directive({
        selector: "ion-virtual-scroll",
    })
], VirtualScrollHelper);

let VirtualScrollHelperModule = class VirtualScrollHelperModule {
};
VirtualScrollHelperModule = __decorate([
    NgModule({
        declarations: [VirtualScrollHelper],
        exports: [VirtualScrollHelper],
        imports: [CommonModule, IonicModule],
    })
], VirtualScrollHelperModule);

/**
 * Generated bundle index. Do not edit.
 */

export { VirtualScrollHelper, VirtualScrollHelperModule };
//# sourceMappingURL=virtual-scroll-helper-module.js.map
