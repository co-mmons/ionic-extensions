import { CommonModule } from '@angular/common';
import { Directive, ElementRef, HostListener, NgModule } from '@angular/core';
import { Platform, IonicModule } from '@ionic/angular';
import { __awaiter } from 'tslib';
import { ViewObserver } from '@co.mmons/ionic-extensions/view-observer';
import { sleep } from '@co.mmons/js-utils/core';

class VirtualScrollHelper {
    constructor(element, platform) {
        this.element = element;
        this.platform = platform;
        this.scheduleRerender = 0;
    }
    contentScrolled() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.scheduleRerender <= 0 && this.viewObserver.isActive()) {
                const scroll = yield this.content.getScrollElement();
                this.scrollPosition = scroll.scrollTop;
                this.scrollHeight = scroll.scrollHeight;
            }
        });
    }
    markAsDirtyWhenInactive() {
        if (!this.viewObserver.isActive()) {
            this.scheduleRerender++;
        }
    }
    activated() {
        if (this.scheduleRerender > 0) {
            this.rerender();
        }
    }
    rerender() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.rendering) {
                this.scheduleRerender++;
                return;
            }
            this.rendering = true;
            const inputScrollPosition = this.scrollPosition;
            const inputScrollHeight = this.scrollHeight;
            yield this.element.nativeElement.checkRange(0);
            if (inputScrollPosition > 0 && inputScrollHeight > 0) {
                const scroll = yield this.content.getScrollElement();
                let scrollHeight = scroll.scrollHeight;
                for (let i = 0; i < 20; i++) {
                    yield sleep(50);
                    if (scroll.scrollHeight === scrollHeight) {
                        break;
                    }
                    else {
                        scrollHeight = scroll.scrollHeight;
                    }
                }
                scroll.scrollTop = scroll.scrollHeight * (this.scrollPosition / this.scrollHeight);
            }
            this.rendering = false;
            this.scheduleRerender--;
            if (this.scheduleRerender > 0) {
                this.rerender();
            }
            else if (this.scheduleRerender < 0) {
                this.scheduleRerender = 0;
            }
        });
    }
    ngOnInit() {
        this.content = this.element.nativeElement.closest("ion-content");
        this.content.scrollEvents = true;
        this.content.addEventListener("ionScrollEnd", this.contentScrollEndListener = () => this.contentScrolled());
        this.viewObserver = new ViewObserver(this.content, this.platform);
        this.activationSubscription = this.viewObserver.activated.subscribe(() => this.activated());
    }
    ngOnDestroy() {
        this.content.removeEventListener("ionScrollEnd", this.contentScrollEndListener);
        this.activationSubscription.unsubscribe();
        this.viewObserver.destroy();
    }
}
VirtualScrollHelper.decorators = [
    { type: Directive, args: [{
                selector: "ion-virtual-scroll",
            },] }
];
VirtualScrollHelper.ctorParameters = () => [
    { type: ElementRef },
    { type: Platform }
];
VirtualScrollHelper.propDecorators = {
    markAsDirtyWhenInactive: [{ type: HostListener, args: ["window:resize",] }]
};

class VirtualScrollHelperModule {
}
VirtualScrollHelperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [VirtualScrollHelper],
                exports: [VirtualScrollHelper],
                imports: [CommonModule, IonicModule],
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { VirtualScrollHelper, VirtualScrollHelperModule };
//# sourceMappingURL=virtual-scroll-helper-module.js.map
